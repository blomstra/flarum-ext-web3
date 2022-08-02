<?php

namespace Blomstra\Web3\Api\Controller;

use Blomstra\Web3\Query\Web3AccountFilterer;
use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Flarum\Query\QueryCriteria;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Blomstra\Web3\Api\Serializer\Web3AccountSerializer;

class ListWeb3AccountsController extends AbstractListController
{
    public $serializer = Web3AccountSerializer::class;

    /**
     * @var Web3AccountFilterer
     */
    protected $filterer;

    /**
     * @param Web3AccountFilterer $filterer
     */
    public function __construct(Web3AccountFilterer $filterer)
    {
        $this->filterer = $filterer;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $filters = $this->extractFilter($request);
        $criteria = new QueryCriteria($actor, $filters);

        return $this->filterer->filter($criteria, 50)->getResults();
    }
}
