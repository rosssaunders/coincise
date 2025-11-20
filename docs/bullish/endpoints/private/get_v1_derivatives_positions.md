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

```json
{
  "type": "array",
  "items": {
    "description": "Derivatives Position of one market for the trading account",
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
        "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
        "example": "BTCUSDC",
        "properties": {}
      },
      "side": {
        "type": "string",
        "example": "BUY",
        "enum": ["BUY", "SELL"],
        "properties": {}
      },
      "quantity": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "notional": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.0000",
        "properties": {}
      },
      "entryNotional": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.0000",
        "properties": {}
      },
      "mtmPnl": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.0000",
        "properties": {}
      },
      "reportedMtmPnl": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.0000",
        "properties": {}
      },
      "reportedFundingPnl": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.0000",
        "properties": {}
      },
      "realizedPnl": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.0000",
        "properties": {}
      },
      "settlementAssetSymbol": {
        "description": "Settlement Asset Symbol",
        "type": "string",
        "example": "USDC"
      },
      "createdAtDatetime": {
        "type": "string",
        "format": "date-time",
        "example": "2025-05-20T01:01:01.000Z",
        "description": "ISO 8601 with millisecond as string",
        "properties": {}
      },
      "createdAtTimestamp": {
        "type": "string",
        "format": "string",
        "example": "1621490985000",
        "description": "unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string",
        "properties": {}
      },
      "updatedAtDatetime": {
        "type": "string",
        "format": "date-time",
        "example": "2025-05-20T01:01:01.000Z",
        "description": "ISO 8601 with millisecond as string",
        "properties": {}
      },
      "updatedAtTimestamp": {
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
