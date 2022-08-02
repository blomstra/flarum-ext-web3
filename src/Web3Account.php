<?php

namespace Blomstra\Web3;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\User\User;

/**
 * @property int $id
 * @property string $address
 * @property string $source
 * @property string $type
 * @property int $user_id
 *
 * @property-read User $user
 */
class Web3Account extends AbstractModel
{
    use ScopeVisibilityTrait;

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
