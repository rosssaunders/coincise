# GET /v2/otc-trades

**Summary**: Get OTC Trades

## Description

Get the otc trade list based on specified filters.

- requires [bearer token](#overview--add-authenticated-request-header) in
  authorization header
- [supports pagination](#overview--pagination-support)
- supports filtering on `status`, `tradingAccountId`, `sharedMatchKey`,
  `clientOtcTradeId`, `createdAtDatetime`, `createdAtTimestamp`

**Operation ID**: get-otc-trades

**Tags**: OTC

**Endpoint**: `GET /v2/otc-trades`

**Authentication Required**: Yes

## Parameters

| Parameter                | In    | Type   | Required | Description                                                    |
| ------------------------ | ----- | ------ | -------- | -------------------------------------------------------------- |
|                          |       | string | No       |                                                                |
| status                   | query | string | No       | OTC trade status                                               |
| tradingAccountId         | query | string | Yes      |                                                                |
| sharedMatchKey           | query | string | No       |                                                                |
| clientOtcTradeId         | query | string | No       |                                                                |
| createdAtDatetime[ gte ] | query | string | No       | Start timestamp of window, ISO 8601 with millisecond as string |
| createdAtDatetime[ lte ] | query | string | No       | End timestamp of window, ISO 8601 with millisecond as string   |

## Responses

### 200 - OK

**Content-Type**: application/json

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 25,
  "items": {
    "type": "object",
    "required": [
      "otcTradeId",
      "sharedMatchKey",
      "status",
      "statusReason",
      "statusReasonCode",
      "expireDatetime",
      "expireTimestamp",
      "trades"
    ],
    "properties": {
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
      "sharedMatchKey": {
        "type": "string",
        "description": "Unique shared key that is agreed between the two customers to represent their OTC trade to be matched on Bullish's OTC Clearing Facility. Must be a 12 to 64 characters alphanumeric value",
        "example": "cfBtcXrpMatch001",
        "properties": {}
      },
      "status": {
        "type": "string",
        "description": "otc trade status can have the following string values `\"COUNTERPARTY_PENDING\"`, `\"COUNTERPARTY_PAIRED\"`, `\"RISK_PENDING\"`, `\"MATCHED\"`, `\"CANCELLED\"`, `\"REJECTED\"`",
        "enum": [
          "COUNTERPARTY_PENDING",
          "COUNTERPARTY_PAIRED",
          "RISK_PENDING",
          "MATCHED",
          "CANCELLED",
          "REJECTED"
        ],
        "example": "MATCHED",
        "properties": {}
      },
      "statusReason": {
        "description": "status reason, describes why the otc trade is in a specific state",
        "type": "string",
        "example": "Ok"
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
      },
      "expireDatetime": {
        "type": "string",
        "format": "date-time",
        "example": "2025-05-20T01:01:01.000Z",
        "description": "ISO 8601 with millisecond as string",
        "properties": {}
      },
      "expireTimestamp": {
        "type": "string",
        "format": "string",
        "example": "1621490985000",
        "description": "unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string",
        "properties": {}
      },
      "remarks": {
        "type": "string",
        "description": "text field for client’s internal reference to a trade, max length is 255 characters",
        "example": "first otc trade with xyz client"
      },
      "trades": {
        "type": "array",
        "minItems": 0,
        "maxItems": 25,
        "nullable": false,
        "description": "all trades for the OTC trade",
        "items": {
          "description": "a trade of an OTC trade",
          "required": ["symbol", "price", "quantity", "side", "isTaker"],
          "properties": {
            "tradeId": {
              "type": "string",
              "example": "100020000000000060",
              "properties": {}
            },
            "symbol": {
              "type": "string",
              "description": "market symbol. Eg `BTC-USDC-PERP` for PERPETUAL market `BTC-USDC-20250613` for DATEDFUTURE market and `BTC-USDC-20250613-100000-C` for OPTION market",
              "example": "BTC-USDC-PERP"
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
            "tradeRebateAssetSymbol": {
              "type": "string",
              "description": "market symbol. Eg `BTC-USDC-PERP` for PERPETUAL market `BTC-USDC-20250613` for DATEDFUTURE market and `BTC-USDC-20250613-100000-C` for OPTION market",
              "example": "BTC-USDC-PERP"
            },
            "tradeRebateAmount": {
              "description": "see [asset value](#overview--price-and-quantity-precision) format",
              "type": "string",
              "example": "1.00000000",
              "properties": {}
            },
            "side": {
              "type": "string",
              "description": "trade side can have the following string values `BUY`, `SELL`",
              "example": "BUY"
            },
            "isTaker": {
              "type": "boolean",
              "format": "true or false",
              "example": true,
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
    }
  }
}
```

### 400 - For example, sending a request with an invalid trading account

**Content-Type**: application/json

| Field         | Type    | Required | Description            |
| ------------- | ------- | -------- | ---------------------- |
| message       | string  | Yes      | message                |
| errorCode     | integer | Yes      | unique error code      |
| errorCodeName | string  | Yes      | unique error code name |

### 401 - Not Authenticated

**Content-Type**: application/json

| Field         | Type    | Required | Description            |
| ------------- | ------- | -------- | ---------------------- |
| message       | string  | Yes      | message                |
| errorCode     | integer | Yes      | unique error code      |
| errorCodeName | string  | Yes      | unique error code name |

### 403 - Access Forbidden

**Content-Type**: application/json

| Field         | Type    | Required | Description            |
| ------------- | ------- | -------- | ---------------------- |
| message       | string  | Yes      | message                |
| errorCode     | integer | Yes      | unique error code      |
| errorCodeName | string  | Yes      | unique error code name |

### 500 - Internal Server Error

**Content-Type**: application/json

| Field         | Type    | Required | Description            |
| ------------- | ------- | -------- | ---------------------- |
| message       | string  | Yes      | message                |
| errorCode     | integer | Yes      | unique error code      |
| errorCodeName | string  | Yes      | unique error code name |
