/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { assertEquals } from '@std/assert'
import { auth } from './auth.ts'
import { get_auth_keys } from './functions/get-auth-keys.ts'
import { get_auth_headers } from './functions/get-auth-headers.ts'

Deno.test('auth', () => {
  assertEquals(auth.get_keys, get_auth_keys)
  assertEquals(auth.get_headers, get_auth_headers)
})
