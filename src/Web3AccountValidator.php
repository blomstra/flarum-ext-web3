<?php

namespace Blomstra\Web3;

use Closure;
use Flarum\Foundation\AbstractValidator;

class Web3AccountValidator extends AbstractValidator
{
    protected function getRules()
    {
        return [
            'address' => ['required', 'string', 'max:255', 'unique:web3_accounts,address', Closure::fromCallable([Web3LoginValidator::class, 'validateHexString'])],
            'source' => 'required|string|max:255',
            'type' => 'sometimes|string|max:255',
        ];
    }
}
