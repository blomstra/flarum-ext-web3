<?php

namespace Blomstra\Web3\Query;

use Flarum\Filter\FilterInterface;
use Flarum\Filter\FilterState;

class SourceFilter implements FilterInterface
{
    public function getFilterKey(): string
    {
        return "source";
    }

    public function filter(FilterState $filterState, string $filterValue, bool $negate)
    {
        $filterState
            ->getQuery()
            ->where('source', $negate ? '!=' : '=', $filterValue);
    }
}
