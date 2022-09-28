<?php

namespace Blomstra\Web3\Tests\integration\api\authentication;

use Blomstra\Web3\C\SchnorrSignaturesBindings;
use Flarum\Http\AccessToken;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;

class LoginTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('blomstra-web3-wallets');

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
    public function user_with_attached_address_can_login_by_signing_username_cyptographically()
    {
        $sr = new SchnorrSignaturesBindings();
        $pair = $sr->pairFromSeed('fac7959dbfe72f052e5a0c3c8d6530f202b02fd8f9f5ca3580ec8deb7797479e');
        $signature = $sr->sign($pair[1], $pair[0], "<Bytes>{$this->normalUser()['username']}</Bytes>");

        $response = $this->send(
            $this->requestWithCsrfToken(
                $this->request('POST', '/api/web3/token', [
                    'json' => [
                        'identification' => $this->normalUser()['username'],
                        'address' => '0x'.$pair[1],
                        'signature' => '0x'.$signature,
                    ]
                ])
            )
        );

        $this->assertEquals(200, $response->getStatusCode());

        // The response body should contain the user ID...
        $body = (string) $response->getBody();
        $this->assertJson($body);

        $data = json_decode($body, true);
        $this->assertEquals(2, $data['userId']);

        // ...and an access token belonging to this user.
        $this->assertEquals(2, AccessToken::whereToken($data['token'])->firstOrFail()->user_id);
    }

    /** @test */
    public function user_with_attached_address_cant_login_by_fake_signing_username_cyptographically()
    {
        $response = $this->send(
            $this->requestWithCsrfToken(
                $this->request('POST', '/api/web3/token', [
                    'json' => [
                        'identification' => $this->normalUser()['username'],
                        'address' => '0x0000000000000000',
                        'signature' => '0x0000000000000000',
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
        $this->assertEquals('not_authenticated', $data['errors'][0]['code']);
    }

    /** @test */
    public function user_with_attached_address_can_login_with_normal_credentials_if_any()
    {
        $response = $this->send(
            $this->request('POST', '/api/token', [
                'json' => [
                    'identification' => $this->normalUser()['username'],
                    'password' => 'too-obscure',
                ]
            ])
        );

        $this->assertEquals(200, $response->getStatusCode());

        // The response body should contain the user ID...
        $body = (string) $response->getBody();
        $this->assertJson($body);

        $data = json_decode($body, true);
        $this->assertEquals(2, $data['userId']);

        // ...and an access token belonging to this user.
        $this->assertEquals(2, AccessToken::whereToken($data['token'])->firstOrFail()->user_id);
    }
}
