/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { get_auth_keys } from './functions/get-auth-keys.ts'
import { get_auth_headers } from './functions/get-auth-headers.ts'

export const auth = {
  get_keys: get_auth_keys,
  get_headers: get_auth_headers,
}

export type * from './types/auth.types.ts'
export type CoinbaseAuth = typeof auth
