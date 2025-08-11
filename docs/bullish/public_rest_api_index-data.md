---
title: Bullish Trading API - Public REST API - Index Data
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

<h1 id="bullish-trading-api">Bullish Trading API - Public REST API - Index Data</h1>

> Scroll down for code samples, example requests and responses. Select a
> language for code samples from the tabs above or the mobile navigation menu.

<h1 id="bullish-trading-api-index-data">index-data</h1>

## get-index-prices

<a id="opIdget-index-prices"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("https://api.exchange.bullish.com/trading-api/v1/index-prices", {
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
  'Accept': 'application/json'
}

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/index-prices', headers = headers)

print(r.json())

```

`GET /v1/index-prices`

_Get Index Prices_

Retrieves the index price of all supported assets

> Example responses

> 200 Response

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "required": [
      "assetSymbol",
      "price",
      "updatedAtDatetime",
      "updatedAtTimestamp"
    ],
    "properties": {
      "assetSymbol": {
        "description": "Asset symbol",
        "allOf": [
          {
            "type": "string",
            "description": "asset symbol as denoted in the world",
            "example": "BTC"
          }
        ]
      },
      "price": {
        "description": "Asset price in USD",
        "example": "66100.0000",
        "type": "string"
      },
      "updatedAtDatetime": {
        "description": "Date and time when the index price is updated",
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
        "description": "Timestamp when the index price is updated",
        "allOf": [
          {
            "type": "string",
            "format": "int64",
            "example": "1621490985000",
            "description": "number of milliseconds since EPOCH as string"
          }
        ]
      }
    }
  }
}
```

<h3 id="get-index-prices-responses">Responses</h3>

| Status | Meaning                                                                    | Description           | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | Inline |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None   |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None   |

<h3 id="get-index-prices-responseschema">Response Schema</h3>

Status Code **200**

| Name                 | Type                                   | Required | Restrictions | Description                                   |
| -------------------- | -------------------------------------- | -------- | ------------ | --------------------------------------------- |
| _anonymous_          | [[IndexPrice](#schemaindexprice)]      | false    | none         | none                                          |
| » assetSymbol        | [AssetSymbol](#schemaassetsymbol)      | true     | none         | Asset symbol                                  |
| » price              | string                                 | true     | none         | Asset price in USD                            |
| » updatedAtDatetime  | [DateTime](#schemadatetime)(date-time) | true     | none         | Date and time when the index price is updated |
| » updatedAtTimestamp | [TimeStamp](#schematimestamp)(int64)   | true     | none         | Timestamp when the index price is updated     |

<aside class="success">
This operation does not require authentication
</aside>

## get-index-price-by-symbol

<a id="opIdget-index-price-by-symbol"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v1/index-prices/{assetSymbol}",
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
  'Accept': 'application/json'
}

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/index-prices/{assetSymbol}', headers = headers)

print(r.json())

```

`GET /v1/index-prices/{assetSymbol}`

_Get Index Price by Asset Symbol_

Retrieves the index price of a specified asset

<h3 id="get-index-price-by-symbol-parameters">Parameters</h3>

| Name        | In   | Type                              | Required | Description |
| ----------- | ---- | --------------------------------- | -------- | ----------- |
| assetSymbol | path | [AssetSymbol](#schemaassetsymbol) | true     | none        |

> Example responses

> 200 Response

```json
{
  "type": "object",
  "required": [
    "assetSymbol",
    "price",
    "updatedAtDatetime",
    "updatedAtTimestamp"
  ],
  "properties": {
    "assetSymbol": {
      "description": "Asset symbol",
      "allOf": [
        {
          "type": "string",
          "description": "asset symbol as denoted in the world",
          "example": "BTC"
        }
      ]
    },
    "price": {
      "description": "Asset price in USD",
      "example": "66100.0000",
      "type": "string"
    },
    "updatedAtDatetime": {
      "description": "Date and time when the index price is updated",
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
      "description": "Timestamp when the index price is updated",
      "allOf": [
        {
          "type": "string",
          "format": "int64",
          "example": "1621490985000",
          "description": "number of milliseconds since EPOCH as string"
        }
      ]
    }
  }
}
```

<h3 id="get-index-price-by-symbol-responses">Responses</h3>

| Status | Meaning                                                                    | Description           | Schema                          |
| ------ | -------------------------------------------------------------------------- | --------------------- | ------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | [IndexPrice](#schemaindexprice) |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)             | Not found             | None                            |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None                            |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None                            |

<aside class="success">
This operation does not require authentication
</aside>
