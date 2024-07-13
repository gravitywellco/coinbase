/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { CoinbaseAccount } from './accounts.types.ts'
import type { CoinbaseConfig } from '../../core/config/config.ts'
import { CoinbaseResource } from '../resource.ts'

export class CoinbaseAccounts extends CoinbaseResource {
  constructor(config: CoinbaseConfig) {
    super(config, '/accounts', true)
  }

  /**
   * Get a list of trading accounts from the profile of the API key.
   * This endpoint requires either the "view" or "trade" permission.
   * See: https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccounts/
   * @returns {Promise<CoinbaseAccount[]>}
   */
  public async all(): Promise<CoinbaseAccount[]> {
    return await this.request.get<CoinbaseAccount[]>()
  }

  /**
   * Information for a single account. Use this endpoint when you know the account_id. API key must belong to the same profile as the account.
   * This endpoint requires either the "view" or "trade" permission.
   * See: https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccount/
   * @param {string} id ID of the account
   * @returns {Promise<CoinbaseAccount>}
   */
  public async get(id: string): Promise<CoinbaseAccount> {
    return await this.request.get<CoinbaseAccount>(`/${id}`)
  }
}
