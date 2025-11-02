# GET all mark prices.

**Source:**
[all mark prices.](https://docs.backpack.exchange/#tag/Markets/operation/get_mark_prices)

## Authentication

Not Required (Public Endpoint)

## [](#tag/Markets/operation/get_mark_prices)Get all mark prices.

Retrieves mark price, index price and the funding rate for the current interval
for all symbols, or the symbol specified.

##### query Parameters

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| symbol    | optional | string |             |

### Responses

**200**

Success.

##### Response Schema: application/json; charset=utf-8

Array

| Parameter            | Required | Type             | Description                                                                                                              |
| -------------------- | -------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| fundingRate          | required | string <decimal> | The funding rate for the current interval.                                                                               |
| indexPrice           | required | string <decimal> | The index price for the market.                                                                                          |
| markPrice            | required | string <decimal> | The mark price for the market.                                                                                           |
| nextFundingTimestamp | required | integer <int64>  | The end time of the current interval and start time of next interval. Funding payments will be distributed at this time. |
| symbol               | required | string           | The symbol of the market.                                                                                                |

**400**

Bad request.

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
