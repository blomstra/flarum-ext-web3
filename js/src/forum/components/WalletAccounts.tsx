import Component, { ComponentAttrs } from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import app from 'flarum/forum/app';
import { Wallet, WalletAccount } from '../../shims';
import Web3Account from '../models/Web3Account';
import { stringToHex, u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import classList from 'flarum/common/utils/classList';
import Tooltip from 'flarum/common/components/Tooltip';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import type Mithril from 'mithril';
import { EvmWallet, WalletMethods } from '@subwallet/wallet-connect/types';
import RequestError from 'flarum/common/utils/RequestError';

export interface IWalletAccountsAttrs extends ComponentAttrs {
  username: string;
  wallet: Wallet;
  onback: () => void;
  onattach?: (address: string, signature: string, source?: string, type?: string) => void;
}

export default class WalletAccounts<CustomAttrs extends IWalletAccountsAttrs = IWalletAccountsAttrs> extends Component<CustomAttrs> {
  private accounts: WalletAccount[] | null = null;
  private savedAccounts: Web3Account[] = [];
  private loading = false;
  private currentEvmAddress: string | null = null;

  oninit(vnode: Mithril.Vnode<CustomAttrs, this>) {
    super.oninit(vnode);

    this.savedAccounts = app.store.all<Web3Account>('web3-accounts');

    // @ts-ignore
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      this.currentEvmAddress = accounts[0];
      m.redraw();
    });
  }

  view() {
    // EVM wallets return an array of only a single address currently used (the hex string only).
    // So that's all we can and will work with.
    if (this.walletIsEvm() && !this.currentEvmAddress) {
      (this.attrs.wallet as EvmWallet)
        .request<string[]>({
          method: 'eth_requestAccounts',
        })
        .then((addresses) => {
          this.currentEvmAddress = addresses![0] || '';
          m.redraw();
        })
        .catch(() => {
          app.alerts.show({ type: 'error' }, app.translator.trans('blomstra-web3.forum.connect-wallet-modal.connection-request-rejected'));
          this.attrs.onback();
        });

      return <LoadingIndicator />;
    }

    if (!this.walletIsEvm() && this.accounts === null) {
      let accounts;

      if (!this.walletIsEvm()) {
        accounts = (this.attrs.wallet as WalletMethods).getAccounts();

        accounts.then((accs) => {
          this.accounts = accs || [];
          m.redraw();
        });

        return <LoadingIndicator />;
      }
    }
    // As mentioned above, EVM wallets only return a single address.
    // Which is the address currently used in the wallet.
    // So we list backend attached accounts instead.
    else if (this.walletIsEvm()) {
      this.accounts = this.savedAccounts
        .filter((a) => a.source() === this.attrs.wallet.extensionName)
        .map((a) => ({
          address: a.address(),
          name: '',
          source: a.source(),
        }));
    }

    return (
      <div className={classList('WalletAccounts', { 'WalletAccounts--loading': this.loading })}>
        <div className="Form--centered">
          <Button className="Button Button--text Button--block WalletAccounts-goback" icon="fas fa-arrow-left" onclick={() => this.attrs.onback()}>
            {app.translator.trans('blomstra-web3.forum.connect-wallet-modal.goback')}
          </Button>
        </div>
        <div className="WalletAccounts-selectedWallet">
          <div className="WalletAccounts-selectedWallet-title">{this.attrs.wallet.title}</div>
          <div className="WalletAccounts-selectedWallet-list">
            {this.accounts?.map((account, accountIndex) => this.accountView(account, accountIndex))}
          </div>
          {this.walletIsEvm() ? (
            <div className="WalletAccounts-selectedWallet-attach Form--centered">
              <Button
                className="Button Button--block Button--primary"
                onclick={this.attachNewEvmAccount.bind(this)}
                disabled={this.accountIsAttached(this.currentEvmAddress!)}
              >
                {app.translator.trans('blomstra-web3.forum.connect-wallet-modal.evm_attach_current_address', {
                  address: this.currentEvmAddress?.slice(0, 8) + '...',
                })}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  accountView(account: WalletAccount, accountIndex: number) {
    const attachedAccount = this.accountIsAttached(account.address);

    // EVM wallets can only be listed if attached. So we can only unattach them.
    // Disconnecting an account from the EVM wallet interface does not disconnect it from the backend.
    // Because there is no way to catch that event.
    const isAttached = attachedAccount || this.walletIsEvm();

    return (
      <div
        key={accountIndex}
        className={classList('WalletAccounts-account', {
          'WalletAccounts-account--attached': isAttached,
          'WalletAccounts-account--unattached': !isAttached,
        })}
      >
        <div className="WalletAccounts-account-info">
          <div className="WalletAccounts-account-title">{account.name}</div>
          <div className="WalletAccounts-account-address">{account.address}</div>
        </div>
        <div className="WalletAccounts-account-actions">
          <Tooltip text={app.translator.trans(`blomstra-web3.forum.connect-wallet-modal.${isAttached ? 'unattach' : 'attach'}_address`)}>
            <Button
              className={classList('Button Button--icon', { 'Button--primary': !isAttached, 'Button--danger': isAttached })}
              icon={isAttached ? 'fas fa-unlink' : 'fas fa-plus'}
              onclick={!isAttached ? this.connectPolkadotAccount.bind(this, account) : this.disconnectAccount.bind(this, account.address)}
            />
          </Tooltip>
        </div>
      </div>
    );
  }

  async connectPolkadotAccount(account: WalletAccount) {
    const wallet = account.wallet!;

    if (!this.loading) {
      this.loading = true;
      m.redraw();
    }

    await wallet.enable();

    if (wallet.signer) {
      try {
        const signer = wallet.signer;

        // Trigger the extension popup
        const { signature } = await signer.signRaw!({
          type: 'bytes',
          data: stringToHex(this.attrs.username),
          address: account.address,
        });

        const hexAddress = u8aToHex(decodeAddress(account.address));
        // @ts-ignore
        const type = account.type;
        const source = this.attrs.wallet.extensionName;

        if (app.session.user) {
          // Submit account to the backend
          const savedAccount = await app.store.createRecord<Web3Account>('web3-accounts').save(
            {
              address: hexAddress,
              source,
              type,
            },
            {
              errorHandler: this.onerror.bind(this),
              meta: {
                signature,
              },
            }
          );

          this.savedAccounts.push(savedAccount);
        }

        if (this.attrs.onattach) this.attrs.onattach(hexAddress, signature, source, type);
      } catch (err) {
        app.alerts.show({ type: 'error' }, app.translator.trans('blomstra-web3.forum.connect-wallet-modal.could-not-sign'));
      }

      this.loading = false;
      m.redraw();
    }
  }

  async connectEvmAccount(address: string) {
    const signature = await (this.attrs.wallet as EvmWallet).request<string>({
      method: 'personal_sign',
      params: [address, this.attrs.username],
    });

    if (signature) {
      const type = 'eth';
      const source = this.attrs.wallet.extensionName;

      if (app.session.user) {
        // Submit account to the backend
        const savedAccount = await app.store.createRecord<Web3Account>('web3-accounts').save(
          {
            address: address,
            source,
            type,
          },
          {
            errorHandler: this.onerror.bind(this),
            meta: {
              signature,
            },
          }
        );

        this.savedAccounts.push(savedAccount);
      }

      if (this.attrs.onattach) this.attrs.onattach(address, signature, source, type);
    } else {
      app.alerts.show({ type: 'error' }, app.translator.trans('blomstra-web3.forum.connect-wallet-modal.could-not-sign'));
    }

    this.loading = false;
    m.redraw();
  }

  async disconnectAccount(address: string) {
    address = u8aToHex(decodeAddress(address));
    await app.store.getBy<Web3Account>('web3-accounts', 'address', address)?.delete();
    this.savedAccounts = this.savedAccounts.filter((a) => a.address() !== address);
    m.redraw();
  }

  async attachNewEvmAccount() {
    // Unlike polkadot where you get the accounts then choose which to attach.
    // EVM wallets connect accounts directly, so we have to attach the account received here.
    if (this.currentEvmAddress) {
      await this.connectEvmAccount(this.currentEvmAddress);
    }
  }

  walletIsEvm(): boolean {
    return !('getAccounts' in this.attrs.wallet);
  }

  accountIsAttached(address: string): boolean {
    return this.savedAccounts.some(
      (a) => (this.walletIsEvm() && a.address() === address) || (!this.walletIsEvm() && a.address() === u8aToHex(decodeAddress(address)))
    );
  }

  onerror(error: RequestError) {
    if (error.status === 401) {
      app.alerts.show({ type: 'error' }, app.translator.trans('blomstra-web3.forum.connect-wallet-modal.signature-invalid'));
    } else {
      throw error;
    }
  }
}
