# GET dust conversion history.

**Source:**
[dust conversion history.](https://docs.backpack.exchange/#tag/History/operation/get_dust_history)

## Authentication

Required (Private Endpoint)

## [](#tag/History/operation/get_dust_history)Get dust conversion history.

Retrieves the dust conversion history for the user.

**Instruction:** `dustHistoryQueryAll`

##### query Parameters

| Parameter     | Required | Type             | Description                                          |
| ------------- | -------- | ---------------- | ---------------------------------------------------- |
| id            | optional | integer <int64>  | Filter to a given dust conversion id.                |
| symbol        | optional | string           | Filter to the given symbol.                          |
| limit         | optional | integer <uint64> | Maximum number to return. Default 100, maximum 1000. |
| offset        | optional | integer <uint64> | Offset. Default 0.                                   |
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

| Parameter    | Required | Type                     | Description                    |
| ------------ | -------- | ------------------------ | ------------------------------ |
| id           | required | integer <uint64>         | The ID of the dust conversion. |
| quantity     | required | string <decimal>         | Dust quantity.                 |
| symbol       | required | string                   | Symbol.                        |
| usdcReceived | required | string <decimal>         | USDC received.                 |
| timestamp    | required | string <naive-date-time> | Timestamp.                     |

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
