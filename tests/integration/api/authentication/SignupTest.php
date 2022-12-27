<?php

namespace Blomstra\Web3\Tests\integration\api\authentication;

use Blomstra\Web3\C\SchnorrSignaturesBindings;
use Flarum\Http\AccessToken;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;

/**
 * @TODO allow-sign-up setting logic tests
 */
class SignupTest  extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('blomstra-web3');

        $pair = (new SchnorrSignaturesBindings())->pairFromSeed('fac7959dbfe72f052e5a0c3c8d6530f202b02fd8f9f5ca3580ec8deb7797479e');

        $this->prepareDatabase([
            'users' => [
                $this->normalUser(),
            ],
            'web3_accounts' => [
                ['id' => 1, 'user_id' => 2, 'address' => '0x'.$pair[1], 'source' => 'polkadot-js', 'type' => 'sr25519'],
            ]
        ]);
    }

    /** @test */
    public function can_signup_by_signing_username_cyptographically()
    {
        $sr = new SchnorrSignaturesBindings();
        $pair = $sr->pairFromSeed('dac7959dbae72f052e5a0c3c8d6530f202b02fd8f9f5ca1580ec8deb7797479e');
        $signature = $sr->sign($pair[1], $pair[0], "<Bytes>potat</Bytes>");

        $response = $this->send(
            $this->requestWithCsrfToken(
                $this->request('POST', '/web3/register', [
                    'json' => [
                        'username' => 'potat',
                        'email' => 'potat@machine.local',
                        'address' => '0x'.$pair[1],
                        'signature' => '0x'.$signature,
                        'source' => 'polkadot-js',
                        'type' => 'sr25519',
                    ]
                ])
            )
        );

        $this->assertEquals(201, $response->getStatusCode());

        // The response body should contain the user ID...
        $body = (string) $response->getBody();
        $this->assertJson($body);
    }

    /** @test */
    public function cant_signup_by_fake_signing_username_cyptographically()
    {
        $response = $this->send(
            $this->requestWithCsrfToken(
                $this->request('POST', '/web3/register', [
                    'json' => [
                        'username' => 'potat',
                        'email' => 'potat@machine.local',
                        'address' => '0x0000000000000000',
                        'signature' => '0x0000000000000000',
                        'source' => 'polkadot-js',
                        'type' => 'sr25519',
                    ]
                ])
            )
        );

        // HTTP 401 signals an authentication problem
        $this->assertEquals(401, $response->getStatusCode());

        // The response body should contain an error code
        $body = (string) $response->getBody();
        $this->assertJson($body);

        $data = json_decode($body, true);
        $this->assertCount(1, $data['errors']);
        $this->assertEquals('invalid_crypto_signature', $data['errors'][0]['code']);
    }

    /** @test */
    public function cant_signup_with_an_existing_address()
    {
        $pair = (new SchnorrSignaturesBindings())->pairFromSeed('fac7959dbfe72f052e5a0c3c8d6530f202b02fd8f9f5ca3580ec8deb7797479e');

        $response = $this->send(
            $this->requestWithCsrfToken(
                $this->request('POST', '/web3/register', [
                    'json' => [
                        'username' => 'potat',
                        'email' => 'potat@machine.local',
                        'address' => "0x$pair[1]",
                        'signature' => "0x$pair[0]",
                        'source' => 'polkadot-js',
                        'type' => 'sr25519',
                    ]
                ])
            )
        );

        // HTTP 401 signals an authentication problem
        $this->assertEquals(422, $response->getStatusCode());

        // The response body should contain an error code
        $body = (string) $response->getBody();
        $this->assertJson($body);
    }

    /** @test */
    public function can_signup_without_email()
    {
        $this->setting('blomstra-web3.signup-with-email', false);

        $sr = new SchnorrSignaturesBindings();
        $pair = $sr->pairFromSeed('dac7959dbae72f052e5a0c3c8d6530f202b02fd8f9f5ca1580ec8deb7797479e');
        $signature = $sr->sign($pair[1], $pair[0], "<Bytes>potat</Bytes>");

        $response = $this->send(
            $this->requestWithCsrfToken(
                $this->request('POST', '/web3/register', [
                    'json' => [
                        'username' => 'potat',
                        'address' => '0x'.$pair[1],
                        'signature' => '0x'.$signature,
                        'source' => 'polkadot-js',
                        'type' => 'sr25519',
                    ]
                ])
            )
        );

        $this->assertEquals(201, $response->getStatusCode());

        $body = (string) $response->getBody();
        $this->assertJson($body);
        $userId = json_decode($body, true)['data']['id'];

        // Assert that the user's email was set to confirmed
        $this->assertTrue(
            (bool) User::query()->findOrFail($userId)->is_email_confirmed
        );
    }
}
