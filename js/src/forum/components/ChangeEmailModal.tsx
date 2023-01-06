import app from 'flarum/forum/app';
import Button from 'flarum/common/components/Button';
import BaseChangeEmailModal from 'flarum/forum/components/ChangeEmailModal';

export default class ChangeEmailModal extends BaseChangeEmailModal {
  content() {
    if (this.success) {
      return super.content();
    }

    return (
      <div className="Modal-body">
        <div className="Form Form--centered">
          <div className="Form-group">
            <input
              type="email"
              name="email"
              className="FormControl"
              placeholder={app.session.user!.email()}
              bidi={this.email}
              disabled={this.loading}
            />
          </div>
          <div className="Form-group">
            {Button.component(
              {
                className: 'Button Button--primary Button--block',
                type: 'submit',
                loading: this.loading,
              },
              app.translator.trans('core.forum.change_email.submit_button')
            )}
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e: SubmitEvent) {
    e.preventDefault();

    // If the user hasn't actually entered a different email address, we don't
    // need to do anything. Woot!
    if (this.email() === app.session.user!.email()) {
      this.hide();
      return;
    }

    this.loading = true;
    this.alertAttrs = null;

    app
      .request({
        url: app.forum.attribute('apiUrl') + '/web3/set-email',
        method: 'PUT',
        body: {
          data: { email: this.email() },
        },
        errorHandler: this.onerror.bind(this),
      })
      .then(() => {
        this.success = true;
      })
      .catch(() => {})
      .then(this.loaded.bind(this));
  }
}
