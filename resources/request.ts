/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { CoinbaseAuth } from '../utilities/auth.utility.ts'
import type { CoinbaseOptions } from '../utilities/options.types.ts'

/**
 * Coinbase API request class.
 */
export class CoinbaseRequest {
  private readonly auth: CoinbaseAuth
  private readonly url: string

  /**
   * @param {string} path Subpath to an api endpoint that all requests from this instance will make.
   * @param {CoinbaseOptions} options
   */
  constructor(
    private readonly path: string,
    private readonly options: CoinbaseOptions,
    private readonly has_auth = false,
  ) {
    const api_url = options.api_url ?? 'https://api.exchange.coinbase.com'
    this.auth = new CoinbaseAuth(options.auth ?? { key: '', secret: '', passphrase: '' })
    this.url = `${api_url}${path}`
  }

  private async headers(
    path: string,
    method: string,
    body: unknown | undefined = undefined,
  ): Promise<HeadersInit> {
    return Object.assign({}, {
      'Content-Type': 'application/json',
      'User-Agent': 'gravity/coinbase',
    }, this.has_auth ? await this.auth.keys(`${this.path}${path}`, method, body, true) : {})
  }

  public async get<T>(path = ''): Promise<T> {
    const response = await fetch(`${this.url}${path}`, {
      method: 'GET',
      headers: await this.headers(path, 'GET'),
    })
    if (!response.ok) throw new Error(response.statusText)
    return (await response.json()) as T
  }
}
