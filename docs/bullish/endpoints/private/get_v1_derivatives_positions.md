# GET /v1/derivatives-positions

**Summary**: Get derivatives positions

## Description

Get derivatives positions

**Operation ID**: get-derivatives-positions

**Tags**: derivatives

**Endpoint**: `GET /v1/derivatives-positions`

**Authentication Required**: Yes

## Parameters

| Parameter        | In    | Type   | Required | Description                                                                                                                                                                                                  |
| ---------------- | ----- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|                  |       | string | No       |                                                                                                                                                                                                              |
| tradingAccountId | query | string | No       | Id of the trading account. `tradingAccountId` is mandatory in the query for users with multiple trading accounts. For users with a single trading account, it can be automatically retrieved from the login. |
| symbol           | query | string | No       |                                                                                                                                                                                                              |
| marketType       | query | string | No       | Optional - Filter for results by expiry date                                                                                                                                                                 |
| optionType       | query | string | No       | Optional - Filter for results by option type                                                                                                                                                                 |
| sort             | query | string | No       | Optional - Sort results by Market Type or Option Type                                                                                                                                                        |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "type": "array",
  "items": {
    "$ref": "#/components/schemas/DerivativesPositionResponse"
  }
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
