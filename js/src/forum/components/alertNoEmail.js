import Alert from 'flarum/common/components/Alert';
import ChangeEmailModal from 'flarum/forum/components/ChangeEmailModal';
import Button from 'flarum/common/components/Button';

/**
 * Shows an alert if the user signed up with no email address.
 */
export default function alertNoEmail(app) {
  const user = app.session.user;
  let message = app.forum.attribute('blomstra-web3.no-email-signup-message');

  if (!message || !user || !user.isEmailFake()) return;

  class ContainedAlert extends Alert {
    view(vnode) {
      const vdom = super.view(vnode);
      return { ...vdom, children: [<div className="container">{vdom.children}</div>] };
    }
  }

  const control = (label) => (
    <Button class="Button Button--text Button--link" onclick={() => app.modal.show(ChangeEmailModal)}>
      {label}
    </Button>
  );

  // Extract the label from the message from [link][/link] tags.
  const label = message.match(/\[link](.*?)\[\/link]/)[1];
  // Split the message into two parts, before and after the link.
  const parts = message.split(`[link]${label}[/link]`);
  // Replace the link with a button.
  message = [parts[0], control(label), parts[1]];

  m.mount($('<div class="App-notices"/>').insertBefore('#content')[0], {
    view: () => (
      <ContainedAlert dismissible={false} className="Alert--emailFake">
        {message}
      </ContainedAlert>
    ),
  });
}
