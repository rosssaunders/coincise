# GET /v1/trades

**Summary**: Get Trades

## Description

Get a list of trades based on specified filters.

- requires [bearer token](#overview--add-authenticated-request-header) in
  authorization header
- Only the last 24 hours of data is available for querying
- [supports pagination](#overview--pagination-support)
- filtering on `createdAtDatetime`, `createdAtTimestamp` requires additional
  keywords, [see filtering support](#overview--filtering-support)

**Ratelimited:** `True`

**Operation ID**: trade-get-trades

**Tags**: trades

**Endpoint**: `GET /v1/trades`

**Authentication Required**: Yes

## Parameters

| Parameter        | In    | Type   | Required | Description                 |
| ---------------- | ----- | ------ | -------- | --------------------------- |
|                  |       | string | No       |                             |
| symbol           | query | string | No       |                             |
| orderId          | query | string | No       | unique order ID             |
| tradingAccountId | query | string | Yes      | Id of the trading account   |
| otcTradeId       | query | string | No       | unique Bullish otc trade id |
| clientOtcTradeId | query | string | No       | unique client otc trade id  |

## Responses

### 200 - OK

**Content-Type**: application/json

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 10,
  "items": {
    "type": "object",
    "required": [
      "tradeId",
      "orderId",
      "symbol",
      "price",
      "quantity",
      "quoteAmount",
      "baseFee",
      "quoteFee",
      "side",
      "isTaker",
      "tradeRebateAmount",
      "tradeRebateAssetSymbol",
      "otcMatchId",
      "otcTradeId",
      "clientOtcTradeId",
      "createdAtTimestamp",
      "createdAtDatetime"
    ],
    "properties": {
      "tradeId": {
        "type": "string",
        "example": "100020000000000060",
        "properties": {}
      },
      "orderId": {
        "type": "string",
        "example": "297735387747975680",
        "properties": {}
      },
      "symbol": {
        "type": "string",
        "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
        "example": "BTCUSDC",
        "properties": {}
      },
      "price": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "quantity": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "quoteAmount": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "baseFee": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "quoteFee": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "side": {
        "type": "string",
        "description": "order side can have the following string values `\"BUY\"`, `\"SELL\"`",
        "example": "BUY",
        "properties": {}
      },
      "isTaker": {
        "type": "boolean",
        "format": "true or false",
        "example": true,
        "properties": {}
      },
      "tradeRebateAmount": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "tradeRebateAssetSymbol": {
        "type": "string",
        "description": "asset symbol as denoted in the world",
        "example": "USDC",
        "properties": {}
      },
      "otcMatchId": {
        "type": "string",
        "description": "unique numeric (i64) identifier generated on Bullish side expressed as a string value",
        "example": "15",
        "properties": {}
      },
      "otcTradeId": {
        "type": "string",
        "description": "unique numeric (i64) identifier generated on Bullish side expressed as a string value",
        "example": "200000000000000098",
        "properties": {}
      },
      "clientOtcTradeId": {
        "type": "string",
        "description": "unique numeric (i64) identifier generated on the client side expressed as a string value",
        "example": "20050900225",
        "properties": {}
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
      }
    }
  }
}
```

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
