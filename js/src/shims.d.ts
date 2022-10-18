import Web3AccountsState from './forum/states/Web3AccountsState';

declare module 'flarum/forum/ForumApplication' {
  export default interface ForumApplication {
    web3accounts: Web3AccountsState;
  }
}
