# Overview

Deribit provides three different interfaces to access the API:

- [JSON-RPC over Websocket](#json-rpc)
- [JSON-RPC over HTTP](#json-rpc)
- [FIX](#fix-api) (Financial Information eXchange)

Deribit features a testing environment, `test.deribit.com`, which can be used to
test the API. For this reason all examples in this documentation refer to that
environment. To reach the production environment it should be changed to
`www.deribit.com`. Note that both environments are separate, which means that
they require separate accounts and credentials (API keys) to authenticate using
private methods - test credentials do not work in production environment and
vice versa.

To see the list of your API keys check **Account > API** tab, where you'll also
find a link to API Console (`>_ Api Console`) which allows you to test JSON-RPC
API, both via HTTP and Websocket.

- [Error Codes](#rpc-error-codes) (HTTP and Websocket RPC Error codes)

## Naming

Deribit tradeable assets or instruments use the following system of naming:

| Kind      | Examples                                | Template              | Comments                                                                                                                                                       |
| --------- | --------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Future    | `BTC-25MAR23`, `BTC-5AUG23`             | `BTC-DMMMYY`          | `BTC` is currency, `DMMMYY` is expiration date, `D` stands for day of month (1 or 2 digits), `MMM` - month (3 first letters in English), `YY` stands for year. |
| Perpetual | `BTC-PERPETUAL`                         |                       | Perpetual contract for currency `BTC`.                                                                                                                         |
| Option    | `BTC-25MAR23-420-C`, `BTC-5AUG23-580-P` | `BTC-DMMMYY-STRIKE-K` | `STRIKE` is option strike price in USD. Template `K` is option kind: `C` for call options or `P` for put options.                                              |

**In Linear Options `d` is used as a decimal point for decimal strikes.**

**Example:** For `XRP_USDC-30JUN23-0d625-C` strike is 0.625.

|

## Rate Limits

Rate limits are described in
[separate document](https://support.deribit.com/hc/en-us/articles/25944617523357-Rate-Limits).
