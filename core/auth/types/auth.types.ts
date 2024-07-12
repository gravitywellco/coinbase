/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/** Authentication configuration for Coinbase, required for most uses. */
export interface CoinbaseAuthConfig {
  key: string
  secret: string
  passphrase: string
}

/** Internal representation of the authentication keys for Coinbase. */
export interface CoinbaseAuthKeys {
  key: string
  passphrase: string
  signature: string
  timestamp: string
}

/** Internal auth keys in header form, used for sending REST requests. */
export interface CoinbaseAuthHeaders {
  'CB-ACCESS-KEY': string
  'CB-ACCESS-PASSPHRASE': string
  'CB-ACCESS-SIGN': string
  'CB-ACCESS-TIMESTAMP': string
}
