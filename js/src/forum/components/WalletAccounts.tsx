import Component, { ComponentAttrs } from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import app from 'flarum/forum/app';
import Web3Account from '../models/Web3Account';
import { stringToHex, u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import classList from 'flarum/common/utils/classList';
import Tooltip from 'flarum/common/components/Tooltip';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import type Mithril from 'mithril';
import { Wallet, WalletAccount } from '@subwallet/wallet-connect/types';
import RequestError from 'flarum/common/utils/RequestError';

export interface IWalletAccountsAttrs extends ComponentAttrs {
  username: string;
  wallet: Wallet;
  onback: () => void;
  onattach?: (address: string, signature: string, source?: string, type?: string) => void;
}

export default class WalletAccounts<CustomAttrs extends IWalletAccountsAttrs = IWalletAccountsAttrs> extends Component<CustomAttrs> {
  private accounts: WalletAccount[] | null = null;
  private loading = false;

  oninit(vnode: Mithril.Vnode<CustomAttrs, this>) {
    super.oninit(vnode);
  }

  view() {
    if (this.accounts === null) {
      let accounts;

      accounts = this.attrs.wallet.getAccounts();

      accounts.then((accs) => {
        this.accounts = accs || [];
        m.redraw();
      });

      return <LoadingIndicator />;
    }

    return (
      <div className={classList('WalletAccounts', { 'WalletAccounts--loading': this.loading })}>
        <div className="Form--centered">
          <Button className="Button Button--text Button--block WalletAccounts-goback" icon="fas fa-arrow-left" onclick={() => this.attrs.onback()}>
            {app.translator.trans('blomstra-web3.forum.polkadot-connect-wallet-modal.goback')}
          </Button>
        </div>
        <div className="WalletAccounts-selectedWallet">
          <div className="WalletAccounts-selectedWallet-title">{this.attrs.wallet.title}</div>
          <div className="WalletAccounts-selectedWallet-list">
            {this.accounts?.map((account, accountIndex) => this.accountView(account, accountIndex))}
          </div>
        </div>
      </div>
    );
  }

  accountView(account: WalletAccount, accountIndex: number) {
    const isAttached = app.web3accounts.exists(u8aToHex(decodeAddress(account.address)));

    let bindMessage = 'blomstra-web3.forum.polkadot-connect-wallet-modal.';

    switch (isAttached) {
      case true:
        bindMessage += 'unattach_address';
        break;
      case false:
        if (app.session.user) bindMessage += 'attach_address';
        // For Login/Signup processes.
        else bindMessage += 'select';
    }

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
          <Tooltip text={app.translator.trans(bindMessage)}>
            <Button
              className={classList('Button Button--icon', { 'Button--primary': !isAttached, 'Button--danger': isAttached })}
              icon={isAttached ? 'fas fa-unlink' : 'fas fa-plus'}
              onclick={!isAttached ? this.connectAccount.bind(this, account) : this.disconnectAccount.bind(this, account.address)}
            />
          </Tooltip>
        </div>
      </div>
    );
  }

  async connectAccount(account: WalletAccount) {
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

          app.web3accounts.push(savedAccount);
        }

        if (this.attrs.onattach) this.attrs.onattach(hexAddress, signature, source, type);
      } catch (err) {
        app.alerts.show({ type: 'error' }, app.translator.trans('blomstra-web3.forum.connect-wallet-modal.could-not-sign'));
      }

      this.loading = false;
      m.redraw();
    }
  }

  async disconnectAccount(address: string) {
    address = u8aToHex(decodeAddress(address));
    await app.store.getBy<Web3Account>('web3-accounts', 'address', address)?.delete();
    app.web3accounts.remove(address);
    m.redraw();
  }

  onerror(error: RequestError) {
    if (error.status === 401) {
      app.alerts.show({ type: 'error' }, app.translator.trans('blomstra-web3.forum.connect-wallet-modal.signature-invalid'));
    } else {
      throw error;
    }
  }
}
