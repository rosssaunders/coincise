# Binance Options Public REST API Documentation

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

## Check Server Time

### API Description

Test connectivity to the Rest API and get the current server time.

### HTTP Request

GET `/eapi/v1/time`

### Request Weight

**1**

### Request Parameters

NONE

### Response Example

```json
{
  "serverTime": 1499827319559
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data](https://developers.binance.com/docs/derivatives/option/market-data)

## 24hr Ticker Price Change Statistics

### API Description

24 hour rolling window price change statistics.

### HTTP Request

GET `/eapi/v1/ticker`

### Request Weight

**5**

### Request Parameters

| Name   | Type   | Mandatory | Description                                |
| ------ | ------ | --------- | ------------------------------------------ |
| symbol | STRING | NO        | Option trading pair, e.g BTC-200730-9000-C |

### Response Example

```json
[
  {
    "symbol": "BTC-200730-9000-C",
    "priceChange": "-16.2038", //24-hour price change
    "priceChangePercent": "-0.0162", //24-hour percent price change
    "lastPrice": "1000", //Last trade price
    "lastQty": "1000", //Last trade amount
    "open": "1016.2038", //24-hour open price
    "high": "1016.2038", //24-hour high
    "low": "0", //24-hour low
    "volume": "5", //Trading volume(contracts)
    "amount": "1", //Trade amount(in quote asset)
    "bidPrice": "999.34", //The best buy price
    "askPrice": "1000.23", //The best sell price
    "openTime": 1592317127349, //Time the first trade occurred within the last 24 hours
    "closeTime": 1592380593516, //Time the last trade occurred within the last 24 hours
    "firstTradeId": 1, //First trade ID
    "tradeCount": 5, //Number of trades
    "strikePrice": "9000", //Strike price
    "exercisePrice": "3000.3356" //return estimated settlement price one hour before exercise, return index price at other times
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data/24hr-Ticker-Price-Change-Statistics](https://developers.binance.com/docs/derivatives/option/market-data/24hr-Ticker-Price-Change-Statistics)

## Exchange Information

### API Description

Current exchange trading rules and symbol information

### HTTP Request

GET `/eapi/v1/exchangeInfo`

### Request Weight

**1**

### Request Parameters

NONE

### Response Example

```json
{
  "timezone": "UTC", // Time zone used by the server
  "serverTime": 1592387337630, // Current system time
  "optionContracts": [
    // Option contract underlying asset info
    {
      "baseAsset": "BTC", // Base currency
      "quoteAsset": "USDT", // Quotation asset
      "underlying": "BTCUSDT", // Name of the underlying asset of the option contract
      "settleAsset": "USDT" // Settlement currency
    }
  ],
  "optionAssets": [
    // Option asset info
    {
      "name": "USDT" // Asset name
    }
  ],
  "optionSymbols": [
    // Option trading pair info
    {
      "expiryDate": 1660521600000, // expiry time
      "filters": [
        {
          "filterType": "PRICE_FILTER",
          "minPrice": "0.02",
          "maxPrice": "80000.01",
          "tickSize": "0.01"
        },
        {
          "filterType": "LOT_SIZE",
          "minQty": "0.01",
          "maxQty": "100",
          "stepSize": "0.01"
        }
      ],
      "symbol": "BTC-220815-50000-C", // Trading pair name
      "side": "CALL", // Direction: CALL long, PUT short
      "strikePrice": "50000", // Strike price
      "underlying": "BTCUSDT", // Underlying asset of the contract
      "unit": 1, // Contract unit, the quantity of the underlying asset represented by a single contract.
      "makerFeeRate": "0.0002", // maker commission rate
      "takerFeeRate": "0.0002", // taker commission rate
      "liquidationFeeRate": "0.0019000", // liquidation fee rate
      "minQty": "0.01", // Minimum order quantity
      "maxQty": "100", // Maximum order quantity
      "initialMargin": "0.15", // Initial Magin Ratio
      "maintenanceMargin": "0.075", // Maintenance Margin Ratio
      "minInitialMargin": "0.1", // Min Initial Margin Ratio
      "minMaintenanceMargin": "0.05", // Min Maintenance Margin Ratio
      "priceScale": 2, // price precision
      "quantityScale": 2, // quantity precision
      "quoteAsset": "USDT" // Quotation asset
    }
  ],
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 2400
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 1200
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 10,
      "limit": 300
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data/Exchange-Information](https://developers.binance.com/docs/derivatives/option/market-data/Exchange-Information)

## Historical Exercise Records

### API Description

Get historical exercise records.

- REALISTIC_VALUE_STRICKEN -> Exercised
- EXTRINSIC_VALUE_EXPIRED -> Expired OTM

### HTTP Request

GET `/eapi/v1/exerciseHistory`

### Request Weight

**3**

### Request Parameters

| Name       | Type   | Mandatory | Description                           |
| ---------- | ------ | --------- | ------------------------------------- |
| underlying | STRING | NO        | Underlying index like BTCUSDT         |
| startTime  | LONG   | NO        | Start Time                            |
| endTime    | LONG   | NO        | End Time                              |
| limit      | INT    | NO        | Number of records Default:100 Max:100 |

### Response Example

```json
[
  {
    "symbol": "BTC-220121-60000-P", // symbol
    "strikePrice": "60000", // strike price
    "realStrikePrice": "38844.69652571", // real strike price
    "expiryDate": 1642752000000, // Exercise time
    "strikeResult": "REALISTIC_VALUE_STRICKEN" // strike result
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data/Historical-Exercise-Records](https://developers.binance.com/docs/derivatives/option/market-data/Historical-Exercise-Records)

## Open Interest

### API Description

Get open interest for specific underlying asset on specific expiration date.

### HTTP Request

GET `/eapi/v1/openInterest`

### Request Weight

**0**

### Request Parameters

| Name            | Type   | Mandatory | Description                   |
| --------------- | ------ | --------- | ----------------------------- |
| underlyingAsset | STRING | YES       | underlying asset, e.g ETH/BTC |
| expiration      | STRING | YES       | expiration date, e.g 221225   |

### Response Example

```json
[
  {
    "symbol": "ETH-221119-1175-P",
    "sumOpenInterest": "4.01",
    "sumOpenInterestUsd": "4880.2985615624",
    "timestamp": "1668754020000"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data/Open-Interest](https://developers.binance.com/docs/derivatives/option/market-data/Open-Interest)

## Order Book

### API Description

Check orderbook depth on specific symbol

### HTTP Request

GET `/eapi/v1/depth`

### Request Weight

| limit         | weight |
| ------------- | ------ |
| 5, 10, 20, 50 | 2      |
| 100           | 5      |
| 500           | 10     |
| 1000          | 20     |

### Request Parameters

| Name   | Type   | Mandatory | Description                                                        |
| ------ | ------ | --------- | ------------------------------------------------------------------ |
| symbol | STRING | YES       | Option trading pair, e.g BTC-200730-9000-C                         |
| limit  | INT    | NO        | Default:100 Max:1000.Optional value:\[10, 20, 50, 100, 500, 1000\] |

### Response Example

```json
{
  "T": 1589436922972,   // transaction time
  "u": 37461            // update id
  "bids": [             // Buy order
    [
      "1000",            // Price
      "0.9"              // Quantity
    ]
  ],
  "asks": [              // Sell order
    [
      "1100",            // Price
      "0.1"              // Quantity
    ]
  ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data/Order-Book](https://developers.binance.com/docs/derivatives/option/market-data/Order-Book)

## Recent Trades List

### API Description

Get recent market trades

### HTTP Request

GET `/eapi/v1/trades`

### Request Weight

**5**

### Request Parameters

| Name   | Type   | Mandatory | Description                                |
| ------ | ------ | --------- | ------------------------------------------ |
| symbol | STRING | YES       | Option trading pair, e.g BTC-200730-9000-C |
| limit  | INT    | NO        | Number of records Default:100 Max:500      |

### Response Example

```json
[
  {
    "id":"1",             // TradeId
    "symbol": "BTC-220722-19000-C",
    "price": "1000",      // Completed trade price
    "qty": "-0.1",        // Completed trade quantity
    "quoteQty": "-100",   // Completed trade amount
    "side": -1            // Completed trade direction（-1 Sell，1 Buy）
    "time": 1592449455993,// Time
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data/Recent-Trades-List](https://developers.binance.com/docs/derivatives/option/market-data/Recent-Trades-List)

## Recent Block Trades List

### API Description

Get recent block trades

### HTTP Request

GET `/eapi/v1/blockTrades`

### Request Weight

**5**

### Request Parameters

| Name   | Type   | Mandatory |  Description                                 |
| ------ | ------ | --------- | -------------------------------------------- |
| symbol | STRING | NO        | Option trading pair, e.g. BTC-200730-9000-C  |
| limit  | INT    | NO        | Number of records; Default: 100 and Max: 500 |

### Response Example

```json
[
  {
    "id": 1125899906901081078,
    "tradeId": 389,
    "symbol": "ETH-250725-1200-P",
    "price": "342.40",
    "qty": "-2167.20",
    "quoteQty": "-4.90",
    "side": -1,
    "time": 1733950676483
  },
  {
    "id": 1125899906901080972,
    "tradeId": 161,
    "symbol": "XRP-250904-0.086-P",
    "price": "3.0",
    "qty": "-6.0",
    "quoteQty": "-2.02",
    "side": -1,
    "time": 1733950488444
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data/Recent-Block-Trade-List](https://developers.binance.com/docs/derivatives/option/market-data/Recent-Block-Trade-List)

## Symbol Price Ticker

### API Description

Get spot index price for option underlying.

### HTTP Request

GET `/eapi/v1/index`

### Request Weight

**1**

### Request Parameters

| Name       | Type   | Mandatory | Description                                               |
| ---------- | ------ | --------- | --------------------------------------------------------- |
| underlying | STRING | YES       | Spot pair（Option contract underlying asset, e.g BTCUSDT) |

### Response Example

```json
{
  "time": 1656647305000,
  "indexPrice": "9200" // Current spot index price
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data/Symbol-Price-Ticker](https://developers.binance.com/docs/derivatives/option/market-data/Symbol-Price-Ticker)

## Kline/Candlestick Data

### API Description

Kline/candlestick bars for an option symbol. Klines are uniquely identified by
their open time.

### HTTP Request

GET `/eapi/v1/klines`

### Request Weight

**1**

### Request Parameters

| Name      | Type   | Mandatory | Description                                |
| --------- | ------ | --------- | ------------------------------------------ |
| symbol    | STRING | YES       | Option trading pair, e.g BTC-200730-9000-C |
| interval  | STRING | YES       | Time interval                              |
| startTime | LONG   | NO        | Start Time 1592317127349                   |
| endTime   | LONG   | NO        | End Time                                   |
| limit     | INT    | NO        | Number of records Default:500 Max:1500     |

> - If startTime and endTime are not sent, the most recent klines are returned.

### Response Example

```json
[
  {
      "open": "950",              // Opening price
      "high": "1100",             // Highest price
      "low": "900",               // Lowest price
      "close": "1000",            // Closing price (latest price if the current candle has not closed)
      "volume": "100"             // Trading volume(contracts)
      "amount": "2",              // Trading amount(in quote asset)
      "interval": "5m",           // Candle type
      "tradeCount": 10,           // Number of completed trades
      "takerVolume": "100",       // Taker trading volume(contracts)
      "takerAmount": "10000",     // Taker trade amount(in quote asset)
      "openTime": 1499040000000,  // Opening time
      "closeTime": 1499644799999, // Closing time
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data/Kline-Candlestick-Data](https://developers.binance.com/docs/derivatives/option/market-data/Kline-Candlestick-Data)

## Test Connectivity

### API Description

Test connectivity to the Rest API.

### HTTP Request

GET `/eapi/v1/ping`

### Request Weight

**1**

### Request Parameters

NONE

### Response Example

```json
{}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data/Test-Connectivity](https://developers.binance.com/docs/derivatives/option/market-data/Test-Connectivity)

## Old Trades Lookup (MARKET_DATA)

### API Description

Get older market historical trades.

### HTTP Request

GET `/eapi/v1/historicalTrades`

### Request Weight

20

### Request Parameters

| Name   | Type   | Mandatory | Description                                                                         |
| ------ | ------ | --------- | ----------------------------------------------------------------------------------- |
| symbol | STRING | YES       | Option trading pair, e.g BTC-200730-9000-C                                          |
| fromId | LONG   | NO        | The UniqueId ID from which to return. The latest deal record is returned by default |
| limit  | INT    | NO        | Number of records Default:100 Max:500                                               |

### Response Example

```json
[
  {
    "id":"1",             // UniqueId
    "tradeId": "159244329455993",    // TradeId
    "price": "1000",      // Completed trade price
    "qty": "-0.1",        // Completed trade Quantity
    "quoteQty": "-100",   // Completed trade amount
    "side": -1            // Completed trade direction（-1 Sell，1 Buy）
    "time": 1592449455993,// Time
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data/Old-Trades-Lookup](https://developers.binance.com/docs/derivatives/option/market-data/Old-Trades-Lookup)

## Option Mark Price

### API Description

Option mark price and greek info.

### HTTP Request

GET `/eapi/v1/mark`

### Request Weight

**5**

### Request Parameters

| Name   | Type   | Mandatory | Description                                |
| ------ | ------ | --------- | ------------------------------------------ |
| symbol | STRING | NO        | Option trading pair, e.g BTC-200730-9000-C |

### Response Example

```json
[
  {
    "symbol": "BTC-200730-9000-C",
    "markPrice": "1343.2883",       // Mark price
    "bidIV": "1.40000077",          // Implied volatility Buy
    "askIV": "1.50000153",          // Implied volatility Sell
    "markIV": "1.45000000"          // Implied volatility mark
    "delta": "0.55937056",          // delta
    "theta": "3739.82509871",       // theta
    "gamma": "0.00010969",          // gamma
    "vega": "978.58874732",         // vega
    "highPriceLimit": "1618.241",   // Current highest buy price
    "lowPriceLimit": "1068.3356"    // Current lowest sell price
    "riskFreeInterest": "0.1"       // risk free rate
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data/Option-Mark-Price](https://developers.binance.com/docs/derivatives/option/market-data/Option-Mark-Price)
