/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { assertEquals } from '@std/assert'
import { TEST_AUTH_CONFIG } from '../testing/core.test.data.ts'
import { get_config } from './config.ts'
import { get_auth_config } from './functions/get-auth-config.ts'
import { get_url_config } from './functions/get-url-config.ts'

Deno.test('get_config', () => {
  const auth_options = { auth: TEST_AUTH_CONFIG }
  const sandbox_options = { sandbox: true }

  const auth_config = get_config(auth_options)
  assertEquals(auth_config.auth, get_auth_config(auth_options))
  assertEquals(auth_config.urls, get_url_config(auth_options))

  const sandbox_config = get_config(sandbox_options)
  assertEquals(sandbox_config.auth, get_auth_config(sandbox_options))
  assertEquals(sandbox_config.urls, get_url_config(sandbox_options))
})
