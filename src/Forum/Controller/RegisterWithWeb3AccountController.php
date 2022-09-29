<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Blomstra\Web3\Forum\Controller;

use Blomstra\Web3\Verifier\VerificationManager;
use Blomstra\Web3\Web3Account;
use Blomstra\Web3\Web3SignupValidator;
use Carbon\Carbon;
use Flarum\Api\Client;
use Flarum\Http\RememberAccessToken;
use Flarum\Http\Rememberer;
use Flarum\Http\SessionAuthenticator;
use Flarum\User\Exception\NotAuthenticatedException;
use Flarum\User\RegistrationToken;
use Flarum\User\User;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Stream;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;

class RegisterWithWeb3AccountController implements RequestHandlerInterface
{
    public function __construct(
        protected Client $api,
        protected SessionAuthenticator $authenticator,
        protected Rememberer $rememberer,
        protected Web3SignupValidator $validator,
        protected ConnectionInterface $db
    ) {}

    public function handle(Request $request): ResponseInterface
    {
        $data = $request->getParsedBody();

        $this->validator->assertValid($data);

        $response = null;

        $this->db->transaction(function () use ($request, $data, &$response) {
            // Create registration token.
            $token = RegistrationToken::generate('', '', [], []);
            $token->save();

            $response = $this->api
                ->withParentRequest($request)
                ->withBody([
                    'data' => [
                        'attributes' => array_merge(
                            Arr::only($data, ['username', 'email']),
                            ['token' => $token->token],
                        )
                    ]
                ])
                ->post('/users');

            $body = json_decode($response->getBody());

            if (isset($body->data)) {
                $actor = User::find($body->data->id);

                // Create web3 account.
                // This will check if the signature is valid.
                // If it isn't, the transaction fails.
                $web3Response = $this->api
                    ->withParentRequest($request)
                    ->withActor($actor)
                    ->withBody([
                        'data' => [
                            'attributes' => [
                                'address' => $data['address'],
                                'source' => $data['source'],
                                'type' => $data['type'],
                            ],
                        ],
                        'meta' => [
                            'signature' => $data['signature'],
                        ],
                    ])
                    ->post('/web3/accounts');

                $web3Body = json_decode($web3Response->getBody());

                if (isset($web3Body->data)) {
                    $token = RememberAccessToken::generate($actor->id);

                    $session = $request->getAttribute('session');
                    $this->authenticator->logIn($session, $token);

                    $response = $this->rememberer->remember($response, $token);
                } else {
                    $response = $web3Response;
                }
            }
        });

        return $response;
    }
}
