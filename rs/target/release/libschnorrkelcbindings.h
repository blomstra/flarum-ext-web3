#include <stdarg.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdlib.h>

/**
 * Generate a key pair.
 *
 * * seed: String
 */
const char *pair_from_seed(const char *seed);

/**
 * Verifies sr25519 signed signature with a message.
 *
 * * pubkey: Hex String
 * * secret: Hex String
 * * message: String
 */
const char *sign(const char *pubkey, const char *secret, const char *message);

/**
 * Verifies sr25519 signed signature with a message.
 *
 * * signature: Hex String
 * * message: String
 * * pubkey: Hex String
 */
bool verify(const char *signature, const char *message, const char *pubkey);
