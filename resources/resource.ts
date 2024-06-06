/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { CoinbaseOptions } from '../utilities/options.types.ts'
import { CoinbaseRequest } from './request.ts'

export abstract class CoinbaseResource {
  protected readonly request: CoinbaseRequest

  constructor(
    protected readonly options: CoinbaseOptions,
    protected readonly path: string,
    auth: boolean = false
  ) {
    this.request = new CoinbaseRequest(this.path, this.options, auth)
  }
}
