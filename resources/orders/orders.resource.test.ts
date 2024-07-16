/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { assertSpyCallArgs, stub } from '@std/testing/mock'
import { TEST_AUTH_CONFIG } from '../../core/testing/core.test.data.ts'
import { CoinbaseRest } from '../../core/rest/rest.ts'
import { get_config } from '../../core/config/config.ts'
import { CoinbaseOrders } from './orders.resource.ts'
import { CoinbaseOrderSide, CoinbaseOrderStopType, CoinbaseOrderType } from './orders.types.ts'

const orders = new CoinbaseOrders(get_config({ auth: TEST_AUTH_CONFIG }))

Deno.test('CoinbaseOrders.get()', async (test) => {
  const get = stub(CoinbaseRest.prototype, 'get', async () => {})

  await test.step('@param {id} calls request.get({id})', async () => {
    await orders.get('123')
    assertSpyCallArgs(get, 0, ['/123', []])
  })

  await test.step('@param {market_type} calls request.get({id}, {market_type})', async () => {
    await orders.get('123', 'test')
    assertSpyCallArgs(get, 1, ['/123', [{ key: 'market_type', value: 'test' }]])
  })

  get.restore()
})

Deno.test('CoinbaseOrders.create()', async (test) => {
  const post = stub(CoinbaseRest.prototype, 'post', async () => {})

  await test.step('@param {MARKET} calls request.post(MARRKET, {order})', async () => {
    const dto = { funds: '1', side: CoinbaseOrderSide.BUY, product_id: 'BTC-USD' }
    await orders.create(CoinbaseOrderType.MARKET, dto)
    assertSpyCallArgs(post, 0, [undefined, { type: CoinbaseOrderType.MARKET, ...dto }])
  })

  await test.step('@param {LIMIT} calls request.post(LIMIT, {order})', async () => {
    const dto = { price: '1', size: '1', side: CoinbaseOrderSide.BUY, product_id: 'BTC-USD' }
    await orders.create(CoinbaseOrderType.LIMIT, dto)
    assertSpyCallArgs(post, 1, [undefined, { type: CoinbaseOrderType.LIMIT, ...dto }])
  })

  await test.step('@param {STOP} calls request.post(STOP, {order})', async () => {
    const dto = {
      price: '1',
      size: '1',
      side: CoinbaseOrderSide.BUY,
      stop: CoinbaseOrderStopType.LOSS,
      product_id: 'BTC-USD',
      stop_price: '1',
      stop_limit_price: '1',
    }
    await orders.create(CoinbaseOrderType.STOP, dto)
    assertSpyCallArgs(post, 2, [undefined, { type: CoinbaseOrderType.STOP, ...dto }])
  })

  post.restore()
})

Deno.test('CoinbaseOrders.cancel()', async (test) => {
  const del = stub(CoinbaseRest.prototype, 'delete', async () => {})

  await test.step('@param {id} calls request.delete({id})', async () => {
    await orders.cancel('123')
    assertSpyCallArgs(del, 0, ['/123', []])
  })

  await test.step('@param {product_id} calls request.delete({id}, {product_id})', async () => {
    await orders.cancel('123', 'TEST-USD')
    assertSpyCallArgs(del, 1, ['/123', [{ key: 'product_id', value: 'TEST-USD' }]])
  })

  del.restore()
})
