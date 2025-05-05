# Public REST API Endpoints

## General Info

## Base endpoint

The base endpoint is:

- `https://api.mexc.com`

## HTTP Return Codes

- HTTP 4XX return codes are used for malformed requests; the issue is on the
  sender's side.
- HTTP 403 return code is used when the WAF Limit (Web Application Firewall) has
  been violated.
- HTTP 429 return code is used when breaking a request rate limit.
- HTTP 5XX return codes are used for internal errors; the issue is on MEXC's
  side. It is important to NOT treat this as a failure operation; the execution
  status is UNKNOWN and could have been a success.

## General Information on Endpoints

The API accepts requests of type GET, POST or DELETE

- For GET endpoints, parameters must be sent as a query string.
- For POST, PUT, and DELETE endpoints, the parameters may be sent as a query
  string with content type application/x-www-form-urlencoded,or in the request
  body with content type application/json. You may mix parameters between both
  the query string and request body if you wish to do so.
- Parameters may be sent in any order.
- If a parameter sent in both the query string and request body, the query
  string parameter will be used.

## Header

Relevant parameters in the header

| key             | Description        |
| --------------- | ------------------ |
| `X-MEXC-APIKEY` | Access key         |
| `Content-Type`  | `application/json` |

## SIGNED

- SIGNED endpoints require an additional parameter, signature, to be sent in the
  query string or request body(in the API of batch operation, if there are
  special symbols such as comma in the parameter value, these symbols need to be
  URL encoded when signing,and encode only support uppercase).
- Endpoints use HMAC SHA256 signatures. The HMAC SHA256 signature is a keyed
  HMAC SHA256 operation. Use your secretKey as the key and totalParams as the
  value for the HMAC operation.
- The signature is support lowercase only.
- totalParams is defined as the query string concatenated with the request body.

### Timing security

> The logic is as follows:

```
 if (timestamp < (serverTime + 1000) && (serverTime - timestamp) <= recvWindow)
  {
    // process request
  }
  else
  {
    // reject request
  }
```

- A SIGNED endpoint also requires a parameter, timestamp, to be sent which
  should be the millisecond timestamp of when the request was created and sent.
- An additional parameter, recvWindow, may be sent to specify the number of
  milliseconds after timestamp the request is valid for. If recvWindow is not
  sent, it defaults to 5000.

Serious trading is about timing. Networks can be unstable and unreliable, which
can lead to requests taking varying amounts of time to reach the servers. With
recvWindow, you can specify that the request must be processed within a certain
number of milliseconds or be rejected by the server.

It is recommended to use a small recvWindow of 5000 or less! The max cannot go
beyond 60,000!

### SIGNED Endpoint Examples for POST /api/v3/order

> Example 1

```
HMAC SHA256 signature:

    $ echo -n "symbol=BTCUSDT&side=BUY&type=LIMIT&quantity=1&price=11&recvWindow=5000&timestamp=1644489390087" | openssl dgst -sha256 -hmac "45d0b3c26f2644f19bfb98b07741b2f5"
    (stdin)= 323c96ab85a745712e95e63cad28903dd8292e4a905e99c4ee3932023843a117
```

```
curl command:

    (HMAC SHA256)
    $ curl -H "X-MEXC-APIKEY: mx0aBYs33eIilxBWC5" -X POST 'https://api.mexc.com/api/v3/order' -d 'symbol=BTCUSDT&side=BUY&type=LIMIT&quantity=1&price=11&recvWindow=5000&timestamp=1644489390087&signature=323c96ab85a745712e95e63cad28903dd8292e4a905e99c4ee3932023843a117'

```

> Example 2

```
HMAC SHA256 signature:

    $ echo -n "symbol=BTCUSDT&side=BUY&type=LIMIT&quantity=1&price=11&recvWindow=5000&timestamp=1644489390087" | openssl dgst -sha256 -hmac "45d0b3c26f2644f19bfb98b07741b2f5"
    (stdin)= fd3e4e8543c5188531eb7279d68ae7d26a573d0fc5ab0d18eb692451654d837a
```

