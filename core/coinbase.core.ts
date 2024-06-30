/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { CoinbaseOptions } from './coinbase.config.types.ts'
import { CoinbaseConfig } from './coinbase.config.ts'
import { CoinbaseAuth } from './coinbase.auth.ts'

export class CoinbaseCore {
  public readonly authenticated: boolean = false
  public readonly config: CoinbaseConfig
  public readonly auth: CoinbaseAuth

  constructor(options?: CoinbaseOptions) {
    const { auth, sandbox } = options ?? {}
    if (auth) this.authenticated = true
    this.config = new CoinbaseConfig(auth, sandbox)
    this.auth = new CoinbaseAuth(this.config.auth)
  }
}
