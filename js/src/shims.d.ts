import { Wallet as PolkadotWallet, WalletAccount as PolkadotWalletAccount } from "@subwallet/wallet-connect/types";

export type WalletKindKey = 'polkadot' | 'ethereum';

export type WalletKindDict = {
  [key in WalletKindKey]: WalletKind;
};

export interface WalletKind {
  key: string;
  title: string;
  wallets: Wallet[];
}

export interface Wallet extends PolkadotWallet {}

export interface WalletAccount extends PolkadotWalletAccount {}

declare module 'flarum/forum/ForumApplication' {
  export default interface ForumApplication {
    wallets: WalletKindDict;
  }
}
