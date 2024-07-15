/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { assertEquals } from '@std/assert'
import { assertSpyCall, stub } from '@std/testing/mock'
import { TEST_AUTH_CONFIG } from '../testing/core.test.data.ts'
import { CoinbaseRequest } from './request/request.module.ts'
import { CoinbaseRest } from './rest.ts'

const test_url = 'https://test.coinbase.com'
const test_path = '/test'

Deno.test('CoinbaseRest.constructor()', async (test) => {
  await test.step('sets url', () => {
    const rest = new CoinbaseRest(test_url, test_path)
    assertEquals(rest.root, test_url)
    assertEquals(rest.base, test_path)
    assertEquals(rest.auth, undefined)
  })

  await test.step('sets auth', () => {
    const rest = new CoinbaseRest(test_url, test_path, TEST_AUTH_CONFIG)
    assertEquals(rest.root, test_url)
    assertEquals(rest.base, test_path)
    assertEquals(rest.auth, TEST_AUTH_CONFIG)
  })
})

const rest = new CoinbaseRest(test_url, test_path)
async function test_method(
  method: 'get' | 'post' | 'put' | 'delete',
  stub_method: 'Get' | 'Post' | 'Put' | 'Delete',
  other_params: Record<string, undefined>,
) {
  const request_stub = stub(CoinbaseRequest, stub_method, () => Promise.resolve({}))
  await rest[method](`/${method.toLowerCase()}-request`)
  assertSpyCall(request_stub, 0, {
    args: [
      { url: test_url, path: test_path + `/${method.toLowerCase()}-request`, ...other_params },
      undefined,
    ],
  })
  request_stub.restore()
}
Deno.test('CoinbaseRest.[METHOD]()', async (test) => {
  await test.step('get()', async () => await test_method('get', 'Get', { query: undefined }))
  await test.step('post()', async () => await test_method('post', 'Post', { body: undefined }))
  await test.step('put()', async () => await test_method('put', 'Put', { body: undefined }))
  await test.step('delete()', async () =>
    await test_method('delete', 'Delete', { query: undefined }))
})
