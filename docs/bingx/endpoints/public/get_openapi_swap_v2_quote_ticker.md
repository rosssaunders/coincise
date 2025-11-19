# GET /openApi/swap/v2/quote/ticker

**Source:** [/openApi/swap/v2/quote/ticker](https://bingx-api.github.io/docs/)

## Authentication

Not Required (Public Endpoint)

## 24hr Ticker Price Change Statistics

GET /openApi/swap/v2/quote/ticker

API KEY permission: No API KEY signature required

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds              |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                  |

### Response Parameters

| Parameter Name     | Type    | Description                                                  |
| ------------------ | ------- | ------------------------------------------------------------ |
| symbol             | string  | trading pair, for example: BTC-USDT                          |
| priceChange        | string  | 24 hour price change                                         |
| priceChangePercent | string  | price change percentage                                      |
| lastPrice          | string  | latest transaction price                                     |
| lastQty            | string  | latest transaction amount                                    |
| highPrice          | string  | 24-hour highest price                                        |
| lowPrice           | string  | 24 hours lowest price                                        |
| volume             | string  | 24-hour volume                                               |
| quoteVolume        | string  | 24-hour turnover, the unit is USDT                           |
| openPrice          | string  | first price within 24 hours                                  |
| openTime           | int64   | The time when the first transaction occurred within 24 hours |
| closeTime          | int64   | The time when the last transaction occurred within 24 hours  |
| bidPrice           | float64 | bid price                                                    |
| bidQty             | float64 | bid quantity                                                 |
| askPrice           | float64 | ask price                                                    |
| askQty             | float64 | ask quantity                                                 |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html)
