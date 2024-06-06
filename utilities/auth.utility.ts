/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { decodeBase64 as decode, encodeBase64 as encode } from '@std/encoding'
import type { CoinbaseAuthOptions } from './options.types.ts'

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
  constructor(private readonly options: CoinbaseAuthOptions) {}

  /**
   * Returns Coinbase API authentication data, used in requests.
   * @param {string} path Full path to the API endpoint.
   * @param {string} method HTTP method.
   * @param {unknown} body Any body, if applicable. Will be stringified.
   * @returns {Promise<CoinbaseAuthHeaders>} Authentication headers.
   */
  private async generate_keys(
    path: string,
    method: string,
    body: unknown | undefined = undefined,
  ): Promise<CoinbaseAuthKeys> {
    const timestamp = `${Date.now() / 1000}`
    const message = `${timestamp}${method}${path}${body === undefined ? '' : JSON.stringify(body)}`
    const secret = decode(this.options.secret)
    const key = await crypto.subtle.importKey(
      'raw',
      secret,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    )
    const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message))

    return {
      key: this.options.key,
      passphrase: this.options.passphrase,
      signature: encode(signature),
      timestamp,
    }
  }

  /**
   * Returns Coinbase API authentication keys or headers, used in requests.
   * @param {string} path Full path to the API endpoint.
   * @param {string} method HTTP method.
   * @param {unknown} body Any body, if applicable. Will be stringified.
   * @param {boolean} headers Whether to return headers or keys. Defaults to true.
   * @returns {Promise<CoinbaseAuthHeaders | CoinbaseAuthKeys>} Authentication headers.
   */
  public async keys(
    path: string,
    method: string,
    body: unknown | undefined = undefined,
    headers: boolean = true,
  ): Promise<CoinbaseAuthKeys | CoinbaseAuthHeaders> {
    const auth = await this.generate_keys(path, method, body)
    if (headers) {
      return {
        'CB-ACCESS-KEY': auth.key,
        'CB-ACCESS-PASSPHRASE': auth.passphrase,
        'CB-ACCESS-SIGN': auth.signature,
        'CB-ACCESS-TIMESTAMP': auth.timestamp,
      } as CoinbaseAuthHeaders
    } else {
      return auth as CoinbaseAuthKeys
    }
  }
}
