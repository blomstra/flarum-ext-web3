import app from 'flarum/forum/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import { IConnectWalletModalAttrs } from './ConnectWalletModal';
import Web3Account from '../models/Web3Account';
import getProvider from '../utils/getProvider';
import type Core from 'web3modal';
import type Mithril from 'mithril';

// import { W3mModal, W3mConnectButton } from '@web3modal/ui';
// import { ClientCtrl, ConfigCtrl, ConfigOptions } from '@web3modal/core';
// import { chains, providers } from '@web3modal/ethereum';

// const projectId = '5bae682417f3958e125f25a0b67535e7';
//
// const config: ConfigOptions = {
//   projectId,
//   theme: 'dark',
//   accentColor: 'default',
//   ethereum: {
//     appName: 'web3Modal',
//     autoConnect: true,
//     chains: [chains.mainnet, chains.rinkeby, chains.avalanche, chains.avalancheFuji, chains.polygon, chains.polygonMumbai],
//     providers: [providers.walletConnectProvider({ projectId })],
//   },
// };

// class Web3Modal extends Component {
//   async oninit(vnode: Mithril.Vnode<any, this>) {
//     super.oninit(vnode);
//
//     // ConfigCtrl.setConfig(config);
//     // if (config.ethereum) await ClientCtrl.setEthereumClient(config.ethereum);
//   }
//
//   view(): Mithril.Children {
//     return <w3m-modal />;
//   }
// }

export interface IEvmConnectWalletModalAttrs extends IConnectWalletModalAttrs {}

export default class EvmConnectWalletModal<CustomAttrs extends IEvmConnectWalletModalAttrs = IEvmConnectWalletModalAttrs> extends Modal<CustomAttrs> {
  private web3Modal!: Core;
  private provider?: any;
  private __providerName?: string;
  private currentAddress?: string;

  oninit(vnode: Mithril.Vnode<CustomAttrs, this>) {
    super.oninit(vnode);

    app.web3accounts.load();
  }

  className(): string {
    return 'EvmConnectWalletModal';
  }

  title(): Mithril.Children {
    return app.translator.trans('blomstra-web3.forum.evm-connect-wallet-modal.title');
  }

  content() {
    if (!this.currentAddress) {
      this.getProvider()
        .then(async (provider) => {
          try {
            this.currentAddress = (await provider.request({ method: 'eth_requestAccounts' }))[0];
          } catch (error) {
            app.modal.close();
          }

          m.redraw();
        })
        .catch(() => app.modal.close());

      return <LoadingIndicator />;
    }

    return (
      <div className="Modal-body">
        <div className="Form-group">
          <label>{this.currentAddress}</label>
          {app.web3accounts.exists(this.currentAddress) ? (
            <>
              <Button className="Button" onclick={() => this.disconnect(false)}>
                {app.translator.trans('blomstra-web3.forum.evm-connect-wallet-modal.disconnect')}
              </Button>
              <Button className="Button" onclick={() => this.disconnect(true)}>
                {app.translator.trans('blomstra-web3.forum.evm-connect-wallet-modal.disconnect-and-unbind')}
              </Button>
            </>
          ) : (
            <Button className="Button" onclick={this.bind.bind(this)}>
              {app.translator.trans(
                app.session.user ? 'blomstra-web3.forum.evm-connect-wallet-modal.bind' : 'blomstra-web3.forum.evm-connect-wallet-modal.select'
              )}
            </Button>
          )}
        </div>
      </div>
    );
  }

  async bind() {
    const provider = this.provider;

    try {
      const signature = await provider.request({
        method: 'personal_sign',
        params: [this.attrs.username, this.currentAddress],
      });

      const { getProviderInfo } = await app.web3.all();

      const type = 'eth';
      // Special handling required for binance wallet as it doesn't identify itself with a check of `isBinanceWallet`
      const source = this.__providerName === 'binancechainwallet' ? 'Binance Chain' : getProviderInfo(provider).name;

      if (app.session.user) {
        // Submit account to the backend
        const savedAccount = await app.store.createRecord<Web3Account>('web3-accounts').save(
          {
            address: this.currentAddress,
            source,
            type,
          },
          {
            errorHandler: this.onerror.bind(this),
            meta: {
              signature,
            },
          }
        );

        app.web3accounts.push(savedAccount);
      }

      if (this.attrs.onattach) this.attrs.onattach(this.currentAddress!, signature, source, type);
    } catch (e) {
      app.alerts.show({ type: 'error' }, app.translator.trans('blomstra-web3.forum.connect-wallet-modal.could-not-sign'));
    }

    this.loading = false;
    m.redraw();
  }

  async disconnect(unbind: boolean) {
    const provider = this.provider;

    if (provider?.close) {
      await provider.close();

      await this.web3Modal.clearCachedProvider();
    }

    const address = this.currentAddress;

    if (unbind) {
      await app.web3accounts.remove(address!);
    }

    delete this.currentAddress;
  }

  async getProvider() {
    if (!this.web3Modal) {
      this.web3Modal = await getProvider();
    }

    this.web3Modal.on('select', (providerName: string) => {
      this.__providerName = providerName;
    });

    const provider = await this.web3Modal.connect();

    provider.on('accountsChanged', (accounts: string[]) => {
      this.currentAddress = accounts[0];
      m.redraw();
    });

    return (this.provider = provider);
  }
}
