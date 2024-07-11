# Gravitywell / Coinbase

[![JSR](https://jsr.io/badges/@gravity/coinbase)](https://jsr.io/@gravity/coinbase)
[![continuous integration](https://github.com/gravitywellco/coinbase/actions/workflows/continuous-integration.yml/badge.svg)](https://github.com/gravitywellco/coinbase/actions/workflows/continuous-integration.yml)
[![codecov](https://codecov.io/gh/gravitywellco/coinbase/graph/badge.svg?token=5B0P33NTE0)](https://codecov.io/gh/gravitywellco/coinbase)
[![Maintainability](https://api.codeclimate.com/v1/badges/a939968d38d9b125f678/maintainability)](https://codeclimate.com/github/gravitywellco/coinbase/maintainability)

[Coinbase Exchange](https://www.coinbase.com/developer-platform/products/exchange-api)
(institutional) client, written in TypeScript for Deno/Bun.

Currently, the only dependencies are `@std/encoding` and `npm:dotenv` but this library may evolve to
include more helpful stuff in the future. Ergonomics and correctness are prioritized over minimal
purity. A good example, that is being considered, is `npm:decimal.js`.

**WARNING:** The public API may change before v1. Breaking changes will effect minor versions.
Pinning to a patch version is fine for non-breaking changes.

## Installation

Deno: `deno add @gravity/coinbase`

Bun: `bunx jsr add @gravity/coinbase`

## Usage

Note that this package does not export a JS bundle or TypeScript definition files. It is intended to
be used in environments that can use TypeScript natively; such as Deno and Bun. **There is no
planned support for bundling or other environments.**

```typescript
import { Coinbase } from '@gravity/coinbase'

/**
 * Initialization will automatically pick up auth variables set in the
 * environment (through a `.env` file or otherwise) based on these keys:
 * `COINBASE_API_KEY`, `COINBASE_API_SECRET`, `COINBASE_API_PASSPHRASE`
 *
 * Supplying a configuration manually will override any environment configs.
 */
const coinbase = new Coinbase()

// Use resources to interact with the REST API.
const currencies = await coinbase.currencies.all()
```

## REST Progress ([Documentation](https://docs.cdp.coinbase.com/exchange/reference/))

| Module                                                                                                                                   | Status |
| ---------------------------------------------------------------------------------------------------------------------------------------- | -----: |
| **Auth** ([Reference](https://docs.cdp.coinbase.com/exchange/docs/rest-auth/))                                                           |     ✅ |
| **Errors** ([Reference](https://docs.cdp.coinbase.com/exchange/docs/rest-requests/))                                                     |        |
| **Accounts**                                                                                                                             |        |
| --- [Get all accounts for a profile](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccounts/)                      |        |
| --- [Get a single account by id](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccount/)                           |        |
| --- [Get a single account's holds](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccountholds/)                    |        |
| --- [Get a single account's ledger](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccountledger/)                  |        |
| --- [Get a single account's transfers](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccounttransfers/)            |        |
| **Address Book**                                                                                                                         |        |
| --- [Get address book](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaddressbook/)                                 |        |
| --- [Add addresses](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postaddressbook/)                                   |        |
| --- [Delete address](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_deleteaddressbookentry/)                           |        |
| **Coinbase Accounts**                                                                                                                    |        |
| --- [Get all Coinbase wallets](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getcoinbaseaccounts/)                    |        |
| --- [Generate crypto address](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postcoinbaseaccountaddresses/)            |        |
| **Conversions**                                                                                                                          |        |
| --- [Convert currency](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postconversion/)                                 |        |
| --- [Get conversion fee rates](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getconversionfees/)                      |        |
| --- [Get a conversion](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getconversion/)                                  |        |
| **Currencies**                                                                                                                           |     ✅ |
| --- [Get all known currencies](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getcurrencies/)                          |     ✅ |
| --- [Get a currency](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getcurrency/)                                      |     ✅ |
| **Transfers**                                                                                                                            |        |
| --- [Deposit from Coinbase account](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postdepositcoinbaseaccount/)        |        |
| --- [Deposit from payment method](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postdepositpaymentmethod/)            |        |
| --- [Get all payment methods](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getpaymentmethods/)                       |        |
| --- [Get all transfers](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_gettransfers/)                                  |        |
| --- [Get a single transfer](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_gettransfer/)                               |        |
| --- [Submit travel information for a transfer](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_posttransfertravelrule/) |        |
| --- [Withdraw to Coinbase account](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postwithdrawcoinbaseaccount/)        |        |
| --- [Withdraw to crypto address](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postwithdrawcrypto/)                   |        |
| --- [Get fee estimate for crypto withdrawal](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getwithdrawfeeestimate/)   |        |
| --- [Withdraw to payment method](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postwithdrawpaymentmethod/)            |        |
| **Fees**                                                                                                                                 |        |
| --- [Get fees](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getfees/)                                                |        |
| **Orders**                                                                                                                               |        |
| --- [Get all fills](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getfills/)                                          |        |
| --- [Get all orders](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getorders/)                                        |        |
| --- [Cancel all orders](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_deleteorders/)                                  |        |
| --- [Create a new order](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postorders/)                                   |        |
| --- [Get single order](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getorder/)                                       |        |
| --- [Cancel an order](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_deleteorder/)                                     |        |
| **Loans**                                                                                                                                |        |
| --- [List loans](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getloans/)                                             |        |
| --- [List loan assets](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getloanassets/)                                  |        |
| --- [Get all interest summaries](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getinterestsummary/)                   |        |
| --- [Get a single loan's interest rate history](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getinteresthistory/)    |        |
| --- [Get a single loan's interest charges](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getinterestcharges/)         |        |
| --- [Get lending overview](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getloanlendingoverview/)                     |        |
| --- [Get new loan preview](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getloanpreview/)                             |        |
| --- [Open new loan](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_openloan/)                                          |        |
| --- [List new loan options](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getnewloanoptions/)                         |        |
| --- [Repay loan interest](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_repayinterest/)                               |        |
| --- [Repay loan principal](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_repayprincipal/)                             |        |
| --- [Get principal repayment preview](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getrepaymentpreview/)             |        |
| **Coinbase Price Oracle**                                                                                                                |        |
| --- [Get signed prices](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getcoinbasepriceoracle/)                        |        |
| **Products**                                                                                                                             |        |
| --- [Get all known trading pairs](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproducts/)                         |        |
| --- [Get all product volume](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductsvolume/)                        |        |
| --- [Get single product](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproduct/)                                   |        |
| --- [Get product book](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductbook/)                                 |        |
| --- [Get product candles](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductcandles/)                           |        |
| --- [Get product stats](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductstats/)                               |        |
| --- [Get product ticker](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductticker/)                             |        |
| --- [Get product trades](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproducttrades/)                             |        |
| **Profiles**                                                                                                                             |     ✅ |
| --- [Get profiles](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getprofiles/)                                        |     ✅ |
| --- [Create a profile](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postprofile/)                                    |     ✅ |
| --- [Transfer funds between profiles](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postprofiletransfer/)             |     ✅ |
| --- [Get profile by id](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getprofile/)                                    |     ✅ |
| --- [Rename a profile](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_putprofile/)                                     |     ✅ |
| --- [Delete a profile](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_putprofiledeactivate/)                           |     ✅ |
| **Reports**                                                                                                                              |        |
| --- [Get all reports](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getreports/)                                      |        |
| --- [Create a report](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postreports/)                                     |        |
| --- [Get a report](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getreport/)                                          |        |
| **Travel Rules**                                                                                                                         |        |
| --- [Get all travel rule information](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_gettravelrules/)                  |        |
| --- [Create travel rule entry](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_posttravelrule/)                         |        |
| --- [Delete existing travel rule entry](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_deletetravelrule/)              |        |
| **Users**                                                                                                                                |        |
| --- [Get user exchange limits](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getuserexchangelimits/)                  |        |
| --- [Update settlement preference](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postuserlevelsettlementpreferences/) |        |
| --- [Get user trading volumes](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getusertradingvolumes/)                  |        |
| **Wrapped Assets**                                                                                                                       |        |
| --- [Get all wrapped assets](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getwrappedassets/)                         |        |
| --- [Get all stake-wraps](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getallwrappedassetstakewraps/)                |        |
| --- [Create a new stake-wrap](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postwrappedassetstakewrap/)               |        |
| --- [Get a single stake-wrap](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getwrappedassetstakewrap/)                |        |
| --- [Get wrapped asset details](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getwrappedasset/)                       |        |
| --- [Get wrapped asset conversion rate](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getwrappedassetconversionrate/) |        |

## WebSocket Channel Progress ([Documentation](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/))

| Module                                                                                                               | Status |
| -------------------------------------------------------------------------------------------------------------------- | -----: |
| **Auth** ([Reference](https://docs.cdp.coinbase.com/exchange/docs/websocket-auth/))                                  |        |
| **Errors** ([Reference](https://docs.cdp.coinbase.com/exchange/docs/websocket-errors/))                              |        |
| **Heartbeat** ([Reference](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/#heartbeat-channel))       |        |
| **Status** ([Reference](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/#status-channel))             |        |
| **Auction** ([Reference](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/#auction-channel))           |        |
| **Matches** ([Reference](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/#matches-channel))           |        |
| **RFQ Matches** ([Reference](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/#rfq-matches-channel))   |        |
| **Ticker** ([Reference](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/#ticker-channel))             |        |
| **Ticker Batch** ([Reference](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/#ticker-batch-channel)) |        |
| **Full** ([Reference](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/#full-channel))                 |        |
| --- [Received](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/#received)                             |        |
| --- [Open](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/#open)                                     |        |
| --- [Done](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/#done)                                     |        |
| --- [Match](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/#match)                                   |        |
| --- [Change](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/#change)                                 |        |
| --- [Activate](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/#activate)                             |        |
| **User** ([Reference](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/#user-channel))                 |        |
| **Level2** ([Reference](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/#level2-channel))             |        |
| **Level2 Batch** ([Reference](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/#level2-batch-channel)) |        |
| **Level3** ([Reference](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/#level3-channel))             |        |
| **Balance** ([Reference](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/#balance-channel))           |        |

## License

this library is provided under the [Mozilla Public License 2.0](https://mozilla.org/MPL/2.0/).

A copy of the MPLv2 is included [license.md](/license.md) file for convenience.
