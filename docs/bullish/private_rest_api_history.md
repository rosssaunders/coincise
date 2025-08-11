# Bullish Trading API - Private REST API - History

# history

## trade-get-orders-history-v2

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v2/history/orders?tradingAccountId=111000000000001",
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v2/history/orders', params={
  'tradingAccountId': '111000000000001'
}, headers = headers)

print(r.json())

```

`GET /v2/history/orders`

_Get Historical Orders_

Retrieve a list of orders placed by a trading account with specified filters.

- Only the last 90 days of data is available for querying

This endpoint requires [authentication](#overview--generate-a-jwt-token) and
supports [pagination](#overview--pagination-support). To filter by
`createdAtDatetime` and `createdAtTimestamp`, additional parameters are
required. For detailed instructions, see the
[Filtering Support](#overview--filtering-support) section. Additionally, this
endpoint is subjected to rate limiting.

### Parameters

| Name                   | In     | Type                                        | Required | Description                                                                                  |
| ---------------------- | ------ | ------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| Authorization          | header | string                                      | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token) |
| symbol                 | query  | [MarketSymbol](#schemamarketsymbol)         | false    | none                                                                                         |
| orderId                | query  | [OrderID](#schemaorderid)                   | false    | none                                                                                         |
| clientOrderId          | query  | [OrderHandle](#schemaorderhandle)           | false    | Unique numeric (i64) identifier generated on the client side expressed as a string value     |
| side                   | query  | [OrderSide](#schemaorderside)               | false    | order side                                                                                   |
| status                 | query  | [OrderStatus](#schemaorderstatus)           | false    | order status                                                                                 |
| tradingAccountId       | query  | [TradingAccountId](#schematradingaccountid) | true     | Id of the trading account                                                                    |
| createdAtDatetime[gte] | query  | [DateTime](#schemadatetime)                 | false    | start timestamp of period, ISO 8601 with millisecond as string                               |
| createdAtDatetime[lte] | query  | [DateTime](#schemadatetime)                 | false    | end timestamp of period, ISO 8601 with millisecond as string                                 |

#### Enumerated Values

| Parameter | Value     |
| --------- | --------- |
| side      | BUY       |
| side      | SELL      |
| status    | OPEN      |
| status    | CLOSED    |
| status    | CANCELLED |
| status    | REJECTED  |

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
      "orderId",
      "clientOrderId",
      "symbol",
      "price",
      "stopPrice",
      "averageFillPrice",
      "allowBorrow",
      "quantity",
      "quantityFilled",
      "quoteAmount",
      "baseFee",
      "quoteFee",
      "isLiquidation",
      "side",
      "type",
      "timeInForce",
      "status",
      "statusReason",
      "statusReasonCode",
      "createdAtTimestamp",
      "createdAtDatetime"
    ],
    "properties": {
      "clientOrderId": {
        "allOf": [
          {
            "description": "Unique numeric (i64) identifier generated on the client side expressed as a string value",
            "type": "string",
            "example": "187"
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
      "averageFillPrice": {
        "description": "average fill price, see [asset value](#overview--price-and-quantity-precision) format",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "stopPrice": {
        "description": "stop price, see [asset value](#overview--price-and-quantity-precision) format",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "allowBorrow": {
        "description": "indicates if the order was allowed to borrow (does not indicate that borrowing occurred)",
        "type": "boolean",
        "example": false
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
      "quantityFilled": {
        "description": "quantity filled, see [asset value](#overview--price-and-quantity-precision) format",
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
        "description": "base fee rate that will be charged upon trade execution, see [asset value](#overview--price-and-quantity-precision) format",
        "example": "0.00100000",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "quoteFee": {
        "description": "quote fee rate that will be charged upon trade execution, see [asset value](#overview--price-and-quantity-precision) format",
        "example": "0.0010",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "borrowedBaseQuantity": {
        "description": "quantity borrowed, see [asset value](#overview--price-and-quantity-precision) format",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "borrowedQuoteQuantity": {
        "description": "quantity borrowed, see [asset value](#overview--price-and-quantity-precision) format",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "isLiquidation": {
        "description": "indicates if the order was executed as a liquidation order",
        "type": "boolean",
        "example": false
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
      "type": {
        "description": "order type",
        "allOf": [
          {
            "type": "string",
            "description": "order type can have the following string values `\"LMT\"`, `\"MKT\"`, `\"STOP_LIMIT\"`, `\"POST_ONLY\"`.",
            "example": "LMT"
          }
        ],
        "example": "LMT"
      },
      "timeInForce": {
        "description": "time in force",
        "allOf": [
          {
            "type": "string",
            "description": "time in force can have the following string values `\"GTC\"`, `\"FOK\"`, `\"IOC\"`, see [details](#overview--order-timeinforce)"
          }
        ],
        "example": "GTC"
      },
      "status": {
        "description": "order status",
        "allOf": [
          {
            "type": "string",
            "description": "order status can have the following string values `\"OPEN\"`, `\"CLOSED\"`, `\"CANCELLED\"`, `\"REJECTED\"`",
            "example": "OPEN"
          }
        ],
        "example": "OPEN"
      },
      "statusReason": {
        "description": "status reason, describes why the order is in a specific state",
        "type": "string",
        "example": "User cancelled"
      },
      "statusReasonCode": {
        "description": "status reason code, see [details](#overview--error--rejection-codes)",
        "type": "string",
        "example": "1002"
      },
      "createdAtDatetime": {
        "description": "denotes the time the order was ACK'd by the exchange, ISO 8601 with millisecond as string",
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
        "description": "denotes the time the order was ACK'd by the exchange",
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

| Name                    | Type                                                        | Required | Restrictions | Description                                                                                                                 |
| ----------------------- | ----------------------------------------------------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------- |
| _anonymous_             | [[Order](#schemaorder)]                                     | false    | none         | none                                                                                                                        |
| » clientOrderId         | [OrderHandle](#schemaorderhandle)                           | true     | none         | Unique numeric (i64) identifier generated on the client side expressed as a string value                                    |
| » orderId               | [OrderID](#schemaorderid)                                   | true     | none         | unique order ID                                                                                                             |
| » symbol                | [MarketSymbol](#schemamarketsymbol)                         | true     | none         | market symbol                                                                                                               |
| » price                 | [AssetValue](#schemaassetvalue)                             | true     | none         | price, see [asset value](#overview--price-and-quantity-precision) format                                                    |
| » averageFillPrice      | [AssetValue](#schemaassetvalue)                             | true     | none         | average fill price, see [asset value](#overview--price-and-quantity-precision) format                                       |
| » stopPrice             | [AssetValue](#schemaassetvalue)                             | true     | none         | stop price, see [asset value](#overview--price-and-quantity-precision) format                                               |
| » allowBorrow           | boolean                                                     | true     | none         | indicates if the order was allowed to borrow (does not indicate that borrowing occurred)                                    |
| » quantity              | [AssetValue](#schemaassetvalue)                             | true     | none         | quantity, see [asset value](#overview--price-and-quantity-precision) format                                                 |
| » quantityFilled        | [AssetValue](#schemaassetvalue)                             | true     | none         | quantity filled, see [asset value](#overview--price-and-quantity-precision) format                                          |
| » quoteAmount           | [AssetValue](#schemaassetvalue)                             | true     | none         | quote quantity deducted from asset account, see [asset value](#overview--price-and-quantity-precision) format               |
| » baseFee               | [AssetValue](#schemaassetvalue)                             | true     | none         | base fee rate that will be charged upon trade execution, see [asset value](#overview--price-and-quantity-precision) format  |
| » quoteFee              | [AssetValue](#schemaassetvalue)                             | true     | none         | quote fee rate that will be charged upon trade execution, see [asset value](#overview--price-and-quantity-precision) format |
| » borrowedBaseQuantity  | [AssetValue](#schemaassetvalue)                             | false    | none         | quantity borrowed, see [asset value](#overview--price-and-quantity-precision) format                                        |
| » borrowedQuoteQuantity | [AssetValue](#schemaassetvalue)                             | false    | none         | quantity borrowed, see [asset value](#overview--price-and-quantity-precision) format                                        |
| » isLiquidation         | boolean                                                     | true     | none         | indicates if the order was executed as a liquidation order                                                                  |
| » side                  | [OrderSideAsString](#schemaordersideasstring)               | true     | none         | order side                                                                                                                  |
| » type                  | [OrderTypeAsString](#schemaordertypeasstring)               | true     | none         | order type                                                                                                                  |
| » timeInForce           | [OrderTimeInForceAsString](#schemaordertimeinforceasstring) | true     | none         | time in force                                                                                                               |
| » status                | [OrderStatusAsString](#schemaorderstatusasstring)           | true     | none         | order status                                                                                                                |
| » statusReason          | string                                                      | true     | none         | status reason, describes why the order is in a specific state                                                               |
| » statusReasonCode      | string                                                      | true     | none         | status reason code, see [details](#overview--error--rejection-codes)                                                        |
| » createdAtDatetime     | [DateTime](#schemadatetime)(date-time)                      | true     | none         | denotes the time the order was ACK'd by the exchange, ISO 8601 with millisecond as string                                   |
| » createdAtTimestamp    | [TimeStampAsString](#schematimestampasstring)(string)       | true     | none         | denotes the time the order was ACK'd by the exchange                                                                        |

> **Note:** To perform this operation, you must be authenticated by means of one
> of the following methods: jwtTokenAuth

## trade-get-trades-history

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v1/history/trades?tradingAccountId=111000000000001",
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/history/trades', params={
  'tradingAccountId': '111000000000001'
}, headers = headers)

print(r.json())

```

`GET /v1/history/trades`

_Get Historical Trades_

Get a list of trades based on specified filters.

- requires [bearer token](#overview--add-authenticated-request-header) in
  authorization header
- Only the last 90 days of data is available for querying
- [supports pagination](#overview--pagination-support)
- filtering on `createdAtDatetime`, `createdAtTimestamp` requires additional
  keywords, [see filtering support](#overview--filtering-support)

**Ratelimited:** `True`

### Parameters

| Name                   | In     | Type                                        | Required | Description                                                                                  |
| ---------------------- | ------ | ------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| Authorization          | header | string                                      | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token) |
| symbol                 | query  | [MarketSymbol](#schemamarketsymbol)         | false    | none                                                                                         |
| orderId                | query  | [OrderID](#schemaorderid)                   | false    | unique order ID                                                                              |
| tradeId                | query  | [TradeID](#schematradeid)                   | false    | unique trade ID                                                                              |
| tradingAccountId       | query  | [TradingAccountId](#schematradingaccountid) | true     | Id of the trading account                                                                    |
| createdAtDatetime[gte] | query  | [DateTime](#schemadatetime)                 | false    | start timestamp of period, ISO 8601 with millisecond as string                               |
| createdAtDatetime[lte] | query  | [DateTime](#schemadatetime)                 | false    | end timestamp of period, ISO 8601 with millisecond as string                                 |

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

## get-derivatives-settlement-history

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v1/history/derivatives-settlement?settlementDatetime%5Bgte%5D=2025-05-20T01%3A01%3A01.000Z&settlementDatetime%5Blte%5D=2025-05-20T01%3A01%3A01.000Z",
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/history/derivatives-settlement', params={
  'settlementDatetime[gte]': '2025-05-20T01:01:01.000Z',  'settlementDatetime[lte]': '2025-05-20T01:01:01.000Z'
}, headers = headers)

print(r.json())

```

`GET /v1/history/derivatives-settlement`

_Get Historical Hourly Derivatives Settlement_

Get historical derivatives settlement.

- [supports pagination](#overview--pagination-support)
- filtering on `settlementDatetime` requires additional keywords,
  [see filtering support](#overview--filtering-support)
- Only the last 90 days of data is available for querying

### Parameters

| Name                    | In     | Type                                                      | Required | Description                                                                                                                                                                                                  |
| ----------------------- | ------ | --------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Authorization           | header | string                                                    | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token)                                                                                                                 |
| tradingAccountId        | query  | [TradingAccountId](#schematradingaccountid)               | false    | Id of the trading account. `tradingAccountId` is mandatory in the query for users with multiple trading accounts. For users with a single trading account, it can be automatically retrieved from the login. |
| symbol                  | query  | [DatedFutureMarketSymbol](#schemadatedfuturemarketsymbol) | false    | none                                                                                                                                                                                                         |
| settlementDatetime[gte] | query  | [DateTime](#schemadatetime)                               | true     | start timestamp of window, ISO 8601 with millisecond as string                                                                                                                                               |
| settlementDatetime[lte] | query  | [DateTime](#schemadatetime)                               | true     | end timestamp of window, ISO 8601 with millisecond as string                                                                                                                                                 |

> Example responses

> 200 Response

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 25,
  "items": {
    "description": "Derivatives Settlement of one market for the trading account",
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
            "description": "market symbol. Eg `BTC-USDC-PERP` for PERPETUAL and `BTC-USDC-20241201` for DATED FUTURE markets.",
            "example": "BTC-USDC-20241201"
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
      "settlementQuantity": {
        "description": "position size at the time of the settlement",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "deltaTradingQuantity": {
        "description": "the change in the position size from the account’s trading activities",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "mtmPnl": {
        "description": "mark to market profit (losses) accumulated since the last settlement",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.0000"
          }
        ]
      },
      "fundingPnl": {
        "description": "funding profits (losses) accumulated since the last settlement. Applicable for perpetuals only.",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.0000"
          }
        ]
      },
      "eventType": {
        "description": "derivatives position update event types",
        "type": "string",
        "example": "settlementUpdate"
      },
      "settlementMarkPrice": {
        "description": "market price at which the position was settled for this past cycle",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.0000"
          }
        ]
      },
      "settlementIndexPrice": {
        "description": "index price at which the position was settled for this past cycle",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.0000"
          }
        ]
      },
      "settlementFundingRate": {
        "description": "funding rate at which the position was settled for this past cycle. Applicable for perpetuals only.",
        "type": "string",
        "example": "10.0"
      },
      "settlementDatetime": {
        "description": "Denotes the time the position was settled by the exchange, ISO 8601 with millisecond as string",
        "allOf": [
          {
            "type": "string",
            "format": "date-time",
            "example": "2025-05-20T01:01:01.000Z",
            "description": "ISO 8601 with millisecond as string"
          }
        ]
      },
      "settlementTimestamp": {
        "description": "Denotes the time the position was settled by the exchange, number of milliseconds since EPOCH",
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
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None   |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None   |

### Response Schema

Status Code **200**

| Name                    | Type                                                                    | Required | Restrictions | Description                                                                                         |
| ----------------------- | ----------------------------------------------------------------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------- |
| _anonymous_             | [[DerivativesSettlementResponse](#schemaderivativessettlementresponse)] | false    | none         | [Derivatives Settlement of one market for the trading account]                                      |
| » tradingAccountId      | [TradingAccountId](#schematradingaccountid)                             | false    | none         | unique trading account ID                                                                           |
| » symbol                | [DatedFutureMarketSymbol](#schemadatedfuturemarketsymbol)               | false    | none         | market symbol. Eg `BTC-USDC-PERP` for PERPETUAL and `BTC-USDC-20241201` for DATED FUTURE markets.   |
| » side                  | [OrderSide](#schemaorderside)                                           | false    | none         | none                                                                                                |
| » settlementQuantity    | [AssetValue](#schemaassetvalue)                                         | false    | none         | position size at the time of the settlement                                                         |
| » deltaTradingQuantity  | [AssetValue](#schemaassetvalue)                                         | false    | none         | the change in the position size from the account’s trading activities                               |
| » mtmPnl                | [UsdcValue](#schemausdcvalue)                                           | false    | none         | mark to market profit (losses) accumulated since the last settlement                                |
| » fundingPnl            | [UsdcValue](#schemausdcvalue)                                           | false    | none         | funding profits (losses) accumulated since the last settlement. Applicable for perpetuals only.     |
| » eventType             | string                                                                  | false    | none         | derivatives position update event types                                                             |
| » settlementMarkPrice   | [UsdcValue](#schemausdcvalue)                                           | false    | none         | market price at which the position was settled for this past cycle                                  |
| » settlementIndexPrice  | [UsdcValue](#schemausdcvalue)                                           | false    | none         | index price at which the position was settled for this past cycle                                   |
| » settlementFundingRate | string                                                                  | false    | none         | funding rate at which the position was settled for this past cycle. Applicable for perpetuals only. |
| » settlementDatetime    | [DateTime](#schemadatetime)(date-time)                                  | false    | none         | Denotes the time the position was settled by the exchange, ISO 8601 with millisecond as string      |
| » settlementTimestamp   | [TimeStampAsString](#schematimestampasstring)(string)                   | false    | none         | Denotes the time the position was settled by the exchange, number of milliseconds since EPOCH       |

#### Enumerated Values

| Property | Value |
| -------- | ----- |
| side     | BUY   |
| side     | SELL  |

> **Note:** To perform this operation, you must be authenticated by means of one
> of the following methods: jwtTokenAuth

## get-transfer-history

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v1/history/transfer?createdAtDatetime%5Bgte%5D=2025-05-20T01%3A01%3A01.000Z&createdAtDatetime%5Blte%5D=2025-05-20T01%3A01%3A01.000Z",
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/history/transfer', params={
  'createdAtDatetime[gte]': '2025-05-20T01:01:01.000Z',  'createdAtDatetime[lte]': '2025-05-20T01:01:01.000Z'
}, headers = headers)

print(r.json())

```

`GET /v1/history/transfer`

_Get Historical Account Transfer_

Get historical transfers.

- [supports pagination](#overview--pagination-support)
- filtering on `createdAtDatetime` and `createdAtTimestamp` requires additional
  keywords, [see filtering support](#overview--filtering-support)
- Only the last 90 days of data is available for querying

### Parameters

| Name                   | In     | Type                                        | Required | Description                                                                                                                                                                                                  |
| ---------------------- | ------ | ------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Authorization          | header | string                                      | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token)                                                                                                                 |
| tradingAccountId       | query  | [TradingAccountId](#schematradingaccountid) | false    | Id of the trading account. `tradingAccountId` is mandatory in the query for users with multiple trading accounts. For users with a single trading account, it can be automatically retrieved from the login. |
| status                 | query  | string                                      | false    | Status of the transfer request. Defaults to `CLOSED`                                                                                                                                                         |
| requestId              | query  | string                                      | false    | Unique identifier of the transfer request                                                                                                                                                                    |
| assetSymbol            | query  | [AssetSymbol](#schemaassetsymbol)           | false    | Asset symbol of the transfer request                                                                                                                                                                         |
| createdAtDatetime[gte] | query  | [DateTime](#schemadatetime)                 | true     | start datetime of window, ISO 8601 with millisecond as string                                                                                                                                                |
| createdAtDatetime[lte] | query  | [DateTime](#schemadatetime)                 | true     | end datetime of window, ISO 8601 with millisecond as string                                                                                                                                                  |

> Example responses

> 200 Response

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 25,
  "items": {
    "description": "Get account transfer history",
    "type": "string",
    "properties": {
      "requestId": {
        "description": "unique identifier of the transfer request",
        "type": "string",
        "example": "1"
      },
      "toTradingAccountId": {
        "description": "recipient's trading account",
        "allOf": [
          {
            "description": "unique trading account ID",
            "type": "string",
            "example": "111000000000001"
          }
        ]
      },
      "fromTradingAccountId": {
        "description": "sender's trading account",
        "type": "string",
        "example": "121000000000001"
      },
      "assetSymbol": {
        "description": "asset currency of the transfer",
        "allOf": [
          {
            "type": "string",
            "description": "asset symbol as denoted in the world",
            "example": "BTC"
          }
        ]
      },
      "quantity": {
        "description": "transfer quantity",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "status": {
        "description": "transfer status [CLOSED/OPEN/REJECTED]",
        "type": "string",
        "example": "CLOSED"
      },
      "statusReasonCode": {
        "description": "status reason code",
        "type": "string",
        "example": "6002"
      },
      "statusReason": {
        "description": "readable status reason",
        "type": "string",
        "example": "Executed"
      },
      "createdAtTimestamp": {
        "allOf": [
          {
            "type": "string",
            "format": "string",
            "example": "1621490985000",
            "description": "unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string"
          }
        ]
      },
      "createdAtDatetime": {
        "allOf": [
          {
            "type": "string",
            "format": "date-time",
            "example": "2025-05-20T01:01:01.000Z",
            "description": "ISO 8601 with millisecond as string"
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
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None   |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None   |

### Response Schema

Status Code **200**

| Name                   | Type                                                              | Required | Restrictions | Description                                                                                       |
| ---------------------- | ----------------------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------- |
| _anonymous_            | [[SubAccountTransferResponse](#schemasubaccounttransferresponse)] | false    | none         | [Get account transfer history]                                                                    |
| » requestId            | string                                                            | false    | none         | unique identifier of the transfer request                                                         |
| » toTradingAccountId   | [TradingAccountId](#schematradingaccountid)                       | false    | none         | recipient's trading account                                                                       |
| » fromTradingAccountId | string                                                            | false    | none         | sender's trading account                                                                          |
| » assetSymbol          | [AssetSymbol](#schemaassetsymbol)                                 | false    | none         | asset currency of the transfer                                                                    |
| » quantity             | [AssetValue](#schemaassetvalue)                                   | false    | none         | transfer quantity                                                                                 |
| » status               | string                                                            | false    | none         | transfer status [CLOSED/OPEN/REJECTED]                                                            |
| » statusReasonCode     | string                                                            | false    | none         | status reason code                                                                                |
| » statusReason         | string                                                            | false    | none         | readable status reason                                                                            |
| » createdAtTimestamp   | [TimeStampAsString](#schematimestampasstring)(string)             | false    | none         | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string |
| » createdAtDatetime    | [DateTime](#schemadatetime)(date-time)                            | false    | none         | ISO 8601 with millisecond as string                                                               |

> **Note:** To perform this operation, you must be authenticated by means of one
> of the following methods: jwtTokenAuth

## market-data-get-historical-anonymous-trades-by-market-symbol

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v1/history/markets/{symbol}/trades",
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/history/markets/{symbol}/trades', headers = headers)

print(r.json())

```

`GET /v1/history/markets/{symbol}/trades`

_Get Historical Market Trades_

Get Historical Market Trades by Market Symbol. Supports querying of up to 7 days
of data at a time.

- [supports pagination](#overview--pagination-support)

**Ratelimited:** `False`

- Only the last 90 days of data is available for querying

### Parameters

| Name                   | In    | Type                                | Required | Description                                                    |
| ---------------------- | ----- | ----------------------------------- | -------- | -------------------------------------------------------------- |
| symbol                 | path  | [MarketSymbol](#schemamarketsymbol) | true     | symbol to get                                                  |
| createdAtDatetime[gte] | query | [DateTime](#schemadatetime)         | false    | start timestamp of period, ISO 8601 with millisecond as string |
| createdAtDatetime[lte] | query | [DateTime](#schemadatetime)         | false    | end timestamp of period, ISO 8601 with millisecond as string   |

> Example responses

> 200 Response

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 25,
  "items": {
    "type": "object",
    "required": [
      "tradeId",
      "symbol",
      "price",
      "quantity",
      "side",
      "isTaker",
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
        "description": "price",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "quantity": {
        "description": "quantity",
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
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)             | Resource Not Found    | None   |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None   |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None   |

### Response Schema

Status Code **200**

| Name                 | Type                                                    | Required | Restrictions | Description                                                                                  |
| -------------------- | ------------------------------------------------------- | -------- | ------------ | -------------------------------------------------------------------------------------------- |
| _anonymous_          | [[ObfuscatedTradeWithId](#schemaobfuscatedtradewithid)] | false    | none         | none                                                                                         |
| » tradeId            | [TradeID](#schematradeid)                               | true     | none         | unique trade ID                                                                              |
| » symbol             | [MarketSymbol](#schemamarketsymbol)                     | true     | none         | market symbol                                                                                |
| » price              | [AssetValue](#schemaassetvalue)                         | true     | none         | price                                                                                        |
| » quantity           | [AssetValue](#schemaassetvalue)                         | true     | none         | quantity                                                                                     |
| » side               | [OrderSideAsString](#schemaordersideasstring)           | true     | none         | order side                                                                                   |
| » isTaker            | [Boolean](#schemaboolean)(true or false)                | true     | none         | denotes whether this is a taker's trade                                                      |
| » createdAtDatetime  | [DateTime](#schemadatetime)(date-time)                  | true     | none         | denotes the time the trade was executed by the exchange, ISO 8601 with millisecond as string |
| » createdAtTimestamp | [TimeStampAsString](#schematimestampasstring)(string)   | true     | none         | denotes the time the trade was executed by the exchange                                      |

> **Note:** This operation does not require authentication

## market-data-get-funding-rate-history-by-market-symbol

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v1/history/markets/{symbol}/funding-rate",
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/history/markets/{symbol}/funding-rate', headers = headers)

print(r.json())

```

`GET /v1/history/markets/{symbol}/funding-rate`

_Get Historical Funding Rate_

Get historical hourly funding rate for the requested perpetual market

- [supports pagination](#overview--pagination-support)
- Only the last 90 days of data is available for querying

### Parameters

| Name                   | In    | Type                                        | Required | Description                                                    |
| ---------------------- | ----- | ------------------------------------------- | -------- | -------------------------------------------------------------- |
| symbol                 | path  | [PerpMarketSymbol](#schemaperpmarketsymbol) | true     | symbol to get                                                  |
| updatedAtDatetime[gte] | query | [DateTime](#schemadatetime)                 | false    | start timestamp of period, ISO 8601 with millisecond as string |
| updatedAtDatetime[lte] | query | [DateTime](#schemadatetime)                 | false    | end timestamp of period, ISO 8601 with millisecond as string   |

> Example responses

> 200 Response

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 100,
  "items": {
    "description": "Hourly Funding Rate History of one market",
    "type": "array",
    "properties": {
      "fundingRate": {
        "description": "funding rate for this hour",
        "type": "string",
        "example": "0.1"
      },
      "updatedAtDatetime": {
        "description": "date time of the last funding rate update for the hour",
        "type": "string",
        "example": "2024-09-16T12:59:59.000Z"
      }
    }
  }
}
```

### Responses

| Status | Meaning                                                                    | Description             | Schema |
| ------ | -------------------------------------------------------------------------- | ----------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                      | Inline |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)           | Bad Request             | None   |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)             | Market Symbol Not Found | None   |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests       | None   |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error   | None   |

### Response Schema

Status Code **200**

| Name                | Type                                                              | Required | Restrictions | Description                                            |
| ------------------- | ----------------------------------------------------------------- | -------- | ------------ | ------------------------------------------------------ |
| _anonymous_         | [[FundingRateHistoryResponse](#schemafundingratehistoryresponse)] | false    | none         | [Hourly Funding Rate History of one market]            |
| » fundingRate       | string                                                            | false    | none         | funding rate for this hour                             |
| » updatedAtDatetime | string                                                            | false    | none         | date time of the last funding rate update for the hour |

> **Note:** This operation does not require authentication

## market-data-get-historical-borrow-interest

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v1/history/borrow-interest?assetSymbol=BTC&createdAtDatetime%5Bgte%5D=2025-05-20T01%3A01%3A01.000Z&createdAtDatetime%5Blte%5D=2025-05-20T01%3A01%3A01.000Z",
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/history/borrow-interest', params={
  'assetSymbol': 'BTC',  'createdAtDatetime[gte]': '2025-05-20T01:01:01.000Z',  'createdAtDatetime[lte]': '2025-05-20T01:01:01.000Z'
}, headers = headers)

print(r.json())

```

`GET /v1/history/borrow-interest`

_Get Historical Hourly Borrow Interest_

Get Historical Hourly Borrow Interest. Each entry denotes the hourly quantities
for the specific asset. Total borrowed quantity is inclusive of interest.
`interest = totalBorrowedQuantity - borrowedQuantity` which denotes the interest
charged in the particular hour for the asset.

- [supports pagination](#overview--pagination-support)
- filtering `createdAtDatetime`, `createdAtTimestamp` requires additional
  keywords, [see filtering support](#overview--filtering-support)
- Only the last 90 days of data is available for querying

**Ratelimited:** `True`

### Parameters

| Name                   | In     | Type                                        | Required | Description                                                                                                                                                                                                  |
| ---------------------- | ------ | ------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Authorization          | header | string                                      | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token)                                                                                                                 |
| tradingAccountId       | query  | [TradingAccountId](#schematradingaccountid) | false    | Id of the trading account. `tradingAccountId` is mandatory in the query for users with multiple trading accounts. For users with a single trading account, it can be automatically retrieved from the login. |
| assetSymbol            | query  | [AssetSymbol](#schemaassetsymbol)           | true     | none                                                                                                                                                                                                         |
| createdAtDatetime[gte] | query  | [DateTime](#schemadatetime)                 | true     | start timestamp of period, ISO 8601 with millisecond as string                                                                                                                                               |
| createdAtDatetime[lte] | query  | [DateTime](#schemadatetime)                 | true     | end timestamp of period, ISO 8601 with millisecond as string                                                                                                                                                 |

> Example responses

> 200 Response

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 25,
  "items": {
    "type": "object",
    "required": [
      "assetId",
      "assetSymbol",
      "borrowedQuantity",
      "totalBorrowedQuantity",
      "createdAtDatetime",
      "createdAtTimestamp"
    ],
    "properties": {
      "assetId": {
        "description": "unique asset ID",
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
      "borrowedQuantity": {
        "description": "the principal borrowed quantity",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "totalBorrowedQuantity": {
        "description": "the sum of the principal borrowed quantity and the interest charged",
        "allOf": [
          {
            "description": "see [asset value](#overview--price-and-quantity-precision) format",
            "type": "string",
            "example": "1.00000000"
          }
        ]
      },
      "createdAtDatetime": {
        "description": "denotes the hour in which the principal quantity was borrowed or when the interest was charged, ISO 8601 with millisecond as string",
        "type": "string",
        "format": "date-time",
        "example": "2020-08-21T08:00:00.000Z"
      },
      "createdAtTimestamp": {
        "description": "denotes the hour in which the principal quantity was borrowed or when the interest was charged",
        "type": "string",
        "format": "string",
        "example": "1621490985000"
      }
    }
  }
}
```

### Responses

| Status | Meaning                                                                    | Description           | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | Inline |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)             | Resource Not Found    | None   |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None   |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None   |

### Response Schema

Status Code **200**

| Name                    | Type                                      | Required | Restrictions | Description                                                                                                                         |
| ----------------------- | ----------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| _anonymous_             | [[BorrowInterest](#schemaborrowinterest)] | false    | none         | none                                                                                                                                |
| » assetId               | [AssetID](#schemaassetid)                 | true     | none         | unique asset ID                                                                                                                     |
| » assetSymbol           | [AssetSymbol](#schemaassetsymbol)         | true     | none         | asset symbol                                                                                                                        |
| » borrowedQuantity      | [AssetValue](#schemaassetvalue)           | true     | none         | the principal borrowed quantity                                                                                                     |
| » totalBorrowedQuantity | [AssetValue](#schemaassetvalue)           | true     | none         | the sum of the principal borrowed quantity and the interest charged                                                                 |
| » createdAtDatetime     | string(date-time)                         | true     | none         | denotes the hour in which the principal quantity was borrowed or when the interest was charged, ISO 8601 with millisecond as string |
| » createdAtTimestamp    | string(string)                            | true     | none         | denotes the hour in which the principal quantity was borrowed or when the interest was charged                                      |

> **Note:** To perform this operation, you must be authenticated by means of one
> of the following methods: jwtTokenAuth
