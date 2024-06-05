/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { CoinbaseOptions } from '../options/options.types.ts'

/**
 * Coinbase API request class.
 */
export class CoinbaseRequest {
  private readonly url: string

  /**
   * @param {string} path Subpath to an api endpoint that all requests from this instance will make.
   * @param {CoinbaseOptions} options
   */
  constructor(path: string, options: CoinbaseOptions) {
    const api_url = options.api_url ?? 'https://api.exchange.coinbase.com'
    this.url = `${api_url}${path}`
  }

  public async get<T>(path = ''): Promise<T> {
    const response = await fetch(`${this.url}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'gravity/coinbase',
      },
    })
    if (!response.ok) throw new Error(response.statusText)
    return (await response.json()) as T
  }
}
