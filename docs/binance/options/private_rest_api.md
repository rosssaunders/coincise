# Binance Options Private REST API Documentation

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

## Option Account Information(TRADE)

### API Description

Get current account information.

### HTTP Request

GET `/eapi/v1/account`

### Request Weight

**3**

### Request Parameters

| Name       | Type | Mandatory | Description |
| ---------- | ---- | --------- | ----------- |
| recvWindow | LONG | NO        |             |
| timestamp  | LONG | YES       |             |

### Response Example

```json
{
  "asset": [
    {
      "asset": "USDT",                    // Asset type
      "marginBalance": "1877.52214415",   // Account balance
      "equity": "617.77711415",           // Account equity
      "available": "0",                   // Available funds
      "locked": "2898.92389933",          // locked balance for order and position
      "unrealizedPNL": "222.23697000",    // Unrealized profit/loss
   }
  ],
  "greek": [
    {
      "underlying":"BTCUSDT"            // Option Underlying
      "delta": "-0.05"                  // Account delta
      "gamma": "-0.002"                 // Account gamma
      "theta": "-0.05"                  // Account theta
      "vega": "-0.002"                  // Account vega
    }
  ],
  "time": 1592449455993                 // Time
  "riskLevel": "NORMAL",                // Account risk level
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/account](https://developers.binance.com/docs/derivatives/option/account)

## Account Funding Flow (USER_DATA)

### API Description

Query account funding flows.

### HTTP Request

GET `/eapi/v1/bill`

### Request Weight

**1**

### Request Parameters

| Name       | Type   | Mandatory | Description                                                                                 |
| ---------- | ------ | --------- | ------------------------------------------------------------------------------------------- |
| currency   | STRING | YES       | Asset type, only support USDT as of now                                                     |
| recordId   | LONG   | NO        | Return the recordId and subsequent data, the latest data is returned by default, e.g 100000 |
| startTime  | LONG   | NO        | Start Time, e.g 1593511200000                                                               |
| endTime    | LONG   | NO        | End Time, e.g 1593512200000                                                                 |
| limit      | INT    | NO        | Number of result sets returned Default:100 Max:1000                                         |
| recvWindow | LONG   | NO        |                                                                                             |
| timestamp  | LONG   | YES       |                                                                                             |

### Response Example

```json
[
  {
    "id": 1125899906842624000,
    "asset": "USDT", // Asset type
    "amount": "-0.552", // Amount (positive numbers represent inflow, negative numbers represent outflow)
    "type": "FEE", // type (fees)
    "createDate": 1592449456000 // Time
  },
  {
    "id": 1125899906842624000,
    "asset": "USDT", // Asset type
    "amount": "100", // Amount (positive numbers represent inflow, negative numbers represent outflow)
    "type": "CONTRACT", // type (buy/sell contracts)
    "createDate": 1592449456000 // Time
  },
  {
    "id": 1125899906842624000,
    "asset": "USDT", // Asset type
    "amount": "10000", // Amount (positive numbers represent inflow, negative numbers represent outflow)
    "type": "TRANSFER", // type（Funds transfer）
    "createDate": 1592448410000 // Time
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/account/Account-Funding-Flow](https://developers.binance.com/docs/derivatives/option/account/Account-Funding-Flow)

## Funds Transfer(TRADE)

### API Description

Please find details from
[here](https://developers.binance.com/docs/wallet/asset/user-universal-transfer).

> Source:
> [https://developers.binance.com/docs/derivatives/option/account/Funds-Transfer](https://developers.binance.com/docs/derivatives/option/account/Funds-Transfer)

## Get Download Id For Option Transaction History (USER_DATA)

### API Description

Get download id for option transaction history

### HTTP Request

GET `/eapi/v1/income/asyn`

### Request Weight

**5**

**Parameters:**

| Name       | Type | Mandatory | Description     |
| ---------- | ---- | --------- | --------------- |
| startTime  | LONG | YES       | Timestamp in ms |
| endTime    | LONG | YES       | Timestamp in ms |
| recvWindow | LONG | NO        |                 |
| timestamp  | LONG | YES       |                 |

> - Request Limitation is 5 times per month, shared by > front end download page
>   and rest api
> - The time between `startTime` and `endTime` can not be longer than 1 year

### Response Example

```json
{
  "avgCostTimestampOfLast30d": 7241837, // Average time taken for data download in the past 30 days
  "downloadId": "546975389218332672"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/account/Get-Download-Id-For-Option-Transaction-History](https://developers.binance.com/docs/derivatives/option/account/Get-Download-Id-For-Option-Transaction-History)

## Get Option Transaction History Download Link by Id (USER_DATA)

### API Description

Get option transaction history download Link by Id

### HTTP Request

GET `/eapi/v1/income/asyn/id`

### Request Weight

**5**

### Request Parameters

| Name       | Type   | Mandatory | Description            |
| ---------- | ------ | --------- | ---------------------- |
| downloadId | STRING | YES       | get by download id api |
| recvWindow | LONG   | NO        |                        |
| timestamp  | LONG   | YES       |                        |

> - Download link expiration: 24h

### Response Example

```json
{
  "downloadId": "545923594199212032",
  "status": "completed", // Enum：completed，processing
  "url": "www.binance.com", // The link is mapped to download id
  "notified": true, // ignore
  "expirationTimestamp": 1645009771000, // The link would expire after this timestamp
  "isExpired": null
}
```

**OR** (Response when server is processing)

```json
{
	"downloadId":"545923594199212032",
  	"status":"processing",
  	"url":"",
  	"notified":false,
  	"expirationTimestamp":-1
  	"isExpired":null,

}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/account/Get-Option-Transaction-History-Download-Link-by-Id](https://developers.binance.com/docs/derivatives/option/account/Get-Option-Transaction-History-Download-Link-by-Id)

## New Order (TRADE)

### API Description

Send a new order.

### HTTP Request

POST `/eapi/v1/order`

### Request Parameters

| Name             | Type    | Mandatory | Description                                                |
| ---------------- | ------- | --------- | ---------------------------------------------------------- |
| symbol           | STRING  | YES       | Option trading pair, e.g BTC-200730-9000-C                 |
| side             | ENUM    | YES       | Buy/sell direction: SELL, BUY                              |
| type             | ENUM    | YES       | Order Type: LIMIT(only support limit)                      |
| quantity         | DECIMAL | YES       | Order Quantity                                             |
| price            | DECIMAL | NO        | Order Price                                                |
| timeInForce      | ENUM    | NO        | Time in force method（Default GTC）                        |
| reduceOnly       | BOOLEAN | NO        | Reduce Only（Default false）                               |
| postOnly         | BOOLEAN | NO        | Post Only（Default false）                                 |
| newOrderRespType | ENUM    | NO        | "ACK", "RESULT", Default "ACK"                             |
| clientOrderId    | STRING  | NO        | User-defined order ID cannot be repeated in pending orders |
| isMmp            | BOOLEAN | NO        | is market maker protection order, true/false               |
| recvWindow       | LONG    | NO        |                                                            |
| timestamp        | LONG    | YES       |                                                            |

Some parameters are mandatory depending on the order type as follows:

| Type  | Mandatory parameters         |
| ----- | ---------------------------- |
| LIMIT | timeInForce, quantity, price |

### Response Example

> **Response ACK:**

```json
{
  "orderId": 4611875134427365377, // System order number
  "symbol": "BTC-200730-9000-C", // Option trading pair
  "price": "100", // Order Price
  "quantity": "1", // Order Quantity
  "side": "BUY", // Buy/sell direction
  "type": "LIMIT", // Order type
  "createDate": 1592465880683, // Order Time
  "reduceOnly": false,
  "postOnly": false,
  "mmp": false
}
```

> **Response RESULT:**

```json
{
  "orderId": 4611875134427365377,     // System order number
  "symbol": "BTC-200730-9000-C",      // Option trading pair
  "price": "100",                     // Order Price
  "quantity": "1",                    // Order Quantity
  "executedQty": "0",                 // Number of executed quantity
  "fee": "0",                         // Fee
  "side": "BUY",                      // Buy/sell direction
  "type": "LIMIT",                    // Order type
  "timeInForce": "GTC",               // Time in force method
  "reduceOnly": false,                // Order is reduce only Y/N
  "postOnly": false,                  // Order is post only
  "createTime": 1592465880683,        // Order Time
  "updateTime": 1566818724722,        // Update time
  "status": "ACCEPTED",               // Order status
  "avgPrice": "0",                    // Average price of completed trade
  "clientOrderId": ""                 // Client order ID
  "priceScale": 2,
  "quantityScale": 2,
  "optionSide": "CALL",
  "quoteAsset": "USDT",
  "mmp": false
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade](https://developers.binance.com/docs/derivatives/option/trade)

## Place Multiple Orders(TRADE)

### API Description

Send multiple option orders.

### HTTP Request

POST `/eapi/v1/batchOrders`

### Request Weight

**5**

### Request Parameters

| Name       | Type | Mandatory | Description              |
| ---------- | ---- | --------- | ------------------------ |
| orders     | LIST | YES       | order list. Max 5 orders |
| recvWindow | LONG | NO        |                          |
| timestamp  | LONG | YES       |                          |

**Where `orders` is the list of order parameters in JSON:**

- **example:** /eapi/v1/batchOrders?orders=\[{"symbol":"BTC-210115-35000-C",
  "price":"100","quantity":"0.0002","side":"BUY","type":"LIMIT"}\]

| Name                                                                  | Type    | Mandatory | Description                                                |
| --------------------------------------------------------------------- | ------- | --------- | ---------------------------------------------------------- |
| symbol                                                                | STRING  | YES       | Option trading pair, e.g BTC-200730-9000-C                 |
| side                                                                  | ENUM    | YES       | Buy/sell direction: SELL, BUY                              |
| type                                                                  | ENUM    | YES       | Order Type: LIMIT (Only support LIMIT)                     |
| quantity                                                              | DECIMAL | YES       | Order Quantity                                             |
| price                                                                 | DECIMAL | NO        | Order Price                                                |
| timeInForce                                                           | ENUM    | NO        | Time in force method（Default GTC）                        |
| reduceOnly                                                            | BOOLEAN | NO        | Reduce Only（Default false）                               |
| postOnly                                                              | BOOLEAN | NO        | Post Only（Default false）                                 |
| newOrderRespType                                                      | ENUM    | NO        | "ACK", "RESULT", Default "ACK"                             |
| clientOrderId                                                         | STRING  | NO        | User-defined order ID cannot be repeated in pending orders |
| isMmp                                                                 | BOOLEAN | NO        | is market maker protection order, true/false               |
|                                                                       |         |           |                                                            |
| Some parameters are mandatory depending on the order type as follows: |         |           |                                                            |

| Type  | Mandatory parameters         |
| ----- | ---------------------------- |
| LIMIT | timeInForce, quantity, price |

> - Parameter rules are same with New Order
> - Batch orders are processed concurrently, and the order of matching is not
>   guaranteed.

### Response Example

```json
[
  {
    "orderId": 4612288550799409153, // System order number
    "symbol": "ETH-220826-1800-C", // Option trading pair
    "price": "100", // Order Price
    "quantity": "0.01", // Order Quantity
    "side": "BUY", // Buy/sell direction
    "type": "LIMIT", // Order type
    "reduceOnly": false, // Order is reduce only Y/N
    "postOnly": false, // Post only or not
    "clientOrderId": "1001", // Client order ID
    "mmp": false // MMP
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade/Place-Multiple-Orders](https://developers.binance.com/docs/derivatives/option/trade/Place-Multiple-Orders)

## Cancel Option Order (TRADE)

### API Description

Cancel an active order.

### HTTP Request

DELETE `/eapi/v1/order`

**Weight:** **1**

### Request Parameters

| Name          | Type   | Mandatory | Description                                |
| ------------- | ------ | --------- | ------------------------------------------ |
| symbol        | STRING | YES       | Option trading pair, e.g BTC-200730-9000-C |
| orderId       | LONG   | NO        | Order ID, e.g 4611875134427365377          |
| clientOrderId | STRING | NO        | User-defined order ID, e.g 10000           |
| recvWindow    | LONG   | NO        |                                            |
| timestamp     | LONG   | YES       |                                            |

> - At least one instance of `orderId` and `clientOrderId` must be sent.

### Response Example

```json
{
  "orderId": 4611875134427365377, // System order number
  "symbol": "BTC-200730-9000-C", // Option trading pair
  "price": "100", // Order Price
  "quantity": "1", // Order Quantity
  "executedQty": "0", // Number of executed quantity
  "fee": "0", // Fee
  "side": "BUY", // Buy/sell direction
  "type": "LIMIT", // Order type
  "timeInForce": "GTC", // Time in force method
  "reduceOnly": false, // Order is reduce only Y/N
  "postOnly": false,
  "createDate": 1592465880683, // Order Time
  "updateTime": 1566818724722, // Update time
  "status": "ACCEPTED", // Order status
  "avgPrice": "0", // Average price of completed trade
  "source": "API",
  "clientOrderId": "", // Client order ID
  "priceScale": 4,
  "quantityScale": 4,
  "optionSide": "CALL",
  "quoteAsset": "USDT",
  "mmp": false
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade/Cancel-Option-Order](https://developers.binance.com/docs/derivatives/option/trade/Cancel-Option-Order)

## Cancel Multiple Option Orders (TRADE)

### API Description

Cancel multiple orders.

### HTTP Request

DELETE `/eapi/v1/batchOrders`

### Request Weight

**1**

### Request Parameters

| Name           | Type         | Mandatory | Description                                               |
| -------------- | ------------ | --------- | --------------------------------------------------------- |
| symbol         | STRING       | YES       | Option trading pair, e.g BTC-200730-9000-C                |
| orderIds       | LIST<LONG>   | NO        | Order ID, e.g \[4611875134427365377,4611875134427365378\] |
| clientOrderIds | LIST<STRING> | NO        | User-defined order ID, e.g \["my_id_1","my_id_2"\]        |
| recvWindow     | LONG         | NO        |                                                           |
| timestamp      | LONG         | YES       |                                                           |

> - At least one instance of `orderId` and `clientOrderId` must be sent.

### Response Example

```json
[
  {
    "orderId": 4611875134427365377,     // System order number
    "symbol": "BTC-200730-9000-C",      // Option trading pair
    "price": "100",                     // Order Price
    "quantity": "1",                    // Order Quantity
    "executedQty": "0",                 // Number of completed quantity
    "fee": 0,                           // Fee
    "side": "BUY",                      // Buy/sell direction
    "type": "LIMIT",                    // Order type
    "timeInForce": "GTC",               // Time in force method
    "createTime": 1592465880683,        // Order Time
    "status": "ACCEPTED",               // Order status
    "avgPrice": "0",                    // Average price of completed trade
    "reduceOnly": false,                // Order is reduce only Y/N
    "clientOrderId": ""                 // Client order ID
    "updateTime": 1566818724722,        // Update time
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade/Cancel-Multiple-Option-Orders](https://developers.binance.com/docs/derivatives/option/trade/Cancel-Multiple-Option-Orders)

## Cancel All Option Orders By Underlying (TRADE)

### API Description

Cancel all active orders on specified underlying.

### HTTP Request

DELETE `/eapi/v1/allOpenOrdersByUnderlying`

### Request Weight

**1**

### Request Parameters

| Name       | Type   | Mandatory | Description                    |
| ---------- | ------ | --------- | ------------------------------ |
| underlying | STRING | YES       | Option underlying, e.g BTCUSDT |
| recvWindow | LONG   | NO        |                                |
| timestamp  | LONG   | YES       |                                |

### Response Example

```json
{
  "code": 0,
  "msg": "success",
  "data": 0
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade/Cancel-All-Option-Orders-By-Underlying](https://developers.binance.com/docs/derivatives/option/trade/Cancel-All-Option-Orders-By-Underlying)

## Cancel all Option orders on specific symbol (TRADE)

### API Description

Cancel all active order on a symbol.

### HTTP Request

DELETE `/eapi/v1/allOpenOrders`

### Request Weight

**1**

### Request Parameters

| Name       | Type   | Mandatory | Description                                |
| ---------- | ------ | --------- | ------------------------------------------ |
| symbol     | STRING | YES       | Option trading pair, e.g BTC-200730-9000-C |
| recvWindow | LONG   | NO        |                                            |
| timestamp  | LONG   | YES       |                                            |

### Response Example

```json
{
  "code": 0,
  "msg": "success"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade/Cancel-all-Option-orders-on-specific-symbol](https://developers.binance.com/docs/derivatives/option/trade/Cancel-all-Option-orders-on-specific-symbol)

## Query Single Order (TRADE)

### API Description

Check an order status.

- These orders will not be found:
  - order status is `CANCELED` or `REJECTED`, **AND**
  - order has NO filled trade, **AND**
  - created time + 3 days < current time

### HTTP Request

GET `/eapi/v1/order`

### Request Weight

**1**

### Request Parameters

| Name          | Type   | Mandatory | Description                                                |
| ------------- | ------ | --------- | ---------------------------------------------------------- |
| symbol        | STRING | YES       | Option trading pair, e.g BTC-200730-9000-C                 |
| orderId       | LONG   | NO        | Order id                                                   |
| clientOrderId | STRING | NO        | User-defined order ID cannot be repeated in pending orders |
| recvWindow    | LONG   | NO        |                                                            |
| timestamp     | LONG   | YES       |                                                            |

> - Either `orderId` or `clientOrderId` must be sent.

### Response Example

```json
{
  "orderId": 4611875134427365377,     // System order id
  "symbol": "BTC-200730-9000-C",      // Option trading pair
  "price": "100",                     // Order Price
  "quantity": "1",                    // Order Quantity
  "executedQty": "0",                 // Number of executed quantity
  "fee": "0",                         // Fee
  "side": "BUY",                      // Buy/sell direction
  "type": "LIMIT",                    // Order type
  "timeInForce": "GTC",               // Time in force method
  "reduceOnly": false,                // Order is reduce only Y/N
  "postOnly": false,                  // Order is post only
  "createTime": 1592465880683,        // Order Time
  "updateTime": 1566818724722,        // Update time
  "status": "ACCEPTED",               // Order status
  "avgPrice": "0",                    // Average price of completed trade
  "source": "API",                    // Order source
  "clientOrderId": ""                 // Client order ID
  "priceScale": 2,
  "quantityScale": 2,
  "optionSide": "CALL",
  "quoteAsset": "USDT",
  "mmp": false
}
```

> **No Order Response:**

```json
{
  "code": -2013,
  "msg": "Order does not exist"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade/Query-Single-Order](https://developers.binance.com/docs/derivatives/option/trade/Query-Single-Order)

## Query Option Order History (TRADE)

### API Description

Query all finished orders within 5 days, finished status: CANCELLED FILLED
REJECTED.

### HTTP Request

GET `/eapi/v1/historyOrders`

### Request Weight

**3**

### Request Parameters

| Name       | Type   | Mandatory | Description                                                                             |
| ---------- | ------ | --------- | --------------------------------------------------------------------------------------- |
| symbol     | STRING | YES       | Option trading pair                                                                     |
| orderId    | LONG   | NO        | Returns the orderId and subsequent orders, the most recent order is returned by default |
| startTime  | LONG   | NO        | Start Time, e.g 1593511200000                                                           |
| endTime    | LONG   | NO        | End Time, e.g 1593512200000                                                             |
| limit      | INT    | NO        | Number of result sets returned Default:100 Max:1000                                     |
| recvWindow | LONG   | NO        |                                                                                         |
| timestamp  | LONG   | YES       |                                                                                         |

### Response Example

```json
[
  {
    "orderId": 4611922413427359795,
    "symbol": "BTC-220715-2000-C",
    "price": "18000.00000000",
    "quantity": "-0.50000000",
    "executedQty": "-0.50000000",
    "fee": "3.00000000",
    "side": "SELL",
    "type": "LIMIT",
    "timeInForce": "GTC",
    "reduceOnly": false,
    "postOnly": false,
    "createTime": 1657867694244,
    "updateTime": 1657867888216,
    "status": "FILLED",
    "reason": "0",
    "avgPrice": "18000.00000000",
    "source": "API",
    "clientOrderId": "",
    "priceScale": 2,
    "quantityScale": 2,
    "optionSide": "CALL",
    "quoteAsset": "USDT",
    "mmp": false
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade/Query-Option-Order-History](https://developers.binance.com/docs/derivatives/option/trade/Query-Option-Order-History)

## Query Current Open Option Orders (USER_DATA)

### API Description

Query current all open orders, status: ACCEPTED PARTIALLY_FILLED

### HTTP Request

GET `/eapi/v1/openOrders`

### Request Weight

**1** for a single symbol; **40** when the symbol parameter is omitted

### Request Parameters

| Name       | Type   | Mandatory | Description                                                                             |
| ---------- | ------ | --------- | --------------------------------------------------------------------------------------- |
| symbol     | STRING | NO        | return all orders if don't pass, Option trading pair, e.g BTC-200730-9000-C,            |
| orderId    | LONG   | NO        | Returns the orderId and subsequent orders, the most recent order is returned by default |
| startTime  | LONG   | NO        | Start Time                                                                              |
| endTime    | LONG   | NO        | End Time                                                                                |
| limit      | INT    | NO        | Number of result sets returned Default:100 Max:1000                                     |
| recvWindow | LONG   | NO        |                                                                                         |
| timestamp  | LONG   | YES       |                                                                                         |

### Response Example

```json
[
  {
    "orderId": 4611875134427365377,     // System order number
    "symbol": "BTC-200730-9000-C",      // Option trading pair
    "price": "100",                     // Order Price
    "quantity": "1",                    // Order Quantity
    "executedQty": "0",                 // Number of completed trades
    "fee": "0",                         // Fee
    "side": "BUY",                      // Buy/sell direction
    "type": "LIMIT",                    // Order type
    "timeInForce": "GTC",               // Time in force method
    "reduceOnly": false,                // Order is reduce only Y/N
    "postOnly": false,
    "createTime": 1592465880683,        // Order Time
    "updateTime": 1592465880683,        // Update Time
    "status": "ACCEPTED",               // Order status
    "avgPrice": "0",                    // Average price of completed trade
    "clientOrderId": ""                 // Client order ID
    "priceScale": 2,
    "quantityScale": 2,
    "optionSide": "CALL",
    "quoteAsset": "USDT",
    "mmp": false
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade/Query-Current-Open-Option-Orders](https://developers.binance.com/docs/derivatives/option/trade/Query-Current-Open-Option-Orders)

## Option Position Information (USER_DATA)

### API Description

Get current position information.

### HTTP Request

GET `/eapi/v1/position`

### Request Weight

**5**

### Request Parameters

| Name       | Type   | Mandatory | Description                                |
| ---------- | ------ | --------- | ------------------------------------------ |
| symbol     | STRING | NO        | Option trading pair, e.g BTC-200730-9000-C |
| recvWindow | LONG   | NO        |                                            |
| timestamp  | LONG   | YES       |                                            |

### Response Example

```json
[
  {
    "entryPrice": "1000",               // Average entry price
    "symbol": "BTC-200730-9000-C",      // Option trading pair
    "side": "SHORT",                    // Position direction
    "quantity": "-0.1",                 // Number of positions (positive numbers represent long positions, negative number represent short positions)
    "reducibleQty": "0",                // Number of positions that can be reduced
    "markValue": "105.00138",           // Current market value
    "ror": "-0.05",                     // Rate of return
    "unrealizedPNL": "-5.00138",        // Unrealized profit/loss
    "markPrice": "1050.0138",           // Mark price
    "strikePrice": "9000",              // Strike price
    "positionCost": "1000.0000",        // Position cost
    "expiryDate": 1593511200000         // Exercise time
    "priceScale": 2,
    "quantityScale": 2,
    "optionSide": "CALL",
    "quoteAsset": "USDT"
   }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade/Option-Position-Information](https://developers.binance.com/docs/derivatives/option/trade/Option-Position-Information)

## User Exercise Record (USER_DATA)

### API Description

Get account exercise records.

### HTTP Request

GET `/eapi/v1/exerciseRecord`

### Request Weight

**5**

### Request Parameters

| Name       | Type   | Mandatory | Description                                |
| ---------- | ------ | --------- | ------------------------------------------ |
| symbol     | STRING | NO        | Option trading pair, e.g BTC-200730-9000-C |
| startTime  | LONG   | NO        | startTime                                  |
| endTime    | LONG   | NO        | endTime                                    |
| limit      | INT    | NO        | default 1000, max 1000                     |
| recvWindow | LONG   | NO        |                                            |
| timestamp  | LONG   | YES       |                                            |

### Response Example

```json
[
  {
    "id": "1125899906842624042",
    "currency": "USDT",
    "symbol": "BTC-220721-25000-C",
    "exercisePrice": "25000.00000000",
    "markPrice": "25000.00000000",
    "quantity": "1.00000000",
    "amount": "0.00000000",
    "fee": "0.00000000",
    "createDate": 1658361600000,
    "priceScale": 2,
    "quantityScale": 2,
    "optionSide": "CALL",
    "positionSide": "LONG",
    "quoteAsset": "USDT"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade/User-Exercise-Record](https://developers.binance.com/docs/derivatives/option/trade/User-Exercise-Record)

## Account Trade List (USER_DATA)

### API Description

Get trades for a specific account and symbol.

### HTTP Request

`GET /eapi/v1/userTrades (HMAC SHA256)`

### Request Weight

**5**

### Request Parameters

| Name       | Type   | Mandatory | Description                                                                      |
| ---------- | ------ | --------- | -------------------------------------------------------------------------------- |
| symbol     | STRING | NO        | Option symbol, e.g BTC-200730-9000-C                                             |
| fromId     | LONG   | NO        | Trade id to fetch from. Default gets most recent trades, e.g 4611875134427365376 |
| startTime  | LONG   | NO        | Start time, e.g 1593511200000                                                    |
| endTime    | LONG   | NO        | End time, e.g 1593512200000                                                      |
| limit      | INT    | NO        | Default 100; max 1000                                                            |
| recvWindow | LONG   | NO        |                                                                                  |
| timestamp  | LONG   | YES       |                                                                                  |

### Response Example

```json
[
  {
    "id": 4611875134427365377,          // unique id
    "tradeId": 239,                     // trade id
    "orderId": 4611875134427365377,     // order id
    "symbol": "BTC-200730-9000-C",      // option symbol
    "price": "100",                     // trade price
    "quantity": "1",                    // trade quantity
    "fee": "0",                         // fee
    "realizedProfit": "0.00000000",     // realized profit/loss
    "side": "BUY",                      // order side
    "type": "LIMIT",                    // order type
    "volatility": "0.9",                // volatility
    "liquidity": "TAKER",               // TAKER or MAKER     
    "quoteAsset": "USDT",               // quote asset
    "time": 1592465880683               // trade time
    "priceScale": 2,
    "quantityScale": 2,
    "optionSide": "CALL",
    "quoteAsset": "USDT"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade/Account-Trade-List](https://developers.binance.com/docs/derivatives/option/trade/Account-Trade-List)

## Get Market Maker Protection Config (TRADE)

### API Description

Get config for MMP.

### HTTP Request

GET `/eapi/v1/mmp (HMAC SHA256)`

### Request Weight

**1**

### Request Parameters

| Name       | Type   | Mandatory | Description             |
| ---------- | ------ | --------- | ----------------------- |
| underlying | STRING | TRUE      | underlying, e.g BTCUSDT |
| recvWindow | LONG   | NO        |                         |
| timestamp  | LONG   | YES       |                         |

### Response Example

```json
{
  "underlyingId": 2,
  "underlying": "BTCUSDT",
  "windowTimeInMilliseconds": 3000,
  "frozenTimeInMilliseconds": 300000,
  "qtyLimit": "2",
  "deltaLimit": "2.3",
  "lastTriggerTime": 0
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-maker-endpoints](https://developers.binance.com/docs/derivatives/option/market-maker-endpoints)

## Get Market Maker Protection Config (TRADE)

### API Description

Get config for MMP.

### HTTP Request

GET `/eapi/v1/mmp (HMAC SHA256)`

### Request Weight

**1**

### Request Parameters

| Name       | Type   | Mandatory | Description             |
| ---------- | ------ | --------- | ----------------------- |
| underlying | STRING | TRUE      | underlying, e.g BTCUSDT |
| recvWindow | LONG   | NO        |                         |
| timestamp  | LONG   | YES       |                         |

### Response Example

```json
{
  "underlyingId": 2,
  "underlying": "BTCUSDT",
  "windowTimeInMilliseconds": 3000,
  "frozenTimeInMilliseconds": 300000,
  "qtyLimit": "2",
  "deltaLimit": "2.3",
  "lastTriggerTime": 0
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-maker-endpoints/Get-Market-Maker-Protection-Config](https://developers.binance.com/docs/derivatives/option/market-maker-endpoints/Get-Market-Maker-Protection-Config)

## Get Auto-Cancel All Open Orders (Kill-Switch) Config (TRADE)

### API Description

This endpoint returns the auto-cancel parameters for each underlying symbol.
Note only active auto-cancel parameters will be returned, if countdownTime is
set to 0 (ie. countdownTime has been turned off), the underlying symbol and
corresponding countdownTime parameter will not be returned in the response.

### HTTP Request

GET `/eapi/v1/countdownCancelAll` 

### Request Weight

1

### Request Parameters

| Name       | Type   | Mandatory | Description                    |
| ---------- | ------ | --------- | ------------------------------ |
| underlying | STRING | NO        | Option underlying, e.g BTCUSDT |
| recvWindow | LONG   | NO        |                                |
| timestamp  | LONG   | YES       |                                |

> - countdownTime = 0 means the function is disabled.

### Response Example

```json
{
  "underlying": "ETHUSDT",
  "countdownTime": 100000
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-maker-endpoints/Get-Auto-Cancel-All-Open-Orders-Config](https://developers.binance.com/docs/derivatives/option/market-maker-endpoints/Get-Auto-Cancel-All-Open-Orders-Config)

## Set Market Maker Protection Config (TRADE)

### API Description

Set config for MMP. Market Maker Protection(MMP) is a set of protection
mechanism for option market maker, this mechanism is able to prevent mass
trading in short period time. Once market maker's account branches the
threshold, the Market Maker Protection will be triggered. When Market Maker
Protection triggers, all the current MMP orders will be canceled, new MMP orders
will be rejected. Market maker can use this time to reevaluate market and modify
order price.

### HTTP Request

POST `/eapi/v1/mmpSet`

### Request Weight

**1**

### Request Parameters

| Name                     | Type    | Mandatory | Description                                                           |
| ------------------------ | ------- | --------- | --------------------------------------------------------------------- |
| underlying               | STRING  | TRUE      | underlying, e.g BTCUSDT                                               |
| windowTimeInMilliseconds | LONG    | TRUE      | MMP Interval in milliseconds; Range (0,5000\]                         |
| frozenTimeInMilliseconds | LONG    | TRUE      | MMP frozen time in milliseconds, if set to 0 manual reset is required |
| qtyLimit                 | DECIMAL | TRUE      | quantity limit                                                        |
| deltaLimit               | DECIMAL | TRUE      | net delta limit                                                       |
| recvWindow               | LONG    | NO        |                                                                       |
| timestamp                | LONG    | YES       |                                                                       |

### Response Example

```json
{
  "underlyingId": 2,
  "underlying": "BTCUSDT",
  "windowTimeInMilliseconds": 3000,
  "frozenTimeInMilliseconds": 300000,
  "qtyLimit": "2",
  "deltaLimit": "2.3",
  "lastTriggerTime": 0
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-maker-endpoints/Set-Market-Maker-Protection-Config](https://developers.binance.com/docs/derivatives/option/market-maker-endpoints/Set-Market-Maker-Protection-Config)

## Auto-Cancel All Open Orders (Kill-Switch) Heartbeat (TRADE)

### API Description

This endpoint resets the time from which the countdown will begin to the time
this messaged is received. It should be called repeatedly as heartbeats.
Multiple heartbeats can be updated at once by specifying the underlying symbols
as a list (ex. BTCUSDT,ETHUSDT) in the underlyings parameter.

### HTTP Request

POST `/eapi/v1/countdownCancelAllHeartBeat`

### Request Weight

10

### Request Parameters

| Name        | Type   | Mandatory | Description                                    |
| ----------- | ------ | --------- | ---------------------------------------------- |
| underlyings | STRING | YES       | Option Underlying Symbols, e.g BTCUSDT,ETHUSDT |
| recvWindow  | LONG   | NO        |                                                |
| timestamp   | LONG   | YES       |                                                |

> - The response will only include underlying symbols where the heartbeat has
>   been successfully updated.

### Response Example

```json
{
  "underlyings": ["BTCUSDT", "ETHUSDT"]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-maker-endpoints/Auto-Cancel-All-Open-Orders-Heartbeat](https://developers.binance.com/docs/derivatives/option/market-maker-endpoints/Auto-Cancel-All-Open-Orders-Heartbeat)

## Reset Market Maker Protection Config (TRADE)

### API Description

Reset MMP, start MMP order again.

### HTTP Request

POST `/eapi/v1/mmpReset`

### Request Weight

**1**

### Request Parameters

| Name       | Type   | Mandatory | Description             |
| ---------- | ------ | --------- | ----------------------- |
| underlying | STRING | TRUE      | underlying, e.g BTCUSDT |
| recvWindow | LONG   | NO        |                         |
| timestamp  | LONG   | YES       |                         |

### Response Example

```json
{
  "underlyingId": 2,
  "underlying": "BTCUSDT",
  "windowTimeInMilliseconds": 3000,
  "frozenTimeInMilliseconds": 300000,
  "qtyLimit": "2",
  "deltaLimit": "2.3",
  "lastTriggerTime": 0
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-maker-endpoints/Reset-Market-Maker-Protection-Config](https://developers.binance.com/docs/derivatives/option/market-maker-endpoints/Reset-Market-Maker-Protection-Config)

## Set Auto-Cancel All Open Orders (Kill-Switch) Config (TRADE)

### API Description

This endpoint sets the parameters of the auto-cancel feature which cancels all
open orders (both market maker protection and non market maker protection order
types) of the underlying symbol at the end of the specified countdown time
period if no heartbeat message is sent. After the countdown time period, all
open orders will be cancelled and new orders will be rejected with error code
-2010 until either a heartbeat message is sent or the auto-cancel feature is
turned off by setting countdownTime to 0.

### HTTP Request

POST `/eapi/v1/countdownCancelAll`

### Request Weight

**1**

### Request Parameters

| Name          | Type   | Mandatory | Description                                                                                                                                                        |
| ------------- | ------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| underlying    | STRING | YES       | Option underlying, e.g BTCUSDT                                                                                                                                     |
| countdownTime | LONG   | YES       | Countdown time in milliseconds (ex. 1,000 for 1 second). 0 to disable the timer. Negative values (ex. -10000) are not accepted. Minimum acceptable value is 5,000  |
| recvWindow    | LONG   | NO        |                                                                                                                                                                    |
| timestamp     | LONG   | YES       |                                                                                                                                                                    |

> - This rest endpoint sets up the parameters to cancel your open orders in case
>   of an outage or disconnection.
> - Example usage: Call this endpoint with a countdownTime value of 10000 (10
>   seconds) to turn on the auto-cancel feature. If the corresponding
>   countdownCancelAllHeartBeat endpoint is not called within 10 seconds with
>   the specified underlying symbol, all open orders of the specified symbol
>   will be automatically canceled. If this endpoint is called with an
>   countdownTime of 0, the countdown timer will be stopped.
> - The system will check all countdowns approximately every 1000 milliseconds,
>   **please note that sufficient redundancy should be considered when using
>   this function**. We do not recommend setting the countdown time to be too
>   precise or too small.

### Response Example

```json
{
  "underlying": "ETHUSDT",
  "countdownTime": 30000
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-maker-endpoints/Set-Auto-Cancel-All-Open-Orders-Config](https://developers.binance.com/docs/derivatives/option/market-maker-endpoints/Set-Auto-Cancel-All-Open-Orders-Config)

## New Block Trade Order (TRADE)

### API Description

Send in a new block trade order.

### HTTP Request

POST `eapi/v1/block/order/create`

### Request Weight

**5**

### Request Parameters

| Name       | Type    | Mandatory | Description                                                                                                                                                                                                       |
| ---------- | ------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| liquidity  | STRING  | YES       | Taker or Maker                                                                                                                                                                                                    |
| legs       | LIST    | YES       | Max 1 (only single leg supported), list of legs parameters in JSON; example: eapi/v1/block/order/create?orders=\[{"symbol":"BTC-210115-35000-C", "price":"100","quantity":"0.0002","side":"BUY","type":"LIMIT"}\] |
| symbol     | STRING  | YES       | Option trading pair, e.g BTC-200730-9000-C                                                                                                                                                                        |
| side       | ENUM    | YES       | BUY or SELL                                                                                                                                                                                                       |
| price      | DECIMAL | YES       | Order Price                                                                                                                                                                                                       |
| quantity   | DECIMAL | YES       | Order Quantity                                                                                                                                                                                                    |
| recvWindow | INT     | NO        | The value cannot be greater than 60000                                                                                                                                                                            |
| timestamp  | INT     | YES       |                                                                                                                                                                                                                   |

### Response Example

```json
{
  "blockTradeSettlementKey": "3668822b8-1baa-6a2f-adb8-d3de6289b361",
  "expireTime": 1730171888109,
  "liquidity": "TAKER",
  "status": "RECEIVED",
  "legs": [
    {
      "symbol": "BNB-241101-700-C",
      "side": "BUY",
      "quantity": "1.2",
      "price": "2.8"
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-maker-block-trade](https://developers.binance.com/docs/derivatives/option/market-maker-block-trade)

## Cancel Block Trade Order (TRADE)

### API Description

Cancel a block trade order.

### HTTP Request

DELETE `eapi/v1/block/order/create`

### Request Weight

**5**

### Request Parameters

| Name                  | Type   | Mandatory |  Description                           |
| --------------------- | ------ | --------- | -------------------------------------- |
| blockOrderMatchingKey | STRING | YES       |                                        |
| recvWindow            | INT    | NO        | The value cannot be greater than 60000 |
| timestamp             | INT    | YES       |                                        |

### Response Example

```json
{}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-maker-block-trade/Cancel-Block-Trade-Order](https://developers.binance.com/docs/derivatives/option/market-maker-block-trade/Cancel-Block-Trade-Order)

## Extend Block Trade Order (TRADE)

### API Description

Extends a block trade expire time by 30 mins from the current time.

### HTTP Request

PUT `/eapi/v1/block/order/create` 

### Request Weight

**5**

### Request Parameters

| Name                  | Type   | Mandatory |  Description                           |
| --------------------- | ------ | --------- | -------------------------------------- |
| blockOrderMatchingKey | STRING | YES       |                                        |
| recvWindow            | INT    | NO        | The value cannot be greater than 60000 |
| timestamp             | INT    | YES       |                                        |

### Response Example

```json
{
  "blockTradeSettlementKey": "3668822b8-1baa-6a2f-adb8-d3de6289b361",
  "expireTime": 1730172007000,
  "liquidity": "TAKER",
  "status": "RECEIVED",
  "createTime": 1730170088111,
  "legs": [
    {
      "symbol": "BNB-241101-700-C",
      "side": "BUY",
      "quantity": "1.2",
      "price": "2.8"
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-maker-block-trade/Extend-Block-Trade-Order](https://developers.binance.com/docs/derivatives/option/market-maker-block-trade/Extend-Block-Trade-Order)

## Query Block Trade Order (TRADE)

### API Description

Check block trade order status.

### HTTP Request

GET `/eapi/v1/block/order/orders`

### Request Weight

**5**

### Request Parameters

| Name                  | Type   | Mandatory |  Description                                                                             |
| --------------------- | ------ | --------- | ---------------------------------------------------------------------------------------- |
| blockOrderMatchingKey | STRING | NO        | If specified, returns the specific block trade associated with the blockOrderMatchingKey |
| endTime               | LONG   | NO        |                                                                                          |
| startTime             | LONG   | NO        |                                                                                          |
| underlying            | STRING | NO        |                                                                                          |
| recvWindow            | LONG   | NO        | The value cannot be greater than 60000                                                   |
| timestamp             | LONG   | YES       |                                                                                          |

### Response Example

```json
[
  {
    "blockTradeSettlementKey": "7d046e6e-a429-4335-ab9d-6a681febcde5",
    "expireTime": 1730172115801,
    "liquidity": "TAKER",
    "status": "RECEIVED",
    "createTime": 1730170315803,
    "legs": [
      {
        "symbol": "BNB-241101-700-C",
        "side": "BUY",
        "quantity": "1.2",
        "price": "2.8"
      }
    ]
  },
  {
    "blockTradeSettlementKey": "28b96c28-ba05-6906-a47c-703215cfbfe6",
    "expireTime": 1730171860460,
    "liquidity": "TAKER",
    "status": "RECEIVED",
    "createTime": 1730170060462,
    "legs": [
      {
        "symbol": "BNB-241101-700-C",
        "side": "BUY",
        "quantity": "1.66",
        "price": "20"
      }
    ]
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-maker-block-trade/Query-Block-Trade-Order](https://developers.binance.com/docs/derivatives/option/market-maker-block-trade/Query-Block-Trade-Order)

## Accept Block Trade Order (TRADE)

### API Description

Accept a block trade order

### HTTP Request

POST `/eapi/v1/block/order/execute`

### Request Weight

**5**

### Request Parameters

| Name                  | Type   | Mandatory |  Description                           |
| --------------------- | ------ | --------- | -------------------------------------- |
| blockOrderMatchingKey | STRING | YES       |                                        |
| recvWindow            | LONG   | NO        | The value cannot be greater than 60000 |
| timestamp             | LONG   | YES       |                                        |

### Response Example

```json
{
  "blockTradeSettlementKey": "7d046e6e-a429-4335-ab9d-6a681febcde5",
  "expireTime": 1730172115801,
  "liquidity": "MAKER",
  "status": "ACCEPTED",
  "createTime": 1730170315803,
  "legs": [
    {
      "symbol": "BNB-241101-700-C",
      "side": "SELL",
      "quantity": "1.2",
      "price": "2.8"
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-maker-block-trade/Accept-Block-Trade-Order](https://developers.binance.com/docs/derivatives/option/market-maker-block-trade/Accept-Block-Trade-Order)

## Query Block Trade Details (USER_DATA)

### API Description

Query block trade details; returns block trade details from counterparty's
perspective.

### HTTP Request

GET `/eapi/v1/block/order/execute`

### Request Weight

**5**

### Request Parameters

| Name                  | Type   | Mandatory |  Description                           |
| --------------------- | ------ | --------- | -------------------------------------- |
| blockOrderMatchingKey | STRING | YES       |                                        |
| recvWindow            | LONG   | NO        | The value cannot be greater than 60000 |
| timestamp             | LONG   | YES       |                                        |

### Response Example

```json
{
  "blockTradeSettlementKey": "12b96c28-ba05-8906-c89t-703215cfb2e6",
  "expireTime": 1730171860460,
  "liquidity": "MAKER",
  "status": "RECEIVED",
  "createTime": 1730170060462,
  "legs": [
    {
      "symbol": "BNB-241101-700-C",
      "side": "SELL",
      "quantity": "1.66",
      "price": "20"
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-maker-block-trade/Query-Block-Trade-Detail](https://developers.binance.com/docs/derivatives/option/market-maker-block-trade/Query-Block-Trade-Detail)

## Account Block Trade List (USER_DATA)

### API Description

Gets block trades for a specific account.

### HTTP Request

GET `/eapi/v1/block/user-trades`

### Request Weight

**5**

### Request Parameters

| Name       | Type   | Mandatory |  Description                           |
| ---------- | ------ | --------- | -------------------------------------- |
| endTime    | LONG   | NO        |                                        |
| startTime  | LONG   | NO        |                                        |
| underlying | STRING | NO        |                                        |
| recvWindow | LONG   | NO        | The value cannot be greater than 60000 |
| timestamp  | LONG   | YES       |                                        |

### Response Example

```json
[
  {
    "parentOrderId": "4675011431944499201",
    "crossType": "USER_BLOCK",
    "legs": [
      {
        "createTime": 1730170445600,
        "updateTime": 1730170445600,
        "symbol": "BNB-241101-700-C",
        "orderId": "4675011431944499203",
        "orderPrice": 2.8,
        "orderQuantity": 1.2,
        "orderStatus": "FILLED",
        "executedQty": 1.2,
        "executedAmount": 3.36,
        "fee": 0.336,
        "orderType": "PREV_QUOTED",
        "orderSide": "BUY",
        "id": "1125899906900937837",
        "tradeId": 1,
        "tradePrice": 2.8,
        "tradeQty": 1.2,
        "tradeTime": 1730170445600,
        "liquidity": "TAKER",
        "commission": 0.336
      }
    ],
    "blockTradeSettlementKey": "7d085e6e-a229-2335-ab9d-6a581febcd25"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-maker-block-trade/Account-Block-Trade-List](https://developers.binance.com/docs/derivatives/option/market-maker-block-trade/Account-Block-Trade-List)
