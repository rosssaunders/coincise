# GET /v2/otc-trades/{otcTradeId}

**Summary**: Get OTC Trade by ID

## Description

Retrieve a specific otc trade using its unique identifier.

**Operation ID**: get-otc-trade--by-id

**Tags**: OTC

**Endpoint**: `GET /v2/otc-trades/{otcTradeId}`

**Authentication Required**: Yes

## Parameters

| Parameter        | In    | Type   | Required | Description               |
| ---------------- | ----- | ------ | -------- | ------------------------- |
|                  |       | string | No       |                           |
| tradingAccountId | query | string | Yes      | Id of the trading account |

## Responses

### 200 - OK

**Content-Type**: application/json

| Field              | Type          | Required | Description                                                                                                                                                                                                                     |
| ------------------ | ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| otcTradeId         | string        | Yes      | unique numeric (i64) identifier generated on Bullish side expressed as a string value<br>**Example:** `"200000000000000098"`                                                                                                    |
| clientOtcTradeId   | string        | No       | unique numeric (i64) identifier generated on the client side expressed as a string value<br>**Example:** `"20050900225"`                                                                                                        |
| sharedMatchKey     | string        | Yes      | Unique shared key that is agreed between the two customers to represent their OTC trade to be matched on Bullish's OTC Clearing Facility. Must be a 12 to 64 characters alphanumeric value<br>**Example:** `"cfBtcXrpMatch001"` |
| status             | string        | Yes      | otc trade status can have the following string values `"COUNTERPARTY_PENDING"`, `"COUNTERPARTY_PAIRED"`, `"RISK_PENDING"`, `"MATCHED"`, `"CANCELLED"`, `"REJECTED"`<br>**Example:** `"MATCHED"`                                 |
| statusReason       | string        | Yes      | status reason, describes why the otc trade is in a specific state<br>**Example:** `"Ok"`                                                                                                                                        |
| statusReasonCode   | string        | Yes      | status reason code, see [details](#overview--error--rejection-codes)<br>**Example:** `"1002"`                                                                                                                                   |
| createdAtDatetime  | string        | No       | ISO 8601 with millisecond as string<br>**Example:** `"2025-05-20T01:01:01.000Z"`                                                                                                                                                |
| createdAtTimestamp | string        | No       | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string<br>**Example:** `"1621490985000"`                                                                                             |
| expireDatetime     | string        | Yes      | ISO 8601 with millisecond as string<br>**Example:** `"2025-05-20T01:01:01.000Z"`                                                                                                                                                |
| expireTimestamp    | string        | Yes      | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string<br>**Example:** `"1621490985000"`                                                                                             |
| remarks            | string        | No       | text field for client’s internal reference to a trade, max length is 255 characters<br>**Example:** `"first otc trade with xyz client"`                                                                                         |
| trades             | array[object] | Yes      | all trades for the OTC trade                                                                                                                                                                                                    |

### 400 - For example, sending a request with an invalid trading account

**Content-Type**: application/json

| Field         | Type    | Required | Description            |
| ------------- | ------- | -------- | ---------------------- |
| message       | string  | Yes      | message                |
| errorCode     | integer | Yes      | unique error code      |
| errorCodeName | string  | Yes      | unique error code name |

### 401 - Not Authenticated

**Content-Type**: application/json

| Field         | Type    | Required | Description            |
| ------------- | ------- | -------- | ---------------------- |
| message       | string  | Yes      | message                |
| errorCode     | integer | Yes      | unique error code      |
| errorCodeName | string  | Yes      | unique error code name |

### 403 - Access Forbidden

**Content-Type**: application/json

| Field         | Type    | Required | Description            |
| ------------- | ------- | -------- | ---------------------- |
| message       | string  | Yes      | message                |
| errorCode     | integer | Yes      | unique error code      |
| errorCodeName | string  | Yes      | unique error code name |

### 404 - The given otcTradeId does not exist

**Content-Type**: application/json

| Field         | Type    | Required | Description            |
| ------------- | ------- | -------- | ---------------------- |
| message       | string  | Yes      | message                |
| errorCode     | integer | Yes      | unique error code      |
| errorCodeName | string  | Yes      | unique error code name |

### 500 - Internal Server Error

**Content-Type**: application/json

| Field         | Type    | Required | Description            |
| ------------- | ------- | -------- | ---------------------- |
| message       | string  | Yes      | message                |
| errorCode     | integer | Yes      | unique error code      |
| errorCodeName | string  | Yes      | unique error code name |
