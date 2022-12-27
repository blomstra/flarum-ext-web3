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
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';
import Button from 'flarum/common/components/Button';
import Web3ModulesState from './states/Web3ModulesState';
import alertNoEmail from './components/alertNoEmail';
import IndexPage from 'flarum/forum/components/IndexPage';
import User from 'flarum/common/models/User';
import Model from 'flarum/common/Model';

app.initializers.add('blomstra/web3', () => {
  app.store.models['web3-accounts'] = Web3Account;

  app.web3 = new Web3ModulesState();
  app.web3accounts = new Web3AccountsState();

  // @ts-ignore
  User.prototype.isEmailFake = Model.attribute<boolean>('isEmailFake');

  extend(HeaderSecondary.prototype, 'oncreate', () => {
    if (app.session.user) {
      alertNoEmail(app);
    }
  });

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

    if (context === 'sign-up' && !app.forum.attribute<boolean>('blomstra-web3.allow-sign-up')) {
      return;
    }

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

  // Open Web3 Auth Modals by default
  extend(HeaderSecondary.prototype, 'items', function (items) {
    if (app.session.user) return;

    if (
      (app.forum.attribute<boolean>('blomstra-web3.prioritize-web3-auth-modals') && app.forum.attribute<boolean>('blomstra-web3.allow-sign-up')) ||
      (app.forum.attribute<boolean>('blomstra-web3.allow-sign-up') && !app.forum.attribute<boolean>('allowSignUp'))
    ) {
      if (items.has('signUp')) {
        items.remove('signUp');
      }

      items.add(
        'signUp',
        <Button className="Button Button--link" onclick={() => app.modal.show(SignUpModal)}>
          {app.translator.trans('core.forum.header.sign_up_link')}
        </Button>,
        10
      );
    }

    if (app.forum.attribute<boolean>('blomstra-web3.prioritize-web3-auth-modals') && items.has('logIn')) {
      items.get('logIn').attrs.onclick = () => app.modal.show(LogInModal);
    }
  });
});
