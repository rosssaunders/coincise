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

# Account Balance and Position API

## private/user-balance

> Request Sample

    {
      "id":11,
      "method": "private/user-balance",
      "params": {},
      "nonce": 1611022832613
    }

> Response Sample

    {
      "id": 11,
      "method": "private/user-balance",
      "code": 0,
      "result": {
        "data": [
          {
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
            "total_effective_leverage": "1.90401230",
            "position_limit": "3000000.00000000",
            "used_position_limit": "40674.69622001",
            "position_balances": [
              {
                "instrument_name": "CRO",
                "quantity": "24422.72427884",
                "market_value": "4776.107959969951",
                "collateral_eligible": "true",
                "haircut": "0.5",
                "collateral_amount": "4537.302561971453",
                "max_withdrawal_balance": "24422.72427884",
                "reserved_qty" : "0.00000000"
              },
              {
                "instrument_name": "USD",
                "quantity": "3113.50747209",
                "market_value": "3113.50747209",
                "collateral_eligible": "true",
                "haircut": "0",
                "collateral_amount": "3113.50747209",
                "max_withdrawal_balance": "3113.50747209",
                "reserved_qty" : "0.00000000"
              },
              {
                "instrument_name": "USDT",
                "quantity": "0.19411607",
                "market_value": "0.19389555414448",
                "collateral_eligible": "true",
                "haircut": "0.02",
                "collateral_amount": "0.18904816529086801",
                "max_withdrawal_balance": "0.19411607",
                "reserved_qty" : "0.00000000"
              },
              {
                "instrument_name": "DAI",
                "quantity": "0.19387960",
                "market_value": "0.1938796",
                "collateral_eligible": "false",
                "haircut": "0.975",
                "collateral_amount": "0.18903261000000002",
                "max_withdrawal_balance": "0.1938796",
                "reserved_qty" : "0.00000000"
              }
            ]
          }
        ]
      }
    }

Returns the user's wallet balance.

### Request Params

**Note**: You still need to pass in an empty `params` block like `params: {}`
for API request consistency

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

An array consisting of:

| Name                                           | Type    | Description                                                                                                          |
| ---------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| instrument_name                                | string  | Instrument name of the balance e.g. `USD`                                                                            |
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

## private/user-balance-history

> Request Sample

    {
      "id":11,
      "method": "private/user-balance-history",
      "params": {}
    }

> Response Sample

    {
      "id": 11,
      "method": "private/user-balance-history",
      "code": 0,
      "result": {
        "instrument_name": "USD",
        "data": [
          {
            "t": 1629478800000,
            "c": "811.621851"
          }
        ]
      }
    }

Returns the user's balance history. This call may temporarily have discrepancies
with that shown on the GUI.

### Request Params

| Name      | Type   | Required | Description                                                                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------- |
| timeframe | string | N        | `H1` means every hour, `D1` means every day. Omit for 'D1'                                                  |
| end_time  | number | N        | Can be millisecond or nanosecond. Exclusive. If not provided, will be current time.                         |
| limit     | int    | N        | If timeframe is `D1`, max `limit` will be 30 (days). If timeframe is `H1`, max `limit` will be 120 (hours). |

**Note**: If you omit all parameters, you still need to pass in an empty
`params` block like `params: {}` for API request consistency

### Applies To

REST

### REST Method

POST

### Response Attributes

An array consisting of:

| Name            | Type   | Description                             |
| --------------- | ------ | --------------------------------------- |
| instrument_name | string | instrument name of the balance e.g. USD |
| t               | number | timestamp                               |
| c               | string | total cash balance                      |

## private/get-accounts

> Request Sample

    {
      "id": 12,
      "method": "private/get-accounts",
      "params": {"page_size": 30,"page": 2},
      "nonce": 1587846358253
    }

> Response Sample

    {
      "id": 12,
      "method": "private/get-accounts",
      "code": 0,
      "result": {
        "master_account": {
          "uuid": "243d3f39-b193-4eb9-1d60-e98f2fc17707",
          "master_account_uuid": "291879ae-b769-4eb3-4d75-3366ebee7dd6",
          "margin_account_uuid": "69c9ab41-5b95-4d75-b769-e45f2fc16507",
          "enabled": true,
          "tradable": true,
          "name": "",
          "email": "user@crypto.com",
          "mobile_number": "",
          "country_code": "",
          "address": "",
          "margin_access": "DEFAULT",
          "derivatives_access": "DISABLED",
          "create_time": 1620962543792,
          "update_time": 1622019525960,
          "two_fa_enabled": true,
          "kyc_level": "ADVANCED",
          "suspended": false,
          "terminated": false
        },
        "sub_account_list": [
          {
            "uuid": "243d3f39-b193-4eb9-1d60-e98f2fc17707",
            "master_account_uuid": "291879ae-b769-4eb3-4d75-3366ebee7dd6",
            "margin_account_uuid": "69c9ab41-5b95-4d75-b769-e45f2fc16507",
            "label": "Sub Account",
            "enabled": true,
            "tradable": true,
            "name": "",
            "email": "user@crypto.com",
            "mobile_number": "",
            "country_code": "",
            "address": "",
            "margin_access": "DEFAULT",
            "derivatives_access": "DISABLED",
            "create_time": 1620962543792,
            "update_time": 1622019525960,
            "two_fa_enabled": true,
            "kyc_level": "ADVANCED",
            "suspended": false,
            "terminated": false
          }
        ]
      }
    }

Get Account and its Sub Accounts

### Request Params

By default, the `page_size` is `20` and `page` is `0` respectively.

It can be overided in the JSON request: i.e. "page_size": 30, "page": 2

Note: if using default setting, please ensure you keep `params: {}` for API
request consistency.

### Applies To

REST

### REST Method

POST

### Response Attributes

an object of `master_account`, with an array of `sub_account_list`, both
consisting of:

| Name                | Type    | Description                                               |
| ------------------- | ------- | --------------------------------------------------------- |
| uuid                | string  | Sub account uuid                                          |
| master_account_uuid | string  | Master account uuid                                       |
| margin_account_uuid | string  | (optional) Margin account uuid                            |
| label               | string  | Sub account label                                         |
| enabled             | boolean | true or false                                             |
| tradable            | boolean | true or false                                             |
| name                | string  | Name of sub account                                       |
| email               | string  | Email of sub account                                      |
| mobile_number       | string  | Mobile number of sub account                              |
| country_code        | string  | Country Code of sub account                               |
| address             | string  | Address of sub account                                    |
| margin_access       | string  | DEFAULT or DISABLED                                       |
| derivatives_access  | string  | DEFAULT or DISABLED                                       |
| create_time         | number  | Creation timestamp (milliseconds since the Unix epoch)    |
| update_time         | number  | Last update timestamp (milliseconds since the Unix epoch) |
| two_fa_enabled      | boolean | true or false                                             |
| kyc_level           | string  | Kyc Level                                                 |
| suspended           | boolean | true or false                                             |
| terminated          | boolean | true or false                                             |

## private/create-subaccount-transfer

> Request Sample

    {
      "id": 1234,
      "method": "private/create-subaccount-transfer",
      "params": {
        "from": "12345678-0000-0000-0000-000000000001", // Possible value: the master account UUID, or a sub-account UUID.
        "to": "12345678-0000-0000-0000-000000000002",   // Possible value: the master account UUID, or a sub-account UUID.
        "currency": "CRO",
        "amount": "500"
      },
      "nonce": 1587846358253
    }

> Response sample

    {
      "id":1234,
      "method":"private/create-subaccount-transfer",
      "code":0
    }

Transfer between subaccounts (and master account).

### Request params

| Name     | Type   | Required | Description                                    |
| -------- | ------ | -------- | ---------------------------------------------- |
| from     | string | Y        | Account UUID to be debited                     |
| to       | string | Y        | Account UUID to be credit                      |
| currency | string | Y        | Currency symbol                                |
| amount   | string | Y        | Amount to transfer - must a be positive number |

### Applies To

REST

### Response attributes

| Name | Type   | Description                                              |
| ---- | ------ | -------------------------------------------------------- |
| code | number | 0 for successful transfer (NO_ERROR) else the error code |

## private/get-subaccount-balances

> Request Sample

    {
      "id": 1,
      "method": "private/get-subaccount-balances",
      "params": {},
      "nonce": 1
    }

> Response Sample

    {
      "id": 1,
      "method": "private/get-subaccount-balances",
      "code": 0,
      "result": {
        "data": [
          // Sub account with no balance
          {
            "account": "a0d206a1-6b06-47c5-9cd3-8bc6ef0915c5",
            "instrument_name": "USD",
            "total_available_balance": "0.00000000",
            "total_margin_balance": "0.00000000",
            "total_initial_margin": "0.00000000",
            "total_maintenance_margin": "0.00000000",
            "total_position_cost": "0.00000000",
            "total_cash_balance": "0.00000000",
            "total_collateral_value": "0.00000000",
            "total_session_unrealized_pnl": "0.00000000",
            "total_session_realized_pnl": "0.00000000",
            "total_effective_leverage": "0.00000000",
            "position_limit": "3000000.00000000",
            "used_position_limit": "0.00000000",
            "is_liquidating": false,
            "position_balances": [ ]
          },
          // Sub account with balance
          {
            "account": "49786818-6ead-40c4-a008-ea6b0fa5cf96",
            "instrument_name": "USD",
            "total_available_balance": "20823.62250000",
            "total_margin_balance": "20823.62250000",
            "total_initial_margin": "0.00000000",
            "total_maintenance_margin": "0.00000000",
            "total_position_cost": "0.00000000",
            "total_cash_balance": "21919.55000000",
            "total_collateral_value": "20823.62250000",
            "total_session_unrealized_pnl": "0.00000000",
            "total_session_realized_pnl": "0.00000000",
            "total_effective_leverage": "0.00000000",
            "position_limit": "3000000.00000000",
            "used_position_limit": "0.00000000",
            "is_liquidating": false,
            "position_balances": [
              {
                "instrument_name": "BTC",
                "quantity": "1.0000000000",
                "market_value": "21918.5500000000",
                "collateral_eligible": "true",
                "haircut": "0.5500000000",
                "collateral_amount": "21918.0000000000",
                "max_withdrawal_balance": "1.0000000000"
              },
              {
                "instrument_name": "USD",
                "quantity": "1.00000000",
                "market_value": "1.00000000",
                "collateral_eligible": "true",
                "haircut": "0.10000000",
                "collateral_amount": "0.90000000",
                "max_withdrawal_balance": "0.00000000"
              }
            ]
          },
          {
            "account": "507d3f7d-37c3-4a09-9076-b83c2fcbb638",
            "total_available_balance": "20922.62250000",
            "total_margin_balance": "20922.62250000",
            "total_initial_margin": "0.00000000",
            "total_maintenance_margin": "0.00000000",
            "total_position_cost": "0.00000000",
            "total_cash_balance": "22018.55000000",
            "total_collateral_value": "20922.62250000",
            "total_session_unrealized_pnl": "0.00000000",
            "instrument_name": "USD",
            "total_session_realized_pnl": "0.00000000",
            "total_effective_leverage": "0.00000000",
            "position_limit": "3000000.00000000",
            "used_position_limit": "0.00000000",
            "is_liquidating": false,
            "position_balances": [
              {
                "instrument_name": "BTC",
                "quantity": "1.0000000000",
                "market_value": "21918.5500000000",
                "collateral_eligible": "true",
                "haircut": "0.5500000000",
                "collateral_amount": "21918.0000000000",
                "max_withdrawal_balance": "1.0000000000"
              },
              {
                "instrument_name": "USD",
                "quantity": "100.00000000",
                "market_value": "100.00000000",
                "collateral_eligible": "true",
                "haircut": "1.00000000",
                "collateral_amount": "99.00000000",
                "max_withdrawal_balance": "0.00000000"
              }
            ]
          }
        ]
      }
    }

Returns the user's wallet balances of all sub-accounts.

### Request Params

**Note**: You still need to pass in an empty `params` block like `params: {}`
for API request consistency

### Applies To

REST

### REST Method

POST

### Response Attributes

An array consisting of:

| Name                         | Type    | Description                                                                                                          |
| ---------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| account                      | string  | Sub account ID                                                                                                       |
| instrument_name              | string  | Instrument name of the balance e.g. `USD`                                                                            |
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
| position_balances            | array   | Collateral balances as shown below                                                                                   |

