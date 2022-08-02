<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Blomstra\Web3\Query;

use Blomstra\Web3\Web3Account;
use Blomstra\Web3\Web3AccountRepository;
use Flarum\Filter\AbstractFilterer;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class Web3AccountFilterer extends AbstractFilterer
{
    /**
     * @var Web3AccountRepository
     */
    protected $web3accounts;

    public function __construct(Web3AccountRepository $web3accounts, array $filters, array $filterMutators)
    {
        parent::__construct($filters, $filterMutators);

        $this->web3accounts = $web3accounts;
    }

    /**
     * @param User $actor
     * @return Builder<Web3Account>
     */
    protected function getQuery(User $actor): Builder
    {
        return $this->web3accounts->query()->whereVisibleTo($actor);
    }
}
