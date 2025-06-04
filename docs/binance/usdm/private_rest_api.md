# Binance USDM Futures Private REST API Documentation

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

### testnet

- Most of the endpoints can be used in the testnet platform.
- The REST baseurl for **testnet** is
  "[https://testnet.binancefuture.com](https://testnet.binancefuture.com)"
- The Websocket baseurl for **testnet** is "wss://fstream.binancefuture.com"

### SDK and Code Demonstration

**Disclaimer:**

- The following SDKs are provided by partners and users, and are **not
  officially** produced. They are only used to help users become familiar with
  the API endpoint. Please use it with caution and expand R&D according to your
  own situation.
- Binance does not make any commitment to the safety and performance of the
  SDKs, nor will be liable for the risks or even losses caused by using the
  SDKs.

#### Python3

**SDK:** To get the provided SDK for Binance Futures Connector,  
please visit
[https://github.com/binance/binance-futures-connector-python](https://github.com/binance/binance-futures-connector-python),  
or
use the command below:  
`pip install binance-futures-connector`

#### Java

To get the provided SDK for Binance Futures,  
please visit
[https://github.com/binance/binance-futures-connector-java](https://github.com/binance/binance-futures-connector-java),  
or
use the command below:  
`git clone https://github.com/binance/binance-futures-connector-java.git`

### General API Information

- Some endpoints will require an API Key. Please refer to
  [this page](https://www.binance.com/en/support/articles/360002502072)
- The base endpoint is: **[https://fapi.binance.com](https://fapi.binance.com)**
- All endpoints return either a JSON object or array.
- Data is returned in **ascending** order. Oldest first, newest last.
- All time and timestamp related fields are in milliseconds.
- All data types adopt definition in JAVA.

#### HTTP Return Codes

- HTTP `4XX` return codes are used for for malformed requests; the issue is on
  the sender's side.
- HTTP `403` return code is used when the WAF Limit (Web Application Firewall)
  has been violated.
- HTTP `408` return code is used when a timeout has occurred while waiting for a
  response from the backend server.
- HTTP `429` return code is used when breaking a request rate limit.
- HTTP `418` return code is used when an IP has been auto-banned for continuing
  to send requests after receiving `429` codes.
- HTTP `5XX` return codes are used for internal errors; the issue is on
  Binance's side.
  1.  If there is an error message **"Request occur unknown error."**, please
      retry later.
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
  [Error Codes](/docs/derivatives/usds-margined-futures/general-info#error-codes).

#### General Information on Endpoints

- For `GET` endpoints, parameters must be sent as a `query string`.
- For `POST`, `PUT`, and `DELETE` endpoints, the parameters may be sent as a
  `query string` or in the `request body` with content type
  `application/x-www-form-urlencoded`. You may mix parameters between both the
  `query string` and `request body` if you wish to do so.
- Parameters may be sent in any order.
- If a parameter sent in both the `query string` and `request body`, the
  `query string` parameter will be used.

### LIMITS

- The `/fapi/v1/exchangeInfo` `rateLimits` array contains objects related to the
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

#### SIGNED Endpoint Examples for POST /fapi/v1/order - HMAC Keys

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
    $ echo -n "symbol=BTCUSDT&side=BUY&type=LIMIT&quantity=1&price=9000&timeInForce=GTC&recvWindow=5000&timestamp=1591702613943" | openssl dgst -sha256 -hmac "2b5eb11e18796d12d88f13dc27dbbd02c2cc51ff7059765ed9821957d82bb4d9"
    (stdin)= 3c661234138461fcc7a7d8746c6558c9842d4e10870d2ecbedf7777cad694af9
```

> **curl command:**

```shell
    (HMAC SHA256)
    $ curl -H "X-MBX-APIKEY: dbefbc809e3e83c283a984c3a1459732ea7db1360ca80c5c2c8867408d28cc83" -X POST 'https://fapi/binance.com/fapi/v1/order?symbol=BTCUSDT&side=BUY&type=LIMIT&quantity=1&price=9000&timeInForce=GTC&recvWindow=5000&timestamp=1591702613943&signature= 3c661234138461fcc7a7d8746c6558c9842d4e10870d2ecbedf7777cad694af9'
```

- **queryString:**

  symbol=BTCUSDT  
  &side=BUY  
  &type=LIMIT  
  &timeInForce=GTC  
  &quantity=1  
  &price=9000  
  &recvWindow=5000  
  &timestamp=1591702613943

##### Example 2: As a request body

> **Example 2**

> **HMAC SHA256 signature:**

```shell
    $ echo -n "symbol=BTCUSDT&side=BUY&type=LIMIT&quantity=1&price=9000&timeInForce=GTC&recvWindow=5000&timestamp=1591702613943" | openssl dgst -sha256 -hmac "2b5eb11e18796d12d88f13dc27dbbd02c2cc51ff7059765ed9821957d82bb4d9"
    (stdin)= 3c661234138461fcc7a7d8746c6558c9842d4e10870d2ecbedf7777cad694af9
```

> **curl command:**

```shell
    (HMAC SHA256)
    $ curl -H "X-MBX-APIKEY: dbefbc809e3e83c283a984c3a1459732ea7db1360ca80c5c2c8867408d28cc83" -X POST 'https://fapi/binance.com/fapi/v1/order' -d 'symbol=BTCUSDT&side=BUY&type=LIMIT&quantity=1&price=9000&timeInForce=GTC&recvWindow=5000&timestamp=1591702613943&signature= 3c661234138461fcc7a7d8746c6558c9842d4e10870d2ecbedf7777cad694af9'
```

- **requestBody:**

  symbol=BTCUSDT  
  &side=BUY  
  &type=LIMIT  
  &timeInForce=GTC  
  &quantity=1  
  &price=9000  
  &recvWindow=5000  
  &timestamp=1591702613943

##### Example 3: Mixed query string and request body

> **Example 3**

> **HMAC SHA256 signature:**

```shell
    $ echo -n "symbol=BTCUSDT&side=BUY&type=LIMIT&timeInForce=GTCquantity=1&price=9000&recvWindow=5000&timestamp= 1591702613943" | openssl dgst -sha256 -hmac "2b5eb11e18796d12d88f13dc27dbbd02c2cc51ff7059765ed9821957d82bb4d9"
    (stdin)= f9d0ae5e813ef6ccf15c2b5a434047a0181cb5a342b903b367ca6d27a66e36f2
```

> **curl command:**

```shell
    (HMAC SHA256)
    $ curl -H "X-MBX-APIKEY: dbefbc809e3e83c283a984c3a1459732ea7db1360ca80c5c2c8867408d28cc83" -X POST 'https://fapi.binance.com/fapi/v1/order?symbol=BTCUSDT&side=BUY&type=LIMIT&timeInForce=GTC' -d 'quantity=1&price=9000&recvWindow=5000&timestamp=1591702613943&signature=f9d0ae5e813ef6ccf15c2b5a434047a0181cb5a342b903b367ca6d27a66e36f2'
```

- **queryString:** symbol=BTCUSDT&side=BUY&type=LIMIT&timeInForce=GTC
- **requestBody:** quantity=1&price=9000&recvWindow=5000&timestamp=
  1591702613943

Note that the signature is different in example 3.  
There is no & between "GTC" and "quantity=1".

#### SIGNED Endpoint Examples for POST /fapi/v1/order - RSA Keys

- This will be a step by step process how to create the signature payload to
  send a valid signed payload.
- We support `PKCS#8` currently.
- To get your API key, you need to upload your RSA Public Key to your account
  and a corresponding API key will be provided for you.

For this example, the private key will be referenced as `test-prv-key.pem`

| Key    | Value                                                            |
| ------ | ---------------------------------------------------------------- |
| apiKey | vE3BDAL1gP1UaexugRLtteaAHg3UO8Nza20uexEuW1Kh3tVwQfFHdAiyjjY428o2 |

| Parameter  | Value         |
| ---------- | ------------- |
| symbol     | BTCUSDT       |
| side       | SELL          |
| type       | MARKET        |
| quantity   | 1.23          |
| recvWindow | 9999999       |
| timestamp  | 1671090801999 |

> **Signature payload (with the listed parameters):**

```shell
timestamp=1671090801999&recvWindow=9999999&symbol=BTCUSDT&side=SELL&type=MARKET&quantity=1.23
```

**Step 1: Construct the payload**

Arrange the list of parameters into a string. Separate each parameter with a
`&`.

**Step 2: Compute the signature:**

2.1 - Encode signature payload as ASCII data.

> **Step 2.2**

```shell
 $ echo -n 'timestamp=1671090801999&recvWindow=9999999&symbol=BTCUSDT&side=SELL&type=MARKET&quantity=1.23' | openssl dgst -keyform PEM -sha256 -sign ./test-prv-key.pem
```

2.2 - Sign payload using RSASSA-PKCS1-v1_5 algorithm with SHA-256 hash function.

> **Step 2.3**

```shell
$ echo -n 'timestamp=1671090801999&recvWindow=9999999&symbol=BTCUSDT&side=SELL&type=MARKET&quantity=1.23' | openssl dgst -keyform PEM -sha256 -sign ./test-prv-key.pem | openssl enc -base64
aap36wD5loVXizxvvPI3wz9Cjqwmb3KVbxoym0XeWG1jZq8umqrnSk8H8dkLQeySjgVY91Ufs%2BBGCW%2B4sZjQEpgAfjM76riNxjlD3coGGEsPsT2lG39R%2F1q72zpDs8pYcQ4A692NgHO1zXcgScTGgdkjp%2Brp2bcddKjyz5XBrBM%3D
```

2.3 - Encode output as base64 string.

> **Step 2.4**

```shell
$  echo -n 'timestamp=1671090801999&recvWindow=9999999&symbol=BTCUSDT&side=SELL&type=MARKET&quantity=1.23' | openssl dgst -keyform PEM -sha256 -sign ./test-prv-key.pem | openssl enc -base64 | tr -d '\n'
aap36wD5loVXizxvvPI3wz9Cjqwmb3KVbxoym0XeWG1jZq8umqrnSk8H8dkLQeySjgVY91Ufs%2BBGCW%2B4sZjQEpgAfjM76riNxjlD3coGGEsPsT2lG39R%2F1q72zpDs8pYcQ4A692NgHO1zXcgScTGgdkjp%2Brp2bcddKjyz5XBrBM%3D
```

2.4 - Delete any newlines in the signature.

> **Step 2.5**

```shell
aap36wD5loVXizxvvPI3wz9Cjqwmb3KVbxoym0XeWG1jZq8umqrnSk8H8dkLQeySjgVY91Ufs%2BBGCW%2B4sZjQEpgAfjM76riNxjlD3coGGEsPsT2lG39R%2F1q72zpDs8pYcQ4A692NgHO1zXcgScTGgdkjp%2Brp2bcddKjyz5XBrBM%3D
```

2.5 - Since the signature may contain `/` and `=`, this could cause issues with
sending the request. So the signature has to be URL encoded.

> **Step 2.6**

```shell
 curl -H "X-MBX-APIKEY: vE3BDAL1gP1UaexugRLtteaAHg3UO8Nza20uexEuW1Kh3tVwQfFHdAiyjjY428o2" -X POST 'https://fapi.binance.com/fapi/v1/order?timestamp=1671090801999&recvWindow=9999999&symbol=BTCUSDT&side=SELL&type=MARKET&quantity=1.23&signature=aap36wD5loVXizxvvPI3wz9Cjqwmb3KVbxoym0XeWG1jZq8umqrnSk8H8dkLQeySjgVY91Ufs%2BBGCW%2B4sZjQEpgAfjM76riNxjlD3coGGEsPsT2lG39R%2F1q72zpDs8pYcQ4A692NgHO1zXcgScTGgdkjp%2Brp2bcddKjyz5XBrBM%3D'
```

2.6 - curl command

> **Bash script**

```bash
#!/usr/bin/env bash

# Set up authentication:
apiKey="vE3BDAL1gP1UaexugRLtteaAHg3UO8Nza20uexEuW1Kh3tVwQfFHdAiyjjY428o2"   ### REPLACE THIS WITH YOUR API KEY

# Set up the request:
apiMethod="POST"
apiCall="v1/order"
apiParams="timestamp=1671090801999&recvWindow=9999999&symbol=BTCUSDT&side=SELL&type=MARKET&quantity=1.23"
function rawurlencode {
    local value="$1"
    local len=${#value}
    local encoded=""
    local pos c o
    for (( pos=0 ; pos<len ; pos++ ))
    do
        c=${value:$pos:1}
        case "$c" in
            [-_.~a-zA-Z0-9] ) o="${c}" ;;
            * )   printf -v o '%%%02x' "'$c"
        esac
        encoded+="$o"
    done
    echo "$encoded"
}
ts=$(date +%s000)
paramsWithTs="$apiParams&timestamp=$ts"
rawSignature=$(echo -n "$paramsWithTs" \
               | openssl dgst -keyform PEM -sha256 -sign ./test-prv-key.pem \  ### THIS IS YOUR PRIVATE KEY. DO NOT SHARE THIS FILE WITH ANYONE.
               | openssl enc -base64 \
               | tr -d '\n')
signature=$(rawurlencode "$rawSignature")
curl -H "X-MBX-APIKEY: $apiKey" -X $apiMethod \
    "https://fapi.binance.com/fapi/$apiCall?$paramsWithTs&signature=$signature"
```

A sample Bash script containing similar steps is available in the right side.

---

### Postman Collections

There is now a Postman collection containing the API endpoints for quick and
easy use.

For more information please refer to this page:
[Binance API Postman](https://github.com/binance-exchange/binance-api-postman)

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/general-info](https://developers.binance.com/docs/derivatives/usds-margined-futures/general-info)

## Public Endpoints Info

### Terminology

- `base asset` refers to the asset that is the `quantity` of a symbol.
- `quote asset` refers to the asset that is the `price` of a symbol.

### ENUM definitions

**Symbol type:**

- FUTURE

**Contract type (contractType):**

- PERPETUAL
- CURRENT_MONTH
- NEXT_MONTH
- CURRENT_QUARTER
- NEXT_QUARTER
- PERPETUAL_DELIVERING

**Contract status (contractStatus, status):**

- PENDING_TRADING
- TRADING
- PRE_DELIVERING
- DELIVERING
- DELIVERED
- PRE_SETTLE
- SETTLING
- CLOSE

**Order status (status):**

- NEW
- PARTIALLY_FILLED
- FILLED
- CANCELED
- REJECTED
- EXPIRED
- EXPIRED_IN_MATCH

**Order types (orderTypes, type):**

- LIMIT
- MARKET
- STOP
- STOP_MARKET
- TAKE_PROFIT
- TAKE_PROFIT_MARKET
- TRAILING_STOP_MARKET

**Order side (side):**

- BUY
- SELL

**Position side (positionSide):**

- BOTH
- LONG
- SHORT

**Time in force (timeInForce):**

- GTC - Good Till Cancel(GTC order valitidy is 1 year from placement)
- IOC - Immediate or Cancel
- FOK - Fill or Kill
- GTX - Good Till Crossing (Post Only)
- GTD - Good Till Date

**Working Type (workingType)**

- MARK_PRICE
- CONTRACT_PRICE

**Response Type (newOrderRespType)**

- ACK
- RESULT

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

**STP MODE (selfTradePreventionMode):**

- EXPIRE_TAKER
- EXPIRE_BOTH
- EXPIRE_MAKER

**Price Match (priceMatch)**

- NONE (No price match)
- OPPONENT (counterparty best price)
- OPPONENT_5 (the 5th best price from the counterparty)
- OPPONENT_10 (the 10th best price from the counterparty)
- OPPONENT_20 (the 20th best price from the counterparty)
- QUEUE (the best price on the same side of the order book)
- QUEUE_5 (the 5th best price on the same side of the order book)
- QUEUE_10 (the 10th best price on the same side of the order book)
- QUEUE_20 (the 20th best price on the same side of the order book)

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

- `price` >= `minPrice`
- `price` <= `maxPrice`
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

#### MARKET_LOT_SIZE

> **/exchangeInfo format:**

```json
{
  "filterType": "MARKET_LOT_SIZE",
  "minQty": "0.00100000",
  "maxQty": "100000.00000000",
  "stepSize": "0.00100000"
}
```

The `MARKET_LOT_SIZE` filter defines the `quantity` (aka "lots" in auction
terms) rules for `MARKET` orders on a symbol. There are 3 parts:

- `minQty` defines the minimum `quantity` allowed.
- `maxQty` defines the maximum `quantity` allowed.
- `stepSize` defines the intervals that a `quantity` can be increased/decreased
  by.

In order to pass the `market lot size`, the following must be true for
`quantity`:

- `quantity` >= `minQty`
- `quantity` <= `maxQty`
- (`quantity`\-`minQty`) % `stepSize` == 0

#### MAX_NUM_ORDERS

> **/exchangeInfo format:**

```json
{
  "filterType": "MAX_NUM_ORDERS",
  "limit": 200
}
```

The `MAX_NUM_ORDERS` filter defines the maximum number of orders an account is
allowed to have open on a symbol.

Note that both "algo" orders and normal orders are counted for this filter.

#### MAX_NUM_ALGO_ORDERS

> **/exchangeInfo format:**

```json
{
  "filterType": "MAX_NUM_ALGO_ORDERS",
  "limit": 100
}
```

The `MAX_NUM_ALGO_ORDERS` filter defines the maximum number of all kinds of algo
orders an account is allowed to have open on a symbol.

The algo orders include `STOP`, `STOP_MARKET`, `TAKE_PROFIT`,
`TAKE_PROFIT_MARKET`, and `TRAILING_STOP_MARKET` orders.

#### PERCENT_PRICE

> **/exchangeInfo format:**

```json
{
  "filterType": "PERCENT_PRICE",
  "multiplierUp": "1.1500",
  "multiplierDown": "0.8500",
  "multiplierDecimal": 4
}
```

The `PERCENT_PRICE` filter defines valid range for a price based on the mark
price.

In order to pass the `percent price`, the following must be true for `price`:

- BUY: `price` <= `markPrice` \* `multiplierUp`
- SELL: `price` >= `markPrice` \* `multiplierDown`

#### MIN_NOTIONAL

> **/exchangeInfo format:**

```json
{
  "filterType": "MIN_NOTIONAL",
  "notional": "5.0"
}
```

The `MIN_NOTIONAL` filter defines the minimum notional value allowed for an
order on a symbol. An order's notional value is the `price` \* `quantity`. Since
`MARKET` orders have no price, the mark price is used.

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/common-definition](https://developers.binance.com/docs/derivatives/usds-margined-futures/common-definition)

## Self Trade Prevention (STP) FAQ

### What is Self Trade Prevention?

Self Trade Prevention (or STP) prevents orders of users, or the user's
`tradeGroupId` to match against their own.

### What defines a self-trade?

A self-trade can occur in either scenario:

- The order traded against the same account.
- The order traded against an account with the same `tradeGroupId`.

### What happens when STP is triggered?

There are three possible modes for what the system will do if an order could
create a self-trade.

`EXPIRE_TAKER` - This mode prevents a trade by immediately expiring the taker
order's remaining quantity.

`EXPIRE_MAKER` - This mode prevents a trade by immediately expiring the
potential maker order's remaining quantity.

`EXPIRE_BOTH` - This mode prevents a trade by immediately expiring both the
taker and the potential maker orders' remaining quantities.

The STP event will occur depending on the STP mode of the **taker order**.  
Thus, the STP mode of an order that goes on the book is no longer relevant and
will be ignored for all future order processing.

### Where do I set STP mode for an order?

STP can only be set using field `selfTradePreventionMode` through API endpoints
below:

- POST `/fapi/v1/order`
- POST `/fapi/v1/batchOrders`

### What is a Trade Group Id?

Different accounts with the same `tradeGroupId` are considered part of the same
"trade group". Orders submitted by members of a trade group are eligible for STP
according to the taker-order's STP mode.

A user can confirm if their accounts are under the same `tradeGroupId` from the
API either from `GET fapi/v3/account` (REST API).

If the value is `-1`, then the `tradeGroupId` has not been set for that account,
so the STP may only take place between orders of the same account.

We will release feature for user to group subaccounts to same `tradeGroupId` on
website in future updates.

### How do I know which symbol uses STP?

Placing orders on all symbols in `GET fapi/v1/exchangeInfo` can set
`selfTradePreventionMode`.

### What order types support STP?

`LIMIT`/`MARKET`/`STOP`/`TAKE_PROFIT`/`STOP_MARKET`/`TAKE_PROFIT_MARKET`/`TRAILING_STOP_MARKET`
all supports STP when Time in force(timeInForce) set to `GTC`/ `IOC`/ `GTD`. STP
won't take effect for Time in force(timeInForce) `FOK` or `GTX`

### Does Modify order support STP?

No. Modify order that has reset `selfTradePreventionMode` to `NONE`

### How do I know if an order expired due to STP?

The order will have the status `EXPIRED_IN_MATCH`.

In user data stream event `ORDER_TRADE_UPDATE`, field `X` would be
`EXPIRED_IN_MATCH` if order is expired due to STP

```json
{
  "e": "ORDER_TRADE_UPDATE", // Event Type
  "E": 1568879465651, // Event Time
  "T": 1568879465650, // Transaction Time
  "o": {
    "s": "BTCUSDT", // Symbol
    "c": "TEST", // Client Order Id
    // special client order id:
    // starts with "autoclose-": liquidation order
    // "adl_autoclose": ADL auto close order
    // "settlement_autoclose-": settlement order for delisting or delivery
    "S": "SELL", // Side
    "o": "TRAILING_STOP_MARKET", // Order Type
    "f": "GTC", // Time in Force
    "q": "0.001", // Original Quantity
    "p": "0", // Original Price
    "ap": "0", // Average Price
    "sp": "7103.04", // Stop Price. Please ignore with TRAILING_STOP_MARKET order
    "x": "EXPIRED", // Execution Type
    "X": "EXPIRED_IN_MATCH", // Order Status
    "i": 8886774, // Order Id
    "l": "0", // Order Last Filled Quantity
    "z": "0", // Order Filled Accumulated Quantity
    "L": "0", // Last Filled Price
    "N": "USDT", // Commission Asset, will not push if no commission
    "n": "0", // Commission, will not push if no commission
    "T": 1568879465650, // Order Trade Time
    "t": 0, // Trade Id
    "b": "0", // Bids Notional
    "a": "9.91", // Ask Notional
    "m": false, // Is this trade the maker side?
    "R": false, // Is this reduce only
    "wt": "CONTRACT_PRICE", // Stop Price Working Type
    "ot": "TRAILING_STOP_MARKET", // Original Order Type
    "ps": "LONG", // Position Side
    "cp": false, // If Close-All, pushed with conditional order
    "AP": "7476.89", // Activation Price, only puhed with TRAILING_STOP_MARKET order
    "cr": "5.0", // Callback Rate, only puhed with TRAILING_STOP_MARKET order
    "pP": false, // ignore
    "si": 0, // ignore
    "ss": 0, // ignore
    "rp": "0", // Realized Profit of the trade
    "V": "EXPIRE_MAKER", // selfTradePreventionMode
    "pm": "QUEUE", // price match type
    "gtd": 1768879465650 // good till date
  }
}
```

### STP Examples:

For all these cases, assume that all orders for these examples are made on the
same account.

**Scenario A- A user sends an order with `EXPIRE_MAKER` that would match with
their orders that are already on the book.**

```xyz2
Maker Order 1: symbol=BTCUSDT side=BUY  type=LIMIT quantity=1 price=20002 selfTradePreventionMode=EXPIRE_MAKER
Maker Order 2: symbol=BTCUSDT side=BUY  type=LIMIT quantity=1 price=20001 selfTradePreventionMode=EXPIRE_MAKER
Taker Order 1: symbol=BTCUSDT side=SELL type=LIMIT quantity=1 price=20000 selfTradePreventionMode=EXPIRE_MAKER
```

**Result**: The orders that were on the book will expire due to STP, and the
taker order will go on the book.

Maker Order 1

```json
{
  "orderId": 292864710,
  "symbol": "BTCUSDT",
  "status": "FILLED",
  "clientOrderId": "testMaker1",
  "price": "20002",
  "avgPrice": "20002",
  "origQty": "1",
  "executedQty": "1",
  "cumQuote": "20002",
  "timeInForce": "GTC",
  "type": "LIMIT",
  "reduceOnly": false,
  "closePosition": false,
  "side": "BUY",
  "positionSide": "BOTH",
  "stopPrice": "0",
  "workingType": "CONTRACT_PRICE",
  "priceMatch": "NONE",
  "selfTradePreventionMode": "EXPIRE_MAKER",
  "goodTillDate": "null",
  "priceProtect": false,
  "origType": "LIMIT",
  "time": 1692849639460,
  "updateTime": 1692849639460
}
```

Maker Order 2

```json
{
  "orderId": 292864711,
  "symbol": "BTCUSDT",
  "status": "EXPIRED_IN_MATCH",
  "clientOrderId": "testMaker2",
  "price": "20001",
  "avgPrice": "0.0000",
  "origQty": "1",
  "executedQty": "0",
  "cumQuote": "0",
  "timeInForce": "GTC",
  "type": "LIMIT",
  "reduceOnly": false,
  "closePosition": false,
  "side": "BUY",
  "positionSide": "BOTH",
  "stopPrice": "0",
  "workingType": "CONTRACT_PRICE",
  "priceMatch": "NONE",
  "selfTradePreventionMode": "EXPIRE_MAKER",
  "goodTillDate": "null",
  "priceProtect": false,
  "origType": "LIMIT",
  "time": 1692849639460,
  "updateTime": 1692849639460
}
```

Output of the Taker Order

```json
{
  "orderId": 292864712,
  "symbol": "BTCUSDT",
  "status": "PARTIALLY_FILLED",
  "clientOrderId": "testTaker1",
  "price": "20000",
  "avgPrice": "20002",
  "origQty": "2",
  "executedQty": "1",
  "cumQuote": "20002",
  "timeInForce": "GTC",
  "type": "LIMIT",
  "reduceOnly": false,
  "closePosition": false,
  "side": "SELL",
  "positionSide": "BOTH",
  "stopPrice": "0",
  "workingType": "CONTRACT_PRICE",
  "priceMatch": "NONE",
  "selfTradePreventionMode": "EXPIRE_MAKER",
  "goodTillDate": "null",
  "priceProtect": false,
  "origType": "LIMIT",
  "time": 1692849639460,
  "updateTime": 1692849639460
}
```

**Scenario B - A user sends an order with `EXPIRE_TAKER` that would match with
their orders already on the book.**

```xyz2
Maker Order 1: symbol=BTCUSDT side=BUY  type=LIMIT quantity=1 price=20002  selfTradePreventionMode=EXPIRE_MAKER
Maker Order 2: symbol=BTCUSDT side=BUY  type=LIMIT quantity=1 price=20001  selfTradePreventionMode=EXPIRE_MAKER
Taker Order 1: symbol=BTCUSDT side=SELL type=LIMIT quantity=2 price=3      selfTradePreventionMode=EXPIRE_TAKER
```

**Result**: The orders already on the book will remain, while the taker order
will expire.

Maker Order 1

```json
{
  "orderId": 292864710,
  "symbol": "BTCUSDT",
  "status": "FILLED",
  "clientOrderId": "testMaker1",
  "price": "20002",
  "avgPrice": "0.0000",
  "origQty": "1",
  "executedQty": "0",
  "cumQuote": "0",
  "timeInForce": "GTC",
  "type": "LIMIT",
  "reduceOnly": false,
  "closePosition": false,
  "side": "BUY",
  "positionSide": "BOTH",
  "stopPrice": "0",
  "workingType": "CONTRACT_PRICE",
  "priceMatch": "NONE",
  "selfTradePreventionMode": "EXPIRE_MAKER",
  "goodTillDate": "null",
  "priceProtect": false,
  "origType": "LIMIT",
  "time": 1692849639460,
  "updateTime": 1692849639460
}
```

Maker Order 2

```json
{
  "orderId": 292864711,
  "symbol": "BTCUSDT",
  "status": "EXPIRED_IN_MATCH",
  "clientOrderId": "testMaker2",
  "price": "20001",
  "avgPrice": "0.0000",
  "origQty": "1",
  "executedQty": "0",
  "cumQuote": "0",
  "timeInForce": "GTC",
  "type": "LIMIT",
  "reduceOnly": false,
  "closePosition": false,
  "side": "BUY",
  "positionSide": "BOTH",
  "stopPrice": "0",
  "workingType": "CONTRACT_PRICE",
  "priceMatch": "NONE",
  "selfTradePreventionMode": "EXPIRE_MAKER",
  "goodTillDate": "null",
  "priceProtect": false,
  "origType": "LIMIT",
  "time": 1692849639460,
  "updateTime": 1692849639460
}
```

Output of the Taker order

```json
{
  "orderId": 292864712,
  "symbol": "BTCUSDT",
  "status": "EXPIRED_IN_MATCH",
  "clientOrderId": "testTaker1",
  "price": "20000",
  "avgPrice": "0.0000",
  "origQty": "3",
  "executedQty": "0",
  "cumQuote": "0",
  "timeInForce": "GTC",
  "type": "LIMIT",
  "reduceOnly": false,
  "closePosition": false,
  "side": "SELL",
  "positionSide": "BOTH",
  "stopPrice": "0",
  "workingType": "CONTRACT_PRICE",
  "priceMatch": "NONE",
  "selfTradePreventionMode": "EXPIRE_TAKER",
  "goodTillDate": "null",
  "priceProtect": false,
  "origType": "LIMIT",
  "time": 1692849639460,
  "updateTime": 1692849639460
}
```

**Scenario C- A user has an order on the book, and then sends an order with
`EXPIRE_BOTH` that would match with the existing order.**

```xyz2
Maker Order: symbol=BTCUSDT side=BUY  type=LIMIT quantity=1 price=20002 selfTradePreventionMode=EXPIRE_MAKER
Taker Order: symbol=BTCUSDT side=SELL type=LIMIT quantity=3 price=20000 selfTradePreventionMode=EXPIRE_BOTH
```

**Result:** Both orders will expire.

Maker Order

```json
{
  "orderId": 292864710,
  "symbol": "BTCUSDT",
  "status": "EXPIRED_IN_MATCH",
  "clientOrderId": "testMaker1",
  "price": "20002",
  "avgPrice": "0.0000",
  "origQty": "1",
  "executedQty": "0",
  "cumQuote": "0",
  "timeInForce": "GTC",
  "type": "LIMIT",
  "reduceOnly": false,
  "closePosition": false,
  "side": "BUY",
  "positionSide": "BOTH",
  "stopPrice": "0",
  "workingType": "CONTRACT_PRICE",
  "priceMatch": "NONE",
  "selfTradePreventionMode": "EXPIRE_MAKER",
  "goodTillDate": "null",
  "priceProtect": false,
  "origType": "LIMIT",
  "time": 1692849639460,
  "updateTime": 1692849639460
}
```

Taker Order

```json
{
  "orderId": 292864712,
  "symbol": "BTCUSDT",
  "status": "EXPIRED_IN_MATCH",
  "clientOrderId": "testTaker1",
  "price": "20000",
  "avgPrice": "0.0000",
  "origQty": "3",
  "executedQty": "0",
  "cumQuote": "0",
  "timeInForce": "GTC",
  "type": "LIMIT",
  "reduceOnly": false,
  "closePosition": false,
  "side": "SELL",
  "positionSide": "BOTH",
  "stopPrice": "0",
  "workingType": "CONTRACT_PRICE",
  "priceMatch": "NONE",
  "selfTradePreventionMode": "EXPIRE_BOTH",
  "goodTillDate": "null",
  "priceProtect": false,
  "origType": "LIMIT",
  "time": 1692849639460,
  "updateTime": 1692849639460
}
```

**Scenario D - A user has an order on the book with `EXPIRE_MAKER`, and then
sends a new order with `EXPIRE_TAKER` which would match with the existing
order.**

```xyz2
Maker Order: symbol=BTCUSDT side=BUY  type=LIMIT quantity=1 price=1 selfTradePreventionMode=EXPIRE_MAKER
Taker Order: symbol=BTCUSDT side=SELL type=LIMIT quantity=1 price=1 selfTradePreventionMode=EXPIRE_TAKER
```

**Result**: The taker order's STP mode will be used, so the taker order will be
expired.

Maker Order

```json
{
  "orderId": 292864710,
  "symbol": "BTCUSDT",
  "status": "NEW",
  "clientOrderId": "testMaker1",
  "price": "20002",
  "avgPrice": "0.0000",
  "origQty": "1",
  "executedQty": "0",
  "cumQuote": "0",
  "timeInForce": "GTC",
  "type": "LIMIT",
  "reduceOnly": false,
  "closePosition": false,
  "side": "BUY",
  "positionSide": "BOTH",
  "stopPrice": "0",
  "workingType": "CONTRACT_PRICE",
  "priceMatch": "NONE",
  "selfTradePreventionMode": "EXPIRE_MAKER",
  "goodTillDate": "null",
  "priceProtect": false,
  "origType": "LIMIT",
  "time": 1692849639460,
  "updateTime": 1692849639460
}
```

Taker Order

```json
{
  "orderId": 292864712,
  "symbol": "BTCUSDT",
  "status": "EXPIRED_IN_MATCH",
  "clientOrderId": "testTaker1",
  "price": "20000",
  "avgPrice": "0.0000",
  "origQty": "3",
  "executedQty": "0",
  "cumQuote": "0",
  "timeInForce": "GTC",
  "type": "LIMIT",
  "reduceOnly": false,
  "closePosition": false,
  "side": "SELL",
  "positionSide": "BOTH",
  "stopPrice": "0",
  "workingType": "CONTRACT_PRICE",
  "priceMatch": "NONE",
  "selfTradePreventionMode": "EXPIRE_TAKER",
  "goodTillDate": "null",
  "priceProtect": false,
  "origType": "LIMIT",
  "time": 1692849639460,
  "updateTime": 1692849639460
}
```

**Scenario E - A user sends a market order with `EXPIRE_MAKER` which would match
with an existing order.**

```xyz2
Maker Order: symbol=ABCDEF side=BUY  type=LIMIT  quantity=1 price=1  selfTradePreventionMode=EXPIRE_MAKER
Taker Order: symbol=ABCDEF side=SELL type=MARKET quantity=3          selfTradePreventionMode=EXPIRE_MAKER
```

**Result**: The existing order expires with the status `EXPIRED_IN_MATCH`, due
to STP. The new order also expires but with status `EXPIRED`, due to low
liquidity on the order book.

Maker Order

```json
{
  "orderId": 292864710,
  "symbol": "BTCUSDT",
  "status": "EXPIRED_IN_MATCH",
  "clientOrderId": "testMaker1",
  "price": "20002",
  "avgPrice": "0.0000",
  "origQty": "1",
  "executedQty": "0",
  "cumQuote": "0",
  "timeInForce": "GTC",
  "type": "LIMIT",
  "reduceOnly": false,
  "closePosition": false,
  "side": "BUY",
  "positionSide": "BOTH",
  "stopPrice": "0",
  "workingType": "CONTRACT_PRICE",
  "priceMatch": "NONE",
  "selfTradePreventionMode": "EXPIRE_MAKER",
  "goodTillDate": "null",
  "priceProtect": false,
  "origType": "LIMIT",
  "time": 1692849639460,
  "updateTime": 1692849639460
}
```

Taker Order

```json
{
  "orderId": 292864712,
  "symbol": "BTCUSDT",
  "status": "EXPIRED",
  "clientOrderId": "testTaker1",
  "price": "20000",
  "avgPrice": "0.0000",
  "origQty": "3",
  "executedQty": "0",
  "cumQuote": "0",
  "timeInForce": "GTC",
  "type": "LIMIT",
  "reduceOnly": false,
  "closePosition": false,
  "side": "SELL",
  "positionSide": "BOTH",
  "stopPrice": "0",
  "workingType": "CONTRACT_PRICE",
  "priceMatch": "NONE",
  "selfTradePreventionMode": "EXPIRE_MAKER",
  "goodTillDate": "null",
  "priceProtect": false,
  "origType": "LIMIT",
  "time": 1692849639460,
  "updateTime": 1692849639460
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/faq/stp-faq](https://developers.binance.com/docs/derivatives/usds-margined-futures/faq/stp-faq)

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

| Code | Name                                           | Description                                                                                                                                                                                                                                            |
| ---- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1000 | UNKNOWN​                                       | An unknown error occured while processing the request.                                                                                                                                                                                                 |
| 1001 | DISCONNECTED​                                  | Internal error; unable to process your request. Please try again.                                                                                                                                                                                      |
| 1002 | UNAUTHORIZED​                                  | You are not authorized to execute this request.                                                                                                                                                                                                        |
| 1003 | TOO_MANY_REQUESTS​                             | \- Too many requests; current limit is %s requests per minute. Please use the websocket for live updates to avoid polling the API. - Way too many requests; IP banned until %s. Please use the websocket for live updates to avoid bans.               |
| 1004 | DUPLICATE_IP​                                  | This IP is already on the white list                                                                                                                                                                                                                   |
| 1005 | NO_SUCH_IP​                                    | No such IP has been white listed                                                                                                                                                                                                                       |
| 1006 | UNEXPECTED_RESP​                               | An unexpected response was received from the message bus. Execution status unknown.                                                                                                                                                                    |
| 1007 | TIMEOUT​                                       | Timeout waiting for response from backend server. Send status unknown; execution status unknown.                                                                                                                                                       |
| 1010 | ERROR_MSG_RECEIVED​                            | ERROR_MSG_RECEIVED.                                                                                                                                                                                                                                    |
| 1011 | NON_WHITE_LIST​                                | This IP cannot access this route.                                                                                                                                                                                                                      |
| 1013 | INVALID_MESSAGE​                               | INVALID_MESSAGE.                                                                                                                                                                                                                                       |
| 1014 | UNKNOWN_ORDER_COMPOSITION​                     | Unsupported order combination.                                                                                                                                                                                                                         |
| 1015 | TOO_MANY_ORDERS​                               | \- Too many new orders. - Too many new orders; current limit is %s orders per %s.                                                                                                                                                                      |
| 1016 | SERVICE_SHUTTING_DOWN​                         | This service is no longer available.                                                                                                                                                                                                                   |
| 1020 | UNSUPPORTED_OPERATION​                         | This operation is not supported.                                                                                                                                                                                                                       |
| 1021 | INVALID_TIMESTAMP​                             | \- Timestamp for this request is outside of the recvWindow. - Timestamp for this request was 1000ms ahead of the server's time.                                                                                                                        |
| 1022 | INVALID_SIGNATURE​                             | Signature for this request is not valid.                                                                                                                                                                                                               |
| 1023 | START_TIME_GREATER_THAN_END_TIME​              | Start time is greater than end time.                                                                                                                                                                                                                   |
| 1099 | NOT_FOUND​                                     | Not found, unauthenticated, or unauthorized.                                                                                                                                                                                                           |
| 1100 | ILLEGAL_CHARS​                                 | \- Illegal characters found in a parameter. - Illegal characters found in parameter '%s'; legal range is '%s'.                                                                                                                                         |
| 1101 | TOO_MANY_PARAMETERS​                           | \- Too many parameters sent for this endpoint. - Too many parameters; expected '%s' and received '%s'. - Duplicate values for a parameter detected.                                                                                                    |
| 1102 | MANDATORY_PARAM_EMPTY_OR_MALFORMED​            | \- A mandatory parameter was not sent, was empty/null, or malformed. - Mandatory parameter '%s' was not sent, was empty/null, or malformed. - Param '%s' or '%s' must be sent, but both were empty/null!                                               |
| 1103 | UNKNOWN_PARAM​                                 | An unknown parameter was sent.                                                                                                                                                                                                                         |
| 1104 | UNREAD_PARAMETERS​                             | \- Not all sent parameters were read. - Not all sent parameters were read; read '%s' parameter(s) but was sent '%s'.                                                                                                                                   |
| 1105 | PARAM_EMPTY​                                   | \- A parameter was empty. - Parameter '%s' was empty.                                                                                                                                                                                                  |
| 1106 | PARAM_NOT_REQUIRED​                            | \- A parameter was sent when not required. - Parameter '%s' sent when not required.                                                                                                                                                                    |
| 1108 | BAD_ASSET​                                     | Invalid asset.                                                                                                                                                                                                                                         |
| 1109 | BAD_ACCOUNT​                                   | Invalid account.                                                                                                                                                                                                                                       |
| 1110 | BAD_INSTRUMENT_TYPE​                           | Invalid symbolType.                                                                                                                                                                                                                                    |
| 1111 | BAD_PRECISION​                                 | Precision is over the maximum defined for this asset.                                                                                                                                                                                                  |
| 1112 | NO_DEPTH​                                      | No orders on book for symbol.                                                                                                                                                                                                                          |
| 1113 | WITHDRAW_NOT_NEGATIVE​                         | Withdrawal amount must be negative.                                                                                                                                                                                                                    |
| 1114 | TIF_NOT_REQUIRED​                              | TimeInForce parameter sent when not required.                                                                                                                                                                                                          |
| 1115 | INVALID_TIF​                                   | Invalid timeInForce.                                                                                                                                                                                                                                   |
| 1116 | INVALID_ORDER_TYPE​                            | Invalid orderType.                                                                                                                                                                                                                                     |
| 1117 | INVALID_SIDE​                                  | Invalid side.                                                                                                                                                                                                                                          |
| 1118 | EMPTY_NEW_CL_ORD_ID​                           | New client order ID was empty.                                                                                                                                                                                                                         |
| 1119 | EMPTY_ORG_CL_ORD_ID​                           | Original client order ID was empty.                                                                                                                                                                                                                    |
| 1120 | BAD_INTERVAL​                                  | Invalid interval.                                                                                                                                                                                                                                      |
| 1121 | BAD_SYMBOL​                                    | Invalid symbol.                                                                                                                                                                                                                                        |
| 1122 | INVALID_SYMBOL_STATUS​                         | Invalid symbol status.                                                                                                                                                                                                                                 |
| 1125 | INVALID_LISTEN_KEY​                            | This listenKey does not exist. Please use `POST /fapi/v1/listenKey` to recreate `listenKey`                                                                                                                                                            |
| 1126 | ASSET_NOT_SUPPORTED​                           | This asset is not supported.                                                                                                                                                                                                                           |
| 1127 | MORE_THAN_XX_HOURS​                            | \- Lookup interval is too big. - More than %s hours between startTime and endTime.                                                                                                                                                                     |
| 1128 | OPTIONAL_PARAMS_BAD_COMBO​                     | Combination of optional parameters invalid.                                                                                                                                                                                                            |
| 1130 | INVALID_PARAMETER​                             | \- Invalid data sent for a parameter. - Data sent for parameter '%s' is not valid.                                                                                                                                                                     |
| 1136 | INVALID_NEW_ORDER_RESP_TYPE​                   | Invalid newOrderRespType.                                                                                                                                                                                                                              |
| 2010 | NEW_ORDER_REJECTED​                            | NEW_ORDER_REJECTED                                                                                                                                                                                                                                     |
| 2011 | CANCEL_REJECTED​                               | CANCEL_REJECTED                                                                                                                                                                                                                                        |
| 2012 | CANCEL_ALL_FAIL​                               | Batch cancel failure.                                                                                                                                                                                                                                  |
| 2013 | NO_SUCH_ORDER​                                 | Order does not exist.                                                                                                                                                                                                                                  |
| 2014 | BAD_API_KEY_FMT​                               | API-key format invalid.                                                                                                                                                                                                                                |
| 2015 | REJECTED_MBX_KEY​                              | Invalid API-key, IP, or permissions for action.                                                                                                                                                                                                        |
| 2016 | NO_TRADING_WINDOW​                             | No trading window could be found for the symbol. Try ticker/24hrs instead.                                                                                                                                                                             |
| 2017 | API_KEYS_LOCKED​                               | API Keys are locked on this account.                                                                                                                                                                                                                   |
| 2018 | BALANCE_NOT_SUFFICIENT​                        | Balance is insufficient.                                                                                                                                                                                                                               |
| 2019 | MARGIN_NOT_SUFFICIEN​                          | Margin is insufficient.                                                                                                                                                                                                                                |
| 2020 | UNABLE_TO_FILL​                                | Unable to fill.                                                                                                                                                                                                                                        |
| 2021 | ORDER_WOULD_IMMEDIATELY_TRIGGER​               | Order would immediately trigger.                                                                                                                                                                                                                       |
| 2022 | REDUCE_ONLY_REJECT​                            | ReduceOnly Order is rejected.                                                                                                                                                                                                                          |
| 2023 | USER_IN_LIQUIDATION​                           | User in liquidation mode now.                                                                                                                                                                                                                          |
| 2024 | POSITION_NOT_SUFFICIENT​                       | Position is not sufficient.                                                                                                                                                                                                                            |
| 2025 | MAX_OPEN_ORDER_EXCEEDED​                       | Reach max open order limit.                                                                                                                                                                                                                            |
| 2026 | REDUCE_ONLY_ORDER_TYPE_NOT_SUPPORTED​          | This OrderType is not supported when reduceOnly.                                                                                                                                                                                                       |
| 2027 | MAX_LEVERAGE_RATIO​                            | Exceeded the maximum allowable position at current leverage.                                                                                                                                                                                           |
| 2028 | MIN_LEVERAGE_RATIO​                            | Leverage is smaller than permitted: insufficient margin balance.                                                                                                                                                                                       |
| 4000 | INVALID_ORDER_STATUS​                          | Invalid order status.                                                                                                                                                                                                                                  |
| 4001 | PRICE_LESS_THAN_ZERO​                          | Price less than 0.                                                                                                                                                                                                                                     |
| 4002 | PRICE_GREATER_THAN_MAX_PRICE​                  | Price greater than max price.                                                                                                                                                                                                                          |
| 4003 | QTY_LESS_THAN_ZERO​                            | Quantity less than zero.                                                                                                                                                                                                                               |
| 4004 | QTY_LESS_THAN_MIN_QTY​                         | Quantity less than min quantity.                                                                                                                                                                                                                       |
| 4005 | QTY_GREATER_THAN_MAX_QTY​                      | Quantity greater than max quantity.                                                                                                                                                                                                                    |
| 4006 | STOP_PRICE_LESS_THAN_ZERO​                     | Stop price less than zero.                                                                                                                                                                                                                             |
| 4007 | STOP_PRICE_GREATER_THAN_MAX_PRICE​             | Stop price greater than max price.                                                                                                                                                                                                                     |
| 4008 | TICK_SIZE_LESS_THAN_ZERO​                      | Tick size less than zero.                                                                                                                                                                                                                              |
| 4009 | MAX_PRICE_LESS_THAN_MIN_PRICE​                 | Max price less than min price.                                                                                                                                                                                                                         |
| 4010 | MAX_QTY_LESS_THAN_MIN_QTY​                     | Max qty less than min qty.                                                                                                                                                                                                                             |
| 4011 | STEP_SIZE_LESS_THAN_ZERO​                      | Step size less than zero.                                                                                                                                                                                                                              |
| 4012 | MAX_NUM_ORDERS_LESS_THAN_ZERO​                 | Max mum orders less than zero.                                                                                                                                                                                                                         |
| 4013 | PRICE_LESS_THAN_MIN_PRICE​                     | Price less than min price.                                                                                                                                                                                                                             |
| 4014 | PRICE_NOT_INCREASED_BY_TICK_SIZE​              | Price not increased by tick size.                                                                                                                                                                                                                      |
| 4015 | INVALID_CL_ORD_ID_LEN​                         | \- Client order id is not valid. - Client order id length should not be more than 36 chars                                                                                                                                                             |
| 4016 | PRICE_HIGHTER_THAN_MULTIPLIER_UP​              | Price is higher than mark price multiplier cap.                                                                                                                                                                                                        |
| 4017 | MULTIPLIER_UP_LESS_THAN_ZERO​                  | Multiplier up less than zero.                                                                                                                                                                                                                          |
| 4018 | MULTIPLIER_DOWN_LESS_THAN_ZERO​                | Multiplier down less than zero.                                                                                                                                                                                                                        |
| 4019 | COMPOSITE_SCALE_OVERFLOW​                      | Composite scale too large.                                                                                                                                                                                                                             |
| 4020 | TARGET_STRATEGY_INVALID​                       | Target strategy invalid for orderType '%s',reduceOnly '%b'.                                                                                                                                                                                            |
| 4021 | INVALID_DEPTH_LIMIT​                           | \- Invalid depth limit. - '%s' is not valid depth limit.                                                                                                                                                                                               |
| 4022 | WRONG_MARKET_STATUS​                           | market status sent is not valid.                                                                                                                                                                                                                       |
| 4023 | QTY_NOT_INCREASED_BY_STEP_SIZE​                | Qty not increased by step size.                                                                                                                                                                                                                        |
| 4024 | PRICE_LOWER_THAN_MULTIPLIER_DOWN​              | Price is lower than mark price multiplier floor.                                                                                                                                                                                                       |
| 4025 | MULTIPLIER_DECIMAL_LESS_THAN_ZERO​             | Multiplier decimal less than zero.                                                                                                                                                                                                                     |
| 4026 | COMMISSION_INVALID​                            | \- Commission invalid. - `%s` less than zero. - `%s` absolute value greater than `%s`                                                                                                                                                                  |
| 4027 | INVALID_ACCOUNT_TYPE​                          | Invalid account type.                                                                                                                                                                                                                                  |
| 4028 | INVALID_LEVERAGE​                              | \- Invalid leverage - Leverage `%s` is not valid - Leverage `%s` already exist with `%s`                                                                                                                                                               |
| 4029 | INVALID_TICK_SIZE_PRECISION​                   | Tick size precision is invalid.                                                                                                                                                                                                                        |
| 4030 | INVALID_STEP_SIZE_PRECISION​                   | Step size precision is invalid.                                                                                                                                                                                                                        |
| 4031 | INVALID_WORKING_TYPE​                          | \- Invalid parameter working type - Invalid parameter working type: `%s`                                                                                                                                                                               |
| 4032 | EXCEED_MAX_CANCEL_ORDER_SIZE​                  | \- Exceed maximum cancel order size. - Invalid parameter working type: `%s`                                                                                                                                                                            |
| 4033 | INSURANCE_ACCOUNT_NOT_FOUND​                   | Insurance account not found.                                                                                                                                                                                                                           |
| 4044 | INVALID_BALANCE_TYPE​                          | Balance Type is invalid.                                                                                                                                                                                                                               |
| 4045 | MAX_STOP_ORDER_EXCEEDED​                       | Reach max stop order limit.                                                                                                                                                                                                                            |
| 4046 | NO_NEED_TO_CHANGE_MARGIN_TYPE​                 | No need to change margin type.                                                                                                                                                                                                                         |
| 4047 | THERE_EXISTS_OPEN_ORDERS​                      | Margin type cannot be changed if there exists open orders.                                                                                                                                                                                             |
| 4048 | THERE_EXISTS_QUANTITY​                         | Margin type cannot be changed if there exists position.                                                                                                                                                                                                |
| 4049 | ADD_ISOLATED_MARGIN_REJECT​                    | Add margin only support for isolated position.                                                                                                                                                                                                         |
| 4050 | CROSS_BALANCE_INSUFFICIENT​                    | Cross balance insufficient.                                                                                                                                                                                                                            |
| 4051 | ISOLATED_BALANCE_INSUFFICIENT​                 | Isolated balance insufficient.                                                                                                                                                                                                                         |
| 4052 | NO_NEED_TO_CHANGE_AUTO_ADD_MARGIN​             | No need to change auto add margin.                                                                                                                                                                                                                     |
| 4053 | AUTO_ADD_CROSSED_MARGIN_REJECT​                | Auto add margin only support for isolated position.                                                                                                                                                                                                    |
| 4054 | ADD_ISOLATED_MARGIN_NO_POSITION_REJECT​        | Cannot add position margin: position is 0.                                                                                                                                                                                                             |
| 4055 | AMOUNT_MUST_BE_POSITIVE​                       | Amount must be positive.                                                                                                                                                                                                                               |
| 4056 | INVALID_API_KEY_TYPE​                          | Invalid api key type.                                                                                                                                                                                                                                  |
| 4057 | INVALID_RSA_PUBLIC_KEY​                        | Invalid api public key                                                                                                                                                                                                                                 |
| 4058 | MAX_PRICE_TOO_LARGE​                           | maxPrice and priceDecimal too large,please check.                                                                                                                                                                                                      |
| 4059 | NO_NEED_TO_CHANGE_POSITION_SIDE​               | No need to change position side.                                                                                                                                                                                                                       |
| 4060 | INVALID_POSITION_SIDE​                         | Invalid position side.                                                                                                                                                                                                                                 |
| 4061 | POSITION_SIDE_NOT_MATCH​                       | Order's position side does not match user's setting.                                                                                                                                                                                                   |
| 4062 | REDUCE_ONLY_CONFLICT​                          | Invalid or improper reduceOnly value.                                                                                                                                                                                                                  |
| 4063 | INVALID_OPTIONS_REQUEST_TYPE​                  | Invalid options request type                                                                                                                                                                                                                           |
| 4064 | INVALID_OPTIONS_TIME_FRAME​                    | Invalid options time frame                                                                                                                                                                                                                             |
| 4065 | INVALID_OPTIONS_AMOUNT​                        | Invalid options amount                                                                                                                                                                                                                                 |
| 4066 | INVALID_OPTIONS_EVENT_TYPE​                    | Invalid options event type                                                                                                                                                                                                                             |
| 4067 | POSITION_SIDE_CHANGE_EXISTS_OPEN_ORDERS​       | Position side cannot be changed if there exists open orders.                                                                                                                                                                                           |
| 4068 | POSITION_SIDE_CHANGE_EXISTS_QUANTITY​          | Position side cannot be changed if there exists position.                                                                                                                                                                                              |
| 4069 | INVALID_OPTIONS_PREMIUM_FEE​                   | Invalid options premium fee                                                                                                                                                                                                                            |
| 4070 | INVALID_CL_OPTIONS_ID_LEN​                     | \- Client options id is not valid. - Client options id length should be less than 32 chars                                                                                                                                                             |
| 4071 | INVALID_OPTIONS_DIRECTION​                     | Invalid options direction                                                                                                                                                                                                                              |
| 4072 | OPTIONS_PREMIUM_NOT_UPDATE​                    | premium fee is not updated, reject order                                                                                                                                                                                                               |
| 4073 | OPTIONS_PREMIUM_INPUT_LESS_THAN_ZERO​          | input premium fee is less than 0, reject order                                                                                                                                                                                                         |
| 4074 | OPTIONS_AMOUNT_BIGGER_THAN_UPPER​              | Order amount is bigger than upper boundary or less than 0, reject order                                                                                                                                                                                |
| 4075 | OPTIONS_PREMIUM_OUTPUT_ZERO​                   | output premium fee is less than 0, reject order                                                                                                                                                                                                        |
| 4076 | OPTIONS_PREMIUM_TOO_DIFF​                      | original fee is too much higher than last fee                                                                                                                                                                                                          |
| 4077 | OPTIONS_PREMIUM_REACH_LIMIT​                   | place order amount has reached to limit, reject order                                                                                                                                                                                                  |
| 4078 | OPTIONS_COMMON_ERROR​                          | options internal error                                                                                                                                                                                                                                 |
| 4079 | INVALID_OPTIONS_ID​                            | \- invalid options id - invalid options id: %s - duplicate options id %d for user %d                                                                                                                                                                   |
| 4080 | OPTIONS_USER_NOT_FOUND​                        | \- user not found - user not found with id: %s                                                                                                                                                                                                         |
| 4081 | OPTIONS_NOT_FOUND​                             | \- options not found - options not found with id: %s                                                                                                                                                                                                   |
| 4082 | INVALID_BATCH_PLACE_ORDER_SIZE​                | \- Invalid number of batch place orders. - Invalid number of batch place orders: %s                                                                                                                                                                    |
| 4083 | PLACE_BATCH_ORDERS_FAIL​                       | Fail to place batch orders.                                                                                                                                                                                                                            |
| 4084 | UPCOMING_METHOD​                               | Method is not allowed currently. Upcoming soon.                                                                                                                                                                                                        |
| 4085 | INVALID_NOTIONAL_LIMIT_COEF​                   | Invalid notional limit coefficient                                                                                                                                                                                                                     |
| 4086 | INVALID_PRICE_SPREAD_THRESHOLD​                | Invalid price spread threshold                                                                                                                                                                                                                         |
| 4087 | REDUCE_ONLY_ORDER_PERMISSION​                  | User can only place reduce only order                                                                                                                                                                                                                  |
| 4088 | NO_PLACE_ORDER_PERMISSION​                     | User can not place order currently                                                                                                                                                                                                                     |
| 4104 | INVALID_CONTRACT_TYPE​                         | Invalid contract type                                                                                                                                                                                                                                  |
| 4114 | INVALID_CLIENT_TRAN_ID_LEN​                    | \- clientTranId is not valid - Client tran id length should be less than 64 chars                                                                                                                                                                      |
| 4115 | DUPLICATED_CLIENT_TRAN_ID​                     | \- clientTranId is duplicated - Client tran id should be unique within 7 days                                                                                                                                                                          |
| 4116 | DUPLICATED_CLIENT_ORDER_ID​                    | clientOrderId is duplicated                                                                                                                                                                                                                            |
| 4117 | STOP_ORDER_TRIGGERING​                         | stop order is triggering                                                                                                                                                                                                                               |
| 4118 | REDUCE_ONLY_MARGIN_CHECK_FAILED​               | ReduceOnly Order Failed. Please check your existing position and open orders                                                                                                                                                                           |
| 4131 | MARKET_ORDER_REJECT​                           | The counterparty's best price does not meet the PERCENT_PRICE filter limit                                                                                                                                                                             |
| 4135 | INVALID_ACTIVATION_PRICE​                      | Invalid activation price                                                                                                                                                                                                                               |
| 4137 | QUANTITY_EXISTS_WITH_CLOSE_POSITION​           | Quantity must be zero with closePosition equals true                                                                                                                                                                                                   |
| 4138 | REDUCE_ONLY_MUST_BE_TRUE​                      | Reduce only must be true with closePosition equals true                                                                                                                                                                                                |
| 4139 | ORDER_TYPE_CANNOT_BE_MKT​                      | Order type can not be market if it's unable to cancel                                                                                                                                                                                                  |
| 4140 | INVALID_OPENING_POSITION_STATUS​               | Invalid symbol status for opening position                                                                                                                                                                                                             |
| 4141 | SYMBOL_ALREADY_CLOSED​                         | Symbol is closed                                                                                                                                                                                                                                       |
| 4142 | STRATEGY_INVALID_TRIGGER_PRICE​                | REJECT: take profit or stop order will be triggered immediately                                                                                                                                                                                        |
| 4144 | INVALID_PAIR​                                  | Invalid pair                                                                                                                                                                                                                                           |
| 4161 | ISOLATED_LEVERAGE_REJECT_WITH_POSITION​        | Leverage reduction is not supported in Isolated Margin Mode with open positions                                                                                                                                                                        |
| 4164 | MIN_NOTIONAL​                                  | \- Order's notional must be no smaller than 5.0 (unless you choose reduce only) - Order's notional must be no smaller than %s (unless you choose reduce only)                                                                                          |
| 4165 | INVALID_TIME_INTERVAL​                         | \- Invalid time interval - Maximum time interval is %s days                                                                                                                                                                                            |
| 4167 | ISOLATED_REJECT_WITH_JOINT_MARGIN​             | Unable to adjust to Multi-Assets mode with symbols of USDⓈ-M Futures under isolated-margin mode.                                                                                                                                                       |
| 4168 | JOINT_MARGIN_REJECT_WITH_ISOLATED​             | Unable to adjust to isolated-margin mode under the Multi-Assets mode.                                                                                                                                                                                  |
| 4169 | JOINT_MARGIN_REJECT_WITH_MB​                   | Unable to adjust Multi-Assets Mode with insufficient margin balance in USDⓈ-M Futures.                                                                                                                                                                 |
| 4170 | JOINT_MARGIN_REJECT_WITH_OPEN_ORDER​           | Unable to adjust Multi-Assets Mode with open orders in USDⓈ-M Futures.                                                                                                                                                                                 |
| 4171 | NO_NEED_TO_CHANGE_JOINT_MARGIN​                | Adjusted asset mode is currently set and does not need to be adjusted repeatedly.                                                                                                                                                                      |
| 4172 | JOINT_MARGIN_REJECT_WITH_NEGATIVE_BALANCE​     | Unable to adjust Multi-Assets Mode with a negative wallet balance of margin available asset in USDⓈ-M Futures account.                                                                                                                                 |
| 4183 | ISOLATED_REJECT_WITH_JOINT_MARGIN​             | \- Price is higher than stop price multiplier cap. - Limit price can't be higher than %s.                                                                                                                                                              |
| 4184 | PRICE_LOWER_THAN_STOP_MULTIPLIER_DOWN​         | \- Price is lower than stop price multiplier floor. - Limit price can't be lower than %s.                                                                                                                                                              |
| 4192 | COOLING_OFF_PERIOD​                            | Trade forbidden due to Cooling-off Period.                                                                                                                                                                                                             |
| 4202 | ADJUST_LEVERAGE_KYC_FAILED​                    | Intermediate Personal Verification is required for adjusting leverage over 20x                                                                                                                                                                         |
| 4203 | ADJUST_LEVERAGE_ONE_MONTH_FAILED​              | More than 20x leverage is available one month after account registration.                                                                                                                                                                              |
| 4205 | ADJUST_LEVERAGE_X_DAYS_FAILED​                 | More than 20x leverage is available %s days after Futures account registration.                                                                                                                                                                        |
| 4206 | ADJUST_LEVERAGE_KYC_LIMIT​                     | \- Users in this country has limited adjust leverage. - Users in your location/country can only access a maximum leverage of %s                                                                                                                        |
| 4208 | ADJUST_LEVERAGE_ACCOUNT_SYMBOL_FAILED​         | Current symbol leverage cannot exceed 20 when using position limit adjustment service.                                                                                                                                                                 |
| 4209 | ADJUST_LEVERAGE_SYMBOL_FAILED​                 | \- The max leverage of Symbol is 20x - Leverage adjustment failed. Current symbol max leverage limit is %sx                                                                                                                                            |
| 4210 | STOP_PRICE_HIGHER_THAN_PRICE_MULTIPLIER_LIMIT​ | \- Stop price is higher than price multiplier cap. - Stop price can't be higher than %s                                                                                                                                                                |
| 4211 | STOP_PRICE_LOWER_THAN_PRICE_MULTIPLIER_LIMIT​  | \- Stop price is lower than price multiplier floor. - Stop price can't be lower than %s                                                                                                                                                                |
| 4400 | TRADING_QUANTITATIVE_RULE​                     | Futures Trading Quantitative Rules violated, only reduceOnly order is allowed, please try again later.                                                                                                                                                 |
| 4401 | LARGE_POSITION_SYM_RULE​                       | Futures Trading Risk Control Rules of large position holding violated, only reduceOnly order is allowed, please reduce the position. .                                                                                                                 |
| 4402 | COMPLIANCE_BLACK_SYMBOL_RESTRICTION​           | Dear user, as per our Terms of Use and compliance with local regulations, this feature is currently not available in your region.                                                                                                                      |
| 4403 | ADJUST_LEVERAGE_COMPLIANCE_FAILED​             | \- Dear user, as per our Terms of Use and compliance with local regulations, the leverage can only up to 10x in your region - Dear user, as per our Terms of Use and compliance with local regulations, the leverage can only up to %sx in your region |
| 5021 | FOK_ORDER_REJECT​                              | Due to the order could not be filled immediately, the FOK order has been rejected.                                                                                                                                                                     |
| 5022 | GTX_ORDER_REJECT​                              | Due to the order could not be executed as maker, the Post Only order will be rejected.                                                                                                                                                                 |
| 5024 | MOVE_ORDER_NOT_ALLOWED_SYMBOL_REASON​          | Symbol is not in trading status. Order amendment is not permitted.                                                                                                                                                                                     |
| 5025 | LIMIT_ORDER_ONLY​                              | Only limit order is supported.                                                                                                                                                                                                                         |
| 5026 | Exceed_Maximum_Modify_Order_Limit​             | Exceed maximum modify order limit.                                                                                                                                                                                                                     |
| 5027 | SAME_ORDER​                                    | No need to modify the order.                                                                                                                                                                                                                           |
| 5028 | ME_RECVWINDOW_REJECT​                          | Timestamp for this request is outside of the ME recvWindow.                                                                                                                                                                                            |
| 5029 | MODIFICATION_MIN_NOTIONAL​                     | Order's notional must be no smaller than %s                                                                                                                                                                                                            |
| 5037 | INVALID_PRICE_MATCH​                           | Invalid price match                                                                                                                                                                                                                                    |
| 5038 | UNSUPPORTED_ORDER_TYPE_PRICE_MATCH​            | Price match only supports order type: LIMIT, STOP AND TAKE_PROFIT                                                                                                                                                                                      |
| 5039 | INVALID_SELF_TRADE_PREVENTION_MODE​            | Invalid self trade prevention mode                                                                                                                                                                                                                     |
| 5040 | FUTURE_GOOD_TILL_DATE​                         | The goodTillDate timestamp must be greater than the current time plus 600 seconds and smaller than 253402300799000 (UTC 9999-12-31 23:59:59)                                                                                                           |
| 5041 | BBO_ORDER_REJECT​                              | No depth matches this BBO order                                                                                                                                                                                                                        |

### 10xx - General Server or Network issues

### 11xx - Request issues

### 20xx - Processing Issues

### 40xx - Filters and other Issues

### 50xx - Order Execution Issues

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/error-code](https://developers.binance.com/docs/derivatives/usds-margined-futures/error-code)

## New Order(TRADE)

### API Description

Send in a new order.

### HTTP Request

POST `/fapi/v1/order`

### Request Weight

1 on 10s order rate limit(X-MBX-ORDER-COUNT-10S); 1 on 1min order rate
limit(X-MBX-ORDER-COUNT-1M); 0 on IP rate limit(x-mbx-used-weight-1m)

### Request Parameters

| Name                    | Type    | Mandatory | Description                                                                                                                                                                                                                                                                              |
| ----------------------- | ------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol                  | STRING  | YES       |                                                                                                                                                                                                                                                                                          |
| side                    | ENUM    | YES       |                                                                                                                                                                                                                                                                                          |
| positionSide            | ENUM    | NO        | Default `BOTH` for One-way Mode ; `LONG` or `SHORT` for Hedge Mode. It must be sent in Hedge Mode.                                                                                                                                                                                       |
| type                    | ENUM    | YES       |                                                                                                                                                                                                                                                                                          |
| timeInForce             | ENUM    | NO        |                                                                                                                                                                                                                                                                                          |
| quantity                | DECIMAL | NO        | Cannot be sent with `closePosition`\=`true`(Close-All)                                                                                                                                                                                                                                   |
| reduceOnly              | STRING  | NO        | "true" or "false". default "false". Cannot be sent in Hedge Mode; cannot be sent with `closePosition`\=`true`                                                                                                                                                                            |
| price                   | DECIMAL | NO        |                                                                                                                                                                                                                                                                                          |
| newClientOrderId        | STRING  | NO        | A unique id among open orders. Automatically generated if not sent. Can only be string following the rule: `^[\.A-Z\:/a-z0-9_-]{1,36}$`                                                                                                                                                  |
| stopPrice               | DECIMAL | NO        | Used with `STOP/STOP_MARKET` or `TAKE_PROFIT/TAKE_PROFIT_MARKET` orders.                                                                                                                                                                                                                 |
| closePosition           | STRING  | NO        | `true`, `false`；Close-All，used with `STOP_MARKET` or `TAKE_PROFIT_MARKET`.                                                                                                                                                                                                             |
| activationPrice         | DECIMAL | NO        | Used with `TRAILING_STOP_MARKET` orders, default as the latest price(supporting different `workingType`)                                                                                                                                                                                 |
| callbackRate            | DECIMAL | NO        | Used with `TRAILING_STOP_MARKET` orders, min 0.1, max 10 where 1 for 1%                                                                                                                                                                                                                  |
| workingType             | ENUM    | NO        | stopPrice triggered by: "MARK_PRICE", "CONTRACT_PRICE". Default "CONTRACT_PRICE"                                                                                                                                                                                                         |
| priceProtect            | STRING  | NO        | "TRUE" or "FALSE", default "FALSE". Used with `STOP/STOP_MARKET` or `TAKE_PROFIT/TAKE_PROFIT_MARKET` orders.                                                                                                                                                                             |
| newOrderRespType        | ENUM    | NO        | "ACK", "RESULT", default "ACK"                                                                                                                                                                                                                                                           |
| priceMatch              | ENUM    | NO        | only avaliable for `LIMIT`/`STOP`/`TAKE_PROFIT` order; can be set to `OPPONENT`/ `OPPONENT_5`/ `OPPONENT_10`/ `OPPONENT_20`: /`QUEUE`/ `QUEUE_5`/ `QUEUE_10`/ `QUEUE_20`; Can't be passed together with `price`                                                                          |
| selfTradePreventionMode | ENUM    | NO        | `EXPIRE_TAKER`:expire taker order when STP triggers/ `EXPIRE_MAKER`:expire taker order when STP triggers/ `EXPIRE_BOTH`:expire both orders when STP triggers; default `NONE`                                                                                                             |
| goodTillDate            | LONG    | NO        | order cancel time for timeInForce `GTD`, mandatory when `timeInforce` set to `GTD`; order the timestamp only retains second-level precision, ms part will be ignored; The goodTillDate timestamp must be greater than the current time plus 600 seconds and smaller than 253402300799000 |
| recvWindow              | LONG    | NO        |                                                                                                                                                                                                                                                                                          |
| timestamp               | LONG    | YES       |                                                                                                                                                                                                                                                                                          |

Additional mandatory parameters based on `type`:

| Type                             | Additional mandatory parameters    |
| -------------------------------- | ---------------------------------- |
| `LIMIT`                          | `timeInForce`, `quantity`, `price` |
| `MARKET`                         | `quantity`                         |
| `STOP/TAKE_PROFIT`               | `quantity`, `price`, `stopPrice`   |
| `STOP_MARKET/TAKE_PROFIT_MARKET` | `stopPrice`                        |
| `TRAILING_STOP_MARKET`           | `callbackRate`                     |

> - Order with type `STOP`, parameter `timeInForce` can be sent ( default
>   `GTC`).
> - Order with type `TAKE_PROFIT`, parameter `timeInForce` can be sent ( default
>   `GTC`).
> - Condition orders will be triggered when:
>
>   - If parameter`priceProtect`is sent as true:
>     - when price reaches the `stopPrice` ，the difference rate between
>       "MARK_PRICE" and "CONTRACT_PRICE" cannot be larger than the
>       "triggerProtect" of the symbol
>     - "triggerProtect" of a symbol can be got from `GET /fapi/v1/exchangeInfo`
>   - `STOP`, `STOP_MARKET`:
>     - BUY: latest price ("MARK_PRICE" or "CONTRACT_PRICE") >= `stopPrice`
>     - SELL: latest price ("MARK_PRICE" or "CONTRACT_PRICE") <= `stopPrice`
>   - `TAKE_PROFIT`, `TAKE_PROFIT_MARKET`:
>     - BUY: latest price ("MARK_PRICE" or "CONTRACT_PRICE") <= `stopPrice`
>     - SELL: latest price ("MARK_PRICE" or "CONTRACT_PRICE") >= `stopPrice`
>   - `TRAILING_STOP_MARKET`:
>     - BUY: the lowest price after order placed `<=`
>       activationPrice`, and the latest price >`\= the lowest price \* (1 +
>       `callbackRate`)
>     - SELL: the highest price after order placed >= `activationPrice`, and the
>       latest price <= the highest price \* (1 - `callbackRate`)
>
> - For `TRAILING_STOP_MARKET`, if you got such error code.  
>   `{"code": -2021, "msg": "Order would immediately trigger."}`  
>   means that the parameters you send do not meet the following requirements:
>
>   - BUY: `activationPrice` should be smaller than latest price.
>   - SELL: `activationPrice` should be larger than latest price.
>
> - If `newOrderRespType` is sent as `RESULT` :
>
>   - `MARKET` order: the final FILLED result of the order will be return
>     directly.
>   - `LIMIT` order with special `timeInForce`: the final status result of the
>     order(FILLED or EXPIRED) will be returned directly.
>
> - `STOP_MARKET`, `TAKE_PROFIT_MARKET` with `closePosition`\=`true`:
>
>   - Follow the same rules for condition orders.
>   - If triggered，**close all** current long position( if `SELL`) or current
>     short position( if `BUY`).
>   - Cannot be used with `quantity` paremeter
>   - Cannot be used with `reduceOnly` parameter
>   - In Hedge Mode,cannot be used with `BUY` orders in `LONG` position side.
>     and cannot be used with `SELL` orders in `SHORT` position side
>
> - `selfTradePreventionMode` is only effective when `timeInForce` set to `IOC`
>   or `GTC` or `GTD`.
> - In extreme market conditions, timeInForce `GTD` order auto cancel time might
>   be delayed comparing to `goodTillDate`

### Response Example

```json
{
  "clientOrderId": "testOrder",
  "cumQty": "0",
  "cumQuote": "0",
  "executedQty": "0",
  "orderId": 22542179,
  "avgPrice": "0.00000",
  "origQty": "10",
  "price": "0",
  "reduceOnly": false,
  "side": "BUY",
  "positionSide": "SHORT",
  "status": "NEW",
  "stopPrice": "9300", // please ignore when order type is TRAILING_STOP_MARKET
  "closePosition": false, // if Close-All
  "symbol": "BTCUSDT",
  "timeInForce": "GTD",
  "type": "TRAILING_STOP_MARKET",
  "origType": "TRAILING_STOP_MARKET",
  "activatePrice": "9020", // activation price, only return with TRAILING_STOP_MARKET order
  "priceRate": "0.3", // callback rate, only return with TRAILING_STOP_MARKET order
  "updateTime": 1566818724722,
  "workingType": "CONTRACT_PRICE",
  "priceProtect": false, // if conditional order trigger is protected
  "priceMatch": "NONE", //price match mode
  "selfTradePreventionMode": "NONE", //self trading preventation mode
  "goodTillDate": 1693207680000 //order pre-set auot cancel time for TIF GTD order
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api)

## Place Multiple Orders(TRADE)

### API Description

Place Multiple Orders

### HTTP Request

POST `/fapi/v1/batchOrders`

### Request Weight

5 on 10s order rate limit(X-MBX-ORDER-COUNT-10S); 1 on 1min order rate
limit(X-MBX-ORDER-COUNT-1M); 5 on IP rate limit(x-mbx-used-weight-1m);

### Request Parameters

| Name        | Type       | Mandatory | Description              |
| ----------- | ---------- | --------- | ------------------------ |
| batchOrders | LIST<JSON> | YES       | order list. Max 5 orders |
| recvWindow  | LONG       | NO        |                          |
| timestamp   | LONG       | YES       |                          |

**Where `batchOrders` is the list of order parameters in JSON**

- **Example:**
  /fapi/v1/batchOrders?batchOrders=\[{"type":"LIMIT","timeInForce":"GTC",  
  "symbol":"BTCUSDT","side":"BUY","price":"10001","quantity":"0.001"}\]

| Name                    | Type    | Mandatory | Description                                                                                                                                                                                                                                                                              |
| ----------------------- | ------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol                  | STRING  | YES       |                                                                                                                                                                                                                                                                                          |
| side                    | ENUM    | YES       |                                                                                                                                                                                                                                                                                          |
| positionSide            | ENUM    | NO        | Default `BOTH` for One-way Mode ; `LONG` or `SHORT` for Hedge Mode. It must be sent with Hedge Mode.                                                                                                                                                                                     |
| type                    | ENUM    | YES       |                                                                                                                                                                                                                                                                                          |
| timeInForce             | ENUM    | NO        |                                                                                                                                                                                                                                                                                          |
| quantity                | DECIMAL | YES       |                                                                                                                                                                                                                                                                                          |
| reduceOnly              | STRING  | NO        | "true" or "false". default "false".                                                                                                                                                                                                                                                      |
| price                   | DECIMAL | NO        |                                                                                                                                                                                                                                                                                          |
| newClientOrderId        | STRING  | NO        | A unique id among open orders. Automatically generated if not sent. Can only be string following the rule: `^[\.A-Z\:/a-z0-9_-]{1,36}$`                                                                                                                                                  |
| stopPrice               | DECIMAL | NO        | Used with `STOP/STOP_MARKET` or `TAKE_PROFIT/TAKE_PROFIT_MARKET` orders.                                                                                                                                                                                                                 |
| activationPrice         | DECIMAL | NO        | Used with `TRAILING_STOP_MARKET` orders, default as the latest price(supporting different `workingType`)                                                                                                                                                                                 |
| callbackRate            | DECIMAL | NO        | Used with `TRAILING_STOP_MARKET` orders, min 0.1, max 4 where 1 for 1%                                                                                                                                                                                                                   |
| workingType             | ENUM    | NO        | stopPrice triggered by: "MARK_PRICE", "CONTRACT_PRICE". Default "CONTRACT_PRICE"                                                                                                                                                                                                         |
| priceProtect            | STRING  | NO        | "TRUE" or "FALSE", default "FALSE". Used with `STOP/STOP_MARKET` or `TAKE_PROFIT/TAKE_PROFIT_MARKET` orders.                                                                                                                                                                             |
| newOrderRespType        | ENUM    | NO        | "ACK", "RESULT", default "ACK"                                                                                                                                                                                                                                                           |
| priceMatch              | ENUM    | NO        | only avaliable for `LIMIT`/`STOP`/`TAKE_PROFIT` order; can be set to `OPPONENT`/ `OPPONENT_5`/ `OPPONENT_10`/ `OPPONENT_20`: /`QUEUE`/ `QUEUE_5`/ `QUEUE_10`/ `QUEUE_20`; Can't be passed together with `price`                                                                          |
| selfTradePreventionMode | ENUM    | NO        | `EXPIRE_TAKER`:expire taker order when STP triggers/ `EXPIRE_MAKER`:expire taker order when STP triggers/ `EXPIRE_BOTH`:expire both orders when STP triggers; default `NONE`                                                                                                             |
| goodTillDate            | LONG    | NO        | order cancel time for timeInForce `GTD`, mandatory when `timeInforce` set to `GTD`; order the timestamp only retains second-level precision, ms part will be ignored; The goodTillDate timestamp must be greater than the current time plus 600 seconds and smaller than 253402300799000 |

> - Paremeter rules are same with `New Order`
> - Batch orders are processed concurrently, and the order of matching is not
>   guaranteed.
> - The order of returned contents for batch orders is the same as the order of
>   the order list.

### Response Example

```json
[
  {
    "clientOrderId": "testOrder",
    "cumQty": "0",
    "cumQuote": "0",
    "executedQty": "0",
    "orderId": 22542179,
    "avgPrice": "0.00000",
    "origQty": "10",
    "price": "0",
    "reduceOnly": false,
    "side": "BUY",
    "positionSide": "SHORT",
    "status": "NEW",
    "stopPrice": "9300", // please ignore when order type is TRAILING_STOP_MARKET
    "symbol": "BTCUSDT",
    "timeInForce": "GTC",
    "type": "TRAILING_STOP_MARKET",
    "origType": "TRAILING_STOP_MARKET",
    "activatePrice": "9020", // activation price, only return with TRAILING_STOP_MARKET order
    "priceRate": "0.3", // callback rate, only return with TRAILING_STOP_MARKET order
    "updateTime": 1566818724722,
    "workingType": "CONTRACT_PRICE",
    "priceProtect": false, // if conditional order trigger is protected
    "priceMatch": "NONE", //price match mode
    "selfTradePreventionMode": "NONE", //self trading preventation mode
    "goodTillDate": 1693207680000 //order pre-set auot cancel time for TIF GTD order
  },
  {
    "code": -2022,
    "msg": "ReduceOnly Order is rejected."
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Place-Multiple-Orders](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Place-Multiple-Orders)

## Modify Order (TRADE)

### API Description

Order modify function, currently only LIMIT order modification is supported,
modified orders will be reordered in the match queue

### HTTP Request

PUT `/fapi/v1/order`

### Request Weight

1 on 10s order rate limit(X-MBX-ORDER-COUNT-10S); 1 on 1min order rate
limit(X-MBX-ORDER-COUNT-1M); 1 on IP rate limit(x-mbx-used-weight-1m)

### Request Parameters

| Name              | Type    | Mandatory | Description                                                                                                                                                                                                     |
| ----------------- | ------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orderId           | LONG    | NO        |                                                                                                                                                                                                                 |
| origClientOrderId | STRING  | NO        |                                                                                                                                                                                                                 |
| symbol            | STRING  | YES       |                                                                                                                                                                                                                 |
| side              | ENUM    | YES       | `SELL`, `BUY`                                                                                                                                                                                                   |
| quantity          | DECIMAL | YES       | Order quantity, cannot be sent with `closePosition=true`                                                                                                                                                        |
| price             | DECIMAL | YES       |                                                                                                                                                                                                                 |
| priceMatch        | ENUM    | NO        | only avaliable for `LIMIT`/`STOP`/`TAKE_PROFIT` order; can be set to `OPPONENT`/ `OPPONENT_5`/ `OPPONENT_10`/ `OPPONENT_20`: /`QUEUE`/ `QUEUE_5`/ `QUEUE_10`/ `QUEUE_20`; Can't be passed together with `price` |
| recvWindow        | LONG    | NO        |                                                                                                                                                                                                                 |
| timestamp         | LONG    | YES       |                                                                                                                                                                                                                 |

> - Either `orderId` or `origClientOrderId` must be sent, and the `orderId` will
>   prevail if both are sent.
> - Both `quantity` and `price` must be sent, which is different from dapi
>   modify order endpoint.
> - When the new `quantity` or `price` doesn't satisfy PRICE_FILTER /
>   PERCENT_FILTER / LOT_SIZE, amendment will be rejected and the order will
>   stay as it is.
> - However the order will be cancelled by the amendment in the following
>   situations:
>   - when the order is in partially filled status and the new `quantity` <=
>     `executedQty`
>   - When the order is `GTX` and the new price will cause it to be executed
>     immediately
> - One order can only be modfied for less than 10000 times

### Response Example

```json
{
  "orderId": 20072994037,
  "symbol": "BTCUSDT",
  "pair": "BTCUSDT",
  "status": "NEW",
  "clientOrderId": "LJ9R4QZDihCaS8UAOOLpgW",
  "price": "30005",
  "avgPrice": "0.0",
  "origQty": "1",
  "executedQty": "0",
  "cumQty": "0",
  "cumBase": "0",
  "timeInForce": "GTC",
  "type": "LIMIT",
  "reduceOnly": false,
  "closePosition": false,
  "side": "BUY",
  "positionSide": "LONG",
  "stopPrice": "0",
  "workingType": "CONTRACT_PRICE",
  "priceProtect": false,
  "origType": "LIMIT",
  "priceMatch": "NONE", //price match mode
  "selfTradePreventionMode": "NONE", //self trading preventation mode
  "goodTillDate": 0, //order pre-set auot cancel time for TIF GTD order
  "updateTime": 1629182711600
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Modify-Order](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Modify-Order)

## Modify Multiple Orders(TRADE)

### API Description

Modify Multiple Orders (TRADE)

### HTTP Request

PUT `/fapi/v1/batchOrders`

### Request Weight

5 on 10s order rate limit(X-MBX-ORDER-COUNT-10S); 1 on 1min order rate
limit(X-MBX-ORDER-COUNT-1M); 5 on IP rate limit(x-mbx-used-weight-1m);

### Request Parameters

| Name        | Type       | Mandatory | Description              |
| ----------- | ---------- | --------- | ------------------------ |
| batchOrders | list<JSON> | YES       | order list. Max 5 orders |
| recvWindow  | LONG       | NO        |                          |
| timestamp   | LONG       | YES       |                          |

**Where `batchOrders` is the list of order parameters in JSON**

| Name              | Type    | Mandatory | Description                                                                                                                                                                                                     |
| ----------------- | ------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orderId           | LONG    | NO        |                                                                                                                                                                                                                 |
| origClientOrderId | STRING  | NO        |                                                                                                                                                                                                                 |
| symbol            | STRING  | YES       |                                                                                                                                                                                                                 |
| side              | ENUM    | YES       | `SELL`, `BUY`                                                                                                                                                                                                   |
| quantity          | DECIMAL | YES       | Order quantity, cannot be sent with `closePosition=true`                                                                                                                                                        |
| price             | DECIMAL | YES       |                                                                                                                                                                                                                 |
| priceMatch        | ENUM    | NO        | only avaliable for `LIMIT`/`STOP`/`TAKE_PROFIT` order; can be set to `OPPONENT`/ `OPPONENT_5`/ `OPPONENT_10`/ `OPPONENT_20`: /`QUEUE`/ `QUEUE_5`/ `QUEUE_10`/ `QUEUE_20`; Can't be passed together with `price` |
| recvWindow        | LONG    | NO        |                                                                                                                                                                                                                 |
| timestamp         | LONG    | YES       |                                                                                                                                                                                                                 |

> - Parameter rules are same with `Modify Order`
> - Batch modify orders are processed concurrently, and the order of matching is
>   not guaranteed.
> - The order of returned contents for batch modify orders is the same as the
>   order of the order list.
> - One order can only be modfied for less than 10000 times

### Response Example

```json
[
  {
    "orderId": 20072994037,
    "symbol": "BTCUSDT",
    "pair": "BTCUSDT",
    "status": "NEW",
    "clientOrderId": "LJ9R4QZDihCaS8UAOOLpgW",
    "price": "30005",
    "avgPrice": "0.0",
    "origQty": "1",
    "executedQty": "0",
    "cumQty": "0",
    "cumBase": "0",
    "timeInForce": "GTC",
    "type": "LIMIT",
    "reduceOnly": false,
    "closePosition": false,
    "side": "BUY",
    "positionSide": "LONG",
    "stopPrice": "0",
    "workingType": "CONTRACT_PRICE",
    "priceProtect": false,
    "origType": "LIMIT",
    "priceMatch": "NONE", //price match mode
    "selfTradePreventionMode": "NONE", //self trading preventation mode
    "goodTillDate": 0, //order pre-set auot cancel time for TIF GTD order
    "updateTime": 1629182711600
  },
  {
    "code": -2022,
    "msg": "ReduceOnly Order is rejected."
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Modify-Multiple-Orders](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Modify-Multiple-Orders)

## Get Order Modify History (USER_DATA)

### API Description

Get order modification history

### HTTP Request

GET `/fapi/v1/orderAmendment`

### Request Weight

**1**

### Request Parameters

| Name              | Type   | Mandatory | Description                                                 |
| ----------------- | ------ | --------- | ----------------------------------------------------------- |
| symbol            | STRING | YES       |                                                             |
| orderId           | LONG   | NO        |                                                             |
| origClientOrderId | STRING | NO        |                                                             |
| startTime         | LONG   | NO        | Timestamp in ms to get modification history from INCLUSIVE  |
| endTime           | LONG   | NO        | Timestamp in ms to get modification history until INCLUSIVE |
| limit             | INT    | NO        | Default 50; max 100                                         |
| recvWindow        | LONG   | NO        |                                                             |
| timestamp         | LONG   | YES       |                                                             |

> - Either `orderId` or `origClientOrderId` must be sent, and the `orderId` will
>   prevail if both are sent.
> - Order modify history longer than 3 month is not avaliable

### Response Example

```json
[
  {
    "amendmentId": 5363, // Order modification ID
    "symbol": "BTCUSDT",
    "pair": "BTCUSDT",
    "orderId": 20072994037,
    "clientOrderId": "LJ9R4QZDihCaS8UAOOLpgW",
    "time": 1629184560899, // Order modification time
    "amendment": {
      "price": {
        "before": "30004",
        "after": "30003.2"
      },
      "origQty": {
        "before": "1",
        "after": "1"
      },
      "count": 3 // Order modification count, representing the number of times the order has been modified
    }
  },
  {
    "amendmentId": 5361,
    "symbol": "BTCUSDT",
    "pair": "BTCUSDT",
    "orderId": 20072994037,
    "clientOrderId": "LJ9R4QZDihCaS8UAOOLpgW",
    "time": 1629184533946,
    "amendment": {
      "price": {
        "before": "30005",
        "after": "30004"
      },
      "origQty": {
        "before": "1",
        "after": "1"
      },
      "count": 2
    }
  },
  {
    "amendmentId": 5325,
    "symbol": "BTCUSDT",
    "pair": "BTCUSDT",
    "orderId": 20072994037,
    "clientOrderId": "LJ9R4QZDihCaS8UAOOLpgW",
    "time": 1629182711787,
    "amendment": {
      "price": {
        "before": "30002",
        "after": "30005"
      },
      "origQty": {
        "before": "1",
        "after": "1"
      },
      "count": 1
    }
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Get-Order-Modify-History](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Get-Order-Modify-History)

## Cancel Order (TRADE)

### API Description

Cancel an active order.

### HTTP Request

DELETE `/fapi/v1/order`

### Request Weight

**1**

### Request Parameters

| Name              | Type   | Mandatory | Description |
| ----------------- | ------ | --------- | ----------- |
| symbol            | STRING | YES       |             |
| orderId           | LONG   | NO        |             |
| origClientOrderId | STRING | NO        |             |
| recvWindow        | LONG   | NO        |             |
| timestamp         | LONG   | YES       |             |

> - Either `orderId` or `origClientOrderId` must be sent.

### Response Example

```json
{
  "clientOrderId": "myOrder1",
  "cumQty": "0",
  "cumQuote": "0",
  "executedQty": "0",
  "orderId": 283194212,
  "origQty": "11",
  "origType": "TRAILING_STOP_MARKET",
  "price": "0",
  "reduceOnly": false,
  "side": "BUY",
  "positionSide": "SHORT",
  "status": "CANCELED",
  "stopPrice": "9300", // please ignore when order type is TRAILING_STOP_MARKET
  "closePosition": false, // if Close-All
  "symbol": "BTCUSDT",
  "timeInForce": "GTC",
  "type": "TRAILING_STOP_MARKET",
  "activatePrice": "9020", // activation price, only return with TRAILING_STOP_MARKET order
  "priceRate": "0.3", // callback rate, only return with TRAILING_STOP_MARKET order
  "updateTime": 1571110484038,
  "workingType": "CONTRACT_PRICE",
  "priceProtect": false, // if conditional order trigger is protected
  "priceMatch": "NONE", //price match mode
  "selfTradePreventionMode": "NONE", //self trading preventation mode
  "goodTillDate": 1693207680000 //order pre-set auot cancel time for TIF GTD order
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Cancel-Order](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Cancel-Order)

## Cancel Multiple Orders (TRADE)

### API Description

Cancel Multiple Orders

### HTTP Request

DELETE `/fapi/v1/batchOrders`

### Request Weight

**1**

### Request Parameters

| Name                                                                          | Type         | Mandatory | Description   |
| ----------------------------------------------------------------------------- | ------------ | --------- | ------------- |
| symbol                                                                        | STRING       | YES       |               |
| orderIdList                                                                   | LIST<LONG>   | NO        | max length 10 |
| e.g. \[1234567,2345678\]                                                      |
| origClientOrderIdList                                                         | LIST<STRING> | NO        | max length 10 |
| e.g. \["my_id_1","my_id_2"\], encode the double quotes. No space after comma. |
| recvWindow                                                                    | LONG         | NO        |               |
| timestamp                                                                     | LONG         | YES       |               |

> - Either `orderIdList` or `origClientOrderIdList` must be sent.

### Response Example

```json
[
  {
    "clientOrderId": "myOrder1",
    "cumQty": "0",
    "cumQuote": "0",
    "executedQty": "0",
    "orderId": 283194212,
    "origQty": "11",
    "origType": "TRAILING_STOP_MARKET",
    "price": "0",
    "reduceOnly": false,
    "side": "BUY",
    "positionSide": "SHORT",
    "status": "CANCELED",
    "stopPrice": "9300", // please ignore when order type is TRAILING_STOP_MARKET
    "closePosition": false, // if Close-All
    "symbol": "BTCUSDT",
    "timeInForce": "GTC",
    "type": "TRAILING_STOP_MARKET",
    "activatePrice": "9020", // activation price, only return with TRAILING_STOP_MARKET order
    "priceRate": "0.3", // callback rate, only return with TRAILING_STOP_MARKET order
    "updateTime": 1571110484038,
    "workingType": "CONTRACT_PRICE",
    "priceProtect": false, // if conditional order trigger is protected
    "priceMatch": "NONE", //price match mode
    "selfTradePreventionMode": "NONE", //self trading preventation mode
    "goodTillDate": 1693207680000 //order pre-set auot cancel time for TIF GTD order
  },
  {
    "code": -2011,
    "msg": "Unknown order sent."
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Cancel-Multiple-Orders](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Cancel-Multiple-Orders)

## Cancel All Open Orders (TRADE)

### API Description

Cancel All Open Orders

### HTTP Request

DELETE `/fapi/v1/allOpenOrders`

### Request Weight

**1**

### Request Parameters

| Name       | Type   | Mandatory | Description |
| ---------- | ------ | --------- | ----------- |
| symbol     | STRING | YES       |             |
| recvWindow | LONG   | NO        |             |
| timestamp  | LONG   | YES       |             |

### Response Example

```json
{
  "code": 200,
  "msg": "The operation of cancel all open order is done."
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Cancel-All-Open-Orders](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Cancel-All-Open-Orders)

## Auto-Cancel All Open Orders (TRADE)

### API Description

Cancel all open orders of the specified symbol at the end of the specified
countdown. The endpoint should be called repeatedly as heartbeats so that the
existing countdown time can be canceled and replaced by a new one.

> - Example usage:  
>   Call this endpoint at 30s intervals with an countdownTime of 120000
>   (120s).  
>   If this endpoint is not called within 120 seconds, all your orders of the
>   specified symbol will be automatically canceled.  
>   If this endpoint is called with an countdownTime of 0, the countdown timer
>   will be stopped.

The system will check all countdowns **approximately every 10 milliseconds**, so
please note that sufficient redundancy should be considered when using this
function. We do not recommend setting the countdown time to be too precise or
too small.

### HTTP Request

POST `/fapi/v1/countdownCancelAll`

**Weight:** **10**

**Parameters:**

| Name          | Type   | Mandatory | Description                                              |
| ------------- | ------ | --------- | -------------------------------------------------------- |
| symbol        | STRING | YES       |                                                          |
| countdownTime | LONG   | YES       | countdown time, 1000 for 1 second. 0 to cancel the timer |
| recvWindow    | LONG   | NO        |                                                          |
| timestamp     | LONG   | YES       |                                                          |

### Response Example

```json
{
  "symbol": "BTCUSDT",
  "countdownTime": "100000"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Auto-Cancel-All-Open-Orders](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Auto-Cancel-All-Open-Orders)

## Query Order (USER_DATA)

### API Description

Check an order's status.

- These orders will not be found:
  - order status is `CANCELED` or `EXPIRED` **AND** order has NO filled trade
    **AND** created time + 3 days < current time
  - order create time + 90 days < current time

### HTTP Request

GET `/fapi/v1/order`

### Request Weight

**1**

### Request Parameters

| Name              | Type   | Mandatory | Description |
| ----------------- | ------ | --------- | ----------- |
| symbol            | STRING | YES       |             |
| orderId           | LONG   | NO        |             |
| origClientOrderId | STRING | NO        |             |
| recvWindow        | LONG   | NO        |             |
| timestamp         | LONG   | YES       |             |

Notes:

> - Either `orderId` or `origClientOrderId` must be sent.
> - `orderId` is self-increment for each specific `symbol`

### Response Example

```json
{
  "avgPrice": "0.00000",
  "clientOrderId": "abc",
  "cumQuote": "0",
  "executedQty": "0",
  "orderId": 1917641,
  "origQty": "0.40",
  "origType": "TRAILING_STOP_MARKET",
  "price": "0",
  "reduceOnly": false,
  "side": "BUY",
  "positionSide": "SHORT",
  "status": "NEW",
  "stopPrice": "9300", // please ignore when order type is TRAILING_STOP_MARKET
  "closePosition": false, // if Close-All
  "symbol": "BTCUSDT",
  "time": 1579276756075, // order time
  "timeInForce": "GTC",
  "type": "TRAILING_STOP_MARKET",
  "activatePrice": "9020", // activation price, only return with TRAILING_STOP_MARKET order
  "priceRate": "0.3", // callback rate, only return with TRAILING_STOP_MARKET order
  "updateTime": 1579276756075, // update time
  "workingType": "CONTRACT_PRICE",
  "priceProtect": false, // if conditional order trigger is protected
  "priceMatch": "NONE", //price match mode
  "selfTradePreventionMode": "NONE", //self trading preventation mode
  "goodTillDate": 0 //order pre-set auot cancel time for TIF GTD order
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Query-Order](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Query-Order)

## All Orders (USER_DATA)

### API Description

Get all account orders; active, canceled, or filled.

- These orders will not be found:
  - order status is `CANCELED` or `EXPIRED` **AND** order has NO filled trade
    **AND** created time + 3 days < current time
  - order create time + 90 days < current time

### HTTP Request

GET `/fapi/v1/allOrders`

### Request Weight

**5**

### Request Parameters

| Name       | Type   | Mandatory | Description            |
| ---------- | ------ | --------- | ---------------------- |
| symbol     | STRING | YES       |                        |
| orderId    | LONG   | NO        |                        |
| startTime  | LONG   | NO        |                        |
| endTime    | LONG   | NO        |                        |
| limit      | INT    | NO        | Default 500; max 1000. |
| recvWindow | LONG   | NO        |                        |
| timestamp  | LONG   | YES       |                        |

**Notes:**

> - If `orderId` is set, it will get orders >= that `orderId`. Otherwise most
>   recent orders are returned.
> - The query time period must be less then 7 days( default as the recent 7
>   days).

### Response Example

```json
[
  {
    "avgPrice": "0.00000",
    "clientOrderId": "abc",
    "cumQuote": "0",
    "executedQty": "0",
    "orderId": 1917641,
    "origQty": "0.40",
    "origType": "TRAILING_STOP_MARKET",
    "price": "0",
    "reduceOnly": false,
    "side": "BUY",
    "positionSide": "SHORT",
    "status": "NEW",
    "stopPrice": "9300", // please ignore when order type is TRAILING_STOP_MARKET
    "closePosition": false, // if Close-All
    "symbol": "BTCUSDT",
    "time": 1579276756075, // order time
    "timeInForce": "GTC",
    "type": "TRAILING_STOP_MARKET",
    "activatePrice": "9020", // activation price, only return with TRAILING_STOP_MARKET order
    "priceRate": "0.3", // callback rate, only return with TRAILING_STOP_MARKET order
    "updateTime": 1579276756075, // update time
    "workingType": "CONTRACT_PRICE",
    "priceProtect": false, // if conditional order trigger is protected
    "priceMatch": "NONE", //price match mode
    "selfTradePreventionMode": "NONE", //self trading preventation mode
    "goodTillDate": 0 //order pre-set auot cancel time for TIF GTD order
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/All-Orders](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/All-Orders)

## Current All Open Orders (USER_DATA)

### API Description

Get all open orders on a symbol.

### HTTP Request

GET `/fapi/v1/openOrders`

### Request Weight

**1** for a single symbol; **40** when the symbol parameter is omitted

**Careful** when accessing this with no symbol.

### Request Parameters

| Name       | Type   | Mandatory | Description |
| ---------- | ------ | --------- | ----------- |
| symbol     | STRING | NO        |             |
| recvWindow | LONG   | NO        |             |
| timestamp  | LONG   | YES       |             |

> - If the symbol is not sent, orders for all symbols will be returned in an
>   array.

### Response Example

```json
[
  {
    "avgPrice": "0.00000",
    "clientOrderId": "abc",
    "cumQuote": "0",
    "executedQty": "0",
    "orderId": 1917641,
    "origQty": "0.40",
    "origType": "TRAILING_STOP_MARKET",
    "price": "0",
    "reduceOnly": false,
    "side": "BUY",
    "positionSide": "SHORT",
    "status": "NEW",
    "stopPrice": "9300", // please ignore when order type is TRAILING_STOP_MARKET
    "closePosition": false, // if Close-All
    "symbol": "BTCUSDT",
    "time": 1579276756075, // order time
    "timeInForce": "GTC",
    "type": "TRAILING_STOP_MARKET",
    "activatePrice": "9020", // activation price, only return with TRAILING_STOP_MARKET order
    "priceRate": "0.3", // callback rate, only return with TRAILING_STOP_MARKET order
    "updateTime": 1579276756075, // update time
    "workingType": "CONTRACT_PRICE",
    "priceProtect": false, // if conditional order trigger is protected
    "priceMatch": "NONE", //price match mode
    "selfTradePreventionMode": "NONE", //self trading preventation mode
    "goodTillDate": 0 //order pre-set auot cancel time for TIF GTD order
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Current-All-Open-Orders](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Current-All-Open-Orders)

## Query Current Open Order (USER_DATA)

### API Description

Query open order

### HTTP Request

GET `/fapi/v1/openOrder`

### Request Weight

**1**

### Request Parameters

| Name              | Type   | Mandatory | Description |
| ----------------- | ------ | --------- | ----------- |
| symbol            | STRING | YES       |             |
| orderId           | LONG   | NO        |             |
| origClientOrderId | STRING | NO        |             |
| recvWindow        | LONG   | NO        |             |
| timestamp         | LONG   | YES       |             |

> - Either`orderId` or `origClientOrderId` must be sent
> - If the queried order has been filled or cancelled, the error message "Order
>   does not exist" will be returned.

### Response Example

```json
{
  "avgPrice": "0.00000",
  "clientOrderId": "abc",
  "cumQuote": "0",
  "executedQty": "0",
  "orderId": 1917641,
  "origQty": "0.40",
  "origType": "TRAILING_STOP_MARKET",
  "price": "0",
  "reduceOnly": false,
  "side": "BUY",
  "positionSide": "SHORT",
  "status": "NEW",
  "stopPrice": "9300", // please ignore when order type is TRAILING_STOP_MARKET
  "closePosition": false, // if Close-All
  "symbol": "BTCUSDT",
  "time": 1579276756075, // order time
  "timeInForce": "GTC",
  "type": "TRAILING_STOP_MARKET",
  "activatePrice": "9020", // activation price, only return with TRAILING_STOP_MARKET order
  "priceRate": "0.3", // callback rate, only return with TRAILING_STOP_MARKET order
  "updateTime": 1579276756075,
  "workingType": "CONTRACT_PRICE",
  "priceProtect": false, // if conditional order trigger is protected
  "priceMatch": "NONE", //price match mode
  "selfTradePreventionMode": "NONE", //self trading preventation mode
  "goodTillDate": 0 //order pre-set auot cancel time for TIF GTD order
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Query-Current-Open-Order](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Query-Current-Open-Order)

## User's Force Orders (USER_DATA)

### API Description

Query user's Force Orders

### HTTP Request

GET `/fapi/v1/forceOrders`

### Request Weight

**20** with symbol, **50** without symbol

### Request Parameters

| Name          | Type   | Mandatory | Description                                                 |
| ------------- | ------ | --------- | ----------------------------------------------------------- |
| symbol        | STRING | NO        |                                                             |
| autoCloseType | ENUM   | NO        | "LIQUIDATION" for liquidation orders, "ADL" for ADL orders. |
| startTime     | LONG   | NO        |                                                             |
| endTime       | LONG   | NO        |                                                             |
| limit         | INT    | NO        | Default 50; max 100.                                        |
| recvWindow    | LONG   | NO        |                                                             |
| timestamp     | LONG   | YES       |                                                             |

> - If "autoCloseType" is not sent, orders with both of the types will be
>   returned
> - If "startTime" is not sent, data within 7 days before "endTime" can be
>   queried

### Response Example

```json
[
  {
  	"orderId": 6071832819,
  	"symbol": "BTCUSDT",
  	"status": "FILLED",
  	"clientOrderId": "autoclose-1596107620040000020",
  	"price": "10871.09",
  	"avgPrice": "10913.21000",
  	"origQty": "0.001",
  	"executedQty": "0.001",
  	"cumQuote": "10.91321",
  	"timeInForce": "IOC",
  	"type": "LIMIT",
  	"reduceOnly": false,
  	"closePosition": false,
  	"side": "SELL",
  	"positionSide": "BOTH",
  	"stopPrice": "0",
  	"workingType": "CONTRACT_PRICE",
  	"origType": "LIMIT",
  	"time": 1596107620044,
  	"updateTime": 1596107620087
  }
  {
   	"orderId": 6072734303,
   	"symbol": "BTCUSDT",
   	"status": "FILLED",
   	"clientOrderId": "adl_autoclose",
   	"price": "11023.14",
   	"avgPrice": "10979.82000",
   	"origQty": "0.001",
   	"executedQty": "0.001",
   	"cumQuote": "10.97982",
   	"timeInForce": "GTC",
   	"type": "LIMIT",
   	"reduceOnly": false,
   	"closePosition": false,
   	"side": "BUY",
   	"positionSide": "SHORT",
   	"stopPrice": "0",
   	"workingType": "CONTRACT_PRICE",
   	"origType": "LIMIT",
   	"time": 1596110725059,
   	"updateTime": 1596110725071
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Users-Force-Orders](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Users-Force-Orders)

## Account Trade List (USER_DATA)

### API Description

Get trades for a specific account and symbol.

### HTTP Request

GET `/fapi/v1/userTrades`

### Request Weight

**5**

### Request Parameters

| Name       | Type   | Mandatory | Description                                              |
| ---------- | ------ | --------- | -------------------------------------------------------- |
| symbol     | STRING | YES       |                                                          |
| orderId    | LONG   | NO        | This can only be used in combination with `symbol`       |
| startTime  | LONG   | NO        |                                                          |
| endTime    | LONG   | NO        |                                                          |
| fromId     | LONG   | NO        | Trade id to fetch from. Default gets most recent trades. |
| limit      | INT    | NO        | Default 500; max 1000.                                   |
| recvWindow | LONG   | NO        |                                                          |
| timestamp  | LONG   | YES       |                                                          |

> - If `startTime` and `endTime` are both not sent, then the last 7 days' data
>   will be returned.
> - The time between `startTime` and `endTime` cannot be longer than 7 days.
> - The parameter `fromId` cannot be sent with `startTime` or `endTime`.
> - Only support querying trade in the past 6 months

### Response Example

```json
[
  {
    "buyer": false,
    "commission": "-0.07819010",
    "commissionAsset": "USDT",
    "id": 698759,
    "maker": false,
    "orderId": 25851813,
    "price": "7819.01",
    "qty": "0.002",
    "quoteQty": "15.63802",
    "realizedPnl": "-0.91539999",
    "side": "SELL",
    "positionSide": "SHORT",
    "symbol": "BTCUSDT",
    "time": 1569514978020
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Account-Trade-List](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Account-Trade-List)

## Change Margin Type(TRADE)

### API Description

Change symbol level margin type

### HTTP Request

POST `/fapi/v1/marginType`

### Request Weight

**1**

### Request Parameters

| Name       | Type   | Mandatory | Description       |
| ---------- | ------ | --------- | ----------------- |
| symbol     | STRING | YES       |                   |
| marginType | ENUM   | YES       | ISOLATED, CROSSED |
| recvWindow | LONG   | NO        |                   |
| timestamp  | LONG   | YES       |                   |

### Response Example

```json
{
  "code": 200,
  "msg": "success"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Change-Margin-Type](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Change-Margin-Type)

## Change Position Mode(TRADE)

### API Description

Change user's position mode (Hedge Mode or One-way Mode ) on **_EVERY symbol_**

### HTTP Request

POST `/fapi/v1/positionSide/dual`

### Request Weight

**1**

### Request Parameters

| Name             | Type   | Mandatory | Description                               |
| ---------------- | ------ | --------- | ----------------------------------------- |
| dualSidePosition | STRING | YES       | "true": Hedge Mode; "false": One-way Mode |
| recvWindow       | LONG   | NO        |                                           |
| timestamp        | LONG   | YES       |                                           |

### Response Example

```json
{
  "code": 200,
  "msg": "success"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Change-Position-Mode](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Change-Position-Mode)

## Change Initial Leverage(TRADE)

### API Description

Change user's initial leverage of specific symbol market.

### HTTP Request

POST `/fapi/v1/leverage`

### Request Weight

**1**

### Request Parameters

| Name       | Type   | Mandatory | Description                                |
| ---------- | ------ | --------- | ------------------------------------------ |
| symbol     | STRING | YES       |                                            |
| leverage   | INT    | YES       | target initial leverage: int from 1 to 125 |
| recvWindow | LONG   | NO        |                                            |
| timestamp  | LONG   | YES       |                                            |

### Response Example

```json
{
  "leverage": 21,
  "maxNotionalValue": "1000000",
  "symbol": "BTCUSDT"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Change-Initial-Leverage](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Change-Initial-Leverage)

## Change Multi-Assets Mode (TRADE)

### API Description

Change user's Multi-Assets mode (Multi-Assets Mode or Single-Asset Mode) on
**_Every symbol_**

### HTTP Request

POST `/fapi/v1/multiAssetsMargin`

### Request Weight

**1**

### Request Parameters

| Name              | Type   | Mandatory | Description                                           |
| ----------------- | ------ | --------- | ----------------------------------------------------- |
| multiAssetsMargin | STRING | YES       | "true": Multi-Assets Mode; "false": Single-Asset Mode |
| recvWindow        | LONG   | NO        |                                                       |
| timestamp         | LONG   | YES       |                                                       |

### Response Example

```json
{
  "code": 200,
  "msg": "success"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Change-Multi-Assets-Mode](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Change-Multi-Assets-Mode)

## Modify Isolated Position Margin(TRADE)

### API Description

Modify Isolated Position Margin

### HTTP Request

POST `/fapi/v1/positionMargin`

### Request Weight

**1**

### Request Parameters

| Name         | Type    | Mandatory | Description                                                                                          |
| ------------ | ------- | --------- | ---------------------------------------------------------------------------------------------------- |
| symbol       | STRING  | YES       |                                                                                                      |
| positionSide | ENUM    | NO        | Default `BOTH` for One-way Mode ; `LONG` or `SHORT` for Hedge Mode. It must be sent with Hedge Mode. |
| amount       | DECIMAL | YES       |                                                                                                      |
| type         | INT     | YES       | 1: Add position margin，2: Reduce position margin                                                    |
| recvWindow   | LONG    | NO        |                                                                                                      |
| timestamp    | LONG    | YES       |                                                                                                      |

> - Only for isolated symbol

### Response Example

```json
{
  "amount": 100.0,
  "code": 200,
  "msg": "Successfully modify position margin.",
  "type": 1
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Modify-Isolated-Position-Margin](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Modify-Isolated-Position-Margin)

## Position Information V2 (USER_DATA)

### API Description

Get current position information.

### HTTP Request

GET `/fapi/v2/positionRisk`

### Request Weight

**5**

### Request Parameters

| Name       | Type   | Mandatory | Description |
| ---------- | ------ | --------- | ----------- |
| symbol     | STRING | NO        |             |
| recvWindow | LONG   | NO        |             |
| timestamp  | LONG   | YES       |             |

**Note**

> Please use with user data stream `ACCOUNT_UPDATE` to meet your timeliness and
> accuracy needs.

### Response Example

> For One-way position mode:

```json
[
  	{
  		"entryPrice": "0.00000",
        "breakEvenPrice": "0.0",
  		"marginType": "isolated",
  		"isAutoAddMargin": "false",
  		"isolatedMargin": "0.00000000",
  		"leverage": "10",
  		"liquidationPrice": "0",
  		"markPrice": "6679.50671178",
  		"maxNotionalValue": "20000000",
  		"positionAmt": "0.000",
  		"notional": "0",,
  		"isolatedWallet": "0",
  		"symbol": "BTCUSDT",
  		"unRealizedProfit": "0.00000000",
  		"positionSide": "BOTH",
  		"updateTime": 0
  	}
]
```

> For Hedge position mode:

```json
[
  {
    "symbol": "BTCUSDT",
    "positionAmt": "0.001",
    "entryPrice": "22185.2",
    "breakEvenPrice": "0.0",
    "markPrice": "21123.05052574",
    "unRealizedProfit": "-1.06214947",
    "liquidationPrice": "19731.45529116",
    "leverage": "4",
    "maxNotionalValue": "100000000",
    "marginType": "cross",
    "isolatedMargin": "0.00000000",
    "isAutoAddMargin": "false",
    "positionSide": "LONG",
    "notional": "21.12305052",
    "isolatedWallet": "0",
    "updateTime": 1655217461579
  },
  {
    "symbol": "BTCUSDT",
    "positionAmt": "0.000",
    "entryPrice": "0.0",
    "breakEvenPrice": "0.0",
    "markPrice": "21123.05052574",
    "unRealizedProfit": "0.00000000",
    "liquidationPrice": "0",
    "leverage": "4",
    "maxNotionalValue": "100000000",
    "marginType": "cross",
    "isolatedMargin": "0.00000000",
    "isAutoAddMargin": "false",
    "positionSide": "SHORT",
    "notional": "0",
    "isolatedWallet": "0",
    "updateTime": 0
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Position-Information-V2](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Position-Information-V2)

## Position Information V3 (USER_DATA)

### API Description

Get current position information(only symbol that has position or open orders
will be returned).

### HTTP Request

GET `/fapi/v3/positionRisk`

### Request Weight

**5**

### Request Parameters

| Name       | Type   | Mandatory | Description |
| ---------- | ------ | --------- | ----------- |
| symbol     | STRING | NO        |             |
| recvWindow | LONG   | NO        |             |
| timestamp  | LONG   | YES       |             |

**Note**

> Please use with user data stream `ACCOUNT_UPDATE` to meet your timeliness and
> accuracy needs.

### Response Example

> For One-way position mode:

```json
[
  {
    "symbol": "ADAUSDT",
    "positionSide": "BOTH", // position side
    "positionAmt": "30",
    "entryPrice": "0.385",
    "breakEvenPrice": "0.385077",
    "markPrice": "0.41047590",
    "unRealizedProfit": "0.76427700", // unrealized profit
    "liquidationPrice": "0",
    "isolatedMargin": "0",
    "notional": "12.31427700",
    "marginAsset": "USDT",
    "isolatedWallet": "0",
    "initialMargin": "0.61571385", // initial margin required with current mark price
    "maintMargin": "0.08004280", // maintenance margin required
    "positionInitialMargin": "0.61571385", // initial margin required for positions with current mark price
    "openOrderInitialMargin": "0", // initial margin required for open orders with current mark price
    "adl": 2,
    "bidNotional": "0", // bids notional, ignore
    "askNotional": "0", // ask notional, ignore
    "updateTime": 1720736417660
  }
]
```

> For Hedge position mode:

```json
[
  {
    "symbol": "ADAUSDT",
    "positionSide": "LONG", // position side
    "positionAmt": "30",
    "entryPrice": "0.385",
    "breakEvenPrice": "0.385077",
    "markPrice": "0.41047590",
    "unRealizedProfit": "0.76427700", // unrealized profit
    "liquidationPrice": "0",
    "isolatedMargin": "0",
    "notional": "12.31427700",
    "marginAsset": "USDT",
    "isolatedWallet": "0",
    "initialMargin": "0.61571385", // initial margin required with current mark price
    "maintMargin": "0.08004280", // maintenance margin required
    "positionInitialMargin": "0.61571385", // initial margin required for positions with current mark price
    "openOrderInitialMargin": "0", // initial margin required for open orders with current mark price
    "adl": 2,
    "bidNotional": "0", // bids notional, ignore
    "askNotional": "0", // ask notional, ignore
    "updateTime": 1720736417660
  },
  {
    "symbol": "COMPUSDT",
    "positionSide": "SHORT",
    "positionAmt": "-1.000",
    "entryPrice": "70.92841",
    "breakEvenPrice": "70.900038636",
    "markPrice": "49.72023376",
    "unRealizedProfit": "21.20817624",
    "liquidationPrice": "2260.56757210",
    "isolatedMargin": "0",
    "notional": "-49.72023376",
    "marginAsset": "USDT",
    "isolatedWallet": "0",
    "initialMargin": "2.48601168",
    "maintMargin": "0.49720233",
    "positionInitialMargin": "2.48601168",
    "openOrderInitialMargin": "0",
    "adl": 2,
    "bidNotional": "0",
    "askNotional": "0",
    "updateTime": 1708943511656
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Position-Information-V3](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Position-Information-V3)

## Position ADL Quantile Estimation(USER_DATA)

### API Description

Position ADL Quantile Estimation

> - Values update every 30s.
> - Values 0, 1, 2, 3, 4 shows the queue position and possibility of ADL from
>   low to high.
> - For positions of the symbol are in One-way Mode or isolated margined in
>   Hedge Mode, "LONG", "SHORT", and "BOTH" will be returned to show the
>   positions' adl quantiles of different position sides.
> - If the positions of the symbol are crossed margined in Hedge Mode:
>   - "HEDGE" as a sign will be returned instead of "BOTH";
>   - A same value caculated on unrealized pnls on long and short sides'
>     positions will be shown for "LONG" and "SHORT" when there are positions in
>     both of long and short sides.

### HTTP Request

GET `/fapi/v1/adlQuantile`

### Request Weight

**5**

### Request Parameters

| Name       | Type   | Mandatory | Description |
| ---------- | ------ | --------- | ----------- |
| symbol     | STRING | NO        |             |
| recvWindow | LONG   | NO        |             |
| timestamp  | LONG   | YES       |             |

### Response Example

```json
[
  {
    "symbol": "ETHUSDT",
    "adlQuantile": {
      // if the positions of the symbol are crossed margined in Hedge Mode, "LONG" and "SHORT" will be returned a same quantile value, and "HEDGE" will be returned instead of "BOTH".
      "LONG": 3,
      "SHORT": 3,
      "HEDGE": 0 // only a sign, ignore the value
    }
  },
  {
    "symbol": "BTCUSDT",
    "adlQuantile": {
      // for positions of the symbol are in One-way Mode or isolated margined in Hedge Mode
      "LONG": 1, // adl quantile for "LONG" position in hedge mode
      "SHORT": 2, // adl qauntile for "SHORT" position in hedge mode
      "BOTH": 0 // adl qunatile for position in one-way mode
    }
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Position-ADL-Quantile-Estimation](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Position-ADL-Quantile-Estimation)

## Get Position Margin Change History (TRADE)

### API Description

Get Position Margin Change History

### HTTP Request

GET `/fapi/v1/positionMargin/history`

### Request Weight

**1**

### Request Parameters

| Name       | Type   | Mandatory | Description                                       |
| ---------- | ------ | --------- | ------------------------------------------------- |
| symbol     | STRING | YES       |                                                   |
| type       | INT    | NO        | 1: Add position margin，2: Reduce position margin |
| startTime  | LONG   | NO        |                                                   |
| endTime    | LONG   | NO        | Default current time if not pass                  |
| limit      | INT    | NO        | Default: 500                                      |
| recvWindow | LONG   | NO        |                                                   |
| timestamp  | LONG   | YES       |                                                   |

> - Support querying future histories that are not older than 30 days
> - The time between `startTime` and `endTime`can't be more than 30 days

### Response Example

```json
[
  {
    "symbol": "BTCUSDT",
    "type": 1,
    "deltaType": "USER_ADJUST",
    "amount": "23.36332311",
    "asset": "USDT",
    "time": 1578047897183,
    "positionSide": "BOTH"
  },
  {
    "symbol": "BTCUSDT",
    "type": 1,
    "deltaType": "USER_ADJUST",
    "amount": "100",
    "asset": "USDT",
    "time": 1578047900425,
    "positionSide": "LONG"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Get-Position-Margin-Change-History](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Get-Position-Margin-Change-History)

## Test Order(TRADE)

### API Description

Testing order request, this order will not be submitted to matching engine

### HTTP Request

POST `/fapi/v1/order/test`

### Request Parameters

| Name                    | Type    | Mandatory | Description                                                                                                                                                                                                                                                                              |
| ----------------------- | ------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol                  | STRING  | YES       |                                                                                                                                                                                                                                                                                          |
| side                    | ENUM    | YES       |                                                                                                                                                                                                                                                                                          |
| positionSide            | ENUM    | NO        | Default `BOTH` for One-way Mode ; `LONG` or `SHORT` for Hedge Mode. It must be sent in Hedge Mode.                                                                                                                                                                                       |
| type                    | ENUM    | YES       |                                                                                                                                                                                                                                                                                          |
| timeInForce             | ENUM    | NO        |                                                                                                                                                                                                                                                                                          |
| quantity                | DECIMAL | NO        | Cannot be sent with `closePosition`\=`true`(Close-All)                                                                                                                                                                                                                                   |
| reduceOnly              | STRING  | NO        | "true" or "false". default "false". Cannot be sent in Hedge Mode; cannot be sent with `closePosition`\=`true`                                                                                                                                                                            |
| price                   | DECIMAL | NO        |                                                                                                                                                                                                                                                                                          |
| newClientOrderId        | STRING  | NO        | A unique id among open orders. Automatically generated if not sent. Can only be string following the rule: `^[\.A-Z\:/a-z0-9_-]{1,36}$`                                                                                                                                                  |
| stopPrice               | DECIMAL | NO        | Used with `STOP/STOP_MARKET` or `TAKE_PROFIT/TAKE_PROFIT_MARKET` orders.                                                                                                                                                                                                                 |
| closePosition           | STRING  | NO        | `true`, `false`；Close-All，used with `STOP_MARKET` or `TAKE_PROFIT_MARKET`.                                                                                                                                                                                                             |
| activationPrice         | DECIMAL | NO        | Used with `TRAILING_STOP_MARKET` orders, default as the latest price(supporting different `workingType`)                                                                                                                                                                                 |
| callbackRate            | DECIMAL | NO        | Used with `TRAILING_STOP_MARKET` orders, min 0.1, max 5 where 1 for 1%                                                                                                                                                                                                                   |
| workingType             | ENUM    | NO        | stopPrice triggered by: "MARK_PRICE", "CONTRACT_PRICE". Default "CONTRACT_PRICE"                                                                                                                                                                                                         |
| priceProtect            | STRING  | NO        | "TRUE" or "FALSE", default "FALSE". Used with `STOP/STOP_MARKET` or `TAKE_PROFIT/TAKE_PROFIT_MARKET` orders.                                                                                                                                                                             |
| newOrderRespType        | ENUM    | NO        | "ACK", "RESULT", default "ACK"                                                                                                                                                                                                                                                           |
| priceMatch              | ENUM    | NO        | only avaliable for `LIMIT`/`STOP`/`TAKE_PROFIT` order; can be set to `OPPONENT`/ `OPPONENT_5`/ `OPPONENT_10`/ `OPPONENT_20`: /`QUEUE`/ `QUEUE_5`/ `QUEUE_10`/ `QUEUE_20`; Can't be passed together with `price`                                                                          |
| selfTradePreventionMode | ENUM    | NO        | `NONE`:No STP / `EXPIRE_TAKER`:expire taker order when STP triggers/ `EXPIRE_MAKER`:expire taker order when STP triggers/ `EXPIRE_BOTH`:expire both orders when STP triggers; default `NONE`                                                                                             |
| goodTillDate            | LONG    | NO        | order cancel time for timeInForce `GTD`, mandatory when `timeInforce` set to `GTD`; order the timestamp only retains second-level precision, ms part will be ignored; The goodTillDate timestamp must be greater than the current time plus 600 seconds and smaller than 253402300799000 |
| recvWindow              | LONG    | NO        |                                                                                                                                                                                                                                                                                          |
| timestamp               | LONG    | YES       |                                                                                                                                                                                                                                                                                          |

Additional mandatory parameters based on `type`:

| Type                             | Additional mandatory parameters    |
| -------------------------------- | ---------------------------------- |
| `LIMIT`                          | `timeInForce`, `quantity`, `price` |
| `MARKET`                         | `quantity`                         |
| `STOP/TAKE_PROFIT`               | `quantity`, `price`, `stopPrice`   |
| `STOP_MARKET/TAKE_PROFIT_MARKET` | `stopPrice`                        |
| `TRAILING_STOP_MARKET`           | `callbackRate`                     |

> - Order with type `STOP`, parameter `timeInForce` can be sent ( default
>   `GTC`).
> - Order with type `TAKE_PROFIT`, parameter `timeInForce` can be sent ( default
>   `GTC`).
> - Condition orders will be triggered when:
>
>   - If parameter`priceProtect`is sent as true:
>     - when price reaches the `stopPrice` ，the difference rate between
>       "MARK_PRICE" and "CONTRACT_PRICE" cannot be larger than the
>       "triggerProtect" of the symbol
>     - "triggerProtect" of a symbol can be got from `GET /fapi/v1/exchangeInfo`
>   - `STOP`, `STOP_MARKET`:
>     - BUY: latest price ("MARK_PRICE" or "CONTRACT_PRICE") >= `stopPrice`
>     - SELL: latest price ("MARK_PRICE" or "CONTRACT_PRICE") <= `stopPrice`
>   - `TAKE_PROFIT`, `TAKE_PROFIT_MARKET`:
>     - BUY: latest price ("MARK_PRICE" or "CONTRACT_PRICE") <= `stopPrice`
>     - SELL: latest price ("MARK_PRICE" or "CONTRACT_PRICE") >= `stopPrice`
>   - `TRAILING_STOP_MARKET`:
>     - BUY: the lowest price after order placed `<=`
>       activationPrice`, and the latest price >`\= the lowest price \* (1 +
>       `callbackRate`)
>     - SELL: the highest price after order placed >= `activationPrice`, and the
>       latest price <= the highest price \* (1 - `callbackRate`)
>
> - For `TRAILING_STOP_MARKET`, if you got such error code.  
>   `{"code": -2021, "msg": "Order would immediately trigger."}`  
>   means that the parameters you send do not meet the following requirements:
>
>   - BUY: `activationPrice` should be smaller than latest price.
>   - SELL: `activationPrice` should be larger than latest price.
>
> - If `newOrderRespType` is sent as `RESULT` :
>
>   - `MARKET` order: the final FILLED result of the order will be return
>     directly.
>   - `LIMIT` order with special `timeInForce`: the final status result of the
>     order(FILLED or EXPIRED) will be returned directly.
>
> - `STOP_MARKET`, `TAKE_PROFIT_MARKET` with `closePosition`\=`true`:
>
>   - Follow the same rules for condition orders.
>   - If triggered，**close all** current long position( if `SELL`) or current
>     short position( if `BUY`).
>   - Cannot be used with `quantity` paremeter
>   - Cannot be used with `reduceOnly` parameter
>   - In Hedge Mode,cannot be used with `BUY` orders in `LONG` position side.
>     and cannot be used with `SELL` orders in `SHORT` position side
>
> - `selfTradePreventionMode` is only effective when `timeInForce` set to `IOC`
>   or `GTC` or `GTD`.
> - In extreme market conditions, timeInForce `GTD` order auto cancel time might
>   be delayed comparing to `goodTillDate`

### Response Example

```json
{
  "clientOrderId": "testOrder",
  "cumQty": "0",
  "cumQuote": "0",
  "executedQty": "0",
  "orderId": 22542179,
  "avgPrice": "0.00000",
  "origQty": "10",
  "price": "0",
  "reduceOnly": false,
  "side": "BUY",
  "positionSide": "SHORT",
  "status": "NEW",
  "stopPrice": "9300", // please ignore when order type is TRAILING_STOP_MARKET
  "closePosition": false, // if Close-All
  "symbol": "BTCUSDT",
  "timeInForce": "GTD",
  "type": "TRAILING_STOP_MARKET",
  "origType": "TRAILING_STOP_MARKET",
  "activatePrice": "9020", // activation price, only return with TRAILING_STOP_MARKET order
  "priceRate": "0.3", // callback rate, only return with TRAILING_STOP_MARKET order
  "updateTime": 1566818724722,
  "workingType": "CONTRACT_PRICE",
  "priceProtect": false, // if conditional order trigger is protected
  "priceMatch": "NONE", //price match mode
  "selfTradePreventionMode": "NONE", //self trading preventation mode
  "goodTillDate": 1693207680000 //order pre-set auot cancel time for TIF GTD order
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/New-Order-Test](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/New-Order-Test)

## User Universal Transfer (USER_DATA)

### API Description

user universal transfer

### HTTP Request

POST `/sapi/v1/asset/transfer`

You need to enable `Permits Universal Transfer` option for the API Key which
requests this endpoint.

### Request Weight(UID)

**900**

### Request Parameters

| Name       | Type    | Mandatory | Description |
| ---------- | ------- | --------- | ----------- |
| type       | ENUM    | YES       |             |
| asset      | STRING  | YES       |             |
| amount     | DECIMAL | YES       |             |
| fromSymbol | STRING  | NO        |             |
| toSymbol   | STRING  | NO        |             |
| recvWindow | LONG    | NO        |             |
| timestamp  | LONG    | YES       |             |

- `fromSymbol` must be sent when type are ISOLATEDMARGIN_MARGIN and
  ISOLATEDMARGIN_ISOLATEDMARGIN
- `toSymbol` must be sent when type are MARGIN_ISOLATEDMARGIN and
  ISOLATEDMARGIN_ISOLATEDMARGIN
- ENUM of transfer types:

  - MAIN_UMFUTURE Spot account transfer to USDⓈ-M Futures account
  - MAIN_CMFUTURE Spot account transfer to COIN-M Futures account
  - MAIN_MARGIN Spot account transfer to Margin（cross）account
  - UMFUTURE_MAIN USDⓈ-M Futures account transfer to Spot account
  - UMFUTURE_MARGIN USDⓈ-M Futures account transfer to Margin（cross）account
  - CMFUTURE_MAIN COIN-M Futures account transfer to Spot account
  - CMFUTURE_MARGIN COIN-M Futures account transfer to Margin(cross) account
  - MARGIN_MAIN Margin（cross）account transfer to Spot account
  - MARGIN_UMFUTURE Margin（cross）account transfer to USDⓈ-M Futures
  - MARGIN_CMFUTURE Margin（cross）account transfer to COIN-M Futures
  - ISOLATEDMARGIN_MARGIN Isolated margin account transfer to Margin(cross)
    account
  - MARGIN_ISOLATEDMARGIN Margin(cross) account transfer to Isolated margin
    account
  - ISOLATEDMARGIN_ISOLATEDMARGIN Isolated margin account transfer to Isolated
    margin account
  - MAIN_FUNDING Spot account transfer to Funding account
  - FUNDING_MAIN Funding account transfer to Spot account
  - FUNDING_UMFUTURE Funding account transfer to UMFUTURE account
  - UMFUTURE_FUNDING UMFUTURE account transfer to Funding account
  - MARGIN_FUNDING MARGIN account transfer to Funding account
  - FUNDING_MARGIN Funding account transfer to Margin account
  - FUNDING_CMFUTURE Funding account transfer to CMFUTURE account
  - CMFUTURE_FUNDING CMFUTURE account transfer to Funding account
  - MAIN_OPTION Spot account transfer to Options account
  - OPTION_MAIN Options account transfer to Spot account
  - UMFUTURE_OPTION USDⓈ-M Futures account transfer to Options account
  - OPTION_UMFUTURE Options account transfer to USDⓈ-M Futures account
  - MARGIN_OPTION Margin（cross）account transfer to Options account
  - OPTION_MARGIN Options account transfer to Margin（cross）account
  - FUNDING_OPTION Funding account transfer to Options account
  - OPTION_FUNDING Options account transfer to Funding account
  - MAIN_PORTFOLIO_MARGIN Spot account transfer to Portfolio Margin account
  - PORTFOLIO_MARGIN_MAIN Portfolio Margin account transfer to Spot account

### Response Example

```json
{
  "tranId": 13526853623
}
```

> Source:
> [https://developers.binance.com/docs/wallet/asset/user-universal-transfer](https://developers.binance.com/docs/wallet/asset/user-universal-transfer)

## Futures Account Balance V3 (USER_DATA)

### API Description

Query account balance info

### HTTP Request

GET `/fapi/v3/balance`

### Request Weight

**5**

### Request Parameters

| Name       | Type | Mandatory | Description |
| ---------- | ---- | --------- | ----------- |
| recvWindow | LONG | NO        |             |
| timestamp  | LONG | YES       |             |

### Response Example

```json
[
  {
    "accountAlias": "SgsR", // unique account code
    "asset": "USDT", // asset name
    "balance": "122607.35137903", // wallet balance
    "crossWalletBalance": "23.72469206", // crossed wallet balance
    "crossUnPnl": "0.00000000", // unrealized profit of crossed positions
    "availableBalance": "23.72469206", // available balance
    "maxWithdrawAmount": "23.72469206", // maximum amount for transfer out
    "marginAvailable": true, // whether the asset can be used as margin in Multi-Assets mode
    "updateTime": 1617939110373
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Futures-Account-Balance-V3](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Futures-Account-Balance-V3)

## Futures Account Balance V2 (USER_DATA)

### API Description

Query account balance info

### HTTP Request

GET `/fapi/v2/balance`

### Request Weight

**5**

### Request Parameters

| Name       | Type | Mandatory | Description |
| ---------- | ---- | --------- | ----------- |
| recvWindow | LONG | NO        |             |
| timestamp  | LONG | YES       |             |

### Response Example

```json
[
  {
    "accountAlias": "SgsR", // unique account code
    "asset": "USDT", // asset name
    "balance": "122607.35137903", // wallet balance
    "crossWalletBalance": "23.72469206", // crossed wallet balance
    "crossUnPnl": "0.00000000", // unrealized profit of crossed positions
    "availableBalance": "23.72469206", // available balance
    "maxWithdrawAmount": "23.72469206", // maximum amount for transfer out
    "marginAvailable": true, // whether the asset can be used as margin in Multi-Assets mode
    "updateTime": 1617939110373
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Futures-Account-Balance-V2](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Futures-Account-Balance-V2)

## Account Information V3(USER_DATA)

### API Description

Get current account information. User in single-asset/ multi-assets mode will
see different value, see comments in response section for detail.

### HTTP Request

GET `/fapi/v3/account`

### Request Weight

**5**

### Request Parameters

| Name       | Type | Mandatory | Description |
| ---------- | ---- | --------- | ----------- |
| recvWindow | LONG | NO        |             |
| timestamp  | LONG | YES       |             |

### Response Example

> single-asset mode

```json
{
	"totalInitialMargin": "0.00000000",            // total initial margin required with current mark price (useless with isolated positions), only for USDT asset
	"totalMaintMargin": "0.00000000",  	           // total maintenance margin required, only for USDT asset
	"totalWalletBalance": "103.12345678",           // total wallet balance, only for USDT asset
	"totalUnrealizedProfit": "0.00000000",         // total unrealized profit, only for USDT asset
	"totalMarginBalance": "103.12345678",           // total margin balance, only for USDT asset
	"totalPositionInitialMargin": "0.00000000",    // initial margin required for positions with current mark price, only for USDT asset
	"totalOpenOrderInitialMargin": "0.00000000",   // initial margin required for open orders with current mark price, only for USDT asset
	"totalCrossWalletBalance": "103.12345678",      // crossed wallet balance, only for USDT asset
	"totalCrossUnPnl": "0.00000000",	           // unrealized profit of crossed positions, only for USDT asset
	"availableBalance": "103.12345678",             // available balance, only for USDT asset
	"maxWithdrawAmount": "103.12345678"             // maximum amount for transfer out, only for USDT asset
	"assets": [ // For assets that are quote assets, USDT/USDC/BTC
		{
			"asset": "USDT",			            // asset name
			"walletBalance": "23.72469206",         // wallet balance
			"unrealizedProfit": "0.00000000",       // unrealized profit
			"marginBalance": "23.72469206",         // margin balance
			"maintMargin": "0.00000000",	        // maintenance margin required
			"initialMargin": "0.00000000",          // total initial margin required with current mark price
			"positionInitialMargin": "0.00000000",  // initial margin required for positions with current mark price
			"openOrderInitialMargin": "0.00000000", // initial margin required for open orders with current mark price
			"crossWalletBalance": "23.72469206",    // crossed wallet balance
			"crossUnPnl": "0.00000000"              // unrealized profit of crossed positions
			"availableBalance": "23.72469206",      // available balance
			"maxWithdrawAmount": "23.72469206",     // maximum amount for transfer out
			"updateTime": 1625474304765             // last update time
		},   
 		{
			"asset": "USDC",			            // asset name
			"walletBalance": "103.12345678",         // wallet balance
			"unrealizedProfit": "0.00000000",       // unrealized profit
			"marginBalance": "103.12345678",         // margin balance
			"maintMargin": "0.00000000",	        // maintenance margin required
			"initialMargin": "0.00000000",          // total initial margin required with current mark price
			"positionInitialMargin": "0.00000000",  // initial margin required for positions with current mark price
			"openOrderInitialMargin": "0.00000000", // initial margin required for open orders with current mark price
			"crossWalletBalance": "103.12345678",    // crossed wallet balance
			"crossUnPnl": "0.00000000"              // unrealized profit of crossed positions
			"availableBalance": "126.72469206",      // available balance
			"maxWithdrawAmount": "103.12345678",     // maximum amount for transfer out
			"updateTime": 1625474304765             // last update time
		},  
    ],
	"positions": [  // positions of all symbols user had position/ open orders are returned
		            // only "BOTH" positions will be returned with One-way mode
		            // only "LONG" and "SHORT" positions will be returned with Hedge mode
   	  {
           "symbol": "BTCUSDT",
           "positionSide": "BOTH",            // position side
           "positionAmt": "1.000",
           "unrealizedProfit": "0.00000000",  // unrealized profit     
           "isolatedMargin": "0.00000000",
           "notional": "0",
           "isolatedWallet": "0",
           "initialMargin": "0",              // initial margin required with current mark price
           "maintMargin": "0",                // maintenance margin required
           "updateTime": 0
  	  }
	]
}
```

> OR multi-assets mode

```json
{
	"totalInitialMargin": "0.00000000",            // the sum of USD value of all cross positions/open order initial margin
	"totalMaintMargin": "0.00000000",  	           // the sum of USD value of all cross positions maintenance margin
	"totalWalletBalance": "126.72469206",          // total wallet balance in USD
	"totalUnrealizedProfit": "0.00000000",         // total unrealized profit in USD
	"totalMarginBalance": "126.72469206",          // total margin balance in USD
	"totalPositionInitialMargin": "0.00000000",    // the sum of USD value of all cross positions initial margin
	"totalOpenOrderInitialMargin": "0.00000000",   // initial margin required for open orders with current mark price in USD
	"totalCrossWalletBalance": "126.72469206",     // crossed wallet balance in USD
	"totalCrossUnPnl": "0.00000000",	           // unrealized profit of crossed positions in USD
	"availableBalance": "126.72469206",            // available balance in USD
	"maxWithdrawAmount": "126.72469206"            // maximum virtual amount for transfer out in USD
	"assets": [
		{
			"asset": "USDT",			         // asset name
			"walletBalance": "23.72469206",      // wallet balance
			"unrealizedProfit": "0.00000000",    // unrealized profit
			"marginBalance": "23.72469206",      // margin balance
			"maintMargin": "0.00000000",	     // maintenance margin required
			"initialMargin": "0.00000000",       // total initial margin required with current mark price
			"positionInitialMargin": "0.00000000",    //initial margin required for positions with current mark price
			"openOrderInitialMargin": "0.00000000",   // initial margin required for open orders with current mark price
			"crossWalletBalance": "23.72469206",      // crossed wallet balance
			"crossUnPnl": "0.00000000"       // unrealized profit of crossed positions
			"availableBalance": "126.72469206",       // available balance
			"maxWithdrawAmount": "23.72469206",     // maximum amount for transfer out
			"marginAvailable": true,    // whether the asset can be used as margin in Multi-Assets mode
			"updateTime": 1625474304765 // last update time
		},
		{
			"asset": "BUSD",			// asset name
			"walletBalance": "103.12345678",      // wallet balance
			"unrealizedProfit": "0.00000000",    // unrealized profit
			"marginBalance": "103.12345678",      // margin balance
			"maintMargin": "0.00000000",	    // maintenance margin required
			"initialMargin": "0.00000000",    // total initial margin required with current mark price
			"positionInitialMargin": "0.00000000",    //initial margin required for positions with current mark price
			"openOrderInitialMargin": "0.00000000",   // initial margin required for open orders with current mark price
			"crossWalletBalance": "103.12345678",      // crossed wallet balance
			"crossUnPnl": "0.00000000"       // unrealized profit of crossed positions
			"availableBalance": "126.72469206",       // available balance
			"maxWithdrawAmount": "103.12345678",     // maximum amount for transfer out
			"marginAvailable": true,    // whether the asset can be used as margin in Multi-Assets mode
			"updateTime": 1625474304765 // last update time
		}
	],
 	"positions": [  // positions of all symbols user had position are returned
                    // only "BOTH" positions will be returned with One-way mode
		            // only "LONG" and "SHORT" positions will be returned with Hedge mode
   	  {
           "symbol": "BTCUSDT",
           "positionSide": "BOTH",            // position side
           "positionAmt": "1.000",
           "unrealizedProfit": "0.00000000",  // unrealized profit     
           "isolatedMargin": "0.00000000",
           "notional": "0",
           "isolatedWallet": "0",
           "initialMargin": "0",              // initial margin required with current mark price
           "maintMargin": "0",                // maintenance margin required
           "updateTime": 0
  	  }
	]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Account-Information-V3](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Account-Information-V3)

## Account Information V2(USER_DATA)

### API Description

Get current account information. User in single-asset/ multi-assets mode will
see different value, see comments in response section for detail.

### HTTP Request

GET `/fapi/v2/account`

### Request Weight

**5**

### Request Parameters

| Name       | Type | Mandatory | Description |
| ---------- | ---- | --------- | ----------- |
| recvWindow | LONG | NO        |             |
| timestamp  | LONG | YES       |             |

### Response Example

> single-asset mode

```json
{
	"feeTier": 0,  		// account commission tier
	"feeBurn": true,  	// "true": Fee Discount On; "false": Fee Discount Off	"canTrade": true,  	// if can trade
	"canDeposit": true,  	// if can transfer in asset
	"canWithdraw": true, 	// if can transfer out asset
	"updateTime": 0,        // reserved property, please ignore
	"multiAssetsMargin": false,
	"tradeGroupId": -1,
	"totalInitialMargin": "0.00000000",    // total initial margin required with current mark price (useless with isolated positions), only for USDT asset
	"totalMaintMargin": "0.00000000",  	  // total maintenance margin required, only for USDT asset
	"totalWalletBalance": "23.72469206",     // total wallet balance, only for USDT asset
	"totalUnrealizedProfit": "0.00000000",   // total unrealized profit, only for USDT asset
	"totalMarginBalance": "23.72469206",     // total margin balance, only for USDT asset
	"totalPositionInitialMargin": "0.00000000",    // initial margin required for positions with current mark price, only for USDT asset
	"totalOpenOrderInitialMargin": "0.00000000",   // initial margin required for open orders with current mark price, only for USDT asset
	"totalCrossWalletBalance": "23.72469206",      // crossed wallet balance, only for USDT asset
	"totalCrossUnPnl": "0.00000000",	  // unrealized profit of crossed positions, only for USDT asset
	"availableBalance": "23.72469206",       // available balance, only for USDT asset
	"maxWithdrawAmount": "23.72469206"     // maximum amount for transfer out, only for USDT asset
	"assets": [
		{
			"asset": "USDT",			// asset name
			"walletBalance": "23.72469206",      // wallet balance
			"unrealizedProfit": "0.00000000",    // unrealized profit
			"marginBalance": "23.72469206",      // margin balance
			"maintMargin": "0.00000000",	    // maintenance margin required
			"initialMargin": "0.00000000",    // total initial margin required with current mark price
			"positionInitialMargin": "0.00000000",    //initial margin required for positions with current mark price
			"openOrderInitialMargin": "0.00000000",   // initial margin required for open orders with current mark price
			"crossWalletBalance": "23.72469206",      // crossed wallet balance
			"crossUnPnl": "0.00000000"       // unrealized profit of crossed positions
			"availableBalance": "23.72469206",       // available balance
			"maxWithdrawAmount": "23.72469206",     // maximum amount for transfer out
			"marginAvailable": true,    // whether the asset can be used as margin in Multi-Assets mode
			"updateTime": 1625474304765 // last update time
		},
		{
			"asset": "BUSD",			// asset name
			"walletBalance": "103.12345678",      // wallet balance
			"unrealizedProfit": "0.00000000",    // unrealized profit
			"marginBalance": "103.12345678",      // margin balance
			"maintMargin": "0.00000000",	    // maintenance margin required
			"initialMargin": "0.00000000",    // total initial margin required with current mark price
			"positionInitialMargin": "0.00000000",    //initial margin required for positions with current mark price
			"openOrderInitialMargin": "0.00000000",   // initial margin required for open orders with current mark price
			"crossWalletBalance": "103.12345678",      // crossed wallet balance
			"crossUnPnl": "0.00000000"       // unrealized profit of crossed positions
			"availableBalance": "103.12345678",       // available balance
			"maxWithdrawAmount": "103.12345678",     // maximum amount for transfer out
			"marginAvailable": true,    // whether the asset can be used as margin in Multi-Assets mode
			"updateTime": 1625474304765 // last update time
		}
	],
	"positions": [  // positions of all symbols in the market are returned
		// only "BOTH" positions will be returned with One-way mode
		// only "LONG" and "SHORT" positions will be returned with Hedge mode
		{
			"symbol": "BTCUSDT",  	// symbol name
			"initialMargin": "0",	// initial margin required with current mark price
			"maintMargin": "0",		// maintenance margin required
			"unrealizedProfit": "0.00000000",  // unrealized profit
			"positionInitialMargin": "0",      // initial margin required for positions with current mark price
			"openOrderInitialMargin": "0",     // initial margin required for open orders with current mark price
			"leverage": "100",		// current initial leverage
			"isolated": true,  		// if the position is isolated
			"entryPrice": "0.00000",  	// average entry price
			"maxNotional": "250000",  	// maximum available notional with current leverage
			"bidNotional": "0",  // bids notional, ignore
			"askNotional": "0",  // ask notional, ignore
			"positionSide": "BOTH",  	// position side
			"positionAmt": "0",			// position amount
			"updateTime": 0           // last update time
		}
	]
}
```

> OR multi-assets mode

```json
{
	"feeTier": 0,  		// account commission tier
	"feeBurn": true,  	// "true": Fee Discount On; "false": Fee Discount Off	"canTrade": true,  	// if can trade
	"canTrade": true,  	// if can trade
	"canDeposit": true,  	// if can transfer in asset
	"canWithdraw": true, 	// if can transfer out asset
	"updateTime": 0,        // reserved property, please ignore
	"multiAssetsMargin": true,
	"tradeGroupId": -1,
	"totalInitialMargin": "0.00000000",    // the sum of USD value of all cross positions/open order initial margin
	"totalMaintMargin": "0.00000000",  	  // the sum of USD value of all cross positions maintenance margin
	"totalWalletBalance": "126.72469206",     // total wallet balance in USD
	"totalUnrealizedProfit": "0.00000000",   // total unrealized profit in USD
	"totalMarginBalance": "126.72469206",     // total margin balance in USD
	"totalPositionInitialMargin": "0.00000000",    // the sum of USD value of all cross positions initial margin
	"totalOpenOrderInitialMargin": "0.00000000",   // initial margin required for open orders with current mark price in USD
	"totalCrossWalletBalance": "126.72469206",      // crossed wallet balance in USD
	"totalCrossUnPnl": "0.00000000",	  // unrealized profit of crossed positions in USD
	"availableBalance": "126.72469206",       // available balance in USD
	"maxWithdrawAmount": "126.72469206"     // maximum virtual amount for transfer out in USD
	"assets": [
		{
			"asset": "USDT",			// asset name
			"walletBalance": "23.72469206",      // wallet balance
			"unrealizedProfit": "0.00000000",    // unrealized profit
			"marginBalance": "23.72469206",      // margin balance
			"maintMargin": "0.00000000",	    // maintenance margin required
			"initialMargin": "0.00000000",    // total initial margin required with current mark price
			"positionInitialMargin": "0.00000000",    //initial margin required for positions with current mark price
			"openOrderInitialMargin": "0.00000000",   // initial margin required for open orders with current mark price
			"crossWalletBalance": "23.72469206",      // crossed wallet balance
			"crossUnPnl": "0.00000000"       // unrealized profit of crossed positions
			"availableBalance": "126.72469206",       // available balance
			"maxWithdrawAmount": "23.72469206",     // maximum amount for transfer out
			"marginAvailable": true,    // whether the asset can be used as margin in Multi-Assets mode
			"updateTime": 1625474304765 // last update time
		},
		{
			"asset": "BUSD",			// asset name
			"walletBalance": "103.12345678",      // wallet balance
			"unrealizedProfit": "0.00000000",    // unrealized profit
			"marginBalance": "103.12345678",      // margin balance
			"maintMargin": "0.00000000",	    // maintenance margin required
			"initialMargin": "0.00000000",    // total initial margin required with current mark price
			"positionInitialMargin": "0.00000000",    //initial margin required for positions with current mark price
			"openOrderInitialMargin": "0.00000000",   // initial margin required for open orders with current mark price
			"crossWalletBalance": "103.12345678",      // crossed wallet balance
			"crossUnPnl": "0.00000000"       // unrealized profit of crossed positions
			"availableBalance": "126.72469206",       // available balance
			"maxWithdrawAmount": "103.12345678",     // maximum amount for transfer out
			"marginAvailable": true,    // whether the asset can be used as margin in Multi-Assets mode
			"updateTime": 1625474304765 // last update time
		}
	],
	"positions": [  // positions of all symbols in the market are returned
		// only "BOTH" positions will be returned with One-way mode
		// only "LONG" and "SHORT" positions will be returned with Hedge mode
		{
			"symbol": "BTCUSDT",  	// symbol name
			"initialMargin": "0",	// initial margin required with current mark price
			"maintMargin": "0",		// maintenance margin required
			"unrealizedProfit": "0.00000000",  // unrealized profit
			"positionInitialMargin": "0",      // initial margin required for positions with current mark price
			"openOrderInitialMargin": "0",     // initial margin required for open orders with current mark price
			"leverage": "100",		// current initial leverage
			"isolated": true,  		// if the position is isolated
			"entryPrice": "0.00000",  	// average entry price
			"maxNotional": "250000",  	// maximum available notional with current leverage
			"bidNotional": "0",  // bids notional, ignore
			"askNotional": "0",  // ask notional, ignore
			"positionSide": "BOTH",  	// position side
			"positionAmt": "0",			// position amount
			"updateTime": 0           // last update time
		}
	]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Account-Information-V2](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Account-Information-V2)

## Get Future Account Transaction History List(USER_DATA)

Please find details from
[here](https://developers.binance.com/docs/wallet/asset/query-user-universal-transfer).

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Future-Account-Transaction-History-List](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Future-Account-Transaction-History-List)

## User Commission Rate (USER_DATA)

### API Description

Get User Commission Rate

### HTTP Request

GET `/fapi/v1/commissionRate`

### Request Weight

**20**

### Request Parameters

| Name       | Type   | Mandatory | Description |
| ---------- | ------ | --------- | ----------- |
| symbol     | STRING | YES       |             |
| recvWindow | LONG   | NO        |             |
| timestamp  | LONG   | YES       |             |

### Response Example

```json
{
  "symbol": "BTCUSDT",
  "makerCommissionRate": "0.0002", // 0.02%
  "takerCommissionRate": "0.0004" // 0.04%
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/User-Commission-Rate](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/User-Commission-Rate)

## Futures Account Configuration(USER_DATA)

### API Description

Query account configuration

### HTTP Request

GET `/fapi/v1/accountConfig`

### Request Weight

**5**

### Request Parameters

| Name       | Type | Mandatory | Description |
| ---------- | ---- | --------- | ----------- |
| recvWindow | LONG | NO        |             |
| timestamp  | LONG | YES       |             |

### Response Example

```json
{
  "feeTier": 0, // account commission tier
  "canTrade": true, // if can trade
  "canDeposit": true, // if can transfer in asset
  "canWithdraw": true, // if can transfer out asset
  "dualSidePosition": true,
  "updateTime": 0, // reserved property, please ignore
  "multiAssetsMargin": false,
  "tradeGroupId": -1
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Account-Config](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Account-Config)

## Symbol Configuration(USER_DATA)

### API Description

Get current account symbol configuration.

### HTTP Request

GET `/fapi/v1/symbolConfig`

### Request Weight

**5**

### Request Parameters

| Name       | Type   | Mandatory | Description |
| ---------- | ------ | --------- | ----------- |
| symbol     | STRING | NO        |             |
| recvWindow | LONG   | NO        |             |
| timestamp  | LONG   | YES       |             |

### Response Example

```json
[
  {
    "symbol": "BTCUSDT",
    "marginType": "CROSSED",
    "isAutoAddMargin": "false",
    "leverage": 21,
    "maxNotionalValue": "1000000"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Symbol-Config](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Symbol-Config)

## Query User Rate Limit (USER_DATA)

### API Description

Query User Rate Limit

### HTTP Request

GET `/fapi/v1/rateLimit/order`

### Request Weight

**1**

### Request Parameters

| Name       | Type | Mandatory | Description |
| ---------- | ---- | --------- | ----------- |
| recvWindow | LONG | NO        |             |
| timestamp  | LONG | YES       |             |

### Response Example

```json
[
  {
    "rateLimitType": "ORDERS",
    "interval": "SECOND",
    "intervalNum": 10,
    "limit": 10000
  },
  {
    "rateLimitType": "ORDERS",
    "interval": "MINUTE",
    "intervalNum": 1,
    "limit": 20000
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Query-Rate-Limit](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Query-Rate-Limit)

## Notional and Leverage Brackets (USER_DATA)

### API Description

Query user notional and leverage bracket on speicfic symbol

### HTTP Request

GET `/fapi/v1/leverageBracket`

### Request Weight

**1**

### Request Parameters

| Name       | Type   | Mandatory | Description |
| ---------- | ------ | --------- | ----------- |
| symbol     | STRING | NO        |             |
| recvWindow | LONG   | NO        |             |
| timestamp  | LONG   | YES       |             |

### Response Example

> **Response:**

```json
[
  {
    "symbol": "ETHUSDT",
    "notionalCoef": 1.5, //user symbol bracket multiplier, only appears when user's symbol bracket is adjusted
    "brackets": [
      {
        "bracket": 1, // Notional bracket
        "initialLeverage": 75, // Max initial leverage for this bracket
        "notionalCap": 10000, // Cap notional of this bracket
        "notionalFloor": 0, // Notional threshold of this bracket
        "maintMarginRatio": 0.0065, // Maintenance ratio for this bracket
        "cum": 0 // Auxiliary number for quick calculation
      }
    ]
  }
]
```

> **OR** (if symbol sent)

```json
{
  "symbol": "ETHUSDT",
  "notionalCoef": 1.5,
  "brackets": [
    {
      "bracket": 1,
      "initialLeverage": 75,
      "notionalCap": 10000,
      "notionalFloor": 0,
      "maintMarginRatio": 0.0065,
      "cum": 0
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Notional-and-Leverage-Brackets](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Notional-and-Leverage-Brackets)

## Get Current Multi-Assets Mode (USER_DATA)

### API Description

Get user's Multi-Assets mode (Multi-Assets Mode or Single-Asset Mode) on
**_Every symbol_**

### HTTP Request

GET `/fapi/v1/multiAssetsMargin`

### Request Weight

**30**

### Request Parameters

| Name       | Type | Mandatory | Description |
| ---------- | ---- | --------- | ----------- |
| recvWindow | LONG | NO        |             |
| timestamp  | LONG | YES       |             |

### Response Example

```json
{
  "multiAssetsMargin": true // "true": Multi-Assets Mode; "false": Single-Asset Mode
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Current-Multi-Assets-Mode](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Current-Multi-Assets-Mode)

## Get Current Position Mode(USER_DATA)

### API Description

Get user's position mode (Hedge Mode or One-way Mode ) on **_EVERY symbol_**

### HTTP Request

GET `/fapi/v1/positionSide/dual`

### Request Weight

30

### Request Parameters

| Name       | Type | Mandatory | Description |
| ---------- | ---- | --------- | ----------- |
| recvWindow | LONG | NO        |             |
| timestamp  | LONG | YES       |             |

### Response Example

```json
{
  "dualSidePosition": true // "true": Hedge Mode; "false": One-way Mode
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Current-Position-Mode](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Current-Position-Mode)

## Get Income History (USER_DATA)

### API Description

Query income history

### HTTP Request

GET `/fapi/v1/income`

### Request Weight

**30**

### Request Parameters

| Name       | Type   | Mandatory | Description                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------- | ------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol     | STRING | NO        |                                                                                                                                                                                                                                                                                                                                                                                                             |
| incomeType | STRING | NO        | TRANSFER, WELCOME_BONUS, REALIZED_PNL, FUNDING_FEE, COMMISSION, INSURANCE_CLEAR, REFERRAL_KICKBACK, COMMISSION_REBATE, API_REBATE, CONTEST_REWARD, CROSS_COLLATERAL_TRANSFER, OPTIONS_PREMIUM_FEE, OPTIONS_SETTLE_PROFIT, INTERNAL_TRANSFER, AUTO_EXCHANGE, DELIVERED_SETTELMENT, COIN_SWAP_DEPOSIT, COIN_SWAP_WITHDRAW, POSITION_LIMIT_INCREASE_FEE, STRATEGY_UMFUTURES_TRANSFER，FEE_RETURN，BFUSD_REWARD |
| startTime  | LONG   | NO        | Timestamp in ms to get funding from INCLUSIVE.                                                                                                                                                                                                                                                                                                                                                              |
| endTime    | LONG   | NO        | Timestamp in ms to get funding until INCLUSIVE.                                                                                                                                                                                                                                                                                                                                                             |
| page       | INT    | NO        |                                                                                                                                                                                                                                                                                                                                                                                                             |
| limit      | INT    | NO        | Default 100; max 1000                                                                                                                                                                                                                                                                                                                                                                                       |
| recvWindow | LONG   | NO        |                                                                                                                                                                                                                                                                                                                                                                                                             |
| timestamp  | LONG   | YES       |                                                                                                                                                                                                                                                                                                                                                                                                             |

> - If neither `startTime` nor `endTime` is sent, the recent 7-day data will be
>   returned.
> - If `incomeType` is not sent, all kinds of flow will be returned
> - "trandId" is unique in the same incomeType for a user
> - Income history only contains data for the last three months

### Response Example

```json
[
  {
    "symbol": "", // trade symbol, if existing
    "incomeType": "TRANSFER", // income type
    "income": "-0.37500000", // income amount
    "asset": "USDT", // income asset
    "info": "TRANSFER", // extra information
    "time": 1570608000000,
    "tranId": 9689322392, // transaction id
    "tradeId": "" // trade id, if existing
  },
  {
    "symbol": "BTCUSDT",
    "incomeType": "COMMISSION",
    "income": "-0.01000000",
    "asset": "USDT",
    "info": "COMMISSION",
    "time": 1570636800000,
    "tranId": 9689322392,
    "tradeId": "2059192"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Income-History](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Income-History)

## Futures Trading Quantitative Rules Indicators (USER_DATA)

### API Description

Futures trading quantitative rules indicators, for more information on this,
please refer to the
[Futures Trading Quantitative Rules](https://www.binance.com/en/support/faq/4f462ebe6ff445d4a170be7d9e897272)

### HTTP Request

GET `/fapi/v1/apiTradingStatus`

### Request Weight

- **1** for a single symbol
- **10** when the symbol parameter is omitted

### Request Parameters

| Name       | Type   | Mandatory | Description |
| ---------- | ------ | --------- | ----------- |
| symbol     | STRING | NO        |             |
| recvWindow | LONG   | NO        |             |
| timestamp  | LONG   | YES       |             |

### Response Example

> **Response:**

```json
{
    "indicators": { // indicator: quantitative rules indicators, value: user's indicators value, triggerValue: trigger indicator value threshold of quantitative rules.
        "BTCUSDT": [
            {
				"isLocked": true,
			    "plannedRecoverTime": 1545741270000,
                "indicator": "UFR",  // Unfilled Ratio (UFR)
                "value": 0.05,  // Current value
                "triggerValue": 0.995  // Trigger value
            },
            {
				"isLocked": true,
			    "plannedRecoverTime": 1545741270000,
                "indicator": "IFER",  // IOC/FOK Expiration Ratio (IFER)
                "value": 0.99,  // Current value
                "triggerValue": 0.99  // Trigger value
            },
            {
				"isLocked": true,
			    "plannedRecoverTime": 1545741270000,
                "indicator": "GCR",  // GTC Cancellation Ratio (GCR)
                "value": 0.99,  // Current value
                "triggerValue": 0.99  // Trigger value
            },
            {
				"isLocked": true,
			    "plannedRecoverTime": 1545741270000,
                "indicator": "DR",  // Dust Ratio (DR)
                "value": 0.99,  // Current value
                "triggerValue": 0.99  // Trigger value
            }
        ],
        "ETHUSDT": [
            {
				"isLocked": true,
			    "plannedRecoverTime": 1545741270000,
                "indicator": "UFR",
                "value": 0.05,
                "triggerValue": 0.995
            },
            {
				"isLocked": true,
			    "plannedRecoverTime": 1545741270000,
                "indicator": "IFER",
                "value": 0.99,
                "triggerValue": 0.99
            },
            {
				"isLocked": true,
			    "plannedRecoverTime": 1545741270000,
                "indicator": "GCR",
                "value": 0.99,
                "triggerValue": 0.99
            }
            {
				"isLocked": true,
			    "plannedRecoverTime": 1545741270000,
                "indicator": "DR",
                "value": 0.99,
                "triggerValue": 0.99
            }
        ]
    },
    "updateTime": 1545741270000
}
```

> Or (account violation triggered)

```json
{
  "indicators": {
    "ACCOUNT": [
      {
        "indicator": "TMV", //  Too many violations under multiple symbols trigger account violation
        "value": 10,
        "triggerValue": 1,
        "plannedRecoverTime": 1644919865000,
        "isLocked": true
      }
    ]
  },
  "updateTime": 1644913304748
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Futures-Trading-Quantitative-Rules-Indicators](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Futures-Trading-Quantitative-Rules-Indicators)

## Get Download Id For Futures Transaction History(USER_DATA)

### API Description

Get download id for futures transaction history

### HTTP Request

GET `/fapi/v1/income/asyn`

### Request Weight

**1000**

### Request Parameters

| Name       | Type | Mandatory | Description     |
| ---------- | ---- | --------- | --------------- |
| startTime  | LONG | YES       | Timestamp in ms |
| endTime    | LONG | YES       | Timestamp in ms |
| recvWindow | LONG | NO        |                 |
| timestamp  | LONG | YES       |                 |

> - Request Limitation is 5 times per month, shared by front end download page
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
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Download-Id-For-Futures-Transaction-History](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Download-Id-For-Futures-Transaction-History)

## Get Futures Transaction History Download Link by Id (USER_DATA)

### API Description

Get futures transaction history download link by Id

### HTTP Request

GET `/fapi/v1/income/asyn/id`

### Request Weight

**10**

### Request Parameters

| Name       | Type   | Mandatory | Description            |
| ---------- | ------ | --------- | ---------------------- |
| downloadId | STRING | YES       | get by download id api |
| recvWindow | LONG   | NO        |                        |
| timestamp  | LONG   | YES       |                        |

> - Download link expiration: 24h

### Response Example

> **Response:**

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

> **OR** (Response when server is processing)

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
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Futures-Transaction-History-Download-Link-by-Id](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Futures-Transaction-History-Download-Link-by-Id)

## Get Download Id For Futures Order History (USER_DATA)

### API Description

Get Download Id For Futures Order History

### HTTP Request

GET `/fapi/v1/order/asyn`

### Request Weight

**1000**

### Request Parameters

| Name       | Type | Mandatory | Description     |
| ---------- | ---- | --------- | --------------- |
| startTime  | LONG | YES       | Timestamp in ms |
| endTime    | LONG | YES       | Timestamp in ms |
| recvWindow | LONG | NO        |                 |
| timestamp  | LONG | YES       |                 |

> - Request Limitation is 10 times per month, shared by front end download page
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
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Download-Id-For-Futures-Order-History](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Download-Id-For-Futures-Order-History)

## Get Futures Order History Download Link by Id (USER_DATA)

### API Description

Get futures order history download link by Id

### HTTP Request

GET `/fapi/v1/order/asyn/id`

### Request Weight

**10**

### Request Parameters

| Name       | Type   | Mandatory | Description            |
| ---------- | ------ | --------- | ---------------------- |
| downloadId | STRING | YES       | get by download id api |
| recvWindow | LONG   | NO        |                        |
| timestamp  | LONG   | YES       |                        |

> - Download link expiration: 24h

### Response Example

> **Response:**

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

> **OR** (Response when server is processing)

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
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Futures-Order-History-Download-Link-by-Id](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Futures-Order-History-Download-Link-by-Id)

## Get Download Id For Futures Trade History (USER_DATA)

### API Description

Get download id for futures trade history

### HTTP Request

GET `/fapi/v1/trade/asyn`

### Request Weight

**1000**

### Request Parameters

| Name       | Type | Mandatory | Description     |
| ---------- | ---- | --------- | --------------- |
| startTime  | LONG | YES       | Timestamp in ms |
| endTime    | LONG | YES       | Timestamp in ms |
| recvWindow | LONG | NO        |                 |
| timestamp  | LONG | YES       |                 |

> - Request Limitation is 5 times per month, shared by front end download page
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
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Download-Id-For-Futures-Trade-History](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Download-Id-For-Futures-Trade-History)

## Get Futures Trade Download Link by Id(USER_DATA)

### API Description

Get futures trade download link by Id

### HTTP Request

GET `/fapi/v1/trade/asyn/id`

### Request Weight

**10**

### Request Parameters

| Name       | Type   | Mandatory | Description            |
| ---------- | ------ | --------- | ---------------------- |
| downloadId | STRING | YES       | get by download id api |
| recvWindow | LONG   | NO        |                        |
| timestamp  | LONG   | YES       |                        |

> - Download link expiration: 24h

### Response Example

> **Response:**

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

> **OR** (Response when server is processing)

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
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Futures-Trade-Download-Link-by-Id](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Futures-Trade-Download-Link-by-Id)

## Toggle BNB Burn On Futures Trade (TRADE)

### API Description

Change user's BNB Fee Discount (Fee Discount On or Fee Discount Off ) on
**_EVERY symbol_**

### HTTP Request

POST `/fapi/v1/feeBurn`

### Request Weight

**1**

### Request Parameters

| Name       | Type   | Mandatory | Description                                        |
| ---------- | ------ | --------- | -------------------------------------------------- |
| feeBurn    | STRING | YES       | "true": Fee Discount On; "false": Fee Discount Off |
| recvWindow | LONG   | NO        |                                                    |
| timestamp  | LONG   | YES       |                                                    |

### Response Example

```json
{
  "code": 200,
  "msg": "success"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Toggle-BNB-Burn-On-Futures-Trade](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Toggle-BNB-Burn-On-Futures-Trade)

## Get BNB Burn Status (USER_DATA)

### API Description

Get user's BNB Fee Discount (Fee Discount On or Fee Discount Off )

### HTTP Request

GET `/fapi/v1/feeBurn`

### Request Weight

**30**

### Request Parameters

| Name       | Type | Mandatory | Description |
| ---------- | ---- | --------- | ----------- |
| recvWindow | LONG | NO        |             |
| timestamp  | LONG | YES       |             |

### Response Example

```json
{
  "feeBurn": true // "true": Fee Discount On; "false": Fee Discount Off
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-BNB-Burn-Status](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-BNB-Burn-Status)

## List All Convert Pairs

### API Description

Query for all convertible token pairs and the tokens’ respective upper/lower
limits

### HTTP Request

GET `/fapi/v1/convert/exchangeInfo`

### Request Weight

**20(IP)**

### Request Parameters

| Name      | Type   | Mandatory      | Description        |
| --------- | ------ | -------------- | ------------------ |
| fromAsset | STRING | EITHER OR BOTH | User spends coin   |
| toAsset   | STRING | EITHER OR BOTH | User receives coin |

> - User needs to supply either or both of the input parameter
> - If not defined for both fromAsset and toAsset, only partial token pairs will
>   be returned
> - Asset BNFCR is only available to convert for MICA region users.

### Response Example

```json
[
  {
    "fromAsset": "BTC",
    "toAsset": "USDT",
    "fromAssetMinAmount": "0.0004",
    "fromAssetMaxAmount": "50",
    "toAssetMinAmount": "20",
    "toAssetMaxAmount": "2500000"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/convert](https://developers.binance.com/docs/derivatives/usds-margined-futures/convert)

## Send Quote Request(USER_DATA)

### API Description

Request a quote for the requested token pairs

### HTTP Request

POST `/fapi/v1/convert/getQuote`

### Request Weight

**50(IP)**

**360/hour，500/day**

### Request Parameters

| Name       | Type    | Mandatory | Description                                                                |
| ---------- | ------- | --------- | -------------------------------------------------------------------------- |
| fromAsset  | STRING  | YES       |                                                                            |
| toAsset    | STRING  | YES       |                                                                            |
| fromAmount | DECIMAL | EITHER    | When specified, it is the amount you will be debited after the conversion  |
| toAmount   | DECIMAL | EITHER    | When specified, it is the amount you will be credited after the conversion |
| validTime  | ENUM    | NO        | 10s, default 10s                                                           |
| recvWindow | LONG    | NO        | The value cannot be greater than 60000                                     |
| timestamp  | LONG    | YES       |                                                                            |

- Either fromAmount or toAmount should be sent
- `quoteId` will be returned only if you have enough funds to convert

### Response Example

```json
{
  "quoteId": "12415572564",
  "ratio": "38163.7",
  "inverseRatio": "0.0000262",
  "validTimestamp": 1623319461670,
  "toAmount": "3816.37",
  "fromAmount": "0.1"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/convert/Send-quote-request](https://developers.binance.com/docs/derivatives/usds-margined-futures/convert/Send-quote-request)

## Accept the offered quote (USER_DATA)

### API Description

Accept the offered quote by quote ID.

### HTTP Request

POST `/fapi/v1/convert/acceptQuote`

### Request Weight

**200(IP)**

### Request Parameters

| Name       | Type   | Mandatory | Description                            |
| ---------- | ------ | --------- | -------------------------------------- |
| quoteId    | STRING | YES       |                                        |
| recvWindow | LONG   | NO        | The value cannot be greater than 60000 |
| timestamp  | LONG   | YES       |                                        |

### Response Example

```json
{
  "orderId": "933256278426274426",
  "createTime": 1623381330472,
  "orderStatus": "PROCESS" //PROCESS/ACCEPT_SUCCESS/SUCCESS/FAIL
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/convert/Accept-Quote](https://developers.binance.com/docs/derivatives/usds-margined-futures/convert/Accept-Quote)

## Order status(USER_DATA)

### API Description

Query order status by order ID.

### HTTP Request

GET `/fapi/v1/convert/orderStatus`

### Request Weight

**50(IP)**

### Request Parameters

| Name    | Type   | Mandatory | Description                           |
| ------- | ------ | --------- | ------------------------------------- |
| orderId | STRING | NO        | Either orderId or quoteId is required |
| quoteId | STRING | NO        | Either orderId or quoteId is required |

### Response Example

```json
{
  "orderId": 933256278426274426,
  "orderStatus": "SUCCESS",
  "fromAsset": "BTC",
  "fromAmount": "0.00054414",
  "toAsset": "USDT",
  "toAmount": "20",
  "ratio": "36755",
  "inverseRatio": "0.00002721",
  "createTime": 1623381330472
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/convert/Order-Status](https://developers.binance.com/docs/derivatives/usds-margined-futures/convert/Order-Status)

## Classic Portfolio Margin Account Information (USER_DATA)

### API Description

Get Classic Portfolio Margin current account information.

### HTTP Request

GET `/fapi/v1/pmAccountInfo`

### Request Weight

**5**

### Request Parameters

| Name       | Type   | Mandatory | Description |
| ---------- | ------ | --------- | ----------- |
| asset      | STRING | YES       |             |
| recvWindow | LONG   | NO        |             |
| timestamp  | LONG   | YES       |             |

> - maxWithdrawAmount is for asset transfer out to the spot wallet.

### Response Example

```json
{
  "maxWithdrawAmountUSD": "1627523.32459208", // Classic Portfolio margin maximum virtual amount for transfer out in USD
  "asset": "BTC", // asset name
  "maxWithdrawAmount": "27.43689636" // maximum amount for transfer out
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/portfolio-margin-endpoints](https://developers.binance.com/docs/derivatives/usds-margined-futures/portfolio-margin-endpoints)
