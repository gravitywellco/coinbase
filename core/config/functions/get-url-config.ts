/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { CoinbaseOptions, CoinbaseUrlConfig } from '../types/config.types.ts'

const ROOT_URL = 'exchange.coinbase.com'

/**
 * Returns url configuration for the Coinbase API.
 * Defaults to production, can be sandboxed.
 * @param options - Options to configure the Coinbase client.
 * @access package-private
 */
export function get_url_config(options?: CoinbaseOptions): CoinbaseUrlConfig {
  return {
    api: `https://${options?.sandbox ? 'api-public.sandbox' : 'api'}.${ROOT_URL}`,
    wss: `wss://${options?.sandbox ? 'ws-direct.sandbox' : 'ws-direct'}.${ROOT_URL}`,
  }
}
