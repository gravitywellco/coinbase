/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { CoinbaseProfile } from './profiles.types.ts'
import type { CoinbaseOptions } from '../../utilities/options.types.ts'
import { CoinbaseResource } from '../resource.ts'

export class CoinbaseProfiles extends CoinbaseResource {
  constructor(options: CoinbaseOptions) {
    super(options, '/profiles', true)
  }

  /**
   * Gets a list of all of the current user's profiles. Requires Authentication.
   * This endpoint requires the "view" permission and is accessible by any profile's API key.
   * See: https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getprofiles/
   * @param {boolean | undefined} active Whether or not to return only active/inactive profiles. Defaults to undefined for all profiles.
   * @returns {Promise<CoinbaseProfile[]>}
   */
  public async all(active?: boolean): Promise<CoinbaseProfile[]> {
    const query = active !== undefined ? [{ key: 'active', value: active }] : []
    return await this.request.get<CoinbaseProfile[]>(undefined, query)
  }

  /**
   * Information for a single profile. Use this endpoint when you know the profile_id. Requires Authentication.
   * This endpoint requires the "transfer" permission.
   * See: https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getprofile/
   * @param {string} id Profile ID
   * @param {boolean | undefined} active Whether or not to return only if active/inactive. Defaults to undefined for any status.
   * @returns {Promise<CoinbaseProfile>}
   */
  public async get(id: string, active?: boolean): Promise<CoinbaseProfile> {
    const query = active !== undefined ? [{ key: 'active', value: active }] : []
    return await this.request.get<CoinbaseProfile>(`/${id}`, query)
  }

  /**
   * Create a new profile. Will fail if no name is provided or if user already has max number of profiles. Requires Authentication.
   * See: https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postprofile/
   * @param {string | undefined} name Optional name for the profile.
   * @returns {Promise<CoinbaseProfile>}
   */
  public async create(name?: string): Promise<CoinbaseProfile> {
    return await this.request.post<CoinbaseProfile>({ name })
  }

  /**
   * Rename a profile. Names 'default' and 'margin' are reserved. Requires Authentication.
   * See: https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_putprofile/
   * @param {string} id Profile ID
   * @param {string | undefined} name New name for the profile. Defaults to undefined, removing the name.
   * @returns {Promise<CoinbaseProfile>}
   */
  public async rename(id: string, name?: string): Promise<CoinbaseProfile> {
    return await this.request.put<CoinbaseProfile>({ profile_id: id, name }, `/${id}`)
  }

  /**
   * Deletes the profile specified by profile_id and transfers all funds to the profile specified by to. Fails if there are any open orders on the profile to be deleted. Requires Authentication.
   * See: https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_putprofiledeactivate/
   * @param {string} id Profile ID
   * @param {string | undefined} to ID of profile to transfer funds to. Defaults to undefined, transferring to the default profile.
   * @returns {Promise<void>}
   */
  public async delete(id: string, to?: string): Promise<void> {
    return await this.request.put({ profile_id: id, to }, `/${id}/deactivate`)
  }

  /**
   * Transfer an amount of currency from one profile to another. Requires Authentication.
   * This endpoint requires the "transfer" permission.
   * See: https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postprofiles_transfer/
   * @param {string} from Profile ID to transfer from
   * @param {string} to Profile ID to transfer to
   * @param {string} currency Currency to transfer
   * @param {string} amount Amount to transfer
   * @returns {Promise<void>}
   */
  public async transfer(from: string, to: string, currency: string, amount: string): Promise<void> {
    return await this.request.post({ from, to, currency, amount }, `/transfer`)
  }
}
