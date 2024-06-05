/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export interface CoinbaseCurrency {
  id: string
  name: string
  min_size: string
  status: string
  message?: string
  max_precision: string
  convertible_to?: string[]
  details: CoinbaseCurrencyDetails
  default_network?: string
  supported_networks?: CoinbaseCurrencyNetwork[]
  display_name?: string
}

export interface CoinbaseCurrencyDetails {
  type: CoinbaseCurrencyType
  symbol?: string
  network_confirmations?: number
  sort_order?: number
  crypto_address_link?: string
  crypto_transaction_link?: string
  push_payment_methods?: string[]
  group_types?: string[]
  display_name?: string
  processing_time_seconds?: number
  min_withdrawal_amount?: number
  max_withdrawal_amount?: number
}

export interface CoinbaseCurrencyNetwork {
  id?: string
  name?: string
  status?: string
  contract_address?: string
  crypto_address_link?: string
  crypto_transaction_link?: string
  min_withdrawal_amount?: number
  max_withdrawal_amount?: number
  network_confirmations?: number
  processing_time_seconds?: number
}

export enum CoinbaseCurrencyType {
  FIAT = 'fiat',
  CRYPTO = 'crypto',
}
