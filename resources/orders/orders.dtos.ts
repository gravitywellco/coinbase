/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type {
  CoinbaseOrderCancelAfter,
  CoinbaseOrderSelfTradePrevention,
  CoinbaseOrderSide,
  CoinbaseOrderStopType,
  CoinbaseOrderTimeInForce,
} from './orders.types.ts'

interface CoinbaseOrderDTO extends Record<string, unknown> {
  product_id: string
  profile_id?: string
  client_oid?: string
  side: CoinbaseOrderSide
  stp?: CoinbaseOrderSelfTradePrevention
}

export interface CoinbaseMarketOrderDTO extends CoinbaseOrderDTO {
  size?: string
  funds?: string
}

export interface CoinbaseLimitOrderDTO extends CoinbaseOrderDTO {
  price: string
  size: string
  time_in_force?: CoinbaseOrderTimeInForce
  cancel_after?: CoinbaseOrderCancelAfter
  post_only?: boolean
  max_floor?: string
}

export interface CoinbaseStopOrderDTO extends CoinbaseLimitOrderDTO {
  stop: CoinbaseOrderStopType
  stop_price: string
  stop_limit_price: string
}
