import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';
import Button from 'flarum/common/components/Button';
import Tooltip from 'flarum/common/components/Tooltip';
import LogInButtons from 'flarum/forum/components/LogInButtons';
import BaseSignUpModal from 'flarum/forum/components/SignUpModal';
import { getWallets as getRustWallets } from '@subwallet/wallet-connect/dotsama/wallets';
import { getEvmWallets } from '@subwallet/wallet-connect/evm/evmWallets';

import Web3Account from './models/Web3Account';
import LogInButton from './components/LogInButton';
import LogInModal from './components/LogInModal';
import ConnectWalletModal from './components/ConnectWalletModal';
import SignUpModal from './components/SignUpModal';

app.initializers.add('blomstra/web3', () => {
  app.store.models['web3-accounts'] = Web3Account;

  app.wallets = {
    polkadot: {
      key: 'polkadot',
      title: 'Polkadot',
      wallets: getRustWallets(),
    },
    ethereum: {
      key: 'ethereum',
      title: 'Ethereum',
      wallets: getEvmWallets(),
    },
  };

  // Session button to bind web3 accounts to current user account.
  extend(HeaderSecondary.prototype, 'items', (items) => {
    if (app.session.user) {
      items.add(
        'wallet-connect',
        <Tooltip text={app.translator.trans('blomstra-web3.forum.header.wallet-connect-label')} position="bottom">
          <Button
            icon="fas fa-wallet"
            className="Button Button--flat Button--icon"
            aria-label={app.translator.trans('blomstra-web3.forum.header.wallet-connect-label')}
            onclick={() =>
              app.modal.show(ConnectWalletModal, {
                username: app.session.user!.username(),
              })
            }
          />
        </Tooltip>,
        5
      );
    }
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
