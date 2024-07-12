/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { CoinbaseCore } from './core/coinbase.core.ts'
import type { CoinbaseOptions } from './core/config/config.ts'
import { CoinbaseAccounts } from './resources/accounts/accounts.resource.ts'
import { CoinbaseCurrencies } from './resources/currencies/currencies.resource.ts'
import { CoinbaseProfiles } from './resources/profiles/profiles.resource.ts'

export class Coinbase {
  private readonly core: CoinbaseCore
  public readonly accounts: CoinbaseAccounts
  public readonly currencies: CoinbaseCurrencies
  public readonly profiles: CoinbaseProfiles

  constructor(options?: CoinbaseOptions) {
    this.core = new CoinbaseCore(options)
    this.accounts = new CoinbaseAccounts(this.core)
    this.currencies = new CoinbaseCurrencies(this.core)
    this.profiles = new CoinbaseProfiles(this.core)
  }
}
