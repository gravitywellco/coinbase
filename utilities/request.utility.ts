/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export type Query = QueryParam[]
export interface QueryParam extends Record<string, string | number | boolean> {}

export class RequestUtility {
  public static ParseQuery(query: Query): string {
    return query.length ? '?' + query.map((q) => `${q.key}=${q.value}`).join('&') : ''
  }
}
