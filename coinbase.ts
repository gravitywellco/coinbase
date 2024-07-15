/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { type CoinbaseConfig, type CoinbaseOptions, get_config } from './core/config/config.ts'
import { CoinbaseAccounts } from './resources/accounts/accounts.resource.ts'
import { CoinbaseCurrencies } from './resources/currencies/currencies.resource.ts'
import { CoinbaseOrders } from './resources/orders/orders.resource.ts'
import { CoinbaseProfiles } from './resources/profiles/profiles.resource.ts'

export class Coinbase {
  public readonly config: CoinbaseConfig
  public readonly accounts: CoinbaseAccounts
  public readonly currencies: CoinbaseCurrencies
  public readonly orders: CoinbaseOrders
  public readonly profiles: CoinbaseProfiles

  constructor(options?: CoinbaseOptions) {
    this.config = get_config(options)
    this.accounts = new CoinbaseAccounts(this.config)
    this.currencies = new CoinbaseCurrencies(this.config)
    this.orders = new CoinbaseOrders(this.config)
    this.profiles = new CoinbaseProfiles(this.config)
  }
}