```
curl command:

    (HMAC SHA256)
    $ curl -H "X-MEXC-APIKEY: mx0aBYs33eIilxBWC5" -X POST 'https://api.mexc.com/api/v3/order' -d 'symbol=BTCUSDT&side=BUY&type=LIMIT&quantity=1&price=11&recvWindow=5000&timestamp=1644489390087&signature=fd3e4e8543c5188531eb7279d68ae7d26a573d0fc5ab0d18eb692451654d837a'

```

> Example 3

```
HMAC SHA256 signature:

    $ echo -n "symbol=BTCUSDT&side=BUY&type=LIMITquantity=1&price=11&recvWindow=5000&timestamp=1644489390087" | openssl dgst -sha256 -hmac "45d0b3c26f2644f19bfb98b07741b2f5"
    (stdin)= d1a676610ceb39174c8039b3f548357994b2a34139a8addd33baadba65684592
```

```
curl command:

    (HMAC SHA256)
    $ curl -H "X-MEXC-APIKEY: mx0aBYs33eIilxBWC5" -X POST 'https://api.mexc.com/api/v3/order?symbol=BTCUSDT&side=BUY&type=LIMIT' -d 'quantity=1&price=11&recvWindow=5000&timestamp=1644489390087&signature=d1a676610ceb39174c8039b3f548357994b2a34139a8addd33baadba65684592'

```

Here is a step-by-step example of how to send a vaild signed payload from the
Linux command line using echo, openssl, and curl.

| Key       | Value                            |
| --------- | -------------------------------- |
| apiKey    | mx0aBYs33eIilxBWC5               |
| secretKey | 45d0b3c26f2644f19bfb98b07741b2f5 |

| Parameter  | Value         |
| ---------- | ------------- |
| symbol     | BTCUSDT       |
| side       | BUY           |
| type       | LIMIT         |
| quantity   | 1             |
| price      | 11            |
| recvWindow | 5000          |
| timestamp  | 1644489390087 |

#### **Example 1: As a request body**

- requestBody:
  symbol=BTCUSDT&side=BUY&type=LIMIT&quantity=1&price=11&recvWindow=5000&timestamp=1644489390087

**Example 2: As a query string**

- queryString:
  symbol=BTCUSDT&side=BUY&type=LIMIT&quantity=1&price=11&recvWindow=5000&timestamp=1644489390087

**Example 3: Mixed query string and request body**

- queryString: symbol=BTCUSDT&side=BUY&type=LIMIT
- requestBody: quantity=1&price=11&recvWindow=5000&timestamp=1644489390087

Note that the signature is different in example 3. There is no & between "LIMIT"
and "quantity=1".

## LIMITS

There is rate limit for API access frequency, upon exceed client will get code
429: Too many requests. The account is used as the basic unit of speed limit for
the endpoints that need to carry access keys. For endpoints that do not need to
carry access keys, IP addresses are used as the basic unit of rate limiting.

### Limits Description

- According to the two modes of IP and UID (account) limit, each are
  independent.
- Endpoints are marked according to IP or UID limit and their corresponding
  weight value.
- Each endpoint with IP limits has an independent 500 every 10 second limit.
- Each endpoint with UID limits has an independent 500 every 10 second limit.

### Limits Error

- When a 429 is received, it's your obligation as an API to back off and not
  spam the API.
- Repeatedly violating rate limits and/or failing to back off after receiving
  429s will result in an automated IP ban .
- IP bans are tracked and scale in duration for repeat offenders, from 2 minutes
  to 3 days.
- A Retry-After header is sent with a 418 or 429 responses and will give the
  number of seconds required to wait, in the case of a 429, to prevent a ban,
  or, in the case of a 418, until the ban is over.

### Websocket Limits

- The Websocket limits is: 100times/s.
- A connection that goes beyond the limit will be disconnected; IPs that are
  repeatedly disconnected may be banned.
- A single connection can listen to a maximum of 30 streams.

## Error Code

The following error information can be returend

