import type Mithril from 'mithril';
import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import app from 'flarum/forum/app';
import PolkadotConnectWalletModal from './PolkadotConnectWalletModal';
import EvmConnectWalletModal from './EvmConnectWalletModal';

export interface IConnectWalletModalAttrs extends IInternalModalAttrs {
  username: string;
  onattach?: (address: string, signature: string, source: string, type: string) => void;
}

export default class ConnectWalletModal<CustomAttrs extends IConnectWalletModalAttrs = IConnectWalletModalAttrs> extends Modal<CustomAttrs> {
  className(): string {
    return 'ConnectWalletModal';
  }

  title(): Mithril.Children {
    return app.translator.trans('blomstra-web3.forum.connect-wallet-modal.title');
  }

  content(): Mithril.Children {
    return (
      <div className="Modal-body">
        <div className="Form Form--centered">
          <div className="Form-group">
            <Button
              className="Button Blomstra-Web3-Button--polkadot Button--block"
              onclick={() => app.modal.show(PolkadotConnectWalletModal, this.attrs as Record<string, any>, true)}
            >
              {app.translator.trans('blomstra-web3.forum.connect-wallet-modal.polkadot-wallets')}
            </Button>
            <Button
              className="Button Blomstra-Web3-Button--evm Button--block"
              onclick={() => app.modal.show(EvmConnectWalletModal, this.attrs as Record<string, any>, true)}
            >
              {app.translator.trans('blomstra-web3.forum.connect-wallet-modal.evm-wallets')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
