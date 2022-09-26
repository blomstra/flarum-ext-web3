<?php

namespace Blomstra\Web3\C;

use Blomstra\Web3\Support\Util;
use FFI;

class SchnorrSignaturesBindings
{
    private const RUST_DIST_DIR = __DIR__ . "/../../rs/target/release";

    protected FFI $ffi;

    public function __construct()
    {
        $this->ffi = FFI::cdef(
            file_get_contents(self::RUST_DIST_DIR . "/libschnorrkelcbindings.h"),
            self::RUST_DIST_DIR . '/libschnorrkelcbindings.so'
        );
    }

    /**
     * Verifies sr25519 signed signature with a message.
     *
     * @param string $signature Hex string
     * @param string $message make sure to wrap in `<Bytes>` if message was signed with bytes type.
     * @param string $publicKey Hex string
     * @return bool
     */
    public function verifySignature(string $signature, string $message, string $publicKey): bool
    {
        $signature = Util::trimHexString($signature);
        $publicKey = Util::trimHexString($publicKey);

        try {
            return $this->ffi->verify($signature, $message, $publicKey);
        } catch (\Throwable) {
            return false;
        }
    }

    /**
     * Generate a key pair.
     *
     * @param string $seed
     * @return string[] [private, public]
     */
    public function pairFromSeed(string $seed): array
    {
        $pair = $this->ffi->pair_from_seed($seed);
        $bin = hex2bin($pair);

        return [
            bin2hex(substr($bin, 0, 64)),
            bin2hex(substr($bin, 64))
        ];
    }

    /**
     * Verifies sr25519 signed signature with a message.
     *
     * @param string $pubkey Hex string
     * @param string $secret Hex string
     * @param string $message
     * @return string
     */
    public function sign(string $pubkey, string $secret, string $message): string
    {
        return $this->ffi->sign($pubkey, $secret, $message);
    }
}
