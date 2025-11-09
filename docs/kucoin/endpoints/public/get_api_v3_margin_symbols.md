# GET /api/v3/margin/symbols

**Source:** [/api/v3/margin/symbols](https://www.kucoin.com/docs/rest//api/v3/margin/symbols)

## Authentication

Not Required (Public Endpoint)

## Description

Get Symbols - Cross Margin

This endpoint allows querying the configuration of cross margin symbol.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | optional | string | If not provided, all cross margin symbol will be queried. If provided, only the specified symbol will be queried. |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |
| data.timestamp | required | integer |  |
| data.items | required | array |  |
| data.items[].symbol | required | string | symbol |
| data.items[].name | required | string | Symbol name |
| data.items[].enableTrading | required | boolean | Whether trading is enabled: True for enabled; false for disabled |
| data.items[].market | required | string | Trading market |
| data.items[].baseCurrency | required | string | Base currency, e.g. BTC. |
| data.items[].quoteCurrency | required | string | Quote currency, e.g. USDT. |
| data.items[].baseIncrement | required | string | Quantity increment: The quantity for an order must be a positive integer multiple of this increment. Here, the size refers to the quantity of the base currency for the order. For example, for the ETH-USDT trading pair, if the baseIncrement is 0.0000001, the order quantity can be 1.0000001 but not 1.00000001. |
| data.items[].baseMinSize | required | string | The minimum order quantity required to place an order. |
| data.items[].quoteIncrement | required | string | Quote increment: The funds for a market order must be a positive integer multiple of this increment. The funds refer to the quote currency amount. For example, for the ETH-USDT trading pair, if the quoteIncrement is 0.000001, the amount of USDT for the order can be 3000.000001 but not 3000.0000001. |
| data.items[].quoteMinSize | required | string | The minimum order funds required to place a market order. |
| data.items[].baseMaxSize | required | string | The maximum order size required to place an order. |
| data.items[].quoteMaxSize | required | string | The maximum order funds required to place a market order. |
| data.items[].priceIncrement | required | string | Price increment: The price of an order must be a positive integer multiple of this increment. For example, for the ETH-USDT trading pair, if the priceIncrement is 0.01, the order price can be 3000.01 but not 3000.001.

Specifies the min. order price as well as the price increment.This also applies to quote currency. |
| data.items[].feeCurrency | required | string | The currency of charged fees. |
| data.items[].priceLimitRate | required | string | Threshold for price protection |
| data.items[].minFunds | required | string | The minimum trading amounts |

