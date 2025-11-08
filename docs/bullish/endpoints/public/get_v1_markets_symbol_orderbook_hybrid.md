# GET /v1/markets/{symbol}/orderbook/hybrid

**Summary**: Get Market Order Book

## Description

Get Order Book by Market Symbol

**Ratelimited:** `False`

**Operation ID**: market-data-get-market-orderbook

**Tags**: market-data

**Endpoint**: `GET /v1/markets/{symbol}/orderbook/hybrid`

**Authentication Required**: No

## Parameters

| Parameter | In   | Type   | Required | Description   |
| --------- | ---- | ------ | -------- | ------------- |
| symbol    | path | string | Yes      | symbol to get |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/OrderBook"
}
```

### 404 - Resource Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
