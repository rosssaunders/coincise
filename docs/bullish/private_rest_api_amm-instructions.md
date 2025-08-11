# Bullish Trading API - Private REST API - AMM Instructions

# amm instructions

Authenticated APIs that allow users to Create, View and Terminate AMM
instructions.

Please refer to the
[AMM instruction Overview Doc](https://github.com/bullish-exchange/api-docs/wiki/Automated-Market-Making-%28AMM%29-Instructions)
for more details on how AMM instructions work.

## trade-get-amm-instructions

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v2/amm-instructions?tradingAccountId=111000000000001",
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v2/amm-instructions', params={
  'tradingAccountId': '111000000000001'
}, headers = headers)

print(r.json())

```

`GET /v2/amm-instructions`

_Get AMM Instructions_

Gets a list of AMM instructions based on applied filters.

- requires [bearer token](#overview--add-authenticated-request-header) in
  authorization header
- [supports pagination](#overview--pagination-support)

**Ratelimited:** `True`

### Parameters

| Name             | In     | Type                                                | Required | Description                                                                                  |
| ---------------- | ------ | --------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| Authorization    | header | string                                              | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token) |
| symbol           | query  | [MarketSymbol](#schemamarketsymbol)                 | false    | none                                                                                         |
| status           | query  | [AMMInstructionStatus](#schemaamminstructionstatus) | false    | order status                                                                                 |
| tradingAccountId | query  | [TradingAccountId](#schematradingaccountid)         | true     | Id of the trading account                                                                    |

#### Enumerated Values

| Parameter | Value  |
| --------- | ------ |
| status    | OPEN   |
| status    | CLOSED |

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
      "apy",
      "baseCurrentQuantity",
      "baseFee",
      "baseInvestQuantity",
      "basePrice",
      "baseWithdrawQuantity",
      "createdAtDateTime",
      "createdAtTimestamp",
      "currentValue",
      "dislocationEnabled",
      "feeTierId",
      "impermanentLoss",
      "initialBasePrice",
      "initialQuotePrice",
      "initialValue",
      "liquidityId",
      "instructionId",
      "lowerBound",
      "price",
      "quoteFee",
      "quoteInvestQuantity",
      "quotePrice",
      "quoteWithdrawQuantity",
      "requestId",
      "staticSpreadFee",
      "status",
      "statusReason",
      "statusReasonCode",
      "symbol",
      "updatedAtDateTime",
      "updatedAtTimestamp",
      "upperBound",
      "yieldEarn"
    ],
    "properties": {
      "liquidityId": {
        "description": "unique AMM instruction ID",
        "deprecated": true,
        "allOf": [
          {
            "type": "string",
            "example": "297735387747975680"
          }
        ]
      },
      "instructionId": {
        "description": "unique AMM instruction ID",
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
        "example": "Ok"
      },
      "statusReasonCode": {
        "description": "status reason code, see [details](#overview--error--rejection-codes)",
        "type": "integer",
        "example": 1001
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
      },
      "24HrApy": {
        "type": "string",
        "description": "APY of the last 24 Hours, only for AMM instructions with `OPEN` status",
        "example": "2.3319"
      },
      "24HrYieldEarn": {
        "type": "string",
        "description": "amount of money earned in USD from the last 24 Hours, only for AMM instructions with `OPEN` status",
        "example": "0.00"
      },
      "apy": {
        "type": "string",
        "description": "yield generated from the time AMM instruction was created, in annualised percentage",
        "example": "0.0000"
      },
      "baseCurrentQuantity": {
        "type": "string",
        "description": "amount of base asset this AMM instruction currently holds, only for AMM instruction with `OPEN` status",
        "example": "0.00000000"
      },
      "baseInvestQuantity": {
        "type": "string",
        "description": "initial base investment",
        "example": "0.00000008"
      },
      "basePrice": {
        "type": "string",
        "description": "current price of base asset",
        "example": "345.6700"
      },
      "baseWithdrawQuantity": {
        "type": "string",
        "description": "amount of base asset returned when AMM instruction is terminated",
        "example": "0.00000010"
      },
      "currentValue": {
        "type": "string",
        "description": "value of assets (base and quote) in USD amount that this AMM instruction currently holds",
        "example": "0.0000"
      },
      "dislocationEnabled": {
        "description": "dislocation enabled/disabled",
        "type": "boolean",
        "example": false
      },
      "feeTierId": {
        "allOf": [
          {
            "type": "string",
            "description": "unique fee tier ID, see [Get Market By Symbol](#get-/v1/markets/-symbol-)",
            "example": "1"
          }
        ]
      },
      "finalValue": {
        "type": "string",
        "description": "value of assets (base and quote) in USD amount when AMM instruction was terminated, only for AMM instruction with `CLOSED` status",
        "example": "0.0001"
      },
      "impermanentLoss": {
        "type": "string",
        "description": "impermanent loss",
        "example": "0.0000"
      },
      "initialBasePrice": {
        "type": "string",
        "description": "price of base asset when AMM instruction was created",
        "example": "100.0000"
      },
      "initialQuotePrice": {
        "type": "string",
        "description": "price of quote asset when AMM instruction was created",
        "example": "0.0100"
      },
      "initialValue": {
        "type": "string",
        "description": "value of assets (base and quote) in USD amount when AMM instruction was created",
        "example": "0.0000"
      },
      "lowerBound": {
        "type": "string",
        "description": "lower bound of price range, in quote currency",
        "example": "0.0013"
      },
      "price": {
        "type": "string",
        "description": "current price of AMM, see [Get Tick By Symbol](#get-/v1/markets/-symbol-/tick)",
        "example": "456.7800"
      },
      "quoteCurrentQuantity": {
        "type": "string",
        "description": "amount of quote asset this AMM instruction currently holds, only for AMM instruction with `OPEN` status",
        "example": "0.0000"
      },
      "quoteInvestQuantity": {
        "type": "string",
        "description": "initial quote investment",
        "example": "0.0009"
      },
      "quotePrice": {
        "type": "string",
        "description": "current price of quote asset",
        "example": "1.0000"
      },
      "quoteWithdrawQuantity": {
        "type": "string",
        "description": "amount of quote asset returned when AMM instruction is terminated",
        "example": "0.0011"
      },
      "lastDistributedPrice": {
        "type": "string",
        "description": "(Perpetual market only) The price used at the time of settlement for AMM Instructions that can be used to determine mtmPnl and the actual Pnl",
        "example": null
      },
      "requestId": {
        "description": "unique request ID",
        "allOf": [
          {
            "type": "string",
            "example": "197735387747975680"
          }
        ]
      },
      "staticSpreadFee": {
        "type": "string",
        "description": "static spread fee, see [Get Market By Symbol](#get-/v1/markets/-symbol-)",
        "example": "0.00200000"
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
      },
      "upperBound": {
        "type": "string",
        "description": "upper bound of price range, in quote currency",
        "example": "14000.0000"
      },
      "yieldEarn": {
        "type": "string",
        "description": "amount of money earned in USD",
        "example": "0.00"
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

| Name                    | Type                                                  | Required | Restrictions | Description                                                                                                                                   |
| ----------------------- | ----------------------------------------------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| _anonymous_             | [[AMMInstruction](#schemaamminstruction)]             | false    | none         | none                                                                                                                                          |
| » liquidityId           | [AMMInstructionID](#schemaamminstructionid)           | true     | none         | unique AMM instruction ID                                                                                                                     |
| » instructionId         | [AMMInstructionID](#schemaamminstructionid)           | true     | none         | unique AMM instruction ID                                                                                                                     |
| » symbol                | [MarketSymbol](#schemamarketsymbol)                   | true     | none         | market symbol                                                                                                                                 |
| » baseFee               | [AssetValue](#schemaassetvalue)                       | true     | none         | base fee, see [asset value](#overview--price-and-quantity-precision) format                                                                   |
| » quoteFee              | [AssetValue](#schemaassetvalue)                       | true     | none         | quote fee, see [asset value](#overview--price-and-quantity-precision) format                                                                  |
| » status                | [OrderStatusAsString](#schemaorderstatusasstring)     | true     | none         | order status                                                                                                                                  |
| » statusReason          | string                                                | true     | none         | status reason, describes why the order is in a specific state                                                                                 |
| » statusReasonCode      | integer                                               | true     | none         | status reason code, see [details](#overview--error--rejection-codes)                                                                          |
| » createdAtDatetime     | [DateTime](#schemadatetime)(date-time)                | false    | none         | denotes the time the order was ACK'd by the exchange, ISO 8601 with millisecond as string                                                     |
| » createdAtTimestamp    | [TimeStampAsString](#schematimestampasstring)(string) | true     | none         | denotes the time the order was ACK'd by the exchange                                                                                          |
| » 24HrApy               | string                                                | false    | none         | APY of the last 24 Hours, only for AMM instructions with `OPEN` status                                                                        |
| » 24HrYieldEarn         | string                                                | false    | none         | amount of money earned in USD from the last 24 Hours, only for AMM instructions with `OPEN` status                                            |
| » apy                   | string                                                | true     | none         | yield generated from the time AMM instruction was created, in annualised percentage                                                           |
| » baseCurrentQuantity   | string                                                | true     | none         | amount of base asset this AMM instruction currently holds, only for AMM instruction with `OPEN` status                                        |
| » baseInvestQuantity    | string                                                | true     | none         | initial base investment                                                                                                                       |
| » basePrice             | string                                                | true     | none         | current price of base asset                                                                                                                   |
| » baseWithdrawQuantity  | string                                                | true     | none         | amount of base asset returned when AMM instruction is terminated                                                                              |
| » currentValue          | string                                                | true     | none         | value of assets (base and quote) in USD amount that this AMM instruction currently holds                                                      |
| » dislocationEnabled    | boolean                                               | true     | none         | dislocation enabled/disabled                                                                                                                  |
| » feeTierId             | [FeeTierId](#schemafeetierid)                         | true     | none         | unique fee tier ID, see [Get Market By Symbol](#get-/v1/markets/-symbol-)                                                                     |
| » finalValue            | string                                                | false    | none         | value of assets (base and quote) in USD amount when AMM instruction was terminated, only for AMM instruction with `CLOSED` status             |
| » impermanentLoss       | string                                                | true     | none         | impermanent loss                                                                                                                              |
| » initialBasePrice      | string                                                | true     | none         | price of base asset when AMM instruction was created                                                                                          |
| » initialQuotePrice     | string                                                | true     | none         | price of quote asset when AMM instruction was created                                                                                         |
| » initialValue          | string                                                | true     | none         | value of assets (base and quote) in USD amount when AMM instruction was created                                                               |
| » lowerBound            | string                                                | true     | none         | lower bound of price range, in quote currency                                                                                                 |
| » price                 | string                                                | true     | none         | current price of AMM, see [Get Tick By Symbol](#get-/v1/markets/-symbol-/tick)                                                                |
| » quoteCurrentQuantity  | string                                                | false    | none         | amount of quote asset this AMM instruction currently holds, only for AMM instruction with `OPEN` status                                       |
| » quoteInvestQuantity   | string                                                | true     | none         | initial quote investment                                                                                                                      |
| » quotePrice            | string                                                | true     | none         | current price of quote asset                                                                                                                  |
| » quoteWithdrawQuantity | string                                                | true     | none         | amount of quote asset returned when AMM instruction is terminated                                                                             |
| » lastDistributedPrice  | string                                                | false    | none         | (Perpetual market only) The price used at the time of settlement for AMM Instructions that can be used to determine mtmPnl and the actual Pnl |
| » requestId             | [RequestID](#schemarequestid)                         | true     | none         | unique request ID                                                                                                                             |
| » staticSpreadFee       | string                                                | true     | none         | static spread fee, see [Get Market By Symbol](#get-/v1/markets/-symbol-)                                                                      |
| » updatedAtDatetime     | [DateTime](#schemadatetime)(date-time)                | false    | none         | denotes the time the AMM instruction was updated by the exchange, ISO 8601 with millisecond as string                                         |
| » updatedAtTimestamp    | [TimeStampAsString](#schematimestampasstring)(string) | true     | none         | denotes the time the AMM instruction was updated by the exchange                                                                              |
| » upperBound            | string                                                | true     | none         | upper bound of price range, in quote currency                                                                                                 |
| » yieldEarn             | string                                                | true     | none         | amount of money earned in USD                                                                                                                 |

> **Note:** To perform this operation, you must be authenticated by means of one
> of the following methods: jwtTokenAuth

## trade-create-amm-instruction

> Code samples

```javascript
const inputBody = '{
  "commandType": "V3CreateAMMInstruction",
  "symbol": "BTCUSDC",
  "baseQuantity": "0",
  "quoteQuantity": "50000.1",
  "upperBound": "25000",
  "lowerBound": "20000",
  "feeTierId": "1",
  "tradingAccountId": "111000000000001",
  "x-widdershins-oldRef": "#/components/schemas/CreateAMMInstructionCommandV3/example"
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
}
};

