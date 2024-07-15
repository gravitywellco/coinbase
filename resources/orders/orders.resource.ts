/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { type CoinbaseOrder, CoinbaseOrderType } from './orders.types.ts'
import type { CoinbaseConfig } from '../../core/config/config.ts'
import { CoinbaseResource } from '../resource.ts'
import type {
  CoinbaseLimitOrderDTO,
  CoinbaseMarketOrderDTO,
  CoinbaseStopOrderDTO,
} from './orders.dtos.ts'

export class CoinbaseOrders extends CoinbaseResource {
  constructor(config: CoinbaseConfig) {
    super(config, '/orders', true)
  }

  /** @todo: This endpoint needs pagination, which is not currently supported. */
  // public async all(): Promise<CoinbaseOrder[]> {}

  /**
   * Get a single order by id. Requires Authentication.
   * This endpoint requires either the "view" or "trade" permission.
   * See: https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getorder/
   * @param id either the exchange assigned id or the client assigned client_oid. When using client_oid it must be preceded by the client: namespace.
   * @param market_type Market type which the order was traded in.
   */
  public async get(id: string, market_type?: string): Promise<CoinbaseOrder> {
    const query = market_type !== undefined ? [{ key: 'market_type', value: market_type }] : []
    return await this.request.get<CoinbaseOrder>(`/${id}`, query)
  }

  /**
   * Create an order. Requires Authentication.
   * You can place two types of orders: limit and market. Orders can only be placed if your account
   * has sufficient funds. Once an order is placed, your account funds will be put on hold for the
   * duration of the order. How much and which funds are put on hold depends on the order type and
   * parameters specified.
   * This endpoint requires the "trade" permission.
   * See: https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postorders/
   * @todo Add sub resources to make interacting with the order engine's rules easier.
   */
  public async create(
    dto: CoinbaseStopOrderDTO,
    type: CoinbaseOrderType.STOP,
  ): Promise<CoinbaseOrder>
  public async create(
    dto: CoinbaseLimitOrderDTO,
    type: CoinbaseOrderType.LIMIT,
  ): Promise<CoinbaseOrder>
  public async create(
    dto: CoinbaseMarketOrderDTO,
    type: CoinbaseOrderType = CoinbaseOrderType.MARKET,
  ): Promise<CoinbaseOrder> {
    return await this.request.post<CoinbaseOrder>(undefined, { ...dto, type })
  }

  /**
   * Cancel an order. Requires Authentication.
   * Cancel a single open order by id.
   * The order must belong to the profile that the API key belongs to. If the order had no matches during its lifetime, its record may be purged. This means the order details is not available with GET /orders/<id>.
   * To prevent a race condition when canceling an order, it is highly recommended that you specify the product id as a query string.
   * See: https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_deleteorder/
   * @param id either the exchange assigned id or the client assigned client_oid. When using client_oid it must be preceded by the client: namespace.
   */
  public async cancel(id: string, product_id?: string): Promise<void> {
    const query = product_id !== undefined ? [{ key: 'product_id', value: product_id }] : []
    return await this.request.delete(`/${id}`, query)
  }
}
