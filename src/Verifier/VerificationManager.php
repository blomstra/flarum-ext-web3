<?php

namespace Blomstra\Web3\Verifier;

use Flarum\Foundation\ValidationException;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Contracts\Container\Container;

class VerificationManager
{
    /**
     * @var array<string, class-string>
     */
    public static array $verifiers = [
        'sr25519' => PolkadotSignatureVerifier::class,
        'eth' => EthereumSignatureVerifier::class,
    ];

    private static Container $container;

    /**
     * @throws BindingResolutionException
     * @throws ValidationException
     */
    public function get(string $type): SignedMessageVerifier
    {
        if (! isset(self::$verifiers[$type])) {
            throw new ValidationException(["Cannot validate accounts of type: {$type}"]);
        }

        $className = self::$verifiers[$type];

        return self::$container->make($className);
    }

    public static function setContainer(Container $container): void
    {
        self::$container = $container;
    }
}
