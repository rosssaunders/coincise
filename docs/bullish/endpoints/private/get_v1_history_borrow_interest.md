# GET /v1/history/borrow-interest

**Summary**: Get Historical Hourly Borrow Interest

## Description

Get Historical Hourly Borrow Interest. Each entry denotes the hourly quantities
for the specific asset. Total borrowed quantity is inclusive of interest.
`interest = totalBorrowedQuantity - borrowedQuantity` which denotes the interest
charged in the particular hour for the asset.

- [supports pagination](#overview--pagination-support)
- filtering `createdAtDatetime`, `createdAtTimestamp` requires additional
  keywords, [see filtering support](#overview--filtering-support)
- Only the last 90 days of data is available for querying

**Ratelimited:** `True`

**Operation ID**: market-data-get-historical-borrow-interest

**Tags**: history

**Endpoint**: `GET /v1/history/borrow-interest`

**Authentication Required**: Yes

## Parameters

| Parameter              | In    | Type   | Required | Description                                                                                                                                                                                                  |
| ---------------------- | ----- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|                        |       | string | No       |                                                                                                                                                                                                              |
| tradingAccountId       | query | string | No       | Id of the trading account. `tradingAccountId` is mandatory in the query for users with multiple trading accounts. For users with a single trading account, it can be automatically retrieved from the login. |
| assetSymbol            | query | string | Yes      |                                                                                                                                                                                                              |
| createdAtDatetime[gte] | query | string | Yes      | start timestamp of period, ISO 8601 with millisecond as string                                                                                                                                               |
| createdAtDatetime[lte] | query | string | Yes      | end timestamp of period, ISO 8601 with millisecond as string                                                                                                                                                 |

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
      "assetId",
      "assetSymbol",
      "borrowedQuantity",
      "totalBorrowedQuantity",
      "createdAtDatetime",
      "createdAtTimestamp"
    ],
    "properties": {
      "assetId": {
        "type": "string",
        "description": "unique asset ID",
        "example": "1",
        "properties": {}
      },
      "assetSymbol": {
        "type": "string",
        "description": "asset symbol as denoted in the world",
        "example": "BTC",
        "properties": {}
      },
      "borrowedQuantity": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "totalBorrowedQuantity": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "createdAtDatetime": {
        "description": "denotes the hour in which the principal quantity was borrowed or when the interest was charged, ISO 8601 with millisecond as string",
        "type": "string",
        "format": "date-time",
        "example": "2020-08-21T08:00:00.000Z"
      },
      "createdAtTimestamp": {
        "description": "denotes the hour in which the principal quantity was borrowed or when the interest was charged",
        "type": "string",
        "format": "string",
        "example": "1621490985000"
      }
    }
  }
}
```

### 404 - Resource Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
