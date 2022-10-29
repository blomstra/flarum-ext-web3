import Component from 'flarum/common/Component';
import app from 'flarum/forum/app';
import Button from 'flarum/common/components/Button';
import FieldSet from 'flarum/common/components/FieldSet';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Tooltip from 'flarum/common/components/Tooltip';
import extractText from 'flarum/common/utils/extractText';
import ConnectWalletModal from './ConnectWalletModal';
import Web3Account from '../models/Web3Account';
import type { IProviderInfo } from 'web3modal';
import type { WalletInfo } from '@subwallet/wallet-connect/types';

export default class AttachedWallets extends Component {
  view() {
    if (!app.web3.loaded) {
      app.web3.load().then(() => m.redraw());

      return <LoadingIndicator />;
    }

    return (
      <FieldSet className={`Settings-wallets`} label={app.translator.trans(`blomstra-web3.forum.settings.wallets_heading`)}>
        {this.listAccountsView()}
        <Button
          icon="fas fa-wallet"
          className="Button"
          onclick={() =>
            app.modal.show(ConnectWalletModal, {
              username: app.session.user!.username(),
            })
          }
        >
          {app.translator.trans('blomstra-web3.forum.settings.wallet-connect-button')}
        </Button>
      </FieldSet>
    );
  }

  listAccountsView() {
    if (!app.web3accounts.loaded()) {
      app.web3accounts.load();

      return <LoadingIndicator />;
    }

    return (
      <div className="AttachedWallets-list">
        {app.web3accounts.all()!.map((account) => {
          return this.accountView(account);
        })}
      </div>
    );
  }

  accountView(account: Web3Account) {
    const isEth = account.type() === 'eth';

    const { getProviderInfoByName, getWalletBySource, encodeAddress, hexToU8a } = app.web3.loadedModules();

    const providerInfo = isEth ? getProviderInfoByName(account.source()) : getWalletBySource(account.source());

    const logoSrc = isEth ? providerInfo?.logo : (providerInfo as WalletInfo)?.logo.src;
    const walletName = isEth ? (providerInfo as IProviderInfo)?.name : (providerInfo as WalletInfo)?.title;
    const address = isEth ? account.address() : encodeAddress(hexToU8a(account.address()));

    return (
      <div className="AttachedWallets-account">
        <div className="AttachedWallets-account-icon">
          <img src={logoSrc} alt="" />
        </div>
        <div className="AttachedWallets-account-content">
          <div className="AttachedWallets-account-wallet">{walletName}</div>
          <div className="AttachedWallets-account-address">{address}</div>
        </div>
        <div className="AttachedWallets-account-actions">
          <Tooltip text={app.translator.trans('blomstra-web3.forum.settings.unbind')}>
            <Button className="Button Button--icon" icon="fas fa-unlink" onclick={() => this.unbind(account)} />
          </Tooltip>
        </div>
      </div>
    );
  }

  unbind(account: Web3Account) {
    if (confirm(extractText(app.translator.trans('blomstra-web3.forum.settings.unbind_confirm')))) {
      account.delete().then(() => {
        app.web3accounts.remove(account.address());
        m.redraw();
      });
    }
  }
}
