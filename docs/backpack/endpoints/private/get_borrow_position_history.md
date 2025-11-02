# GET borrow position history.

**Source:**
[borrow position history.](https://docs.backpack.exchange/#tag/History/operation/get_borrow_lend_position_history)

## Authentication

Required (Private Endpoint)

## [](#tag/History/operation/get_borrow_lend_position_history)Get borrow position history.

History of borrow and lend positions for the account.

**Instruction:** `borrowPositionHistoryQueryAll`

##### query Parameters

| Parameter     | Required | Type             | Description                                          |
| ------------- | -------- | ---------------- | ---------------------------------------------------- |
| symbol        | optional | string           | Filter to the given symbol.                          |
| side          | optional | string           | Return only borrows or only lends.                   |
| state         | optional | string           | Return only open positions or closed positions.      |
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

| Parameter                     | Required | Type             | Description |
| ----------------------------- | -------- | ---------------- | ----------- |
| ACCESS-CONTROL-EXPOSE-HEADERS | required | string           |             |
| X-PAGE-COUNT                  | required | integer <uint64> |             |
| X-CURRENT-PAGE                | required | integer <uint64> |             |
| X-PAGE-SIZE                   | required | integer <uint64> |             |
| X-TOTAL                       | required | integer <uint64> |             |

##### Response Schema: application/json; charset=utf-8

Array

| Parameter          | Required | Type                     | Description                                                  |
| ------------------ | -------- | ------------------------ | ------------------------------------------------------------ |
| positionId         | required | string                   | ID of the borrow lend position the event is associated with. |
| quantity           | required | string <decimal>         | Quantity of the borrow lend event.                           |
| symbol             | required | string                   | Symbol of the asset the borrow lend is for.                  |
| source             | required | string                   | Initial source of position.                                  |
| cumulativeInterest | required | string <decimal>         | Cumulative interest payments quantity.                       |
| avgInterestRate    | required | string <decimal>         | Average interest rate over the time this position was open.  |
| side               | required | string                   | Borrow or lend.                                              |
| createdAt          | required | string <naive-date-time> | The timestamp the borrow lend event was created at (UTC).    |

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
