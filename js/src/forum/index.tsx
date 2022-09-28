import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';
import Button from 'flarum/common/components/Button';
import ConnectWalletModal from './components/ConnectWalletModal';
import Tooltip from 'flarum/common/components/Tooltip';
import LogInButtons from 'flarum/forum/components/LogInButtons';
import { getWallets as getRustWallets } from '@subwallet/wallet-connect/dotsama/wallets';
import { getEvmWallets } from '@subwallet/wallet-connect/evm/evmWallets';

import Web3Account from './models/Web3Account';
import LogInButton from './components/LogInButton';
import LoginModal from './components/LoginModal';

app.initializers.add('blomstra/web3-wallets', () => {
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
        <Tooltip text={app.translator.trans('blomstra-web3-wallets.forum.header.wallet-connect-label')} position="bottom">
          <Button
            icon="fas fa-wallet"
            className="Button Button--flat Button--icon"
            aria-label={app.translator.trans('blomstra-web3-wallets.forum.header.wallet-connect-label')}
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

  // Adds a "Login with web3 account" login option.
  extend(LogInButtons.prototype, 'items', function (items) {
    items.add(
      'web3',
      <LogInButton className="Button LogInButton--web3" icon="fas fa-wallet" onclick={() => app.modal.show(LoginModal)}>
        {app.translator.trans('blomstra-web3-wallets.forum.log-in.with-wallet')}
      </LogInButton>
    );
  });
});
