# Web3

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

## Screenshots
![bound wallets list](https://user-images.githubusercontent.com/20267363/199210040-c1bcf4b0-dd6b-4cc4-b560-14eef1ae2b06.png)
![admin settings](https://user-images.githubusercontent.com/20267363/199210018-c3a0256d-c300-44cd-8bbe-5b239127eb22.png)
![sign up modal](https://user-images.githubusercontent.com/20267363/199210025-ef6feeb6-5b99-4c19-af53-aa7bb0fe43f7.png)
![login modal](https://user-images.githubusercontent.com/20267363/199210029-4d9b4115-c25d-4076-9db3-e750990673ca.png)
![evm wallets modal](https://user-images.githubusercontent.com/20267363/199210032-59b281ae-42b0-400f-a393-149677c31d36.png)
![polkadot wallets modal](https://user-images.githubusercontent.com/20267363/199210039-67d0d139-a31e-4d40-80ba-11b5962b9fc9.png)

## Installation

Install with composer:

```sh
composer require blomstra/web3:"*"
php flarum assets:publish
```

## Updating

```sh
composer update blomstra/web3
php flarum migrate
php flarum cache:clear
php flarum assets:publish
```

## Links

- [Packagist](https://packagist.org/packages/blomstra/web3)
- [GitHub](https://github.com/blomstra/web3)
- [Discuss](https://discuss.flarum.org/d/PUT_DISCUSS_SLUG_HERE)
