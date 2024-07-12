/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { encodeBase64 } from '@std/encoding'
import type { CoinbaseAuthConfig, CoinbaseAuthKeys } from '../types/auth.types.ts'
import { CryptographyUtility } from '../utilities/cryptography.utility.ts'

/**
 * Returns Coinbase API authentication data, used in requests.
 * @param config Coinbase API authentication configuration.
 * @param path Full path to the API endpoint.
 * @param method HTTP method.
 * @param body Any body, if applicable. Will be stringified.
 * @returns Authentication keys.
 */
export async function get_auth_keys(
  config: CoinbaseAuthConfig,
  path: string,
  method: string,
  body: unknown | undefined = undefined,
): Promise<CoinbaseAuthKeys> {
  const timestamp = `${Date.now() / 1000}`
  const message = `${timestamp}${method}${path}${body === undefined ? '' : JSON.stringify(body)}`
  const key = await CryptographyUtility.CreateSigningKey(config.secret)
  const signature = await CryptographyUtility.Sign(message, key)

  return {
    key: config.key,
    passphrase: config.passphrase,
    signature: encodeBase64(signature),
    timestamp,
  }
}
