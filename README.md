# Web3 Authentication

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/blomstra/web3-wallets.svg)](https://packagist.org/packages/blomstra/web3-wallets) [![Total Downloads](https://img.shields.io/packagist/dt/blomstra/web3-wallets.svg)](https://packagist.org/packages/blomstra/web3-wallets)

A [Flarum](http://flarum.org) extension. Web3 EVM & Rust Wallets connection for Flarum.

## Requirements
* FFI PHP extension.
* GMP PHP extension.
* PHP 8.0+.

## Usage
* Bind accounts from Evm or Dotsama Wallets to your user account by signing your username cryptographically.
* Login to your user account using a bound wallet address by signing your username cryptographically.
* Unbind web3 accounts from your user account at any time.

## Installation

Install with composer:

```sh
composer require blomstra/web3-wallets:"*"
```

## Updating

```sh
composer update blomstra/web3-wallets
php flarum migrate
php flarum cache:clear
```

## Links

- [Packagist](https://packagist.org/packages/blomstra/web3-wallets)
- [GitHub](https://github.com/blomstra/web3-wallets)
- [Discuss](https://discuss.flarum.org/d/PUT_DISCUSS_SLUG_HERE)
