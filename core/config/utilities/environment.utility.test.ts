/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { EnvironmentUtility } from './environment.utility.ts'
import { assertEquals } from '@std/assert'

Deno.test('EnvironmentUtility.Get', async (test) => {
  await test.step('key exists', () => {
    Deno.env.set('FOO', 'bar')
    assertEquals(EnvironmentUtility.Get('FOO'), 'bar')
  })

  await test.step('key exists in bun', () => {
    // @ts-ignore - it's fine. probably.
    globalThis.Bun = { env: { 'BAR': 'baz' } }

    assertEquals(EnvironmentUtility.Get('BAR'), 'baz')

    // @ts-ignore - still fine.
    globalThis.Bun = undefined
  })

  await test.step('key does not exist', () => {
    assertEquals(EnvironmentUtility.Get('Bar'), '')
    assertEquals(EnvironmentUtility.Get('Bar', 'foo'), 'foo')
  })
})
