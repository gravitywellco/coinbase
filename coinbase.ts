/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { CoinbaseOptions } from './utilities/options.types.ts'
import { CoinbaseCurrencies } from './resources/currencies/currencies.resource.ts'
import { CoinbaseProfiles } from './resources/profiles/profiles.resource.ts'

export class Coinbase {
  public readonly currencies: CoinbaseCurrencies
  public readonly profiles: CoinbaseProfiles

  constructor(options: CoinbaseOptions = {}) {
    this.currencies = new CoinbaseCurrencies(options)
    this.profiles = new CoinbaseProfiles(options)
  }
}
