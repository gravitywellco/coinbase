/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { CoinbaseOptions } from './options/options.types.ts'
import { CoinbaseCurrencies } from './resources/currencies/currencies.resource.ts'

export class Coinbase {
  public readonly currencies: CoinbaseCurrencies

  constructor(options: CoinbaseOptions = {}) {
    this.currencies = new CoinbaseCurrencies(options)
  }
}
