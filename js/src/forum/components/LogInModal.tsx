import app from 'flarum/forum/app';
import BaseLogInModal from 'flarum/forum/components/LogInModal';
import type ItemList from 'flarum/common/utils/ItemList';
import ConnectWalletModal from './ConnectWalletModal';
import Button from 'flarum/common/components/Button';
import icon from 'flarum/common/helpers/icon';

export default class LogInModal extends BaseLogInModal {
  title() {
    return app.translator.trans('blomstra-web3.forum.log-in.with-wallet');
  }

  content() {
    return [
      <div className="Modal-body">
        <div className="Form Form--centered">{this.fields().toArray()}</div>
      </div>,
    ];
  }

  fields(): ItemList<unknown> {
    const items = super.fields();

    items.remove('password');

    items.setContent(
      'submit',
      <Button className="Button Button--block Button--primary" type="submit" disabled={!this.identification()}>
        {app.translator.trans('blomstra-web3.forum.log-in.select-wallet-account', {
          rightArrow: icon('fas fa-arrow-right'),
        })}
      </Button>
    );

    return items;
  }

  footer() {
    return [];
  }

  onsubmit(e: SubmitEvent) {
    e.preventDefault();
    e.stopPropagation();

    app.modal.show(
      ConnectWalletModal,
      {
        username: this.identification(),
        onattach: (address: string, signature: string) => {
          app.modal.close();

          app
            .request({
              method: 'POST',
              url: app.forum.attribute('baseUrl') + '/web3/login',
              body: {
                identification: this.identification(),
                address,
                signature,
                remember: this.remember(),
              },
              errorHandler: this.onerror.bind(this),
            })
            .then(() => {
              app.modal.close();
              window.location.reload();
            });
        },
      },
      true
    );
  }
}
