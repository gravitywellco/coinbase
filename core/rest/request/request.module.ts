/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { type RequestData, RequestMethod } from './request.types.ts'
import type { CoinbaseAuthConfig } from '../../auth/auth.ts'
import { RequestUtility } from './request.utility.ts'

/** Internal helper class for making requests (authenticated or not) to coinbase. */
export class CoinbaseRequest {
  /** Make a request to the Coinbase API. */
  static async Send<T>(method: RequestMethod, data: RequestData, auth?: CoinbaseAuthConfig) {
    const url = `${data.url}${data.path}${RequestUtility.ParseQuery(data.query)}`
    const headers = await RequestUtility.GetHeaders(method, data, auth)
    const body = data.body ? JSON.stringify(data.body) : undefined
    const response = await fetch(url, { headers, method, body })
    if (!response.ok) throw new Error(response.statusText)
    return await RequestUtility.ParseResponse<T>(response)
  }

  /** Make a GET request to the Coinbase API. */
  static async Get<T>(data: RequestData, auth?: CoinbaseAuthConfig) {
    return await CoinbaseRequest.Send<T>(RequestMethod.GET, data, auth)
  }

  /** Make a POST request to the Coinbase API. */
  static async Post<T>(data: RequestData, auth?: CoinbaseAuthConfig) {
    return await CoinbaseRequest.Send<T>(RequestMethod.POST, data, auth)
  }

  /** Make a PUT request to the Coinbase API. */
  static async Put<T>(data: RequestData, auth?: CoinbaseAuthConfig) {
    return await CoinbaseRequest.Send<T>(RequestMethod.PUT, data, auth)
  }

  /** Make a DELETE request to the Coinbase API. */
  static async Delete<T>(data: RequestData, auth?: CoinbaseAuthConfig) {
    return await CoinbaseRequest.Send<T>(RequestMethod.DELETE, data, auth)
  }
}
