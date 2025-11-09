# GET /api/v2/symbols

**Source:** [/api/v2/symbols](https://www.kucoin.com/docs/rest//api/v2/symbols)

## Authentication

Not Required (Public Endpoint)

## Description

Get All Symbols

Request a list of available currency pairs for trading via this endpoint. If you want to get the market information of the trading symbol, please use Get All Tickers.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| market | optional | string | [The trading market](https://www.kucoin.com/docs-new/api-222921786) |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | array |  |
| data[].symbol | required | string | Unique code of a symbol; it will not change after renaming |
| data[].name | required | string | Name of trading pairs, it will change after renaming |
| data[].baseCurrency | required | string | Base currency, e.g. BTC. |
| data[].quoteCurrency | required | string | Quote currency, e.g. USDT. |
| data[].feeCurrency | required | string | The currency of charged fees. |
| data[].market | required | string | The trading market. |
| data[].baseMinSize | required | string | The minimum order quantity required to place an order. |
| data[].quoteMinSize | required | string | The minimum order funds required to place a market order. |
| data[].baseMaxSize | required | string | The maximum order size required to place an order. |
| data[].quoteMaxSize | required | string | The maximum order funds required to place a market order. |
| data[].baseIncrement | required | string | Quantity increment: The quantity for an order must be a positive integer multiple of this increment. Here, the size refers to the quantity of the base currency for the order. For example, for the ETH-USDT trading pair, if the baseIncrement is 0.0000001, the order quantity can be 1.0000001 but not 1.00000001. |
| data[].quoteIncrement | required | string | Quote increment: The funds for a market order must be a positive integer multiple of this increment. The funds refer to the quote currency amount. For example, for the ETH-USDT trading pair, if the quoteIncrement is 0.000001, the amount of USDT for the order can be 3000.000001 but not 3000.0000001. |
| data[].priceIncrement | required | string | Price increment: The price of an order must be a positive integer multiple of this increment. For example, for the ETH-USDT trading pair, if the priceIncrement is 0.01, the order price can be 3000.01 but not 3000.001.

Specifies the min. order price as well as the price increment.This also applies to quote currency. |
| data[].priceLimitRate | required | string | Threshold for price protection |
| data[].minFunds | required | string | The minimum trading amounts |
| data[].isMarginEnabled | required | boolean | Available for margin or not. |
| data[].enableTrading | required | boolean | Available for transaction or not. |
| data[].feeCategory | required | integer | [Fee Type](https://www.kucoin.com/vip/privilege) |
| data[].makerFeeCoefficient | required | string | The maker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee |
| data[].takerFeeCoefficient | required | string | The taker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee |
| data[].st | required | boolean | Whether it is a [Special Treatment](https://www.kucoin.com/legal/special-treatment) symbol |
| data[].callauctionIsEnabled | required | boolean | The [call auction](https://www.kucoin.com/support/40999744334105) status returns true/false |
| data[].callauctionPriceFloor | optional | string | The lowest price declared in the call auction |
| data[].callauctionPriceCeiling | optional | string | The highest bid price in the call auction
 |
| data[].callauctionFirstStageStartTime | optional | integer | The first phase of the call auction starts at (Allow add orders, allow cancel orders) |
| data[].callauctionSecondStageStartTime | optional | integer | The second phase of the call auction starts at (Allow add orders, don't allow cancel orders) |
| data[].callauctionThirdStageStartTime | optional | integer | The third phase of the call auction starts at (Don't allow add orders, don't allow cancel orders) |
| data[].tradingStartTime | optional | integer | Official opening time (end time of the third phase of call auction) |

