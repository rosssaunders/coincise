# GET /v1/expiry-prices/{symbol}

**Summary**: Get Expiry Prices

## Description

Retrieves Expiry Price and Expiry Notional for respective Options and Dated
Futures markets.

**Operation ID**: get-expiry-prices--symbol

**Tags**: derivatives

**Endpoint**: `GET /v1/expiry-prices/{symbol}`

**Authentication Required**: No

## Parameters

| Parameter | In   | Type   | Required | Description |
| --------- | ---- | ------ | -------- | ----------- |
| symbol    | path | string | Yes      |             |

## Responses

### 200 - Retrieve expiry price and expiry notional for options and dated future.

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/MarketExpiryPriceResponse"
}
```

### 400 - Expiry price for market is not (yet) available

### 404 - Invalid symbol provided

### 500 - Internal Server Error
