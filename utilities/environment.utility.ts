/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import '@std/dotenv/load'

/**
 * Unfortunatly, Deno and Bun have different ways of handling environment variables
 * and this isn't easy to test. This utility class helps to abstract the differences
 * a little bit.
 * @todo Find a way to test this in real environments?
 */
export class EnvironmentUtility {
  public static IsDeno(): boolean {
    // @ts-ignore - Deno won't be defined in Bun
    return typeof Deno !== 'undefined'
  }

  public static IsBun(): boolean {
    // @ts-ignore - Bun won't be defined in Deno
    return typeof Bun !== 'undefined'
  }

  public static Get(key: string, default_value: string = ''): string {
    if (EnvironmentUtility.IsDeno()) {
      // @ts-ignore - Deno won't be defined in Bun
      return Deno.env.get(key) || default_value
    } else if (this.IsBun()) {
      // @ts-ignore - Bun won't be defined in Deno
      return Bun.env[key] || default_value
    } else {
      console.error(
        'EnvironmentUtility.Get: Not in a supported environment (deno/bun), returning default value',
      )
      return default_value
    }
  }
}
