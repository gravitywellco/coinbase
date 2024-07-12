/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { CoinbaseAuthHeaders, CoinbaseAuthKeys } from '../types/auth.types.ts'

/**
 * Returns Coinbase API authentication headers, used in requests.
 * @param auth Auth keys, generated from {get_auth_keys}.
 * @returns Authentication headers.
 */
export function get_auth_headers(auth: CoinbaseAuthKeys): CoinbaseAuthHeaders {
  return {
    'CB-ACCESS-KEY': auth.key,
    'CB-ACCESS-PASSPHRASE': auth.passphrase,
    'CB-ACCESS-SIGN': auth.signature,
    'CB-ACCESS-TIMESTAMP': auth.timestamp,
  }
}
