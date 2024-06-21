# Gravitywell / Coinbase

[![continuous integration](https://github.com/gravitywellco/coinbase/actions/workflows/continuous-integration.yml/badge.svg)](https://github.com/gravitywellco/coinbase/actions/workflows/continuous-integration.yml)

**WARNING**: The NPM package is in a super alpha state while I work out the nuance in publishing to
both JSR and NPM. Prefer installation through JSR if possible:
[@gravity/coinbase](https://jsr.io/@gravity/coinbase)

A fully typed client for interacting with the
[Coinbase Exchange](https://www.coinbase.com/developer-platform/products/exchange-api)
(institutional) rest/websocket apis.

Intended for use in server environments with deno/bun. Built in TypeScript and does not export a
vanilla JavaScript bundle or definition files.

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
