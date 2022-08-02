import app from 'flarum/forum/app';
import {extend} from "flarum/common/extend";
import HeaderSecondary from "flarum/forum/components/HeaderSecondary";
import Button from "flarum/common/components/Button";
import ConnectWalletModal from "./components/ConnectWalletModal";
import Tooltip from "flarum/common/components/Tooltip";
import {getWallets as getRustWallets} from "@subwallet/wallet-connect/dotsama/wallets";
import {getEvmWallets} from "@subwallet/wallet-connect/evm/evmWallets";

import Web3Account from './models/Web3Account';

app.initializers.add('blomstra/web3-wallets', () => {
  app.store.models['web3-accounts'] = Web3Account;

  app.wallets = {
    polkadot: {
      key: 'polkadot',
      title: 'Polkadot',
      wallets: getRustWallets()
    },
    ethereum: {
      key: 'ethereum',
      title: 'Ethereum',
      wallets: []
    },
  };

  extend(HeaderSecondary.prototype, 'items', (items) => {
    if (app.session.user) {
      items.add('wallet-connect', (
        <Tooltip text={app.translator.trans('blomstra-web3-wallets.forum.header.wallet-connect-label')} position="bottom">
          <Button
            icon="fas fa-wallet"
            className="Button Button--flat Button--icon"
            aria-label={app.translator.trans('blomstra-web3-wallets.forum.header.wallet-connect-label')}
            onclick={() => app.modal.show(ConnectWalletModal)}/>
        </Tooltip>
      ), 5);
    }
  });
});
