/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { assertEquals } from '@std/assert'
import { TEST_AUTH_CONFIG } from '../../testing/core.test.data.ts'
import { get_auth_config } from './get-auth-config.ts'

Deno.test('config:get_auth_config', async (test) => {
  await test.step('should be authenticated if auth is provided', () => {
    const config = get_auth_config({ auth: TEST_AUTH_CONFIG })
    assertEquals(config.key, TEST_AUTH_CONFIG.key)
    assertEquals(config.secret, TEST_AUTH_CONFIG.secret)
    assertEquals(config.passphrase, TEST_AUTH_CONFIG.passphrase)
  })

  await test.step('should get config from environment when available', () => {
    Deno.env.set('COINBASE_API_KEY', TEST_AUTH_CONFIG.key)
    Deno.env.set('COINBASE_API_SECRET', TEST_AUTH_CONFIG.secret)
    Deno.env.set('COINBASE_API_PASSPHRASE', TEST_AUTH_CONFIG.passphrase)

    const config = get_auth_config()
    assertEquals(config.key, TEST_AUTH_CONFIG.key)
    assertEquals(config.secret, TEST_AUTH_CONFIG.secret)
    assertEquals(config.passphrase, TEST_AUTH_CONFIG.passphrase)

    Deno.env.delete('COINBASE_API_KEY')
    Deno.env.delete('COINBASE_API_SECRET')
    Deno.env.delete('COINBASE_API_PASSPHRASE')
  })
})
