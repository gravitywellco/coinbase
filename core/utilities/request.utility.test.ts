/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { assertEquals } from '@std/assert'
import { RequestUtility } from './request.utility.ts'

Deno.test('RequestUtility.ParseQuery', () => {
  assertEquals(RequestUtility.ParseQuery([]), '')
  assertEquals(RequestUtility.ParseQuery([{ key: 'test', value: 'value' }]), '?test=value')
  assertEquals(
    RequestUtility.ParseQuery([{ key: 'test', value: 'value' }, { key: 'test2', value: 'value2' }]),
    '?test=value&test2=value2',
  )
})

Deno.test('RequestUtility.ParseResponse', async () => {
  const response = new Response('{"test": "value"}')
  assertEquals(await RequestUtility.ParseResponse(response), { test: 'value' })

  const text_response = new Response('text')
  assertEquals(await RequestUtility.ParseResponse(text_response), 'text')
})
