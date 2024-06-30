/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { CoinbaseResource } from './resource.ts'
import { CoinbaseCore } from '../core/coinbase.core.ts'
import { assertArrayIncludes, assertEquals } from '@std/assert'

class TestResource extends CoinbaseResource {
  constructor(core: CoinbaseCore, has_auth: boolean = false) {
    super(core, '/testing', has_auth)
  }

  public get internal_url(): string {
    return this.url
  }

  public async internal_headers(subpath: string): Promise<HeadersInit> {
    return await this.headers(subpath, 'GET')
  }
}

Deno.test('CoinbaseResource', async (test) => {
  const core = new CoinbaseCore()

  await test.step('sets the url correctly', () => {
    const resource = new TestResource(core)
    assertEquals(resource.internal_url, `${core.config.urls.api}/testing`)
  })

  await test.step('generates headers correctly', async () => {
    const resource = new TestResource(core)
    const headers = await resource.internal_headers('/testing')
    assertEquals(headers, {
      'Content-Type': 'application/json',
      'User-Agent': 'gravity/coinbase',
    })
  })

  await test.step('generates headers correctly with auth', async () => {
    const auth_core = new CoinbaseCore({
      auth: { key: 'yay', secret: 'dGVzdF9zZWNyZXQ=', passphrase: 'works' },
    })
    const resource = new TestResource(auth_core, true)
    const headers = await resource.internal_headers('/testing')
    assertArrayIncludes(Object.keys(headers), [
      'Content-Type',
      'User-Agent',
      'CB-ACCESS-KEY',
      'CB-ACCESS-SIGN',
      'CB-ACCESS-TIMESTAMP',
      'CB-ACCESS-PASSPHRASE',
    ])
  })
})
