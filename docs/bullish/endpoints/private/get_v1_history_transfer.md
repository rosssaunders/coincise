# GET /v1/history/transfer

**Summary**: Get Historical Account Transfer

## Description

Get historical transfers.

- [supports pagination](#overview--pagination-support)
- filtering on `createdAtDatetime` and `createdAtTimestamp` requires additional
  keywords, [see filtering support](#overview--filtering-support)
- On a single query request you can retrieve data over a 7 day window, with the
  data available for the last 90 days

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

**Schema**:

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 25,
  "items": {
    "$ref": "#/components/schemas/SubAccountTransferResponse"
  }
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
