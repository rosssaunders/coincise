# GET /api/v1/fills

**Source:** [/api/v1/fills](https://www.kucoin.com/docs/rest//api/v1/fills)

## Authentication

Required (Private Endpoint)

## Description

Get Trade History

Get a list of recent fills. If you need to get your recent trade history with low latency, please query endpoint Get List of Orders Completed in 24h. The requested data is not real-time.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| orderId | optional | string | List fills for a specific order only (if you specify orderId, other parameters can be ignored) |
| symbol | optional | string | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)  |
| side | optional | string | Order side |
| type | optional | string | Order Type |
| tradeTypes | optional | string | Transaction type: trade, adl, liquid, settlement. Supports querying multiple types at the same time, separated by commas. Query all types when empty |
| startAt | optional | integer | Start time (milliseconds) |
| endAt | optional | integer | End time (milliseconds) |
| currentPage | optional | integer | Current request page. The default currentPage is 1 |
| pageSize | optional | integer | pageSize, The default pageSize is 50; the maximum cannot exceed 1000 |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

