<?php

namespace Blomstra\Web3;

use Flarum\Foundation\AbstractValidator;

class Web3LoginValidator extends AbstractValidator
{
    /**
     * {@inheritdoc}
     */
    protected $rules = [
        'username' => 'required|string|max:255|exists:users,username',
        'address' => 'required|string|max:255',
        'source' => 'required|string|max:255',
    ];
}
