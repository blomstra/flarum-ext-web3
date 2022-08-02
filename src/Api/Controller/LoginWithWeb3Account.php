<?php

namespace Blomstra\Web3\Api\Controller;

use Blomstra\Web3\Verificator\Web3VerificatorManager;
use Blomstra\Web3\Web3AccountRepository;
use Blomstra\Web3\Web3LoginValidator;
use Flarum\Http\RememberAccessToken;
use Flarum\Http\SessionAccessToken;
use Flarum\User\Exception\NotAuthenticatedException;
use Flarum\User\UserRepository;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class LoginWithWeb3Account implements RequestHandlerInterface
{
    /**
     * @var Web3LoginValidator
     */
    protected $validator;

    /**
     * @var Web3AccountRepository
     */
    protected $repository;

    /**
     * @var Web3VerificatorManager
     */
    protected $verificators;

    /**
     * @var UserRepository
     */
    protected $users;

    public function __construct(
        Web3LoginValidator $validator,
        Web3AccountRepository $repository,
        Web3VerificatorManager $verificators,
        UserRepository $users)
    {
        $this->validator = $validator;
        $this->repository = $repository;
        $this->verificators = $verificators;
        $this->users = $users;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $body = $request->getParsedBody();

        $username = Arr::get($body, 'identification');
        $address = Arr::get($body, 'address');
        $signature = Arr::get($body, 'signature');

        $this->validator->assertValid(compact('username', 'address', 'signature'));

        // Check that the (address, source) pair exists.
        $account = $this->repository->findOrFail($address);

        // Check that the signature is valid.
        if (! $this->verificators->get($account->type)->verifySignature($username, $signature, $address)) {
            throw new NotAuthenticatedException();
        }

        $user = $this->users->findOrFailByUsername($username);

        // Create and return the access token.
        if (Arr::get($body, 'remember')) {
            $token = RememberAccessToken::generate($user->id);
        } else {
            $token = SessionAccessToken::generate($user->id);
        }

        $token->touch($request);

        return new JsonResponse([
            'userId' => $user->id,
            'token' => $token->toJson(),
        ]);
    }
}
