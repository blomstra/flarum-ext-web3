import app from 'flarum/forum/app';
import BaseSignUpModal from 'flarum/forum/components/SignUpModal';
import type ItemList from 'flarum/common/utils/ItemList';
import ConnectWalletModal from './ConnectWalletModal';
import Button from 'flarum/common/components/Button';
import icon from 'flarum/common/helpers/icon';

export default class SignUpModal extends BaseSignUpModal {
  title() {
    return app.translator.trans('blomstra-web3.forum.sign-up.with-wallet');
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
      <Button className="Button Button--block Button--primary" type="submit" disabled={!this.username() && !this.email()}>
        {app.translator.trans('blomstra-web3.forum.sign-up.select-wallet-account', {
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
        username: this.username(),
        onattach: (address: string, signature: string, source: string, type: string) => {
          app.modal.close();

          app
            .request({
              method: 'POST',
              url: app.forum.attribute('baseUrl') + '/web3/register',
              body: {
                username: this.username(),
                email: this.email(),
                address,
                signature,
                type,
                source,
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
