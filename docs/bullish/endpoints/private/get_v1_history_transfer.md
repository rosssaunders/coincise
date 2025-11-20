# GET /v1/history/transfer

**Summary**: Get Historical Account Transfer

## Description

Get historical transfers.

- [supports pagination](#overview--pagination-support)
- filtering on `createdAtDatetime` and `createdAtTimestamp` requires additional
  keywords, [see filtering support](#overview--filtering-support)
- Only the last 90 days of data is available for querying

**Operation ID**: get-transfer-history

**Tags**: history

**Endpoint**: `GET /v1/history/transfer`

**Authentication Required**: Yes

## Parameters

| Parameter              | In    | Type   | Required | Description                                                                                                                                                                                                  |
| ---------------------- | ----- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|                        |       | string | No       |                                                                                                                                                                                                              |
| tradingAccountId       | query | string | No       | Id of the trading account. `tradingAccountId` is mandatory in the query for users with multiple trading accounts. For users with a single trading account, it can be automatically retrieved from the login. |
| status                 | query | string | No       | Status of the transfer request. Defaults to `CLOSED`                                                                                                                                                         |
| requestId              | query | string | No       | Unique identifier of the transfer request                                                                                                                                                                    |
| assetSymbol            | query | string | No       | Asset symbol of the transfer request                                                                                                                                                                         |
| createdAtDatetime[gte] | query | string | Yes      | start datetime of window, ISO 8601 with millisecond as string                                                                                                                                                |
| createdAtDatetime[lte] | query | string | Yes      | end datetime of window, ISO 8601 with millisecond as string                                                                                                                                                  |

## Responses

### 200 - OK

**Content-Type**: application/json

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 25,
  "items": {
    "description": "Get account transfer history",
    "type": "string",
    "properties": {
      "requestId": {
        "description": "unique identifier of the transfer request",
        "type": "string",
        "example": "1"
      },
      "toTradingAccountId": {
        "description": "unique trading account ID",
        "type": "string",
        "example": "111000000000001",
        "properties": {}
      },
      "fromTradingAccountId": {
        "description": "sender's trading account",
        "type": "string",
        "example": "121000000000001"
      },
      "assetSymbol": {
        "type": "string",
        "description": "asset symbol as denoted in the world",
        "example": "BTC",
        "properties": {}
      },
      "quantity": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "status": {
        "description": "transfer status [CLOSED/OPEN/REJECTED]",
        "type": "string",
        "example": "CLOSED"
      },
      "statusReasonCode": {
        "description": "status reason code",
        "type": "string",
        "example": "6002"
      },
      "statusReason": {
        "description": "readable status reason",
        "type": "string",
        "example": "Executed"
      },
      "createdAtTimestamp": {
        "type": "string",
        "format": "string",
        "example": "1621490985000",
        "description": "unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string",
        "properties": {}
      },
      "createdAtDatetime": {
        "type": "string",
        "format": "date-time",
        "example": "2025-05-20T01:01:01.000Z",
        "description": "ISO 8601 with millisecond as string",
        "properties": {}
      }
    }
  }
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
