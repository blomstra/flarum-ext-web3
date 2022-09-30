# Web3 Authentication

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/blomstra/web3.svg)](https://packagist.org/packages/blomstra/web3) [![Total Downloads](https://img.shields.io/packagist/dt/blomstra/web3.svg)](https://packagist.org/packages/blomstra/web3)

A [Flarum](http://flarum.org) extension. Web3 EVM & Rust Wallets connection for Flarum.

## Requirements
* FFI PHP extension (Required for Dotsama wallets).
* GMP PHP extension (Required for EVM wallets).
* PHP 8.0+.

## Usage
* Bind accounts from EVM or Dotsama Wallets to your user account by signing your username cryptographically.
* Login to your user account using a bound wallet address by signing your username cryptographically.
* Unbind web3 accounts from your user account at any time.
* Sign up using a web3 account by signing your new username cryptographically.

## Installation

Install with composer:

```sh
composer require blomstra/web3:"*"
```

## Updating

```sh
composer update blomstra/web3
php flarum migrate
php flarum cache:clear
```

## Links

- [Packagist](https://packagist.org/packages/blomstra/web3)
- [GitHub](https://github.com/blomstra/web3)
- [Discuss](https://discuss.flarum.org/d/PUT_DISCUSS_SLUG_HERE)
