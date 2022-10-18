import app from 'flarum/forum/app';
import Modal from 'flarum/common/components/Modal';
import ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
import Button from 'flarum/common/components/Button';
import icon from 'flarum/common/helpers/icon';
import Link from 'flarum/common/components/Link';
import { ComponentAttrs } from 'flarum/common/Component';
import WalletAccounts from './WalletAccounts';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import { IConnectWalletModalAttrs } from './ConnectWalletModal';
import { Wallet } from '@subwallet/wallet-connect/types';
import { getWallets as getDotsamaWallets } from '@subwallet/wallet-connect/dotsama/wallets';

export interface WalletKind {
  key: string;
  title: string;
  wallets: Wallet[];
}

export interface IPolkadotConnectWalletModalAttrs extends IConnectWalletModalAttrs {}

export default class PolkadotConnectWalletModal<
  CustomAttrs extends IPolkadotConnectWalletModalAttrs = IPolkadotConnectWalletModalAttrs
> extends Modal<CustomAttrs> {
  private selectedWallet: Wallet | null = null;

  oninit(vnode: Mithril.Vnode<CustomAttrs, this>) {
    super.oninit(vnode);
  }

  className() {
    return 'PolkadotConnectWalletModal';
  }

  title() {
    return app.translator.trans('blomstra-web3.forum.polkadot-connect-wallet-modal.title');
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

    const wallets: WalletKind = {
      key: 'polkadot',
      title: 'Polkadot',
      wallets: getDotsamaWallets(),
    };

    items.add('polkadot', <div className="Form-group">{this.walletKindView(wallets)}</div>);

    return items;
  }

  walletKindView(walletKind: WalletKind, index: number = 0) {
    return (
      <div className="PolkadotConnectWalletModal-walletKind" key={index}>
        <div className="PolkadotConnectWalletModal-walletKind-title">{walletKind.title}</div>
        <div className="PolkadotConnectWalletModal-walletKind-list">
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
      <Tag className="Button PolkadotConnectWalletModal-wallet" key={walletIndex} {...attrs}>
        <div className="PolkadotConnectWalletModal-wallet-logo">
          <img {...wallet.logo} alt="" />
        </div>
        <div className="PolkadotConnectWalletModal-wallet-title">{wallet.title}</div>
        <div className="PolkadotConnectWalletModal-wallet-indicator">{wallet.installed ? icon('fas fa-arrow-right') : icon('fas fa-download')}</div>
      </Tag>
    );
  }

  selectedWalletView() {
    if (!app.web3accounts.loaded()) {
      app.web3accounts.load();

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
}
