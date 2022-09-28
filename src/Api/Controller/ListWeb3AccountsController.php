<?php

namespace Blomstra\Web3\Api\Controller;

use Blomstra\Web3\Web3AccountRepository;
use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Blomstra\Web3\Api\Serializer\Web3AccountSerializer;

class ListWeb3AccountsController extends AbstractListController
{
    public $serializer = Web3AccountSerializer::class;

    public function __construct(
        protected Web3AccountRepository $repository
    ) {}

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);

        return $this->repository->query()->whereVisibleTo($actor)->get();
    }
}
