/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Environment, EnvironmentUtility } from './environment.utility.ts'
import { assertEquals } from '@std/assert'

const MockBun = {
  env: { 'BAR': 'baz' },
}

Deno.test('Deno', async (test) => {
  await test.step('EnvironmentUtility.Environment', () => {
    assertEquals(EnvironmentUtility.Environment(), Environment.DENO)
  })

  await test.step('EnvironmentUtility.Get - key exists', () => {
    Deno.env.set('FOO', 'bar')
    assertEquals(EnvironmentUtility.Get('FOO'), 'bar')
  })

  await test.step('EnvironmentUtility.Get - key does not exist', () => {
    assertEquals(EnvironmentUtility.Get('Bar'), '')
    assertEquals(EnvironmentUtility.Get('Bar', 'foo'), 'foo')
  })
})

Deno.test('Bun', async (test) => {
  // @ts-ignore - it's fine. probably.
  globalThis.Bun = MockBun

  await test.step('EnvironmentUtility.Environment', () => {
    assertEquals(EnvironmentUtility.Environment(), Environment.BUN)
  })

  await test.step('EnvironmentUtility.Get - key exists', () => {
    assertEquals(EnvironmentUtility.Get('BAR'), 'baz')
  })

  await test.step('EnvironmentUtility.Get - key does not exist', () => {
    assertEquals(EnvironmentUtility.Get('UHM'), '')
    assertEquals(EnvironmentUtility.Get('UHM', 'stuff'), 'stuff')
  })

  // @ts-ignore - still fine.
  globalThis.Bun = undefined
})

Deno.test('Unknown', async (test) => {
  await test.step('EnvironmentUtility.Environment', () => {
    assertEquals(EnvironmentUtility.Environment(true), Environment.UNKNOWN)
  })

  await test.step('EnvironmentUtility.Get - key does not exist', () => {
    assertEquals(EnvironmentUtility.Get('FOO', undefined, true), '')
    assertEquals(EnvironmentUtility.Get('FOO', 'things', true), 'things')
  })
})
