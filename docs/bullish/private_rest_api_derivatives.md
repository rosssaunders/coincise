---
title: Bullish Trading API - Private REST API - Derivatives
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

<h1 id="bullish-trading-api">Bullish Trading API - Private REST API - Derivatives</h1>

> Scroll down for code samples, example requests and responses. Select a
> language for code samples from the tabs above or the mobile navigation menu.

<h1 id="bullish-trading-api-derivatives">derivatives</h1>

## get-derivatives-positions

<a id="opIdget-derivatives-positions"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch("https://api.exchange.bullish.com/trading-api/v1/derivatives-positions", {
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/derivatives-positions', headers = headers)

print(r.json())

```

`GET /v1/derivatives-positions`

_Get derivatives positions_

Get derivatives positions

<h3 id="get-derivatives-positions-parameters">Parameters</h3>

| Name             | In     | Type                                        | Required | Description                                                                                                                                                                                                  |
| ---------------- | ------ | ------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Authorization    | header | string                                      | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token)                                                                                                                 |
| tradingAccountId | query  | [TradingAccountId](#schematradingaccountid) | false    | Id of the trading account. `tradingAccountId` is mandatory in the query for users with multiple trading accounts. For users with a single trading account, it can be automatically retrieved from the login. |
| symbol           | query  | [MarketSymbol](#schemamarketsymbol)         | false    | none                                                                                                                                                                                                         |

> Example responses

> 200 Response

```json
{
  "type": "array",
  "items": {
    "description": "Derivatives Position of one market for the trading account",
    "type": "string",
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
      "symbol": {
        "example": "BTC-USDC-PERP",
        "allOf": [
          {
            "type": "string",
            "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
            "example": "BTCUSDC"
          }
        ]
      },
      "side": {
        "allOf": [
          {
            "type": "string",
            "example": "BUY",
            "enum": ["BUY", "SELL"]
          }
        ]
      },
      "quantity": {
        "description": "Current size of the  position [asset value](#overview--price-and-quantity-precision) format",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "notional": {
        "description": "Notional value of the current position, calculated using the mark price",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.0000"
          }
        ]
      },
      "entryNotional": {
        "description": "Notional value of the position, using the average entry price",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.0000"
          }
        ]
      },
      "mtmPnl": {
        "description": "Sum of all mark-to-market profits and losses plus profits and losses realised from trading, accumulated since the last settlement",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.0000"
          }
        ]
      },
      "reportedMtmPnl": {
        "description": "The profit/losses from the net price change since the last time the absolute quantity decreased. It is updated with every mark to market and is not updated during settlement or a position size increase",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.0000"
          }
        ]
      },
      "reportedFundingPnl": {
        "description": "Sum of all funding payments received  since the position was opened. This is updated every time funding is paid.",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.0000"
          }
        ]
      },
      "realizedPnl": {
        "description": "Total profits realized since the trading account first opened this position. This is only updated every time a position’s absolute quantity (aka size) is reduced.",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.0000"
          }
        ]
      },
      "settlementAssetSymbol": {
        "description": "Settlement Asset Symbol",
        "type": "string",
        "example": "USDC"
      },
      "createdAtDatetime": {
        "description": "Denotes the time the position was created by the exchange, ISO 8601 with millisecond as string",
        "allOf": [
          {
            "type": "string",
            "format": "date-time",
            "example": "2025-05-20T01:01:01.000Z",
            "description": "ISO 8601 with millisecond as string"
          }
        ]
      },
      "createdAtTimestamp": {
        "description": "Denotes the time the position was created by the exchange, number of milliseconds since EPOCH",
        "allOf": [
          {
            "type": "string",
            "format": "string",
            "example": "1621490985000",
            "description": "unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string"
          }
        ]
      },
      "updatedAtDatetime": {
        "description": "Denotes the time the position was updated by the exchange, ISO 8601 with millisecond as string",
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
        "description": "Denotes the time the position was updated by the exchange, number of milliseconds since EPOCH",
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

<h3 id="get-derivatives-positions-responses">Responses</h3>

| Status | Meaning                                                                    | Description           | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | Inline |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None   |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None   |

<h3 id="get-derivatives-positions-responseschema">Response Schema</h3>

Status Code **200**

| Name                    | Type                                                                | Required | Restrictions | Description                                                                                                                                                                                               |
| ----------------------- | ------------------------------------------------------------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _anonymous_             | [[DerivativesPositionResponse](#schemaderivativespositionresponse)] | false    | none         | [Derivatives Position of one market for the trading account]                                                                                                                                              |
| » tradingAccountId      | [TradingAccountId](#schematradingaccountid)                         | false    | none         | unique trading account ID                                                                                                                                                                                 |
| » symbol                | [MarketSymbol](#schemamarketsymbol)                                 | false    | none         | market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market                                                                                                                             |
| » side                  | [OrderSide](#schemaorderside)                                       | false    | none         | none                                                                                                                                                                                                      |
| » quantity              | [AssetValue](#schemaassetvalue)                                     | false    | none         | Current size of the position [asset value](#overview--price-and-quantity-precision) format                                                                                                                |
| » notional              | [UsdcValue](#schemausdcvalue)                                       | false    | none         | Notional value of the current position, calculated using the mark price                                                                                                                                   |
| » entryNotional         | [UsdcValue](#schemausdcvalue)                                       | false    | none         | Notional value of the position, using the average entry price                                                                                                                                             |
| » mtmPnl                | [UsdcValue](#schemausdcvalue)                                       | false    | none         | Sum of all mark-to-market profits and losses plus profits and losses realised from trading, accumulated since the last settlement                                                                         |
| » reportedMtmPnl        | [UsdcValue](#schemausdcvalue)                                       | false    | none         | The profit/losses from the net price change since the last time the absolute quantity decreased. It is updated with every mark to market and is not updated during settlement or a position size increase |
| » reportedFundingPnl    | [UsdcValue](#schemausdcvalue)                                       | false    | none         | Sum of all funding payments received since the position was opened. This is updated every time funding is paid.                                                                                           |
| » realizedPnl           | [UsdcValue](#schemausdcvalue)                                       | false    | none         | Total profits realized since the trading account first opened this position. This is only updated every time a position’s absolute quantity (aka size) is reduced.                                        |
| » settlementAssetSymbol | string                                                              | false    | none         | Settlement Asset Symbol                                                                                                                                                                                   |
| » createdAtDatetime     | [DateTime](#schemadatetime)(date-time)                              | false    | none         | Denotes the time the position was created by the exchange, ISO 8601 with millisecond as string                                                                                                            |
| » createdAtTimestamp    | [TimeStampAsString](#schematimestampasstring)(string)               | false    | none         | Denotes the time the position was created by the exchange, number of milliseconds since EPOCH                                                                                                             |
| » updatedAtDatetime     | [DateTime](#schemadatetime)(date-time)                              | false    | none         | Denotes the time the position was updated by the exchange, ISO 8601 with millisecond as string                                                                                                            |
| » updatedAtTimestamp    | [TimeStampAsString](#schematimestampasstring)(string)               | false    | none         | Denotes the time the position was updated by the exchange, number of milliseconds since EPOCH                                                                                                             |

#### Enumerated Values

| Property | Value |
| -------- | ----- |
| side     | BUY   |
| side     | SELL  |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
jwtTokenAuth
</aside>
