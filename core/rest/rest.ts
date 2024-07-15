/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { CoinbaseAuthConfig } from '../auth/auth.ts'
import { CoinbaseRequest } from './request/request.module.ts'
import type { Query, RequestData } from './request/request.types.ts'

export * from './request/request.types.ts'

/** Subclass for resource apis to be cleaner. Cleaner access to CoinbaseRequest */
export class CoinbaseRest {
  public readonly root: string
  public readonly base: string
  public readonly auth: CoinbaseAuthConfig | undefined

  /**
   * @param base_url Base url for the rest instance, will be prepended to all requests.
   * @param auth Optional auth configuration for the rest instance, will be passed to all requests.
   */
  constructor(root: string, base: string, auth?: CoinbaseAuthConfig) {
    this.root = root
    this.base = base
    this.auth = auth
  }

  public url_data(path: string): RequestData {
    return { url: this.root, path: this.base + path }
  }

  /** Make a GET request to the Coinbase API. */
  public async get<T>(path = '', query?: Query): Promise<T> {
    const data: RequestData = { url: this.root, path: this.base + path, query }
    return await CoinbaseRequest.Get<T>(data, this.auth)
  }

  /** Make a POST request to the Coinbase API. */
  public async post<T>(path = '', body?: Record<string, unknown>): Promise<T> {
    const data: RequestData = { ...this.url_data(path), body }
    return await CoinbaseRequest.Post<T>(data, this.auth)
  }

  /** Make a PUT request to the Coinbase API. */
  public async put<T>(path = '', body?: Record<string, unknown>): Promise<T> {
    const data: RequestData = { ...this.url_data(path), body }
    return await CoinbaseRequest.Put<T>(data, this.auth)
  }

  /** Make a DELETE request to the Coinbase API. */
  public async delete<T>(path = '', query?: Query): Promise<T> {
    const data: RequestData = { ...this.url_data(path), query }
    return await CoinbaseRequest.Delete<T>(data, this.auth)
  }
}
