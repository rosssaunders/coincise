# GET borrow history.

**Source:**
[borrow history.](https://docs.backpack.exchange/#tag/History/operation/get_borrow_lend_history)

## Authentication

Required (Private Endpoint)

## [](#tag/History/operation/get_borrow_lend_history)Get borrow history.

History of borrow and lend operations for the account.

**Instruction:** `borrowHistoryQueryAll`

##### query Parameters

| Parameter     | Required | Type             | Description                                                                                                        |
| ------------- | -------- | ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| type          | optional | string           | Filter to history for either borrows or lends.                                                                     |
| sources       | optional | string           | Filter to return history for a particular source. Can be a single source, or multiple sources separated by commas. |
| positionId    | optional | string           | Filter to return history for a borrow lend position.                                                               |
| symbol        | optional | string           | Filter to the given symbol.                                                                                        |
| limit         | optional | integer <uint64> | Maximum number to return. Default 100, maximum 1000.                                                               |
| offset        | optional | integer <uint64> | Offset for pagination. Default 0.                                                                                  |
| sortDirection | optional | string           | Sort direction.                                                                                                    |

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

| Parameter         | Required | Type                     | Description                                                                     |
| ----------------- | -------- | ------------------------ | ------------------------------------------------------------------------------- |
| eventType         | required | string                   | Type of event.                                                                  |
| positionId        | required | string                   | ID of the borrow lend position the event is associated with.                    |
| positionQuantity  | optional | string <decimal>         | Running total quantity of borrow lend position.                                 |
| quantity          | required | string <decimal>         | Quantity of the borrow lend event.                                              |
| source            | required | string                   | Source of the borrow lend event.                                                |
| symbol            | required | string                   | Symbol of the asset the borrow lend is for.                                     |
| timestamp         | required | string <naive-date-time> | The timestamp of the borrow lend event (UTC).                                   |
| spotMarginOrderId | optional | string                   | The order id associated with the borrow lend event created through spot margin. |

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
