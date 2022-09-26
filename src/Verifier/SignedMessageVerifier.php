<?php

namespace Blomstra\Web3\Verifier;

interface SignedMessageVerifier
{
    /**
     * Make sure signature and public key are hex strings.
     * Wrap the message in `<Bytes>` if it was signed with bytes type.
     */
    public function verify(string $signature, string $message, string $publicKey): bool;
}
