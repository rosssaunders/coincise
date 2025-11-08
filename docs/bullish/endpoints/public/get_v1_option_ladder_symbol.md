# GET /v1/option-ladder/{symbol}

**Summary**: Get Option Ladder for market

## Description

Returns the for a given `baseSymbol`, organised by strike prices and expiration
dates. This data helps traders quickly assess the available options and their
respective prices, implied volatilities, and Greeks (such as delta, gamma,
theta, and vega).

**Operation ID**: get-option-ladder-symbol

**Tags**: option-ladder

**Endpoint**: `GET /v1/option-ladder/{symbol}`

**Authentication Required**: No

## Parameters

| Parameter | In   | Type   | Required | Description                                       |
| --------- | ---- | ------ | -------- | ------------------------------------------------- |
| symbol    | path | string | Yes      | symbol to get. Only option markets are supported. |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/OptionLadderResponse"
}
```

### 400 - Bad Request

### 404 - Option Market Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
