/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { type Query, RequestMethod, RequestUtility } from './utilities/request.utility.ts'
import type { CoinbaseCore } from './coinbase.core.ts'

const BASE_HEADERS = {
  'Content-Type': 'application/json',
  'User-Agent': 'gravity/coinbase',
}

/**
 * Coinbase API request class.
 */
export class CoinbaseRequest {
  private readonly url: string

  /**
   * @param core CoinbaseCore object.
   * @param path Subpath to an api endpoint that all requests from this instance will make.
   * @param has_auth Whether or not this request instance requires authentication.
   */
  constructor(
    private readonly core: CoinbaseCore,
    private readonly path: string,
    private readonly has_auth = false,
  ) {
    this.url = `${core.config.urls.api}${path}`
  }

  private async headers(
    path: string,
    method: string,
    body: unknown | undefined = undefined,
  ): Promise<HeadersInit> {
    if (!this.has_auth) return BASE_HEADERS
    const auth_keys = await this.core.auth.get_keys(
      this.core.config.auth,
      `${this.path}${path}`,
      method,
      body,
    )
    const auth_headers = this.core.auth.get_headers(auth_keys)
    return {
      ...BASE_HEADERS,
      ...auth_headers,
    }
  }

  private async request<T>(
    method: RequestMethod,
    path = '',
    query: Query = [],
    body: Record<string, unknown> | undefined = undefined,
  ): Promise<T> {
    if (query.length) path += RequestUtility.ParseQuery(query)
    const response = await fetch(`${this.url}${path}`, {
      method,
      headers: await this.headers(path, method, body),
      body: body ? JSON.stringify(body) : undefined,
    })
    if (!response.ok) throw new Error(response.statusText)
    return await RequestUtility.ParseResponse<T>(response)
  }

  public async get<T>(path = '', query: Query = []): Promise<T> {
    return await this.request<T>(RequestMethod.GET, path, query)
  }

  public async post<T>(path = '', body: Record<string, unknown>): Promise<T> {
    return await this.request<T>(RequestMethod.POST, path, [], body)
  }

  public async put<T>(path = '', body: Record<string, unknown>): Promise<T> {
    return await this.request<T>(RequestMethod.PUT, path, [], body)
  }
}
