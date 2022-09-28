<?php

namespace Blomstra\Web3\Tests\integration\api\web3_accounts;

use Carbon\Carbon;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;

class DeleteTest extends TestCase
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
            'web3_accounts' => [
                ['id' => 1, 'user_id' => 2, 'address' => 'some_address1', 'source' => 'polkadot', 'type' => 'sr25519', 'attached_at' => Carbon::now()],
                ['id' => 2, 'user_id' => 1, 'address' => 'some_address2', 'source' => 'polkadot', 'type' => 'sr25519', 'attached_at' => Carbon::now()],
            ]
        ]);
    }

    /** @test */
    public function user_can_disconnect_a_wallet_account()
    {
        $response = $this->send(
            $this->request('DELETE', '/api/web3/accounts/1', [
                'authenticatedAs' => 2,
            ])
        );

        $this->assertEquals(204, $response->getStatusCode());
    }

    /** @test */
    public function user_cannot_disconnect_another_users_wallet_account()
    {
        $response = $this->send(
            $this->request('DELETE', '/api/web3/accounts/2', [
                'authenticatedAs' => 2,
            ])
        );

        $this->assertEquals(403, $response->getStatusCode());
    }
}
