<?php

namespace Blomstra\Web3\Verificator;

use Sijad\LaravelEcrecover\EthSigRecover;

class EthereumSignatureVerficator implements SignedMessageVerificator
{
    public function verifySignature(string $message, string $signature, string $publicKey): bool
    {
        $eth = new EthSigRecover();

        return $eth->personal_ecRecover($message, $signature);
    }
}
