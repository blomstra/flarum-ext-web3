<?php

namespace Blomstra\Web3;

use Blomstra\Web3\Verifier\VerificationManager;
use Flarum\Foundation\AbstractServiceProvider;
use Illuminate\Contracts\Container\Container;

class Web3ServiceProvider extends AbstractServiceProvider
{
    public function boot(Container $container)
    {
        VerificationManager::setContainer($container);
    }
}
