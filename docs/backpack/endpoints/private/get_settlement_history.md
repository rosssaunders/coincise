# GET settlement history.

**Source:**
[settlement history.](https://docs.backpack.exchange/#tag/History/operation/get_settlement_history)

## Authentication

Required (Private Endpoint)

## [](#tag/History/operation/get_settlement_history)Get settlement history.

History of settlement operations for the account.

**Instruction:** `settlementHistoryQueryAll`

##### query Parameters

| Parameter     | Required | Type             | Description                                          |
| ------------- | -------- | ---------------- | ---------------------------------------------------- |
| limit         | optional | integer <uint64> | Maximum number to return. Default 100, maximum 1000. |
| offset        | optional | integer <uint64> | Offset for pagination. Default 0.                    |
| source        | optional | string           |                                                      |
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

| Parameter    | Required | Type                     | Description                                                |
| ------------ | -------- | ------------------------ | ---------------------------------------------------------- |
| quantity     | required | string <decimal>         | Quantity of the settlement.                                |
| source       | required | string                   | Source of the settlement.                                  |
| subaccountId | optional | integer <int32>          | ID of the subaccount the event is associated with, if any. |
| timestamp    | required | string <naive-date-time> | The timestamp of the settlement (UTC).                     |
| userId       | required | integer <int32>          | User ID of the account the movement is associated with.    |

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
