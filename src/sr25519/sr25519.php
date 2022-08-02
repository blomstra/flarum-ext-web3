<?php

namespace Blomstra\Web3\sr25519;

use FFI;
use Flarum\Foundation\Paths;

class sr25519 extends \Crypto\sr25519
{
    public function __construct()
    {
        $paths = resolve(Paths::class);

        $this->FFIInstant = FFI::cdef(
            file_get_contents($paths->vendor . "/gmajor/sr25519-bindings/src/Crypto/sr25519_lib.h"),
            __DIR__ . '/../../bindings/sr25519.so'
        );
    }
}
