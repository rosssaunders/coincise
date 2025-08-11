# Bullish Trading API - Private REST API - Orders

# orders

Authenticated APIs for interacting with orders

## trade-get-orders-v2

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v2/orders?tradingAccountId=111000000000001",
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v2/orders', params={
  'tradingAccountId': '111000000000001'
}, headers = headers)

print(r.json())

```

`GET /v2/orders`

_Get Orders_

Retrieve a list of orders placed by a trading account with specified filters.

- Only the last 24 hours of data is available for querying

This endpoint requires [authentication](#overview--generate-a-jwt-token) and
supports [pagination](#overview--pagination-support). To filter by
`createdAtDatetime` and `createdAtTimestamp`, additional parameters are
required. For detailed instructions, see the
[Filtering Support](#overview--filtering-support) section. Additionally, this
endpoint is subjected to rate limiting.

### Parameters

| Name             | In     | Type                                        | Required | Description                                                                                  |
| ---------------- | ------ | ------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| Authorization    | header | string                                      | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token) |
| symbol           | query  | [MarketSymbol](#schemamarketsymbol)         | false    | none                                                                                         |
| clientOrderId    | query  | [OrderHandle](#schemaorderhandle)           | false    | Unique numeric (i64) identifier generated on the client side expressed as a string value     |
| side             | query  | [OrderSide](#schemaorderside)               | false    | order side                                                                                   |
| status           | query  | [OrderStatus](#schemaorderstatus)           | false    | order status                                                                                 |
| tradingAccountId | query  | [TradingAccountId](#schematradingaccountid) | true     | Id of the trading account                                                                    |

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

## trade-create-order-v2

> Code samples

```javascript
const inputBody = '{
  "commandType": "V3CreateOrder",
  "clientOrderId": "1234",
  "symbol": "BTCUSDC",
  "type": "LIMIT",
  "side": "BUY",
  "price": "31000.1",
  "quantity": "1.1",
  "timeInForce": "GTC",
  "allowBorrow": true,
  "tradingAccountId": "111000000000001"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':{
  "type": "string"
},
  'BX-SIGNATURE':{
  "type": "string"
},
  'BX-TIMESTAMP':{
  "type": "string"
},
  'BX-NONCE':{
  "type": "string"
},
  'BX-NONCE-WINDOW-ENABLED':{
  "type": "string",
  "enum": [
    "false",
    "true"
  ],
  "default": "false"
}
};

fetch('https://api.exchange.bullish.com/trading-api/v2/orders',
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
},
  'BX-TIMESTAMP': {
  "type": "string"
},
  'BX-NONCE': {
  "type": "string"
},
  'BX-NONCE-WINDOW-ENABLED': {
  "type": "string",
  "enum": [
    "false",
    "true"
  ],
  "default": "false"
}
}

r = requests.post('https://api.exchange.bullish.com/trading-api/v2/orders', headers = headers)

print(r.json())