fetch('https://api.exchange.bullish.com/trading-api/v2/amm-instructions',
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
}
}

r = requests.post('https://api.exchange.bullish.com/trading-api/v2/amm-instructions', headers = headers)

print(r.json())

```

`POST /v2/amm-instructions`

_Create AMM Instruction_

Creates an AMM instruction, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header.

This endpoint uses the [signing format](#overview--signing-format) which does
not require strict field ordering in the request body. Quantities and prices
does not require strict precision. Eg. for asset precision of 4 - `100`,
`100.0`, `100.00`, `100.000` and `100.0000` are all accepted.

**Ratelimited:** `True`

> Body parameter

```json
{
  "commandType": "V3CreateAMMInstruction",
  "symbol": "BTCUSDC",
  "baseQuantity": "0",
  "quoteQuantity": "50000.1",
  "upperBound": "25000",
  "lowerBound": "20000",
  "feeTierId": "1",
  "tradingAccountId": "111000000000001",
  "x-widdershins-oldRef": "#/components/schemas/CreateAMMInstructionCommandV3/example"
}
```

### Parameters

| Name          | In     | Type                                                                  | Required | Description                                                                                                                |
| ------------- | ------ | --------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| Authorization | header | string                                                                | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token)                               |
| BX-SIGNATURE  | header | string                                                                | true     | signature obtained using the [signing format](#overview--how-to-ensure-the-order-of-create-order-or-cancel-order-requests) |
| BX-TIMESTAMP  | header | string                                                                | true     | timestamp is the number of milliseconds since EPOCH                                                                        |
| BX-NONCE      | header | string                                                                | true     | nonce is a client side incremented unsigned 64 bit integer                                                                 |
| body          | body   | [CreateAMMInstructionCommandV3](#schemacreateamminstructioncommandv3) | true     | new AMM instruction                                                                                                        |

> Example responses

> Status OK. This means a create AMM instruction command was successfully
> acknowledged. It does not necessarily mean the instruction was created. To
> check the current status, query
> [Get AMM Instruction by ID](#get-/trading-api/v2/amm-instructions/-instructionid-)
> using the `instructionId` received in the response payload.

```json
{
  "message": "Command acknowledged - CreateAMMInstruction",
  "requestId": "633906221577404416",
  "instructionId": "633906221577404424"
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

| Status | Meaning                                                          | Description                                                                                                                                                                                                                                                                                                                       | Schema                                                                                |
| ------ | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Status OK. This means a create AMM instruction command was successfully acknowledged. It does not necessarily mean the instruction was created. To check the current status, query [Get AMM Instruction by ID](#get-/trading-api/v2/amm-instructions/-instructionid-) using the `instructionId` received in the response payload. | [CreateAMMInstructionCommandResponseV3](#schemacreateamminstructioncommandresponsev3) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Bad Request                                                                                                                                                                                                                                                                                                                       |

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

## trade-get-amm-instruction-by-id-v2

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v2/amm-instructions/{instructionId}?tradingAccountId=111000000000001",
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v2/amm-instructions/{instructionId}', params={
  'tradingAccountId': '111000000000001'
}, headers = headers)

