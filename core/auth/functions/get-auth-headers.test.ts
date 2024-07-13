/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { assertEquals } from '@std/assert'
import { TEST_AUTH_KEYS } from '../../testing/core.test.data.ts'
import { get_auth_headers } from './get-auth-headers.ts'

Deno.test('auth:get_auth_headers - returns the correct headers', () => {
  const headers = get_auth_headers(TEST_AUTH_KEYS)
  assertEquals(headers['CB-ACCESS-KEY'], TEST_AUTH_KEYS.key)
  assertEquals(headers['CB-ACCESS-PASSPHRASE'], TEST_AUTH_KEYS.passphrase)
  assertEquals(headers['CB-ACCESS-SIGN'], TEST_AUTH_KEYS.signature)
  assertEquals(headers['CB-ACCESS-TIMESTAMP'], TEST_AUTH_KEYS.timestamp)
})
