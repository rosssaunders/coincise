# GET position history.

**Source:**
[position history.](https://docs.backpack.exchange/#tag/History/operation/get_position_history)

## Authentication

Required (Private Endpoint)

## [](#tag/History/operation/get_position_history)Get position history.

Retrieves historical positions, with optional filtering for a specific symbol.

**Instruction:** `positionHistoryQueryAll`

##### query Parameters

| Parameter     | Required | Type             | Description                                          |
| ------------- | -------- | ---------------- | ---------------------------------------------------- |
| symbol        | optional | string           | Market symbol to query position history for.         |
| state         | optional | string           | Position state to filter positions.                  |
| marketType    | optional | strings          | Market type.                                         |
| limit         | optional | integer <uint64> | Maximum number to return. Default 100, maximum 1000. |
| offset        | optional | integer <uint64> | Offset for pagination. Default 0.                    |
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

##### Response Schema: application/json; charset=utf-8

Array

| Parameter             | Required | Type                     | Description                                    |
| --------------------- | -------- | ------------------------ | ---------------------------------------------- |
| id                    | required | string                   |                                                |
| symbol                | required | string                   |                                                |
| netQuantity           | required | string <decimal>         |                                                |
| netExposureQuantity   | required | string <decimal>         |                                                |
| netExposureNotional   | required | string <decimal>         |                                                |
| netCost               | required | string <decimal>         |                                                |
| markPrice             | required | string <decimal>         |                                                |
| entryPrice            | required | string <decimal>         |                                                |
| cumulativePnlRealized | required | string <decimal>         |                                                |
| unrealizedPnl         | required | string <decimal>         |                                                |
| fundingQuantity       | required | string <decimal>         |                                                |
| interest              | required | string <decimal>         |                                                |
| liquidated            | required | string <decimal>         |                                                |
| imf                   | required | string <decimal>         |                                                |
| fees                  | required | string <decimal>         | Total trading fees paid for this position.     |
| state                 | required | string                   |                                                |
| closedVolume          | required | string <decimal>         |                                                |
| liquidationFees       | required | string <decimal>         | Total liquidation fees paid for this position. |
| closingPrice          | optional | string <decimal>         |                                                |
| accountLeverage       | optional | string <decimal>         |                                                |
| openedAt              | optional | string <naive-date-time> |                                                |
| closedAt              | optional | string <naive-date-time> |                                                |

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
