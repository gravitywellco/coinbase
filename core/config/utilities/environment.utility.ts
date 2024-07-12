/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import 'dotenv/config'

/**
 * Unfortunatly, Deno and Bun have different ways of handling environment variables
 * and this isn't easy to test. This utility class helps to abstract the differences
 * a little bit.
 * @todo Find a way to test this in real environments?
 */
export class EnvironmentUtility {
  /**
   * Attempts to get an environment variable from the current environment.
   * @param key Key to get from the environment
   * @param default_value Default value to return if the key doesn't exist
   * @returns An environment variable or a default value if it doesn't exist
   */
  public static Get(
    key: string,
    default_value: string = '',
  ): string {
    // @ts-ignore - Bun won't be defined in Deno
    if (typeof Bun !== 'undefined' && Bun.env[key]) return Bun.env[key]
    // @ts-ignore - Deno won't be defined in Bun
    if (typeof Deno !== 'undefined' && Deno.env.get(key)) return Deno.env.get(key)
    return default_value
  }
}
