---
title: Bullish Trading API - Private REST API - Accounts
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

<h1 id="bullish-trading-api">Bullish Trading API - Private REST API - Accounts</h1>

> Scroll down for code samples, example requests and responses. Select a
> language for code samples from the tabs above or the mobile navigation menu.

<h1 id="bullish-trading-api-accounts">accounts</h1>

Authenticated APIs for reading account data

## user-get-asset-accounts

<a id="opIduser-get-asset-accounts"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v1/accounts/asset?tradingAccountId=111000000000001",
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/accounts/asset', params={
  'tradingAccountId': '111000000000001'
}, headers = headers)

print(r.json())

```

`GET /v1/accounts/asset`

_Get Asset Accounts_

Gets the asset accounts, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

**Ratelimited:** `True`

<h3 id="user-get-asset-accounts-parameters">Parameters</h3>

| Name             | In     | Type                                        | Required | Description                                                                                  |
| ---------------- | ------ | ------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| Authorization    | header | string                                      | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token) |
| tradingAccountId | query  | [TradingAccountId](#schematradingaccountid) | true     | Id of the trading account                                                                    |

> Example responses

> 200 Response

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 10,
  "items": {
    "type": "object",
    "required": [
      "tradingAccountId",
      "assetId",
      "assetSymbol",
      "availableQuantity",
      "borrowedQuantity",
      "lockedQuantity",
      "loanedQuantity",
      "updatedAtDatetime",
      "updatedAtTimestamp"
    ],
    "properties": {
      "tradingAccountId": {
        "allOf": [
          {
            "description": "unique trading account ID",
            "type": "string",
            "example": "111000000000001"
          }
        ]
      },
      "assetId": {
        "description": "asset ID",
        "allOf": [
          {
            "type": "string",
            "description": "unique asset ID",
            "example": "1"
          }
        ]
      },
      "assetSymbol": {
        "description": "asset symbol",
        "allOf": [
          {
            "type": "string",
            "description": "asset symbol as denoted in the world",
            "example": "BTC"
          }
        ]
      },
      "availableQuantity": {
        "description": "the assets that are available to use on the account, see [asset value](#overview--price-and-quantity-precision) format",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "borrowedQuantity": {
        "description": "the assets on the account that are borrowed, see [asset value](#overview--price-and-quantity-precision) format",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "lockedQuantity": {
        "description": "the assets on the account that are locked in orders, loans and AMM instructions, see [asset value](#overview--price-and-quantity-precision) format",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "loanedQuantity": {
        "description": "the assets on the account that are being loaned, see [asset value](#overview--price-and-quantity-precision) format",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "updatedAtDatetime": {
        "description": "denotes the time the AMM instruction was updated by the exchange, ISO 8601 with millisecond as string",
        "allOf": [
          {
            "type": "string",
            "format": "date-time",
            "example": "2025-05-20T01:01:01.000Z",
            "description": "ISO 8601 with millisecond as string"
          }
        ]
      },
      "updatedAtTimestamp": {
        "description": "denotes the time the AMM instruction was updated by the exchange",
        "allOf": [
          {
            "type": "string",
            "format": "string",
            "example": "1621490985000",
            "description": "unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string"
          }
        ]
      }
    }
  }
}
```

<h3 id="user-get-asset-accounts-responses">Responses</h3>

| Status | Meaning                                                                    | Description           | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | Inline |
| 401    | [Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)            | Not Authenticated     | None   |
| 403    | [Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)             | Access Forbidden      | None   |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None   |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None   |

<h3 id="user-get-asset-accounts-responseschema">Response Schema</h3>

Status Code **200**