| Code   | Description                                                                              |
| ------ | ---------------------------------------------------------------------------------------- |
| \-2011 | Unknown order sent                                                                       |
| 26     | operation not allowed                                                                    |
| 400    | api key required                                                                         |
| 401    | No authority                                                                             |
| 403    | Access Denied                                                                            |
| 429    | Too Many Requests                                                                        |
| 500    | Internal error                                                                           |
| 503    | service not available, please try again                                                  |
| 504    | Gateway Time-out                                                                         |
| 602    | Signature verification failed                                                            |
| 10001  | user does not exist                                                                      |
| 10007  | bad symbol                                                                               |
| 10015  | user id cannot be null                                                                   |
| 10072  | invalid access key                                                                       |
| 10073  | invalid Request-Time                                                                     |
| 10095  | amount cannot be null                                                                    |
| 10096  | amount decimal places is too long                                                        |
| 10097  | amount is error                                                                          |
| 10098  | risk control system detected abnormal                                                    |
| 10099  | user sub account does not open                                                           |
| 10100  | this currency transfer is not supported                                                  |
| 10101  | Insufficient balance                                                                     |
| 10102  | amount cannot be zero or negative                                                        |
| 10103  | this account transfer is not supported                                                   |
| 10200  | transfer operation processing                                                            |
| 10201  | transfer in failed                                                                       |
| 10202  | transfer out failed                                                                      |
| 10206  | transfer is disabled                                                                     |
| 10211  | transfer is forbidden                                                                    |
| 10212  | This withdrawal address is not on the commonly used address list or has been invalidated |
| 10216  | no address available. Please try again later                                             |
| 10219  | asset flow writing failed please try again                                               |
| 10222  | currency cannot be null                                                                  |
| 10232  | currency does not exist                                                                  |
| 10259  | Intermediate account does not configured in redisredis                                   |
| 10265  | Due to risk control, withdrawal is unavailable, please try again later                   |
| 10268  | remark length is too long                                                                |
| 20001  | subsystem is not supported                                                               |
| 20002  | Internal system error please contact support                                             |
| 22222  | record does not exist                                                                    |
| 30000  | suspended transaction for the symbol                                                     |
| 30001  | The current transaction direction is not allowed to place an order                       |
| 30002  | The minimum transaction volume cannot be less than :                                     |
| 30003  | The maximum transaction volume cannot be greater than :                                  |
| 30004  | Insufficient position                                                                    |
| 30005  | Oversold                                                                                 |
| 30010  | no valid trade price                                                                     |
| 30014  | invalid symbol                                                                           |
| 30016  | trading disabled                                                                         |
| 30018  | market order is disabled                                                                 |
| 30019  | api market order is disabled                                                             |
| 30020  | no permission for the symbol                                                             |
| 30021  | invalid symbol                                                                           |
| 30025  | no exist opponent order                                                                  |
| 30026  | invalid order ids                                                                        |
| 30027  | The currency has reached the maximum position limit, the buying is suspended             |
| 30028  | The currency triggered the platform risk control, the selling is suspended               |
| 30029  | Cannot exceed the maximum order limit                                                    |
| 30032  | Cannot exceed the maximum position                                                       |
| 30041  | current order type can not place order                                                   |
| 33333  | param is error                                                                           |
| 44444  | param cannot be null                                                                     |
| 60005  | your account is abnormal                                                                 |
| 70011  | Pair user ban trade apikey                                                               |
| 700001 | API-key format invalid                                                                   |
| 700002 | Signature for this request is not valid                                                  |
| 700003 | Timestamp for this request is outside of the recvWindow                                  |
| 700004 | Param 'origClientOrderId' or 'orderId' must be sent, but both were empty/null            |
| 700005 | recvWindow must less than 60000                                                          |
| 700006 | IP non white list                                                                        |
| 700007 | No permission to access the endpoint                                                     |
| 700008 | Illegal characters found in parameter                                                    |
| 730001 | Pair not found                                                                           |
| 730002 | Your input param is invalid                                                              |
| 730000 | Request failed, please contact the customer service                                      |
| 730001 | User information error                                                                   |
| 730002 | Parameter error                                                                          |
| 730003 | Unsupported operation, please contact the customer service                               |
| 730100 | Unusual user status                                                                      |
| 730600 | Sub-account Name cannot be null                                                          |
| 730601 | Sub-account Name must be a combination of 8-32 letters and numbers                       |
| 730602 | Sub-account remarks cannot be null                                                       |
| 730700 | API KEY remarks cannot be null                                                           |
| 730701 | API KEY permission cannot be null                                                        |
| 730702 | API KEY permission does not exist                                                        |
| 730703 | The IP information is incorrect, and a maximum of 10 IPs are allowed to be bound only    |
| 730704 | The bound IP format is incorrect, please refill                                          |
| 730705 | At most 30 groups of Api Keys are allowed to be created only                             |
| 730706 | API KEY information does not exist                                                       |
| 730707 | accessKey cannot be null                                                                 |
| 730101 | The user Name already exists                                                             |
| 140001 | sub account does not exist                                                               |
| 140002 | sub account is forbidden                                                                 |

