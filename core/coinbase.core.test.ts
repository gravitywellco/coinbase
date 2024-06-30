/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { CoinbaseAuth } from './coinbase.auth.ts'
import { CoinbaseConfig } from './coinbase.config.ts'
import { CoinbaseCore } from './coinbase.core.ts'
import { assertEquals, assertInstanceOf } from '@std/assert'

Deno.test('CoinbaseCore', async (test) => {
  await test.step('sets internal config and auth', () => {
    const core = new CoinbaseCore()
    assertInstanceOf(core.config, CoinbaseConfig)
    assertInstanceOf(core.auth, CoinbaseAuth)
  })

  await test.step('correct internals with auth options set', () => {
    const auth_options = { key: 'key', secret: 'secret', passphrase: 'pass' }
    const core = new CoinbaseCore({ auth: auth_options })
    assertEquals(core.authenticated, true)
  })

  await test.step('correct internals with no auth options set', () => {
    const core = new CoinbaseCore()
    assertEquals(core.authenticated, false)
  })
})
