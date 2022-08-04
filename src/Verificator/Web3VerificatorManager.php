<?php

namespace Blomstra\Web3\Verificator;

use Flarum\Foundation\ValidationException;

class Web3VerificatorManager
{
    /**
     * @var array<string, string>
     */
    public static $verificators = [
        'sr25519' => PolkadotSignatureVerificator::class,
        'eth' => EthereumSignatureVerficator::class,
    ];

    public function get(string $type): SignedMessageVerificator
    {
        if (! isset(self::$verificators[$type])) {
            throw new ValidationException(["Cannot validate accounts of type: {$type}"]);
        }

        $className = self::$verificators[$type];

        return new $className;
    }
}
