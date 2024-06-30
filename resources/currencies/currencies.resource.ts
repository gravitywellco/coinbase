/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { CoinbaseCurrency } from './currencies.types.ts'
import { CoinbaseResource } from '../resource.ts'
import type { CoinbaseConfig } from '../../core/coinbase.config.ts'

export class CoinbaseCurrencies extends CoinbaseResource {
  constructor(config: CoinbaseConfig) {
    super(config, '/currencies')
  }

  /**
   * Gets a list of all known currencies. Note: Not all currencies may be currently in use for trading.
   * See: https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getcurrencies/
   * @returns {Promise<CoinbaseCurrency[]>}
   */
  public async all(): Promise<CoinbaseCurrency[]> {
    return await this.request.get<CoinbaseCurrency[]>()
  }

  /**
   * Gets a single currency by id.
   * See: https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getcurrency/
   * @param {string} id ID of the currency
   * @returns {Promise<CoinbaseCurrency>}
   */
  public async get(id: string): Promise<CoinbaseCurrency> {
    return await this.request.get<CoinbaseCurrency>(`/${id}`)
  }
}
