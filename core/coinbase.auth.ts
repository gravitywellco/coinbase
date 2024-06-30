/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { encodeBase64 as encode } from '@std/encoding'
import type { CoinbaseAuthConfig } from '../core/coinbase.config.types.ts'
import { AuthUtility } from '../utilities/auth.utility.ts'

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

  /**
   * Returns Coinbase API authentication data, used in requests.
   * @param {string} path Full path to the API endpoint.
   * @param {string} method HTTP method.
   * @param {unknown} body Any body, if applicable. Will be stringified.
   * @returns {Promise<CoinbaseAuthKeys>} Authentication headers.
   */
  public async keys(
    path: string,
    method: string,
    body: unknown | undefined = undefined,
  ): Promise<CoinbaseAuthKeys> {
    const timestamp = `${Date.now() / 1000}`
    const message = `${timestamp}${method}${path}${body === undefined ? '' : JSON.stringify(body)}`
    const key = await AuthUtility.CreateSigningKey(this.config.secret)
    const signature = await AuthUtility.Sign(message, key)

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
    const auth = await this.keys(path, method, body)
    return {
      'CB-ACCESS-KEY': auth.key,
      'CB-ACCESS-PASSPHRASE': auth.passphrase,
      'CB-ACCESS-SIGN': auth.signature,
      'CB-ACCESS-TIMESTAMP': auth.timestamp,
    }
  }
}
