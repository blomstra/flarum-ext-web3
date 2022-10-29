import app from 'flarum/forum/app';

export default async function getProvider() {
  const INFURA_ID = app.forum.attribute<string | undefined>('blomstra-web3.infura-project-id');

  const { Web3Modal, CoinbaseWalletSDK, WalletConnectProvider } = await app.web3.all();

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
}
