/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { type CoinbaseConfig, type CoinbaseOptions, get_config } from './config/config.ts'
import { auth, type CoinbaseAuth } from './auth/auth.ts'

export class CoinbaseCore {
  public readonly authenticated: boolean = false
  public readonly config: CoinbaseConfig
  public readonly auth: CoinbaseAuth

  constructor(options?: CoinbaseOptions) {
    if (options?.auth) this.authenticated = true
    this.config = get_config(options)
    this.auth = auth
  }
}