```

`POST /v2/orders`

_Create Order_

Creates an order, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header.

This endpoint uses the [signing format](#overview--signing-format) which does
not require strict field ordering and addition of null fields in the request
body. Quantities and prices does not require strict precision. Eg. for asset
precision of 4 - `100`, `100.0`, `100.00`, `100.000` and `100.0000` are all
accepted.

**Ratelimited:** `True`. Higher tiers of rate limits available by providing the
`BX-RATELIMIT-TOKEN` request header.

> Body parameter

```json
{
  "commandType": "V3CreateOrder",
  "clientOrderId": "1234",
  "symbol": "BTCUSDC",
  "type": "LIMIT",
  "side": "BUY",
  "price": "31000.1",
  "quantity": "1.1",
  "timeInForce": "GTC",
  "allowBorrow": true,
  "tradingAccountId": "111000000000001"
}
```

### Parameters

| Name                    | In     | Type                                                | Required | Description                                                                                                                                                         |
| ----------------------- | ------ | --------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorization           | header | string                                              | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token)                                                                        |
| BX-SIGNATURE            | header | string                                              | true     | signature obtained using the [signing format](#overview--how-to-ensure-the-order-of-create-order-or-cancel-order-requests)                                          |
| BX-TIMESTAMP            | header | string                                              | true     | timestamp is the number of milliseconds since EPOCH                                                                                                                 |
| BX-NONCE                | header | string                                              | true     | nonce is a client side incremented unsigned 64 bit integer                                                                                                          |
| BX-NONCE-WINDOW-ENABLED | header | string                                              | false    | string representation of a boolean value, [enables out-of-order order requests to be processed](#overview--how-to-enable-out-of-order-processing-of-order-requests) |
| body                    | body   | [CreateOrderCommandV3](#schemacreateordercommandv3) | true     | new order request body                                                                                                                                              |

#### Detailed descriptions

**BX-NONCE-WINDOW-ENABLED**: string representation of a boolean value,
[enables out-of-order order requests to be processed](#overview--how-to-enable-out-of-order-processing-of-order-requests)

#### Enumerated Values

| Parameter               | Value |
| ----------------------- | ----- |
| BX-NONCE-WINDOW-ENABLED | false |
| BX-NONCE-WINDOW-ENABLED | true  |

> Example responses

> 200 Response

```json
{
  "message": "Command acknowledged - CreateOrder",
  "requestId": "633910976353665024",
  "orderId": "633910775316480001",
  "clientOrderId": "1234567",
  "x-widdershins-oldRef": "#/components/schemas/CreateOrderCommandResponseV3/example"
}
```

### Responses

| Status | Meaning                                                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                            | Schema                                                              |
| ------ | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Status OK. The create order command was successfully acknowledged. To check the current status of the order, query [Get Order by ID](#get-/trading-api/v2/orders/-orderId-) using the `orderId` received in the response payload. Please consult the section [How To Ensure The Order Of _Create Order_ or _Cancel Order_ Requests](#overview--how-to-ensure-the-order-of-create-order-or-cancel-order-requests) for more information. | [CreateOrderCommandResponseV3](#schemacreateordercommandresponsev3) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Bad Request                                                                                                                                                                                                                                                                                                                                                                                                                            |

For example, sending a request with the `BX-SIGNATURE` header missing will
result in the following
response:|[BadOrderEntryResponse](#schemabadorderentryresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Not
Authenticated|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Access
Forbidden|None|
|429|[Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)|Too Many
Requests|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal
Server Error|None|

> **Note:** To perform this operation, you must be authenticated by means of one
> of the following methods: jwtTokenAuth

## trade-get-order-by-id-v2

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v2/orders/{orderId}?tradingAccountId=111000000000001",
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v2/orders/{orderId}', params={
  'tradingAccountId': '111000000000001'
}, headers = headers)

print(r.json())

```

`GET /v2/orders/{orderId}`

_Get Order by ID_

Retrieve a specific order using its unique identifier.

