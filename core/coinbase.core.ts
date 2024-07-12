/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { CoinbaseOptions } from './coinbase.config.types.ts'
import { auth, type CoinbaseAuth } from './auth/auth.ts'
import { CoinbaseConfig } from './coinbase.config.ts'

export class CoinbaseCore {
  public readonly authenticated: boolean = false
  public readonly config: CoinbaseConfig
  public readonly auth: CoinbaseAuth

  constructor(options?: CoinbaseOptions) {
    const { auth: auth_options, sandbox } = options ?? {}
    if (auth_options) this.authenticated = true
    this.config = new CoinbaseConfig(auth_options, sandbox)
    this.auth = auth
  }
}
