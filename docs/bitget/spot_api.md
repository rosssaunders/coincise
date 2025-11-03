# Bitget Spot API Documentation

## Spot Trading API

This section introduces the API documentation for spot trading.

For more details, please refer to the menu on the left.

### Updates[​](#updates "Direct link to Updates")

Bitget will announce information about API updates and deprecations in advance.
We recommend that you follow and subscribe to our announcements to stay informed
and receive updates promptly

You can click [Latest News](javascript:;) to subscribe to announcements.

Further more, an API to get notification could be found
[here](/api-doc/common/notice/Get-All-Notices)

### Contact Us[​](#contact-us "Direct link to Contact Us")

If you have any questions or suggestions, you can contact us by the following
approaches:

- [Telegram](https://t.me/bitgetOpenapi)

> **Source:** [original URL](https://www.bitget.com/api-doc/spot/intro)

---

## Get Coin Info

Frequency limit: 3 times/1s (IP)

#### Description[​](#description "Direct link to Description")

Get spot coin information,supporting both individual and full queries.

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/public/coins

Request Example

```
curl "https://api.bitget.com/api/v2/spot/public/coins"
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description                                                                             |
| :-------- | :----- | :------- | :-------------------------------------------------------------------------------------- |
| coin      | String | No       | Coin name, If the field is left blank, all coin information will be returned by default |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695799900330,    "data": [        {            "coinId": "1",            "coin": "BTC",            "transfer": "true",            "chains": [                {                    "chain": "BTC",                    "needTag": "false",                    "withdrawable": "true",                    "rechargeable": "true",                    "withdrawFee": "0.005",                    "extraWithdrawFee": "0",                    "depositConfirm": "1",                    "withdrawConfirm": "1",                    "minDepositAmount": "0.001",                    "minWithdrawAmount": "0.001",                    "browserUrl": "https://blockchair.com/bitcoin/testnet/transaction/",                    "contractAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7",                    "withdrawStep": "0",                    "withdrawMinScale": "8",                    "congestion":"normal"                }            ]        }    ]}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter              | Type    | Description                                                                                                                                                                  |
| :--------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coinId                 | String  | Currency ID                                                                                                                                                                  |
| coin                   | String  | Token name                                                                                                                                                                   |
| transfer               | Boolean | Transferability                                                                                                                                                              |
| chains                 | Array   | Support chain list                                                                                                                                                           |
| &gt; chain             | String  | Chain name                                                                                                                                                                   |
| &gt; needTag           | Boolean | Need tag                                                                                                                                                                     |
| &gt; withdrawable      | Boolean | Withdrawal supported                                                                                                                                                         |
| &gt; rechargeable      | Boolean | Deposit supported                                                                                                                                                            |
| &gt; withdrawFee       | String  | Withdrawal transaction fee                                                                                                                                                   |
| &gt; extraWithdrawFee  | String  | Extra charge. On chain destruction: <code>0.1</code> means <code>10%</code>                                                                                                  |
| &gt; depositConfirm    | String  | Deposit confirmation blocks                                                                                                                                                  |
| &gt; withdrawConfirm   | String  | Withdrawal confirmation blocks                                                                                                                                               |
| &gt; minDepositAmount  | String  | Minimum deposit amount                                                                                                                                                       |
| &gt; minWithdrawAmount | String  | Minimum withdrawal amount                                                                                                                                                    |
| &gt; browserUrl        | String  | Blockchain explorer address                                                                                                                                                  |
| &gt; contractAddress   | String  | coin contract address                                                                                                                                                        |
| &gt; withdrawStep      | String  | withdrawal count step<br>If the value is not 0, it indicates that the withdraswl size should be multiple of the value.<br>if it's 0, that means there is no the limit above. |
| &gt; withdrawMinScale  | String  | Decimal places of withdrawal amount                                                                                                                                          |
| &gt; congestion        | String  | chain network status<br><code>normal</code>: normal<br><code>congested</code>: congestion                                                                                    |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/market/Get-Coin-List)

---

## Get Symbol Info

Frequency limit: 20 times/1s (IP)

#### Description[​](#description "Direct link to Description")

Get spot trading pair information,supporting both individual and full queries

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/public/symbols

Request Example

```
curl "https://api.bitget.com/api/v2/spot/public/symbols"
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description                                                                                                             |
| :-------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------- |
| symbol    | String | No       | trading pair name, e.g. BTCUSDT<br>If the field is left blank, all trading pair information will be returned by default |

Response Example

```
{  "code": "00000",  "msg": "success",  "requestTime": 1744276707885,  "data": [    {      "symbol": "BTCUSDT",      "baseCoin": "BTC",      "quoteCoin": "USDT",      "minTradeAmount": "0",      "maxTradeAmount": "900000000000000000000",      "takerFeeRate": "0.002",      "makerFeeRate": "0.002",      "pricePrecision": "2",      "quantityPrecision": "6",      "quotePrecision": "8",      "status": "online",      "minTradeUSDT": "1",      "buyLimitPriceRatio": "0.05",      "sellLimitPriceRatio": "0.05",      "areaSymbol": "no",      "orderQuantity": "200",      "openTime": "1532454360000",      "offTime": ""    }  ]}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter           | Type   | Description                                                                                                                                          |
| :------------------ | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol              | String | Trading pair                                                                                                                                         |
| baseCoin            | String | Base currency, e.g. "BTC" in the pair "BTCUSDT".                                                                                                     |
| quoteCoin           | String | Quoting currency, e.g. "USDT" in the trading pair "BTCUSDT".                                                                                         |
| minTradeAmount      | String | Minimum order(obsolete)<br>Please refer to <code>minTradeUSDT</code>                                                                                 |
| maxTradeAmount      | String | Maximum order(obsolete)<br>The maximum quantity is generally unlimited                                                                               |
| takerFeeRate        | String | Default taker transaction fee, can be overridden by individual transaction fee                                                                       |
| makerFeeRate        | String | Default maker transaction fee, can be overridden by individual transaction fee                                                                       |
| pricePrecision      | String | Pricing precision                                                                                                                                    |
| quantityPrecision   | String | Amount precision                                                                                                                                     |
| quotePrecision      | String | Quote coin precision                                                                                                                                 |
| minTradeUSDT        | String | Minimum trading volume (USDT)                                                                                                                        |
| status              | String | Symbol status<br><code>offline</code>: offline<br><code>gray</code>: grey scale<br><code>online</code>: normal<br><code>halt</code>: suspend trading |
| buyLimitPriceRatio  | String | Percentage spread between bid and ask, in decimal form<br>E.g. 0.05 means 5%                                                                         |
| sellLimitPriceRatio | String | Percentage spread between sell and current price, in decimal form<br>E.g. 0.05 means 5%                                                              |
| orderQuantity       | String | The maximum number of orders allowed for the current symbol                                                                                          |
| areaSymbol          | String | Area symbol<br><code>yes</code>, <code>no</code>                                                                                                     |
| offTime             | String | Symbol off time, e.g: 1744797600000                                                                                                                  |
| openTime            | String | This field has been deprecated                                                                                                                       |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/market/Get-Symbols)

---

## Get VIP Fee Rate

Frequency limit: 10 times/1s (IP)

#### Description[​](#description "Direct link to Description")

Get VIP Fee Rate

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/market/vip-fee-rate

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/vip-fee-rate"
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

N/A

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1675759699382,    "data": [        {            "level": 1,            "dealAmount": "1000000",            "assetAmount": "50000",            "takerFeeRate": "0",            "makerFeeRate": "0",            "btcWithdrawAmount": "300",            "usdtWithdrawAmount": "5000000"        }    ]}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter          | Type   | Description                                                                      |
| :----------------- | :----- | :------------------------------------------------------------------------------- |
| level              | String | VIP level                                                                        |
| dealAmount         | String | Total trading volume in last 30 days, USDT                                       |
| assetAmount        | String | Total assets in USDT                                                             |
| takerFeeRate       | String | Taker fee. Refer to the official announcement for the real rate when 0 is shown. |
| makerFeeRate       | String | Maker fee. Refer to the official announcement for the real rate when 0 is shown. |
| btcWithdrawAmount  | String | 24-hour withdrawal limit in BTC                                                  |
| usdtWithdrawAmount | String | 24-hour withdrawal limit in USDT                                                 |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/market/Get-VIP-Fee-Rate)

---

## Get Ticker Information

Frequency limit: 20 times/1s (IP)

#### Description[​](#description "Direct link to Description")

Get Ticker Information,Supports both single and batch queries

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/market/tickers

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/tickers?symbol=BTCUSDT"
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description                                                                                                             |
| :-------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------- |
| symbol    | String | No       | trading pair name, e.g. BTCUSDT<br>If the field is left blank, all trading pair information will be returned by default |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": [        {            "symbol": "BTCUSDT",            "high24h": "37775.65",            "open": "35134.2",            "low24h": "34413.1",            "lastPr": "34413.1",            "quoteVolume": "0",            "baseVolume": "0",            "usdtVolume": "0",            "bidPr": "0",            "askPr": "0",            "bidSz": "0.0663",            "askSz": "0.0119",            "openUtc": "23856.72",            "ts": "1625125755277",            "changeUtc24h": "0.00301",            "change24h": "0.00069"        }    ]}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter    | Type   | Description                                                 |
| :----------- | :----- | :---------------------------------------------------------- |
| symbol       | String | Trading pair                                                |
| high24h      | String | 24h highest price                                           |
| open         | String | 24h open price                                              |
| lastPr       | String | Latest price                                                |
| low24h       | String | 24h lowest price                                            |
| quoteVolume  | String | Trading volume in quote currency                            |
| baseVolume   | String | Trading volume in base currency                             |
| usdtVolume   | String | Trading volume in USDT                                      |
| bidPr        | String | Bid 1 price                                                 |
| askPr        | String | Ask 1 price                                                 |
| bidSz        | String | Buying 1 amount                                             |
| askSz        | String | selling 1 amount                                            |
| openUtc      | String | UTC±00:00 Entry price                                       |
| ts           | String | Current time Unix millisecond timestamp, e.g. 1690196141868 |
| changeUtc24h | String | Change at UTC+0, 0.01 means 1%.                             |
| change24h    | String | 24-hour change, 0.01 means 1%.                              |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/market/Get-Tickers)

---

## Get Merge Depth

Frequency limit: 20 times/1s (IP)

#### Description[​](#description "Direct link to Description")

Get Merge Depth

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/market/merge-depth

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/merge-depth?symbol=BTCUSDT&precision=scale0&limit=100"
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :-------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol    | String | Yes      | Trading pair                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| precision | String | No       | Price precision, return the cumulative depth according to the selected precision as the step size, enumeration value:<br>scale0/scale1/scale2/scale3,<br>scale0 does not merge, the default value, generally speaking,<br>scale1 is the merged depth of the trading pair quotation accuracy <em>10, generally Under normal circumstances,<br>scale2 is the quotation accuracy </em>100. Under normal circumstances,<br>scale3 is the quotation accuracy \* 1000.<br>Under normal circumstances, the accuracy corresponding to 0/1/2/3 is based on the actual return parameter "scale". Each trading pair The quotation accuracy is different. Some currency pairs do not have scale 2. Requests for scales that do not exist for the currency pair will be processed according to the maximum scale. Example: A certain trading pair only has scale 0/1, and when scale2 is requested, it is automatically reduced to scale1. |
| limit     | String | No       | Fixed gear enumeration value：1/5/15/50/max，default:100，When the actual depth does not meet the limit, return according to the actual gear, and pass in max to return the maximum gear of the trading pair.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": {        "asks": [            [                "38084.5",                "0.0039"            ],            [                "38085.7",                "0.0018"            ],            [                "38086.7",                "0.0310"            ],            [                "38088.2",                "0.5303"            ]        ],        "bids": [            [                "38073.7",                "0.4993000000000000"            ],            [                "38073.4",                "0.4500"            ],            [                "38073.3",                "0.1179"            ],            [                "38071.5",                "0.2162"            ]        ],        "ts": "1622102974025",        "scale":"0.1",        "precision":"scale0",        "isMaxPrecision":"YES"    }}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter      | Type   | Description                                                                         |
| :------------- | :----- | :---------------------------------------------------------------------------------- |
| asks           | Array  | Ask depth<br>e.g. ["38084.5","0.5"] ，"38084.5" is price，"0.5" is base coin volume |
| bids           | Array  | Bid depth                                                                           |
| precision      | String | Current gear, e.g. "scale1"                                                         |
| scale          | String | Actual precision value, e.g. "0.1"                                                  |
| isMaxPrecision | String | Is max precision<br>YES:yes<br>NO:no                                                |
| ts             | String | Matching engine timestamp(ms), e.g. 1597026383085                                   |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/market/Merge-Orderbook)

---

## Get OrderBook Depth

Frequency limit: 20 times/1s (IP)

#### Description[​](#description "Direct link to Description")

Get OrderBook Depth

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/market/orderbook

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/orderbook?symbol=BTCUSDT&type=step0&limit=100"
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description                                                                |
| :-------- | :----- | :------- | :------------------------------------------------------------------------- |
| symbol    | String | Yes      | Trading pair                                                               |
| type      | String | No       | Default：step0： The value enums：step0，step1，step2，step3，step4，step5 |
| limit     | String | No       | Number of queries: Default: 150, maximum: 150                              |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1698303884579,    "data": {        "asks": [            [                "34567.15",                "0.0131"            ],            [                "34567.25",                "0.0144"            ]        ],        "bids": [            [                "34567",                "0.2917"            ],            [                "34566.85",                "0.0145"            ]        ],        "ts": "1698303884584"    }}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description                                                                         |
| :-------- | :----- | :---------------------------------------------------------------------------------- |
| asks      | Array  | Ask depth<br>e.g. ["38084.5","0.5"] ，"38084.5" is price，"0.5" is base coin volume |
| bids      | Array  | Bid depth                                                                           |
| ts        | String | Matching engine timestamp(ms), e.g. 1597026383085                                   |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/market/Get-Orderbook)

---

## Get Candlestick Data

Frequency limit: 20 times/1s (IP)

#### Description[​](#description "Direct link to Description")

Get Candlestick Data

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/market/candles

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/candles?symbol=BTCUSDT&granularity=1min&startTime=1659076670000&endTime=1659080270000&limit=100"
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter   | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :---------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol      | String | Yes      | Trading pair e.g.BTCUSDT                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| granularity | String | Yes      | Time interval of charts<br>For the corresponding relationship between granularity and value, refer to the list below.<br>minute: 1min,3min,5min,15min,30min<br>hour: 1h,4h,6h,12h<br>day: 1day,3day<br>week: 1week<br>month: 1M<br>hour in UTC:6Hutc,12Hutc<br>day in UTC:1Dutc,3Dutc<br>week in UTC:1Wutc<br>month in UTC: 1Mutc<br>1m, 3m, 5m can query for one month,15m can query for 52 days,30m can query for 62 days,1H can query for 83 days,2H can query for 120 days,4H can query for 240 days,6H can query for 360 days. |
| startTime   | String | No       | The time start point of the chart data, i.e., to get the chart data after this time stamp<br>Unix millisecond timestamp, e.g. 1690196141868                                                                                                                                                                                                                                                                                                                                                                                         |
| endTime     | String | No       | The time end point of the chart data, i.e., get the chart data before this time stamp<br>Unix millisecond timestamp, e.g. 1690196141868                                                                                                                                                                                                                                                                                                                                                                                             |
| limit       | String | No       | Number of queries: Default: 100, maximum: 1000.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695800278693,    "data": [        [            "1656604800000",            "37834.5",            "37849.5",            "37773.5",            "37773.5",            "428.3462",            "16198849.1079",            "16198849.1079"        ],        [            "1656604800000",            "37834.5",            "37849.5",            "37773.5",            "37773.5",            "428.3462",            "16198849.1079",            "16198849.1079"        ]    ]}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description                                                          |
| :-------- | :----- | :------------------------------------------------------------------- |
| index[0]  | String | System timestamp, Unix millisecond timestamp, e.g. 1690196141868     |
| index[1]  | String | Opening price                                                        |
| index[2]  | String | Highest price                                                        |
| index[3]  | String | Lowest price                                                         |
| index[4]  | String | Closing price                                                        |
| index[5]  | String | Trading volume in base currency, e.g. "BTC" in the "BTCUSDT" pair.   |
| index[6]  | String | Trading volume in USDT                                               |
| index[7]  | String | Trading volume in quote currency, e.g. "USDT" in the "BTCUSDT" pair. |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/market/Get-Candle-Data)

---

## Get History Candlestick Data

Frequency limit: 20 times/1s (IP)

#### Description[​](#description "Direct link to Description")

Get History Candlestick Data

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/market/history-candles

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/history-candles?symbol=BTCUSDT&granularity=1min&endTime=1659080270000&limit=100"
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter   | Type   | Required | Description                                                                                                                                                                                                                                                                                                                           |
| :---------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| symbol      | String | Yes      | Trading pair                                                                                                                                                                                                                                                                                                                          |
| granularity | String | Yes      | Time interval of charts<br>For the corresponding relationship between granularity and value, refer to the list below.<br>minute: 1min,3min,5min,15min,30min<br>hour: 1h,4h,6h,12h<br>day: 1day,3day<br>week: 1week<br>month: 1M<br>hour in UTC:6Hutc,12Hutc<br>day in UTC:1Dutc,3Dutc<br>week in UTC:1Wutc<br>month in UTC: 1Mutc<br> |
| endTime     | String | Yes      | The time end point of the chart data, i.e., get the chart data before this time stamp<br>Unix millisecond timestamp, e.g. 1690196141868                                                                                                                                                                                               |
| limit       | String | No       | Number of queries: Default: 100, maximum: 200.                                                                                                                                                                                                                                                                                        |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695799900330,    "data": [        [            "1646064000000",            "43500.8",            "48207.2",            "38516",            "46451.9",            "2581.4668",            "118062073.82644",            "118062073.82644"        ],        [            "1648742400000",            "46451.9",            "55199.6",            "15522.1",            "38892.5",            "42331329.5473",            "1726993402150.991724",            "1726993402150.991724"        ],        [            "1654012800000",            "38892.5",            "38892.5",            "38892.5",            "38892.5",            "0",            "0",            "0"        ],        [            "1654012800000",            "39270.4",            "39270.4",            "37834.5",            "37834.5",            "42.444",            "1619934.779",            "1619934.779"        ],        [            "1656604800000",            "37834.5",            "37849.5",            "37773.5",            "37773.5",            "428.3462",            "16198849.1079",            "16198849.1079"        ]    ]}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description                                                          |
| :-------- | :----- | :------------------------------------------------------------------- |
| index[0]  | String | System timestamp, Unix millisecond timestamp, e.g. 1690196141868     |
| index[1]  | String | Opening price                                                        |
| index[2]  | String | Highest price                                                        |
| index[3]  | String | Lowest price                                                         |
| index[4]  | String | Closing price                                                        |
| index[5]  | String | Trading volume in base currency, e.g. "BTC" in the "BTCUSDT" pair.   |
| index[6]  | String | Trading volume in USDT                                               |
| index[7]  | String | Trading volume in quote currency, e.g. "USDT" in the "BTCUSDT" pair. |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/market/Get-History-Candle-Data)

---

## Get Recent Trades

Frequency limit: 10 times/1s (IP)

#### Description[​](#description "Direct link to Description")

Get Recent Trades

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/market/fills

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/fills?symbol=BTCUSDT&limit=100"
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description                     |
| :-------- | :----- | :------- | :------------------------------ |
| symbol    | String | Yes      | Trading pair name, e.g. BTCUSDT |
| limit     | String | No       | Default: 100, maximum: 500      |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": [        {            "symbol": "BFTUSDT",            "tradeId": "1",            "side": "buy",            "price": "2.38735",            "size": "2470.6224",            "ts": "1622097282536"        },        {            "symbol": "BFTUSDT",            "tradeId": "2",            "side": "sell",            "price": "2.38649",            "size": "3239.7976",            "ts": "1622097280642"        }    ]}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description                                                      |
| :-------- | :----- | :--------------------------------------------------------------- |
| symbol    | String | Trading pair                                                     |
| tradeId   | String | Order ID<br>Descending                                           |
| side      | String | Direction<br>Buy<br>Sell                                         |
| price     | String | Order price                                                      |
| size      | String | Filled quantity                                                  |
| ts        | String | Transaction time, Unix millisecond timestamp, e.g. 1690196141868 |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/market/Get-Recent-Trades)

---

## Get Market Trades

Rate limit: 10 req/sec/IP

#### Description[​](#description "Direct link to Description")

Get Market Trades

- The time interval between startTime and endTime should not exceed 7 days.
- It supports to get the data within 90days. You can download the older data on
  our [web](https://www.bitget.com/data-download)

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/market/fills-history

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/fills-history?symbol=BTCUSDT&limit=20&startTime=1678965010861&endTime=1678965910861"
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter  | Type   | Required | Description                                                                                               |
| :--------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------- |
| symbol     | String | Yes      | Trading pair name, e.g. BTCUSDT                                                                           |
| limit      | String | No       | number of data returned. Default: 500, maximum: 1000                                                      |
| idLessThan | String | No       | Order ID, returns records less than the specified 'tradeId'.                                              |
| startTime  | String | No       | startTime, Unix millisecond timestamp e.g. 1690196141868<br>startTime and endTime should be within 7days. |
| endTime    | String | No       | endTime, Unix millisecond timestamp e.g. 1690196141868<br>startTime and endTime should be within 7days.   |

Response Example

```
{  "code": "00000",  "msg": "success",  "requestTime": 1744275754521,  "data": [    {      "symbol": "ETHUSDT",      "tradeId": "1294151170843025500",      "side": "Buy",      "price": "1592.58",      "size": "2.1982",      "ts": "1744275603000"    },    {      "symbol": "ETHUSDT",      "tradeId": "1294151170834636801",      "side": "Sell",      "price": "1592.57",      "size": "0.0045",      "ts": "1744275603000"    }  ]}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description                                                                      |
| :-------- | :----- | :------------------------------------------------------------------------------- |
| symbol    | String | Trading pair                                                                     |
| tradeId   | String | Order ID<br>Descending                                                           |
| side      | String | Direction<br><code>Buy</code><br><code>Sell</code>                               |
| price     | String | Order price                                                                      |
| size      | String | Filled quantity                                                                  |
| ts        | String | Transaction time(second level)<br>Unix millisecond timestamp, e.g. 1744275603000 |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/market/Get-Market-Trades)

---

## Place Order

Rate limit: 10 requests/second/UID  
Rate limit: 1 request/second/UID for **copy trading traders**

#### Description[​](#description "Direct link to Description")

- For elite traders, please strictly adhere to the list of trading pairs
  specified in the
  [Available trading pairs and parameters for elite traders](https://www.bitget.com/zh-CN/support/articles/12560603808895)
  when placing orders using the Copy Trading API Key. Trading pairs outside the
  announced list are not available for copy trading.

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/place-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/place-order" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*******" \  -H "ACCESS-PASSPHRASE:*****" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json" \    -d '{"symbol": "BTCUSDT","side": "buy","orderType": "limit","force":"gtc","price":"23222.5","size":"1","clientOid":"121211212122"}'
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter              | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                           |
| :--------------------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol                 | String | Yes      | Trading pair name, e.g. BTCUSDT<br>All symbols can be returned by <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                                                                                                                            |
| side                   | String | Yes      | Order Direction<br><code>buy</code>: Buy<br><code>sell</code>: Sell                                                                                                                                                                                                                                                                                                                                                   |
| orderType              | String | Yes      | Order type<br><code>limit</code>: Limit order<br><code>market</code>: Market order                                                                                                                                                                                                                                                                                                                                    |
| force                  | String | Yes      | Execution strategy(It is invalid when <code>orderType</code> is <code>market</code>)<br><code>gtc</code>: Normal limit order, good till cancelled<br><code>post_only</code>: Post only<br><code>fok</code>: Fill or kill<br><code>ioc</code>: Immediate or cancel                                                                                                                                                     |
| price                  | String | No       | Limit price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                                                                                                         |
| size                   | String | Yes      | Amount<br>For <strong>Limit and Market-Sell</strong> orders, it represents the number of <strong>base coins</strong>.<br>For <strong>Market-Buy</strong> orders, it represents the number of <strong>quote coins</strong>.<br>The decimal places of amount can be got trough <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface |
| clientOid              | String | No       | Customed order ID<br>It's invalid when <code>tpslType</code> is <code>tpsl</code>                                                                                                                                                                                                                                                                                                                                     |
| triggerPrice           | String | No       | SPOT TP/SL trigger price, only requried in SPOT TP/SL order                                                                                                                                                                                                                                                                                                                                                           |
| tpslType               | String | No       | Order type<br><code>normal</code>:SPOT order(default)<br><code>tpsl</code>:SPOT TP/SL order                                                                                                                                                                                                                                                                                                                           |
| requestTime            | String | No       | Request Time, Unix millisecond timestamp                                                                                                                                                                                                                                                                                                                                                                              |
| receiveWindow          | String | No       | Valid time window, Unix millisecond timestamp<br>If it's set, the request is valid only when the time range between the timestamp in the request and the time that server received the request is within <code>receiveWindow</code>                                                                                                                                                                                   |
| stpMode                | String | No       | STP Mode(Self Trade Prevention)<br><code>none</code>: not setting STP(default)<br><code>cancel_taker</code>: cancel taker order<br><code>cancel_maker</code>: cancel maker order<br><code>cancel_both</code>: cancel both of taker and maker orders                                                                                                                                                                   |
| presetTakeProfitPrice  | String | No       | Take profit price<br>It's invalid when <code>tpslType</code> is <code>tpsl</code><br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                                   |
| executeTakeProfitPrice | String | No       | Take profit execute price<br>It's invalid when <code>tpslType</code> is <code>tpsl</code><br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                           |
| presetStopLossPrice    | String | No       | Stop loss price<br>It's invalid when <code>tpslType</code> is <code>tpsl</code><br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                                     |
| executeStopLossPrice   | String | No       | Stop loss execute price<br>It's invalid when <code>tpslType</code> is <code>tpsl</code><br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                             |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": {        "orderId": "1001",        "clientOid": "121211212122"    }}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description     |
| :-------- | :----- | :-------------- |
| orderId   | String | Order ID        |
| clientOid | String | Custom order ID |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/trade/Place-Order)

---

## Cancel an Existing Order and Send a New Order

Rate limit: 5 requests/second/UID

#### Description[​](#description "Direct link to Description")

Cancel an Existing Order and Send a New Order

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/cancel-replace-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/cancel-replace-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{    "orderId":"xxxxxxxxxxxxxxx",    "clientOid":"",    "symbol": "BTCUSDT",    "price":"3.24",    "size":"4"}'
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter              | Type   | Required | Description                                                                                                                                                                                                                                 |
| :--------------------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| symbol                 | String | Yes      | Trading pair name, e.g. BTCUSDT<br>All symbols can be returned by <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                  |
| price                  | String | Yes      | Limit price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface               |
| size                   | String | Yes      | Amount，it represents the number of <strong>base coins</strong>.                                                                                                                                                                            |
| clientOid              | String | No       | Client Order ID<br>Either orderId or clientOid is required                                                                                                                                                                                  |
| orderId                | String | No       | Order ID<br>Either orderId or clientOid is required                                                                                                                                                                                         |
| newClientOid           | String | No       | New customed order ID.<br>If newClientOid results in idempotency duplication, it may cause the old order to be successfully canceled but the new order placement to fail.                                                                   |
| presetTakeProfitPrice  | String | No       | Take profit price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface         |
| executeTakeProfitPrice | String | No       | Take profit execute price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface |
| presetStopLossPrice    | String | No       | Stop loss price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface           |
| executeStopLossPrice   | String | No       | Stop loss execute price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface   |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1725345009763,    "data": {        "orderId": "xxxxxxxxxxxxxxx",        "clientOid": null,        "success": "success",        "msg": null    }}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description                                                                       |
| :-------- | :----- | :-------------------------------------------------------------------------------- |
| orderId   | String | Order ID                                                                          |
| clientOid | String | CLient Order ID                                                                   |
| success   | String | operate success<br><code>success</code>: success<br><code>failure</code>: failure |
| msg       | String | Failure reason                                                                    |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/trade/Cancel-Replace-Order)

---

## Batch Cancel Existing Order and Send New Orders

Rate limit: 5 requests/second/UID

#### Description[​](#description "Direct link to Description")

Cancel an Existing Order and Send a New Order

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/batch-cancel-replace-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/batch-cancel-replace-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{    "orderList": [        {            "orderId":"xxxxxxxxxxxxxxxxx",            "clientOid":"",            "symbol": "BTCUSDT",            "price":"3.17",            "size":"5"        }    ]}'
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter                   | Type   | Required | Description                                                                                                                                                                                                                                 |
| :-------------------------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| orderList                   | Array  | Yes      | Collection of placing orders，maximum length: 50                                                                                                                                                                                            |
| &gt; symbol                 | String | Yes      | Trading pair name, e.g. BTCUSDT<br>All symbols can be returned by <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                  |
| &gt; price                  | String | Yes      | Limit price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface               |
| &gt; size                   | String | Yes      | Amount，it represents the number of <strong>base coins</strong>.                                                                                                                                                                            |
| &gt; clientOid              | String | No       | Client Order ID<br>Either orderId or clientOid is required                                                                                                                                                                                  |
| &gt; orderId                | String | No       | Order ID<br>Either orderId or clientOid is required                                                                                                                                                                                         |
| &gt; newClientOid           | String | No       | New customed order ID.<br>If newClientOid results in idempotency duplication, it may cause the old order to be successfully canceled but the new order placement to fail.                                                                   |
| &gt; presetTakeProfitPrice  | String | No       | Take profit price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface         |
| &gt; executeTakeProfitPrice | String | No       | Take profit execute price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface |
| &gt; presetStopLossPrice    | String | No       | Stop loss price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface           |
| &gt; executeStopLossPrice   | String | No       | Stop loss execute price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface   |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1725341809524,    "data": [        {            "orderId": "xxxxxxxxxxxxxxxxxxxxxx",            "clientOid": null,            "success": "failure",            "msg": "xxxxxx"        }    ]}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description                                                                       |
| :-------- | :----- | :-------------------------------------------------------------------------------- |
| orderId   | String | Order ID                                                                          |
| clientOid | String | CLient Order ID                                                                   |
| success   | String | operate success<br><code>success</code>: success<br><code>failure</code>: failure |
| msg       | String | Failure reason                                                                    |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/trade/Batch-Cancel-Replace-Order)

---

## Cancel Order

Frequency limit:10 times/1s (UID)

#### Description[​](#description "Direct link to Description")

Cancel Order

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/cancel-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/cancel-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{"symbol": "BTCUSDT","orderId": "121211212122"}'
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type   | Required | Description                                                                                                    |
| :-------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------- |
| symbol    | String | Yes      | Trading pair name, e.g. BTCUSDT<br>it is not required when tpslType is <code>tpsl</code>                       |
| tpslType  | String | No       | order type, deafult:<code>normal</code><br><code>normal</code> spot order<br><code>tpsl</code> spot tpsl order |
| orderId   | String | No       | Order ID<br>Either orderId or clientOid is required<br>it's required when tpslType is <code>tpsl</code>        |
| clientOid | String | No       | Client Order ID<br>Either orderId or clientOid is required                                                     |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1234567891234,    "data": {        "orderId": "121211212122",        "clientOid": "xx001"    }}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description     |
| :-------- | :----- | :-------------- |
| orderId   | String | Order ID        |
| clientOid | String | Client Order ID |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/trade/Cancel-Order)

