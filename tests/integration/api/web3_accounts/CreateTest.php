<?php

namespace Blomstra\Web3\Tests\integration\api\web3_accounts;

use Blomstra\Web3\C\SchnorrSignaturesBindings;
use Blomstra\Web3\Web3Account;
use Carbon\Carbon;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Sijad\LaravelEcrecover\EthSigRecover;

class CreateTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('blomstra-web3');

        $this->prepareDatabase([
            'users' => [
                $this->normalUser(),
                [
                    'id' => 3,
                    'username' => 'Pelieth is awesome!',
                    'password' => '$2y$10$LO59tiT7uggl6Oe23o/O6.utnF6ipngYjvMvaxo1TciKqBttDNKim', // BCrypt hash for "too-obscure"
                    'email' => 'pelieth@machine.local',
                    'is_email_confirmed' => 1,
                ],
                [
                    'id' => 4,
                    'username' => 'Pelieth',
                    'password' => '$2y$10$LO59tiT7uggl6Oe23o/O6.utnF6ipngYjvMvaxo1TciKqBttDNKim', // BCrypt hash for "too-obscure"
                    'email' => 'pelieth2@machine.local',
                    'is_email_confirmed' => 1,
                ],
            ],
        ]);
    }

    /**
     * @dataProvider canAttachAddressData
     * @test
     */
    public function user_can_attach_a_web3_account_through_a_wallet(int $userId, string $address, string $source, string $type, string $signature)
    {
        $response = $this->send(
            $this->request('POST', '/api/web3/accounts', [
                'authenticatedAs' => $userId,
                'json' => [
                    'data' => [
                        'attributes' => compact('address', 'source', 'type'),
                    ],
                    'meta' => compact('signature'),
                ]
            ])
        );

        $this->assertEquals(201, $response->getStatusCode());
        $this->assertTrue(
            Web3Account::query()
                ->where('user_id', $userId)
                ->where('address', $address)
                ->where('source', $source)
                ->exists()
        );
    }

    /**
     * @dataProvider cannotAttachAddressData
     * @test
     */
    public function user_cannot_attach_a_web3_account_with_false_data(int $userId, string $address, string $source, string $type, string $signature)
    {
        $response = $this->send(
            $this->request('POST', '/api/web3/accounts', [
                'authenticatedAs' => $userId,
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

        $this->assertEquals(422, $response->getStatusCode());
        $this->assertFalse(
            Web3Account::query()
                ->where('user_id', $userId)
                ->where('address', $address)
                ->exists()
        );
    }

    public function canAttachAddressData()
    {
        $sr = new SchnorrSignaturesBindings();
        $polkaPair = $sr->pairFromSeed('fac7959dbfe72f052e5a0c3c8d6530f202b02fd8f9f5ca3580ec8deb7797479e');
        $polkaSignature = $sr->sign($polkaPair[1], $polkaPair[0], "<Bytes>{$this->normalUser()['username']}</Bytes>");

        $ethAddress = "0x583543e8A35E16884d794bc491D46a6349554D7C";
        $ethSignature = "0x5aa21e7110f2015499ad0b16f4af8bf2ecf285c237594b21ffd656eaeff331065e7e54efe41d1b0c40a8a3f47bd77f3077436b0a54f44c8698f48ffe3b6cc4201b";

        return [
            [2, '0x'.$polkaPair[1], 'polkadot-js', 'sr25519', '0x'.$polkaSignature],
            [3, $ethAddress, 'ethereum', 'eth', $ethSignature],
        ];
    }

    public function cannotAttachAddressData()
    {
        $sr = new SchnorrSignaturesBindings();
        $polkaPair = $sr->pairFromSeed('fac7959dbfe72f052e5a0c3c8d6530f202b02fd8f9f5ca3580ec8deb7797479e');
        $polkaSignature = $sr->sign($polkaPair[1], $polkaPair[0], "<Bytes>notactualuser</Bytes>");

        $ethAddress = "0x583543e8A35E16884d794bc491D46a6349554D7C";
        $ethSignature = "0x5aa21e7110f2015499ad0b16f4af8bf2ecf285c237594b21ffd656eaeff331065e7e54efe41d1b0c40a8a3f47bd77f3077436b0a54f44c8698f48ffe3b6cc4201b";

        return [
            'dummy polkadot values' => [2, 'some_random_web3_address', 'polkadot-js', 'sr25519', 'some_wrong_signature'],
            'non matching polkadot signed message' => [2, '0x'.$polkaPair[1], 'polkadot-js', 'sr25519', '0x'.$polkaSignature],
            'dummy eth values' => [3, 'some_random_web3_address', 'ethereum', 'eth', 'some_wrong_signature'],
            'non matching eth signed message' => [4, 'some_random_web3_address', 'ethereum', 'eth', 'some_wrong_signature'],
        ];
    }
}
