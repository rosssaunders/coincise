# GET /v1/markets/{symbol}/candle

**Summary**: Get Market Candle

## Description

Get Current OHLCV Candle by Market Symbol

- [supports pagination](#overview--pagination-support)
- filtering on `createdAtDatetime`, `createdAtTimestamp` requires additional
  keywords, [see filtering support](#overview--filtering-support)

**Ratelimited:** `False`

**Operation ID**: market-data-current-candle-by-market-symbol

**Tags**: market-data

**Endpoint**: `GET /v1/markets/{symbol}/candle`

**Authentication Required**: No

## Parameters

| Parameter              | In    | Type   | Required | Description                                                    |
| ---------------------- | ----- | ------ | -------- | -------------------------------------------------------------- |
| symbol                 | path  | string | Yes      |                                                                |
| createdAtDatetime[gte] | query | string | Yes      | start timestamp of window, ISO 8601 with millisecond as string |
| createdAtDatetime[lte] | query | string | Yes      | end timestamp of window, ISO 8601 with millisecond as string   |
| timeBucket             | query | string | Yes      | time bucket size                                               |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "type": "array",
  "minItems": 1,
  "maxItems": 25,
  "items": {
    "$ref": "#/components/schemas/OHLCVCandle"
  }
}
```

### 404 - Resource Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
