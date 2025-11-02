# GET quote history.

**Source:**
[quote history.](https://docs.backpack.exchange/#tag/History/operation/get_quote_history)

## Authentication

Required (Private Endpoint)

## [](#tag/History/operation/get_quote_history)Get quote history.

Retrieves the quote history for the user. This includes quotes that have been
filled or expired.

**Instruction:** `quoteHistoryQueryAll`

##### query Parameters

| Parameter     | Required | Type             | Description                                          |
| ------------- | -------- | ---------------- | ---------------------------------------------------- |
| quoteId       | optional | string           | Filter to the given quote.                           |
| symbol        | optional | string           | Filter to the given symbol.                          |
| status        | optional | string           | Filter to the given status.                          |
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

| Parameter    | Required | Type                     | Description                                              |
| ------------ | -------- | ------------------------ | -------------------------------------------------------- |
| userId       | required | integer <int32>          | User ID.                                                 |
| subaccountId | optional | integer <int32>          | Subaccount ID.                                           |
| rfqId        | required | string                   | Unique RFQ order ID, assigned by the matching engine.    |
| quoteId      | required | string                   | Unique RFQ quote ID, assigned by the matching engine.    |
| clientId     | optional | integer <uint32>         | Custom RFQ quote ID, assigned by the maker (optionally). |
| bidPrice     | required | string <decimal>         | Quote bid price.                                         |
| askPrice     | required | string <decimal>         | Quote ask price.                                         |
| status       | required | string                   | Status.                                                  |
| createdAt    | required | string <naive-date-time> | Time the quote was created.                              |

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
