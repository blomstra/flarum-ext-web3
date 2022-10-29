import app from 'flarum/forum/app';

export default class Web3ModulesState {
  public loaded = false;
  private modules: any = {};

  async load() {
    if (this.loaded) return;

    this.modules = await import(
      `${app.forum.attribute('baseUrl')}/assets/extensions/blomstra-web3/web3.js` /* webpackIgnore: true, webpackPrefetch: true */
    );

    this.loaded = true;
  }

  async module<T>(name: string): Promise<T> {
    await this.load();
    return this.modules[name];
  }

  async all(): Promise<any> {
    await this.load();
    return this.modules;
  }

  loadedModules() {
    return this.modules;
  }
}
