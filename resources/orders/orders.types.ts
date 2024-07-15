/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export interface CoinbaseOrder {
  id: string
  product_id: string
  side: CoinbaseOrderSide
  type: CoinbaseOrderType
  post_only: boolean
  created_at: string
  fill_fees: string
  filled_size: string
  status: CoinbaseOrderStatus
  settled: boolean
  price?: string
  size?: string
  profile_id?: string
  funds?: string
  specified_funds?: string
  time_in_force?: CoinbaseOrderTimeInForce
  expire_time?: string
  done_at?: string
  done_reason?: string
  reject_reason?: string
  executed_value?: string
  stop?: CoinbaseOrderStopType
  stop_price?: string
  funding_amount?: string
  client_oid?: string
  market_type?: string
  max_floor?: string
  secondary_order_id?: string
  stop_limit_price?: string
}

export enum CoinbaseOrderSide {
  BUY = 'buy',
  SELL = 'sell',
}

export enum CoinbaseOrderType {
  LIMIT = 'limit',
  MARKET = 'market',
  STOP = 'stop',
}

export enum CoinbaseOrderStopType {
  LOSS = 'loss',
  ENTRY = 'entry',
}

export enum CoinbaseOrderTimeInForce {
  GOOD_TILL_CANCELED = 'GTC',
  GOOD_TILL_DATE = 'GTD',
  IMMEDIATE_OR_CANCEL = 'IOC',
  FILL_OR_KILL = 'FOK',
}

export enum CoinbaseOrderStatus {
  OPEN = 'open',
  PENDING = 'pending',
  REJECTED = 'rejected',
  DONE = 'done',
  ACTIVE = 'active',
  RECEIVED = 'received',
  ALL = 'all',
}

export enum CoinbaseOrderSelfTradePrevention {
  DECREMENT_AND_CANCEL = 'dc',
  CANCEL_OLDEST = 'co',
  CANCEL_NEWEST = 'cn',
  CANCEL_BOTH = 'cb',
}

export enum CoinbaseOrderCancelAfter {
  MIN = 'min',
  HOUR = 'hour',
  DAY = 'day',
}
