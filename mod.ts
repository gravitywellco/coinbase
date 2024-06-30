/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export { Coinbase } from './coinbase.ts'

export type { CoinbaseOptions, CoinbaseAuthConfig } from './core/coinbase.config.types.ts'

export type { CoinbaseCurrencies } from './resources/currencies/currencies.resource.ts'
export * from './resources/currencies/currencies.types.ts'

export type { CoinbaseProfiles } from './resources/profiles/profiles.resource.ts'
export * from './resources/profiles/profiles.types.ts'
