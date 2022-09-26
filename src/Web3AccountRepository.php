<?php

namespace Blomstra\Web3;

use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;
use Blomstra\Web3\Web3Account;

class Web3AccountRepository
{
    /**
     * @return Builder<Web3Account>
     */
    public function query(): Builder
    {
        return Web3Account::query();
    }

    public function find(string $address): ?Web3Account
    {
        return $this->query()
            ->where('address', $address)
            ->first();
    }
}
