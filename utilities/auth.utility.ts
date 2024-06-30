/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { decodeBase64 as decode, encodeBase64 as encode } from '@std/encoding'
import type { CoinbaseAuthConfig } from '../core/coinbase.config.types.ts'

export interface CoinbaseAuthKeys {
  key: string
  passphrase: string
  signature: string
  timestamp: string
}

export interface CoinbaseAuthHeaders {
  'CB-ACCESS-KEY': string
  'CB-ACCESS-PASSPHRASE': string
  'CB-ACCESS-SIGN': string
  'CB-ACCESS-TIMESTAMP': string
}

/**
 * Coinbase API authentication utility. Internal use only.
 */
export class CoinbaseAuth {
  constructor(private readonly config: CoinbaseAuthConfig) {}

  public async generate_key(
    secret: string,
    permission: 'sign' | 'verify' = 'sign',
  ): Promise<CryptoKey> {
    const decoded_secret = decode(secret)
    const hash_data = { name: 'HMAC', hash: 'SHA-256' }
    return await crypto.subtle.importKey('raw', decoded_secret, hash_data, false, [permission])
  }

  public async sign(message: string, key: CryptoKey): Promise<ArrayBuffer> {
    return await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message))
  }

  public async verify(message: string, signature: ArrayBuffer, key: CryptoKey): Promise<boolean> {
    return await crypto.subtle.verify('HMAC', key, signature, new TextEncoder().encode(message))
  }

  /**
   * Returns Coinbase API authentication data, used in requests.
   * @param {string} path Full path to the API endpoint.
   * @param {string} method HTTP method.
   * @param {unknown} body Any body, if applicable. Will be stringified.
   * @returns {Promise<CoinbaseAuthKeys>} Authentication headers.
   */
  public async get(
    path: string,
    method: string,
    body: unknown | undefined = undefined,
  ): Promise<CoinbaseAuthKeys> {
    const timestamp = `${Date.now() / 1000}`
    const message = `${timestamp}${method}${path}${body === undefined ? '' : JSON.stringify(body)}`
    const key = await this.generate_key(this.config.secret)
    const signature = await this.sign(message, key)

    return {
      key: this.config.key,
      passphrase: this.config.passphrase,
      signature: encode(signature),
      timestamp,
    }
  }

  /**
   * Returns Coinbase API authentication headers, used in requests.
   * @param {string} path Full path to the API endpoint.
   * @param {string} method HTTP method.
   * @param {unknown} body Any body, if applicable. Will be stringified.
   * @returns {Promise<CoinbaseAuthHeaders>} Authentication headers.
   */
  public async headers(
    path: string,
    method: string,
    body: unknown | undefined = undefined,
  ): Promise<CoinbaseAuthHeaders> {
    const auth = await this.get(path, method, body)
    return {
      'CB-ACCESS-KEY': auth.key,
      'CB-ACCESS-PASSPHRASE': auth.passphrase,
      'CB-ACCESS-SIGN': auth.signature,
      'CB-ACCESS-TIMESTAMP': auth.timestamp,
    }
  }
}
