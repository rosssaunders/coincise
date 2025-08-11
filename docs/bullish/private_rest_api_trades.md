# Bullish Trading API - Private REST API - Trades

# trades

Authenticated APIs for reading trade data

## trade-get-trades

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v1/trades?tradingAccountId=111000000000001",
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/trades', params={
  'tradingAccountId': '111000000000001'
}, headers = headers)

print(r.json())

```

`GET /v1/trades`

_Get Trades_

Get a list of trades based on specified filters.

- requires [bearer token](#overview--add-authenticated-request-header) in
  authorization header
- Only the last 24 hours of data is available for querying
- [supports pagination](#overview--pagination-support)
- filtering on `createdAtDatetime`, `createdAtTimestamp` requires additional
  keywords, [see filtering support](#overview--filtering-support)

**Ratelimited:** `True`

### Parameters

| Name             | In     | Type                                        | Required | Description                                                                                  |
| ---------------- | ------ | ------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| Authorization    | header | string                                      | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token) |
| symbol           | query  | [MarketSymbol](#schemamarketsymbol)         | false    | none                                                                                         |
| orderId          | query  | [OrderID](#schemaorderid)                   | false    | unique order ID                                                                              |
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
      "tradeId",
      "orderId",
      "symbol",
      "price",
      "quantity",
      "quoteAmount",
      "baseFee",
      "quoteFee",
      "side",
      "isTaker",
      "tradeRebateAmount",
      "tradeRebateAssetSymbol",
      "createdAtTimestamp",
      "createdAtDatetime"
    ],
    "properties": {
      "tradeId": {
        "description": "unique trade ID",
        "allOf": [
          {
            "type": "string",
            "example": "100020000000000060"
          }
        ]
      },
      "orderId": {
        "description": "unique order ID",
        "allOf": [
          {
            "type": "string",
            "example": "297735387747975680"
          }
        ]
      },
      "symbol": {
        "description": "market symbol",
        "allOf": [
          {
            "type": "string",
            "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
            "example": "BTCUSDC"
          }
        ]
      },
      "price": {
        "description": "price, see [asset value](#overview--price-and-quantity-precision) format",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "quantity": {
        "description": "quantity, see [asset value](#overview--price-and-quantity-precision) format",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "quoteAmount": {
        "description": "quote quantity deducted from asset account, see [asset value](#overview--price-and-quantity-precision) format",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "baseFee": {
        "description": "base fee, see [asset value](#overview--price-and-quantity-precision) format",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "quoteFee": {
        "description": "quote fee, see [asset value](#overview--price-and-quantity-precision) format",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "side": {
        "description": "order side",
        "allOf": [
          {
            "type": "string",
            "description": "order side can have the following string values `\"BUY\"`, `\"SELL\"`",
            "example": "BUY"
          }
        ],
        "example": "BUY"
      },
      "isTaker": {
        "description": "denotes whether this is a taker's trade",
        "allOf": [
          {
            "type": "boolean",
            "format": "true or false",
            "example": true
          }
        ]
      },
      "tradeRebateAmount": {
        "description": "amount of rebate that is credited to the user as part of the trade.",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "tradeRebateAssetSymbol": {
        "description": "the symbol of the asset in which the rebate is paid",
        "allOf": [
          {
            "type": "string",
            "description": "asset symbol as denoted in the world",
            "example": "USDC"
          }
        ]
      },
      "createdAtDatetime": {
        "description": "denotes the time the trade was executed by the exchange, ISO 8601 with millisecond as string",
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
        "description": "denotes the time the trade was executed by the exchange",
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

### Responses

| Status | Meaning                                                                    | Description           | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | Inline |
| 401    | [Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)            | Not Authenticated     | None   |
| 403    | [Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)             | Access Forbidden      | None   |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None   |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None   |

### Response Schema

Status Code **200**

| Name                     | Type                                                  | Required | Restrictions | Description                                                                                                   |
| ------------------------ | ----------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------- |
| _anonymous_              | [[Trade](#schematrade)]                               | false    | none         | none                                                                                                          |
| » tradeId                | [TradeID](#schematradeid)                             | true     | none         | unique trade ID                                                                                               |
| » orderId                | [OrderID](#schemaorderid)                             | true     | none         | unique order ID                                                                                               |
| » symbol                 | [MarketSymbol](#schemamarketsymbol)                   | true     | none         | market symbol                                                                                                 |
| » price                  | [AssetValue](#schemaassetvalue)                       | true     | none         | price, see [asset value](#overview--price-and-quantity-precision) format                                      |
| » quantity               | [AssetValue](#schemaassetvalue)                       | true     | none         | quantity, see [asset value](#overview--price-and-quantity-precision) format                                   |
| » quoteAmount            | [AssetValue](#schemaassetvalue)                       | true     | none         | quote quantity deducted from asset account, see [asset value](#overview--price-and-quantity-precision) format |
| » baseFee                | [AssetValue](#schemaassetvalue)                       | true     | none         | base fee, see [asset value](#overview--price-and-quantity-precision) format                                   |
| » quoteFee               | [AssetValue](#schemaassetvalue)                       | true     | none         | quote fee, see [asset value](#overview--price-and-quantity-precision) format                                  |
| » side                   | [OrderSideAsString](#schemaordersideasstring)         | true     | none         | order side                                                                                                    |
| » isTaker                | [Boolean](#schemaboolean)(true or false)              | true     | none         | denotes whether this is a taker's trade                                                                       |
| » tradeRebateAmount      | [AssetValue](#schemaassetvalue)                       | true     | none         | amount of rebate that is credited to the user as part of the trade.                                           |
| » tradeRebateAssetSymbol | [QuoteAssetSymbol](#schemaquoteassetsymbol)           | true     | none         | the symbol of the asset in which the rebate is paid                                                           |
| » createdAtDatetime      | [DateTime](#schemadatetime)(date-time)                | true     | none         | denotes the time the trade was executed by the exchange, ISO 8601 with millisecond as string                  |
| » createdAtTimestamp     | [TimeStampAsString](#schematimestampasstring)(string) | true     | none         | denotes the time the trade was executed by the exchange                                                       |

> **Note:** To perform this operation, you must be authenticated by means of one
> of the following methods: jwtTokenAuth

## trade-get-trade-by-id

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v1/trades/{tradeId}?tradingAccountId=111000000000001",
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/trades/{tradeId}', params={
  'tradingAccountId': '111000000000001'
}, headers = headers)

print(r.json())

```

`GET /v1/trades/{tradeId}`

_Get Trade by ID_

Gets a trade by ID, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

**Ratelimited:** `True`

### Parameters

| Name             | In     | Type                                        | Required | Description                                                                                  |
| ---------------- | ------ | ------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| Authorization    | header | string                                      | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token) |
| tradeId          | path   | number                                      | true     | trade ID                                                                                     |
| tradingAccountId | query  | [TradingAccountId](#schematradingaccountid) | true     | Id of the trading account                                                                    |

> Example responses

> 200 Response

```json
{
  "type": "object",
  "required": [
    "tradeId",
    "orderId",
    "symbol",
    "price",
    "quantity",
    "quoteAmount",
    "baseFee",
    "quoteFee",
    "side",
    "isTaker",
    "tradeRebateAmount",
    "tradeRebateAssetSymbol",
    "createdAtTimestamp",
    "createdAtDatetime"
  ],
  "properties": {
    "tradeId": {
      "description": "unique trade ID",
      "allOf": [
        {
          "type": "string",
          "example": "100020000000000060"
        }
      ]
    },
    "orderId": {
      "description": "unique order ID",
      "allOf": [
        {
          "type": "string",
          "example": "297735387747975680"
        }
      ]
    },
    "symbol": {
      "description": "market symbol",
      "allOf": [
        {
          "type": "string",
          "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
          "example": "BTCUSDC"
        }
      ]
    },
    "price": {
      "description": "price, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "quantity": {
      "description": "quantity, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "quoteAmount": {
      "description": "quote quantity deducted from asset account, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "baseFee": {
      "description": "base fee, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "quoteFee": {
      "description": "quote fee, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "side": {
      "description": "order side",
      "allOf": [
        {
          "type": "string",
          "description": "order side can have the following string values `\"BUY\"`, `\"SELL\"`",
          "example": "BUY"
        }
      ],
      "example": "BUY"
    },
    "isTaker": {
      "description": "denotes whether this is a taker's trade",
      "allOf": [
        {
          "type": "boolean",
          "format": "true or false",
          "example": true
        }
      ]
    },
    "tradeRebateAmount": {
      "description": "amount of rebate that is credited to the user as part of the trade.",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "tradeRebateAssetSymbol": {
      "description": "the symbol of the asset in which the rebate is paid",
      "allOf": [
        {
          "type": "string",
          "description": "asset symbol as denoted in the world",
          "example": "USDC"
        }
      ]
    },
    "createdAtDatetime": {
      "description": "denotes the time the trade was executed by the exchange, ISO 8601 with millisecond as string",
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
      "description": "denotes the time the trade was executed by the exchange",
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

### Responses

| Status | Meaning                                                                    | Description           | Schema                |
| ------ | -------------------------------------------------------------------------- | --------------------- | --------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | [Trade](#schematrade) |
| 401    | [Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)            | Not Authenticated     | None                  |
| 403    | [Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)             | Access Forbidden      | None                  |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)             | Resource Not Found    | None                  |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None                  |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None                  |

> **Note:** To perform this operation, you must be authenticated by means of one
> of the following methods: jwtTokenAuth
