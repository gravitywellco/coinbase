/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { auth, type CoinbaseAuthConfig } from '../../auth/auth.ts'
import type { Query, RequestData, RequestMethod } from './request.types.ts'

/** RequestUtility provides utility functions for working with requests. */
export class RequestUtility {
  static BASE_HEADERS = {
    'Content-Type': 'application/json',
    'User-Agent': 'gravity/coinbase',
  }

  /** Parses a query array into a query string. */
  public static ParseQuery(query?: Query): string {
    if (!query || !query.length) return ''
    return '?' + query.map((q) => `${q.key}=${q.value}`).join('&')
  }

  /** Get headers, including auth, for a request. */
  static async GetHeaders(
    method: RequestMethod,
    data: RequestData,
    config?: CoinbaseAuthConfig,
  ): Promise<HeadersInit> {
    if (!config) return RequestUtility.BASE_HEADERS
    const auth_keys = await auth.get_keys(config, data.path, method, data.body)
    const auth_headers = auth.get_headers(auth_keys)
    return {
      ...RequestUtility.BASE_HEADERS,
      ...auth_headers,
    }
  }

  /** Parses response data as JSON or text. */
  public static async ParseResponse<T>(response: Response): Promise<T> {
    try {
      const clone = response.clone()
      return await clone.json() as T
    } catch (_error) {
      return await response.text() as T
    }
  }
}
