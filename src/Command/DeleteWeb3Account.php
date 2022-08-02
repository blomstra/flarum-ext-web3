<?php

namespace Blomstra\Web3\Command;

use Flarum\User\User;

class DeleteWeb3Account
{
    /**
     * @var int
     */
    public $accountId;

    /**
     * @var User
     */
    public $actor;

    public function __construct($accountId, User $actor)
    {
        $this->accountId = $accountId;
        $this->actor = $actor;
    }
}