This endpoint requires [authentication](#overview--generate-a-jwt-token) and is
subjected to rate limiting.

### Parameters

| Name             | In     | Type                                        | Required | Description                                                                                  |
| ---------------- | ------ | ------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| Authorization    | header | string                                      | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token) |
| tradingAccountId | query  | [TradingAccountId](#schematradingaccountid) | true     | Id of the trading account                                                                    |
| orderId          | path   | number                                      | true     | order ID                                                                                     |

> Example responses

> 200 Response

```json
{
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
```

### Responses

| Status | Meaning                                                                    | Description           | Schema                |
| ------ | -------------------------------------------------------------------------- | --------------------- | --------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | [Order](#schemaorder) |
| 401    | [Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)            | Not Authenticated     | None                  |
| 403    | [Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)             | Access Forbidden      | None                  |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None                  |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None                  |

> **Note:** To perform this operation, you must be authenticated by means of one
> of the following methods: jwtTokenAuth

## command-entry-cancellations

> Code samples

```javascript
const inputBody = '{
  "commandType": "V3CancelOrder",
  "orderId": "297735387747975680",
  "symbol": "BTCUSDC",
  "tradingAccountId": "111000000000001",
  "x-widdershins-oldRef": "#/components/schemas/CancelOrderCommandV3/example"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':{
  "type": "string"
},
  'BX-SIGNATURE':{
  "type": "string"
},
  'BX-TIMESTAMP':{
  "type": "string"
},
  'BX-NONCE':{
  "type": "string"
},
  'BX-NONCE-WINDOW-ENABLED':{
  "type": "string",
  "enum": [
    "false",
    "true"
  ],
  "default": "false"
}
};

fetch('https://api.exchange.bullish.com/trading-api/v2/command#cancellations',
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
},
  'BX-TIMESTAMP': {
  "type": "string"
},
  'BX-NONCE': {
  "type": "string"
},
  'BX-NONCE-WINDOW-ENABLED': {
  "type": "string",
  "enum": [
    "false",
    "true"
  ],
  "default": "false"
}
}

r = requests.post('https://api.exchange.bullish.com/trading-api/v2/command#cancellations', headers = headers)

print(r.json())

```

`POST /v2/command#cancellations`

_Order Cancellation Commands_

Submits a command to the trading engine. A successful response indicates that
the command entry was acknowledged but does not indicate that the command was
executed. This endpoint uses the [signing format](#overview--signing-format)
which does not require strict field ordering and addition of null fields in the
request body. Quantities and prices does not require strict precision. Eg. for
asset precision of 4 - `100`, `100.0`, `100.00`, `100.000` and `100.0000` are
all accepted.

Command schemas and examples are provided below. Supported commands:

- V3CancelOrder
- V1CancelAllOrders
- V1CancelAllOrdersByMarket
- V1DelayedCancelAllOrders
- V1UnsetDelayedCancelAllOrders

Requires

- [bearer token](#overview--add-authenticated-request-header) in authorization
  header

**Ratelimited:** `True`. Higher tiers of rate limits available by providing the
`BX-RATELIMIT-TOKEN` request header.

> Body parameter

> Only one of `orderId` or `clientOrderId` can be used in the cancel order
> command

```json
{
  "commandType": "V3CancelOrder",
  "orderId": "297735387747975680",
  "symbol": "BTCUSDC",
  "tradingAccountId": "111000000000001",
  "x-widdershins-oldRef": "#/components/schemas/CancelOrderCommandV3/example"
}
```

### Parameters

| Name                    | In     | Type   | Required | Description                                                                                                                                                         |
| ----------------------- | ------ | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorization           | header | string | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token)                                                                        |
| BX-SIGNATURE            | header | string | true     | signature obtained using the [signing format](#overview--how-to-ensure-the-order-of-create-order-or-cancel-order-requests)                                          |
| BX-TIMESTAMP            | header | string | true     | timestamp is the number of milliseconds since EPOCH                                                                                                                 |
| BX-NONCE                | header | string | true     | nonce is a client side incremented unsigned 64 bit integer                                                                                                          |
| BX-NONCE-WINDOW-ENABLED | header | string | false    | string representation of a boolean value, [enables out-of-order order requests to be processed](#overview--how-to-enable-out-of-order-processing-of-order-requests) |
| body                    | body   | any    | true     | none                                                                                                                                                                |

#### Detailed descriptions

**BX-NONCE-WINDOW-ENABLED**: string representation of a boolean value,
[enables out-of-order order requests to be processed](#overview--how-to-enable-out-of-order-processing-of-order-requests)

#### Enumerated Values

| Parameter               | Value |
| ----------------------- | ----- |
| BX-NONCE-WINDOW-ENABLED | false |
| BX-NONCE-WINDOW-ENABLED | true  |

> Example responses

> Only one of `orderId` or `clientOrderId` present

```json
{
  "message": "Command acknowledged - CancelOrder",
  "requestId": "633910976353665024",
  "orderId": "633910775316480001"
}
```

> Status OK. This means a command was successfully acknowledged.

```json
{
  "message": "Command acknowledged - CancelAllOrders",
  "requestId": "633900538459062272"
}
```

```json
{
  "message": "Command acknowledged - CancelAllOrdersByMarket",
  "requestId": "633914459442118656"
}
```

```json
{
  "message": "Command acknowledged - DelayedCancelAllOrders",
  "requestId": "633914459442118656"
}
```

```json
{
  "message": "Command acknowledged - UnsetDelayedCancelAllOrders",
  "requestId": "633914459442118656"
}
```

> 400 Response

```json
{
  "type": "object",
  "required": ["message", "errorCode", "errorCodeName"],
  "properties": {
    "message": {
      "description": "message",
      "type": "string",
      "example": "Missing signature header"
    },
    "errorCode": {
      "description": "unique error code",
      "type": "integer",
      "example": 6029
    },
    "errorCodeName": {
      "description": "unique error code name",
      "type": "string",
      "example": "MISSING_SIGNATURE_HEADER"
    }
  }
}
```

### Responses

| Status | Meaning                                                          | Description                                                    | Schema |
| ------ | ---------------------------------------------------------------- | -------------------------------------------------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Status OK. This means a command was successfully acknowledged. | Inline |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Bad Request                                                    |

For example, sending a request with the `BX-SIGNATURE` header missing will
result in the following
response:|[BadOrderEntryResponse](#schemabadorderentryresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Not
Authenticated|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Access
Forbidden|None|
|429|[Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)|Too Many
Requests|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal
Server Error|None|

### Response Schema

> **Note:** To perform this operation, you must be authenticated by means of one
> of the following methods: jwtTokenAuth

## command-entry-amend

> Code samples

```javascript
const inputBody = '{
  "commandType": "V1AmendOrder",
  "orderId": "297735387747975680",
  "symbol": "BTCUSDC",
  "type": "LIMIT",
  "price": "1.00000000",
  "clientOrderId": "633914459442118656",
  "quantity": "1.00000000",
  "tradingAccountId": "111000000000001",
  "x-widdershins-oldRef": "#/components/schemas/AmendOrderCommandV1/example"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':{
  "type": "string"
},
  'BX-SIGNATURE':{
  "type": "string"
},
  'BX-TIMESTAMP':{
  "type": "string"
},
  'BX-NONCE':{
  "type": "string"
},
  'BX-NONCE-WINDOW-ENABLED':{
  "type": "string",
  "enum": [
    "false",
    "true"
  ],
  "default": "false"
}
};

fetch('https://api.exchange.bullish.com/trading-api/v2/command#amend',
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
},
  'BX-TIMESTAMP': {
  "type": "string"
},
  'BX-NONCE': {
  "type": "string"
},
  'BX-NONCE-WINDOW-ENABLED': {
  "type": "string",
  "enum": [
    "false",
    "true"
  ],
  "default": "false"
}
}

r = requests.post('https://api.exchange.bullish.com/trading-api/v2/command#amend', headers = headers)

print(r.json())

```

`POST /v2/command#amend`

_Order Amendment Command_

Ability to amend the `price` ,`quantity` and `type` (i.e. change from Taker Only
to Maker only and vice-versa) on Limit orders. It can be applied only to open
orders (`quantityFilled=0` and `status=OPEN`).

This submits a command to the trading engine to amend an order. A successful
response indicates that the command entry was acknowledged but does not indicate
that the command was executed.

This endpoint uses the [signing format](#overview--signing-format) which does
not require strict field ordering and addition of null fields in the request
body. Quantities and prices does not require strict precision. Eg. for asset
precision of 4 - `100`, `100.0`, `100.00`, `100.000` and `100.0000` are all
accepted.

Requires

- [bearer token](#overview--add-authenticated-request-header) in authorization
  header

**Ratelimited:** `True`. Higher tiers of rate limits available by providing the
`BX-RATELIMIT-TOKEN` request header.

> Body parameter

```json
{
  "commandType": "V1AmendOrder",
  "orderId": "297735387747975680",
  "symbol": "BTCUSDC",
  "type": "LIMIT",
  "price": "1.00000000",
  "clientOrderId": "633914459442118656",
  "quantity": "1.00000000",
  "tradingAccountId": "111000000000001",
  "x-widdershins-oldRef": "#/components/schemas/AmendOrderCommandV1/example"
}
```

### Parameters

| Name                    | In     | Type   | Required | Description                                                                                                                                                         |
| ----------------------- | ------ | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorization           | header | string | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token)                                                                        |
| BX-SIGNATURE            | header | string | true     | signature obtained using the [signing format](#overview--how-to-ensure-the-order-of-create-order-or-cancel-order-requests)                                          |
| BX-TIMESTAMP            | header | string | true     | timestamp is the number of milliseconds since EPOCH                                                                                                                 |
| BX-NONCE                | header | string | true     | nonce is a client side incremented unsigned 64 bit integer                                                                                                          |
| BX-NONCE-WINDOW-ENABLED | header | string | false    | string representation of a boolean value, [enables out-of-order order requests to be processed](#overview--how-to-enable-out-of-order-processing-of-order-requests) |
| body                    | body   | any    | true     | none                                                                                                                                                                |

#### Detailed descriptions

**BX-NONCE-WINDOW-ENABLED**: string representation of a boolean value,
[enables out-of-order order requests to be processed](#overview--how-to-enable-out-of-order-processing-of-order-requests)

#### Enumerated Values

| Parameter               | Value |
| ----------------------- | ----- |
| BX-NONCE-WINDOW-ENABLED | false |
| BX-NONCE-WINDOW-ENABLED | true  |

> Example responses

> Status OK. This means a command was successfully acknowledged.

```json
{
  "message": "Command acknowledged - AmendOrder",
  "requestId": "633910976353665024",
  "orderId": "633910775316480001",
  "clientOrderId": "1234567-1"
}
```

> 400 Response

```json
{
  "type": "object",
  "required": ["message", "errorCode", "errorCodeName"],
  "properties": {
    "message": {
      "description": "message",
      "type": "string",
      "example": "Missing signature header"
    },
    "errorCode": {
      "description": "unique error code",
      "type": "integer",
      "example": 6029
    },
    "errorCodeName": {
      "description": "unique error code name",
      "type": "string",
      "example": "MISSING_SIGNATURE_HEADER"
    }
  }
}
```

### Responses

| Status | Meaning                                                          | Description                                                    | Schema |
| ------ | ---------------------------------------------------------------- | -------------------------------------------------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Status OK. This means a command was successfully acknowledged. | Inline |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Bad Request                                                    |

For example, sending a request with the `BX-SIGNATURE` header missing will
result in the following
response:|[BadOrderEntryResponse](#schemabadorderentryresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Not
Authenticated|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Access
Forbidden|None|
|429|[Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)|Too Many
Requests|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal
Server Error|None|

### Response Schema

Status Code **200**

| Name            | Type                          | Required | Restrictions | Description                                             |
| --------------- | ----------------------------- | -------- | ------------ | ------------------------------------------------------- |
| » message       | string                        | true     | none         | message                                                 |
| » requestId     | [RequestID](#schemarequestid) | true     | none         | unique request ID                                       |
| » orderId       | [OrderID](#schemaorderid)     | true     | none         | unique order ID                                         |
| » clientOrderId | string                        | false    | none         | Will be updated as part of a successful order amendment |

> **Note:** To perform this operation, you must be authenticated by means of one
> of the following methods: jwtTokenAuth
