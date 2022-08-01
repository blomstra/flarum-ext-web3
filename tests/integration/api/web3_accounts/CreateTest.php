<?php

namespace Blomstra\Web3\Tests\integration\api\web3_accounts;

use Blomstra\Web3\Web3Account;
use Carbon\Carbon;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;

class CreateTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('blomstra-web3-wallets');

        $this->prepareDatabase([
            'users' => [
                $this->normalUser()
            ],
        ]);
    }

    /** @test */
    public function user_can_attach_a_web3_account_through_a_wallet()
    {
        $response = $this->send(
            $this->request('/POST', '/api/web3/accounts', [
                'authenticatedAs' => 2,
                'json' => [
                    'data' => [
                        'attributes' => [
                            'address' => 'some_random_web3_address',
                            'source' => 'polkadot',
                            'type' => 'sr25519',
                        ],
                    ],
                    'meta' => [
                        'signature' => 'some_signature',
                    ],
                ]
            ])
        );

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertTrue(
            Web3Account::query()
                ->where('user_id', 2)
                ->where('address', 'some_random_web3_address')
                ->where('source', 'polkadot')
                ->exists()
        );
    }

    /** @test */
    public function user_can_attach_a_web3_account_through_different_wallets()
    {
        foreach (['polkadot', 'ethereum'] as $source) {
            $response = $this->send(
                $this->request('/POST', '/api/web3/accounts', [
                    'authenticatedAs' => 2,
                    'json' => [
                        'data' => [
                            'attributes' => [
                                'address' => 'some_random_web3_address',
                                'source' => $source,
                                'type' => 'sr25519',
                            ],
                        ],
                        'meta' => [
                            'signature' => 'some_signature',
                        ],
                    ]
                ])
            );

            $this->assertEquals(200, $response->getStatusCode());
            $this->assertTrue(
                Web3Account::query()
                    ->where('user_id', 2)
                    ->where('address', 'some_random_web3_address')
                    ->where('source', $source)
                    ->exists()
            );
        }
    }

    /** @test */
    public function user_cannot_attach_a_web3_account_with_falsified_signature()
    {
        $response = $this->send(
            $this->request('/POST', '/api/web3/accounts', [
                'authenticatedAs' => 2,
                'json' => [
                    'data' => [
                        'attributes' => [
                            'address' => 'some_random_web3_address',
                            'source' => 'polkadot',
                            'type' => 'sr25519',
                        ],
                    ],
                    'meta' => [
                        'signature' => 'some_fake_signature',
                    ],
                ]
            ])
        );

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertFalse(
            Web3Account::query()
                ->where('user_id', 2)
                ->where('address', 'some_random_web3_address')
                ->exists()
        );
    }
}
