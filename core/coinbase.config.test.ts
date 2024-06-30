/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { CoinbaseConfig } from './coinbase.config.ts'
import { assertEquals } from '@std/assert'

Deno.test('CoinbaseConfig', async (test) => {
  await test.step('should have the right urls based on sandbox mode', () => {
    const config = new CoinbaseConfig(undefined, true)
    assertEquals(config.urls.api, 'https://api-public.sandbox.exchange.coinbase.com')
    assertEquals(config.urls.wss, 'wss://ws-direct.sandbox.exchange.coinbase.com')
  })

  await test.step('should have the right urls based on production mode', () => {
    const config = new CoinbaseConfig()
    assertEquals(config.urls.api, 'https://api.exchange.coinbase.com')
    assertEquals(config.urls.wss, 'wss://ws-direct.exchange.coinbase.com')
  })

  await test.step('should be authenticated if auth is provided', () => {
    const config = new CoinbaseConfig({ key: 'key', secret: 'secret', passphrase: 'pass' })
    assertEquals(config.auth.key, 'key')
    assertEquals(config.auth.secret, 'secret')
    assertEquals(config.auth.passphrase, 'pass')
  })
})
