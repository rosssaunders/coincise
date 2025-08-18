# Binance USDM Futures Public REST API Documentation

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

[https://github.com/binance/binance-connector-python](https://github.com/binance/binance-connector-python)

#### Java connector

This is a lightweight library that works as a connector to Binance public API,
written for Java users.

[https://github.com/binance/binance-connector-java](https://github.com/binance/binance-connector-java)

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
[https://github.com/binance/binance-connector-python](https://github.com/binance/binance-connector-python),  
or
use the command below:  
`pip install binance-sdk-derivatives-trading-usds-futures`

#### Java

To get the provided SDK for Binance Futures,  
please visit
[https://github.com/binance/binance-connector-java](https://github.com/binance/binance-connector-java),  
or
use the command below:  
`git clone https://github.com/binance/binance-connector-java.git`

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
| 1008 | Service Unavailable​                           | Server is currently overloaded with other requests. Please try again in a few minutes.                                                                                                                                                                 |
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
| 4109 | INACTIVE_ACCOUNT​                              | \- Inactive account - Transfer any amount of asset to future wallet to reactive                                                                                                                                                                        |
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
| 5043 | Existing_Pending_Modification​                 | A pending modification already exists for this order.                                                                                                                                                                                                  |

### 10xx - General Server or Network issues

### 11xx - Request issues

### 20xx - Processing Issues

### 40xx - Filters and other Issues

### 50xx - Order Execution Issues

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/error-code](https://developers.binance.com/docs/derivatives/usds-margined-futures/error-code)

## Test Connectivity

### API Description

Test connectivity to the Rest API.

### HTTP Request

GET `/fapi/v1/ping`

### Request Weight

1

### Request Parameters

NONE

### Response Example

```json
{}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api)

## Check Server Time

### API Description

Test connectivity to the Rest API and get the current server time.

### HTTP Request

GET `/fapi/v1/time`

### Request Weight

1

### Request Parameters

NONE

### Response Example

```json
{
  "serverTime": 1499827319559
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Check-Server-Time](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Check-Server-Time)

## Exchange Information

### API Description

Current exchange trading rules and symbol information

### HTTP Request

GET `/fapi/v1/exchangeInfo`

### Request Weight

**1**

### Request Parameters

NONE

### Response Example

```json
{
  "exchangeFilters": [],
  "rateLimits": [
    {
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 2400,
      "rateLimitType": "REQUEST_WEIGHT"
    },
    {
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 1200,
      "rateLimitType": "ORDERS"
    }
  ],
  "serverTime": 1565613908500, // Ignore please. If you want to check current server time, please check via "GET /fapi/v1/time"
  "assets": [
    // assets information
    {
      "asset": "BTC",
      "marginAvailable": true, // whether the asset can be used as margin in Multi-Assets mode
      "autoAssetExchange": "-0.10" // auto-exchange threshold in Multi-Assets margin mode
    },
    {
      "asset": "USDT",
      "marginAvailable": true,
      "autoAssetExchange": "0"
    },
    {
      "asset": "BNB",
      "marginAvailable": false,
      "autoAssetExchange": null
    }
  ],
  "symbols": [
    {
      "symbol": "BLZUSDT",
      "pair": "BLZUSDT",
      "contractType": "PERPETUAL",
      "deliveryDate": 4133404800000,
      "onboardDate": 1598252400000,
      "status": "TRADING",
      "maintMarginPercent": "2.5000", // ignore
      "requiredMarginPercent": "5.0000", // ignore
      "baseAsset": "BLZ",
      "quoteAsset": "USDT",
      "marginAsset": "USDT",
      "pricePrecision": 5, // please do not use it as tickSize
      "quantityPrecision": 0, // please do not use it as stepSize
      "baseAssetPrecision": 8,
      "quotePrecision": 8,
      "underlyingType": "COIN",
      "underlyingSubType": ["STORAGE"],
      "settlePlan": 0,
      "triggerProtect": "0.15", // threshold for algo order with "priceProtect"
      "filters": [
        {
          "filterType": "PRICE_FILTER",
          "maxPrice": "300",
          "minPrice": "0.0001",
          "tickSize": "0.0001"
        },
        {
          "filterType": "LOT_SIZE",
          "maxQty": "10000000",
          "minQty": "1",
          "stepSize": "1"
        },
        {
          "filterType": "MARKET_LOT_SIZE",
          "maxQty": "590119",
          "minQty": "1",
          "stepSize": "1"
        },
        {
          "filterType": "MAX_NUM_ORDERS",
          "limit": 200
        },
        {
          "filterType": "MAX_NUM_ALGO_ORDERS",
          "limit": 10
        },
        {
          "filterType": "MIN_NOTIONAL",
          "notional": "5.0"
        },
        {
          "filterType": "PERCENT_PRICE",
          "multiplierUp": "1.1500",
          "multiplierDown": "0.8500",
          "multiplierDecimal": "4"
        }
      ],
      "OrderType": [
        "LIMIT",
        "MARKET",
        "STOP",
        "STOP_MARKET",
        "TAKE_PROFIT",
        "TAKE_PROFIT_MARKET",
        "TRAILING_STOP_MARKET"
      ],
      "timeInForce": ["GTC", "IOC", "FOK", "GTX"],
      "liquidationFee": "0.010000", // liquidation fee rate
      "marketTakeBound": "0.30" // the max price difference rate( from mark price) a market order can make
    }
  ],
  "timezone": "UTC"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Exchange-Information](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Exchange-Information)

## Order Book

### API Description

Query symbol orderbook

### HTTP Request

GET `/fapi/v1/depth`

### Request Weight

Adjusted based on the limit:

| Limit         | Weight |
| ------------- | ------ |
| 5, 10, 20, 50 | 2      |
| 100           | 5      |
| 500           | 10     |
| 1000          | 20     |

### Request Parameters

| Name   | Type   | Mandatory | Description                                                 |
| ------ | ------ | --------- | ----------------------------------------------------------- |
| symbol | STRING | YES       |                                                             |
| limit  | INT    | NO        | Default 500; Valid limits:\[5, 10, 20, 50, 100, 500, 1000\] |

### Response Example

```json
{
  "lastUpdateId": 1027024,
  "E": 1589436922972, // Message output time
  "T": 1589436922959, // Transaction time
  "bids": [
    [
      "4.00000000", // PRICE
      "431.00000000" // QTY
    ]
  ],
  "asks": [["4.00000200", "12.00000000"]]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Order-Book](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Order-Book)

## Recent Trades List

### API Description

Get recent market trades

### HTTP Request

GET `/fapi/v1/trades`

### Request Weight

**5**

### Request Parameters

| Name   | Type   | Mandatory | Description            |
| ------ | ------ | --------- | ---------------------- |
| symbol | STRING | YES       |                        |
| limit  | INT    | NO        | Default 500; max 1000. |

> - Market trades means trades filled in the order book. Only market trades will
>   be returned, which means the insurance fund trades and ADL trades won't be
>   returned.

### Response Example

```json
[
  {
    "id": 28457,
    "price": "4.00000100",
    "qty": "12.00000000",
    "quoteQty": "48.00",
    "time": 1499865549590,
    "isBuyerMaker": true
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Recent-Trades-List](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Recent-Trades-List)

## Old Trades Lookup (MARKET_DATA)

### API Description

Get older market historical trades.

### HTTP Request

GET `/fapi/v1/historicalTrades`

### Request Weight

**20**

### Request Parameters

| Name   | Type   | Mandatory | Description                                             |
| ------ | ------ | --------- | ------------------------------------------------------- |
| symbol | STRING | YES       |                                                         |
| limit  | INT    | NO        | Default 100; max 500.                                   |
| fromId | LONG   | NO        | TradeId to fetch from. Default gets most recent trades. |

> - Market trades means trades filled in the order book. Only market trades will
>   be returned, which means the insurance fund trades and ADL trades won't be
>   returned.
> - Only supports data from within the last three months

### Response Example

```json
[
  {
    "id": 28457,
    "price": "4.00000100",
    "qty": "12.00000000",
    "quoteQty": "8000.00",
    "time": 1499865549590,
    "isBuyerMaker": true
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Old-Trades-Lookup](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Old-Trades-Lookup)

## Compressed/Aggregate Trades List

### API Description

Get compressed, aggregate market trades. Market trades that fill in 100ms with
the same price and the same taking side will have the quantity aggregated.

### HTTP Request

GET `/fapi/v1/aggTrades`

### Request Weight

20

### Request Parameters

| Name      | Type   | Mandatory | Description                                              |
| --------- | ------ | --------- | -------------------------------------------------------- |
| symbol    | STRING | YES       |                                                          |
| fromId    | LONG   | NO        | ID to get aggregate trades from INCLUSIVE.               |
| startTime | LONG   | NO        | Timestamp in ms to get aggregate trades from INCLUSIVE.  |
| endTime   | LONG   | NO        | Timestamp in ms to get aggregate trades until INCLUSIVE. |
| limit     | INT    | NO        | Default 500; max 1000.                                   |

> - support querying futures trade histories that are not older than one year
> - If both `startTime` and `endTime` are sent, time between `startTime` and
>   `endTime` must be less than 1 hour.
> - If `fromId`, `startTime`, and `endTime` are not sent, the most recent
>   aggregate trades will be returned.
> - Only market trades will be aggregated and returned, which means the
>   insurance fund trades and ADL trades won't be aggregated.
> - Sending both `startTime`/`endTime` and `fromId` might cause response
>   timeout, please send either `fromId` or `startTime`/`endTime`

### Response Example

```json
[
  {
    "a": 26129, // Aggregate tradeId
    "p": "0.01633102", // Price
    "q": "4.70443515", // Quantity
    "f": 27781, // First tradeId
    "l": 27781, // Last tradeId
    "T": 1498793709153, // Timestamp
    "m": true // Was the buyer the maker?
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Compressed-Aggregate-Trades-List](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Compressed-Aggregate-Trades-List)

## Kline/Candlestick Data

### API Description

Kline/candlestick bars for a symbol. Klines are uniquely identified by their
open time.

### HTTP Request

GET `/fapi/v1/klines`

### Request Weight

based on parameter `LIMIT`

| LIMIT         | weight |
| ------------- | ------ |
| \[1,100)      | 1      |
| \[100, 500)   | 2      |
| \[500, 1000\] | 5      |
| \> 1000       | 10     |

### Request Parameters

| Name      | Type   | Mandatory | Description            |
| --------- | ------ | --------- | ---------------------- |
| symbol    | STRING | YES       |                        |
| interval  | ENUM   | YES       |                        |
| startTime | LONG   | NO        |                        |
| endTime   | LONG   | NO        |                        |
| limit     | INT    | NO        | Default 500; max 1500. |

> - If startTime and endTime are not sent, the most recent klines are returned.

### Response Example

```json
[
  [
    1499040000000, // Open time
    "0.01634790", // Open
    "0.80000000", // High
    "0.01575800", // Low
    "0.01577100", // Close
    "148976.11427815", // Volume
    1499644799999, // Close time
    "2434.19055334", // Quote asset volume
    308, // Number of trades
    "1756.87402397", // Taker buy base asset volume
    "28.46694368", // Taker buy quote asset volume
    "17928899.62484339" // Ignore.
  ]
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Kline-Candlestick-Data](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Kline-Candlestick-Data)

## Continuous Contract Kline/Candlestick Data

### API Description

Kline/candlestick bars for a specific contract type. Klines are uniquely
identified by their open time.

### HTTP Request

GET `/fapi/v1/continuousKlines`

### Request Weight

based on parameter `LIMIT`

| LIMIT         | weight |
| ------------- | ------ |
| \[1,100)      | 1      |
| \[100, 500)   | 2      |
| \[500, 1000\] | 5      |
| \> 1000       | 10     |

### Request Parameters

| Name         | Type   | Mandatory | Description            |
| ------------ | ------ | --------- | ---------------------- |
| pair         | STRING | YES       |                        |
| contractType | ENUM   | YES       |                        |
| interval     | ENUM   | YES       |                        |
| startTime    | LONG   | NO        |                        |
| endTime      | LONG   | NO        |                        |
| limit        | INT    | NO        | Default 500; max 1500. |

> - If startTime and endTime are not sent, the most recent klines are returned.

> - Contract type:
>   - PERPETUAL
>   - CURRENT_QUARTER
>   - NEXT_QUARTER

### Response Example

```json
[
  [
    1607444700000, // Open time
    "18879.99", // Open
    "18900.00", // High
    "18878.98", // Low
    "18896.13", // Close (or latest price)
    "492.363", // Volume
    1607444759999, // Close time
    "9302145.66080", // Quote asset volume
    1874, // Number of trades
    "385.983", // Taker buy volume
    "7292402.33267", // Taker buy quote asset volume
    "0" // Ignore.
  ]
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Continuous-Contract-Kline-Candlestick-Data](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Continuous-Contract-Kline-Candlestick-Data)

## Index Price Kline/Candlestick Data

### API Description

Kline/candlestick bars for the index price of a pair. Klines are uniquely
identified by their open time.

### HTTP Request

GET `/fapi/v1/indexPriceKlines`

### Request Weight

based on parameter `LIMIT`

| LIMIT         | weight |
| ------------- | ------ |
| \[1,100)      | 1      |
| \[100, 500)   | 2      |
| \[500, 1000\] | 5      |
| \> 1000       | 10     |

### Request Parameters

| Name      | Type   | Mandatory | Description            |
| --------- | ------ | --------- | ---------------------- |
| pair      | STRING | YES       |                        |
| interval  | ENUM   | YES       |                        |
| startTime | LONG   | NO        |                        |
| endTime   | LONG   | NO        |                        |
| limit     | INT    | NO        | Default 500; max 1500. |

- If startTime and endTime are not sent, the most recent klines are returned.

### Response Example

```json
[
  [
    1591256400000, // Open time
    "9653.69440000", // Open
    "9653.69640000", // High
    "9651.38600000", // Low
    "9651.55200000", // Close (or latest price)
    "0	", // Ignore
    1591256459999, // Close time
    "0", // Ignore
    60, // Ignore
    "0", // Ignore
    "0", // Ignore
    "0" // Ignore
  ]
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Index-Price-Kline-Candlestick-Data](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Index-Price-Kline-Candlestick-Data)

## Mark Price Kline/Candlestick Data

### API Description

Kline/candlestick bars for the mark price of a symbol. Klines are uniquely
identified by their open time.

### HTTP Request

GET `/fapi/v1/markPriceKlines`

### Request Weight

based on parameter `LIMIT`

| LIMIT         | weight |
| ------------- | ------ |
| \[1,100)      | 1      |
| \[100, 500)   | 2      |
| \[500, 1000\] | 5      |
| \> 1000       | 10     |

### Request Parameters

| Name      | Type   | Mandatory | Description            |
| --------- | ------ | --------- | ---------------------- |
| symbol    | STRING | YES       |                        |
| interval  | ENUM   | YES       |                        |
| startTime | LONG   | NO        |                        |
| endTime   | LONG   | NO        |                        |
| limit     | INT    | NO        | Default 500; max 1500. |

> - If startTime and endTime are not sent, the most recent klines are returned.

### Response Example

```json
[
  [
    1591256460000, // Open time
    "9653.29201333", // Open
    "9654.56401333", // High
    "9653.07367333", // Low
    "9653.07367333", // Close (or latest price)
    "0	", // Ignore
    1591256519999, // Close time
    "0", // Ignore
    60, // Ignore
    "0", // Ignore
    "0", // Ignore
    "0" // Ignore
  ]
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Mark-Price-Kline-Candlestick-Data](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Mark-Price-Kline-Candlestick-Data)

## Premium index Kline Data

### API Description

Premium index kline bars of a symbol. Klines are uniquely identified by their
open time.

### HTTP Request

GET `/fapi/v1/premiumIndexKlines`

### Request Weight

based on parameter `LIMIT`

| LIMIT         | weight |
| ------------- | ------ |
| \[1,100)      | 1      |
| \[100, 500)   | 2      |
| \[500, 1000\] | 5      |
| \> 1000       | 10     |

### Request Parameters

| Name      | Type   | Mandatory | Description            |
| --------- | ------ | --------- | ---------------------- |
| symbol    | STRING | YES       |                        |
| interval  | ENUM   | YES       |                        |
| startTime | LONG   | NO        |                        |
| endTime   | LONG   | NO        |                        |
| limit     | INT    | NO        | Default 500; max 1500. |

> - If startTime and endTime are not sent, the most recent klines are returned.

### Response Example

```json
[
  [
    1691603820000, // Open time
    "-0.00042931", // Open
    "-0.00023641", // High
    "-0.00059406", // Low
    "-0.00043659", // Close
    "0", // Ignore
    1691603879999, // Close time
    "0", // Ignore
    12, // Ignore
    "0", // Ignore
    "0", // Ignore
    "0" // Ignore
  ]
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Premium-Index-Kline-Data](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Premium-Index-Kline-Data)

## Mark Price

### API Description

Mark Price and Funding Rate

### HTTP Request

GET `/fapi/v1/premiumIndex`

### Request Weight

**1**

### Request Parameters

| Name   | Type   | Mandatory | Description |
| ------ | ------ | --------- | ----------- |
| symbol | STRING | NO        |             |

### Response Example

> **Response:**

```json
{
  "symbol": "BTCUSDT",
  "markPrice": "11793.63104562", // mark price
  "indexPrice": "11781.80495970", // index price
  "estimatedSettlePrice": "11781.16138815", // Estimated Settle Price, only useful in the last hour before the settlement starts.
  "lastFundingRate": "0.00038246", // This is the Latest funding rate
  "interestRate": "0.00010000",
  "nextFundingTime": 1597392000000,
  "time": 1597370495002
}
```

> **OR (when symbol not sent)**

```json
[
  {
    "symbol": "BTCUSDT",
    "markPrice": "11793.63104562", // mark price
    "indexPrice": "11781.80495970", // index price
    "estimatedSettlePrice": "11781.16138815", // Estimated Settle Price, only useful in the last hour before the settlement starts.
    "lastFundingRate": "0.00038246", // This is the Latest funding rate
    "interestRate": "0.00010000",
    "nextFundingTime": 1597392000000,
    "time": 1597370495002
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Mark-Price](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Mark-Price)

## Get Funding Rate History

### API Description

Get Funding Rate History

### HTTP Request

GET `/fapi/v1/fundingRate`

### Request Weight

share 500/5min/IP rate limit with GET /fapi/v1/fundingInfo

### Request Parameters

| Name      | Type   | Mandatory | Description                                          |
| --------- | ------ | --------- | ---------------------------------------------------- |
| symbol    | STRING | NO        |                                                      |
| startTime | LONG   | NO        | Timestamp in ms to get funding rate from INCLUSIVE.  |
| endTime   | LONG   | NO        | Timestamp in ms to get funding rate until INCLUSIVE. |
| limit     | INT    | NO        | Default 100; max 1000                                |

> - If `startTime` and `endTime` are not sent, the most recent `limit` datas are
>   returned.
> - If the number of data between `startTime` and `endTime` is larger than
>   `limit`, return as `startTime` + `limit`.
> - In ascending order.

### Response Example

```json
[
  {
    "symbol": "BTCUSDT",
    "fundingRate": "-0.03750000",
    "fundingTime": 1570608000000,
    "markPrice": "34287.54619963" // mark price associated with a particular funding fee charge
  },
  {
    "symbol": "BTCUSDT",
    "fundingRate": "0.00010000",
    "fundingTime": 1570636800000,
    "markPrice": "34287.54619963"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Get-Funding-Rate-History](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Get-Funding-Rate-History)

## Get Funding Rate Info

### API Description

Query funding rate info for symbols that had FundingRateCap/ FundingRateFloor /
fundingIntervalHours adjustment

### HTTP Request

GET `/fapi/v1/fundingInfo`

### Request Weight

**0** share 500/5min/IP rate limit with `GET /fapi/v1/fundingInfo`

### Request Parameters

### Response Example

```json
[
  {
    "symbol": "BLZUSDT",
    "adjustedFundingRateCap": "0.02500000",
    "adjustedFundingRateFloor": "-0.02500000",
    "fundingIntervalHours": 8,
    "disclaimer": false // ingore
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Get-Funding-Rate-Info](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Get-Funding-Rate-Info)

## 24hr Ticker Price Change Statistics

### API Description

24 hour rolling window price change statistics.  
**Careful** when accessing this with no symbol.

### HTTP Request

GET `/fapi/v1/ticker/24hr`

### Request Weight

**1** for a single symbol;  
**40** when the symbol parameter is omitted

### Request Parameters

| Name   | Type   | Mandatory | Description |
| ------ | ------ | --------- | ----------- |
| symbol | STRING | NO        |             |

> - If the symbol is not sent, tickers for all symbols will be returned in an
>   array.

### Response Example

> **Response:**

```json
{
  "symbol": "BTCUSDT",
  "priceChange": "-94.99999800",
  "priceChangePercent": "-95.960",
  "weightedAvgPrice": "0.29628482",
  "lastPrice": "4.00000200",
  "lastQty": "200.00000000",
  "openPrice": "99.00000000",
  "highPrice": "100.00000000",
  "lowPrice": "0.10000000",
  "volume": "8913.30000000",
  "quoteVolume": "15.30000000",
  "openTime": 1499783499040,
  "closeTime": 1499869899040,
  "firstId": 28385, // First tradeId
  "lastId": 28460, // Last tradeId
  "count": 76 // Trade count
}
```

> OR

```json
[
  {
    "symbol": "BTCUSDT",
    "priceChange": "-94.99999800",
    "priceChangePercent": "-95.960",
    "weightedAvgPrice": "0.29628482",
    "lastPrice": "4.00000200",
    "lastQty": "200.00000000",
    "openPrice": "99.00000000",
    "highPrice": "100.00000000",
    "lowPrice": "0.10000000",
    "volume": "8913.30000000",
    "quoteVolume": "15.30000000",
    "openTime": 1499783499040,
    "closeTime": 1499869899040,
    "firstId": 28385, // First tradeId
    "lastId": 28460, // Last tradeId
    "count": 76 // Trade count
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/24hr-Ticker-Price-Change-Statistics](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/24hr-Ticker-Price-Change-Statistics)

## Symbol Price Ticker

### API Description

Latest price for a symbol or symbols.

### HTTP Request

GET `/fapi/v1/ticker/price`

**Weight:**

**1** for a single symbol;  
**2** when the symbol parameter is omitted

### Request Parameters

| Name   | Type   | Mandatory | Description |
| ------ | ------ | --------- | ----------- |
| symbol | STRING | NO        |             |

> - If the symbol is not sent, prices for all symbols will be returned in an
>   array.

### Response Example

```json
{
  "symbol": "BTCUSDT",
  "price": "6000.01",
  "time": 1589437530011 // Transaction time
}
```

> OR

```json
[
  {
    "symbol": "BTCUSDT",
    "price": "6000.01",
    "time": 1589437530011
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Symbol-Price-Ticker](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Symbol-Price-Ticker)

## Symbol Price Ticker V2

### API Description

Latest price for a symbol or symbols.

### HTTP Request

GET `/fapi/v2/ticker/price`

**Weight:**

**1** for a single symbol;  
**2** when the symbol parameter is omitted

### Request Parameters

| Name   | Type   | Mandatory | Description |
| ------ | ------ | --------- | ----------- |
| symbol | STRING | NO        |             |

> - If the symbol is not sent, prices for all symbols will be returned in an
>   array.
> - The field `X-MBX-USED-WEIGHT-1M` in response header is not accurate from
>   this endpoint, please ignore.

### Response Example

```json
{
  "symbol": "BTCUSDT",
  "price": "6000.01",
  "time": 1589437530011 // Transaction time
}
```

> OR

```json
[
  {
    "symbol": "BTCUSDT",
    "price": "6000.01",
    "time": 1589437530011
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Symbol-Price-Ticker-v2](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Symbol-Price-Ticker-v2)

## Symbol Order Book Ticker

### API Description

Best price/qty on the order book for a symbol or symbols.

### HTTP Request

GET `/fapi/v1/ticker/bookTicker`

### Request Weight

**2** for a single symbol;  
**5** when the symbol parameter is omitted

### Request Parameters

| Name   | Type   | Mandatory | Description |
| ------ | ------ | --------- | ----------- |
| symbol | STRING | NO        |             |

> - If the symbol is not sent, bookTickers for all symbols will be returned in
>   an array.
> - The field `X-MBX-USED-WEIGHT-1M` in response header is not accurate from
>   this endpoint, please ignore.

### Response Example

```json
{
  "symbol": "BTCUSDT",
  "bidPrice": "4.00000000",
  "bidQty": "431.00000000",
  "askPrice": "4.00000200",
  "askQty": "9.00000000",
  "time": 1589437530011 // Transaction time
}
```

> OR

```json
[
  {
    "symbol": "BTCUSDT",
    "bidPrice": "4.00000000",
    "bidQty": "431.00000000",
    "askPrice": "4.00000200",
    "askQty": "9.00000000",
    "time": 1589437530011
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Symbol-Order-Book-Ticker](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Symbol-Order-Book-Ticker)

## Quarterly Contract Settlement Price

### API Description

Latest price for a symbol or symbols.

### HTTP Request

GET `/futures/data/delivery-price`

### Request Weight

**0**

### Request Parameters

| Name | Type   | Mandatory | Description |
| ---- | ------ | --------- | ----------- |
| pair | STRING | YES       | e.g BTCUSDT |

### Response Example

```json
[
  {
    "deliveryTime": 1695945600000,
    "deliveryPrice": 27103.0
  },
  {
    "deliveryTime": 1688083200000,
    "deliveryPrice": 30733.6
  },
  {
    "deliveryTime": 1680220800000,
    "deliveryPrice": 27814.2
  },
  {
    "deliveryTime": 1648166400000,
    "deliveryPrice": 44066.3
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Delivery-Price](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Delivery-Price)

## Open Interest

### API Description

Get present open interest of a specific symbol.

### HTTP Request

GET `/fapi/v1/openInterest`

### Request Weight

**1**

### Request Parameters

| Name   | Type   | Mandatory | Description |
| ------ | ------ | --------- | ----------- |
| symbol | STRING | YES       |             |

### Response Example

```json
{
  "openInterest": "10659.509",
  "symbol": "BTCUSDT",
  "time": 1589437530011 // Transaction time
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Open-Interest](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Open-Interest)

## Open Interest Statistics

### API Description

Open Interest Statistics

### HTTP Request

GET `/futures/data/openInterestHist`

### Request Weight

**0**

### Request Parameters

| Name      | Type   | Mandatory | Description                                     |
| --------- | ------ | --------- | ----------------------------------------------- |
| symbol    | STRING | YES       |                                                 |
| period    | ENUM   | YES       | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| limit     | LONG   | NO        | default 30, max 500                             |
| startTime | LONG   | NO        |                                                 |
| endTime   | LONG   | NO        |                                                 |

> - If startTime and endTime are not sent, the most recent data is returned.
> - Only the data of the latest 1 month is available.
> - IP rate limit 1000 requests/5min

### Response Example

```json
[
  {
    "symbol": "BTCUSDT",
    "sumOpenInterest": "20403.63700000", // total open interest
    "sumOpenInterestValue": "150570784.07809979", // total open interest value
    "CMCCirculatingSupply": "165880.538", // circulating supply provided by CMC
    "timestamp": "1583127900000"
  },
  {
    "symbol": "BTCUSDT",
    "sumOpenInterest": "20401.36700000",
    "sumOpenInterestValue": "149940752.14464448",
    "CMCCirculatingSupply": "165900.14853",
    "timestamp": "1583128200000"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Open-Interest-Statistics](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Open-Interest-Statistics)

## Top Trader Long/Short Ratio (Positions)

### API Description

The proportion of net long and net short positions to total open positions of
the top 20% users with the highest margin balance. Long Position % = Long
positions of top traders / Total open positions of top traders Short Position %
= Short positions of top traders / Total open positions of top traders
Long/Short Ratio (Positions) = Long Position % / Short Position %

### HTTP Request

GET `/futures/data/topLongShortPositionRatio`

### Request Weight

**0**

### Request Parameters

| Name      | Type   | Mandatory | Description                                     |
| --------- | ------ | --------- | ----------------------------------------------- |
| symbol    | STRING | YES       |                                                 |
| period    | ENUM   | YES       | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| limit     | LONG   | NO        | default 30, max 500                             |
| startTime | LONG   | NO        |                                                 |
| endTime   | LONG   | NO        |                                                 |

> - If startTime and endTime are not sent, the most recent data is returned.
> - Only the data of the latest 30 days is available.
> - IP rate limit 1000 requests/5min

### Response Example

```json
[
  {
    "symbol": "BTCUSDT",
    "longShortRatio": "1.4342", // long/short position ratio of top traders
    "longAccount": "0.5891", // long positions ratio of top traders
    "shortAccount": "0.4108", // short positions ratio of top traders
    "timestamp": "1583139600000"
  },

  {
    "symbol": "BTCUSDT",
    "longShortRatio": "1.4337",
    "longAccount": "0.3583",
    "shortAccount": "0.6417",
    "timestamp": "1583139900000"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Top-Trader-Long-Short-Ratio](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Top-Trader-Long-Short-Ratio)

## Top Trader Long/Short Ratio (Accounts)

### API Description

The proportion of net long and net short accounts to total accounts of the top
20% users with the highest margin balance. Each account is counted once only.
Long Account % = Accounts of top traders with net long positions / Total
accounts of top traders with open positions Short Account % = Accounts of top
traders with net short positions / Total accounts of top traders with open
positions Long/Short Ratio (Accounts) = Long Account % / Short Account %

### HTTP Request

GET `/futures/data/topLongShortAccountRatio`

### Request Parameters

| Name      | Type   | Mandatory | Description                                     |
| --------- | ------ | --------- | ----------------------------------------------- |
| symbol    | STRING | YES       |                                                 |
| period    | ENUM   | YES       | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| limit     | LONG   | NO        | default 30, max 500                             |
| startTime | LONG   | NO        |                                                 |
| endTime   | LONG   | NO        |                                                 |

> - If startTime and endTime are not sent, the most recent data is returned.
> - Only the data of the latest 30 days is available.
> - IP rate limit 1000 requests/5min

### Response Example

```json
[
  {
    "symbol": "BTCUSDT",
    "longShortRatio": "1.8105", // long/short account num ratio of top traders
    "longAccount": "0.6442", // long account num ratio of top traders
    "shortAccount": "0.3558", // long account num ratio of top traders
    "timestamp": "1583139600000"
  },
  {
    "symbol": "BTCUSDT",
    "longShortRatio": "0.5576",
    "longAccount": "0.3580",
    "shortAccount": "0.6420",
    "timestamp": "1583139900000"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Top-Long-Short-Account-Ratio](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Top-Long-Short-Account-Ratio)

## Long/Short Ratio

### API Description

Query symbol Long/Short Ratio

### HTTP Request

GET `/futures/data/globalLongShortAccountRatio`

### Request Weight

**0**

### Request Parameters

| Name      | Type   | Mandatory | Description                                     |
| --------- | ------ | --------- | ----------------------------------------------- |
| symbol    | STRING | YES       |                                                 |
| period    | ENUM   | YES       | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| limit     | LONG   | NO        | default 30, max 500                             |
| startTime | LONG   | NO        |                                                 |
| endTime   | LONG   | NO        |                                                 |

> - If startTime and endTime are not sent, the most recent data is returned.
> - Only the data of the latest 30 days is available.
> - IP rate limit 1000 requests/5min

### Response Example

```json
[
  {
    "symbol": "BTCUSDT", // long/short account num ratio of all traders
    "longShortRatio": "0.1960", //long account num ratio of all traders
    "longAccount": "0.6622", // short account num ratio of all traders
    "shortAccount": "0.3378",
    "timestamp": "1583139600000"
  },

  {
    "symbol": "BTCUSDT",
    "longShortRatio": "1.9559",
    "longAccount": "0.6617",
    "shortAccount": "0.3382",
    "timestamp": "1583139900000"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Long-Short-Ratio](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Long-Short-Ratio)

## Taker Buy/Sell Volume

### API Description

Taker Buy/Sell Volume

### HTTP Request

GET `/futures/data/takerlongshortRatio`

### Request Weight

**0**

### Request Parameters

| Name      | Type   | Mandatory | Description                                     |
| --------- | ------ | --------- | ----------------------------------------------- |
| symbol    | STRING | YES       |                                                 |
| period    | ENUM   | YES       | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| limit     | LONG   | NO        | default 30, max 500                             |
| startTime | LONG   | NO        |                                                 |
| endTime   | LONG   | NO        |                                                 |

> - If startTime and endTime are not sent, the most recent data is returned.
> - Only the data of the latest 30 days is available.
> - IP rate limit 1000 requests/5min

### Response Example

```json
[
  {
    "buySellRatio": "1.5586",
    "buyVol": "387.3300",
    "sellVol": "248.5030",
    "timestamp": "1585614900000"
  },
  {
    "buySellRatio": "1.3104",
    "buyVol": "343.9290",
    "sellVol": "248.5030",
    "timestamp": "1583139900000"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Taker-BuySell-Volume](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Taker-BuySell-Volume)

## Basis

### API Description

Query future basis

### HTTP Request

GET `/futures/data/basis`

### Request Weight

**0**

### Request Parameters

| Name         | Type   | Mandatory | Description                                     |
| ------------ | ------ | --------- | ----------------------------------------------- |
| pair         | STRING | YES       | BTCUSDT                                         |
| contractType | ENUM   | YES       | CURRENT_QUARTER, NEXT_QUARTER, PERPETUAL        |
| period       | ENUM   | YES       | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| limit        | LONG   | YES       | Default 30,Max 500                              |
| startTime    | LONG   | NO        |                                                 |
| endTime      | LONG   | NO        |                                                 |

> - If startTime and endTime are not sent, the most recent data is returned.
> - Only the data of the latest 30 days is available.

### Response Example

```json
[
  {
    "indexPrice": "34400.15945055",
    "contractType": "PERPETUAL",
    "basisRate": "0.0004",
    "futuresPrice": "34414.10",
    "annualizedBasisRate": "",
    "basis": "13.94054945",
    "pair": "BTCUSDT",
    "timestamp": 1698742800000
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Basis](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Basis)

## Composite Index Symbol Information

### API Description

Query composite index symbol information

### HTTP Request

GET `/fapi/v1/indexInfo`

### Request Weight

**1**

### Request Parameters

| Name   | Type   | Mandatory | Description |
| ------ | ------ | --------- | ----------- |
| symbol | STRING | NO        |             |

> - Only for composite index symbols

### Response Example

```json
[
  {
    "symbol": "DEFIUSDT",
    "time": 1589437530011, // Current time
    "component": "baseAsset", //Component asset
    "baseAssetList": [
      {
        "baseAsset": "BAL",
        "quoteAsset": "USDT",
        "weightInQuantity": "1.04406228",
        "weightInPercentage": "0.02783900"
      },
      {
        "baseAsset": "BAND",
        "quoteAsset": "USDT",
        "weightInQuantity": "3.53782729",
        "weightInPercentage": "0.03935200"
      }
    ]
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Composite-Index-Symbol-Information](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Composite-Index-Symbol-Information)

## Multi-Assets Mode Asset Index

### API Description

asset index for Multi-Assets mode

### HTTP Request

GET `/fapi/v1/assetIndex`

### Request Weight

**1** for a single symbol; **10** when the symbol parameter is omitted

### Request Parameters

| Name   | Type   | Mandatory | Description |
| ------ | ------ | --------- | ----------- |
| symbol | STRING | NO        | Asset pair  |

### Response Example

> **Response:**

```json
{
  "symbol": "ADAUSD",
  "time": 1635740268004,
  "index": "1.92957370",
  "bidBuffer": "0.10000000",
  "askBuffer": "0.10000000",
  "bidRate": "1.73661633",
  "askRate": "2.12253107",
  "autoExchangeBidBuffer": "0.05000000",
  "autoExchangeAskBuffer": "0.05000000",
  "autoExchangeBidRate": "1.83309501",
  "autoExchangeAskRate": "2.02605238"
}
```

> Or(without symbol)

```json
[
  {
    "symbol": "ADAUSD",
    "time": 1635740268004,
    "index": "1.92957370",
    "bidBuffer": "0.10000000",
    "askBuffer": "0.10000000",
    "bidRate": "1.73661633",
    "askRate": "2.12253107",
    "autoExchangeBidBuffer": "0.05000000",
    "autoExchangeAskBuffer": "0.05000000",
    "autoExchangeBidRate": "1.83309501",
    "autoExchangeAskRate": "2.02605238"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Multi-Assets-Mode-Asset-Index](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Multi-Assets-Mode-Asset-Index)

## Query Index Price Constituents

### API Description

Query index price constituents

### HTTP Request

GET `/fapi/v1/constituents`

### Request Weight

**2**

### Request Parameters

| Name   | Type   | Mandatory | Description |
| ------ | ------ | --------- | ----------- |
| symbol | STRING | YES       |             |

### Response Example

```json
{
  "symbol": "BTCUSDT",
  "time": 1745401553408,
  "constituents": [
    {
      "exchange": "binance",
      "symbol": "BTCUSDT",
      "price": "94057.03000000",
      "weight": "0.51282051"
    },
    {
      "exchange": "coinbase",
      "symbol": "BTC-USDT",
      "price": "94140.58000000",
      "weight": "0.15384615"
    },
    {
      "exchange": "gateio",
      "symbol": "BTC_USDT",
      "price": "94060.10000000",
      "weight": "0.02564103"
    },
    {
      "exchange": "kucoin",
      "symbol": "BTC-USDT",
      "price": "94096.70000000",
      "weight": "0.07692308"
    },
    {
      "exchange": "mxc",
      "symbol": "BTCUSDT",
      "price": "94057.02000000",
      "weight": "0.07692308"
    },
    {
      "exchange": "bitget",
      "symbol": "BTCUSDT",
      "price": "94064.03000000",
      "weight": "0.07692308"
    },
    {
      "exchange": "bybit",
      "symbol": "BTCUSDT",
      "price": "94067.90000000",
      "weight": "0.07692308"
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Index-Constituents](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Index-Constituents)
