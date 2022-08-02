import app from 'flarum/forum/app';
import Modal from 'flarum/common/components/Modal';
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


export default class ConnectWalletModal extends Modal {
  private selectedWallet: Wallet|null = null;
  private accounts: WalletAccount[]|null = null;
  protected loading: boolean = false;

  className() {
    return 'ConnectWalletModal';
  }

  title() {
    return app.translator.trans('blomstra-web3-wallets.forum.connect-wallet-modal.title');
  }

  content() {
    return (
      <div className={classList("Modal-body", { "Modal-body--loading": this.loading })}>
        {this.selectedWallet ? this.selectedWalletView() : this.walletKindItems().toArray()}
      </div>
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

    return (
      <>
        <Button className="Button Button--text ConnectWalletModal-goback" icon="fas fa-arrow-left" onclick={this.listWallets.bind(this)}>
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
    return (
      <Button className="Button ConnectWalletModal-account" key={accountIndex} onclick={this.connectWallet.bind(this, account)}>
        <div className="ConnectWalletModal-account-title">{account.name}</div>
        <div className="ConnectWalletModal-account-address">{account.address}</div>
      </Button>
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

  async connectWallet(account: WalletAccount) {
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
}
