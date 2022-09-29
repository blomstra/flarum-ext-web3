<?php

namespace Blomstra\Web3;

use Closure;
use Flarum\User\UserValidator;
use Illuminate\Support\Arr;

class Web3SignupValidator extends UserValidator
{
    protected function getRules()
    {
        $rules = Arr::only(parent::getRules(), ['username', 'email']);

        return array_merge($rules, [
            'address' => ['required', 'string', 'max:80', Closure::fromCallable([Web3LoginValidator::class, 'validateHexString'])],
            'signature' => ['required', 'string', 'max:255', Closure::fromCallable([Web3LoginValidator::class, 'validateHexString'])],
            'source' => 'required|string|max:255',
            'type' => 'sometimes|string|max:255',
        ]);
    }
}
