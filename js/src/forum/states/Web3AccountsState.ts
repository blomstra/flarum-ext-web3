import Web3Account from '../models/Web3Account';
import app from 'flarum/forum/app';

export default class Web3AccountsState {
  private accounts: Web3Account[] | null = null;

  loaded() {
    return this.accounts !== null;
  }

  load() {
    return (
      this.accounts ??
      app.store.find<Web3Account[]>('web3/accounts').then((accounts) => {
        this.accounts = accounts;
        m.redraw();
      })
    );
  }

  exists(address: string) {
    return this.accounts !== null && this.accounts.some((account) => account.address() === address);
  }

  all() {
    return this.accounts;
  }

  push(account: Web3Account) {
    if (this.accounts !== null) {
      this.accounts.push(account);
    }
  }

  remove(address: string) {
    if (this.accounts !== null) {
      this.accounts.find((account) => account.address() === address)?.delete();
      this.accounts = this.accounts.filter((account) => account.address() !== address);
    }
  }
}
