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

# Reference and Market Data API

## public/get-announcements

> Request Sample

    https://api.crypto.com/v1/public/get-announcements?category=system&product_type=Spot

> Response Sample

    {
      "id": 0,
      "method": "public/get-announcements",
      "code": 0,
      "result": {
        "data": [
          {
            "id": "67ea25c534909545bfc81232",
            "category": "system",
            "product_type": "Spot,Margin,Derivative,TradingArena,VIPProgramme,MMProgramme,Supercharger,TradingBot,Documents,DefiStaking,Staking,LiquidStaking,Affiliate,Referral,CROLockup,AccountManagement,OtcConvert,Transfer,ZeroFeeToken",
            "announced_at": 1743379200000,
            "title": "No Otc, lending, broker, affiliate_dashboard",
            "content": "<p>test system</p>",
            "instrument_name": null,
            "impacted_params": {
              "spot_trading_impacted": "PARTIAL",
              "derivative_trading_impacted": "BAU",
              "margin_trading_impacted": "BAU",
              "otc_trading_impacted": "PARTIAL",
              "convert_impacted": "PARTIAL",
              "staking_impacted": "PARTIAL",
              "trading_bot_impacted": "PARTIAL",
              "crypto_wallet_impacted": "PARTIAL",
              "fiat_wallet_impacted": "PARTIAL",
              "login_impacted": "PARTIAL"
            },
            "start_time": 1743426900000,
            "end_time": 1743434100000
          }
        ]
      }
    }

Production endpoint: https://api.crypto.com/v1/public/get-announcements