---

## Public API Definitions

## ENUM definitions

### Order side

- BUY
- SELL

### Order type

- LIMIT (Limit order)
- MARKET (Market order)
- LIMIT_MAKER (Limit maker order)
- IMMEDIATE_OR_CANCEL (Immediate or cancel order)
- FILL_OR_KILL (Fill or kill order)

### Order Status

- NEW Uncompleted
- FILLED Filled
- PARTIALLY_FILLED Partially filled
- CANCELED Canceled
- PARTIALLY_CANCELED Partially canceled

### Kline Interval

- 1m 1 minute
- 5m 5 minute
- 15m 15 minute
- 30m 30 minute
- 60m 60 minute
- 4h 4 hour
- 1d 1 day
- 1W 1 week
- 1M 1 month

### changed type

- WITHDRAW withdraw
- WITHDRAW_FEE withdraw fee
- DEPOSIT deposit
- DEPOSIT_FEE deposit fee
- ENTRUST deal
- ENTRUST_PLACE place order
- ENTRUST_CANCEL cancel order
- TRADE_FEE trade fee
- ENTRUST_UNFROZEN return frozen order funds
- SUGAR airdrop
- ETF_INDEX ETF place order

---

## Market Data Endpoints

## Download Historical Market Data

Provides kline and trading data for all Spot pairs since 01-01-2023:Historical
Market Data

## Test Connectivity

> Response

```
{}
```

- **GET** `/api/v3/ping`

Test connectivity to the Rest API.

**Weight(IP):** 1

Parameter:

NONE

## Check Server Time

> Response

```
{
    "serverTime" : 1645539742000
}
```

- **GET** `/api/v3/time`

**Weight(IP):** 1

Parameter:

NONE

## API default symbol

> Request

```
GET /api/v3/defaultSymbols
```

> Response

```
{
    "code": 200,
    "data": [
        "GENE1USDT",
        "SNTUSDT",
        "SQUAWKUSDT",
        "HEGICUSDT",
        "GUMUSDT"
    ],
    "msg": null
}
```

- **GET** `/api/v3/defaultSymbols`

**Weight(IP):** 1

**Request**

NONE

**Response**

| Name   | Type   | Description |
| ------ | ------ | ----------- |
| symbol | string | symbol      |

## Exchange Information

> Response

```
{
    "symbol": "TOMO3LUSDT",
    "status": "ENABLED",
    "baseAsset": "TOMO3L",
    "baseAssetPrecision": 2,
    "quoteAsset": "USDT",
    "quotePrecision": 3,
    "quoteAssetPrecision": 3,
    "baseCommissionPrecision": 2,
    "quoteCommissionPrecision": 3,
    "orderTypes": [
        "LIMIT",
        "LIMIT_MAKER"
    ],
    "quoteOrderQtyMarketAllowed": false,
    "isSpotTradingAllowed": false,
    "isMarginTradingAllowed": false,
    "quoteAmountPrecision": "5",
    "baseSizePrecision": "0.0001",
    "permissions": [
        "SPOT",
        "LIMIT"
    ],
    "filters": [],
    "maxQuoteAmount": "5000000",
    "makerCommission": "0.002",
    "takerCommission": "0.002",
    "tradeSideType":"1"
}

```

- **GET** `/api/v3/exchangeInfo`

