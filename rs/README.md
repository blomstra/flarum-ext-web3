# Schnorr Signatures C Bindings
Builds C bindings for the Schnorr Signatures rust library (only for sr25519 signature verification). Uses [`@polkadot/wasm-crypto`](https://github.com/polkadot-js/wasm)'s `sr25519` verification interface to verify signatures.

## Build
```ssh
$ cargo build --release
```

## Output
* `target/release/libschnorrkelcbindings.h`
* `target/release/libschnorrkelcbindings.so`
