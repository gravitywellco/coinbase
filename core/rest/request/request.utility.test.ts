/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { stub } from '@std/testing/mock'
import { assertEquals } from '@std/assert'
import { RequestUtility } from './request.utility.ts'
import { TEST_AUTH_CONFIG, TEST_AUTH_KEYS } from '../../testing/core.test.data.ts'
import { auth } from '../../auth/auth.ts'
import { RequestMethod } from './request.types.ts'

const url = 'https://example.coinbase.com'

Deno.test('RequestUtility.ParseQuery()', () => {
  assertEquals(RequestUtility.ParseQuery(), '')
  assertEquals(RequestUtility.ParseQuery([]), '')
  assertEquals(RequestUtility.ParseQuery([{ key: 'test', value: 'value' }]), '?test=value')
  assertEquals(
    RequestUtility.ParseQuery([{ key: 'test', value: 'value' }, { key: 'test2', value: 'value2' }]),
    '?test=value&test2=value2',
  )
})

Deno.test('RequestUtility.GetHeaders()', async (test) => {
  await test.step('returns base headers with no auth', async () => {
    const headers = await RequestUtility.GetHeaders(RequestMethod.GET, { url, path: '/test' })
    assertEquals(headers, RequestUtility.BASE_HEADERS)
  })

  await test.step('returns full headers with auth', async () => {
    const auth_stub = stub(auth, 'get_keys', () => Promise.resolve(TEST_AUTH_KEYS))
    const auth_headers = auth.get_headers(TEST_AUTH_KEYS)
    const headers = await RequestUtility.GetHeaders(
      RequestMethod.GET,
      { url, path: '/test' },
      TEST_AUTH_CONFIG,
    )
    assertEquals(headers, { ...RequestUtility.BASE_HEADERS, ...auth_headers })
    auth_stub.restore()
  })
})

Deno.test('RequestUtility.ParseResponse()', async () => {
  const response = new Response('{"test": "value"}')
  assertEquals(await RequestUtility.ParseResponse(response), { test: 'value' })

  const text_response = new Response('text')
  assertEquals(await RequestUtility.ParseResponse(text_response), 'text')
})