---

## Batch Place Orders

Frequency limit: 5 times/1s (UID)Trader frequency limit: 1 times/1s (UID)

#### Description[​](#description "Direct link to Description")

Place Orders in Batch

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/batch-orders

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/batch-orders" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{"symbol":"BTCUSDT","orderList":[{"side":"buy","orderType":"limit","force":"gtc","price":"23222.5","size":"1","clientOid":"121211212122"}] }'
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter                  | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                           |
| :------------------------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol                     | String | No       | Trading pair name, e.g. BTCUSDT                                                                                                                                                                                                                                                                                                                                                                                       |
| batchMode                  | String | No       | Batch order mode<br><code>single</code> single currency mode, default single currency mode<br><code>multiple</code> cross-currency mode.<br>If single mode , the symbol in orderlist will be ingor<br>If multiple mode , the symbol in orderlist is not allow be null, and the symbol in orderlist is required. symbol outside orderlist will be ingor                                                                |
| orderList                  | Array  | Yes      | Collection of placing orders，maximum length: 50                                                                                                                                                                                                                                                                                                                                                                      |
| symbol                     | String | No       | Trading pair name, e.g. BTCUSDT                                                                                                                                                                                                                                                                                                                                                                                       |
| &gt; side                  | String | Yes      | Order Direction<br><code>buy</code>: Buy<br><code>sell</code>: Sell                                                                                                                                                                                                                                                                                                                                                   |
| &gt; orderType             | String | Yes      | Order type<br><code>limit</code>: Limit order<br><code>market</code>: Market order                                                                                                                                                                                                                                                                                                                                    |
| &gt; force                 | String | Yes      | Execution strategy(It will be invalid when <code>orderType</code> is <code>market</code>)<br><code>gtc</code>: Normal limit order, good till cancelled<br><code>post_only</code>: Post only<br><code>fok</code>: Fill or kill<br><code>ioc</code>: Immediate or cancel                                                                                                                                                |
| &gt; price                 | String | No       | Limit price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                                                                                                         |
| &gt; size                  | String | Yes      | Amount<br>For <strong>Limit and Market-Sell</strong> orders, it represents the number of <strong>base coins</strong>.<br>For <strong>Market-Buy</strong> orders, it represents the number of <strong>quote coins</strong>.<br>The decimal places of amount can be got trough <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface |
| &gt; clientOid             | String | No       | Customed order ID                                                                                                                                                                                                                                                                                                                                                                                                     |
| &gt; stpMode               | String | No       | STP Mode, default <code>none</code><br><code>none</code> not setting STP<br><code>cancel_taker</code> cancel taker order<br><code>cancel_maker</code> cancel maker order<br><code>cancel_both</code> cancel both of taker and maker orders                                                                                                                                                                            |
| &gt;presetTakeProfitPrice  | String | No       | Take profit price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                                                                                                   |
| &gt;executeTakeProfitPrice | String | No       | Take profit execute price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                                                                                           |
| &gt;presetStopLossPrice    | String | No       | Stop loss price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                                                                                                     |
| &gt;executeStopLossPrice   | String | No       | Stop loss execute price<br>The decimal places of price and the price step can be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Symbols" target="_blank" rel="noopener noreferrer">Get Symbol Info</a> interface                                                                                                                                                                             |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1666336231317,    "data": {        "successList": [            {                "orderId": "121211212122",                "clientOid": "1"            }        ],        "failureList": [            {                "orderId": "121211212122",                "clientOid": "1",                "errorMsg": "clientOrderId duplicate"            }        ]    }}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter     | Type   | Description             |
| :------------ | :----- | :---------------------- |
| successList   | Array  | Successful order number |
| &gt;orderId   | String | Order ID                |
| &gt;clientOid | String | Client Order ID         |
| failureList   | Array  | Failed order number     |
| &gt;orderId   | String | Order ID                |
| &gt;clientOid | String | Client Order ID         |
| &gt;errorMsg  | String | Error information       |
| &gt;errorCode | String | Error code              |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/trade/Batch-Place-Orders)

---

## Batch Cancel Orders

Frequency limit:10 times/1s (UID)

#### Description[​](#description "Direct link to Description")

Cancel Orders in Batch

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/batch-cancel-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/batch-cancel-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{    "symbol": "",    "batchMode"："multiple",    "orderList": [        {            "orderId":"121211212122",            "symbol":"BTCUSDT",            "clientOid":"121211212122"        }    ]}'
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter      | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                            |
| :------------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | String | No       | Trading pair name, e.g. BTCUSDT                                                                                                                                                                                                                                                                                                                        |
| batchMode      | String | No       | Batch order mode<br><code>single</code> single currency mode, default single currency mode<br><code>multiple</code> cross-currency mode.<br>If single mode , the symbol in orderlist will be ingor<br>If multiple mode , the symbol in orderlist is not allow be null, and the symbol in orderlist is required. symbol outside orderlist will be ingor |
| orderList      | Array  | Yes      | Order ID List ，maximum length: 50                                                                                                                                                                                                                                                                                                                     |
| &gt;symbol     | String | No       | Trading pair name, e.g. BTCUSDT                                                                                                                                                                                                                                                                                                                        |
| &gt; orderId   | String | No       | Order ID. Either orderId or clientOid is required.                                                                                                                                                                                                                                                                                                     |
| &gt; clientOid | String | No       | Client Order ID.Either clientOid or orderId is required.                                                                                                                                                                                                                                                                                               |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": {        "successList": [            {                "orderId": "121211212122",                "clientOid": "121211212122"            }        ],        "failureList": [            {                "orderId": "121211212122",                "clientOid": "xxx001",                "errorMsg": "duplicate clientOrderId"            }        ]    }}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter     | Type   | Description             |
| :------------ | :----- | :---------------------- |
| successList   | Array  | Successful order number |
| &gt;orderId   | String | Order ID                |
| &gt;clientOid | String | Client Order ID         |
| failureList   | Array  | Failed order number     |
| &gt;orderId   | String | Order ID                |
| &gt;clientOid | String | Client Order ID         |
| &gt;errorMsg  | String | Error information       |
| &gt;errorCode | String | Error code              |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/trade/Batch-Cancel-Orders)

---

## Cancel Order by Symbol

Frequency limit: 5 times/1s (UID)

#### Description[​](#description "Direct link to Description")

Cancel order by symbol

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/cancel-symbol-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/cancel-symbol-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{"symbol": "BTCUSDT"}'
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type   | Required | Description                     |
| :-------- | :----- | :------- | :------------------------------ |
| symbol    | String | Yes      | Trading pair name, e.g. BTCUSDT |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1698313139948,    "data": {        "symbol": "BGBUSDT"    }}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description                                                                                                                               |
| :-------- | :----- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| symbol    | String | Cancelled symbol (This request is executed asynchronously. If you need to know the result, please query the Get History Orders endpoint.) |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/trade/Cancel-Symbol-Orders)

---

## Get Order Info

Frequency limit: 20 times/1s (UID)

#### Description[​](#description "Direct link to Description")

Get Order Info

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/trade/orderInfo

Request Example

```
curl "https://api.bitget.com/api/v2/spot/trade/orderInfo?orderId=1234567890" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter     | Type   | Required | Description                                                               |
| :------------ | :----- | :------- | :------------------------------------------------------------------------ |
| orderId       | String | No       | Either Order ID or clientOids is required.                                |
| clientOid     | String | No       | Either Client customized ID or orderId is required.                       |
| requestTime   | String | No       | request Time Unix millisecond timestamp                                   |
| receiveWindow | String | No       | valid window period Unix millisecond timestamp Unix millisecond timestamp |

Response Example

```
{  "code": "00000",  "msg": "success",  "requestTime": 1695865476577,  "data": [    {      "userId": "**********",      "symbol": "BTCUSDT",      "orderId": "121211212122",      "clientOid": "121211212122",      "price": "0",      "size": "10.0000000000000000",      "orderType": "market",      "side": "buy",      "status": "filled",      "priceAvg": "13000.0000000000000000",      "baseVolume": "0.0007000000000000",      "quoteVolume": "9.1000000000000000",      "enterPointSource": "API",      "feeDetail": "{\"BGB\":{\"deduction\":true,\"feeCoinCode\":\"BGB\",\"totalDeductionFee\":-0.0041,\"totalFee\":-0.0041},\"newFees\":{\"c\":0,\"d\":0,\"deduction\":false,\"r\":-0.112079256,\"t\":-0.112079256,\"totalDeductionFee\":0}}",      "orderSource": "market",      "cancelReason": "",      "cTime": "1695865232127",      "uTime": "1695865233051"    }  ]}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter                  | Type   | Description                                                                                                                                                                                                                                                                                |
| :------------------------- | :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId                     | String | Account id                                                                                                                                                                                                                                                                                 |
| symbol                     | String | Trading pair name                                                                                                                                                                                                                                                                          |
| orderId                    | String | Order ID                                                                                                                                                                                                                                                                                   |
| clientOid                  | String | Customized ID                                                                                                                                                                                                                                                                              |
| price                      | String | Order price                                                                                                                                                                                                                                                                                |
| size                       | String | Amount<br>Limit represents the number of base coins.<br>market-buy represents the number of quote coins.<br>market-sell represents the number of base coins.                                                                                                                               |
| orderType                  | String | Order type<br>limit Limit price<br>market Market price                                                                                                                                                                                                                                     |
| side                       | String | Direction                                                                                                                                                                                                                                                                                  |
| status                     | String | Order status<br><code>live</code>: pending match<br><code>partially_filled</code>: Partially filled<br><code>filled</code>: All filled<br><code>cancelled</code>: The order is cancelled                                                                                                   |
| priceAvg                   | String | Filled price                                                                                                                                                                                                                                                                               |
| baseVolume                 | String | Filled quantity (base coin)                                                                                                                                                                                                                                                                |
| quoteVolume                | String | Total trading amount (quote coin)                                                                                                                                                                                                                                                          |
| enterPointSource           | String | Client<br>WEB WEB Client<br>APP APP Client<br>API API Client<br>SYS SYS Client<br>ANDROID ANDROID Client<br>IOS IOS Client                                                                                                                                                                 |
| cTime                      | String | Creation time, Unix millisecond timestamp, e.g. 1690196141868                                                                                                                                                                                                                              |
| uTime                      | String | Update time, Unix millisecond timestamp, e.g. 1690196141868                                                                                                                                                                                                                                |
| orderSource                | String | Order source<br>normal Normal order<br>market Market order<br>spot_trader_buy Elite spot trade to buy (elite traders)<br>spot_follower_buy Copy trade to buy (followers)<br>spot_trader_sell Elite spot trade to sell (elite traders)<br>spot_follower_sell Copy trade to sell (followers) |
| feeDetail                  | String | Transaction fee breakdown                                                                                                                                                                                                                                                                  |
| &gt; newFees               | String | Fee details for "newFees".                                                                                                                                                                                                                                                                 |
| &gt;&gt; c                 | String | Amount deducted by coupons, unit：currency obtained from the transaction.                                                                                                                                                                                                                  |
| &gt;&gt; d                 | String | Amount deducted in BGB (Bitget Coin), unit：BGB                                                                                                                                                                                                                                            |
| &gt;&gt; r                 | String | If the BGB balance is insufficient to cover the fees, the remaining amount is deducted from the currency obtained from the transaction.                                                                                                                                                    |
| &gt;&gt; t                 | String | The total fee amount to be paid, unit ：currency obtained from the transaction.                                                                                                                                                                                                            |
| &gt;&gt; deduction         | String | Ignore.                                                                                                                                                                                                                                                                                    |
| &gt;&gt; totalDeductionFee | String | Ignore.                                                                                                                                                                                                                                                                                    |
| &gt; BGB                   | String | If there is no "newFees" field, this data represents earlier historical data. This key represents the currency used for fee deduction (it is not fixed; if BGB deduction is enabled, it's BGB, otherwise, it's the currency obtained from the transaction).                                |
| &gt;&gt; deduction         | String | Whether there is a fee deduction.                                                                                                                                                                                                                                                          |
| &gt;&gt; feeCoinCode       | String | Transaction fee coin code                                                                                                                                                                                                                                                                  |
| &gt;&gt; totalDeductionFee | String | Deduction amount unit： BGB                                                                                                                                                                                                                                                                |
| &gt;&gt; totalFee          | String | The total fee amount to be paid, unit：currency obtained from the transaction.                                                                                                                                                                                                             |
| cancelReason               | String | Cancel reason<br><code>normal_cancel</code>: Normal cancel<br><code>stp_cancel</code>: Cancelled by STP                                                                                                                                                                                    |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/trade/Get-Order-Info)

---

## Get Current Orders

Frequency limit: 20 times/1s (UID)

#### Description[​](#description "Direct link to Description")

Get Unfilled Orders

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/trade/unfilled-orders

Request Example

```
curl "https://api.bitget.com/api/v2/spot/trade/unfilled-orders?symbol=BTCUSDT&startTime=1659036670000&endTime=1659076670000&limit=20" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \
```

#### Request parameter[​](#request-parameter "Direct link to Request parameter")

| Parameter     | Type   | Required | Description                                                                                                                         |
| :------------ | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| symbol        | String | No       | Trading pair                                                                                                                        |
| startTime     | String | No       | The record start time for the query. Unix millisecond timestamp, e.g. 1690196141868                                                 |
| endTime       | String | No       | The end time of the record for the query. Unix millisecond timestamp, e.g. 1690196141868                                            |
| idLessThan    | String | No       | Requests the content on the page before this ID (older data), the value input should be the orderId of the corresponding interface. |
| limit         | String | No       | Limit number default 100 max 100                                                                                                    |
| orderId       | String | No       | OrderId                                                                                                                             |
| tpslType      | String | No       | order type deafult <code>normal</code><br><code>normal</code> spot order<br><code>tpsl</code> spot tpsl order                       |
| requestTime   | String | No       | request Time Unix millisecond timestamp                                                                                             |
| receiveWindow | String | No       | valid window period Unix millisecond timestamp Unix millisecond timestamp                                                           |

Response Example

```
{  "code": "00000",  "msg": "success",  "requestTime": 1695808949356,  "data": [    {      "userId": "**********",      "symbol": "btcusdt",      "orderId": "2222222",      "clientOid": "xxxxxxx",      "priceAvg": "34829.12",      "size": "1",      "orderType": "limit",      "side": "buy",      "status": "new",      "basePrice": "0",      "baseVolume": "0",      "quoteVolume": "0",      "enterPointSource": "WEB",      "presetTakeProfitPrice": "70000",      "executeTakeProfitPrice": "",      "presetStopLossPrice": "10000",      "executeStopLossPrice": "",      "cTime": "1622697148",      "tpslType": "normal",      "triggerPrice": null    }  ]}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter              | Type   | Description                                                                                                                                                                                                                                                                                                                        |
| :--------------------- | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId                 | String | User id                                                                                                                                                                                                                                                                                                                            |
| symbol                 | String | Trading pair name                                                                                                                                                                                                                                                                                                                  |
| orderId                | String | Order ID                                                                                                                                                                                                                                                                                                                           |
| clientOid              | String | Client order ID                                                                                                                                                                                                                                                                                                                    |
| priceAvg               | String | Order price                                                                                                                                                                                                                                                                                                                        |
| size                   | String | Amount<br>(orderType = <code>limit</code> means base coin; orderType = <code>market</code> means quote coin)                                                                                                                                                                                                                       |
| orderType              | String | Order type<br>limit Limit price<br>market Market price                                                                                                                                                                                                                                                                             |
| side                   | String | Direction                                                                                                                                                                                                                                                                                                                          |
| status                 | String | Order status<br><code>live</code>:unfilled;<br><code>partially_filled</code>:partially filled;<br><code>filled</code>:filled;<br><code>cancelled</code>:cancelled;                                                                                                                                                                 |
| basePrice              | String | Filled price                                                                                                                                                                                                                                                                                                                       |
| baseVolume             | String | Filled volume in base coin                                                                                                                                                                                                                                                                                                         |
| quoteVolume            | String | Filled volume in quote coin                                                                                                                                                                                                                                                                                                        |
| enterPointSource       | String | Client type<br>WEB WEB Client<br>APP APP Client<br>API API Client<br>SYS SYS Client<br>ANDROID ANDROID Client<br>IOS IOS Client                                                                                                                                                                                                    |
| orderSource            | String | Order source<br>normal: Normal order<br>market: Market order<br>spot_trader_buy: Elite spot trade to buy (elite traders)<br>spot_follower_buy: Copy trade to buy (followers)<br>spot_trader_sell: Elite spot trade to sell (elite traders)<br>spot_follower_sell: Copy trade to sell (followers)<br>strategy_oco_limit: OCO orders |
| presetTakeProfitPrice  | String | Take profit trigger price                                                                                                                                                                                                                                                                                                          |
| executeTakeProfitPrice | String | Take profit execute price(If the value is empty, it means take profit in market price)                                                                                                                                                                                                                                             |
| presetStopLossPrice    | String | Stop loss trigger price                                                                                                                                                                                                                                                                                                            |
| executeStopLossPrice   | String | Stop loss execute price(If the value is empty, it means stop loss in market price)                                                                                                                                                                                                                                                 |
| cTime                  | String | Creation time, Unix millisecond timestamp, e.g. 1690196141868                                                                                                                                                                                                                                                                      |
| uTime                  | String | Update time, Unix millisecond timestamp, e.g. 1690196141868                                                                                                                                                                                                                                                                        |
| triggerPrice           | String | spot tpsl trigger price(Only valid when <code>tpslType</code> is <code>tpsl</code>)                                                                                                                                                                                                                                                |
| tpslType               | String | <code>normal</code> spot order<br><code>tpsl</code> spot tpsl order                                                                                                                                                                                                                                                                |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/trade/Get-Unfilled-Orders)

---

## Get History Orders

Frequency limit: 20 times/1s (UID)

#### Description[​](#description "Direct link to Description")

Get History Orders(It only supports to get the data within 90days. The older
data can be downloaded from web)

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/trade/history-orders

Request Example

```
curl "https://api.bitget.com/api/v2/spot/trade/history-orders?symbol=BTCUSDT&startTime=1659036670000&endTime=1659076670000&limit=20" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

#### request parameter[​](#request-parameter "Direct link to request parameter")

| Parameter     | Type   | Required | Description                                                                                                                                                           |
| :------------ | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol        | String | No       | Trading pair                                                                                                                                                          |
| startTime     | String | No       | The record start time for the query. Unix millisecond timestamp, e.g. 1690196141868. (For Managed Sub-Account, the StartTime cannot be earlier than the binding time) |
| endTime       | String | No       | The end time of the record for the query. Unix millisecond timestamp, e.g. 1690196141868                                                                              |
| idLessThan    | String | No       | Requests the content on the page before this ID (older data), the value input should be the orderId of the corresponding interface.                                   |
| limit         | String | No       | Limit number default 100 max 100                                                                                                                                      |
| orderId       | String | No       | OrderId                                                                                                                                                               |
| tpslType      | String | No       | order type deafult <code>normal</code><br><code>normal</code> spot order<br><code>tpsl</code> spot tpsl order                                                         |
| requestTime   | String | No       | request Time Unix millisecond timestamp                                                                                                                               |
| receiveWindow | String | No       | valid window period Unix millisecond timestamp Unix millisecond timestamp                                                                                             |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": [        {            "userId": "*********",            "symbol": "ETHUSDT",            "orderId": "*****************************",            "clientOid": "*****************************",            "price": "0",            "size": "20.0000000000000000",            "orderType": "market",            "side": "buy",            "status": "filled",            "priceAvg": "1598.1000000000000000",            "baseVolume": "0.0125000000000000",            "quoteVolume": "19.9762500000000000",            "enterPointSource": "WEB",            "feeDetail": "{\"newFees\":{\"c\":0,\"d\":0,\"deduction\":false,\"r\":-0.112079256,\"t\":-0.112079256,\"totalDeductionFee\":0},\"USDT\":{\"deduction\":false,\"feeCoinCode\":\"ETH\",\"totalDeductionFee\":0,\"totalFee\":-0.1120792560000000}}",            "orderSource": "market",            "cTime": "1698736299656",            "uTime": "1698736300363",            "tpslType": "normal",            "cancelReason": "",            "triggerPrice": null        }    ]}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter                  | Type   | Description                                                                                                                                                                                                                                                                                |
| :------------------------- | :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId                     | String | User id                                                                                                                                                                                                                                                                                    |
| symbol                     | String | Trading pair name                                                                                                                                                                                                                                                                          |
| orderId                    | String | Order ID                                                                                                                                                                                                                                                                                   |
| clientOid                  | String | Client Order ID                                                                                                                                                                                                                                                                            |
| price                      | String | Order price                                                                                                                                                                                                                                                                                |
| size                       | String | Amount<br>(orderType = <code>limit</code> means base coin; orderType = <code>market</code> means quote coin)                                                                                                                                                                               |
| orderType                  | String | Order type<br>limit Limit price<br>market Market price                                                                                                                                                                                                                                     |
| side                       | String | Direction                                                                                                                                                                                                                                                                                  |
| status                     | String | Order status<br><code>live</code>:unfilled;<br><code>partially_filled</code>:partially filled;<br><code>filled</code>:filled;<br><code>cancelled</code>:cancelled;                                                                                                                         |
| priceAvg                   | String | Average fill price                                                                                                                                                                                                                                                                         |
| baseVolume                 | String | Filled volume (base coin)                                                                                                                                                                                                                                                                  |
| quoteVolume                | String | Filled volume (quote coin)                                                                                                                                                                                                                                                                 |
| enterPointSource           | String | Client<br>WEB WEB Client<br>APP APP Client<br>API API Client<br>SYS SYS Client<br>ANDROID ANDROID Client<br>IOS IOS Client                                                                                                                                                                 |
| orderSource                | String | Order source<br>normal Normal order<br>market Market order<br>spot_trader_buy Elite spot trade to buy (elite traders)<br>spot_follower_buy Copy trade to buy (followers)<br>spot_trader_sell Elite spot trade to sell (elite traders)<br>spot_follower_sell Copy trade to sell (followers) |
| cTime                      | String | Creation time, Unix millisecond timestamp, e.g. 1690196141868                                                                                                                                                                                                                              |
| uTime                      | String | Update time, Unix millisecond timestamp, e.g. 1690196141868                                                                                                                                                                                                                                |
| feeDetail                  | String | Fee details. If there is a "newFees" field, then "newFees" represents the fee details. If not, the remaining information is the fee details.                                                                                                                                               |
| &gt; newFees               | String | Fee details for "newFees".                                                                                                                                                                                                                                                                 |
| &gt;&gt; c                 | String | Amount deducted by coupons, unit：currency obtained from the transaction.                                                                                                                                                                                                                  |
| &gt;&gt; d                 | String | Amount deducted in BGB (Bitget Coin), unit：BGB                                                                                                                                                                                                                                            |
| &gt;&gt; r                 | String | If the BGB balance is insufficient to cover the fees, the remaining amount is deducted from the currency obtained from the transaction.                                                                                                                                                    |
| &gt;&gt; t                 | String | The total fee amount to be paid, unit ：currency obtained from the transaction.                                                                                                                                                                                                            |
| &gt;&gt; deduction         | String | Ignore.                                                                                                                                                                                                                                                                                    |
| &gt;&gt; totalDeductionFee | String | Ignore.                                                                                                                                                                                                                                                                                    |
| &gt; BGB                   | String | If there is no "newFees" field, this data represents earlier historical data. This key represents the currency used for fee deduction (it is not fixed; if BGB deduction is enabled, it's BGB, otherwise, it's the currency obtained from the transaction).                                |
| &gt;&gt; deduction         | String | Whether there is a fee deduction.                                                                                                                                                                                                                                                          |
| &gt;&gt; feeCoinCode       | String | Transaction fee coin code                                                                                                                                                                                                                                                                  |
| &gt;&gt; totalDeductionFee | String | Deduction amount unit： BGB                                                                                                                                                                                                                                                                |
| &gt;&gt; totalFee          | String | The total fee amount to be paid, unit：currency obtained from the transaction.                                                                                                                                                                                                             |
| triggerPrice               | String | spot tpsl trigger price                                                                                                                                                                                                                                                                    |
| tpslType                   | String | <code>normal</code> spot order<br><code>tpsl</code> spot tpsl order                                                                                                                                                                                                                        |
| cancelReason               | String | Cancel reason<br><code>normal_cancel</code>: Normal cancel<br><code>stp_cancel</code>: Cancelled by STP                                                                                                                                                                                    |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/trade/Get-History-Orders)

---

## Get Fills

Frequency limit:10 times/1s (UID)

#### Description[​](#description "Direct link to Description")

Get Fills(It only supports to get the data within 90days.The older data can be
downloaded from web)

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/trade/fills

Request Example

```
curl "https://api.bitget.com/api/v2/spot/trade/fills?symbol=BTCUSDT&startTime=1659036670000&endTime=1659076670000&limit=20" \    -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json" \
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter  | Type   | Required | Description                                                                                                                                                                                               |
| :--------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol     | String | No       | Trading pair name                                                                                                                                                                                         |
| orderId    | String | No       | Order ID                                                                                                                                                                                                  |
| startTime  | String | No       | The start time of the orders, i.e. to get orders after that timestamp<br>Unix millisecond timestamp, e.g. 1690196141868. (For Managed Sub-Account, the StartTime cannot be earlier than the binding time) |
| endTime    | String | No       | The end time of a fulfilled order, i.e., get orders prior to that timestamp<br>Unix millisecond timestamp, e.g. 1690196141868<br>The interval between startTime and endTime must not exceed 90 days.      |
| limit      | String | No       | Number of results returned: Default: 100, max 100                                                                                                                                                         |
| idLessThan | String | No       | Requests the content on the page before this ID (older data), the value input should be the tradeId of the corresponding interface.                                                                       |

Response Example

```
{  "code": "00000",  "msg": "success",  "requestTime": 1695865274510,  "data": [    {      "userId": "**********",      "symbol": "BTCUSDT",      "orderId": "12345678910",      "tradeId": "12345678910",      "orderType": "market",      "side": "buy",      "priceAvg": "13000",      "size": "0.0007",      "amount": "9.1",      "feeDetail": {        "deduction": "no",        "feeCoin": "BTC",        "totalDeductionFee": "",        "totalFee": "-0.0000007"      },      "tradeScope": "taker",      "cTime": "1695865232579",      "uTime": "1695865233027"    }  ]}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter             | Type   | Description                                             |
| :-------------------- | :----- | :------------------------------------------------------ |
| userId                | String | Account ID                                              |
| symbol                | String | Trading pair name                                       |
| orderId               | String | Order ID                                                |
| tradeId               | String | Transaction id                                          |
| orderType             | String | Order type                                              |
| side                  | String | Order direction                                         |
| priceAvg              | String | Filled price                                            |
| size                  | String | Filled quantity                                         |
| amount                | String | Total trading amount ()                                 |
| cTime                 | String | Creation time<br>Unix second timestamp, e.g. 1622697148 |
| uTime                 | String | Update time<br>Unix second timestamp, e.g. 1622697148   |
| tradeScope            | String | Trader tag<br>taker Taker<br>maker Maker                |
| feeDetail             | Object | Transaction fee breakdown                               |
| &gt;deduction         | String | Discount or not                                         |
| &gt;feeCoin           | String | Transaction fee coin                                    |
| &gt;totalDeductionFee | String | Total transaction fee discount                          |
| &gt;totalFee          | String | Total transaction fee                                   |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/trade/Get-Fills)

---

## Place Plan Order

Frequency limit: 20 times/1s (UID)

#### Description[​](#description "Direct link to Description")

Place plan order

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/place-plan-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/place-plan-order" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json" \    -d '{"symbol": "TRXUSDT", "side": "buy", "triggerPrice": 0.041572, "executePrice": "0.041572", "size": 151, "triggerType": "market_price", "orderType": "limit","clientOid": "12345"}'
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter    | Type   | Required | Description                                                                                                                                                                                                                                |
| :----------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol       | String | Yes      | Trading pair name, e.g. BTCUSDT                                                                                                                                                                                                            |
| side         | String | Yes      | Direction<br><code>buy</code>: Buy<br><code>sell</code>: Sell                                                                                                                                                                              |
| triggerPrice | String | Yes      | Trigger price                                                                                                                                                                                                                              |
| orderType    | String | Yes      | Order type<br><code>limit</code>: Limit orders<br><code>market</code>: Market orders                                                                                                                                                       |
| executePrice | String | No       | Execution price<br>it's required when <code>orderType</code>=<code>limit</code>                                                                                                                                                            |
| planType     | String | No       | Order type<br><code>amount</code>: By amount of the order(base coin)<br><code>total</code>: By trading volume of the order(quote coin)<br>The default value is <code>amount</code>                                                         |
| size         | String | Yes      | Quantity to buy<br>If <code>planType</code>=<code>amount</code>, it is the base coin.<br>If <code>planType</code>=<code>total</code>, it is the quote coin.                                                                                |
| triggerType  | String | Yes      | Trigger type<br><code>fill_price</code>: filled price<br><code>mark_price</code>: mark price                                                                                                                                               |
| clientOid    | String | No       | Client customized ID                                                                                                                                                                                                                       |
| stpMode      | String | No       | STP Mode, default <code>none</code><br><code>none</code> not setting STP<br><code>cancel_taker</code> cancel taker order<br><code>cancel_maker</code> cancel maker order<br><code>cancel_both</code> cancel both of taker and maker orders |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1668134576535,    "data": {        "orderId": "121211212122",        "clientOid": "121211212122"    }}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description          |
| :-------- | :----- | :------------------- |
| orderId   | String | Order ID             |
| clientOid | String | Client customized ID |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/plan/Place-Plan-Order)

---

## Modify Plan Order

Frequency limit: 20 times/1s (UID)

#### Description[​](#description "Direct link to Description")

Modify Plan Order

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/modify-plan-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/modify-plan-order" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json" \    -d '{"orderId": "121211212122", "triggerPrice": 0.041222, "executePrice":"0.041272", "size": 156, "orderType":"limit"}'
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter    | Type   | Required | Description                                                                                                                             |
| :----------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| orderId      | String | No       | Either 'orderId' or 'clientOid' is required.                                                                                            |
| clientOid    | String | No       | Either 'orderId' or 'clientOid' is required.                                                                                            |
| triggerPrice | String | Yes      | Trigger price                                                                                                                           |
| orderType    | String | Yes      | Order type<br>limit: Limit price<br>market: Market price                                                                                |
| executePrice | String | No       | Execution price, cannot be null if orderType=limit                                                                                      |
| size         | String | Yes      | Quantity to buy<br>If planType=amount, the quote currency is the base coin.<br>If planType=total, the quote currency is the quote coin. |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1668134576535,    "data": {        "orderId": "121211212122",        "clientOid": "121211212122"    }}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description          |
| :-------- | :----- | :------------------- |
| orderId   | String | Order ID             |
| clientOid | String | Client customized ID |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/plan/Modify-Plan-Order)

---

## Cancel Plan Order

