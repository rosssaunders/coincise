# Binance COINM Futures Public REST API Documentation

# Quick Start

## API Key Setup[​](/docs/derivatives/quick-start#api-key-setup "Direct link to API Key Setup")

- Some endpoints will require an API Key. Please refer to
  [this page](https://www.binance.com/en/support/faq/how-to-create-api-keys-on-binance-360002502072)
  regarding API key creation.
- Once API key is created, it is recommended to set IP restrictions on the key
  for security reasons.
- **Never share your API key/secret key to ANYONE.**

If the API keys were accidentally shared, please delete them immediately and
create a new key.

## API Key Restrictions[​](/docs/derivatives/quick-start#api-key-restrictions "Direct link to API Key Restrictions")

- After creating the API key, the default restrictions is `Enable Reading`.
- To **enable withdrawals via the API**, the API key restriction needs to be
  modified through the Binance UI.

## Enabling Accounts[​](/docs/derivatives/quick-start#enabling-accounts "Direct link to Enabling Accounts")

### Account[​](/docs/derivatives/quick-start#account "Direct link to Account")

A `SPOT` account is provided by default upon creation of a Binance Account.

### Futures Account[​](/docs/derivatives/quick-start#futures-account "Direct link to Futures Account")

To enable a `FUTURES` account for Futures Trading, please refer to the
[Futures Trading Guide](https://www.binance.com/en/support/faq/a-beginner-s-guide-to-futures-trading-website-360039304272)

### Futures Testnet[​](/docs/derivatives/quick-start#futures-testnet "Direct link to Futures Testnet")

Users can use the Futures Testnet to practice `FUTURES` trading.

Currently, this is only available via the API.

Please refer to the
[Futures Testnet page](https://testnet.binancefuture.com/en/futures/BTCUSDT) for
more information and how to set up the Testnet API key.

### Option Account[​](/docs/derivatives/quick-start#option-account "Direct link to Option Account")

To enable a `OPTION` account for Option Trading, please refer to the
[Option Trading Guide](https://www.binance.com/en/support/faq/introduction-to-binance-options-374321c9317c473480243365298b8706)

## API Library[​](/docs/derivatives/quick-start#api-library "Direct link to API Library")

### Python connector[​](/docs/derivatives/quick-start#python-connector "Direct link to Python connector")

This is a lightweight library that works as a connector to Binance public API,
written in Python.

[https://github.com/binance/binance-futures-connector-python](https://github.com/binance/binance-futures-connector-python)

### Java connector[​](/docs/derivatives/quick-start#java-connector "Direct link to Java connector")

This is a lightweight library that works as a connector to Binance public API,
written for Java users.

[https://github.com/binance/binance-futures-connector-java](https://github.com/binance/binance-futures-connector-java)

# General Info

## testnet[​](/docs/derivatives/coin-margined-futures/general-info#testnet "Direct link to testnet")

- Most of the endpoints can be also used in the testnet platform.
- The REST baseurl for **testnet** is
  "[https://testnet.binancefuture.com](https://testnet.binancefuture.com)"
- The Websocket baseurl for **testnet** is "wss://dstream.binancefuture.com"

## General API Information[​](/docs/derivatives/coin-margined-futures/general-info#general-api-information "Direct link to General API Information")

- The base endpoint is: **[https://dapi.binance.com](https://dapi.binance.com)**
- All endpoints return either a JSON object or array.
- Data is returned in **ascending** order. Oldest first, newest last.
- All time and timestamp related fields are in milliseconds.
- All data types adopt definition in JAVA.

### HTTP Return Codes[​](/docs/derivatives/coin-margined-futures/general-info#http-return-codes "Direct link to HTTP Return Codes")

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

### Error Codes and Messages[​](/docs/derivatives/coin-margined-futures/general-info#error-codes-and-messages "Direct link to Error Codes and Messages")

- Any endpoint can return an ERROR

> _**The error payload is as follows:**_

```
{  "code": -1121,  "msg": "Invalid symbol."}
```

- Specific error codes and messages defined in
  [Error Codes](/docs/derivatives/coin-margined-futures/general-info#error-codes).

### General Information on Endpoints[​](/docs/derivatives/coin-margined-futures/general-info#general-information-on-endpoints "Direct link to General Information on Endpoints")

- For `GET` endpoints, parameters must be sent as a `query string`.
- For `POST`, `PUT`, and `DELETE` endpoints, the parameters may be sent as a
  `query string` or in the `request body` with content type
  `application/x-www-form-urlencoded`. You may mix parameters between both the
  `query string` and `request body` if you wish to do so.
- Parameters may be sent in any order.
- If a parameter sent in both the `query string` and `request body`, the
  `query string` parameter will be used.

## LIMITS[​](/docs/derivatives/coin-margined-futures/general-info#limits "Direct link to LIMITS")

- The `/dapi/v1/exchangeInfo` `rateLimits` array contains objects related to the
  exchange's `RAW_REQUEST`, `REQUEST_WEIGHT`, and `ORDER` rate limits. These are
  further defined in the `ENUM definitions` section under
  `Rate limiters (rateLimitType)`.
- A `429` will be returned when either rate limit is violated.

Binance has the right to further tighten the rate limits on users with intent to
attack.

### IP Limits[​](/docs/derivatives/coin-margined-futures/general-info#ip-limits "Direct link to IP Limits")

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

### Order Rate Limits[​](/docs/derivatives/coin-margined-futures/general-info#order-rate-limits "Direct link to Order Rate Limits")

- Every order response will contain a
  `X-MBX-ORDER-COUNT-(intervalNum)(intervalLetter)` header which has the current
  order count for the account for all order rate limiters defined.
- Rejected/unsuccessful orders are not guaranteed to have `X-MBX-ORDER-COUNT-**`
  headers in the response.
- **The order rate limit is counted against each account**.

## Endpoint Security Type[​](/docs/derivatives/coin-margined-futures/general-info#endpoint-security-type "Direct link to Endpoint Security Type")

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

## SIGNED (TRADE and USER_DATA) Endpoint Security[​](/docs/derivatives/coin-margined-futures/general-info#signed-trade-and-user_data-endpoint-security "Direct link to SIGNED (TRADE and USER_DATA) Endpoint Security")

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

### Timing security[​](/docs/derivatives/coin-margined-futures/general-info#timing-security "Direct link to Timing security")

- A `SIGNED` endpoint also requires a parameter, `timestamp`, to be sent which
  should be the millisecond timestamp of when the request was created and sent.
- An additional parameter, `recvWindow`, may be sent to specify the number of
  milliseconds after `timestamp` the request is valid for. If `recvWindow` is
  not sent, **it defaults to 5000**.
- If the server determines that the timestamp sent by the client is more than
  **one second** in the future of the server time, the request will also be
  rejected.

> The logic is as follows:

```
  if (timestamp < (serverTime + 1000) && (serverTime - timestamp) <= recvWindow){    // process request  }   else {    // reject request  }
```

**Serious trading is about timing.** Networks can be unstable and unreliable,
which can lead to requests taking varying amounts of time to reach the servers.
With `recvWindow`, you can specify that the request must be processed within a
certain number of milliseconds or be rejected by the server.

It is recommended to use a small recvWindow of 5000 or less!

### SIGNED Endpoint Examples for POST /dapi/v1/order - HMAC Keys[​](/docs/derivatives/coin-margined-futures/general-info#signed-endpoint-examples-for-post-dapiv1order---hmac-keys "Direct link to SIGNED Endpoint Examples for POST /dapi/v1/order - HMAC Keys")

Here is a step-by-step example of how to send a vaild signed payload from the
Linux command line using `echo`, `openssl`, and `curl`.

| Key       | Value                                                            |
| --------- | ---------------------------------------------------------------- |
| apiKey    | dbefbc809e3e83c283a984c3a1459732ea7db1360ca80c5c2c8867408d28cc83 |
| secretKey | 2b5eb11e18796d12d88f13dc27dbbd02c2cc51ff7059765ed9821957d82bb4d9 |

| Parameter   | Value         |
| ----------- | ------------- |
| symbol      | BTCUSD_200925 |
| side        | BUY           |
| type        | LIMIT         |
| timeInForce | GTC           |
| quantity    | 1             |
| price       | 9000          |
| recvWindow  | 5000          |
| timestamp   | 1591702613943 |

#### Example 1: As a query string[​](/docs/derivatives/coin-margined-futures/general-info#example-1-as-a-query-string "Direct link to Example 1: As a query string")

> **Example 1**

> **HMAC SHA256 signature:**

```
    $ echo -n "symbol=BTCUSD_200925&side=BUY&type=LIMIT&quantity=1&price=9000&timeInForce=GTC&recvWindow=5000&timestamp=1591702613943" | openssl dgst -sha256 -hmac "2b5eb11e18796d12d88f13dc27dbbd02c2cc51ff7059765ed9821957d82bb4d9"    (stdin)= 21fd819734bf0e5c68740eed892909414d693635c5f7fffab1313925ae13556a
```

> **curl command:**

```
    (HMAC SHA256)    $ curl -H "X-MBX-APIKEY: dbefbc809e3e83c283a984c3a1459732ea7db1360ca80c5c2c8867408d28cc83" -X POST 'https://dapi.binance.com/dapi/v1/order?symbol=BTCUSD_200925&side=BUY&type=LIMIT&quantity=1&price=9000&timeInForce=GTC&recvWindow=5000&timestamp=1591702613943&signature= 21fd819734bf0e5c68740eed892909414d693635c5f7fffab1313925ae13556a'
```

- **queryString:**

  symbol=BTCUSD_200925  
  &side=BUY  
  &type=LIMIT  
  &timeInForce=GTC  
  &quantity=1  
  &price=9000  
  &recvWindow=5000  
  &timestamp=1591702613943

#### Example 2: As a request body[​](/docs/derivatives/coin-margined-futures/general-info#example-2-as-a-request-body "Direct link to Example 2: As a request body")

> **Example 2**

> **HMAC SHA256 signature:**

```
    $ echo -n "symbol=BTCUSD_200925&side=BUY&type=LIMIT&quantity=1&price=9000&timeInForce=GTC&recvWindow=5000&timestamp=1591702613943" | openssl dgst -sha256 -hmac "2b5eb11e18796d12d88f13dc27dbbd02c2cc51ff7059765ed9821957d82bb4d9"    (stdin)= 21fd819734bf0e5c68740eed892909414d693635c5f7fffab1313925ae13556a
```

> **curl command:**

```
    (HMAC SHA256)    $ curl -H "X-MBX-APIKEY: dbefbc809e3e83c283a984c3a1459732ea7db1360ca80c5c2c8867408d28cc83" -X POST 'https://dapi.binance.com/dapi/v1/order' -d 'symbol=BTCUSD_200925&side=BUY&type=LIMIT&quantity=1&price=9000&timeInForce=GTC&recvWindow=5000&timestamp=1591702613943&signature= 21fd819734bf0e5c68740eed892909414d693635c5f7fffab1313925ae13556a'
```

- **requestBody:**

  symbol=BTCUSD_200925  
  &side=BUY  
  &type=LIMIT  
  &timeInForce=GTC  
  &quantity=1  
  &price=9000  
  &recvWindow=5000  
  &timestamp=1591702613943

#### Example 3: Mixed query string and request body[​](/docs/derivatives/coin-margined-futures/general-info#example-3-mixed-query-string-and-request-body "Direct link to Example 3: Mixed query string and request body")

> **Example 3**

> **HMAC SHA256 signature:**

```
    $ echo -n "symbol=BTCUSD_200925&side=BUY&type=LIMIT&timeInForce=GTCquantity=1&price=9000&recvWindow=5000&timestamp= 1591702613943" | openssl dgst -sha256 -hmac "2b5eb11e18796d12d88f13dc27dbbd02c2cc51ff7059765ed9821957d82bb4d9"    (stdin)= f3129e7c72c7727037891ad8a86b76a7dc514ba125a536775c8ba403b2d1b222
```

> **curl command:**

```
    (HMAC SHA256)    $ curl -H "X-MBX-APIKEY: dbefbc809e3e83c283a984c3a1459732ea7db1360ca80c5c2c8867408d28cc83" -X POST 'https://dapi.binance.com/dapi/v1/order?symbol=BTCUSD_200925&side=BUY&type=LIMIT&timeInForce=GTC' -d 'quantity=1&price=9000&recvWindow=5000&timestamp= 1591702613943&signature=f3129e7c72c7727037891ad8a86b76a7dc514ba125a536775c8ba403b2d1b222'
```

- **queryString:** symbol=BTCUSD_200925&side=BUY&type=LIMIT&timeInForce=GTC
- **requestBody:** quantity=1&price=9000&recvWindow=5000&timestamp=
  1591702613943

Note that the signature is different in example 3.  
There is no & between "GTC" and "quantity=1".

### SIGNED Endpoint Examples for POST /dapi/v1/order - RSA Keys[​](/docs/derivatives/coin-margined-futures/general-info#signed-endpoint-examples-for-post-dapiv1order---rsa-keys "Direct link to SIGNED Endpoint Examples for POST /dapi/v1/order - RSA Keys")

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
| symbol     | BTCUSD_PERP   |
| side       | SELL          |
| type       | MARKET        |
| quantity   | 100           |
| recvWindow | 9999999       |
| timestamp  | 1671090801999 |

> **Signature payload (with the listed parameters):**

```
timestamp=1671090801999&recvWindow=9999999&symbol=BTCUSD_PERP&side=SELL&type=MARKET&quantity=100
```

**Step 1: Construct the payload**

Arrange the list of parameters into a string. Separate each parameter with a
`&`.

**Step 2: Compute the signature:**

2.1 - Encode signature payload as ASCII data.

> **Step 2.2**

```
 $ echo -n 'timestamp=1671090801999&recvWindow=9999999&symbol=BTCUSD_PERP&side=SELL&type=MARKET&quantity=100' | openssl dgst -keyform PEM -sha256 -sign ./test-prv-key.pem
```

2.2 - Sign payload using RSASSA-PKCS1-v1_5 algorithm with SHA-256 hash function.

> **Step 2.3**

```
$ echo -n 'timestamp=1671090801999&recvWindow=9999999&symbol=BTCUSD_PERP&side=SELL&type=MARKET&quantity=100' | openssl dgst -keyform PEM -sha256 -sign ./test-prv-key.pem | openssl enc -base64aap36wD5loVXizxvvPI3wz9Cjqwmb3KVbxoym0XeWG1jZq8umqrnSk8H8dkLQeySjgVY91Ufs%2BBGCW%2B4sZjQEpgAfjM76riNxjlD3coGGEsPsT2lG39R%2F1q72zpDs8pYcQ4A692NgHO1zXcgScTGgdkjp%2Brp2bcddKjyz5XBrBM%3D
```

2.3 - Encode output as base64 string.

> **Step 2.4**

```
$  echo -n 'timestamp=1671090801999&recvWindow=9999999&symbol=BTCUSD_PERP&side=SELL&type=MARKET&quantity=100' | openssl dgst -keyform PEM -sha256 -sign ./test-prv-key.pem | openssl enc -base64 | tr -d '\n'aap36wD5loVXizxvvPI3wz9Cjqwmb3KVbxoym0XeWG1jZq8umqrnSk8H8dkLQeySjgVY91Ufs%2BBGCW%2B4sZjQEpgAfjM76riNxjlD3coGGEsPsT2lG39R%2F1q72zpDs8pYcQ4A692NgHO1zXcgScTGgdkjp%2Brp2bcddKjyz5XBrBM%3D
```

2.4 - Delete any newlines in the signature.

> **Step 2.5**

```
aap36wD5loVXizxvvPI3wz9Cjqwmb3KVbxoym0XeWG1jZq8umqrnSk8H8dkLQeySjgVY91Ufs%2BBGCW%2B4sZjQEpgAfjM76riNxjlD3coGGEsPsT2lG39R%2F1q72zpDs8pYcQ4A692NgHO1zXcgScTGgdkjp%2Brp2bcddKjyz5XBrBM%3D
```

2.5 - Since the signature may contain `/` and `=`, this could cause issues with
sending the request. So the signature has to be URL encoded.

> **Step 2.6**

```
 curl -H "X-MBX-APIKEY: vE3BDAL1gP1UaexugRLtteaAHg3UO8Nza20uexEuW1Kh3tVwQfFHdAiyjjY428o2" -X POST 'https://dapi.binance.com/dapi/v1/order?timestamp=1671090801999&recvWindow=9999999&symbol=BTCUSD_PERP&side=SELL&type=MARKET&quantity=100&signature=aap36wD5loVXizxvvPI3wz9Cjqwmb3KVbxoym0XeWG1jZq8umqrnSk8H8dkLQeySjgVY91Ufs%2BBGCW%2B4sZjQEpgAfjM76riNxjlD3coGGEsPsT2lG39R%2F1q72zpDs8pYcQ4A692NgHO1zXcgScTGgdkjp%2Brp2bcddKjyz5XBrBM%3D'
```

2.6 - curl command

> **Bash script**

```
#!/usr/bin/env bash# Set up authentication:apiKey="vE3BDAL1gP1UaexugRLtteaAHg3UO8Nza20uexEuW1Kh3tVwQfFHdAiyjjY428o2"   ### REPLACE THIS WITH YOUR API KEY# Set up the request:apiMethod="POST"apiCall="v1/order"apiParams="timestamp=1671090801999&recvWindow=9999999&symbol=BTCUSD_PERP&side=SELL&type=MARKET&quantity=100"function rawurlencode {    local value="$1"    local len=${#value}    local encoded=""    local pos c o    for (( pos=0 ; pos<len ; pos++ ))    do        c=${value:$pos:1}        case "$c" in            [-_.~a-zA-Z0-9] ) o="${c}" ;;            * )   printf -v o '%%%02x' "'$c"        esac        encoded+="$o"    done    echo "$encoded"}ts=$(date +%s000)paramsWithTs="$apiParams&timestamp=$ts"rawSignature=$(echo -n "$paramsWithTs" \               | openssl dgst -keyform PEM -sha256 -sign ./test-prv-key.pem \  ### THIS IS YOUR PRIVATE KEY. DO NOT SHARE THIS FILE WITH ANYONE.               | openssl enc -base64 \               | tr -d '\n')signature=$(rawurlencode "$rawSignature")curl -H "X-MBX-APIKEY: $apiKey" -X $apiMethod \    "https://dapi.binance.com/dapi/$apiCall?$paramsWithTs&signature=$signature"
```

A sample Bash script containing similar steps is available in the right side.

# Public Endpoints Info

## Terminology[​](/docs/derivatives/coin-margined-futures/common-definition#terminology "Direct link to Terminology")

- `symbol` refers to the symbol name of a contract symbol
- `pair` refers to the underlying symbol of a contracrt symbol
- `base asset` refers to the asset that is the `quantity` of a symbol.
- `quote asset` refers to the asset that is the `price` of a symbol.
- `margin asset` refers to the asset that is the `margin` of a symbol

## ENUM definitions[​](/docs/derivatives/coin-margined-futures/common-definition#enum-definitions "Direct link to ENUM definitions")

**Symbol type:**

- DELIVERY_CONTRACT
- PERPETUAL_CONTRACT

**Contract type (contractType):**

- PERPETUAL
- CURRENT_QUARTER
- NEXT_QUARTER
- CURRENT_QUARTER_DELIVERING // Invalid type, only used for DELIVERING status
- NEXT_QUARTER_DELIVERING // Invalid type, only used for DELIVERING status
- PERPETUAL_DELIVERING

**Contract status (contractStatus, status):**

- PENDING_TRADING
- TRADING
- PRE_DELIVERING
- DELIVERING
- DELIVERED

**Order status (status):**

- NEW
- PARTIALLY_FILLED
- FILLED
- CANCELED
- EXPIRED

**Order types (type):**

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

- GTC - Good Till Cancel
- IOC - Immediate or Cancel
- FOK - Fill or Kill
- GTX - Good Till Crossing (Post Only)

**Working Type (workingType)**

- MARK_PRICE
- CONTRACT_PRICE

**New Order Response Type (newOrderRespType)**

- ACK
- RESULT

**Price Match (priceMatch)**

- NONE: no price match
- OPPONENT: counterparty best price
- OPPONENT_5: counterparty 5th best price
- OPPONENT_10: counterparty 10th best price
- OPPONENT_20: counterparty 20th best price
- QUEUE: the best price on the same side of the order book
- QUEUE_5: the 5th best price on the same side of the order book
- QUEUE_10: the 10th best price on the same side of the order book
- QUEUE_20: the 20th best price on the same side of the order book

**Self-Trade Prevention mode (selfTradePreventionMode)**

- NONE: No Self-Trade Prevention
- EXPIRE_TAKER: expire taker order when STP trigger
- EXPIRE_BOTH: expire taker and maker order when STP trigger
- EXPIRE_MAKER: expire maker order when STP trigger

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

```
  {  	"rateLimitType": "REQUEST_WEIGHT",  	"interval": "MINUTE",  	"intervalNum": 1,  	"limit": 6000  }
```

> ORDERS

```
  {  	"rateLimitType": "ORDERS",  	"interval": "MINUTE",  	"intervalNum": 1,  	"limit": 1200   }
```

- REQUEST_WEIGHT
- ORDERS

**Rate limit intervals (interval)**

- MINUTE

# Filters

Filters define trading rules on a symbol or an exchange.

## Symbol filters[​](/docs/derivatives/coin-margined-futures/common-definition#symbol-filters "Direct link to Symbol filters")

### PRICE_FILTER[​](/docs/derivatives/coin-margined-futures/common-definition#price_filter "Direct link to PRICE_FILTER")

> **/exchangeInfo format:**

```
  {    "filterType": "PRICE_FILTER",    "minPrice": "0.00000100",    "maxPrice": "100000.00000000",    "tickSize": "0.00000100"  }
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

### LOT_SIZE[​](/docs/derivatives/coin-margined-futures/common-definition#lot_size "Direct link to LOT_SIZE")

> **/exchangeInfo format:**

```
  {    "filterType": "LOT_SIZE",    "minQty": "0.00100000",    "maxQty": "100000.00000000",    "stepSize": "0.00100000"  }
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

### MARKET_LOT_SIZE[​](/docs/derivatives/coin-margined-futures/common-definition#market_lot_size "Direct link to MARKET_LOT_SIZE")

> **/exchangeInfo format:**

```
  {    "filterType": "MARKET_LOT_SIZE",    "minQty": "0.00100000",    "maxQty": "100000.00000000",    "stepSize": "0.00100000"  }
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

### MAX_NUM_ORDERS[​](/docs/derivatives/coin-margined-futures/common-definition#max_num_orders "Direct link to MAX_NUM_ORDERS")

> **/exchangeInfo format:**

```
  {    "filterType": "MAX_NUM_ORDERS",    "limit": 200  }
```

The `MAX_NUM_ORDERS` filter defines the maximum number of orders an account is
allowed to have open on a symbol.

Note that both "algo" orders and normal orders are counted for this filter.

### PERCENT_PRICE[​](/docs/derivatives/coin-margined-futures/common-definition#percent_price "Direct link to PERCENT_PRICE")

> **/exchangeInfo format:**

```
  {    "filterType": "PERCENT_PRICE",    "multiplierUp": "1.0500",    "multiplierDown": "0.9500",    "multiplierDecimal": 4  }
```

The `PERCENT_PRICE` filter defines valid range for a price based on the mark
price.

In order to pass the `percent price`, the following must be true for `price`:

- BUY: `price` <= `markPrice` \* `multiplierUp`
- SELL: `price` >= `markPrice` \* `multiplierDown`

# Error Codes

> Here is the error JSON payload:

```
{  "code":-1121,  "msg":"Invalid symbol."}
```

Errors consist of two parts: an error code and a message.  
Codes are universal,but messages can vary.

## 10xx - General Server or Network issues[​](/docs/derivatives/coin-margined-futures/error-code#10xx---general-server-or-network-issues "Direct link to 10xx - General Server or Network issues")

### \-1000 UNKNOWN[​](/docs/derivatives/coin-margined-futures/error-code#-1000-unknown "Direct link to -1000 UNKNOWN")

- An unknown error occured while processing the request.

### \-1001 DISCONNECTED[​](/docs/derivatives/coin-margined-futures/error-code#-1001-disconnected "Direct link to -1001 DISCONNECTED")

- Internal error; unable to process your request. Please try again.

### \-1002 UNAUTHORIZED[​](/docs/derivatives/coin-margined-futures/error-code#-1002-unauthorized "Direct link to -1002 UNAUTHORIZED")

- You are not authorized to execute this request.

### \-1003 TOO_MANY_REQUESTS[​](/docs/derivatives/coin-margined-futures/error-code#-1003-too_many_requests "Direct link to -1003 TOO_MANY_REQUESTS")

- Too many requests; current limit is %s requests per minute. Please use the
  websocket for live updates to avoid polling the API.
- Way too many requests; IP banned until %s. Please use the websocket for live
  updates to avoid bans.

### \-1004 DUPLICATE_IP[​](/docs/derivatives/coin-margined-futures/error-code#-1004-duplicate_ip "Direct link to -1004 DUPLICATE_IP")

- This IP is already on the white list

### \-1005 NO_SUCH_IP[​](/docs/derivatives/coin-margined-futures/error-code#-1005-no_such_ip "Direct link to -1005 NO_SUCH_IP")

- No such IP has been white listed

### \-1006 UNEXPECTED_RESP[​](/docs/derivatives/coin-margined-futures/error-code#-1006-unexpected_resp "Direct link to -1006 UNEXPECTED_RESP")

- An unexpected response was received from the message bus. Execution status
  unknown.

### \-1007 TIMEOUT[​](/docs/derivatives/coin-margined-futures/error-code#-1007-timeout "Direct link to -1007 TIMEOUT")

- Timeout waiting for response from backend server. Send status unknown;
  execution status unknown.

### \-1010 ERROR_MSG_RECEIVED[​](/docs/derivatives/coin-margined-futures/error-code#-1010-error_msg_received "Direct link to -1010 ERROR_MSG_RECEIVED")

- ERROR_MSG_RECEIVED.

### \-1011 NON_WHITE_LIST[​](/docs/derivatives/coin-margined-futures/error-code#-1011-non_white_list "Direct link to -1011 NON_WHITE_LIST")

- This IP cannot access this route.

### \-1013 INVALID_MESSAGE[​](/docs/derivatives/coin-margined-futures/error-code#-1013-invalid_message "Direct link to -1013 INVALID_MESSAGE")

- INVALID_MESSAGE.

### \-1014 UNKNOWN_ORDER_COMPOSITION[​](/docs/derivatives/coin-margined-futures/error-code#-1014-unknown_order_composition "Direct link to -1014 UNKNOWN_ORDER_COMPOSITION")

- Unsupported order combination.

### \-1015 TOO_MANY_ORDERS[​](/docs/derivatives/coin-margined-futures/error-code#-1015-too_many_orders "Direct link to -1015 TOO_MANY_ORDERS")

- Too many new orders.
- Too many new orders; current limit is %s orders per %s.

### \-1016 SERVICE_SHUTTING_DOWN[​](/docs/derivatives/coin-margined-futures/error-code#-1016-service_shutting_down "Direct link to -1016 SERVICE_SHUTTING_DOWN")

- This service is no longer available.

### \-1020 UNSUPPORTED_OPERATION[​](/docs/derivatives/coin-margined-futures/error-code#-1020-unsupported_operation "Direct link to -1020 UNSUPPORTED_OPERATION")

- This operation is not supported.

### \-1021 INVALID_TIMESTAMP[​](/docs/derivatives/coin-margined-futures/error-code#-1021-invalid_timestamp "Direct link to -1021 INVALID_TIMESTAMP")

- Timestamp for this request is outside of the recvWindow.
- Timestamp for this request was 1000ms ahead of the server's time.

### \-1022 INVALID_SIGNATURE[​](/docs/derivatives/coin-margined-futures/error-code#-1022-invalid_signature "Direct link to -1022 INVALID_SIGNATURE")

- Signature for this request is not valid.

### \-1023 START_TIME_GREATER_THAN_END_TIME[​](/docs/derivatives/coin-margined-futures/error-code#-1023-start_time_greater_than_end_time "Direct link to -1023 START_TIME_GREATER_THAN_END_TIME")

- Start time is greater than end time.

## 11xx - Request issues[​](/docs/derivatives/coin-margined-futures/error-code#11xx---request-issues "Direct link to 11xx - Request issues")

### \-1100 ILLEGAL_CHARS[​](/docs/derivatives/coin-margined-futures/error-code#-1100-illegal_chars "Direct link to -1100 ILLEGAL_CHARS")

- Illegal characters found in a parameter.
- Illegal characters found in parameter '%s'; legal range is '%s'.

### \-1101 TOO_MANY_PARAMETERS[​](/docs/derivatives/coin-margined-futures/error-code#-1101-too_many_parameters "Direct link to -1101 TOO_MANY_PARAMETERS")

- Too many parameters sent for this endpoint.
- Too many parameters; expected '%s' and received '%s'.
- Duplicate values for a parameter detected.

### \-1102 MANDATORY_PARAM_EMPTY_OR_MALFORMED[​](/docs/derivatives/coin-margined-futures/error-code#-1102-mandatory_param_empty_or_malformed "Direct link to -1102 MANDATORY_PARAM_EMPTY_OR_MALFORMED")

- A mandatory parameter was not sent, was empty/null, or malformed.
- Mandatory parameter '%s' was not sent, was empty/null, or malformed.
- Param '%s' or '%s' must be sent, but both were empty/null!

### \-1103 UNKNOWN_PARAM[​](/docs/derivatives/coin-margined-futures/error-code#-1103-unknown_param "Direct link to -1103 UNKNOWN_PARAM")

- An unknown parameter was sent.

### \-1104 UNREAD_PARAMETERS[​](/docs/derivatives/coin-margined-futures/error-code#-1104-unread_parameters "Direct link to -1104 UNREAD_PARAMETERS")

- Not all sent parameters were read.
- Not all sent parameters were read; read '%s' parameter(s) but was sent '%s'.

### \-1105 PARAM_EMPTY[​](/docs/derivatives/coin-margined-futures/error-code#-1105-param_empty "Direct link to -1105 PARAM_EMPTY")

- A parameter was empty.
- Parameter '%s' was empty.

### \-1106 PARAM_NOT_REQUIRED[​](/docs/derivatives/coin-margined-futures/error-code#-1106-param_not_required "Direct link to -1106 PARAM_NOT_REQUIRED")

- A parameter was sent when not required.
- Parameter '%s' sent when not required.

### \-1108 BAD_ASSET[​](/docs/derivatives/coin-margined-futures/error-code#-1108-bad_asset "Direct link to -1108 BAD_ASSET")

- Invalid asset.

### \-1109 BAD_ACCOUNT[​](/docs/derivatives/coin-margined-futures/error-code#-1109-bad_account "Direct link to -1109 BAD_ACCOUNT")

- Invalid account.

### \-1110 BAD_INSTRUMENT_TYPE[​](/docs/derivatives/coin-margined-futures/error-code#-1110-bad_instrument_type "Direct link to -1110 BAD_INSTRUMENT_TYPE")

- Invalid symbolType.

### \-1111 BAD_PRECISION[​](/docs/derivatives/coin-margined-futures/error-code#-1111-bad_precision "Direct link to -1111 BAD_PRECISION")

- Precision is over the maximum defined for this asset.

### \-1112 NO_DEPTH[​](/docs/derivatives/coin-margined-futures/error-code#-1112-no_depth "Direct link to -1112 NO_DEPTH")

- No orders on book for symbol.

### \-1113 WITHDRAW_NOT_NEGATIVE[​](/docs/derivatives/coin-margined-futures/error-code#-1113-withdraw_not_negative "Direct link to -1113 WITHDRAW_NOT_NEGATIVE")

- Withdrawal amount must be negative.

### \-1114 TIF_NOT_REQUIRED[​](/docs/derivatives/coin-margined-futures/error-code#-1114-tif_not_required "Direct link to -1114 TIF_NOT_REQUIRED")

- TimeInForce parameter sent when not required.

### \-1115 INVALID_TIF[​](/docs/derivatives/coin-margined-futures/error-code#-1115-invalid_tif "Direct link to -1115 INVALID_TIF")

- Invalid timeInForce.

### \-1116 INVALID_ORDER_TYPE[​](/docs/derivatives/coin-margined-futures/error-code#-1116-invalid_order_type "Direct link to -1116 INVALID_ORDER_TYPE")

- Invalid orderType.

### \-1117 INVALID_SIDE[​](/docs/derivatives/coin-margined-futures/error-code#-1117-invalid_side "Direct link to -1117 INVALID_SIDE")

- Invalid side.

### \-1118 EMPTY_NEW_CL_ORD_ID[​](/docs/derivatives/coin-margined-futures/error-code#-1118-empty_new_cl_ord_id "Direct link to -1118 EMPTY_NEW_CL_ORD_ID")

- New client order ID was empty.

### \-1119 EMPTY_ORG_CL_ORD_ID[​](/docs/derivatives/coin-margined-futures/error-code#-1119-empty_org_cl_ord_id "Direct link to -1119 EMPTY_ORG_CL_ORD_ID")

- Original client order ID was empty.

### \-1120 BAD_INTERVAL[​](/docs/derivatives/coin-margined-futures/error-code#-1120-bad_interval "Direct link to -1120 BAD_INTERVAL")

- Invalid interval.

### \-1121 BAD_SYMBOL[​](/docs/derivatives/coin-margined-futures/error-code#-1121-bad_symbol "Direct link to -1121 BAD_SYMBOL")

- Invalid symbol.

### \-1125 INVALID_LISTEN_KEY[​](/docs/derivatives/coin-margined-futures/error-code#-1125-invalid_listen_key "Direct link to -1125 INVALID_LISTEN_KEY")

- This listenKey does not exist. Please use `POST /fapi/v1/listenKey` to
  recreate `listenKey`

### \-1127 MORE_THAN_XX_HOURS[​](/docs/derivatives/coin-margined-futures/error-code#-1127-more_than_xx_hours "Direct link to -1127 MORE_THAN_XX_HOURS")

- Lookup interval is too big.
- More than %s hours between startTime and endTime.

### \-1128 OPTIONAL_PARAMS_BAD_COMBO[​](/docs/derivatives/coin-margined-futures/error-code#-1128-optional_params_bad_combo "Direct link to -1128 OPTIONAL_PARAMS_BAD_COMBO")

- Combination of optional parameters invalid.

### \-1130 INVALID_PARAMETER[​](/docs/derivatives/coin-margined-futures/error-code#-1130-invalid_parameter "Direct link to -1130 INVALID_PARAMETER")

- Invalid data sent for a parameter.
- Data sent for parameter '%s' is not valid.

### \-1136 INVALID_NEW_ORDER_RESP_TYPE[​](/docs/derivatives/coin-margined-futures/error-code#-1136-invalid_new_order_resp_type "Direct link to -1136 INVALID_NEW_ORDER_RESP_TYPE")

- Invalid newOrderRespType.

## 20xx - Processing Issues[​](/docs/derivatives/coin-margined-futures/error-code#20xx---processing-issues "Direct link to 20xx - Processing Issues")

### \-2010 NEW_ORDER_REJECTED[​](/docs/derivatives/coin-margined-futures/error-code#-2010-new_order_rejected "Direct link to -2010 NEW_ORDER_REJECTED")

- NEW_ORDER_REJECTED

### \-2011 CANCEL_REJECTED[​](/docs/derivatives/coin-margined-futures/error-code#-2011-cancel_rejected "Direct link to -2011 CANCEL_REJECTED")

- CANCEL_REJECTED

### \-2013 NO_SUCH_ORDER[​](/docs/derivatives/coin-margined-futures/error-code#-2013-no_such_order "Direct link to -2013 NO_SUCH_ORDER")

- Order does not exist.

### \-2014 BAD_API_KEY_FMT[​](/docs/derivatives/coin-margined-futures/error-code#-2014-bad_api_key_fmt "Direct link to -2014 BAD_API_KEY_FMT")

- API-key format invalid.

### \-2015 REJECTED_MBX_KEY[​](/docs/derivatives/coin-margined-futures/error-code#-2015-rejected_mbx_key "Direct link to -2015 REJECTED_MBX_KEY")

- Invalid API-key, IP, or permissions for action.

### \-2016 NO_TRADING_WINDOW[​](/docs/derivatives/coin-margined-futures/error-code#-2016-no_trading_window "Direct link to -2016 NO_TRADING_WINDOW")

- No trading window could be found for the symbol. Try ticker/24hrs instead.

### \-2018 BALANCE_NOT_SUFFICIENT[​](/docs/derivatives/coin-margined-futures/error-code#-2018-balance_not_sufficient "Direct link to -2018 BALANCE_NOT_SUFFICIENT")

- Balance is insufficient.

### \-2019 MARGIN_NOT_SUFFICIEN[​](/docs/derivatives/coin-margined-futures/error-code#-2019-margin_not_sufficien "Direct link to -2019 MARGIN_NOT_SUFFICIEN")

- Margin is insufficient.

### \-2020 UNABLE_TO_FILL[​](/docs/derivatives/coin-margined-futures/error-code#-2020-unable_to_fill "Direct link to -2020 UNABLE_TO_FILL")

- Unable to fill.

### \-2021 ORDER_WOULD_IMMEDIATELY_TRIGGER[​](/docs/derivatives/coin-margined-futures/error-code#-2021-order_would_immediately_trigger "Direct link to -2021 ORDER_WOULD_IMMEDIATELY_TRIGGER")

- Order would immediately trigger.

### \-2022 REDUCE_ONLY_REJECT[​](/docs/derivatives/coin-margined-futures/error-code#-2022-reduce_only_reject "Direct link to -2022 REDUCE_ONLY_REJECT")

- ReduceOnly Order is rejected.

### \-2023 USER_IN_LIQUIDATION[​](/docs/derivatives/coin-margined-futures/error-code#-2023-user_in_liquidation "Direct link to -2023 USER_IN_LIQUIDATION")

- User in liquidation mode now.

### \-2024 POSITION_NOT_SUFFICIENT[​](/docs/derivatives/coin-margined-futures/error-code#-2024-position_not_sufficient "Direct link to -2024 POSITION_NOT_SUFFICIENT")

- Position is not sufficient.

### \-2025 MAX_OPEN_ORDER_EXCEEDED[​](/docs/derivatives/coin-margined-futures/error-code#-2025-max_open_order_exceeded "Direct link to -2025 MAX_OPEN_ORDER_EXCEEDED")

- Reach max open order limit.

### \-2026 REDUCE_ONLY_ORDER_TYPE_NOT_SUPPORTED[​](/docs/derivatives/coin-margined-futures/error-code#-2026-reduce_only_order_type_not_supported "Direct link to -2026 REDUCE_ONLY_ORDER_TYPE_NOT_SUPPORTED")

- This OrderType is not supported when reduceOnly.

### \-2027 MAX_LEVERAGE_RATIO[​](/docs/derivatives/coin-margined-futures/error-code#-2027-max_leverage_ratio "Direct link to -2027 MAX_LEVERAGE_RATIO")

- Exceeded the maximum allowable position at current leverage.

### \-2028 MIN_LEVERAGE_RATIO[​](/docs/derivatives/coin-margined-futures/error-code#-2028-min_leverage_ratio "Direct link to -2028 MIN_LEVERAGE_RATIO")

- Leverage is smaller than permitted: insufficient margin balance.

## 40xx - Filters and other Issues[​](/docs/derivatives/coin-margined-futures/error-code#40xx---filters-and-other-issues "Direct link to 40xx - Filters and other Issues")

### \-4000 INVALID_ORDER_STATUS[​](/docs/derivatives/coin-margined-futures/error-code#-4000-invalid_order_status "Direct link to -4000 INVALID_ORDER_STATUS")

- Invalid order status.

### \-4001 PRICE_LESS_THAN_ZERO[​](/docs/derivatives/coin-margined-futures/error-code#-4001-price_less_than_zero "Direct link to -4001 PRICE_LESS_THAN_ZERO")

- Price less than 0.

### \-4002 PRICE_GREATER_THAN_MAX_PRICE[​](/docs/derivatives/coin-margined-futures/error-code#-4002-price_greater_than_max_price "Direct link to -4002 PRICE_GREATER_THAN_MAX_PRICE")

- Price greater than max price.

### \-4003 QTY_LESS_THAN_ZERO[​](/docs/derivatives/coin-margined-futures/error-code#-4003-qty_less_than_zero "Direct link to -4003 QTY_LESS_THAN_ZERO")

- Quantity less than zero.

### \-4004 QTY_LESS_THAN_MIN_QTY[​](/docs/derivatives/coin-margined-futures/error-code#-4004-qty_less_than_min_qty "Direct link to -4004 QTY_LESS_THAN_MIN_QTY")

- Quantity less than min quantity.

### \-4005 QTY_GREATER_THAN_MAX_QTY[​](/docs/derivatives/coin-margined-futures/error-code#-4005-qty_greater_than_max_qty "Direct link to -4005 QTY_GREATER_THAN_MAX_QTY")

- Quantity greater than max quantity.

### \-4006 STOP_PRICE_LESS_THAN_ZERO[​](/docs/derivatives/coin-margined-futures/error-code#-4006-stop_price_less_than_zero "Direct link to -4006 STOP_PRICE_LESS_THAN_ZERO")

- Stop price less than zero.

### \-4007 STOP_PRICE_GREATER_THAN_MAX_PRICE[​](/docs/derivatives/coin-margined-futures/error-code#-4007-stop_price_greater_than_max_price "Direct link to -4007 STOP_PRICE_GREATER_THAN_MAX_PRICE")

- Stop price greater than max price.

### \-4008 TICK_SIZE_LESS_THAN_ZERO[​](/docs/derivatives/coin-margined-futures/error-code#-4008-tick_size_less_than_zero "Direct link to -4008 TICK_SIZE_LESS_THAN_ZERO")

- Tick size less than zero.

### \-4009 MAX_PRICE_LESS_THAN_MIN_PRICE[​](/docs/derivatives/coin-margined-futures/error-code#-4009-max_price_less_than_min_price "Direct link to -4009 MAX_PRICE_LESS_THAN_MIN_PRICE")

- Max price less than min price.

### \-4010 MAX_QTY_LESS_THAN_MIN_QTY[​](/docs/derivatives/coin-margined-futures/error-code#-4010-max_qty_less_than_min_qty "Direct link to -4010 MAX_QTY_LESS_THAN_MIN_QTY")

- Max qty less than min qty.

### \-4011 STEP_SIZE_LESS_THAN_ZERO[​](/docs/derivatives/coin-margined-futures/error-code#-4011-step_size_less_than_zero "Direct link to -4011 STEP_SIZE_LESS_THAN_ZERO")

- Step size less than zero.

### \-4012 MAX_NUM_ORDERS_LESS_THAN_ZERO[​](/docs/derivatives/coin-margined-futures/error-code#-4012-max_num_orders_less_than_zero "Direct link to -4012 MAX_NUM_ORDERS_LESS_THAN_ZERO")

- Max mum orders less than zero.

### \-4013 PRICE_LESS_THAN_MIN_PRICE[​](/docs/derivatives/coin-margined-futures/error-code#-4013-price_less_than_min_price "Direct link to -4013 PRICE_LESS_THAN_MIN_PRICE")

- Price less than min price.

### \-4014 PRICE_NOT_INCREASED_BY_TICK_SIZE[​](/docs/derivatives/coin-margined-futures/error-code#-4014-price_not_increased_by_tick_size "Direct link to -4014 PRICE_NOT_INCREASED_BY_TICK_SIZE")

- Price not increased by tick size.

### \-4015 INVALID_CL_ORD_ID_LEN[​](/docs/derivatives/coin-margined-futures/error-code#-4015-invalid_cl_ord_id_len "Direct link to -4015 INVALID_CL_ORD_ID_LEN")

- Client order id is not valid.
- Client order id length should not be more than 36 chars

### \-4016 PRICE_HIGHTER_THAN_MULTIPLIER_UP[​](/docs/derivatives/coin-margined-futures/error-code#-4016-price_highter_than_multiplier_up "Direct link to -4016 PRICE_HIGHTER_THAN_MULTIPLIER_UP")

- Price is higher than mark price multiplier cap.

### \-4017 MULTIPLIER_UP_LESS_THAN_ZERO[​](/docs/derivatives/coin-margined-futures/error-code#-4017-multiplier_up_less_than_zero "Direct link to -4017 MULTIPLIER_UP_LESS_THAN_ZERO")

- Multiplier up less than zero.

### \-4018 MULTIPLIER_DOWN_LESS_THAN_ZERO[​](/docs/derivatives/coin-margined-futures/error-code#-4018-multiplier_down_less_than_zero "Direct link to -4018 MULTIPLIER_DOWN_LESS_THAN_ZERO")

- Multiplier down less than zero.

### \-4019 COMPOSITE_SCALE_OVERFLOW[​](/docs/derivatives/coin-margined-futures/error-code#-4019-composite_scale_overflow "Direct link to -4019 COMPOSITE_SCALE_OVERFLOW")

- Composite scale too large.

### \-4020 TARGET_STRATEGY_INVALID[​](/docs/derivatives/coin-margined-futures/error-code#-4020-target_strategy_invalid "Direct link to -4020 TARGET_STRATEGY_INVALID")

- Target strategy invalid for orderType '%s',reduceOnly '%b'.

### \-4021 INVALID_DEPTH_LIMIT[​](/docs/derivatives/coin-margined-futures/error-code#-4021-invalid_depth_limit "Direct link to -4021 INVALID_DEPTH_LIMIT")

- Invalid depth limit.
- '%s' is not valid depth limit.

### \-4022 WRONG_MARKET_STATUS[​](/docs/derivatives/coin-margined-futures/error-code#-4022-wrong_market_status "Direct link to -4022 WRONG_MARKET_STATUS")

- market status sent is not valid.

### \-4023 QTY_NOT_INCREASED_BY_STEP_SIZE[​](/docs/derivatives/coin-margined-futures/error-code#-4023-qty_not_increased_by_step_size "Direct link to -4023 QTY_NOT_INCREASED_BY_STEP_SIZE")

- Qty not increased by step size.

### \-4024 PRICE_LOWER_THAN_MULTIPLIER_DOWN[​](/docs/derivatives/coin-margined-futures/error-code#-4024-price_lower_than_multiplier_down "Direct link to -4024 PRICE_LOWER_THAN_MULTIPLIER_DOWN")

- Price is lower than mark price multiplier floor.

### \-4025 MULTIPLIER_DECIMAL_LESS_THAN_ZERO[​](/docs/derivatives/coin-margined-futures/error-code#-4025-multiplier_decimal_less_than_zero "Direct link to -4025 MULTIPLIER_DECIMAL_LESS_THAN_ZERO")

- Multiplier decimal less than zero.

### \-4026 COMMISSION_INVALID[​](/docs/derivatives/coin-margined-futures/error-code#-4026-commission_invalid "Direct link to -4026 COMMISSION_INVALID")

- Commission invalid.
- `%s` less than zero.
- `%s` absolute value greater than `%s`

### \-4027 INVALID_ACCOUNT_TYPE[​](/docs/derivatives/coin-margined-futures/error-code#-4027-invalid_account_type "Direct link to -4027 INVALID_ACCOUNT_TYPE")

- Invalid account type.

### \-4028 INVALID_LEVERAGE[​](/docs/derivatives/coin-margined-futures/error-code#-4028-invalid_leverage "Direct link to -4028 INVALID_LEVERAGE")

- Invalid leverage
- Leverage `%s` is not valid
- Leverage `%s` already exist with `%s`

### \-4029 INVALID_TICK_SIZE_PRECISION[​](/docs/derivatives/coin-margined-futures/error-code#-4029-invalid_tick_size_precision "Direct link to -4029 INVALID_TICK_SIZE_PRECISION")

- Tick size precision is invalid.

### \-4030 INVALID_STEP_SIZE_PRECISION[​](/docs/derivatives/coin-margined-futures/error-code#-4030-invalid_step_size_precision "Direct link to -4030 INVALID_STEP_SIZE_PRECISION")

- Step size precision is invalid.

### \-4031 INVALID_WORKING_TYPE[​](/docs/derivatives/coin-margined-futures/error-code#-4031-invalid_working_type "Direct link to -4031 INVALID_WORKING_TYPE")

- Invalid parameter working type
- Invalid parameter working type: `%s`

### \-4032 EXCEED_MAX_CANCEL_ORDER_SIZE[​](/docs/derivatives/coin-margined-futures/error-code#-4032-exceed_max_cancel_order_size "Direct link to -4032 EXCEED_MAX_CANCEL_ORDER_SIZE")

- Exceed maximum cancel order size.
- Invalid parameter working type: `%s`

### \-4033 INSURANCE_ACCOUNT_NOT_FOUND[​](/docs/derivatives/coin-margined-futures/error-code#-4033-insurance_account_not_found "Direct link to -4033 INSURANCE_ACCOUNT_NOT_FOUND")

- Insurance account not found.

### \-4044 INVALID_BALANCE_TYPE[​](/docs/derivatives/coin-margined-futures/error-code#-4044-invalid_balance_type "Direct link to -4044 INVALID_BALANCE_TYPE")

- Balance Type is invalid.

### \-4045 MAX_STOP_ORDER_EXCEEDED[​](/docs/derivatives/coin-margined-futures/error-code#-4045-max_stop_order_exceeded "Direct link to -4045 MAX_STOP_ORDER_EXCEEDED")

- Reach max stop order limit.

### \-4046 NO_NEED_TO_CHANGE_MARGIN_TYPE[​](/docs/derivatives/coin-margined-futures/error-code#-4046-no_need_to_change_margin_type "Direct link to -4046 NO_NEED_TO_CHANGE_MARGIN_TYPE")

- No need to change margin type.

### \-4047 THERE_EXISTS_OPEN_ORDERS[​](/docs/derivatives/coin-margined-futures/error-code#-4047-there_exists_open_orders "Direct link to -4047 THERE_EXISTS_OPEN_ORDERS")

- Margin type cannot be changed if there exists open orders.

### \-4048 THERE_EXISTS_QUANTITY[​](/docs/derivatives/coin-margined-futures/error-code#-4048-there_exists_quantity "Direct link to -4048 THERE_EXISTS_QUANTITY")

- Margin type cannot be changed if there exists position.

### \-4049 ADD_ISOLATED_MARGIN_REJECT[​](/docs/derivatives/coin-margined-futures/error-code#-4049-add_isolated_margin_reject "Direct link to -4049 ADD_ISOLATED_MARGIN_REJECT")

- Add margin only support for isolated position.

### \-4050 CROSS_BALANCE_INSUFFICIENT[​](/docs/derivatives/coin-margined-futures/error-code#-4050-cross_balance_insufficient "Direct link to -4050 CROSS_BALANCE_INSUFFICIENT")

- Cross balance insufficient.

### \-4051 ISOLATED_BALANCE_INSUFFICIENT[​](/docs/derivatives/coin-margined-futures/error-code#-4051-isolated_balance_insufficient "Direct link to -4051 ISOLATED_BALANCE_INSUFFICIENT")

- Isolated balance insufficient.

### \-4052 NO_NEED_TO_CHANGE_AUTO_ADD_MARGIN[​](/docs/derivatives/coin-margined-futures/error-code#-4052-no_need_to_change_auto_add_margin "Direct link to -4052 NO_NEED_TO_CHANGE_AUTO_ADD_MARGIN")

- No need to change auto add margin.

### \-4053 AUTO_ADD_CROSSED_MARGIN_REJECT[​](/docs/derivatives/coin-margined-futures/error-code#-4053-auto_add_crossed_margin_reject "Direct link to -4053 AUTO_ADD_CROSSED_MARGIN_REJECT")

- Auto add margin only support for isolated position.

### \-4054 ADD_ISOLATED_MARGIN_NO_POSITION_REJECT[​](/docs/derivatives/coin-margined-futures/error-code#-4054-add_isolated_margin_no_position_reject "Direct link to -4054 ADD_ISOLATED_MARGIN_NO_POSITION_REJECT")

- Cannot add position margin: position is 0.

### \-4055 AMOUNT_MUST_BE_POSITIVE[​](/docs/derivatives/coin-margined-futures/error-code#-4055-amount_must_be_positive "Direct link to -4055 AMOUNT_MUST_BE_POSITIVE")

- Amount must be positive.

### \-4056 INVALID_API_KEY_TYPE[​](/docs/derivatives/coin-margined-futures/error-code#-4056-invalid_api_key_type "Direct link to -4056 INVALID_API_KEY_TYPE")

- Invalid api key type.

### \-4057 INVALID_RSA_PUBLIC_KEY[​](/docs/derivatives/coin-margined-futures/error-code#-4057-invalid_rsa_public_key "Direct link to -4057 INVALID_RSA_PUBLIC_KEY")

- Invalid api public key

### \-4058 MAX_PRICE_TOO_LARGE[​](/docs/derivatives/coin-margined-futures/error-code#-4058-max_price_too_large "Direct link to -4058 MAX_PRICE_TOO_LARGE")

- maxPrice and priceDecimal too large,please check.

### \-4059 NO_NEED_TO_CHANGE_POSITION_SIDE[​](/docs/derivatives/coin-margined-futures/error-code#-4059-no_need_to_change_position_side "Direct link to -4059 NO_NEED_TO_CHANGE_POSITION_SIDE")

- No need to change position side.

### \-4060 INVALID_POSITION_SIDE[​](/docs/derivatives/coin-margined-futures/error-code#-4060-invalid_position_side "Direct link to -4060 INVALID_POSITION_SIDE")

- Invalid position side.

### \-4061 POSITION_SIDE_NOT_MATCH[​](/docs/derivatives/coin-margined-futures/error-code#-4061-position_side_not_match "Direct link to -4061 POSITION_SIDE_NOT_MATCH")

- Order's position side does not match user's setting.

### \-4062 REDUCE_ONLY_CONFLICT[​](/docs/derivatives/coin-margined-futures/error-code#-4062-reduce_only_conflict "Direct link to -4062 REDUCE_ONLY_CONFLICT")

- Invalid or improper reduceOnly value.

### \-4067 POSITION_SIDE_CHANGE_EXISTS_OPEN_ORDERS[​](/docs/derivatives/coin-margined-futures/error-code#-4067-position_side_change_exists_open_orders "Direct link to -4067 POSITION_SIDE_CHANGE_EXISTS_OPEN_ORDERS")

- Position side cannot be changed if there exists open orders.

### \-4068 POSITION_SIDE_CHANGE_EXISTS_QUANTITY[​](/docs/derivatives/coin-margined-futures/error-code#-4068-position_side_change_exists_quantity "Direct link to -4068 POSITION_SIDE_CHANGE_EXISTS_QUANTITY")

- Position side cannot be changed if there exists position.

### \-4082 INVALID_BATCH_PLACE_ORDER_SIZE[​](/docs/derivatives/coin-margined-futures/error-code#-4082-invalid_batch_place_order_size "Direct link to -4082 INVALID_BATCH_PLACE_ORDER_SIZE")

- Invalid number of batch place orders.
- Invalid number of batch place orders: %s

### \-4083 PLACE_BATCH_ORDERS_FAIL[​](/docs/derivatives/coin-margined-futures/error-code#-4083-place_batch_orders_fail "Direct link to -4083 PLACE_BATCH_ORDERS_FAIL")

- Fail to place batch orders.

### \-4084 UPCOMING_METHOD[​](/docs/derivatives/coin-margined-futures/error-code#-4084-upcoming_method "Direct link to -4084 UPCOMING_METHOD")

- Method is not allowed currently. Upcoming soon.

### \-4086 INVALID_PRICE_SPREAD_THRESHOLD[​](/docs/derivatives/coin-margined-futures/error-code#-4086-invalid_price_spread_threshold "Direct link to -4086 INVALID_PRICE_SPREAD_THRESHOLD")

- Invalid price spread threshold.

### \-4087 INVALID_PAIR[​](/docs/derivatives/coin-margined-futures/error-code#-4087-invalid_pair "Direct link to -4087 INVALID_PAIR")

- Invalid pair.

### \-4088 INVALID_TIME_INTERVAL[​](/docs/derivatives/coin-margined-futures/error-code#-4088-invalid_time_interval "Direct link to -4088 INVALID_TIME_INTERVAL")

- Invalid time interval.
- Maximum time interval is %s days.

### \-4089 REDUCE_ONLY_ORDER_PERMISSION[​](/docs/derivatives/coin-margined-futures/error-code#-4089-reduce_only_order_permission "Direct link to -4089 REDUCE_ONLY_ORDER_PERMISSION")

- User can only place reduce only order.

### \-4090 NO_PLACE_ORDER_PERMISSION[​](/docs/derivatives/coin-margined-futures/error-code#-4090-no_place_order_permission "Direct link to -4090 NO_PLACE_ORDER_PERMISSION")

- User can not place order currently.

### \-4104 INVALID_CONTRACT_TYPE[​](/docs/derivatives/coin-margined-futures/error-code#-4104-invalid_contract_type "Direct link to -4104 INVALID_CONTRACT_TYPE")

- Invalid contract type.

### \-4110 INVALID_CLIENT_TRAN_ID_LEN[​](/docs/derivatives/coin-margined-futures/error-code#-4110-invalid_client_tran_id_len "Direct link to -4110 INVALID_CLIENT_TRAN_ID_LEN")

- clientTranId is not valid.
- Client tran id length should be less than 64 chars.

### \-4111 DUPLICATED_CLIENT_TRAN_ID[​](/docs/derivatives/coin-margined-futures/error-code#-4111-duplicated_client_tran_id "Direct link to -4111 DUPLICATED_CLIENT_TRAN_ID")

- clientTranId is duplicated.
- Client tran id should be unique within 7 days.

### \-4112 REDUCE_ONLY_MARGIN_CHECK_FAILED[​](/docs/derivatives/coin-margined-futures/error-code#-4112-reduce_only_margin_check_failed "Direct link to -4112 REDUCE_ONLY_MARGIN_CHECK_FAILED")

- ReduceOnly Order Failed. Please check your existing position and open orders.

### \-4113 MARKET_ORDER_REJECT[​](/docs/derivatives/coin-margined-futures/error-code#-4113-market_order_reject "Direct link to -4113 MARKET_ORDER_REJECT")

- The counterparty's best price does not meet the PERCENT_PRICE filter limit.

### \-4135 INVALID_ACTIVATION_PRICE[​](/docs/derivatives/coin-margined-futures/error-code#-4135-invalid_activation_price "Direct link to -4135 INVALID_ACTIVATION_PRICE")

- Invalid activation price.

### \-4137 QUANTITY_EXISTS_WITH_CLOSE_POSITION[​](/docs/derivatives/coin-margined-futures/error-code#-4137-quantity_exists_with_close_position "Direct link to -4137 QUANTITY_EXISTS_WITH_CLOSE_POSITION")

- Quantity must be zero with closePosition equals true.

### \-4138 REDUCE_ONLY_MUST_BE_TRUE[​](/docs/derivatives/coin-margined-futures/error-code#-4138-reduce_only_must_be_true "Direct link to -4138 REDUCE_ONLY_MUST_BE_TRUE")

- Reduce only must be true with closePosition equals true.

### \-4139 ORDER_TYPE_CANNOT_BE_MKT[​](/docs/derivatives/coin-margined-futures/error-code#-4139-order_type_cannot_be_mkt "Direct link to -4139 ORDER_TYPE_CANNOT_BE_MKT")

- Order type can not be market if it's unable to cancel.

### \-4142 STRATEGY_INVALID_TRIGGER_PRICE[​](/docs/derivatives/coin-margined-futures/error-code#-4142-strategy_invalid_trigger_price "Direct link to -4142 STRATEGY_INVALID_TRIGGER_PRICE")

- REJECT: take profit or stop order will be triggered immediately.

### \-4150 ISOLATED_LEVERAGE_REJECT_WITH_POSITION[​](/docs/derivatives/coin-margined-futures/error-code#-4150-isolated_leverage_reject_with_position "Direct link to -4150 ISOLATED_LEVERAGE_REJECT_WITH_POSITION")

- Leverage reduction is not supported in Isolated Margin Mode with open
  positions.

### \-4151 PRICE_HIGHTER_THAN_STOP_MULTIPLIER_UP[​](/docs/derivatives/coin-margined-futures/error-code#-4151-price_highter_than_stop_multiplier_up "Direct link to -4151 PRICE_HIGHTER_THAN_STOP_MULTIPLIER_UP")

- Price is higher than stop price multiplier cap.
- Limit price can't be higher than %s.

### \-4152 PRICE_LOWER_THAN_STOP_MULTIPLIER_DOWN[​](/docs/derivatives/coin-margined-futures/error-code#-4152-price_lower_than_stop_multiplier_down "Direct link to -4152 PRICE_LOWER_THAN_STOP_MULTIPLIER_DOWN")

- Price is lower than stop price multiplier floor.
- Limit price can't be lower than %s.

### \-4154 STOP_PRICE_HIGHER_THAN_PRICE_MULTIPLIER_LIMIT[​](/docs/derivatives/coin-margined-futures/error-code#-4154-stop_price_higher_than_price_multiplier_limit "Direct link to -4154 STOP_PRICE_HIGHER_THAN_PRICE_MULTIPLIER_LIMIT")

- Stop price is higher than price multiplier cap.
- Stop price can't be higher than %s

### \-4155 STOP_PRICE_LOWER_THAN_PRICE_MULTIPLIER_LIMIT[​](/docs/derivatives/coin-margined-futures/error-code#-4155-stop_price_lower_than_price_multiplier_limit "Direct link to -4155 STOP_PRICE_LOWER_THAN_PRICE_MULTIPLIER_LIMIT")

- PStop price is lower than price multiplier floor.
- Stop price can't be lower than %s

### \-4178 MIN_NOTIONAL[​](/docs/derivatives/coin-margined-futures/error-code#-4178-min_notional "Direct link to -4178 MIN_NOTIONAL")

- Order's notional must be no smaller than one (unless you choose reduce only)
- Order's notional must be no smaller than %s (unless you choose reduce only)

### \-4192 COOLING_OFF_PERIOD[​](/docs/derivatives/coin-margined-futures/error-code#-4192-cooling_off_period "Direct link to -4192 COOLING_OFF_PERIOD")

- Trade forbidden due to Cooling-off Period.

### \-4194 ADJUST_LEVERAGE_KYC_FAILED[​](/docs/derivatives/coin-margined-futures/error-code#-4194-adjust_leverage_kyc_failed "Direct link to -4194 ADJUST_LEVERAGE_KYC_FAILED")

- Intermediate Personal Verification is required for adjusting leverage over
  20x.

### \-4195 ADJUST_LEVERAGE_ONE_MONTH_FAILED[​](/docs/derivatives/coin-margined-futures/error-code#-4195-adjust_leverage_one_month_failed "Direct link to -4195 ADJUST_LEVERAGE_ONE_MONTH_FAILED")

- More than 20x leverage is available one month after account registration.

### \-4196 LIMIT_ORDER_ONLY[​](/docs/derivatives/coin-margined-futures/error-code#-4196-limit_order_only "Direct link to -4196 LIMIT_ORDER_ONLY")

- Only limit order is supported.

### \-4197 SAME_ORDER[​](/docs/derivatives/coin-margined-futures/error-code#-4197-same_order "Direct link to -4197 SAME_ORDER")

- No need to modify the order.

### \-4198 EXCEED_MAX_MODIFY_ORDER_LIMIT[​](/docs/derivatives/coin-margined-futures/error-code#-4198-exceed_max_modify_order_limit "Direct link to -4198 EXCEED_MAX_MODIFY_ORDER_LIMIT")

- Exceed maximum modify order limit.

### \-4199 MOVE_ORDER_NOT_ALLOWED_SYMBOL_REASON[​](/docs/derivatives/coin-margined-futures/error-code#-4199-move_order_not_allowed_symbol_reason "Direct link to -4199 MOVE_ORDER_NOT_ALLOWED_SYMBOL_REASON")

- Symbol is not in trading status. Order amendment is not permitted.

### \-4200 ADJUST_LEVERAGE_X_DAYS_FAILED[​](/docs/derivatives/coin-margined-futures/error-code#-4200-adjust_leverage_x_days_failed "Direct link to -4200 ADJUST_LEVERAGE_X_DAYS_FAILED")

- More than 20x leverage is available 30 days after Futures account
  registration.
- More than 20x leverage is available %s days after Futures account
  registration.

### \-4201 ADJUST_LEVERAGE_KYC_LIMIT[​](/docs/derivatives/coin-margined-futures/error-code#-4201-adjust_leverage_kyc_limit "Direct link to -4201 ADJUST_LEVERAGE_KYC_LIMIT")

- Users in this country has limited adjust leverage.
- Users in your location/country can only access a maximum leverage of %s

### \-4202 ADJUST_LEVERAGE_ACCOUNT_SYMBOL_FAILED[​](/docs/derivatives/coin-margined-futures/error-code#-4202-adjust_leverage_account_symbol_failed "Direct link to -4202 ADJUST_LEVERAGE_ACCOUNT_SYMBOL_FAILED")

- Current symbol leverage cannot exceed 20 when using position limit adjustment
  service.

### \-4188 ME_INVALID_TIMESTAMP[​](/docs/derivatives/coin-margined-futures/error-code#-4188-me_invalid_timestamp "Direct link to -4188 ME_INVALID_TIMESTAMP")

- Timestamp for this request is outside of the ME recvWindow.

# Test Connectivity

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api#api-description "Direct link to API Description")

Test connectivity to the Rest API.

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api#http-request "Direct link to HTTP Request")

GET `/dapi/v1/ping`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api#request-weight "Direct link to Request Weight")

**1**

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api#request-parameters "Direct link to Request Parameters")

NONE

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api#response-example "Direct link to Response Example")

```
{}
```

# Check Server time

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Check-Server-time#api-description "Direct link to API Description")

Test connectivity to the Rest API and get the current server time.

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Check-Server-time#http-request "Direct link to HTTP Request")

GET `/dapi/v1/time`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Check-Server-time#request-weight "Direct link to Request Weight")

**1**

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Check-Server-time#request-parameters "Direct link to Request Parameters")

NONE

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Check-Server-time#response-example "Direct link to Response Example")

```
{  "serverTime": 1499827319559}
```

# Exchange Information

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Exchange-Information#api-description "Direct link to API Description")

Current exchange trading rules and symbol information

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Exchange-Information#http-request "Direct link to HTTP Request")

GET `/dapi/v1/exchangeInfo`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Exchange-Information#request-weight "Direct link to Request Weight")

1

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Exchange-Information#request-parameters "Direct link to Request Parameters")

NONE

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Exchange-Information#response-example "Direct link to Response Example")

```
{	"exchangeFilters": [], 	"rateLimits": [  		{ 			"interval": "MINUTE",    			"intervalNum": 1,    			"limit": 6000,    			"rateLimitType": "REQUEST_WEIGHT"    		},  		{  			"interval": "MINUTE",   			"intervalNum": 1,   			"limit": 6000,   			"rateLimitType": "ORDERS"   		}   	], 	"serverTime": 1565613908500, // Ignore please. If you want to check current server time, please check via "GET /dapi/v1/time" 	"symbols": [ // contract symbols 		{ 			"filters": [ 				{ 					"filterType": "PRICE_FILTER",      				"maxPrice": "100000",      				"minPrice": "0.1",      				"tickSize": "0.1"      			},    			{    				"filterType": "LOT_SIZE",      				"maxQty": "100000",      				"minQty": "1",      				"stepSize": "1"      			},    			{    				"filterType": "MARKET_LOT_SIZE",      				"maxQty": "100000",      				"minQty": "1",      				"stepSize": "1"      			},     			{    				"filterType": "MAX_NUM_ORDERS",     				"limit": 200  				},  				{    				"filterType": "PERCENT_PRICE",     				"multiplierUp": "1.0500",     				"multiplierDown": "0.9500",     				"multiplierDecimal": 4  				}    		],   			"OrderType": [    				"LIMIT",    				"MARKET",    				"STOP",   				"TAKE_PROFIT",   				"TRAILING_STOP_MARKET"   			],   			"timeInForce": [   				"GTC",   				"IOC",   				"FOK",   				"GTX"   			],   			"liquidationFee": "0.010000",	// liquidation fee rate   			"marketTakeBound": "0.30",	// the max price difference rate( from mark price) a market order can make   			"symbol": "BTCUSD_200925", // contract symbol name   			"pair": "BTCUSD",  // underlying symbol   			"contractType": "CURRENT_QUARTER",    			"deliveryDate": 1601020800000,   			"onboardDate": 1590739200000,   			"contractStatus": "TRADING",    			"contractSize": 100,       			"quoteAsset": "USD",   			"baseAsset": "BTC",      			"marginAsset": "BTC",   			"pricePrecision": 1,	// please do not use it as tickSize		   	"quantityPrecision": 0,	// please do not use it as stepSize		   	"baseAssetPrecision": 8,		   	"quotePrecision": 8,		   	"equalQtyPrecision": 4,	 // ignore		   	"triggerProtect": "0.0500",	// threshold for algo order with "priceProtect"		   	"maintMarginPercent": "2.5000",  // ignore		   	"requiredMarginPercent": "5.0000",  // ignore		   	"underlyingType": "COIN", 		   	"underlyingSubType": []	   		}   	],	"timezone": "UTC"}
```

# Order Book

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Order-Book#api-description "Direct link to API Description")

Query orderbook on specific symbol

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Order-Book#http-request "Direct link to HTTP Request")

GET `/dapi/v1/depth`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Order-Book#request-weight "Direct link to Request Weight")

Adjusted based on the limit:

| Limit         | Weight |
| ------------- | ------ |
| 5, 10, 20, 50 | 2      |
| 100           | 5      |
| 500           | 10     |
| 1000          | 20     |

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Order-Book#request-parameters "Direct link to Request Parameters")

| Name   | Type   | Mandatory | Description                                                 |
| ------ | ------ | --------- | ----------------------------------------------------------- |
| symbol | STRING | YES       |
| limit  | INT    | NO        | Default 500; Valid limits:\[5, 10, 20, 50, 100, 500, 1000\] |

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Order-Book#response-example "Direct link to Response Example")

```
{  "lastUpdateId": 16769853,  "symbol": "BTCUSD_PERP", // Symbol  "pair": "BTCUSD",		 // Pair  "E": 1591250106370,   // Message output time  "T": 1591250106368,   // Transaction time  "bids": [    [      "9638.0",     	// PRICE      "431"    			// QTY    ]  ],  "asks": [    [      "9638.2",      "12"    ]  ]}
```

# Recent Trades List

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Recent-Trades-List#api-description "Direct link to API Description")

Get recent market trades

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Recent-Trades-List#http-request "Direct link to HTTP Request")

GET `/dapi/v1/trades`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Recent-Trades-List#request-weight "Direct link to Request Weight")

5

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Recent-Trades-List#request-parameters "Direct link to Request Parameters")

| Name   | Type   | Mandatory | Description            |
| ------ | ------ | --------- | ---------------------- |
| symbol | STRING | YES       |
| limit  | INT    | NO        | Default 500; max 1000. |

- Market trades means trades filled in the order book. Only market trades will
  be returned, which means the insurance fund trades and ADL trades won't be
  returned.

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Recent-Trades-List#response-example "Direct link to Response Example")

```
[  {    "id": 28457,    "price": "9635.0",    "qty": "1",    "baseQty": "0.01037883",    "time": 1591250192508,    "isBuyerMaker": true,  }]
```

# Old Trades Lookup(MARKET_DATA)

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Old-Trades-Lookup#api-description "Direct link to API Description")

Get older market historical trades.

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Old-Trades-Lookup#http-request "Direct link to HTTP Request")

GET `/dapi/v1/historicalTrades`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Old-Trades-Lookup#request-weight "Direct link to Request Weight")

**20**

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Old-Trades-Lookup#request-parameters "Direct link to Request Parameters")

| Name   | Type   | Mandatory | Description                                             |
| ------ | ------ | --------- | ------------------------------------------------------- |
| symbol | STRING | YES       |
| limit  | INT    | NO        | Default 100; max 500.                                   |
| fromId | LONG   | NO        | TradeId to fetch from. Default gets most recent trades. |

> - Market trades means trades filled in the order book. Only market trades will
>   be returned, which means the insurance fund trades and ADL trades won't be
>   returned.

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Old-Trades-Lookup#response-example "Direct link to Response Example")

```
[  {    "id": 595103,    "price": "9642.2",    "qty": "1",    "baseQty": "0.01037108",    "time": 1499865549590,    "isBuyerMaker": true,  }]
```

# Compressed/Aggregate Trades List

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Compressed-Aggregate-Trades-List#api-description "Direct link to API Description")

Get compressed, aggregate trades. Market trades that fill in 100ms with the same
price and the same taking side will have the quantity aggregated.

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Compressed-Aggregate-Trades-List#http-request "Direct link to HTTP Request")

GET `/dapi/v1/aggTrades`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Compressed-Aggregate-Trades-List#request-weight "Direct link to Request Weight")

**20**

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Compressed-Aggregate-Trades-List#request-parameters "Direct link to Request Parameters")

| Name      | Type   | Mandatory | Description                                              |
| --------- | ------ | --------- | -------------------------------------------------------- |
| symbol    | STRING | YES       |
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

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Compressed-Aggregate-Trades-List#response-example "Direct link to Response Example")

```
[  {    "a": 416690,			// Aggregate tradeId    "p": "9642.4",  	 	// Price    "q": "3",  			 	// Quantity    "f": 595259,         	// First tradeId    "l": 595259,         	// Last tradeId    "T": 1591250548649, 	// Timestamp    "m": false,          	// Was the buyer the maker?  }]
```

# Index Price and Mark Price

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Index-Price-and-Mark-Price#api-description "Direct link to API Description")

Query index price and mark price

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Index-Price-and-Mark-Price#http-request "Direct link to HTTP Request")

GET `/dapi/v1/premiumIndex`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Index-Price-and-Mark-Price#request-weight "Direct link to Request Weight")

**10**

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Index-Price-and-Mark-Price#request-parameters "Direct link to Request Parameters")

| Name   | Type   | Mandatory | Description |
| ------ | ------ | --------- | ----------- |
| symbol | STRING | NO        |
| pair   | STRING | NO        |

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Index-Price-and-Mark-Price#response-example "Direct link to Response Example")

```
[	{		"symbol": "BTCUSD_PERP",  		"pair": "BTCUSD",  		"markPrice": "11029.69574559",	// mark price  		"indexPrice": "10979.14437500",	// index price  		"estimatedSettlePrice": "10981.74168236",  // Estimated Settle Price, only useful in the last hour before the settlement starts.  		"lastFundingRate": "0.00071003",	 // the lasted funding rate, for perpetual contract symbols only. For delivery symbols, "" will be shown.  		"interestRate": "0.00010000",		// the base asset interest rate, for perpetual contract symbols only. For delivery symbols, "" will be shown.  		"nextFundingTime": 1596096000000,	 // For perpetual contract symbols only. For delivery symbols, 0 will be shown  		"time": 1596094042000  	}, 	{ 		"symbol": "BTCUSD_200925",	 		"pair": "BTCUSD",  		"markPrice": "12077.01343750",  		"indexPrice": "10979.10312500",  		"estimatedSettlePrice": "10981.74168236",  		"lastFundingRate": "",  		"interestRate": "",	  		"nextFundingTime": 0,  		"time": 1596094042000  	}]
```

# Get Funding Rate History of Perpetual Futures

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Get-Funding-Rate-History-of-Perpetual-Futures#api-description "Direct link to API Description")

Get Funding Rate History of Perpetual Futures

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Get-Funding-Rate-History-of-Perpetual-Futures#http-request "Direct link to HTTP Request")

GET `/dapi/v1/fundingRate`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Get-Funding-Rate-History-of-Perpetual-Futures#request-weight "Direct link to Request Weight")

**1**

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Get-Funding-Rate-History-of-Perpetual-Futures#request-parameters "Direct link to Request Parameters")

| Name      | Type   | Mandatory | Description                                          |
| --------- | ------ | --------- | ---------------------------------------------------- |
| symbol    | STRING | YES       |
| startTime | LONG   | NO        | Timestamp in ms to get funding rate from INCLUSIVE.  |
| endTime   | LONG   | NO        | Timestamp in ms to get funding rate until INCLUSIVE. |
| limit     | INT    | NO        | Default 100; max 1000                                |

> - empty array will be returned for delivery symbols.

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Get-Funding-Rate-History-of-Perpetual-Futures#response-example "Direct link to Response Example")

```
[	{		"symbol": "BTCUSD_PERP",  		"fundingTime": 1596038400000,	  		"fundingRate": "-0.00300000"  	}, 	{ 		"symbol": "BTCUSD_PERP",  		"fundingTime": 1596067200000,  		"fundingRate": "-0.00300000"  	}]
```

# Get Funding Rate Info

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Get-Funding-Info#api-description "Direct link to API Description")

Query funding rate info for symbols that had FundingRateCap/ FundingRateFloor /
fundingIntervalHours adjustment

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Get-Funding-Info#http-request "Direct link to HTTP Request")

GET `/dapi/v1/fundingInfo`

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Get-Funding-Info#response-example "Direct link to Response Example")

```
[    {        "symbol": "BLZUSDT",        "adjustedFundingRateCap": "0.02500000",        "adjustedFundingRateFloor": "-0.02500000",        "fundingIntervalHours": 8,        "disclaimer": false    }]
```

# Kline/Candlestick Data

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Kline-Candlestick-Data#api-description "Direct link to API Description")

Kline/candlestick bars for a symbol.  
Klines are uniquely identified by their open time.

- Kline/Candlestick chart intervals:  
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

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Kline-Candlestick-Data#http-request "Direct link to HTTP Request")

GET `/dapi/v1/klines`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Kline-Candlestick-Data#request-weight "Direct link to Request Weight")

based on parameter `LIMIT`

| LIMIT         | weight |
| ------------- | ------ |
| \[1,100)      | 1      |
| \[100, 500)   | 2      |
| \[500, 1000\] | 5      |

> 1000 | 10

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Kline-Candlestick-Data#request-parameters "Direct link to Request Parameters")

| Name      | Type   | Mandatory | Description            |
| --------- | ------ | --------- | ---------------------- |
| symbol    | STRING | YES       |
| interval  | ENUM   | YES       |
| startTime | LONG   | NO        |
| endTime   | LONG   | NO        |
| limit     | INT    | NO        | Default 500; max 1500. |

> - The difference between `startTime` and `endTime` can only be up to 200 days
> - Between `startTime` and `endTime`, the most recent `limit` data from
>   `endTime` will be returned:
>   - If `startTime` and `endTime` are not sent, current timestamp will be set
>     as `endTime`, and the most recent data will be returned.
>   - If `startTime` is sent only, the timestamp of 200 days after `startTime`
>     will be set as `endTime`(up to the current time)
>   - If `endTime` is sent only, the timestamp of 200 days before `endTime` will
>     be set as `startTime`

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Kline-Candlestick-Data#response-example "Direct link to Response Example")

```
[  [    1591258320000,      	// Open time    "9640.7",       	 	// Open    "9642.4",       	 	// High    "9640.6",       	 	// Low    "9642.0",      	 	 	// Close (or latest price)    "206", 			 		// Volume    1591258379999,       	// Close time    "2.13660389",    		// Base asset volume    48,             		// Number of trades    "119",    				// Taker buy volume    "1.23424865",      		// Taker buy base asset volume    "0" 					// Ignore.  ]]
```

# Continuous Contract Kline/Candlestick Data

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Continuous-Contract-Kline-Candlestick-Data#api-description "Direct link to API Description")

Kline/candlestick bars for a specific contract type. Klines are uniquely
identified by their open time.

> - Contract type:
>   - PERPETUAL
>   - CURRENT_QUARTER
>   - NEXT_QUARTER

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Continuous-Contract-Kline-Candlestick-Data#http-request "Direct link to HTTP Request")

GET `/dapi/v1/continuousKlines`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Continuous-Contract-Kline-Candlestick-Data#request-weight "Direct link to Request Weight")

based on parameter `LIMIT`

| LIMIT         | weight |
| ------------- | ------ |
| \[1,100)      | 1      |
| \[100, 500)   | 2      |
| \[500, 1000\] | 5      |

> 1000 | 10

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Continuous-Contract-Kline-Candlestick-Data#request-parameters "Direct link to Request Parameters")

| Name         | Type   | Mandatory | Description            |
| ------------ | ------ | --------- | ---------------------- |
| pair         | STRING | YES       |
| contractType | ENUM   | YES       |
| interval     | ENUM   | YES       |
| startTime    | LONG   | NO        |
| endTime      | LONG   | NO        |
| limit        | INT    | NO        | Default 500; max 1500. |

> - The difference between `startTime` and `endTime` can only be up to 200 days
> - Between `startTime` and `endTime`, the most recent `limit` data from
>   `endTime` will be returned:
>   - If `startTime` and `endTime` are not sent, current timestamp will be set
>     as `endTime`, and the most recent data will be returned.
>   - If `startTime` is sent only, the timestamp of 200 days after `startTime`
>     will be set as `endTime`(up to the current time)
>   - If `endTime` is sent only, the timestamp of 200 days before `endTime` will
>     be set as `startTime`

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Continuous-Contract-Kline-Candlestick-Data#response-example "Direct link to Response Example")

```
[  [    1591258320000,      	// Open time    "9640.7",       	 	// Open    "9642.4",       	 	// High    "9640.6",       	 	// Low    "9642.0",      	 	 	// Close (or latest price)    "206", 			 		// Volume    1591258379999,       	// Close time    "2.13660389",    		// Base asset volume    48,             		// Number of trades    "119",    				// Taker buy volume    "1.23424865",      		// Taker buy base asset volume    "0" 					// Ignore.  ]]
```

# Index Price Kline/Candlestick Data

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Index-Price-Kline-Candlestick-Data#api-description "Direct link to API Description")

Kline/candlestick bars for the index price of a pair. Klines are uniquely
identified by their open time.

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Index-Price-Kline-Candlestick-Data#http-request "Direct link to HTTP Request")

GET `/dapi/v1/indexPriceKlines`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Index-Price-Kline-Candlestick-Data#request-weight "Direct link to Request Weight")

based on parameter `LIMIT`

| LIMIT         | weight |
| ------------- | ------ |
| \[1,100)      | 1      |
| \[100, 500)   | 2      |
| \[500, 1000\] | 5      |

> 1000 | 10

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Index-Price-Kline-Candlestick-Data#request-parameters "Direct link to Request Parameters")

| Name      | Type   | Mandatory | Description            |
| --------- | ------ | --------- | ---------------------- |
| pair      | STRING | YES       |
| interval  | ENUM   | YES       |
| startTime | LONG   | NO        |
| endTime   | LONG   | NO        |
| limit     | INT    | NO        | Default 500; max 1500. |

> - The difference between `startTime` and `endTime` can only be up to 200 days
> - Between `startTime` and `endTime`, the most recent `limit` data from
>   `endTime` will be returned:
>   - If `startTime` and `endTime` are not sent, current timestamp will be set
>     as `endTime`, and the most recent data will be returned.
>   - If `startTime` is sent only, the timestamp of 200 days after `startTime`
>     will be set as `endTime`(up to the current time)
>   - If `endTime` is sent only, the timestamp of 200 days before `endTime` will
>     be set as `startTime`

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Index-Price-Kline-Candlestick-Data#response-example "Direct link to Response Example")

```
[  [    1591256400000,      	// Open time    "9653.69440000",    	// Open    "9653.69640000",     	// High    "9651.38600000",     	// Low    "9651.55200000",     	// Close (or latest price)    "0	", 					// Ignore    1591256459999,      	// Close time    "0",    				// Ignore    60,                		// Number of bisic data    "0",    				// Ignore    "0",      				// Ignore    "0" 					// Ignore  ]]
```

# Mark Price Kline/Candlestick Data

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Mark-Price-Kline-Candlestick-Data#api-description "Direct link to API Description")

Kline/candlestick bars for the mark price of a symbol. Klines are uniquely
identified by their open time.

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Mark-Price-Kline-Candlestick-Data#http-request "Direct link to HTTP Request")

GET `/dapi/v1/markPriceKlines`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Mark-Price-Kline-Candlestick-Data#request-weight "Direct link to Request Weight")

based on parameter `LIMIT`

| LIMIT         | weight |
| ------------- | ------ |
| \[1,100)      | 1      |
| \[100, 500)   | 2      |
| \[500, 1000\] | 5      |

> 1000 | 10

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Mark-Price-Kline-Candlestick-Data#request-parameters "Direct link to Request Parameters")

| Name      | Type   | Mandatory | Description            |
| --------- | ------ | --------- | ---------------------- |
| symbol    | STRING | YES       |
| interval  | ENUM   | YES       |
| startTime | LONG   | NO        |
| endTime   | LONG   | NO        |
| limit     | INT    | NO        | Default 500; max 1500. |

> - The difference between `startTime` and `endTime` can only be up to 200 days
> - Between `startTime` and `endTime`, the most recent `limit` data from
>   `endTime` will be returned:
>   - If `startTime` and `endTime` are not sent, current timestamp will be set
>     as `endTime`, and the most recent data will be returned.
>   - If `startTime` is sent only, the timestamp of 200 days after `startTime`
>     will be set as `endTime`(up to the current time)
>   - If `endTime` is sent only, the timestamp of 200 days before `endTime` will
>     be set as `startTime`

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Mark-Price-Kline-Candlestick-Data#response-example "Direct link to Response Example")

```
[  [    1591256460000,     		// Open time    "9653.29201333",    	// Open    "9654.56401333",     	// High    "9653.07367333",     	// Low    "9653.07367333",     	// Close (or latest price)    "0	", 					// Ignore    1591256519999,      	// Close time    "0",    				// Ignore    60,                	 	// Number of bisic data    "0",    				// Ignore    "0",      			 	// Ignore    "0" 					// Ignore  ]]
```

# Premium index Kline Data

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Premium-Index-Kline-Data#api-description "Direct link to API Description")

Premium index kline bars of a symbol. Klines are uniquely identified by their
open time.

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Premium-Index-Kline-Data#http-request "Direct link to HTTP Request")

GET `/dapi/v1/premiumIndexKlines`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Premium-Index-Kline-Data#request-weight "Direct link to Request Weight")

based on parameter `LIMIT`

| LIMIT         | weight |
| ------------- | ------ |
| \[1,100)      | 1      |
| \[100, 500)   | 2      |
| \[500, 1000\] | 5      |
| \> 1000       | 10     |

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Premium-Index-Kline-Data#request-parameters "Direct link to Request Parameters")

| Name      | Type   | Mandatory | Description            |
| --------- | ------ | --------- | ---------------------- |
| symbol    | STRING | YES       |
| interval  | ENUM   | YES       |
| startTime | LONG   | NO        |
| endTime   | LONG   | NO        |
| limit     | INT    | NO        | Default 500; max 1500. |

> - If startTime and endTime are not sent, the most recent klines are returned.

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Premium-Index-Kline-Data#response-example "Direct link to Response Example")

```
[  [    1691603820000,          // Open time    "-0.00042931",          // Open    "-0.00023641",          // High    "-0.00059406",          // Low    "-0.00043659",          // Close    "0",                    // Ignore    1691603879999,          // Close time    "0",                    // Ignore    12,                     // Ignore    "0",                    // Ignore    "0",                    // Ignore    "0"                     // Ignore  ]]
```

# 24hr Ticker Price Change Statistics

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/24hr-Ticker-Price-Change-Statistics#api-description "Direct link to API Description")

24 hour rolling window price change statistics.

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/24hr-Ticker-Price-Change-Statistics#http-request "Direct link to HTTP Request")

GET `/dapi/v1/ticker/24hr`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/24hr-Ticker-Price-Change-Statistics#request-weight "Direct link to Request Weight")

**1** for a single symbol, **40** when the symbol parameter is omitted
**Careful** when accessing this with no symbol.

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/24hr-Ticker-Price-Change-Statistics#request-parameters "Direct link to Request Parameters")

| Name   | Type   | Mandatory | Description |
| ------ | ------ | --------- | ----------- |
| symbol | STRING | NO        |
| pair   | STRING | NO        |

> - Symbol and pair cannot be sent together
> - If a pair is sent,tickers for all symbols of the pair will be returned
> - If either a pair or symbol is sent, tickers for all symbols of all pairs
>   will be returned

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/24hr-Ticker-Price-Change-Statistics#response-example "Direct link to Response Example")

```
[	{		"symbol": "BTCUSD_200925",	  	"pair": "BTCUSD",	  	"priceChange": "136.6",	  	"priceChangePercent": "1.436",	  	"weightedAvgPrice": "9547.3",	  	"lastPrice": "9651.6",	  	"lastQty": "1",	  	"openPrice": "9515.0",	  	"highPrice": "9687.0",	  	"lowPrice": "9499.5",	  	"volume": "494109",	  	"baseVolume": "5192.94797687",	  	"openTime": 1591170300000,	  	"closeTime": 1591256718418,	  	"firstId": 600507, // First tradeId	  	"lastId": 697803,  // Last tradeId	  	"count": 97297    // Trade count  	  	}]
```

# Symbol Price Ticker

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Symbol-Price-Ticker#api-description "Direct link to API Description")

Latest price for a symbol or symbols.

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Symbol-Price-Ticker#http-request "Direct link to HTTP Request")

GET `/dapi/v1/ticker/price`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Symbol-Price-Ticker#request-weight "Direct link to Request Weight")

**1** for a single symbol, **2** when the symbol parameter is omitted

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Symbol-Price-Ticker#request-parameters "Direct link to Request Parameters")

| Name   | Type   | Mandatory | Description |
| ------ | ------ | --------- | ----------- |
| symbol | STRING | NO        |
| pair   | STRING | NO        |

> - Symbol and pair cannot be sent together
> - If a pair is sent,tickers for all symbols of the pair will be returned
> - If either a pair or symbol is sent, tickers for all symbols of all pairs
>   will be returned

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Symbol-Price-Ticker#response-example "Direct link to Response Example")

```
[	{  		"symbol": "BTCUSD_200626",	  		"ps": "9647.8",  			// pair   		"price": "9647.8",		  		"time": 1591257246176  	}]
```

# Symbol Order Book Ticker

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Symbol-Order-Book-Ticker#api-description "Direct link to API Description")

Best price/qty on the order book for a symbol or symbols.

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Symbol-Order-Book-Ticker#http-request "Direct link to HTTP Request")

GET `/dapi/v1/ticker/bookTicker`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Symbol-Order-Book-Ticker#request-weight "Direct link to Request Weight")

**2** for a single symbol, **5** when the symbol parameter is omitted

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Symbol-Order-Book-Ticker#request-parameters "Direct link to Request Parameters")

| Name   | Type   | Mandatory | Description |
| ------ | ------ | --------- | ----------- |
| symbol | STRING | NO        |
| pair   | STRING | NO        |

> - Symbol and pair cannot be sent together
> - If a pair is sent,tickers for all symbols of the pair will be returned
> - If either a pair or symbol is sent, tickers for all symbols of all pairs
>   will be returned

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Symbol-Order-Book-Ticker#response-example "Direct link to Response Example")

```
[	{	    "lastUpdateId": 1027024,  		"symbol": "BTCUSD_200626",  		"pair": "BTCUSD",  		"bidPrice": "9650.1",  		"bidQty": "16",  		"askPrice": "9650.3",  		"askQty": "7",  		"time": 1591257300345	}]
```

# Open Interest

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Open-Interest#api-description "Direct link to API Description")

Get present open interest of a specific symbol.

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Open-Interest#http-request "Direct link to HTTP Request")

GET `/dapi/v1/openInterest`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Open-Interest#request-weight "Direct link to Request Weight")

**1**

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Open-Interest#request-parameters "Direct link to Request Parameters")

| Name   | Type   | Mandatory | Description |
| ------ | ------ | --------- | ----------- |
| symbol | STRING | YES       |

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Open-Interest#response-example "Direct link to Response Example")

```
{	"symbol": "BTCUSD_200626",	"pair": "BTCUSD",	"openInterest": "15004",	"contractType": "CURRENT_QUARTER",	"time": 1591261042378}
```

# Open Interest Statistics

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Open-Interest-Statistics#api-description "Direct link to API Description")

Query open interest stats

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Open-Interest-Statistics#http-request "Direct link to HTTP Request")

GET `/futures/data/openInterestHist`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Open-Interest-Statistics#request-weight "Direct link to Request Weight")

**1**

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Open-Interest-Statistics#request-parameters "Direct link to Request Parameters")

| Name         | Type   | Mandatory | Description                                     |
| ------------ | ------ | --------- | ----------------------------------------------- |
| pair         | STRING | YES       | BTCUSD                                          |
| contractType | ENUM   | YES       | ALL, CURRENT_QUARTER, NEXT_QUARTER, PERPETUAL   |
| period       | ENUM   | YES       | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| limit        | LONG   | NO        | Default 30,Max 500                              |
| startTime    | LONG   | NO        |
| endTime      | LONG   | NO        |

> - If startTime and endTime are not sent, the most recent data is returned.
> - Only the data of the latest 30 days is available.

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Open-Interest-Statistics#response-example "Direct link to Response Example")

```
[     {	  "pair": "BTCUSD",	  "contractType": "CURRENT_QUARTER",	  "sumOpenInterest": "20403",  //unit: cont	  "sumOpenInterestValue": "176196512.23400000", //unit: base asset	  "timestamp": 1591261042378   },   {     "pair": "BTCUSD",	  "contractType": "CURRENT_QUARTER",	  "sumOpenInterest": "20401",  	  "sumOpenInterestValue": "176178704.98700000", 	  "timestamp": 1583128200000   }]
```

# Top Trader Long/Short Ratio (Positions)

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Top-Trader-Long-Short-Ratio#api-description "Direct link to API Description")

The proportion of net long and net short positions to total open positions of
the top 20% users with the highest margin balance. Long Position % = Long
positions of top traders / Total open positions of top traders Short Position %
= Short positions of top traders / Total open positions of top traders
Long/Short Ratio (Positions) = Long Position % / Short Position %

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Top-Trader-Long-Short-Ratio#http-request "Direct link to HTTP Request")

GET `/futures/data/topLongShortPositionRatio`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Top-Trader-Long-Short-Ratio#request-weight "Direct link to Request Weight")

**1**

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Top-Trader-Long-Short-Ratio#request-parameters "Direct link to Request Parameters")

| Name      | Type   | Mandatory | Description                                     |
| --------- | ------ | --------- | ----------------------------------------------- |
| pair      | STRING | YES       | BTCUSD                                          |
| period    | ENUM   | YES       | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| limit     | LONG   | NO        | Default 30,Max 500                              |
| startTime | LONG   | NO        |
| endTime   | LONG   | NO        |

> - If startTime and endTime are not sent, the most recent data is returned.
> - Only the data of the latest 30 days is available.

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Top-Trader-Long-Short-Ratio#response-example "Direct link to Response Example")

```
[     {	  "pair": "BTCUSD",	  "longShortRatio": "0.7869",	  "longPosition": "0.6442",  //64.42%	  "shortPosition": "0.4404",  //44.04%	  "timestamp": 1592870400000   },   {     "pair": "BTCUSD",	  "longShortRatio": "1.1231",	  "longPosition": "0.2363",  	  "shortPosition": "0.4537",  	  "timestamp": 1592956800000	}]
```

# Top Trader Long/Short Ratio (Accounts)

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Top-Long-Short-Account-Ratio#api-description "Direct link to API Description")

The proportion of net long and net short accounts to total accounts of the top
20% users with the highest margin balance. Each account is counted once only.
Long Account % = Accounts of top traders with net long positions / Total
accounts of top traders with open positions Short Account % = Accounts of top
traders with net short positions / Total accounts of top traders with open
positions Long/Short Ratio (Accounts) = Long Account % / Short Account %

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Top-Long-Short-Account-Ratio#http-request "Direct link to HTTP Request")

GET `/futures/data/topLongShortAccountRatio`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Top-Long-Short-Account-Ratio#request-weight "Direct link to Request Weight")

**1**

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Top-Long-Short-Account-Ratio#request-parameters "Direct link to Request Parameters")

| Name      | Type   | Mandatory | Description                                     |
| --------- | ------ | --------- | ----------------------------------------------- |
| symbol    | STRING | YES       |
| period    | ENUM   | YES       | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| limit     | LONG   | NO        | default 30, max 500                             |
| startTime | LONG   | NO        |
| endTime   | LONG   | NO        |

> - If startTime and endTime are not sent, the most recent data is returned.
> - Only the data of the latest 30 days is available.

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Top-Long-Short-Account-Ratio#response-example "Direct link to Response Example")

```
[     {	  "pair": "BTCUSD",	  "longShortRatio": "1.8105",	  "longAccount": "0.6442",  //64.42%	  "shortAccount": "0.3558",  //35.58%	  "timestamp": 1591261042378   },   {     "pair": "BTCUSD",	  "longShortRatio": "1.1110",	  "longAccount": "0.5263",  	  "shortAccount": "0.4737",  	  "timestamp": 1592870400000	}]
```

# Long/Short Ratio

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Long-Short-Ratio#api-description "Direct link to API Description")

Query symbol Long/Short Ratio

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Long-Short-Ratio#http-request "Direct link to HTTP Request")

GET `/futures/data/globalLongShortAccountRatio`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Long-Short-Ratio#request-weight "Direct link to Request Weight")

**1**

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Long-Short-Ratio#request-parameters "Direct link to Request Parameters")

| Name      | Type   | Mandatory | Description                                     |
| --------- | ------ | --------- | ----------------------------------------------- |
| pair      | STRING | YES       | BTCUSD                                          |
| period    | ENUM   | YES       | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| limit     | LONG   | NO        | Default 30,Max 500                              |
| startTime | LONG   | NO        |
| endTime   | LONG   | NO        |

> - If startTime and endTime are not sent, the most recent data is returned.
> - Only the data of the latest 30 days is available.

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Long-Short-Ratio#response-example "Direct link to Response Example")

```
[     {	  "pair": "BTCUSD",	  "longShortRatio": "0.1960",	  "longAccount": "0.6622",  //66.22%	  "shortAccount": "0.3378",  //33.78%	  "timestamp": 1583139600000   },   {     "pair": "BTCUSD",	  "longShortRatio": "1.9559",	  "longAccount": "0.6617",  	  "shortAccount": "0.3382",  	  "timestamp": 1583139900000	}]
```

# Taker Buy/Sell Volume

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Taker-Buy-Sell-Volume#api-description "Direct link to API Description")

Taker Buy Volume: the total volume of buy orders filled by takers within the
period. Taker Sell Volume: the total volume of sell orders filled by takers
within the period.

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Taker-Buy-Sell-Volume#http-request "Direct link to HTTP Request")

GET `/futures/data/takerBuySellVol`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Taker-Buy-Sell-Volume#request-weight "Direct link to Request Weight")

**1**

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Taker-Buy-Sell-Volume#request-parameters "Direct link to Request Parameters")

| Name         | Type   | Mandatory | Description                                     |
| ------------ | ------ | --------- | ----------------------------------------------- |
| pair         | STRING | YES       | BTCUSD                                          |
| contractType | ENUM   | YES       | ALL, CURRENT_QUARTER, NEXT_QUARTER, PERPETUAL   |
| period       | ENUM   | YES       | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| limit        | LONG   | NO        | Default 30,Max 500                              |
| startTime    | LONG   | NO        |
| endTime      | LONG   | NO        |

> - If startTime and endTime are not sent, the most recent data is returned.
> - Only the data of the latest 30 days is available.

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Taker-Buy-Sell-Volume#response-example "Direct link to Response Example")

```
[     {	  "pair": "BTCUSD",	  "contractType": "CURRENT_QUARTER",	  "takerBuyVol": "387",  //unit: cont	  "takerSellVol": "248",  //unit: cont	  "takerBuyVolValue": "2342.1220", //unit: base asset	  "takerSellVolValue": "4213.9800", //unit: base asset	  "timestamp": 1591261042378   },   {     "pair": "BTCUSD",	  "contractType": "CURRENT_QUARTER",	  "takerBuyVol": "234",  //unit: cont	  "takerSellVol": "121",  //unit: cont	  "takerBuyVolValue": "4563.1320", //unit: base asset	  "takerSellVolValue": "3313.3940", //unit: base asset	  "timestamp": 1585615200000   }]
```

# Basis

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Basis#api-description "Direct link to API Description")

Query basis

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Basis#http-request "Direct link to HTTP Request")

GET `/futures/data/basis`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Basis#request-weight "Direct link to Request Weight")

**1**

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Basis#request-parameters "Direct link to Request Parameters")

| Name         | Type   | Mandatory | Description                                     |
| ------------ | ------ | --------- | ----------------------------------------------- |
| pair         | STRING | YES       | BTCUSD                                          |
| contractType | ENUM   | YES       | CURRENT_QUARTER, NEXT_QUARTER, PERPETUAL        |
| period       | ENUM   | YES       | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| limit        | LONG   | NO        | Default 30,Max 500                              |
| startTime    | LONG   | NO        |
| endTime      | LONG   | NO        |

> - If startTime and endTime are not sent, the most recent data is returned.
> - Only the data of the latest 30 days is available.

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Basis#response-example "Direct link to Response Example")

```
[     {        "indexPrice": "29269.93972727",        "contractType": "CURRENT_QUARTER",        "basisRate": "0.0024",        "futuresPrice": "29341.3",        "annualizedBasisRate": "0.0283",        "basis": "71.36027273",        "pair": "BTCUSD",        "timestamp": 1653381600000   }]
```

# Query Index Price Constituents

## API Description[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Index-Constituents#api-description "Direct link to API Description")

Query index price constituents

## HTTP Request[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Index-Constituents#http-request "Direct link to HTTP Request")

GET `/dapi/v1/constituents`

## Request Weight[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Index-Constituents#request-weight "Direct link to Request Weight")

**2**

## Request Parameters[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Index-Constituents#request-parameters "Direct link to Request Parameters")

| Name   | Type   | Mandatory | Description |
| ------ | ------ | --------- | ----------- |
| symbol | STRING | YES       |

## Response Example[​](/docs/derivatives/coin-margined-futures/market-data/rest-api/Index-Constituents#response-example "Direct link to Response Example")

```
{    "symbol": "BTCUSD",    "time": 1697422647853,    "constituents": [        {            "exchange": "bitstamp",            "symbol": "btcusd"        },        {            "exchange": "coinbase",            "symbol": "BTC-USD"        },        {            "exchange": "kraken",            "symbol": "XBT/USD"        },        {            "exchange": "binance_cross",            "symbol": "BTCUSDC*index(USDCUSD)"        }    ]}
```
