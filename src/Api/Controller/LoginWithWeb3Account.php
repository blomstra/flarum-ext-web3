<?php

namespace Blomstra\Web3\Api\Controller;

use Blomstra\Web3\Verifier\VerificationManager;
use Blomstra\Web3\Web3AccountRepository;
use Blomstra\Web3\Web3LoginValidator;
use Flarum\Http\RememberAccessToken;
use Flarum\User\Exception\NotAuthenticatedException;
use Flarum\User\UserRepository;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Support\Arr;
use Illuminate\Validation\ValidationException;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class LoginWithWeb3Account implements RequestHandlerInterface
{
    public function __construct(
        protected Web3LoginValidator    $validator,
        protected Web3AccountRepository $repository,
        protected VerificationManager   $verifiers,
        protected UserRepository        $users
    ) {}

    /**
     * @throws NotAuthenticatedException
     * @throws BindingResolutionException
     * @throws ValidationException
     * @throws \Flarum\Foundation\ValidationException
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $body = $request->getParsedBody();

        $identification = Arr::get($body, 'identification');
        $address = Arr::get($body, 'address');
        $signature = Arr::get($body, 'signature');

        $this->validator->assertValid(compact('identification', 'address', 'signature'));

        // Check that the address exists.
        $account = $this->repository->find($address);

        if (! $account) {
            throw new NotAuthenticatedException();
        }

        $user = $this->users->findByIdentification($identification);

        // Make sure the address is actually tied to the user.
        if (! $user || $user->id !== $account->user_id) {
            throw new NotAuthenticatedException();
        }

        // Check that the signature is valid.
        if (! $this->verifiers->get($account->type)->verify($signature, $identification, $address)) {
            throw new NotAuthenticatedException();
        }

        // Create and return the access token.
        $token = RememberAccessToken::generate($user->id);

        $token->touch($request);

        return new JsonResponse([
            'token' => $token->token,
            'userId' => $user->id,
        ]);
    }
}
