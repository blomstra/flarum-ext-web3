import { EvmWallet, Wallet as PolkadotWallet, WalletAccount as PolkadotWalletAccount } from '@subwallet/wallet-connect/types';

export type WalletKindKey = 'polkadot' | 'ethereum';

export type WalletKindDict = {
  [key in WalletKindKey]: WalletKind;
};

export interface WalletKind {
  key: string;
  title: string;
  wallets: Wallet[];
}

export type Wallet = PolkadotWallet | EvmWallet;

export interface WalletAccount extends PolkadotWalletAccount {}

declare module 'flarum/forum/ForumApplication' {
  export default interface ForumApplication {
    wallets: WalletKindDict;
  }
}
