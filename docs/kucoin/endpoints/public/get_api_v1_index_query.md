# GET /api/v1/index/query

**Source:** [/api/v1/index/query](https://www.kucoin.com/docs/rest//api/v1/index/query)

## Authentication

Not Required (Public Endpoint)

## Description

Get Spot Index Price

Get Spot Index Price (Update snapshots once per second,  and there is a 5s cache when querying).

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | required | string | Symbol of the contract. Please refer to [Get Symbol endpoint: indexSymbol](https://www.kucoin.com/docs-new/api-3470220)  |
| startAt | optional | integer | Start time (milliseconds) |
| endAt | optional | integer | End time (milliseconds) |
| reverse | optional | boolean | This parameter functions to judge whether the lookup is reversed. True means “yes”. False means “no”. This parameter is set as True by default. |
| offset | optional | integer | Start offset. The unique attribute of the last returned result of the last request. The data of the first page will be returned by default. |
| forward | optional | boolean | This parameter functions to judge whether the lookup is forward or not. True means “yes” and False means “no”. This parameter is set as true by default. |
| maxCount | optional | integer | Max. record count. The default record count is 10; the maximum length cannot exceed 100 |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

