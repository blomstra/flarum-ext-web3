<?php

namespace Blomstra\Web3\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Api\Serializer\CurrentUserSerializer;
use Flarum\Http\RequestUtil;
use Flarum\User\Exception\NotAuthenticatedException;
use Illuminate\Support\Arr;
use Illuminate\Validation\Factory;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class SetUserEmailController extends AbstractShowController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = CurrentUserSerializer::class;

    /**
     * @var Factory
     */
    protected $validator;

    public function __construct(Factory $validator)
    {
        $this->validator = $validator;
    }

    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $data = Arr::get($request->getParsedBody(), 'data', []);

        $actor->assertRegistered();

        $this->validator->make($data, [
            'email' => [
                'required',
                'email:filter',
                'unique:users,email',
            ]
        ])->validate();

        // They can only set their email if they have a fake email from web3 registration.
        if (! str_contains($actor->email, '@users.noreply.')) {
            throw new NotAuthenticatedException();
        }

        $actor->changeEmail($data['email']);
        $actor->save();
    }
}
