/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { assertAlmostEquals, assertEquals } from '@std/assert'
import { TEST_AUTH_CONFIG } from '../testing/auth.test.data.ts'
import { decodeBase64 } from '@std/encoding'
import type { CoinbaseAuthKeys } from '../types/auth.types.ts'
import { CryptographyUtility } from '../utilities/cryptography.utility.ts'
import { get_auth_keys } from './get-auth-keys.ts'

interface TestRequest {
  path: string
  method: string
  body?: unknown
}

async function test_keys(keys: CoinbaseAuthKeys, request: TestRequest) {
  assertEquals(keys.key, TEST_AUTH_CONFIG.key)
  assertEquals(keys.passphrase, TEST_AUTH_CONFIG.passphrase)
  assertAlmostEquals(parseFloat(keys.timestamp), Date.now() / 1000, 0.01)
  const key = await CryptographyUtility.CreateSigningKey(TEST_AUTH_CONFIG.secret, 'verify')
  const body = request.body === undefined ? '' : JSON.stringify(request.body)
  const verified = await CryptographyUtility.Verify(
    `${keys.timestamp}${request.method}${request.path}${body}`,
    decodeBase64(keys.signature),
    key,
  )
  assertEquals(verified, true)
}

Deno.test('auth:get_auth_keys - returns the correct keys with no body', async () => {
  const data = { path: '/test', method: 'GET' }
  const keys = await get_auth_keys(TEST_AUTH_CONFIG, data.path, data.method)
  await test_keys(keys, data)
})

Deno.test('auth:get_auth_keys - returns the correct keys with a body', async () => {
  const data = { path: '/test/body', method: 'POST', body: { test: 'value' } }
  const keys = await get_auth_keys(TEST_AUTH_CONFIG, data.path, data.method, data.body)
  await test_keys(keys, data)
})
