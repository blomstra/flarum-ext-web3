<?php

namespace Blomstra\Web3\Access;

use Blomstra\Web3\Web3Account;
use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class Web3AccountPolicy extends AbstractPolicy
{
    /**
     * @return string|void
     */
    public function disconnect(User $actor, Web3Account $account)
    {
        if ($account->user_id === $actor->id) {
            return $this->allow();
        }
    }
}
