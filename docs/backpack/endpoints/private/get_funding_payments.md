# GET funding payments.

**Source:**
[funding payments.](https://docs.backpack.exchange/#tag/History/operation/get_funding_payments)

## Authentication

Required (Private Endpoint)

## [](#tag/History/operation/get_funding_payments)Get funding payments.

Users funding payment history for futures.

**Instruction:** `fundingHistoryQueryAll`

##### query Parameters

| Parameter     | Required | Type             | Description                                                   |
| ------------- | -------- | ---------------- | ------------------------------------------------------------- |
| subaccountId  | optional | integer <uint16> | Filter for a subaccount.                                      |
| symbol        | optional | string           | Market symbol to query. If not set, all markets are returned. |
| limit         | optional | integer <uint64> | Maximum number to return. Default 100, maximum 1000.          |
| offset        | optional | integer <uint64> | Offset for pagination. Default 0.                             |
| sortDirection | optional | string           | Sort direction.                                               |

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

| Parameter            | Required | Type                     | Description                                                      |
| -------------------- | -------- | ------------------------ | ---------------------------------------------------------------- |
| userId               | required | integer <int32>          | User id of the account the payment is associated with.           |
| subaccountId         | optional | integer <uint16>         | Id of the subaccount the payment is associated with, if any.     |
| symbol               | required | string                   | The symbol of the market the payment is associated with.         |
| quantity             | required | string <decimal>         | Quantity of the payment. Positive if received, negative if paid. |
| intervalEndTimestamp | required | string <naive-date-time> | The end of the funding interval for the payment.                 |
| fundingRate          | required | string <decimal>         | The funding rate for the payment.                                |

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
