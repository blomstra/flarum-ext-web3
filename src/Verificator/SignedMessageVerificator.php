<?php

namespace Blomstra\Web3\Verificator;

interface SignedMessageVerificator
{
    public function verifySignature(string $message, string $signature, string $publicKey): bool;
}
