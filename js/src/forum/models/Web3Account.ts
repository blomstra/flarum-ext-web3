import Model from 'flarum/common/Model';
import { encodeAddress } from "@polkadot/util-crypto";

export default class Web3Account extends Model {
  get encodedAddress() {
    return encodeAddress(this.address());
  }

  /** Hex String **/
  address() {
    return Model.attribute<string>('address').call(this);
  }

  source() {
    return Model.attribute<string>('source').call(this);
  }

  type() {
    return Model.attribute<'sr25519' | 'eth'>('type').call(this);
  }

  protected apiEndpoint(): string {
    return super.apiEndpoint().replace('/web3-accounts', '/web3/accounts');
  }
}
