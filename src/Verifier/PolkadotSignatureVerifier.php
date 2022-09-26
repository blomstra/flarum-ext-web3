<?php

namespace Blomstra\Web3\Verifier;

use Blomstra\Web3\C\SchnorrSignaturesBindings;
use Psr\Log\LoggerInterface;
use function Blomstra\Web3\ffiIsEnabled;

/**
 * @link https://wiki.polkadot.network/docs/learn-cryptography#keypairs-and-signing
 */
class PolkadotSignatureVerifier implements SignedMessageVerifier
{
    public function __construct(protected LoggerInterface $logger)
    {}

    public function verify(string $signature, string $message, string $publicKey): bool
    {
        if (! ffiIsEnabled()) {
            $this->logger->error('FFI is not enabled. Polkadot signature verification will not work.');

            return false;
        }

        return (new SchnorrSignaturesBindings())->verifySignature($signature, "<Bytes>$message</Bytes>", $publicKey);
    }
}
