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

Deno.test('CoinbaseRest.constructor()', async (test) => {
  await test.step('sets url', () => {
    const rest = new CoinbaseRest(test_url)
    assertEquals(rest.url, test_url)
    assertEquals(rest.auth, undefined)
  })

  await test.step('sets auth', () => {
    const rest = new CoinbaseRest(test_url, TEST_AUTH_CONFIG)
    assertEquals(rest.url, test_url)
    assertEquals(rest.auth, TEST_AUTH_CONFIG)
  })
})

const rest = new CoinbaseRest(test_url)
Deno.test('CoinbaseRest.get() - calls CoinbaseRequest.Get() with modified path', async () => {
  const rest = new CoinbaseRest(test_url)
  const get_stub = stub(CoinbaseRequest, 'Get', () => Promise.resolve({}))
  await rest.get('/get-request')
  assertSpyCall(get_stub, 0, {
    args: [{ path: test_url + '/get-request', query: undefined }, undefined],
  })
  get_stub.restore()
})

Deno.test('CoinbaseRest.post() - calls CoinbaseRequest.Post() with modified path', async () => {
  const post_stub = stub(CoinbaseRequest, 'Post', () => Promise.resolve({}))
  await rest.post('/post-request')
  assertSpyCall(post_stub, 0, {
    args: [{ path: test_url + '/post-request', body: undefined }, undefined],
  })
  post_stub.restore()
})

Deno.test('CoinbaseRest.put() - calls CoinbaseRequest.Put() with modified path', async () => {
  const put_stub = stub(CoinbaseRequest, 'Put', () => Promise.resolve({}))
  await rest.put('/put-request')
  assertSpyCall(put_stub, 0, {
    args: [{ path: test_url + '/put-request', body: undefined }, undefined],
  })
  put_stub.restore()
})

Deno.test('CoinbaseRest.delete() - calls CoinbaseRequest.Delete() with modified path', async () => {
  const delete_stub = stub(CoinbaseRequest, 'Delete', () => Promise.resolve({}))
  await rest.delete('/delete-request')
  assertSpyCall(delete_stub, 0, {
    args: [{ path: test_url + '/delete-request', query: undefined }, undefined],
  })
  delete_stub.restore()
})
