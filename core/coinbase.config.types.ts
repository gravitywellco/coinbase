/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { CoinbaseAuthConfig } from './auth/auth.ts'

/** Publicly exposed options to configure the Coinbase client. */
export interface CoinbaseOptions {
  auth?: CoinbaseAuthConfig
  sandbox?: boolean
}

/** URL configuration for Coinbase, can be production or sandbox. */
export interface CoinbaseUrlConfig {
  api: string
  wss: string
}
