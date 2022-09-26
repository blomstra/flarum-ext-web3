<?php

namespace Blomstra\Web3\Support;

class Util
{
    /**
     * Removes starting 0x from a hex string.
     */
    public static function trimHexString(string $hex): string
    {
        if (str_starts_with($hex, '0x')) {
            return substr($hex, 2);
        }

        return $hex;
    }
}
