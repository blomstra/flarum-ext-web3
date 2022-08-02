<?php

namespace Blomstra\Web3;

function ffiIsEnabled(): bool
{
    return extension_loaded('ffi') && ini_get('ffi.enable') === "1";
}