This api fetches all announcements in [Crypto.com](https://crypto.com/) Exchange

### Request Params

| Name         | Type   | Required | Description                                                                   |
| ------------ | ------ | -------- | ----------------------------------------------------------------------------- |
| category     | string | N        | filter by category: list, delist, event, product, system                      |
| product_type | string | N        | filter by product type. e.g. Spot, Derivative, OTC, Staking, TradingArena etc |

### Response Attributes

| Name            | Type   | Description                        |
| --------------- | ------ | ---------------------------------- |
| id              | string | announcement id                    |
| category        | string | type of announcement               |
| product_type    | string | type of product                    |
| announced_at    | string | announced timestamps               |
| title           | string | title of announcement              |
| content         | string | content of announcement            |
| instrument_name | string | instrument name                    |
| impacted_params | map    | impacted params                    |
| start_time      | long   | announcements start time timestamp |
| end_time        | long   | announcements end time timestamp   |

### Applies To

REST

### REST Method

GET

## public/get-risk-parameters

> Request Sample

    https://{URL}/public/get-risk-parameters

> Response Sample

    {
      "id" : -1,
      "method" : "public/get-risk-parameters",
      "code" : 0,
      "result" : {
        "default_max_product_leverage_for_spot" : "1.0",
        "default_max_product_leverage_for_perps" : "20.0",
        "default_max_product_leverage_for_futures" : "20.0",
        "default_unit_margin_rate" : "0.05",
        "default_collateral_cap" : "-1.0",
        "update_timestamp_ms" : 1727853473520,
        "base_currency_config" : [ {
          "instrument_name" : "1INCH",
          "minimum_haircut" : "0",
          "unit_margin_rate" : "0.00050",
          "order_limit" : "100000.0"
        }, {
          "instrument_name" : "AAVE",
          "collateral_cap_notional" : "3600000.0",
          "minimum_haircut" : "0.2",
          "max_product_leverage_for_spot" : "5.0",
          "unit_margin_rate" : "0.007",
          "max_short_sell_limit" : "600.0",
          "order_limit" : "500000.0",
          "max_order_notional_usd" : "100000.0",
          "min_order_notional_usd" : "1.0"

        }, {
          "instrument_name" : "ACA",
          "order_limit" : "100000.0",
          "max_order_notional_usd" : "100000.0",
          "min_order_notional_usd" : "1.0"
        }, {
          "instrument_name" : "ACH",
          "minimum_haircut" : "0",
          "unit_margin_rate" : "0.00015",
          "order_limit" : "100000.0",
          "max_order_notional_usd" : "100000.0",
          "min_order_notional_usd" : "1.0"

        }, {
          "instrument_name" : "AERGO",
          "order_limit" : "100000.0",
          "max_order_notional_usd" : "100000.0",
          "min_order_notional_usd" : "1.0"
        }, {
          "instrument_name" : "AERO",
          "order_limit" : "1000.0",
          "max_order_notional_usd" : "100000.0",
          "min_order_notional_usd" : "1.0"
        }, {
          "instrument_name" : "ZRO",
          "minimum_haircut" : "0",
          "unit_margin_rate" : "0.004",
          "order_limit" : "500000.0",
          "max_order_notional_usd" : "100000.0",
          "min_order_notional_usd" : "1.0"
        }, {
          "instrument_name" : "ZRX",
          "minimum_haircut" : "0",
          "unit_margin_rate" : "0.00040",
          "order_limit" : "100000.0",
          "max_order_notional_usd" : "100000.0",
          "min_order_notional_usd" : "1.0"
        } ]
      }
    }

Provides information on risk parameter settings for
[Smart Cross Margin](https://crypto.com/exchange/document/margin-rules).

### Applies To

REST

### REST Method

GET

### Response Attributes

An array, consisting of:

| Name                                     | Type            | Description                                                                                                                                 |
| ---------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| default_max_product_leverage_for_spot    | number          | default max product leverage for margin trading unless specified in base_currency_config array                                              |
| default_max_product_leverage_for_perps   | number          | default max product leverage for perpetuals unless specified in base_currency_config array                                                  |
| default_max_product_leverage_for_futures | number          | default max product leverage for futures unless specified in base_currency_config array                                                     |
| default_unit_margin_rate                 | number          | default additional margin rate / haircut rate for holding 1 unit of positions unless specified in base_currency_config array                |
| default_collateral_cap                   | number          | refer to specified collateral cap for each token in base_currency_config array. Field is omitted if the token is not eligible as collateral |
| update_timestamp_ms                      | number          | Last update time                                                                                                                            |
| **_base_currency_config_**               | array of string | specific risk parameters as shown below                                                                                                     |

**_base_currency_config_** is an array consisting of below fields for specific
base tokens.

| Name                                                                                                                                 | Type   | Description                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| collateral_cap_notional                                                                                                              | number | the maximum $notional that is counted towards the margin balance.                                                                  |
| Any additional token balance would not contribute to the margin balance. Field is omitted if the token is not eligible as collateral |
| minimum_haircut                                                                                                                      | number | Minimum haircut rate. Field is omitted if the token is not eligible as collateral                                                  |
| max_product_leverage_for_spot                                                                                                        | number | the max product leverage for margin trading on this token.                                                                         |
| max_product_leverage_for_perps                                                                                                       | number | the max product leverage for perpetuals on this base token                                                                         |
| max_product_leverage_for_futures                                                                                                     | number | the max product leverage for futures on this base token                                                                            |
| unit_margin_rate                                                                                                                     | number | the additional margin rate / haircut rate for holding 1 unit of positions with this base token                                     |
| max_short_sell_limit                                                                                                                 | number | max negative asset balance user can hold on the base token. If field is omitted means no short sell permitted on the token         |
| daily_notional_limit                                                                                                                 | number | max spot order notional user can place in rolling 24-hour window. If field is omitted, user can trade unlimited on this base token |
| order_limit                                                                                                                          | number | max $notional per spot order on this base token                                                                                    |
| max_order_notional_usd                                                                                                               | number | max $notional per spot order on this base token                                                                                    |
| min_order_notional_usd                                                                                                               | number | min $notional per spot order on this base token                                                                                    |

## public/get-instruments

> Request Sample

N/A

> Response Sample

    {
      "id": 1,
      "method":"public/get-instruments",
      "code": 0,
      "result":{
        "data":[
          {
            "symbol":"BTCUSD-PERP",
            "inst_type":"PERPETUAL_SWAP",
            "display_name":"BTCUSD Perpetual",
            "base_ccy":"BTC",
            "quote_ccy":"USD",
            "quote_decimals":2,
            "quantity_decimals":4,
            "price_tick_size":"0.5",
            "qty_tick_size":"0.0001",
            "max_leverage":"50",
            "tradable":true,
            "expiry_timestamp_ms":1624012801123,
            "underlying_symbol": "BTCUSD-INDEX"
          }
        ]
      }
    }

Provides information on all supported instruments (e.g. BTCUSD-PERP).

### Applies To

REST

### REST Method

GET

### Response Attributes

An array, consisting of:

| Name                | Type    | Description                           |
| ------------------- | ------- | ------------------------------------- |
| symbol              | string  | e.g. BTCUSD-PERP                      |
| inst_type           | string  | e.g. PERPETUAL_SWAP                   |
| display_name        | string  | e.g. BTCUSD Perpetual                 |
| base_ccy            | string  | Base currency, e.g. BTC               |
| quote_ccy           | string  | Quote currency, e.g. USD              |
| quote_decimals      | number  | Minimum decimal place for price field |
| quantity_decimals   | number  | Minimum decimal place for qty field   |
| price_tick_size     | string  | Minimum price tick size               |
| qty_tick_size       | string  | Minimum trading quantity / tick size  |
| max_leverage        | string  | Max leverage of the product           |
| tradable            | boolean | True or false                         |
| expiry_timestamp_ms | number  | Expiry timestamp in millisecond       |
| underlying_symbol   | string  | Underlying symbol                     |

## public/get-book

> Request Sample

    https://{URL}/public/get-book?instrument_name=BTCUSD-PERP&depth=10

> Response Sample

    {
      "code":0,
      "method":"public/get-book",
      "result": {
        "depth": 10,
        "data": [{
          "asks": [
            ["50126.000000", "0.400000", "0"],
            ["50130.000000", "1.279000", "0"],
            ["50136.000000", "1.279000", "0"],
            ["50137.000000", "0.800000", "0"],
            ["50142.000000", "1.279000", "0"],
            ["50148.000000", "2.892900", "0"],
            ["50154.000000", "1.279000", "0"],
            ["50160.000000", "1.133000", "0"],
            ["50166.000000", "3.090700", "0"],
            ["50172.000000", "1.279000", "0"]
          ],
          "bids": [
            ["50113.500000", "0.400000", "0"],
            ["50113.000000", "0.051800", "0"],
            ["50112.000000", "1.455300", "0"],
            ["50106.000000", "1.174800", "0"],
            ["50100.500000", "0.800000", "0"],
            ["50100.000000", "1.455300", "0"],
            ["50097.500000", "0.048000", "0"],
            ["50097.000000", "0.148000", "0"],
            ["50096.500000", "0.399200", "0"],
            ["50095.000000", "0.399200", "0"]
          ]
        }],
        "instrument_name": "BTCUSD-PERP"
      }
    }

Fetches the public order book for a particular instrument and depth.

### Request Params

| Name            | Type   | Required | Description                                  |
| --------------- | ------ | -------- | -------------------------------------------- |
| instrument_name | string | Y        | e.g. BTCUSD-PERP                             |
| depth           | string | Y        | Number of bids and asks to return (up to 50) |

### Applies To

REST

### REST Method

GET

### Response Attributes

| Name            | Type   | Description                                  |
| --------------- | ------ | -------------------------------------------- |
| instrument_name | string | e.g. BTCUSD-PERP                             |
| depth           | string | Number of bids and asks to return (up to 50) |
| data            | array  | See below                                    |

`data` consists of:

| Name | Type  | Description                                                           |
| ---- | ----- | --------------------------------------------------------------------- |
| bids | array | Bids array: \[0\] = Price, \[1\] = Quantity, \[2\] = Number of Orders |
| asks | array | Asks array: \[0\] = Price, \[1\] = Quantity, \[2\] = Number of Orders |

**Note**: Known issue: Number of Orders currently returns 0

## public/get-candlestick

> Request Sample

    https://{URL}/public/get-candlestick?instrument_name=BTCUSD-PERP&timeframe=M5

> Response Sample

    {
      "id": 1,
      "method": "public/get-candlestick",
      "code": 0,
      "result": {
        "interval": "M5",
        "data": [{
          "o": "50508.500000",    // Open price
          "h": "50548.500000",    // High price
          "l": "50172.500000",    // Low price
          "c": "50202.000000",    // Close price
          "v": "17.203200",       // Volume
          "t": 1613544000000      // Start time
        }
        ],
        "instrument_name": "BTCUSD-PERP"
      }
    }

Retrieves candlesticks (k-line data history) over a given period for an
instrument (e.g. BTCUSD-PERP).

### Request Params

| Name            | Type   | Required | Description                                        |
| --------------- | ------ | -------- | -------------------------------------------------- |
| instrument_name | string | Y        | e.g. BTCUSD-PERP                                   |
| timeframe       | string | N        | The `period` value as show below. Default is `M1`. |
| count           | number | N        | Default is 25                                      |
| start_ts        | number | N        | Default timestamp is 1 day ago (Unix timestamp)    |
| end_ts          | number | N        | Default timestamp is current time (Unix timestamp) |

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

Lagacy format is still supported until further notice.

### Applies To

REST

### Response Attributes

| Name            | Type   | Description          |
| --------------- | ------ | -------------------- |
| instrument_name | string | e.g. BTCUSD-PERP     |
| interval        | string | The period (e.g. M5) |
| data            | array  | See below            |

`data` consists of:

| Name | Type   | Description                                |
| ---- | ------ | ------------------------------------------ |
| t    | long   | Start time of candlestick (Unix timestamp) |
| o    | number | Open                                       |
| h    | number | High                                       |
| l    | number | Low                                        |
| c    | number | Close                                      |
| v    | number | Volume                                     |

## public/get-trades

> Request Sample

    https://{URL}/public/get-trades?instrument_name=BTCUSD-PERP&count=5

> Response Sample

    {
      "id": 1,
      "method": "public/get-trades",
      "code": 0,
      "result": {
        "data": [{
          "d": "15281981878",          // Trade ID
          "t": 1613547060925,          // Trade timestamp milliseconds
          "tn": "1613547060925523623", // Trade timestamp nanoseconds
          "q": "0.181900",             // Quantity
          "p": "50772.000000",         // Price
          "s": "SELL",                 // Side
          "i": "BTCUSD-PERP"           // Instrument name
          "m": "76423"                 // Trade match ID
        }]
      }
    }

Fetches the public trades for a particular instrument.

### Request Params

| Name            | Type   | Required | Description                                   |
| --------------- | ------ | -------- | --------------------------------------------- |
| instrument_name | string | Y        | e.g. BTCUSD-PERP                              |
| count           | number | N        | The maximum number of trades to be retrieved. |

Default: 25  
Max: 150 | | start_ts | number or string | N | Start time in Unix time format
(`inclusive`).  
Default: `end_time - 1 day`.  
Nanosecond is recommended for accurate pagination | | end_ts | number or string
| N | End time in Unix time format (`exclusive`)  
Default: current system timestamp.  
Nanosecond is recommended for accurate pagination |

**Note**: get-trades time window can only be up to 7 days for maximum.

### Applies To

REST

### REST Method

GET

### Response Attributes

| Name | Type             | Description                                                 |
| ---- | ---------------- | ----------------------------------------------------------- |
| d    | string of number | Trade ID                                                    |
| t    | number           | Trade timestamp in milliseconds                             |
| tn   | string of number | Trade timestamp in nanoseconds                              |
| q    | number           | Trade quantity                                              |
| p    | number           | Trade price                                                 |
| s    | string           | Side (`BUY` or `SELL`). Side is the side of the taker order |
| i    | string           | Instrument name e.g. BTCUSD-PERP                            |
| m    | string of number | Trade match ID                                              |

## public/get-tickers

> Request Sample

    https://{URL}/public/get-tickers?instrument_name=BTCUSD-PERP

> Response Sample

    {
      "id": -1,
      "method": "public/get-tickers",
      "code": 0,
      "result": {
        "data": [{
          "h": "51790.00",        // Price of the 24h highest trade
          "l": "47895.50",        // Price of the 24h lowest trade, null if there weren't any trades
          "a": "51174.500000",    // The price of the latest trade, null if there weren't any trades
          "i": "BTCUSD-PERP",     // Instrument name
          "v": "879.5024",        // The total 24h traded volume
          "vv": "26370000.12",    // The total 24h traded volume value (in USD)
          "oi": "12345.12",       // Open interest
          "c": "0.03955106",      // 24-hour price change, null if there weren't any trades
          "b": "51170.000000",    // The current best bid price, null if there aren't any bids
          "k": "51180.000000",    // The current best ask price, null if there aren't any asks
          "t": 1613580710768      // The published timestamp in ms
        }]
      }
    }

Fetches the public tickers for all or a particular instrument.

### Request Params

| Name            | Type   | Required | Description      |
| --------------- | ------ | -------- | ---------------- |
| instrument_name | string | N        | e.g. BTCUSD-PERP |

### Applies To

REST

### REST Method

GET

### Response Attributes

| Name | Type   | Description                                                     |
| ---- | ------ | --------------------------------------------------------------- |
| h    | string | Price of the 24h highest trade                                  |
| l    | string | Price of the 24h lowest trade, null if there weren't any trades |
| a    | string | The price of the latest trade, null if there weren't any trades |
| i    | string | Instrument name                                                 |
| v    | string | The total 24h traded volum                                      |
| vv   | string | The total 24h traded volume value (in USD)                      |
| oi   | string | The open interest                                               |
| c    | string | 24-hour price change, null if there weren't any trades          |
| b    | string | The current best bid price, null if there aren't any bids       |
| k    | string | The current best ask price, null if there aren't any asks       |
| t    | number | The published timestamp in ms                                   |

## public/get-valuations

> Request Sample

    https://{URL}/public/get-valuations?instrument_name=BTCUSD-INDEX&valuation_type=index_price&count=1

> Response Sample

    {
      "id": 1,
      "method": "public/get-valuations",
      "code": 0,
      "result": {
        "data": [{
          "v": "50776.73000",
          "t": 1613547318000
        }],
        "instrument_name": "BTCUSD-INDEX"
      }
    }

Fetches certain valuation type data for a particular instrument.

### Request Params

| Name            | Type   | Required | Description                  |
| --------------- | ------ | -------- | ---------------------------- |
| instrument_name | string | Y        | e.g. BTCUSD-INDEX            |
| valuation_type  | string | Y        | **List of available types:** |

a. `index_price`: returns per minute data of underlying reference price of the
instrument.  
b. `mark_price`: returns per minute data of mark price of the instrument.  
c. `funding_hist`: returns hourly data of the funding rate settled in past
hourly settlement.  
d. `funding_rate`: returns per minute data of current hourly funding rate that
will settle at the end of each hour of current 4-hour interval.  
e. `estimated_funding_rate`: returns per minute data of estimated funding rate
for the next interval.  
 | | count | number | N | Default is 25 | | start_ts | number | N | Default
timestamp is 30 days ago for `funding_hist`, and 1 day ago for other
valuation_type (Unix timestamp) | | end_ts | number | N | Default timestamp is
current time (Unix timestamp) |

### Applies To

REST

### REST Method

GET

### Response Attributes

| Name            | Type   | Description       |
| --------------- | ------ | ----------------- |
| instrument_name | string | e.g. BTCUSD-INDEX |
| data            | array  | See below         |

`data` consists of:

| Name | Type   | Description |
| ---- | ------ | ----------- |
| v    | string | Value       |
| t    | long   | Timestamp   |

## public/get-expired-settlement-price

> Request Sample

    https://{URL}/public/get-expired-settlement-price?instrument_type=FUTURE&page=1

> Response Sample

    {
      "id": -1,
      "method": "public/get-expired-settlement-price",
      "code": 0,
      "result": {
        "data": [{
          "i": "BTCUSD-210528m2",
          "x": 1622145600000,
          "v": "50776.73000",
          "t": 1622145540000
        },
          {
            "i": "BTCUSD-210528m3",
            "x": 1622160000000,
            "v": "38545.570000",
            "t": 1622159940000
          }]
      }
    }

Fetches settlement price of expired instruments.

### Request Params

| Name            | Type   | Required | Description  |
| --------------- | ------ | -------- | ------------ |
| instrument_type | string | Y        | `FUTURE`     |
| page            | number | N        | Default is 1 |

### Applies To

REST

### REST Method

GET

### Response Attributes

| Name | Type   | Description                    |
| ---- | ------ | ------------------------------ |
| i    | string | Instrument name                |
| x    | long   | Expiry timestamp (millisecond) |
| v    | string | Value                          |
| t    | long   | Timestamp                      |

## public/get-insurance

> Request Sample

    https://{URL}/public/get-insurance?instrument_name=USD&count=1

> Response Sample

    {
      "id": 1,
      "method": "public/get-insurance",
      "code": 0,
      "result": {
        "data": [{
          "v": "50000000",
          "t": 1613539503965
        }],
        "instrument_name": "USD"
      }
    }

Fetches balance of Insurance Fund for a particular currency.

### Request Params

| Name            | Type   | Required | Description                                        |
| --------------- | ------ | -------- | -------------------------------------------------- |
| instrument_name | string | Y        | e.g. USD                                           |
| count           | number | N        | Default is 25                                      |
| start_ts        | number | N        | Default timestamp is 1 day ago (Unix timestamp)    |
| end_ts          | number | N        | Default timestamp is current time (Unix timestamp) |

### Applies To

REST

### REST Method

GET

### Response Attributes

| Name            | Type   | Description |
| --------------- | ------ | ----------- |
| instrument_name | string | e.g. USD    |
| data            | array  | See below   |

`data` consists of:

| Name | Type   | Description |
| ---- | ------ | ----------- |
| v    | string | Value       |
| t    | long   | Timestamp   |
