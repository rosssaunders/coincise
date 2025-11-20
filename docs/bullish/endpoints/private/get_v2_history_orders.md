# GET /v2/history/orders

**Summary**: Get Historical Orders

## Description

Retrieve a list of orders placed by a trading account with specified filters.

- Only the last 90 days of data is available for querying

This endpoint requires [authentication](#overview--generate-a-jwt-token) and
supports [pagination](#overview--pagination-support). To filter by
`createdAtDatetime` and `createdAtTimestamp`, additional parameters are
required. For detailed instructions, see the
[Filtering Support](#overview--filtering-support) section. Additionally, this
endpoint is subjected to rate limiting.

**Operation ID**: trade-get-orders-history-v2

**Tags**: history

**Endpoint**: `GET /v2/history/orders`

**Authentication Required**: Yes

## Parameters

| Parameter              | In    | Type   | Required | Description                                                                              |
| ---------------------- | ----- | ------ | -------- | ---------------------------------------------------------------------------------------- |
|                        |       | string | No       |                                                                                          |
| symbol                 | query | string | No       |                                                                                          |
| orderId                | query | string | No       |                                                                                          |
| clientOrderId          | query | string | No       | Unique numeric (i64) identifier generated on the client side expressed as a string value |
| side                   | query | string | No       | order side                                                                               |
| status                 | query | string | No       | order status                                                                             |
| tradingAccountId       | query | string | Yes      | Id of the trading account                                                                |
| createdAtDatetime[gte] | query | string | No       | start timestamp of period, ISO 8601 with millisecond as string                           |
| createdAtDatetime[lte] | query | string | No       | end timestamp of period, ISO 8601 with millisecond as string                             |

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
      "orderId",
      "clientOrderId",
      "symbol",
      "price",
      "stopPrice",
      "averageFillPrice",
      "allowBorrow",
      "quantity",
      "quantityFilled",
      "quoteAmount",
      "baseFee",
      "quoteFee",
      "isLiquidation",
      "side",
      "type",
      "timeInForce",
      "status",
      "statusReason",
      "statusReasonCode",
      "createdAtTimestamp",
      "createdAtDatetime"
    ],
    "properties": {
      "clientOrderId": {
        "description": "Unique numeric (i64) identifier generated on the client side expressed as a string value",
        "type": "string",
        "example": "187",
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
      "averageFillPrice": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "stopPrice": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "allowBorrow": {
        "description": "indicates if the order was allowed to borrow (does not indicate that borrowing occurred)",
        "type": "boolean",
        "example": false
      },
      "quantity": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "quantityFilled": {
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
      "borrowedBaseQuantity": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "borrowedQuoteQuantity": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "isLiquidation": {
        "description": "indicates if the order was executed as a liquidation order",
        "type": "boolean",
        "example": false
      },
      "side": {
        "type": "string",
        "description": "order side can have the following string values `\"BUY\"`, `\"SELL\"`",
        "example": "BUY",
        "properties": {}
      },
      "type": {
        "type": "string",
        "description": "order type can have the following string values `\"LMT\"`, `\"MKT\"`, `\"STOP_LIMIT\"`, `\"POST_ONLY\"`. `\"MKT\"` and `\"STOP_LIMIT\"` are not applicable for Options",
        "example": "LMT",
        "properties": {}
      },
      "timeInForce": {
        "type": "string",
        "description": "time in force can have the following string values `\"GTC\"`, `\"FOK\"`, `\"IOC\"`, see [details](#overview--order-timeinforce)",
        "properties": {}
      },
      "status": {
        "type": "string",
        "description": "order status can have the following string values `\"OPEN\"`, `\"CLOSED\"`, `\"CANCELLED\"`, `\"REJECTED\"`",
        "example": "OPEN",
        "properties": {}
      },
      "statusReason": {
        "description": "status reason, describes why the order is in a specific state",
        "type": "string",
        "example": "User cancelled"
      },
      "statusReasonCode": {
        "description": "status reason code, see [details](#overview--error--rejection-codes)",
        "type": "string",
        "example": "1002"
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
