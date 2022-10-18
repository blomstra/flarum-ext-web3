import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import LogInButtons from 'flarum/forum/components/LogInButtons';
import BaseSignUpModal from 'flarum/forum/components/SignUpModal';
import SettingsPage from 'flarum/forum/components/SettingsPage';

import Web3Account from './models/Web3Account';
import LogInButton from './components/LogInButton';
import LogInModal from './components/LogInModal';
import SignUpModal from './components/SignUpModal';
import Web3AccountsState from './states/Web3AccountsState';
import AttachedWallets from './components/AttachedWallets';

app.initializers.add('blomstra/web3', () => {
  app.store.models['web3-accounts'] = Web3Account;

  app.web3accounts = new Web3AccountsState();

  // Session button to bind web3 accounts to current user account.
  extend(SettingsPage.prototype, 'settingsItems', (items) => {
    items.add('wallets', <AttachedWallets />, 95);
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
