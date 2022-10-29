import app from 'flarum/forum/app';
import { default as Web3Modal } from 'web3modal';
// import { Buffer } from 'buffer';
//
// // @ts-ignore
// window.Buffer = exports.Buffer;

// import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';
// import WalletConnectProvider from '@walletconnect/web3-provider';

export default async function getProvider() {
  const INFURA_ID = app.forum.attribute<string | undefined>('blomstra-web3.infura-project-id');

  return import(
    `${app.forum.attribute('baseUrl')}/assets/extensions/blomstra-web3/web3-providers.js` /* webpackIgnore: true, webpackPrefetch: true */
  ).then(async ({ CoinbaseWalletSDK, WalletConnectProvider }) => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: INFURA_ID,
        },
      },
      coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
          appName: 'My Awesome App',
          infuraId: INFURA_ID,
        },
      },

      binancechainwallet: {
        package: true,
      },
      opera: {
        package: true,
      },
    };

    return new Web3Modal({
      providerOptions,
    });
  });
}
