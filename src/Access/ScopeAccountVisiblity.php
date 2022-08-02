<?php

namespace Blomstra\Web3\Access;

use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class ScopeAccountVisiblity
{
    public function __invoke(User $actor, Builder $query): void
    {
        $query->where('user_id', $actor->id);
    }
}
