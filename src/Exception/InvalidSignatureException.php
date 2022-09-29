<?php

namespace Blomstra\Web3\Exception;

use Exception;
use Flarum\Foundation\KnownError;

class InvalidSignatureException extends Exception implements KnownError
{
    public function getType(): string
    {
        return 'invalid_crypto_signature';
    }
}
