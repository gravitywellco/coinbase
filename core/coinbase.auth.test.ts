import { decodeBase64 } from '@std/encoding'
import { CoinbaseAuth, type CoinbaseAuthKeys } from './coinbase.auth.ts'
import { assertAlmostEquals, assertEquals, assertExists } from '@std/assert'
import { AuthUtility } from '../utilities/auth.utility.ts'

const auth_data = {
  key: 'test_key',
  secret: 'dGVzdF9zZWNyZXQ=',
  passphrase: 'test_passphrase',
}
const auth = new CoinbaseAuth(auth_data)

interface request {
  path: string
  method: string
  body?: unknown
}

Deno.test('CoinbaseAuth.keys', async (test) => {
  async function test_keys(keys: CoinbaseAuthKeys, request: request) {
    assertEquals(keys.key, 'test_key')
    assertEquals(keys.passphrase, 'test_passphrase')
    assertAlmostEquals(parseFloat(keys.timestamp), Date.now() / 1000, 0.01)
    const key = await AuthUtility.CreateSigningKey(auth_data.secret, 'verify')
    const body = request.body === undefined ? '' : JSON.stringify(request.body)
    const verified = await AuthUtility.Verify(
      `${keys.timestamp}${request.method}${request.path}${body}`,
      decodeBase64(keys.signature),
      key,
    )
    assertEquals(verified, true)
  }

  await test.step('returns the correct keys with no body', async () => {
    const data = { path: '/test', method: 'GET' }
    const keys = await auth.keys(data.path, data.method)
    await test_keys(keys, data)
  })

  await test.step('returns the correct keys with a body', async () => {
    const data = { path: '/test/body', method: 'POST', body: { test: 'value' } }
    const keys = await auth.keys(data.path, data.method, data.body)
    await test_keys(keys, data)
  })
})

Deno.test('CoinbaseAuth.headers', async (test) => {
  await test.step('returns the correct headers', async () => {
    const headers = await auth.headers('/testing', 'PUT')
    assertEquals(headers['CB-ACCESS-KEY'], auth_data.key)
    assertEquals(headers['CB-ACCESS-PASSPHRASE'], auth_data.passphrase)
    assertExists(headers['CB-ACCESS-SIGN'])
    assertAlmostEquals(parseFloat(headers['CB-ACCESS-TIMESTAMP']), Date.now() / 1000, 0.01)
  })
})
