# POST /v2/otc-trades

**Summary**: Create OTC Trade

## Description

Creates an OTC trade, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header.

This endpoint uses the [signing format](#overview--signing-format) which does
not require strict field ordering and addition of null fields in the request
body. Prices do not require strict precision. Eg. for asset precision of 4 -
`100`, `100.0`, `100.00`, `100.000` and `100.0000` are all accepted.

**Operation ID**: create-otc-trade

**Tags**: OTC

**Endpoint**: `POST /v2/otc-trades`

**Authentication Required**: Yes

## Parameters

| Parameter | In  | Type   | Required | Description |
| --------- | --- | ------ | -------- | ----------- |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |
|           |     | string | No       |             |

## Request Body

**Required**: Yes

### Content-Type: application/json

| Field            | Type          | Required | Description                                                                                                                                                                                                                     |
| ---------------- | ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| commandType      | string        | Yes      | Specifies the command type and must be ‘V1CreateOtcTrade’ to indicate the submission of an OTC trade.                                                                                                                           |
| clientOtcTradeId | string        | No       | unique numeric (i64) identifier generated on the client side expressed as a string value<br>**Example:** `"20050900225"`                                                                                                        |
| sharedMatchKey   | string        | Yes      | Unique shared key that is agreed between the two customers to represent their OTC trade to be matched on Bullish's OTC Clearing Facility. Must be a 12 to 64 characters alphanumeric value<br>**Example:** `"cfBtcXrpMatch001"` |
| tradingAccountId | string        | Yes      | unique trading account ID<br>**Example:** `"111000000000001"`                                                                                                                                                                   |
| isTaker          | boolean       | Yes      | <br>**Example:** `true`                                                                                                                                                                                                         |
| remarks          | string        | No       | text field for client’s internal reference to a trade, max length is 255 characters<br>**Example:** `"first otc trade with xyz client"`                                                                                         |
| trades           | array[object] | Yes      | all trades for the OTC trade                                                                                                                                                                                                    |

## Responses

### 200 - Status OK. The create OTC trade command was successfully acknowledged. To check the current status of the

OTC trade, query [Get Trade by ID](#get-/v2/otc-trades/-otcTradeId-) using
`otcTradeId` or `clientOtcTradeId` received in the response payload.

**Content-Type**: application/json

| Field            | Type   | Required | Description                                                                                                                                                                                                                     |
| ---------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| message          | string | Yes      | message indicating the status of the request<br>**Example:** `"Command acknowledged - CreateOtcTrade"`                                                                                                                          |
| requestId        | string | Yes      | <br>**Example:** `"197735387747975680"`                                                                                                                                                                                         |
| otcTradeId       | string | Yes      | unique numeric (i64) identifier generated on Bullish side expressed as a string value<br>**Example:** `"200000000000000098"`                                                                                                    |
| clientOtcTradeId | string | No       | unique numeric (i64) identifier generated on the client side expressed as a string value<br>**Example:** `"20050900225"`                                                                                                        |
| sharedMatchKey   | string | Yes      | Unique shared key that is agreed between the two customers to represent their OTC trade to be matched on Bullish's OTC Clearing Facility. Must be a 12 to 64 characters alphanumeric value<br>**Example:** `"cfBtcXrpMatch001"` |

### 400 - Bad Request

For example, sending a request with the `BX-SIGNATURE` header missing will
result in the following response:

**Content-Type**: application/json

| Field         | Type    | Required | Description            |
| ------------- | ------- | -------- | ---------------------- |
| message       | string  | Yes      | message                |
| errorCode     | integer | Yes      | unique error code      |
| errorCodeName | string  | Yes      | unique error code name |

### 401 - Unauthorized. Either API details are missing or invalid

**Content-Type**: application/json

| Field         | Type    | Required | Description            |
| ------------- | ------- | -------- | ---------------------- |
| message       | string  | Yes      | message                |
| errorCode     | integer | Yes      | unique error code      |
| errorCodeName | string  | Yes      | unique error code name |

### 403 - Forbidden- You do not have access to the requested resource

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
