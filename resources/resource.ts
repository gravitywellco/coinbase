/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { CoinbaseCore } from '../core/coinbase.core.ts'
import { CoinbaseRequest } from '../core/coinbase.request.ts'

export abstract class CoinbaseResource {
  protected readonly request: CoinbaseRequest

  /**
   * @param core Core instance that this request instance will use.
   * @param path Subpath to an api endpoint that all requests from this instance will make.
   * @param has_auth Whether or not this request instance requires authentication.
   */
  constructor(core: CoinbaseCore, path: string, has_auth: boolean = false) {
    this.request = new CoinbaseRequest(core, path, has_auth)
  }
}