`position_balances` is an array consisting of:

| Name                   | Type    | Description                                                           |
| ---------------------- | ------- | --------------------------------------------------------------------- |
| instrument_name        | string  | Instrument name of the collateral e.g. `USD`, `CRO`, `USDT`, or `DAI` |
| quantity               | string  | Quantity of the collateral                                            |
| market_value           | string  | Market value of the collateral                                        |
| collateral_eligible    | boolean | true or false                                                         |
| haircut                | string  | Show haircut for eligible collateral token                            |
| collateral_amount      | string  | Collateral amount derived by market_value minus haircut               |
| max_withdrawal_balance | string  | Max withdrawal balance of the collateral                              |

## private/get-positions

> Request Sample

    {
      "id": 1,
      "method": "private/get-positions",
      "params": {},
      "nonce": 1611022832613
    }

> Response Sample

    {
      "id": 1,
      "method": "private/get-positions",
      "code": 0,
      "result": {
        "data": [{
          "account_id": "858dbc8b-22fd-49fa-bff4-d342d98a8acb",
          "quantity": "-0.1984",
          "cost": "-10159.573500",
          "open_position_pnl": "-497.743736",
          "open_pos_cost": "-10159.352200",
          "session_pnl": "2.236145",
          "update_timestamp_ms": 1613552240770,
          "instrument_name": "BTCUSD-PERP",
          "type": "PERPETUAL_SWAP"
        }]
      }
    }

Returns the user's position.

### Request Params

| Name            | Type   | Required | Description      |
| --------------- | ------ | -------- | ---------------- |
| instrument_name | string | N        | e.g. BTCUSD-PERP |

**Note**: If you omit all parameters, you still need to pass in an empty
`params` block like `params: {}` for API request consistency

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

An array consisting of:

| Name                | Type   | Description                                    |
| ------------------- | ------ | ---------------------------------------------- |
| instrument_name     | string | e.g. BTCUSD-PERP                               |
| type                | string | e.g. Perpetual Swap                            |
| quantity            | string | Position quantity                              |
| cost                | string | Position cost or value in USD                  |
| open_position_pnl   | string | Profit and loss for the open position          |
| open_pos_cost       | string | Open position cost                             |
| session_pnl         | string | Profit and loss in the current trading session |
| update_timestamp_ms | number | Updated time (Unix timestamp)                  |

# Trading API

## Introduction

History will be stored for recent 6 months record only. For records over 6
months, please contact our support team.

## private/create-order

