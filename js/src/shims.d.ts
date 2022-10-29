import Web3AccountsState from './forum/states/Web3AccountsState';
import Web3ModulesState from './forum/states/Web3ModulesState';

declare module 'flarum/forum/ForumApplication' {
  export default interface ForumApplication {
    web3: Web3ModulesState;
    web3accounts: Web3AccountsState;
  }
}
