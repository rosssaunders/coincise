# POST /v1/command

**Summary**: Transfer Asset

## Description

Send command to transfer asset between two trading accounts.

**Operation ID**: command

**Tags**: trading-accounts

**Endpoint**: `POST /v1/command`

**Authentication Required**: Yes

## Parameters

| Parameter   | In    | Type   | Required | Description                                 |
| ----------- | ----- | ------ | -------- | ------------------------------------------- |
|             |       | string | No       |                                             |
|             |       | string | No       |                                             |
|             |       | string | No       |                                             |
|             |       | string | No       |                                             |
| commandType | query | string | Yes      | The command type, must be 'V1TransferAsset' |

## Request Body

Command for action

**Required**: Yes

### Content-Type: application/json

| Field      | Type   | Required | Description                                                                                                                                |
| ---------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| timestamp  | string | Yes      | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string<br>**Example:** `"1621490985000"`        |
| nonce      | string | Yes      | the nonce is a client side incremented unsigned 64 bit integer expressed as string<br>**Example:** `"123456789"`                           |
| authorizer | string | Yes      | JWT authorizer you obtain along with the [JWT token](#overview--generate-a-jwt-token)<br>**Example:** `"03E02367E8C900000500000000000000"` |
| command    | object | Yes      |                                                                                                                                            |

## Responses

### 200 - Status OK. This means the request was successfully acknowledged. It does not necessarily mean the command was successfully executed.

**Content-Type**: application/json

| Field     | Type   | Required | Description                             |
| --------- | ------ | -------- | --------------------------------------- |
| message   | string | Yes      | message                                 |
| requestId | string | Yes      | <br>**Example:** `"197735387747975680"` |

### 400 - Bad Request

For example, sending a request with the `BX-SIGNATURE` header missing will
result in the following response:

**Content-Type**: application/json

| Field         | Type    | Required | Description                                                         |
| ------------- | ------- | -------- | ------------------------------------------------------------------- |
| message       | string  | Yes      | message<br>**Example:** `"Missing signature header"`                |
| errorCode     | integer | Yes      | unique error code<br>**Example:** `6029`                            |
| errorCodeName | string  | Yes      | unique error code name<br>**Example:** `"MISSING_SIGNATURE_HEADER"` |

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
