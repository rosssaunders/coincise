# GET historical trades.

**Source:**
[historical trades.](https://docs.backpack.exchange/#tag/Trades/operation/get_historical_trades)

## Authentication

Not Required (Public Endpoint)

## [](#tag/Trades/operation/get_historical_trades)Get historical trades.

Retrieves all historical trades for the given symbol. This is public trade data
and is not specific to any account.

##### query Parameters

| Parameter | Required | Type             | Description                                                     |
| --------- | -------- | ---------------- | --------------------------------------------------------------- |
| symbol    | required | string           |                                                                 |
| limit     | optional | integer <uint64> | Limit the number of trades returned. Default 100, maximum 1000. |
| offset    | optional | integer <uint64> | Offset. Default 0.                                              |

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
