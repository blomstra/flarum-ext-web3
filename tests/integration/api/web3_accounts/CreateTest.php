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

    /**
     * @dataProvider canAttachAddressData
     * @test
     */
    public function user_can_attach_a_web3_account_through_a_wallet(string $address, string $source, string $type, string $signature)
    {
        $response = $this->send(
            $this->request('POST', '/api/web3/accounts', [
                'authenticatedAs' => 2,
                'json' => [
                    'data' => [
                        'attributes' => compact('address', 'source', 'type'),
                    ],
                    'meta' => [
                        'signature' => $signature,
                    ],
                ]
            ])
        );

        $this->assertEquals(201, $response->getStatusCode());
        $this->assertTrue(
            Web3Account::query()
                ->where('user_id', 2)
                ->where('address', 'some_random_web3_address')
                ->where('source', 'polkadot')
                ->exists()
        );
    }

    /**
     * @dataProvider cannotAttachAddressData
     * @test
     */
    public function user_cannot_attach_a_web3_account_with_false_data(string $address, string $source, string $type, string $signature)
    {
        $response = $this->send(
            $this->request('POST', '/api/web3/accounts', [
                'authenticatedAs' => 2,
                'json' => [
                    'data' => [
                        'attributes' => compact('address', 'source', 'type'),
                    ],
                    'meta' => [
                        'signature' => $signature,
                    ],
                ]
            ])
        );

        $this->assertEquals(403, $response->getStatusCode());
        $this->assertFalse(
            Web3Account::query()
                ->where('user_id', 2)
                ->where('address', 'some_random_web3_address')
                ->exists()
        );
    }

    public function canAttachAddressData()
    {
        // @TODO use real data
        return [
            ['some_random_web3_address', 'polkadot', 'sr25519', 'some_signature'],
            ['some_random_web3_address', 'ethereum', 'eth', 'some_signature'],
        ];
    }

    public function cannotAttachAddressData()
    {
        // @TODO use real data
        return [
            ['some_random_web3_address', 'polkadot', 'sr25519', 'some_wrong_signature'],
            ['some_random_web3_address', 'ethereum', 'eth', 'some_wrong_signature'],
        ];
    }
}
