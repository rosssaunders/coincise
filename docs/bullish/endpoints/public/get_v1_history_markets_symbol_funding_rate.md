# GET /v1/history/markets/{symbol}/funding-rate

**Summary**: Get Historical Funding Rate

## Description

Get historical hourly funding rate for the requested perpetual market

- [supports pagination](#overview--pagination-support)
- On a single query request you can retrieve data over a 7 day window, with the
  data available for the last 90 days

**Operation ID**: market-data-get-funding-rate-history-by-market-symbol

**Tags**: history

**Endpoint**: `GET /v1/history/markets/{symbol}/funding-rate`

**Authentication Required**: No

## Parameters

| Parameter              | In    | Type   | Required | Description                                                    |
| ---------------------- | ----- | ------ | -------- | -------------------------------------------------------------- |
| symbol                 | path  | string | Yes      | symbol to get                                                  |
| updatedAtDatetime[gte] | query | string | No       | start timestamp of period, ISO 8601 with millisecond as string |
| updatedAtDatetime[lte] | query | string | No       | end timestamp of period, ISO 8601 with millisecond as string   |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 100,
  "items": {
    "$ref": "#/components/schemas/FundingRateHistoryResponse"
  }
}
```

### 400 - Bad Request

### 404 - Market Symbol Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
