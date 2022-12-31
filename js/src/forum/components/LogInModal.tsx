import app from 'flarum/forum/app';
import BaseLogInModal from 'flarum/forum/components/LogInModal';
import type ItemList from 'flarum/common/utils/ItemList';
import ConnectWalletModal from './ConnectWalletModal';
import Button from 'flarum/common/components/Button';
import icon from 'flarum/common/helpers/icon';
import SignUpModal from './SignUpModal';

export default class LogInModal extends BaseLogInModal {
  title() {
    return app.translator.trans('blomstra-web3.forum.log-in.with-wallet');
  }

  content() {
    return [
      <div className="Modal-body">
        <div className="Form Form--centered">{this.fields().toArray()}</div>
      </div>,
      <div className="Modal-footer">{this.footer()}</div>,
    ];
  }

  fields(): ItemList<unknown> {
    const items = super.fields();

    items.remove('password');

    items.setContent(
      'submit',
      <Button className="Button Button--block Button--primary" type="submit" disabled={!this.identification()} loading={this.loading}>
        {app.translator.trans('blomstra-web3.forum.log-in.select-wallet-account', {
          rightArrow: icon('fas fa-arrow-right'),
        })}
      </Button>
    );

    return items;
  }

  footer() {
    return [
      <p className="LogInModal-forgotPassword">
        <a onclick={() => app.modal.show(BaseLogInModal)}>{app.translator.trans('blomstra-web3.forum.log-in.basic-login-link')}</a>
      </p>,

      app.forum.attribute('blomstra-web3.allow-sign-up') ? (
        <p className="LogInModal-signUp">
          {app.translator.trans('core.forum.log_in.sign_up_text', { a: <a onclick={() => app.modal.show(SignUpModal)} /> })}
        </p>
      ) : (
        ''
      ),
    ];
  }

  onsubmit(e: SubmitEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.loading = true;

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
            .then(() => window.location.reload(), this.loaded.bind(this));
        },
      },
      true
    );
  }
}
