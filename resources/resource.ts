/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { CoinbaseConfig } from '../core/config/config.ts'
import { CoinbaseRest } from '../core/rest/rest.ts'

export abstract class CoinbaseResource {
  protected readonly request: CoinbaseRest

  /**
   * @param config Pass along the configuration object from the parent instance.
   * @param path Subpath to an api endpoint that all requests from this instance will make.
   * @param has_auth Whether or not this request instance requires authentication.
   */
  constructor(config: CoinbaseConfig, path: string, has_auth: boolean = false) {
    const base_url = config.urls.api + path
    const auth = has_auth ? config.auth : undefined
    this.request = new CoinbaseRest(base_url, auth)
  }
}
