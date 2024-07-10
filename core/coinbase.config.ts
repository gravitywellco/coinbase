/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { EnvironmentUtility } from '../utilities/environment.utility.ts'
import type { CoinbaseAuthConfig, CoinbaseUrlConfig } from './coinbase.config.types.ts'

/**
 * Configuration for the Coinbase API, internal module.
 * @access package-private
 */
export class CoinbaseConfig {
  private readonly root_url: string = 'exchange.coinbase.com'
  public readonly auth: CoinbaseAuthConfig
  public readonly urls: CoinbaseUrlConfig

  constructor(auth?: CoinbaseAuthConfig, sandbox: boolean = false) {
    if (auth !== undefined) this.auth = auth
    else {
      this.auth = {
        key: EnvironmentUtility.Get('COINBASE_API_KEY'),
        secret: EnvironmentUtility.Get('COINBASE_API_SECRET'),
        passphrase: EnvironmentUtility.Get('COINBASE_API_PASSPHRASE'),
      }
    }

    this.urls = {
      api: `https://${sandbox ? 'api-public.sandbox' : 'api'}.${this.root_url}`,
      wss: `wss://${sandbox ? 'ws-direct.sandbox' : 'ws-direct'}.${this.root_url}`,
    }
  }
}
