/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { CoinbaseConfig } from './core/coinbase.config.ts'
import { CoinbaseOptions } from './core/coinbase.config.types.ts'
import { CoinbaseCurrencies } from './resources/currencies/currencies.resource.ts'
import { CoinbaseProfiles } from './resources/profiles/profiles.resource.ts'

export class Coinbase {
  private readonly config: CoinbaseConfig
  public readonly currencies: CoinbaseCurrencies
  public readonly profiles: CoinbaseProfiles

  constructor(options?: CoinbaseOptions) {
    this.config = new CoinbaseConfig(options?.auth, options?.sandbox)
    this.currencies = new CoinbaseCurrencies(this.config)
    this.profiles = new CoinbaseProfiles(this.config)
  }
}
