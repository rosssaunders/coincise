# BingX USDT-Futures API - Market Data

## Market Data

### USDT-M Perp Futures symbols

GET /openApi/swap/v2/quote/contracts

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                                             |
| -------------- | ------ | -------- | ------------------------------------------------------- |
| symbol         | string | no       | trading pair, for example: BTC-USDT                     |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds     |

#### Response Parameters

| Parameter Name    | Type    | Description                                                                                                                                                                            |
| ----------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| contractId        | string  | contract ID                                                                                                                                                                            |
| symbol            | string  | trading pair, for example: BTC-USDT                                                                                                                                                    |
| quantityPrecision | int     | transaction quantity precision                                                                                                                                                         |
| pricePrecision    | int     | price precision                                                                                                                                                                        |
| takerFeeRate      | float64 | take transaction fee                                                                                                                                                                   |
| makerFeeRate      | float64 | make transaction fee                                                                                                                                                                   |
| tradeMinQuantity  | float64 | The minimum trading unit(COIN)                                                                                                                                                         |
| tradeMinUSDT      | float64 | The minimum trading unit(USDT)                                                                                                                                                         |
| currency          | string  | settlement and margin currency asset                                                                                                                                                   |
| asset             | string  | contract trading asset                                                                                                                                                                 |
| status            | int     | 1 online, 25 forbidden to open positions, 5 pre-online, 0 offline                                                                                                                      |
| apiStateOpen      | string  | Whether the API can open a position                                                                                                                                                    |
| apiStateClose     | string  | Whether API can close positions                                                                                                                                                        |
| ensureTrigger     | bool    | Whether to support guaranteed stop loss.                                                                                                                                               |
| triggerFeeRate    | string  | The fee rate for guaranteed stop loss.                                                                                                                                                 |
| brokerState       | bool    | Whether to prohibit broker user transactions, true: prohibited                                                                                                                         |
| launchTime        | long    | shelf time; The status of the pair is pre-online before the listing time, and the status of the pair changes to online after the listing time                                          |
| maintainTime      | long    | The start time of the prohibition of opening a position, after the time is up, the currency pair is in a state of prohibition from opening a position, and can only close the position |
| offTime           | long    | Down line time, after the time is up, the currency pair is in the offline state and trading is prohibited                                                                              |
| displayName       | string  | The trading pair name displayed on the platform is for display purposes only. Unlike the symbol, which is primarily used for order placement.                                          |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#USDT-M Perp
> Futures
> symbols](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#USDT-M
> Perp Futures symbols)

### Order Book

GET /openApi/swap/v2/quote/depth

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                     |
| -------------- | ------ | -------- | --------------------------------------------------------------- |
| symbol         | string | yes      | Trading pair, for example: BTC-USDT, please use capital letters |
| limit          | int    | no       | Default 20, optional value:\[5, 10, 20, 50, 100, 500, 1000\]    |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds         |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds             |

#### Response Parameters

| Parameter Name | Type  | Description                                                       |
| -------------- | ----- | ----------------------------------------------------------------- |
| T              | int64 | System time, unit: millisecond                                    |
| asks           | array | depth of asks. first element price, second element quantity       |
| bids           | array | Buyer depth. first element price, second element quantity         |
| asksCoin       | array | depth of asks. first element price, second element quantity(coin) |
| bidsCoin       | array | Buyer depth. first element price, second element quantity(coin)   |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#Order
> Book](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#Order
> Book)

### Recent Trades List

GET /openApi/swap/v2/quote/trades

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| limit          | int    | no       | default: 500, maximum 1000                                           |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds              |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                  |

#### Response Parameters

| Parameter Name | Type   | Description                                                |
| -------------- | ------ | ---------------------------------------------------------- |
| time           | int64  | transaction time                                           |
| isBuyerMaker   | bool   | Whether the buyer is the maker of the order (true / false) |
| price          | string | transaction price                                          |
| qty            | string | transaction quantity                                       |
| quoteQty       | string | turnover                                                   |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#Recent Trades
> List](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#Recent
> Trades List)

