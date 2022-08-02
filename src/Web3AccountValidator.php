<?php

namespace Blomstra\Web3;

use Flarum\Foundation\AbstractValidator;

class Web3AccountValidator extends AbstractValidator
{
    /**
     * {@inheritdoc}
     */
    protected $rules = [
        'address' => 'required|string|max:255',
        'source' => 'required|string|max:255',
        'type' => 'sometimes|string|max:255',
    ];
}
