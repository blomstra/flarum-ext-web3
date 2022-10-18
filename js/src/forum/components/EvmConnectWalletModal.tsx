import app from 'flarum/forum/app';
import type Mithril from 'mithril';
import Core, { default as Web3Modal, getProviderInfo } from 'web3modal';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import { IConnectWalletModalAttrs } from './ConnectWalletModal';
import Web3Account from '../models/Web3Account';

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
  private provider!: any;
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
      this.getProvider().then(async (provider) => {
        try {
          this.currentAddress = (await provider.request({ method: 'eth_requestAccounts' }))[0];
        } catch (error) {
          app.modal.close();
        }

        m.redraw();
      });

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
              {app.translator.trans('blomstra-web3.forum.evm-connect-wallet-modal.bind')}
            </Button>
          )}
        </div>
      </div>
    );
  }

  async bind() {
    const provider = await this.getProvider();

    const signature = await provider.request({
      method: 'personal_sign',
      params: [this.currentAddress, this.attrs.username],
    });

    if (signature) {
      const type = 'eth';
      const source = getProviderInfo(provider).name;

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
    } else {
      app.alerts.show({ type: 'error' }, app.translator.trans('blomstra-web3.forum.connect-wallet-modal.could-not-sign'));
    }

    this.loading = false;
    m.redraw();
  }

  async disconnect(unbind: boolean) {
    const provider = await this.getProvider();

    if (provider.close) {
      await provider.close();

      await this.web3Modal.clearCachedProvider();
    }

    const address = this.currentAddress;

    if (unbind) {
      await app.web3accounts.remove(u8aToHex(decodeAddress(address)));
    }

    app.modal.close();
  }

  async getProvider() {
    if (this.provider) {
      return this.provider;
    }

    const providerOptions = {
      // walletconnect: {
      //   package: WallectConnectProvider,
      //   options: {
      //     infuraId: '8378c39d804147dea2a3aebb737fb9a8',
      //   },
      // },
    };

    const web3Modal = new Web3Modal({
      providerOptions,
    });

    const provider = await web3Modal.connect();

    provider.on('accountsChanged', (accounts: string[]) => {
      console.log(accounts);
    });

    this.web3Modal = web3Modal;

    return (this.provider = provider);
  }
}
