# GET fill history.

**Source:**
[fill history.](https://docs.backpack.exchange/#tag/History/operation/get_fills)

## Authentication

Required (Private Endpoint)

## [](#tag/History/operation/get_fills)Get fill history.

Retrieves historical fills, with optional filtering for a specific order or
symbol.

**Instruction:** `fillHistoryQueryAll`

##### query Parameters

| Parameter     | Required | Type             | Description                                          |
| ------------- | -------- | ---------------- | ---------------------------------------------------- |
| orderId       | optional | string           | Filter to the given order.                           |
| strategyId    | optional | string           | Filter to the given strategy.                        |
| from          | optional | integer <int64>  | Filter to minimum time (milliseconds).               |
| to            | optional | integer <int64>  | Filter to maximum time (milliseconds).               |
| symbol        | optional | string           | Filter to the given symbol.                          |
| limit         | optional | integer <uint64> | Maximum number to return. Default 100, maximum 1000. |
| offset        | optional | integer <uint64> | Offset. Default 0.                                   |
| fillType      | optional | string           | Filter to return fills for different fill types      |
| marketType    | optional | strings          | Market type.                                         |
| sortDirection | optional | string           | Sort direction.                                      |

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

| Parameter       | Required | Type                     | Description                                       |
| --------------- | -------- | ------------------------ | ------------------------------------------------- |
| clientId        | optional | string                   | Client id of the order.                           |
| fee             | required | string <decimal>         | The fee charged on the fill.                      |
| feeSymbol       | required | string                   | The asset that is charged as a fee.               |
| isMaker         | required | boolean                  | Whether the fill was made by the maker.           |
| orderId         | required | string                   | The order ID of the fill.                         |
| price           | required | string <decimal>         | The price of the fill.                            |
| quantity        | required | string <decimal>         | The quantity of the fill.                         |
| side            | required | string                   | The side of the fill.                             |
| symbol          | required | string                   | The market symbol of the fill.                    |
| systemOrderType | optional | string                   | The type of system order that triggered the fill. |
| timestamp       | required | string <naive-date-time> | The timestamp of the fill (UTC).                  |
| tradeId         | optional | integer <int64>          | The trade ID of the fill.                         |

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
