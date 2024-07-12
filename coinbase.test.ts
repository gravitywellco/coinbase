/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Coinbase } from './coinbase.ts'
import { assertInstanceOf } from '@std/assert'
import { CoinbaseAccounts } from './resources/accounts/accounts.resource.ts'
import { CoinbaseCurrencies } from './resources/currencies/currencies.resource.ts'
import { CoinbaseProfiles } from './resources/profiles/profiles.resource.ts'

/**
 * This test is almost entirely here to ensure full module gets included in
 * coverage reporting. even if specific files are missing tests.
 */
Deno.test('Coinbase', () => {
  const coinbase = new Coinbase()
  assertInstanceOf(coinbase.accounts, CoinbaseAccounts)
  assertInstanceOf(coinbase.currencies, CoinbaseCurrencies)
  assertInstanceOf(coinbase.profiles, CoinbaseProfiles)
})