Frequency limit: 20 times/1s (UID)

#### Description[​](#description "Direct link to Description")

Cancel Plan order

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/cancel-plan-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/cancel-plan-order" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json" \    -d '{"orderId": "121211212122"}'
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type   | Required | Description                                  |
| :-------- | :----- | :------- | :------------------------------------------- |
| orderId   | String | No       | Either 'orderId' or 'clientOid' is required. |
| clientOid | String | No       | Either 'orderId' or 'clientOid' is required. |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1668134497496,    "data": {        "result":"success"    }}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description                  |
| :-------- | :----- | :--------------------------- |
| result    | String | Result is success or failure |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/plan/Cancel-Plan-Order)

---

## Get Current Plan Orders

Frequency limit: 20 times/1s (UID)

#### Description[​](#description "Direct link to Description")

Get Current Plan Orders

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/trade/current-plan-order

Request Example

```
curl "https://api.bitget.com/api/v2/spot/trade/current-plan-order?symbol=BTCUSDT&limit=10" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter  | Type   | Required | Description                                                                                                                                                                 |
| :--------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol     | String | No       | Trading pair, e.g. BTCUSDT                                                                                                                                                  |
| limit      | String | No       | Default is 20 Max is 100                                                                                                                                                    |
| idLessThan | String | No       | Requests the content on the page before this ID (older data), the value input should be the orderId of the corresponding interface.                                         |
| startTime  | String | No       | The start time of the record for the query. Unix millisecond timestamp, e.g. 1690196141868<br>The <code>startTime</code> and <code>endTime</code> should be within 90 days. |
| endTime    | String | No       | The end time of the record for the query. Unix millisecond timestamp, e.g. 1690196141868<br>The <code>startTime</code> and <code>endTime</code> should be within 90 days.   |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1668134581005,    "data": {        "nextFlag": false,        "idLessThan": "1",        "orderList": [            {                "orderId": "121211212122",                "clientOid": "121211212122",                "symbol": "TRXUSDT",                "size": "151",                "executePrice": "0.041572",                "triggerPrice": "0.041572",                "status": "not_trigger",                "orderType": "limit",                "side": "buy",                "planType":"amount",                "triggerType": "fill_price",                "enterPointSource": "API",                "uTime": "1668134576563",                "cTime": "1668134576563"            }        ]    }}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter        | Type   | Description                                                                                                                                                                                                                                                                                                        |
| :--------------- | :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orderId          | String | Order ID                                                                                                                                                                                                                                                                                                           |
| clientOid        | String | Client customized ID                                                                                                                                                                                                                                                                                               |
| symbol           | String | Trading pair                                                                                                                                                                                                                                                                                                       |
| triggerPrice     | String | Trigger price                                                                                                                                                                                                                                                                                                      |
| orderType        | String | Order type<br><code>limit</code>: limit order<br><code>market</code>: market order                                                                                                                                                                                                                                 |
| executePrice     | String | Execution price                                                                                                                                                                                                                                                                                                    |
| planType         | String | Order type<br><code>amount</code>: By amount of the order<br><code>total</code>: By trading volume of the order                                                                                                                                                                                                    |
| size             | String | Quantity to buy<br>If <code>placeType</code>=<code>amount</code>, the quote currency is the base coin.<br>If <code>placeType</code>=<code>total</code>, the quote currency is the quote coin.                                                                                                                      |
| status           | String | Order status<br><code>live</code>: not triggered<br><code>executing</code>: order placing                                                                                                                                                                                                                          |
| side             | String | Direction <code>buy</code> or <code>sell</code>                                                                                                                                                                                                                                                                    |
| triggerType      | String | Trigger type<br><code>fill_price</code>: filled price<br><code>mark_price</code>: mark price                                                                                                                                                                                                                       |
| enterPointSource | String | Order source<br><code>WEB</code>: Orders created on the website<br><code>API</code>: Orders created on API<br><code>SYS</code>: System managed orders, usually generated by forced liquidation logic<br><code>ANDROID</code>: Orders created on the Android app<br><code>IOS</code>: Orders created on the iOS app |
| cTime            | String | Creation time, Unix millisecond timestamp, e.g. 1690196141868                                                                                                                                                                                                                                                      |
| uTime            | String | Update time, Unix millisecond timestamp, e.g. 1690196141868                                                                                                                                                                                                                                                        |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/plan/Get-Current-Plan-Order)

---

## Get Plan Sub Order

Frequency limit: 20 times/1s (UID)

#### Description[​](#description "Direct link to Description")

Get Plan Sub Order

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/trade/plan-sub-order

Request Example

```
curl "https://api.bitget.com/api/v2/spot/trade/plan-sub-order?planOrderId=xxxxxxxxxxxxxxxxxx" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json"
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter   | Type   | Required | Description   |
| :---------- | :----- | :------- | :------------ |
| planOrderId | String | yes      | Plan Order ID |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1710813939206,    "data": [        {            "orderId": "xxxxxxxxxxxxx",            "price": "0.4188",            "type": "limit",            "status": "success"        }    ]}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type    | Description                                                                                                                                                                                |
| :-------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orderId   | boolean | Spot order ID                                                                                                                                                                              |
| price     | String  | Order price                                                                                                                                                                                |
| type      | String  | Order type<br>limit Limit price<br>market Market price                                                                                                                                     |
| status    | String  | Plan order trigger status<br>success: trigger success<br>fail: trigger failed<br>cancelled: cancelled<br>in_progress: trigger spot placing order<br>in_progress_tracking: tracking trigger |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/plan/Get-Plan-Sub-Order)

---

## Get History Plan Orders

Frequency limit: 20 times/1s (UID)

#### Description[​](#description "Direct link to Description")

Get History Plan Orders

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/trade/history-plan-order

Request Example

```
curl "https://api.bitget.com/api/v2/spot/trade/history-plan-order?symbol=BTCUSDT&startTime=1659036670000&endTime=1659076670000&limit=20" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json"
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter  | Type   | Required | Description                                                                                                                                                                                                                                    |
| :--------- | :----- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol     | String | No       | Trading pair, e.g. BTCUSDT                                                                                                                                                                                                                     |
| startTime  | String | No       | The start time of the historical trigger orders, i.e. to get orders after that timestamp<br>Unix millisecond timestamp, e.g. 1690196141868<br>The interval between <code>startTime</code> and <code>endTime</code> must not exceed 90 days     |
| endTime    | String | No       | The end time of the historical trigger orders, i.e., getting orders prior to that timestamp<br>Unix millisecond timestamp, e.g. 1690196141868<br>The interval between <code>startTime</code> and <code>endTime</code> must not exceed 90 days. |
| idLessThan | String | No       | Requests the content on the page before this ID (older data), the value input should be the endld of the corresponding interface.                                                                                                              |
| limit      | String | No       | Limit<br>Default is 100, max is 100                                                                                                                                                                                                            |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1668134581005,    "data": {        "nextFlag": false,        "idLessThan": "1",        "orderList": [            {                "orderId": "121211212122",                "clientOid": "121211212122",                "symbol": "TRXUSDT",                "size": "151",                "executePrice": "0.041572",                "triggerPrice": "0.041572",                "status": "not_trigger",                "orderType": "limit",                "side": "buy",                "planType":"amount",                "triggerType": "fill_price",                "enterPointSource": "API",                "uTime": "1668134576563",                "cTime": "1668134576563"            }        ]    }}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter            | Type    | Description                                                                                                                                                                                                                                                                                                        |
| :------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| nextFlag             | boolean | If Has next query data by idLessThan or not                                                                                                                                                                                                                                                                        |
| idLessThan           | String  | Requests the content on the page before this ID (older data), the value input should be the endId of the corresponding interface.                                                                                                                                                                                  |
| orderList            | Array   | Order List                                                                                                                                                                                                                                                                                                         |
| &gt;orderId          | String  | Order ID                                                                                                                                                                                                                                                                                                           |
| &gt;clientOid        | String  | Client customized ID                                                                                                                                                                                                                                                                                               |
| &gt;symbol           | String  | Trading pair                                                                                                                                                                                                                                                                                                       |
| &gt;triggerPrice     | String  | Trigger price                                                                                                                                                                                                                                                                                                      |
| &gt;orderType        | String  | Order type<br><code>limit</code>: limit order<br><code>market</code>: market order                                                                                                                                                                                                                                 |
| &gt;executePrice     | String  | Execution price                                                                                                                                                                                                                                                                                                    |
| &gt;planType         | String  | Order type<br><code>amount</code>: By amount of the order<br><code>total</code>: By trading volume of the order                                                                                                                                                                                                    |
| &gt;size             | String  | Quantity<br>If <code>placeType</code>=<code>amount</code>, the quote currency is the base coin.<br>If <code>placeType</code>=<code>total</code>, the quote currency is the quote coin.                                                                                                                             |
| &gt;status           | String  | Status<br><code>executed</code>: Executed successfully<br><code>fail_execute</code>: Fail in execution<br><code>cancelled</code>: Cancelled                                                                                                                                                                        |
| &gt;side             | String  | Direction ： <code>buy</code> or <code>sell</code>                                                                                                                                                                                                                                                                 |
| &gt;triggerType      | String  | Trigger type<br><code>fill_price</code>: filled price<br><code>mark_price</code>: mark price                                                                                                                                                                                                                       |
| &gt;enterPointSource | String  | Order source<br><code>WEB</code>: Orders created on the website<br><code>API</code>: Orders created on API<br><code>SYS</code>: System managed orders, usually generated by forced liquidation logic<br><code>ANDROID</code>: Orders created on the Android app<br><code>IOS</code>: Orders created on the iOS app |
| &gt;cTime            | String  | Creation time, Unix millisecond timestamp, e.g. 1690196141868                                                                                                                                                                                                                                                      |
| &gt;uTime            | String  | Update time, Unix millisecond timestamp, e.g. 1690196141868                                                                                                                                                                                                                                                        |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/plan/Get-History-Plan-Order)

---

## Cancel Plan Orders in Batch

Rate limit: 5 req/sec/UID

#### Description[​](#description "Direct link to Description")

Cancel Plan Orders in Batch

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/batch-cancel-plan-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/batch-cancel-plan-order" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json" \    -d '{ "symbolList": ["BTCUSDT", "ETHUSDT"] }'
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter  | Type                | Required | Description                                                                                                            |
| :--------- | :------------------ | :------- | :--------------------------------------------------------------------------------------------------------------------- |
| symbolList | List &lt;String&gt; | No       | Collection of trading pairs: ["BTCUSDT", "ETHUSDT"],<br>If no value is set, all spot trigger orders will be cancelled. |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683876261117,    "data": {        "successList":[{            "orderId": "121211212122",            "clientOid": "121211212122"        }],        "failureList":[{            "orderId": "121211212122",            "clientOid": "121211212122",            "errorMsg": "failure"        }]    }}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter     | Type               | Description                                        |
| :------------ | :----------------- | :------------------------------------------------- |
| successList   | List&lt;Object&gt; | The collection of successfully cancelled orders.   |
| &gt;orderId   | String             | Order ID                                           |
| &gt;clientOid | String             | Customize order ID                                 |
| failureList   | List&lt;Object&gt; | The collection of unsuccessfully cancelled orders. |
| &gt;orderId   | String             | Order ID                                           |
| &gt;clientOid | String             | Customize order ID                                 |
| &gt;errorMsg  | String             | Failure reason                                     |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/plan/Batch-Cancel-Plan-Order)

---

## Get Account Information

Frequency limit: 1 time/1s (User ID)

#### Description[​](#description "Direct link to Description")

Get account information

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/account/info

Request Example

```
curl "https://api.bitget.com/api/v2/spot/account/info" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-------- | :--- | :------- | :---------- |
| N/A       |      |          |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": {        "userId": "**********",        "inviterId": "**********",        "ips": "127.0.0.1",        "authorities": [            "trade",            "readonly"        ],        "parentId": 1,        "traderType": "trader",        "channelCode": "XXX",        "channel": "YYY",        "regisTime":"1246566789345"    }}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter   | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| userId      | String | User ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| inviterId   | String | Inviter's user ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| channelCode | String | Affiliate referral code                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| channel     | String | Affiliate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ips         | String | IP whitelist                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| authorities | Array  | Permissions<br>Read only<br>coor: futures orders<br>cpor: futures holdings<br>stor: spot trade<br>smor: margin trade<br>ttor: copy trading<br>wtor: wallet transfer<br>taxr: taxation<br>chor: subaccount<br>p2pr: P2P query<br>Read and Write<br>coow: futures orders<br>cpow: futures holdings<br>stow: spot trade<br>smow: margin trade<br>ttow: copy trading<br>wtow: wallet transfer<br>wwow: wallet withdrawl<br>chow: subaccount manage<br>p2p: P2P<br>pllw: Pledge Loan Write<br>pllr: Pledge Loan Read<br>taxw: Tax Read and Write |
| parentId    | Int    | Main account user ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| traderType  | String | trader: Is trader, not_trader: not trader                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| regisTime   | String | Register time                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/account/Get-Account-Info)

---

## Get Account Assets

Frequency limit: 10 times/1s (User ID)

#### Description[​](#description "Direct link to Description")

Get Account Assets

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/account/assets

Request Example

```
curl "https://api.bitget.com/api/v2/spot/account/assets?coin=USDT" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json"
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                       |
| :-------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| coin      | String | No       | Token name, e.g. USDT<br>This field is used for querying the positions of a single coin.                                                                                                                                                                                                                                                                                                          |
| assetType | String | No       | Asset type<br><code>hold_only</code>: Position coin<br><code>all</code>: All coins<br>This field is used used for querying the positions of multiple coins. The default value is <code>hold_only</code><br>When only <code>assetType</code> is entered without coin, results of all eligible coins are returned. When both coin and <code>assetType</code> are entered, coin has higher priority. |

Response Example

```
{    "code": "00000",    "message": "success",    "requestTime": 1695808949356,    "data": [        {            "coin": "usdt",            "available": "0",            "frozen": "0",            "locked": "0",            "limitAvailable": "0",            "uTime": "1622697148"        }    ]}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter      | Type   | Description                                                                                    |
| :------------- | :----- | :--------------------------------------------------------------------------------------------- |
| coin           | String | Token name                                                                                     |
| available      | String | Available assets                                                                               |
| frozen         | String | Amount of frozen assets<br>Usually frozen when the limit order is placed or join the Launchpad |
| locked         | String | Amount of locked assets<br>Locked assests required to become a fiat merchants, etc.            |
| limitAvailable | String | Restricted availability<br>For spot copy trading                                               |
| uTime          | String | Update time(ms)                                                                                |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/account/Get-Account-Assets)

---

## Get Sub-accounts Assets

Frequency limit: 10 times/1s (User ID)

#### Description[​](#description "Direct link to Description")

Get Sub-accounts Assets(only return the sub-accounts which assets > 0).  
**ND Brokers are not allowed to call this endpoint**

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/account/subaccount-assets

Request Example

```
curl "https://api.bitget.com/api/v2/spot/account/subaccount-assets" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter  | Type   | Required | Description                                                                                                                          |
| :--------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| idLessThan | String | No       | Cursor ID<br>Pagination cursor. Do not pass it in the first request. For subsequent requests, pass the last ID returned previously.. |
| limit      | String | No       | The number of sub-accounts returned per page.<br>The default value is 10, and the maximum value is 50.                               |

Response Example

```
{  "code": "00000",  "message": "success",  "requestTime": 1695808949356,  "data": [    {      "id": 1111,      "userId": 1234567890,      "assetsList": [        {          "coin": "BTC",          "available": "1.1",          "limitAvailable": "12.1",          "frozen": "0",          "locked": "1.1",          "uTime": "1337654897651"        }      ]    },    {      "id": 2222,      "userId": 1234567890,      "assetsList": [        {          "coin": "ETH",          "available": "12.1",          "limitAvailable": "12.1",          "frozen": "0",          "locked": "1.1",          "uTime": "1337654897651"        }      ]    }  ]}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter           | Type   | Description                                      |
| :------------------ | :----- | :----------------------------------------------- |
| id                  | String | Cursor ID                                        |
| userId              | String | User ID                                          |
| assetsList          | Array  | List of spot assets                              |
| &gt; coin           | String | Token name                                       |
| &gt; available      | String | Available assets                                 |
| &gt; limitAvailable | String | Restricted availability<br>For spot copy trading |
| &gt; frozen         | String | Assets frozen                                    |
| &gt; locked         | String | Assets locked                                    |
| &gt; uTime          | string | update time, Unix, ms                            |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/account/Get-Subaccount-Assets)

---

## Modify Deposit Account

Frequency limit:10 times/1s (User ID)

#### Description[​](#description "Direct link to Description")

Modify the auto-transfer account type of deposit

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/wallet/modify-deposit-account

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/wallet/modify-deposit-account" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{    "coin":"USDT",    "accountType":"USDT-FUTURES"}'
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter   | Type   | Required | Description                                                                                                                                                                                                                                             |
| :---------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| accountType | String | Yes      | Account type<br><code>spot</code>: Spot account<br><code>funding</code>: funding account<br><code>coin-futures</code>: Coin-M futures account<br><code>usdt-futures</code>: USDT-M futures account<br><code>usdc-futures</code>: USDC-M futures account |
| coin        | String | Yes      | Currency of transfer                                                                                                                                                                                                                                    |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683875302853,    "data": "success"}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description  |
| :-------- | :----- | :----------- |
| data      | String | success/fail |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/account/Modify-Deposit-Account)

---

## Get Account Bills

Frequency limit: 10 times/1s (User ID)

#### Description[​](#description "Direct link to Description")

Get Account Bills

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/account/bills

Request Example

```
curl "https://api.bitget.com/api/v2/spot/account/bills" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter    | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :----------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin         | String | No       | Token name, e.g. USDT                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| groupType    | String | No       | Billing type<br>deposit Deposit<br>withdraw Withdraw<br>transaction Transaction<br>transfer Transfer<br>loan Pledge loan<br>financial Wealth managemen<br>fait Fiat currency<br>convert Instant swap<br>c2c C2C token trading<br>pre_c2c Pre-market trading<br>on_chain On-chain transaction<br>strategy Trading strategy<br>other Other                                                                                                                                                                           |
| businessType | String | No       | Business type<br>DEPOSIT: Deposit<br>WITHDRAW: Withdraw<br>BUY: Buy<br>SELL: Sell<br>DEDUCTION_HANDLING_FEE: Deduction of spot trading transaction fee<br>TRANSFER_IN: Transfer-in<br>TRANSFER_OUT: Transfer-out<br>REBATE_REWARDS: Rebate<br>AIRDROP_REWARDS: Airdrop rewards<br>USDT_CONTRACT_REWARDS: USDT futures promotion rewards<br>MIX_CONTRACT_REWARDS: Mix contract promotion rewards<br>SYSTEM_LOCK: System lock-up<br>USER_LOCK: User lock-up<br>STRATEGY_TRANSFER_IN: Strategy Trading Close Position |
| startTime    | String | No       | The start time of the billing history, i.e., getting the billing history after that timestamp<br>Unix millisecond timestamp, e.g. 1690196141868                                                                                                                                                                                                                                                                                                                                                                    |
| endTime      | String | No       | The end time of the billing history, i.e., getting the billing history before that timestamp<br>Unix millisecond timestamp, e.g. 1690196141868<br>The interval between startTime and endTime must not exceed 90 days.                                                                                                                                                                                                                                                                                              |
| limit        | String | No       | Number of results returned. Default: 100, maximum 500.                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| idLessThan   | String | No       | Requests the content on the page before this ID (older data), the value input should be the billId of the corresponding interface.                                                                                                                                                                                                                                                                                                                                                                                 |

Response Example

```
{    "code": "00000",    "message": "success",    "requestTime": 1695808949356,    "data": [        {            "cTime": "1622697148",            "coin": "usdt",            "groupType": "deposit",            "businessType": "transfer-in",            "size": "1",            "balance": "1",            "fees": "0",            "billId": "1291"        }    ]}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter    | Type   | Description                                                                                                                                                                                                                                                                                                                              |
| :----------- | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cTime        | String | Creation time                                                                                                                                                                                                                                                                                                                            |
| coin         | String | Token name                                                                                                                                                                                                                                                                                                                               |
| groupType    | String | Billing type<br>deposit Deposit<br>withdraw Withdraw<br>transaction Transaction<br>transfer Transfer<br>loan Pledge loan<br>financial Wealth managemen<br>fait Fiat currency<br>convert Instant swap<br>c2c C2C token trading<br>pre_c2c Pre-market trading<br>on_chain On-chain transaction<br>strategy Trading strategy<br>other Other |
| businessType | String | Business type of billing                                                                                                                                                                                                                                                                                                                 |
| size         | String | Quantity                                                                                                                                                                                                                                                                                                                                 |
| balance      | String | The assets after transfer                                                                                                                                                                                                                                                                                                                |
| fees         | String | Transaction fees                                                                                                                                                                                                                                                                                                                         |
| billId       | String | Billing ID                                                                                                                                                                                                                                                                                                                               |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/account/Get-Account-Bills)

---

## Transfer

Rate limit: 10 requests/second/UID

#### Description[​](#description "Direct link to Description")

Transfer assets between different `productType` accounts

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/wallet/transfer

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/wallet/transfer" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{    "fromType":"spot",    "toType":"isolated_margin",    "amount":"300",    "symbol":"BTCUSDT",    "clientOid":"1",    "coin":"USDT"}'
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                           |
| :-------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromType  | String | Yes      | Account type<br><code>spot</code>: Spot account<br><code>p2p</code>: P2P/funding account<br><code>coin_futures</code>: Coin-M futures account<br><code>usdt_futures</code>: USDT-M futures account<br><code>usdc_futures</code>: USDC-M futures account<br><code>crossed_margin</code>: Cross margin account<br><code>isolated_margin</code>: Isolated margin account |
| toType    | String | Yes      | Account type<br><code>spot</code>: Spot account<br><code>p2p</code>: P2P/funding account<br><code>coin_futures</code>: Coin-M futures account<br><code>usdt_futures</code>: USDT-M futures account<br><code>usdc_futures</code>: USDC-M futures account<br><code>crossed_margin</code>: Cross margin account<br><code>isolated_margin</code>: Isolated margin account |
| amount    | String | Yes      | Amount to transfer                                                                                                                                                                                                                                                                                                                                                    |
| coin      | String | Yes      | Currency of transfer                                                                                                                                                                                                                                                                                                                                                  |
| symbol    | String | Yes      | Required when transferring to or from an account type that is a leveraged position-by-position account.                                                                                                                                                                                                                                                               |
| clientOid | String | No       | Custom order ID<br>It's unquie. If you set duplicate clientOid, it will return the result of existing clientOid transfer                                                                                                                                                                                                                                              |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683875302853,    "data": {        "transferId": "123456",        "clientOid": "x123"    }}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter  | Type   | Description     |
| :--------- | :----- | :-------------- |
| transferId | String | Transfer ID     |
| clientOid  | String | Custom order ID |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/account/Wallet-Transfer)

---

## GET Transferable Coin List

Frequency limit:10 times/1s (User ID)

#### Description[​](#description "Direct link to Description")

Get transferable coin list

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/wallet/transfer-coin-info

Request Example

```
curl "https://api.bitget.com/api/v2/spot/wallet/transfer-coin-info?fromType=isolated_margin&toType=spot" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \ }'
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                   |
| :-------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| fromType  | String | Yes      | Account type<br><code>spot</code>: Spot account<br><code>p2p</code>: P2P account<br><code>coin_futures</code>: Coin-M futures account<br><code>usdt_futures</code>: USDT-M futures account<br><code>usdc_futures</code>: USDC-M futures account<br><code>crossed_margin</code>: Cross margin account<br><code>isolated_margin</code>: Isolated margin account |
| toType    | String | Yes      | Account type<br><code>spot</code>: Spot account<br><code>p2p</code>: P2P account<br><code>coin_futures</code>: Coin-M futures account<br><code>usdt_futures</code>: USDT-M futures account<br><code>usdc_futures</code>: USDC-M futures account<br><code>crossed_margin</code>: Cross margin account<br><code>isolated_margin</code>: Isolated margin account |

Response Example

```
{    "code":"00000",    "msg":"success",    "requestTime":1683875302853,    "data":[        "BTC",        "USDT",        "ETH"    ]}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description                                                           |
| :-------- | :--- | :-------------------------------------------------------------------- |
| data      | List | transfer_in and transfer_out of accounts supports coins intersection. |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/account/Get-Transfer-Coins)

---

## Sub Transfer

Rate limit: 10 req/sec/UID

#### Description[​](#description "Direct link to Description")

The types of transfers supported by this interface include

- Parent account transfer to sub-accounts (only parent account APIKey has
  access)
- Sub-accounts to parent account (only parent account APIKey has access)
- Sub-accounts transfer to sub-accounts (only the parent account APIKey has
  access and the sub-accounts belong to same parent account)
- Sub-account inner accounts transfer, e.g. spot to futures(only the parent
  account APIKey has access, and the `fromUserId` & `toUserId` should be same)

Only the parent account API Key can use this endpoint, and the API Key must bind
IP

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/wallet/subaccount-transfer

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/wallet/transfer" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{"fromUserId":"1","toUserId":"2","fromType":"spot","toType":"spot","amount":"10","coin":"USDT","clientOid":"1"}'
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter  | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                           |
| :--------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromType   | String | Yes      | Account type<br><code>spot</code>: Spot account<br><code>p2p</code>: P2P/Funding account<br><code>coin_futures</code>: Coin-M futures account<br><code>usdt_futures</code>: USDT-M futures account<br><code>usdc_futures</code>: USDC-M futures account<br><code>crossed_margin</code>: Cross margin account<br><code>isolated_margin</code>: Isolated margin account |
| toType     | String | Yes      | Account type<br><code>spot</code>: Spot account<br><code>p2p</code>: P2P/Funding account<br><code>coin_futures</code>: Coin-M futures account<br><code>usdt_futures</code>: USDT-M futures account<br><code>usdc_futures</code>: USDC-M futures account<br><code>crossed_margin</code>: Cross margin account<br><code>isolated_margin</code>: Isolated margin account |
| amount     | String | Yes      | Amount to transfer                                                                                                                                                                                                                                                                                                                                                    |
| coin       | String | Yes      | Currency of transfer                                                                                                                                                                                                                                                                                                                                                  |
| symbol     | String | No       | Symbol name(Required in Isolated margin (spot) transferring)                                                                                                                                                                                                                                                                                                          |
| clientOid  | String | No       | Custom order ID                                                                                                                                                                                                                                                                                                                                                       |
| fromUserId | String | Yes      | Outgoing Account UID                                                                                                                                                                                                                                                                                                                                                  |
| toUserId   | String | Yes      | Incoming Account UID                                                                                                                                                                                                                                                                                                                                                  |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683875302853,    "data": {        "transferId": "123456",        "clientOid": "x123"    }}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter  | Type   | Description     |
| :--------- | :----- | :-------------- |
| transferId | String | Transfer ID     |
| clientOid  | String | Custom order ID |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/account/Sub-Transfer)

---

## Withdraw

Rate limit:5 req/sec/UID

#### Description[​](#description "Direct link to Description")

- Coin withdrawals including on-chain withdrawals and internal transfers(the
  address needs to be added in the address book on web)
- KYC: For users in Korea, please note that if you withdraw funds to an account
  address on a Korean exchange and the amount is significant, the following 5
  parameters can be referenced for completion: `memberCode`, `identityType`,
  `companyName`, `firstName`, and `lastName`.

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/wallet/withdrawal

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/wallet/withdrawal" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*" \  -H "ACCESS-PASSPHRASE:*" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:en-US" \  -H "Content-Type: application/json" \  -d '{"coin": "USDT","transferType":"on_chain","address": "*******************************************","chain": "trc20","size": "0.009"}
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter    | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :----------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin         | String | Yes      | Coin<br>All coin names can be returned from <a href="https://www.bitget.com/api-doc/spot/market/Get-Coin-List" target="_blank" rel="noopener noreferrer">Get Coin Info</a> interface                                                                                                                                                                                                                                                                                                                     |
| transferType | String | Yes      | The type of withdrawal<br><code>on_chain</code>: withdrawal on chain<br><code>internal_transfer</code>: Transfer internally                                                                                                                                                                                                                                                                                                                                                                              |
| address      | String | Yes      | Withdrawal address<br>when <code>transferType</code> is <code>on_chain</code>, it represents the chain address<br>When <code>transferType</code> is <code>internal_transfer</code>, according the <code>innerToType</code> parameter, please input the UID, email or the mobile                                                                                                                                                                                                                          |
| chain        | String | No       | Chain network e.g. erc20, trc20, etc.<br>This field must be passed when the <code>transferType</code> is <code>on-chain</code>.<br>You can get the chain names via <a href="https://www.bitget.com/api-doc/spot/market/Get-Coin-List" target="_blank" rel="noopener noreferrer">Get Coin Info</a> interface                                                                                                                                                                                              |
| innerToType  | String | No       | Type of address for internal withdrawals<br><code>email</code>: Email address<br><code>mobile</code>: Mobile phone number<br><code>uid</code>: UID<br>The default value is uid                                                                                                                                                                                                                                                                                                                           |
| areaCode     | String | No       | This field is required when the value of the collection address type is <code>mobile</code>                                                                                                                                                                                                                                                                                                                                                                                                              |
| tag          | String | No       | Address tag<br>Some special coins need this field, e.g. EOS                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| size         | String | Yes      | Withdrawal amount<br>Special instructions for Bitcoin Lightning Network withdrawals:<br>1.This parameter must be filled in with a value that is equal to the deposit amount of your invoice on the Bitcoin Lightning Network;<br>2.The value of size is the credited amount, excluding fees;<br>The decimal places of withdrawal amount will be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Coin-List" target="_blank" rel="noopener noreferrer">Get Coin Info</a> interface |
| remark       | String | No       | Note                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| clientOid    | String | No       | Client Unique Customized Id                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| memberCode   | String | No       | Support：<br><code>bithumb</code><br><code>korbit</code><br><code>coinone</code><br>                                                                                                                                                                                                                                                                                                                                                                                                                     |
| identityType | String | No       | Normal user：<code>user</code> company：<code>company</code>                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| companyName  | String | No       | Company name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| firstName    | String | No       | First Name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| lastName     | String | No       | Last name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": {        "orderId": "123",        "clientOid": "123"    }}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description     |
| :-------- | :----- | :-------------- |
| orderId   | String | Order ID        |
| clientOid | String | Custom order ID |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/account/Wallet-Withdrawal)

---

## Get MainSub Transfer Record

Rate limit: 20 req/sec/UID

#### Description[​](#description "Direct link to Description")

Get transfer record

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/account/sub-main-trans-record

Request Example

