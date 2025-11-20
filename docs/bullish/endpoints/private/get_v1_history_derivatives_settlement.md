# GET /v1/history/derivatives-settlement

**Summary**: Get Historical Hourly Derivatives Settlement

## Description

Get historical derivatives settlement.

- [supports pagination](#overview--pagination-support)
- filtering on `settlementDatetime` requires additional keywords,
  [see filtering support](#overview--filtering-support)
- Only the last 90 days of data is available for querying

**Operation ID**: get-derivatives-settlement-history

**Tags**: history

**Endpoint**: `GET /v1/history/derivatives-settlement`

**Authentication Required**: Yes

## Parameters

| Parameter               | In    | Type   | Required | Description                                                                                                                                                                                                  |
| ----------------------- | ----- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|                         |       | string | No       |                                                                                                                                                                                                              |
| tradingAccountId        | query | string | No       | Id of the trading account. `tradingAccountId` is mandatory in the query for users with multiple trading accounts. For users with a single trading account, it can be automatically retrieved from the login. |
| symbol                  | query | string | No       |                                                                                                                                                                                                              |
| settlementDatetime[gte] | query | string | Yes      | start timestamp of window, ISO 8601 with millisecond as string                                                                                                                                               |
| settlementDatetime[lte] | query | string | Yes      | end timestamp of window, ISO 8601 with millisecond as string                                                                                                                                                 |

## Responses

### 200 - OK

**Content-Type**: application/json

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 25,
  "items": {
    "description": "Derivatives Settlement of one market for the trading account",
    "type": "string",
    "properties": {
      "tradingAccountId": {
        "description": "unique trading account ID",
        "type": "string",
        "example": "111000000000001",
        "properties": {}
      },
      "symbol": {
        "type": "string",
        "description": "market symbol. Eg `BTC-USDC-PERP` for PERPETUAL and `BTC-USDC-20241201` for DATED FUTURE markets.",
        "example": "BTC-USDC-20241201",
        "properties": {}
      },
      "side": {
        "type": "string",
        "example": "BUY",
        "enum": ["BUY", "SELL"],
        "properties": {}
      },
      "settlementQuantity": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "deltaTradingQuantity": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "mtmPnl": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.0000",
        "properties": {}
      },
      "fundingPnl": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.0000",
        "properties": {}
      },
      "eventType": {
        "description": "derivatives position update event types",
        "type": "string",
        "example": "settlementUpdate"
      },
      "settlementMarkPrice": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.0000",
        "properties": {}
      },
      "settlementIndexPrice": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.0000",
        "properties": {}
      },
      "settlementFundingRate": {
        "description": "funding rate at which the position was settled for this past cycle. Applicable for perpetuals only.",
        "type": "string",
        "example": "10.0"
      },
      "settlementDatetime": {
        "type": "string",
        "format": "date-time",
        "example": "2025-05-20T01:01:01.000Z",
        "description": "ISO 8601 with millisecond as string",
        "properties": {}
      },
      "settlementTimestamp": {
        "type": "string",
        "format": "string",
        "example": "1621490985000",
        "description": "unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string",
        "properties": {}
      }
    }
  }
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
