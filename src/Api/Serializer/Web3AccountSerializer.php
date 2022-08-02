<?php

namespace Blomstra\Web3\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Blomstra\Web3\Web3Account;
use InvalidArgumentException;

class Web3AccountSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'web3-accounts';

    /**
     * {@inheritdoc}
     *
     * @param Web3Account $model
     * @throws InvalidArgumentException
     */
    protected function getDefaultAttributes($model)
    {
        if (! ($model instanceof Web3Account)) {
            throw new InvalidArgumentException(
                get_class($this).' can only serialize instances of '.Web3Account::class
            );
        }

        return [
            'address' => $model->address,
            'source' => $model->source,
            'type' => $model->type,
        ];
    }
}
