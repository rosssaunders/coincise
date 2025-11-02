# GET interest history.

**Source:**
[interest history.](https://docs.backpack.exchange/#tag/History/operation/get_interest_history)

## Authentication

Required (Private Endpoint)

## [](#tag/History/operation/get_interest_history)Get interest history.

History of the interest payments for borrows and lends for the account.

**Instruction:** `interestHistoryQueryAll`

##### query Parameters

| Parameter     | Required | Type             | Description                                                                                                                                                                                                                                |
| ------------- | -------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| asset         | optional | string           | Asset to query. If not set, all assets are returned.                                                                                                                                                                                       |
| symbol        | optional | string           | Market symbol to query. If not set, all markets are returned. If a futures symbol is supplied, then interest payments on unrealized pnl will be returned. Spot market symbols refer to interest payments on regular borrow lend positions. |
| positionId    | optional | string           | Filter to return history for a borrow lend position.                                                                                                                                                                                       |
| limit         | optional | integer <uint64> | Maximum number to return. Default 100, maximum 1000.                                                                                                                                                                                       |
| offset        | optional | integer <uint64> | Offset for pagination. Default 0.                                                                                                                                                                                                          |
| source        | optional | string           | Filter to return interest payments of a particular source. Borrow interest payments through two mechanisms: borrow lend positions; interest paid on unrealized pnl.                                                                        |
| sortDirection | optional | string           | Sort direction.                                                                                                                                                                                                                            |

##### header Parameters

| Parameter   | Required | Type             | Description                                                                 |
| ----------- | -------- | ---------------- | --------------------------------------------------------------------------- |
| X-API-KEY   | optional | string           | API key                                                                     |
| X-SIGNATURE | optional | string           | Signature of the request                                                    |
| X-TIMESTAMP | optional | integer <int64>  | Timestamp of the request in milliseconds                                    |
| X-WINDOW    | optional | integer <uint64> | Time the request is valid for in milliseconds (default 5000, maximum 60000) |

### Responses

**200**

Success.

| Parameter                     | Required | Type             | Description |
| ----------------------------- | -------- | ---------------- | ----------- |
| ACCESS-CONTROL-EXPOSE-HEADERS | required | string           |             |
| X-PAGE-COUNT                  | required | integer <uint64> |             |
| X-CURRENT-PAGE                | required | integer <uint64> |             |
| X-PAGE-SIZE                   | required | integer <uint64> |             |
| X-TOTAL                       | required | integer <uint64> |             |

##### Response Schema: application/json; charset=utf-8

Array

| Parameter    | Required | Type                     | Description                                                                                                                                                                                                                                                                         |
| ------------ | -------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| paymentType  | required | string                   | Type of payment.                                                                                                                                                                                                                                                                    |
| interestRate | required | string <decimal>         | The rate of interest.                                                                                                                                                                                                                                                               |
| interval     | required | integer <uint64>         | The interval duration of the payment.                                                                                                                                                                                                                                               |
| marketSymbol | required | string                   | The market symbol for which the interest payment can be attributed. For interest payments corresponding to borrow lend positions, this is the spot market symbol. For interest payments corresponding to unrealized pnl on futures markets, this will be the futures market symbol. |
| positionId   | required | string                   | ID of the borrow lend position the interest payment is for.                                                                                                                                                                                                                         |
| quantity     | required | string <decimal>         | Amount of the payment.                                                                                                                                                                                                                                                              |
| symbol       | required | string                   | The symbol of the market asset the payment is associated with.                                                                                                                                                                                                                      |
| timestamp    | required | string <naive-date-time> | The timestamp for the borrow lending interest payment (UTC).                                                                                                                                                                                                                        |

**400**

Bad request.

**401**

Unauthorized.

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
