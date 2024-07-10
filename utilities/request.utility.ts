/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export type Query = QueryParam[]
export interface QueryParam extends Record<string, string | number | boolean> {}
export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export class RequestUtility {
  public static ParseQuery(query: Query): string {
    return query.length ? '?' + query.map((q) => `${q.key}=${q.value}`).join('&') : ''
  }

  public static async ParseResponse<T>(response: Response): Promise<T> {
    try {
      const clone = response.clone()
      return await clone.json() as T
    } catch (_error) {
      return await response.text() as T
    }
  }
}