### Mark Price and Funding Rate

GET /openApi/swap/v2/quote/premiumIndex

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds              |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                  |

#### Response Parameters

| Parameter Name  | Type   | Description                                                 |
| --------------- | ------ | ----------------------------------------------------------- |
| symbol          | string | trading pair, for example: BTC-USDT                         |
| lastFundingRate | string | Last updated funding rate                                   |
| markPrice       | string | current mark price                                          |
| indexPrice      | string | index price                                                 |
| nextFundingTime | int64  | The remaining time for the next settlement, in milliseconds |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#Mark Price
> and Funding
> Rate](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#Mark
> Price and Funding Rate)

### Get Funding Rate History

GET /openApi/swap/v2/quote/fundingRate

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

- The returned list is sorted by time from smallest to largest

- If the amount of data between startTime and endTime is greater than limit,
  return the data in the case of startTime + limit.

[1\. Create Account](https://bingx.com)
[2\. Pass KYC/KYB](https://bingx.com/en-us/account/api/)
[3\. Create API KEY](https://bingx.com/en-us/account/api/)
[4\. Configure API KEY permissions](https://bingx.com/en-us/account/api/)
[5\. Understanding signature authentication](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html#Signature%20Description)
_6\. Run the following example code_
[7\. Understand common error codes](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common%20Error%20Codes)
[8\. Understand rate limitations](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate%20limit)
[9\. Understanding request timestamps](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp)
[10\. Understand fee schedule](https://bingx.com/en-us/support/costs/)
[11\. Understand trading rules](https://bingx.com/en-us/tradeInfo/perpetual/trading-rules/BTC-USDT)

request parameters https://open-api.bingx.com

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| startTime      | int64  | no       | Start time, unit: millisecond                                        |
| endTime        | int64  | no       | End time, unit: millisecond                                          |
| limit          | int32  | no       | default: 100 maximum: 1000                                           |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds              |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                  |

#### Response Parameters

| Parameter Name | Type   | Description                         |
| -------------- | ------ | ----------------------------------- |
| symbol         | string | trading pair, for example: BTC-USDT |
| fundingRate    | string | funding rate                        |
| fundingTime    | int64  | Funding time: milliseconds          |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#Get Funding
> Rate
> History](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#Get
> Funding Rate History)

### Kline/Candlestick Data

GET /openApi/swap/v3/quote/klines

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

Get the latest Kline Data

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| interval       | string | yes      | time interval, refer to field description                            |
| startTime      | int64  | no       | Start time, unit: millisecond                                        |
| endTime        | int64  | no       | End time, unit: millisecond                                          |
| limit          | int64  | no       | default: 500 maximum: 1440                                           |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds              |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                  |

#### Response Parameters

| Parameter Name | Type    | Description                          |
| -------------- | ------- | ------------------------------------ |
| open           | float64 | Opening Price                        |
| close          | float64 | Closing Price                        |
| high           | float64 | High Price                           |
| low            | float64 | Low Price                            |
| volume         | float64 | transaction volume                   |
| time           | int64   | k-line time stamp, unit milliseconds |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#Kline/Candlestick
> Data](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#Kline/Candlestick
> Data)

### Open Interest Statistics

GET /openApi/swap/v2/quote/openInterest

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds              |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                  |

#### Response Parameters

| Parameter Name | Type   | Description          |
| -------------- | ------ | -------------------- |
| openInterest   | string | Position Amount      |
| symbol         | string | contract name        |
| time           | int64  | matching engine time |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#Open Interest
> Statistics](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#Open
> Interest Statistics)

### 24hr Ticker Price Change Statistics

GET /openApi/swap/v2/quote/ticker

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

[1\. Create Account](https://bingx.com)
[2\. Pass KYC/KYB](https://bingx.com/en-us/account/api/)
[3\. Create API KEY](https://bingx.com/en-us/account/api/)
[4\. Configure API KEY permissions](https://bingx.com/en-us/account/api/)
[5\. Understanding signature authentication](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html#Signature%20Description)
_6\. Run the following example code_
[7\. Understand common error codes](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common%20Error%20Codes)
[8\. Understand rate limitations](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate%20limit)
[9\. Understanding request timestamps](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp)
[10\. Understand fee schedule](https://bingx.com/en-us/support/costs/)
[11\. Understand trading rules](https://bingx.com/en-us/tradeInfo/perpetual/trading-rules/BTC-USDT)

request parameters https://open-api.bingx.com

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds              |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                  |

#### Response Parameters

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

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#24hr Ticker
> Price Change
> Statistics](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#24hr
> Ticker Price Change Statistics)

### Query historical transaction orders

GET /openApi/swap/v1/market/historicalTrades

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

Used to query historical transaction data in the market

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                              |
| -------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------- |
| fromId         | int64  | no       | From which transaction ID to start returning. By default, it returns the most recent transaction records |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT                                     |
| limit          | int    | no       | The number of returned result sets The default value is 50, the maximum value is 100                     |
| timestamp      | int64  | yes      | request timestamp, unit: millisecond                                                                     |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                      |

#### Response Parameters

| Parameter Name | Type   | Description                                                |
| -------------- | ------ | ---------------------------------------------------------- |
| time           | int64  | transaction time                                           |
| isBuyerMaker   | bool   | Whether the buyer is the maker of the order (true / false) |
| price          | string | transaction price                                          |
| qty            | string | transaction quantity                                       |
| quoteQty       | string | turnover                                                   |
| id             | string | transaction ID                                             |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#Query
> historical transaction
> orders](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#Query
> historical transaction orders)

### Symbol Order Book Ticker

GET /openApi/swap/v2/quote/bookTicker

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

Obtain the current optimal order

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds              |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                  |

#### Response Parameters

| Parameter Name | Type    | Description                                                          |
| -------------- | ------- | -------------------------------------------------------------------- |
| symbol         | string  | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| bid_price      | float64 | Optimal purchase price                                               |
| bid_qty        | float64 | Order quantity                                                       |
| ask_price      | float64 | Best selling price                                                   |
| lastUpdateId   | int64   | The ID of the latest trade                                           |
| time           | long    | The time of the trade in milliseconds                                |
| ask_qty        | float64 | Order quantity                                                       |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#Symbol Order
> Book
> Ticker](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#Symbol
> Order Book Ticker)

### Mark Price Kline/Candlestick Data

GET /openApi/swap/v1/market/markPriceKlines

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

Get the latest mark price Kline Data

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| interval       | string | yes      | time interval, refer to field description                            |
| startTime      | int64  | no       | Start time, unit: millisecond                                        |
| endTime        | int64  | no       | End time, unit: millisecond                                          |
| limit          | int64  | no       | default: 500 maximum: 1440                                           |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds              |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                  |

#### Response Parameters

| Parameter Name | Type    | Description                          |
| -------------- | ------- | ------------------------------------ |
| open           | float64 | Opening Price                        |
| close          | float64 | Closing Price                        |
| high           | float64 | High Price                           |
| low            | float64 | Low Price                            |
| volume         | float64 | transaction volume                   |
| time           | int64   | k-line time stamp, unit milliseconds |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#Mark Price
> Kline/Candlestick
> Data](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#Mark
> Price Kline/Candlestick Data)

### Symbol Price Ticker

GET /openApi/swap/v1/ticker/price

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                                        |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT,If no transaction pair parameters are sent, all transaction pair information will be returned |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds                                                                                                            |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                                                                                                                |

#### Response Parameters

| Parameter Name | Type   | Description                         |
| -------------- | ------ | ----------------------------------- |
| symbol         | string | trading pair, for example: BTC-USDT |
| price          | string | price                               |
| time           | int64  | matching engine time                |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#Symbol Price
> Ticker](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html#Symbol
> Price Ticker)

---
