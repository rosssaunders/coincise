# GET markets.

**Source:**
[markets.](https://docs.backpack.exchange/#tag/Markets/operation/get_markets)

## Authentication

Not Required (Public Endpoint)

## [](#tag/Markets/operation/get_markets)Get markets.

Retrieves all the markets that are supported by the exchange.

### Responses

**200**

Success.

##### Response Schema: application/json; charset=utf-8

Array

| Parameter             | Required | Type                     | Description                                                                        |
| --------------------- | -------- | ------------------------ | ---------------------------------------------------------------------------------- |
| symbol                | required | string                   | Symbol of the market, e.g. ETH_USDC                                                |
| baseSymbol            | required | string                   | The base asset of the market.                                                      |
| quoteSymbol           | required | string                   | The quote asset of the market.                                                     |
| marketType            | required | string                   | The type of the market.                                                            |
| filters               | required | object                   | Price, lot and leverage rules.                                                     |
| imfFunction           | optional | object                   | IMF function.                                                                      |
| mmfFunction           | optional | object                   | MMF function.                                                                      |
| fundingInterval       | optional | integer <uint64>         | Funding interval for perpetuals in milliseconds.                                   |
| fundingRateUpperBound | optional | string <decimal>         | Funding rate upper bound for perpetual markets. In basis points. E.g. 10 = 10bps   |
| fundingRateLowerBound | optional | string <decimal>         | Funding rate lower bound for perpetual markets. In basis points. E.g. -10 = -10bps |
| openInterestLimit     | optional | string <decimal>         | Maximum open interest limit for the market if the market is a future.              |
| orderBookState        | required | string                   | The order book state.                                                              |
| createdAt             | required | string <naive-date-time> | Market created at time.                                                            |
| visible               | required | boolean                  | Market currently visible.                                                          |

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
