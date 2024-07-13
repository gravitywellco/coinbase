/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { CoinbaseCore } from '../core/coinbase.core.ts'
import { CoinbaseRest } from '../core/rest/rest.ts'

export abstract class CoinbaseResource {
  protected readonly request: CoinbaseRest

  /**
   * @param core Core instance that this request instance will use.
   * @param path Subpath to an api endpoint that all requests from this instance will make.
   * @param has_auth Whether or not this request instance requires authentication.
   */
  constructor(core: CoinbaseCore, path: string, has_auth: boolean = false) {
    const base_url = core.config.urls.api + path
    const auth = has_auth ? core.config.auth : undefined
    this.request = new CoinbaseRest(base_url, auth)
  }
}
