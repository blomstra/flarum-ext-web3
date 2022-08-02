<?php

namespace Blomstra\Web3\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Blomstra\Web3\Command\CreateWeb3Account;
use Blomstra\Web3\Api\Serializer\Web3AccountSerializer;

class CreateWeb3AccountController extends AbstractCreateController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = Web3AccountSerializer::class;

    /**
     * @var Dispatcher
     */
    protected $bus;

    /**
     * @param Dispatcher $bus
     */
    public function __construct(Dispatcher $bus)
    {
        $this->bus = $bus;
    }


    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $payload = $request->getParsedBody();

        return $this->bus->dispatch(
            new CreateWeb3Account($actor, $payload)
        );
    }
}
