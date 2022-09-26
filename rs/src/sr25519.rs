// Copyright 2022 Blomstra LTD
// SPDX-License-Identifier: Apache-2.0
// Copyright 2019-2022 @polkadot/wasm-crypto authors & contributors
// Copyright 2019 Paritytech via https://github.com/paritytech/schnorrkel-js/
//
// Originally developed (as a fork) in https://github.com/polkadot-js/schnorrkel-js/
// which was adpated from the initial https://github.com/paritytech/schnorrkel-js/
// forked at commit eff430ddc3090f56317c80654208b8298ef7ab3f

use schnorrkel::{PublicKey, Signature, MiniSecretKey, ExpansionMode, SecretKey};

// We must make sure that this is the same as declared in the substrate source code.
const CTX: &'static [u8] = b"substrate";

/// Generate a key pair.
///
/// * seed: UIntArray with 32 element
///
/// returned vector is the concatenation of first the private key (64 bytes)
/// followed by the public key (32) bytes.
pub fn ext_sr_from_seed(seed: &[u8]) -> Vec<u8> {
    match MiniSecretKey::from_bytes(seed) {
        Ok(s) => s
          .expand_to_keypair(ExpansionMode::Ed25519)
          .to_half_ed25519_bytes()
          .to_vec(),
        _ => panic!("Invalid seed provided.")
    }
}

/// Sign a message
///
/// The combination of both public and private key must be provided.
/// This is effectively equivalent to a keypair.
///
/// * pubkey: UIntArray with 32 element
/// * private: UIntArray with 64 element
/// * message: Arbitrary length UIntArray
///
/// * returned vector is the signature consisting of 64 bytes.
pub fn ext_sr_sign(pubkey: &[u8], secret: &[u8], message: &[u8]) -> Vec<u8> {
    match (SecretKey::from_ed25519_bytes(secret), PublicKey::from_bytes(pubkey)) {
        (Ok(s), Ok(k)) => s
          .sign_simple(CTX, message, &k)
          .to_bytes()
          .to_vec(),
        _ => panic!("Invalid secret or pubkey provided.")
    }
}

/// Verify a message and its corresponding against a public key;
///
/// * signature: UIntArray with 64 element
/// * message: Arbitrary length UIntArray
/// * pubkey: UIntArray with 32 element
pub fn ext_sr_verify(signature: &[u8], message: &[u8], pubkey: &[u8]) -> bool {
    match (Signature::from_bytes(signature), PublicKey::from_bytes(pubkey)) {
        (Ok(s), Ok(k)) => k
          .verify_simple(CTX, message, &s)
          .is_ok(),
        _ => false
    }
}

#[cfg(test)]
pub mod tests {
    extern crate schnorrkel;

    use schnorrkel::{SIGNATURE_LENGTH, KEYPAIR_LENGTH, SECRET_KEY_LENGTH};
    use super::*;
    use hex_literal::hex;

    fn generate_random_seed() -> Vec<u8> {
        (0..32).map(|_| rand::random::<u8>()).collect()
    }

    #[test]
    fn can_new_keypair() {
        let seed = generate_random_seed();
        let keypair = ext_sr_from_seed(seed.as_slice());

        assert!(keypair.len() == KEYPAIR_LENGTH);
    }

    #[test]
    fn creates_pair_from_known_seed() {
        let seed = hex!("fac7959dbfe72f052e5a0c3c8d6530f202b02fd8f9f5ca3580ec8deb7797479e");
        let expected = hex!("46ebddef8cd9bb167dc30878d7113b7e168e6f0646beffd77d69d39bad76b47a");
        let keypair = ext_sr_from_seed(&seed);
        let public = &keypair[SECRET_KEY_LENGTH..KEYPAIR_LENGTH];

        assert_eq!(public, expected);
    }

    #[test]
    fn can_sign_message() {
        let seed = generate_random_seed();
        let keypair = ext_sr_from_seed(seed.as_slice());
        let private = &keypair[0..SECRET_KEY_LENGTH];
        let public = &keypair[SECRET_KEY_LENGTH..KEYPAIR_LENGTH];
        let message = b"this is a message";
        let signature = ext_sr_sign(public, private, message);

        assert!(signature.len() == SIGNATURE_LENGTH);
    }

    #[test]
    fn can_verify_message() {
        let seed = generate_random_seed();
        let keypair = ext_sr_from_seed(seed.as_slice());
        let private = &keypair[0..SECRET_KEY_LENGTH];
        let public = &keypair[SECRET_KEY_LENGTH..KEYPAIR_LENGTH];
        let message = b"this is a message";
        let signature = ext_sr_sign(public, private, message);
        let is_valid = ext_sr_verify(&signature[..], message, public);

        assert!(is_valid);
    }

    #[test]
    fn can_verify_known_message() {
        let message = b"I hereby verify that I control 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";
        let public = hex!("d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d");
        let signature = hex!("1037eb7e51613d0dcf5930ae518819c87d655056605764840d9280984e1b7063c4566b55bf292fcab07b369d01095879b50517beca4d26e6a65866e25fec0d83");
        let is_valid = ext_sr_verify(&signature, message, &public);

        assert!(is_valid);
    }

    #[test]
    fn can_verify_known_wrapped_message() {
        let message = b"<Bytes>message to sign</Bytes>";
        let public = hex!("f84d048da2ddae2d9d8fd6763f469566e8817a26114f39408de15547f6d47805");
        let signature = hex!("48ce2c90e08651adfc8ecef84e916f6d1bb51ebebd16150ee12df247841a5437951ea0f9d632ca165e6ab391532e75e701be6a1caa88c8a6bcca3511f55b4183");
        let is_valid = ext_sr_verify(&signature, message, &public);

        assert!(is_valid);
    }

    #[test]
    fn can_verify_known_wrapped_message_fail() {
        let message = b"message to sign";
        let public = hex!("f84d048da2ddae2d9d8fd6763f469566e8817a26114f39408de15547f6d47805");
        let signature = hex!("48ce2c90e08651adfc8ecef84e916f6d1bb51ebebd16150ee12df247841a5437951ea0f9d632ca165e6ab391532e75e701be6a1caa88c8a6bcca3511f55b4183");
        let is_valid = ext_sr_verify(&signature, message, &public);

        assert!(!is_valid);
    }
}
