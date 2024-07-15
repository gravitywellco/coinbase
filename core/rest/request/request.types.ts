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

export interface RequestData {
  url: string
  path: string
  query?: Query
  // deno-lint-ignore no-explicit-any
  body?: Record<string, any>
}
