# GET /api/v1/recentFills

**Source:** [/api/v1/recentFills](https://www.kucoin.com/docs/rest//api/v1/recentFills)

## Authentication

Required (Private Endpoint)

## Description

Get Recent Trade History

Get a list of recent 1000 fills in the last 24 hours. If you need to get your recently traded order history with low latency, you may query this endpoint.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | optional | string | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)  |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | array |  |
| data[].symbol | required | string | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)  |
| data[].tradeId | required | string | Trade ID
 |
| data[].orderId | required | string | Order ID
 |
| data[].side | required | string | Transaction side
 |
| data[].liquidity | required | string | Liquidity-taker or -maker
 |
| data[].forceTaker | required | boolean | Whether to force processing as a taker
 |
| data[].price | required | string | Filled price
 |
| data[].size | required | integer | Filled amount
 |
| data[].value | required | string | Order value
 |
| data[].openFeePay | required | string | Opening transaction fee
 |
| data[].closeFeePay | required | string | Closing transaction fee
 |
| data[].stop | required | string | A mark to the stop order type |
| data[].feeRate | required | string | Fee Rate |
| data[].fixFee | required | string | Fixed fees (Deprecated field, no actual use of the value field)
 |
| data[].feeCurrency | required | string | Charging currency
 |
| data[].tradeTime | required | integer | Trade time in nanoseconds
 |
| data[].subTradeType | required | string | Deprecated field, no actual use of the value field |
| data[].marginMode | required | string | Margin mode: ISOLATED (isolated), CROSS (cross margin).
 |
| data[].displayType | required | string | Order Type |
| data[].fee | required | string | Transaction fee
 |
| data[].settleCurrency | required | string | Settle Currency |
| data[].orderType | required | string | Order type
 |
| data[].tradeType | required | string | Trade type (trade, liquid, cancel, adl or settlement)
 |
| data[].createdAt | required | integer | Order creation time
 |

