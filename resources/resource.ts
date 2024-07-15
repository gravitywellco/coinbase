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
   * @param base_path Subpath to an api endpoint that all requests from this instance will make.
   * @param has_auth Whether or not this request instance requires authentication.
   */
  constructor(config: CoinbaseConfig, base_path: string, has_auth: boolean = false) {
    const auth = has_auth ? config.auth : undefined
    this.request = new CoinbaseRest(config.urls.api, base_path, auth)
  }
}
