/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { TEST_AUTH_CONFIG } from '../../testing/core.test.data.ts'

export const TEST_AUTH_KEYS = {
  key: TEST_AUTH_CONFIG.key,
  passphrase: TEST_AUTH_CONFIG.passphrase,
  signature: 'encrypted_signature',
  timestamp: Date.now().toString(),
}
