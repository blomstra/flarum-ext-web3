<?php

use Flarum\Database\Migration;
use Flarum\User\User;
use Illuminate\Database\Schema\Blueprint;

return Migration::createTable(
    'web3_accounts',
    function (Blueprint $table) {
        $table->increments('id');
        $table->foreignIdFor(User::class);
        $table->string('address', 80)->unique();
        $table->string('source');
        $table->string('type');
        $table->timestamp('attached_at')->nullable();
        $table->timestamp('last_verified_at')->nullable();
    }
);

