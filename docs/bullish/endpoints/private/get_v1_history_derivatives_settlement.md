# GET /v1/history/derivatives-settlement

**Summary**: Get Historical Hourly Derivatives Settlement

## Description

Get historical derivatives settlement.

- [supports pagination](#overview--pagination-support)
- filtering on `settlementDatetime` requires additional keywords,
  [see filtering support](#overview--filtering-support)
- On a single query request you can retrieve data over a 7 day window, with the
  data available for the last 90 days

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

**Schema**:

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 25,
  "items": {
    "$ref": "#/components/schemas/DerivativesSettlementResponse"
  }
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
