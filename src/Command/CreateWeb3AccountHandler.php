<?php

namespace Blomstra\Web3\Command;

use Blomstra\Web3\Verificator\PolkadotSignatureVerificator;
use Blomstra\Web3\Verificator\SignedMessageVerificator;
use Blomstra\Web3\Verificator\Web3VerificatorManager;
use Blomstra\Web3\Web3Account;
use Flarum\Foundation\ValidationException;
use Illuminate\Support\Arr;
use Blomstra\Web3\Web3AccountValidator;
use Tuupola\Base58;

class CreateWeb3AccountHandler
{
    /**
     * @var Web3AccountValidator
     */
    protected $validator;

    /**
     * @var Web3VerificatorManager
     */
    protected $verificators;

    public function __construct(Web3AccountValidator $validator, Web3VerificatorManager $verificators)
    {
        $this->validator = $validator;
        $this->verificators = $verificators;
    }

    /**
     * @throws ValidationException|\Illuminate\Validation\ValidationException
     */
    public function handle(CreateWeb3Account $command): Web3Account
    {
        $actor = $command->actor;
        $payload = $command->payload;

        $account = Web3Account::create(
            $actor,
            Arr::get($payload, 'data.attributes.address'),
            Arr::get($payload, 'data.attributes.source'),
            Arr::get($payload, 'data.attributes.type')
        );

        $this->validator->assertValid($account->getAttributes());

        // The user must sign their username cryptographically and provide the signature.
        if (! $signature = Arr::get($payload, 'meta.signature')) {
            throw new ValidationException(['No signature provided. You must sign your username cryptographically.']);
        }

        // @TODO: figure out backend verification.
        // Address to public key
        // $publicKey = (new Base58(['characters' => Base58::BITCOIN]))->decode($account->address);
        // $verficator = $this->verificators->get($account->type);
        // Verify that the user does in fact own the account.
        // if (! $verficator->verifySignature($actor->username, $signature, $publicKey)) {
        //     throw new ValidationException([
        //         'signature' => $this->translator->trans('blomstra-web3-wallets.forum.connect-wallet-modal.signature-invalid'),
        //     ]);
        // }

        // Signed Message verified so we can save.
        $account->save();

        $actor->selected_wallet_id = $account->id;
        $actor->save();

        return $account;
    }
}
