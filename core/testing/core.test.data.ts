/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export const TEST_AUTH_CONFIG = {
  key: 'test_key',
  secret: 'dGVzdF9zZWNyZXQ=',
  passphrase: 'test_passphrase',
}

export const TEST_AUTH_KEYS = {
  key: TEST_AUTH_CONFIG.key,
  passphrase: TEST_AUTH_CONFIG.passphrase,
  signature: 'encrypted_signature',
  timestamp: `${Date.now() / 1000}`,
}
