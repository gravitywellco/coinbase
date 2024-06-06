/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { CoinbaseCurrency } from './currencies.types.ts'
import type { CoinbaseOptions } from '../../utilities/options.types.ts'
import { CoinbaseResource } from '../resource.ts'

export class CoinbaseCurrencies extends CoinbaseResource {
  constructor(options: CoinbaseOptions) {
    super(options, '/currencies')
  }

  public async all(): Promise<CoinbaseCurrency[]> {
    return await this.request.get<CoinbaseCurrency[]>()
  }

  public async get(id: string): Promise<CoinbaseCurrency> {
    return await this.request.get<CoinbaseCurrency>(`/${id}`)
  }
}
