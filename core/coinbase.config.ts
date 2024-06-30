/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { CoinbaseAuthConfig, CoinbaseUrlConfig } from './coinbase.config.types.ts'

/**
 * Configuration for the Coinbase API, internal module.
 * @access package-private
 */
export class CoinbaseConfig {
  private readonly root_url: string = 'exchange.coinbase.com'
  public readonly authenticated: boolean = false
  public readonly auth: CoinbaseAuthConfig
  public readonly urls: CoinbaseUrlConfig

  constructor(auth?: CoinbaseAuthConfig, sandbox: boolean = false) {
    this.auth = auth || { key: '', secret: '', passphrase: '' }
    if (auth) this.authenticated = true

    this.urls = {
      api: `https://${sandbox ? 'api-public.sandbox' : 'api'}.${this.root_url}`,
      wss: `wss://${sandbox ? 'ws-direct.sandbox' : 'ws-direct'}.${this.root_url}`
    }
  }
}