print(r.json())

```

`GET /v2/amm-instructions/{instructionId}`

_Get AMM Instruction by ID_

Gets a specific AMM instruction based on the `instructionId`, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

**Ratelimited:** `True`

### Parameters

| Name             | In     | Type                                        | Required | Description                                                                                  |
| ---------------- | ------ | ------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| Authorization    | header | string                                      | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token) |
| instructionId    | path   | number                                      | true     | unique AMM instruction ID                                                                    |
| tradingAccountId | query  | [TradingAccountId](#schematradingaccountid) | true     | Id of the trading account                                                                    |

> Example responses

> 200 Response

```json
{
  "type": "object",
  "required": [
    "apy",
    "baseCurrentQuantity",
    "baseFee",
    "baseInvestQuantity",
    "basePrice",
    "baseWithdrawQuantity",
    "createdAtDateTime",
    "createdAtTimestamp",
    "currentValue",
    "dislocationEnabled",
    "feeTierId",
    "impermanentLoss",
    "initialBasePrice",
    "initialQuotePrice",
    "initialValue",
    "liquidityId",
    "instructionId",
    "lowerBound",
    "price",
    "quoteFee",
    "quoteInvestQuantity",
    "quotePrice",
    "quoteWithdrawQuantity",
    "requestId",
    "staticSpreadFee",
    "status",
    "statusReason",
    "statusReasonCode",
    "symbol",
    "updatedAtDateTime",
    "updatedAtTimestamp",
    "upperBound",
    "yieldEarn"
  ],
  "properties": {
    "liquidityId": {
      "description": "unique AMM instruction ID",
      "deprecated": true,
      "allOf": [
        {
          "type": "string",
          "example": "297735387747975680"
        }
      ]
    },
    "instructionId": {
      "description": "unique AMM instruction ID",
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
      "example": "Ok"
    },
    "statusReasonCode": {
      "description": "status reason code, see [details](#overview--error--rejection-codes)",
      "type": "integer",
      "example": 1001
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
    },
    "24HrApy": {
      "type": "string",
      "description": "APY of the last 24 Hours, only for AMM instructions with `OPEN` status",
      "example": "2.3319"
    },
    "24HrYieldEarn": {
      "type": "string",
      "description": "amount of money earned in USD from the last 24 Hours, only for AMM instructions with `OPEN` status",
      "example": "0.00"
    },
    "apy": {
      "type": "string",
      "description": "yield generated from the time AMM instruction was created, in annualised percentage",
      "example": "0.0000"
    },
    "baseCurrentQuantity": {
      "type": "string",
      "description": "amount of base asset this AMM instruction currently holds, only for AMM instruction with `OPEN` status",
      "example": "0.00000000"
    },
    "baseInvestQuantity": {
      "type": "string",
      "description": "initial base investment",
      "example": "0.00000008"
    },
    "basePrice": {
      "type": "string",
      "description": "current price of base asset",
      "example": "345.6700"
    },
    "baseWithdrawQuantity": {
      "type": "string",
      "description": "amount of base asset returned when AMM instruction is terminated",
      "example": "0.00000010"
    },
    "currentValue": {
      "type": "string",
      "description": "value of assets (base and quote) in USD amount that this AMM instruction currently holds",
      "example": "0.0000"
    },
    "dislocationEnabled": {
      "description": "dislocation enabled/disabled",
      "type": "boolean",
      "example": false
    },
    "feeTierId": {
      "allOf": [
        {
          "type": "string",
          "description": "unique fee tier ID, see [Get Market By Symbol](#get-/v1/markets/-symbol-)",
          "example": "1"
        }
      ]
    },
    "finalValue": {
      "type": "string",
      "description": "value of assets (base and quote) in USD amount when AMM instruction was terminated, only for AMM instruction with `CLOSED` status",
      "example": "0.0001"
    },
    "impermanentLoss": {
      "type": "string",
      "description": "impermanent loss",
      "example": "0.0000"
    },
    "initialBasePrice": {
      "type": "string",
      "description": "price of base asset when AMM instruction was created",
      "example": "100.0000"
    },
    "initialQuotePrice": {
      "type": "string",
      "description": "price of quote asset when AMM instruction was created",
      "example": "0.0100"
    },
    "initialValue": {
      "type": "string",
      "description": "value of assets (base and quote) in USD amount when AMM instruction was created",
      "example": "0.0000"
    },
    "lowerBound": {
      "type": "string",
      "description": "lower bound of price range, in quote currency",
      "example": "0.0013"
    },
    "price": {
      "type": "string",
      "description": "current price of AMM, see [Get Tick By Symbol](#get-/v1/markets/-symbol-/tick)",
      "example": "456.7800"
    },
    "quoteCurrentQuantity": {
      "type": "string",
      "description": "amount of quote asset this AMM instruction currently holds, only for AMM instruction with `OPEN` status",
      "example": "0.0000"
    },
    "quoteInvestQuantity": {
      "type": "string",
      "description": "initial quote investment",
      "example": "0.0009"
    },
    "quotePrice": {
      "type": "string",
      "description": "current price of quote asset",
      "example": "1.0000"
    },
    "quoteWithdrawQuantity": {
      "type": "string",
      "description": "amount of quote asset returned when AMM instruction is terminated",
      "example": "0.0011"
    },
    "lastDistributedPrice": {
      "type": "string",
      "description": "(Perpetual market only) The price used at the time of settlement for AMM Instructions that can be used to determine mtmPnl and the actual Pnl",
      "example": null
    },
    "requestId": {
      "description": "unique request ID",
      "allOf": [
        {
          "type": "string",
          "example": "197735387747975680"
        }
      ]
    },
    "staticSpreadFee": {
      "type": "string",
      "description": "static spread fee, see [Get Market By Symbol](#get-/v1/markets/-symbol-)",
      "example": "0.00200000"
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
    },
    "upperBound": {
      "type": "string",
      "description": "upper bound of price range, in quote currency",
      "example": "14000.0000"
    },
    "yieldEarn": {
      "type": "string",
      "description": "amount of money earned in USD",
      "example": "0.00"
    }
  }
}
```

### Responses

| Status | Meaning                                                                    | Description           | Schema                                  |
| ------ | -------------------------------------------------------------------------- | --------------------- | --------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | [AMMInstruction](#schemaamminstruction) |
| 401    | [Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)            | Not Authenticated     | None                                    |
| 403    | [Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)             | Access Forbidden      | None                                    |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None                                    |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None                                    |

> **Note:** To perform this operation, you must be authenticated by means of one
> of the following methods: jwtTokenAuth
