mod sr25519;

use std::os::raw::c_char;
use std::ffi::{CStr, CString};
use sr25519::*;
use hex::{encode, decode};

/// Generate a key pair.
///
/// * seed: String
#[no_mangle]
pub extern "C" fn pair_from_seed(seed: *const c_char) -> *const c_char {
    let str_seed = unsafe { CStr::from_ptr(seed) };

    match decode(str_seed.to_bytes()) {
        Ok(seed) => {
            let pair = ext_sr_from_seed(&seed);

            CString::new(encode(pair)).unwrap().into_raw()
        },
        _ => CString::new("").unwrap().into_raw()
    }
}

/// Verifies sr25519 signed signature with a message.
///
/// * pubkey: Hex String
/// * secret: Hex String
/// * message: String
#[no_mangle]
pub extern "C" fn sign(pubkey: *const c_char,  secret: *const c_char, message: *const c_char) -> *const c_char {
    let str_pubkey = unsafe { CStr::from_ptr(pubkey) };
    let str_secret = unsafe { CStr::from_ptr(secret) };
    let str_message = unsafe { CStr::from_ptr(message) };

    match (decode(str_secret.to_bytes()), decode(str_pubkey.to_bytes())) {
        (Ok(secret), Ok(pubkey)) => {
            let signature = ext_sr_sign(&pubkey, &secret, str_message.to_bytes());

            CString::new(encode(signature)).unwrap().into_raw()
        },
        _ => CString::new("").unwrap().into_raw()
    }
}

/// Verifies sr25519 signed signature with a message.
///
/// * signature: Hex String
/// * message: String
/// * pubkey: Hex String
#[no_mangle]
pub extern "C" fn verify(signature: *const c_char, message: *const c_char, pubkey: *const c_char) -> bool {
    let str_signature = unsafe { CStr::from_ptr(signature) };
    let str_message = unsafe { CStr::from_ptr(message) };
    let str_pubkey = unsafe { CStr::from_ptr(pubkey) };

    match (decode(str_signature.to_bytes()), decode(str_pubkey.to_bytes())) {
        (Ok(signature), Ok(pubkey)) => ext_sr_verify(&signature, str_message.to_bytes(), &pubkey),
        _ => false
    }
}