```
curl "https://api.bitget.com/api/v2/spot/account/sub-main-trans-record?coin=USDT&startTime=1699510219000&endTime=1699684880000" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter  | Type   | Required | Description                                                                                                                                                                                                           |
| :--------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin       | String | No       | Token name                                                                                                                                                                                                            |
| role       | String | No       | Transfer out type(default：initiator)<br><code>initiator</code> initiator<br><code>receiver</code> receiver                                                                                                           |
| subUid     | String | No       | Sub-account UID<br>If empty, it only query the records that transfer from main account                                                                                                                                |
| startTime  | String | No       | The start time of the billing history, i.e., getting the billing history after that timestamp<br>Unix millisecond timestamp, e.g. 1690196141868                                                                       |
| endTime    | String | No       | The end time of the billing history, i.e., getting the billing history before that timestamp<br>Unix millisecond timestamp, e.g. 1690196141868<br>The interval between startTime and endTime must not exceed 90 days. |
| clientOid  | String | No       | Order ID customized by user                                                                                                                                                                                           |
| limit      | String | No       | Number of results returned: Default: 100, maximum 100                                                                                                                                                                 |
| idLessThan | String | No       | Requests the content on the page before this ID (older data), the value input should be the transferId of the corresponding interface.                                                                                |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1700556280430,    "data": [        {            "coin": "USDT",            "status": "Successful",            "toType": "usdt_futures",            "fromType": "spot",            "size": "1020.00000000",            "ts": "1691476360467",            "clientOid": "xxxx",            "transferId": "xxxx",            "fromUserId": "xxxx",            "toUserId": "xxxx"        }    ]}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type   | Description                                                                                                                                                                                                                                                                  |
| :------------ | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin          | String | Token name                                                                                                                                                                                                                                                                   |
| status        | String | Status of transfer<br>Successful: Successful<br>Failed: Failed<br>Processing: Processing                                                                                                                                                                                     |
| toType        | String | Recipient account type<br>spot: Spot account<br>p2p: P2P account<br>coin_futures: Coin-M futures account<br>usdt_futures: USDT-M futures account<br>usdc_futures: USDC-M futures account<br>crossed_margin: Cross margin account<br>isolated_margin: Isolated margin account |
| fromType      | String | Sender account type<br>spot: Spot account<br>p2p: P2P account<br>coin_futures: Coin-M futures account<br>usdt_futures: USDT-M futures account<br>usdc_futures: USDC-M futures account<br>crossed_margin: Cross margin account<br>isolated_margin: Isolated margin account    |
| size          | String | Quantity                                                                                                                                                                                                                                                                     |
| ts            | String | Transfer time, Unix millisecond timestamp, e.g. 1690196141868                                                                                                                                                                                                                |
| clientOid     | String | Order ID customized by user                                                                                                                                                                                                                                                  |
| transferId    | String | Transfer order ID                                                                                                                                                                                                                                                            |
| newTransferId | String | Transfer order ID<br>It is the same as the transferId in the main-sub account transfer response.                                                                                                                                                                             |
| fromUserId    | String | the user ID who initiate the trasnfer ID                                                                                                                                                                                                                                     |
| toUserId      | String | The user ID who receive the trnasfer                                                                                                                                                                                                                                         |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/account/Get-SubAccount-TransferRecords)

---

## Get Transfer Record

Frequency limit: 20 times/1s (User ID)

#### Description[​](#description "Direct link to Description")

Get transfer record

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/account/transferRecords

Request Example

```
curl "https://api.bitget.com/api/v2/spot/account/transferRecords?coin=USDT&fromType=exchange&startTime=1659076670&endTime=1659076670&limit=100" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter  | Type   | Required | Description                                                                                                                                                                                                                                                                |
| :--------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin       | String | Yes      | Token name                                                                                                                                                                                                                                                                 |
| fromType   | String | No       | Account type<br>spot: Spot account<br>p2p: P2P/funding account<br>coin_futures: Coin-M futures account<br>usdt_futures: USDT-M futures account<br>usdc_futures: USDC-M futures account<br>crossed_margin: Cross margin account<br>isolated_margin: Isolated margin account |
| startTime  | String | No       | The start time of the billing history, i.e., getting the billing history after that timestamp<br>Unix millisecond timestamp, e.g. 1690196141868                                                                                                                            |
| endTime    | String | No       | The end time of the billing history, i.e., getting the billing history before that timestamp<br>Unix millisecond timestamp, e.g. 1690196141868<br>The interval between startTime and endTime must not exceed 90 days.                                                      |
| clientOid  | String | No       | Order ID customized by user                                                                                                                                                                                                                                                |
| pageNum    | String | No       | Requests the content on the page.<br>default:1<br>max:1000                                                                                                                                                                                                                 |
| limit      | String | No       | Number of results returned: Default: 100, maximum 500                                                                                                                                                                                                                      |
| idLessThan | String | No       | (Deprecated) Requests the content on the page before this ID (older data), the value input should be the transferId of the corresponding interface.                                                                                                                        |

Response Example

```
{    "code": "00000",    "data": [        {            "coin": "btc",            "status": "Successful",            "toType": "usdt_futures",            "toSymbol": "",            "fromType": "spot",            "fromSymbol": "BTC/USD",            "size": "1000.00000000",            "ts": "1631070374488",            "clientOid": "1",            "transferId": "1"        }    ],    "msg": "success",    "requestTime": 1631608142260}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter  | Type   | Description                                                                                                                                                                                                                                                                          |
| :--------- | :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin       | String | Token name                                                                                                                                                                                                                                                                           |
| status     | String | Status of transfer<br>Successful: Successful<br>Failed: Failed<br>Processing: Processing                                                                                                                                                                                             |
| toType     | String | Recipient account type<br>spot: Spot account<br>p2p: P2P/funding account<br>coin_futures: Coin-M futures account<br>usdt_futures: USDT-M futures account<br>usdc_futures: USDC-M futures account<br>crossed_margin: Cross margin account<br>isolated_margin: Isolated margin account |
| toSymbol   | String | Trading pair for the recipient account<br>Returned when the recipient account is isolated_margin                                                                                                                                                                                     |
| fromType   | String | Sender account type<br>spot: Spot account<br>p2p: P2P/funding account<br>coin_futures: Coin-M futures account<br>usdt_futures: USDT-M futures account<br>usdc_futures: USDC-M futures account<br>crossed_margin: Cross margin account<br>isolated_margin: Isolated margin account    |
| fromSymbol | String | Trading pair for the sending account<br>Return when the sending account is isolated_margin                                                                                                                                                                                           |
| size       | String | Quantity                                                                                                                                                                                                                                                                             |
| ts         | String | Transfer time, Unix millisecond timestamp, e.g. 1690196141868                                                                                                                                                                                                                        |
| clientOid  | String | Order ID customized by user                                                                                                                                                                                                                                                          |
| transferId | String | Transfer order ID                                                                                                                                                                                                                                                                    |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/account/Get-Account-TransferRecords)

---

## Switch BGB Deduct

Rate Limit: 1 req/sec/UID

#### Description[​](#description "Direct link to Description")

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/account/switch-deduct

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/account/switch-deduct" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{"deduct":"on"}'
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type   | Required | Description |
| :-------- | :----- | :------- | :---------- |
| deduct    | String | Yes      | on/off      |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683875302853,    "data": true}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-------- | :--- | :---------- |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/account/Switch-Deduct)

---

## Get Deposit Address

Frequency limit: 10 times/1s (User ID)

#### Description[​](#description "Direct link to Description")

Get Deposit Address

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/wallet/deposit-address

Request Example

```
curl "https://api.bitget.com/api/v2/spot/wallet/deposit-address?coin=USDT&chain=trc20" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type   | Required | Description                                                                                                                                                                                          |
| :-------- | :----- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin      | String | Yes      | Coin name, e.g. USDT<br>All coin names can be returned from <a href="https://www.bitget.com/api-doc/spot/market/Get-Coin-List" target="_blank" rel="noopener noreferrer">Get Coin Info</a> interface |
| chain     | String | No       | Chain name, e.g. trc20<br>You can get the chain names via <a href="https://www.bitget.com/api-doc/spot/market/Get-Coin-List" target="_blank" rel="noopener noreferrer">Get Coin Info</a> interface   |
| size      | String | No       | Bitcoin Lightning Network withdrawal amount，limit：0.000001 - 0.01                                                                                                                                  |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683875302853,    "data": {        "address": "xxx",        "chain": "BTC-Bitcoin",        "coin": "BTC",        "tag": "",        "url": "https://btc.com/xxx"    }}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description        |
| :-------- | :----- | :----------------- |
| address   | String | Deposit address    |
| chain     | String | chain name         |
| coin      | String | Token name         |
| tag       | String | Tag                |
| url       | String | blockchain address |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/account/Get-Deposit-Address)

---

## Get SubAccount Deposit Address

Rate limit: 10 req/sec/UID

#### Description[​](#description "Direct link to Description")

Get Sub-account Deposit Address(Please ensure that queried sub-account has
deposit permission enabled)

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/wallet/subaccount-deposit-address

Request Example

```
curl "https://api.bitget.com/api/v2/spot/wallet/subaccount-deposit-address?coin=USDT&chain=ERC20&subUid=123" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type   | Required | Description                                                                                                                                                                                                                     |
| :-------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| subUid    | String | Yes      | Sub Account Uid<br>You can get the sub-account list via <a href="https://www.bitget.com/api-doc/common/vsubaccount/Get-Virtual-Subaccount-List" target="_blank" rel="noopener noreferrer">Get Virtual Subaccounts</a> interface |
| coin      | String | Yes      | Coin name, e.g. USDT<br>All coin names can be returned from <a href="https://www.bitget.com/api-doc/spot/market/Get-Coin-List" target="_blank" rel="noopener noreferrer">Get Coin Info</a> interface                            |
| chain     | String | No       | Chain name, e.g. trc20<br>You can get the chain names via <a href="https://www.bitget.com/api-doc/spot/market/Get-Coin-List" target="_blank" rel="noopener noreferrer">Get Coin Info</a> interface                              |
| size      | String | No       | Bitcoin Lightning Network withdrawal amount，limit：0.000001 - 0.01                                                                                                                                                             |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683875302853,    "data": {        "address": "xxx",        "chain": "BTC-Bitcoin",        "coin": "BTC",        "tag": "",        "url": "https://btc.com/xxx"    }}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description        |
| :-------- | :----- | :----------------- |
| address   | String | Deposit address    |
| chain     | String | chain name         |
| coin      | String | Token name         |
| tag       | String | Tag                |
| url       | String | blockchain address |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/account/Get-SubAccount-Deposit-Address)

---

## Get BGB Deduct Info

Rate limit: 5 req/sec/UID

#### Description[​](#description "Direct link to Description")

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/account/deduct-info

Request Example

```
curl "https://api.bitget.com/api/v2/spot/account/deduct-info" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-------- | :--- | :------- | :---------- |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": {        "deduct": "on"    }}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description |
| :-------- | :----- | :---------- |
| deduct    | String | on / off    |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/account/Get-Deduct-Info)

---

## Cancel Withdrawal

Frequency limit:10 times/1s (User ID)

#### Description[​](#description "Direct link to Description")

1.  The user center can set the switch \[Cancel Withdrawal\], and there is a
    "regret period" of 1 minute to cancel the withdrawal.
2.  There is manual review in the preliminary review status, and the withdrawal
    can be cancelled. Once the initial review is passed or uploaded to the
    chain, the withdrawal cannot be revoked.
3.  Small-amount automatic currency withdrawals do not require manual review,
    and the withdrawal cannot be revoked.

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/wallet/cancel-withdrawal

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/wallet/cancel-withdrawal" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{    "orderId":"1231231312312"}'
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type   | Required | Description      |
| :-------- | :----- | :------- | :--------------- |
| orderId   | String | Yes      | Withdraw orderId |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683875302853,    "data": "success"}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description  |
| :-------- | :----- | :----------- |
| data      | String | success/fail |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/account/Cancel-Withdrawal)

---

## Get SubAccount Deposit Records

Frequency limit:10 times/1s (UID)

#### Description[​](#description "Direct link to Description")

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/wallet/subaccount-deposit-records

Request Example

```
curl "https://api.bitget.com/api/v2/spot/wallet/subaccount-deposit-records?subUid=12121212&coin=USDT&idLessThan=1111120137173336063&limit=5" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter  | Type   | Required | Description                                                                                                                         |
| :--------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| subUid     | String | Yes      | Sub Account Uid                                                                                                                     |
| coin       | String | No       | Coin name, e.g. USDT                                                                                                                |
| startTime  | String | No       | The record start time for the query. Unix millisecond timestamp, e.g. 1690196141868                                                 |
| endTime    | String | No       | The end time of the record for the query. Unix millisecond timestamp, e.g. 1690196141868                                            |
| idLessThan | String | No       | Requests the content on the page before this ID (older data), the value input should be the orderId of the corresponding interface. |
| limit      | String | No       | Number of entries per page<br>The default value is 20 and the maximum value is 100                                                  |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1654507973411,    "data": [        {            "orderId": "1",            "tradeId": "1",            "coin": "USDT",            "size": "10.00000000",            "status": "success",            "toAddress": "0x51xxx",            "dest": "on_chain",            "chain": "erc20",            "fromAddress": "0x52xxx",            "cTime": "1653290769222",            "uTime": "1653290769222"        }    ]}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter   | Type   | Description                                                                                                                                                                                       |
| :---------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| orderId     | String | Order ID                                                                                                                                                                                          |
| tradeId     | String | TX ID<br>when <code>dest</code> is <code>on_chain</code>, it's the on chain hash value<br>if the <code>dest</code> is <code>internal_transfer</code>, it is the trade ID                          |
| coin        | String | Token name                                                                                                                                                                                        |
| clientOid   | String | Customized order ID                                                                                                                                                                               |
| size        | String | Quantity                                                                                                                                                                                          |
| status      | String | Deposit status<br><code>pending</code>：it's still in confirmation<br><code>fail</code>：fail<br><code>success</code>：success                                                                    |
| fromAddress | String | Deposit Initiators<br>If <code>dest</code> is <code>on_chain</code>, it's the on chain address<br>If <code>dest</code> is <code>internal_transfer</code>, it would be the UID,email or the mobile |
| toAddress   | String | Coin Receiver<br>If <code>dest</code> is <code>on_chain</code>, it's the on chain address<br>If <code>dest</code> is <code>internal_transfer</code>, it would be the UID,email or the mobile      |
| chain       | String | Deposit network<br>if <code>dest</code> is <code>internal_transfer</code>, please ignore this parameter                                                                                           |
| confirm     | String | The number of confirmed blocks                                                                                                                                                                    |
| dest        | String | Deposit Type<br><code>on_chain</code>: the on chain deposit<br><code>internal_transfer</code>: internal deposit                                                                                   |
| tag         | String | Tag                                                                                                                                                                                               |
| cTime       | String | Creation time in ms                                                                                                                                                                               |
| uTime       | String | Update time in ms                                                                                                                                                                                 |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/account/Get-SubAccount-Deposit-Record)

---

## Get Withdrawal Records

Frequency limit:10 times/1s (User ID)

#### Description[​](#description "Direct link to Description")

Get Withdrawal Records

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/wallet/withdrawal-records

Request Example

```
curl "https://api.bitget.com/api/v2/spot/wallet/withdrawal-records?coin=USDT&clientOid=123&startTime=1659036670000&endTime=1659076670000&limit=20" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter  | Type   | Required | Description                                                                                                                         |
| :--------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| coin       | String | No       | Coin name, e.g. USDT                                                                                                                |
| clientOid  | String | No       | Client customized ID                                                                                                                |
| startTime  | String | Yes      | The record start time for the query. Unix millisecond timestamp, e.g. 1690196141868                                                 |
| endTime    | String | Yes      | The end time of the record for the query. Unix millisecond timestamp, e.g. 1690196141868                                            |
| idLessThan | String | No       | Requests the content on the page before this ID (older data), the value input should be the orderId of the corresponding interface. |
| orderId    | String | No       | The response orderId                                                                                                                |
| limit      | String | No       | Number of entries per page<br>The default value is 20 and the maximum value is 100                                                  |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1654507973411,    "data": [        {            "orderId": "1",            "tradeId": "1",            "coin": "USDT",            "dest": "dest",            "clientOid": "123",            "type": "withdraw",            "tag": "",            "size": "10.00000000",            "fee": "-1.00000000",            "status": "success",            "toAddress": "1",            "fromAddress": "2",            "confirm": "100",            "chain": "erc20",            "cTime": "1653290769222",            "uTime": "1653290769222"        }    ]}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter   | Type   | Description                                                                                                                                                                                          |
| :---------- | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orderId     | String | Order ID                                                                                                                                                                                             |
| tradeId     | String | TX ID<br>when <code>dest</code> is <code>on_chain</code>, it's the on chain hash value<br>if the <code>dest</code> is <code>internal_transfer</code>, it is the trade ID                             |
| coin        | String | Token name                                                                                                                                                                                           |
| clientOid   | String | Client customized ID                                                                                                                                                                                 |
| type        | String | Type<br>Fixed value: <code>withdraw</code>                                                                                                                                                           |
| dest        | String | Type of withdrawal<br><code>on_chain</code>: withdrawal on chain<br><code>internal_transfer</code>: internal transfer                                                                                |
| size        | String | Quantity                                                                                                                                                                                             |
| fee         | string | Transaction Fee                                                                                                                                                                                      |
| status      | String | Withdrawal status<br><code>pending</code>:Pending preliminary examination<br><code>fail</code>:Failed<br><code>success</code>:Successful                                                             |
| fromAddress | String | Withdrawal Initiators<br>If <code>dest</code> is <code>on_chain</code>, it's the on chain address<br>If <code>dest</code> is <code>internal_transfer</code>, it would be the UID,email or the mobile |
| toAddress   | String | Coin receiver address<br>If <code>dest</code> is <code>on_chain</code>, it's the on chain address<br>If <code>dest</code> is <code>internal_transfer</code>, it would be the UID,email or the mobile |
| chain       | String | Withdrawal network<br>if <code>dest</code> is <code>internal_transfer</code>, please ignore this parameter                                                                                           |
| confirm     | String | Number of confirmed blocks                                                                                                                                                                           |
| tag         | String | Tag                                                                                                                                                                                                  |
| cTime       | String | Creation time(ms)                                                                                                                                                                                    |
| uTime       | String | Update time(ms)                                                                                                                                                                                      |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/account/Get-Withdraw-Record)

---

## Get Deposit Records

Frequency limit:10 times/1s (UID)

#### Description[​](#description "Direct link to Description")

Get Deposit Records

#### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/wallet/deposit-records

Request Example

```
curl "https://api.bitget.com/api/v2/spot/wallet/deposit-records?coin=USDT&startTime=1659036670000&endTime=1659076670000&limit=20" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

#### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter  | Type   | Required | Description                                                                                                                         |
| :--------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| coin       | String | No       | Coin name, e.g. USDT                                                                                                                |
| orderId    | String | No       | The response orderId                                                                                                                |
| startTime  | String | Yes      | The record start time for the query. Unix millisecond timestamp, e.g. 1690196141868                                                 |
| endTime    | String | Yes      | The end time of the record for the query. Unix millisecond timestamp, e.g. 1690196141868                                            |
| idLessThan | String | No       | Requests the content on the page before this ID (older data), the value input should be the orderId of the corresponding interface. |
| limit      | String | No       | Number of entries per page<br>The default value is 20 and the maximum value is 100                                                  |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1654507973411,    "data": [        {            "orderId": "1",            "tradeId": "1",            "coin": "USDT",            "type": "deposit",            "size": "10.00000000",            "status": "success",            "toAddress": "0x51xxx",            "dest": "on_chain",            "chain": "erc20",            "fromAddress": "0x52xxx",            "cTime": "1653290769222",            "uTime": "1653290769222"        }    ]}
```

#### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter   | Type   | Description                                                                                                                                                                                       |
| :---------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| orderId     | String | Order ID                                                                                                                                                                                          |
| tradeId     | String | TX ID<br>when <code>dest</code> is <code>on_chain</code>, it's the on chain hash value<br>if the <code>dest</code> is <code>internal_transfer</code>, it is the trade ID                          |
| coin        | String | Token name                                                                                                                                                                                        |
| type        | String | Type<br>Fixed value: <code>deposit</code>                                                                                                                                                         |
| size        | String | Quantity                                                                                                                                                                                          |
| status      | String | Withdrawal status<br><code>pending</code>: pending confirmation<br><code>fail</code>: failed<br><code>success</code>: successed                                                                   |
| fromAddress | String | Deposit Initiators<br>If <code>dest</code> is <code>on_chain</code>, it's the on chain address<br>If <code>dest</code> is <code>internal_transfer</code>, it would be the UID,email or the mobile |
| toAddress   | String | Coin Receiver<br>If <code>dest</code> is <code>on_chain</code>, it's the on chain address<br>If <code>dest</code> is <code>internal_transfer</code>, it would be the UID,email or the mobile      |
| chain       | String | Deposit network<br>if <code>dest</code> is <code>internal_transfer</code>, please ignore this parameter                                                                                           |
| dest        | String | Deposit Type<br><code>on_chain</code>: the on chain deposit<br><code>internal_transfer</code>: internal deposit                                                                                   |
| cTime       | String | Creation time, ms                                                                                                                                                                                 |
| uTime       | String | Edit time, ms                                                                                                                                                                                     |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/account/Get-Deposit-Record)

---

## Market Channel

#### Description[​](#description "Direct link to Description")

Get the product's latest price, bid price, bid price and 24h trading volume
information. Frequency of data push: 200ms ~ 300ms

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "SPOT",            "channel": "ticker",            "instId": "ETHUSDT"        }    ]}
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter     | Type   | Required           | Description                                     |
| :------------ | :----- | :----------------- | :---------------------------------------------- |
| op            | String | Yes                | Operation, subscribe unsubscribe                |
| args          | Array  | List&lt;Object&gt; | Yes<br>List of channels to request subscription |
| &gt; instType | String | Yes                | Product line type                               |
| &gt; channel  | String | Yes                | Channel name                                    |
| &gt; instId   | String | Yes                | Product ID, e.g. ETHUSDT                        |

Response Example

```
{  "event": "subscribe",  "arg": {    "instType": "SPOT",    "channel": "ticker",    "instId": "ETHUSDT"  }}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type   | Description                        |
| :------------ | :----- | :--------------------------------- |
| event         | String | Yes<br>Event                       |
| arg           | Object | Subscribed channels                |
| &gt; instType | String | Product type                       |
| &gt; channel  | String | Channel name                       |
| &gt; instId   | String | Product ID, e.g. ETHUSDT           |
| code          | String | Error code, returned only on error |
| msg           | String | Error message                      |

Push Data

```
{    "action": "snapshot",    "arg": {        "instType": "SPOT",        "channel": "ticker",        "instId": "ETHUSDT"    },    "data": [        {            "instId": "ETHUSDT",            "lastPr": "2200.10",            "open24h": "0.00",            "high24h": "0.00",            "low24h": "0.00",            "change24h": "0.00",            "bidPr": "1792",            "askPr": "2200.1",            "bidSz": "0.0084",            "askSz": "19740.8811",            "baseVolume": "0.0000",            "quoteVolume": "0.0000",            "openUtc": "0.00",            "changeUtc24h": "0",            "ts": "1695702438018"        }    ],    "ts": 1695702438029}
```

#### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter         | Type               | Description                                                                    |
| :---------------- | :----------------- | :----------------------------------------------------------------------------- |
| arg               | Object             | Channels with successful subscription                                          |
| &gt; instType     | String             | Product type                                                                   |
| &gt; channel      | String             | Channel name                                                                   |
| &gt; instId       | String             | Product ID, e.g. ETHUSDT                                                       |
| action            | String             | Push data action: <code>snapshot</code>                                        |
| data              | List&lt;Object&gt; | Subscription data                                                              |
| &gt; instId       | String             | Product ID, e.g. ETHUSDT                                                       |
| &gt; lastPr       | String             | Latest price                                                                   |
| &gt; askPr        | String             | Ask price                                                                      |
| &gt; bidPr        | String             | Bid price                                                                      |
| &gt; open24h      | String             | Entry price of the last 24 hours                                               |
| &gt; high24h      | String             | 24h high                                                                       |
| &gt; low24h       | String             | 24h low                                                                        |
| &gt; baseVolume   | String             | 24h trading volume in left coin                                                |
| &gt; quoteVolume  | String             | 24h trading volume in right coin                                               |
| &gt; ts           | String             | Milliseconds format of data generation time Unix timestamp, e.g. 1597026383085 |
| &gt; openUtc      | String             | UTC±00:00 Entry price                                                          |
| &gt; changeUtc24h | String             | Change at UTC+0, 0.01 means 1%.                                                |
| &gt; bidSz        | String             | Buying amount                                                                  |
| &gt; askSz        | String             | Selling amount                                                                 |
| &gt; change24h    | String             | 24-hour change, 0.01 means 1%.                                                 |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/websocket/public/Tickers-Channel)

---

## Candlestick Channel

#### Description[​](#description "Direct link to Description")

Get the candlestick data of the product

After first subscription, it will push the recent snapshot data and then push
the update data

When there are transactions in the K-line channel, data is pushed once per
second.

When there are no transactions, data is pushed once at the specified time
granularity.

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "SPOT",            "channel": "candle1m",            "instId": "ETHUSDT"        }    ]}
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter     | Type               | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :------------ | :----------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| op            | String             | Yes      | Operation, subscribe unsubscribe                                                                                                                                                                                                                                                                                                                                                                                                    |
| args          | List&lt;Object&gt; | Yes      | List of channels to request subscription                                                                                                                                                                                                                                                                                                                                                                                            |
| &gt; instType | String             | Yes      | Product line type                                                                                                                                                                                                                                                                                                                                                                                                                   |
| &gt; channel  | String             | Yes      | Channel name, candle1m, candle5m 5 minutes, candle15 15 minutes, candle30m 30 minutes, candle1H 1 hour, candle4H 4 hours, candle6H 6 hours, candle12H 12 hours.<br>candle1D 1 day, candle3D 3 days, candle1W 1 week, candle1M 1 month-line, candle6Hutc 6-hour line, UTC, candle12Hutc 12-hour line, UTC, candle1Dutc 1-day line, UTC<br>candle3Dutc, UTC, 3-day line, candle1Wutc UTC, weekly line, candle1Mutc monthly line, UTC. |
| &gt; instId   | String             | Yes      | Product ID, e.g. ETHUSDT                                                                                                                                                                                                                                                                                                                                                                                                            |

Response Example

```
{  "event": "subscribe",  "arg": {    "instType": "SPOT",    "channel": "candle1m",    "instId": "ETHUSDT"  }}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :------------ | :----- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| event         | String | Yes<br>event, subscribe unsubscribe error                                                                                                                                                                                                                                                                                                                                                                                           |
| arg           | Object | Subscribed channels                                                                                                                                                                                                                                                                                                                                                                                                                 |
| &gt; instType | String | Product type                                                                                                                                                                                                                                                                                                                                                                                                                        |
| &gt; channel  | String | Channel name, candle1m, candle5m 5 minutes, candle15 15 minutes, candle30m 30 minutes, candle1H 1 hour, candle4H 4 hours, candle6H 6 hours, candle12H 12 hours.<br>candle1D 1 day, candle3D 3 days, candle1W 1 week, candle1M 1 month-line, candle6Hutc 6-hour line, UTC, candle12Hutc 12-hour line, UTC, candle1Dutc 1-day line, UTC<br>candle3Dutc, UTC, 3-day line, candle1Wutc UTC, weekly line, candle1Mutc monthly line, UTC. |
| &gt; instId   | String | Product ID, e.g. ETHUSDT                                                                                                                                                                                                                                                                                                                                                                                                            |
| code          | String | Error code, returned only on error                                                                                                                                                                                                                                                                                                                                                                                                  |
| msg           | String | Error message                                                                                                                                                                                                                                                                                                                                                                                                                       |

Push Data

```
{  "action": "snapshot",  "arg": {    "instType": "SPOT",    "channel": "candle1m",    "instId": "ETHUSDT"  },  "data": [    [      "1695672780000",      "2200.1",      "2200.1",      "2200.1",      "2200.1",      "0",      "0",      "0"    ]  ],  "ts": 1695702747821}
```

#### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter     | Type               | Description                                                          |
| :------------ | :----------------- | :------------------------------------------------------------------- |
| action        | String             | Push data action, <code>snapshot</code> or <code>update</code>       |
| arg           | Object             | Subscribed channels                                                  |
| &gt; channel  | String             | Channel name                                                         |
| &gt; instType | String             | Product type                                                         |
| &gt; instId   | String             | Product ID, e.g. ETHUSDT                                             |
| data          | List&lt;String&gt; | Subscription data                                                    |
| &gt; index[0] | String             | Start time, milliseconds format of Unix timestamp, e.g.1597026383085 |
| &gt; index[1] | String             | Opening price                                                        |
| &gt; index[2] | String             | Highest price                                                        |
| &gt; index[3] | String             | Lowest price                                                         |
| &gt; index[4] | String             | Closing price                                                        |
| &gt; index[5] | String             | Trading volume of the coin                                           |
| &gt; index[6] | String             | Trading volume of quote currency                                     |
| &gt; index[7] | String             | Trading volume (USDT)                                                |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/websocket/public/Candlesticks-Channel)

---

## Trading Channel

#### Description[​](#description "Direct link to Description")

Push once if any trade is matched(taker orders)

After first subscription, it will push the recent snapshot data and then push
the update data

Real-time Push

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "SPOT",            "channel": "trade",            "instId": "BTCUSDT"        }    ]}
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter     | Type               | Required | Description                          |
| :------------ | :----------------- | :------- | :----------------------------------- |
| op            | String             | Yes      | Operation, subscribe unsubscribe     |
| args          | List&lt;Object&gt; | Yes      | List of channels to subscribe to     |
| &gt; instType | String             | Yes      | Product Line Type, <code>SPOT</code> |
| &gt; channel  | String             | Yes      | Channel name, <code>trade</code>     |
| &gt; instId   | String             | Yes      | Product id For example: ETHUSDT      |

Response Example

