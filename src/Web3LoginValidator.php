<?php

namespace Blomstra\Web3;

use Blomstra\Web3\Support\Util;
use Closure;
use Flarum\Foundation\AbstractValidator;

class Web3LoginValidator extends AbstractValidator
{
    protected function getRules()
    {
        return [
            'identification' => 'required|string|max:255',
            'address' => ['required', 'string', 'max:80', Closure::fromCallable([self::class, 'validateHexString'])],
            'signature' => ['required', 'string', 'max:255', Closure::fromCallable([self::class, 'validateHexString'])],
        ];
    }

    public static function validateHexString($attribute, $value, $fail)
    {
        if (! str_starts_with($value, '0x') || ! ctype_xdigit(Util::trimHexString($value))) {
            $fail('The '.$attribute.' is not a valid hexadecimal string in the 0x0000 format.');
        }
    }
}
