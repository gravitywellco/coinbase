/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export interface CoinbaseAccount {
  id: string
  currency: string
  balance: string
  hold: string
  available: string
  profile_id: string
  trading_enabled: boolean
  pending_deposit?: string
  display_name?: string
}
