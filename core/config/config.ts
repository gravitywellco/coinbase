/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { CoinbaseConfig, CoinbaseOptions } from './types/config.types.ts'
import { get_auth_config } from './functions/get-auth-config.ts'
import { get_url_config } from './functions/get-url-config.ts'

/** Get the configuration for the Coinbase client. */
export function get_config(options?: CoinbaseOptions): CoinbaseConfig {
  return {
    auth: get_auth_config(options),
    urls: get_url_config(options),
  }
}

export type * from './types/config.types.ts'
