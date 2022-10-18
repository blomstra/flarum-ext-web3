import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import LogInButtons from 'flarum/forum/components/LogInButtons';
import BaseSignUpModal from 'flarum/forum/components/SignUpModal';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import FieldSet from 'flarum/common/components/FieldSet';
import { getWallets as getDotsamaWallets } from '@subwallet/wallet-connect/dotsama/wallets';

import Web3Account from './models/Web3Account';
import LogInButton from './components/LogInButton';
import LogInModal from './components/LogInModal';
import ConnectWalletModal from './components/ConnectWalletModal';
import SignUpModal from './components/SignUpModal';
import Web3AccountsState from './states/Web3AccountsState';

app.initializers.add('blomstra/web3', () => {
  app.store.models['web3-accounts'] = Web3Account;

  app.web3accounts = new Web3AccountsState();

  app.wallets = {
    polkadot: {
      key: 'polkadot',
      title: 'Polkadot',
      wallets: getDotsamaWallets(),
    },
    ethereum: {
      key: 'ethereum',
      title: 'Ethereum',
      wallets: [],
    },
  };

  // Session button to bind web3 accounts to current user account.
  extend(SettingsPage.prototype, 'settingsItems', (items) => {
    items.add(
      'wallets',
      <FieldSet className={`Settings-wallets`} label={app.translator.trans(`blomstra-web3.forum.settings.wallets_heading`)}>
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
      </FieldSet>,
      5
    );
  });

  // Modify signup modal to add context to our login modal to be able to tell a login from a sigup.
  extend(BaseSignUpModal.prototype, 'body', function (vnode) {
    vnode[0] = !this.attrs.token && <LogInButtons isSignUp={true} />;
  });

  // Adds a "Login with web3 account" login option.
  extend(LogInButtons.prototype, 'items', function (items) {
    // @ts-ignore
    const context = this.attrs.isSignUp ? 'sign-up' : 'log-in';

    items.add(
      'web3',
      <LogInButton
        className="Button LogInButton--web3"
        icon="fas fa-wallet"
        // @ts-ignore
        onclick={() => app.modal.show(this.attrs.isSignUp ? SignUpModal : LogInModal)}
      >
        {app.translator.trans(`blomstra-web3.forum.${context}.with-wallet`)}
      </LogInButton>
    );
  });
});
