<?php

namespace Blomstra\Web3\Tests\integration\api\web3_accounts;

use Carbon\Carbon;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Illuminate\Support\Arr;

class ListTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('blomstra-web3');

        $this->prepareDatabase([
            'users' => [
                $this->normalUser(),
                ['id' => 3, 'username' => 'ian', 'email' => 'ian@machine.local', 'is_email_confirmed' => 1],
                ['id' => 4, 'username' => 'david', 'email' => 'david@machine.local', 'is_email_confirmed' => 1],
            ],
            'web3_accounts' => [
                ['id' => 1, 'user_id' => 2, 'address' => 'some_address1', 'source' => 'polkadot', 'type' => 'sr25519', 'attached_at' => Carbon::now()],
                ['id' => 2, 'user_id' => 3, 'address' => 'some_address2', 'source' => 'ethereum', 'type' => 'sr25519', 'attached_at' => Carbon::now()],
                ['id' => 3, 'user_id' => 2, 'address' => 'some_address3', 'source' => 'polkadot', 'type' => 'sr25519', 'attached_at' => Carbon::now()],
                ['id' => 4, 'user_id' => 3, 'address' => 'some_address4', 'source' => 'ethereum', 'type' => 'eth', 'attached_at' => Carbon::now()],
                ['id' => 5, 'user_id' => 4, 'address' => 'some_address5', 'source' => 'polkadot', 'type' => 'sr25519', 'attached_at' => Carbon::now()],
                ['id' => 6, 'user_id' => 2, 'address' => 'some_address6', 'source' => 'ethereum', 'type' => 'eth', 'attached_at' => Carbon::now()],
            ],
        ]);
    }

    /**
     * @dataProvider allowedUsersToView
     * @test
     */
    public function user_can_only_view_his_own_attached_web3_addresses(int $authenticatedAs, array $addressIds)
    {
        $response = $this->send(
            $this->request('GET', '/api/web3/accounts', compact('authenticatedAs'))
        );

        $body = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEqualsCanonicalizing($addressIds, Arr::pluck($body['data'], 'id'));
    }

    public function allowedUsersToView(): array
    {
        return [
            // [user_id, address_ids_visible]
            [1, []],
            [2, [1, 3, 6]],
            [3, [2, 4]],
            [4, [5]]
        ];
    }
}
