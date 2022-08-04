import app from 'flarum/forum/app';
import Modal, {IInternalModalAttrs} from 'flarum/common/components/Modal';
import ItemList from "flarum/common/utils/ItemList";
import type Mithril from "mithril";
import {Wallet, WalletAccount, WalletKind} from "../../shims";
import Button from "flarum/common/components/Button";
import icon from 'flarum/common/helpers/icon';
import Link from 'flarum/common/components/Link';
import {ComponentAttrs} from "flarum/common/Component";
import LoadingIndicator from "flarum/common/components/LoadingIndicator";
import Web3Account from "../models/Web3Account";
import classList from "flarum/common/utils/classList";
import {stringToHex} from "@polkadot/util";
import Tooltip from "flarum/common/components/Tooltip";

export interface IConnectWalletModalAttrs extends IInternalModalAttrs {}

export default class ConnectWalletModal<CustomAttrs extends IConnectWalletModalAttrs = IConnectWalletModalAttrs> extends Modal<CustomAttrs> {
  private selectedWallet: Wallet|null = null;
  private accounts: WalletAccount[]|null = null;
  private attachedAccountsLoaded = false;
  protected loading: boolean = false;

  oninit(vnode: Mithril.Vnode<CustomAttrs, this>) {
    super.oninit(vnode);

    this.loadAttachedAccounts();
  }

  className() {
    return 'ConnectWalletModal';
  }

  title() {
    return app.translator.trans('blomstra-web3-wallets.forum.connect-wallet-modal.title');
  }

  content() {
    return (
      <div className={classList("Modal-body", { "Modal-body--loading": this.loading })}>
        <div className="Form">
          {this.selectedWallet ? this.selectedWalletView() : this.walletSelectionView()}
        </div>
      </div>
    );
  }

  walletSelectionView() {
    return (
      <>
        <div className="Form-group">
          {this.walletKindItems().toArray()}
        </div>
        <div className="Form-group Form--centered">
          <Button className="Button Button--primary Button--block">
            {app.translator.trans('blomstra-web3-wallets.forum.connect-wallet-modal.disconnect')}
          </Button>
        </div>
      </>
    );
  }

  walletKindItems() {
    const items = new ItemList<Mithril.Children>();

    Object.keys(app.wallets).forEach((key, index) => {
      const walletKind = app.wallets[key as keyof typeof app.wallets];

      if (! walletKind.wallets.length) return;

      items.add(key, this.walletKindView(walletKind, index));
    });

    return items;
  }

  walletKindView(walletKind: WalletKind, index: number = 0) {
    return (
      <div className="ConnectWalletModal-walletKind" key={index}>
        <div className="ConnectWalletModal-walletKind-title">{walletKind.title}</div>
        <div className="ConnectWalletModal-walletKind-list">
          {walletKind.wallets.map((wallet, walletIndex) =>
            this.walletView(wallet, walletIndex))}
        </div>
      </div>
    );
  }

  walletView(wallet: Wallet, walletIndex: number = 0) {
    const Tag = wallet.installed ? Button : Link;
    let attrs: ComponentAttrs = {};

    if (! wallet.installed) {
      attrs = {
        href: wallet.installUrl,
        target: '_blank',
        rel: 'noopener noreferrer',
      };
    } else {
      attrs = {
        onclick: this.listWalletAccounts.bind(this, wallet),
      };
    }

    return (
      <Tag className="Button ConnectWalletModal-wallet" key={walletIndex} {...attrs}>
        <div className="ConnectWalletModal-wallet-logo">
          <img {...wallet.logo}/>
        </div>
        <div className="ConnectWalletModal-wallet-title">{wallet.title}</div>
        <div className="ConnectWalletModal-wallet-indicator">{wallet.installed ? icon('fas fa-arrow-right') : icon('fas fa-download')}</div>
      </Tag>
    );
  }

  selectedWalletView() {
    if (this.accounts === null) {
      this.selectedWallet!.getAccounts().then((accs) => {
        this.accounts = accs || [];
        m.redraw();
      });

      return <LoadingIndicator/>;
    }

    if (!this.attachedAccountsLoaded) {
      return <LoadingIndicator/>;
    }

    return (
      <>
        <Button className="Button Button--text Button--block ConnectWalletModal-goback" icon="fas fa-arrow-left" onclick={this.listWallets.bind(this)}>
          {app.translator.trans('blomstra-web3-wallets.forum.connect-wallet-modal.goback')}
        </Button>
        <div className="ConnectWalletModal-selectedWallet">
          <div className="ConnectWalletModal-selectedWallet-title">{this.selectedWallet!.title}</div>
          <div className="ConnectWalletModal-selectedWallet-list">
            {this.accounts.map((account, accountIndex) =>
              this.accountView(account, accountIndex))}
          </div>
        </div>
      </>
    );
  }

  accountView(account: WalletAccount, accountIndex: number) {
    const attachedAccount = app.store.getBy<Web3Account>('web3-accounts', 'address', account.address);
    const isAttached = !!attachedAccount;

    return (
      <div
        key={accountIndex}
        className={classList('ConnectWalletModal-account', {
          'ConnectWalletModal-account--attached': isAttached,
          'ConnectWalletModal-account--unattached': !isAttached,
        })}>
        <div className="ConnectWalletModal-account-info">
          <div className="ConnectWalletModal-account-title">{account.name}</div>
          <div className="ConnectWalletModal-account-address">{account.address}</div>
        </div>
        <div className="ConnectWalletModal-account-actions">
          <Tooltip text={app.translator.trans(`blomstra-web3-wallets.forum.connect-wallet-modal.${isAttached ? 'unattach' : 'attach'}_address`)}>
            <Button
              className={classList("Button Button--icon", { 'Button--primary': !isAttached, 'Button--danger': isAttached })}
              icon={isAttached ? 'fas fa-unlink' : 'fas fa-plus'}
              onclick={!isAttached ? this.connectAccount.bind(this, account) : this.disconnectAccount.bind(this, account)} />
          </Tooltip>
        </div>
      </div>
    );
  }

  listWalletAccounts(wallet: Wallet) {
    this.accounts = null;
    this.selectedWallet = wallet;
  }

  listWallets() {
    this.accounts = null;
    this.selectedWallet = null;
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
          data: stringToHex(app.session.user!.username()),
          address: account.address,
        });

        // Submit account to the backend
        const savedAccount = await app.store
          .createRecord<Web3Account>('web3-accounts')
          .save({
            address: account.address,
            source: account.source,
            // @ts-ignore
            type: account.type || '',
          }, {
            meta: {
              signature,
            }
          });
      } catch (err) {
        app.alerts.show({type: 'error'}, app.translator.trans('blomstra-web3-wallets.forum.connect-wallet-modal.could-not-sign'));
      }

      this.loading = false;
      m.redraw();
    }
  }

  async disconnectAccount(account: WalletAccount) {
    await app.store.getBy<Web3Account>('web3-accounts', 'address', account.address)?.delete();
    m.redraw();
  }

  loadAttachedAccounts() {
    return app.store
      .find<Web3Account[]>('web3/accounts')
      .then((accounts) => {
        this.attachedAccountsLoaded = true;
      });
  }
}
