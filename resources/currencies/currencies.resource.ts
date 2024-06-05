/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { CoinbaseCurrency } from './currencies.types.ts'
import type { CoinbaseOptions } from '../../options/options.types.ts'
import { CoinbaseRequest } from '../request.ts'

export class CoinbaseCurrencies {
  private readonly path = '/currencies'
  private readonly request: CoinbaseRequest

  constructor(private readonly options: CoinbaseOptions) {
    this.request = new CoinbaseRequest(this.path, this.options)
  }

  public async all(): Promise<CoinbaseCurrency[]> {
    return await this.request.get<CoinbaseCurrency[]>()
  }

  public async get(id: string): Promise<CoinbaseCurrency> {
    return await this.request.get<CoinbaseCurrency>(`/${id}`)
  }
}