```
{    "event": "subscribe",    "arg": {        "instType": "SPOT",        "channel": "trade",        "instId": "BTCUSDT"    }}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type   | Description                                                               |
| :------------ | :----- | :------------------------------------------------------------------------ |
| event         | String | Event, <code>subscribe</code> <code>unsubscribe</code> <code>error</code> |
| arg           | Object | The channel subscribe to                                                  |
| &gt; instType | String | product type, <code>SPOT</code>                                           |
| &gt; channel  | String | Channel name, <code>trade</code>                                          |
| &gt; instId   | String | Product id. For example: ETHUSDT                                          |
| code          | String | Error code, returned only on error                                        |
| msg           | String | Error message                                                             |

Push Data

```
{    "action": "snapshot",    "arg": {        "instType": "SPOT",        "channel": "trade",        "instId": "BTCUSDT"    },    "data": [        {            "ts": "1695709835822",            "price": "26293.4",            "size": "0.0013",            "side": "buy",            "tradeId": "1000000000"        }    ],    "ts": 1695711090682}
```

#### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter     | Type               | Description                                                                   |
| :------------ | :----------------- | :---------------------------------------------------------------------------- |
| arg           | Object             | Successfully subscribed channel                                               |
| &gt; instType | String             | Product Type, <code>SPOT</code>                                               |
| &gt; channel  | String             | Channel name, <code>trade</code>                                              |
| &gt; instId   | String             | Product id For example: ETHUSDT                                               |
| action        | String             | Push data action, <code>snapshot</code> or <code>update</code>                |
| data          | List&lt;Object&gt; | Subscribed data                                                               |
| &gt; tradeId  | String             | Transaction ID                                                                |
| &gt; ts       | String             | Transaction time, millisecond format of Unix timestamp, such as 1597026383085 |
| &gt; price    | String             | Transaction price                                                             |
| &gt; size     | String             | Transaction quantity                                                          |
| &gt; side     | String             | Transaction direction                                                         |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/websocket/public/Trades-Channel)

---

## Depth Channel

#### Description[​](#description "Direct link to Description")

This is the channel to get the depth data  
Default data push frequency for `books`, `books5`, `books15` is **200ms**  
Default data push frequency for `books1` is **60ms**

- `books`: All levels of depth. First update pushed is full data: `snapshot`,
  and then push the update data: `update`
- `books1`: 1st level of depth. Push `snapshot` each time
- `books5`: 5 depth levels. Push `snapshot` each time
- `books15`: 15 depth levels. Push `snapshot` each time
- The push frequency of the order book channel (books1) is optimized to 20ms.
  The symbols for this optimization are: BTCUSDT, ETHUSDT, XRPUSDT, SOLUSDT,
  SUIUSDT, DOGEUSDT, ADAUSDT, PEPEUSDT, LINKUSDT, HBARUSDT

##### Checksum[​](#checksum "Direct link to Checksum")

Calculate Checksum

```
1. More than 25 levels of bid and askA local snapshot of market depth (only 2 levels of the orderbook are shown here, while 25 levels of orderbook should actually be intercepted):    "bids": [      [ 43231.1, 4 ],   //bid1      [ 43231,   6 ]    //bid2    ]    "asks": [      [ 43232.8, 9 ],   //ask1      [ 43232.9, 8 ]    //ask2    ]Build the string to check CRC32:"43231.1:4:43232.8:9:43231:6:43232.9:8"The sequence:"bid1[price:amount]:ask1[price:amount]:bid2[price:amount]:ask2[price:amount]"2. Less than 25 levels of bid or askA local snapshot of market depth:    "bids": [      [ 3366.1, 7 ] //bid1    ]    "asks": [      [ 3366.8, 9 ],    //ask1      [ 3368  , 8 ],    //ask2      [ 3372  , 8 ]     //ask3    ]Build the string to check CRC32:"3366.1:7:3366.8:9:3368:8:3372:8"The sequence:"bid1[price:amount]:ask1[price:amount]:ask2[price:amount]:ask3[price:amount]"
```

This mechanism can assist users in checking the accuracy of depth(order book)
data.

**Merging update data into snapshot**

After subscribe to the channel (such as `books` 400 levels) of
[Order book](#order-book-channel) , user first receive the initial snapshot of
market depth. Afterwards the incremental update is subsequently received, user
are responsible to update the snapshot from client side.

1.  If there are any levels with same price from the updates, compare the amount
    with the snapshot order book:

    If the amount is 0, delete this depth data.

    If the amount changes, replace the depth data.

2.  If there is no level in the snapshot with same price from the update, insert
    the update depth information into the snapshot sort by price (bid in
    descending order, ask in ascending order).

**Calculate Checksum**

Use the first 25 bids and asks in the local snapshot to build a string (where a
colon connects the price and amount in an ask or a bid), and then calculate the
CRC32 value (32-bit signed integer).

1.  When the bid and ask depth data exceeds 25 levels, each of them will
    intercept 25 levels of data, and the string to be checked is queued in a way
    that the bid and ask depth data are alternately arranged. Such as:
    `bid1[price:amount]`:`ask1[price:amount]`:`bid2[price:amount]`:`ask2[price:amount]`...
2.  When the bid or ask depth data is less than 25 levels, the missing depth
    data will be ignored. Such as:
    `bid1[price:amount]`:`ask1[price:amount]`:`ask2[price:amount]`:`ask3[price:amount]`...
3.  If price is '0.5000', DO NOT calculate the checksum by '0.5', please DO use
    the original value

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "SPOT",            "channel": "books5",            "instId": "BTCUSDT"        }    ]}
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter     | Type               | Required | Description                                            |
| :------------ | :----------------- | :------- | :----------------------------------------------------- |
| op            | String             | Yes      | Operation, subscribe unsubscribe                       |
| args          | List&lt;Object&gt; | Yes      | List of channels to request subscription               |
| &gt; instType | String             | Yes      | Product line type                                      |
| &gt; channel  | String             | Yes      | Channel name: <code>books/books1/books5/books15</code> |
| &gt; instId   | String             | Yes      | Product ID, e.g. ETHUSDT                               |

Response Example

```
{  "event": "subscribe",  "arg": {    "instType": "SPOT",    "channel": "books5",    "instId": "BTCUSDT"  }}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type   | Description                                            |
| :------------ | :----- | :----------------------------------------------------- |
| event         | String | Yes<br>Event                                           |
| arg           | Object | Subscribed channels                                    |
| &gt; instType | String | Product type                                           |
| &gt; channel  | String | Channel name: <code>books/books1/books5/books15</code> |
| &gt; instId   | String | Product ID, e.g. ETHUSDT                               |
| code          | String | Error code, returned only on error                     |
| msg           | String | Error message                                          |

Push Data

```
{  "action": "snapshot",  "arg": {    "instType": "SPOT",    "channel": "books5",    "instId": "BTCUSDT"  },  "data": [    {      "asks": [        [          "26274.9",          "0.0009"        ],        [          "26275.0",          "0.0500"        ]      ],      "bids": [        [          "26274.8",          "0.0009"        ],        [          "26274.7",          "0.0027"        ]      ],      "checksum": 0,       "seq": 123,      "ts": "1695710946294"    }  ],  "ts": 1695710946294}
```

#### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter     | Type               | Description                                                                                                                       |
| :------------ | :----------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| arg           | Object             | Channels with successful subscription                                                                                             |
| &gt; instType | String             | Product type                                                                                                                      |
| &gt; channel  | String             | Channel name: <code>books/books1/books5/books15</code>                                                                            |
| &gt; instId   | String             | Product ID, e.g. ETHUSDT                                                                                                          |
| action        | String             | Push data action, <code>snapshot</code> or <code>update</code>                                                                    |
| data          | List&lt;Object&gt; | Subscription data                                                                                                                 |
| &gt; instId   | String             | Product ID, e.g. ETHUSDT                                                                                                          |
| &gt; asks     | List&lt;String&gt; | Seller depth                                                                                                                      |
| &gt; bids     | List&lt;String&gt; | Buyer depth                                                                                                                       |
| &gt; ts       | String             | Matching engine timestamp(ms), e.g. 1597026383085                                                                                 |
| &gt; checksum | Long               | Checksum                                                                                                                          |
| &gt; seq      | Long               | Serial number.<br>It increases when the order book is updated and can be used to determine whether there is out-of-order packets. |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/websocket/public/Depth-Channel)

---

## Fill Channel

#### Description[​](#description "Direct link to Description")

Trade Details channel

Request

```
{    "op": "subscribe",    "args": [        {            "instType": "SPOT",            "channel": "fill",            "instId": "default"        }    ]}
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter     | Type   | Required | Description                       |
| :------------ | :----- | :------- | :-------------------------------- |
| op            | String | Yes      | Operation, subscribe unsubscribe  |
| arg           | Object | Yes      | Subscribed channels               |
| &gt; channel  | String | Yes      | Channel name: <code>fill</code>   |
| &gt; instType | String | Yes      | Product type<br><code>SPOT</code> |
| &gt; instId   | String | No       | Product ID or default             |

Response

```
{    "event": "subscribe",    "arg": {        "instType": "SPOT",        "channel": "fill",        "instId": "default"    }}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| event         | String | Event                             |
| arg           | Object | Subscribed channels               |
| &gt; channel  | String | Channel name: fill                |
| &gt; instType | String | Product type<br><code>SPOT</code> |
| &gt; instId   | String | Product ID/default                |
| code          | String | Error code                        |
| msg           | String | Error message                     |

Push Data

```
{    "action":"snapshot",    "arg":{        "instType":"SPOT",        "channel":"fill",        "instId":"default"    },    "data":[        {            "orderId":"111",            "tradeId":"111",            "symbol":"BTCUSDT",            "orderType":"limit",            "side":"buy",            "priceAvg":"42740.41",            "size":"0.0006",            "amount":"25.644246",            "tradeScope":"marker",            "feeDetail":[                {                    "feeCoin":"USDT",                    "deduction":"no",                    "totalDeductionFee":"0",                    "totalFee":"0.01538655"                }            ],            "cTime":"1703580202094",            "uTime":"1703580202094"        },        {            "orderId":"111",            "tradeId":"222",            "symbol":"BTCUSDT",            "orderType":"limit",            "side":"buy",            "priceAvg":"42741.46",            "size":"0.0006",            "amount":"25.644876",                        "tradeScope":"marker",            "feeDetail":[                {                    "feeCoin":"USDT",                    "deduction":"no",                    "totalDeductionFee":"0",                    "totalFee":"0.01538693"                }            ],            "cTime":"1703580202094",            "uTime":"1703580202094"        }    ],    "ts":1703580202416}
```

#### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter                              | Type               | Description                                                                                   |
| :------------------------------------- | :----------------- | :-------------------------------------------------------------------------------------------- |
| action                                 | String             | Push action<br><code>snapshot</code>                                                          |
| arg                                    | Object             | Channels with successful subscription                                                         |
| &gt; channel                           | String             | Channel name: fill                                                                            |
| &gt; instType                          | String             | Product type<br><code>SPOT</code>                                                             |
| &gt; instId                            | String             | Product ID                                                                                    |
| data                                   | List&lt;Object&gt; | Subscription data                                                                             |
| &gt; orderId                           | String             | Order ID                                                                                      |
| &gt; tradeId                           | String             | Trade ID                                                                                      |
| &gt; symbol                            | String             | Symbol                                                                                        |
| &gt; orderType                         | String             | Order type:<br><code>limit</code><br><code>market</code>                                      |
| &gt; side                              | String             | Order direction<br><code>buy</code><br><code>sell</code>                                      |
| &gt; priceAvg                          | String             | Total average filled price                                                                    |
| &gt; size                              | String             | Filled size                                                                                   |
| &gt; amount                            | String             | Accumulated filled size                                                                       |
| &gt; tradeScope                        | String             | The liquidity direction of the latest transaction<br><code>taker</code><br><code>maker</code> |
| &gt; feeDetail                         | List&lt;Object&gt; | Transaction fee of the order                                                                  |
| &nbsp;&nbsp;&gt;&gt; deduction         | String             | deduction<br><code>yes</code><br><code>no</code>                                              |
| &nbsp;&nbsp;&gt;&gt; totalDeductionFee | String             | Fee of deduction                                                                              |
| &nbsp;&nbsp;&gt;&gt; totalFee          | String             | Fee of all                                                                                    |
| &nbsp;&nbsp;&gt;&gt; feeCoin           | String             | Currency of transaction fee                                                                   |
| &gt; cTime                             | String             | Create Time，milliseconds format of Unix timestamp, e.g.1597026383085                         |
| &gt; uTime                             | String             | Update Time，milliseconds format of Unix timestamp, e.g.1597026383085                         |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/websocket/private/Fill-Channel)

---

## Order Channel

#### Description[​](#description "Direct link to Description")

Get order information. Initial subscriptions will not trigger any push
notifications.

Data will be pushed when the following events occurred:

1.  Place orders
2.  Orders are filled
3.  Cancel orders
4.  Modify orders

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "SPOT",            "channel": "orders",            "instId": "BTCUSDT"        }    ]}
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter     | Type               | Required | Description                                                                         |
| :------------ | :----------------- | :------- | :---------------------------------------------------------------------------------- |
| op            | String             | Yes      | Operation, subscribe unsubscribe                                                    |
| args          | List&lt;Object&gt; | Yes      | List of channels to request subscription                                            |
| &gt; instType | String             | Yes      | Product line type                                                                   |
| &gt; channel  | String             | Yes      | Channel name                                                                        |
| &gt; instId   | String             | Yes      | Product ID, e.g. <code>ETHUSDT</code><br><code>default</code>:subscribe all symbols |

Response Example

```
{  "event": "subscribe",  "arg": {    "instType": "SPOT",    "channel": "orders",    "instId": "BTCUSDT"  }}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type   | Description                        |
| :------------ | :----- | :--------------------------------- |
| event         | String | Yes<br>Event                       |
| arg           | Object | Subscribed channels                |
| &gt; instType | String | Product type                       |
| &gt; channel  | String | Channel name                       |
| &gt; instId   | String | Product ID, e.g. ETHUSDT           |
| code          | String | Error code, returned only on error |
| msg           | String | Error message                      |

Push Data

```
{  "action": "snapshot",  "arg": {    "instType": "SPOT",    "channel": "orders",    "instId": "BTCUSDT"  },  "data": [    {      "instId": "BTCUSDT",      "orderId": "1",      "clientOid": "1",      "size": "8.0000",      "newSize": "500.0000",      "notional": "8.000000",      "orderType": "market",      "force": "gtc",      "side": "buy",      "fillPrice": "26256.0",      "tradeId": "1",      "baseVolume": "0.0003",      "fillTime": "1695797773286",      "fillFee": "-0.00000018",      "fillFeeCoin": "BTC",      "tradeScope": "T",      "accBaseVolume": "0.0003",      "priceAvg": "26256.0",      "status": "partially_filled",      "cTime": "1695797773257",      "uTime": "1695797773326",      "stpMode": "cancel_taker",      "feeDetail": [        {          "feeCoin": "BTC",          "fee": "-0.00000018"        }      ],      "enterPointSource": "WEB"    }  ],  "ts": 1695797773370}
```

#### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter             | Type               | Description                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :-------------------- | :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arg                   | Object             | Channels with successful subscription                                                                                                                                                                                                                                                                                                                                                                                                     |
| &gt; instType         | String             | Product type                                                                                                                                                                                                                                                                                                                                                                                                                              |
| &gt; channel          | String             | Channel name                                                                                                                                                                                                                                                                                                                                                                                                                              |
| &gt; instId           | String             | Yes                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| action                | String             | Push data action, <code>snapshot</code> or <code>update</code>                                                                                                                                                                                                                                                                                                                                                                            |
| data                  | List&lt;Object&gt; | Subscription data                                                                                                                                                                                                                                                                                                                                                                                                                         |
| &gt; instId           | String             | Product ID, e.g. ETHUSDT                                                                                                                                                                                                                                                                                                                                                                                                                  |
| &gt; orderId          | String             | Order ID                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| &gt; clientOid        | String             | Customized order ID                                                                                                                                                                                                                                                                                                                                                                                                                       |
| &gt; price            | String             | Order price                                                                                                                                                                                                                                                                                                                                                                                                                               |
| &gt; size             | String             | Order amount<br>when <code>side=buy</code>, it represents the amount of quote coin;<br>when <code>side=sell</code>, it represents the amount of base coin.                                                                                                                                                                                                                                                                                |
| &gt; newSize          | String             | <code>newSize</code> represents the order quantity, following the specified rules:<br>when <code>orderType=limit</code>, <code>newSize</code> represents the quantity of base coin,<br>when <code>orderType=market</code>and<code>side=buy</code>, <code>newSize</code> represents the quantity of quote coin,<br>when <code>orderType=market</code>and<code>side=sell</code>, <code>newSize</code> represents the quantity of base coin. |
| &gt; notional         | String             | Buy amount, returned when buying at market price                                                                                                                                                                                                                                                                                                                                                                                          |
| &gt; ordType          | String             | Order type, market: market order. Limit: limit order                                                                                                                                                                                                                                                                                                                                                                                      |
| &gt; force            | String             | Order validity, GTC: normal limit order, good till canceled. post_only Post only. FOK: Fill or kill. IOC: Immediate or cancel.                                                                                                                                                                                                                                                                                                            |
| &gt; side             | String             | Order direction                                                                                                                                                                                                                                                                                                                                                                                                                           |
| &gt; fillPrice        | String             | Latest filled price                                                                                                                                                                                                                                                                                                                                                                                                                       |
| &gt; tradeId          | String             | Latest transaction ID                                                                                                                                                                                                                                                                                                                                                                                                                     |
| &gt; baseVolume       | String             | Number of latest filled orders                                                                                                                                                                                                                                                                                                                                                                                                            |
| &gt; fillTime         | String             | Latest transaction time                                                                                                                                                                                                                                                                                                                                                                                                                   |
| &gt; fillFee          | String             | Transaction fee of the latest transaction, negative value                                                                                                                                                                                                                                                                                                                                                                                 |
| &gt; fillFeeCoin      | String             | Currency of transaction fee of the latest transaction                                                                                                                                                                                                                                                                                                                                                                                     |
| &gt; tradeScope       | String             | Direction of liquidity of the latest transaction<br><code>T</code>:taker;<br><code>M</code>:maker;                                                                                                                                                                                                                                                                                                                                        |
| &gt; accBaseVolume    | String             | Total filled quantity                                                                                                                                                                                                                                                                                                                                                                                                                     |
| &gt; priceAvg         | String             | Total average filled price. If the filled orders are 0, the field is 0.                                                                                                                                                                                                                                                                                                                                                                   |
| &gt; status           | String             | Order status<br><code>live</code>:new order;<br><code>partially_filled</code>:partially filled;<br><code>filled</code>:full filled;<br><code>cancelled</code>: cancelled;                                                                                                                                                                                                                                                                 |
| &gt; enterPointSource | String             | Order source                                                                                                                                                                                                                                                                                                                                                                                                                              |
| &gt; feeDetail        | List&lt;Object&gt; | transaction fee list                                                                                                                                                                                                                                                                                                                                                                                                                      |
| &gt;&gt; feeCoin      | String             | Transaction fee currency                                                                                                                                                                                                                                                                                                                                                                                                                  |
| &gt;&gt; fee          | String             | Order transaction fee, the transaction fee charged by the platform from the user.                                                                                                                                                                                                                                                                                                                                                         |
| &gt; cTime            | String             | Order creation time, milliseconds format of Unix timestamp, e.g.1630410492847                                                                                                                                                                                                                                                                                                                                                             |
| &gt; uTime            | String             | Order Update time, milliseconds format of Unix timestamp, e.g.1630410492847                                                                                                                                                                                                                                                                                                                                                               |
| &gt; stpMode          | String             | STP Mode<br><code>none</code> not setting STP<br><code>cancel_taker</code> cancel taker order<br><code>cancel_maker</code> cancel maker order<br><code>cancel_both</code> cancel both of taker and maker orders                                                                                                                                                                                                                           |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/websocket/private/Order-Channel)

---

## Trigger Order Channel

#### Description[​](#description "Direct link to Description")

Subscribe trigger order channel

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "SPOT",            "channel": "orders-algo",            "instId": "default"        }    ]}
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter     | Type               | Required | Description                              |
| :------------ | :----------------- | :------- | :--------------------------------------- |
| op            | String             | Yes      | Operation, subscribe unsubscribe         |
| args          | List&lt;Object&gt; | Yes      | List of channels to request subscription |
| &gt; channel  | String             | Yes      | Channel name: orders-algo                |
| &gt; instType | String             | Yes      | Product type<br><code>SPOT</code>        |
| &gt; instId   | String             | No       | Trading pair or default                  |

Response Example

```
{    "event": "subscribe",    "arg": {        "instType": "SPOT",        "channel": "orders-algo",        "instId": "default"    }}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| event         | String | Event                             |
| arg           | Object | Subscribed channels               |
| &gt; channel  | String | Channel name: orders-algo         |
| &gt; instType | String | Product type<br><code>SPOT</code> |
| &gt; instId   | String | Product ID/default                |
| code          | String | Error code                        |
| msg           | String | Error message                     |

Push Data

```
{    "action": "snapshot",    "arg": {        "instType": "USDT-FUTURES",        "channel": "orders-algo",        "instId": "default"    },    "data": [        {            "instId": "BTCUSDT",            "orderId": "1",            "clientOid": "1",            "triggerPrice": "27000.000000000",            "triggerType": "fill_price",            "planType": "amount",            "price": "27000.000000000",            "size": "0.020000000",            "actualSize": "0.000000000",            "orderType": "market",            "side": "buy",            "status": "live",            "executePrice": "0.1",            "enterPointSource": "web",            "cTime": "1695719197612",            "uTime": "1695719197612",            "stpMode": "cancel_taker"        }    ],    "ts": 1695719197733}
```

#### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter             | Type               | Description                                                                                                                                                                                                                                       |
| :-------------------- | :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| action                | String             | Push action                                                                                                                                                                                                                                       |
| arg                   | Object             | Channels with successful subscription                                                                                                                                                                                                             |
| &gt; channel          | String             | Channel name: orders-algo                                                                                                                                                                                                                         |
| &gt; instType         | String             | Product type<br><code>SPOT</code>                                                                                                                                                                                                                 |
| &gt; instId           | String             | Product ID                                                                                                                                                                                                                                        |
| data                  | List&lt;Object&gt; | Subscription data                                                                                                                                                                                                                                 |
| &gt; instId           | String             | Product ID                                                                                                                                                                                                                                        |
| &gt; orderId          | String             | Bot order ID                                                                                                                                                                                                                                      |
| &gt; clientOid        | String             | Customized bot order ID                                                                                                                                                                                                                           |
| &gt; triggerPrice     | String             | Trigger price                                                                                                                                                                                                                                     |
| &gt; triggerType      | String             | Trigger type<br>fill_price: filled price<br>mark_price: mark price                                                                                                                                                                                |
| &gt; planType         | String             | Websocket planType, ws Trigger order type<br><code>amount</code><br><code>total</code>                                                                                                                                                            |
| &gt; price            | String             | Order price                                                                                                                                                                                                                                       |
| &gt; size             | String             | Original order amount in coin                                                                                                                                                                                                                     |
| &gt; actualSize       | String             | Actual number of orders in coin                                                                                                                                                                                                                   |
| &gt; orderType        | String             | Order type<br>limit: limit order<br>market                                                                                                                                                                                                        |
| &gt; side             | String             | Order direction,                                                                                                                                                                                                                                  |
| &gt; status           | String             | Order status                                                                                                                                                                                                                                      |
| &gt; executePrice     | String             | Execute price                                                                                                                                                                                                                                     |
| &gt; enterPointSource | String             | Order source<br>WEB: Orders created on the website<br>API: Orders created on API<br>SYS: System managed orders, usually generated by forced liquidation logic<br>ANDROID: Orders created on the Android app<br>IOS: Orders created on the iOS app |
| &gt; cTime            | String             | Order create time, Milliseconds format of updated data timestamp Unix, e.g. 1597026383085                                                                                                                                                         |
| &gt; uTime            | String             | Order update time, Milliseconds format of updated data timestamp Unix, e.g. 1597026383085                                                                                                                                                         |
| &gt; stpMode          | String             | STP Mode<br><code>none</code> not setting STP<br><code>cancel_taker</code> cancel taker order<br><code>cancel_maker</code> cancel maker order<br><code>cancel_both</code> cancel both of taker and maker orders                                   |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/websocket/private/Plan-Order-Channel)

---

## Account Channel

#### Description[​](#description "Direct link to Description")

Get account information, push data according to the subscription dimensions for
the first subscription.

Data will be pushed when the following events occurred:

