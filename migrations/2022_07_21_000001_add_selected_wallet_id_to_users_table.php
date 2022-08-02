<?php

use Blomstra\Web3\Web3Account;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->foreignIdFor(Web3Account::class, 'selected_wallet_id')->nullable();
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('selected_wallet_id');
        });
    }
];
