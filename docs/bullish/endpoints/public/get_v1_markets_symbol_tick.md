# GET /v1/markets/{symbol}/tick

**Summary**: Get Market Tick

## Description

Get Current Tick by Market Symbol.

- return top 100

**Ratelimited:** `False`

**Operation ID**: market-data-current-tick-by-market-symbol

**Tags**: market-data

**Endpoint**: `GET /v1/markets/{symbol}/tick`

**Authentication Required**: No

## Parameters

| Parameter | In   | Type   | Required | Description                                          |
| --------- | ---- | ------ | -------- | ---------------------------------------------------- |
| symbol    | path | string | Yes      | symbol to get. Only perpetual markets are supported. |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/Tick"
}
```

### 404 - Resource Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