> Request Sample

    {
      "id": 1,
      "nonce" : 1610905028000,
      "method": "private/create-order",
      "params": {
        "instrument_name": "BTCUSD-PERP",
        "side": "SELL",
        "type": "LIMIT",
        "price": "50000.5",
        "quantity": "1",
        "client_oid": "c5f682ed-7108-4f1c-b755-972fcdca0f02",
        "exec_inst": ["POST_ONLY"],
        "time_in_force": "FILL_OR_KILL"
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "private/create-order",
      "code": 0,
      "result": {
        "client_oid": "c5f682ed-7108-4f1c-b755-972fcdca0f02",
        "order_id": "18342311"
      }
    }

Creates a new BUY or SELL Order on the Exchange.

This call is asynchronous, so the response is simply a confirmation of the
request.

The `user.order` subscription can be used to check when the order is
successfully created.

### Request Params

| Name                                                                                  | Type                        | Required | Description                                                                                         |
| ------------------------------------------------------------------------------------- | --------------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| instrument_name                                                                       | string                      | Y        | e.g. BTCUSD-PERP                                                                                    |
| side                                                                                  | string                      | Y        | `BUY`, `SELL`                                                                                       |
| type                                                                                  | string                      | Y        | `LIMIT`, `MARKET`, `STOP_LOSS`, `STOP_LIMIT`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT`                    |
| price                                                                                 | string                      | Y        | Price                                                                                               |
| quantity                                                                              | string                      | Y        | Order Quantity                                                                                      |
| notional                                                                              | [number](#request-format-2) | Depends  | For MARKET (BUY), STOP_LOSS (BUY), TAKE_PROFIT (BUY) orders only:                                   |
| Amount to spend                                                                       |
| client_oid                                                                            | string                      | N        | Client Order ID (Maximum 36 characters)                                                             |
| exec_inst                                                                             | array of string             | N        | `POST_ONLY`,`SMART_POST_ONLY`                                                                       |
| Remarks: `POST_ONLY` and `SMART_POST_ONLY` cannot be coexisted in exec_inst           |
| time_in_force                                                                         | string                      | N        | `GOOD_TILL_CANCEL`, `IMMEDIATE_OR_CANCEL`, `FILL_OR_KILL`                                           |
| When `exec_inst` contains `POST_ONLY`, `time_in_force` can only be `GOOD_TILL_CANCEL` |
| ref_price                                                                             | string                      | N\*      | Trigger price required for `STOP_LOSS`, `STOP_LIMIT`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT` order type |
| ref_price_type                                                                        | string                      | N        | which price to use for ref_price: `MARK_PRICE` (default), `INDEX_PRICE`, `LAST_PRICE`               |
| spot_margin                                                                           | string                      | N        | `SPOT`: non-margin order, `MARGIN`: margin order                                                    |
| stp_scope                                                                             | string                      | N        | Optional Field                                                                                      |

Possible Values  
\- M: Matches Master or Sub a/c  
\- S: Matches Sub a/c only

Note: orderbook-specific settings takes higher precedence. | | stp_inst | string
| N\* | Mandatory if stp_scope is set.

Possible Values  
\- M: Cancel Maker  
\- T: Cancel Taker  
\- B: Cancel Both Maker and Taker | | stp_id | string of number | N\* | Optional
Field

Possible Value: 0 to 32767

Default Value  
\- If stp_scope & stp_inst are not specified, REJECT  
\- If stp_scope is specified, default value = 0.

Note: orderbook-specific settings takes higher precedence. | |
fee_instrument_name | string | N | Specify the preferred fee token.  
Valid Values:  
\[SPOT\] Buy - Base/Quote token/USD/USDT/EUR  
\[SPOT\] Sell - Quote token/USD/USDT/EUR  
\[DERIV\] Buy/Sell - USD/USDT/EUR

Example:  
If a client would like to BUY CRO/BTC, the default fee token is CRO, valid
tokens are CRO/BTC/USD/USDT/EUR.  
If a client would like to SELL CRO/BTC, the default fee token is BTC, valid
tokens are BTC/USD/USDT/EUR.  
If a client would like to BUY/SELL BTCUSD-PERP, the default fee token is USD,
valid tokens are USD/USDT/EUR.

If a client has an insufficient balance in their preferred fee token, the system
will switch to the default fee token. |

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

| Name       | Type             | Description                                                                                                                                                                       |
| ---------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| order_id   | string of number | Newly created order ID                                                                                                                                                            |
| client_oid | string           | If a Client Order ID was provided in the request, otherwise, will be the `nonce` in the request. As nonce can be the same among orders, it is recommened to specify `client_oid`. |

## private/amend-order

> Request Sample (amend by order_id)

    {
        "id": 53,
        "method": "private/amend-order",
        "api_key": ${api_key},
        "params": {
            "order_id": order_id,
            "new_price": "82000",
            "new_quantity": "0.0002",
        },
        "nonce": 1587846358253
    }

> Response Sample (amend by order_id)

    {
        "id": 53,
        "method": "private/amend-order",
        "code": 0,
        "result": {
            "client_oid": "53",
            "order_id": "6530219466236720401"
        }
    }

> Request Sample (amend by orig_client_id)

    {
        "id": 55,
        "method": "private/amend-order",
        "api_key": ${api_key},
        "params": {
            "orig_client_oid": "53",
            "new_price": "83000",
            "new_quantity": "0.0001",
        },
        "nonce": 1587846358253
    }

> Response Sample (amend by orig_client_id)

    {
        "id": 55,
        "method": "private/amend-order",
        "code": 0,
        "result": {
            "client_oid": "55",
            "order_id": "6530219466236720401"
        }
    }

Amend an existing order on the Exchange.

This call is asynchronous, so the response is simply a confirmation of the
request.

The `user.order` subscription can be used to check when the order is
successfully created.

Please note that amend order is designed as a convenience function such that it
performs cancel and then create behind the scene. The new order will lose queue
priority, except if the amend is only to amend down order quantity. For faster
performance, it is recommended to use `private/cancel-order`, and then
`private/create-order` instead.

### Request Params

| Name                                                   | Type             | Required | Description                             |
| ------------------------------------------------------ | ---------------- | -------- | --------------------------------------- |
| client_oid                                             | string           | N        | Client Order ID (Maximum 36 characters) |
| Order_id                                               | string of number | Depends  | Optional Order ID                       |
| Either `order_id` or `orig_client_oid` must be present |
| orig_client_oid                                        | string           | Depends  | Optional Original Client Order ID       |

Either `order_id` or `orig_client_oid` must be present  
If both exist together, `order_id` will have higher priority | | new_price |
string | Y | The new amended price  
If no change required, input original value | | new_quantity | string | Y | The
new amended quantity  
If no change required, input original value |

Remark:  
Either `new_price` or `new_quantity` must input a new value, otherwise request
will be rejected.

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

| Name       | Type   | Description     |
| ---------- | ------ | --------------- |
| client_oid | string | client order ID |
| order_id   | string | order ID        |

## private/cancel-order

> Request Sample

    {
      "id": 1,
      "nonce" : 1610905028000,
      "method": "private/cancel-order",
      "params": {
        "order_id": "18342311"
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "private/cancel-order",
      "code": 0,
      "message": "NO_ERROR",
      "result": {
        "client_oid": "c5f682ed-7108-4f1c-b755-972fcdca0f02",
        "order_id": "18342311"
      }
    }

Cancels an existing order on the Exchange (asynchronous).

This call is asynchronous, so the response is simply a confirmation of the
request.

The `user.order` subscription can be used to check when the order is
successfully canceled.

### Request Params

| Name     | Type                       | Required | Description       |
| -------- | -------------------------- | -------- | ----------------- |
| order_id | number or string of number | Depends  | Optional Order ID |

Either `order_id` or `client_oid` must be present  
`string` format is highly recommended. | | client_oid | string | Depends |
Optional Client Order ID  
Either `order_id` or `client_oid` must be present |

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

| Name       | Type             | Description     |
| ---------- | ---------------- | --------------- |
| order_id   | string of number | Order ID        |
| client_oid | string           | Client Order ID |

## private/cancel-all-orders

> Request Sample

    {
      "id": 1,
      "nonce": 1611169184000,
      "method": "private/cancel-all-orders",
      "params": {
        "instrument_name": "BTCUSD-PERP"
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "private/cancel-all-orders",
      "code": 0
    }

Cancels all orders for a particular instrument/pair (asynchronous).

This call is asynchronous, so the response is simply a confirmation of the
request.

The `user.order` subscription can be used to check when the order is
successfully canceled.

### Request Params

| Name            | Type   | Required | Description                                                                       |
| --------------- | ------ | -------- | --------------------------------------------------------------------------------- |
| instrument_name | string | N        | e.g. BTCUSD-PERP. If not provided, the orders of ALL instruments will be canceled |
| type            | string | N        | e.g. `LIMIT`, `TRIGGER`, `ALL`                                                    |

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

No result block is returned. The code (0 = success) is the primary indicator
that the request is queued.

## private/close-position

> Request Sample

    {
      "id": 1,
      "nonce" : 1610905028000,
      "method": "private/close-position",
      "params": {
        "instrument_name": "BTCUSD-PERP",
        "type": "LIMIT",
        "price": "30000.0"
      }
    }

    {
      "id": 1,
      "nonce" : 1610905028000,
      "method": "private/close-position",
      "params": {
        "instrument_name": "BTCUSD-PERP",
        "type": "MARKET"
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "private/close-position",
      "code": 0,
      "result": {
        "client_oid": "1684d6e4-2c55-64e1-52c3-3aa9febc3a23",
        "order_id": "15744"
      }
    }

Cancels position for a particular instrument/pair (asynchronous).

This call is asynchronous, so the response is simply a confirmation of the
request.

The `user.order` subscription can be used to check when the order is
successfully canceled.

### Request Params

| Name            | Type   | Required | Description             |
| --------------- | ------ | -------- | ----------------------- |
| instrument_name | string | Y        | e.g. BTCUSD-PERP        |
| type            | string | Y        | `LIMIT` or `MARKET`     |
| price           | string | Depends  | For `LIMIT` orders only |

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

The code (0 = success) is the primary indicator that the request is queued.

| Name       | Type             | Description     |
| ---------- | ---------------- | --------------- |
| order_id   | string of number | Order ID        |
| client_oid | string           | Client Order ID |

## private/get-open-orders

> Request Sample

    {
      "id": 1,
      "method": "private/get-open-orders",
      "params": {
        "instrument_name": "BTCUSD-PERP"
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "private/get-open-orders",
      "code": 0,
      "result": {
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
        }]
      }
    }

Gets all **open** orders for a particular instrument.

### Request Params

| Name            | Type   | Required | Description                      |
| --------------- | ------ | -------- | -------------------------------- |
| instrument_name | string | N        | e.g. BTCUSD-PERP. Omit for 'all' |

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

An array, consisting of:

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
\- `SMART_POST_ONLY`  
\- `LIQUIDATION` | | quantity | string | Quantity specified in the order | |
limit_price | string | Limit price specified in the order | | order_value |
string | Order value | | maker_fee_rate | string | User's maker fee rate | |
taker_fee_rate | string | User's taker fee rate | | avg_price | string | Average
price | | cumulative_quantity | string | Cumulative executed quantity | |
cumulative_value | string | Cumulative executed value | | cumulative_fee |
string | Cumulative executed fee | | status | string | Order status:  
\- `NEW`  
\- `PENDING`  
\- `ACTIVE` | | update_user_id | string | Updated user | | order_date | string |
Order creation date | | create_time | number | Order creation timestamp | |
create_time_ns | string | Order creation timestamp (nanosecond) | | update_time
| number | Order update timestamp | | instrument_name | string | e.g.
BTCUSD-PERP | | fee_instrument_name | string | Currency used for the fees |

Note: To detect a 'partial filled' status, look for `status` as `ACTIVE` and
`cumulative_quantity` > 0.

## private/get-order-detail

> Request Sample

    {
      "id": 1,
      "method": "private/get-order-detail",
      "params": {
        "order_id": "19848525"
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "private/get-order-detail",
      "code": 0,
      "result": {
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
        "reason": 43012,
        "create_time": 1613575617173,
        "create_time_ns": "1613575617173123456",
        "update_time": 1613575617173
      }
    }

### Request Params

| Name       | Type                       | Required | Description                                                                                                                         |
| ---------- | -------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| order_id   | number or string of number | N        | Order ID. `string` format is highly recommended, especially for JavaScript client. If not provided, `client_oid` must be specified. |
| client_oid | string                     | N        | Client Order ID. If not provided, `order_id` must be specified.                                                                     |

Note: Either `order_id` or `client_oid` must be specified.

### Applies To

REST

### REST Method

POST

### Response Attributes

An array, consisting of:

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
\- `REJECTED`  
\- `CANCELED`  
\- `FILLED`  
\- `EXPIRED` | | update_user_id | string | Updated user | | order_date | string
| Order creation date | | create_time | number | Order creation timestamp | |
create_time_ns | string | Order creation timestamp (nanosecond) | | update_time
| number | Order update timestamp | | instrument_name | string | e.g.
BTCUSD-PERP | | fee_instrument_name | string | Currency used for the fees | |
reason | number | Rejection reason code. See
[Order Rejection Reason](#response-and-reason-codes) |

## private/change-account-leverage

> Request Sample

    {
      "id": 1,
      "method": "private/change-account-leverage",
      "params": {
        "account_id": "52e7c00f-1324-5a6z-bfgt-de445bde21a5",
        "leverage": 10
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "private/change-account-leverage",
      "code": 0
    }

Changes the maximum leverage used by the account. Please note, each instrument
has its own maximum leverage. Whichever leverage (account or instrument) is
lower will be used.

### Request Params

| Name       | Type   | Required | Description                                                                             |
| ---------- | ------ | -------- | --------------------------------------------------------------------------------------- |
| account_id | string | Y        | account ID to change the leverage. Must be currently the logged user's account          |
| leverage   | number | Y        | maximum leverage to be used for the account. Valid values are between 1-100 (inclusive) |

### Applies To

REST

### REST Method

POST

### Response Attributes

| Name    | Type   | Description                                                  |
| ------- | ------ | ------------------------------------------------------------ |
| code    | number | error code or 0 if no error                                  |
| message | string | text description of the error code if non-zero code returned |

## private/change-account-settings

> Request Sample

    {
      "id": 696,
      "method": "private/change-account-settings",
      "api_key": "00000009-1111-1111-1111-000000000000",
      "params": {
        "stp_scope": "S",
        "stp_id": "100",
        "stp_inst": "M"
      },
      "nonce": 1721989111722
    }

> Response Sample

    {
      "id": 696,
      "method": "private/change-account-settings",
      "code": 0
    }

Change the account STP settings.

### Request Params

| Name      | Type   | Required | Description    |
| --------- | ------ | -------- | -------------- |
| stp_scope | string | N        | Optional Field |

Possible Values  
M: Matches Master or Sub a/c  
S: Matches Sub a/c only | | stp_inst | number | N | Mandatory if stp_scope is
set.  
Possible Values  
M: Cancel Maker  
T: Cancel Taker  
B: Cancel Both Maker and Taker | | stp_id | string of number | N | Optional
Field:  
Possible Value: 0 to 32767  
Default Value  
If stp_scope & stp_inst are not specified, REJECT  
If stp_scope is specified, default value = 0. | | leverage | number | N |
Maximum leverage user intends to set for the account. Valid values are between
1-50 (inclusive). When account effective leverage exceeds this, further risk
increasing orders will be rejected |

### Response Attributes

| Name | Type   | Description              |
| ---- | ------ | ------------------------ |
| code | number | 0 for successful changes |

### Applies To

REST

### REST Method

POST

## private/get-account-settings

> Request Sample

    {
      "id": 697,
      "method": "private/get-account-settings",
      "api_key": "00000009-1111-1111-1111-000000000000",
      "params": {},
      "nonce": 1721989202781
    }

> Response Sample

    {
      "id": 697,
      "method": "private/get-account-settings",
      "code": 0,
      "result": [
        {
          "leverage": 20,
          "stp_id": 100,
          "stp_scope": "S",
          "stp_inst": "M"
        }
      ]
    }

Get the STP account settings.

### Request Params

N/A

### Response Attributes

| Name               | Type   | Description                                                                                                                             |
| ------------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| code               | number | 0 for successful changes                                                                                                                |
| result -> leverage | number | The max leverage user set on the account. When account effective leverage exceeds this, further risk increasing orders will be rejected |
| result -> stp_id   | number | Optional Field                                                                                                                          |

Possible Value: 0 to 32767

Default Value  
\- If stp_scope & stp_inst are not specified, REJECT  
\- If stp_scope is specified, default value = 0.

Note: orderbook-specific settings takes higher precedence. | | result ->
stp_scope | string | Optional Field

Possible Values  
\- M: Matches Master or Sub a/c  
\- S: Matches Sub a/c only

Note: orderbook-specific settings takes higher precedence. | | result ->
stp_inst | string | Possible Values  
\- M: Cancel Maker  
\- T: Cancel Taker  
\- B: Cancel Both Maker and Taker |

### Applies To

REST

### REST Method

POST

## private/get-fee-rate

> Request Sample

     {
      "id": 1,
      "method": "/private/get-fee-rate",
      "params": {},
      "nonce": 1721989202781
    }

> Response Sample

    {
      "id": 1,
      "method": "/private/get-fee-rate",
      "code": 0,
      "result": {
        "spot_tier": "3",
        "deriv_tier": "3",
        "effective_spot_maker_rate_bps": "6.5",
        "effective_spot_taker_rate_bps": "6.9",
        "effective_deriv_maker_rate_bps": "1.1",
        "effective_deriv_taker_rate_bps": "3"
      }
    }

Get fee rates for user’s account.

### Request Params

N/A

### Response Attributes

| Name                           | Type   | Required | Description                     |
| ------------------------------ | ------ | -------- | ------------------------------- |
| spot_tier                      | string | Y        | 30day spot trading volume tier  |
| deriv_tier                     | string | Y        | 30day deriv trading volume tier |
| effective_spot_maker_rate_bps  | string | Y        | 30day spot maker rate in bps    |
| effective_spot_taker_rate_bps  | string | Y        | 30day spot taker rate in bps    |
| effective_deriv_maker_rate_bps | string | Y        | 30day deriv maker rate in bps   |
| effective_deriv_taker_rate_bps | string | Y        | 30day deriv taker rate in bps   |

### Applies To

REST

### REST Method

POST

## private/get-instrument-fee-rate

> Request Sample

    {
      "id": 1,
      "nonce" : 1610905028000,
      "method": "private/get-instrument-fee-rate",
      "params": {
        "instrument_name": "BTC_USD"
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "private/get-instrument-fee-rate",
      "code": 0,
      "result": {
        "instrument_name": "BTC_USD",
        "effective_maker_rate_bps": "6.5",
        "effective_taker_rate_bps": "6.9"
      }
    }

Get the instrument fee rate.

### Request Params

| Name            | Type   | Required | Description               |
| --------------- | ------ | -------- | ------------------------- |
| instrument_name | string | Y        | e.g. BTC_USD, BTCUSD-PERP |

### Response Attributes

| Name                     | Type   | Required | Description       |
| ------------------------ | ------ | -------- | ----------------- |
| instrument_name          | string | Y        | e.g. BTC_USD      |
| effective_maker_rate_bps | string | Y        | maker rate in bps |
| effective_taker_rate_bps | string | Y        | taker rate in bps |

### Applies To

REST

### REST Method

POST

# Advanced Order Management API

## private/create-order (Conditional Order)

[Conditional Orders](https://help.crypto.com/en/articles/4453247-stop-loss-order-and-take-profit-order)
automatically place a mark or limit order when the mark price reaches a trigger
price specified by the user. If the mark price reaches or exceeds the trigger
price, the Stop-Loss/Take-Profit order will be converted to a live order and
placed in the order book. If the mark price does not reach the trigger price,
the Stop-Loss/Take-Profit order will remain active until it is canceled or
triggered.

See [private/create-order](#private-create-order) and the `type` parameter for
more information.

## private/create-order-list (LIST)

> Request Sample

    // Create List of Orders example
    {
      "id": 6573,
      "method": "private/create-order-list",
      "api_key": "xxxxxxxxxxx",
      "params": {
        "contingency_type": "LIST",
        "order_list": [
          {
            "instrument_name": "CRO_USD",
            "side": "SELL",
            "type": "LIMIT",
            "quantity": "10",
            "price": "0.12",
            "client_oid": "api_leg1"
          },
          {
            "instrument_name": "CRO_USD",
            "side": "SELL",
            "type": "LIMIT",
            "quantity": "20",
            "price": "0.122",
            "client_oid": "api_leg2"
          }
        ]
      },
      "nonce": 1750385416548,
      "sig": "xxxxxxxx"
    }

> Response Sample

    // Create List of Orders - All ok
    {
      "id": 6573,
      "method": "private/create-order-list",
      "code": 0,
      "result": [
        {
          "code": 0,
          "index": 0,
          "client_oid": "api_leg1",
          "order_id": "5755600460443882762"
        },
        {
          "code": 0,
          "index": 1,
          "client_oid": "api_leg2",
          "order_id": "5755600460443882763"
        }
      ]
    }


    // Create List of Orders - Some rejected
    {
      "id": xxxxx,
      "method": "private/create-order-list",
      "code": 0,
      "result": [
        {
          "code": 306,
          "index": 0,
          "client_oid": "api_leg_111",
          "message": "INSUFFICIENT_AVAILABLE_BALANCE",
          "order_id": "xxxx"
        },
        {
          "code": 204,
          "index": 1,
          "client_oid": "api_leg_22",
          "message": "DUPLICATE_CLORDID",
          "order_id": "xxxx"
        }
      ]
    }

Create a list of orders on the Exchange.

`contingency_type` must be `LIST`, for list of orders creation.

This call is asynchronous, so the response is simply a confirmation of the
request.

The `user.order` subscription can be used to check if the orders are
successfully created.

### Request Params

| Name             | Type            | Required | Description         |
| ---------------- | --------------- | -------- | ------------------- |
| contingency_type | string          | Y        | LIST                |
| order_list       | array of orders | Y        | `LIST`: 1-10 orders |

Content of each order in `order_list`

| Name                      | Type                        | Required | Description                                                          |
| ------------------------- | --------------------------- | -------- | -------------------------------------------------------------------- |
| instrument_name           | string                      | Y        | e.g., ETH_CRO, BTC_USDT                                              |
| side                      | string                      | Y        | BUY, SELL                                                            |
| type                      | string                      | Y        | LIMIT, MARKET, STOP_LOSS, STOP_LIMIT, TAKE_PROFIT, TAKE_PROFIT_LIMIT |
| price                     | number                      | Depends  | For LIMIT and STOP_LIMIT orders only:                                |
| Unit price                |
| quantity                  | number                      | Depends  | For LIMIT Orders, MARKET, STOP_LOSS, TAKE_PROFIT orders only:        |
| Order Quantity to be Sold |
| notional                  | [number](#request-format-2) | Depends  | For MARKET (BUY), STOP_LOSS (BUY), TAKE_PROFIT (BUY) orders only:    |
| Amount to spend           |
| client_oid                | string                      | N        | Optional Client order ID (Maximum 36 characters)                     |
| time_in_force             | string                      | N        | (Limit Orders Only)                                                  |

Options are:  
\- `GOOD_TILL_CANCEL` (Default if unspecified)  
\- `FILL_OR_KILL`  
\- `IMMEDIATE_OR_CANCEL` | | exec_inst | array | N | (Limit Orders Only)  
Options are:  
\- `POST_ONLY`  
\- Or leave empty  
\- `SMART_POST_ONLY`  
Remarks: `POST_ONLY`and `SMART_POST_ONLY` cannot be coexisted in exec_inst | |
trigger_price | number | N | Used with STOP_LOSS, STOP_LIMIT, TAKE_PROFIT, and
TAKE_PROFIT_LIMIT orders.  
Dictates when order will be triggered | | stp_scope | string | N | Optional
Field

Possible Values  
\- M: Matches Master or Sub a/c  
\- S: Matches Sub a/c only

Note: orderbook-specific settings takes higher precedence. | | stp_inst | string
| N\* | Mandatory if stp_scope is set.

Possible Values  
\- M: Cancel Maker  
\- T: Cancel Taker  
\- B: Cancel Both Maker and Taker | | stp_id | string of number | N\* | Optional
Field

Possible Value: 0 to 32767

Default Value  
\- If stp_scope & stp_inst are not specified, REJECT  
\- If stp_scope is specified, default value = 0.

Note: orderbook-specific settings takes higher precedence. | |
fee_instrument_name | string | N | Specify the preferred fee token.  
Valid Values:  
\[SPOT\] Buy - Base/Quote CCY/USD/USDT  
\[SPOT\] Sell - Quote CCY/USD/USDT  
\[DERIV\] Buy/Sell - USD/USDT

Example:  
If a client would like to BUY CRO/BTC, the default fee token is CRO, valid
currencies are CRO/BTC/USD/USDT.  
If a client would like to SELL CRO/BTC, the default fee token is BTC, valid
currencies are BTC/USD/USDT.  
If a client would like to BUY/SELL BTCUSD-PERP, the default fee token is USD,
valid currencies are USD/USDT.

If a client has an insufficient balance in their preferred fee token, the system
will switch to the default fee token. |

**Here are the mandatory parameters based on order `type`:**

| Type              | Side | Additional Mandatory Parameters          |
| ----------------- | ---- | ---------------------------------------- |
| LIMIT             | Both | quantity, price                          |
| MARKET            | BUY  | notional or quantity, mutually exclusive |
| MARKET            | SELL | quantity                                 |
| STOP_LIMIT        | Both | price, quantity, trigger_price           |
| TAKE_PROFIT_LIMIT | Both | price, quantity, trigger_price           |
| STOP_LOSS         | BUY  | notional, trigger_price                  |
| STOP_LOSS         | SELL | quantity, trigger_price                  |
| TAKE_PROFIT       | BUY  | notional, trigger_price                  |
| TAKE_PROFIT       | SELL | quantity, trigger_price                  |

**Contingency Type:**

| Type | Description             |
| ---- | ----------------------- |
| LIST | Create a list of orders |

**Helpful information:**

- `STOP_LIMIT` and `TAKE_PROFIT_LIMIT` will execute a LIMIT order when the
  trigger_price is reached.
- `STOP_LOSS` and `TAKE_PROFIT` will execute a MARKET order when the
  trigger_price is reached.

**To create trigger orders against market price:**

- `trigger_price` below market price: SELL `STOP_LOSS` and `STOP_LIMIT`, BUY
  `TAKE_PROFIT` and `TAKE_PROFIT_LIMIT`
- `trigger_price` above market price: BUY `STOP_LOSS` and `STOP_LIMIT`, SELL
  `TAKE_PROFIT` and `TAKE_PROFIT_LIMIT`

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

| Name       | Type   | Description                                                                          |
| ---------- | ------ | ------------------------------------------------------------------------------------ |
| code       | number | 0 if success                                                                         |
| index      | number | The index of corresponding order request (Start from 0)                              |
| client_oid | string | (Optional) if a Client order ID was provided in the request. (Maximum 36 characters) |
| message    | string | (Optional) For server or error messages                                              |
| order_id   | number | Newly created order ID                                                               |

## private/cancel-order-list (LIST)

> Request Sample

    // Cancel List of Orders example
    {
      "id": 6575,
      "method": "private/cancel-order-list",
      "api_key": "xxxxxxxxx",
      "params": {
        "contingency_type": "LIST",
        "order_list": [
          {
            "instrument_name": "CRO_USD",
            "client_oid": "api_leg1"
          },
          {
            "instrument_name": "CRO_USD",
            "client_oid": "api_leg2"
          }
        ]
      },
      "nonce": 1750389124417,
      "sig": "xxxxxxxx"
    }

> Response Sample

    // Cancel List of Orders - All ok
    {
      "id": 6575,
      "method": "private/cancel-order-list",
      "code": 0,
      "result": [
        {
          "code": 0,
          "index": 0
        },
        {
          "code": 0,
          "index": 1
        }
      ]
    }

    // Cancel List of Orders - Error encountered
    {
      "id": 6576,
      "method": "private/cancel-order-list",
      "code": 0,
      "result": [
        {
          "code": 212,
          "index": 0,
          "message": "INVALID_ORDERID"
        },
        {
          "code": 212,
          "index": 1,
          "message": "INVALID_ORDERID"
        }
      ]
    }

Cancel a list of orders on the Exchange.

This call is asynchronous, so the response is simply a confirmation of the
request.

The `user.order` subscription can be used to check when each of the orders is
successfully cancelled.

### Request Params (List of Orders)

| Name             | Type            | Required | Description                                                   |
| ---------------- | --------------- | -------- | ------------------------------------------------------------- |
| order_list       | array of orders | Y        | For non contingency orders, A list of orders to be cancelled  |
| instrument_name  | string          | N        | Instrument name of contingency order, e.g., ETH_CRO, BTC_USDT |
| contingency_type | string          | Y        | Must be value "LIST"                                          |

Content of each order in `order_list`

| Name            | Type   | Required | Description                                      |
| --------------- | ------ | -------- | ------------------------------------------------ |
| instrument_name | string | N        | instrument_name, e.g., ETH_CRO, BTC_USDT         |
| order_id        | string | Y        | Order ID                                         |
| client_oid      | string | N        | Optional Client order ID (Maximum 36 characters) |

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

| Name    | Type   | Description                                             |
| ------- | ------ | ------------------------------------------------------- |
| code    | number | 0 if success                                            |
| index   | number | The index of corresponding order request (Start from 0) |
| message | string | (Optional) For server or error messages                 |

## private/create-order-list (OCO)

> Request Example

    {
      "method":"private/create-order-list",
      "id":123456789,
      "nonce":123456789000,
      "params":{
        "contingency_type":"OCO",
        "order_list":[
          {
            "instrument_name":"BTCUSD-PERP",
            "quantity":"0.1",
            "type":"LIMIT",
            "price":"23000",
            "side":"SELL"
          },
          {
            "instrument_name":"BTCUSD-PERP",
            "quantity":"0.1",
            "type":"STOP_LOSS",
            "ref_price":"19000",
            "side":"SELL"
          }
        ]
      }
    }

> Response Example

    {
      "id" : 1661331443,
      "method" : "private/create-order-list",
      "code" : 0,
      "result" : {
        "list_id" : 6498090546073120100
      }
    }

Creates a One-Cancel-the-Other (OCO) order on the Exchange.

[OCO Order](https://help.crypto.com/en/articles/5807203-one-cancels-the-other-oco-orders)
allows users to place two orders at the same time. Users are able to place a
limit order with a stop order, and only one of them will be executed. When
either one of the above orders is executed, the other is automatically canceled.
This allows users to take a profit while minimizing potential loss. The OCO
order type is available for Spot trading pairs and Futures and Perpetual
contracts only.

This call is asynchronous, so the response is simply a confirmation of the
request. The `user.order` subscription can be used to check if the orders are
successfully created.

### Request Params

| Name             | Type            | Required | Description      |
| ---------------- | --------------- | -------- | ---------------- |
| contingency_type | string          | Y        | `OCO`            |
|  |
| order_list       | array of orders | Y        | Exactly 2 orders |

For the content of each order in `order_list`, please refer to
[`private/create-order`](#private-create-order) for details.

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

| Name    | Type   | Description |
| ------- | ------ | ----------- |
| list_id | number | List ID     |

## private/cancel-order-list (OCO)

> Request Example

    {
      "method":"private/cancel-order-list",
      "id":1234,
      "nonce":123456789000,
      "params":{
        "instrument_name":"BTCUSD-PERP",
        "list_id":"4421958062479290999",
        "contingency_type":"OCO"
      }
    }

> Response Example

    {
      "id" : 1661328073,
      "method" : "private/cancel-order-list",
      "code" : 0
    }

Cancel a contingency order on the Exchange.

This call is asynchronous, so the response is simply a confirmation of the
request.

The `user.order` subscription can be used to check when each of the orders is
successfully cancelled.

### Request Params

| Name             | Type   | Required | Description     |
| ---------------- | ------ | -------- | --------------- |
| contingency_type | string | Y        | `OCO`           |
| list_id          | string | Y        | List ID         |
| instrument_name  | string | Y        | Instrument Name |

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

No result block is returned. The code (0 = success) is the primary indicator
that the request is queued.

## private/get-order-list (OCO)

> Request Example

    {
      "method":"private/get-order-list",
      "id":123,
      "nonce":123456789000,
      "params":{
        "instrument_name":"BTCUSD-PERP",
        "list_id":"6498090546073120100",
        "contingency_type":"OCO"
      }
    }

> Response Example

    {
      "id":1661331609,
      "method":"private/get-order-list",
      "code":0,
      "result":{
        "data":[
          {
            "account_id":"88888888-8888-8888-8888-000000000001",
            "order_id":"4611686018427387905",
            "client_oid":"1661331443",
            "type":"LIMIT",
            "time_in_force":"GOOD_TILL_CANCEL",
            "side":"SELL",
            "exec_inst":[],
            "quantity":"0.1000",
            "price":"23000.0",
            "order_value":"2300.00000000",
            "avg_price":"0",
            "trigger_price":"0",
            "cumulative_quantity":"0",
            "cumulative_value":"0",
            "cumulative_fee":"0",
            "status":"ACTIVE",
            "update_user_id":"11111111-1111-1111-1111-000000000001",
            "order_date":"2022-08-24",
            "instrument_name":"BTCUSD-PERP",
            "fee_instrument_name":"USD",
            "list_id":"6498090546073120100",
            "contingency_type":"OCO",
            "trigger_price_type":"NULL_VAL",
            "create_time":1661331445398,
            "create_time_ns":"1661331445398773329",
            "update_time":1661331445482
          },
          {
            "account_id":"88888888-8888-8888-8888-000000000001",
            "order_id":"4611686018427387906",
            "client_oid":"1661331443-2",
            "type":"STOP_LOSS",
            "time_in_force":"GOOD_TILL_CANCEL",
            "side":"SELL",
            "exec_inst":[],
            "quantity":"0.1000",
            "order_value":"1900.00000000",
            "avg_price":"0",
            "trigger_price":"0",
            "cumulative_quantity":"0",
            "cumulative_value":"0",
            "cumulative_fee":"0",
            "status":"PENDING",
            "update_user_id":"11111111-1111-1111-1111-000000000001",
            "order_date":"2022-08-24",
            "instrument_name":"BTCUSD-PERP",
            "fee_instrument_name":"USD",
            "list_id":"6498090546073120100",
            "contingency_type":"OCO",
            "trigger_price_type":"NULL_VAL",
            "create_time":1661331445040,
            "create_time_ns":"1661331445040100934",
            "update_time":0
          }
        ]
      }
    }

Gets the details of an outstanding (not executed) contingency order on Exchange.

### Request Params

| Name             | Type   | Required | Description                                                       |
| ---------------- | ------ | -------- | ----------------------------------------------------------------- |
| contingency_type | string | Y        | `OCO`                                                             |
| list_id          | string | Y        | ID of the contingency order                                       |
| instrument_name  | string | Y        | instrument_name of the contingency order, e.g. ETH_CRO, BTC_USDT. |

### Applies To

REST

### REST Method

POST

### Response Attributes

List of order in the field `data`. For content of `data`, please refer to
[`private/get-open-orders`](#private-get-open-orders) for details

# Order, Trade, Transaction History API

## Introduction

History will be stored for recent 6 months record only. For records over 6
months, please contact our support team.

## private/get-order-history

> Request Sample

    {
      "id": 1,
      "method": "private/get-order-history",
      "params": {
        "instrument_name": "BTCUSD-PERP",
        "start_time": 1610905028000081486,
        "end_time": 1613570791058211357,
        "limit": 20
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "private/get-order-history",
      "code": 0,
      "result": {
        "data": [{
          "account_id": "52e7c00f-1324-5a6z-bfgt-de445bde21a5",
          "order_id": "18342311",
          "client_oid": "1613571154795",
          "order_type": "LIMIT",
          "time_in_force": "GOOD_TILL_CANCEL",
          "side": "BUY",
          "exec_inst": [],
          "quantity": "0.0001",
          "limit_price": "51000.0",
          "order_value": "3.900100",
          "maker_fee_rate": "0.000250",
          "taker_fee_rate": "0.000400",
          "avg_price": "0.0",
          "cumulative_quantity": "0.0000",
          "cumulative_value": "0.000000",
          "cumulative_fee": "0.000000",
          "status": "CANCELED",
          "update_user_id": "fd797356-55db-48c2-a44d-157aabf702e8",
          "order_date": "2021-02-17",
          "instrument_name": "BTCUSD-PERP",
          "fee_instrument_name": "USD",
          "create_time": 1610905028000,
          "create_time_ns": "1610905028000123456",
          "update_time": 1613571320251
        },
          {
            "account_id": "52e7c00f-1324-5a6z-bfgt-de445bde21a5",
            "order_id": "18342500",
            "client_oid": "1613571154800",
            "order_type": "LIMIT",
            "time_in_force": "GOOD_TILL_CANCEL",
            "side": "BUY",
            "exec_inst": [],
            "quantity": "0.0500",
            "limit_price": "51283.0",
            "order_value": "2564.150000",
            "maker_fee_rate": "0.000250",
            "taker_fee_rate": "0.000400",
            "avg_price": "51278.5",
            "cumulative_quantity": "0.0500",
            "cumulative_value": "2563.925000",
            "cumulative_fee": "1.025570",
            "status": "FILLED",
            "update_user_id": "fd797356-55db-48c2-a44d-157aabf702e8",
            "order_date": "2021-02-17",
            "instrument_name": "BTCUSD-PERP",
            "fee_instrument_name": "USD",
            "reason": 43012,
            "create_time": 1613570791059,
            "create_time_ns": "1613570791059123456",
            "update_time": 1613570791060
          }]
      }
    }

Gets the order history for a particular instrument.

Users should use `user.order` to keep track of real-time order updates, and
`private/get-order-history` should primarily be used for recovery; typically
when the websocket is disconnected.

### Request Params

| Name            | Type             | Required | Description                                   |
| --------------- | ---------------- | -------- | --------------------------------------------- |
| instrument_name | string           | N        | e.g. BTCUSD-PERP. Omit for 'all'              |
| start_time      | number or string | N        | Start time in Unix time format (`inclusive`). |

Default: `end_time - 1 day`.  
Nanosecond is recommended for accurate pagination | | end_time | number or
string | N | End time in Unix time format (`exclusive`)  
Default: current system timestamp.  
Nanosecond is recommended for accurate pagination | | limit | int | N | The
maximum number of trades to be retrieved before the `end_time`.  
Default: 100.  
Max: 100. |

**Note**: If you omit all parameters, you still need to pass in an empty
`params` block like `params: {}` for API request consistency

### Applies To

REST

### REST Method

POST

### Response Attributes

An array, consisting of:

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
\- `SMART_POST_ONLY`  
\- `LIQUIDATION` | | quantity | string | Quantity specified in the order | |
limit_price | string | Limit price specified in the order | | order_value |
string | Order value | | maker_fee_rate | string | User's maker fee rate | |
taker_fee_rate | string | User's taker fee rate | | avg_price | string | Average
price | | cumulative_quantity | string | Cumulative executed quantity | |
cumulative_value | string | Cumulative executed value | | cumulative_fee |
string | Cumulative executed fee | | status | string | Order status:  
\- `REJECTED`  
\- `CANCELED`  
\- `FILLED`  
\- `EXPIRED` | | update_user_id | string | Updated user | | order_date | string
| Order creation date | | create_time | number | Order creation timestamp | |
create_time_ns | string | Order creation timestamp (nanosecond) | | update_time
| number | Order update timestamp | | instrument_name | string | e.g.
BTCUSD-PERP | | fee_instrument_name | string | Currency used for the fees |

Note: Please note `PENDING`,`ACTIVE` can only be found in
`private/get-open-orders` REST endpoint or `user.order` WebSocket subscription.

## private/get-trades

> Request Sample

    {
      "id": 1,
      "method": "private/get-trades",
      "params": {
        "instrument_name": "BTCUSD-PERP",
        "start_time": "1619089031996081486",
        "end_time": "1619200052124211357",
        "limit": 20
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "private/get-trades",
      "code": 0,
      "result": {
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
          "client_oid": "7665b001-2753-4d17-b266-61ecb755922d",
          "taker_side": "MAKER",
          "side": "BUY",
          "instrument_name": "BTCUSD-PERP",
          "fee_instrument_name": "USD",
          "create_time": 1613570791060,
          "create_time_ns": "1613570791060827635",
          "transact_time_ns": "1613570791060827635",
          "match_count": "1",
          "match_index": "0"
        }]
      }
    }

Gets all executed trades for a particular instrument.

Users should use `user.trade` to keep track of real-time trades, and
`private/get-trades` should primarily be used for recovery; typically when the
websocket is disconnected.

### Request Params

| Name            | Type             | Required | Description                                   |
| --------------- | ---------------- | -------- | --------------------------------------------- |
| instrument_name | string           | N        | e.g. BTCUSD-PERP. Omit for 'all'              |
| start_time      | number or string | N        | Start time in Unix time format (`inclusive`). |

Default: `end_time - 1 day`.  
Nanosecond is recommended for accurate pagination | | end_time | number or
string | N | End time in Unix time format (`exclusive`)  
Default: current system timestamp.  
Nanosecond is recommended for accurate pagination | | limit | int | N | The
maximum number of trades to be retrievd before the `end_time`.  
Default: 100.  
Max: 100. |

**Note**: If you omit all parameters, you still need to pass in an empty
`params` block like `params: {}` for API request consistency  
get-trades time window can only be up to 7 days for maximum.

### Applies To

REST

### REST Method

POST

### Response Attributes

An array, consisting of:

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
| create_time         | number           | Create timestamp in milliseconds                           |
| create_time_ns      | string           | Create timestamp in nanoseconds                            |
| transact_time_ns    | string           | Trade transaction time in nanseconds                       |
| match_count         | string of number | (Optional)                                                 |

Number of orders matched for this trade execution  
If it is Maker's Order, value is always 1  
If it is Taker's Order, it is the number of orders matched for this trade
execution | | match_index | string of number | (Optional)  
Only appears if it is Maker's order.  
It represents which order entry of corresponding price level was matched  
This value is 0 base. If the matched order is on the top of the queue, it is
shown 0. |

## private/get-transactions

> Request Sample

    {
      "id": 1,
      "method": "private/get-transactions",
      "params": {
        "instrument_name": "BTCUSD-PERP",
        "start_time": "1619089031996081486",
        "end_time": "1619200052124211357",
        "limit": 20
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "private/get-transactions",
      "code": 0,
      "result": {
        "data": [
          {
            "account_id": "88888888-8888-8888-8888-000000000123",
            "event_date": "2021-02-18",
            "journal_type": "TRADING",
            "journal_id": "187078",
            "transaction_qty": "-0.0005",
            "transaction_cost": "-24.500000",
            "realized_pnl": "-0.006125",
            "order_id": "72062",
            "trade_id": "71497",
            "trade_match_id": "8625",
            "event_timestamp_ms": 1613640752166,
            "event_timestamp_ns": "1613640752166234567",
            "client_oid": "6ac2421d-5078-4ef6-a9d5-9680602ce123",
            "taker_side": "MAKER",
            "side": "SELL",
            "instrument_name": "BTCUSD-PERP"
          },
          {
            "account_id": "88888888-8888-8888-8888-000000000123",
            "event_date": "2021-02-18",
            "journal_type": "SESSION_SETTLE",
            "journal_id": "186959",
            "transaction_qty": "0",
            "transaction_cost": "0.000000",
            "realized_pnl": "-0.007800",
            "trade_match_id": "0",
            "event_timestamp_ms": 1613638800001,
            "event_timestamp_ns": "1613638800001124563",
            "client_oid": "",
            "taker_side": "",
            "instrument_name": "BTCUSD-PERP"
          }
        ]
      }
    }

Fetches recent transactions

### Request Params

| Name            | Type             | Required | Description                                            |
| --------------- | ---------------- | -------- | ------------------------------------------------------ |
| instrument_name | string           | N        | e.g. instrument_name, e.g. BTCUSD-PERP, Omit for 'all' |
| journal_type    | string           | N        | Refer to the `journal_type` in `Response Attributes`   |
| start_time      | number or string | N        | Start time in Unix time format (`inclusive`).          |

Default: `end_time - 1 day`.  
Nanosecond is recommended for accurate pagination | | end_time | number or
string | N | End time in Unix time format (`exclusive`)  
Default: current system timestamp.  
Nanosecond is recommended for accurate pagination | | limit | int | N | The
maximum number of trades to be retrievd before the `end_time`.  
Default: 100.  
Max: 100. |

### Applies To

REST

### REST Method

POST

### Response Attributes

| Name               | Type             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| account_id         | string           | Account ID                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| event_date         | string           | Event date                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| journal_type       | string           | Journal type would be `TRADING`, `TRADE_FEE`, `ONCHAIN_WITHDRAW`, `ONCHAIN_DEPOSIT`, `ROLLBACK_DEPOSIT`, `ROLLBACK_WITHDRAW`, `FUNDING`, `REALIZED_PNL`, `INSURANCE_FUND`, `SOCIALIZED_LOSS`, `LIQUIDATION_FEE`, `SESSION_RESET`, `ADJUSTMENT`, `SESSION_SETTLE`, `UNCOVERED_LOSS`, `ADMIN_ADJUSTMENT`, `DELIST`, `SETTLEMENT_FEE`, `AUTO_CONVERSION`, `MANUAL_CONVERSION`,`SUBACCOUNT_TX`,`FIAT_WITHDRAWAL_CANCEL`,`MARGIN_TRADE_INTEREST` |
| journal_id         | string of number | Journal ID                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| transaction_qty    | string           | Transaction quantity                                                                                                                                                                                                                                                                                                                                                                                                                        |
| transaction_cost   | string           | Transaction cost                                                                                                                                                                                                                                                                                                                                                                                                                            |
| realized_pnl       | string           | Realized PNL                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_id           | string of number | Order ID                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| trade_id           | string of number | Trade ID                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| trade_match_id     | string of number | Trade match ID applicable to trades only. Non-trade related transactions will have zero or null value.                                                                                                                                                                                                                                                                                                                                      |
| client_oid         | string           | Client Order ID (can be empty)                                                                                                                                                                                                                                                                                                                                                                                                              |
| taker_side         | string           | `MAKER` or `TAKER` or empty                                                                                                                                                                                                                                                                                                                                                                                                                 |
| side               | string           | `BUY` or `SELL`                                                                                                                                                                                                                                                                                                                                                                                                                             |
| instrument_name    | string           | e.g. BTCUSD-PERP                                                                                                                                                                                                                                                                                                                                                                                                                            |
| event_timestamp_ms | number           | Event timestamp in milliseconds                                                                                                                                                                                                                                                                                                                                                                                                             |
| event_timestamp_ns | string           | Event timestamp in nanoseconds                                                                                                                                                                                                                                                                                                                                                                                                              |

# Wallet API

## private/create-withdrawal

> Request Sample

    {
      "id": -1,
      "method": "private/create-withdrawal",
      "params": {
        "client_wid": "my_withdrawal_002",
        "currency": "BTC",
        "amount": "1",
        "address": "2NBqqD5GRJ8wHy1PYyCXTe9ke5226FhavBf",
        "address_tag": "",
        "network_id": null
      },
      "nonce": "1607063412000"
    }

> Response Sample

    {
      "id":-1,
      "method":"private/create-withdrawal",
      "code":0,
      "result": {
        "id": 2220,
        "amount": 1,
        "fee": 0.0004,
        "symbol": "BTC",
        "address": "2NBqqD5GRJ8wHy1PYyCXTe9ke5226FhavBf",
        "client_wid": "my_withdrawal_002",
        "create_time":1607063412000,
        "network_id": null
      }
    }

Creates a withdrawal request. Withdrawal setting must be enabled for your API
Key. If you do not see the option when viewing your API Key, this feature is not
yet available for you.

### Request Params

| Name        | Type    | Required | Description                                                                                                                                      |
| ----------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| client_wid  | string  | N        | Optional Client withdrawal ID                                                                                                                    |
| currency    | string  | Y        | E.g. BTC, CRO                                                                                                                                    |
| amount      | decimal | Y        |                                                                                                                                                  |
| address     | string  | Y        |                                                                                                                                                  |
| address_tag | string  | N        | Secondary address identifier for coins like XRP, XLM etc. Also known as memo or tags.                                                            |
| network_id  | string  | N        | Select the desired network, require the address to be whitelisted first. See default_network and network in get-currency-networks for the value. |

### Helpful Information

- Withdrawal addresses must first be whitelisted in your account’s Withdrawal
  Whitelist page.
- Withdrawal fees and minimum withdrawal amount can be found on the Fees &
  Limits page on the Exchange website.

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

| Name        | Type    | Description                                                      |
| ----------- | ------- | ---------------------------------------------------------------- |
| id          | long    | Newly created withdrawal ID                                      |
| client_wid  | string  | (Optional) if a Client withdrawal ID was provided in the request |
| currency    | string  | E.g. BTC, CRO                                                    |
| amount      | decimal |                                                                  |
| fee         | decimal |                                                                  |
| address     | string  | Address with Address Tag (if any)                                |
| create_time | long    |                                                                  |

## private/get-currency-networks

> Request Sample

    {
      "id": 12,
      "method": "private/get-currency-networks",
      "params": {},
      "api_key": "api_key",
      "sig": "9b4e5428970d88270ac18aa680d33bf6a42390db2060e7f3b81f579a99cea9d5",
      "nonce": :1640830660110
    }

> Response Sample

    {
      "code": 0,
      "result": {
        "update_time": 1641151604000,
        "currency_map": {
          "AGLD": {
            "full_name": "Adventure Gold",
            "default_network": null,
            "network_list": [
              {
                "network_id": "ETH",
                "withdrawal_fee": null,
                "withdraw_enabled": true,
                "min_withdrawal_amount": 10.0,
                "deposit_enabled": true,
                "confirmation_required": 12
              }
            ]
          },
          "MATIC": {
            "full_name": "Polygon",
            "default_network": "ETH",
            "network_list": [
              {
                "network_id": "BNB",
                "withdrawal_fee": 0.80000000,
                "withdraw_enabled": true,
                "min_withdrawal_amount": 1.6,
                "deposit_enabled": true,
                "confirmation_required": 0
              },
              {
                "network_id": "ETH",
                "withdrawal_fee": 20.00000000,
                "withdraw_enabled": true,
                "min_withdrawal_amount": 40.0,
                "deposit_enabled": true,
                "confirmation_required": 0
              },
              {
                "network_id": "MATIC",
                "withdrawal_fee": 0.08000000,
                "withdraw_enabled": true,
                "min_withdrawal_amount": 0.16,
                "deposit_enabled": true,
                "confirmation_required": 0
              }
            ]
          }
        }
      }
    }

Get the symbol network mapping.

### Request Params

| Name              | Type | Required | Description |
| ----------------- | ---- | -------- | ----------- |
| no param required | N/A  |          |             |

**Note**:  
i. You still need to pass in an empty `params` block like `params: {}` for API
request consistency  
ii. It works for master account only, not for sub-accounts.

### Applies To

REST

### REST Method

POST

### Response Attributes

An Map of `currency`, consisting of:

| Name            | Type   | Description                                                                                                                     |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| full_name       | string | e.g. SHIBA INU                                                                                                                  |
| default_network | string | If network is not provided in create-withdrawal, it will search for default_network, if there is more than 1 network available. |
| network_list    | string | A list of networks                                                                                                              |

network_list:

| Name                  | Type    | Description                                      |
| --------------------- | ------- | ------------------------------------------------ |
| network_id            | string  | the network id, can be used in create-withdrawal |
| withdraw_enabled      | boolean |                                                  |
| deposit_enabled       | boolean |                                                  |
| withdrawal_fee        | decimal |                                                  |
| min_withdrawal_amount | decimal |                                                  |
| confirmation_required | int     | confirmation blocks count                        |

## private/get-deposit-address

> Request Sample

    {
      "id": -1,
      "method": "private/get-deposit-address",
      "params": {
        "currency": "CRO",
      },
      "nonce": 1587846358253
    }

> Response Sample

    {
      "id": 11,
      "method": "private/get-deposit-address",
      "code": 0,
      "result": {
        "deposit_address_list": [
          {
            "currency": "CRO",
            "create_time": 1615886328000,
            "id": "12345",
            "address": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "status": "1",
            "network": "CRO"
          },
          {
            "currency": "CRO",
            "create_time": 1615886332000,
            "id": "12346",
            "address": "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
            "status": "1",
            "network": "ETH"
          }
        ]
      }
    }

Fetches deposit address. Withdrawal setting must be enabled for your API Key. If
you do not see the option when viewing your API Keys, this feature is not yet
available for you.

### Request Params

| Name     | Type   | Required | Description   |
| -------- | ------ | -------- | ------------- |
| currency | string | Y        | E.g. BTC, CRO |

### Applies To

REST

### REST Method

POST

### Response Attributes

An array of `deposit_address_list`, consisting of:

| Name     | Type   | Description              |
| -------- | ------ | ------------------------ |
| id       | long   | Newly created deposit ID |
| currency | string | E.g. BTC, CRO            |
| network  | string | E.g. ETH, CRO            |

When currency = CRO, network = CRO, it is a main net address.  
When currency = CRO, network = ETH, it is an ERC20 address. | | address | string
| Address with Address Tag (if any) | | create_time | long | | | status | string
| "0"

0 - Inactive  
1 - Active |

## private/get-deposit-history

> Request Sample

    {
      "id": -1,
      "method": "private/get-deposit-history",
      "params": {
        "currency": "XRP",
        "start_ts": 1587846300000,
        "end_ts": 1587846358253,
        "page_size": 2,
        "page": 0,
        "status": "1"
      },
      "nonce": 1587846358253
    }

> Response Sample

    {
      "id": 11,
      "method": "private/get-deposit-history",
      "code": 0,
      "result": {
        "deposit_list": [
          {
            "currency": "XRP",
            "fee": 1.0,
            "create_time": 1607063412000,
            "id": "2220",
            "update_time": 1607063460000,
            "amount": 100,
            "address": "2NBqqD5GRJ8wHy1PYyCXTe9ke5226FhavBf?1234567890",
            "status": "1"
          }
        ]
      }
    }

Fetches deposit history. If you do not see the option when viewing your API
Keys, this feature is not yet available for you.

Note: It works for master account only, not for sub-accounts.

### Request Params

| Name      | Type   | Required | Description                               |
| --------- | ------ | -------- | ----------------------------------------- |
| currency  | string | N        | E.g. BTC, CRO                             |
| start_ts  | long   | N        | Default is 90 days from current timestamp |
| end_ts    | long   | N        | Default is current timestamp              |
| page_size | int    | N        | Page size (Default: 20, Max: 200)         |
| page      | int    | N        | Page number (0-based)                     |
| status    | string | N        | "0"                                       |

0 - Not Arrived  
1 - Arrived  
2 - Failed  
3 - Pending |

### Applies To

REST

### REST Method

POST

### Response Attributes

An array of `deposit_list`, consisting of:

| Name        | Type    | Description                       |
| ----------- | ------- | --------------------------------- |
| id          | long    | Newly created deposit ID          |
| currency    | string  | E.g. BTC, CRO                     |
| amount      | decimal |                                   |
| fee         | decimal |                                   |
| address     | string  | Address with Address Tag (if any) |
| create_time | long    |                                   |
| status      | string  | "0"                               |

0 - Not Arrived  
1 - Arrived  
2 - Failed  
3 - Pending |

## private/get-withdrawal-history

> Request Sample

    {
      "id": -1,
      "method": "private/get-withdrawal-history",
      "params": {
        "currency": "XRP",
        "start_ts": 1587846300000,
        "end_ts": 1587846358253,
        "page_size": 2,
        "page": 0,
        "status": "1"
      },
      "nonce": 1587846358253
    }

> Response Sample

    {
      "id": 11,
      "method": "private/get-withdrawal-history",
      "code": 0,
      "result": {
        "withdrawal_list": [
          {
            "currency": "XRP",
            "client_wid": "my_withdrawal_002",
            "fee": 1.0,
            "create_time": 1607063412000,
            "id": "2220",
            "update_time": 1607063460000,
            "amount": 100,
            "address": "2NBqqD5GRJ8wHy1PYyCXTe9ke5226FhavBf?1234567890",
            "status": "1",
            "txid": "",
            "network_id": null
          }
        ]
      }
    }

Fetches withdrawal history. If you do not see the option when viewing your API
Keys, this feature is not yet available for you.

Note: It works for master account only, not for sub-accounts.

### Request Params

| Name      | Type   | Required | Description                               |
| --------- | ------ | -------- | ----------------------------------------- |
| currency  | string | N        | E.g. BTC, CRO                             |
| start_ts  | long   | N        | Default is 90 days from current timestamp |
| end_ts    | long   | N        | Default is current timestamp              |
| page_size | int    | N        | Page size (Default: 20, Max: 200)         |
| page      | int    | N        | Page number (0-based)                     |
| status    | string | N        | "0"                                       |

0 - Pending  
1 - Processing  
2 - Rejected  
3 - Payment In-progress  
4 - Payment Failed  
5 - Completed  
6 - Cancelled |

### Applies To

REST

### REST Method

POST

### Response Attributes

An array of `withdrawal_list`, consisting of:

| Name        | Type    | Description                                                      |
| ----------- | ------- | ---------------------------------------------------------------- |
| id          | long    | Newly created withdrawal ID                                      |
| client_wid  | string  | (Optional) if a Client withdrawal ID was provided in the request |
| currency    | string  | E.g. BTC, CRO                                                    |
| amount      | decimal |                                                                  |
| fee         | decimal |                                                                  |
| address     | string  | Address with Address Tag (if any)                                |
| create_time | long    |                                                                  |
| status      | string  | "0"                                                              |

0 - Pending  
1 - Processing  
2 - Rejected  
3 - Payment In-progress  
4 - Payment Failed  
5 - Completed  
6 - Cancelled | | txid | string | Transaction hash | | network_id | string |
Network for the transaction - please see get-currency-networks. Only available
when Exchange support multiple network on the currency |

# Staking API

## private/staking/stake

> Request Sample

    {
      "id": 1,
      "method": "private/staking/stake",
      "params": {
        "instrument_name": "SOL.staked",
        "quantity": "1"
      }
    }

> Response Sample

    {
      "id": 1,
      "code": 0,
      "method": "private/staking/stake",
      "result": {
        "staking_id": "1",
        "instrument_name": "SOL.staked",
        "status": "NEW",
        "quantity": "1",
        "underlying_inst_name": "SOL",
        "pre_stake_charge_rate_in_bps": "50",
        "pre_stake_charge": "0.5",
        "reason": "NO_ERROR"
      }
    }

Create a request to earn token rewards by staking on-chain in the Exchange.

### Request Params

| Name            | Type   | Required | Description                                                                                                                  |
| --------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| instrument_name | string | Y        | Staking instrument name, e.g. SOL.staked, refer to `instrument_name` from `private/staking/get-staking-instruments` response |
| quantity        | string | Y        | Stake quantity                                                                                                               |

### Applies To

REST

### REST Method

POST

### Response Attributes

| Name            | Type   | Description                              |
| --------------- | ------ | ---------------------------------------- |
| staking_id      | string | Request id                               |
| instrument_name | string | Staking instrument name, e.g. SOL.staked |
| status          | string | Request status:                          |

\- `NEW`  
\- `PENDING`  
\- `STAKED`  
\- `COMPLETED`  
\- `REJECTED` | | quantity | string | Stake quantity | | underlying_inst_name |
string | Underlying instrument name of staking, e.g. SOL | |
pre_stake_charge_rate_in_bps | string | Pre stake charge rate in basis point | |
pre_stake_charge | string | Pre stake charge value | | reason | string | Reason
for the status, e.g. "NO_ERROR" |

## private/staking/unstake

> Request Sample

    {
      "id": 1,
      "method": "private/staking/unstake",
      "params": {
        "instrument_name": "SOL.staked",
        "quantity": "1"
      }
    }

> Response Sample

    {
      "id": 1,
      "code": 0,
      "method": "private/staking/unstake",
      "result": {
        "staking_id": "1",
        "instrument_name": "SOL.staked",
        "status": "NEW",
        "quantity": "1",
        "underlying_inst_name": "SOL",
        "reason": "NO_ERROR"
      }
    }

Create a request to unlock staked token.

### Request Params

| Name            | Type   | Required | Description                                                                                                                  |
| --------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| instrument_name | string | Y        | Staking instrument name, e.g. SOL.staked, refer to `instrument_name` from `private/staking/get-staking-instruments` response |
| quantity        | string | Y        | Unstake quantity                                                                                                             |

For yield-bearing instruments (learn more from
[FAQs](https://help.crypto.com/en/articles/6800043-on-chain-staking-guide)),
this field requires the quantity you wish to unstake in terms of the original
staked token.

Example:  
If you hold a TSTON.staked position, specify the quantity of TSTON.staked token
you wish to unstake. You can retrieve the conversion rates (of TSTON to TON)
from private/staking/get-swap-rate endpoint to estimate the quantity of TON you
will receive after the request is successfully completed. |

### Applies To

REST

### REST Method

POST

### Response Attributes

| Name            | Type   | Description                              |
| --------------- | ------ | ---------------------------------------- |
| staking_id      | string | Request id                               |
| instrument_name | string | Staking instrument name, e.g. SOL.staked |
| status          | string | Request status:                          |

\- `NEW`  
\- `PENDING`  
\- `PENDING_WITHDRAWAL`  
\- `PENDING_UNSTAKING`  
\- `COMPLETED`  
\- `REJECTED` | | quantity | string | Unstake quantity

For yield-bearing instruments (learn more from
[FAQs](https://help.crypto.com/en/articles/6800043-on-chain-staking-guide)),
this field displays the quantity you wish to unstake in terms of the original
token you staked.

Example:  
If you hold a TSTON.staked position, specify the quantity of TSTON.staked tokens
you wish to unstake. This field will show you the quantity of TON you will
receive after the request is successfully completed. | | underlying_inst_name |
string | Underlying instrument name, e.g. SOL | | reason | string | Reason for
the status, e.g. "NO_ERROR" |

## private/staking/get-staking-position

> Request Sample

    {
      "id": 1,
      "method": "private/staking/get-staking-position",
      "params": {
        "instrument_name": "SOL.staked"
      }
    }

> Response Sample

    {
      "id": 1,
      "code": 0,
      "method": "private/staking/get-staking-position",
      "result": {
        "data": [
          {
            "instrument_name": "SOL.staked",
            "underlying_inst_name": "SOL",
            "staked_quantity": "30000.00",
            "pending_staked_quantity": "20000.00",
            "pending_unstaked_quantity": "10000.00",
            "reward_eligible_quantity": "10000.00"
          }
        ]
      }
    }

Get the total staking position for a user/token

### Request Params

| Name            | Type   | Required | Description                              |
| --------------- | ------ | -------- | ---------------------------------------- |
| instrument_name | string | N        | Staking instrument name, e.g. SOL.staked |

### Applies To

REST

### REST Method

POST

### Response Attributes

An array, consisting of:

| Name                 | Type   | Description                              |
| -------------------- | ------ | ---------------------------------------- |
| instrument_name      | string | Staking instrument name, e.g. SOL.staked |
| underlying_inst_name | string | Underlying instrument name, e.g. SOL     |
| staked_quantity      | string | Total staked quantity                    |

For yield-bearing instruments (learn more from
[FAQs](https://help.crypto.com/en/articles/6800043-on-chain-staking-guide)), the
staked_quantity, pending_unstaked_quantity, reward_eligible_quantity fields
display the quantity of yield-bearing tokens held.

Example:  
If you hold a TSTON.staked position, this will show the actual quantity of TSTON
held on-chain on your behalf via the Crypto.com Exchange. | |
pending_staked_quantity | string | Total pending staked quantity | |
pending_unstaked_quantity | string | Total pending unstaked quantity | |
reward_eligible_quantity | string | Total reward eligible quantity, quantity can
be unstaked/convert |

## private/staking/get-staking-instruments

> Request Sample

    {
      "id": 1,
      "method": "private/staking/get-staking-instruments",
      "params": {}
    }

> Response Sample

    {
      "id": 1,
      "code": 0,
      "method": "private/staking/get-staking-instruments",
      "result": {
        "data": [
          {
            "instrument_name": "SOL.staked",
            "underlying_inst_name": "SOL",
            "reward_inst_name": "SOL.staked",
            "out_of_stock": false,
            "block_unstake": false,
            "est_rewards": "0.0661",
            "apr_y": "APR",
            "min_stake_amt": "0.00000001",
            "reward_frequency": "2.5",
            "lock_up_period": "5",
            "is_compound_reward": true,
            "pre_stake_charge_enable": false,
            "pre_stake_charge_rate_in_bps": "0",
            "is_restaked": false,
            "additional_rewards": []
          },
          {
            "instrument_name": "DYDX.staked",
            "underlying_inst_name": "DYDX",
            "reward_inst_name": "DYDX",
            "out_of_stock": false,
            "block_unstake": false,
            "est_rewards": "0.05",
            "apr_y": "APR",
            "min_stake_amt": "0.00000001",
            "reward_frequency": "1",
            "lock_up_period": "31",
            "is_compound_reward": false,
            "pre_stake_charge_enable": false,
            "pre_stake_charge_rate_in_bps": "0",
            "is_restaked": false,
            "additional_rewards": [
              {
                "reward_inst_name": "USD_Stable_Coin"
              }
            ]
          }
        ]
      }
    }

Get staking instruments information

### Request Params

| Name              | Type | Required | Description |
| ----------------- | ---- | -------- | ----------- |
| no param required | N/A  |          |             |

### Applies To

REST

### REST Method

POST

### Response Attributes

An array, consisting of:

| Name                         | Type    | Description                                 |
| ---------------------------- | ------- | ------------------------------------------- |
| instrument_name              | string  | Staking instrument name, e.g. SOL.staked    |
| underlying_inst_name         | string  | Underlying instrument name, e.g. SOL        |
| reward_inst_name             | string  | Reward instrument name, e.g. SOL.staked     |
| out_of_stock                 | boolean | Disabled stake - true or false              |
| block_unstake                | boolean | Disabled unstake - true or false            |
| est_rewards                  | string  | Estimated rewards                           |
| apr_y                        | string  | Estimated rewards unit - APR or APY         |
| min_stake_amt                | string  | Minimum stake amount                        |
| reward_frequency             | string  | Estimated reward frequency (day)            |
| lock_up_period               | string  | Estimated lock up period (day)              |
| is_compound_reward           | boolean | Is reward compounded - true or false        |
| pre_stake_charge_enable      | boolean | Is pre stake charge applied - true or false |
| pre_stake_charge_rate_in_bps | string  | Pre stake charge rate in basis point        |
| is_restaked                  | boolean | Is restaked instrument - true or false      |
| additional_rewards           | array   | See below                                   |

`additional_rewards` consists of:

| Name             | Type   | Description                       |
| ---------------- | ------ | --------------------------------- |
| reward_inst_name | string | Additional reward instrument name |

## private/staking/get-open-stake

> Request Sample

    {
      "id": 1,
      "method": "private/staking/get-open-stake",
      "params": {
        "instrument_name": "SOL.staked",
        "start_time": 1691455454495,
        "end_time": 1691545277000,
        "limit": "10"
      }
    }

> Response Sample

    {
      "id": 1,
      "code": 0,
      "method": "private/staking/get-open-stake",
      "result": {
        "data": [
          {
            "instrument_name": "SOL.staked",
            "underlying_inst_name": "SOL",
            "cycle_id": "1",
            "staking_id": "1",
            "status": "PENDING",
            "account": "12345678-9999-1234-9999-123456789999",
            "quantity": "1",
            "side": "STAKE",
            "create_timestamp_ms": "1668658093600"
          },
          {
            "instrument_name": "SOL.staked",
            "underlying_inst_name": "SOL",
            "cycle_id": "2",
            "staking_id": "2",
            "status": "UNSTAKING",
            "account": "12345678-9999-1234-9999-123456789999",
            "quantity": "0.5",
            "side": "UNSTAKE",
            "create_timestamp_ms": "1668658093600"
          }
        ]
      }
    }

Get stake/unstake requests that status is not in final state.

### Request Params

| Name            | Type             | Required | Description                                  |
| --------------- | ---------------- | -------- | -------------------------------------------- |
| instrument_name | string           | N        | Staking instrument name, e.g. SOL.staked     |
| start_time      | number or string | N        | Start time in Unix time format (`inclusive`) |

Default: `end_time - 30 days`  
Min: `end_time - 180 days` | | end_time | number or string | N | End time in
Unix time format (`inclusive`)  
Default: current system timestamp | | limit | number or string | N | The maximum
number of requests returned  
Default: 20  
Max: 500 |

### Applies To

REST

### REST Method

POST

### Response Attributes

An array, consisting of:

| Name                 | Type   | Description                              |
| -------------------- | ------ | ---------------------------------------- |
| instrument_name      | string | Staking instrument name, e.g. SOL.staked |
| underlying_inst_name | string | Underlying instrument name, e.g. SOL     |
| cycle_id             | string | Cycle id                                 |
| staking_id           | string | Request id                               |
| status               | string | Request status:                          |

\- `NEW`  
\- `PENDING`  
\- `PENDING_WITHDRAWAL`  
\- `PENDING_UNSTAKING`  
\- `STAKED` | | account | string | Account id | | quantity | string |
Stake/unstake quantity

For yield-bearing instruments (learn more from
[FAQs](https://help.crypto.com/en/articles/6800043-on-chain-staking-guide)),
this field displays the quantity in terms of the original staked token.

Example:  
When unstaking a TSTON.staked position, this field will specify the quantity
which is pending an unstaking action, denominated in TON. | | side | string |
Stake or Unstake | | create_timestamp_ms | string | Request creation timestamp
in milliseconds in Unix time format |

## private/staking/get-stake-history

> Request Sample

    {
      "id": 1,
      "method": "private/staking/get-stake-history",
      "params": {
        "instrument_name": "SOL.staked",
        "start_time": 1691455454495,
        "end_time": 1691545277000,
        "limit": "10"
      }
    }

> Response Sample

    {
      "id": 1,
      "code": 0,
      "method": "private/staking/get-stake-history",
      "result": {
        "data": [
          {
            "instrument_name": "SOL.staked",
            "underlying_inst_name": "SOL",
            "cycle_id": "1",
            "staking_id": "1",
            "status": "COMPLETED",
            "account": "12345678-9999-1234-9999-123456789999",
            "quantity": "1",
            "side": "STAKE",
            "create_timestamp_ms": "1668658093600"
          },
          {
            "instrument_name": "SOL.staked",
            "underlying_inst_name": "SOL",
            "cycle_id": "2",
            "staking_id": "2",
            "status": "REJECTED",
            "account": "12345678-9999-1234-9999-123456789999",
            "quantity": "0.5",
            "side": "UNSTAKE",
            "create_timestamp_ms": "1668658093600"
          }
        ]
      }
    }

Get stake/unstake request history

### Request Params

| Name            | Type             | Required | Description                                  |
| --------------- | ---------------- | -------- | -------------------------------------------- |
| instrument_name | string           | N        | Staking instrument name, e.g. SOL.staked     |
| start_time      | number or string | N        | Start time in Unix time format (`inclusive`) |

Default: `end_time - 30 days`  
Min: `end_time - 180 days` | | end_time | number or string | N | End time in
Unix time format (`inclusive`)  
Default: current system timestamp | | limit | number or string | N | The maximum
number of requests returned  
Default: 20  
Max: 500 |

### Applies To

REST

### REST Method

POST

### Response Attributes

An array, consisting of:

| Name                 | Type   | Description                              |
| -------------------- | ------ | ---------------------------------------- |
| instrument_name      | string | Staking instrument name, e.g. SOL.staked |
| underlying_inst_name | string | Underlying instrument name, e.g. SOL     |
| cycle_id             | string | Cycle id                                 |
| staking_id           | string | Request id                               |
| status               | string | Request status:                          |

\- `COMPLETED`  
\- `REJECTED` | | account | string | Account id | | quantity | string |
Stake/unstake quantity

For yield-bearing instruments (learn more from
[FAQs](https://help.crypto.com/en/articles/6800043-on-chain-staking-guide)),
this field displays the quantity in terms of the original staked token.

Example:  
After unstaking a TSTON.staked position, this field shows how much TON was
received as a result of the completed request. | | side | string | Stake or
Unstake | | create_timestamp_ms | string | Request creation timestamp in
milliseconds in Unix time format |

## private/staking/get-reward-history

> Request Sample

    {
      "id": 1,
      "method": "private/staking/get-reward-history",
      "params": {
        "instrument_name": "SOL.staked",
        "start_time": 1691455454495,
        "end_time": 1691545277000,
        "limit": "10"
      }
    }

> Response Sample

    {
      "id": 1,
      "code": 0,
      "method": "private/staking/get-reward-history",
      "result": {
        "data": [
          {
            "staking_inst_name": "SOL.staked",
            "underlying_inst_name": "SOL",
            "reward_inst_name": "SOL.staked",
            "reward_quantity": "123.4567",
            "staked_balance": "1234567",
            "event_timestamp_ms": "1667795832609"
          }
        ]
      }
    }

Get stake/unstake request history

### Request Params

| Name            | Type             | Required | Description                                  |
| --------------- | ---------------- | -------- | -------------------------------------------- |
| instrument_name | string           | N        | Staking instrument name, e.g. SOL.staked     |
| start_time      | number or string | N        | Start time in Unix time format (`inclusive`) |

Default: `end_time - 30 days`  
Min: `end_time - 180 days` | | end_time | number or string | N | End time in
Unix time format (`inclusive`)  
Default: current system timestamp | | limit | number or string | N | The maximum
number of requests returned  
Default: 20  
Max: 500 |

### Applies To

REST

### REST Method

POST

### Response Attributes

An array, consisting of:

| Name                 | Type   | Description                                         |
| -------------------- | ------ | --------------------------------------------------- |
| staking_inst_name    | string | Staking instrument name, e.g. SOL.staked            |
| underlying_inst_name | string | Underlying instrument name, e.g. SOL                |
| reward_inst_name     | string | Reward instrument name, e.g. SOL.staked             |
| reward_quantity      | string | Reward quantity                                     |
| staked_balance       | string | Staked balance                                      |
| event_timestamp_ms   | string | Event timestamp in milliseconds in Unix time format |

## private/staking/convert

> Request Sample

    {
      "id": 1,
      "method": "private/staking/convert",
      "params": {
        "from_instrument_name": "ETH.staked",
        "to_instrument_name": "CDCETH",
        "expected_rate": "1.0203",
        "from_quantity": "3.14159265",
        "slippage_tolerance_bps": "3"
      }
    }

> Response Sample

    {
      "id": 1,
      "code": 0,
      "method": "private/staking/convert",
      "result": {
        "from_instrument_name": "ETH.staked",
        "to_instrument_name": "CDCETH",
        "expected_rate": "1.0203",
        "from_quantity": "3.14159265",
        "slippage_tolerance_bps": "3",
        "convert_id": 1,
        "reason": "NO_ERROR"
      }
    }

Create a request to convert between staked token with liquid staking token.

### Request Params

| Name                 | Type   | Required | Description                      |
| -------------------- | ------ | -------- | -------------------------------- |
| from_instrument_name | string | Y        | Instrument name to convert from: |

\- ETH.staked  
\- CDCETH | | to_instrument_name | string | Y | Instrument name to convert to:  
\- CDCETH if `from_instrument_name` is ETH.staked  
\- ETH.staked if `from_instrument_name` is CDCETH | | expected_rate | string | Y
| Expected conversion rate, received from `public/staking/get-conversion-rate` |
| from_quantity | string | Y | Quantity to be converted in from_instrument_name
| | slippage_tolerance_bps | string | Y | Maximum slippage allowed in basis
point |

### Applies To

REST

### REST Method

POST

### Response Attributes

| Name                   | Type   | Description                                       |
| ---------------------- | ------ | ------------------------------------------------- |
| from_instrument_name   | string | Instrument name to convert from , e.g. ETH.staked |
| to_instrument_name     | string | Instrument name to convert to, e.g. CDCETH        |
| expected_rate          | string | Expected conversion rate                          |
| from_quantity          | string | Quantity to be converted in from_instrument_name  |
| slippage_tolerance_bps | string | Maximum slippage allowed in basis point           |
| convert_id             | string | Convert request id                                |
| reason                 | string | Reason for the status, e.g. "NO_ERROR"            |

## private/staking/get-open-convert

> Request Sample with limit and time range provided

    {
      "id": 1,
      "method": "private/staking/get-open-convert",
      "params": {
        "start_time": 1691455454495,
        "end_time": 1691545277000,
        "limit": "10"
      }
    }

> Response Sample

    {
      "id": 1,
      "code": 0,
      "method": "private/staking/get-open-convert",
      "result": {
        "data": [
          {
            "from_instrument_name": "ETH.staked",
            "to_instrument_name": "CDCETH",
            "expected_rate": "1.0203",
            "from_quantity": "3.14159265",
            "slippage_tolerance_bps": "3",
            "actual_rate": "1.0203",
            "to_quantity": "3.14159265",
            "convert_id": 1,
            "status": "COMPLETED",
            "create_timestamp_ms": "1688140984005"
          }
        ]
      }
    }

Get convert request that status is not in final state.

### Request Params

| Name       | Type             | Required | Description                                  |
| ---------- | ---------------- | -------- | -------------------------------------------- |
| start_time | number or string | N        | Start time in Unix time format (`inclusive`) |

Default: `end_time - 30 day`  
Min: `end_time - 180 days` | | end_time | number or string | N | End time in
Unix time format (`inclusive`)  
Default: current system timestamp | | limit | number or string | N | The maximum
number of requests returned  
Default: 20  
Max: 500 |

### Applies To

REST

### REST Method

POST

### Response Attributes

An array, consisting of:

| Name                 | Type   | Description                      |
| -------------------- | ------ | -------------------------------- |
| from_instrument_name | string | Instrument name to convert from: |

\- ETH.staked  
\- CDCETH | | to_instrument_name | string | Instrument name to convert to, e.g.
CDCETH | | expected_rate | string | Expected conversion rate | | from_quantity |
string | Quantity to be converted in from_instrument_name | |
slippage_tolerance_bps | string | Maximum slippage allowed in basis point | |
actual_rate | string | Actual conversion rate | | to_quantity | string |
Quantity converted to to_instrument_name | | convert_id | string | Convert
request id | | status | string | Request status:  
\- `NEW` | | create_timestamp_ms | string | Request creation timestamp in
milliseconds in Unix time format |

## private/staking/get-convert-history

> Request Sample with limit and time range provided

    {
      "id": 1,
      "method": "private/staking/get-convert-history",
      "params": {
        "start_time": 1691455454495,
        "end_time": 1691545277000,
        "limit": "10"
      }
    }

> Response Sample

    {
      "id": 1,
      "code": 0,
      "method": "private/staking/get-convert-history",
      "result": {
        "data": [
          {
            "from_instrument_name": "ETH.staked",
            "to_instrument_name": "CDCETH",
            "expected_rate": "1.0203",
            "from_quantity": "3.14159265",
            "slippage_tolerance_bps": "3",
            "actual_rate": "1.0203",
            "to_quantity": "3.14159265",
            "convert_id": 1,
            "status": "COMPLETED",
            "create_timestamp_ms": "1688140984005"
          }
        ]
      }
    }

Get convert request history

### Request Params

| Name       | Type             | Required | Description                                  |
| ---------- | ---------------- | -------- | -------------------------------------------- |
| start_time | number or string | N        | Start time in Unix time format (`inclusive`) |

Default: `end_time - 30 day`  
Min: `end_time - 180 days` | | end_time | number or string | N | End time in
Unix time format (`inclusive`)  
Default: current system timestamp | | limit | number or string | N | The maximum
number of requests returned  
Default: 20  
Max: 500 |

### Applies To

REST

### REST Method

POST

### Response Attributes

An array, consisting of:

| Name                 | Type   | Description                      |
| -------------------- | ------ | -------------------------------- |
| from_instrument_name | string | Instrument name to convert from: |

\- ETH.staked  
\- CDCETH | | to_instrument_name | string | Instrument name to convert to:  
\- CDCETH  
\- ETH.staked | | expected_rate | string | Expected conversion rate | |
from_quantity | string | Quantity to be converted in from_instrument_name | |
slippage_tolerance_bps | string | Maximum slippage allowed in basis point | |
actual_rate | string | Actual conversion rate | | to_quantity | string |
Quantity converted to to_instrument_name | | convert_id | string | Convert
request id | | status | string | Request status:  
\- `COMPLETED`  
\- Reason of `REJECTED` | | create_timestamp_ms | string | Request creation
timestamp in milliseconds in Unix time format |

## public/staking/get-conversion-rate

> Request Sample

    {
      "id": 1,
      "method": "public/staking/get-conversion-rate",
      "params": {
        "instrument_name": "CDCETH"
      }
    }

> Response Sample

    {
      "id": 1,
      "method": "public/staking/get-conversion-rate",
      "code": 0,
      "result": {
        "instrument_name": "CDCETH",
        "conversion_rate": "1.0203"
      }
    }

Get conversion rate between staked token and liquid staking token

### Request Params

| Name            | Type   | Required | Description                           |
| --------------- | ------ | -------- | ------------------------------------- |
| instrument_name | string | Y        | liquid staking token instrument name: |
| \- CDCETH       |

### Applies To

REST

### REST Method

POST

### Response Attributes

| Name            | Type   | Description                                                                         |
| --------------- | ------ | ----------------------------------------------------------------------------------- |
| instrument_name | string | CDCETH                                                                              |
| conversion_rate | string | conversion rate between staked token (ETH.staked) and liquid staking token (CDCETH) |
