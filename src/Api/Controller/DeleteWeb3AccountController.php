<?php

namespace Blomstra\Web3\Api\Controller;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Blomstra\Web3\Command\DeleteWeb3Account;
use Blomstra\Web3\Api\Serializer\Web3AccountSerializer;

class DeleteWeb3AccountController extends AbstractDeleteController
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
    protected function delete(ServerRequestInterface $request)
    {
        $modelId = Arr::get($request->getQueryParams(), 'id');
        $actor = RequestUtil::getActor($request);
        $input = $request->getParsedBody();

        $this->bus->dispatch(
            new DeleteWeb3Account($modelId, $actor, $input)
        );
    }
}
