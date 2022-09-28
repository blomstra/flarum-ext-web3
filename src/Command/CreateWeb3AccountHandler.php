<?php

namespace Blomstra\Web3\Command;

use Blomstra\Web3\Verifier\VerificationManager;
use Blomstra\Web3\Web3Account;
use Carbon\Carbon;
use Flarum\Foundation\ValidationException;
use Illuminate\Contracts\Translation\Translator;
use Illuminate\Support\Arr;
use Blomstra\Web3\Web3AccountValidator;

class CreateWeb3AccountHandler
{
    public function __construct(
        protected Web3AccountValidator $validator,
        protected VerificationManager $verifiers,
        protected Translator $translator
    )
    {}

    /**
     * @throws ValidationException|\Illuminate\Validation\ValidationException
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
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

        // Verify that the user does in fact own the account.
        $isValid = $this->verifiers
            ->get($account->type)
            ->verify($signature, $actor->username, $account->address);

        if (! $isValid) {
            throw new ValidationException([
                'signature' => $this->translator->trans('blomstra-web3-wallets.forum.connect-wallet-modal.signature-invalid'),
            ]);
        }

        // Update last verification time.
        $account->last_verified_at = Carbon::now();

        // Signed Message verified so we can save.
        $account->save();
        $actor->save();

        return $account;
    }
}
