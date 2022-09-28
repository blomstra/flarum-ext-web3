<?php

namespace Blomstra\Web3;

use Carbon\Carbon;
use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\User\User;

/**
 * @property int $id
 * @property string $address
 * @property string $source
 * @property string $type
 * @property int $user_id
 * @property Carbon $attached_at
 * @property Carbon $last_verified_at
 *
 * @property-read User $user
 */
class Web3Account extends AbstractModel
{
    use ScopeVisibilityTrait;

    const CREATED_AT = 'attached_at';
    const UPDATED_AT = 'last_verified_at';

    public $timestamps = true;

    protected $table = 'web3_accounts';

    public static function create(User $actor, $get, $get1, $get2): self
    {
        $account = new static;

        $account->user_id = $actor->id;
        $account->address = $get;
        $account->source = $get1;
        $account->type = $get2;

        return $account;
    }
}
