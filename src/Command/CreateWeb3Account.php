<?php

namespace Blomstra\Web3\Command;

use Flarum\User\User;

class CreateWeb3Account
{
    /**
     * @var \Flarum\User\User
     */
    public $actor;

    /**
     * @var array
     */
    public $payload;

    public function __construct(User $actor, array $payload)
    {
        $this->actor = $actor;
        $this->payload = $payload;
    }
}
