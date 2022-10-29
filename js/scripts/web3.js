import { encodeAddress, decodeAddress } from '@polkadot/util-crypto';
import { getWalletBySource, getWallets as getDotsamaWallets } from '@subwallet/wallet-connect/dotsama/wallets';
import { hexToU8a, u8aToHex, stringToHex } from '@polkadot/util';

import { CoinbaseWalletSDK, CoinbaseWalletProvider } from '@coinbase/wallet-sdk';
import WalletConnectProvider from '@walletconnect/web3-provider/dist/esm/index.js';
import { default as Web3Modal, getProviderInfo, getProviderInfoByName } from 'web3modal';

export {
  // Dotsama
  encodeAddress,
  decodeAddress,
  hexToU8a,
  u8aToHex,
  stringToHex,
  getWalletBySource,
  getDotsamaWallets,
  // EVM
  Web3Modal,
  getProviderInfo,
  getProviderInfoByName,
  CoinbaseWalletSDK,
  CoinbaseWalletProvider,
  WalletConnectProvider,
};