| Name                 | Type                                                  | Required | Restrictions | Description                                                                                                                                        |
| -------------------- | ----------------------------------------------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| _anonymous_          | [[AssetAccount](#schemaassetaccount)]                 | false    | none         | none                                                                                                                                               |
| » tradingAccountId   | [TradingAccountId](#schematradingaccountid)           | true     | none         | unique trading account ID                                                                                                                          |
| » assetId            | [AssetID](#schemaassetid)                             | true     | none         | asset ID                                                                                                                                           |
| » assetSymbol        | [AssetSymbol](#schemaassetsymbol)                     | true     | none         | asset symbol                                                                                                                                       |
| » availableQuantity  | [AssetValue](#schemaassetvalue)                       | true     | none         | the assets that are available to use on the account, see [asset value](#overview--price-and-quantity-precision) format                             |
| » borrowedQuantity   | [AssetValue](#schemaassetvalue)                       | true     | none         | the assets on the account that are borrowed, see [asset value](#overview--price-and-quantity-precision) format                                     |
| » lockedQuantity     | [AssetValue](#schemaassetvalue)                       | true     | none         | the assets on the account that are locked in orders, loans and AMM instructions, see [asset value](#overview--price-and-quantity-precision) format |
| » loanedQuantity     | [AssetValue](#schemaassetvalue)                       | true     | none         | the assets on the account that are being loaned, see [asset value](#overview--price-and-quantity-precision) format                                 |
| » updatedAtDatetime  | [DateTime](#schemadatetime)(date-time)                | true     | none         | denotes the time the AMM instruction was updated by the exchange, ISO 8601 with millisecond as string                                              |
| » updatedAtTimestamp | [TimeStampAsString](#schematimestampasstring)(string) | true     | none         | denotes the time the AMM instruction was updated by the exchange                                                                                   |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
jwtTokenAuth
</aside>

## user-get-asset-account-by-symbol

<a id="opIduser-get-asset-account-by-symbol"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v1/accounts/asset/{symbol}?tradingAccountId=111000000000001",
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/accounts/asset/{symbol}', params={
  'tradingAccountId': '111000000000001'
}, headers = headers)

print(r.json())

```

`GET /v1/accounts/asset/{symbol}`

_Get Asset Account by Symbol_

Gets the asset account by symbol, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

**Ratelimited:** `True`

<h3 id="user-get-asset-account-by-symbol-parameters">Parameters</h3>

| Name             | In     | Type                                        | Required | Description                                                                                  |
| ---------------- | ------ | ------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| Authorization    | header | string                                      | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token) |
| symbol           | path   | [AssetSymbol](#schemaassetsymbol)           | true     | none                                                                                         |
| tradingAccountId | query  | [TradingAccountId](#schematradingaccountid) | true     | Id of the trading account                                                                    |

> Example responses

> 200 Response

```json
{
  "type": "object",
  "required": [
    "tradingAccountId",
    "assetId",
    "assetSymbol",
    "availableQuantity",
    "borrowedQuantity",
    "lockedQuantity",
    "loanedQuantity",
    "updatedAtDatetime",
    "updatedAtTimestamp"
  ],
  "properties": {
    "tradingAccountId": {
      "allOf": [
        {
          "description": "unique trading account ID",
          "type": "string",
          "example": "111000000000001"
        }
      ]
    },
    "assetId": {
      "description": "asset ID",
      "allOf": [
        {
          "type": "string",
          "description": "unique asset ID",
          "example": "1"
        }
      ]
    },
    "assetSymbol": {
      "description": "asset symbol",
      "allOf": [
        {
          "type": "string",
          "description": "asset symbol as denoted in the world",
          "example": "BTC"
        }
      ]
    },
    "availableQuantity": {
      "description": "the assets that are available to use on the account, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "borrowedQuantity": {
      "description": "the assets on the account that are borrowed, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "lockedQuantity": {
      "description": "the assets on the account that are locked in orders, loans and AMM instructions, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "loanedQuantity": {
      "description": "the assets on the account that are being loaned, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "updatedAtDatetime": {
      "description": "denotes the time the AMM instruction was updated by the exchange, ISO 8601 with millisecond as string",
      "allOf": [
        {
          "type": "string",
          "format": "date-time",
          "example": "2025-05-20T01:01:01.000Z",
          "description": "ISO 8601 with millisecond as string"
        }
      ]
    },
    "updatedAtTimestamp": {
      "description": "denotes the time the AMM instruction was updated by the exchange",
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "1621490985000",
          "description": "unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string"
        }
      ]
    }
  }
}
```

<h3 id="user-get-asset-account-by-symbol-responses">Responses</h3>

| Status | Meaning                                                                    | Description           | Schema                              |
| ------ | -------------------------------------------------------------------------- | --------------------- | ----------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | [AssetAccount](#schemaassetaccount) |
| 401    | [Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)            | Not Authenticated     | None                                |
| 403    | [Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)             | Access Forbidden      | None                                |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)             | Resource Not Found    | None                                |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None                                |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None                                |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
jwtTokenAuth
</aside>
