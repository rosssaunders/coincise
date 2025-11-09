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
| data.currentPage | required | integer |  |
| data.pageSize | required | integer |  |
| data.totalNum | required | integer |  |
| data.totalPage | required | integer |  |
| data.items | required | array |  |
| data.items[].symbol | required | string | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)  |
| data.items[].tradeId | required | string | Trade ID
 |
| data.items[].orderId | required | string | Order ID
 |
| data.items[].side | required | string | Transaction side |
| data.items[].liquidity | required | string | Liquidity-taker or -maker |
| data.items[].forceTaker | required | boolean | Whether to force processing as a taker
 |
| data.items[].price | required | string | Filled price |
| data.items[].size | required | integer | Filled amount |
| data.items[].value | required | string | Order value |
| data.items[].openFeePay | required | string | Opening transaction fee |
| data.items[].closeFeePay | required | string | Closing transaction fee |
| data.items[].stop | required | string | A mark to the stop order type |
| data.items[].feeRate | required | string | Fee Rate |
| data.items[].fixFee | required | string | Fixed fees (Deprecated field, no actual use of the value field) |
| data.items[].feeCurrency | required | string | Charging currency |
| data.items[].tradeTime | required | integer | Trade time in nanoseconds |
| data.items[].subTradeType | required | string | Deprecated field, no actual use of the value field |
| data.items[].marginMode | required | string | Margin mode: ISOLATED (isolated), CROSS (cross margin). |
| data.items[].settleCurrency | required | string | Settle currency |
| data.items[].displayType | required | string | Order type |
| data.items[].fee | required | string | Trading fee |
| data.items[].orderType | required | string | Order type |
| data.items[].tradeType | required | string | Trade type (trade, liquid, adl or settlement)
 |
| data.items[].createdAt | required | integer | Order creation time
 |
| data.items[].openFeeTaxPay | required | string | Opening tax fee (Only KYC users in some regions have this parameter) |
| data.items[].closeFeeTaxPay | required | string | Close tax fee (Only KYC users in some regions have this parameter) |

