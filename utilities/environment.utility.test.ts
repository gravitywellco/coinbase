/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { EnvironmentUtility } from './environment.utility.ts'
import { assertEquals } from '@std/assert'

Deno.test('EnvironmentUtility.IsDeno', async (test) => {
  await test.step('returns true when running in Deno', () => {
    assertEquals(EnvironmentUtility.IsDeno(), true)
  })
})

Deno.test('EnvironmentUtility.IsBun', async (test) => {
  await test.step('returns false when running in Deno', () => {
    assertEquals(EnvironmentUtility.IsBun(), false)
  })
})

Deno.test('EnvironmentUtility.Get', async (test) => {
  await test.step('returns a key if it exists', () => {
    Deno.env.set('FOO', 'bar')
    assertEquals(EnvironmentUtility.Get('FOO'), 'bar')
  })

  await test.step('returns a default value if the key does not exist', () => {
    assertEquals(EnvironmentUtility.Get('Bar'), '')
    assertEquals(EnvironmentUtility.Get('Bar', 'foo'), 'foo')
  })
})
