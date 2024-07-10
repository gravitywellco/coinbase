# Gravitywell / Coinbase

[![JSR](https://jsr.io/badges/@gravity/coinbase)](https://jsr.io/@gravity/coinbase)
[![continuous integration](https://github.com/gravitywellco/coinbase/actions/workflows/continuous-integration.yml/badge.svg)](https://github.com/gravitywellco/coinbase/actions/workflows/continuous-integration.yml)
[![codecov](https://codecov.io/gh/gravitywellco/coinbase/graph/badge.svg?token=5B0P33NTE0)](https://codecov.io/gh/gravitywellco/coinbase)
[![Maintainability](https://api.codeclimate.com/v1/badges/a939968d38d9b125f678/maintainability)](https://codeclimate.com/github/gravitywellco/coinbase/maintainability)

A fully typed client for interacting with the
[Coinbase Exchange](https://www.coinbase.com/developer-platform/products/exchange-api)
(institutional) rest/websocket apis.

Intended for use in server environments with deno/bun. Built in TypeScript and **does not export a
vanilla JavaScript bundle or definition files**.

The public API may change before v1. Breaking changes will effect minor versions. Pinning to a patch
version is fine for non-breaking changes.

## Progress

REST [Documentation](https://docs.cdp.coinbase.com/exchange/reference/)

- [x] Auth
- [ ] Accounts
- [ ] Address Book
- [ ] Coinbase Accounts
- [ ] Conversions
- [x] Currencies
- [ ] Transfers
- [ ] Fees
- [ ] Orders
- [ ] Loans
- [ ] Coinbase Price Oracle
- [ ] Products
- [x] Profiles
- [ ] Reports
- [ ] Travel Rules
- [ ] Users
- [ ] Wrapped Assets

WebSocket Channels [Documentation](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels/)

- [x] Auth
- [ ] Heartbeat
- [ ] Status
- [ ] Auction
- [ ] Matches
- [ ] RFQ Matches
- [ ] Ticker
- [ ] Ticket Batch
- [ ] Full
- [ ] User
- [ ] Level2
- [ ] Level2 Batch
- [ ] Level 3
- [ ] Balance

## License

this library is provided under the [Mozilla Public License 2.0](https://mozilla.org/MPL/2.0/).

A copy of the MPLv2 is included [license.md](/license.md) file for convenience.
