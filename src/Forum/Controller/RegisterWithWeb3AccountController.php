<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Blomstra\Web3\Forum\Controller;

use Flarum\Api\Client;
use Flarum\Http\RememberAccessToken;
use Flarum\Http\Rememberer;
use Flarum\Http\SessionAuthenticator;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Exception\NotAuthenticatedException;
use Flarum\User\RegistrationToken;
use Flarum\User\User;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Support\Arr;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Throwable;

class RegisterWithWeb3AccountController implements RequestHandlerInterface
{
    public function __construct(
        protected Client $api,
        protected SessionAuthenticator $authenticator,
        protected Rememberer $rememberer,
        protected ConnectionInterface $db,
        protected SettingsRepositoryInterface $settings
    ) {}

    public function handle(Request $request): ResponseInterface
    {
        if (! $this->settings->get('blomstra-web3.allow-sign-up')) {
            throw new NotAuthenticatedException();
        }

        $data = $request->getParsedBody();

        $this->db->beginTransaction();

        try {
            // Create registration token.
            $token = RegistrationToken::generate('', '', [], []);
            $token->save();

            // Our extension doesn't abide by `allow_sign_up` setting.
            // So we temporarily make sure it's ON.
            $initialAllowSignUpValue = $this->settings->get('allow_sign_up');
            $this->settings->set('allow_sign_up', true);

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

            // Reset `allow_sign_up`
            $this->settings->set('allow_sign_up', $initialAllowSignUpValue);

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

                    $this->db->commit();
                } else {
                    $response = $web3Response;
                    $this->db->rollBack();
                }
            }
        } catch (Throwable $e) {
            $this->db->rollBack();
            throw $e;
        }

        return $response;
    }
}
