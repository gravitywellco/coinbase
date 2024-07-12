/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { assertEquals, assertInstanceOf } from '@std/assert'
import { TEST_AUTH_CONFIG } from '../../testing/core.test.data.ts'
import { CryptographyUtility } from './cryptography.utility.ts'

Deno.test('CryptographyUtility.CreateSigningKey', async (test) => {
  await test.step('should key that is an instance of CryptoKey', async () => {
    const key = await CryptographyUtility.CreateSigningKey(TEST_AUTH_CONFIG.secret)
    assertInstanceOf(key, CryptoKey)
  })

  await test.step('should create a signing key from a secret', async () => {
    const key = await CryptographyUtility.CreateSigningKey(TEST_AUTH_CONFIG.secret)
    assertEquals(key.usages, ['sign'])
    assertEquals(key.algorithm.name, 'HMAC')
    assertEquals(key.type, 'secret')
  })

  await test.step('should create a verification key from a secret', async () => {
    const key = await CryptographyUtility.CreateSigningKey(TEST_AUTH_CONFIG.secret, 'verify')
    assertEquals(key.usages, ['verify'])
    assertEquals(key.algorithm.name, 'HMAC')
    assertEquals(key.type, 'secret')
  })
})

Deno.test('CryptographyUtility.Sign/Verify', async (test) => {
  await test.step('should sign a message with a key', async () => {
    const message = 'test message'
    const signing_key = await CryptographyUtility.CreateSigningKey(TEST_AUTH_CONFIG.secret)
    const signature = await CryptographyUtility.Sign(message, signing_key)

    const verify_key = await CryptographyUtility.CreateSigningKey(TEST_AUTH_CONFIG.secret, 'verify')
    assertEquals(await CryptographyUtility.Verify(message, signature, verify_key), true)
  })
})
