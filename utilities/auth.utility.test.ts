/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { AuthUtility } from './auth.utility.ts'
import { assertEquals, assertInstanceOf } from '@std/assert'

const secret = 'dGVzdF9zZWNyZXQ='

Deno.test('AuthUtility.CreateSigningKey', async (test) => {
  await test.step('should key that is an instance of CryptoKey', async () => {
    const key = await AuthUtility.CreateSigningKey(secret)
    assertInstanceOf(key, CryptoKey)
  })

  await test.step('should create a signing key from a secret', async () => {
    const key = await AuthUtility.CreateSigningKey(secret)
    assertEquals(key.usages, ['sign'])
    assertEquals(key.algorithm.name, 'HMAC')
    assertEquals(key.type, 'secret')
  })

  await test.step('should create a verification key from a secret', async () => {
    const key = await AuthUtility.CreateSigningKey(secret, 'verify')
    assertEquals(key.usages, ['verify'])
    assertEquals(key.algorithm.name, 'HMAC')
    assertEquals(key.type, 'secret')
  })
})

Deno.test('AuthUtility.Sign/Verify', async (test) => {
  await test.step('should sign a message with a key', async () => {
    const message = 'test message'
    const signing_key = await AuthUtility.CreateSigningKey(secret)
    const signature = await AuthUtility.Sign(message, signing_key)

    const verify_key = await AuthUtility.CreateSigningKey(secret, 'verify')
    assertEquals(await AuthUtility.Verify(message, signature, verify_key), true)
  })
})
