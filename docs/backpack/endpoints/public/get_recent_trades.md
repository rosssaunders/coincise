# GET recent trades.

**Source:**
[recent trades.](https://docs.backpack.exchange/#tag/Trades/operation/get_recent_trades)

## Authentication

Not Required (Public Endpoint)

## [](#tag/Trades/operation/get_recent_trades)Get recent trades.

Retrieve the most recent trades for a symbol. This is public data and is not
specific to any account.

The maximum available recent trades is `1000`. If you need more than `1000`
trades use the historical trades endpoint.

##### query Parameters

| Parameter | Required | Type             | Description                                                    |
| --------- | -------- | ---------------- | -------------------------------------------------------------- |
| symbol    | required | string           | Market symbol to query fills for.                              |
| limit     | optional | integer <uint16> | Limit the number of fills returned. Default 100, maximum 1000. |

### Responses

**200**

Success.

##### Response Schema: application/json; charset=utf-8

Array

| Parameter     | Required | Type             | Description                               |
| ------------- | -------- | ---------------- | ----------------------------------------- |
| id            | optional | integer <int64>  | Id of the trade.                          |
| price         | required | string <decimal> | Price of the trade.                       |
| quantity      | required | string <decimal> | Quantity of the trade in the base asset.  |
| quoteQuantity | required | string <decimal> | Quantity of the trade in the quote asset. |
| timestamp     | required | integer <int64>  | Timestamp of the trade (server time).     |
| isBuyerMaker  | required | boolean          | Whether the buyer was the maker order.    |

**400**

Bad request.

**500**

Internal Server Error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
