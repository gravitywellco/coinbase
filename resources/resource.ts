/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { CoinbaseCore } from '../core/coinbase.core.ts'
import { type Query, RequestUtility } from '../utilities/request.utility.ts'

export abstract class CoinbaseResource {
  protected readonly url: string

  /**
   * @param {CoinbaseCore} core Core instance that this request instance will use.
   * @param {string} path Subpath to an api endpoint that all requests from this instance will make.
   * @param {boolean} has_auth Whether or not this request instance requires authentication.
   */
  constructor(
    protected readonly core: CoinbaseCore,
    protected readonly path: string,
    protected readonly has_auth: boolean = false,
  ) {
    this.url = `${this.core.config.urls.api}${path}`
  }

  protected async headers(
    path: string,
    method: string,
    body: unknown | undefined = undefined,
  ): Promise<HeadersInit> {
    return Object.assign({}, {
      'Content-Type': 'application/json',
      'User-Agent': 'gravity/coinbase',
    }, this.has_auth ? await this.core.auth.headers(`${this.path}${path}`, method, body) : {})
  }

  protected async _get<T>(path = '', query: Query = []): Promise<T> {
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

  protected async _post<T>(body: Record<string, unknown>, path = ''): Promise<T> {
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

  protected async _put<T>(body: Record<string, unknown>, path = ''): Promise<T> {
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
