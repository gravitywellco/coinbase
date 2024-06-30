/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/** Publicly exposed options to configure the Coinbase client. */
export interface CoinbaseOptions {
  auth?: CoinbaseAuthConfig
  sandbox?: boolean
}

/** Authentication configuration for Coinbase, required for most uses. */
export interface CoinbaseAuthConfig {
  key: string
  secret: string
  passphrase: string
}

/** URL configuration for Coinbase, can be production or sandbox. */
export interface CoinbaseUrlConfig {
  api: string
  wss: string
}