Current exchange trading rules and symbol information

**Weight(IP):** 10

**Parameter**:

There are 3 possible options:

| Method       | **Example**                                                                   |
| ------------ | ----------------------------------------------------------------------------- |
| No parameter | curl -X GET "https://api.mexc.com/api/v3/exchangeInfo"                        |
| symbol       | curl -X GET "https://api.mexc.com/api/v3/exchangeInfo?symbol=MXUSDT"          |
| symbols      | curl -X GET "https://api.mexc.com/api/v3/exchangeInfo?symbols=MXUSDT,BTCUSDT" |

**Response:**

| Name                       | Type    | Description                                                                |
| -------------------------- | ------- | -------------------------------------------------------------------------- |
| timezone                   | string  | timezone                                                                   |
| serverTime                 | long    | server Time                                                                |
| rateLimits                 | Array   | rate Limits                                                                |
| exchangeFilters            | Array   | exchange Filters                                                           |
| symbol                     | String  | symbol                                                                     |
| status                     | String  | status:1 - online, 2 - Pause, 3 - offline                                  |
| baseAsset                  | String  | base Asset                                                                 |
| baseAssetPrecision         | Int     | base Asset Precision                                                       |
| quoteAsset                 | String  | quote Asset                                                                |
| quotePrecision             | Int     | quote Precision                                                            |
| quoteAssetPrecision        | Int     | quote Asset Precision                                                      |
| baseCommissionPrecision    | Int     | base Commission Precision                                                  |
| quoteCommissionPrecision   | Int     | quote Commission Precision                                                 |
| orderTypes                 | Array   | Order Type                                                                 |
| quoteOrderQtyMarketAllowed | Boolean | quoteOrderQtyMarketAllowed                                                 |
| isSpotTradingAllowed       | Boolean | allow api spot trading                                                     |
| isMarginTradingAllowed     | Boolean | allow api margin trading                                                   |
| permissions                | Array   | permissions                                                                |
| maxQuoteAmount             | String  | max Quote Amount                                                           |
| makerCommission            | String  | marker Commission                                                          |
| takerCommission            | String  | taker Commission                                                           |
| quoteAmountPrecision       | string  | min order amount                                                           |
| baseSizePrecision          | string  | min order quantity                                                         |
| quoteAmountPrecisionMarket | string  | min order amount in market order                                           |
| maxQuoteAmountMarket       | String  | max quote Amount in market order                                           |
| tradeSideType              | String  | tradeSide Type:1 - All, 2 - buy order only, 3 - Sell order only, 4 - Close |

## Order Book

> Response

```
{
  "lastUpdateId": 1112416,
  "bids": [
      ["15.00000", "49999.00000"]
  ],
  "asks": [
    ["14.0000", "1.0000"]
  ]
}
```

- **GET** `/api/v3/depth`

**Weight(IP):** 1

Parameter:

| Name   | Type    | Mandatory | Description    | Scope                 |
| ------ | ------- | --------- | -------------- | --------------------- |
| symbol | string  | YES       | Symbol         |                       |
| limit  | integer | NO        | Returen number | default 100; max 5000 |

Response:

| Name         | Type | Description              |
| ------------ | ---- | ------------------------ |
| lastUpdateId | long | Last Update Id           |
| bids         | list | Bid \[Price, Quantity \] |
| asks         | list | Ask \[Price, Quantity \] |

## Recent Trades List

> Response

```
[
  {
    "id": null,
    "price": "23",
    "qty": "0.478468",
    "quoteQty": "11.004764",
    "time": 1640830579240,
    "isBuyerMaker": true,
    "isBestMatch": true
  }
]
```

- **GET** `/api/v3/trades`

**Weight(IP):** 5

Parameter:

| Name   | Type    | Mandatory | Description | Scope                 |
| ------ | ------- | --------- | ----------- | --------------------- |
| symbol | string  | YES       |             |                       |
| limit  | integer | NO        |             | Default 500; max 1000 |

Response:

