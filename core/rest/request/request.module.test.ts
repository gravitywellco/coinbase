/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { assertRejects } from '@std/assert'
import { assertSpyCall, stub } from '@std/testing/mock'
import { TEST_AUTH_CONFIG, TEST_AUTH_KEYS } from '../../testing/core.test.data.ts'
import { auth } from '../../auth/auth.ts'
import { type RequestData, RequestMethod } from './request.types.ts'
import { CoinbaseRequest } from './request.module.ts'
import { RequestUtility } from './request.utility.ts'

const url = 'https://example.coinbase.com'

Deno.test('CoinbaseRequest.Send()', async (test) => {
  const stubbed_fetch = stub(globalThis, 'fetch', () => Promise.resolve(new Response()))

  await test.step('calling fetch... no auth or body', async () => {
    const data: RequestData = { url, path: '/test' }
    await CoinbaseRequest.Send(RequestMethod.GET, data)
    assertSpyCall(stubbed_fetch, 0, {
      args: [data.url + data.path, {
        method: RequestMethod.GET,
        headers: RequestUtility.BASE_HEADERS,
        body: undefined,
      }],
    })
  })

  await test.step('calling fetch... with auth', async () => {
    const auth_stub = stub(auth, 'get_keys', () => Promise.resolve(TEST_AUTH_KEYS))
    const data: RequestData = { url, path: '/test/auth' }
    await CoinbaseRequest.Send(RequestMethod.GET, data, TEST_AUTH_CONFIG)
    const headers = { ...RequestUtility.BASE_HEADERS, ...auth.get_headers(TEST_AUTH_KEYS) }
    assertSpyCall(stubbed_fetch, 1, {
      args: [data.url + data.path, { method: RequestMethod.GET, headers, body: undefined }],
    })
    auth_stub.restore()
  })

  await test.step('calling fetch... with body', async () => {
    const data: RequestData = { url, path: '/test/body', body: { test: 'value' } }
    await CoinbaseRequest.Send(RequestMethod.POST, data)
    assertSpyCall(stubbed_fetch, 2, {
      args: [
        data.url + data.path,
        {
          method: RequestMethod.POST,
          headers: RequestUtility.BASE_HEADERS,
          body: JSON.stringify(data.body),
        },
      ],
    })
  })

  stubbed_fetch.restore()

  await test.step('throws error if response is not ok', async () => {
    const response = new Response('', { statusText: 'Bad Request', status: 400 })
    const error_fetch = stub(globalThis, 'fetch', () => Promise.resolve(response))
    const data: RequestData = { url, path: '/test/error' }
    await assertRejects(() => CoinbaseRequest.Send(RequestMethod.GET, data), Error, 'Bad Request')
    error_fetch.restore()
  })
})

async function test_method(test: Deno.TestContext, method: RequestMethod, func: CallableFunction) {
  const request = stub(CoinbaseRequest, 'Send', () => Promise.resolve({}))

  const base_data: RequestData = { url, path: '/test' }
  await test.step(`${method} is called with the correct method`, async () => {
    await func(base_data)
    assertSpyCall(request, 0, { args: [method, { ...base_data }, undefined] })
  })

  request.restore()
}

Deno.test('CoinbaseRequest.[METHOD]()', async (test) => {
  await test_method(test, RequestMethod.GET, CoinbaseRequest.Get)
  await test_method(test, RequestMethod.POST, CoinbaseRequest.Post)
  await test_method(test, RequestMethod.PUT, CoinbaseRequest.Put)
  await test_method(test, RequestMethod.DELETE, CoinbaseRequest.Delete)
})
