import app from 'flarum/forum/app';
import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
import { Wallet, WalletKind } from '../../shims';
import Button from 'flarum/common/components/Button';
import icon from 'flarum/common/helpers/icon';
import Link from 'flarum/common/components/Link';
import { ComponentAttrs } from 'flarum/common/Component';
import Web3Account from '../models/Web3Account';
import WalletAccounts from './WalletAccounts';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';

export interface IConnectWalletModalAttrs extends IInternalModalAttrs {
  username: string;
  onattach?: (address: string) => void;
}

export default class ConnectWalletModal<CustomAttrs extends IConnectWalletModalAttrs = IConnectWalletModalAttrs> extends Modal<CustomAttrs> {
  private selectedWallet: Wallet | null = null;
  private attachedAccountsLoaded = false;

  oninit(vnode: Mithril.Vnode<CustomAttrs, this>) {
    super.oninit(vnode);

    this.loadAttachedAccounts();
  }

  className() {
    return 'ConnectWalletModal';
  }

  title() {
    return app.translator.trans('blomstra-web3.forum.connect-wallet-modal.title');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">{this.selectedWallet ? this.selectedWalletView() : this.walletSelectionView()}</div>
      </div>
    );
  }

  walletSelectionView() {
    return this.walletKindItems().toArray();
  }

  walletKindItems() {
    const items = new ItemList<Mithril.Children>();

    Object.keys(app.wallets).forEach((key, index) => {
      const walletKind = app.wallets[key as keyof typeof app.wallets];

      if (!walletKind.wallets.length) return;

      items.add(key, <div className="Form-group">{this.walletKindView(walletKind, index)}</div>);
    });

    return items;
  }

  walletKindView(walletKind: WalletKind, index: number = 0) {
    return (
      <div className="ConnectWalletModal-walletKind" key={index}>
        <div className="ConnectWalletModal-walletKind-title">{walletKind.title}</div>
        <div className="ConnectWalletModal-walletKind-list">
          {walletKind.wallets.map((wallet, walletIndex) => this.walletView(wallet, walletIndex))}
        </div>
      </div>
    );
  }

  walletView(wallet: Wallet, walletIndex: number = 0) {
    const Tag = wallet.installed ? Button : Link;
    let attrs: ComponentAttrs = {};

    if (!wallet.installed) {
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
          <img {...wallet.logo} alt="" />
        </div>
        <div className="ConnectWalletModal-wallet-title">{wallet.title}</div>
        <div className="ConnectWalletModal-wallet-indicator">{wallet.installed ? icon('fas fa-arrow-right') : icon('fas fa-download')}</div>
      </Tag>
    );
  }

  selectedWalletView() {
    if (!this.attachedAccountsLoaded) {
      return <LoadingIndicator />;
    }

    return (
      <WalletAccounts
        username={this.attrs.username}
        wallet={this.selectedWallet}
        onback={this.listWallets.bind(this)}
        onattach={this.attrs.onattach}
      />
    );
  }

  listWallets() {
    this.selectedWallet = null;
  }

  listWalletAccounts(wallet: Wallet) {
    this.selectedWallet = wallet;
  }

  loadAttachedAccounts() {
    return app.store.find<Web3Account[]>('web3/accounts').then(() => {
      this.attachedAccountsLoaded = true;
    });
  }
}
