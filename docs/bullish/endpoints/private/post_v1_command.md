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

**Schema**:

```json
{
  "$ref": "#/components/schemas/TradingAccountTransferRequest"
}
```

## Responses

### 200 - Status OK. This means the request was successfully acknowledged. It does not necessarily mean the command was successfully executed.

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/TradingAccountTransferResponse"
}
```

### 400 - Bad Request

For example, sending a request with the `BX-SIGNATURE` header missing will
result in the following response:

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/BadOrderEntryResponse"
}
```

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