| Name         | Description                         |
| ------------ | ----------------------------------- |
| id           | Trade id                            |
| price        | Price                               |
| qty          | Number                              |
| quoteQty     | Trade total                         |
| time         | Trade time                          |
| isBuyerMaker | Was the buyer the maker?            |
| isBestMatch  | Was the trade the best price match? |

## Compressed/Aggregate Trades List

> Response

```
[
  {
    "a": null,
    "f": null,
    "l": null,
    "p": "46782.67",
    "q": "0.0038",
    "T": 1641380483000,
    "m": false,
    "M": true
  }
]
```

- **GET** `/api/v3/aggTrades`

**Weight(IP):** 1

Get compressed, aggregate trades. Trades that fill at the time, from the same
order, with the same price will have the quantity aggregated.

Parameters:

| Name      | Type    | Mandatory | Description                                              | Scope                  |
| --------- | ------- | --------- | -------------------------------------------------------- | ---------------------- |
| symbol    | string  | YES       |                                                          |                        |
| startTime | long    | NO        | Timestamp in ms to get aggregate trades from INCLUSIVE.  |                        |
| endTime   | long    | NO        | Timestamp in ms to get aggregate trades until INCLUSIVE. |                        |
| limit     | integer | NO        |                                                          | Default 500; max 1000. |

startTime and endTime must be used at the same time.

Response:

| Name | Description                         |
| ---- | ----------------------------------- |
| a    | Aggregate tradeId                   |
| f    | First tradeId                       |
| l    | Last tradeId                        |
| p    | Price                               |
| q    | Quantity                            |
| T    | Timestamp                           |
| m    | Was the buyer the maker?            |
| M    | Was the trade the best price match? |

## Kline/Candlestick Data

> Response

```
[
  [
    1640804880000,
    "47482.36",
    "47482.36",
    "47416.57",
    "47436.1",
    "3.550717",
    1640804940000,
    "168387.3"
  ]
]
```

- **GET** `/api/v3/klines`

**Weight(IP):** 1

Kline/candlestick bars for a symbol. Klines are uniquely identified by their
open time.

Parameters:

| Name      | Type    | Mandatory | Description            |
| --------- | ------- | --------- | ---------------------- |
| symbol    | string  | YES       |                        |
| interval  | ENUM    | YES       | ENUM: Kline Interval   |
| startTime | long    | NO        |                        |
| endTime   | long    | NO        |                        |
| limit     | integer | NO        | Default 500; max 1000. |

Response:

| Index | Description        |
| ----- | ------------------ |
| 0     | Open time          |
| 1     | Open               |
| 2     | High               |
| 3     | Low                |
| 4     | Close              |
| 5     | Volume             |
| 6     | Close time         |
| 7     | Quote asset volume |

## Current Average Price

> Response

```
{
  "mins": 5,
  "price": "9.35751834"
}
```

- **GET** `/api/v3/avgPrice`

**Weight(IP):** 1

Parameters:

| Name   | Type   | Mandatory | Description |
| ------ | ------ | --------- | ----------- |
| symbol | string | YES       |             |

Response:

| Name  | Description              |
| ----- | ------------------------ |
| mins  | Average price time frame |
| price | Price                    |

## 24hr Ticker Price Change Statistics

> Response

```
{
    "symbol": "BTCUSDT",
    "priceChange": "184.34",
    "priceChangePercent": "0.00400048",
    "prevClosePrice": "46079.37",
    "lastPrice": "46263.71",
    "bidPrice": "46260.38",
    "bidQty": "",
    "askPrice": "46260.41",
    "askQty": "",
    "openPrice": "46079.37",
    "highPrice": "47550.01",
    "lowPrice": "45555.5",
    "volume": "1732.461487",
    "quoteVolume": null,
    "openTime": 1641349500000,
    "closeTime": 1641349582808,
    "count": null
}
or
[
  {
    "symbol": "BTCUSDT",
    "priceChange": "184.34",
    "priceChangePercent": "0.00400048",
    "prevClosePrice": "46079.37",
    "lastPrice": "46263.71",
    "bidPrice": "46260.38",
    "bidQty": "",
    "askPrice": "46260.41",
    "askQty": "",
    "openPrice": "46079.37",
    "highPrice": "47550.01",
    "lowPrice": "45555.5",
    "volume": "1732.461487",
    "quoteVolume": null,
    "openTime": 1641349500000,
    "closeTime": 1641349582808,
    "count": null
  },
  {
    "symbol": "ETHUSDT",
    "priceChange": "184.34",
    "priceChangePercent": "0.00400048",
    "prevClosePrice": "46079.37",
    "lastPrice": "46263.71",
    "bidPrice": "46260.38",
    "bidQty": "",
    "askPrice": "46260.41",
    "askQty": "",
    "openPrice": "46079.37",
    "highPrice": "47550.01",
    "lowPrice": "45555.5",
    "volume": "1732.461487",
    "quoteVolume": null,
    "openTime": 1641349500000,
    "closeTime": 1641349582808,
    "count": null
  }
]
```

