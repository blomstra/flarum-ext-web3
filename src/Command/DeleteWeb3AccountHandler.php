<?php

namespace Blomstra\Web3\Command;

use Blomstra\Web3\Web3Account;
use Blomstra\Web3\Web3AccountRepository;

class DeleteWeb3AccountHandler
{
    public function __construct(
        protected Web3AccountRepository $repository
    ) {}

    /**
     * @throws \Flarum\User\Exception\PermissionDeniedException
     */
    public function handle(DeleteWeb3Account $command): Web3Account
    {
        $actor = $command->actor;

        /** @var Web3Account $account */
        $account = $this->repository->query()->findOrFail($command->accountId);

        $actor->assertCan('disconnect', $account);

        $account->delete();

        return $account;
    }
}
