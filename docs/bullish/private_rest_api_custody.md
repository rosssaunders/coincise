---
title: Bullish Trading API - Private REST API - Custody
language_tabs:
  - javascript: JavaScript
  - python: Python
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2
---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="bullish-trading-api">Bullish Trading API - Private REST API - Custody</h1>

> Scroll down for code samples, example requests and responses. Select a
> language for code samples from the tabs above or the mobile navigation menu.

<h1 id="bullish-trading-api-custody">custody</h1>

Authenticated APIs for custody,
[Custody Basic Examples](https://github.com/bullish-exchange/api-examples/blob/master/bullish/rest/custody_basics.py)

Custody APIs have a limit of 40 requests per IP, per minute. This is combined
across all endpoints of type **/wallets/\***

## custody-get-history

<a id="opIdcustody-get-history"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch("https://api.exchange.bullish.com/trading-api/v1/wallets/transactions", {
  method: "GET",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': {
  "type": "string"
}
}

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/wallets/transactions', headers = headers)

print(r.json())

```

`GET /v1/wallets/transactions`

_Get Custody Transaction History_

Get custody transaction history, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

Please note that Custody endpoints utilize a non-multiplied asset format for
long decimal assets like SHIB and PEPE, ensuring consistency with real-world
asset representation. This differs from Trading endpoints, which use a
multiplied asset format, such as SHIB1M and PEPE1M. For more information, please
see
[help centre](https://bullishexchange.atlassian.net/wiki/spaces/BHC/pages/20807684/Understanding+Multiplied+Assets+PEPE1M+and+SHIB1M)

- [supports pagination](#overview--pagination-support)

**Ratelimited:** `True` - see [custody limits](#tag--custody)

<h3 id="custody-get-history-parameters">Parameters</h3>

| Name                   | In     | Type                        | Required | Description                                                                                  |
| ---------------------- | ------ | --------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| Authorization          | header | string                      | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token) |
| createdAtDatetime[gte] | query  | [DateTime](#schemadatetime) | false    | start timestamp of period, ISO 8601 with millisecond as string                               |
| createdAtDatetime[lte] | query  | [DateTime](#schemadatetime) | false    | end timestamp of period, ISO 8601 with millisecond as string                                 |

> Example responses

> 200 Response

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "custodyTransactionId": {
        "allOf": [
          {
            "type": "string",
            "example": "DB:9e6304a08c9cc2a33e6bc6429a088eae2a6b940c8e312aede3a3780257b9b979",
            "description": "unique identifier for tracking a deposit or withdrawal"
          }
        ]
      },
      "direction": {
        "allOf": [
          {
            "type": "string",
            "example": "DEPOSIT",
            "description": "direction of transaction from API user's perspective, 'DEPOSIT' or 'WITHDRAWAL'"
          }
        ]
      },
      "quantity": {
        "allOf": [
          {
            "type": "string",
            "description": "total quantity of symbol to withdraw including fee in units of symbol, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei) - quantity received will have fee subtracted.",
            "example": "100000.00"
          }
        ]
      },
      "symbol": {
        "allOf": [
          {
            "type": "string",
            "example": "USDC",
            "description": "symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB"
          }
        ]
      },
      "network": {
        "allOf": [
          {
            "type": "string",
            "example": "ETH",
            "description": "the network of the native coin or token, e.g. BTC, ETH, SOL"
          }
        ]
      },
      "fee": {
        "allOf": [
          {
            "type": "string",
            "example": "3.00",
            "description": "withdrawal fee charged in units of symbol, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei)"
          }
        ]
      },
      "memo": {
        "allOf": [
          {
            "type": "string",
            "example": "925891241",
            "description": "memo or destination tag used during deposit to help identify account to credit funds to"
          }
        ]
      },
      "createdAtDateTime": {
        "allOf": [
          {
            "type": "string",
            "example": "2022-09-16T07:56:15.000Z",
            "description": "time of initial transaction"
          }
        ]
      },
      "status": {
        "allOf": [
          {
            "type": "string",
            "example": "COMPLETE",
            "description": "one of 'PENDING', 'COMPLETE', 'CANCELLED', 'FAILED'"
          }
        ]
      },
      "transactionDetails": {
        "allOf": [
          {
            "type": "object",
            "properties": {
              "address": {
                "type": "string",
                "description": "crypto network address",
                "example": "0xb0a64d976972d87b0783eeb1ff88306cd1891f02"
              },
              "blockchainTxId": {
                "type": "string",
                "description": "transaction id on chain",
                "example": "0xec557f2c7278d2dae2d98a27b9bd43f386789a4209090cbbd11595f1bed4a4c2"
              },
              "swiftUetr": {
                "type": "string",
                "description": "unique end-to-end-transaction reference for swift transactions",
                "example": "b55aa5cd-baa2-4122-8c17-ae9b856ae36a"
              }
            }
          }
        ]
      }
    }
  }
}
```

<h3 id="custody-get-history-responses">Responses</h3>

| Status | Meaning                                                                    | Description           | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | Inline |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None   |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None   |

<h3 id="custody-get-history-responseschema">Response Schema</h3>

Status Code **200**

| Name                   | Type                                                              | Required | Restrictions | Description                                                                                                                                                                           |
| ---------------------- | ----------------------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _anonymous_            | [[CustodyHistory](#schemacustodyhistory)]                         | false    | none         | none                                                                                                                                                                                  |
| » custodyTransactionId | [CustodyTransactionHistoryID](#schemacustodytransactionhistoryid) | false    | none         | unique identifier for tracking a deposit or withdrawal                                                                                                                                |
| » direction            | [CustodyDirection](#schemacustodydirection)                       | false    | none         | direction of transaction from API user's perspective, 'DEPOSIT' or 'WITHDRAWAL'                                                                                                       |
| » quantity             | [CustodyQuantity](#schemacustodyquantity)                         | false    | none         | total quantity of symbol to withdraw including fee in units of symbol, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei) - quantity received will have fee subtracted. |
| » symbol               | [CustodySymbol](#schemacustodysymbol)                             | false    | none         | symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB                                                                                                                          |
| » network              | [NetworkID](#schemanetworkid)                                     | false    | none         | the network of the native coin or token, e.g. BTC, ETH, SOL                                                                                                                           |
| » fee                  | [CustodyWithdrawalFee](#schemacustodywithdrawalfee)               | false    | none         | withdrawal fee charged in units of symbol, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei)                                                                           |
| » memo                 | [CustodyDepositMemo](#schemacustodydepositmemo)                   | false    | none         | memo or destination tag used during deposit to help identify account to credit funds to                                                                                               |
| » createdAtDateTime    | [CustodyCreatedAtDateTime](#schemacustodycreatedatdatetime)       | false    | none         | time of initial transaction                                                                                                                                                           |
| » status               | [CustodyTransactionStatus](#schemacustodytransactionstatus)       | false    | none         | one of 'PENDING', 'COMPLETE', 'CANCELLED', 'FAILED'                                                                                                                                   |
| » transactionDetails   | [CustodyTransactionDetails](#schemacustodytransactiondetails)     | false    | none         | none                                                                                                                                                                                  |
| »» address             | string                                                            | false    | none         | crypto network address                                                                                                                                                                |
| »» blockchainTxId      | string                                                            | false    | none         | transaction id on chain                                                                                                                                                               |
| »» swiftUetr           | string                                                            | false    | none         | unique end-to-end-transaction reference for swift transactions                                                                                                                        |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
jwtTokenAuth
</aside>

## custody-get-limits

<a id="opIdcustody-get-limits"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v1/wallets/limits/{symbol}",
  {
    method: "GET",

    headers: headers
  }
)
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': {
  "type": "string"
}
}

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/wallets/limits/{symbol}', headers = headers)

print(r.json())

```

`GET /v1/wallets/limits/{symbol}`

_Get Withdrawal Limits for Symbol_

Get withdrawal limits for symbol, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

Please note that Custody endpoints utilize a non-multiplied asset format for
long decimal assets like SHIB and PEPE, ensuring consistency with real-world
asset representation. This differs from Trading endpoints, which use a
multiplied asset format, such as SHIB1M and PEPE1M. For more information, please
see
[help centre](https://bullishexchange.atlassian.net/wiki/spaces/BHC/pages/20807684/Understanding+Multiplied+Assets+PEPE1M+and+SHIB1M)

**Ratelimited:** `True` - see [custody limits](#tag--custody)

<h3 id="custody-get-limits-parameters">Parameters</h3>

| Name          | In     | Type                                  | Required | Description                                                                                  |
| ------------- | ------ | ------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| Authorization | header | string                                | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token) |
| symbol        | path   | [CustodySymbol](#schemacustodysymbol) | true     | none                                                                                         |

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "symbol": {
      "allOf": [
        {
          "type": "string",
          "example": "USDC",
          "description": "symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB"
        }
      ]
    },
    "available": {
      "allOf": [
        {
          "type": "string",
          "example": "20000.0",
          "description": "remaining limit on amount of coin or token that could be withdrawn now, in units of the symbol itself, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei)"
        }
      ]
    },
    "twentyFourHour": {
      "allOf": [
        {
          "type": "string",
          "example": "1000000.00",
          "description": "limit on amount of coin or token that can be withdrawn over a 24 hour period, in units of the symbol itself, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei)"
        }
      ]
    }
  }
}
```

<h3 id="custody-get-limits-responses">Responses</h3>

| Status | Meaning                                                                    | Description           | Schema                                |
| ------ | -------------------------------------------------------------------------- | --------------------- | ------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | [CustodyLimits](#schemacustodylimits) |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None                                  |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None                                  |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
jwtTokenAuth
</aside>

## custody-get-deposit-instructions-crypto

<a id="opIdcustody-get-deposit-instructions-crypto"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v1/wallets/deposit-instructions/crypto/{symbol}",
  {
    method: "GET",

    headers: headers
  }
)
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': {
  "type": "string"
}
}

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/wallets/deposit-instructions/crypto/{symbol}', headers = headers)

print(r.json())

```

`GET /v1/wallets/deposit-instructions/crypto/{symbol}`

_Get Deposit Instructions for Crypto_

Get deposit instructions, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

Please note that Custody endpoints utilize a non-multiplied asset format for
long decimal assets like SHIB and PEPE, ensuring consistency with real-world
asset representation. This differs from Trading endpoints, which use a
multiplied asset format, such as SHIB1M and PEPE1M. For more information, please
see
[help centre](https://bullishexchange.atlassian.net/wiki/spaces/BHC/pages/20807684/Understanding+Multiplied+Assets+PEPE1M+and+SHIB1M)

**Ratelimited:** `True` - see [custody limits](#tag--custody)

<h3 id="custody-get-deposit-instructions-crypto-parameters">Parameters</h3>

| Name          | In     | Type                                  | Required | Description                                                                                  |
| ------------- | ------ | ------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| Authorization | header | string                                | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token) |
| symbol        | path   | [CustodySymbol](#schemacustodysymbol) | true     | none                                                                                         |

> Example responses

> 200 Response

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "required": ["network", "symbol", "address"],
    "properties": {
      "network": {
        "allOf": [
          {
            "type": "string",
            "example": "ETH",
            "description": "the network of the native coin or token, e.g. BTC, ETH, SOL"
          }
        ]
      },
      "symbol": {
        "allOf": [
          {
            "type": "string",
            "example": "USDC",
            "description": "symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB"
          }
        ]
      },
      "memo": {
        "allOf": [
          {
            "type": "string",
            "example": "925891241",
            "description": "memo or destination tag used during deposit to help identify account to credit funds to"
          }
        ]
      },
      "address": {
        "allOf": [
          {
            "type": "string",
            "example": "0xb0a64d976972d87b0783eeb1ff88306cd1891f02",
            "description": "an address on the given network"
          }
        ]
      }
    },
    "example": {
      "network": "ETH",
      "symbol": "USDC",
      "address": "0xb0a64d976972d87b0783eeb1ff88306cd1891f02"
    }
  }
}
```

<h3 id="custody-get-deposit-instructions-crypto-responses">Responses</h3>

| Status | Meaning                                                                    | Description           | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | Inline |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None   |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None   |

<h3 id="custody-get-deposit-instructions-crypto-responseschema">Response Schema</h3>

Status Code **200**

| Name        | Type                                                                          | Required | Restrictions | Description                                                                             |
| ----------- | ----------------------------------------------------------------------------- | -------- | ------------ | --------------------------------------------------------------------------------------- |
| _anonymous_ | [[CustodyCryptoDepositInstructions](#schemacustodycryptodepositinstructions)] | false    | none         | none                                                                                    |
| » network   | [NetworkID](#schemanetworkid)                                                 | true     | none         | the network of the native coin or token, e.g. BTC, ETH, SOL                             |
| » symbol    | [CustodySymbol](#schemacustodysymbol)                                         | true     | none         | symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB                            |
| » memo      | [CustodyDepositMemo](#schemacustodydepositmemo)                               | false    | none         | memo or destination tag used during deposit to help identify account to credit funds to |
| » address   | [CustodyNetworkAddress](#schemacustodynetworkaddress)                         | true     | none         | an address on the given network                                                         |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
jwtTokenAuth
</aside>

## custody-get-withdrawal-instructions-crypto

<a id="opIdcustody-get-withdrawal-instructions-crypto"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v1/wallets/withdrawal-instructions/crypto/{symbol}",
  {
    method: "GET",

    headers: headers
  }
)
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': {
  "type": "string"
}
}

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/wallets/withdrawal-instructions/crypto/{symbol}', headers = headers)

print(r.json())

```

`GET /v1/wallets/withdrawal-instructions/crypto/{symbol}`

_Get Withdrawal Instructions for Crypto_

Get crypto withdrawal instructions, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header. Please note that all withdrawal addresses must be whitelisted via the
Bullish website before any digital asset withdrawals can be processed.

Please note that Custody endpoints utilize a non-multiplied asset format for
long decimal assets like SHIB and PEPE, ensuring consistency with real-world
asset representation. This differs from Trading endpoints, which use a
multiplied asset format, such as SHIB1M and PEPE1M. For more information, please
see
[help centre](https://bullishexchange.atlassian.net/wiki/spaces/BHC/pages/20807684/Understanding+Multiplied+Assets+PEPE1M+and+SHIB1M)

**Ratelimited:** `True` - see [custody limits](#tag--custody)

<h3 id="custody-get-withdrawal-instructions-crypto-parameters">Parameters</h3>

| Name          | In     | Type                                  | Required | Description                                                                                  |
| ------------- | ------ | ------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| Authorization | header | string                                | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token) |
| symbol        | path   | [CustodySymbol](#schemacustodysymbol) | true     | none                                                                                         |

> Example responses

> 200 Response

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "required": [
      "network",
      "symbol",
      "address",
      "fee",
      "label",
      "destinationId"
    ],
    "properties": {
      "network": {
        "allOf": [
          {
            "type": "string",
            "example": "ETH",
            "description": "the network of the native coin or token, e.g. BTC, ETH, SOL"
          }
        ]
      },
      "symbol": {
        "allOf": [
          {
            "type": "string",
            "example": "USDC",
            "description": "symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB"
          }
        ]
      },
      "address": {
        "allOf": [
          {
            "type": "string",
            "example": "0xb0a64d976972d87b0783eeb1ff88306cd1891f02",
            "description": "an address on the given network"
          }
        ]
      },
      "fee": {
        "allOf": [
          {
            "type": "string",
            "example": "3.00",
            "description": "withdrawal fee charged in units of symbol, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei)"
          }
        ]
      },
      "memo": {
        "allOf": [
          {
            "type": "string",
            "example": "MZAXEMRXA",
            "description": "memo or destination tag that will be used as a reference on transaction"
          }
        ]
      },
      "label": {
        "allOf": [
          {
            "type": "string",
            "example": "Our cold wallet",
            "description": "descriptive label of destination provided by user"
          }
        ]
      },
      "destinationId": {
        "allOf": [
          {
            "type": "string",
            "example": "1560ec0b406c0d909bb9f5f827dd6aa14a1f638884f33a2a3134878102e78038",
            "description": "destination id provided by bullish that uniquely identifies a whitelisted address or account"
          }
        ]
      }
    }
  }
}
```

<h3 id="custody-get-withdrawal-instructions-crypto-responses">Responses</h3>

| Status | Meaning                                                                    | Description           | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | Inline |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None   |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None   |

<h3 id="custody-get-withdrawal-instructions-crypto-responseschema">Response Schema</h3>

Status Code **200**

| Name            | Type                                                                                | Required | Restrictions | Description                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| _anonymous_     | [[CustodyCryptoWithdrawalInstructions](#schemacustodycryptowithdrawalinstructions)] | false    | none         | none                                                                                                        |
| » network       | [NetworkID](#schemanetworkid)                                                       | true     | none         | the network of the native coin or token, e.g. BTC, ETH, SOL                                                 |
| » symbol        | [CustodySymbol](#schemacustodysymbol)                                               | true     | none         | symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB                                                |
| » address       | [CustodyNetworkAddress](#schemacustodynetworkaddress)                               | true     | none         | an address on the given network                                                                             |
| » fee           | [CustodyWithdrawalFee](#schemacustodywithdrawalfee)                                 | true     | none         | withdrawal fee charged in units of symbol, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei) |
| » memo          | [CustodyWithdrawalMemo](#schemacustodywithdrawalmemo)                               | false    | none         | memo or destination tag that will be used as a reference on transaction                                     |
| » label         | [CustodyWithdrawalLabel](#schemacustodywithdrawallabel)                             | true     | none         | descriptive label of destination provided by user                                                           |
| » destinationId | [CustodyDestinationID](#schemacustodydestinationid)                                 | true     | none         | destination id provided by bullish that uniquely identifies a whitelisted address or account                |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
jwtTokenAuth
</aside>

## custody-get-deposit-instructions-fiat

<a id="opIdcustody-get-deposit-instructions-fiat"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v1/wallets/deposit-instructions/fiat/{symbol}",
  {
    method: "GET",

    headers: headers
  }
)
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': {
  "type": "string"
}
}

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/wallets/deposit-instructions/fiat/{symbol}', headers = headers)

print(r.json())

```

`GET /v1/wallets/deposit-instructions/fiat/{symbol}`

_Get Deposit Instructions for Fiat_

Get deposit instructions, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

**Ratelimited:** `True` - see [custody limits](#tag--custody)

<h3 id="custody-get-deposit-instructions-fiat-parameters">Parameters</h3>

| Name          | In     | Type                                | Required | Description                                                                                  |
| ------------- | ------ | ----------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| Authorization | header | string                              | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token) |
| symbol        | path   | [InstrumentId](#schemainstrumentid) | true     | none                                                                                         |

> Example responses

> 200 Response

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "network": {
        "type": "string",
        "example": "SWIFT",
        "description": "the network that the account belongs to and the transaction will be performed on SWIFT, ABA or SEPA"
      },
      "symbol": {
        "type": "string",
        "example": "USD",
        "description": "the currency associated with the account, e.g. USD, EUR"
      },
      "accountNumber": {
        "allOf": [
          {
            "type": "string",
            "description": "bank account number",
            "example": "9873481227"
          }
        ],
        "example": "5090022533",
        "description": "the Bullish account number, varies for SWIFT/ABA and SEPA"
      },
      "name": {
        "type": "string",
        "example": "Bullish (GI) Limited",
        "description": "official Bullish account holder name"
      },
      "physicalAddress": {
        "type": "string",
        "example": "26/F, The Centrium, 60 Wyndham Street, Central, Hong Kong",
        "description": "bullish entity's physical address for the bank account"
      },
      "memo": {
        "type": "string",
        "example": "8VZPKSGPA",
        "description": "client specific reference to identify which account desposits should be allocated to on the exhange"
      },
      "bank": {
        "allOf": [
          {
            "type": "object",
            "properties": {
              "name": {
                "allOf": [
                  {
                    "type": "string",
                    "example": "Silvergate Bank",
                    "description": "name of bank"
                  }
                ]
              },
              "physicalAddress": {
                "allOf": [
                  {
                    "type": "string",
                    "description": "physical location of bank",
                    "example": "4250 Executive Square Suite 300 La Jolla, CA 92037"
                  }
                ]
              },
              "routingCode": {
                "allOf": [
                  {
                    "type": "string",
                    "description": "routing code of bank",
                    "example": "322286803"
                  }
                ]
              }
            }
          }
        ]
      }
    }
  }
}
```

<h3 id="custody-get-deposit-instructions-fiat-responses">Responses</h3>

| Status | Meaning                                                                    | Description           | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | Inline |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None   |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None   |

<h3 id="custody-get-deposit-instructions-fiat-responseschema">Response Schema</h3>

Status Code **200**

| Name               | Type                                                                      | Required | Restrictions | Description                                                                                         |
| ------------------ | ------------------------------------------------------------------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------- |
| _anonymous_        | [[CustodyFiatDepositInstructions](#schemacustodyfiatdepositinstructions)] | false    | none         | none                                                                                                |
| » network          | string                                                                    | false    | none         | the network that the account belongs to and the transaction will be performed on SWIFT, ABA or SEPA |
| » symbol           | string                                                                    | false    | none         | the currency associated with the account, e.g. USD, EUR                                             |
| » accountNumber    | [CustodyBankAccountNumber](#schemacustodybankaccountnumber)               | false    | none         | the Bullish account number, varies for SWIFT/ABA and SEPA                                           |
| » name             | string                                                                    | false    | none         | official Bullish account holder name                                                                |
| » physicalAddress  | string                                                                    | false    | none         | bullish entity's physical address for the bank account                                              |
| » memo             | string                                                                    | false    | none         | client specific reference to identify which account desposits should be allocated to on the exhange |
| » bank             | [CustodyBankDetails](#schemacustodybankdetails)                           | false    | none         | none                                                                                                |
| »» name            | [CustodyBankName](#schemacustodybankname)                                 | false    | none         | name of bank                                                                                        |
| »» physicalAddress | [CustodyPhysicalBankAddress](#schemacustodyphysicalbankaddress)           | false    | none         | physical location of bank                                                                           |
| »» routingCode     | [CustodyBankRoutingCode](#schemacustodybankroutingcode)                   | false    | none         | routing code of bank                                                                                |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
jwtTokenAuth
</aside>

## custody-get-withdrawal-instructions-fiat

<a id="opIdcustody-get-withdrawal-instructions-fiat"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v1/wallets/withdrawal-instructions/fiat/{symbol}",
  {
    method: "GET",

    headers: headers
  }
)
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': {
  "type": "string"
}
}

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/wallets/withdrawal-instructions/fiat/{symbol}', headers = headers)

print(r.json())

```

`GET /v1/wallets/withdrawal-instructions/fiat/{symbol}`

_Get Withdrawal Instructions for Fiat_

Get withdrawal instructions added by the user, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header. Please note that before withdrawal destinations can be used for
withdrawing to, they must be whitelisted on the Bullish website.

**Ratelimited:** `True` - see [custody limits](#tag--custody)

<h3 id="custody-get-withdrawal-instructions-fiat-parameters">Parameters</h3>

| Name          | In     | Type                                          | Required | Description                                                                                  |
| ------------- | ------ | --------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| Authorization | header | string                                        | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token) |
| symbol        | path   | [CustodyFiatSymbol](#schemacustodyfiatsymbol) | true     | none                                                                                         |

> Example responses

> 200 Response

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "destinationId": {
        "allOf": [
          {
            "type": "string",
            "example": "1560ec0b406c0d909bb9f5f827dd6aa14a1f638884f33a2a3134878102e78038",
            "description": "destination id provided by bullish that uniquely identifies a whitelisted address or account"
          }
        ]
      },
      "accountNumber": {
        "allOf": [
          {
            "type": "string",
            "description": "bank account number",
            "example": "9873481227"
          }
        ]
      },
      "network": {
        "allOf": [
          {
            "type": "string",
            "description": "the fiat network, e.g. SWIFT, ABA or SEPA",
            "example": "SWIFT"
          }
        ]
      },
      "symbol": {
        "allOf": [
          {
            "type": "string",
            "example": "USD",
            "description": "symbol representing fiat currency, e.g. USD, EUR"
          }
        ]
      },
      "name": {
        "allOf": [
          {
            "type": "string",
            "example": "Silvergate Bank",
            "description": "name of bank"
          }
        ]
      },
      "physicalAddress": {
        "allOf": [
          {
            "type": "string",
            "description": "physical location of bank",
            "example": "4250 Executive Square Suite 300 La Jolla, CA 92037"
          }
        ]
      },
      "fee": {
        "allOf": [
          {
            "type": "string",
            "example": "3.00",
            "description": "withdrawal fee charged in units of symbol, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei)"
          }
        ]
      },
      "memo": {
        "allOf": [
          {
            "type": "string",
            "example": "MZAXEMRXA",
            "description": "memo or destination tag that will be used as a reference on transaction"
          }
        ]
      },
      "bank": {
        "allOf": [
          {
            "type": "object",
            "properties": {
              "name": {
                "allOf": [
                  {
                    "type": "string",
                    "example": "Silvergate Bank",
                    "description": "name of bank"
                  }
                ]
              },
              "physicalAddress": {
                "allOf": [
                  {
                    "type": "string",
                    "description": "physical location of bank",
                    "example": "4250 Executive Square Suite 300 La Jolla, CA 92037"
                  }
                ]
              },
              "routingCode": {
                "allOf": [
                  {
                    "type": "string",
                    "description": "routing code of bank",
                    "example": "322286803"
                  }
                ]
              }
            }
          }
        ]
      },
      "intermediaryBank": {
        "allOf": [
          {
            "type": "object",
            "properties": {
              "name": {
                "example": "Middle Bank",
                "allOf": [
                  {
                    "type": "string",
                    "example": "Silvergate Bank",
                    "description": "name of bank"
                  }
                ]
              },
              "physicalAddress": {
                "example": "523 Exchange Square, Canary Wharf, E14 2WA",
                "allOf": [
                  {
                    "type": "string",
                    "description": "physical location of bank",
                    "example": "4250 Executive Square Suite 300 La Jolla, CA 92037"
                  }
                ]
              },
              "routingCode": {
                "example": "321176234",
                "allOf": [
                  {
                    "type": "string",
                    "description": "routing code of bank",
                    "example": "322286803"
                  }
                ]
              }
            }
          }
        ]
      }
    }
  }
}
```

<h3 id="custody-get-withdrawal-instructions-fiat-responses">Responses</h3>

| Status | Meaning                                                                    | Description           | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | Inline |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None   |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None   |

<h3 id="custody-get-withdrawal-instructions-fiat-responseschema">Response Schema</h3>

Status Code **200**

| Name               | Type                                                                            | Required | Restrictions | Description                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| _anonymous_        | [[CustodyFiatWithdrawalInstructions](#schemacustodyfiatwithdrawalinstructions)] | false    | none         | none                                                                                                        |
| » destinationId    | [CustodyDestinationID](#schemacustodydestinationid)                             | false    | none         | destination id provided by bullish that uniquely identifies a whitelisted address or account                |
| » accountNumber    | [CustodyBankAccountNumber](#schemacustodybankaccountnumber)                     | false    | none         | bank account number                                                                                         |
| » network          | [CustodyBankNetworkID](#schemacustodybanknetworkid)                             | false    | none         | the fiat network, e.g. SWIFT, ABA or SEPA                                                                   |
| » symbol           | [CustodyFiatSymbol](#schemacustodyfiatsymbol)                                   | false    | none         | symbol representing fiat currency, e.g. USD, EUR                                                            |
| » name             | [CustodyBankName](#schemacustodybankname)                                       | false    | none         | name of bank                                                                                                |
| » physicalAddress  | [CustodyPhysicalBankAddress](#schemacustodyphysicalbankaddress)                 | false    | none         | physical location of bank                                                                                   |
| » fee              | [CustodyWithdrawalFee](#schemacustodywithdrawalfee)                             | false    | none         | withdrawal fee charged in units of symbol, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei) |
| » memo             | [CustodyWithdrawalMemo](#schemacustodywithdrawalmemo)                           | false    | none         | memo or destination tag that will be used as a reference on transaction                                     |
| » bank             | [CustodyBankDetails](#schemacustodybankdetails)                                 | false    | none         | none                                                                                                        |
| »» name            | [CustodyBankName](#schemacustodybankname)                                       | false    | none         | name of bank                                                                                                |
| »» physicalAddress | [CustodyPhysicalBankAddress](#schemacustodyphysicalbankaddress)                 | false    | none         | physical location of bank                                                                                   |
| »» routingCode     | [CustodyBankRoutingCode](#schemacustodybankroutingcode)                         | false    | none         | routing code of bank                                                                                        |
| » intermediaryBank | [CustodyBankIntermediateDetails](#schemacustodybankintermediatedetails)         | false    | none         | none                                                                                                        |
| »» name            | [CustodyBankName](#schemacustodybankname)                                       | false    | none         | name of bank                                                                                                |
| »» physicalAddress | [CustodyPhysicalBankAddress](#schemacustodyphysicalbankaddress)                 | false    | none         | physical location of bank                                                                                   |
| »» routingCode     | [CustodyBankRoutingCode](#schemacustodybankroutingcode)                         | false    | none         | routing code of bank                                                                                        |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
jwtTokenAuth
</aside>

## custody-withdrawal

<a id="opIdcustody-withdrawal"></a>

> Code samples

```javascript
const inputBody = '{
  "type": "object",
  "required": [
    "timestamp",
    "nonce",
    "authorizer",
    "command"
  ],
  "properties": {
    "timestamp": {
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "1621490985000",
          "description": "unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string"
        }
      ]
    },
    "nonce": {
      "type": "string",
      "description": "a UUID withdrawal nonce to protect against replay attacks",
      "example": "1628376611"
    },
    "authorizer": {
      "description": "JWT authorizer you obtain along with the [JWT token](#overview--generate-a-jwt-token)",
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "03E02367E8C900000500000000000000",
          "description": "JWT authorizer you obtain along with the [JWT token](#overview--generate-a-jwt-token)"
        }
      ]
    },
    "command": {
      "description": "withdrawal command",
      "allOf": [
        {
          "type": "object",
          "required": [
            "commandType",
            "destinationId",
            "symbol",
            "network",
            "quantity"
          ],
          "properties": {
            "commandType": {
              "description": "the command type, it must be 'V1Withdrawal'",
              "type": "string",
              "example": "V1Withdrawal"
            },
            "destinationId": {
              "allOf": [
                {
                  "type": "string",
                  "example": "1560ec0b406c0d909bb9f5f827dd6aa14a1f638884f33a2a3134878102e78038",
                  "description": "destination id provided by bullish that uniquely identifies a whitelisted address or account"
                }
              ]
            },
            "symbol": {
              "allOf": [
                {
                  "type": "string",
                  "example": "USDC",
                  "description": "symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB"
                }
              ]
            },
            "network": {
              "allOf": [
                {
                  "type": "string",
                  "example": "ETH",
                  "description": "the network of the native coin or token, e.g. BTC, ETH, SOL"
                }
              ]
            },
            "quantity": {
              "example": "100000.000001",
              "allOf": [
                {
                  "type": "string",
                  "description": "total quantity of symbol to withdraw including fee in units of symbol, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei) - quantity received will have fee subtracted.",
                  "example": "100000.00"
                }
              ]
            }
          }
        }
      ]
    }
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':{
  "type": "string"
},
  'BX-SIGNATURE':{
  "type": "string"
}
};

fetch('https://api.exchange.bullish.com/trading-api/v1/wallets/withdrawal',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': {
  "type": "string"
},
  'BX-SIGNATURE': {
  "type": "string"
}
}

r = requests.post('https://api.exchange.bullish.com/trading-api/v1/wallets/withdrawal', headers = headers)

print(r.json())

```

`POST /v1/wallets/withdrawal`

_Create Withdrawal_

Trigger a withdrawal, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

The `BX-SIGNATURE` header should be created by signing the request with an ECDSA
API Key as follows:

1. Construct a string that concatenates the following fields:
   - `timestamp` - current epoch milliseconds e.g. 1697008474031
   - `nonce` - a UUID identifier to protect against replay attacks e.g.
     255241a1-2cde-4954-87b1-13beef547960
   - `request method` - e.g. POST
   - `request path` - e.g. /trading-api/v1/wallets/withdrawal
   - `request body JSON string`, removing any spaces and newline characters
2. Hash the string using a SHA-256 hash function and sign the resulting
   hexdigest with your `<PRIVATE_KEY>`.
3. DER encode the signature, and BASE64 encode the DER encoded signature.

> **Bullish requires you to whitelist a withdrawal destination address before
> submitting a withdrawal request. You may view, approve, and manage your list
> of destination addresses in Account Settings on the Bullish website. If you
> attempt a withdrawal without first whitelisting an address in Account
> Settings, then the withdrawal attempt will fail.**

For a full example of using the withdrawal endpoint please see the
[Custody Withdrawal Example](https://github.com/bullish-exchange/api-examples/blob/master/custody/custody_withdrawal_ecdsa.py)

Please note that Custody endpoints utilize a non-multiplied asset format for
long decimal assets like SHIB and PEPE, ensuring consistency with real-world
asset representation. This differs from Trading endpoints, which use a
multiplied asset format, such as SHIB1M and PEPE1M. For more information, please
see
[help centre](https://bullishexchange.atlassian.net/wiki/spaces/BHC/pages/20807684/Understanding+Multiplied+Assets+PEPE1M+and+SHIB1M)

The currently supported precisions for withdrawal quantities are as follows.
Please note that fees are always specified in units of the symbol itself, not in
smaller denominations (e.g. BTC not Satoshi, ETH not Wei) :

| Symbol | Precision                                             | Remarks                                                                                                                                                                  |
| ------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| USD    | 2dp                                                   |                                                                                                                                                                          |
| BTC    | 8dp                                                   |                                                                                                                                                                          |
| DOGE   | 8dp                                                   |                                                                                                                                                                          |
| ETH    | 8dp                                                   |                                                                                                                                                                          |
| LTC    | 8dp                                                   |                                                                                                                                                                          |
| XRP    | 6dp                                                   |                                                                                                                                                                          |
| AAVE   | 8dp                                                   |                                                                                                                                                                          |
| CRV    | 8dp                                                   |                                                                                                                                                                          |
| LINK   | 8dp                                                   |                                                                                                                                                                          |
| MANA   | 8dp                                                   |                                                                                                                                                                          |
| MATIC  | 8dp                                                   |                                                                                                                                                                          |
| SUSHI  | 8dp                                                   |                                                                                                                                                                          |
| UNI    | 8dp                                                   |                                                                                                                                                                          |
| USDC   | 6dp                                                   |                                                                                                                                                                          |
| USDT   | 6dp                                                   |                                                                                                                                                                          |
| SHIB   | 2dp                                                   | Please ensure to use the non-multiplied asset format (e.g., SHIB, PEPE, BONK) when creating withdrawals, as Custody endpoints align with real-world asset representation |
| PEPE   | 2dp                                                   | Please ensure to use the non-multiplied asset format (e.g., SHIB, PEPE, BONK) when creating withdrawals, as Custody endpoints align with real-world asset representation |
| BONK   | Round to the nearest ten (e.g., 120 or 130, not 125). | Please ensure to use the non-multiplied asset format (e.g., SHIB, PEPE, BONK) when creating withdrawals, as Custody endpoints align with real-world asset representation |

**Ratelimited:** `True` - see [custody limits](#tag--custody)

> Body parameter

```json
{
  "type": "object",
  "required": ["timestamp", "nonce", "authorizer", "command"],
  "properties": {
    "timestamp": {
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "1621490985000",
          "description": "unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string"
        }
      ]
    },
    "nonce": {
      "type": "string",
      "description": "a UUID withdrawal nonce to protect against replay attacks",
      "example": "1628376611"
    },
    "authorizer": {
      "description": "JWT authorizer you obtain along with the [JWT token](#overview--generate-a-jwt-token)",
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "03E02367E8C900000500000000000000",
          "description": "JWT authorizer you obtain along with the [JWT token](#overview--generate-a-jwt-token)"
        }
      ]
    },
    "command": {
      "description": "withdrawal command",
      "allOf": [
        {
          "type": "object",
          "required": [
            "commandType",
            "destinationId",
            "symbol",
            "network",
            "quantity"
          ],
          "properties": {
            "commandType": {
              "description": "the command type, it must be 'V1Withdrawal'",
              "type": "string",
              "example": "V1Withdrawal"
            },
            "destinationId": {
              "allOf": [
                {
                  "type": "string",
                  "example": "1560ec0b406c0d909bb9f5f827dd6aa14a1f638884f33a2a3134878102e78038",
                  "description": "destination id provided by bullish that uniquely identifies a whitelisted address or account"
                }
              ]
            },
            "symbol": {
              "allOf": [
                {
                  "type": "string",
                  "example": "USDC",
                  "description": "symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB"
                }
              ]
            },
            "network": {
              "allOf": [
                {
                  "type": "string",
                  "example": "ETH",
                  "description": "the network of the native coin or token, e.g. BTC, ETH, SOL"
                }
              ]
            },
            "quantity": {
              "example": "100000.000001",
              "allOf": [
                {
                  "type": "string",
                  "description": "total quantity of symbol to withdraw including fee in units of symbol, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei) - quantity received will have fee subtracted.",
                  "example": "100000.00"
                }
              ]
            }
          }
        }
      ]
    }
  }
}
```

<h3 id="custody-withdrawal-parameters">Parameters</h3>

| Name          | In     | Type                                                                        | Required | Description                                                                                                                |
| ------------- | ------ | --------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| Authorization | header | string                                                                      | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token)                               |
| BX-SIGNATURE  | header | string                                                                      | true     | signature obtained using the [signing format](#overview--how-to-ensure-the-order-of-create-order-or-cancel-order-requests) |
| body          | body   | [CustodyApiEcdsaWithdrawalRequest](#schemacustodyapiecdsawithdrawalrequest) | true     | withdrawal request                                                                                                         |

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "statusReason": {
      "description": "status reason, describes why withdrawal challenge is in a specific state",
      "type": "string",
      "example": "Withdrawal accepted"
    },
    "statusReasonCode": {
      "description": "status reason code, see [details](#overview--error--rejection-codes)",
      "type": "integer",
      "example": 1001
    },
    "custodyTransactionId": {
      "allOf": [
        {
          "type": "string",
          "example": "DB:9e6304a08c9cc2a33e6bc6429a088eae2a6b940c8e312aede3a3780257b9b979",
          "description": "unique identifier for tracking a withdrawal during signing and in history"
        }
      ]
    }
  }
}
```

<h3 id="custody-withdrawal-responses">Responses</h3>

| Status | Meaning                                                                    | Description           | Schema                                                              |
| ------ | -------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | [CustodyApiWithdrawalResponse](#schemacustodyapiwithdrawalresponse) |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None                                                                |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None                                                                |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
jwtTokenAuth
</aside>
