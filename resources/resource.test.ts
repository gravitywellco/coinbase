/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { CoinbaseResource } from './resource.ts'
import { CoinbaseCore } from '../core/coinbase.core.ts'
import { assertArrayIncludes, assertEquals, assertInstanceOf } from '@std/assert'

class TestResource extends CoinbaseResource {
  constructor(core: CoinbaseCore, has_auth: boolean = false) {
    super(core, '/testing', has_auth)
  }
}

Deno.test('CoinbaseResource', async (test) => {})