- **GET** `/api/v3/ticker/24hr`

**Weight(IP):**

| Parameter | Symbols Provided | Weight |
| --------- | ---------------- | ------ |
| symbol    | 1                | 1      |
| symbols   | all              | 40     |

Parameters:

| Name   | Type   | Mandatory | Description                                                                      |
| ------ | ------ | --------- | -------------------------------------------------------------------------------- |
| symbol | string | NO        | If the symbol is not sent, tickers for all symbols will be returned in an array. |

Response:

| Name               | Description          |
| ------------------ | -------------------- |
| symbol             | Symbol               |
| priceChange        | price Change         |
| priceChangePercent | price change percent |
| prevClosePrice     | Previous close price |
| lastPrice          | Last price           |
| lastQty            | Last quantity        |
| bidPrice           | Bid best price       |
| bidQty             | Bid best quantity    |
| askPrice           | Ask best price       |
| askQty             | Ask best quantity    |
| openPrice          | Open                 |
| highPrice          | High                 |
| lowPrice           | Low                  |
| volume             | Deal volume          |
| quoteVolume        | Quote asset volume   |
| openTime           | Start time           |
| closeTime          | Close time           |
| count              |                      |

## Symbol Price Ticker

> Response

```
{
    "symbol": "BTCUSDT",
    "price": "184.34"
}
or
[
  {
    "symbol": "BTCUSDT",
    "price": "6.65"
  },
  {
    "symbol": "ETHUSDT",
    "price": "5.65"
  }
]
```

- **GET** `/api/v3/ticker/price`

**Weight(IP):**

| Parameter | Symbols Provided | Weight |
| --------- | ---------------- | ------ |
| symbol    | 1                | 1      |
| symbols   | all              | 2      |

Parameters:

| Name   | Type   | Mandatory | Description                                                          |
| ------ | ------ | --------- | -------------------------------------------------------------------- |
| symbol | string | NO        | If the symbol is not sent, all symbols will be returned in an array. |

Response:

| Name   | Description |
| ------ | ----------- |
| symbol |             |
| price  | Last price  |

## Symbol Order Book Ticker

> Response

```
{
  "symbol": "AEUSDT",
  "bidPrice": "0.11001",
  "bidQty": "115.59",
  "askPrice": "0.11127",
  "askQty": "215.48"
}
OR
[
  {
    "symbol": "AEUSDT",
    "bidPrice": "0.11001",
    "bidQty": "115.59",
    "askPrice": "0.11127",
    "askQty": "215.48"
  },
  {
    "symbol": "AEUSDT",
    "bidPrice": "0.11001",
    "bidQty": "115.59",
    "askPrice": "0.11127",
    "askQty": "215.48"
  }
]
```

- **GET** `/api/v3/ticker/bookTicker`

**Weight(IP):** 1

Best price/qty on the order book for a symbol or symbols.

Parameters:

| Name   | Type   | Mandatory | Description                                                          |
| ------ | ------ | --------- | -------------------------------------------------------------------- |
| symbol | string | NO        | If the symbol is not sent, all symbols will be returned in an array. |

Response:

| Name     | Description       |
| -------- | ----------------- |
| symbol   | Symbol            |
| bidPrice | Best bid price    |
| bidQty   | Best bid quantity |
| askPrice | Best ask price    |
| askQty   | Best ask quantity |
