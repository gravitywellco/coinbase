/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { assertEquals } from '@std/assert'
import { get_url_config } from './get-url-config.ts'

Deno.test('config:get_url_config', async (test) => {
  await test.step('should have the right urls based on sandbox mode', () => {
    const config = get_url_config({ sandbox: true })
    assertEquals(config.api, 'https://api-public.sandbox.exchange.coinbase.com')
    assertEquals(config.wss, 'wss://ws-direct.sandbox.exchange.coinbase.com')
  })

  await test.step('should have the right urls based on production mode', () => {
    const config = get_url_config()
    assertEquals(config.api, 'https://api.exchange.coinbase.com')
    assertEquals(config.wss, 'wss://ws-direct.exchange.coinbase.com')
  })
})