1.  Orders are filled
2.  Transfer
3.  Deposit
4.  Withdrawal

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "SPOT",            "channel": "account",            "coin": "default"        }    ]}
```

#### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter     | Type               | Required | Description                                                                             |
| :------------ | :----------------- | :------- | :-------------------------------------------------------------------------------------- |
| op            | String             | Yes      | Operation, subscribe unsubscribe                                                        |
| args          | List&lt;Object&gt; | Yes      | List of channels to request subscription                                                |
| &gt; instType | String             | Yes      | Product Type, <code>SPOT</code>                                                         |
| &gt; channel  | String             | Yes      | Channel name, <code>account</code>                                                      |
| &gt; coin     | String             | Yes      | Coin name，<code>default</code> represents all the coins，Only default is supported now |

Response Example

```
{  "event": "subscribe",  "arg": {    "instType": "SPOT",    "channel": "account",    "coin": "default"  }}
```

#### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type   | Description                        |
| :------------ | :----- | :--------------------------------- |
| event         | String | Yes<br>Event                       |
| arg           | Object | Subscribed channels                |
| &gt; instType | String | Product Type, <code>SPOT</code>    |
| &gt; channel  | String | Channel name, <code>account</code> |
| &gt; coin     | String | <code>default</code>               |
| code          | String | Error code, returned only on error |
| msg           | String | Error message                      |

Push Data

```
{    "action": "snapshot",    "arg": {        "instType": "SPOT",        "channel": "account",        "coin": "default"    },    "data": [        {            "coin": "USDT",            "available": "100000",            "frozen": "0",            "locked": "0",            "limitAvailable": "0",            "uTime":"1697092295506"        }    ],    "ts": 1695713887792}
```

#### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter           | Type               | Description                                                                      |
| :------------------ | :----------------- | :------------------------------------------------------------------------------- |
| arg                 | Object             | Channels with successful subscription                                            |
| &gt; instType       | String             | Product Type, <code>SPOT</code>                                                  |
| &gt; channel        | String             | Channel name, <code>account</code>                                               |
| &gt; coin           | String             | <code>default</code>                                                             |
| action              | String             | Push data action, <code>snapshot</code> or <code>update</code>                   |
| data                | List&lt;Object&gt; | Subscription data                                                                |
| &gt; coin           | String             | Token name                                                                       |
| &gt; available      | String             | Available coin assets                                                            |
| &gt; frozen         | String             | Amount of frozen assets Usually frozen when the order is placed                  |
| &gt; locked         | String             | Amount of locked assets Locked assests required to become a fiat merchants, etc. |
| &gt; limitAvailable | String             | Restricted availability For spot copy trading                                    |
| &gt; uTime          | String             | Update time                                                                      |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/websocket/private/Account-Channel)

---

## Rest API Error Code

| Error message | Error code                                                                                                                                                                                                                                                                                                                                                                       |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 429           | Too many requests                                                                                                                                                                                                                                                                                                                                                                |
| 00001         | startTime and endTime interval cannot be greater than {0} days                                                                                                                                                                                                                                                                                                                   |
| 00171         | Parameter verification failed {0}{1}                                                                                                                                                                                                                                                                                                                                             |
| 00172         | Parameter verification failed                                                                                                                                                                                                                                                                                                                                                    |
| 01001         | {0} must be greater than 0                                                                                                                                                                                                                                                                                                                                                       |
| 01002         | {0} precision must be less than or equal to {1}                                                                                                                                                                                                                                                                                                                                  |
| 01003         | {0} Duplicate data exists                                                                                                                                                                                                                                                                                                                                                        |
| 11000         | withdraw address is not in addressBook                                                                                                                                                                                                                                                                                                                                           |
| 12001         | {0} can be used at most                                                                                                                                                                                                                                                                                                                                                          |
| 12002         | Current currency {0}, limit net sell value {1} USD                                                                                                                                                                                                                                                                                                                               |
| 12003         | Current currency {0}, limit net buy value {1} USD                                                                                                                                                                                                                                                                                                                                |
| 12004         | Quote query failed, try again later                                                                                                                                                                                                                                                                                                                                              |
| 12006         | Minimum limit not reached.                                                                                                                                                                                                                                                                                                                                                       |
| 12007         | Maximum limit exceeded.                                                                                                                                                                                                                                                                                                                                                          |
| 12008         | Daily individual convert limit reached                                                                                                                                                                                                                                                                                                                                           |
| 12009         | Daily convert limit reached                                                                                                                                                                                                                                                                                                                                                      |
| 12014         | Failed to get a quote                                                                                                                                                                                                                                                                                                                                                            |
| 12017         | Contact customer service because your Convert permission is abnormal.                                                                                                                                                                                                                                                                                                            |
| 12018         | Service disruption, contact customer service for assistance.                                                                                                                                                                                                                                                                                                                     |
| 12021         | Flash quote expired                                                                                                                                                                                                                                                                                                                                                              |
| 12022         | he flash quote information has been tampered with                                                                                                                                                                                                                                                                                                                                |
| 13001         | Withdraw is too frequent                                                                                                                                                                                                                                                                                                                                                         |
| 13002         | Currency does not exist                                                                                                                                                                                                                                                                                                                                                          |
| 13004         | Your remaining withdrawal amount{0}                                                                                                                                                                                                                                                                                                                                              |
| 13005         | Failed to generate address                                                                                                                                                                                                                                                                                                                                                       |
| 13006         | The actual amount you can withdraw is {0}, and the rest is frozen for copy trade                                                                                                                                                                                                                                                                                                 |
| 13007         | The current currency is {0}, and the net purchase value of {1} USD is limited within 24 hours, and the net purchase value of {2} USD is also allowed for {3}                                                                                                                                                                                                                     |
| 13008         | Traders minimum place orderSize is {0}                                                                                                                                                                                                                                                                                                                                           |
| 13009         | Current currency {0}, 24-hour limit on net selling value {1} USD, you can also net sell {3} worth {2} USD                                                                                                                                                                                                                                                                        |
| 13010         | The order is review, cannot be cancelled.                                                                                                                                                                                                                                                                                                                                        |
| 13212         | A single withdrawal exceeds the maximum limit                                                                                                                                                                                                                                                                                                                                    |
| 19000         | Spot copy trading operation failed                                                                                                                                                                                                                                                                                                                                               |
| 20001         | startTime should be less than endTime                                                                                                                                                                                                                                                                                                                                            |
| 20002         | {0} Only one is allowed to be passed                                                                                                                                                                                                                                                                                                                                             |
| 22001         | No order to cancel                                                                                                                                                                                                                                                                                                                                                               |
| 22002         | No position to close                                                                                                                                                                                                                                                                                                                                                             |
| 22003         | modify price and size, please pass in newClientOid                                                                                                                                                                                                                                                                                                                               |
| 22004         | This symbol {0} not support API trade                                                                                                                                                                                                                                                                                                                                            |
| 22005         | This symbol does not support cross mode                                                                                                                                                                                                                                                                                                                                          |
| 22006         | limit price &gt; risk price                                                                                                                                                                                                                                                                                                                                                      |
| 22007         | limit price &lt; risk price                                                                                                                                                                                                                                                                                                                                                      |
| 22008         | market price &gt; risk price                                                                                                                                                                                                                                                                                                                                                     |
| 22009         | market price &lt; risk price                                                                                                                                                                                                                                                                                                                                                     |
| 22010         | Please bind ip whitelist address                                                                                                                                                                                                                                                                                                                                                 |
| 22011         | It is not allowed to set auto add margin in cross mode                                                                                                                                                                                                                                                                                                                           |
| 22012         | There are different business lines, {0} does not belong to {1} product                                                                                                                                                                                                                                                                                                           |
| 22013         | Abnormal status of position experience coupon                                                                                                                                                                                                                                                                                                                                    |
| 22014         | This position experience coupon does not exist                                                                                                                                                                                                                                                                                                                                   |
| 22015         | This user has no position experience coupon sub-account                                                                                                                                                                                                                                                                                                                          |
| 22016         | This user is not a sub-account for position experience coupons and cannot operate experience coupons                                                                                                                                                                                                                                                                             |
| 22017         | The position experience coupon does not support this tokenId                                                                                                                                                                                                                                                                                                                     |
| 22018         | The face value of the position experience coupon is a negative number                                                                                                                                                                                                                                                                                                            |
| 22019         | The position experience coupon has not expired yet                                                                                                                                                                                                                                                                                                                               |
| 22020         | The leverage multiple is the leverage multiple of the current position and cannot be adjusted.                                                                                                                                                                                                                                                                                   |
| 22021         | Limit orders are not supported when placing orders with position experience coupons                                                                                                                                                                                                                                                                                              |
| 22022         | The position experience coupon has been used                                                                                                                                                                                                                                                                                                                                     |
| 22023         | The trial coupon for this position has expired                                                                                                                                                                                                                                                                                                                                   |
| 22024         | The experience coupon for this position has been recycled                                                                                                                                                                                                                                                                                                                        |
| 22025         | Margin cannot be added to the experience coupon account                                                                                                                                                                                                                                                                                                                          |
| 22026         | The position mode cannot be adjusted for the experience coupon account                                                                                                                                                                                                                                                                                                           |
| 22027         | The position experience coupon does not support this currency pair                                                                                                                                                                                                                                                                                                               |
| 22028         | The position experience coupon does not support this type of order                                                                                                                                                                                                                                                                                                               |
| 22029         | Risk control, you can currently open a maximum position of {0} {1}. The risk control proportion limit for a uid is calculated including all main accounts and sub-accounts.                                                                                                                                                                                                      |
| 22030         | {0} Demo trading mode，can not use:{1}                                                                                                                                                                                                                                                                                                                                           |
| 22034         | Less than the minimum order amount                                                                                                                                                                                                                                                                                                                                               |
| 22035         | Demo account open position too frequently                                                                                                                                                                                                                                                                                                                                        |
| 22038         | Please enter the quantity as an integral multiple of {0}                                                                                                                                                                                                                                                                                                                         |
| 22039         | Limit open position when delivery is approaching.                                                                                                                                                                                                                                                                                                                                |
| 22040         | Limit open order when delivery is approaching.                                                                                                                                                                                                                                                                                                                                   |
| 22041         | Limit close order when delivery is approaching.                                                                                                                                                                                                                                                                                                                                  |
| 22042         | When a one-way position is held, trigger order cannot only reduce positions.                                                                                                                                                                                                                                                                                                     |
| 22043         | ADL processing，{0} is limit close position                                                                                                                                                                                                                                                                                                                                      |
| 22044         | ADL processing，cannot flash close Position                                                                                                                                                                                                                                                                                                                                      |
| 22045         | Insufficient liquidity in the market, please operate later                                                                                                                                                                                                                                                                                                                       |
| 22067         | ADL processing，forbid operate the symbol:{0}                                                                                                                                                                                                                                                                                                                                    |
| 31001         | The user is not a trader                                                                                                                                                                                                                                                                                                                                                         |
| 31002         | Condition {0} is not satisfied                                                                                                                                                                                                                                                                                                                                                   |
| 31003         | Parameter {0} must have a value, cannot be empty                                                                                                                                                                                                                                                                                                                                 |
| 31004         | Take profit price must be &gt; current price                                                                                                                                                                                                                                                                                                                                     |
| 31005         | Stop loss price must be &lt; current price                                                                                                                                                                                                                                                                                                                                       |
| 31006         | The order is in the process of being placed, closing of the position is not supported at the moment                                                                                                                                                                                                                                                                              |
| 31007         | Order does not exist                                                                                                                                                                                                                                                                                                                                                             |
| 31008         | There is no position in this position, no take profit or stop loss order can be made                                                                                                                                                                                                                                                                                             |
| 31009         | Tracking order status error                                                                                                                                                                                                                                                                                                                                                      |
| 31010         | Clear user prompt                                                                                                                                                                                                                                                                                                                                                                |
| 31011         | The order is not completely filled and the order is closed prompting the cancellation of the commission                                                                                                                                                                                                                                                                          |
| 31012         | Pullback greater than {0}                                                                                                                                                                                                                                                                                                                                                        |
| 31013         | Pullback range is less than {0}                                                                                                                                                                                                                                                                                                                                                  |
| 31014         | Stop gain yield greater than {0}                                                                                                                                                                                                                                                                                                                                                 |
| 31015         | Stop loss yield less than {0}                                                                                                                                                                                                                                                                                                                                                    |
| 31016         | Batch execution exception                                                                                                                                                                                                                                                                                                                                                        |
| 31017         | Maximum price limit exceeded {0}                                                                                                                                                                                                                                                                                                                                                 |
| 31018         | Minimum price change of {0}                                                                                                                                                                                                                                                                                                                                                      |
| 31019         | Support trading currency pair does not exist                                                                                                                                                                                                                                                                                                                                     |
| 31020         | Business is restricted                                                                                                                                                                                                                                                                                                                                                           |
| 31021         | The currency pair is not available for trading, please select another currency pair                                                                                                                                                                                                                                                                                              |
| 31022         | Minimum order size for this trading area is not met, please select another trading area                                                                                                                                                                                                                                                                                          |
| 31023         | Ending order processing                                                                                                                                                                                                                                                                                                                                                          |
| 31024         | The order is not completely filled, please go to \"Spot trading\"-\"Current orders\" to cancel the order and then sell or close the operation!                                                                                                                                                                                                                                   |
| 31025         | The user is not a trader                                                                                                                                                                                                                                                                                                                                                         |
| 31026         | The user is not exist                                                                                                                                                                                                                                                                                                                                                            |
| 31028         | Parameter verification failed                                                                                                                                                                                                                                                                                                                                                    |
| 31029         | User is not existed                                                                                                                                                                                                                                                                                                                                                              |
| 31030         | Chosen trading pair is empty                                                                                                                                                                                                                                                                                                                                                     |
| 31031         | You’re log in as trader,can not follow trade                                                                                                                                                                                                                                                                                                                                     |
| 31032         | Can not follow trade with yourself                                                                                                                                                                                                                                                                                                                                               |
| 31033         | Fail to remove                                                                                                                                                                                                                                                                                                                                                                   |
| 31034         | This trader’s no. of follower has reached limit, please select other trader                                                                                                                                                                                                                                                                                                      |
| 31035         | Follow order ratio can not less than{0}                                                                                                                                                                                                                                                                                                                                          |
| 31036         | Follow order ratio can not greater than{0}                                                                                                                                                                                                                                                                                                                                       |
| 31037         | Follow order count can not less than{0}                                                                                                                                                                                                                                                                                                                                          |
| 31038         | Exceeds max. limit                                                                                                                                                                                                                                                                                                                                                               |
| 31039         | Can not set reminder as your Elite Trader status has been revoked                                                                                                                                                                                                                                                                                                                |
| 31040         | T/P ratio must between {0}%%-{1}%%                                                                                                                                                                                                                                                                                                                                               |
| 31041         | S/L ratio must between {0}%%-{1}%%                                                                                                                                                                                                                                                                                                                                               |
| 31042         | The status of your Elite Trader has been suspended, please contact online customer service to resume.                                                                                                                                                                                                                                                                            |
| 31043         | Your copy trade follower cap is too high. Please contact customer support to lower it if you want to enable this function!                                                                                                                                                                                                                                                       |
| 31044         | You are applying to become a trader now. Copying trade is not allowed                                                                                                                                                                                                                                                                                                            |
| 31045         | The max. quantity for TP/SL is {0}. For any quantity exceeding this limit, please operate under “Initiated Copies”.                                                                                                                                                                                                                                                              |
| 31046         | No copy trade relationship is allowed between a parent account and its sub-account                                                                                                                                                                                                                                                                                               |
| 31047         | No copying is allowed within {0} minutes after the copier has been removed. Please try again later.                                                                                                                                                                                                                                                                              |
| 31048         | Only this trader's referrals are allowed to follow this trader at the moment. Please create an account with the trader's referral link!                                                                                                                                                                                                                                          |
| 31049         | The trader's status is abnormal or has been revoked, and cannot be viewed at this time!                                                                                                                                                                                                                                                                                          |
| 31050         | This trader UID is already set for the region.                                                                                                                                                                                                                                                                                                                                   |
| 31051         | traderUserId error                                                                                                                                                                                                                                                                                                                                                               |
| 31052         | Cannot set trading symbol that have not been opened by traders.                                                                                                                                                                                                                                                                                                                  |
| 31053         | executePrice cannot exceed triggerPrice 的{0}                                                                                                                                                                                                                                                                                                                                    |
| 31054         | No order to cancel                                                                                                                                                                                                                                                                                                                                                               |
| 31057         | user has not follow order                                                                                                                                                                                                                                                                                                                                                        |
| 40000         | Bitget is providing services to many countries and regions around the world and strictly adheres to the rules and regulatory requirements of each country and region. According to the relevant regulations, Bitget is currently unable to provide services to your region (Mainland China) and you do not have access to open positions.Apologies for any inconvenience caused! |
| 40001         | ACCESS_KEY cannot be empty                                                                                                                                                                                                                                                                                                                                                       |
| 40002         | ACCESS_SIGN cannot be empty                                                                                                                                                                                                                                                                                                                                                      |
| 40003         | Signature cannot be empty                                                                                                                                                                                                                                                                                                                                                        |
| 40005         | Invalid ACCESS_TIMESTAMP                                                                                                                                                                                                                                                                                                                                                         |
| 40006         | Invalid ACCESS_KEY                                                                                                                                                                                                                                                                                                                                                               |
| 40007         | Invalid Content_Type                                                                                                                                                                                                                                                                                                                                                             |
| 40008         | Request timestamp expired                                                                                                                                                                                                                                                                                                                                                        |
| 40009         | sign signature error                                                                                                                                                                                                                                                                                                                                                             |
| 40010         | Request timed out                                                                                                                                                                                                                                                                                                                                                                |
| 40011         | ACCESS_PASSPHRASE cannot be empty                                                                                                                                                                                                                                                                                                                                                |
| 40012         | apikey/password is incorrect                                                                                                                                                                                                                                                                                                                                                     |
| 40013         | User status is abnormal                                                                                                                                                                                                                                                                                                                                                          |
| 40014         | Incorrect permissions, need {0} permissions                                                                                                                                                                                                                                                                                                                                      |
| 40015         | System is abnormal, please try again later                                                                                                                                                                                                                                                                                                                                       |
| 40016         | The user must bind the phone or Google                                                                                                                                                                                                                                                                                                                                           |
| 40017         | Parameter verification failed {0}                                                                                                                                                                                                                                                                                                                                                |
| 40018         | Invalid IP                                                                                                                                                                                                                                                                                                                                                                       |
| 40019         | Parameter {0} cannot be empty                                                                                                                                                                                                                                                                                                                                                    |
| 40020         | Parameter {0} error                                                                                                                                                                                                                                                                                                                                                              |
| 40021         | User disable withdraw                                                                                                                                                                                                                                                                                                                                                            |
| 40022         | The business of this account has been restricted                                                                                                                                                                                                                                                                                                                                 |
| 40023         | API service has been restricted. For any inquiries, please contact customer service                                                                                                                                                                                                                                                                                              |
| 40024         | Account has been frozen                                                                                                                                                                                                                                                                                                                                                          |
| 40025         | The user does not have this permission                                                                                                                                                                                                                                                                                                                                           |
| 40026         | User is disabled                                                                                                                                                                                                                                                                                                                                                                 |
| 40027         | Withdrawals in this account area must be kyc                                                                                                                                                                                                                                                                                                                                     |
| 40028         | This subUid does not belong to this account                                                                                                                                                                                                                                                                                                                                      |
| 40029         | This account is not a Broker, please apply to become a Broker first                                                                                                                                                                                                                                                                                                              |
| 40031         | The account has been cancelled and cannot be used again                                                                                                                                                                                                                                                                                                                          |
| 40032         | The Max of sub-account created has reached the limit                                                                                                                                                                                                                                                                                                                             |
| 40033         | This email has been bound                                                                                                                                                                                                                                                                                                                                                        |
| 40034         | Parameter {0} does not exist                                                                                                                                                                                                                                                                                                                                                     |
| 40035         | Judging from your login information, you are required to complete KYC first for compliance reasons.                                                                                                                                                                                                                                                                              |
| 40036         | passphrase is error                                                                                                                                                                                                                                                                                                                                                              |
| 40037         | Apikey does not exist                                                                                                                                                                                                                                                                                                                                                            |
| 40038         | The current ip is not in the apikey ip whitelist                                                                                                                                                                                                                                                                                                                                 |
| 40039         | FD Broker's user signature error                                                                                                                                                                                                                                                                                                                                                 |
| 40040         | user api key permission setting error                                                                                                                                                                                                                                                                                                                                            |
| 40041         | User's ApiKey does not exist                                                                                                                                                                                                                                                                                                                                                     |
| 40043         | FD Broker does not exist                                                                                                                                                                                                                                                                                                                                                         |
| 40045         | The bound user cannot be an FD broker                                                                                                                                                                                                                                                                                                                                            |
| 40047         | FD Broker binding related interface call frequency limit                                                                                                                                                                                                                                                                                                                         |
| 40048         | The user's ApiKey must be the parent account                                                                                                                                                                                                                                                                                                                                     |
| 40049         | User related fields decrypt error                                                                                                                                                                                                                                                                                                                                                |
| 40051         | This account is not a FD Broker, please apply to become a FD Broker first                                                                                                                                                                                                                                                                                                        |
| 40052         | Security settings have been modified for this account. For the safety of your account, withdrawals are prohibited within 24 hours                                                                                                                                                                                                                                                |
| 40053         | Value range verification failed: {0} should be between {1}                                                                                                                                                                                                                                                                                                                       |
| 40054         | The data fetched by {0} is empty                                                                                                                                                                                                                                                                                                                                                 |
| 40055         | subName must be an English letter with a length of 8                                                                                                                                                                                                                                                                                                                             |
| 40056         | remark must be length of 1 ~ 20                                                                                                                                                                                                                                                                                                                                                  |
| 40057         | Parameter {0} {1} does not meet specification                                                                                                                                                                                                                                                                                                                                    |
| 40058         | Parameter {0} Only a maximum of {1} is allowed                                                                                                                                                                                                                                                                                                                                   |
| 40059         | Parameter {0} should be less than {1}                                                                                                                                                                                                                                                                                                                                            |
| 40060         | subNames already exists                                                                                                                                                                                                                                                                                                                                                          |
| 40061         | sub-account not allow access                                                                                                                                                                                                                                                                                                                                                     |
| 40063         | API exceeds the maximum limit added                                                                                                                                                                                                                                                                                                                                              |
| 40064         | Parameter verification failed                                                                                                                                                                                                                                                                                                                                                    |
| 40065         | This subApikey does not exist                                                                                                                                                                                                                                                                                                                                                    |
| 40066         | This subUid does not belong to the account or is not a virtual sub-account                                                                                                                                                                                                                                                                                                       |
| 40067         | Account creation failed                                                                                                                                                                                                                                                                                                                                                          |
| 40068         | Disable subaccount access                                                                                                                                                                                                                                                                                                                                                        |
| 40069         | The maximum number of sub-accounts created has been reached                                                                                                                                                                                                                                                                                                                      |
| 40070         | passphrase 8-32 characters with letters and numbers                                                                                                                                                                                                                                                                                                                              |
| 40071         | subName exist duplication                                                                                                                                                                                                                                                                                                                                                        |
| 40072         | symbol {0} is Invalid or not supported mix contract trade                                                                                                                                                                                                                                                                                                                        |
| 40074         | {0} MatchRunServer not exist                                                                                                                                                                                                                                                                                                                                                     |
| 40077         | Transfers from custody sub-accounts are only allowed between spot and contract accounts.                                                                                                                                                                                                                                                                                         |
| 40078         | Timestamp for this request is outside of the ME receiveWindow.                                                                                                                                                                                                                                                                                                                   |
| 40079         | receiveWindow timestamp must be less than 60s                                                                                                                                                                                                                                                                                                                                    |
| 40081         | Spot DEMO accounts can only access spot orders and spot plan order endpoints.                                                                                                                                                                                                                                                                                                    |
| 40086         | An error occurred when accessing the VIP private domain name. Please check whether you have applied for it.                                                                                                                                                                                                                                                                      |
| 40100         | Due to regulatory requirements, Hong Kong IPs are required to complete identity verification first                                                                                                                                                                                                                                                                               |
| 40101         | Please complete KYC                                                                                                                                                                                                                                                                                                                                                              |
| 40102         | Symbol does not exist                                                                                                                                                                                                                                                                                                                                                            |
| 40103         | based on your IP address , it appears that you are located in a country or region where we are currently unable to provide services                                                                                                                                                                                                                                              |
| 40104         | Based on your IP address , it appears that you are located in a country or region where we are currently unable to provide services                                                                                                                                                                                                                                              |
| 40104         | Unable to withdraw to this account Please make sure this is a valid and verified account                                                                                                                                                                                                                                                                                         |
| 40105         | Currently Spot Demo trade does not support this feature                                                                                                                                                                                                                                                                                                                          |
| 40107         | The subaccountName has been used                                                                                                                                                                                                                                                                                                                                                 |
| 40108         | The subaccountName has been used                                                                                                                                                                                                                                                                                                                                                 |
| 40109         | The data of the order cannot be found, please confirm the order number                                                                                                                                                                                                                                                                                                           |
| 40110         | It is currently unavailable in a demo trading                                                                                                                                                                                                                                                                                                                                    |
| 40111         | If you are located in a country where our services are restricted, please complete the KYC verification. If you have any questions, please contact customer service.                                                                                                                                                                                                             |
| 40199         | Traders are prohibited from calling the API                                                                                                                                                                                                                                                                                                                                      |
| 40200         | Server upgrade, please try again later                                                                                                                                                                                                                                                                                                                                           |
| 40301         | Permission has not been obtained yet. If you need to use it, please contact customer service                                                                                                                                                                                                                                                                                     |
| 40303         | Can only query up to 20,000 data                                                                                                                                                                                                                                                                                                                                                 |
| 40304         | clientOid or clientOrderId length cannot greater than 50                                                                                                                                                                                                                                                                                                                         |
| 40305         | clientOid or clientOrderId length cannot greater than 64, and cannot be Martian characters                                                                                                                                                                                                                                                                                       |
| 40306         | Batch processing orders can only process up to 20                                                                                                                                                                                                                                                                                                                                |
| 40309         | The contract has been removed                                                                                                                                                                                                                                                                                                                                                    |
| 40402         | orderId or clientOId format error                                                                                                                                                                                                                                                                                                                                                |
| 40404         | Request URL NOT FOUND                                                                                                                                                                                                                                                                                                                                                            |
| 40407         | The query direction is not the direction entrusted by the plan                                                                                                                                                                                                                                                                                                                   |
| 40408         | Range error                                                                                                                                                                                                                                                                                                                                                                      |
| 40409         | wrong format                                                                                                                                                                                                                                                                                                                                                                     |
| 40704         | Can only check the data of the last three months                                                                                                                                                                                                                                                                                                                                 |
| 40705         | The start and end time cannot exceed 90 days                                                                                                                                                                                                                                                                                                                                     |
| 40706         | Wrong order price                                                                                                                                                                                                                                                                                                                                                                |
| 40707         | Start time is greater than end time                                                                                                                                                                                                                                                                                                                                              |
| 40710         | The Account has been frozen.                                                                                                                                                                                                                                                                                                                                                     |
| 40714         | No direct margin call is allowed                                                                                                                                                                                                                                                                                                                                                 |
| 40715         | delegate count can not high max of open count                                                                                                                                                                                                                                                                                                                                    |
| 40716         | This trading pair not support Cross Margin mode                                                                                                                                                                                                                                                                                                                                  |
| 40717         | The number of closed positions cannot exceed the number of sheets held                                                                                                                                                                                                                                                                                                           |
| 40718         | The entrusted price of Pingduo shall not be lower than the bursting price                                                                                                                                                                                                                                                                                                        |
| 40719         | Flat empty entrustment price is not allowed to be higher than explosion price                                                                                                                                                                                                                                                                                                    |
| 40720         | swap hand depth does not exist                                                                                                                                                                                                                                                                                                                                                   |
| 40721         | Market price list is not allowed at present                                                                                                                                                                                                                                                                                                                                      |
| 40722         | Due to excessive price fluctuations and the insufficient market price entrusted cost, the opening commission is failed.                                                                                                                                                                                                                                                          |
| 40723         | The total number of unexecuted orders is too high                                                                                                                                                                                                                                                                                                                                |
| 40724         | Parameter is empty                                                                                                                                                                                                                                                                                                                                                               |
| 40725         | service return an error                                                                                                                                                                                                                                                                                                                                                          |
| 40730         | There is currently a commission or a planned commission, and the leverage cannot be adjusted                                                                                                                                                                                                                                                                                     |
| 40732         | Not currently a trader                                                                                                                                                                                                                                                                                                                                                           |
| 40734         | Failed to place an order, the minimum number of traders to open a position {0}                                                                                                                                                                                                                                                                                                   |
| 40744         | The tracking order status is wrong                                                                                                                                                                                                                                                                                                                                               |
| 40746         | The current maximum number of positions that can be closed is {0}, if you exceed the number, please go to the current order to close the position                                                                                                                                                                                                                                |
| 40748         | The commission price is higher than the highest bid price                                                                                                                                                                                                                                                                                                                        |
| 40752         | You are disabled for current business, if you have any questions, please contact customer service                                                                                                                                                                                                                                                                                |
| 40753         | The contract transaction business is disabled, if you have any questions, please contact customer service                                                                                                                                                                                                                                                                        |
| 40754         | balance not enough                                                                                                                                                                                                                                                                                                                                                               |
| 40755         | Not enough open positions are available.                                                                                                                                                                                                                                                                                                                                         |
| 40756         | The balance lock is insufficient.                                                                                                                                                                                                                                                                                                                                                |
| 40757         | Not enough position is available.                                                                                                                                                                                                                                                                                                                                                |
| 40758         | The position lock is insufficient.                                                                                                                                                                                                                                                                                                                                               |
| 40760         | Account abnormal status                                                                                                                                                                                                                                                                                                                                                          |
| 40761         | The total number of unfilled orders is too high                                                                                                                                                                                                                                                                                                                                  |
| 40762         | The order size is greater than the max open size                                                                                                                                                                                                                                                                                                                                 |
| 40764         | The remaining amount of the order is less than the current transaction volume                                                                                                                                                                                                                                                                                                    |
| 40765         | The remaining volume of the position is less than the current transaction volume                                                                                                                                                                                                                                                                                                 |
| 40766         | The number of open orders is less than this transaction volume                                                                                                                                                                                                                                                                                                                   |
| 40775         | The market-making account can only be a unilateral position type.                                                                                                                                                                                                                                                                                                                |
| 40778         | Coin pair {0} does not support {1} currency as margin                                                                                                                                                                                                                                                                                                                            |
| 40780         | There are multiple risk handling records for the same symbolId at the same time                                                                                                                                                                                                                                                                                                  |
| 40781         | The transfer order was not found                                                                                                                                                                                                                                                                                                                                                 |
| 40782         | Internal transfer error                                                                                                                                                                                                                                                                                                                                                          |
| 40783         | No gear found                                                                                                                                                                                                                                                                                                                                                                    |
| 40784         | Need to configure modify depth account                                                                                                                                                                                                                                                                                                                                           |
| 40785         | Need to configure draw line account                                                                                                                                                                                                                                                                                                                                              |
| 40788         | Internal batch transfer error                                                                                                                                                                                                                                                                                                                                                    |
| 40789         | The tokenId is duplicated in the configuration item                                                                                                                                                                                                                                                                                                                              |
| 40790         | Duplicate symbolCode in configuration item                                                                                                                                                                                                                                                                                                                                       |
| 40791         | The baseToken or quoteToken of symbolCode does not exist                                                                                                                                                                                                                                                                                                                         |
| 40792         | The symbol in the configuration item is duplicated                                                                                                                                                                                                                                                                                                                               |
| 40793         | The symbolCode of BusinessSymbol does not exist                                                                                                                                                                                                                                                                                                                                  |
| 40794         | The supportMarginToken of BusinessSymbol is not configured                                                                                                                                                                                                                                                                                                                       |
| 40798         | Insufficient contract account balance                                                                                                                                                                                                                                                                                                                                            |
| 40799         | Cannot be less than the minimum transfer amount                                                                                                                                                                                                                                                                                                                                  |
| 40800         | Insufficient amount of margin                                                                                                                                                                                                                                                                                                                                                    |
| 40801         | Cannot exceed the maximum transferable deposit amount                                                                                                                                                                                                                                                                                                                            |
| 40802         | Position is zero and direct margin call is not allowed                                                                                                                                                                                                                                                                                                                           |
| 40804         | The number of closed positions cannot exceed the number of positions held                                                                                                                                                                                                                                                                                                        |
| 40805         | Unsupported operation                                                                                                                                                                                                                                                                                                                                                            |
| 40806         | Unsupported currency                                                                                                                                                                                                                                                                                                                                                             |
| 40807         | The account does not exist                                                                                                                                                                                                                                                                                                                                                       |
| 40808         | Parameter verification exception {0}                                                                                                                                                                                                                                                                                                                                             |
| 40811         | The parameter {0} should not be null                                                                                                                                                                                                                                                                                                                                             |
| 40812         | The condition {0} is not met                                                                                                                                                                                                                                                                                                                                                     |
| 40813         | The parameter {0} must have a value and cannot be empty                                                                                                                                                                                                                                                                                                                          |
| 40814         | No change in leverage                                                                                                                                                                                                                                                                                                                                                            |
| 40815         | The order price is higher than the highest bid price                                                                                                                                                                                                                                                                                                                             |
| 40816         | The order price is lower than the lowest selling price                                                                                                                                                                                                                                                                                                                           |
| 40820         | The order price for closing a long position is not allowed to be lower than the liquidation price                                                                                                                                                                                                                                                                                |
| 40821         | The closing order price cannot be higher than the liquidation price                                                                                                                                                                                                                                                                                                              |
| 40822         | The contract configuration does not exist                                                                                                                                                                                                                                                                                                                                        |
| 40823         | The transaction or reasonable marked price does not exist                                                                                                                                                                                                                                                                                                                        |
| 40824         | Currently, it is not allowed to list market orders                                                                                                                                                                                                                                                                                                                               |
| 40825         | Contract opponent depth does not exist                                                                                                                                                                                                                                                                                                                                           |
| 40826         | Due to excessive price fluctuations, the market order cost is insufficient, and the position opening order failed.                                                                                                                                                                                                                                                               |
| 40827         | The bonus is not allowed to hold two-way positions                                                                                                                                                                                                                                                                                                                               |
| 40828         | Special market making accounts cannot manually place orders                                                                                                                                                                                                                                                                                                                      |
| 40829         | The take profit price of a long position should be greater than the average open price                                                                                                                                                                                                                                                                                           |
| 40830         | The take profit price of the long position should be greater than the current price                                                                                                                                                                                                                                                                                              |
| 40831         | The short position take profit price should be less than the average open price                                                                                                                                                                                                                                                                                                  |
| 40832         | The take profit price of short positions should be less than the current price                                                                                                                                                                                                                                                                                                   |
| 40833         | The stop loss price of a long position should be less than the average opening price                                                                                                                                                                                                                                                                                             |
| 40834         | The stop loss price of the long position should be less than the current price                                                                                                                                                                                                                                                                                                   |
| 40835         | The stop loss price of the short position should be greater than the average opening price                                                                                                                                                                                                                                                                                       |
| 40836         | The stop loss price of the short position should be greater than the current price                                                                                                                                                                                                                                                                                               |
| 40837         | There is no position in this position, so stop-profit and stop-loss orders cannot be made                                                                                                                                                                                                                                                                                        |
| 40838         | There is no position in this position, and automatic margin call cannot be set                                                                                                                                                                                                                                                                                                   |
| 40839         | The automatic margin call function of this contract has been suspended                                                                                                                                                                                                                                                                                                           |
| 40840         | Duplicate shard market making account                                                                                                                                                                                                                                                                                                                                            |
| 40841         | Online environment does not allow execution                                                                                                                                                                                                                                                                                                                                      |
| 40842         | Current configuration does not allow adjustment, please try again later                                                                                                                                                                                                                                                                                                          |
| 40843         | no_datasource_key_exists                                                                                                                                                                                                                                                                                                                                                         |
| 40844         | This contract is under temporary maintenance                                                                                                                                                                                                                                                                                                                                     |
| 40845         | This contract has been removed                                                                                                                                                                                                                                                                                                                                                   |
| 40846         | Status verification abnormal                                                                                                                                                                                                                                                                                                                                                     |
| 40847         | The operation cannot be performed                                                                                                                                                                                                                                                                                                                                                |
| 40848         | Cannot open a copy transaction if there is a position                                                                                                                                                                                                                                                                                                                            |
| 40850         | The copy is in progress, the balance cannot be transferred                                                                                                                                                                                                                                                                                                                       |
| 40851         | Account status is wrong, cannot end copying                                                                                                                                                                                                                                                                                                                                      |
| 40852         | There are unfilled orders, cannot end the copy                                                                                                                                                                                                                                                                                                                                   |
| 40853         | There is an unexecuted plan order, cannot end the copy                                                                                                                                                                                                                                                                                                                           |
| 40854         | This product does not support copy trading                                                                                                                                                                                                                                                                                                                                       |
| 40855         | The user has ended copying and cannot end copying again                                                                                                                                                                                                                                                                                                                          |
| 40856         | Data abnormal                                                                                                                                                                                                                                                                                                                                                                    |
| 40857         | Document number error                                                                                                                                                                                                                                                                                                                                                            |
| 40858         | Error tracking order status                                                                                                                                                                                                                                                                                                                                                      |
| 40859         | This order is being closed and cannot be closed again                                                                                                                                                                                                                                                                                                                            |
| 40860         | The trader does not exist and cannot be set to follow                                                                                                                                                                                                                                                                                                                            |
| 40861         | The trader has been disabled and cannot be set to follow                                                                                                                                                                                                                                                                                                                         |
| 40862         | Please cancel the current order                                                                                                                                                                                                                                                                                                                                                  |
| 40863         | Please cancel the current plan                                                                                                                                                                                                                                                                                                                                                   |
| 40864         | Please close the current position with orders                                                                                                                                                                                                                                                                                                                                    |
| 40865         | This order is being commissioned, and it is not currently supported to close the position                                                                                                                                                                                                                                                                                        |
| 40866         | You are currently a trader, please close the position under the current order                                                                                                                                                                                                                                                                                                    |
| 40867         | Currently the maximum number of positions that can be closed is {0}, please go to the current order to close the position if the amount exceeds                                                                                                                                                                                                                                  |
| 40868         | You are currently a trader and currently do not support liquidation through planned orders                                                                                                                                                                                                                                                                                       |
| 40869         | You are currently a trader and currently do not support modification of leverage                                                                                                                                                                                                                                                                                                 |
| 40871         | The leverage does not meet the configuration, and you cannot become a trader                                                                                                                                                                                                                                                                                                     |
| 40872         | Failed to adjust position, currently holding position or order or plan order                                                                                                                                                                                                                                                                                                     |
| 40873         | The account has a margin and needs to be transferred out                                                                                                                                                                                                                                                                                                                         |
| 40874         | Whole position mode does not support automatic margin call                                                                                                                                                                                                                                                                                                                       |
| 40875         | Whole position mode does not support margin adjustment                                                                                                                                                                                                                                                                                                                           |
| 40877         | Too many follow-up orders                                                                                                                                                                                                                                                                                                                                                        |
| 40878         | The contract index data is abnormal. In order to avoid causing your loss, please try again later.                                                                                                                                                                                                                                                                                |
| 40879         | The risk is being processed, and the funds cannot be adjusted.                                                                                                                                                                                                                                                                                                                   |
| 40880         | The risk is being processed and the leverage cannot be adjusted.                                                                                                                                                                                                                                                                                                                 |
| 40887         | Failed to place the order, the number of single lightning open positions is at most {0}                                                                                                                                                                                                                                                                                          |
| 40888         | Failed to place the order, the maximum amount of single lightning closing is {0}                                                                                                                                                                                                                                                                                                 |
| 40889         | The plan order of this contract has reached the upper limit                                                                                                                                                                                                                                                                                                                      |
| 40890         | The order of stop-profit and stop-loss for this contract has reached the upper limit                                                                                                                                                                                                                                                                                             |
| 40891         | Insufficient position, can not set take profit or stop loss                                                                                                                                                                                                                                                                                                                      |
| 40892         | Failed to place the order, the minimum number of positions opened by the trader is {0}                                                                                                                                                                                                                                                                                           |
| 40893         | Unable to update the leverage factor of this position, there is not enough margin!                                                                                                                                                                                                                                                                                               |
| 40894         | The documentary closing has been processed                                                                                                                                                                                                                                                                                                                                       |
| 40895         | The preset price does not match the order/execution price                                                                                                                                                                                                                                                                                                                        |
| 40896         | The default stop profit and stop loss has been partially fulfilled and cannot be modified                                                                                                                                                                                                                                                                                        |
| 40897         | The system experience gold account does not exist                                                                                                                                                                                                                                                                                                                                |
| 40898         | The system experience gold account balance is insufficient                                                                                                                                                                                                                                                                                                                       |
| 40899         | The number of stored users exceeds the limit                                                                                                                                                                                                                                                                                                                                     |
| 40900         | The system experience gold account is inconsistent                                                                                                                                                                                                                                                                                                                               |
| 40901         | The contract experience fund balance is insufficient                                                                                                                                                                                                                                                                                                                             |
| 40902         | Future time is not allowed                                                                                                                                                                                                                                                                                                                                                       |
| 40903         | Failed to obtain leverage information                                                                                                                                                                                                                                                                                                                                            |
| 40904         | Failed to collect funds                                                                                                                                                                                                                                                                                                                                                          |
| 40905         | Failed to collect user funds                                                                                                                                                                                                                                                                                                                                                     |
| 40906         | Failed to pay user funds                                                                                                                                                                                                                                                                                                                                                         |
| 40907         | The payment cannot be transferred                                                                                                                                                                                                                                                                                                                                                |
| 40908         | Concurrent operation failed                                                                                                                                                                                                                                                                                                                                                      |
| 40909         | Transfer processing                                                                                                                                                                                                                                                                                                                                                              |
| 40910         | Operation timed out                                                                                                                                                                                                                                                                                                                                                              |
| 40912         | single cancel cannot exceed 50                                                                                                                                                                                                                                                                                                                                                   |
| 40913         | {0} must be passed one                                                                                                                                                                                                                                                                                                                                                           |
| 40914         | Trader the maximum leverage can use is {0}                                                                                                                                                                                                                                                                                                                                       |
| 40915         | Long position take profit price please &gt; mark price                                                                                                                                                                                                                                                                                                                           |
| 40916         | Futures services for this account have been restricted.                                                                                                                                                                                                                                                                                                                          |
| 40917         | Stop price for long positions please &lt; mark price {0}                                                                                                                                                                                                                                                                                                                         |
| 40918         | Traders open positions with orders too frequently                                                                                                                                                                                                                                                                                                                                |
| 40919         | This function is not open yet                                                                                                                                                                                                                                                                                                                                                    |
| 40920         | Position or order exists, the position mode cannot be switched                                                                                                                                                                                                                                                                                                                   |
| 40921         | The order size cannot exceed the maximum size of the positionLevel                                                                                                                                                                                                                                                                                                               |
| 40922         | Only work order modifications are allowed                                                                                                                                                                                                                                                                                                                                        |
| 40923         | Order size and price have not changed                                                                                                                                                                                                                                                                                                                                            |
| 40924         | orderId and clientOid must have one                                                                                                                                                                                                                                                                                                                                              |
| 40925         | price or size must be passed in together                                                                                                                                                                                                                                                                                                                                         |
| 40927         | The return field type or dest of this order does not meet expectations                                                                                                                                                                                                                                                                                                           |
| 40928         | Risk control, currently your max open size is {0} {1}. The size was calculated with all the main-sub accounts                                                                                                                                                                                                                                                                    |
| 40929         | TraderPro Maximum leverage is {0}X                                                                                                                                                                                                                                                                                                                                               |
| 40930         | The remaining quantity for your normal order is {0}{1}, and the quantity for post only order is {2}{3}                                                                                                                                                                                                                                                                           |
| 40931         | Trigger the risk control of position closing , prohibiting position closing                                                                                                                                                                                                                                                                                                      |
| 40936         | The received red envelope of {1} USDT is restricted from transfer for 24 hours; the {0} USDT purchased via OTC is restricted from transfer for 24 hours; {2} USDT is temporarily frozen as the recharge has not reached the required number of confirmations                                                                                                                     |
| 40937         | Your available withdrawal amount is {0}                                                                                                                                                                                                                                                                                                                                          |
| 40939         | Reducing positions only will decrease your position. Please cancel or modify the original pending order first before placing a new order                                                                                                                                                                                                                                         |
| 41002         | param error {0}                                                                                                                                                                                                                                                                                                                                                                  |
| 41100         | error {0}                                                                                                                                                                                                                                                                                                                                                                        |
| 41101         | param {0} error                                                                                                                                                                                                                                                                                                                                                                  |
| 41103         | param {0} error                                                                                                                                                                                                                                                                                                                                                                  |
| 41104         | Unsupported coin: {0}                                                                                                                                                                                                                                                                                                                                                            |
| 41113         | symbol is offline                                                                                                                                                                                                                                                                                                                                                                |
| 41114         | The current trading pair is under maintenance, please refer to the official announcement for the opening time                                                                                                                                                                                                                                                                    |
| 42013         | transfer fail                                                                                                                                                                                                                                                                                                                                                                    |
| 42014         | The current currency does not support deposit                                                                                                                                                                                                                                                                                                                                    |
| 42015         | The current currency does not support withdrawal                                                                                                                                                                                                                                                                                                                                 |
| 42016         | symbol {0} is Invalid or not supported spot trade                                                                                                                                                                                                                                                                                                                                |
| 42017         | The current chain does not support deposit the coin                                                                                                                                                                                                                                                                                                                              |
| 42072         | Param endTime cannot be earlier than startTime                                                                                                                                                                                                                                                                                                                                   |
| 43001         | The order does not exist                                                                                                                                                                                                                                                                                                                                                         |
| 43002         | Pending order failed                                                                                                                                                                                                                                                                                                                                                             |
| 43003         | Pending order failed                                                                                                                                                                                                                                                                                                                                                             |
| 43004         | There is no order to cancel                                                                                                                                                                                                                                                                                                                                                      |
| 43005         | Exceed the maximum number of orders                                                                                                                                                                                                                                                                                                                                              |
| 43006         | The order quantity is less than the minimum transaction quantity                                                                                                                                                                                                                                                                                                                 |
| 43007         | The order quantity is greater than the maximum transaction quantity                                                                                                                                                                                                                                                                                                              |
| 43008         | The current order price cannot be less than {0}{1}                                                                                                                                                                                                                                                                                                                               |
| 43009         | The current order price exceeds the limit {0}{1}                                                                                                                                                                                                                                                                                                                                 |
| 43010         | The transaction amount cannot be less than {0}{1}                                                                                                                                                                                                                                                                                                                                |
| 43011         | The parameter does not meet the specification {0}                                                                                                                                                                                                                                                                                                                                |
| 43012         | Insufficient balance                                                                                                                                                                                                                                                                                                                                                             |
| 43013         | Take profit price needs&gt; current price                                                                                                                                                                                                                                                                                                                                        |
| 43014         | Take profit price needs to be &lt;current price                                                                                                                                                                                                                                                                                                                                  |
| 43015         | Stop loss price needs to be &lt;current price                                                                                                                                                                                                                                                                                                                                    |
| 43016         | Stop loss price needs to be&gt; current price                                                                                                                                                                                                                                                                                                                                    |
| 43017         | You are currently a trader and currently do not support liquidation through planned orders                                                                                                                                                                                                                                                                                       |
| 43020         | Stop profit and stop loss order does not exist                                                                                                                                                                                                                                                                                                                                   |
| 43021         | The stop-profit and stop-loss order has been closed                                                                                                                                                                                                                                                                                                                              |
| 43022         | Failed to trigger the default stop loss                                                                                                                                                                                                                                                                                                                                          |
| 43023         | Insufficient position, can not set profit or stop loss                                                                                                                                                                                                                                                                                                                           |
| 43024         | Take profit/stop loss in an existing order, please change it after canceling all                                                                                                                                                                                                                                                                                                 |
| 43025         | Plan order does not exist                                                                                                                                                                                                                                                                                                                                                        |
| 43026         | The planned order has been closed                                                                                                                                                                                                                                                                                                                                                |
| 43027         | The minimum order value {0} is not met                                                                                                                                                                                                                                                                                                                                           |
| 43028         | Please enter an integer multiple of {0} for price                                                                                                                                                                                                                                                                                                                                |
| 43029         | The size of the current Order &gt; the maximum number of positions that can be closed                                                                                                                                                                                                                                                                                            |
| 43030         | Take profit order already existed                                                                                                                                                                                                                                                                                                                                                |
| 43031         | Stop loss order already existed                                                                                                                                                                                                                                                                                                                                                  |
| 43032         | rangeRate is smaller than {0}                                                                                                                                                                                                                                                                                                                                                    |
| 43033         | Trailing order does not exist                                                                                                                                                                                                                                                                                                                                                    |
| 43034         | The trigger price should be ≤ the current market price                                                                                                                                                                                                                                                                                                                           |
| 43035         | The trigger price should be ≥ the current market price                                                                                                                                                                                                                                                                                                                           |
| 43036         | Trader modify tpsl can only be operated once within 300ms                                                                                                                                                                                                                                                                                                                        |
| 43037         | The minimum order amount allowed for trading is {0}                                                                                                                                                                                                                                                                                                                              |
| 43038         | The maximum order amount allowed for trading is {0}                                                                                                                                                                                                                                                                                                                              |
| 43039         | Maximum price limit exceeded {0}                                                                                                                                                                                                                                                                                                                                                 |
| 43040         | Minimum price limit exceeded {0}                                                                                                                                                                                                                                                                                                                                                 |
| 43041         | Maximum transaction amount {0}                                                                                                                                                                                                                                                                                                                                                   |
| 43042         | Minimum transaction amount {0}                                                                                                                                                                                                                                                                                                                                                   |
| 43043         | There is no position                                                                                                                                                                                                                                                                                                                                                             |
| 43044         | The follow order status error                                                                                                                                                                                                                                                                                                                                                    |
| 43045         | The trader is ful                                                                                                                                                                                                                                                                                                                                                                |
| 43047         | Followers are not allowed to follow again within xx minutes after being removed, please try again later!                                                                                                                                                                                                                                                                         |
| 43048         | The symbol is null                                                                                                                                                                                                                                                                                                                                                               |
| 43049         | Margin coin is not allowed                                                                                                                                                                                                                                                                                                                                                       |
| 43050         | Leverage exceeds the effective range                                                                                                                                                                                                                                                                                                                                             |
| 43051         | Maximum limit exceeded                                                                                                                                                                                                                                                                                                                                                           |
| 43052         | Follow order count can not less than {0}                                                                                                                                                                                                                                                                                                                                         |
| 43053         | The copy ratio cannot exceed {0}                                                                                                                                                                                                                                                                                                                                                 |
| 43054         | The copy ratio cannot be less than {0}                                                                                                                                                                                                                                                                                                                                           |
| 43055         | The take loss ratio must be between {0}-{1}                                                                                                                                                                                                                                                                                                                                      |
| 43056         | The take profit ratio must be between {0}-{1}                                                                                                                                                                                                                                                                                                                                    |
| 43057         | It is not allowed to bring orders or copy orders between sub-accounts                                                                                                                                                                                                                                                                                                            |
| 43058         | Parameter verification failed                                                                                                                                                                                                                                                                                                                                                    |
| 43059         | Request failed, please try again                                                                                                                                                                                                                                                                                                                                                 |
| 43060         | Sort rule must send                                                                                                                                                                                                                                                                                                                                                              |
| 43061         | Sort Flag must send                                                                                                                                                                                                                                                                                                                                                              |
| 43062         | not to follow                                                                                                                                                                                                                                                                                                                                                                    |
| 43063         | Can not follow trade with yourself                                                                                                                                                                                                                                                                                                                                               |
| 43064         | Tracking order status error                                                                                                                                                                                                                                                                                                                                                      |
| 43065         | Tracking No does not exist                                                                                                                                                                                                                                                                                                                                                       |
| 43066         | The trader failed to remove the follower                                                                                                                                                                                                                                                                                                                                         |
| 43067         | The loaded data has reached the upper limit, and the maximum support for loading {0} data                                                                                                                                                                                                                                                                                        |
| 43068         | The status of the current follower is abnormal and removal is not allowed for now                                                                                                                                                                                                                                                                                                |
| 43069         | A follower account can only be removed when its equity is lower than {0} USDT                                                                                                                                                                                                                                                                                                    |
| 43071         | Trigger order limit for a single trading pair is {0}                                                                                                                                                                                                                                                                                                                             |
| 43075         | Position pattern mismatch                                                                                                                                                                                                                                                                                                                                                        |
| 43111         | param error {0}                                                                                                                                                                                                                                                                                                                                                                  |
| 43112         | The amount of coins withdrawn is less than the handling fee {0}                                                                                                                                                                                                                                                                                                                  |
| 43113         | The daily limit {0} is exceeded in a single transaction                                                                                                                                                                                                                                                                                                                          |
| 43114         | Withdrawal is less than the minimum withdrawal count {0}                                                                                                                                                                                                                                                                                                                         |
| 43115         | The current trading pair is opening soon, please refer to the official announcement for the opening time                                                                                                                                                                                                                                                                         |
| 43116         | This chain requires a tag to withdraw coins                                                                                                                                                                                                                                                                                                                                      |
| 43117         | Exceeds the maximum amount that can be transferred                                                                                                                                                                                                                                                                                                                               |
| 43118         | clientOrderId duplicate                                                                                                                                                                                                                                                                                                                                                          |
| 43119         | Trading is not open                                                                                                                                                                                                                                                                                                                                                              |
| 43120         | symbol is not open trade                                                                                                                                                                                                                                                                                                                                                         |
| 43121         | Withdrawal address cannot be your own                                                                                                                                                                                                                                                                                                                                            |
| 43122         | The purchase limit of this currency is {0}, and there is still {1} left                                                                                                                                                                                                                                                                                                          |
| 43123         | param error {0}                                                                                                                                                                                                                                                                                                                                                                  |
| 43124         | withdraw step is error                                                                                                                                                                                                                                                                                                                                                           |
| 43125         | No more than 8 decimal places                                                                                                                                                                                                                                                                                                                                                    |
| 43126         | This currency does not support withdrawals                                                                                                                                                                                                                                                                                                                                       |
| 43127         | Sub transfer not by main account, or main/sub relationship error                                                                                                                                                                                                                                                                                                                 |
| 43128         | Exceeded the limit of the maximum number of orders for the total transaction pair {0}                                                                                                                                                                                                                                                                                            |
| 43129         | Transfer coin not support or invalid coin                                                                                                                                                                                                                                                                                                                                        |
| 43130         | StartTime params error                                                                                                                                                                                                                                                                                                                                                           |
| 43131         | Current currency: {0} does not support convert                                                                                                                                                                                                                                                                                                                                   |
| 43132         | {0}Insufficient funds                                                                                                                                                                                                                                                                                                                                                            |
| 43134         | Transfers from custody sub-accounts are only allow transfers from spot accounts                                                                                                                                                                                                                                                                                                  |
| 43136         | The transferred account is frozen                                                                                                                                                                                                                                                                                                                                                |
| 43137         | Transfer in progress                                                                                                                                                                                                                                                                                                                                                             |
| 45001         | Unknown error                                                                                                                                                                                                                                                                                                                                                                    |
| 45002         | Insufficient asset                                                                                                                                                                                                                                                                                                                                                               |
| 45003         | Insufficient position                                                                                                                                                                                                                                                                                                                                                            |
| 45004         | Insufficient lock-in asset                                                                                                                                                                                                                                                                                                                                                       |
| 45005         | Insufficient available positions                                                                                                                                                                                                                                                                                                                                                 |
| 45006         | Insufficient position                                                                                                                                                                                                                                                                                                                                                            |
| 45007         | Insufficient lock position                                                                                                                                                                                                                                                                                                                                                       |
| 45008         | No assets                                                                                                                                                                                                                                                                                                                                                                        |
| 45009         | The account is at risk and cannot perform trades temporarily                                                                                                                                                                                                                                                                                                                     |
| 45011         | Order remaining volume &lt; Current transaction volume                                                                                                                                                                                                                                                                                                                           |
| 45012         | Remaining volume of position &lt; Volume of current transaction                                                                                                                                                                                                                                                                                                                  |
| 45013         | The number of open orders &lt; Current transaction volume                                                                                                                                                                                                                                                                                                                        |
| 45014         | Position does not exist during opening                                                                                                                                                                                                                                                                                                                                           |
| 45017         | Settlement or the coin for transaction configuration not found                                                                                                                                                                                                                                                                                                                   |
| 45018         | In the case of a netting, you cannot have a liquidation order                                                                                                                                                                                                                                                                                                                    |
| 45019         | Account does not exist                                                                                                                                                                                                                                                                                                                                                           |
| 45020         | Liquidation can only occur under two-way positions                                                                                                                                                                                                                                                                                                                               |
| 45021         | When one-way position is held, the order type must also be one-way position type                                                                                                                                                                                                                                                                                                 |
| 45023         | Error creating order                                                                                                                                                                                                                                                                                                                                                             |
| 45024         | Cancel order error                                                                                                                                                                                                                                                                                                                                                               |
| 45025         | The currency pair does not support the currency as a margin                                                                                                                                                                                                                                                                                                                      |
| 45026         | Please check that the correct delegateType is used                                                                                                                                                                                                                                                                                                                               |
| 45031         | The order is finalized                                                                                                                                                                                                                                                                                                                                                           |
| 45034         | clientOid duplicate                                                                                                                                                                                                                                                                                                                                                              |
| 45035         | Price step mismatch                                                                                                                                                                                                                                                                                                                                                              |
| 45043         | Due to settlement or maintenance reasons, the trade is suspended                                                                                                                                                                                                                                                                                                                 |
| 45044         | Leverage is not within the suitable range after adjustment                                                                                                                                                                                                                                                                                                                       |
| 45045         | Exceeds the maximum possible leverage                                                                                                                                                                                                                                                                                                                                            |
| 45047         | Reduce the leverage and the amount of additional margin is incorrect                                                                                                                                                                                                                                                                                                             |
| 45051         | Execution price parameter verification is abnormal                                                                                                                                                                                                                                                                                                                               |
| 45052         | Trigger price parameter verification anbormal                                                                                                                                                                                                                                                                                                                                    |
| 45054         | No change in leverage                                                                                                                                                                                                                                                                                                                                                            |
| 45055         | The current order status cannot be cancelled                                                                                                                                                                                                                                                                                                                                     |
| 45056         | The current order type cannot be cancelled                                                                                                                                                                                                                                                                                                                                       |
| 45057         | The order does not exist!                                                                                                                                                                                                                                                                                                                                                        |
| 45060         | TP price of long position &gt; Current price {0}                                                                                                                                                                                                                                                                                                                                 |
| 45061         | TP price of short position &lt; Current price {0}                                                                                                                                                                                                                                                                                                                                |
| 45062         | SL price of long position &lt; Current price {0}                                                                                                                                                                                                                                                                                                                                 |
| 45064         | TP price of long position &gt; order price {0}                                                                                                                                                                                                                                                                                                                                   |
| 45065         | TP price of short position &lt; order price {0}                                                                                                                                                                                                                                                                                                                                  |
| 45066         | SL price of long position &lt; order price {0}                                                                                                                                                                                                                                                                                                                                   |
| 45067         | SL price of short position &gt; order price {0}                                                                                                                                                                                                                                                                                                                                  |
| 45068         | There is no position temporarily, and the order of TP and SL cannot be carried out                                                                                                                                                                                                                                                                                               |
| 45075         | The user already has an ongoing copy trade                                                                                                                                                                                                                                                                                                                                       |
| 45082         | Copy trade number error                                                                                                                                                                                                                                                                                                                                                          |
| 45089         | You are currently copy trading, leverage cannot be changed                                                                                                                                                                                                                                                                                                                       |
| 45091         | Too many tracking orders                                                                                                                                                                                                                                                                                                                                                         |
| 45097         | There is currently an order or a limit order, and the leverage cannot be adjusted                                                                                                                                                                                                                                                                                                |
| 45098         | You are currently a trader and cannot be switched to the full position mode                                                                                                                                                                                                                                                                                                      |
| 45099         | When there are different coins, it cannot be adjusted to Isolated Margin mode                                                                                                                                                                                                                                                                                                    |
| 45100         | When a one-way position is held, it cannot be adjusted to the Isolated Margin mode                                                                                                                                                                                                                                                                                               |
| 45101         | In Isolated Margin mode, it cannot be adjusted to a one-way position                                                                                                                                                                                                                                                                                                             |
| 45102         | In the full position mode, the automatic margin call cannot be adjusted                                                                                                                                                                                                                                                                                                          |
| 45103         | Failed to place the order, the maximum amount of single flash opening position is %s                                                                                                                                                                                                                                                                                             |
| 45104         | Failed to place the order, the maximum amount of single flash closing position is %s                                                                                                                                                                                                                                                                                             |
| 45107         | API is restricted to open positions. If you have any questions, please contact our customer service                                                                                                                                                                                                                                                                              |
| 45108         | API is restricted to close position. If you have any questions, please contact our customer service                                                                                                                                                                                                                                                                              |
| 45109         | The current account is a two-way position                                                                                                                                                                                                                                                                                                                                        |
| 45110         | less than the minimum amount {0} USDT                                                                                                                                                                                                                                                                                                                                            |
| 45111         | less than the minimum order quantity                                                                                                                                                                                                                                                                                                                                             |
| 45112         | more than the maximum order quantity                                                                                                                                                                                                                                                                                                                                             |
| 45113         | Maximum order value limit triggered                                                                                                                                                                                                                                                                                                                                              |
| 45114         | The minimum order requirement is not met                                                                                                                                                                                                                                                                                                                                         |
| 45115         | The price you enter should be a multiple of {0}                                                                                                                                                                                                                                                                                                                                  |
| 45116         | The count of positions hold by the account exceeds the maximum count {0}                                                                                                                                                                                                                                                                                                         |
| 45117         | Currently holding positions or orders, the margin mode cannot be adjusted                                                                                                                                                                                                                                                                                                        |
| 45118         | Reached the upper limit of the order of transactions (the current number of order + the current number of orders) {0}                                                                                                                                                                                                                                                            |
| 45119         | This symbol does not support position opening operation                                                                                                                                                                                                                                                                                                                          |
| 45120         | size &gt; max can open order size                                                                                                                                                                                                                                                                                                                                                |
| 45121         | The reasonable mark price deviates too much from the market, and your current leveraged position opening risk is high                                                                                                                                                                                                                                                            |
| 45122         | Short position stop loss price please &gt; mark price {0}                                                                                                                                                                                                                                                                                                                        |
| 45123         | Insufficient availability, currently only market orders can be placed                                                                                                                                                                                                                                                                                                            |
| 45124         | Please edit and submit again.                                                                                                                                                                                                                                                                                                                                                    |
| 45127         | Position brackets disabled TP SL                                                                                                                                                                                                                                                                                                                                                 |
| 45128         | Position brackets disabled modify qty                                                                                                                                                                                                                                                                                                                                            |
| 45129         | Cancel order is too frequent, the same orderId is only allowed to be canceled once in a second                                                                                                                                                                                                                                                                                   |
| 46013         | This symbol limits the selling amount{0}，Remaining{0}                                                                                                                                                                                                                                                                                                                           |
| 47001         | Currency recharge is not enabled                                                                                                                                                                                                                                                                                                                                                 |
| 47002         | Address verification failed                                                                                                                                                                                                                                                                                                                                                      |
| 47003         | Withdraw address is not in addressBook                                                                                                                                                                                                                                                                                                                                           |
| 48001         | Parameter validation failed {0}                                                                                                                                                                                                                                                                                                                                                  |
| 48002         | Missing request Parameter                                                                                                                                                                                                                                                                                                                                                        |
| 49000         | apiKey and userId mismatch                                                                                                                                                                                                                                                                                                                                                       |
| 49001         | not custody account, operation deny                                                                                                                                                                                                                                                                                                                                              |
| 49002         | missing http header: ACCESS-BROKER-KEY or ACCESS-BROKER-SIGN                                                                                                                                                                                                                                                                                                                     |
| 49003         | illegal IP, access deny                                                                                                                                                                                                                                                                                                                                                          |
| 49004         | illegal ACCESS-BROKER-KEY                                                                                                                                                                                                                                                                                                                                                        |
| 49005         | access deny: sub account                                                                                                                                                                                                                                                                                                                                                         |
| 49006         | ACCESS-BROKER-SIGN check sign fail                                                                                                                                                                                                                                                                                                                                               |
| 49007         | account is unbound                                                                                                                                                                                                                                                                                                                                                               |
| 49008         | account is bound                                                                                                                                                                                                                                                                                                                                                                 |
| 49009         | clientUserId check mismatch with the bound user ID                                                                                                                                                                                                                                                                                                                               |
| 49010         | account: {0} still have assets: {1}                                                                                                                                                                                                                                                                                                                                              |
| 49011         | kyc must be done before bind                                                                                                                                                                                                                                                                                                                                                     |
| 49021         | operation accepted                                                                                                                                                                                                                                                                                                                                                               |
| 49022         | access deny                                                                                                                                                                                                                                                                                                                                                                      |
| 49023         | insufficient fund                                                                                                                                                                                                                                                                                                                                                                |
| 49024         | {0} decimal precision error                                                                                                                                                                                                                                                                                                                                                      |
| 49025         | Parameter mismatch with the initial requestId, request body: {0}                                                                                                                                                                                                                                                                                                                 |
| 49026         | {0} maximum {1} digits                                                                                                                                                                                                                                                                                                                                                           |
| 49030         | custody account, operation deny                                                                                                                                                                                                                                                                                                                                                  |
| 49040         | Unknown Error                                                                                                                                                                                                                                                                                                                                                                    |
| 49050         | unsupported chain                                                                                                                                                                                                                                                                                                                                                                |
| 49051         | Missing callback signature request header                                                                                                                                                                                                                                                                                                                                        |
| 49052         | callback signature verification failed                                                                                                                                                                                                                                                                                                                                           |
| 49053         | can not bind other platforms                                                                                                                                                                                                                                                                                                                                                     |
| 49060         | The switch of adding money to cobo is not turned on                                                                                                                                                                                                                                                                                                                              |
| 49061         | The custody currency is not allowed                                                                                                                                                                                                                                                                                                                                              |
| 49062         | fundId is invalid or not exist {0}                                                                                                                                                                                                                                                                                                                                               |
| 49063         | The custody currency already exists                                                                                                                                                                                                                                                                                                                                              |
| 49064         | Insufficient amount of shadow account                                                                                                                                                                                                                                                                                                                                            |
| 49065         | User withdrawal address already exists                                                                                                                                                                                                                                                                                                                                           |
| 49066         | The switch of cobo money reduction is not turned on                                                                                                                                                                                                                                                                                                                              |
| 49067         | fundSupplementId is invalid {0}                                                                                                                                                                                                                                                                                                                                                  |
| 49068         | No currency available for settlement                                                                                                                                                                                                                                                                                                                                             |
| 49069         | There is an unfinished fund process, which cannot be cleared and settled                                                                                                                                                                                                                                                                                                         |
| 49070         | Clearing settlement must include all currencies                                                                                                                                                                                                                                                                                                                                  |
| 49071         | fundSettlementId is invalid {0}                                                                                                                                                                                                                                                                                                                                                  |
| 49072         | Failed to get user assets                                                                                                                                                                                                                                                                                                                                                        |
| 49073         | Confirm that the set of fundIds receivable for clearing and settlement is not all fundIds                                                                                                                                                                                                                                                                                        |
| 49074         | The settlement process has not been completed, and fund operations cannot be performed                                                                                                                                                                                                                                                                                           |
| 49075         | Failed to query the address list of bg clearing and settlement account                                                                                                                                                                                                                                                                                                           |
| 49076         | cobo callback params error                                                                                                                                                                                                                                                                                                                                                       |
| 49077         | Failed to call the cobo transaction query interface                                                                                                                                                                                                                                                                                                                              |
| 49078         | cobo withdrawal transaction callback requestId is invalid {0}                                                                                                                                                                                                                                                                                                                    |
| 49079         | supplement type illegal                                                                                                                                                                                                                                                                                                                                                          |
| 49080         | cobo confirms settlement, txId is invalid                                                                                                                                                                                                                                                                                                                                        |
| 49081         | Request amount parameter error                                                                                                                                                                                                                                                                                                                                                   |
| 50001         | coin {0} does not support cross                                                                                                                                                                                                                                                                                                                                                  |
| 50002         | symbol {0} does not support isolated                                                                                                                                                                                                                                                                                                                                             |
| 50003         | coin {0} does not support isolated                                                                                                                                                                                                                                                                                                                                               |
| 50004         | symbol {0} does not support cross                                                                                                                                                                                                                                                                                                                                                |
| 50011         | Parameter verification error                                                                                                                                                                                                                                                                                                                                                     |
| 50012         | The account has been suspended or deleted. Please contact our Customer Support                                                                                                                                                                                                                                                                                                   |
| 50013         | The account has been suspended and deleted. Please contact our Customer Support                                                                                                                                                                                                                                                                                                  |
| 50014         | The account already exists                                                                                                                                                                                                                                                                                                                                                       |
| 50015         | Currently, sub-accounts cannot engage in margin trading                                                                                                                                                                                                                                                                                                                          |
| 50016         | The number of open orders is smaller than the minimum limit of the trading pair                                                                                                                                                                                                                                                                                                  |
| 50017         | The number of open orders is bigger than the maximum limit of the trading pair                                                                                                                                                                                                                                                                                                   |
| 50018         | The price must be 0 or higher                                                                                                                                                                                                                                                                                                                                                    |
| 50019         | The user is forbidden to trade.                                                                                                                                                                                                                                                                                                                                                  |
| 50020         | Insufficient balance                                                                                                                                                                                                                                                                                                                                                             |
| 50021         | The margin trading account does not exist                                                                                                                                                                                                                                                                                                                                        |
| 50022         | The account is liquidated                                                                                                                                                                                                                                                                                                                                                        |
| 50023         | The account has been suspended due to abnormal behavior. Please contact our Customer Support is you have any questions.                                                                                                                                                                                                                                                          |
| 50024         | The trading pair does not exist                                                                                                                                                                                                                                                                                                                                                  |
| 50025         | The trading pair is currently unavailable                                                                                                                                                                                                                                                                                                                                        |
| 50026         | The trading pair is currently unavailable                                                                                                                                                                                                                                                                                                                                        |
| 50027         | The trading pair is suspended for maintenance                                                                                                                                                                                                                                                                                                                                    |
| 50028         | The trading pair is removed                                                                                                                                                                                                                                                                                                                                                      |
| 50029         | The trading pair has no order price                                                                                                                                                                                                                                                                                                                                              |
| 50030         | The trading pair will soon be available                                                                                                                                                                                                                                                                                                                                          |
| 50031         | System error                                                                                                                                                                                                                                                                                                                                                                     |
| 50032         | The currency does not exist                                                                                                                                                                                                                                                                                                                                                      |
| 50033         | The topic of the websocket query does not exist                                                                                                                                                                                                                                                                                                                                  |
| 50034         | The borrowing amount must be over 0.00000001                                                                                                                                                                                                                                                                                                                                     |
| 50035         | The maximum borrowing amount is exceeded                                                                                                                                                                                                                                                                                                                                         |
| 50036         | The loan configuration does not exist                                                                                                                                                                                                                                                                                                                                            |
| 50037         | This currency cannot be borrowed                                                                                                                                                                                                                                                                                                                                                 |
| 50038         | The system limit is exceeded                                                                                                                                                                                                                                                                                                                                                     |
| 50039         | The currency and the trading pair do not match                                                                                                                                                                                                                                                                                                                                   |
| 50040         | The repayment amount must be more than 0                                                                                                                                                                                                                                                                                                                                         |
| 50041         | The repayment amount must be less than your available balance                                                                                                                                                                                                                                                                                                                    |
| 50042         | The repayment amount must be more than the interest                                                                                                                                                                                                                                                                                                                              |
| 50043         | Unknown transaction type                                                                                                                                                                                                                                                                                                                                                         |
| 50044         | The system account is not found                                                                                                                                                                                                                                                                                                                                                  |
| 50045         | Insufficient locked asset                                                                                                                                                                                                                                                                                                                                                        |
| 50046         | The price is too low                                                                                                                                                                                                                                                                                                                                                             |
| 50047         | The price is too high                                                                                                                                                                                                                                                                                                                                                            |
| 50048         | The maximum number of orders is exceeded                                                                                                                                                                                                                                                                                                                                         |
| 50049         | The request body of the system user is empty                                                                                                                                                                                                                                                                                                                                     |
| 50050         | The system loan collection has been done                                                                                                                                                                                                                                                                                                                                         |
| 50051         | The user in reconciliation is not in the system (cache)                                                                                                                                                                                                                                                                                                                          |
| 50052         | The asset balance will be less than 0 after transferring                                                                                                                                                                                                                                                                                                                         |
| 50053         | The amount is less than 0 when making loan repayment                                                                                                                                                                                                                                                                                                                             |
| 50054         | The amount is less than 0 when making interest repayment                                                                                                                                                                                                                                                                                                                         |
| 50055         | The amount is less than 0 when paying trading fees                                                                                                                                                                                                                                                                                                                               |
| 50056         | The amount is less than 0 when paying liquidation fees                                                                                                                                                                                                                                                                                                                           |
| 50057         | The amount is less than 0 when paying the excessive loss resulted from liquidation                                                                                                                                                                                                                                                                                               |
| 50058         | After the profit is used to cover the excessive loss resulted from liquidation, the balance will be less than 0                                                                                                                                                                                                                                                                  |
| 50059         | This currency cannot be transferred                                                                                                                                                                                                                                                                                                                                              |
| 50060         | Duplicated clientOid                                                                                                                                                                                                                                                                                                                                                             |
| 50061         | There is a problem with the parameter you requested                                                                                                                                                                                                                                                                                                                              |
| 50062         | The order status is cancelled or fullFill                                                                                                                                                                                                                                                                                                                                        |
| 50063         | Token precision must less than or equal to eight                                                                                                                                                                                                                                                                                                                                 |
| 50064         | Your account is temporarily frozen. Please contact customer support if you have any questions                                                                                                                                                                                                                                                                                    |
| 50065         | symbol_off_shelf                                                                                                                                                                                                                                                                                                                                                                 |
| 50066         | Position closing, please try again later                                                                                                                                                                                                                                                                                                                                         |
| 50068         | {0} selling restriction: currently, you can sell {2} worth {1} USDT                                                                                                                                                                                                                                                                                                              |
| 50077         | Can be convert {1} times every {0} hours                                                                                                                                                                                                                                                                                                                                         |
| 50078         | The amount you can withdraw is {0}                                                                                                                                                                                                                                                                                                                                               |
| 50081         | Exceeds the 24-hour net selling limit of {0}; currently, you can sell {2} worth {1} USDT                                                                                                                                                                                                                                                                                         |
| 59002         | Insufficient product balance                                                                                                                                                                                                                                                                                                                                                     |
| 59003         | This product is not available for purchase yet                                                                                                                                                                                                                                                                                                                                   |
| 59005         | KYC verification not performed                                                                                                                                                                                                                                                                                                                                                   |
| 59006         | The country where KYC is located cannot apply for subscription                                                                                                                                                                                                                                                                                                                   |
| 59007         | Minimum limit for single currency subscription                                                                                                                                                                                                                                                                                                                                   |
| 59008         | Maximum single currency subscription limit                                                                                                                                                                                                                                                                                                                                       |
| 59009         | The subscription amount does not meet the step size verification                                                                                                                                                                                                                                                                                                                 |
| 59010         | The precision of the subscription amount cannot exceed {0} digits                                                                                                                                                                                                                                                                                                                |
| 59011         | Insufficient balance                                                                                                                                                                                                                                                                                                                                                             |
| 59013         | Parameter exception: {0}                                                                                                                                                                                                                                                                                                                                                         |
| 59016         | The total position of a single person is exceeded                                                                                                                                                                                                                                                                                                                                |
| 59019         | The subscription time range is {0} ~ {1}                                                                                                                                                                                                                                                                                                                                         |
| 59020         | Minimum limit for single subscription                                                                                                                                                                                                                                                                                                                                            |
| 59021         | Redemption of the product has been suspended                                                                                                                                                                                                                                                                                                                                     |
| 59022         | Insufficient balance                                                                                                                                                                                                                                                                                                                                                             |
| 59023         | Insufficient product remaining quota, remaining {0}                                                                                                                                                                                                                                                                                                                              |
| 59024         | Amount cannot be empty when redeeming current financial management                                                                                                                                                                                                                                                                                                               |
| 59025         | orderId cannot be empty when redeeming regular financial management                                                                                                                                                                                                                                                                                                              |
| 59026         | Parameter error                                                                                                                                                                                                                                                                                                                                                                  |
| 59027         | This product is a novice product. You are not a novice user. Please choose another product.                                                                                                                                                                                                                                                                                      |
| 59029         | Product cannot be subscribe                                                                                                                                                                                                                                                                                                                                                      |
| 59030         | Exceeding the max amount for once subscribe                                                                                                                                                                                                                                                                                                                                      |
| 59031         | Cannot perform redemption operation                                                                                                                                                                                                                                                                                                                                              |
| 59033         | Less than redemption minimum limit                                                                                                                                                                                                                                                                                                                                               |
| 59034         | The redemption amount accuracy cannot exceed {0} digits                                                                                                                                                                                                                                                                                                                          |
| 59035         | The redemption amount must be greater than the minimum limit                                                                                                                                                                                                                                                                                                                     |
| 59037         | The current order status does not allow operation                                                                                                                                                                                                                                                                                                                                |
| 59038         | Redemption is not allowed on the day of expiration                                                                                                                                                                                                                                                                                                                               |
| 59039         | Cannot perform redemption operation                                                                                                                                                                                                                                                                                                                                              |
| 59040         | The redemption time range is {0}-{1}                                                                                                                                                                                                                                                                                                                                             |
| 59041         | The accuracy of the subscription amount is not met                                                                                                                                                                                                                                                                                                                               |
| 59043         | Insufficient product remaining quota, remaining {0} {1}                                                                                                                                                                                                                                                                                                                          |
| 59044         | Operations are frequent, please try again later.                                                                                                                                                                                                                                                                                                                                 |
| 59045         | subscription time range is {0}~{1}                                                                                                                                                                                                                                                                                                                                               |
| 59046         | Transaction failed                                                                                                                                                                                                                                                                                                                                                               |
| 59047         | redemption time range is {0}-{1}                                                                                                                                                                                                                                                                                                                                                 |
| 59048         | fixed redemption not pass amount                                                                                                                                                                                                                                                                                                                                                 |
| 59049         | Product does not exist                                                                                                                                                                                                                                                                                                                                                           |
| 60001         | StartTime not empty                                                                                                                                                                                                                                                                                                                                                              |
| 60002         | MerchantId not empty                                                                                                                                                                                                                                                                                                                                                             |
| 60003         | Not found the p2p order                                                                                                                                                                                                                                                                                                                                                          |
| 60004         | Not found the p2p advertisement                                                                                                                                                                                                                                                                                                                                                  |
| 60005         | Not found the p2p merchant                                                                                                                                                                                                                                                                                                                                                       |
| 60006         | Parameter error                                                                                                                                                                                                                                                                                                                                                                  |
| 60007         | upload image cannot exceed 5M                                                                                                                                                                                                                                                                                                                                                    |
| 60008         | The image format must be [". jpg", ". jpeg", ". png"]                                                                                                                                                                                                                                                                                                                            |
| 60009         | The image format error                                                                                                                                                                                                                                                                                                                                                           |
| 60010         | upload error                                                                                                                                                                                                                                                                                                                                                                     |
| 60011         | Ordinary users can not post ads                                                                                                                                                                                                                                                                                                                                                  |
| 60012         | Please change your status from offline to online before posting your ads！                                                                                                                                                                                                                                                                                                       |
| 60013         | Insufficient balance                                                                                                                                                                                                                                                                                                                                                             |
| 60014         | Fiat info not found                                                                                                                                                                                                                                                                                                                                                              |
| 60015         | Digital currency info not found                                                                                                                                                                                                                                                                                                                                                  |
| 60016         | Only supports publish CNY advertisement                                                                                                                                                                                                                                                                                                                                          |
| 60017         | Not support publish CNY advertisement                                                                                                                                                                                                                                                                                                                                            |
| 60018         | Your KYC certification only supports publishing {0}                                                                                                                                                                                                                                                                                                                              |
| 60019         | Post failed. Unable to obtain preference price                                                                                                                                                                                                                                                                                                                                   |
| 60020         | advertisement type error                                                                                                                                                                                                                                                                                                                                                         |
| 60021         | Payment method is empty                                                                                                                                                                                                                                                                                                                                                          |
| 60022         | Trading amount incorrect                                                                                                                                                                                                                                                                                                                                                         |
| 60023         | Beyond fiat limit ({0}-{1})                                                                                                                                                                                                                                                                                                                                                      |
| 60024         | Abnormality occurred in the P2P merchant fund refund                                                                                                                                                                                                                                                                                                                             |
| 60025         | The remark length cannot be longer than the configuration length                                                                                                                                                                                                                                                                                                                 |
| 60026         | Exclusive country error                                                                                                                                                                                                                                                                                                                                                          |
| 60027         | Payment time limit error                                                                                                                                                                                                                                                                                                                                                         |
| 60028         | Payment method error                                                                                                                                                                                                                                                                                                                                                             |
| 60029         | publish advertisement error                                                                                                                                                                                                                                                                                                                                                      |
| 60030         | status error                                                                                                                                                                                                                                                                                                                                                                     |
| 60031         | The advertisement number is too long                                                                                                                                                                                                                                                                                                                                             |
| 60032         | The advertisement not exist                                                                                                                                                                                                                                                                                                                                                      |
| 60033         | Posted ad amount incorrect                                                                                                                                                                                                                                                                                                                                                       |
| 60034         | Number of images attached in the remark cannot exceed the allocation limit.                                                                                                                                                                                                                                                                                                      |
| 60035         | Edit advertisement error                                                                                                                                                                                                                                                                                                                                                         |
| 60036         | payTimeLimit cannot be empty                                                                                                                                                                                                                                                                                                                                                     |
| 60037         | Post failed. Price is significantly deviated from preference price                                                                                                                                                                                                                                                                                                               |
| 60038         | Post failed. Incorrect floating rate                                                                                                                                                                                                                                                                                                                                             |
| 60039         | User does not exist                                                                                                                                                                                                                                                                                                                                                              |
| 60040         | Unauthorized access not supported                                                                                                                                                                                                                                                                                                                                                |
| 60041         | Edit advertisement price error                                                                                                                                                                                                                                                                                                                                                   |
| 60042         | limitPrice not empty                                                                                                                                                                                                                                                                                                                                                             |
| 60043         | The advertisement status update fail                                                                                                                                                                                                                                                                                                                                             |
| 60044         | The advertisement status in editing can be edited                                                                                                                                                                                                                                                                                                                                |
| 60045         | Exceeding the number of advertisement that can be published                                                                                                                                                                                                                                                                                                                      |
| 60046         | priceValue not empty                                                                                                                                                                                                                                                                                                                                                             |
| 60047         | userPayMethodId not empty                                                                                                                                                                                                                                                                                                                                                        |
| 60049         | You are not currently a merchant                                                                                                                                                                                                                                                                                                                                                 |
| 70001         | Activity ID not correct                                                                                                                                                                                                                                                                                                                                                          |
| 70002         | rankType error                                                                                                                                                                                                                                                                                                                                                                   |
| 70006         | Parameter value range verification failed: {0}                                                                                                                                                                                                                                                                                                                                   |
| 70008         | Parameter verification failed: {0}, please make sure the time is within 30 days                                                                                                                                                                                                                                                                                                  |
| 70020         | Account does not exist                                                                                                                                                                                                                                                                                                                                                           |
| 70101         | illegal parameter                                                                                                                                                                                                                                                                                                                                                                |
| 70102         | Parameter verification failed-brokerUserId                                                                                                                                                                                                                                                                                                                                       |
| 70103         | Parameter verification failed-startTime                                                                                                                                                                                                                                                                                                                                          |
| 70104         | Parameter verification failed-endTime                                                                                                                                                                                                                                                                                                                                            |
| 70204         | The account has open order, please cancel the open order.                                                                                                                                                                                                                                                                                                                        |
| 70205         | Today's reset has exceeded the maximum number of resets for the day: {0} and cannot be reset.                                                                                                                                                                                                                                                                                    |
| 70206         | Not main Account                                                                                                                                                                                                                                                                                                                                                                 |
| 70207         | UID {0} not exist                                                                                                                                                                                                                                                                                                                                                                |
| 70208         | {0} can not deposit or withdrawal, please wait.                                                                                                                                                                                                                                                                                                                                  |
| 70209         | Risk control, please contact with CS service.                                                                                                                                                                                                                                                                                                                                    |
| 70210         | Exchange fail, please contact with CS service.                                                                                                                                                                                                                                                                                                                                   |
| 70211         | {0} balance exceeds {1} USDT                                                                                                                                                                                                                                                                                                                                                     |
| 70212         | please less than {0} USDT                                                                                                                                                                                                                                                                                                                                                        |
| 70213         | The withdrawal amount exceeds the daily limit                                                                                                                                                                                                                                                                                                                                    |
| 70214         | Restricted assets exist                                                                                                                                                                                                                                                                                                                                                          |
| 70215         | Frozen assets exist                                                                                                                                                                                                                                                                                                                                                              |
| 70216         | locked assets exist                                                                                                                                                                                                                                                                                                                                                              |
| 70217         | The whitelist is turned on, withdraw address is not in addressBook                                                                                                                                                                                                                                                                                                               |
| 70218         | The transaction quantity of pending orders is higher than the modified quantity                                                                                                                                                                                                                                                                                                  |
| 70219         | Withdrawal exceeds monthly limit                                                                                                                                                                                                                                                                                                                                                 |
| 70220         | Insufficient liquidity in the market, please operate later                                                                                                                                                                                                                                                                                                                       |
| 70221         | The current currency is {0}, the net purchase value is limited to {1} USD, and you can also purchase {3} with a net purchase value of {2} USD.                                                                                                                                                                                                                                   |
| 70222         | The current currency is {0}, the net purchase quantity is limited to {1}, and the net purchase quantity is also {2}                                                                                                                                                                                                                                                              |
| 70223         | Exceeding the maximum number of orders for total trading                                                                                                                                                                                                                                                                                                                         |
| 70224         | This currency has a selling limit of {0}, leaving {1}                                                                                                                                                                                                                                                                                                                            |
| 70225         | This currency has a buying limit of {0}, leaving {1}                                                                                                                                                                                                                                                                                                                             |
| 70226         | The current maximum amount of coins that can be withdrawn or transferred out is {0}. If you want to withdraw or transfer all coins, please confirm that all spot orders have been ended.                                                                                                                                                                                         |
| 70227         | The user does not allow to place order                                                                                                                                                                                                                                                                                                                                           |
| 70228         | The operation is too frequent, please try again later.                                                                                                                                                                                                                                                                                                                           |
| 70229         | Place order error                                                                                                                                                                                                                                                                                                                                                                |
| 80001         | illegal params                                                                                                                                                                                                                                                                                                                                                                   |
| 80002         | system error                                                                                                                                                                                                                                                                                                                                                                     |
| 80003         | Loan coin not exist                                                                                                                                                                                                                                                                                                                                                              |
| 80004         | Place coin not exist                                                                                                                                                                                                                                                                                                                                                             |
| 80005         | Place single minimum limit                                                                                                                                                                                                                                                                                                                                                       |
| 80006         | Place single Maximum limit                                                                                                                                                                                                                                                                                                                                                       |
| 80007         | Loan single minimum limit                                                                                                                                                                                                                                                                                                                                                        |
| 80008         | Loan single maximum limit                                                                                                                                                                                                                                                                                                                                                        |
| 80009         | Loan pool not enough                                                                                                                                                                                                                                                                                                                                                             |
| 80010         | place float exceed                                                                                                                                                                                                                                                                                                                                                               |
| 80011         | Order not exist                                                                                                                                                                                                                                                                                                                                                                  |
| 80012         | Pledge not exist                                                                                                                                                                                                                                                                                                                                                                 |
| 80013         | Extract exceed maximum limit                                                                                                                                                                                                                                                                                                                                                     |
| 80014         | Operate limit amount is {0} USDT                                                                                                                                                                                                                                                                                                                                                 |
| 80015         | Order count maximum limit                                                                                                                                                                                                                                                                                                                                                        |
| 80016         | Order status illegal                                                                                                                                                                                                                                                                                                                                                             |
| 80020         | The minimum number of operations is {0} {1}                                                                                                                                                                                                                                                                                                                                      |
| 90001         | The single subscription limit cannot be exceeded {0}                                                                                                                                                                                                                                                                                                                             |
| 400172        | Parameter verification failed                                                                                                                                                                                                                                                                                                                                                    |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/error-code/restapi)

---

## WebSocket Error Code

| Error Code | Description                                                                                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 429        | Too Many Requests                                                                                                                                           |
| 25000      | System error, please try again later                                                                                                                        |
| 25001      | Operation timed out                                                                                                                                         |
| 25002      | Unsupported operation                                                                                                                                       |
| 25003      | Concurrent operation, please retry                                                                                                                          |
| 25004      | Operation too frequent, please try again later                                                                                                              |
| 25005      | User does not exist                                                                                                                                         |
| 25006      | Abnormal account status                                                                                                                                     |
| 25007      | Account in an irregular status                                                                                                                              |
| 25008      | Account is in forced liquidation status                                                                                                                     |
| 25009      | Unsupported account mode switch                                                                                                                             |
| 25010      | Unsupported position mode switch                                                                                                                            |
| 25011      | Transfer failed, account is in forced liquidation status                                                                                                    |
| 25012      | Account at risk, trading temporarily disabled                                                                                                               |
| 25013      | {0} not support API trade                                                                                                                                   |
| 25100      | Trading pair {0} does not exist                                                                                                                             |
| 25101      | Trading pair not open for trading                                                                                                                           |
| 25102      | Trading pair temporarily closed for maintenance                                                                                                             |
| 25103      | Trading pair opening soon                                                                                                                                   |
| 25104      | Contract delisted                                                                                                                                           |
| 25105      | This contract does not support opening positions                                                                                                            |
| 25106      | Trading suspended due to settlement or maintenance                                                                                                          |
| 25107      | There is currently a position, please close the position                                                                                                    |
| 25108      | The contract is in the initialization state                                                                                                                 |
| 25110      | This coin is not supported for deposits into the unified account                                                                                            |
| 25200      | {0} validation error                                                                                                                                        |
| 25201      | Currency does not exist                                                                                                                                     |
| 25202      | Insufficient balance                                                                                                                                        |
| 25203      | Insufficient margin                                                                                                                                         |
| 25204      | Order does not exist                                                                                                                                        |
| 25205      | {0} trading price cannot be below {1}%                                                                                                                      |
| 25206      | {0} trading price cannot exceed {1}%                                                                                                                        |
| 25207      | {0} trading quantity cannot be less than {1} units                                                                                                          |
| 25208      | {0} trading quantity cannot exceed {1} units                                                                                                                |
| 25209      | Insufficient market liquidity, please try again later                                                                                                       |
| 25210      | Large price fluctuation, placing the order entails higher risk, please reorder                                                                              |
| 25211      | Exceeds the limit of {0} maximum orders                                                                                                                     |
| 25212      | Duplicate clientOid                                                                                                                                         |
| 25213      | Exceeds {0} permanent net buy limit, you can currently buy up to {1} USD worth of {0}                                                                       |
| 25214      | Exceeds {0} permanent net sell limit, you can currently sell up to {1} USD worth of {0}                                                                     |
| 25215      | Exceeds {0} 24-hour net buy limit, you can currently buy up to {1} USD worth of {0}                                                                         |
| 25216      | Exceeds {0} 24-hour net sell limit, you can currently sell up to {1} USD worth of {0}                                                                       |
| 25217      | Exceeds maximum repayment limit                                                                                                                             |
| 25218      | High risk, usage may result in forced liquidation                                                                                                           |
| 25219      | Increase in IMR exceeds available assets                                                                                                                    |
| 25220      | 未找到描述                                                                                                                                                  |
| 25221      | Level gradient does not exist                                                                                                                               |
| 25222      | Trade or fair mark price does not exist                                                                                                                     |
| 25223      | Exceeds Max. leverage                                                                                                                                       |
| 25224      | Take-profit or stop-loss triggered warning, please proceed with cancellation                                                                                |
| 25225      | Insufficient available quantity in position                                                                                                                 |
| 25226      | Insufficient total position quantity                                                                                                                        |
| 25227      | No position available to close                                                                                                                              |
| 25228      | Unable to update leverage for this position, insufficient margin!                                                                                           |
| 25229      | Total positions exceed the current limit of {0} positions                                                                                                   |
| 25230      | Order quantity exceeds the maximum open quantity                                                                                                            |
| 25231      | Close quantity cannot exceed the held position quantity                                                                                                     |
| 25232      | Reduce-only orders will only reduce your position; please cancel or modify existing orders before placing a new one                                         |
| 25233      | Order quantity cannot exceed the maximum for this level                                                                                                     |
| 25234      | Remaining quantity for regular orders is {0} {1}, and for post-only orders it is {2} {3}.                                                                   |
| 25235      | Due to risk control, the maximum open position currently allowed is {0} {1}. The risk control limit for a single user includes all primary and sub-accounts |
| 25236      | Incorrect position open type                                                                                                                                |
| 25237      | Close orders can only occur in bi-directional mode                                                                                                          |
| 25238      | {0} do not assign values at the same                                                                                                                        |
| 25239      | Closing failed, please try again later                                                                                                                      |
| 25240      | {0} does not support this operation                                                                                                                         |
| 25241      | Bulk orders cannot exceed the corresponding maximum order value.                                                                                            |
| 25242      | The maximum reducible amount is {0}{1}.                                                                                                                     |
| 25243      | You have exceeded the currency holding limit and cannot add more of this currency.                                                                          |
| 25244      | Price should be a multiple of {0}                                                                                                                           |
| 25245      | The account is not the unified account mode                                                                                                                 |
| 25559      | Not loan user                                                                                                                                               |
| 25560      | Subaccount the same with RiskUnit ID                                                                                                                        |
| 25561      | SubUid not in risk unit                                                                                                                                     |
| 25562      | The subacccount is the other's Risk Unit                                                                                                                    |
| 25563      | The UID you are unbinding has a non-zero balance and has unsettled or pending loan orders in its associated risk unit.                                      |
| 25564      | The number of sub-accounts under the risk unit has exceeded the limit.                                                                                      |
| 25565      | The sub-account UID you entered is already bound to another risk unit.                                                                                      |
| 25566      | The risk unit does not exist.                                                                                                                               |
| 25567      | Exceeded the maximum quantity of contract orders：{0} {1}                                                                                                   |
| 25568      | The order does not meet the modification requirements.                                                                                                      |
| 25569      | Exceeded the maximum limit for modifications.                                                                                                               |
| 25570      | There are pending orders for contract bidirectional closing or contract unidirectional opening/reducing positions.                                          |
| 25571      | The modification price and qty is the same as the original value. Please adjust and try again.                                                              |
| 25572      | Too many pending modification requests. Please try again later                                                                                              |
| 25573      | Skipped due to prior modification failure                                                                                                                   |
| 25574      | Reduce-only order protection                                                                                                                                |
| 25575      | Failed to stop the strategy because the corresponding strategy ID could not be found                                                                        |
| 25576      | Failed to stop the strategy because it is already stopping                                                                                                  |
| 25577      | Failed to stop the strategy because the corresponding strategy ID could not be found                                                                        |
| 25578      | No strategies available to stop                                                                                                                             |
| 25579      | For long position TP/SL (close long), the take-profit trigger price must be greater than the average entry price                                            |
| 25580      | For long position TP/SL (close long), the stop-loss trigger price must be less than the average entry price                                                 |
| 25581      | For short position TP/SL (close short), the take-profit trigger price must be less than the average entry price                                             |
| 25582      | For short position TP/SL (close short), the stop-loss trigger price must be greater than the average entry price                                            |
| 25583      | Take-profit price must be greater than 0                                                                                                                    |
| 25584      | Stop-loss price must be greater than 0                                                                                                                      |
| 25585      | For long position TP/SL (close long), the take-profit trigger price must be greater than the latest price                                                   |
| 25586      | For long position TP/SL (close long), the stop-loss trigger price must be less than the latest price                                                        |
| 25587      | For short position TP/SL (close short), the take-profit trigger price must be less than the latest price                                                    |
| 25588      | For short position TP/SL (close short), the stop-loss trigger price must be greater than the latest price                                                   |
| 25589      | For long position TP/SL (close long), the take-profit trigger price must be greater than the mark price                                                     |
| 25590      | For long position TP/SL (close long), the stop-loss trigger price must be less than the mark price                                                          |
| 25591      | For short position TP/SL (close short), the take-profit trigger price must be less than the mark price                                                      |
| 25592      | For short position TP/SL (close short), the stop-loss trigger price must be greater than the mark price                                                     |
| 25593      | The current trading type does not support TP/SL settings                                                                                                    |
| 25594      | Only one TP/SL can be set for all positions of the current symbol                                                                                           |
| 25595      | The total TP/SL quantity for partial positions exceeds the position amount                                                                                  |
| 25596      | Cannot modify strategy in triggered or error state                                                                                                          |
| 25597      | Strategy does not exist or has already been stopped                                                                                                         |
| 25598      | Current strategy status does not support modification                                                                                                       |
| 25599      | Maximum number of active TP/SL orders for this symbol is {0}; cannot add more                                                                               |
| 25600      | No changes made to the TP/SL order; please modify before submitting                                                                                         |
| 25601      | Position does not exist; cannot set TP/SL                                                                                                                   |
| 25602      | Take-profit trigger price must be greater than 0                                                                                                            |
| 25603      | Stop-loss trigger price must be greater than 0                                                                                                              |
| 25604      | Take-profit order price must be greater than 0                                                                                                              |
| 25605      | Stop-loss order price must be greater than 0                                                                                                                |
| 25606      | Take-profit trigger price does not meet precision requirements                                                                                              |
| 25607      | Stop-loss trigger price does not meet precision requirements                                                                                                |
| 25608      | Take-profit order price does not meet precision requirements                                                                                                |
| 25609      | Stop-loss order price does not meet precision requirements                                                                                                  |
| 25610      | Order amount does not meet precision requirements                                                                                                           |
| 25611      | Order quantity must be greater than the minimum order amount                                                                                                |
| 25612      | Only opening orders are allowed to have preset take-profit and stop-loss                                                                                    |
| 25620      | permission denied                                                                                                                                           |
| 25622      | The collateral setting for institutional loans sub-accounts must be in all-coins mode                                                                       |
| 25650      | For long positions, the stop-loss price must be lower than the current price: {0}                                                                           |
| 25651      | For short positions, the take-profit price must be lower than the current price: {0}                                                                        |
| 25652      | For long positions, the take-profit price must be greater than the current price: {0}                                                                       |
| 25653      | The order has been changed. Please try again later                                                                                                          |
| 25654      | {0} trading price cannot be greater than the bankruptcy price of {1} {2}                                                                                    |
| 25655      | {0} trading price cannot be lower than the bankruptcy price of {1} {2}                                                                                      |
| 40001      | ACCESS_KEY cannot be empty                                                                                                                                  |
| 40002      | SECRET_KEY cannot be empty                                                                                                                                  |
| 40003      | Signature cannot be empty                                                                                                                                   |
| 40006      | Invalid ACCESS_KEY                                                                                                                                          |
| 40008      | Request timestamp expired                                                                                                                                   |
| 40009      | sign signature error                                                                                                                                        |
| 40017      | Parameter verification failed {0}                                                                                                                           |
| 40034      | Parameter {0} does not exist                                                                                                                                |
| 40725      | service return an error                                                                                                                                     |
| 43117      | Exceeded Max. transferable quantity                                                                                                                         |
| 95001      | The current user is undergoing forced liquidation.                                                                                                          |
| 95002      | The sub-account has contract positions and cannot be added.                                                                                                 |
| 95003      | he sub-account UID you entered does not exist.                                                                                                              |
| 95004      | The UID you unbound has a non-zero asset balance and is in a risk unit with unsettled or pending loan orders.                                               |
| 95005      | The LTV for ins loan has exceeded the limit, and opening contracts is prohibited                                                                            |
| 95006      | The LTV for ins loan has exceeded the limit, and spot buying is prohibited                                                                                  |
| 95007      | Ins loan is not support this spot trading pair.                                                                                                             |
| 95008      | Ins loan is not support futures trading.                                                                                                                    |
| 95009      | Ins loan is not support this margin trading pair.                                                                                                           |
| 95010      | Your entered subaccount UID is already bound to another risk unit.                                                                                          |
| 95011      | Parameter validation failed:{0}                                                                                                                             |
| 95012      | The leverage {1} of the sub-account contract position for {0} exceeds max leverage {2} for ins loan                                                         |
| 95013      | The leverage {1} of the sub-account contract order trading pair {0} exceeds max leverage {2} for ins loan.",                                                |
| 95014      | The sub-account has contract orders and cannot be added                                                                                                     |

> **Source:**
> [original URL](https://www.bitget.com/api-doc/spot/error-code/websocket)

---
