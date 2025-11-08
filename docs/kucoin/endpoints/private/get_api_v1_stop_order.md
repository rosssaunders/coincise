# GET /api/v1/stop-order

**Source:** [/api/v1/stop-order](https://www.kucoin.com/docs/rest//api/v1/stop-order)

## Authentication

Required (Private Endpoint)

## Description

Get Stop Orders List

This interface is to obtain all Spot active stop order lists

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | optional | string | Only list orders for a specific symbol |
| side | optional | string | buy or sell |
| type | optional | string | limit, market |
| tradeType | optional | string | The type of trading : TRADE（Spot）, MARGIN_TRADE (Cross Margin), MARGIN_ISOLATED_TRADE (Isolated Margin). Default is TRADE |
| startAt | optional | integer | Start time (milisecond) |
| endAt | optional | integer | End time (milisecond) |
| currentPage | optional | integer | Current page
 |
| orderIds | optional | string | Comma seperated order ID list |
| pageSize | optional | integer | Page size |
| stop | optional | string | Order type: stop: stop loss order, oco: oco order |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

