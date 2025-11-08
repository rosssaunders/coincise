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
- On a single query request you can retrieve data over a 7 day window, with the
  data available for the last 90 days

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

**Schema**:

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 25,
  "items": {
    "$ref": "#/components/schemas/BorrowInterest"
  }
}
```

### 404 - Resource Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
