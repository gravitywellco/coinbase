/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { CoinbaseAuth } from '../utilities/auth.utility.ts'
import { type Query, RequestUtility } from '../utilities/request.utility.ts'
import { CoinbaseConfig } from '../core/coinbase.config.ts'

/**
 * Coinbase API request class.
 */
export class CoinbaseRequest {
  private readonly auth: CoinbaseAuth
  private readonly url: string

  /**
   * @param {CoinbaseConfig} config Configuration object for the Coinbase API.
   * @param {string} path Subpath to an api endpoint that all requests from this instance will make.
   * @param {boolean} has_auth Whether or not this request instance requires authentication.
   */
  constructor(
    config: CoinbaseConfig,
    private readonly path: string,
    private readonly has_auth = false,
  ) {
    this.auth = new CoinbaseAuth(config.auth)
    this.url = `${config.urls.api}${path}`
  }

  private async headers(
    path: string,
    method: string,
    body: unknown | undefined = undefined,
  ): Promise<HeadersInit> {
    return Object.assign({}, {
      'Content-Type': 'application/json',
      'User-Agent': 'gravity/coinbase',
    }, this.has_auth ? await this.auth.headers(`${this.path}${path}`, method, body) : {})
  }

  public async get<T>(path = '', query: Query = []): Promise<T> {
    if (query.length) path += RequestUtility.ParseQuery(query)
    const response = await fetch(`${this.url}${path}`, {
      method: 'GET',
      headers: await this.headers(path, 'GET'),
    })
    if (!response.ok) throw new Error(response.statusText)
    try {
      return await response.json() as T
    } catch (_error) {
      return response.body as T
    }
  }

  public async post<T>(body: Record<string, unknown>, path = ''): Promise<T> {
    const response = await fetch(`${this.url}${path}`, {
      method: 'POST',
      headers: await this.headers(path, 'POST', body),
      body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error(response.statusText)
    try {
      return await response.json() as T
    } catch (_error) {
      return response.body as T
    }
  }

  public async put<T>(body: Record<string, unknown>, path = ''): Promise<T> {
    const response = await fetch(`${this.url}${path}`, {
      method: 'PUT',
      headers: await this.headers(path, 'PUT', body),
      body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error(response.statusText)
    try {
      return await response.json() as T
    } catch (_error) {
      return response.body as T
    }
  }
}
