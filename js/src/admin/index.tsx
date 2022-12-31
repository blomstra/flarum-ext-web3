import app from 'flarum/admin/app';
import Alert from 'flarum/common/components/Alert';

app.initializers.add('blomstra/web3', () => {
  // TODO: show if ffi extension is installed and is `ffi.enable` ini is true.

  app.extensionData
    .for('blomstra-web3')
    .registerSetting(() => {
      if (!app.data['ffiEnabled']) {
        return (
          <div className="Form-group">
            <Alert type="warning" dismissible={false}>
              {app.translator.trans('blomstra-web3.admin.settings.ffi-disabled')}
            </Alert>
          </div>
        );
      }

      return;
    })
    .registerSetting({
      setting: 'blomstra-web3.prioritize-web3-auth-modals',
      type: 'switch',
      label: app.translator.trans('blomstra-web3.admin.settings.prioritize-web3-auth-modals'),
    })
    .registerSetting({
      setting: 'blomstra-web3.allow-sign-up',
      type: 'switch',
      label: app.translator.trans('blomstra-web3.admin.settings.allow-sign-up'),
    })
    .registerSetting({
      setting: 'blomstra-web3.signup-with-email',
      type: 'switch',
      label: app.translator.trans('blomstra-web3.admin.settings.signup-with-email'),
    })
    .registerSetting({
      setting: 'blomstra-web3.no-email-signup-message',
      type: 'text',
      label: app.translator.trans('blomstra-web3.admin.settings.no-email-signup-message'),
      help: app.translator.trans('blomstra-web3.admin.settings.no-email-signup-message-help'),
    })
    .registerSetting({
      setting: 'blomstra-web3.infura-project-id',
      type: 'text',
      label: app.translator.trans('blomstra-web3.admin.settings.infura-project-id'),
      help: app.translator.trans('blomstra-web3.admin.settings.infura-project-id-help'),
    });
});
