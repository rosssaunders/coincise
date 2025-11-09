# GET /api/v1/limit/fills

**Source:** [/api/v1/limit/fills](https://www.kucoin.com/docs/rest//api/v1/limit/fills)

## Authentication

Required (Private Endpoint)

## Description

Get Recent Trade History - Old

Request a list of 1000 fills in the last 24 hours via this endpoint. The return value is the data after Pagination, sorted in descending order according to time.

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | array |  |
| data[].symbol | required | string |  |
| data[].tradeId | required | string |  |
| data[].orderId | required | string |  |
| data[].counterOrderId | required | string |  |
| data[].side | required | string |  |
| data[].liquidity | required | string |  |
| data[].forceTaker | required | boolean |  |
| data[].price | required | string |  |
| data[].size | required | string |  |
| data[].funds | required | string |  |
| data[].fee | required | string |  |
| data[].feeRate | required | string |  |
| data[].feeCurrency | required | string |  |
| data[].stop | required | string |  |
| data[].tradeType | required | string |  |
| data[].type | required | string |  |
| data[].createdAt | required | integer |  |
| data[].tax | optional | string |  |
| data[].taxCurrency | optional | string |  |
| data[].taxRate | optional | string |  |

