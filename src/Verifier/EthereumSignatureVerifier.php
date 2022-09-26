<?php

namespace Blomstra\Web3\Verifier;

use Sijad\LaravelEcrecover\EthSigRecover;

class EthereumSignatureVerifier implements SignedMessageVerifier
{
    public function verify(string $signature, string $message, string $publicKey): bool
    {
        $eth = new EthSigRecover();

        try {
            return strtolower($eth->personal_ecRecover($message, $signature)) === strtolower($publicKey);
        } catch (\Throwable) {
            return false;
        }
    }
}
