# Bitget Spot API Documentation

# Spot Trading API

This section introduces the API documentation for spot trading.

For more details, please refer to the menu on the left.

## Updates[​](#updates "Direct link to Updates")

Bitget will announce information about API updates and deprecations in advance.
We recommend that you follow and subscribe to our announcements to stay informed
and receive updates promptly

You can click [Latest News](javascript:;) to subscribe to announcements.

Further more, an API to get notification could be found
[here](/api-doc/common/notice/Get-All-Notices)

## Contact Us[​](#contact-us "Direct link to Contact Us")

If you have any questions or suggestions, you can contact us by the following
approaches:

- Send an email to [API@bitget.com](mailto:API@bitget.com).
- [Telegram](https://t.me/bitgetOpenapi)

# Get Coin Info

Frequency limit: 3 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get spot coin information,supporting both individual and full queries.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/public/coins

Request Example

```
curl "https://api.bitget.com/api/v2/spot/public/coins"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description                                                                             |
| :-------- | :----- | :------- | :-------------------------------------------------------------------------------------- |
| coin      | String | No       | Coin name, If the field is left blank, all coin information will be returned by default |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695799900330,    "data": [        {            "coinId": "1",            "coin": "BTC",            "transfer": "true",            "chains": [                {                    "chain": "BTC",                    "needTag": "false",                    "withdrawable": "true",                    "rechargeable": "true",                    "withdrawFee": "0.005",                    "extraWithdrawFee": "0",                    "depositConfirm": "1",                    "withdrawConfirm": "1",                    "minDepositAmount": "0.001",                    "minWithdrawAmount": "0.001",                    "browserUrl": "https://blockchair.com/bitcoin/testnet/transaction/",                    "contractAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7",                    "withdrawStep": "0",                    "withdrawMinScale": "8",                    "congestion":"normal"                }            ]        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter              | Type    | Description                                                                                                                                                                  |
| :--------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coinId                 | String  | Currency ID                                                                                                                                                                  |
| coin                   | String  | Token name                                                                                                                                                                   |
| transfer               | Boolean | Transferability                                                                                                                                                              |
| chains                 | Array   | Support chain list                                                                                                                                                           |
| &gt; chain             | String  | Chain name                                                                                                                                                                   |
| &gt; needTag           | Boolean | Need tag                                                                                                                                                                     |
| &gt; withdrawable      | Boolean | Withdrawal supported<br>(The withdrawal status is subject to the official announcement)                                                                                      |
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

# Get Symbol Info

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get spot trading pair information,supporting both individual and full queries

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/public/symbols

Request Example

```
curl "https://api.bitget.com/api/v2/spot/public/symbols"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description                                                                                                             |
| :-------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------- |
| symbol    | String | No       | trading pair name, e.g. BTCUSDT<br>If the field is left blank, all trading pair information will be returned by default |

Response Example

```
{  "code": "00000",  "msg": "success",  "requestTime": 1744276707885,  "data": [    {      "symbol": "BTCUSDT",      "baseCoin": "BTC",      "quoteCoin": "USDT",      "minTradeAmount": "0",      "maxTradeAmount": "900000000000000000000",      "takerFeeRate": "0.002",      "makerFeeRate": "0.002",      "pricePrecision": "2",      "quantityPrecision": "6",      "quotePrecision": "8",      "status": "online",      "minTradeUSDT": "1",      "buyLimitPriceRatio": "0.05",      "sellLimitPriceRatio": "0.05",      "areaSymbol": "no",      "orderQuantity": "200",      "openTime": "1532454360000",      "offTime": ""    }  ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

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

# Get VIP Fee Rate

Frequency limit: 10 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get VIP Fee Rate

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/market/vip-fee-rate

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/vip-fee-rate"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

N/A

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1675759699382,    "data": [        {            "level": 1,            "dealAmount": "1000000",            "assetAmount": "50000",            "takerFeeRate": "0",            "makerFeeRate": "0",            "btcWithdrawAmount": "300",            "usdtWithdrawAmount": "5000000"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter          | Type   | Description                                                                      |
| :----------------- | :----- | :------------------------------------------------------------------------------- |
| level              | String | VIP level                                                                        |
| dealAmount         | String | Total trading volume in last 30 days, USDT                                       |
| assetAmount        | String | Total assets in USDT                                                             |
| takerFeeRate       | String | Taker fee. Refer to the official announcement for the real rate when 0 is shown. |
| makerFeeRate       | String | Maker fee. Refer to the official announcement for the real rate when 0 is shown. |
| btcWithdrawAmount  | String | 24-hour withdrawal limit in BTC                                                  |
| usdtWithdrawAmount | String | 24-hour withdrawal limit in USDT                                                 |

# Get Ticker Information

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get Ticker Information,Supports both single and batch queries

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/market/tickers

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/tickers?symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description                                                                                                             |
| :-------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------- |
| symbol    | String | No       | trading pair name, e.g. BTCUSDT<br>If the field is left blank, all trading pair information will be returned by default |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": [        {            "symbol": "BTCUSDT",            "high24h": "37775.65",            "open": "35134.2",            "low24h": "34413.1",            "lastPr": "34413.1",            "quoteVolume": "0",            "baseVolume": "0",            "usdtVolume": "0",            "bidPr": "0",            "askPr": "0",            "bidSz": "0.0663",            "askSz": "0.0119",            "openUtc": "23856.72",            "ts": "1625125755277",            "changeUtc24h": "0.00301",            "change24h": "0.00069"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

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

# Get Merge Depth

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get Merge Depth

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/market/merge-depth

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/merge-depth?symbol=BTCUSDT&precision=scale0&limit=100"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :-------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol    | String | Yes      | Trading pair                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| precision | String | No       | Price precision, return the cumulative depth according to the selected precision as the step size, enumeration value:<br>scale0/scale1/scale2/scale3,<br>scale0 does not merge, the default value, generally speaking,<br>scale1 is the merged depth of the trading pair quotation accuracy <em>10, generally Under normal circumstances,<br>scale2 is the quotation accuracy </em>100. Under normal circumstances,<br>scale3 is the quotation accuracy \* 1000.<br>Under normal circumstances, the accuracy corresponding to 0/1/2/3 is based on the actual return parameter "scale". Each trading pair The quotation accuracy is different. Some currency pairs do not have scale 2. Requests for scales that do not exist for the currency pair will be processed according to the maximum scale. Example: A certain trading pair only has scale 0/1, and when scale2 is requested, it is automatically reduced to scale1. |
| limit     | String | No       | Fixed gear enumeration value：1/5/15/50/max，default:100，When the actual depth does not meet the limit, return according to the actual gear, and pass in max to return the maximum gear of the trading pair.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": {        "asks": [            [                "38084.5",                "0.0039"            ],            [                "38085.7",                "0.0018"            ],            [                "38086.7",                "0.0310"            ],            [                "38088.2",                "0.5303"            ]        ],        "bids": [            [                "38073.7",                "0.4993000000000000"            ],            [                "38073.4",                "0.4500"            ],            [                "38073.3",                "0.1179"            ],            [                "38071.5",                "0.2162"            ]        ],        "ts": "1622102974025",        "scale":"0.1",        "precision":"scale0",        "isMaxPrecision":"YES"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter      | Type   | Description                                                                         |
| :------------- | :----- | :---------------------------------------------------------------------------------- |
| asks           | Array  | Ask depth<br>e.g. ["38084.5","0.5"] ，"38084.5" is price，"0.5" is base coin volume |
| bids           | Array  | Bid depth                                                                           |
| precision      | String | Current gear, e.g. "scale1"                                                         |
| scale          | String | Actual precision value, e.g. "0.1"                                                  |
| isMaxPrecision | String | Is max precision<br>YES:yes<br>NO:no                                                |
| ts             | String | time                                                                                |

# Get OrderBook Depth

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get OrderBook Depth

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/market/orderbook

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/orderbook?symbol=BTCUSDT&type=step0&limit=100"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description                                                                |
| :-------- | :----- | :------- | :------------------------------------------------------------------------- |
| symbol    | String | Yes      | Trading pair                                                               |
| type      | String | No       | Default：step0： The value enums：step0，step1，step2，step3，step4，step5 |
| limit     | String | No       | Number of queries: Default: 150, maximum: 150                              |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1698303884579,    "data": {        "asks": [            [                "34567.15",                "0.0131"            ],            [                "34567.25",                "0.0144"            ]        ],        "bids": [            [                "34567",                "0.2917"            ],            [                "34566.85",                "0.0145"            ]        ],        "ts": "1698303884584"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description                                                                         |
| :-------- | :----- | :---------------------------------------------------------------------------------- |
| asks      | Array  | Ask depth<br>e.g. ["38084.5","0.5"] ，"38084.5" is price，"0.5" is base coin volume |
| bids      | Array  | Bid depth                                                                           |
| ts        | String | time                                                                                |

# Get Candlestick Data

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get Candlestick Data

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/market/candles

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/candles?symbol=BTCUSDT&granularity=1min&startTime=1659076670000&endTime=1659080270000&limit=100"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

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

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

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

# Get History Candlestick Data

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get History Candlestick Data

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/market/history-candles

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/history-candles?symbol=BTCUSDT&granularity=1min&endTime=1659080270000&limit=100"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

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

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

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

# Get Recent Trades

Frequency limit: 10 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get Recent Trades

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/market/fills

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/fills?symbol=BTCUSDT&limit=100"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description                     |
| :-------- | :----- | :------- | :------------------------------ |
| symbol    | String | Yes      | Trading pair name, e.g. BTCUSDT |
| limit     | String | No       | Default: 100, maximum: 500      |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": [        {            "symbol": "BFTUSDT",            "tradeId": "1",            "side": "buy",            "price": "2.38735",            "size": "2470.6224",            "ts": "1622097282536"        },        {            "symbol": "BFTUSDT",            "tradeId": "2",            "side": "sell",            "price": "2.38649",            "size": "3239.7976",            "ts": "1622097280642"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description                                                      |
| :-------- | :----- | :--------------------------------------------------------------- |
| symbol    | String | Trading pair                                                     |
| tradeId   | String | Order ID<br>Descending                                           |
| side      | String | Direction<br>Buy<br>Sell                                         |
| price     | String | Order price                                                      |
| size      | String | Filled quantity                                                  |
| ts        | String | Transaction time, Unix millisecond timestamp, e.g. 1690196141868 |

# Get Market Trades

Rate limit: 10 req/sec/IP

### Description[​](#description "Direct link to Description")

Get Market Trades  
It supports to get the data within 30days. You can download the older data on
our [web](https://www.bitget.com/data-download)

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/market/fills-history

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/fills-history?symbol=BTCUSDT&limit=20&startTime=1678965010861&endTime=1678965910861"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

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

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description                                                                      |
| :-------- | :----- | :------------------------------------------------------------------------------- |
| symbol    | String | Trading pair                                                                     |
| tradeId   | String | Order ID<br>Descending                                                           |
| side      | String | Direction<br><code>Buy</code><br><code>Sell</code>                               |
| price     | String | Order price                                                                      |
| size      | String | Filled quantity                                                                  |
| ts        | String | Transaction time(second level)<br>Unix millisecond timestamp, e.g. 1744275603000 |

# Place Order

Rate limit: 10 requests/second/UID  
Rate limit: 1 request/second/UID for **copy trading traders**

### Description[​](#description "Direct link to Description")

Place Order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/place-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/place-order" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*******" \  -H "ACCESS-PASSPHRASE:*****" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json" \    -d '{"symbol": "BTCUSDT","side": "buy","orderType": "limit","force":"gtc","price":"23222.5","size":"1","clientOid":"121211212122"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

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

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description     |
| :-------- | :----- | :-------------- |
| orderId   | String | Order ID        |
| clientOid | String | Custom order ID |

# Cancel an Existing Order and Send a New Order

Rate limit: 5 requests/second/UID

### Description[​](#description "Direct link to Description")

Cancel an Existing Order and Send a New Order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/cancel-replace-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/cancel-replace-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{    "orderId":"xxxxxxxxxxxxxxx",    "clientOid":"",    "symbol": "BTCUSDT",    "price":"3.24",    "size":"4"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

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

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description                                                                       |
| :-------- | :----- | :-------------------------------------------------------------------------------- |
| orderId   | String | Order ID                                                                          |
| clientOid | String | CLient Order ID                                                                   |
| success   | String | operate success<br><code>success</code>: success<br><code>failure</code>: failure |
| msg       | String | Failure reason                                                                    |

# Batch Cancel Existing Order and Send New Orders

Rate limit: 5 requests/second/UID

### Description[​](#description "Direct link to Description")

Cancel an Existing Order and Send a New Order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/batch-cancel-replace-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/batch-cancel-replace-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{    "orderList": [        {            "orderId":"xxxxxxxxxxxxxxxxx",            "clientOid":"",            "symbol": "BTCUSDT",            "price":"3.17",            "size":"5"        }    ]}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

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

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description                                                                       |
| :-------- | :----- | :-------------------------------------------------------------------------------- |
| orderId   | String | Order ID                                                                          |
| clientOid | String | CLient Order ID                                                                   |
| success   | String | operate success<br><code>success</code>: success<br><code>failure</code>: failure |
| msg       | String | Failure reason                                                                    |

# Cancel Order

Frequency limit:10 times/1s (UID)

### Description[​](#description "Direct link to Description")

Cancel Order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/cancel-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/cancel-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{"symbol": "BTCUSDT","orderId": "121211212122"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type   | Required | Description                                                                                                    |
| :-------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------- |
| symbol    | String | Yes      | Trading pair name, e.g. BTCUSDT<br>it is not required when tpslType is <code>tpsl</code>                       |
| tpslType  | String | No       | order type, deafult:<code>normal</code><br><code>normal</code> spot order<br><code>tpsl</code> spot tpsl order |
| orderId   | String | No       | Order ID<br>Either orderId or clientOid is required<br>it's required when tpslType is <code>tpsl</code>        |
| clientOid | String | No       | Client Order ID<br>Either orderId or clientOid is required                                                     |

Response Example

```
{    "code": "00000",    "message": "success",    "requestTime": 1234567891234,    "data": {        "orderId": "121211212122",        "clientOid": "xx001"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description     |
| :-------- | :----- | :-------------- |
| orderId   | String | Order ID        |
| clientOid | String | Client Order ID |

# Batch Place Orders

Frequency limit: 5 times/1s (UID)Trader frequency limit: 1 times/1s (UID)

### Description[​](#description "Direct link to Description")

Place Orders in Batch

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/batch-orders

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/batch-orders" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{"symbol":"BTCUSDT","orderList":[{"side":"buy","orderType":"limit","force":"gtc","price":"23222.5","size":"1","clientOid":"121211212122"}] }'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

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

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

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

# Batch Cancel Orders

Frequency limit:10 times/1s (UID)

### Description[​](#description "Direct link to Description")

Cancel Orders in Batch

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/batch-cancel-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/batch-cancel-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{    "symbol": "",    "batchMode"："multiple",    "orderList": [        {            "orderId":"121211212122",            "symbol":"BTCUSDT",            "clientOid":"121211212122"        }    ]}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

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
{    "code": "00000",    "message": "success",    "requestTime": 1695808949356,    "data": {        "successList": [            {                "orderId": "121211212122",                "clientOid": "121211212122"            }        ],        "failureList": [            {                "orderId": "121211212122",                "clientOid": "xxx001",                "errorMsg": "duplicate clientOrderId"            }        ]    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

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

# Cancel Order by Symbol

Frequency limit: 5 times/1s (UID)

### Description[​](#description "Direct link to Description")

Cancel order by symbol

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/cancel-symbol-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/cancel-symbol-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{"symbol": "BTCUSDT"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type   | Required | Description                     |
| :-------- | :----- | :------- | :------------------------------ |
| symbol    | String | Yes      | Trading pair name, e.g. BTCUSDT |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1698313139948,    "data": {        "symbol": "BGBUSDT"    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description                                                                                                                               |
| :-------- | :----- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| symbol    | String | Cancelled symbol (This request is executed asynchronously. If you need to know the result, please query the Get History Orders endpoint.) |

# Get Order Info

Frequency limit: 20 times/1s (UID)

### Description[​](#description "Direct link to Description")

Get Order Info

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/trade/orderInfo

Request Example

```
curl "https://api.bitget.com/api/v2/spot/trade/orderInfo?orderId=1234567890" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

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

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

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

# Get Current Orders

Frequency limit: 20 times/1s (UID)

### Description[​](#description "Direct link to Description")

Get Unfilled Orders

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/trade/unfilled-orders

Request Example

```
curl "https://api.bitget.com/api/v2/spot/trade/unfilled-orders?symbol=BTCUSDT&startTime=1659036670000&endTime=1659076670000&limit=20" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \
```

### Request parameter[​](#request-parameter "Direct link to Request parameter")

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
{  "code": "00000",  "message": "success",  "requestTime": 1695808949356,  "data": [    {      "userId": "**********",      "symbol": "btcusdt",      "orderId": "2222222",      "clientOid": "xxxxxxx",      "priceAvg": "34829.12",      "size": "1",      "orderType": "limit",      "side": "buy",      "status": "new",      "basePrice": "0",      "baseVolume": "0",      "quoteVolume": "0",      "enterPointSource": "WEB",      "presetTakeProfitPrice": "70000",      "executeTakeProfitPrice": "",      "presetStopLossPrice": "10000",      "executeStopLossPrice": "",      "cTime": "1622697148",      "tpslType": "normal",      "triggerPrice": null    }  ]}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

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

# Get History Orders

Frequency limit: 20 times/1s (UID)

### Description[​](#description "Direct link to Description")

Get History Orders(It only supports to get the data within 90days. The older
data can be downloaded from web)

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/trade/history-orders

Request Example

```
curl "https://api.bitget.com/api/v2/spot/trade/history-orders?symbol=BTCUSDT&startTime=1659036670000&endTime=1659076670000&limit=20" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### request parameter[​](#request-parameter "Direct link to request parameter")

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
{    "code": "00000",    "message": "success",    "requestTime": 1695808949356,    "data": [        {            "userId": "*********",            "symbol": "ETHUSDT",            "orderId": "*****************************",            "clientOid": "*****************************",            "price": "0",            "size": "20.0000000000000000",            "orderType": "market",            "side": "buy",            "status": "filled",            "priceAvg": "1598.1000000000000000",            "baseVolume": "0.0125000000000000",            "quoteVolume": "19.9762500000000000",            "enterPointSource": "WEB",            "feeDetail": "{\"newFees\":{\"c\":0,\"d\":0,\"deduction\":false,\"r\":-0.112079256,\"t\":-0.112079256,\"totalDeductionFee\":0},\"USDT\":{\"deduction\":false,\"feeCoinCode\":\"ETH\",\"totalDeductionFee\":0,\"totalFee\":-0.1120792560000000}}",            "orderSource": "market",            "cTime": "1698736299656",            "uTime": "1698736300363",            "tpslType": "normal",            "cancelReason": "",            "triggerPrice": null        }    ]}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

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

# Get Fills

Frequency limit:10 times/1s (UID)

### Description[​](#description "Direct link to Description")

Get Fills(It only supports to get the data within 90days.The older data can be
downloaded from web)

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/trade/fills

Request Example

```
curl "https://api.bitget.com/api/v2/spot/trade/fills?symbol=BTCUSDT&startTime=1659036670000&endTime=1659076670000&limit=20" \    -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json" \
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

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

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

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
| feeDetail             | Array  | Transaction fee breakdown                               |
| &gt;deduction         | String | Discount or not                                         |
| &gt;feeCoin           | String | Transaction fee coin                                    |
| &gt;totalDeductionFee | String | Total transaction fee discount                          |
| &gt;totalFee          | String | Total transaction fee                                   |

# Place Plan Order

Frequency limit: 20 times/1s (UID)

### Description[​](#description "Direct link to Description")

Place plan order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/place-plan-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/place-plan-order" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json" \    -d '{"symbol": "TRXUSDT", "side": "buy", "triggerPrice": 0.041572, "executePrice": "0.041572", "size": 151, "triggerType": "market_price", "orderType": "limit","clientOid": "12345", "force": "gtc"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

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
| force        | String | No       | Execution strategy<br>Default value:<code>gtc</code><br><code>gtc</code>: normal limit order, good till canceled<br><code>post_only</code>: Post only<br><code>fok</code>: Fill or kill<br><code>ioc</code>: Immediate or cancel           |
| stpMode      | String | No       | STP Mode, default <code>none</code><br><code>none</code> not setting STP<br><code>cancel_taker</code> cancel taker order<br><code>cancel_maker</code> cancel maker order<br><code>cancel_both</code> cancel both of taker and maker orders |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1668134576535,    "data": {        "orderId": "121211212122",        "clientOid": "121211212122"    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description          |
| :-------- | :----- | :------------------- |
| orderId   | String | Order ID             |
| clientOid | String | Client customized ID |

# Modify Plan Order

Frequency limit: 20 times/1s (UID)

### Description[​](#description "Direct link to Description")

Modify Plan Order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/modify-plan-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/modify-plan-order" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json" \    -d '{"orderId": "121211212122", "triggerPrice": 0.041222, "executePrice":"0.041272", "size": 156, "orderType":"limit"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

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

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description          |
| :-------- | :----- | :------------------- |
| orderId   | String | Order ID             |
| clientOid | String | Client customized ID |

# Cancel Plan Order

Frequency limit: 20 times/1s (UID)

### Description[​](#description "Direct link to Description")

Cancel Plan order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/cancel-plan-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/cancel-plan-order" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json" \    -d '{"orderId": "121211212122"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type   | Required | Description                                  |
| :-------- | :----- | :------- | :------------------------------------------- |
| orderId   | String | No       | Either 'orderId' or 'clientOid' is required. |
| clientOid | String | No       | Either 'orderId' or 'clientOid' is required. |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1668134497496,    "data": {        "result":"success"    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description                  |
| :-------- | :----- | :--------------------------- |
| result    | String | Result is success or failure |

# Get Current Plan Orders

Frequency limit: 20 times/1s (UID)

### Description[​](#description "Direct link to Description")

Get Current Plan Orders

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/trade/current-plan-order

Request Example

```
curl "https://api.bitget.com/api/v2/spot/trade/current-plan-order?symbol=BTCUSDT&limit=10" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter  | Type   | Required | Description                                                                                                                                                                 |
| :--------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol     | String | Yes      | Trading pair, e.g. BTCUSDT                                                                                                                                                  |
| limit      | String | No       | Default is 20 Max is 100                                                                                                                                                    |
| idLessThan | String | No       | Requests the content on the page before this ID (older data), the value input should be the orderId of the corresponding interface.                                         |
| startTime  | String | No       | The start time of the record for the query. Unix millisecond timestamp, e.g. 1690196141868<br>The <code>startTime</code> and <code>endTime</code> should be within 90 days. |
| endTime    | String | No       | The end time of the record for the query. Unix millisecond timestamp, e.g. 1690196141868<br>The <code>startTime</code> and <code>endTime</code> should be within 90 days.   |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1668134581005,    "data": {        "nextFlag": false,        "idLessThan": "1",        "orderList": [            {                "orderId": "121211212122",                "clientOid": "121211212122",                "symbol": "TRXUSDT",                "size": "151",                "executePrice": "0.041572",                "triggerPrice": "0.041572",                "status": "not_trigger",                "orderType": "limit",                "side": "buy",                "planType":"amount",                "triggerType": "fill_price",                "enterPointSource": "API",                "uTime": "1668134576563",                "cTime": "1668134576563"            }        ]    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

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

# Get Plan Sub Order

Frequency limit: 20 times/1s (UID)

### Description[​](#description "Direct link to Description")

Get Plan Sub Order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/trade/plan-sub-order

Request Example

```
curl "https://api.bitget.com/api/v2/spot/trade/plan-sub-order?planOrderId=xxxxxxxxxxxxxxxxxx" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter   | Type   | Required | Description   |
| :---------- | :----- | :------- | :------------ |
| planOrderId | String | yes      | Plan Order ID |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1710813939206,    "data": [        {            "orderId": "xxxxxxxxxxxxx",            "price": "0.4188",            "type": "limit",            "status": "success"        }    ]}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type    | Description                                                                                                                                                                                |
| :-------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orderId   | boolean | Spot order ID                                                                                                                                                                              |
| price     | String  | Order price                                                                                                                                                                                |
| type      | String  | Order type<br>limit Limit price<br>market Market price                                                                                                                                     |
| status    | String  | Plan order trigger status<br>success: trigger success<br>fail: trigger failed<br>cancelled: cancelled<br>in_progress: trigger spot placing order<br>in_progress_tracking: tracking trigger |

# Get History Plan Orders

Frequency limit: 20 times/1s (UID)

### Description[​](#description "Direct link to Description")

Get History Plan Orders

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/trade/history-plan-order

Request Example

```
curl "https://api.bitget.com/api/v2/spot/trade/history-plan-order?symbol=BTCUSDT&startTime=1659036670000&endTime=1659076670000&limit=20" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                    |
| :-------- | :----- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol    | String | Yes      | Trading pair, e.g. BTCUSDT                                                                                                                                                                                                                     |
| startTime | String | Yes      | The start time of the historical trigger orders, i.e. to get orders after that timestamp<br>Unix millisecond timestamp, e.g. 1690196141868<br>The interval between <code>startTime</code> and <code>endTime</code> must not exceed 90 days     |
| endTime   | String | Yes      | The end time of the historical trigger orders, i.e., getting orders prior to that timestamp<br>Unix millisecond timestamp, e.g. 1690196141868<br>The interval between <code>startTime</code> and <code>endTime</code> must not exceed 90 days. |
| limit     | String | No       | Limit<br>Default is 100, max is 100                                                                                                                                                                                                            |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1668134581005,    "data": {        "nextFlag": false,        "idLessThan": "1",        "orderList": [            {                "orderId": "121211212122",                "clientOid": "121211212122",                "symbol": "TRXUSDT",                "size": "151",                "executePrice": "0.041572",                "triggerPrice": "0.041572",                "status": "not_trigger",                "orderType": "limit",                "side": "buy",                "planType":"amount",                "triggerType": "fill_price",                "enterPointSource": "API",                "uTime": "1668134576563",                "cTime": "1668134576563"            }        ]    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

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

# Cancel Plan Orders in Batch

Rate limit: 5 req/sec/UID

### Description[​](#description "Direct link to Description")

Cancel Plan Orders in Batch

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/batch-cancel-plan-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/batch-cancel-plan-order" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json" \    -d '{ "symbolList": ["BTCUSDT", "ETHUSDT"] }'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter  | Type                | Required | Description                                                                                                            |
| :--------- | :------------------ | :------- | :--------------------------------------------------------------------------------------------------------------------- |
| symbolList | List &lt;String&gt; | No       | Collection of trading pairs: ["BTCUSDT", "ETHUSDT"],<br>If no value is set, all spot trigger orders will be cancelled. |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683876261117,    "data": {        "successList":[{            "orderId": "121211212122",            "clientOid": "121211212122"        }],        "failureList":[{            "orderId": "121211212122",            "clientOid": "121211212122",            "errorMsg": "failure"        }]    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter     | Type               | Description                                        |
| :------------ | :----------------- | :------------------------------------------------- |
| successList   | List&lt;Object&gt; | The collection of successfully cancelled orders.   |
| &gt;orderId   | String             | Order ID                                           |
| &gt;clientOid | String             | Customize order ID                                 |
| failureList   | List&lt;Object&gt; | The collection of unsuccessfully cancelled orders. |
| &gt;orderId   | String             | Order ID                                           |
| &gt;clientOid | String             | Customize order ID                                 |
| &gt;errorMsg  | String             | Failure reason                                     |

# Get Account Information

Frequency limit: 1 time/1s (User ID)

### Description[​](#description "Direct link to Description")

Get account information(SPOT read or SPOT read/write permission needed)

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/account/info

Request Example

```
curl "https://api.bitget.com/api/v2/spot/account/info" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-------- | :--- | :------- | :---------- |
| N/A       |      |          |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": {        "userId": "**********",        "inviterId": "**********",        "ips": "127.0.0.1",        "authorities": [            "trade",            "readonly"        ],        "parentId": 1,        "traderType": "trader",        "channelCode": "XXX",        "channel": "YYY",        "regisTime":"1246566789345"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter   | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :---------- | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId      | String | User ID                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| inviterId   | String | Inviter's user ID                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| channelCode | String | Affiliate referral code                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| channel     | String | Affiliate                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ips         | String | IP whitelist                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| authorities | Array  | Permissions<br>Read only<br>coor: futures orders<br>cpor: futures holdings<br>stor: spot trade<br>smor: margin trade<br>ttor: copy trading<br>wtor: wallet transfer<br>taxr: taxation<br>chor: subaccount<br>p2pr: P2P query<br>Read and Write<br>coow: futures orders<br>cpow: futures holdings<br>stow: spot trade<br>smow: margin trade<br>ttow: copy trading<br>wtow: wallet transfer<br>wwow: wallet withdrawl<br>chow: subaccount manage<br>p2p: P2P |
| parentId    | Int    | Main account user ID                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| traderType  | String | trader: Is trader, not_trader: not trader                                                                                                                                                                                                                                                                                                                                                                                                                  |
| regisTime   | String | Register time                                                                                                                                                                                                                                                                                                                                                                                                                                              |

# Get Account Assets

Frequency limit: 10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get Account Assets

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/account/assets

Request Example

```
curl "https://api.bitget.com/api/v2/spot/account/assets?coin=USDT" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                       |
| :-------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| coin      | String | No       | Token name, e.g. USDT<br>This field is used for querying the positions of a single coin.                                                                                                                                                                                                                                                                                                          |
| assetType | String | No       | Asset type<br><code>hold_only</code>: Position coin<br><code>all</code>: All coins<br>This field is used used for querying the positions of multiple coins. The default value is <code>hold_only</code><br>When only <code>assetType</code> is entered without coin, results of all eligible coins are returned. When both coin and <code>assetType</code> are entered, coin has higher priority. |

Response Example

```
{    "code": "00000",    "message": "success",    "requestTime": 1695808949356,    "data": [        {            "coin": "usdt",            "available": "0",            "frozen": "0",            "locked": "0",            "limitAvailable": "0",            "uTime": "1622697148"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter      | Type   | Description                                                                                    |
| :------------- | :----- | :--------------------------------------------------------------------------------------------- |
| coin           | String | Token name                                                                                     |
| available      | String | Available assets                                                                               |
| frozen         | String | Amount of frozen assets<br>Usually frozen when the limit order is placed or join the Launchpad |
| locked         | String | Amount of locked assets<br>Locked assests required to become a fiat merchants, etc.            |
| limitAvailable | String | Restricted availability<br>For spot copy trading                                               |
| uTime          | String | Update time(ms)                                                                                |

# Get Sub-accounts Assets

Frequency limit: 10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get Sub-accounts Assets(only return the sub-accounts which assets > 0).  
**ND Brokers are not allowed to call this endpoint**

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/account/subaccount-assets

Request Example

```
curl "https://api.bitget.com/api/v2/spot/account/subaccount-assets" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-------- | :--- | :------- | :---------- |
| N/A       |      |          |

Response Example

```
{    "code": "00000",    "message": "success",    "requestTime": 1695808949356,    "data": [        {            "userId": 1234567890,            "assetsList": [                {                    "coin": "BTC",                    "available": "1.1",                    "limitAvailable": "12.1",                    "frozen": "0",                    "locked": "1.1",                    "uTime": "1337654897651"                }            ]        },        {            "userId": 1234567890,            "assetsList": [                {                    "coin": "ETH",                    "available": "12.1",                    "limitAvailable": "12.1",                    "frozen": "0",                    "locked": "1.1",                    "uTime": "1337654897651"                }            ]        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter           | Type   | Description                                      |
| :------------------ | :----- | :----------------------------------------------- |
| userId              | String | User ID                                          |
| assetsList          | Array  | List of spot assets                              |
| &gt; coin           | String | Token name                                       |
| &gt; available      | String | Available assets                                 |
| &gt; limitAvailable | String | Restricted availability<br>For spot copy trading |
| &gt; frozen         | String | Assets frozen                                    |
| &gt; locked         | String | Assets locked                                    |
| &gt; uTime          | string | update time, Unix, ms                            |

# Modify Deposit Account

Frequency limit:10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Modify the auto-transfer account type of deposit

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/wallet/modify-deposit-account

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/wallet/modify-deposit-account" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{    "coin":"USDT",    "accountType":"USDT-FUTURES"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter   | Type   | Required | Description                                                                                                                                                                                                                                             |
| :---------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| accountType | String | Yes      | Account type<br><code>spot</code>: Spot account<br><code>funding</code>: funding account<br><code>coin-futures</code>: Coin-M futures account<br><code>usdt-futures</code>: USDT-M futures account<br><code>usdc-futures</code>: USDC-M futures account |
| coin        | String | Yes      | Currency of transfer                                                                                                                                                                                                                                    |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683875302853,    "data": "success"}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description  |
| :-------- | :----- | :----------- |
| data      | String | success/fail |

# Get Account Bills

Frequency limit: 10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get Account Bills

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/account/bills

Request Example

```
curl "https://api.bitget.com/api/v2/spot/account/bills" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter    | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :----------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin         | String | No       | Token name, e.g. USDT                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| groupType    | String | No       | Billing type<br>deposit Deposit<br>withdraw Withdraw<br>transaction Transaction<br>transfer Transfer<br>loan Pledge loan<br>financial Wealth managemen<br>fait Fiat currency<br>convert Instant swap<br>c2c C2C token trading<br>pre_c2c Pre-market trading<br>on_chain On-chain transaction<br>strategy Trading strategy<br>other Other                                                                                                                     |
| businessType | String | No       | Business type<br>deposit: Deposit<br>withdraw: Withdraw<br>buy: Buy<br>sell: Sell<br>deduction of handling fee: Deduction of spot trading transaction fee<br>transfer-in: Transfer-in<br>transfer-out: Transfer-out<br>rebate rewards: Rebate<br>airdrop rewards: Airdrop rewards<br>USDT contract rewards: USDT futures promotion rewards<br>mix contract rewards: Mix contract promotion rewards<br>system lock: System lock-up<br>user lock: User lock-up |
| startTime    | String | No       | The start time of the billing history, i.e., getting the billing history after that timestamp<br>Unix millisecond timestamp, e.g. 1690196141868                                                                                                                                                                                                                                                                                                              |
| endTime      | String | No       | The end time of the billing history, i.e., getting the billing history before that timestamp<br>Unix millisecond timestamp, e.g. 1690196141868<br>The interval between startTime and endTime must not exceed 90 days.                                                                                                                                                                                                                                        |
| limit        | String | No       | Number of results returned. Default: 100, maximum 500.                                                                                                                                                                                                                                                                                                                                                                                                       |
| idLessThan   | String | No       | Requests the content on the page before this ID (older data), the value input should be the billId of the corresponding interface.                                                                                                                                                                                                                                                                                                                           |

Response Example

```
{    "code": "00000",    "message": "success",    "requestTime": 1695808949356,    "data": [        {            "cTime": "1622697148",            "coin": "usdt",            "groupType": "deposit",            "businessType": "transfer-in",            "size": "1",            "balance": "1",            "fees": "0",            "billId": "1291"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter    | Type   | Description                                                                                                                                                                                                                                                                                                                              |
| :----------- | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cTime        | String | Creation time                                                                                                                                                                                                                                                                                                                            |
| coin         | String | Token name                                                                                                                                                                                                                                                                                                                               |
| groupType    | String | Billing type<br>deposit Deposit<br>withdraw Withdraw<br>transaction Transaction<br>transfer Transfer<br>loan Pledge loan<br>financial Wealth managemen<br>fait Fiat currency<br>convert Instant swap<br>c2c C2C token trading<br>pre_c2c Pre-market trading<br>on_chain On-chain transaction<br>strategy Trading strategy<br>other Other |
| businessType | String | Business type of billing                                                                                                                                                                                                                                                                                                                 |
| size         | String | Quantity                                                                                                                                                                                                                                                                                                                                 |
| balance      | String | Assets prior to transfer                                                                                                                                                                                                                                                                                                                 |
| fees         | String | Transaction fees                                                                                                                                                                                                                                                                                                                         |
| billId       | String | Billing ID                                                                                                                                                                                                                                                                                                                               |

# Transfer

Rate limit: 10 requests/second/UID

### Description[​](#description "Direct link to Description")

Transfer assets between different `productType` accounts

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/wallet/transfer

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/wallet/transfer" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{    "fromType":"spot",    "toType":"isolated_margin",    "amount":"300",    "symbol":"BTCUSDT",    "clientOid":"1",    "coin":"USDT"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

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

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter  | Type   | Description     |
| :--------- | :----- | :-------------- |
| transferId | String | Transfer ID     |
| clientOid  | String | Custom order ID |

# GET Transferable Coin List

Frequency limit:10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get transferable coin list

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/wallet/transfer-coin-info

Request Example

```
curl "https://api.bitget.com/api/v2/spot/wallet/transfer-coin-info?fromType=isolated_margin&toType=spot" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \ }'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                   |
| :-------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| fromType  | String | Yes      | Account type<br><code>spot</code>: Spot account<br><code>p2p</code>: P2P account<br><code>coin_futures</code>: Coin-M futures account<br><code>usdt_futures</code>: USDT-M futures account<br><code>usdc_futures</code>: USDC-M futures account<br><code>crossed_margin</code>: Cross margin account<br><code>isolated_margin</code>: Isolated margin account |
| toType    | String | Yes      | Account type<br><code>spot</code>: Spot account<br><code>p2p</code>: P2P account<br><code>coin_futures</code>: Coin-M futures account<br><code>usdt_futures</code>: USDT-M futures account<br><code>usdc_futures</code>: USDC-M futures account<br><code>crossed_margin</code>: Cross margin account<br><code>isolated_margin</code>: Isolated margin account |

Response Example

```
{    "code":"00000",    "msg":"success",    "requestTime":1683875302853,    "data":[        "BTC",        "USDT",        "ETH"    ]}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description                                                           |
| :-------- | :--- | :-------------------------------------------------------------------- |
| data      | List | transfer_in and transfer_out of accounts supports coins intersection. |

# Sub Transfer

Rate limit: 10 req/sec/UID

### Description[​](#description "Direct link to Description")

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

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/wallet/subaccount-transfer

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/wallet/transfer" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{"fromUserId":"1","toUserId":"2","fromType":"spot","toType":"spot","amount":"10","coin":"USDT","clientOid":"1"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

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

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter  | Type   | Description     |
| :--------- | :----- | :-------------- |
| transferId | String | Transfer ID     |
| clientOid  | String | Custom order ID |

# Withdraw

Rate limit:5 req/sec/UID

### Description[​](#description "Direct link to Description")

- Coin withdrawals including on-chain withdrawals and internal transfers(the
  address needs to be added in the address book on web)
- KYC: For users in Korea, please note that if you withdraw funds to an account
  address on a Korean exchange and the amount is significant, the following 5
  parameters can be referenced for completion: `memberCode`, `identityType`,
  `companyName`, `firstName`, and `lastName`.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/wallet/withdrawal

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/wallet/withdrawal" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*" \  -H "ACCESS-PASSPHRASE:*" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:en-US" \  -H "Content-Type: application/json" \  -d '{"coin": "USDT","transferType":"on_chain","address": "*******************************************","chain": "trc20","size": "0.009"}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

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

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description     |
| :-------- | :----- | :-------------- |
| orderId   | String | Order ID        |
| clientOid | String | Custom order ID |

# Get MainSub Transfer Record

Rate limit: 20 req/sec/UID

### Description[​](#description "Direct link to Description")

Get transfer record

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/account/sub-main-trans-record

Request Example

```
curl "https://api.bitget.com/api/v2/spot/account/sub-main-trans-record?coin=USDT&startTime=1699510219000&endTime=1699684880000" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

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

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter  | Type   | Description                                                                                                                                                                                                                                                                  |
| :--------- | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin       | String | Token name                                                                                                                                                                                                                                                                   |
| status     | String | Status of transfer<br>Successful: Successful<br>Failed: Failed<br>Processing: Processing                                                                                                                                                                                     |
| toType     | String | Recipient account type<br>spot: Spot account<br>p2p: P2P account<br>coin_futures: Coin-M futures account<br>usdt_futures: USDT-M futures account<br>usdc_futures: USDC-M futures account<br>crossed_margin: Cross margin account<br>isolated_margin: Isolated margin account |
| fromType   | String | Sender account type<br>spot: Spot account<br>p2p: P2P account<br>coin_futures: Coin-M futures account<br>usdt_futures: USDT-M futures account<br>usdc_futures: USDC-M futures account<br>crossed_margin: Cross margin account<br>isolated_margin: Isolated margin account    |
| size       | String | Quantity                                                                                                                                                                                                                                                                     |
| ts         | String | Transfer time, Unix millisecond timestamp, e.g. 1690196141868                                                                                                                                                                                                                |
| clientOid  | String | Order ID customized by user                                                                                                                                                                                                                                                  |
| transferId | String | Transfer order ID                                                                                                                                                                                                                                                            |
| fromUserId | String | the user ID who initiate the trasnfer ID                                                                                                                                                                                                                                     |
| toUserId   | String | The user ID who receive the trnasfer                                                                                                                                                                                                                                         |

# Get Transfer Record

Frequency limit: 20 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get transfer record

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/account/transferRecords

Request Example

```
curl "https://api.bitget.com/api/v2/spot/account/transferRecords?coin=USDT&fromType=exchange&startTime=1659076670&endTime=1659076670&limit=100" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

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

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

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

# Switch BGB Deduct

Rate Limit: 1 req/sec/UID

### Description[​](#description "Direct link to Description")

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/account/switch-deduct

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/account/switch-deduct" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{"deduct":"on"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type   | Required | Description |
| :-------- | :----- | :------- | :---------- |
| deduct    | String | Yes      | on/off      |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683875302853,    "data": true}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-------- | :--- | :---------- |

# Get Deposit Address

Frequency limit: 10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get Deposit Address

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/wallet/deposit-address

Request Example

```
curl "https://api.bitget.com/api/v2/spot/wallet/deposit-address?coin=USDT&chain=trc20" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type   | Required | Description                                                                                                                                                                                          |
| :-------- | :----- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin      | String | Yes      | Coin name, e.g. USDT<br>All coin names can be returned from <a href="https://www.bitget.com/api-doc/spot/market/Get-Coin-List" target="_blank" rel="noopener noreferrer">Get Coin Info</a> interface |
| chain     | String | No       | Chain name, e.g. trc20<br>You can get the chain names via <a href="https://www.bitget.com/api-doc/spot/market/Get-Coin-List" target="_blank" rel="noopener noreferrer">Get Coin Info</a> interface   |
| size      | String | No       | Bitcoin Lightning Network withdrawal amount，limit：0.000001 - 0.01                                                                                                                                  |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683875302853,    "data": {        "address": "xxx",        "chain": "BTC-Bitcoin",        "coin": "BTC",        "tag": "",        "url": "https://btc.com/xxx"    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description        |
| :-------- | :----- | :----------------- |
| address   | String | Deposit address    |
| chain     | String | chain name         |
| coin      | String | Token name         |
| tag       | String | Tag                |
| url       | String | blockchain address |

# Get SubAccount Deposit Address

Rate limit: 10 req/sec/UID

### Description[​](#description "Direct link to Description")

Get Sub-account Deposit Address(Please ensure that queried sub-account has
deposit permission enabled)

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/wallet/subaccount-deposit-address

Request Example

```
curl "https://api.bitget.com/api/v2/spot/wallet/subaccount-deposit-address?coin=USDT&chain=ERC20&subUid=123" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

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

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description        |
| :-------- | :----- | :----------------- |
| address   | String | Deposit address    |
| chain     | String | chain name         |
| coin      | String | Token name         |
| tag       | String | Tag                |
| url       | String | blockchain address |

# Get BGB Deduct Info

Rate limit: 5 req/sec/UID

### Description[​](#description "Direct link to Description")

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/account/deduct-info

Request Example

```
curl "https://api.bitget.com/api/v2/spot/account/deduct-info" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-------- | :--- | :------- | :---------- |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": {        "deduct": "on"    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description |
| :-------- | :----- | :---------- |
| deduct    | String | on / off    |

# Cancel Withdrawal

Frequency limit:10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

1.  The user center can set the switch \[Cancel Withdrawal\], and there is a
    "regret period" of 1 minute to cancel the withdrawal.
2.  There is manual review in the preliminary review status, and the withdrawal
    can be cancelled. Once the initial review is passed or uploaded to the
    chain, the withdrawal cannot be revoked.
3.  Small-amount automatic currency withdrawals do not require manual review,
    and the withdrawal cannot be revoked.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/wallet/cancel-withdrawal

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/wallet/cancel-withdrawal" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{    "orderId":"1231231312312"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type   | Required | Description      |
| :-------- | :----- | :------- | :--------------- |
| orderId   | String | Yes      | Withdraw orderId |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683875302853,    "data": "success"}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description  |
| :-------- | :----- | :----------- |
| data      | String | success/fail |

# Get SubAccount Deposit Records

Frequency limit:10 times/1s (UID)

### Description[​](#description "Direct link to Description")

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/wallet/subaccount-deposit-records

Request Example

```
curl "https://api.bitget.com/api/v2/spot/wallet/subaccount-deposit-records?subUid=12121212&coin=USDT&idLessThan=1111120137173336063&limit=5" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

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

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

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

# Get Withdrawal Records

Frequency limit:10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get Withdrawal Records

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/wallet/withdrawal-records

Request Example

```
curl "https://api.bitget.com/api/v2/spot/wallet/withdrawal-records?coin=USDT&clientOid=123&startTime=1659036670000&endTime=1659076670000&limit=20" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

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

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

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

# Get Deposit Records

Frequency limit:10 times/1s (UID)

### Description[​](#description "Direct link to Description")

Get Deposit Records(Not include Fiat deposit record)

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/wallet/deposit-records

Request Example

```
curl "https://api.bitget.com/api/v2/spot/wallet/deposit-records?coin=USDT&startTime=1659036670000&endTime=1659076670000&limit=20" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

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

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

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

# Market Channel

### Description[​](#description "Direct link to Description")

Get the product's latest price, bid price, bid price and 24h trading volume
information. Frequency of data push: 100ms ~ 300ms

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "SPOT",            "channel": "ticker",            "instId": "ETHUSDT"        }    ]}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

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

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

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

### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

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

# Candlestick Channel

### Description[​](#description "Direct link to Description")

Get the candlestick data of the product

After first subscription, it will push the recent snapshot data and then push
the update data

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "SPOT",            "channel": "candle1m",            "instId": "ETHUSDT"        }    ]}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

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

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

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

### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

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

# Trading Channel

### Description[​](#description "Direct link to Description")

Push once if any trade is matched(taker orders)

After first subscription, it will push the recent snapshot data and then push
the update data

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "SPOT",            "channel": "trade",            "instId": "BTCUSDT"        }    ]}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

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

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

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

### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

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

# Depth Channel

### Description[​](#description "Direct link to Description")

This is the channel to get the depth data  
Default data push frequency for `books`, `books5`, `books15` is **200ms**  
Default data push frequency for `books1` is **60ms**

- `books`: All levels of depth. First update pushed is full data: `snapshot`,
  and then push the update data: `update`
- `books1`: 1st level of depth. Push `snapshot` each time
- `books5`: 5 depth levels. Push `snapshot` each time
- `books15`: 15 depth levels. Push `snapshot` each time

#### Checksum[​](#checksum "Direct link to Checksum")

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

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

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

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

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

### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter     | Type               | Description                                                                                                                                      |
| :------------ | :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| arg           | Object             | Channels with successful subscription                                                                                                            |
| &gt; instType | String             | Product type                                                                                                                                     |
| &gt; channel  | String             | Channel name: <code>books/books1/books5/books15</code>                                                                                           |
| &gt; instId   | String             | Product ID, e.g. ETHUSDT                                                                                                                         |
| action        | String             | Push data action, <code>snapshot</code> or <code>update</code>                                                                                   |
| data          | List&lt;Object&gt; | Subscription data                                                                                                                                |
| &gt; instId   | String             | Product ID, e.g. ETHUSDT                                                                                                                         |
| &gt; asks     | List&lt;String&gt; | Seller depth                                                                                                                                     |
| &gt; bids     | List&lt;String&gt; | Buyer depth                                                                                                                                      |
| &gt; ts       | String             | Matching engine timestamp(ms), e.g. 1597026383085                                                                                                |
| &gt; checksum | Long               | Checksum                                                                                                                                         |
| &gt; seq      | Long               | Serial number.<br>It increases when the order book is updated and can be used to determine whether there is packet loss or out-of-order packets. |

# Fill Channel

### Description[​](#description "Direct link to Description")

Trade Details channel

Request

```
{    "op": "subscribe",    "args": [        {            "instType": "SPOT",            "channel": "fill",            "instId": "default"        }    ]}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

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

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

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

### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

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

# Order Channel

### Description[​](#description "Direct link to Description")

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

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

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

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

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

### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

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

# Trigger Order Channel

### Description[​](#description "Direct link to Description")

Subscribe trigger order channel

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "SPOT",            "channel": "orders-algo",            "instId": "default"        }    ]}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

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

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

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

### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

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

# Account Channel

### Description[​](#description "Direct link to Description")

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

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

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

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

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

### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

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

# Rest API Error Code

| Error message | Error code                                                                                                                                                                                                                                                                                                                                                                       | http status code |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| 00000         | success!                                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 40001         | ACCESS_KEY cannot be empty                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 40002         | ACCESS_SIGN cannot be empty                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 40003         | Signature cannot be empty                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 40004         | Request timestamp expired                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 40005         | Invalid ACCESS_TIMESTAMP                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 40006         | Invalid ACCESS_KEY                                                                                                                                                                                                                                                                                                                                                               | 400              |
| 40007         | Invalid Content_Type                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 40008         | Request timestamp expired                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 40009         | sign signature error                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 40010         | Request timed out                                                                                                                                                                                                                                                                                                                                                                | 400              |
| 40011         | ACCESS_PASSPHRASE cannot be empty                                                                                                                                                                                                                                                                                                                                                | 400              |
| 40012         | apikey/password is incorrect                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 40013         | User status is abnormal                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 40014         | Incorrect permissions, need {0} permissions                                                                                                                                                                                                                                                                                                                                      | 400              |
| 40015         | System is abnormal, please try again later                                                                                                                                                                                                                                                                                                                                       | 400              |
| 40016         | The user must bind the phone or Google                                                                                                                                                                                                                                                                                                                                           | 400              |
| 40017         | Parameter verification failed {0}                                                                                                                                                                                                                                                                                                                                                | 400              |
| 00171         | Parameter verification failed {0}{1}                                                                                                                                                                                                                                                                                                                                             | 400              |
| 00172         | Parameter verification failed                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 40018         | Invalid IP                                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 40019         | Parameter {0} cannot be empty                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 40020         | Parameter {0} error                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 40021         | User disable withdraw                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40022         | The business of this account has been restricted                                                                                                                                                                                                                                                                                                                                 | 400              |
| 40023         | The business of this account has been restricted                                                                                                                                                                                                                                                                                                                                 | 400              |
| 40024         | Account has been frozen                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 40025         | The business of this account has been restricted                                                                                                                                                                                                                                                                                                                                 | 400              |
| 40026         | User is disabled                                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 40027         | Withdrawals in this account area must be kyc                                                                                                                                                                                                                                                                                                                                     | 400              |
| 40028         | This subUid does not belong to this account                                                                                                                                                                                                                                                                                                                                      | 400              |
| 40029         | This account is not a Broker, please apply to become a Broker first                                                                                                                                                                                                                                                                                                              | 400              |
| 40031         | The account has been cancelled and cannot be used again                                                                                                                                                                                                                                                                                                                          | 400              |
| 40032         | The Max of sub-account created has reached the limit                                                                                                                                                                                                                                                                                                                             | 400              |
| 40033         | This email has been bound                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 40034         | Parameter {0} does not exist                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 50001         | coin {0} does not support cross                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 50002         | symbol {0} does not support isolated                                                                                                                                                                                                                                                                                                                                             | 400              |
| 50003         | coin {0} does not support isolated                                                                                                                                                                                                                                                                                                                                               | 400              |
| 50004         | symbol {0} does not support cross                                                                                                                                                                                                                                                                                                                                                | 400              |
| 40035         | Judging from your login information, you are required to complete KYC first for compliance reasons.                                                                                                                                                                                                                                                                              | 400              |
| 40036         | passphrase is error                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 40037         | Apikey does not exist                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40038         | The current ip is not in the apikey ip whitelist                                                                                                                                                                                                                                                                                                                                 | 400              |
| 40039         | FD Broker's user signature error                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 40040         | user api key permission setting error                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40041         | User's ApiKey does not exist                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 40043         | FD Broker does not exist                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 40045         | The bound user cannot be an FD broker                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40047         | FD Broker binding related interface call frequency limit                                                                                                                                                                                                                                                                                                                         | 400              |
| 40048         | The user's ApiKey must be the parent account                                                                                                                                                                                                                                                                                                                                     | 400              |
| 40049         | User related fields decrypt error                                                                                                                                                                                                                                                                                                                                                | 400              |
| 40051         | This account is not a FD Broker, please apply to become a FD Broker first                                                                                                                                                                                                                                                                                                        | 400              |
| 40052         | Security settings have been modified for this account. For the safety of your account, withdrawals are prohibited within 24 hours                                                                                                                                                                                                                                                | 400              |
| 40053         | Value range verification failed: {0} should be between {1}                                                                                                                                                                                                                                                                                                                       | 400              |
| 40054         | The data fetched by {0} is empty                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 40055         | subName must be an English letter with a length of 8                                                                                                                                                                                                                                                                                                                             | 400              |
| 40056         | remark must be length of 1 ~ 20                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 40057         | Parameter {0} {1} does not meet specification                                                                                                                                                                                                                                                                                                                                    | 400              |
| 40058         | Parameter {0} Only a maximum of {1} is allowed                                                                                                                                                                                                                                                                                                                                   | 400              |
| 40059         | Parameter {0} should be less than {1}                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40060         | subNames already exists                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 40061         | sub-account not allow access                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 40063         | API exceeds the maximum limit added                                                                                                                                                                                                                                                                                                                                              | 400              |
| 40064         | Sub-account creation failed, please check if there is a duplicate                                                                                                                                                                                                                                                                                                                | 400              |
| 40065         | This subApikey does not exist                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 40066         | This subUid does not belong to the account or is not a virtual sub-account                                                                                                                                                                                                                                                                                                       | 400              |
| 40067         | sub-account create failed, please check if there is a duplicate                                                                                                                                                                                                                                                                                                                  | 400              |
| 40068         | Disable subaccount access                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 40069         | The maximum number of sub-accounts created has been reached                                                                                                                                                                                                                                                                                                                      | 400              |
| 40070         | passphrase 8-32 characters with letters and numbers                                                                                                                                                                                                                                                                                                                              | 400              |
| 40071         | subName exist duplication                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 40072         | symbol {0} is Invalid or not supported mix contract trade                                                                                                                                                                                                                                                                                                                        | 400              |
| 40102         | Symbol does not exist                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40109         | The data of the order cannot be found, please confirm the order number                                                                                                                                                                                                                                                                                                           | 400              |
| 40200         | Server upgrade, please try again later                                                                                                                                                                                                                                                                                                                                           | 400              |
| 40301         | Permission has not been obtained yet. If you need to use it, please contact customer service                                                                                                                                                                                                                                                                                     | 400              |
| 40303         | Can only query up to 20,000 data                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 40304         | clientOid or clientOrderId length cannot greater than 50                                                                                                                                                                                                                                                                                                                         | 400              |
| 40305         | clientOid or clientOrderId length cannot greater than 64, and cannot be Martian characters                                                                                                                                                                                                                                                                                       | 400              |
| 40306         | Batch processing orders can only process up to 20                                                                                                                                                                                                                                                                                                                                | 400              |
| 40308         | The contract is being temporarily maintained                                                                                                                                                                                                                                                                                                                                     | 400              |
| 40309         | The contract has been removed                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 40400         | Status check abnormal                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40401         | The operation cannot be performed                                                                                                                                                                                                                                                                                                                                                | 400              |
| 40402         | orderId or clientOId format error                                                                                                                                                                                                                                                                                                                                                | 400              |
| 40407         | The query direction is not the direction entrusted by the plan                                                                                                                                                                                                                                                                                                                   | 400              |
| 40408         | Range error                                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 40409         | wrong format                                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 40704         | Can only check the data of the last three months                                                                                                                                                                                                                                                                                                                                 | 400              |
| 40705         | The start and end time cannot exceed 90 days                                                                                                                                                                                                                                                                                                                                     | 400              |
| 40706         | Wrong order price                                                                                                                                                                                                                                                                                                                                                                | 400              |
| 40707         | Start time is greater than end time                                                                                                                                                                                                                                                                                                                                              | 400              |
| 40708         | client_oid duplicate                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 40709         | There is no position in this position, and no automatic margin call can be set                                                                                                                                                                                                                                                                                                   | 400              |
| 40710         | Abnormal account status                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 40711         | Insufficient contract account balance                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40712         | Insufficient margin                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 40713         | Cannot exceed the maximum transferable margin amount                                                                                                                                                                                                                                                                                                                             | 400              |
| 40714         | No direct margin call is allowed                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 40715         | delegate count can not high max of open count                                                                                                                                                                                                                                                                                                                                    | 400              |
| 40716         | This trading pair not support Cross Margin mode                                                                                                                                                                                                                                                                                                                                  | 400              |
| 40717         | The number of closed positions cannot exceed the number of sheets held                                                                                                                                                                                                                                                                                                           | 400              |
| 40718         | The entrusted price of Pingduo shall not be lower than the bursting price                                                                                                                                                                                                                                                                                                        | 400              |
| 40719         | Flat empty entrustment price is not allowed to be higher than explosion price                                                                                                                                                                                                                                                                                                    | 400              |
| 40720         | swap hand depth does not exist                                                                                                                                                                                                                                                                                                                                                   | 400              |
| 40721         | Market price list is not allowed at present                                                                                                                                                                                                                                                                                                                                      | 400              |
| 40722         | Due to excessive price fluctuations and the insufficient market price entrusted cost, the opening commission is failed.                                                                                                                                                                                                                                                          | 400              |
| 40723         | The total number of unexecuted orders is too high                                                                                                                                                                                                                                                                                                                                | 400              |
| 40724         | Parameter is empty                                                                                                                                                                                                                                                                                                                                                               | 400              |
| 40725         | service return an error                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 40726         | Cross margin not support Auto Margin Replenishment (AMR)                                                                                                                                                                                                                                                                                                                         | 400              |
| 40727         | Cross margin not support margin adjustment                                                                                                                                                                                                                                                                                                                                       | 400              |
| 40728         | You’re log in as trader, please close position for current copy trade orders                                                                                                                                                                                                                                                                                                     | 400              |
| 40729         | Failed to adjust the position, the current position or order or plan order                                                                                                                                                                                                                                                                                                       | 400              |
| 40730         | There is currently a commission or a planned commission, and the leverage cannot be adjusted                                                                                                                                                                                                                                                                                     | 400              |
| 40731         | This product does not support copy trading                                                                                                                                                                                                                                                                                                                                       | 400              |
| 40732         | Not currently a trader                                                                                                                                                                                                                                                                                                                                                           | 400              |
| 40199         | Traders are prohibited from calling the API                                                                                                                                                                                                                                                                                                                                      | 400              |
| 40733         | The order closing has been processed                                                                                                                                                                                                                                                                                                                                             | 400              |
| 40734         | Failed to place an order, the minimum number of traders to open a position {0}                                                                                                                                                                                                                                                                                                   | 400              |
| 40735         | Long position take profit price should be greater than the average opening price                                                                                                                                                                                                                                                                                                 | 400              |
| 40736         | Long position take profit price is greater than the current price                                                                                                                                                                                                                                                                                                                | 400              |
| 40737         | The short position take profit price should be less than the average opening price                                                                                                                                                                                                                                                                                               | 400              |
| 40738         | The short position take profit price should be less than the current price                                                                                                                                                                                                                                                                                                       | 400              |
| 40739         | The stop loss price of a long position should be less than the average opening price                                                                                                                                                                                                                                                                                             | 400              |
| 40740         | The stop loss price of a long position should be less than the current price                                                                                                                                                                                                                                                                                                     | 400              |
| 40741         | The stop loss price of a short position should be greater than the average opening price                                                                                                                                                                                                                                                                                         | 400              |
| 40742         | The stop loss price of the short position should be greater than the current price                                                                                                                                                                                                                                                                                               | 400              |
| 40743         | The order is being closed and cannot be closed again                                                                                                                                                                                                                                                                                                                             | 400              |
| 40744         | The tracking order status is wrong                                                                                                                                                                                                                                                                                                                                               | 400              |
| 40745         | This order is being commissioned, and liquidation is not supported temporarily                                                                                                                                                                                                                                                                                                   | 400              |
| 40746         | The current maximum number of positions that can be closed is {0}, if you exceed the number, please go to the current order to close the position                                                                                                                                                                                                                                | 400              |
| 40747         | The bonus is not allowed to hold two-way positions                                                                                                                                                                                                                                                                                                                               | 400              |
| 40748         | The commission price is higher than the highest bid price                                                                                                                                                                                                                                                                                                                        | 400              |
| 40749         | The commission price is lower than the lowest selling price                                                                                                                                                                                                                                                                                                                      | 400              |
| 40750         | The plan commission for this contract has reached the upper limit                                                                                                                                                                                                                                                                                                                | 400              |
| 40751         | The contract's stop profit and stop loss order has reached the upper limit                                                                                                                                                                                                                                                                                                       | 400              |
| 40752         | You are disabled for current business, if you have any questions, please contact customer service                                                                                                                                                                                                                                                                                | 400              |
| 40753         | The contract transaction business is disabled, if you have any questions, please contact customer service                                                                                                                                                                                                                                                                        | 400              |
| 40754         | balance not enough                                                                                                                                                                                                                                                                                                                                                               | 400              |
| 40755         | Not enough open positions are available.                                                                                                                                                                                                                                                                                                                                         | 400              |
| 40756         | The balance lock is insufficient.                                                                                                                                                                                                                                                                                                                                                | 400              |
| 40757         | Not enough position is available.                                                                                                                                                                                                                                                                                                                                                | 400              |
| 40758         | The position lock is insufficient.                                                                                                                                                                                                                                                                                                                                               | 400              |
| 40759         | No assets                                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 40760         | Account abnormal status                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 40761         | The total number of unfilled orders is too high                                                                                                                                                                                                                                                                                                                                  | 400              |
| 40762         | The order size is greater than the max open size                                                                                                                                                                                                                                                                                                                                 | 400              |
| 40763         | The number of orders cannot exceed the maximum amount of the corresponding gear                                                                                                                                                                                                                                                                                                  | 400              |
| 40764         | The remaining amount of the order is less than the current transaction volume                                                                                                                                                                                                                                                                                                    | 400              |
| 40765         | The remaining volume of the position is less than the current transaction volume                                                                                                                                                                                                                                                                                                 | 400              |
| 40766         | The number of open orders is less than this transaction volume                                                                                                                                                                                                                                                                                                                   | 400              |
| 40767         | Position does not exist when opening a position                                                                                                                                                                                                                                                                                                                                  | 400              |
| 40768         | Order does not exist                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 40769         | Reject order has been completed                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 40770         | The settlement or fee currency configuration was not found.                                                                                                                                                                                                                                                                                                                      | 400              |
| 40771         | When there is a gap, you cannot have a position closing order.                                                                                                                                                                                                                                                                                                                   | 400              |
| 40772         | The account does not exist                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 40773         | Closed positions can only occur in two-way positions.                                                                                                                                                                                                                                                                                                                            | 400              |
| 40774         | The order type for unilateral position must also be the unilateral position type.                                                                                                                                                                                                                                                                                                | 400              |
| 40775         | The market-making account can only be a unilateral position type.                                                                                                                                                                                                                                                                                                                | 400              |
| 40776         | Error creating order.                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40777         | Cancel order error.                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 40778         | Coin pair {0} does not support {1} currency as margin                                                                                                                                                                                                                                                                                                                            | 400              |
| 40779         | Please check that the correct delegateType is used                                                                                                                                                                                                                                                                                                                               | 400              |
| 40780         | There are multiple risk handling records for the same symbolId at the same time                                                                                                                                                                                                                                                                                                  | 400              |
| 40781         | The transfer order was not found                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 40782         | Internal transfer error                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 40783         | No gear found                                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 40784         | Need to configure modify depth account                                                                                                                                                                                                                                                                                                                                           | 400              |
| 40785         | Need to configure draw line account                                                                                                                                                                                                                                                                                                                                              | 400              |
| 40786         | Duplicate clientOid                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 40787         | The price step does not match                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 40788         | Internal batch transfer error                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 40789         | The tokenId is duplicated in the configuration item                                                                                                                                                                                                                                                                                                                              | 400              |
| 40790         | Duplicate symbolCode in configuration item                                                                                                                                                                                                                                                                                                                                       | 400              |
| 40791         | The baseToken or quoteToken of symbolCode does not exist                                                                                                                                                                                                                                                                                                                         | 400              |
| 40792         | The symbol in the configuration item is duplicated                                                                                                                                                                                                                                                                                                                               | 400              |
| 40793         | The symbolCode of BusinessSymbol does not exist                                                                                                                                                                                                                                                                                                                                  | 400              |
| 40794         | The supportMarginToken of BusinessSymbol is not configured                                                                                                                                                                                                                                                                                                                       | 400              |
| 40795         | The transaction is suspended due to settlement or maintenance reasons                                                                                                                                                                                                                                                                                                            | 400              |
| 40796         | The adjusted leverage is not within the appropriate range                                                                                                                                                                                                                                                                                                                        | 400              |
| 40797         | Exceeded the maximum settable leverage                                                                                                                                                                                                                                                                                                                                           | 400              |
| 40798         | Insufficient contract account balance                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40799         | Cannot be less than the minimum transfer amount                                                                                                                                                                                                                                                                                                                                  | 400              |
| 40800         | Insufficient amount of margin                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 40801         | Cannot exceed the maximum transferable deposit amount                                                                                                                                                                                                                                                                                                                            | 400              |
| 40802         | Position is zero and direct margin call is not allowed                                                                                                                                                                                                                                                                                                                           | 400              |
| 40803         | The leverage is reduced and the amount of margin call is incorrect                                                                                                                                                                                                                                                                                                               | 400              |
| 40804         | The number of closed positions cannot exceed the number of positions held                                                                                                                                                                                                                                                                                                        | 400              |
| 40805         | Unsupported operation                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40806         | Unsupported currency                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 40807         | The account does not exist                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 40808         | Parameter verification exception {0}                                                                                                                                                                                                                                                                                                                                             | 400              |
| 40809         | Execution price parameter verification exception                                                                                                                                                                                                                                                                                                                                 | 400              |
| 40810         | Triggered price parameter verification exception                                                                                                                                                                                                                                                                                                                                 | 400              |
| 40811         | The parameter {0} should not be null                                                                                                                                                                                                                                                                                                                                             | 400              |
| 40812         | The condition {0} is not met                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 40813         | The parameter {0} must have a value and cannot be empty                                                                                                                                                                                                                                                                                                                          | 400              |
| 40814         | No change in leverage                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40815         | The order price is higher than the highest bid price                                                                                                                                                                                                                                                                                                                             | 400              |
| 40816         | The order price is lower than the lowest selling price                                                                                                                                                                                                                                                                                                                           | 400              |
| 40817         | The current order status cannot be cancelled                                                                                                                                                                                                                                                                                                                                     | 400              |
| 40818         | The current order type cannot be cancelled                                                                                                                                                                                                                                                                                                                                       | 400              |
| 40819         | The order does not exist!                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 40820         | The order price for closing a long position is not allowed to be lower than the liquidation price                                                                                                                                                                                                                                                                                | 400              |
| 40821         | The closing order price cannot be higher than the liquidation price                                                                                                                                                                                                                                                                                                              | 400              |
| 40822         | The contract configuration does not exist                                                                                                                                                                                                                                                                                                                                        | 400              |
| 40823         | The transaction or reasonable marked price does not exist                                                                                                                                                                                                                                                                                                                        | 400              |
| 40824         | Currently, it is not allowed to list market orders                                                                                                                                                                                                                                                                                                                               | 400              |
| 40825         | Contract opponent depth does not exist                                                                                                                                                                                                                                                                                                                                           | 400              |
| 40826         | Due to excessive price fluctuations, the market order cost is insufficient, and the position opening order failed.                                                                                                                                                                                                                                                               | 400              |
| 40827         | The bonus is not allowed to hold two-way positions                                                                                                                                                                                                                                                                                                                               | 400              |
| 40828         | Special market making accounts cannot manually place orders                                                                                                                                                                                                                                                                                                                      | 400              |
| 40829         | The take profit price of a long position should be greater than the average open price                                                                                                                                                                                                                                                                                           | 400              |
| 40830         | The take profit price of the long position should be greater than the current price                                                                                                                                                                                                                                                                                              | 400              |
| 40831         | The short position take profit price should be less than the average open price                                                                                                                                                                                                                                                                                                  | 400              |
| 40832         | The take profit price of short positions should be less than the current price                                                                                                                                                                                                                                                                                                   | 400              |
| 40833         | The stop loss price of a long position should be less than the average opening price                                                                                                                                                                                                                                                                                             | 400              |
| 40834         | The stop loss price of the long position should be less than the current price                                                                                                                                                                                                                                                                                                   | 400              |
| 40835         | The stop loss price of the short position should be greater than the average opening price                                                                                                                                                                                                                                                                                       | 400              |
| 40836         | The stop loss price of the short position should be greater than the current price                                                                                                                                                                                                                                                                                               | 400              |
| 40837         | There is no position in this position, so stop-profit and stop-loss orders cannot be made                                                                                                                                                                                                                                                                                        | 400              |
| 40838         | There is no position in this position, and automatic margin call cannot be set                                                                                                                                                                                                                                                                                                   | 400              |
| 40839         | The automatic margin call function of this contract has been suspended                                                                                                                                                                                                                                                                                                           | 400              |
| 40840         | Duplicate shard market making account                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40841         | Online environment does not allow execution                                                                                                                                                                                                                                                                                                                                      | 400              |
| 40842         | Current configuration does not allow adjustment, please try again later                                                                                                                                                                                                                                                                                                          | 400              |
| 40843         | no_datasource_key_exists                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 40844         | This contract is under temporary maintenance                                                                                                                                                                                                                                                                                                                                     | 400              |
| 40845         | This contract has been removed                                                                                                                                                                                                                                                                                                                                                   | 400              |
| 40846         | Status verification abnormal                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 40847         | The operation cannot be performed                                                                                                                                                                                                                                                                                                                                                | 400              |
| 40848         | Cannot open a copy transaction if there is a position                                                                                                                                                                                                                                                                                                                            | 400              |
| 40849         | This user already has an ongoing copy                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40850         | The copy is in progress, the balance cannot be transferred                                                                                                                                                                                                                                                                                                                       | 400              |
| 40851         | Account status is wrong, cannot end copying                                                                                                                                                                                                                                                                                                                                      | 400              |
| 40852         | There are unfilled orders, cannot end the copy                                                                                                                                                                                                                                                                                                                                   | 400              |
| 40853         | There is an unexecuted plan order, cannot end the copy                                                                                                                                                                                                                                                                                                                           | 400              |
| 40854         | This product does not support copy trading                                                                                                                                                                                                                                                                                                                                       | 400              |
| 40855         | The user has ended copying and cannot end copying again                                                                                                                                                                                                                                                                                                                          | 400              |
| 40856         | Data abnormal                                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 40857         | Document number error                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40858         | Error tracking order status                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 40859         | This order is being closed and cannot be closed again                                                                                                                                                                                                                                                                                                                            | 400              |
| 40860         | The trader does not exist and cannot be set to follow                                                                                                                                                                                                                                                                                                                            | 400              |
| 40861         | The trader has been disabled and cannot be set to follow                                                                                                                                                                                                                                                                                                                         | 400              |
| 40862         | Please cancel the current order                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 40863         | Please cancel the current plan                                                                                                                                                                                                                                                                                                                                                   | 400              |
| 40864         | Please close the current position with orders                                                                                                                                                                                                                                                                                                                                    | 400              |
| 40865         | This order is being commissioned, and it is not currently supported to close the position                                                                                                                                                                                                                                                                                        | 400              |
| 40866         | You are currently a trader, please close the position under the current order                                                                                                                                                                                                                                                                                                    | 400              |
| 40867         | Currently the maximum number of positions that can be closed is {0}, please go to the current order to close the position if the amount exceeds                                                                                                                                                                                                                                  | 400              |
| 40868         | You are currently a trader and currently do not support liquidation through planned orders                                                                                                                                                                                                                                                                                       | 400              |
| 40869         | You are currently a trader and currently do not support modification of leverage                                                                                                                                                                                                                                                                                                 | 400              |
| 40870         | You are currently copying an order and currently do not support modifying the leverage                                                                                                                                                                                                                                                                                           | 400              |
| 40871         | The leverage does not meet the configuration, and you cannot become a trader                                                                                                                                                                                                                                                                                                     | 400              |
| 40872         | Failed to adjust position, currently holding position or order or plan order                                                                                                                                                                                                                                                                                                     | 400              |
| 40873         | The account has a margin and needs to be transferred out                                                                                                                                                                                                                                                                                                                         | 400              |
| 40874         | Whole position mode does not support automatic margin call                                                                                                                                                                                                                                                                                                                       | 400              |
| 40875         | Whole position mode does not support margin adjustment                                                                                                                                                                                                                                                                                                                           | 400              |
| 40876         | Too many tracking orders                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 40877         | Too many follow-up orders                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 40878         | The contract index data is abnormal. In order to avoid causing your loss, please try again later.                                                                                                                                                                                                                                                                                | 400              |
| 40879         | The risk is being processed, and the funds cannot be adjusted.                                                                                                                                                                                                                                                                                                                   | 400              |
| 40880         | The risk is being processed and the leverage cannot be adjusted.                                                                                                                                                                                                                                                                                                                 | 400              |
| 40881         | There is currently an order, or an order is planned, and the leverage cannot be adjusted.                                                                                                                                                                                                                                                                                        | 400              |
| 40883         | When the currencies are mixed, it cannot be adjusted to the warehouse-by-warehouse mode                                                                                                                                                                                                                                                                                          | 400              |
| 40884         | When a one-way position is held, it cannot be adjusted to a position-by-position mode                                                                                                                                                                                                                                                                                            | 400              |
| 40885         | In the case of position by position mode, it cannot be adjusted to one-way position                                                                                                                                                                                                                                                                                              | 400              |
| 40886         | The automatic margin call cannot be adjusted in the full position mode                                                                                                                                                                                                                                                                                                           | 400              |
| 40887         | Failed to place the order, the number of single lightning open positions is at most {0}                                                                                                                                                                                                                                                                                          | 400              |
| 40888         | Failed to place the order, the maximum amount of single lightning closing is {0}                                                                                                                                                                                                                                                                                                 | 400              |
| 40889         | The plan order of this contract has reached the upper limit                                                                                                                                                                                                                                                                                                                      | 400              |
| 40890         | The order of stop-profit and stop-loss for this contract has reached the upper limit                                                                                                                                                                                                                                                                                             | 400              |
| 40891         | Insufficient position, can not set take profit or stop loss                                                                                                                                                                                                                                                                                                                      | 400              |
| 40892         | Failed to place the order, the minimum number of positions opened by the trader is {0}                                                                                                                                                                                                                                                                                           | 400              |
| 40893         | Unable to update the leverage factor of this position, there is not enough margin!                                                                                                                                                                                                                                                                                               | 400              |
| 40894         | The documentary closing has been processed                                                                                                                                                                                                                                                                                                                                       | 400              |
| 40895         | The preset price does not match the order/execution price                                                                                                                                                                                                                                                                                                                        | 400              |
| 40896         | The default stop profit and stop loss has been partially fulfilled and cannot be modified                                                                                                                                                                                                                                                                                        | 400              |
| 40897         | The system experience gold account does not exist                                                                                                                                                                                                                                                                                                                                | 400              |
| 40898         | The system experience gold account balance is insufficient                                                                                                                                                                                                                                                                                                                       | 400              |
| 40899         | The number of stored users exceeds the limit                                                                                                                                                                                                                                                                                                                                     | 400              |
| 40900         | The system experience gold account is inconsistent                                                                                                                                                                                                                                                                                                                               | 400              |
| 40901         | The contract experience fund balance is insufficient                                                                                                                                                                                                                                                                                                                             | 400              |
| 40902         | Future time is not allowed                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 40903         | Failed to obtain leverage information                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40904         | Failed to collect funds                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 40905         | Failed to collect user funds                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 40906         | Failed to pay user funds                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 40907         | The payment cannot be transferred                                                                                                                                                                                                                                                                                                                                                | 400              |
| 40908         | Concurrent operation failed                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 40909         | Transfer processing                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 40910         | Operation timed out                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 40911         | Request timestamp expired                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 40912         | single cancel cannot exceed 50                                                                                                                                                                                                                                                                                                                                                   | 400              |
| 40913         | {0} must be passed one                                                                                                                                                                                                                                                                                                                                                           | 400              |
| 40914         | Trader the maximum leverage can use is {0}                                                                                                                                                                                                                                                                                                                                       | 400              |
| 40915         | Long position take profit price please &gt; mark price                                                                                                                                                                                                                                                                                                                           | 400              |
| 40916         | The business of this account has been restricted                                                                                                                                                                                                                                                                                                                                 | 400              |
| 40917         | Stop price for long positions please &lt; mark price {0}                                                                                                                                                                                                                                                                                                                         | 400              |
| 40918         | Traders open positions with orders too frequently                                                                                                                                                                                                                                                                                                                                | 400              |
| 40919         | This function is not open yet                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 40920         | Position or order exists, the position mode cannot be switched                                                                                                                                                                                                                                                                                                                   | 400              |
| 40921         | The order size cannot exceed the maximum size of the positionLevel                                                                                                                                                                                                                                                                                                               | 400              |
| 40922         | Only work order modifications are allowed                                                                                                                                                                                                                                                                                                                                        | 400              |
| 40923         | Order size and price have not changed                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40924         | orderId and clientOid must have one                                                                                                                                                                                                                                                                                                                                              | 400              |
| 40925         | price or size must be passed in together                                                                                                                                                                                                                                                                                                                                         | 400              |
| 43013         | Take profit price needs&gt; current price                                                                                                                                                                                                                                                                                                                                        | 400              |
| 43014         | Take profit price needs to be &lt;current price                                                                                                                                                                                                                                                                                                                                  | 400              |
| 43015         | Stop loss price needs to be &lt;current price                                                                                                                                                                                                                                                                                                                                    | 400              |
| 43016         | Stop loss price needs to be&gt; current price                                                                                                                                                                                                                                                                                                                                    | 400              |
| 43017         | You are currently a trader and currently do not support liquidation through planned orders                                                                                                                                                                                                                                                                                       | 400              |
| 43020         | Stop profit and stop loss order does not exist                                                                                                                                                                                                                                                                                                                                   | 400              |
| 43021         | The stop-profit and stop-loss order has been closed                                                                                                                                                                                                                                                                                                                              | 400              |
| 43022         | Failed to trigger the default stop loss                                                                                                                                                                                                                                                                                                                                          | 400              |
| 43023         | Insufficient position, can not set profit or stop loss                                                                                                                                                                                                                                                                                                                           | 400              |
| 43024         | Take profit/stop loss in an existing order, please change it after canceling all                                                                                                                                                                                                                                                                                                 | 400              |
| 43025         | Plan order does not exist                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 43026         | The planned order has been closed                                                                                                                                                                                                                                                                                                                                                | 400              |
| 43027         | The minimum order value {0} is not met                                                                                                                                                                                                                                                                                                                                           | 400              |
| 43028         | Please enter an integer multiple of {0} for price                                                                                                                                                                                                                                                                                                                                | 400              |
| 43029         | The size of the current Order &gt; the maximum number of positions that can be closed                                                                                                                                                                                                                                                                                            | 400              |
| 43030         | Take profit order already existed                                                                                                                                                                                                                                                                                                                                                | 400              |
| 43031         | Stop loss order already existed                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 43032         | rangeRate is smaller than {0}                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 43033         | Trailing order does not exist                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 43034         | The trigger price should be ≤ the current market price                                                                                                                                                                                                                                                                                                                           | 400              |
| 43035         | The trigger price should be ≥ the current market price                                                                                                                                                                                                                                                                                                                           | 400              |
| 43036         | Trader modify tpsl can only be operated once within 300ms                                                                                                                                                                                                                                                                                                                        | 400              |
| 43037         | The minimum order amount allowed for trading is {0}                                                                                                                                                                                                                                                                                                                              | 400              |
| 43038         | The maximum order amount allowed for trading is {0}                                                                                                                                                                                                                                                                                                                              | 400              |
| 43039         | Maximum price limit exceeded {0}                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 43040         | Minimum price limit exceeded {0}                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 43041         | Maximum transaction amount {0}                                                                                                                                                                                                                                                                                                                                                   | 400              |
| 43042         | Minimum transaction amount {0}                                                                                                                                                                                                                                                                                                                                                   | 400              |
| 43043         | There is no position                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 43044         | The follow order status error                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 43045         | The trader is ful                                                                                                                                                                                                                                                                                                                                                                | 400              |
| 43046         | User does not exist                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 43047         | Followers are not allowed to follow again within xx minutes after being removed, please try again later!                                                                                                                                                                                                                                                                         | 400              |
| 43048         | The symbol is null                                                                                                                                                                                                                                                                                                                                                               | 400              |
| 43049         | Margin coin is not allowed                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 43050         | Leverage exceeds the effective range                                                                                                                                                                                                                                                                                                                                             | 400              |
| 43051         | Maximum limit exceeded                                                                                                                                                                                                                                                                                                                                                           | 400              |
| 43052         | Follow order count can not less than {0}                                                                                                                                                                                                                                                                                                                                         | 400              |
| 43053         | The copy ratio cannot exceed {0}                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 43054         | The copy ratio cannot be less than {0}                                                                                                                                                                                                                                                                                                                                           | 400              |
| 43055         | The take loss ratio must be between {0}-{1}                                                                                                                                                                                                                                                                                                                                      | 400              |
| 43056         | The take profit ratio must be between {0}-{1}                                                                                                                                                                                                                                                                                                                                    | 400              |
| 43057         | It is not allowed to bring orders or copy orders between sub-accounts                                                                                                                                                                                                                                                                                                            | 400              |
| 43058         | Parameter verification failed                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 43059         | Request failed, please try again                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 43060         | Sort rule must send                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 43061         | Sort Flag must send                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 43062         | not to follow                                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 43063         | Can not follow trade with yourself                                                                                                                                                                                                                                                                                                                                               | 400              |
| 43064         | Tracking order status error                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 43065         | Tracking No does not exist                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 43066         | operation failed                                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 43067         | The loaded data has reached the upper limit, and the maximum support for loading {0} data                                                                                                                                                                                                                                                                                        | 400              |
| 43068         | The status of the current follower is abnormal and removal is not allowed for now                                                                                                                                                                                                                                                                                                | 400              |
| 43069         | A follower account can only be removed when its equity is lower than {0} USDT                                                                                                                                                                                                                                                                                                    | 400              |
| 43001         | The order does not exist                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 43002         | Pending order failed                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 43003         | Pending order failed                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 43004         | There is no order to cancel                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 43005         | Exceed the maximum number of orders                                                                                                                                                                                                                                                                                                                                              | 400              |
| 43006         | The order quantity is less than the minimum transaction quantity                                                                                                                                                                                                                                                                                                                 | 400              |
| 43007         | The order quantity is greater than the maximum transaction quantity                                                                                                                                                                                                                                                                                                              | 400              |
| 43008         | The current order price cannot be less than {0}{1}                                                                                                                                                                                                                                                                                                                               | 400              |
| 43009         | The current order price exceeds the limit {0}{1}                                                                                                                                                                                                                                                                                                                                 | 400              |
| 43010         | The transaction amount cannot be less than {0}{1}                                                                                                                                                                                                                                                                                                                                | 400              |
| 43011         | The parameter does not meet the specification {0}                                                                                                                                                                                                                                                                                                                                | 400              |
| 43012         | Insufficient balance                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 41103         | param {0} error                                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 41101         | param {0} error                                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 41113         | symbol is offline                                                                                                                                                                                                                                                                                                                                                                | 400              |
| 41114         | The current trading pair is under maintenance, please refer to the official announcement for the opening time                                                                                                                                                                                                                                                                    | 400              |
| 42013         | transfer fail                                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 42014         | The current currency does not support deposit                                                                                                                                                                                                                                                                                                                                    | 400              |
| 42015         | The current currency does not support withdrawal                                                                                                                                                                                                                                                                                                                                 | 400              |
| 42016         | symbol {0} is Invalid or not supported spot trade                                                                                                                                                                                                                                                                                                                                | 400              |
| 41100         | error {0}                                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 43111         | param error {0}                                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 43112         | The amount of coins withdrawn is less than the handling fee {0}                                                                                                                                                                                                                                                                                                                  | 400              |
| 43113         | The daily limit {0} is exceeded in a single transaction                                                                                                                                                                                                                                                                                                                          | 400              |
| 43114         | Withdrawal is less than the minimum withdrawal count {0}                                                                                                                                                                                                                                                                                                                         | 400              |
| 43115         | The current trading pair is opening soon, please refer to the official announcement for the opening time                                                                                                                                                                                                                                                                         | 400              |
| 43116         | This chain requires a tag to withdraw coins                                                                                                                                                                                                                                                                                                                                      | 400              |
| 43117         | Exceeds the maximum amount that can be transferred                                                                                                                                                                                                                                                                                                                               | 400              |
| 43118         | clientOrderId duplicate                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 43119         | Trading is not open                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 43120         | symbol is not open trade                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 43121         | Withdrawal address cannot be your own                                                                                                                                                                                                                                                                                                                                            | 400              |
| 43122         | The purchase limit of this currency is {0}, and there is still {1} left                                                                                                                                                                                                                                                                                                          | 400              |
| 43123         | param error {0}                                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 43124         | withdraw step is error                                                                                                                                                                                                                                                                                                                                                           | 400              |
| 43125         | No more than 8 decimal places                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 43126         | This currency does not support withdrawals                                                                                                                                                                                                                                                                                                                                       | 400              |
| 43127         | Sub transfer not by main account, or main/sub relationship error                                                                                                                                                                                                                                                                                                                 | 400              |
| 43128         | Exceeded the limit of the maximum number of orders for the total transaction pair {0}                                                                                                                                                                                                                                                                                            | 400              |
| 45034         | clientOid duplicate                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 47001         | Currency recharge is not enabled                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 47002         | Address verification failed                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 45001         | Unknown error                                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 45002         | Insufficient asset                                                                                                                                                                                                                                                                                                                                                               | 400              |
| 45003         | Insufficient position                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 45004         | Insufficient lock-in asset                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 45005         | Insufficient available positions                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 45006         | Insufficient position                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 45007         | Insufficient lock position                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 45008         | No assets                                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 45009         | The account is at risk and cannot perform trades temporarily                                                                                                                                                                                                                                                                                                                     | 400              |
| 45010         | The number of orders cannot exceed the maximum amount of the corresponding leverage                                                                                                                                                                                                                                                                                              | 400              |
| 45011         | Order remaining volume &lt; Current transaction volume                                                                                                                                                                                                                                                                                                                           | 400              |
| 45012         | Remaining volume of position &lt; Volume of current transaction                                                                                                                                                                                                                                                                                                                  | 400              |
| 45013         | The number of open orders &lt; Current transaction volume                                                                                                                                                                                                                                                                                                                        | 400              |
| 45014         | Position does not exist during opening                                                                                                                                                                                                                                                                                                                                           | 400              |
| 45017         | Settlement or the coin for transaction configuration not found                                                                                                                                                                                                                                                                                                                   | 400              |
| 45018         | In the case of a netting, you cannot have a liquidation order                                                                                                                                                                                                                                                                                                                    | 400              |
| 45019         | Account does not exist                                                                                                                                                                                                                                                                                                                                                           | 400              |
| 45020         | Liquidation can only occur under two-way positions                                                                                                                                                                                                                                                                                                                               | 400              |
| 45021         | When one-way position is held, the order type must also be one-way position type                                                                                                                                                                                                                                                                                                 | 400              |
| 45023         | Error creating order                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 45024         | Cancel order error                                                                                                                                                                                                                                                                                                                                                               | 400              |
| 45025         | The currency pair does not support the currency as a margin                                                                                                                                                                                                                                                                                                                      | 400              |
| 45026         | Please check that the correct delegateType is used                                                                                                                                                                                                                                                                                                                               | 400              |
| 45031         | The order is finalized                                                                                                                                                                                                                                                                                                                                                           | 400              |
| 45035         | Price step mismatch                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 45043         | Due to settlement or maintenance reasons, the trade is suspended                                                                                                                                                                                                                                                                                                                 | 400              |
| 45044         | Leverage is not within the suitable range after adjustment                                                                                                                                                                                                                                                                                                                       | 400              |
| 45045         | Exceeds the maximum possible leverage                                                                                                                                                                                                                                                                                                                                            | 400              |
| 45047         | Reduce the leverage and the amount of additional margin is incorrect                                                                                                                                                                                                                                                                                                             | 400              |
| 45051         | Execution price parameter verification is abnormal                                                                                                                                                                                                                                                                                                                               | 400              |
| 45052         | Trigger price parameter verification anbormal                                                                                                                                                                                                                                                                                                                                    | 400              |
| 45054         | No change in leverage                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 45055         | The current order status cannot be cancelled                                                                                                                                                                                                                                                                                                                                     | 400              |
| 45056         | The current order type cannot be cancelled                                                                                                                                                                                                                                                                                                                                       | 400              |
| 45057         | The order does not exist!                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 45060         | TP price of long position &gt; Current price {0}                                                                                                                                                                                                                                                                                                                                 | 400              |
| 45061         | TP price of short position &lt; Current price {0}                                                                                                                                                                                                                                                                                                                                | 400              |
| 45062         | SL price of long position &lt; Current price {0}                                                                                                                                                                                                                                                                                                                                 | 400              |
| 45064         | TP price of long position &gt; order price {0}                                                                                                                                                                                                                                                                                                                                   | 400              |
| 45065         | TP price of short position &lt; order price {0}                                                                                                                                                                                                                                                                                                                                  | 400              |
| 45066         | SL price of long position &lt; order price {0}                                                                                                                                                                                                                                                                                                                                   | 400              |
| 45067         | SL price of short position &gt; order price {0}                                                                                                                                                                                                                                                                                                                                  | 400              |
| 45068         | There is no position temporarily, and the order of TP and SL cannot be carried out                                                                                                                                                                                                                                                                                               | 400              |
| 45075         | The user already has an ongoing copy trade                                                                                                                                                                                                                                                                                                                                       | 400              |
| 45082         | Copy trade number error                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 45089         | You are currently copy trading, leverage cannot be changed                                                                                                                                                                                                                                                                                                                       | 400              |
| 45091         | Too many tracking orders                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 45097         | There is currently an order or a limit order, and the leverage cannot be adjusted                                                                                                                                                                                                                                                                                                | 400              |
| 45098         | You are currently a trader and cannot be switched to the full position mode                                                                                                                                                                                                                                                                                                      | 400              |
| 45099         | When there are different coins, it cannot be adjusted to Isolated Margin mode                                                                                                                                                                                                                                                                                                    | 400              |
| 45100         | When a one-way position is held, it cannot be adjusted to the Isolated Margin mode                                                                                                                                                                                                                                                                                               | 400              |
| 45101         | In Isolated Margin mode, it cannot be adjusted to a one-way position                                                                                                                                                                                                                                                                                                             | 400              |
| 45102         | In the full position mode, the automatic margin call cannot be adjusted                                                                                                                                                                                                                                                                                                          | 400              |
| 45103         | Failed to place the order, the maximum amount of single flash opening position is %s                                                                                                                                                                                                                                                                                             | 400              |
| 45104         | Failed to place the order, the maximum amount of single flash closing position is %s                                                                                                                                                                                                                                                                                             | 400              |
| 45106         | copy trade liquidation has been processed                                                                                                                                                                                                                                                                                                                                        | 400              |
| 45107         | API is restricted to open positions. If you have any questions, please contact our customer service                                                                                                                                                                                                                                                                              | 400              |
| 45108         | API is restricted to close position. If you have any questions, please contact our customer service                                                                                                                                                                                                                                                                              | 400              |
| 45109         | The current account is a two-way position                                                                                                                                                                                                                                                                                                                                        | 400              |
| 45110         | less than the minimum amount {0} USDT                                                                                                                                                                                                                                                                                                                                            | 400              |
| 45111         | less than the minimum order quantity                                                                                                                                                                                                                                                                                                                                             | 400              |
| 45112         | more than the maximum order quantity                                                                                                                                                                                                                                                                                                                                             | 400              |
| 45113         | Maximum order value limit triggered                                                                                                                                                                                                                                                                                                                                              | 400              |
| 45114         | The minimum order requirement is not met                                                                                                                                                                                                                                                                                                                                         | 400              |
| 45115         | The price you enter should be a multiple of {0}                                                                                                                                                                                                                                                                                                                                  | 400              |
| 45116         | The count of positions hold by the account exceeds the maximum count {0}                                                                                                                                                                                                                                                                                                         | 400              |
| 45117         | Currently holding positions or orders, the margin mode cannot be adjusted                                                                                                                                                                                                                                                                                                        | 400              |
| 45118         | Reached the upper limit of the order of transactions (the current number of order + the current number of orders) {0}                                                                                                                                                                                                                                                            | 400              |
| 45119         | This symbol does not support position opening operation                                                                                                                                                                                                                                                                                                                          | 400              |
| 45120         | size &gt; max can open order size                                                                                                                                                                                                                                                                                                                                                | 400              |
| 45121         | The reasonable mark price deviates too much from the market, and your current leveraged position opening risk is high                                                                                                                                                                                                                                                            | 400              |
| 45122         | Short position stop loss price please &gt; mark price {0}                                                                                                                                                                                                                                                                                                                        | 400              |
| 45123         | Insufficient availability, currently only market orders can be placed                                                                                                                                                                                                                                                                                                            | 400              |
| 45124         | Please edit and submit again.                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 45125         | Order cancellation is unavailable for inactive orders. Please cancel parent order and place a new order.                                                                                                                                                                                                                                                                         | 400              |
| 45126         | Order cancellation is unavailable for inactive orders. Please cancel parent order and place a new order.                                                                                                                                                                                                                                                                         | 400              |
| 45127         | Position brackets disabled TP SL                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 45128         | Position brackets disabled modify qty                                                                                                                                                                                                                                                                                                                                            | 400              |
| 45129         | Cancel order is too frequent, the same orderId is only allowed to be canceled once in a second                                                                                                                                                                                                                                                                                   | 400              |
| 49000         | apiKey and userId mismatch                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 49001         | not custody account, operation deny                                                                                                                                                                                                                                                                                                                                              | 400              |
| 49002         | missing http header: ACCESS-BROKER-KEY or ACCESS-BROKER-SIGN                                                                                                                                                                                                                                                                                                                     | 400              |
| 49003         | illegal IP, access deny                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 49004         | illegal ACCESS-BROKER-KEY                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 49005         | access deny: sub account                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 49006         | ACCESS-BROKER-SIGN check sign fail                                                                                                                                                                                                                                                                                                                                               | 400              |
| 49007         | account is unbound                                                                                                                                                                                                                                                                                                                                                               | 400              |
| 49008         | account is bound                                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 49009         | clientUserId check mismatch with the bound user ID                                                                                                                                                                                                                                                                                                                               | 400              |
| 49010         | account: {0} still have assets: {1}                                                                                                                                                                                                                                                                                                                                              | 400              |
| 49011         | kyc must be done before bind                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 49020         | unsupported coin                                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 49021         | operation accepted                                                                                                                                                                                                                                                                                                                                                               | 400              |
| 49022         | access deny                                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 49023         | insufficient fund                                                                                                                                                                                                                                                                                                                                                                | 400              |
| 49024         | {0} decimal precision error                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 49025         | Parameter mismatch with the initial requestId, request body: {0}                                                                                                                                                                                                                                                                                                                 | 400              |
| 49026         | {0} maximum {1} digits                                                                                                                                                                                                                                                                                                                                                           | 400              |
| 49030         | custody account, operation deny                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 49040         | Unknown Error                                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 60001         | StartTime not empty                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 60002         | MerchantId not empty                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 60003         | Not found the p2p order                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 60004         | Not found the p2p advertisement                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 60005         | Not found the p2p merchant                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 70001         | Activity ID not correct                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 70002         | rankType error                                                                                                                                                                                                                                                                                                                                                                   | 400              |
| 40000         | Bitget is providing services to many countries and regions around the world and strictly adheres to the rules and regulatory requirements of each country and region. According to the relevant regulations, Bitget is currently unable to provide services to your region (Mainland China) and you do not have access to open positions.Apologies for any inconvenience caused! | 400              |
| 48001         | Parameter validation failed {0}                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 48002         | Missing request Parameter                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 46013         | This symbol limits the selling amount{0}，Remaining{0}                                                                                                                                                                                                                                                                                                                           | 400              |
| 40404         | Request URL NOT FOUND                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 50010         | Unknown error                                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 50012         | The account has been suspended or deleted. Please contact our Customer Support                                                                                                                                                                                                                                                                                                   | 400              |
| 50013         | The account has been suspended and deleted. Please contact our Customer Support                                                                                                                                                                                                                                                                                                  | 400              |
| 50019         | The user is forbidden to trade.                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 50059         | This currency cannot be transferred                                                                                                                                                                                                                                                                                                                                              | 400              |
| 50052         | The asset balance will be less than 0 after transferring                                                                                                                                                                                                                                                                                                                         | 400              |
| 50048         | The maximum number of orders is exceeded                                                                                                                                                                                                                                                                                                                                         | 400              |
| 50046         | The price is too low                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 50047         | The price is too high                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 50026         | The trading pair is currently unavailable                                                                                                                                                                                                                                                                                                                                        | 400              |
| 50025         | The trading pair is currently unavailable                                                                                                                                                                                                                                                                                                                                        | 400              |
| 50016         | The number of open orders is smaller than the minimum limit of the trading pair                                                                                                                                                                                                                                                                                                  | 400              |
| 50017         | The number of open orders is bigger than the maximum limit of the trading pair                                                                                                                                                                                                                                                                                                   | 400              |
| 50023         | The account has been suspended due to abnormal behavior. Please contact our Customer Support is you have any questions.                                                                                                                                                                                                                                                          | 400              |
| 50031         | System error                                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 50044         | The system account is not found                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 50049         | The request body of the system user is empty                                                                                                                                                                                                                                                                                                                                     | 400              |
| 50050         | The system loan collection has been done                                                                                                                                                                                                                                                                                                                                         | 400              |
| 50027         | The trading pair is suspended for maintenance                                                                                                                                                                                                                                                                                                                                    | 400              |
| 50030         | The trading pair will soon be available                                                                                                                                                                                                                                                                                                                                          | 400              |
| 50029         | The trading pair has no order price                                                                                                                                                                                                                                                                                                                                              | 400              |
| 50028         | The trading pair is removed                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 50040         | The repayment amount must be more than 0                                                                                                                                                                                                                                                                                                                                         | 400              |
| 50042         | The repayment amount must be more than the interest                                                                                                                                                                                                                                                                                                                              | 400              |
| 50041         | The repayment amount must be less than your available balance                                                                                                                                                                                                                                                                                                                    | 400              |
| 50051         | The user in reconciliation is not in the system (cache)                                                                                                                                                                                                                                                                                                                          | 400              |
| 50024         | The trading pair does not exist                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 50011         | Parameter verification error                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 50053         | The amount is less than 0 when making loan repayment                                                                                                                                                                                                                                                                                                                             | 400              |
| 50056         | The amount is less than 0 when paying liquidation fees                                                                                                                                                                                                                                                                                                                           | 400              |
| 50054         | The amount is less than 0 when making interest repayment                                                                                                                                                                                                                                                                                                                         | 400              |
| 50055         | The amount is less than 0 when paying trading fees                                                                                                                                                                                                                                                                                                                               | 400              |
| 50033         | The topic of the websocket query does not exist                                                                                                                                                                                                                                                                                                                                  | 400              |
| 50057         | The amount is less than 0 when paying the excessive loss resulted from liquidation                                                                                                                                                                                                                                                                                               | 400              |
| 50032         | The currency does not exist                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 50036         | The loan configuration does not exist                                                                                                                                                                                                                                                                                                                                            | 400              |
| 50037         | This currency cannot be borrowed                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 50038         | The system limit is exceeded                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 50034         | The borrowing amount must be over 0.00000001                                                                                                                                                                                                                                                                                                                                     | 400              |
| 50035         | The maximum borrowing amount is exceeded                                                                                                                                                                                                                                                                                                                                         | 400              |
| 50020         | Insufficient balance                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 50045         | Insufficient locked asset                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 50015         | Currently, sub-accounts cannot engage in margin trading                                                                                                                                                                                                                                                                                                                          | 400              |
| 50021         | The margin trading account does not exist                                                                                                                                                                                                                                                                                                                                        | 400              |
| 50022         | The account is liquidated                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 50014         | The account already exists                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 50060         | Duplicated clientOid                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 50058         | After the profit is used to cover the excessive loss resulted from liquidation, the balance will be less than 0                                                                                                                                                                                                                                                                  | 400              |
| 50039         | The currency and the trading pair do not match                                                                                                                                                                                                                                                                                                                                   | 400              |
| 50018         | The price must be 0 or higher                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 50043         | Unknown transaction type                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 50061         | There is a problem with the parameter you requested                                                                                                                                                                                                                                                                                                                              | 400              |
| 50062         | The order status is cancelled or fullFill                                                                                                                                                                                                                                                                                                                                        | 400              |
| 50063         | Token precision must less than or equal to eight                                                                                                                                                                                                                                                                                                                                 | 400              |
| 50064         | Your account is temporarily frozen. Please contact customer support if you have any questions                                                                                                                                                                                                                                                                                    | 400              |
| 50065         | symbol_off_shelf                                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 50066         | Position closing, please try again later                                                                                                                                                                                                                                                                                                                                         | 400              |
| 31001         | The user is not a trader                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 31002         | Condition {0} is not satisfied                                                                                                                                                                                                                                                                                                                                                   | 400              |
| 31003         | Parameter {0} must have a value, cannot be empty                                                                                                                                                                                                                                                                                                                                 | 400              |
| 31004         | Take profit price must be &gt; current price                                                                                                                                                                                                                                                                                                                                     | 400              |
| 31005         | Stop loss price must be &lt; current price                                                                                                                                                                                                                                                                                                                                       | 400              |
| 31006         | The order is in the process of being placed, closing of the position is not supported at the moment                                                                                                                                                                                                                                                                              | 400              |
| 31007         | Order does not exist                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 31008         | There is no position in this position, no take profit or stop loss order can be made                                                                                                                                                                                                                                                                                             | 400              |
| 31009         | Tracking order status error                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 31010         | Clear user prompt                                                                                                                                                                                                                                                                                                                                                                | 400              |
| 31011         | The order is not completely filled and the order is closed prompting the cancellation of the commission                                                                                                                                                                                                                                                                          | 400              |
| 31012         | Pullback greater than {0}                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 31013         | Pullback range is less than {0}                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 31014         | Stop gain yield greater than {0}                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 31015         | Stop loss yield less than {0}                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 31016         | Batch execution exception                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 31017         | Maximum price limit exceeded {0}                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 31018         | Minimum price change of {0}                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 31019         | Support trading currency pair does not exist                                                                                                                                                                                                                                                                                                                                     | 400              |
| 31020         | Business is restricted                                                                                                                                                                                                                                                                                                                                                           | 400              |
| 31021         | The currency pair is not available for trading, please select another currency pair                                                                                                                                                                                                                                                                                              | 400              |
| 31022         | Minimum order size for this trading area is not met, please select another trading area                                                                                                                                                                                                                                                                                          | 400              |
| 31023         | Ending order processing                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 31024         | The order is not completely filled, please go to \"Spot trading\"-\"Current orders\" to cancel the order and then sell or close the operation!                                                                                                                                                                                                                                   | 400              |
| 31025         | The user is not a trader                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 31026         | The user is not exist                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 31027         | Operation failed, please try again                                                                                                                                                                                                                                                                                                                                               | 400              |
| 31028         | Parameter verification failed                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 31029         | User is not existed                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 31030         | Chosen trading pair is empty                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 31031         | You’re log in as trader,can not follow trade                                                                                                                                                                                                                                                                                                                                     | 400              |
| 31032         | Can not follow trade with yourself                                                                                                                                                                                                                                                                                                                                               | 400              |
| 31033         | Fail to remove                                                                                                                                                                                                                                                                                                                                                                   | 400              |
| 31034         | This trader’s no. of follower has reached limit, please select other trader                                                                                                                                                                                                                                                                                                      | 400              |
| 31035         | Follow order ratio can not less than{0}                                                                                                                                                                                                                                                                                                                                          | 400              |
| 31036         | Follow order ratio can not greater than{0}                                                                                                                                                                                                                                                                                                                                       | 400              |
| 31037         | Follow order count can not less than{0}                                                                                                                                                                                                                                                                                                                                          | 400              |
| 31038         | Exceeds max. limit                                                                                                                                                                                                                                                                                                                                                               | 400              |
| 31039         | Can not set reminder as your Elite Trader status has been revoked                                                                                                                                                                                                                                                                                                                | 400              |
| 31040         | T/P ratio must between {0}%%-{1}%%                                                                                                                                                                                                                                                                                                                                               | 400              |
| 31041         | S/L ratio must between {0}%%-{1}%%                                                                                                                                                                                                                                                                                                                                               | 400              |
| 31042         | The status of your Elite Trader has been suspended, please contact online customer service to resume.                                                                                                                                                                                                                                                                            | 400              |
| 31043         | Your copy trade follower cap is too high. Please contact customer support to lower it if you want to enable this function!                                                                                                                                                                                                                                                       | 400              |
| 31044         | You are applying to become a trader now. Copying trade is not allowed                                                                                                                                                                                                                                                                                                            | 400              |
| 31045         | The max. quantity for TP/SL is {0}. For any quantity exceeding this limit, please operate under “Initiated Copies”.                                                                                                                                                                                                                                                              | 400              |
| 31046         | No copy trade relationship is allowed between a parent account and its sub-account                                                                                                                                                                                                                                                                                               | 400              |
| 31047         | No copying is allowed within {0} minutes after the copier has been removed. Please try again later.                                                                                                                                                                                                                                                                              | 400              |
| 31048         | Only this trader's referrals are allowed to follow this trader at the moment. Please create an account with the trader's referral link!                                                                                                                                                                                                                                          | 400              |
| 31049         | The trader's status is abnormal or has been revoked, and cannot be viewed at this time!                                                                                                                                                                                                                                                                                          | 400              |
| 31050         | This trader UID is already set for the region.                                                                                                                                                                                                                                                                                                                                   | 400              |
| 31051         | traderUserId error                                                                                                                                                                                                                                                                                                                                                               | 400              |
| 31052         | Cannot set trading symbol that have not been opened by traders.                                                                                                                                                                                                                                                                                                                  | 400              |
| 31053         | executePrice cannot exceed triggerPrice 的{0}                                                                                                                                                                                                                                                                                                                                    | 400              |
| 31054         | No order to cancel                                                                                                                                                                                                                                                                                                                                                               | 400              |
| 20001         | startTime should be less than endTime                                                                                                                                                                                                                                                                                                                                            | 400              |
| 22001         | No order to cancel                                                                                                                                                                                                                                                                                                                                                               | 400              |
| 22002         | No position to close                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 22003         | modify price and size, please pass in newClientOid                                                                                                                                                                                                                                                                                                                               | 400              |
| 22004         | This symbol {0} not support API trade                                                                                                                                                                                                                                                                                                                                            | 400              |
| 22005         | This symbol does not support cross mode                                                                                                                                                                                                                                                                                                                                          | 400              |
| 22006         | limit price &gt; risk price                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 22007         | limit price &lt; risk price                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 22008         | market price &gt; risk price                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 22009         | market price &lt; risk price                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 22010         | Please bind ip whitelist address                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 40100         | Due to regulatory requirements, Hong Kong IPs are required to complete identity verification first                                                                                                                                                                                                                                                                               | 400              |
| 40101         | Please complete KYC                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 00001         | startTime and endTime interval cannot be greater than 366 days                                                                                                                                                                                                                                                                                                                   | 400              |
| 12001         | {0} can be used at most                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 12002         | Current currency {0}, limit net sell value {1} USD                                                                                                                                                                                                                                                                                                                               | 400              |
| 12003         | Current currency {0}, limit net buy value {1} USD                                                                                                                                                                                                                                                                                                                                | 400              |
| 13001         | Withdraw is too frequent                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 13002         | Currency does not exist                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 13003         | Withdrawal exceeds the monthly limit                                                                                                                                                                                                                                                                                                                                             | 400              |
| 13004         | Your remaining withdrawal amount{0}                                                                                                                                                                                                                                                                                                                                              | 400              |
| 13005         | Failed to generate address                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 60006         | Parameter error                                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 60007         | upload image cannot exceed 5M                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 60008         | The image format must be [". jpg", ". jpeg", ". png"]                                                                                                                                                                                                                                                                                                                            | 400              |
| 60009         | The image format error                                                                                                                                                                                                                                                                                                                                                           | 400              |
| 60010         | upload error                                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 60011         | Ordinary users can not post ads                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 60012         | Please change your status from offline to online before posting your ads！                                                                                                                                                                                                                                                                                                       | 400              |
| 60013         | Insufficient balance                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 60014         | Fiat info not found                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 60015         | Digital currency info not found                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 60016         | Only supports publish CNY advertisement                                                                                                                                                                                                                                                                                                                                          | 400              |
| 60017         | Not support publish CNY advertisement                                                                                                                                                                                                                                                                                                                                            | 400              |
| 60018         | Your KYC certification only supports publishing {0}                                                                                                                                                                                                                                                                                                                              | 400              |
| 60019         | Post failed. Unable to obtain preference price                                                                                                                                                                                                                                                                                                                                   | 400              |
| 60020         | advertisement type error                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 60021         | Payment method is empty                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 60022         | Trading amount incorrect                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 60023         | Beyond fiat limit ({0}-{1})                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 60024         | Fund reconciliation errors                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 60025         | The remark length cannot be longer than the configuration length                                                                                                                                                                                                                                                                                                                 | 400              |
| 60026         | Exclusive country error                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 60027         | Payment time limit error                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 60028         | Payment method error                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 60029         | publish advertisement error                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 60030         | status error                                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 60031         | The advertisement number is too long                                                                                                                                                                                                                                                                                                                                             | 400              |
| 60032         | The advertisement not exist                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 60033         | Posted ad amount incorrect                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 60034         | Number of images attached in the remark cannot exceed the allocation limit.                                                                                                                                                                                                                                                                                                      | 400              |
| 60035         | Edit advertisement error                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 60036         | payTimeLimit cannot be empty                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 60037         | Post failed. Price is significantly deviated from preference price                                                                                                                                                                                                                                                                                                               | 400              |
| 60038         | Post failed. Incorrect floating rate                                                                                                                                                                                                                                                                                                                                             | 400              |
| 60039         | User does not exist                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 60040         | Unauthorized access not supported                                                                                                                                                                                                                                                                                                                                                | 400              |
| 60041         | Edit advertisement price error                                                                                                                                                                                                                                                                                                                                                   | 400              |
| 60042         | limitPrice not empty                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 60043         | The advertisement status update fail                                                                                                                                                                                                                                                                                                                                             | 400              |
| 60044         | The advertisement status in editing can be edited                                                                                                                                                                                                                                                                                                                                | 400              |
| 60045         | Exceeding the number of advertisement that can be published                                                                                                                                                                                                                                                                                                                      | 400              |
| 60046         | priceValue not empty                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 60047         | userPayMethodId not empty                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 40927         | The return field type or dest of this order does not meet expectations                                                                                                                                                                                                                                                                                                           | 400              |
| 40172         | Illegal position open or close type                                                                                                                                                                                                                                                                                                                                              | 400              |
| 43071         | Trigger order limit for a single trading pair is {0}                                                                                                                                                                                                                                                                                                                             | 400              |
| 43075         | Position pattern mismatch                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 41104         | Unsupported coin: {0}                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 43129         | Transfer coin not support or invalid coin                                                                                                                                                                                                                                                                                                                                        | 400              |
| 43130         | StartTime params error                                                                                                                                                                                                                                                                                                                                                           | 400              |
| 41001         | the account not exist                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 41002         | param error {0}                                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 49050         | unsupported chain                                                                                                                                                                                                                                                                                                                                                                | 400              |
| 49051         | Missing callback signature request header                                                                                                                                                                                                                                                                                                                                        | 400              |
| 49052         | callback signature verification failed                                                                                                                                                                                                                                                                                                                                           | 400              |
| 49053         | can not bind other platforms                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 49060         | The switch of adding money to cobo is not turned on                                                                                                                                                                                                                                                                                                                              | 400              |
| 49061         | The custody currency is not allowed                                                                                                                                                                                                                                                                                                                                              | 400              |
| 49062         | fundId is invalid or not exist {0}                                                                                                                                                                                                                                                                                                                                               | 400              |
| 49063         | The custody currency already exists                                                                                                                                                                                                                                                                                                                                              | 400              |
| 49064         | Insufficient amount of shadow account                                                                                                                                                                                                                                                                                                                                            | 400              |
| 49065         | User withdrawal address already exists                                                                                                                                                                                                                                                                                                                                           | 400              |
| 49066         | The switch of cobo money reduction is not turned on                                                                                                                                                                                                                                                                                                                              | 400              |
| 49067         | fundSupplementId is invalid {0}                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 49068         | No currency available for settlement                                                                                                                                                                                                                                                                                                                                             | 400              |
| 49069         | There is an unfinished fund process, which cannot be cleared and settled                                                                                                                                                                                                                                                                                                         | 400              |
| 49070         | Clearing settlement must include all currencies                                                                                                                                                                                                                                                                                                                                  | 400              |
| 49071         | fundSettlementId is invalid {0}                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 49072         | Failed to get user assets                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 49073         | Confirm that the set of fundIds receivable for clearing and settlement is not all fundIds                                                                                                                                                                                                                                                                                        | 400              |
| 49074         | The settlement process has not been completed, and fund operations cannot be performed                                                                                                                                                                                                                                                                                           | 400              |
| 49075         | Failed to query the address list of bg clearing and settlement account                                                                                                                                                                                                                                                                                                           | 400              |
| 49076         | cobo callback params error                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 49077         | Failed to call the cobo transaction query interface                                                                                                                                                                                                                                                                                                                              | 400              |
| 49078         | cobo withdrawal transaction callback requestId is invalid {0}                                                                                                                                                                                                                                                                                                                    | 400              |
| 49079         | supplement type illegal                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 49080         | cobo confirms settlement, txId is invalid                                                                                                                                                                                                                                                                                                                                        | 400              |
| 49081         | Request amount parameter error                                                                                                                                                                                                                                                                                                                                                   | 400              |
| 70020         | Account does not exist                                                                                                                                                                                                                                                                                                                                                           | 400              |
| 31057         | user has not follow order                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 22011         | It is not allowed to set auto add margin in cross mode                                                                                                                                                                                                                                                                                                                           | 400              |
| 22012         | There are different business lines, {0} does not belong to {1} product                                                                                                                                                                                                                                                                                                           | 400              |
| 22013         | Abnormal status of position experience coupon                                                                                                                                                                                                                                                                                                                                    | 400              |
| 22014         | This position experience coupon does not exist                                                                                                                                                                                                                                                                                                                                   | 400              |
| 22015         | This user has no position experience coupon sub-account                                                                                                                                                                                                                                                                                                                          | 400              |
| 22016         | This user is not a sub-account for position experience coupons and cannot operate experience coupons                                                                                                                                                                                                                                                                             | 400              |
| 22017         | The position experience coupon does not support this tokenId                                                                                                                                                                                                                                                                                                                     | 400              |
| 22018         | The face value of the position experience coupon is a negative number                                                                                                                                                                                                                                                                                                            | 400              |
| 22019         | The position experience coupon has not expired yet                                                                                                                                                                                                                                                                                                                               | 400              |
| 22020         | The leverage multiple is the leverage multiple of the current position and cannot be adjusted.                                                                                                                                                                                                                                                                                   | 400              |
| 22021         | Limit orders are not supported when placing orders with position experience coupons                                                                                                                                                                                                                                                                                              | 400              |
| 22022         | The position experience coupon has been used                                                                                                                                                                                                                                                                                                                                     | 400              |
| 22023         | The trial coupon for this position has expired                                                                                                                                                                                                                                                                                                                                   | 400              |
| 22024         | The experience coupon for this position has been recycled                                                                                                                                                                                                                                                                                                                        | 400              |
| 22025         | Margin cannot be added to the experience coupon account                                                                                                                                                                                                                                                                                                                          | 400              |
| 22026         | The position mode cannot be adjusted for the experience coupon account                                                                                                                                                                                                                                                                                                           | 400              |
| 22027         | The position experience coupon does not support this currency pair                                                                                                                                                                                                                                                                                                               | 400              |
| 22028         | The position experience coupon does not support this type of order                                                                                                                                                                                                                                                                                                               | 400              |
| 40104         | Based on your IP address , it appears that you are located in a country or region where we are currently unable to provide services                                                                                                                                                                                                                                              | 400              |
| 01002         | {0} precision must be less than or equal to {1}                                                                                                                                                                                                                                                                                                                                  | 400              |
| 70006         | Parameter value range verification failed: {0}                                                                                                                                                                                                                                                                                                                                   | 400              |
| 70007         | Parameter verification failed: {0}, please make sure the time is within 30 days                                                                                                                                                                                                                                                                                                  | 400              |
| 70008         | Parameter verification failed: {0}, please make sure the time is within 30 days                                                                                                                                                                                                                                                                                                  | 400              |
| 40172         | traderId cannot be empty                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 40172         | settings cannot be empty                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 40172         | update trace setting cannot exceed 50                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40172         | maxHoldSize cannot be empty                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 40172         | trackingNoList cannot be empty                                                                                                                                                                                                                                                                                                                                                   | 400              |
| 40172         | settingType cannot be empty                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 80001         | illegal params                                                                                                                                                                                                                                                                                                                                                                   | 400              |
| 80002         | system error                                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 80003         | Loan coin not exist                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 80004         | Place coin not exist                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 80005         | Place single minimum limit                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 80006         | Place single Maximum limit                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 80007         | Loan single minimum limit                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 80008         | Loan single maximum limit                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 80009         | Loan pool not enough                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 80010         | place float exceed                                                                                                                                                                                                                                                                                                                                                               | 400              |
| 80011         | Order not exist                                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 80012         | Pledge not exist                                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 80013         | Extract exceed maximum limit                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 80014         | Operate limit amount is {0} USDT                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 80015         | Order count maximum limit                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 80016         | Order status illegal                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 59001         | Product does not exist                                                                                                                                                                                                                                                                                                                                                           | 400              |
| 59002         | Insufficient product balance                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 59003         | This product is not available for purchase yet                                                                                                                                                                                                                                                                                                                                   | 400              |
| 59004         | You are not a VIP and cannot purchase this product                                                                                                                                                                                                                                                                                                                               | 400              |
| 59005         | KYC verification not performed                                                                                                                                                                                                                                                                                                                                                   | 400              |
| 59006         | The country where KYC is located cannot apply for subscription                                                                                                                                                                                                                                                                                                                   | 400              |
| 59007         | Minimum limit for single currency subscription                                                                                                                                                                                                                                                                                                                                   | 400              |
| 59008         | Maximum single currency subscription limit                                                                                                                                                                                                                                                                                                                                       | 400              |
| 59009         | The subscription amount does not meet the step size verification                                                                                                                                                                                                                                                                                                                 | 400              |
| 59010         | The precision of the subscription amount cannot exceed {0} digits                                                                                                                                                                                                                                                                                                                | 400              |
| 59011         | Insufficient balance                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 59012         | Product does not exist                                                                                                                                                                                                                                                                                                                                                           | 400              |
| 59013         | Parameter exception: {0}                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 59014         | Parameter precision exception                                                                                                                                                                                                                                                                                                                                                    | 400              |
| 59015         | The product is not online and cannot be purchased.                                                                                                                                                                                                                                                                                                                               | 400              |
| 59016         | The total position of a single person is exceeded                                                                                                                                                                                                                                                                                                                                | 400              |
| 59017         | Product subscription has been suspended                                                                                                                                                                                                                                                                                                                                          | 400              |
| 59018         | The subscription start time has not been reached                                                                                                                                                                                                                                                                                                                                 | 400              |
| 59019         | The subscription time range is {0} ~ {1}                                                                                                                                                                                                                                                                                                                                         | 400              |
| 59020         | Minimum limit for single subscription                                                                                                                                                                                                                                                                                                                                            | 400              |
| 59021         | Operation failed                                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 59022         | Insufficient balance                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 59023         | Insufficient product remaining quota, remaining {0}                                                                                                                                                                                                                                                                                                                              | 400              |
| 59024         | Amount cannot be empty when redeeming current financial management                                                                                                                                                                                                                                                                                                               | 400              |
| 59025         | orderId cannot be empty when redeeming regular financial management                                                                                                                                                                                                                                                                                                              | 400              |
| 59026         | Product does not exist                                                                                                                                                                                                                                                                                                                                                           | 400              |
| 59027         | This product is a novice product. You are not a novice user. Please choose another product.                                                                                                                                                                                                                                                                                      | 400              |
| 59028         | Product hidden                                                                                                                                                                                                                                                                                                                                                                   | 400              |
| 59029         | Product cannot be subscribe                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 59030         | Exceeding the max amount for once subscribe                                                                                                                                                                                                                                                                                                                                      | 400              |
| 59031         | Cannot perform redemption operation                                                                                                                                                                                                                                                                                                                                              | 400              |
| 59033         | Less than redemption minimum limit                                                                                                                                                                                                                                                                                                                                               | 400              |
| 59034         | The redemption amount accuracy cannot exceed {0} digits                                                                                                                                                                                                                                                                                                                          | 400              |
| 59035         | The redemption amount must be greater than the minimum limit                                                                                                                                                                                                                                                                                                                     | 400              |
| 59036         | Exceeded maximum single transaction limit                                                                                                                                                                                                                                                                                                                                        | 400              |
| 59037         | The current order status does not allow operation                                                                                                                                                                                                                                                                                                                                | 400              |
| 59038         | Redemption is not allowed on the day of expiration                                                                                                                                                                                                                                                                                                                               | 400              |
| 59039         | Cannot perform redemption operation                                                                                                                                                                                                                                                                                                                                              | 400              |
| 59040         | The redemption time range is {0}-{1}                                                                                                                                                                                                                                                                                                                                             | 400              |
| 59041         | The accuracy of the subscription amount is not met                                                                                                                                                                                                                                                                                                                               | 400              |
| 59042         | Insufficient balance                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 59043         | Insufficient product remaining quota, remaining {0} {1}                                                                                                                                                                                                                                                                                                                          | 400              |
| 59044         | Operations are frequent, please try again later.                                                                                                                                                                                                                                                                                                                                 | 400              |
| 59045         | subscription time range is {0}~{1}                                                                                                                                                                                                                                                                                                                                               | 400              |
| 59046         | Operation failed                                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 59047         | redemption time range is {0}-{1}                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 59048         | fixed redemption not pass amount                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 59049         | Product does not exist                                                                                                                                                                                                                                                                                                                                                           | 400              |
| 40172         | orderId cannot be empty                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 40172         | repayAll cannot be empty                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 40172         | repayAll illegal value                                                                                                                                                                                                                                                                                                                                                           | 400              |
| 40172         | daily illegal value                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 40172         | daily cannot be empty                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40172         | loanCoin cannot be empty                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 40172         | pledgeCoin cannot be empty                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 40172         | reviseType cannot be empty                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 40172         | reviseType illegal value                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 70101         | illegal parameter                                                                                                                                                                                                                                                                                                                                                                | 400              |
| 70102         | Parameter verification failed-brokerUserId                                                                                                                                                                                                                                                                                                                                       | 400              |
| 70103         | Parameter verification failed-startTime                                                                                                                                                                                                                                                                                                                                          | 400              |
| 70104         | Parameter verification failed-endTime                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40172         | coinNameList length should be in 1-100                                                                                                                                                                                                                                                                                                                                           | 400              |
| 40172         | symbolList length should be in 1-100                                                                                                                                                                                                                                                                                                                                             | 400              |
| 40172         | transferType not empty                                                                                                                                                                                                                                                                                                                                                           | 400              |
| 40172         | dest not empty                                                                                                                                                                                                                                                                                                                                                                   | 400              |
| 40172         | symbolList length should be in 1-100                                                                                                                                                                                                                                                                                                                                             | 400              |
| 40172         | productType not empty                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40172         | symbolList not empty                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 40172         | planType not empty                                                                                                                                                                                                                                                                                                                                                               | 400              |
| 40172         | planType Illegal type                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 40172         | The price cannot be less than or equal to 0                                                                                                                                                                                                                                                                                                                                      | 400              |
| 40172         | newTriggerPrice not empty                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 40172         | The triggerPrice cannot be less than or equal to 0                                                                                                                                                                                                                                                                                                                               | 400              |
| 40172         | newTriggerType not empty                                                                                                                                                                                                                                                                                                                                                         | 400              |
| 40172         | followerUid not empty                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 19000         | operation failed                                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 40081         | Spot DEMO accounts can only access spot orders and spot plan order endpoints.                                                                                                                                                                                                                                                                                                    | 400              |
| 40086         | An error occurred when accessing the VIP private domain name. Please check whether you have applied for it.                                                                                                                                                                                                                                                                      | 400              |
| 40077         | Transfers from custody sub-accounts are only allowed between spot and contract accounts.                                                                                                                                                                                                                                                                                         | 400              |
| 40078         | Timestamp for this request is outside of the ME receiveWindow.                                                                                                                                                                                                                                                                                                                   | 400              |
| 40079         | receiveWindow timestamp must be less than 60s                                                                                                                                                                                                                                                                                                                                    | 400              |
| 42072         | Param endTime cannot be earlier than startTime                                                                                                                                                                                                                                                                                                                                   | 400              |
| 42017         | The current chain does not support deposit the coin                                                                                                                                                                                                                                                                                                                              | 400              |
| 43131         | Current currency: {0} does not support convert                                                                                                                                                                                                                                                                                                                                   | 400              |
| 43132         | {0}Insufficient funds                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 43133         | {0} currency balance exceeds {1}USDT                                                                                                                                                                                                                                                                                                                                             | 400              |
| 43134         | Transfers from custody sub-accounts are only allow transfers from spot accounts                                                                                                                                                                                                                                                                                                  | 400              |
| 43135         | Loan risk control check failed                                                                                                                                                                                                                                                                                                                                                   | 400              |
| 20002         | {0} Only one is allowed to be passed                                                                                                                                                                                                                                                                                                                                             | 400              |
| 40107         | The subaccountName has been used                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 40108         | The subaccountName has been used                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 60049         | You are not currently a merchant                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 12004         | Quote query failed, try again later                                                                                                                                                                                                                                                                                                                                              | 400              |
| 12005         | Abnormal data. Try again later.                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 12006         | Minimum limit not reached.                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 12007         | Maximum limit exceeded.                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 12008         | Daily individual convert limit reached                                                                                                                                                                                                                                                                                                                                           | 400              |
| 12009         | Daily convert limit reached                                                                                                                                                                                                                                                                                                                                                      | 400              |
| 12010         | Abnormal data. Try again later.                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 12011         | The discrepancy between the quoted price and the market price is substantial. Try again later.                                                                                                                                                                                                                                                                                   | 400              |
| 12012         | The discrepancy between the quoted price and the market price is substantial. Try again later.                                                                                                                                                                                                                                                                                   | 400              |
| 12013         | The discrepancy between the quoted price and the market price is substantial. Try again later.                                                                                                                                                                                                                                                                                   | 400              |
| 12014         | Failed to get a quote                                                                                                                                                                                                                                                                                                                                                            | 400              |
| 12015         | The data is abnormal, please try again later                                                                                                                                                                                                                                                                                                                                     | 400              |
| 12016         | Convert limit exceeded                                                                                                                                                                                                                                                                                                                                                           | 400              |
| 12017         | Contact customer service because your Convert permission is abnormal.                                                                                                                                                                                                                                                                                                            | 400              |
| 12018         | Service disruption, contact customer service for assistance.                                                                                                                                                                                                                                                                                                                     | 400              |
| 12019         | Price inquiry failed. Try again later.                                                                                                                                                                                                                                                                                                                                           | 400              |
| 12020         | Convert limit exceeded                                                                                                                                                                                                                                                                                                                                                           | 400              |
| 12021         | Flash quote expired                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 12022         | he flash quote information has been tampered with                                                                                                                                                                                                                                                                                                                                | 400              |
| 13006         | The actual amount you can withdraw is {0}, and the rest is frozen for copy trade                                                                                                                                                                                                                                                                                                 | 400              |
| 13007         | The current currency is {0}, and the net purchase value of {1} USD is limited within 24 hours, and the net purchase value of {2} USD is also allowed for {3}                                                                                                                                                                                                                     | 400              |
| 13008         | Traders minimum place orderSize is {0}                                                                                                                                                                                                                                                                                                                                           | 400              |
| 13009         | Current currency {0}, 24-hour limit on net selling value {1} USD, you can also net sell {3} worth {2} USD                                                                                                                                                                                                                                                                        | 400              |
| 13010         | The order is review, cannot be cancelled.                                                                                                                                                                                                                                                                                                                                        | 400              |
| 01001         | {0} must be greater than 0                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 01002         | {0} precision must be less than or equal to {1}                                                                                                                                                                                                                                                                                                                                  | 400              |
| 01003         | {0} Duplicate data exists                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 80001         | illegal params                                                                                                                                                                                                                                                                                                                                                                   | 400              |
| 80002         | system error                                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 80003         | Loan coin not exist                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 80004         | Place coin not exist                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 80005         | Place single minimum limit                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 80006         | Place single Maximum limit                                                                                                                                                                                                                                                                                                                                                       | 400              |
| 80007         | Loan single minimum limit                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 80008         | Loan single maximum limit                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 80009         | Loan pool not enough                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 80010         | place float exceed                                                                                                                                                                                                                                                                                                                                                               | 400              |
| 80011         | Order not exist                                                                                                                                                                                                                                                                                                                                                                  | 400              |
| 80012         | Pledge not exist                                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 80013         | Extract exceed maximum limit                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 80014         | Operate limit amount is {0} USDT                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 80015         | Order count maximum limit                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 80016         | Order status illegal                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 11000         | withdraw address is not in addressBook                                                                                                                                                                                                                                                                                                                                           | 400              |
| 40103         | based on your IP address , it appears that you are located in a country or region where we are currently unable to provide services                                                                                                                                                                                                                                              | 400              |
| 40104         | Unable to withdraw to this account Please make sure this is a valid and verified account                                                                                                                                                                                                                                                                                         | 400              |
| 40105         | Currently Spot Demo trade does not support this feature                                                                                                                                                                                                                                                                                                                          | 400              |
| 47003         | Withdraw address is not in addressBook                                                                                                                                                                                                                                                                                                                                           | 400              |
| 50078         | The amount you can withdraw is {0}                                                                                                                                                                                                                                                                                                                                               | 400              |
| 40110         | It is currently unavailable in a demo trading                                                                                                                                                                                                                                                                                                                                    | 400              |
| 43136         | The transferred account is frozen                                                                                                                                                                                                                                                                                                                                                | 400              |
| 43137         | Transfer in progress                                                                                                                                                                                                                                                                                                                                                             | 400              |
| 40111         | If you are located in a country where our services are restricted, please complete the KYC verification. If you have any questions, please contact customer service.                                                                                                                                                                                                             | 400              |
| 50077         | Can be convert {1} times every {0} hours                                                                                                                                                                                                                                                                                                                                         | 400              |
| 80020         | The minimum number of operations is {0} {1}                                                                                                                                                                                                                                                                                                                                      | 400              |
| 70204         | The account has open order, please cancel the open order.                                                                                                                                                                                                                                                                                                                        | 400              |
| 70205         | Today's reset has exceeded the maximum number of resets for the day: {0} and cannot be reset.                                                                                                                                                                                                                                                                                    | 400              |
| 70206         | Not main Account                                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 70207         | UID {0} not exist                                                                                                                                                                                                                                                                                                                                                                | 400              |
| 70208         | {0} can not deposit or withdrawal, please wait.                                                                                                                                                                                                                                                                                                                                  | 400              |
| 70209         | Risk control, please contact with CS service.                                                                                                                                                                                                                                                                                                                                    | 400              |
| 70210         | Exchange fail, please contact with CS service.                                                                                                                                                                                                                                                                                                                                   | 400              |
| 70211         | {0} balance exceeds {1} USDT                                                                                                                                                                                                                                                                                                                                                     | 400              |
| 70212         | please less than {0} USDT                                                                                                                                                                                                                                                                                                                                                        | 400              |
| 70213         | The withdrawal amount exceeds the daily limit                                                                                                                                                                                                                                                                                                                                    | 400              |
| 70214         | Restricted assets exist                                                                                                                                                                                                                                                                                                                                                          | 400              |
| 70215         | Frozen assets exist                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 70216         | locked assets exist                                                                                                                                                                                                                                                                                                                                                              | 400              |
| 70217         | The whitelist is turned on, withdraw address is not in addressBook                                                                                                                                                                                                                                                                                                               | 400              |
| 70218         | The transaction quantity of pending orders is higher than the modified quantity                                                                                                                                                                                                                                                                                                  | 400              |
| 70219         | Withdrawal exceeds monthly limit                                                                                                                                                                                                                                                                                                                                                 | 400              |
| 70220         | Insufficient liquidity in the market, please operate later                                                                                                                                                                                                                                                                                                                       | 400              |
| 70221         | The current currency is {0}, the net purchase value is limited to {1} USD, and you can also purchase {3} with a net purchase value of {2} USD.                                                                                                                                                                                                                                   | 400              |
| 70222         | The current currency is {0}, the net purchase quantity is limited to {1}, and the net purchase quantity is also {2}                                                                                                                                                                                                                                                              | 400              |
| 70223         | Exceeding the maximum number of orders for total trading                                                                                                                                                                                                                                                                                                                         | 400              |
| 70224         | This currency has a selling limit of {0}, leaving {1}                                                                                                                                                                                                                                                                                                                            | 400              |
| 70225         | This currency has a buying limit of {0}, leaving {1}                                                                                                                                                                                                                                                                                                                             | 400              |
| 70226         | The current maximum amount of coins that can be withdrawn or transferred out is {0}. If you want to withdraw or transfer all coins, please confirm that all spot orders have been ended.                                                                                                                                                                                         | 400              |
| 70227         | The user does not allow to place order                                                                                                                                                                                                                                                                                                                                           | 400              |
| 70228         | The operation is too frequent, please try again later.                                                                                                                                                                                                                                                                                                                           | 400              |
| 70229         | Place order error                                                                                                                                                                                                                                                                                                                                                                | 400              |
| 90001         | The single subscription limit cannot be exceeded {0}                                                                                                                                                                                                                                                                                                                             | 400              |

# WebSocket Error Code

| Error Message                       | Error Code |
| :---------------------------------- | :--------- |
| Channel does not exist              | 30001      |
| Illegal request                     | 30002      |
| Invalid op                          | 30003      |
| User needs to log in                | 30004      |
| Login failed                        | 30005      |
| request too many                    | 30006      |
| request over limit,connection close | 30007      |
| Invalid ACCESS_KEY                  | 30011      |
| Invalid ACCESS_PASSPHRASE           | 30012      |
| Invalid ACCESS_TIMESTAMP            | 30013      |
| Request timestamp expired           | 30014      |
| Invalid signature                   | 30015      |
| Param error                         | 30016      |
