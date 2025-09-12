# Introduction

## Welcome

Welcome to the Crypto.com Exchange API v1 reference documentation.

The Crypto.com Exchange API v1 provides developers with a REST, and websocket
API.

The majority of API calls are available across both mediums in the _same_
request and response formats, allowing smooth transition and a reduced learning
curve between the two platforms.

Where applicable, all API calls come with detailed information on both the
request and response parameters, all in a simple JSON format, as well as sample
requests and code snippets in JavaScript, Python, C#, and Java which can be
viewed on the right.

_Notes on Exchange Upgrade and API Versions_

- Exchange v1 API is the latest version of API which can trade Spot /
  Derivatives / Margin.
- Derivatives v1 API has been upgraded into Exchange v1 API with additional
  capabilities for Spot Trading / Margin Trading / Wallet Management. As
  Exchange v1 API is a superset of
  [Derivatives v1 API](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html),
  existing customer can continue using the same for trading.
- For full details about the exchange upgrade, please refer to
  [this blog post with FAQ documents](https://crypto.com/product-news/introducing-the-gen-3-0-crypto-com-exchange).

## Breaking Change Schedule

- On 2025-02-27 8:00 UTC,  
  For `book.{instrument_name}.{depth}`, the full snapshot subscription
  (`book_subscription_type=SNAPSHOT`) `100ms` frequency is removed.  
  Customers wishing to continue with the faster `100ms` frequency should switch
  to the delta subscription (`book_subscription_type=SNAPSHOT_AND_UPDATE`).  
  This higher performing subscription benefits the user with reduced
  bandwidth/processing compared to the snapshot subscription.  
  For a transition period, users subscribing to the removed `100ms` snapshot
  will receive the `500ms` subscription.

  The `book.{instrument_name}` subscription (default depth) will be removed.  
  Customers should use the explicit `book.{instrument_name}.{depth}`
  subscription and specify the required depth.

  For a transition period, users subscribing to the removed subscription will
  receive the default `50` depth subscription.

- These changes will take place around 17 December 2023 8:00 UTC.
- Market Data wildcard ticker subscription will be removed. Users should use the
  instrument specific subscription.

## Change Logs

- 2025-07-17

  - `private/fiat/fiat-deposit-info` was added
  - `private/fiat/fiat-deposit-history` was added
  - `private/fiat/fiat-withdraw-history` was added
  - `private/fiat/fiat-create-withdraw` was added
  - `private/fiat/fiat-get-bank-accounts` was added
  - `private/fiat/fiat-transaction-quota` was added
  - `private/fiat/fiat-transaction-limit` was added

- 2025-07-04

  - `private/create-order` exec_inst was added `SMART_POST_ONLY`
  - `private/create-order-list (LIST)` exec_inst was added `SMART_POST_ONLY`
  - `private/get-open-orders` exec_inst was added `SMART_POST_ONLY`
  - `private/get-order-detail`was addedexec_inst was added `SMART_POST_ONLY`
  - `private/get-order-history` exec_inst was added `SMART_POST_ONLY`

- 2025-06-10

  - `private/amend-order` was added
  - `public/get-announcements` was added

- 2025-05-29

  - transaction_time_ns field was added into `user.order.{instrument_name}`
    response

- 2025-03-14

  - Removed deprecated attributes system_label in `private/get-accounts`

- 2025-03-06

  - Removed deprecated `book.{instrument_name}` default book subscription
  - Removed deprecated 100ms internval from full snapshot
    `book.{instrument_name}.{depth}` book subscription

- 2025-03-04

  - Remove section: `Unified Wallet and System Label`

- 2025-01-27

  - `book.{instrument_name}.{depth}` - The following additional update
    frequencies are now supported:  
    Full snapshot subscription (`book_subscription_type=SNAPSHOT`) `500ms`  
    Delta subscription (`book_subscription_type=SNAPSHOT_AND_UPDATE`) `100ms`

- 2024-12-11

  - `private/create-order` fee_instrument_name was added

- 2024-10-02

  - `public/get-risk-parameters` was added

- 2024-08-15

  - `private/get-fee-rate` was added
  - `private/get-instrument-fee-rate`was added

- 2024-07-12

  - Staking API added:  
    `private/staking/stake`  
    `private/staking/unstake`  
    `private/staking/get-staking-position`  
    `private/staking/get-staking-instruments`  
    `private/staking/get-open-stake`  
    `private/staking/get-stake-history`  
    `private/staking/get-reward-history`  
    `private/staking/convert`  
    `private/staking/get-open-convert`  
    `private/staking/get-convert-history`  
    `public/staking/get-conversion-rate`

- 2024-06-27

  - `private/create-order` self-trade prevent (STP) was added
  - `private/create-order-list (LIST)` self-trade prevent (STP) was added

- 2024-02-12

  - `public/get-trades`, `trade.{instrument_name}` subscription, clarification
    for the public trade side field
  - Side is the side of the taker order
  - `book.{instrument_name}.{depth}` clarifications for book delta sequence
    number handling and re-subscription

- 2024-01-04

  - Market data websocket subscription enhancements:
  - `book.{instrument_name}` - The `subscription` result value is now explicit  
    e.g. previous `"subscription": "book.BTC_USD"` -> new
    `"subscription": "book.BTC_USD.50"`
  - `book.{instrument_name}.{depth}` - For delta updates, the fixed 500ms delta
    full book snapshot heartbeat is replaced with empty delta in the case of no
    book changes
  - `ticker` - Documented existing 'bs' and 'ks' fields (bid/ask size)
  - `settlement` - For wildcard subscription, the `subscription` result value is
    now explicit  
    e.g. previous `"subscription": "settlement"` -> new
    `"subscription": "settlement.BTCUSD-231124"`
  - Applied consistent field ordering for all market data subscriptions (`book`,
    `ticker`, `trade`, `candlestick`, `index`, `mark`, `settlement`, `funding`,
    `estimatedfunding`).  
    Result fields are always in the following order:  
    `id, method, code, instrument_name, subscription, channel`
  - Market data REST `public/get-trades`
  - Added additional `tn` nanoseconds timestamp field to the trade response
  - Clarified timestamp pagination parameters

- 2023-12-18

  - Market Data wildcard ticker subscription removed. Users should use the
    instrument specific subscription.

- 2023-12-11

  - Introduced Market Data subscription limiting. Refer to
    [Market Data Websocket Subscription Limits](#market-data-websocket-subscription-limits)
    for more details

- 2023-10-31

  - `user.balance`,`private/user-balance` will be updated:  
    1\. Existing field total_margin_balance will represent new margin balance
    calculation without haircut.  
    2\. Existing field total_initial_margin previously is made up of position IM
    only. On effective date, this field will represent the total sum of
    total_position_im + total_haircut  
    3\. New field total_position_im will be introduced to represent initial
    margin requirement to support open positions and orders  
    4\. New field total_haircut will be introduced to represent the total
    haircut on eligible collateral token assets. Refer to
    [Smart Cross Margin Enhancement Guide](https://static2.crypto.com/exchange/assets/documents/Exchange%20Smart%20Cross%20Margin%20Enhancement%20Guide%202023.pdf)
    for details
  - `user.balance`, `user.account_risk`, `private/user-balance`,
    `private/get-subaccount-balances` will be updated:  
    1\. New field collateral_eligible will be introduced to indicate if token is
    eligible Collateral  
    2\. collateral_weight will be deprecated  
    3\. New field haircut will be introduced to show haircut of eligible
    collateral token instead of collateral Weight. Refer to
    [Smart Cross Margin Enhancement Guide](https://static2.crypto.com/exchange/assets/documents/Exchange%20Smart%20Cross%20Margin%20Enhancement%20Guide%202023.pdf)
    for details

- 2023-08-11

  - `private/create-order-list (LIST)` for batch order creation added
  - `private/cancel-order-list (LIST)` for batch order cancel added

- 2023-07-31

  - Market Data Websocket Subscriptions is effective:
  - `funding.{instrument_name}` - channel will return the fixed hourly rate that
    will settle at the end of the hour.
  - `estimatedfunding.{instrument_name}` - channel will return the estimated
    hourly rate that will begin in the next interval.
  - Added new “funding_rate” and “estimated_funding_rate” valuation types for
    public/get-valuations

- 2023-06-28

  - `private/get-deposit-history` added
  - `private/get-withdrawal-history` added

- 2022-11-30

  - Support using `client_oid` to query in `private/get-order-detail` REST API

- 2022-11-10

  - `USD_Stable_Coin` (aka USD Bundle), will be renamed as `USD`. Customer can
    test the change in UAT from 2022-11-10 before the change is effective in
    PROD. Target date for PROD is TBD.
  - Customer can input both `USD` and `USD_Stable_Coin` to mean the same USD
    Bundle.
  - However, on response, `USD` will be used to mean USD Bundle, instead of
    `USD_Stable_Coin`.

- 2022-10-31

  - Added `private/create-order-list`, `private/create-subaccount-transfer` REST
    APIs
  - Added `user.account_risk` and `user.position_balance` WebSocket
    subscriptions
  - Added more `period` in `public/get-candlestick`
    `candlestick.{time_frame}.{instrument_name}` WebSocket subscription

- 2022-09-21 - Added **Unified Wallet and System Label** section, to illustrate
  the transition from multiple wallets into unified wallet.
- 2022-09-21 - Added new sub-account management endpoints:
  `private/get-accounts`, `private/create-subaccount-transfer`
- 2022-09-21 - Added new exchange wallet management endpoints:
  `private/create-withdrawal`, `private/get-deposit-address`,
  `private/get-curency-networks`
- 2022-09-21 - First publish, based on Derivative Exchange API v1.

# Common API Reference

Most of the APIs for REST and Websockets are shared, and follow the same request
format and response, allowing users to easily switch between the two methods.

The `Applies To` section under each API allows you to see which platform
supports the API.

### Naming Conventions

- All methods and URLs in dash-case
- All parameters in snake_case
- Enums in full uppercase and snake_case

## Generating the API Key

Before sending any requests, you'll need to generate a new API key.

This can be done in the Exchange website under `User Center` - `API`.

After generating the key, there are two things you need to carefully note down:

- API Key
- Secret Key

API Key and Secret are randomly generated by the system and can not be modified.
Default settings will be set to "Can Read" only, and you have the option of
adding or removing certain permissions for your API Key via Web UI.

You can optionally specify a whitelist of IP addresses when generating the API
Key.

If specified, the API can only be used from the whitelisted IP addresses.

## REST API Root Endpoint

Note: REST API requests need to be sent as "Content Type: application/json"

### UAT Sandbox

#### REST API

`https://uat-api.3ona.co/exchange/v1/{method}`

### Production

#### REST API

`https://api.crypto.com/exchange/v1/{method}`

## Websocket Root Endpoints

The Websocket is available across two servers -- the User API Websocket (for
authenticated requests and subscriptions), and Market Data Websocket:

### UAT Sandbox

#### Websocket (User API and Subscriptions)

`wss://uat-stream.3ona.co/exchange/v1/user`

#### Websocket (Market Data Subscriptions)

`wss://uat-stream.3ona.co/exchange/v1/market`

### Production

#### Websocket (User API and Subscriptions)

`wss://stream.crypto.com/exchange/v1/user`

#### Websocket (Market Data Subscriptions)

`wss://stream.crypto.com/exchange/v1/market`

## Rate Limits

### REST API

For authenticated calls, rate limits are per API method, per API key:

| Method | Limit |
| ------ | ----- |

| `private/create-order`  
`private/cancel-order`  
`private/cancel-all-orders` | 15 requests per 100ms each | |
`private/get-order-detail` | 30 requests per 100ms | | `private/get-trades` | 1
requests per second | | `private/get-order-history` | 1 requests per second | |
All others | 3 requests per 100ms each |

For public market data calls, rate limits are per API method, per IP address:

| Method | Limit |
| ------ | ----- |

| `public/get-book`  
`public/get-ticker`  
`public/get-trades`  
`public/get-valuations`  
`public/get-candlestick`  
`public/get-insurance` | 100 requests per second each |

### Staking

| Method              | Limit                  |
| ------------------- | ---------------------- |
| `public/staking/*`  | 50 requests per second |
| `private/staking/*` | 50 requests per second |

### Websocket

| Websocket   | Limit                   |
| ----------- | ----------------------- |
| User API    | 150 requests per second |
| Market Data | 100 requests per second |

`private/get-trades` and `private/get-order-history` is rate limited at 1
request per second on REST

**Important Note**

We recommend adding a 1-second sleep after establishing the websocket
connection, and before requests are sent.

This will avoid occurrences of rate-limit (\`TOO_MANY_REQUESTS\`) errors, as the
websocket rate limits are pro-rated based on the calendar-second that the
websocket connection was opened.

## Open Order Limit

| Condition                                                                           | Limit |
| ----------------------------------------------------------------------------------- | ----- |
| Maximum allowed open orders per trading pair per account/subaccount                 | 200   |
| Overall maximum allowed open orders per account/subaccount across all trading pairs | 1000  |

## Request Format

The following information applies to both REST API and websockets commands:

| Name | Type | Required | Description        |
| ---- | ---- | -------- | ------------------ |
| id   | long | Y        | Request Identifier |

Range: 0 to 9,223,372,036,854,775,807  
Response message will contain the same id | | method | string | Y | The method
to be invoked | | params | object | N | Parameters for the methods | | api_key |
string | Depends | API key. See `Digital Signature` section | | sig | string |
Depends | Digital signature. See `Digital Signature` section | | nonce | long |
Y | Current timestamp (milliseconds since the Unix epoch) |

## Digital Signature

    const crypto = require("crypto-js");

    const signRequest = (request_body, api_key, secret) => {
      const { id, method, params, nonce } = request_body;

      function isObject(obj) { return obj !== undefined && obj !== null && obj.constructor == Object; }
      function isArray(obj) { return obj !== undefined && obj !== null && obj.constructor == Array; }
      function arrayToString(obj) { return obj.reduce((a,b) => { return a + (isObject(b) ? objectToString(b) : (isArray(b) ? arrayToString(b) : b)); }, ""); }
      function objectToString(obj) { return (obj == null ? "" : Object.keys(obj).sort().reduce((a, b) => { return a + b + (isArray(obj[b]) ? arrayToString(obj[b]) : (isObject(obj[b]) ? objectToString(obj[b]) : obj[b])); }, "")); }

      const paramsString = objectToString(params);

      console.log(paramsString);

      const sigPayload = method + id + api_key + paramsString + nonce;
      request_body.sig = crypto.HmacSHA256(sigPayload, secret).toString(crypto.enc.Hex);
    };

    const apiKey = "token"; /* User API Key */
    const apiSecret = "secretKey"; /* User API Secret */

    let request = {
      id: 11,
      method: "private/get-order-detail",
      api_key: API_KEY,
      params: {
        order_id: 53287421324
      },
      nonce: 1587846358253,
    };

    const requestBody = JSON.stringify(signRequest(request, apiKey, apiSecret)));


    import hmac
    import hashlib
    import time

    API_KEY = "API_KEY"
    SECRET_KEY = "SECRET_KEY"

    req = {
        "id": 14,
        "method": "private/create-order-list",
        "api_key": API_KEY,
        "params": {
            "contingency_type": "LIST",
            "order_list": [
                {
                    "instrument_name": "ONE_USDT",
                    "side": "BUY",
                    "type": "LIMIT",
                    "price": "0.24",
                    "quantity": "1.0"
                },
                {
                    "instrument_name": "ONE_USDT",
                    "side": "BUY",
                    "type": "STOP_LIMIT",
                    "price": "0.27",
                    "quantity": "1.0",
                    "trigger_price": "0.26"
                }
            ]
        },
        "nonce": int(time.time() * 1000)
    }

    # First ensure the params are alphabetically sorted by key
    param_str = ""

    MAX_LEVEL = 3


    def params_to_str(obj, level):
        if level >= MAX_LEVEL:
            return str(obj)

        return_str = ""
        for key in sorted(obj):
            return_str += key
            if obj[key] is None:
                return_str += 'null'
            elif isinstance(obj[key], list):
                for subObj in obj[key]:
                    return_str += params_to_str(subObj, level + 1)
            else:
                return_str += str(obj[key])
        return return_str


    if "params" in req:
        param_str = params_to_str(req['params'], 0)

    payload_str = req['method'] + str(req['id']) + req['api_key'] + param_str + str(req['nonce'])

    req['sig'] = hmac.new(
        bytes(str(SECRET_KEY), 'utf-8'),
        msg=bytes(payload_str, 'utf-8'),
        digestmod=hashlib.sha256
    ).hexdigest()


    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Security.Cryptography;
    using System.Text;
    using System.Threading.Tasks;
    using System.Web;
    using System.Net.WebSockets;

    private const string API_KEY = "YOUR_API_KEY";
    private const string API_SECRET = "YOUR_API_SECRET";

    private static string GetSign (Dictionary Request)
    {
      Dictionary Params = Request.Params;

      // Ensure the params are alphabetically sorted by key
      // When params contains List value, please refer to the other language's example code for the correct implementation of ParamString
      string ParamString = string.Join("", Params.Keys.OrderBy(key => key).Select(key => key + Params[key]));

      string SigPayload = Request.method + Request.id + API_KEY + ParamString + Request.nonce;

      var hash = new HMACSHA256(API_SECRET);
        var ComputedHash = hash.ComputeHash(SigPayload);
      return ToHex(ComputedHash, false);
    }


    import com.fasterxml.jackson.annotation.JsonProperty;
    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.util.Map;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public class ApiRequestJson {
      private Long id;
      private String method;
      private Map<String, Object> params;
      private String sig;

      @JsonProperty("api_key")
      private String apiKey;

      private Long nonce;
    }

    //------------

    import java.math.BigDecimal;
    import java.nio.charset.StandardCharsets;
    import java.security.InvalidKeyException;
    import java.security.NoSuchAlgorithmException;
    import java.util.List;
    import java.util.Map;
    import java.util.TreeMap;
    import javax.crypto.Mac;
    import javax.crypto.spec.SecretKeySpec;
    import org.apache.commons.codec.binary.Hex;

    public class SigningUtil {

      private static final String HMAC_SHA256 = "HmacSHA256";
      private static final int MAX_LEVEL = 3;

      public static boolean verifySignature(ApiRequestJson apiRequestJson, String secret) {
        try {
          return genSignature(apiRequestJson, secret).equalsIgnoreCase(apiRequestJson.getSig());
        } catch (Exception e) {
          return false;
        }
      }

      @SuppressWarnings("unchecked")
      public static String getParamString(final Object paramObject) {
        StringBuilder sb = new StringBuilder();
        appendParamString(sb, paramObject, 0);
        return sb.toString();
      }


      @SuppressWarnings("unchecked")
      private static void appendParamString(final StringBuilder paramsStringBuilder, final Object paramObject, final int level) {
        if (level >= MAX_LEVEL) {
          paramsStringBuilder.append(paramObject.toString());
          return;
        }

        if (paramObject instanceof Map) {
          TreeMap<String, Object> params = new TreeMap<>((Map) paramObject);
          for (Map.Entry<String, Object> entry : params.entrySet()) {
            if (entry.getValue() instanceof Double) {
              paramsStringBuilder
                  .append(entry.getKey())
                  .append((new BigDecimal(entry.getValue().toString()))
                      .stripTrailingZeros()
                      .toPlainString());
            } else if (entry.getValue() instanceof List || entry.getValue() instanceof Map) {
              paramsStringBuilder
                  .append(entry.getKey());
              appendParamString(paramsStringBuilder, entry.getValue(), level + 1);
            } else {
              paramsStringBuilder
                  .append(entry.getKey())
                  .append(entry.getValue());
            }
          }
        } else if (paramObject instanceof List) {
          List list = (List) paramObject;
          for (Object o : list) {
            appendParamString(paramsStringBuilder, o, level + 1);
          }
        } else {
          paramsStringBuilder.append(paramObject.toString());
        }
      }

      public static String genSignature(ApiRequestJson apiRequestJson, String secret)
          throws NoSuchAlgorithmException, InvalidKeyException {
        final byte[] byteKey = secret.getBytes(StandardCharsets.UTF_8);
        Mac mac = Mac.getInstance(HMAC_SHA256);
        SecretKeySpec keySpec = new SecretKeySpec(byteKey, HMAC_SHA256);
        mac.init(keySpec);

        String paramsString = "";

        if (apiRequestJson.getParams() != null) {
          paramsString += getParamString(apiRequestJson.getParams());
        }

        String sigPayload =
            apiRequestJson.getMethod()
                + apiRequestJson.getId()
                + apiRequestJson.getApiKey()
                + paramsString
                + (apiRequestJson.getNonce() == null ? "" : apiRequestJson.getNonce());

        byte[] macData = mac.doFinal(sigPayload.getBytes(StandardCharsets.UTF_8));

        return Hex.encodeHexString(macData);
      }

      public static ApiRequestJson sign(ApiRequestJson apiRequestJson, String secret)
          throws InvalidKeyException, NoSuchAlgorithmException {
        apiRequestJson.setSig(genSignature(apiRequestJson, secret));

        return apiRequestJson;
      }

      public static void main(String[] argv) throws InvalidKeyException, NoSuchAlgorithmException {
        ApiRequestJson apiRequestJson = ApiRequestJson.builder()
                .id(11L)
                .apiKey("token")
                .method("public/auth")
                .nonce(1589594102779L)
                .build();

        System.out.println(genSignature(apiRequestJson, "secretKey"));

        System.out.println(sign(apiRequestJson, "secretKey"));

      }
    }

For REST API, only the **private** methods require a Digital Signature (as
"sig") and API key (as "api_key") to be passed in. These private endpoints are
only accessible by authenticated users.

For Websocket (User API), the `public/auth` command has to be invoked ONCE per
session, with the Digital Signature (as "sig") and API key (as "api_key") as
part of the request. Once authenticated, you will gain access to user-specific
commands, and no longer need to use the pass in the Digital Signature and API
key anymore for the duration of the session.

The authentication is based on the pairing of the API Key, along with the
HMAC-SHA256 hash of the request parameters using the API Secret as the
cryptographic key.

You should NEVER explicitly include the API Secret Key in plain-text in your
request

The algorithm for generating the HMAC-SHA256 signature is as follows:

- If "params" exist in the request, sort the request parameter keys in
  **ascending** order.
- Combine all the ordered parameter keys as `key` + `value` (no spaces, no
  delimiters). Let's call this the `parameter string`
- Next, do the following: `method` + `id` + `api_key` + `parameter string` +
  `nonce`
- Use HMAC-SHA256 to hash the above using the API Secret as the cryptographic
  key
- Encode the output as a hex string -- this is your Digital Signature

Since all parameters for calculating the HMAC-SHA256 hash are present in the
request **except** the API Secret, the server-side will independently calculate
the Digital Signature as well, and if done correctly, the computed hashes will
match.  
Besides, for JavaScript client calling \`private/get-order-detail\` API, it is
highly recommended to use STRING format of \`order_id\` in the JSON request
payload, in order to guarantee the correctness of Digital Signature.

## Request Format

**Important Note**

All **numbers** **must** be strings, and must be wrapped in double quotes. e.g.
"12.34", instead of 12.34.

## Response Format

| Name     | Type   | Description                                              |
| -------- | ------ | -------------------------------------------------------- |
| id       | long   | Original request identifier                              |
| method   | string | Method invoked                                           |
| result   | object | Result object                                            |
| code     | int    | 0 for success, see below for full list                   |
| message  | string | (optional) For server or error messages                  |
| original | string | (optional) Original request as a string, for error cases |

## Response and Reason Codes

These codes are shared by both the response, and the `reason` field for rejected
orders.

| Code  | HTTP Status | Message Code                             | Description                                                                                                                                     |
| ----- | ----------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 0     | 200         | \--                                      | Success                                                                                                                                         |
| 201   | 500         | NO_POSITION                              | No position                                                                                                                                     |
| 202   | 400         | ACCOUNT_IS_SUSPENDED                     | Account is suspended                                                                                                                            |
| 203   | 500         | ACCOUNTS_DO_NOT_MATCH                    | Accounts do not match                                                                                                                           |
| 204   | 400         | DUPLICATE_CLORDID                        | Duplicate client order id                                                                                                                       |
| 205   | 500         | DUPLICATE_ORDERID                        | Duplicate order id                                                                                                                              |
| 206   | 500         | INSTRUMENT_EXPIRED                       | Instrument has expired                                                                                                                          |
| 207   | 400         | NO_MARK_PRICE                            | No mark price                                                                                                                                   |
| 208   | 400         | INSTRUMENT_NOT_TRADABLE                  | Instrument is not tradable                                                                                                                      |
| 209   | 400         | INVALID_INSTRUMENT                       | Instrument is invalid                                                                                                                           |
| 210   | 500         | INVALID_ACCOUNT                          | Account is invalid                                                                                                                              |
| 211   | 500         | INVALID_CURRENCY                         | Currency is invalid                                                                                                                             |
| 212   | 500         | INVALID_ORDERID                          | Invalid order id                                                                                                                                |
| 213   | 400         | INVALID_ORDERQTY                         | Invalid order quantity                                                                                                                          |
| 214   | 500         | INVALID_SETTLE_CURRENCY                  | Invalid settlement currency                                                                                                                     |
| 215   | 500         | INVALID_FEE_CURRENCY                     | Invalid fee currency                                                                                                                            |
| 216   | 500         | INVALID_POSITION_QTY                     | Invalid position quantity                                                                                                                       |
| 217   | 500         | INVALID_OPEN_QTY                         | Invalid open quantity                                                                                                                           |
| 218   | 400         | INVALID_ORDTYPE                          | Invalid `order_type`                                                                                                                            |
| 219   | 500         | INVALID_EXECINST                         | Invalid `exec_inst`                                                                                                                             |
| 220   | 400         | INVALID_SIDE                             | Invalid `side`                                                                                                                                  |
| 221   | 400         | INVALID_TIF                              | Invalid `time_in_force`                                                                                                                         |
| 222   | 400         | STALE_MARK_PRICE                         | Stale mark price                                                                                                                                |
| 223   | 400         | NO_CLORDID                               | No client order id                                                                                                                              |
| 224   | 400         | REJ_BY_MATCHING_ENGINE                   | Rejected by matching engine                                                                                                                     |
| 225   | 400         | EXCEED_MAXIMUM_ENTRY_LEVERAGE            | Exceeds maximum entry leverage                                                                                                                  |
| 226   | 400         | INVALID_LEVERAGE                         | Invalid leverage                                                                                                                                |
| 227   | 400         | INVALID_SLIPPAGE                         | Invalid slippage                                                                                                                                |
| 228   | 400         | INVALID_FLOOR_PRICE                      | Invalid floor price                                                                                                                             |
| 229   | 400         | INVALID_REF_PRICE                        | Invalid ref price                                                                                                                               |
| 230   | 400         | INVALID_TRIGGER_TYPE                     | Invalid ref price type                                                                                                                          |
| 301   | 500         | ACCOUNT_IS_IN_MARGIN_CALL                | Account is in margin call                                                                                                                       |
| 302   | 500         | EXCEEDS_ACCOUNT_RISK_LIMIT               | Exceeds account risk limit                                                                                                                      |
| 303   | 500         | EXCEEDS_POSITION_RISK_LIMIT              | Exceeds position risk limit                                                                                                                     |
| 304   | 500         | ORDER_WILL_LEAD_TO_IMMEDIATE_LIQUIDATION | Order will lead to immediate liquidation                                                                                                        |
| 305   | 500         | ORDER_WILL_TRIGGER_MARGIN_CALL           | Order will trigger margin call                                                                                                                  |
| 306   | 500         | INSUFFICIENT_AVAILABLE_BALANCE           | Insufficient available balance                                                                                                                  |
| 307   | 500         | INVALID_ORDSTATUS                        | Invalid order status                                                                                                                            |
| 308   | 400         | INVALID_PRICE                            | Invalid price                                                                                                                                   |
| 309   | 500         | MARKET_IS_NOT_OPEN                       | Market is not open                                                                                                                              |
| 310   | 500         | ORDER_PRICE_BEYOND_LIQUIDATION_PRICE     | Order price beyond liquidation price                                                                                                            |
| 311   | 500         | POSITION_IS_IN_LIQUIDATION               | Position is in liquidation                                                                                                                      |
| 312   | 500         | ORDER_PRICE_GREATER_THAN_LIMITUPPRICE    | Order price is greater than the limit up price                                                                                                  |
| 313   | 500         | ORDER_PRICE_LESS_THAN_LIMITDOWNPRICE     | Order price is less than the limit down price                                                                                                   |
| 314   | 400         | EXCEEDS_MAX_ORDER_SIZE                   | Exceeds max order size                                                                                                                          |
| 315   | 400         | FAR_AWAY_LIMIT_PRICE                     | Far away limit price                                                                                                                            |
| 316   | 500         | NO_ACTIVE_ORDER                          | No active order                                                                                                                                 |
| 317   | 500         | POSITION_NO_EXIST                        | Position does not exist                                                                                                                         |
| 318   | 400         | EXCEEDS_MAX_ALLOWED_ORDERS               | Exceeds max allowed orders                                                                                                                      |
| 319   | 400         | EXCEEDS_MAX_POSITION_SIZE                | Exceeds max position size                                                                                                                       |
| 320   | 500         | EXCEEDS_INITIAL_MARGIN                   | Exceeds initial margin                                                                                                                          |
| 321   | 500         | EXCEEDS_MAX_AVAILABLE_BALANCE            | Exceeds maximum availble balance                                                                                                                |
| 401   | 400         | ACCOUNT_DOES_NOT_EXIST                   | Account does not exist                                                                                                                          |
| 406   | 500         | ACCOUNT_IS_NOT_ACTIVE                    | Account is not active                                                                                                                           |
| 407   | 500         | MARGIN_UNIT_DOES_NOT_EXIST               | Margin unit does not exist                                                                                                                      |
| 408   | 400         | MARGIN_UNIT_IS_SUSPENDED                 | Margin unit is suspended                                                                                                                        |
| 409   | 500         | INVALID_USER                             | Invalid user                                                                                                                                    |
| 410   | 500         | USER_IS_NOT_ACTIVE                       | User is not active                                                                                                                              |
| 411   | 500         | USER_NO_DERIV_ACCESS                     | User does not have derivative access                                                                                                            |
| 412   | 500         | ACCOUNT_NO_DERIV_ACCESS                  | Account does not have derivative access                                                                                                         |
| 415   | 500         | BELOW_MIN_ORDER_SIZE                     | Below Min. Order Size                                                                                                                           |
| 501   | 500         | EXCEED_MAXIMUM_EFFECTIVE_LEVERAGE        | Exceeds maximum effective leverage                                                                                                              |
| 604   | 500         | INVALID_COLLATERAL_PRICE                 | Invalid collateral price                                                                                                                        |
| 605   | 500         | INVALID_MARGIN_CALC                      | Invalid margin calculation                                                                                                                      |
| 606   | 500         | EXCEED_ALLOWED_SLIPPAGE                  | Exceed allowed slippage                                                                                                                         |
| 30024 | 400         | MAX_AMOUNT_VIOLATED                      | If `create-withdrawal` call quantity > `max_withdrawal_balance` in `user-balance` api                                                           |
| 40001 | 400         | BAD_REQUEST                              | Bad request                                                                                                                                     |
| 40002 | 400         | METHOD_NOT_FOUND                         | Method not found                                                                                                                                |
| 40003 | 400         | INVALID_REQUEST                          | Invalid request                                                                                                                                 |
| 40004 | 400         | MISSING_OR_INVALID_ARGUMENT              | Required argument is blank or missing                                                                                                           |
| 40005 | 400         | INVALID_DATE                             | Invalid date                                                                                                                                    |
| 40006 | 400         | DUPLICATE_REQUEST                        | Duplicate request received                                                                                                                      |
| 40101 | 401         | UNAUTHORIZED                             | Not authenticated, or key/signature incorrect                                                                                                   |
| 40102 | 400         | INVALID_NONCE                            | Nonce value differs by more than 60 seconds                                                                                                     |
| 40103 | 401         | IP_ILLEGAL                               | IP address not whitelisted                                                                                                                      |
| 40104 | 401         | USER_TIER_INVALID                        | Disallowed based on user tier                                                                                                                   |
| 40107 | 400         | EXCEED_MAX_SUBSCRIPTIONS                 | Session subscription limit has been exceeded                                                                                                    |
| 40401 | 200         | NOT_FOUND                                | Not found                                                                                                                                       |
| 40801 | 408         | REQUEST_TIMEOUT                          | Request has timed out                                                                                                                           |
| 42901 | 429         | TOO_MANY_REQUESTS                        | Requests have exceeded rate limits                                                                                                              |
| 43003 | 500         | FILL_OR_KILL                             | FOK order has not been filled and cancelled                                                                                                     |
| 43004 | 500         | IMMEDIATE_OR_CANCEL                      | IOC order has not been filled and cancelled                                                                                                     |
| 43005 | 500         | POST_ONLY_REJ                            | Rejected POST_ONLY create-order request (normally happened when `exec_inst` contains `POST_ONLY` but `time_in_force` is NOT `GOOD_TILL_CANCEL`) |
| 43012 | 200         | SELF_TRADE_PREVENTION                    | Canceled due to Self Trade Prevention                                                                                                           |
| 50001 | 400         | DW_CREDIT_LINE_NOT_MAINTAINED            | If `create-withdrawal` call breaching credit line check                                                                                         |
| 50001 | 400         | ERR_INTERNAL                             | Internal error                                                                                                                                  |

## Websocket Termination Codes

| Code | Description                                                                       |
| ---- | --------------------------------------------------------------------------------- |
| 1000 | Normal disconnection by server, usually when the heartbeat isn't handled properly |
| 1006 | Abnormal disconnection                                                            |
| 1013 | Server restarting -- try again later                                              |

## Error Response Format

Due to the asynchronous nature of websocket requests, a robust and consistent
error response is crucial in order to match the response with the request.

To ensure API consistency for websocket error responses, if the `id` and
`method` is omitted in the original request, `id` will have a value of `-1` and
`method` will have a value of `ERROR`.

The original request will be returned as an escaped string in the `original`
field.

# Websocket Subscriptions

## Introduction

> Request Sample

    {
      "id": 1,
      "method": "subscribe",
      "params": {
        "channels": ["user.order"]
      },
      "nonce": 1587523073344
    }

> Response Sample (Initial)

    {
      "id": 1,
      "code": 0,
      "method": "subscribe"
    }

One of the powerful features of a websocket is the ability to subscribe to
incremental updates in particular `channels`.

This section covers the available channels that can be subscribed or
unsubscribed for both the **Websocket (User API)** and **Websocket (Market Data
Subscriptions)**

Market Data Subscriptions include features such as order book depth, all trades
and ticker data.

The Market Data Subscriptions websocket is on a **separate** websocket endpoint
from the User API websocket.

### Market Data Websocket Subscription Limits

Websocket (Market Data Subscriptions)

To better distribute system load, a single market data websocket connection is
limited to a maximum of 400 subscriptions. Once this limit is reached, further
subscription requests will be rejected with the `EXCEED_MAX_SUBSCRIPTIONS` error
code.

A user should establish multiple connections if additional market data
subscriptions are required.

### Subscription Requests

Websocket subscriptions involve two responses:

- An initial response to the subscribe command, which can subscribe to one or
  more channels
- Periodic channel data for the specified channel

**Important Note**

We recommend adding a 1-second sleep after establishing the websocket
connection, and before requests are sent.

This will avoid occurrences of rate-limit (\`TOO_MANY_REQUESTS\`) errors, as the
websocket rate limits are pro-rated based on the calendar-second that the
websocket connection was opened.

### Request Params

| Name     | Type             | Required | Description               |
| -------- | ---------------- | -------- | ------------------------- |
| method   | string           | Y        | subscribe, unsubscribe    |
| channels | array of strings | Y        | Channels to be subscribed |

### Applies To

Websocket (User API) Websocket (Market Data Subscriptions)

## Websocket Heartbeats

> Heartbeat Example

    {
      "id": 1587523073344,
      "method": "public/heartbeat",
      "code": 0
    }

> Request Sample

    {
      "id": 1587523073344,
      "method": "public/respond-heartbeat"
    }

For websocket connections, the system will send a heartbeat message to the
client every **30 seconds**.

The client **must** respond back with the `public/respond-heartbeat` method,
using the same matching `id`, within **5 seconds**, or the connection will
break.

### Request Params

None

### Applies To

Websocket (User API) Websocket (Market Data Subscriptions)

## user.order.{instrument_name}

> Request Sample

    {
      "id": 1,
      "method": "subscribe",
      "params": {
        "channels": ["user.order"]
      },
      "nonce": 1587523073344
    }

> Response Sample

    {
      "id": 1,
      "method": "subscribe",
      "code": 0,
      "result": {
        "instrument_name": "BTCUSD-PERP",
        "subscription": "user.order.BTCUSD-PERP",
        "channel": "user.order",
        "data": [{
          "account_id": "52e7c00f-1324-5a6z-bfgt-de445bde21a5",
          "order_id": "19848525",
          "client_oid": "1613571154900",
          "order_type": "LIMIT",
          "time_in_force": "GOOD_TILL_CANCEL",
          "side": "BUY",
          "exec_inst": [],
          "quantity": "0.0100",
          "limit_price": "50000.0",
          "order_value": "500.000000",
          "maker_fee_rate": "0.000250",
          "taker_fee_rate": "0.000400",
          "avg_price": "0.0",
          "cumulative_quantity": "0.0000",
          "cumulative_value": "0.000000",
          "cumulative_fee": "0.000000",
          "status": "ACTIVE",
          "update_user_id": "fd797356-55db-48c2-a44d-157aabf702e8",
          "order_date": "2021-02-17",
          "instrument_name": "BTCUSD-PERP",
          "fee_instrument_name": "USD",
          "create_time": 1613575617173,
          "create_time_ns": "1613575617173123456",
          "update_time": 1613575617173
          "transaction_time_ns": "1613570791060827635",
        }]
      }
    }

Publishes all new orders or order updates for the user for a particular
instrument, where the early response containing the same `id` as the request is
the current open orders.

Requires initial authentication using `public/auth` (see `public/auth` for more
information).

### Applies To

Websocket (User API)

### Response Attributes

| Name            | Type   | Description                                                      |
| --------------- | ------ | ---------------------------------------------------------------- |
| instrument_name | string | e.g. BTCUSD-PERP                                                 |
| subscription    | string | `user.order.{instrument_name}` or `user.order` (all instruments) |
| channel         | string | `user.order`                                                     |
| data            | array  | See below                                                        |

`subscription` makes it easy to map to the initial subscription

`channel` and `instrument_name` simply allow easier access to parameters without
needing to parse the `subscription`

`data` consists of:

| Name          | Type             | Description                                                                      |
| ------------- | ---------------- | -------------------------------------------------------------------------------- |
| account_id    | string           | Account ID                                                                       |
| order_id      | string of number | Order ID                                                                         |
| client_oid    | string           | Client Order ID                                                                  |
| order_type    | string           | `MARKET`, `LIMIT`, `STOP_LOSS`, `STOP_LIMIT`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT` |
| time_in_force | string           |

\- `GOOD_TILL_CANCEL`  
\- `IMMEDIATE_OR_CANCEL`  
\- `FILL_OR_KILL` | | side | string | `BUY` or `SELL` | | exec_inst | array |  
\- `POST_ONLY`  
\- `LIQUIDATION` | | quantity | string | Quantity specified in the order | |
limit_price | string | Limit price specified in the order | | order_value |
string | Order value | | maker_fee_rate | string | User's maker fee rate | |
taker_fee_rate | string | User's taker fee rate | | avg_price | string | Average
price | | cumulative_quantity | string | Cumulative executed quantity | |
cumulative_value | string | Cumulative executed value | | cumulative_fee |
string | Cumulative executed fee | | status | string | Order status:  
\- `NEW`  
\- `PENDING`  
\- `REJECTED`  
\- `ACTIVE`  
\- `CANCELED`  
\- `FILLED`  
\- `EXPIRED` | | update_user_id | string | Updated user | | order_date | string
| Order creation date | | create_time | number | Order creation timestamp | |
create_time_ns | string | Order creation timestamp (nanosecond) | | update_time
| number | Order update timestamp | | transaction_time_ns | string | Order
transaction timestamp (nanosecond). This field is equivalent to
TransactTime(Tag 60) in FIX | | instrument_name | string | e.g. BTCUSD-PERP | |
fee_instrument_name | string | Currency used for the fees |

Note: To detect a 'partial filled' status, look for `status` as `ACTIVE` and
`cumulative_quantity` > 0.

## user.trade.{instrument_name}

> Request Sample

    {
      "id": 1,
      "method": "subscribe",
      "params": {
        "channels": ["user.trade"]
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "subscribe",
      "code": 0,
      "result": {
        "instrument_name": "BTCUSD-PERP",
        "subscription": "user.trade.BTCUSD-PERP",
        "channel": "user.trade",
        "data": [{
          "account_id": "52e7c00f-1324-5a6z-bfgt-de445bde21a5",
          "event_date": "2021-02-17",
          "journal_type": "TRADING",
          "traded_quantity": "0.0500",
          "traded_price": "51278.5",
          "fees": "-1.025570",
          "order_id": "19708564",
          "trade_id": "38554669",
          "trade_match_id": "76423",
          "client_oid":"6ac2421d-5078-4ef6-a9d5-9680602ce123",
          "taker_side":"MAKER",
          "side": "BUY",
          "instrument_name": "BTCUSD-PERP",
          "fee_instrument_name": "USD",
          "create_time": 1613570791060,
          "create_time_ns": "1613570791060123456",
          "transaction_time": "1613570791060827635",
          "match_count": "1",
          "match_index": "0"
        }]
      }
    }

Publishes all new trades updates related to the user for a particular
instrument, where the early response containing the same `id` serves as the
confirmation to the request, and the rest of the responses with `"id":-1` are
live updates

Requires initial authentication using `public/auth` (see `public/auth` for more
information).

### Applies To

Websocket (User API)

### Response Attributes

| Name            | Type   | Description                                                      |
| --------------- | ------ | ---------------------------------------------------------------- |
| instrument_name | string | e.g. BTCUSD-PERP                                                 |
| subscription    | string | `user.trade.{instrument_name}` or `user.trade` (all instruments) |
| channel         | string | user.trade                                                       |
| data            | array  | See below                                                        |

`subscription` makes it easy to map to the initial subscription

`channel` and `instrument_name` simply allow easier access to parameters without
needing to parse the `subscription`

`data` consists of:

| Name                | Type             | Description                                                |
| ------------------- | ---------------- | ---------------------------------------------------------- |
| account_id          | string           | Account ID                                                 |
| event_date          | string           | Event date                                                 |
| journal_type        | string           | Journal type would be `TRADING`                            |
| traded_quantity     | string           | Trade quantity                                             |
| traded_price        | string           | Trade price                                                |
| fees                | string           | Trade fees, the negative sign means a deduction on balance |
| order_id            | string of number | Order ID                                                   |
| trade_id            | string of number | Trade ID                                                   |
| trade_match_id      | string of number | Trade match ID                                             |
| client_oid          | string           | Client Order ID                                            |
| taker_side          | string           | `MAKER` or `TAKER` or empty                                |
| side                | string           | `BUY` or `SELL`                                            |
| instrument_name     | string           | e.g. BTCUSD-PERP                                           |
| fee_instrument_name | string           | e.g. USD                                                   |
| create_time         | number           | Create timestamp                                           |
| create_time_ns      | string           | Create timestamp (nanosecond)                              |
| transaction_time    | string           | Trade transaction timestamp in (nanosecond)                |
| match_count         | string of number | Number of orders matched for this trade execution          |

If it is Maker's Order, value is always 1  
If it is Taker's Order, it is the number of orders matched for this trade
execution | | match_index | string of number | Only appears if it is Maker's
order.  
It represents which order entry of corresponding price level was matched  
This value is 0 base. If the matched order is on the top of the queue, it is
shown 0. |

## user.balance

> Request Sample

    {
      "id": 1,
      "method":"subscribe",
      "params":{
        "channels":["user.balance"]
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "subscribe",
      "code": 0,
      "result": {
        "subscription": "user.balance",
        "channel": "user.balance",
        "data": [{
          "total_available_balance": "4721.05898582",
          "total_margin_balance": "7595.42571782",
          "total_initial_margin": "2874.36673202",
          "total_position_im": "486.31273202",
          "total_haircut": "2388.054",
          "total_maintenance_margin": "1437.18336601",
          "total_position_cost": "14517.54641301",
          "total_cash_balance": "7890.00320721",
          "total_collateral_value": "7651.18811483",
          "total_session_unrealized_pnl": "-55.76239701",
          "instrument_name": "USD",
          "total_session_realized_pnl": "0.00000000",
          "is_liquidating": false,
          "total_effective_leverage" : "1.90401230",
          "position_limit" : "3000000.00000000",
          "used_position_limit" : "40674.69622001",
          "position_balances": [
            {
              "instrument_name": "CRO",
              "quantity": "24422.72427884",
              "market_value": "4776.107959969951",
              "collateral_eligible": "true",
              "haircut": "0.5",
              "collateral_amount": "4776.007959969951",
              "max_withdrawal_balance": "24422.72427884",
              "reserved_qty" : "0.00000000"
            },
            {
              "instrument_name": "USD",
              "quantity": "3113.50747209",
              "market_value": "3113.50747209",
              "collateral_eligible": "true",
              "haircut": "0",
              "collateral_amount": "3112.50747209",
              "max_withdrawal_balance": "3113.50747209",
              "reserved_qty" : "0.00000000"
            },
            {
              "instrument_name": "USDT",
              "quantity": "0.19411607",
              "market_value": "0.19389555414448",
              "collateral_eligible": "true",
              "haircut": "0.02",
              "collateral_amount": "0.00089555414448",
              "max_withdrawal_balance": "0.19411607",
              "reserved_qty" : "0.00000000"
            },
            {
              "instrument_name": "DAI",
              "quantity": "0.19387960",
              "market_value": "0.1938796",
              "collateral_eligible": "false",
              "haircut": "0",
              "collateral_amount": "0.0008796",
              "max_withdrawal_balance": "0.1938796",
              "reserved_qty" : "0.00000000"
            }
          ]
        }]
      }
    }

Publishes all new balance updates for the user.

Requires initial authentication using `public/auth` (see `public/auth` for more
information).

### Applies To

Websocket (User API)

### Response Attributes

| Name         | Type   | Description  |
| ------------ | ------ | ------------ |
| subscription | string | user.balance |
| channel      | string | user.balance |
| data         | array  | See below    |

`data` consists of:

| Name                                           | Type    | Description                                                                                                          |
| ---------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| instrument_name                                | string  | instrument name of the balance e.g. USD                                                                              |
| total_available_balance                        | string  | Balance that user can open new order (Margin Balance - Initial Margin)                                               |
| total_margin_balance                           | string  | Positive cash balance on eligible collateral tokens + Negative balance on all tokens + Unrealised PnL - Fee reserves |
| total_initial_margin                           | string  | Total margin requirement to support positions and all open orders IM and haircut from risk asset holdings            |
| Total sum of total_position_im + total_haircut |
| total_position_im                              | string  | initial margin requirement to support open positions and orders                                                      |
| total_haircut                                  | string  | the total haircut on eligible collateral token assets                                                                |
| total_maintenance_margin                       | string  | Total maintenance margin requirement for all positions                                                               |
| total_position_cost                            | string  | Position value in USD                                                                                                |
| total_cash_balance                             | string  | Wallet Balance (Deposits - Withdrawals + Realized PnL - Fees)                                                        |
| total_collateral_value                         | string  | Collateral Value                                                                                                     |
| total_session_unrealized_pnl                   | string  | Current unrealized profit and loss from all open positions (calculated with Mark Price and Avg Price)                |
| total_session_realized_pnl                     | string  | Current realized profit and loss from all open positions (calculated with Mark Price and Avg Price)                  |
| is_liquidating                                 | boolean | Describes whether the account is under liquidation                                                                   |
| total_effective_leverage                       | string  | The actual leverage used (all open positions combined), i.e. position size / margin balance                          |
| position_limit                                 | string  | Maximum position size allowed (for all open positions combined)                                                      |
| used_position_limit                            | string  | Combined position size of all open positions + order exposure on all instruments                                     |
| position_balances                              | array   | Collateral balances as shown below                                                                                   |

`position_balances` is an array consisting of:

| Name                   | Type    | Description                                                                         |
| ---------------------- | ------- | ----------------------------------------------------------------------------------- |
| instrument_name        | string  | Instrument name of the collateral e.g. `USD`, `CRO`, `USDT`, or `DAI`               |
| quantity               | string  | Quantity of the collateral                                                          |
| market_value           | string  | Market value of the collateral                                                      |
| collateral_eligible    | boolean | true or false                                                                       |
| haircut                | string  | Show haircut for eligible collateral token                                          |
| collateral_amount      | string  | Collateral amount derived by market_value minus haircut                             |
| max_withdrawal_balance | string  | Max withdrawal balance of the collateral                                            |
| reserved_qty           | string  | Fund/balance in use, not available for new orders or additional trading activities. |

## user.positions

> Request Sample

    {
      "id": 1,
      "method":"subscribe",
      "params":{
        "channels":["user.positions"]
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "subscribe",
      "code": 0,
      "result": {
        "subscription": "user.positions",
        "channel": "user.positions",
        "data": [{
          "account_id": "52e7c00f-8716-4d6f-afdf-de334bde8ea5",
          "quantity": "0.0500",
          "session_unrealized_pnl": "-14.884000",
          "cost": "2561.516000",
          "open_position_pnl": "-7.302460",
          "open_pos_cost": "2561.328000",
          "session_pnl": "0.000000",
          "pos_initial_margin": "64.684453",
          "pos_maintenance_margin": "44.311397",
          "market_value": "2546.632000",
          "mark_price": "50932.6",
          "target_leverage": "50.00",
          "update_timestamp_ms": 1613578676735,
          "instrument_name": "BTCUSD-PERP",
          "type": "PERPETUAL_SWAP"
        }]
      }
    }

Publishes all new position updates for the user

Requires initial authentication using `public/auth` (see `public/auth` for more
information).

### Applies To

Websocket (User API)

### Response Attributes

| Name         | Type   | Description    |
| ------------ | ------ | -------------- |
| subscription | string | user.positions |
| channel      | string | user.positions |
| data         | array  | See below      |

`data` consists of:

| Name       | Type   | Description                   |
| ---------- | ------ | ----------------------------- |
| account_id | string | Account ID                    |
| quantity   | string | Position quantity             |
| cost       | string | Position cost or value in USD |

**_SPOT_**: cost and quantity are the same value  
**_PERP_**: cost is the position market value as in last hourly settlement.  
i.e. mark price at hourly settlement \* quantity | | session_unrealized_pnl |
string | Unrealized profit and loss for the current trading session | |
open_position_pnl | string | Profit and loss for the open position | |
open_pos_cost | string | Open pos cost | | session_pnl | string | Profit and
loss in the current trading session | | pos_initial_margin | string | Position's
initial margin | | pos_maintenance_margin | string | Position's maintenance
margin | | market_value | string | Market value of position size with Mark Price
| | mark_price | string | Mark price | | target_leverage | string | Leverage | |
update_timestamp_ms | number | Update time (Unix timestamp) | | instrument_name
| string | e.g. BTCUSD-PERP | | type | string | e.g. PERPETUAL_SWAP |

## user.account_risk

> Request Sample

    {
      "id": 1,
      "method":"subscribe",
      "params":{
        "channels":["user.account_risk"]
      }
    }

> Response Sample

    {
      "method": "subscribe",
      "code": 0,
      "result": {
        "account_id": "11111111-1111-1111-1000-000000000003",
        "subscription": "user.account_risk",
        "channel": "user.account_risk",
        "data": [
          {
            "instrument_name": "USD",
            "total_available_balance": "10009769008.34209823",
            "total_cash_balance": "10010020146.28690719",
            "total_initial_margin": "62.47231001",
            "total_maintenance_margin": "30.29753001",
            "total_position_cost": "1907.12000000",
            "total_session_unrealized_pnl": "2.61999999999989088",
            "total_margin_balance": "10009769070.81440734",
            "total_session_realized_pnl": "0",
            "total_effective_leverage": "0.00000019",
            "position_limit": "3000000.00000000",
            "used_position_limit": "4025.50000000",
            "is_liquidating": false,
            "total_borrow": "0.00000000",
            "margin_score": "0.00000000",
            "balances": [
              {
                "instrument_name": "USD",
                "quantity": "9999999992.88690568152",
                "market_value": "9999999992.88690567",
                "collateral_eligible": "true",
                "haircut": "0.8800000",
                "collateral_amount": "9999999992.00690567",
                "max_withdrawal_balance": "9999999992.88690567",
                "reserved_qty": "0"
              },
              {
                "instrument_name": "USDT",
                "quantity": "10000000",
                "market_value": "9999801.00000000",
                "collateral_eligible": "true",
                "haircut": "1.00000",
                "collateral_amount": "9999800.000000000",
                "max_withdrawal_balance": "10000000.00000000",
                "reserved_qty": "0"
              }
            ],
            "positions": [
              {
                "account_id": "11111111-1111-1111-1000-000000000003",
                "quantity": "-0.1",
                "market_value": "-1904.50000000",
                "session_unrealized_pnl": "2.61999999",
                "open_position_pnl": "-7.11309431848",
                "session_pnl": "0",
                "cost": "-1907.12",
                "open_pos_cost": "-1900",
                "liquidation_price": "0.0",
                "pos_initial_margin": "29.21503000",
                "pos_maintenance_margin": "21.59703000",
                "mark_price": "19045.0",
                "effective_leverage": "0.000000",
                "target_leverage": "100.000000",
                "update_timestamp_ms": 1663927002224,
                "instrument_name": "BTCUSD-PERP",
                "type": "PERPETUAL_SWAP"
              }
            ],
            "total_collateral_value": "10009769068.19440460"
          }
        ]
      },
      "id": -1
    }

Publishes position and balance snapshot for the user on a regular basis

Requires initial authentication using `public/auth` (see `public/auth` for more
information).

### Applies To

Websocket (User API)

### Response Attributes

| Name         | Type   | Description       |
| ------------ | ------ | ----------------- |
| subscription | string | user.account_risk |
| channel      | string | user.account_risk |
| data         | array  | See below         |

`data` consists of:

| Name                         | Type    | Description                                                                                                          |
| ---------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| instrument_name              | string  | instrument name of the balance e.g. USD                                                                              |
| total_available_balance      | string  | Balance that user can open new order (Margin Balance - Initial Margin)                                               |
| total_margin_balance         | string  | Positive cash balance on eligible collateral tokens + Negative balance on all tokens + Unrealised PnL - Fee reserves |
| total_initial_margin         | string  | Total margin requirement to support positions and all open orders IM and haircut from risk asset holdings            |
| total_maintenance_margin     | string  | Total maintenance margin requirement for all positions                                                               |
| total_position_cost          | string  | Position value in USD                                                                                                |
| total_cash_balance           | string  | Wallet Balance (Deposits - Withdrawals + Realized PnL - Fees)                                                        |
| total_collateral_value       | string  | Collateral Value                                                                                                     |
| total_session_unrealized_pnl | string  | Current unrealized profit and loss from all open positions (calculated with Mark Price and Avg Price)                |
| total_session_realized_pnl   | string  | Current realized profit and loss from all open positions (calculated with Mark Price and Avg Price)                  |
| is_liquidating               | boolean | Describes whether the account is under liquidation                                                                   |
| total_effective_leverage     | string  | The actual leverage used (all open positions combined), i.e. position size / margin balance                          |
| position_limit               | string  | Maximum position size allowed (for all open positions combined)                                                      |
| used_position_limit          | string  | Combined position size of all open positions + order exposure on all instruments                                     |

`balances` is an array consisting of:

| Name                   | Type    | Description                                                                         |
| ---------------------- | ------- | ----------------------------------------------------------------------------------- |
| instrument_name        | string  | Instrument name of the collateral e.g. `USD`, `CRO`, `USDT`, or `DAI`               |
| quantity               | string  | Quantity of the collateral                                                          |
| market_value           | string  | Market value of the collateral                                                      |
| collateral_eligible    | boolean | true or false                                                                       |
| haircut                | string  | Show haircut for eligible collateral token                                          |
| collateral_amount      | string  | Collateral amount derived by market_value minus haircut                             |
| max_withdrawal_balance | string  | Max withdrawal balance of the collateral                                            |
| reserved_qty           | string  | Fund/balance in use, not available for new orders or additional trading activities. |

`positions` is an array consisting of:

| Name                   | Type   | Description                                                |
| ---------------------- | ------ | ---------------------------------------------------------- |
| account_id             | string | Account ID                                                 |
| quantity               | string | Position quantity                                          |
| liquidation_price      | string | Liquidation price                                          |
| session_unrealized_pnl | string | Unrealized profit and loss for the current trading session |
| cost                   | string | Position cost or value in USD                              |
| open_position_pnl      | string | Profit and loss for the open position                      |
| open_pos_cost          | string | Open pos cost                                              |
| session_pnl            | string | Profit and loss in the current trading session             |
| pos_initial_margin     | string | Position's initial margin                                  |
| pos_maintenance_margin | string | Position's maintenance margin                              |
| market_value           | string | Market value of position size with Mark Price              |
| mark_price             | string | Mark price                                                 |
| target_leverage        | string | Leverage                                                   |
| update_timestamp_ms    | number | Update time (Unix timestamp)                               |
| instrument_name        | string | e.g. BTCUSD-PERP                                           |
| type                   | string | e.g. PERPETUAL_SWAP                                        |

## user.position_balance

> Request Sample

    {
      "id": 1,
      "method":"subscribe",
      "params":{
        "channels":["user.position_balance"]
      }
    }

> Response Sample

    {
      "method": "subscribe",
      "code": 0,
      "result": {
        "subscription": "user.position_balance",
        "channel": "user.position_balance",
        "data": [
          "balances"
          :
          [
            {
              "instrument_name": "BTC",
              "quantity": "-0.0002"
            }
          ],
          "positions"
          :
          [
            {
              "account_id": "11111111-1111-1111-1000-000000000003",
              "instrument_name": "BTCUSD-PERP",
              "type": "PERPETUAL_SWAP",
              "quantity": "-0.2",
              "cost": "-3807.12",
              "open_position_pnl": "-7.11309431848",
              "session_pnl": "0",
              "update_timestamp_ms": 1663927145933,
              "open_pos_cost": "-3800"
            }
          ]
        ]
      },
      "id": -1
    }

Publishes position and balance realtime update for the user

Requires initial authentication using `public/auth` (see `public/auth` for more
information).

### Applies To

Websocket (User API)

### Response Attributes

| Name         | Type   | Description           |
| ------------ | ------ | --------------------- |
| subscription | string | user.position_balance |
| channel      | string | user.position_balance |
| data         | array  | See below             |

`balances` is an array consisting of:

| Name                | Type   | Description                                                           |
| ------------------- | ------ | --------------------------------------------------------------------- |
| instrument_name     | string | Instrument name of the collateral e.g. `USD`, `CRO`, `USDT`, or `DAI` |
| quantity            | string | Quantity of the collateral                                            |
| update_timestamp_ms | number | Update time (Unix timestamp)                                          |

`positions` is an array consisting of:

| Name                | Type   | Description                                    |
| ------------------- | ------ | ---------------------------------------------- |
| account_id          | string | Account ID                                     |
| quantity            | string | Position quantity                              |
| cost                | string | Position cost or value in USD                  |
| open_position_pnl   | string | Profit and loss for the open position          |
| open_pos_cost       | string | Open pos cost                                  |
| session_pnl         | string | Profit and loss in the current trading session |
| update_timestamp_ms | number | Update time (Unix timestamp)                   |
| instrument_name     | string | e.g. BTCUSD-PERP                               |
| type                | string | e.g. PERPETUAL_SWAP                            |

## book.{instrument_name}.{depth}

> Request Sample - Subscription (SNAPSHOT by default)

    {
      "id": 1,
      "method": "subscribe",
      "params": {
        "channels": ["book.BTCUSD-PERP.10"]
      }
    }

> Response Sample - Subscription (SNAPSHOT)

    // Snapshot
    {
      "id": -1,
      "method": "subscribe",
      "code": 0,
      "result": {
        "instrument_name": "BTCUSD-PERP",
        "subscription": "book.BTCUSD-PERP.10",
        "channel": "book",
        "depth": 10,
        "data": [
          {
            "asks": [
              ["30082.5", "0.1689", "1"],
              ["30083.0", "0.1288", "1"],
              ["30084.5", "0.0171", "1"],
              ["30085.0", "0.0369", "2"],
              ["30086.5", "0.2664", "1"],
              ["30087.0", "0.8000", "1"],
              ["30089.0", "0.1828", "1"],
              ["30089.5", "0.1828", "1"],
              ["30090.0", "0.1995", "1"],
              ["30091.0", "0.1986", "2"]
            ],
            "bids": [
              ["30079.0", "0.0505", "1"],
              ["30077.5", "1.0527", "2"],
              ["30076.0", "0.1689", "1"],
              ["30075.5", "0.0171", "1"],
              ["30075.0", "0.1288", "1"],
              ["30074.5", "0.0033", "1"],
              ["30073.5", "0.1675", "1"],
              ["30072.5", "0.3424", "1"],
              ["30072.0", "0.2161", "2"],
              ["30071.5", "0.1829", "1"]
            ],
            "t": 1654780033786,
            "tt": 1654780033755,
            "u": 542048017824
          }
        ]
      }
    }

> Request Sample - Subscription (SNAPSHOT_AND_UPDATE)

    {
      "id": 1,
      "method": "subscribe",
      "params": {
        "channels": ["book.BTCUSD-PERP.10"],
        "book_subscription_type": "SNAPSHOT_AND_UPDATE",
        "book_update_frequency": 10
      }
    }

> Response Sample - Subscription (SNAPSHOT_AND_UPDATE)

    // Snapshot
    {
      "id": -1,
      "method": "subscribe",
      "code": 0,
      "result": {
        "instrument_name": "BTCUSD-PERP",
        "subscription": "book.BTCUSD-PERP.10",
        "channel": "book",
        "depth": 10,
        "data": [{
          "asks": [
            ["50126.000000", "0.400000", "2"],
            ["50130.000000", "1.279000", "3"],
            ["50136.000000", "1.279000", "5"],
            ["50137.000000", "0.800000", "7"],
            ["50142.000000", "1.279000", "1"],
            ["50148.000000", "2.892900", "9"],
            ["50154.000000", "1.279000", "5"],
            ["50160.000000", "1.133000", "2"],
            ["50166.000000", "3.090700", "1"],
            ["50172.000000", "1.279000", "1"]
          ],
          "bids": [
            ["50113.500000", "0.400000", "3"],
            ["50113.000000", "0.051800", "1"],
            ["50112.000000", "1.455300", "1"],
            ["50106.000000", "1.174800", "2"],
            ["50100.500000", "0.800000", "4"],
            ["50100.000000", "1.455300", "5"],
            ["50097.500000", "0.048000", "8"],
            ["50097.000000", "0.148000", "9"],
            ["50096.500000", "0.399200", "2"],
            ["50095.000000", "0.399200", "3"]
          ],
          "tt": 1647917462799,
          "t": 1647917463000,
          "u": 7845460001
        }]
      }
    }


    // Update
    {
      "id": -1,
      "method": "subscribe",
      "code": 0,
      "result": {
        "instrument_name": "BTCUSD-PERP",
        "subscription": "book.BTCUSD-PERP.10",
        "channel": "book.update",
        "depth": 10,
        "data": [{
          "update": {
            "asks":[
              ["50126.000000", "0", "0"],
              ["50180.000000", "3.279000", "10"]],
            "bids":[["50097.000000", "0.252000", "1"]]
          }],
          "tt": 1647917463003,
          "t": 1647917463003,
          "u": 7845460002,
          "pu": 7845460001
        }]
      }
    }

Orderbook / L2 streaming at millisecond frequency.

### Applies To

Websocket (Market Data Subscriptions)

### Channel Parameters

| Name            | Description                                     |
| --------------- | ----------------------------------------------- |
| instrument_name | Must be formal symbol. e.g. `BTCUSD-PERP`       |
| depth           | Maximum number of depth levels. Allowed values: |

\- `50`  
\- `10` |

Two types of book subscription are supported:

- Delta - After initial full snapshot, delta changes from the previous update
  are published
- Snapshot - the full book depth is published for every update

Customers should prefer to use the higher performing delta subscription where
possible, with benefits of reduced bandwidth/processing compared to the snapshot
subscription.

Optional parameters are used for specify the subscription type:

| Name                   | Description                            |
| ---------------------- | -------------------------------------- |
| book_subscription_type | The subscription type. Allowed values: |

\- `SNAPSHOT_AND_UPDATE` delta updates.  
\- `SNAPSHOT` full snapshot (default if not specified). | |
book_update_frequency | Book update interval in ms. Allowed values:  
\- `100` or `10` (default) for delta subscription.  
\- `500` (default) for snapshot subscription. |

### Response Fields

| Name            | Type   | Description                         |
| --------------- | ------ | ----------------------------------- |
| instrument_name | string | Same as requested `instrument_name` |
| subscription    | string | Same as requested channel           |
| channel         | string | `book` or `book.update`, see below  |
| depth           | string | Same as requested `depth`           |
| data            | array  | See below                           |

For `book` snapshot broadcasts, `data` consists of:

| Name | Type    | Description                      |
| ---- | ------- | -------------------------------- |
| bids | array   | Array of `level`                 |
| asks | array   | Array of `level`                 |
| tt   | integer | Epoch millis of last book update |
| t    | integer | Epoch millis of message publish  |
| u    | integer | Update sequence, See below       |

For `book.update` delta broadcasts, `data` consists of:

| Name   | Type    | Description                         |
| ------ | ------- | ----------------------------------- |
| update | object  | `bids` and `asks`                   |
| tt     | integer | Epoch millis of last book update    |
| t      | integer | Epoch millis of message publish     |
| u      | integer | Update sequence, See below          |
| pu     | integer | Previous update sequence, See below |

`level` is an array:

| Index | Type   | Description                            |
| ----- | ------ | -------------------------------------- |
| 0     | string | Price of the level                     |
| 1     | string | Total size of the level                |
| 2     | string | Number of standing orders in the level |

Upon successful subscription, a `book` snapshot will be sent. Subsequently
behaviour is then dependent on subscription type.

For snapshot subscriptions:

- A `book` snapshot will be published at the requested interval if the book
  depth has changed.
- The book is always published every 500ms even if no change.

For delta subscriptions:

- A `book.update` delta update will be published at the requested interval if
  the book depth has changed.
- Each full snapshot/delta update has an (increasing) `u` field that is unique
  per instrument
  - An update should only be processed if the `pu` field corresponds to the `u`
    of the last received update.
  - If there is mismatch, the update should not be applied. Instead,
    re-subscribe to acquire a new full snapshot.
  - To re-subscribe, issue another `subscribe` request for the instrument. Note
    there is no need to issue an `unsubscribe` request before this.
- In the case of no changes, an empty delta `book.update` heartbeat will be sent
  after 5 seconds
  - The levels will be empty (`"asks": [], "bids": []`)
  - The `u` and `pu` fields must be processed as above. The book may have
    updated outside of the requested depth, so `u`may have changed.
- Additionally an empty delta may also be sent for update sequence housekeeping
  purposes. Again the `u` and `pu` must be processed as above.

## ticker.{instrument_name}

> Request Sample

    {
      "id": 1,
      "method": "subscribe",
      "params": {
        "channels": ["ticker.BTCUSD-PERP"]
      },
      "nonce": 1587523073344
    }

> Response Sample

    {
      "id": -1,
      "method": "subscribe",
      "code": 0,
      "result": {
        "instrument_name": "BTCUSD-PERP",
        "subscription": "ticker.BTCUSD-PERP",
        "channel": "ticker",
        "data": [{
          "h": "51790.00",        // Price of the 24h highest trade
          "l": "47895.50",        // Price of the 24h lowest trade, null if there weren't any trades
          "a": "51174.500000",    // The price of the latest trade, null if there weren't any trades
          "c": "0.03955106",      // 24-hour price change, null if there weren't any trades
          "b": "51170.000000",    // The current best bid price, null if there aren't any bids
          "bs": "0.1000",         // The current best bid size, null if there aren't any bids
          "k": "51180.000000",    // The current best ask price, null if there aren't any asks
          "ks": "0.2000",         // The current best ask size, null if there aren't any bids
          "i": "BTCUSD-PERP",     // Instrument name
          "v": "879.5024",        // The total 24h traded volume
          "vv": "26370000.12",    // The total 24h traded volume value (in USD)
          "oi": "12345.12",       // Open interest
          "t": 1613580710768
        }]
      }
    }

Publishes new tickers for an instrument (e.g. BTCUSD-PERP).

### Applies To

Websocket (Market Data Subscriptions)

### Channel Parameters

| Name            | Type   | Required | Description                             |
| --------------- | ------ | -------- | --------------------------------------- |
| instrument_name | string | Y        | Must be formal symbol. e.g. BTCUSD-PERP |

### Response Attributes

| Name            | Type   | Description                |
| --------------- | ------ | -------------------------- |
| instrument_name | string | e.g. BTCUSD-PERP           |
| subscription    | string | `ticker.{instrument_name}` |
| channel         | string | Always `ticker`            |
| data            | array  | See below                  |

`subscription` makes it easy to map to the initial subscription

`channel` and `instrument_name` simply allow easier access to parameters without
needing to parse the `subscription`

`data` consists of:

| Name | Type   | Description                                                     |
| ---- | ------ | --------------------------------------------------------------- |
| h    | string | Price of the 24h highest trade                                  |
| l    | string | Price of the 24h lowest trade, null if there weren't any trades |
| a    | string | The price of the latest trade, null if there weren't any trades |
| c    | string | 24-hour price change, null if there weren't any trades          |
| b    | string | The current best bid price, null if there aren't any bids       |
| bs   | string | The current best bid size, null if there aren't any bids        |
| k    | string | The current best ask price, null if there aren't any asks       |
| ks   | string | The current best ask size, null if there aren't any bids        |
| i    | string | Instrument name                                                 |
| v    | string | The total 24h traded volume                                     |
| vv   | string | The total 24h traded volume value (in USD)                      |
| oi   | string | The open interest                                               |
| t    | number | Trade timestamp                                                 |

## trade.{instrument_name}

> Request Sample

    {
      "id": 1,
      "method": "subscribe",
      "params": {
        "channels": ["trade.BTCUSD-PERP"]
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "subscribe",
      "code": 0,
      "result": {
        "instrument_name": "BTCUSD-PERP",
        "subscription": "trade.BTCUSD-PERP",
        "channel": "trade",
        "data": [{
          "d" : "2030407068",    // Trade ID
          "t": 1613581138462,    // Trade time
          "p": "51327.500000",   // Price
          "q": "0.000100",       // Quantity
          "s": "SELL",           // Side
          "i": "BTCUSD-PERP"     // Instrument name
        }]
      }
    }

Publishes new trades for an instrument (e.g. BTCUSD-PERP).  
It always returns a snapshot of the last 50 trades after the initial
subscription.

### Applies To

Websocket (Market Data Subscriptions)

### Response Attributes

| Name            | Type   | Description             |
| --------------- | ------ | ----------------------- |
| instrument_name | string | e.g. `BTCUSD-PERP`      |
| subscription    | string | trade.{instrument_name} |
| channel         | string | Always `trade`          |
| data            | array  | See below               |

`subscription` makes it easy to map to the initial subscription

`channel` and `instrument_name` simply allow easier access to parameters without
needing to parse the `subscription`

`data` consists of:

| Name | Type             | Description                                                 |
| ---- | ---------------- | ----------------------------------------------------------- |
| d    | string of number | Trade ID                                                    |
| t    | number           | Trade timestamp                                             |
| p    | string           | Trade price                                                 |
| q    | string           | Trade quantity                                              |
| s    | string           | Side (`BUY` or `SELL`). Side is the side of the taker order |
| i    | string           | Instrument name                                             |

## candlestick.{time_frame}.{instrument_name}

> Request Sample

    {
      "id": 1,
      "method": "subscribe",
      "params": {
        "channels": ["candlestick.D1.BTCUSD-PERP"]
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "subscribe",
      "code": 0,
      "result": {
        "instrument_name": "BTCUSD-PERP",
        "subscription": "candlestick.1D.BTCUSD-PERP",
        "channel": "candlestick",
        "interval": "1D",
        "data": [{
          "o": "51140.500000",    // Open price
          "h": "51699.000000",    // High price
          "l": "49212.000000",    // Low price
          "c": "51313.500000",    // Close price
          "v": "867.9432",        // Volume
          "t": 1612224000000      // Start time
        }]
      }
    }

Publishes candlesticks (k-line data history) over a given period for an
instrument (e.g. BTCUSD-PERP).

`period` can be:

- `1m` : one minute. (Legacy format: `M1`)
- `5m` : five minutes. (Legacy format: `M5`)
- `15m` : 15 minutes. (Legacy format: `M15`)
- `30m`: 30 minutes. (Legacy format: `M30`)
- `1h` : one hour. (Legacy format: `H1`)
- `2h` : two hours. (Legacy format: `H2`)
- `4h` : 4 hours. (Legacy format: `H4`)
- `12h`: 12 hours. (Legacy format: `H12`)
- `1D` : one day. (Legacy format: `D1` and `1d`)
- `7D` : 1 week starting at 00:00 UTC each Monday
- `14D`: 2 week intervals starting at _Monday, Oct-28-2019, 00:00 UTC_
- `1M` : 1 month starting at first day of each calendar month, 00:00 UTC

Legacy format is still supported until further notice.

### Applies To

Websocket (Market Data Subscriptions)

### Response Attributes

| Name            | Type   | Description                                |
| --------------- | ------ | ------------------------------------------ |
| instrument_name | string | e.g. BTCUSD-PERP                           |
| subscription    | string | candlestick.{time_frame}.{instrument_name} |
| channel         | string | Always `candlestick`                       |
| interval        | string | The period (e.g. M5)                       |
| data            | array  | See below                                  |

`subscription` makes it easy to map to the initial subscription

`channel` and `instrument_name` simply allow easier access to parameters without
needing to parse the `subscription`

`data` consists of:

| Name | Type   | Description                                |
| ---- | ------ | ------------------------------------------ |
| o    | number | Open                                       |
| h    | number | High                                       |
| l    | number | Low                                        |
| c    | number | Close                                      |
| v    | number | Volume                                     |
| t    | long   | Start time of candlestick (Unix timestamp) |

## index.{instrument_name}

> Request Sample

    {
      "id": 1,
      "method": "subscribe",
      "params": {
        "channels": ["index.BTCUSD-INDEX"]
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "subscribe",
      "code": 0,
      "result": {
        "instrument_name": "BTCUSD-INDEX",
        "subscription": "index.BTCUSD-INDEX",
        "channel": "index",
        "data": [{
          "v": "51204.52000",
          "t": 1613582703000
        }]
      }
    }

### Applies To

Websocket (Market Data Subscriptions)

### Response Attributes

| Name            | Type   | Description             |
| --------------- | ------ | ----------------------- |
| instrument_name | string | e.g. BTCUSD-INDEX       |
| subscription    | string | index.{instrument_name} |
| channel         | string | Always `index`          |
| data            | array  | See below               |

`subscription` makes it easy to map to the initial subscription

`channel` and `instrument_name` simply allow easier access to parameters without
needing to parse the `subscription`

`data` consists of:

| Name | Type   | Description                   |
| ---- | ------ | ----------------------------- |
| t    | number | Updated time (Unix timestamp) |
| v    | string | Value of the Index Price      |

## mark.{instrument_name}

> Request Sample

    {
      "id": 1,
      "method": "subscribe",
      "params": {
        "channels": ["mark.BTCUSD-PERP"]
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "subscribe",
      "code": 0,
      "result": {
        "instrument_name": "BTCUSD-PERP",
        "subscription": "mark.BTCUSD-PERP",
        "channel": "mark",
        "data": [{
          "v": "51279.77000",
          "t": 1613582832000
        }]
      }
    }

**Note**: Mark price will update approximately every 50 ms

### Applies To

Websocket (Market Data Subscriptions)

### Response Attributes

| Name            | Type   | Description            |
| --------------- | ------ | ---------------------- |
| instrument_name | string | e.g. BTCUSD-PERP       |
| subscription    | string | mark.{instrument_name} |
| channel         | string | Always `mark`          |
| data            | array  | See below              |

`subscription` makes it easy to map to the initial subscription

`channel` and `instrument_name` simply allow easier access to parameters without
needing to parse the `subscription`

`data` consists of:

| Name | Type   | Description                   |
| ---- | ------ | ----------------------------- |
| t    | number | Updated time (Unix timestamp) |
| v    | string | Value of the Mark Price       |

## settlement.{instrument_name}

> Request Sample

    {
      "id": 1,
      "method": "subscribe",
      "params": {
        "channels": ["settlement.BTCUSD-210528"]
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "subscribe",
      "code": 0,
      "result": {
        "instrument_name": "BTCUSD-210528",
        "subscription": "settlement.BTCUSD-210528",
        "channel": "settlement",
        "data": [{
          "v": "35279.77000",
          "t": 1613582832000
        }]
      }
    }

Publishes settlement prices for either a single instrument (e.g. BTCUSD-210528")
or all instruments.

### Applies To

Websocket (Market Data Subscriptions)

### Channel Parameters

| Name            | Type   | Required | Description                                                              |
| --------------- | ------ | -------- | ------------------------------------------------------------------------ |
| instrument_name | string | N        | Optional, if not set this is a wildcard subscription for all instruments |

### Response Attributes

| Name            | Type   | Description                    |
| --------------- | ------ | ------------------------------ |
| instrument_name | string | e.g. BTCUSD-210528             |
| subscription    | string | `settlement.{instrument_name}` |
| channel         | string | Always `settlement`            |
| data            | array  | See below                      |

`subscription` makes it easy to map to the initial subscription

`channel` and `instrument_name` simply allow easier access to parameters without
needing to parse the `subscription`

`data` consists of:

| Name | Type   | Description                   |
| ---- | ------ | ----------------------------- |
| t    | number | Updated time (Unix timestamp) |
| v    | string | Value of the Settlement Price |

## funding.{instrument_name}

> Request Sample

    {
      "id": 1,
      "method": "subscribe",
      "params": {
        "channels": ["funding.BTCUSD-PERP"]
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "subscribe",
      "code": 0,
      "result": {
        "instrument_name": "BTCUSD-PERP",
        "subscription": "funding.BTCUSD-PERP",
        "channel": "funding",
        "data": [{
          "v": "0.00144",
          "t": 1613582880000
        }]
      }
    }

### Applies To

Websocket (Market Data Subscriptions)

### Response Attributes

| Name            | Type   | Description                                                                     |
| --------------- | ------ | ------------------------------------------------------------------------------- |
| instrument_name | string | e.g. BTCUSD-PERP                                                                |
| subscription    | string | funding.{instrument_name}                                                       |
| channel         | string | funding - Refers to hourly rate that will settle at the end of the current hour |
| data            | array  | See below                                                                       |

`subscription` makes it easy to map to the initial subscription

`channel` and `instrument_name` simply allow easier access to parameters without
needing to parse the `subscription`

`data` consists of:

| Name | Type   | Description                   |
| ---- | ------ | ----------------------------- |
| t    | number | Updated time (Unix timestamp) |
| v    | string | Value of the Funding Rate     |

## estimatedfunding.{instrument_name}

- It is effective from jul 31 2023. pls refer to
  [breaking change schedule](#breaking-change-schedule) for details

> Request Sample

    {
      "id": 1,
      "method": "subscribe",
      "params": {
        "channels": ["estimatedfunding.BTCUSD-PERP"]
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "subscribe",
      "code": 0,
      "result": {
        "instrument_name": "BTCUSD-PERP",
        "subscription": "estimated.BTCUSD-PERP",
        "channel": "estimatedfunding",
        "data": [{
          "v": "0.00144",
          "t": 1613582880000
        }]
      }
    }

### Applies To

Websocket (Market Data Subscriptions)

### Response Attributes

| Name            | Type   | Description                                                                                                             |
| --------------- | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| instrument_name | string | e.g. BTCUSD-PERP                                                                                                        |
| subscription    | string | estimatedfunding.{instrument_name}                                                                                      |
| channel         | string | estimatedfunding - Refers to estimated hourly rate that will be effective at the end of each hour in the next interval. |

Funding intervals are 00:00 - 04:00, 04:00 - 08:00, 08:00 - 12:00, 12:00 -
16:00, 16:00 - 20:00, 20:00 - 00:00 UTC | | data | array | See below |

`subscription` makes it easy to map to the initial subscription

`channel` and `instrument_name` simply allow easier access to parameters without
needing to parse the `subscription`

`data` consists of:

| Name | Type   | Description                         |
| ---- | ------ | ----------------------------------- |
| t    | number | Updated time (Unix timestamp)       |
| v    | string | Value of the Estimated Funding Rate |

## public/auth

> Request Sample #0: Auth with the master account

    {
      "id": 1,
      "method": "public/auth",
      "api_key": "master_api_key",
      "sig": "d0267b151db609885bad2e4f8ad07610f7913e166c35adaf5697d59a64e3755a",
      "nonce": :1587846358253
    }

> Request Sample #1: Auth with the master account (same effect as sample #0)

    {
      "id": 1,
      "method": "public/auth",
      "api_key": "master_api_key",
      "sig": "d0267b151db609885bad2e4f8ad07610f7913e166c35adaf5697d59a64e3755a",
      "nonce": :1587846358253,
    }

> Request Sample #2: Auth with former spot account (same effect as sample #0)

    {
      "id": 1,
      "method": "public/auth",
      "api_key": "master_api_key",
      "sig": "d0267b151db609885bad2e4f8ad07610f7913e166c35adaf5697d59a64e3755a",
      "nonce": :1587846358253,
    }

> Request Sample #3: Auth with former master margin account

    {
      "id": 1,
      "method": "public/auth",
      "api_key": "master_api_key",
      "sig": "d0267b151db609885bad2e4f8ad07610f7913e166c35adaf5697d59a64e3755a",
      "nonce": :1587846358253,
    }

> Request Sample #4: Auth with former master derivative account

    {
      "id": 1,
      "method": "public/auth",
      "api_key": "master_api_key",
      "sig": "d0267b151db609885bad2e4f8ad07610f7913e166c35adaf5697d59a64e3755a",
      "nonce": :1587846358253,
    }

> Request Sample #5: Auth with default sub-account

    {
      "id": 1,
      "method": "public/auth",
      "api_key": "subaccount_api_key",
      "sig": "d0267b151db609885bad2e4f8ad07610f7913e166c35adaf5697d59a64e3755a",
      "nonce": :1587846358253
    }

> Request Sample #6: Auth with former spot sub-account

    {
      "id": 1,
      "method": "public/auth",
      "api_key": "subaccount_api_key",
      "sig": "d0267b151db609885bad2e4f8ad07610f7913e166c35adaf5697d59a64e3755a",
      "nonce": :1587846358253,
    }

> Request Sample #7: Auth with former margin sub-account

    {
      "id": 1,
      "method": "public/auth",
      "api_key": "subaccount_api_key",
      "sig": "d0267b151db609885bad2e4f8ad07610f7913e166c35adaf5697d59a64e3755a",
      "nonce": :1587846358253,
    }

> Request Sample #8: Auth with former derivative sub-account

    {
      "id": 1,
      "method": "public/auth",
      "api_key": "subaccount_api_key",
      "sig": "d0267b151db609885bad2e4f8ad07610f7913e166c35adaf5697d59a64e3755a",
      "nonce": :1587846358253,
    }

> Response Sample

    {
      "id": 1,
      "method":"public/auth",
      "code":0
    }

To access user-specific websocket methods, `public/auth` has to be invoked with
a valid API key and Digital Signature (refer to the **Digital Signature**
section).

REST API calls do NOT need to do this.

**Important Note**

We recommend adding a 1-second sleep after establishing the websocket
connection, and before requests are sent.

This will avoid occurrences of rate-limit (\`TOO_MANY_REQUESTS\`) errors, as the
websocket rate limits are pro-rated based on the calendar-second that the
websocket connection was opened.

### Request Params

| Name    | Type   | Description                                           |
| ------- | ------ | ----------------------------------------------------- |
| api_key | string | API key                                               |
| sig     | string | Digital Signature (see **Digital Signature** section) |

### Applies To:

Websocket (User API)

## private/set-cancel-on-disconnect

> Request Sample

    {
      "id": 1,
      "method": "private/set-cancel-on-disconnect",
      "params": {
        "scope": "CONNECTION"
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "private/set-cancel-on-disconnect",
      "code": 0,
      "result": {
        "scope": "CONNECTION"
      }
    }

Cancel on Disconnect is an optional feature that will cancel all open orders
created by the connection upon loss of connectivity between client or server.

This feature is only available via the Websocket.

### Request Params

| Name  | Type   | Required | Description                                                                                                                                               |
| ----- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scope | string | Y        | Specifies the scope of cancellation to be applied to the specific connection (all orders created via Websocket). The ONLY scope supported is `CONNECTION` |

### Helpful Information

- Once enabled, the scope of cancellation cannot be changed or disabled for the
  connection.
- Unsubscribing from any user channels will be considered as a loss of
  connectivity and will trigger cancelling orders.

### Applies To

Websocket (User API)

### Response Attributes

| Name  | Type   | Description                                                                                                                                               |
| ----- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scope | string | Specifies the scope of cancellation to be applied to the specific connection (all orders created via Websocket). The ONLY scope supported is `CONNECTION` |

## private/get-cancel-on-disconnect

> Request Sample

    {
      "id": 1,
      "method": "private/get-cancel-on-disconnect"
    }

> Response Sample

    {
      "id": 1,
      "method": "private/get-cancel-on-disconnect",
      "code": 0,
      "result": {
        "scope": "CONNECTION"
      }
    }

Returns the scope of cancellation.

### Request Params

None

### Applies To

Websocket (User API)

### Response Attributes

| Name  | Type   | Description                                                                                                                                               |
| ----- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scope | string | Specifies the scope of cancellation to be applied to the specific connection (all orders created via Websocket). The ONLY scope supported is `CONNECTION` |
