import BaseLogInButton from 'flarum/forum/components/LogInButton';

export default class LogInButton extends BaseLogInButton {
  static initAttrs(attrs: { className: string }) {
    attrs.className = (attrs.className || '') + ' LogInButton';
  }
}
