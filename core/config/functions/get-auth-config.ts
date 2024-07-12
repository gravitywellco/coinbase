/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { EnvironmentUtility } from '../utilities/environment.utility.ts'
import type { CoinbaseOptions } from '../types/config.types.ts'
import type { CoinbaseAuthConfig } from '../../auth/auth.ts'

/**
 * Returns authentication configuration for the Coinbase API.
 * Attempts to get the API key, secret, and passphrase from the environment.
 * @param options - Options to configure the Coinbase client.
 * @access package-private
 */
export function get_auth_config(options?: CoinbaseOptions): CoinbaseAuthConfig {
  if (options?.auth !== undefined) return options.auth
  return {
    key: EnvironmentUtility.Get('COINBASE_API_KEY'),
    secret: EnvironmentUtility.Get('COINBASE_API_SECRET'),
    passphrase: EnvironmentUtility.Get('COINBASE_API_PASSPHRASE'),
  }
}
