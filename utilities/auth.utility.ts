/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { decodeBase64 } from '@std/encoding'

const HASH_CONFIG = { name: 'HMAC', hash: 'SHA-256' }

/**
 * Simple utility for hashing and signing messages, useful for coinbase
 * authentication and makes testing simpler.
 * @access package-private
 */
export class AuthUtility {
  /**
   * Generates a new signing key from a secret with HMAC SHA-256.
   * @param {string} secret - The secret to generate the key from.
   * @param {KeyUsage} permission - The permission to give the key.
   * @returns {Promise<CryptoKey>} The generated key.
   */
  public static async CreateSigningKey(
    secret: string,
    permission: KeyUsage = 'sign',
  ): Promise<CryptoKey> {
    return await crypto.subtle.importKey('raw', decodeBase64(secret), HASH_CONFIG, false, [
      permission,
    ])
  }

  /**
   * Signs a message with a generated key using HMAC SHA-256.
   * @param {string} message - The message to sign.
   * @param {CryptoKey} key - The key to sign the message with.
   * @returns {Promise<ArrayBuffer>} The signature.
   */
  public static async Sign(message: string, key: CryptoKey): Promise<ArrayBuffer> {
    return await crypto.subtle.sign(HASH_CONFIG.name, key, new TextEncoder().encode(message))
  }

  /**
   * Verifies a message with a signature and key using HMAC SHA-256. Mostly used for testing.
   * @param {string} message - The message to verify.
   * @param {ArrayBuffer} signature - The signature to verify.
   * @param {CryptoKey} key - The key to verify the signature with.
   * @returns {Promise<boolean>} Whether the signature is valid.
   */
  public static async Verify(
    message: string,
    signature: ArrayBuffer,
    key: CryptoKey,
  ): Promise<boolean> {
    return await crypto.subtle.verify(
      HASH_CONFIG.name,
      key,
      signature,
      new TextEncoder().encode(message),
    )
  }
}
