/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import 'dotenv/config'

export enum Environment {
  DENO = 'deno',
  BUN = 'bun',
  UNKNOWN = 'unknown',
}

/**
 * Unfortunatly, Deno and Bun have different ways of handling environment variables
 * and this isn't easy to test. This utility class helps to abstract the differences
 * a little bit.
 * @todo Find a way to test this in real environments?
 */
export class EnvironmentUtility {
  /** Get the current environment. @note we check bun first because we test in deno */
  public static Environment(force_unknown: boolean = false): Environment {
    if (force_unknown) return Environment.UNKNOWN
    // @ts-ignore - Bun won't be defined in Deno
    if (typeof Bun !== 'undefined') return Environment.BUN
    // @ts-ignore - Deno won't be defined in Bun
    if (typeof Deno !== 'undefined') return Environment.DENO
    return Environment.UNKNOWN
  }

  /**
   * Attempts to get an environment variable from the current environment.
   * @param key Key to get from the environment
   * @param default_value Default value to return if the key doesn't exist
   * @returns An environment variable or a default value if it doesn't exist
   */
  public static Get(
    key: string,
    default_value: string = '',
    force_unknown: boolean = false,
  ): string {
    const environment = force_unknown ? Environment.UNKNOWN : EnvironmentUtility.Environment()
    if (environment === Environment.DENO) {
      // @ts-ignore - Deno won't be defined in Bun
      return Deno.env.get(key) || default_value
    } else if (environment === Environment.BUN) {
      // @ts-ignore - Bun won't be defined in Deno
      return Bun.env[key] || default_value
    } else {
      console.warn(
        `EnvironmentUtility.Get(${key}): Not in a supported environment (deno/bun), returning default value`,
      )
      return default_value
    }
  }
}
