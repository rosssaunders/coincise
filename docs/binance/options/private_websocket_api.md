# Binance Options Private Websocket API Documentation

## Quick Start

### API Key Setup

- Some endpoints will require an API Key. Please refer to
  [this page](https://www.binance.com/en/support/faq/how-to-create-api-keys-on-binance-360002502072)
  regarding API key creation.
- Once API key is created, it is recommended to set IP restrictions on the key
  for security reasons.
- **Never share your API key/secret key to ANYONE.**

If the API keys were accidentally shared, please delete them immediately and
create a new key.

### API Key Restrictions

- After creating the API key, the default restrictions is `Enable Reading`.
- To **enable withdrawals via the API**, the API key restriction needs to be
  modified through the Binance UI.

### Enabling Accounts

#### Account

A `SPOT` account is provided by default upon creation of a Binance Account.

#### Futures Account

To enable a `FUTURES` account for Futures Trading, please refer to the
[Futures Trading Guide](https://www.binance.com/en/support/faq/a-beginner-s-guide-to-futures-trading-website-360039304272)

#### Futures Testnet

Users can use the Futures Testnet to practice `FUTURES` trading.

Currently, this is only available via the API.

Please refer to the
[Futures Testnet page](https://testnet.binancefuture.com/en/futures/BTCUSDT) for
more information and how to set up the Testnet API key.

#### Option Account

To enable a `OPTION` account for Option Trading, please refer to the
[Option Trading Guide](https://www.binance.com/en/support/faq/introduction-to-binance-options-374321c9317c473480243365298b8706)

### API Library

#### Python connector

This is a lightweight library that works as a connector to Binance public API,
written in Python.

[https://github.com/binance/binance-futures-connector-python](https://github.com/binance/binance-futures-connector-python)

#### Java connector

This is a lightweight library that works as a connector to Binance public API,
written for Java users.

[https://github.com/binance/binance-futures-connector-java](https://github.com/binance/binance-futures-connector-java)

> Source:
> [https://developers.binance.com/docs/derivatives/quick-start](https://developers.binance.com/docs/derivatives/quick-start)

## General Info

### General API Information

- Some endpoints will require an API Key. Please refer to
  [this page](https://www.binance.com/en/support/articles/360002502072)
- The base endpoint is: \*\*[https://eapi.binance.com](https://eapi.binance.com)
- All endpoints return either a JSON object or array.
- Data is returned in ascending order. Oldest first, newest last.
- All time and timestamp related fields are in milliseconds.

#### HTTP Return Codes

- HTTP `4XX` return codes are used for for malformed requests; the issue is on
  the sender's side.
- HTTP `403` return code is used when the WAF Limit (Web Application Firewall)
  has been violated.
- HTTP `429` return code is used when breaking a request rate limit.
- HTTP `418` return code is used when an IP has been auto-banned for continuing
  to send requests after receiving `429` codes.
- HTTP `5XX` return codes are used for internal errors; the issue is on
  Binance's side.
- HTTP `503` return code is used when:
  1.  If there is an error message **"Unknown error, please check your request
      or try again later."** returned in the response, the API successfully sent
      the request but not get a response within the timeout period.  
      It is important to **NOT** treat this as a failure operation; the
      execution status is **UNKNOWN** and could have been a success;
  2.  If there is an error message **"Service Unavailable."** returned in the
      response, it means this is a failure API operation and the service might
      be unavailable at the moment, you need to retry later.
  3.  If there is an error message **"Internal error; unable to process your
      request. Please try again."** returned in the response, it means this is a
      failure API operation and you can resend your request if you need.

#### Error Codes and Messages

- Any endpoint can return an ERROR

> **_The error payload is as follows:_**

```json
{
  "code": -1121,
  "msg": "Invalid symbol."
}
```

- Specific error codes and messages defined in
  [Error Codes](/docs/derivatives/option/general-info#error-codes).

#### General Information on Endpoints

- For `GET` endpoints, parameters must be sent as a `query string` without
  setting content type in the http headers.
- For `POST`, `PUT`, and `DELETE` endpoints, the parameters may be sent as a
  `query string` or in the `request body` with content type
  `application/x-www-form-urlencoded`. You may mix parameters between both the
  `query string` and `request body` if you wish to do so.
- Parameters may be sent in any order.
- If a parameter sent in both the `query string` and `request body`, the
  `query string` parameter will be used.

### LIMITS

- The `/eapi/v1/exchangeInfo` `rateLimits` array contains objects related to the
  exchange's `RAW_REQUEST`, `REQUEST_WEIGHT`, and `ORDER` rate limits. These are
  further defined in the `ENUM definitions` section under
  `Rate limiters (rateLimitType)`.
- A `429` will be returned when either rate limit is violated.

Binance has the right to further tighten the rate limits on users with intent to
attack.

#### IP Limits

- Every request will contain `X-MBX-USED-WEIGHT-(intervalNum)(intervalLetter)`
  in the response headers which has the current used weight for the IP for all
  request rate limiters defined.
- Each route has a `weight` which determines for the number of requests each
  endpoint counts for. Heavier endpoints and endpoints that do operations on
  multiple symbols will have a heavier `weight`.
- When a 429 is received, it's your obligation as an API to back off and not
  spam the API.
- **Repeatedly violating rate limits and/or failing to back off after receiving
  429s will result in an automated IP ban (HTTP status 418).**
- IP bans are tracked and **scale in duration** for repeat offenders, **from 2
  minutes to 3 days**.
- **The limits on the API are based on the IPs, not the API keys.**

It is strongly recommended to use websocket stream for getting data as much as
possible, which can not only ensure the timeliness of the message, but also
reduce the access restriction pressure caused by the request.

#### Order Rate Limits

- Every order response will contain a
  `X-MBX-ORDER-COUNT-(intervalNum)(intervalLetter)` header which has the current
  order count for the account for all order rate limiters defined.
- Rejected/unsuccessful orders are not guaranteed to have `X-MBX-ORDER-COUNT-**`
  headers in the response.
- **The order rate limit is counted against each account**.

### Endpoint Security Type

- Each endpoint has a security type that determines the how you will interact
  with it.
- API-keys are passed into the Rest API via the `X-MBX-APIKEY` header.
- API-keys and secret-keys **are case sensitive**.
- API-keys can be configured to only access certain types of secure endpoints.
  For example, one API-key could be used for TRADE only, while another API-key
  can access everything except for TRADE routes.
- By default, API-keys can access all secure routes.

| Security Type | Description                                              |
| ------------- | -------------------------------------------------------- |
| NONE          | Endpoint can be accessed freely.                         |
| TRADE         | Endpoint requires sending a valid API-Key and signature. |
| USER_DATA     | Endpoint requires sending a valid API-Key and signature. |
| USER_STREAM   | Endpoint requires sending a valid API-Key.               |
| MARKET_DATA   | Endpoint requires sending a valid API-Key.               |

- `TRADE` and `USER_DATA` endpoints are `SIGNED` endpoints.

### SIGNED (TRADE and USER_DATA) Endpoint Security

- `SIGNED` endpoints require an additional parameter, `signature`, to be sent in
  the `query string` or `request body`.
- Endpoints use `HMAC SHA256` signatures. The `HMAC SHA256 signature` is a keyed
  `HMAC SHA256` operation. Use your `secretKey` as the key and `totalParams` as
  the value for the HMAC operation.
- The `signature` is **not case sensitive**.
- Please make sure the `signature` is the end part of your `query string` or
  `request body`.
- `totalParams` is defined as the `query string` concatenated with the
  `request body`.

#### Timing Security

- A `SIGNED` endpoint also requires a parameter, `timestamp`, to be sent which
  should be the millisecond timestamp of when the request was created and sent.
- An additional parameter, `recvWindow`, may be sent to specify the number of
  milliseconds after `timestamp` the request is valid for. If `recvWindow` is
  not sent, **it defaults to 5000**.

> The logic is as follows:

```javascript
if (timestamp < serverTime + 1000 && serverTime - timestamp <= recvWindow) {
  // process request
} else {
  // reject request
}
```

**Serious trading is about timing.** Networks can be unstable and unreliable,
which can lead to requests taking varying amounts of time to reach the servers.
With `recvWindow`, you can specify that the request must be processed within a
certain number of milliseconds or be rejected by the server.

It is recommended to use a small recvWindow of 5000 or less!

#### SIGNED Endpoint Examples for POST /eapi/v1/order

Here is a step-by-step example of how to send a vaild signed payload from the
Linux command line using `echo`, `openssl`, and `curl`.

| Key       | Value                                                            |
| --------- | ---------------------------------------------------------------- |
| apiKey    | dbefbc809e3e83c283a984c3a1459732ea7db1360ca80c5c2c8867408d28cc83 |
| secretKey | 2b5eb11e18796d12d88f13dc27dbbd02c2cc51ff7059765ed9821957d82bb4d9 |

| Parameter   | Value         |
| ----------- | ------------- |
| symbol      | BTCUSDT       |
| side        | BUY           |
| type        | LIMIT         |
| timeInForce | GTC           |
| quantity    | 1             |
| price       | 9000          |
| recvWindow  | 5000          |
| timestamp   | 1591702613943 |

##### Example 1: As a query string

> **Example 1**

> **HMAC SHA256 signature:**

```shell
    $ echo -n "symbol=BTC-210129-40000-C&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=2000&recvWindow=5000&timestamp=1611825601400" | openssl dgst -sha256 -hmac "YtP1BudNOWZE1ag5uzCkh4hIC7qSmQOu797r5EJBFGhxBYivjj8HIX0iiiPof5yG"
    (stdin)= 7c12045972f6140e765e0f2b67d28099718df805732676494238f50be830a7d7
```

> **curl command:**

```shell
    (HMAC SHA256)
    $ curl -H "X-MBX-APIKEY: 22BjeOROKiXJ3NxbR3zjh3uoGcaflPu3VMyBXAg8Jj2J1xVSnY0eB4dzacdE9IWn" -X POST 'https://eapi.binance.com/eapi/v1/order' -d 'symbol=BTC-210129-40000-C&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=2000&recvWindow=5000&timestamp=1611825601400&signature=7c12045972f6140e765e0f2b67d28099718df805732676494238f50be830a7d7'
```

- **requestBody:**

symbol=BTC-210129-40000-C  
&side=BUY  
&type=LIMIT  
&timeInForce=GTC  
&quantity=1  
&price=2000  
&recvWindow=5000  
&timestamp=1611825601400

##### Example 2: As a request body

> **Example 2**

> **HMAC SHA256 signature:**

```shell
    $ echo -n "symbol=BTC-210129-40000-C&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=2000&recvWindow=5000&timestamp=1611825601400" | openssl dgst -sha256 -hmac "YtP1BudNOWZE1ag5uzCkh4hIC7qSmQOu797r5EJBFGhxBYivjj8HIX0iiiPof5yG"
    (stdin)= 7c12045972f6140e765e0f2b67d28099718df805732676494238f50be830a7d7
```

> **curl command:**

```shell
    (HMAC SHA256)
   $ curl -H "X-MBX-APIKEY: 22BjeOROKiXJ3NxbR3zjh3uoGcaflPu3VMyBXAg8Jj2J1xVSnY0eB4dzacdE9IWn" -X POST 'https://eapi.binance.com/eapi/v1/order?symbol=BTC-210129-40000-C&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=2000&recvWindow=5000&timestamp=1611825601400&signature=7c12045972f6140e765e0f2b67d28099718df805732676494238f50be830a7d7'
```

- **queryString:**

symbol=BTC-210129-40000-C  
&side=BUY  
&type=LIMIT  
&timeInForce=GTC  
&quantity=1  
&price=2000  
&recvWindow=5000  
&timestamp=1611825601400

##### Example 3: Mixed query string and request body

> **Example 3**

> **HMAC SHA256 signature:**

```shell
   $ echo -n "symbol=BTC-210129-40000-C&side=BUY&type=LIMIT&timeInForce=GTCquantity=0.01&price=2000&recvWindow=5000&timestamp=1611825601400" | openssl dgst -sha256 -hmac "YtP1BudNOWZE1ag5uzCkh4hIC7qSmQOu797r5EJBFGhxBYivjj8HIX0iiiPof5yG"
    (stdin)= fa6045c54fb02912b766442be1f66fab619217e551a4fb4f8a1ee000df914d8e
```

> **curl command:**

```shell
    (HMAC SHA256)
    $ curl -H "X-MBX-APIKEY: 22BjeOROKiXJ3NxbR3zjh3uoGcaflPu3VMyBXAg8Jj2J1xVSnY0eB4dzacdE9IWn" -X POST 'https://eapi.binance.com/eapi/v1/order?symbol=BTC-210129-40000-C&side=BUY&type=LIMIT&timeInForce=GTC' -d 'quantity=0.01&price=2000&recvWindow=5000&timestamp=1611825601400&signature=fa6045c54fb02912b766442be1f66fab619217e551a4fb4f8a1ee000df914d8e'
```

- **queryString:**

symbol=BTC-210129-40000-C&side=BUY&type=LIMIT&timeInForce=GTC

- **requestBody:**

quantity=1&price=2000&recvWindow=5000&timestamp=1611825601400

Note that the signature is different in example 3. There is no & between "GTC"
and "quantity=1".

> Source:
> [https://developers.binance.com/docs/derivatives/option/general-info](https://developers.binance.com/docs/derivatives/option/general-info)

## Public Endpoints Info

### Terminology

- `symbol` refers to the symbol name of a options contract symbol
- `underlying` refers to the underlying symbol of a options contract symbol
- `quoteAsset` refers to the asset that is the price of a symbol.
- `settleAsset` refers to the settlement asset when options are exercised

### ENUM definitions

**Options contract type**

- CALL
- PUT

**Order side (side)**

- BUY
- SELL

**Position side (positionSide)**

- LONG
- SHORT

**Time in force (timeInForce)**

- GTC - Good Till Cancel
- IOC - Immediate or Cancel
- FOK - Fill or Kill

**Response Type (newOrderRespType)**

- ACK
- RESULT

**Order types (type)**

- LIMIT

**Order status (status)**

- ACCEPTED
- REJECTED
- PARTIALLY_FILLED
- FILLED
- CANCELLED

**Kline/Candlestick chart intervals:**

m -> minutes; h -> hours; d -> days; w -> weeks; M -> months

- 1m
- 3m
- 5m
- 15m
- 30m
- 1h
- 2h
- 4h
- 6h
- 8h
- 12h
- 1d
- 3d
- 1w
- 1M

**Rate limiters (rateLimitType)**

> REQUEST_WEIGHT

```json
{
  "rateLimitType": "REQUEST_WEIGHT",
  "interval": "MINUTE",
  "intervalNum": 1,
  "limit": 2400
}
```

> ORDERS

```json
{
  "rateLimitType": "ORDERS",
  "interval": "MINUTE",
  "intervalNum": 1,
  "limit": 1200
}
```

- REQUEST_WEIGHT
- ORDERS

**Rate limit intervals (interval)**

- MINUTE

## Filters

Filters define trading rules on a symbol or an exchange.

### Symbol filters

#### PRICE_FILTER

> **/exchangeInfo format:**

```json
{
  "filterType": "PRICE_FILTER",
  "minPrice": "0.00000100",
  "maxPrice": "100000.00000000",
  "tickSize": "0.00000100"
}
```

The `PRICE_FILTER` defines the `price` rules for a symbol. There are 3 parts:

- `minPrice` defines the minimum `price`/`stopPrice` allowed; disabled on
  `minPrice` == 0.
- `maxPrice` defines the maximum `price`/`stopPrice` allowed; disabled on
  `maxPrice` == 0.
- `tickSize` defines the intervals that a `price`/`stopPrice` can be
  increased/decreased by; disabled on `tickSize` == 0.

Any of the above variables can be set to 0, which disables that rule in the
`price filter`. In order to pass the `price filter`, the following must be true
for `price`/`stopPrice` of the enabled rules:

- sell order `price` >= `minPrice`
- buy order `price` <= `maxPrice`
- (`price`\-`minPrice`) % `tickSize` == 0

#### LOT_SIZE

> **/exchangeInfo format:**

```json
{
  "filterType": "LOT_SIZE",
  "minQty": "0.00100000",
  "maxQty": "100000.00000000",
  "stepSize": "0.00100000"
}
```

The `LOT_SIZE` filter defines the `quantity` (aka "lots" in auction terms) rules
for a symbol. There are 3 parts:

- `minQty` defines the minimum `quantity` allowed.
- `maxQty` defines the maximum `quantity` allowed.
- `stepSize` defines the intervals that a `quantity` can be increased/decreased
  by.

In order to pass the `lot size`, the following must be true for `quantity`:

- `quantity` >= `minQty`
- `quantity` <= `maxQty`
- (`quantity`\-`minQty`) % `stepSize` == 0

> Source:
> [https://developers.binance.com/docs/derivatives/option/common-definition](https://developers.binance.com/docs/derivatives/option/common-definition)

## Error Codes

> Here is the error JSON payload:

```json
{
  "code": -1121,
  "msg": "Invalid symbol."
}
```

Errors consist of two parts: an error code and a message.  
Codes are universal,but messages can vary.

| Code | Name                                | Description                                                                                                                                                                                                                                                                                                                                                                                         |
| ---- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1000 | UNKNOWN​                            | An unknown error occurred while processing the request.                                                                                                                                                                                                                                                                                                                                             |
| 1001 | DISCONNECTED​                       | Internal error; unable to process your request. Please try again.                                                                                                                                                                                                                                                                                                                                   |
| 1002 | UNAUTHORIZED​                       | You are not authorized to execute this request.                                                                                                                                                                                                                                                                                                                                                     |
| 1008 | TOO_MANY_REQUESTS​                  | \- Too many requests queued. - Too much request weight used; please use the websocket for live updates to avoid polling the API. - Too much request weight used; current limit is %s request weight per %s %s. Please use the websocket for live updates to avoid polling the API. - Way too much request weight used; IP banned until %s. Please use the websocket for live updates to avoid bans. |
| 1014 | UNKNOWN_ORDER_COMPOSITION​          | Unsupported order combination.                                                                                                                                                                                                                                                                                                                                                                      |
| 1015 | TOO_MANY_ORDERS​                    | \- Too many new orders. - Too many new orders; current limit is %s orders per %s.                                                                                                                                                                                                                                                                                                                   |
| 1016 | SERVICE_SHUTTING_DOWN​              | This service is no longer available.                                                                                                                                                                                                                                                                                                                                                                |
| 1020 | UNSUPPORTED_OPERATION​              | This operation is not supported.                                                                                                                                                                                                                                                                                                                                                                    |
| 1021 | INVALID_TIMESTAMP​                  | \- Timestamp for this request is outside of the recvWindow. - Timestamp for this request was 1000ms ahead of the server's time.                                                                                                                                                                                                                                                                     |
| 1022 | INVALID_SIGNATURE​                  | Signature for this request is not valid.                                                                                                                                                                                                                                                                                                                                                            |
| 1100 | ILLEGAL_CHARS​                      | \- Illegal characters found in a parameter. - Illegal characters found in a parameter. %s - Illegal characters found in parameter `%s`; legal range is `%s`.                                                                                                                                                                                                                                        |
| 1101 | TOO_MANY_PARAMETERS​                | \- Too many parameters sent for this endpoint. - Too many parameters; expected `%s` and received `%s`. - Duplicate values for a parameter detected.                                                                                                                                                                                                                                                 |
| 1102 | MANDATORY_PARAM_EMPTY_OR_MALFORMED​ | \- A mandatory parameter was not sent, was empty/null, or malformed. - Mandatory parameter `%s` was not sent, was empty/null, or malformed. - Param `%s` or `%s` must be sent, but both were empty/null!                                                                                                                                                                                            |
| 1103 | UNKNOWN_PARAM​                      | An unknown parameter was sent.                                                                                                                                                                                                                                                                                                                                                                      |
| 1104 | UNREAD_PARAMETERS​                  | \- Not all sent parameters were read. - Not all sent parameters were read; read `%s` parameter(s) but was sent `%s`.                                                                                                                                                                                                                                                                                |
| 1105 | PARAM_EMPTY​                        | \- A parameter was empty. - Parameter `%s` was empty.                                                                                                                                                                                                                                                                                                                                               |
| 1106 | PARAM_NOT_REQUIRED​                 | \- A parameter was sent when not required. - Parameter `%s` sent when not required.                                                                                                                                                                                                                                                                                                                 |
| 1111 | BAD_PRECISION​                      | Precision is over the maximum defined for this asset.                                                                                                                                                                                                                                                                                                                                               |
| 1115 | INVALID_TIF​                        | Invalid timeInForce.                                                                                                                                                                                                                                                                                                                                                                                |
| 1116 | INVALID_ORDER_TYPE​                 | Invalid orderType.                                                                                                                                                                                                                                                                                                                                                                                  |
| 1117 | INVALID_SIDE​                       | Invalid side.                                                                                                                                                                                                                                                                                                                                                                                       |
| 1118 | EMPTY_NEW_CL_ORD_ID​                | New client order ID was empty.                                                                                                                                                                                                                                                                                                                                                                      |
| 1119 | EMPTY_ORG_CL_ORD_ID​                | Original client order ID was empty.                                                                                                                                                                                                                                                                                                                                                                 |
| 1120 | BAD_INTERVAL​                       | Invalid interval.                                                                                                                                                                                                                                                                                                                                                                                   |
| 1121 | BAD_SYMBOL​                         | Invalid symbol.                                                                                                                                                                                                                                                                                                                                                                                     |
| 1125 | INVALID_LISTEN_KEY​                 | This listenKey does not exist.                                                                                                                                                                                                                                                                                                                                                                      |
| 1127 | MORE_THAN_XX_HOURS​                 | \- Lookup interval is too big. - More than %s hours between startTime and endTime.                                                                                                                                                                                                                                                                                                                  |
| 1128 | BAD_CONTRACT​                       | Invalid underlying                                                                                                                                                                                                                                                                                                                                                                                  |
| 1129 | BAD_CURRENCY​                       | Invalid asset。                                                                                                                                                                                                                                                                                                                                                                                     |
| 1130 | INVALID_PARAMETER​                  | \- Invalid data sent for a parameter. - Data sent for paramter `%s` is not valid.                                                                                                                                                                                                                                                                                                                   |
| 1131 | BAD_RECV_WINDOW​                    | recvWindow must be less than 60000                                                                                                                                                                                                                                                                                                                                                                  |
| 2010 | NEW_ORDER_REJECTED​                 | NEW_ORDER_REJECTED                                                                                                                                                                                                                                                                                                                                                                                  |
| 2013 | NO_SUCH_ORDER​                      | Order does not exist.                                                                                                                                                                                                                                                                                                                                                                               |
| 2014 | BAD_API_KEY_FMT​                    | API-key format invalid.                                                                                                                                                                                                                                                                                                                                                                             |
| 2015 | INVALID_API_KEY​                    | Invalid API-key, IP, or permissions for action.                                                                                                                                                                                                                                                                                                                                                     |
| 2018 | BALANCE_NOT_SUFFICIENT​             | Balance is insufficient.                                                                                                                                                                                                                                                                                                                                                                            |
| 2027 | OPTION_MARGIN_NOT_SUFFICIENT​       | Option margin is insufficient.                                                                                                                                                                                                                                                                                                                                                                      |
| 3029 | TRANSFER_FAILED​                    | Asset transfer fail.                                                                                                                                                                                                                                                                                                                                                                                |
| 4001 | PRICE_LESS_THAN_ZERO​               | Price less than 0.                                                                                                                                                                                                                                                                                                                                                                                  |
| 4002 | PRICE_GREATER_THAN_MAX_PRICE​       | Price greater than max price.                                                                                                                                                                                                                                                                                                                                                                       |
| 4003 | QTY_LESS_THAN_ZERO​                 | Quantity less than zero.                                                                                                                                                                                                                                                                                                                                                                            |
| 4004 | QTY_LESS_THAN_MIN_QTY​              | Quantity less than min quantity.                                                                                                                                                                                                                                                                                                                                                                    |
| 4005 | QTY_GREATER_THAN_MAX_QTY​           | Quantity greater than max quantity.                                                                                                                                                                                                                                                                                                                                                                 |
| 4013 | PRICE_LESS_THAN_MIN_PRICE​          | Price less than min price.                                                                                                                                                                                                                                                                                                                                                                          |
| 4029 | INVALID_TICK_SIZE_PRECISION​        | Tick size precision is invalid.                                                                                                                                                                                                                                                                                                                                                                     |
| 4030 | INVALID_QTY_PRECISION​              | Step size precision is invalid.                                                                                                                                                                                                                                                                                                                                                                     |
| 4055 | AMOUNT_MUST_BE_POSITIVE​            | Amount must be positive.                                                                                                                                                                                                                                                                                                                                                                            |

### 10xx - General Server or Network issues

### 11xx - 2xxx Request issues

### 3xxx-5xxx Filters and other issues

> Source:
> [https://developers.binance.com/docs/derivatives/option/error-code](https://developers.binance.com/docs/derivatives/option/error-code)

## Connect

- The base API endpoint is:
  **[https://eapi.binance.com](https://eapi.binance.com)**
- A User Data Stream `listenKey` is valid for 60 minutes after creation.
- Doing a `PUT` on a `listenKey` will extend its validity for 60 minutes.
- Doing a `DELETE` on a `listenKey` will close the stream and invalidate the
  `listenKey`.
- Doing a `POST` on an account with an active `listenKey` will return the
  currently active `listenKey` and extend its validity for 60 minutes.
- Connection method for Websocket：
  - Base Url: **wss://nbstream.binance.com/eoptions/**
  - User Data Streams are accessed at **/ws/<listenKey>**
  - Example:
    `wss://nbstream.binance.com/eoptions/ws/XaEAKTsQSRLZAGH9tuIu37plSRsdjmlAVBoNYPUITlTAko1WI22PgmBMpI1rS8Yh`
- A single connection is only valid for 24 hours; expect to be disconnected at
  the 24 hour mark

> Source:
> [https://developers.binance.com/docs/derivatives/option/user-data-streams](https://developers.binance.com/docs/derivatives/option/user-data-streams)

## Start User Data Stream (USER_STREAM)

### API Description

Start a new user data stream. The stream will close after 60 minutes unless a
keepalive is sent. If the account has an active `listenKey`, that `listenKey`
will be returned and its validity will be extended for 60 minutes.

### HTTP Request

POST `/eapi/v1/listenKey`

### Request Weight

**1**

### Request Parameters

None

### Response Example

```json
{
  "listenKey": "pqia91ma19a5s61cv6a81va65sdf19v8a65a1a5s61cv6a81va65sdf19v8a65a1"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/user-data-streams/Start-User-Data-Stream](https://developers.binance.com/docs/derivatives/option/user-data-streams/Start-User-Data-Stream)

## Keepalive User Data Stream (USER_STREAM)

### API Description

Keepalive a user data stream to prevent a time out. User data streams will close
after 60 minutes. It's recommended to send a ping about every 60 minutes.

### HTTP Request

PUT `/eapi/v1/listenKey`

### Request Weight

**1**

### Request Parameters

None

### Response Example

```json
{}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/user-data-streams/Keepalive-User-Data-Stream](https://developers.binance.com/docs/derivatives/option/user-data-streams/Keepalive-User-Data-Stream)

## Close User Data Stream (USER_STREAM)

### API Description

Close out a user data stream.

### HTTP Request

DELETE `/eapi/v1/listenKey`

### Request Weight

**1**

### Request Parameters

None

### Response Example

```json
{}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/user-data-streams/Close-User-Data-Stream](https://developers.binance.com/docs/derivatives/option/user-data-streams/Close-User-Data-Stream)

## Event: Risk level change

### Event Description

- Updates whenever there is an account risk level change. The following are
  possibly values:
  - NORMAL
  - REDUCE_ONLY
- Note: Risk level changes are only applicable to VIP and Market Makers user
  accounts. VIP and certain Market Maker accounts will be automatically placed
  into REDUCE_ONLY mode if their margin balance is insufficient to meet their
  maintenance margin obligations. Once in REDUCE_ONLY mode, the system will
  re-evaluate the risk level only upon the following events:
  - Funds transfer
  - Trade fill
  - Option expiry

### Event Name

`RISK_LEVEL_CHANGE`

### Update Speed

**50ms**

### Response Example

```json
{
  "e": "RISK_LEVEL_CHANGE", //Event Type
  "E": 1587727187525, //Event Time
  "s": "REDUCE_ONLY", //risk level
  "mb": "1534.11708371", //margin balance
  "mm": "254789.11708371" //maintenance margin
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/user-data-streams/Event-Risk-level-change](https://developers.binance.com/docs/derivatives/option/user-data-streams/Event-Risk-level-change)

## Event: Order update

### Event Description

- trade related Update under the following conditions:
  - Order fills
  - Order placed
  - Order cancelled

### Event Name

`ORDER_TRADE_UPDATE`

### Update Speed

**50ms**

### Response Example

```json
{
  "e":"ORDER_TRADE_UPDATE",           //Event Type
  "E":1657613775883,                  //Event Time
  "o":[
    {
      "T":1657613342918,              //Order Create Time
      "t":1657613342918,              //Order Update Time
      "s":"BTC-220930-18000-C",       //Symbol
      "c":"",                         //clientOrderId
      "oid":"4611869636869226548",    //order id
      "p":"1993",                     //order price
      "q":"1",                        //order quantity (positive for BUY, negative for SELL)
      "stp":0,                        //not used for now
      "r":false,                      //reduce only
      "po":true,                      //post only
      "S":"PARTIALLY_FILLED",         //status
      "e":"0.1",                      //completed trade volume(in contracts)      
      "ec":"199.3",                   //completed trade amount(in quote asset)
      "f":"2",                        //fee
      "tif": "GTC",                   //time in force
      "oty":"LIMIT",                  //order type
      "fi":[
        {
          "t":"20",                   //tradeId
          "p":"1993",                 //trade price
          "q":"0.1",                  //trade quantity
          "T":1657613774336,          //trade time
          "m":"TAKER"                 //taker or maker
          "f":"0.0002"                //commission(>0) or rebate(<0)
        }
      ]
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/user-data-streams/Event-Order-update](https://developers.binance.com/docs/derivatives/option/user-data-streams/Event-Order-update)

## Event: Account data

### Event Description

- Update under the following conditions:
  - Account deposit or withdrawal
  - Position info change. Includes a P attribute if there are changes, otherwise
    does not include a P attribute.
  - Greek update

### Event Name

`ACCOUNT_UPDATE`

### Update Speed

**50ms**

### Response Example

```json
{
  "e": "ACCOUNT_UPDATE", // Event type
  "E": 1591696384141, // Event time
  "B": [
    {
      "b": "100007992.26053177", // Account balance
      "m": "0", // Position value
      "u": "458.782655111111", // Unrealized profit/loss
      "U": 200, // Positive unrealized profit for long position
      "M": "-15452.328456", // Maintenance margin
      "i": "-18852.328456", // Initial margin
      "a": "USDT" // Margin asset
    }
  ],
  "G": [
    {
      "ui": "SOLUSDT", // Underlying
      "d": -33.2933905, // Delta
      "t": 35.5926375, // Theta
      "g": -14.3023855, // Gamma
      "v": -0.1929375 // Vega
    }
  ],
  "P": [
    {
      "s": "SOL-220912-35-C", // Contract symbol
      "c": "-50", // Number of current positions
      "r": "-50", // Number of positions that can be reduced
      "p": "-100", // Position value
      "a": "2.2" // Average entry price
    }
  ],
  "uid": 1000006559949
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/user-data-streams/Event-Account-data](https://developers.binance.com/docs/derivatives/option/user-data-streams/Event-Account-data)
