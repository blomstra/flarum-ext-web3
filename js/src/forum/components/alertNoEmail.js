import Alert from 'flarum/common/components/Alert';
import ChangeEmailModal from 'flarum/forum/components/ChangeEmailModal';
import Button from 'flarum/common/components/Button';

/**
 * Shows an alert if the user signed up with no email address.
 */
export default function alertNoEmail(app) {
  const user = app.session.user;
  const message = app.forum.attribute('blomstra-web3.no-email-signup-message');

  if (!message || !user || user.isEmailFake()) return;

  class ContainedAlert extends Alert {
    view(vnode) {
      const vdom = super.view(vnode);
      return { ...vdom, children: [<div className="container">{vdom.children}</div>] };
    }
  }

  const control = (
    <Button class="Button Button--link" onclick={() => app.modal.show(ChangeEmailModal)}>
      {app.translator.trans('blomstra-web3.forum.alerts.no-email-signup.link')}
    </Button>
  );

  m.mount($('<div class="App-notices"/>').insertBefore('#content')[0], {
    view: () => (
      <ContainedAlert dismissible={false} controls={[control]} className="Alert--emailFake">
        {message}
      </ContainedAlert>
    ),
  });
}
