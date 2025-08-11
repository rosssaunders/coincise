# Bullish Trading API - Private REST API - Portfolio Margin Simulator

# portfolio-margin-simulator

## simulate-portfolio-margin

> Code samples

```javascript
const inputBody = '{
  "type": "object",
  "required": [
    "tradingAccountId"
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
    "positions": {
      "type": "array",
      "description": "portfolio position to be used in simulation",
      "items": {
        "allOf": [
          {
            "type": "string",
            "required": [
              "symbol",
              "quantity"
            ],
            "properties": {
              "symbol": {
                "description": "asset or market symbol. Eg `USDC` for asset and `BTCUSDC` for market",
                "type": "string",
                "example": "BTC-USDC-PERP"
              },
              "quantity": {
                "description": "size of the position",
                "type": "string",
                "example": "1.0"
              }
            }
          }
        ]
      }
    },
    "orders": {
      "type": "array",
      "description": "pending orders to be used in simulation",
      "items": {
        "allOf": [
          {
            "type": "string",
            "required": [
              "symbol",
              "quantity"
            ],
            "properties": {
              "symbol": {
                "allOf": [
                  {
                    "type": "string",
                    "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
                    "example": "BTCUSDC"
                  }
                ]
              },
              "quantity": {
                "description": "quantity placed for order",
                "type": "string",
                "example": "1.0"
              },
              "limitPrice": {
                "description": "limit price for order",
                "type": "string",
                "example": "10000.0"
              }
            }
          }
        ]
      }
    },
    "referencePrices": {
      "type": "array",
      "description": "reference price to be used in simulation",
      "items": {
        "allOf": [
          {
            "type": "string",
            "properties": {
              "symbol": {
                "description": "asset or market symbol. Eg `USDC` for asset and `BTCUSDC` for market",
                "type": "string",
                "example": "BTC"
              },
              "price": {
                "description": "reference price for asset or market",
                "type": "string",
                "example": "12000.0"
              }
            }
          }
        ]
      }
    }
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':{
  "type": "string"
}
};

fetch('https://api.exchange.bullish.com/trading-api/v1/simulate-portfolio-margin',
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
}
}

r = requests.post('https://api.exchange.bullish.com/trading-api/v1/simulate-portfolio-margin', headers = headers)

print(r.json())

```

`POST /v1/simulate-portfolio-margin`

_Portfolio Margin Simulator_

Use Portfolio margin simulator to determine your margin requirements and risk
levels based on your current portfolio balances. You can also append position
details on top of your portfolio specifics to see simulated results.

> Body parameter

```json
{
  "type": "object",
  "required": ["tradingAccountId"],
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
    "positions": {
      "type": "array",
      "description": "portfolio position to be used in simulation",
      "items": {
        "allOf": [
          {
            "type": "string",
            "required": ["symbol", "quantity"],
            "properties": {
              "symbol": {
                "description": "asset or market symbol. Eg `USDC` for asset and `BTCUSDC` for market",
                "type": "string",
                "example": "BTC-USDC-PERP"
              },
              "quantity": {
                "description": "size of the position",
                "type": "string",
                "example": "1.0"
              }
            }
          }
        ]
      }
    },
    "orders": {
      "type": "array",
      "description": "pending orders to be used in simulation",
      "items": {
        "allOf": [
          {
            "type": "string",
            "required": ["symbol", "quantity"],
            "properties": {
              "symbol": {
                "allOf": [
                  {
                    "type": "string",
                    "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
                    "example": "BTCUSDC"
                  }
                ]
              },
              "quantity": {
                "description": "quantity placed for order",
                "type": "string",
                "example": "1.0"
              },
              "limitPrice": {
                "description": "limit price for order",
                "type": "string",
                "example": "10000.0"
              }
            }
          }
        ]
      }
    },
    "referencePrices": {
      "type": "array",
      "description": "reference price to be used in simulation",
      "items": {
        "allOf": [
          {
            "type": "string",
            "properties": {
              "symbol": {
                "description": "asset or market symbol. Eg `USDC` for asset and `BTCUSDC` for market",
                "type": "string",
                "example": "BTC"
              },
              "price": {
                "description": "reference price for asset or market",
                "type": "string",
                "example": "12000.0"
              }
            }
          }
        ]
      }
    }
  }
}
```

### Parameters

| Name            | In     | Type                                                            | Required | Description                                                                                  |
| --------------- | ------ | --------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| Authorization   | header | string                                                          | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token) |
| includeExisting | query  | [Boolean](#schemaboolean)                                       | false    | none                                                                                         |
| body            | body   | [PortfolioSimulationRequest](#schemaportfoliosimulationrequest) | false    | none                                                                                         |

> Example responses

> 200 Response

```json
{
  "description": "Simulation result",
  "type": "string",
  "properties": {
    "collateralUSD": {
      "description": "total collateral across all assets in this trading account displayed in the reference asset in USD",
      "type": "string",
      "example": "13000.0000"
    },
    "borrowedUSD": {
      "description": "total borrowed across all assets in this trading account displayed in the reference asset in USD",
      "type": "string",
      "example": "12000.0000"
    },
    "initialMarginUSD": {
      "description": "The minimum margin one must maintain in order to be able to purposefully increase risk",
      "type": "string",
      "example": "14000.0000"
    },
    "warningMarginUSD": {
      "description": "The minimum margin when the customer will receive warning via email/notifications over UI",
      "type": "string",
      "example": "15000.0000"
    },
    "liquidationMarginUSD": {
      "description": "The minimum value of margin one must maintain in order to avoid liquidation",
      "type": "string",
      "example": "16000.0000"
    },
    "fullLiquidationMarginUSD": {
      "description": "The value of margin when full liquidation occurs",
      "type": "string",
      "example": "17000.0000"
    },
    "defaultedMarginUSD": {
      "description": "The value of margin when this trading account will be moved into a Defaulted state",
      "type": "string",
      "example": "18000.0000"
    },
    "liquidityAddonUSD": {
      "description": "expected market impact of unwinding the portfolio in the case of a liquidation event",
      "type": "string",
      "example": "19000.0000"
    },
    "marketRiskUSD": {
      "description": "the worst possible loss on the portfolio based on scenario analysis",
      "type": "string",
      "example": "20000.0000"
    }
  }
}
```

### Responses

| Status | Meaning                                                                    | Description           | Schema                                                            |
| ------ | -------------------------------------------------------------------------- | --------------------- | ----------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | [PortfolioSimulationResponse](#schemaportfoliosimulationresponse) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)           | Bad Request           | None                                                              |
| 401    | [Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)            | Not Authenticated     | None                                                              |
| 403    | [Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)             | Access Forbidden      | None                                                              |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None                                                              |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None                                                              |

> **Note:** To perform this operation, you must be authenticated by means of one
> of the following methods: jwtTokenAuth

# Schemas

## ApiResponse

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "integer",
      "format": "int32"
    },
    "type": {
      "type": "string"
    },
    "message": {
      "type": "string"
    }
  }
}
```

### Properties

| Name    | Type           | Required | Restrictions | Description |
| ------- | -------------- | -------- | ------------ | ----------- |
| code    | integer(int32) | false    | none         | none        |
| type    | string         | false    | none         | none        |
| message | string         | false    | none         | none        |

## Boolean

```json
true
```

### Properties

| Name        | Type                   | Required | Restrictions | Description |
| ----------- | ---------------------- | -------- | ------------ | ----------- |
| _anonymous_ | boolean(true or false) | false    | none         | none        |

## MarketTypeAsString

```json
"SPOT"
```

market type can have the following string values `"SPOT"`, `"PERPETUAL"`,
`"DATED_FUTURE"`

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                                |
| ----------- | ------ | -------- | ------------ | ------------------------------------------------------------------------------------------ |
| _anonymous_ | string | false    | none         | market type can have the following string values `"SPOT"`, `"PERPETUAL"`, `"DATED_FUTURE"` |

#### Enumerated Values

| Property    | Value        |
| ----------- | ------------ |
| _anonymous_ | SPOT         |
| _anonymous_ | PERPETUAL    |
| _anonymous_ | DATED_FUTURE |

## OrderTypeAsString

```json
"LMT"
```

order type can have the following string values `"LMT"`, `"MKT"`,
`"STOP_LIMIT"`, `"POST_ONLY"`.

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                                      |
| ----------- | ------ | -------- | ------------ | ------------------------------------------------------------------------------------------------ |
| _anonymous_ | string | false    | none         | order type can have the following string values `"LMT"`, `"MKT"`, `"STOP_LIMIT"`, `"POST_ONLY"`. |

## OrderTypeAsStringV2

```json
"LIMIT"
```

order type can have the following string values `"LIMIT"`, `"MARKET"`,
`"STOP_LIMIT"`, `"POST_ONLY"`.

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                                           |
| ----------- | ------ | -------- | ------------ | ----------------------------------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | order type can have the following string values `"LIMIT"`, `"MARKET"`, `"STOP_LIMIT"`, `"POST_ONLY"`. |

## OrderTypeAsStringAmend

```json
"LIMIT"
```

order type can have the following string values `"LIMIT"`, `"POST_ONLY"`

### Properties

| Name        | Type   | Required | Restrictions | Description                                                              |
| ----------- | ------ | -------- | ------------ | ------------------------------------------------------------------------ |
| _anonymous_ | string | false    | none         | order type can have the following string values `"LIMIT"`, `"POST_ONLY"` |

## OrderSideAsString

```json
"BUY"
```

order side can have the following string values `"BUY"`, `"SELL"`

### Properties

| Name        | Type   | Required | Restrictions | Description                                                       |
| ----------- | ------ | -------- | ------------ | ----------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | order side can have the following string values `"BUY"`, `"SELL"` |

## OrderTimeInForceAsString

```json
{
  "type": "string",
  "description": "time in force can have the following string values `\"GTC\"`, `\"FOK\"`, `\"IOC\"`, see [details](#overview--order-timeinforce)"
}
```

time in force can have the following string values `"GTC"`, `"FOK"`, `"IOC"`,
see [details](#overview--order-timeinforce)

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                                                               |
| ----------- | ------ | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | time in force can have the following string values `"GTC"`, `"FOK"`, `"IOC"`, see [details](#overview--order-timeinforce) |

## OrderStatusAsString

```json
"OPEN"
```

order status can have the following string values `"OPEN"`, `"CLOSED"`,
`"CANCELLED"`, `"REJECTED"`

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                                         |
| ----------- | ------ | -------- | ------------ | --------------------------------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | order status can have the following string values `"OPEN"`, `"CLOSED"`, `"CANCELLED"`, `"REJECTED"` |

## TimeStampAsString

```json
"1621490985000"
```

unsigned 64 bit integer value which is the number of milliseconds since EPOCH
expressed as string

### Properties

| Name        | Type           | Required | Restrictions | Description                                                                                       |
| ----------- | -------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------- |
| _anonymous_ | string(string) | false    | none         | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string |

## NonceAsString

```json
"123456789"
```

the nonce is a client side incremented unsigned 64 bit integer expressed as
string

### Properties

| Name        | Type           | Required | Restrictions | Description                                                                        |
| ----------- | -------------- | -------- | ------------ | ---------------------------------------------------------------------------------- |
| _anonymous_ | string(string) | false    | none         | the nonce is a client side incremented unsigned 64 bit integer expressed as string |

## SpotAccountID

```json
"1"
```

### Properties

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | string | false    | none         | none        |

## OrderID

```json
"297735387747975680"
```

### Properties

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | string | false    | none         | none        |

## AMMInstructionID

```json
"297735387747975680"
```

### Properties

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | string | false    | none         | none        |

## RequestID

```json
"197735387747975680"
```

### Properties

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | string | false    | none         | none        |

## OrderHandle

```json
"187"
```

Unique numeric (i64) identifier generated on the client side expressed as a
string value

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                              |
| ----------- | ------ | -------- | ------------ | ---------------------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | Unique numeric (i64) identifier generated on the client side expressed as a string value |

## TradingAccountId

```json
"111000000000001"
```

unique trading account ID

### Properties

| Name        | Type   | Required | Restrictions | Description               |
| ----------- | ------ | -------- | ------------ | ------------------------- |
| _anonymous_ | string | false    | none         | unique trading account ID |

## TradingAccountIds

```json
{
  "description": "list of trading account ids.",
  "type": "array",
  "items": {
    "type": "string",
    "example": "111000000000001"
  }
}
```

list of trading account ids.

### Properties

_None_

## MarketID

```json
"10000"
```

### Properties

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | string | false    | none         | none        |

## TradeID

```json
"100020000000000060"
```

### Properties

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | string | false    | none         | none        |

## AssetValue

```json
"1.00000000"
```

see [asset value](#overview--price-and-quantity-precision) format

### Properties

| Name        | Type   | Required | Restrictions | Description                                                       |
| ----------- | ------ | -------- | ------------ | ----------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | see [asset value](#overview--price-and-quantity-precision) format |

## UsdcValue

```json
"1.0000"
```

see [asset value](#overview--price-and-quantity-precision) format

### Properties

| Name        | Type   | Required | Restrictions | Description                                                       |
| ----------- | ------ | -------- | ------------ | ----------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | see [asset value](#overview--price-and-quantity-precision) format |

## UserId

```json
"12345"
```

Bullish user ID

### Properties

| Name        | Type   | Required | Restrictions | Description     |
| ----------- | ------ | -------- | ------------ | --------------- |
| _anonymous_ | string | false    | none         | Bullish user ID |

## TimeStampInSeconds

```json
1621490985
```

number of seconds since EPOCH as integer

### Properties

| Name        | Type           | Required | Restrictions | Description                              |
| ----------- | -------------- | -------- | ------------ | ---------------------------------------- |
| _anonymous_ | integer(int64) | false    | none         | number of seconds since EPOCH as integer |

## DateTime

```json
"2025-05-20T01:01:01.000Z"
```

ISO 8601 with millisecond as string

### Properties

| Name        | Type              | Required | Restrictions | Description                         |
| ----------- | ----------------- | -------- | ------------ | ----------------------------------- |
| _anonymous_ | string(date-time) | false    | none         | ISO 8601 with millisecond as string |

## TimeStamp

```json
"1621490985000"
```

number of milliseconds since EPOCH as string

### Properties

| Name        | Type          | Required | Restrictions | Description                                  |
| ----------- | ------------- | -------- | ------------ | -------------------------------------------- |
| _anonymous_ | string(int64) | false    | none         | number of milliseconds since EPOCH as string |

## CustodyDestinationID

```json
"1560ec0b406c0d909bb9f5f827dd6aa14a1f638884f33a2a3134878102e78038"
```

destination id provided by bullish that uniquely identifies a whitelisted
address or account

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                                  |
| ----------- | ------ | -------- | ------------ | -------------------------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | destination id provided by bullish that uniquely identifies a whitelisted address or account |

## CustodyDestinationUserWalletType

```json
{
  "type": "string",
  "enum": ["HOSTED", "SELF_HOSTED", "UNKNOWN"],
  "description": "The host type of the wallet. `HOSTED` wallet uses a custodial wallet service, `SELF_HOSTED` wallet is a non-custodial wallet."
}
```

The host type of the wallet. `HOSTED` wallet uses a custodial wallet service,
`SELF_HOSTED` wallet is a non-custodial wallet.

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                                                                   |
| ----------- | ------ | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | The host type of the wallet. `HOSTED` wallet uses a custodial wallet service, `SELF_HOSTED` wallet is a non-custodial wallet. |

#### Enumerated Values

| Property    | Value       |
| ----------- | ----------- |
| _anonymous_ | HOSTED      |
| _anonymous_ | SELF_HOSTED |
| _anonymous_ | UNKNOWN     |

## CustodyDestinationSigned

```json
true
```

Whether this destination has been signed by the user. Some operations such as
withdrawal requires the destination to be signed.

### Properties

| Name        | Type    | Required | Restrictions | Description                                                                                                                     |
| ----------- | ------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| _anonymous_ | boolean | false    | none         | Whether this destination has been signed by the user. Some operations such as withdrawal requires the destination to be signed. |

## CustodyDestinationVaspName

```json
"Bullish"
```

The name of the hosting VASP of the wallet. This is only applicable for `HOSTED`
wallets.

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                               |
| ----------- | ------ | -------- | ------------ | ----------------------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | The name of the hosting VASP of the wallet. This is only applicable for `HOSTED` wallets. |

## CustodySelfHostedRequestedDepositAmount

```json
"12.3456"
```

User-requested amount for the deposit.

### Properties

| Name        | Type   | Required | Restrictions | Description                            |
| ----------- | ------ | -------- | ------------ | -------------------------------------- |
| _anonymous_ | string | false    | none         | User-requested amount for the deposit. |

## CustodySelfHostedVerificationAmount

```json
"0.0012"
```

Bullish specified additional small deposit amount to add to the
`requestedDepositAmount` for wallet verification.

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                                                       |
| ----------- | ------ | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | Bullish specified additional small deposit amount to add to the `requestedDepositAmount` for wallet verification. |

## CustodySelfHostedDepositAddress

```json
"0xb0a64d976972d87b0783eeb1ff88306cd1891f02"
```

The address of the Bullish trading account that the user should deposit to
during a self hosted deposit attempt.

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                                                      |
| ----------- | ------ | -------- | ------------ | ---------------------------------------------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | The address of the Bullish trading account that the user should deposit to during a self hosted deposit attempt. |

## CustodySelfHostedDepositMemo

```json
"MZAXEMRXA"
```

The memo or destination tag of the Bullish trading account that the user should
deposit to during a self hosted deposit attempt.

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                                                                      |
| ----------- | ------ | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | The memo or destination tag of the Bullish trading account that the user should deposit to during a self hosted deposit attempt. |

## CustodySelfHostedTotalDepositAmount

```json
"12.3468"
```

The actual amount that the user should deposit for wallet verification. It is
the sum of `requestedDepositAmount` and `verificationAmount`.

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                                                                                 |
| ----------- | ------ | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | The actual amount that the user should deposit for wallet verification. It is the sum of `requestedDepositAmount` and `verificationAmount`. |

## CustodySelfHostedVerificationStatus

```json
{
  "type": "string",
  "enum": ["VERIFIED", "PENDING_VERIFICATION", "VERIFICATION_EXPIRED"],
  "description": "The status for the self-hosted wallet verification attempt.\n- `VERIFIED` - Self-hosted wallet has been verified\n- `PENDING_VERIFICATION` - pending verification via satoshi test\n- `VERIFICATION_EXPIRED` - the verification has expired\n"
}
```

The status for the self-hosted wallet verification attempt.

- `VERIFIED` - Self-hosted wallet has been verified
- `PENDING_VERIFICATION` - pending verification via satoshi test
- `VERIFICATION_EXPIRED` - the verification has expired

### Properties

| Name        | Type   | Required | Restrictions | Description                                                 |
| ----------- | ------ | -------- | ------------ | ----------------------------------------------------------- |
| _anonymous_ | string | false    | none         | The status for the self-hosted wallet verification attempt. |

- `VERIFIED` - Self-hosted wallet has been verified
- `PENDING_VERIFICATION` - pending verification via satoshi test
- `VERIFICATION_EXPIRED` - the verification has expired|

#### Enumerated Values

| Property    | Value                |
| ----------- | -------------------- |
| _anonymous_ | VERIFIED             |
| _anonymous_ | PENDING_VERIFICATION |
| _anonymous_ | VERIFICATION_EXPIRED |

## NetworkID

```json
"ETH"
```

the network of the native coin or token, e.g. BTC, ETH, SOL

### Properties

| Name        | Type   | Required | Restrictions | Description                                                 |
| ----------- | ------ | -------- | ------------ | ----------------------------------------------------------- |
| _anonymous_ | string | false    | none         | the network of the native coin or token, e.g. BTC, ETH, SOL |

## CustodyNetworkAddress

```json
"0xb0a64d976972d87b0783eeb1ff88306cd1891f02"
```

an address on the given network

### Properties

| Name        | Type   | Required | Restrictions | Description                     |
| ----------- | ------ | -------- | ------------ | ------------------------------- |
| _anonymous_ | string | false    | none         | an address on the given network |

## CustodySymbol

```json
"USDC"
```

symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB

### Properties

| Name        | Type   | Required | Restrictions | Description                                                  |
| ----------- | ------ | -------- | ------------ | ------------------------------------------------------------ |
| _anonymous_ | string | false    | none         | symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB |

## CustodyFiatSymbol

```json
"USD"
```

symbol representing fiat currency, e.g. USD, EUR

### Properties

| Name        | Type   | Required | Restrictions | Description                                      |
| ----------- | ------ | -------- | ------------ | ------------------------------------------------ |
| _anonymous_ | string | false    | none         | symbol representing fiat currency, e.g. USD, EUR |

## CustodyTransactionID

```json
"DB:9e6304a08c9cc2a33e6bc6429a088eae2a6b940c8e312aede3a3780257b9b979"
```

unique identifier for tracking a withdrawal during signing and in history

### Properties

| Name        | Type   | Required | Restrictions | Description                                                               |
| ----------- | ------ | -------- | ------------ | ------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | unique identifier for tracking a withdrawal during signing and in history |

## CustodyTransactionHistoryID

```json
"DB:9e6304a08c9cc2a33e6bc6429a088eae2a6b940c8e312aede3a3780257b9b979"
```

unique identifier for tracking a deposit or withdrawal

### Properties

| Name        | Type   | Required | Restrictions | Description                                            |
| ----------- | ------ | -------- | ------------ | ------------------------------------------------------ |
| _anonymous_ | string | false    | none         | unique identifier for tracking a deposit or withdrawal |

## CustodyDirection

```json
"DEPOSIT"
```

direction of transaction from API user's perspective, 'DEPOSIT' or 'WITHDRAWAL'

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                     |
| ----------- | ------ | -------- | ------------ | ------------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | direction of transaction from API user's perspective, 'DEPOSIT' or 'WITHDRAWAL' |

## CustodyWithdrawalChallenge

```json
"041f3105d6e20fc84399dece611f4e6dbf8ad59d51b0db7fd6acf518d38401d4"
```

### Properties

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | string | false    | none         | none        |

## CustodyBankName

```json
"Silvergate Bank"
```

name of bank

### Properties

| Name        | Type   | Required | Restrictions | Description  |
| ----------- | ------ | -------- | ------------ | ------------ |
| _anonymous_ | string | false    | none         | name of bank |

## CustodyPhysicalBankAddress

```json
"4250 Executive Square Suite 300 La Jolla, CA 92037"
```

physical location of bank

### Properties

| Name        | Type   | Required | Restrictions | Description               |
| ----------- | ------ | -------- | ------------ | ------------------------- |
| _anonymous_ | string | false    | none         | physical location of bank |

## CustodyBankAccountNumber

```json
"9873481227"
```

bank account number

### Properties

| Name        | Type   | Required | Restrictions | Description         |
| ----------- | ------ | -------- | ------------ | ------------------- |
| _anonymous_ | string | false    | none         | bank account number |

## CustodyBankNetworkID

```json
"SWIFT"
```

the fiat network, e.g. SWIFT, ABA or SEPA

### Properties

| Name        | Type   | Required | Restrictions | Description                               |
| ----------- | ------ | -------- | ------------ | ----------------------------------------- |
| _anonymous_ | string | false    | none         | the fiat network, e.g. SWIFT, ABA or SEPA |

## CustodyBankRoutingCode

```json
"322286803"
```

routing code of bank

### Properties

| Name        | Type   | Required | Restrictions | Description          |
| ----------- | ------ | -------- | ------------ | -------------------- |
| _anonymous_ | string | false    | none         | routing code of bank |

## CustodyQuantity

```json
"100000.00"
```

total quantity of symbol to withdraw including fee in units of symbol, not in
smaller denominations (e.g. BTC not Satoshi, ETH not Wei) - quantity received
will have fee subtracted.

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                                                                                                                           |
| ----------- | ------ | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | total quantity of symbol to withdraw including fee in units of symbol, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei) - quantity received will have fee subtracted. |

## CustodyWithdrawalFee

```json
"3.00"
```

withdrawal fee charged in units of symbol, not in smaller denominations (e.g.
BTC not Satoshi, ETH not Wei)

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                                                 |
| ----------- | ------ | -------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | withdrawal fee charged in units of symbol, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei) |

## CustodyDepositMemo

```json
"925891241"
```

memo or destination tag used during deposit to help identify account to credit
funds to

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                             |
| ----------- | ------ | -------- | ------------ | --------------------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | memo or destination tag used during deposit to help identify account to credit funds to |

## CustodyWithdrawalMemo

```json
"MZAXEMRXA"
```

memo or destination tag that will be used as a reference on transaction

### Properties

| Name        | Type   | Required | Restrictions | Description                                                             |
| ----------- | ------ | -------- | ------------ | ----------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | memo or destination tag that will be used as a reference on transaction |

## CustodyWithdrawalLabel

```json
"Our cold wallet"
```

descriptive label of destination provided by user

### Properties

| Name        | Type   | Required | Restrictions | Description                                       |
| ----------- | ------ | -------- | ------------ | ------------------------------------------------- |
| _anonymous_ | string | false    | none         | descriptive label of destination provided by user |

## CustodyTransactionStatus

```json
"COMPLETE"
```

one of 'PENDING', 'COMPLETE', 'CANCELLED', 'FAILED'

### Properties

| Name        | Type   | Required | Restrictions | Description                                         |
| ----------- | ------ | -------- | ------------ | --------------------------------------------------- |
| _anonymous_ | string | false    | none         | one of 'PENDING', 'COMPLETE', 'CANCELLED', 'FAILED' |

## CustodyTransactionDetails

```json
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
```

### Properties

| Name           | Type   | Required | Restrictions | Description                                                    |
| -------------- | ------ | -------- | ------------ | -------------------------------------------------------------- |
| address        | string | false    | none         | crypto network address                                         |
| blockchainTxId | string | false    | none         | transaction id on chain                                        |
| swiftUetr      | string | false    | none         | unique end-to-end-transaction reference for swift transactions |

## CustodyAvailableWithdrawalLimit

```json
"20000.0"
```

remaining limit on amount of coin or token that could be withdrawn now, in units
of the symbol itself, not in smaller denominations (e.g. BTC not Satoshi, ETH
not Wei)

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                                                                                                             |
| ----------- | ------ | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | remaining limit on amount of coin or token that could be withdrawn now, in units of the symbol itself, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei) |

## Custody24HWithdrawalLimit

```json
"1000000.00"
```

limit on amount of coin or token that can be withdrawn over a 24 hour period, in
units of the symbol itself, not in smaller denominations (e.g. BTC not Satoshi,
ETH not Wei)

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                                                                                                                   |
| ----------- | ------ | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | limit on amount of coin or token that can be withdrawn over a 24 hour period, in units of the symbol itself, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei) |

## CustodyCreatedAtDateTime

```json
"2022-09-16T07:56:15.000Z"
```

time of initial transaction

### Properties

| Name        | Type   | Required | Restrictions | Description                 |
| ----------- | ------ | -------- | ------------ | --------------------------- |
| _anonymous_ | string | false    | none         | time of initial transaction |

## CustodyUpdatedAtDateTime

```json
"2022-09-16T07:59:23.000Z"
```

last updated time of transaction

### Properties

| Name        | Type   | Required | Restrictions | Description                      |
| ----------- | ------ | -------- | ------------ | -------------------------------- |
| _anonymous_ | string | false    | none         | last updated time of transaction |

## PublicKey

```json
"PUB_R1_6PTdfWbXvXWQduhcCiRooGHTVpriu15xMqfr7EDq6sWLDj7NjS"
```

### Properties

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | string | false    | none         | none        |

## Signature

```json
"SIG_R1_K35d5hSY5FbNoJwrCfmH6QvPG7m9XmhL2mgWYcSB7q2hKJ2mv39Luck9WBJroSB635ZAXhdg36TYG7QJX1fTidbsMvyE8N"
```

### Properties

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | string | false    | none         | none        |

## SpotAccount

```json
{
  "type": "object",
  "required": [
    "accountId",
    "type",
    "symbol",
    "total",
    "free",
    "used",
    "updatedAtDatetime",
    "updatedAtTimestamp"
  ],
  "properties": {
    "accountId": {
      "description": "unique spot account ID",
      "allOf": [
        {
          "type": "string",
          "example": "1"
        }
      ]
    },
    "type": {
      "description": "Spot Account",
      "allOf": [
        {
          "type": "string",
          "description": "Type of Account",
          "example": "spot"
        }
      ]
    },
    "symbol": {
      "description": "asset symbol",
      "allOf": [
        {
          "type": "string",
          "description": "asset symbol as denoted in the world",
          "example": "BTC"
        }
      ]
    },
    "total": {
      "description": "total is `free` + `used` assets within the account, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "free": {
      "description": "refers to the assets that are available to use on the account excluding borrowed assets, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "used": {
      "description": "refers to the assets that are locked in orders, loans and AMM instructions, see [asset value](#overview--price-and-quantity-precision) format",
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

### Properties

| Name               | Type                                          | Required | Restrictions | Description                                                                                                                                                |
| ------------------ | --------------------------------------------- | -------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accountId          | [SpotAccountID](#schemaspotaccountid)         | true     | none         | unique spot account ID                                                                                                                                     |
| type               | string                                        | true     | none         | Spot Account                                                                                                                                               |
| symbol             | [AssetSymbol](#schemaassetsymbol)             | true     | none         | asset symbol                                                                                                                                               |
| total              | [AssetValue](#schemaassetvalue)               | true     | none         | total is `free` + `used` assets within the account, see [asset value](#overview--price-and-quantity-precision) format                                      |
| free               | [AssetValue](#schemaassetvalue)               | true     | none         | refers to the assets that are available to use on the account excluding borrowed assets, see [asset value](#overview--price-and-quantity-precision) format |
| used               | [AssetValue](#schemaassetvalue)               | true     | none         | refers to the assets that are locked in orders, loans and AMM instructions, see [asset value](#overview--price-and-quantity-precision) format              |
| updatedAtDatetime  | [DateTime](#schemadatetime)                   | true     | none         | denotes the time the AMM instruction was updated by the exchange, ISO 8601 with millisecond as string                                                      |
| updatedAtTimestamp | [TimeStampAsString](#schematimestampasstring) | true     | none         | denotes the time the AMM instruction was updated by the exchange                                                                                           |

## AssetAccount

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

### Properties

| Name               | Type                                          | Required | Restrictions | Description                                                                                                                                        |
| ------------------ | --------------------------------------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| tradingAccountId   | [TradingAccountId](#schematradingaccountid)   | true     | none         | unique trading account ID                                                                                                                          |
| assetId            | [AssetID](#schemaassetid)                     | true     | none         | asset ID                                                                                                                                           |
| assetSymbol        | [AssetSymbol](#schemaassetsymbol)             | true     | none         | asset symbol                                                                                                                                       |
| availableQuantity  | [AssetValue](#schemaassetvalue)               | true     | none         | the assets that are available to use on the account, see [asset value](#overview--price-and-quantity-precision) format                             |
| borrowedQuantity   | [AssetValue](#schemaassetvalue)               | true     | none         | the assets on the account that are borrowed, see [asset value](#overview--price-and-quantity-precision) format                                     |
| lockedQuantity     | [AssetValue](#schemaassetvalue)               | true     | none         | the assets on the account that are locked in orders, loans and AMM instructions, see [asset value](#overview--price-and-quantity-precision) format |
| loanedQuantity     | [AssetValue](#schemaassetvalue)               | true     | none         | the assets on the account that are being loaned, see [asset value](#overview--price-and-quantity-precision) format                                 |
| updatedAtDatetime  | [DateTime](#schemadatetime)                   | true     | none         | denotes the time the AMM instruction was updated by the exchange, ISO 8601 with millisecond as string                                              |
| updatedAtTimestamp | [TimeStampAsString](#schematimestampasstring) | true     | none         | denotes the time the AMM instruction was updated by the exchange                                                                                   |

## AmendOrderRequest

```json
{
  "type": "object",
  "required": ["quantity"],
  "properties": {
    "orderId": {
      "description": "unique order ID",
      "allOf": [
        {
          "type": "string",
          "example": "297735387747975680"
        }
      ]
    },
    "handle": {
      "allOf": [
        {
          "description": "Unique numeric (i64) identifier generated on the client side expressed as a string value",
          "type": "string",
          "example": "187"
        }
      ]
    },
    "symbol": {
      "description": "symbol",
      "allOf": [
        {
          "type": "string",
          "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
          "example": "BTCUSDC"
        }
      ]
    },
    "price": {
      "description": "updated price, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "stopPrice": {
      "description": "updated stop price, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "quantity": {
      "description": "updated quantity, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    }
  }
}
```

### Properties

| Name      | Type                                | Required | Restrictions | Description                                                                              |
| --------- | ----------------------------------- | -------- | ------------ | ---------------------------------------------------------------------------------------- |
| orderId   | [OrderID](#schemaorderid)           | false    | none         | unique order ID                                                                          |
| handle    | [OrderHandle](#schemaorderhandle)   | false    | none         | Unique numeric (i64) identifier generated on the client side expressed as a string value |
| symbol    | [MarketSymbol](#schemamarketsymbol) | false    | none         | symbol                                                                                   |
| price     | [AssetValue](#schemaassetvalue)     | false    | none         | updated price, see [asset value](#overview--price-and-quantity-precision) format         |
| stopPrice | [AssetValue](#schemaassetvalue)     | false    | none         | updated stop price, see [asset value](#overview--price-and-quantity-precision) format    |
| quantity  | [AssetValue](#schemaassetvalue)     | true     | none         | updated quantity, see [asset value](#overview--price-and-quantity-precision) format      |

## CreateOrderResponse

```json
{
  "type": "object",
  "required": ["message", "requestId", "orderId", "test"],
  "properties": {
    "message": {
      "description": "message",
      "type": "string",
      "example": "Command acknowledged - CreateOrder"
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
    "orderId": {
      "description": "unique order ID",
      "allOf": [
        {
          "type": "string",
          "example": "297735387747975680"
        }
      ]
    }
  }
}
```

### Properties

| Name      | Type                          | Required | Restrictions | Description       |
| --------- | ----------------------------- | -------- | ------------ | ----------------- |
| message   | string                        | true     | none         | message           |
| requestId | [RequestID](#schemarequestid) | true     | none         | unique request ID |
| orderId   | [OrderID](#schemaorderid)     | true     | none         | unique order ID   |

## CreateOrderCommandResponseV3

```json
{
  "message": "Command acknowledged - CreateOrder",
  "requestId": "633910976353665024",
  "orderId": "633910775316480001",
  "clientOrderId": "1234567",
  "x-widdershins-oldRef": "#/components/schemas/CreateOrderCommandResponseV3/example"
}
```

### Properties

| Name          | Type                          | Required | Restrictions | Description                                                                        |
| ------------- | ----------------------------- | -------- | ------------ | ---------------------------------------------------------------------------------- |
| message       | string                        | true     | none         | message                                                                            |
| requestId     | [RequestID](#schemarequestid) | true     | none         | unique request ID                                                                  |
| orderId       | [OrderID](#schemaorderid)     | true     | none         | unique order ID                                                                    |
| clientOrderId | string                        | false    | none         | unique numeric identifier generated on the client side expressed as a string value |

## AmendOrderCommandResponseV1

```json
{
  "message": "Command acknowledged - AmendOrder",
  "requestId": "633910976353665024",
  "orderId": "633910775316480001",
  "clientOrderId": "1234567-1"
}
```

### Properties

| Name          | Type                          | Required | Restrictions | Description                                             |
| ------------- | ----------------------------- | -------- | ------------ | ------------------------------------------------------- |
| message       | string                        | true     | none         | message                                                 |
| requestId     | [RequestID](#schemarequestid) | true     | none         | unique request ID                                       |
| orderId       | [OrderID](#schemaorderid)     | true     | none         | unique order ID                                         |
| clientOrderId | string                        | false    | none         | Will be updated as part of a successful order amendment |

## CancelOrderCommandResponseV3

```json
{
  "message": "Command acknowledged - CancelOrder",
  "requestId": "633910976353665024",
  "orderId": "633910775316480001"
}
```

### Properties

| Name          | Type                          | Required | Restrictions | Description                                                                        |
| ------------- | ----------------------------- | -------- | ------------ | ---------------------------------------------------------------------------------- |
| message       | string                        | true     | none         | message                                                                            |
| requestId     | [RequestID](#schemarequestid) | true     | none         | unique request ID                                                                  |
| orderId       | [OrderID](#schemaorderid)     | false    | none         | unique order ID                                                                    |
| clientOrderId | string                        | false    | none         | unique numeric identifier generated on the client side expressed as a string value |

## CreateOrderCommand

```json
{
  "type": "object",
  "required": [
    "commandType",
    "handle",
    "symbol",
    "type",
    "side",
    "price",
    "stopPrice",
    "quantity",
    "allowMargin",
    "timeInForce",
    "tradingAccountId"
  ],
  "properties": {
    "commandType": {
      "description": "The command type, it must be 'V2CreateOrder'",
      "type": "string",
      "example": "V2CreateOrder"
    },
    "handle": {
      "allOf": [
        {
          "description": "Unique numeric (i64) identifier generated on the client side expressed as a string value",
          "type": "string",
          "example": "187"
        }
      ]
    },
    "symbol": {
      "allOf": [
        {
          "type": "string",
          "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
          "example": "BTCUSDC"
        }
      ]
    },
    "type": {
      "allOf": [
        {
          "type": "string",
          "description": "order type can have the following string values `\"LMT\"`, `\"MKT\"`, `\"STOP_LIMIT\"`, `\"POST_ONLY\"`.",
          "example": "LMT"
        }
      ],
      "example": "LMT"
    },
    "side": {
      "allOf": [
        {
          "type": "string",
          "description": "order side can have the following string values `\"BUY\"`, `\"SELL\"`",
          "example": "BUY"
        }
      ],
      "example": "BUY"
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
    "timeInForce": {
      "allOf": [
        {
          "type": "string",
          "description": "time in force can have the following string values `\"GTC\"`, `\"FOK\"`, `\"IOC\"`, see [details](#overview--order-timeinforce)"
        }
      ],
      "example": "GTC"
    },
    "allowMargin": {
      "description": "allows to borrow on the order",
      "type": "boolean",
      "example": false
    },
    "tradingAccountId": {
      "allOf": [
        {
          "description": "unique trading account ID",
          "type": "string",
          "example": "111000000000001"
        }
      ]
    }
  }
}
```

### Properties

| Name             | Type                                                        | Required | Restrictions | Description                                                                                                               |
| ---------------- | ----------------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| commandType      | string                                                      | true     | none         | The command type, it must be 'V2CreateOrder'                                                                              |
| handle           | [OrderHandle](#schemaorderhandle)                           | true     | none         | Unique numeric (i64) identifier generated on the client side expressed as a string value                                  |
| symbol           | [MarketSymbol](#schemamarketsymbol)                         | true     | none         | market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market                                             |
| type             | [OrderTypeAsString](#schemaordertypeasstring)               | true     | none         | order type can have the following string values `"LMT"`, `"MKT"`, `"STOP_LIMIT"`, `"POST_ONLY"`.                          |
| side             | [OrderSideAsString](#schemaordersideasstring)               | true     | none         | order side can have the following string values `"BUY"`, `"SELL"`                                                         |
| price            | [AssetValue](#schemaassetvalue)                             | true     | none         | price, see [asset value](#overview--price-and-quantity-precision) format                                                  |
| stopPrice        | [AssetValue](#schemaassetvalue)                             | true     | none         | stop price, see [asset value](#overview--price-and-quantity-precision) format                                             |
| quantity         | [AssetValue](#schemaassetvalue)                             | true     | none         | quantity, see [asset value](#overview--price-and-quantity-precision) format                                               |
| timeInForce      | [OrderTimeInForceAsString](#schemaordertimeinforceasstring) | true     | none         | time in force can have the following string values `"GTC"`, `"FOK"`, `"IOC"`, see [details](#overview--order-timeinforce) |
| allowMargin      | boolean                                                     | true     | none         | allows to borrow on the order                                                                                             |
| tradingAccountId | [TradingAccountId](#schematradingaccountid)                 | true     | none         | unique trading account ID                                                                                                 |

## CreateOrderCommandV3

```json
{
  "type": "object",
  "required": [
    "commandType",
    "symbol",
    "type",
    "side",
    "quantity",
    "timeInForce",
    "tradingAccountId"
  ],
  "properties": {
    "commandType": {
      "description": "The command type, it must be 'V3CreateOrder'",
      "type": "string"
    },
    "clientOrderId": {
      "allOf": [
        {
          "description": "Unique numeric (i64) identifier generated on the client side expressed as a string value",
          "type": "string",
          "example": "187"
        }
      ]
    },
    "symbol": {
      "allOf": [
        {
          "type": "string",
          "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
          "example": "BTCUSDC"
        }
      ]
    },
    "type": {
      "allOf": [
        {
          "type": "string",
          "description": "order type can have the following string values `\"LIMIT\"`, `\"MARKET\"`, `\"STOP_LIMIT\"`, `\"POST_ONLY\"`.",
          "example": "LIMIT"
        }
      ]
    },
    "side": {
      "allOf": [
        {
          "type": "string",
          "description": "order side can have the following string values `\"BUY\"`, `\"SELL\"`",
          "example": "BUY"
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
    "stopPrice": {
      "description": "stop price",
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
    "timeInForce": {
      "allOf": [
        {
          "type": "string",
          "description": "time in force can have the following string values `\"GTC\"`, `\"FOK\"`, `\"IOC\"`, see [details](#overview--order-timeinforce)"
        }
      ]
    },
    "allowBorrow": {
      "description": "allows to borrow on the order",
      "type": "boolean",
      "default": false,
      "example": false
    },
    "tradingAccountId": {
      "allOf": [
        {
          "description": "unique trading account ID",
          "type": "string",
          "example": "111000000000001"
        }
      ]
    }
  }
}
```

### Properties

| Name             | Type                                                        | Required | Restrictions | Description                                                                                                               |
| ---------------- | ----------------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| commandType      | string                                                      | true     | none         | The command type, it must be 'V3CreateOrder'                                                                              |
| clientOrderId    | [OrderHandle](#schemaorderhandle)                           | false    | none         | Unique numeric (i64) identifier generated on the client side expressed as a string value                                  |
| symbol           | [MarketSymbol](#schemamarketsymbol)                         | true     | none         | market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market                                             |
| type             | [OrderTypeAsStringV2](#schemaordertypeasstringv2)           | true     | none         | order type can have the following string values `"LIMIT"`, `"MARKET"`, `"STOP_LIMIT"`, `"POST_ONLY"`.                     |
| side             | [OrderSideAsString](#schemaordersideasstring)               | true     | none         | order side can have the following string values `"BUY"`, `"SELL"`                                                         |
| price            | [AssetValue](#schemaassetvalue)                             | false    | none         | price                                                                                                                     |
| stopPrice        | [AssetValue](#schemaassetvalue)                             | false    | none         | stop price                                                                                                                |
| quantity         | [AssetValue](#schemaassetvalue)                             | true     | none         | quantity                                                                                                                  |
| timeInForce      | [OrderTimeInForceAsString](#schemaordertimeinforceasstring) | true     | none         | time in force can have the following string values `"GTC"`, `"FOK"`, `"IOC"`, see [details](#overview--order-timeinforce) |
| allowBorrow      | boolean                                                     | false    | none         | allows to borrow on the order                                                                                             |
| tradingAccountId | [TradingAccountId](#schematradingaccountid)                 | true     | none         | unique trading account ID                                                                                                 |

## AmendOrderV1

```json
{
  "type": "object",
  "required": ["commandType", "symbol", "tradingAccountId"],
  "properties": {
    "commandType": {
      "description": "The command type, it must be 'V1AmendOrder'",
      "type": "string"
    },
    "orderId": {
      "allOf": [
        {
          "description": "Unique numeric (i64) identifier generated on the client side expressed as a string value",
          "type": "string",
          "example": "187"
        }
      ]
    },
    "symbol": {
      "allOf": [
        {
          "type": "string",
          "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
          "example": "BTCUSDC"
        }
      ]
    },
    "type": {
      "allOf": [
        {
          "type": "string",
          "description": "order type can have the following string values `\"LIMIT\"`, `\"MARKET\"`, `\"STOP_LIMIT\"`, `\"POST_ONLY\"`.",
          "example": "LIMIT"
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
    "clientOrderId": {
      "description": "unique numeric identifier generated on the client side expressed as a string value",
      "type": "string"
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
    "tradingAccountId": {
      "allOf": [
        {
          "description": "unique trading account ID",
          "type": "string",
          "example": "111000000000001"
        }
      ]
    }
  }
}
```

### Properties

| Name             | Type                                              | Required | Restrictions | Description                                                                                           |
| ---------------- | ------------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------- |
| commandType      | string                                            | true     | none         | The command type, it must be 'V1AmendOrder'                                                           |
| orderId          | [OrderHandle](#schemaorderhandle)                 | false    | none         | Unique numeric (i64) identifier generated on the client side expressed as a string value              |
| symbol           | [MarketSymbol](#schemamarketsymbol)               | true     | none         | market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market                         |
| type             | [OrderTypeAsStringV2](#schemaordertypeasstringv2) | false    | none         | order type can have the following string values `"LIMIT"`, `"MARKET"`, `"STOP_LIMIT"`, `"POST_ONLY"`. |
| price            | [AssetValue](#schemaassetvalue)                   | false    | none         | price                                                                                                 |
| clientOrderId    | string                                            | false    | none         | unique numeric identifier generated on the client side expressed as a string value                    |
| quantity         | [AssetValue](#schemaassetvalue)                   | false    | none         | quantity                                                                                              |
| tradingAccountId | [TradingAccountId](#schematradingaccountid)       | true     | none         | unique trading account ID                                                                             |

## TradingAccountResponse

```json
{
  "type": "object",
  "required": [
    "isBorrowing",
    "isLending",
    "isPrimaryAccount",
    "maxInitialLeverage",
    "rateLimitToken",
    "tradingAccountDescription",
    "tradingAccountId",
    "tradingAccountName",
    "isDefaulted",
    "riskLimitUSD",
    "totalBorrowedUSD",
    "totalCollateralUSD",
    "initialMarginUSD",
    "warningMarginUSD",
    "liquidationMarginUSD",
    "fullLiquidationMarginUSD",
    "defaultedMarginUSD",
    "endCustomerId",
    "isConcentrationRiskEnabled",
    "liquidityAddonUSD",
    "marketRiskUSD",
    "marginProfile",
    "totalLiabilitiesUSD",
    "tradeFeeRate"
  ],
  "properties": {
    "isBorrowing": {
      "description": "whether the trading account is borrowing",
      "type": "string",
      "example": "false"
    },
    "isLending": {
      "description": "whether the trading account is lending",
      "type": "string",
      "example": "false"
    },
    "makerFee": {
      "description": "Deprecated and no longer accurate. See `tradeFeeRate` instead",
      "type": "string",
      "example": "0.00000000",
      "deprecated": true
    },
    "takerFee": {
      "description": "Deprecated and no longer accurate. See `tradeFeeRate` instead",
      "type": "string",
      "example": "0.00020000",
      "deprecated": true
    },
    "maxInitialLeverage": {
      "description": "max initial leverage",
      "type": "string",
      "example": "1"
    },
    "tradingAccountId": {
      "description": "id of the trading account",
      "allOf": [
        {
          "description": "unique trading account ID",
          "type": "string",
          "example": "111000000000001"
        }
      ]
    },
    "tradingAccountName": {
      "description": "name of the trading account",
      "type": "string",
      "example": "algo trading account"
    },
    "tradingAccountDescription": {
      "description": "description of the trading account",
      "type": "string",
      "example": "algo trading account with experimental strategy"
    },
    "isPrimaryAccount": {
      "description": "whether this is the primary account",
      "type": "string",
      "example": "false"
    },
    "rateLimitToken": {
      "description": "unique rate limit token of the trading account",
      "type": "string",
      "example": "97d98951b12fb11f330dd9cb1b807d888c702679ee602edcf1ebc6bac17ad63d"
    },
    "isDefaulted": {
      "description": "whether the trading account is defaulted",
      "type": "string",
      "example": "false"
    },
    "tradeFeeRate": {
      "description": "Trade fees per `feeGroupId` for this trading account",
      "type": "array",
      "minItems": 0,
      "items": {
        "allOf": [
          {
            "type": "object",
            "required": ["feeGroupId", "makerFee", "takerFee"],
            "properties": {
              "feeGroupId": {
                "type": "integer",
                "description": "Identifier for this particular fee tier",
                "example": 1
              },
              "makerFee": {
                "type": "string",
                "description": "Maker Fee in basis points (bps)",
                "example": "10"
              },
              "takerFee": {
                "type": "string",
                "description": "Taker Fee in basis points (bps)",
                "example": "10"
              }
            }
          }
        ]
      }
    },
    "riskLimitUSD": {
      "description": "The maximum allowed borrowing for this trading account (in USD currency)",
      "type": "string",
      "example": "10000.0000"
    },
    "totalLiabilitiesUSD": {
      "description": "The The total liabilities for this trading account (in USD currency)",
      "type": "string",
      "example": "14000.0000"
    },
    "totalBorrowedUSD": {
      "description": "total borrowed across all assets in this trading account displayed in the reference asset in USD",
      "type": "string",
      "example": "12000.0000"
    },
    "totalCollateralUSD": {
      "description": "total collateral across all assets in this trading account displayed in the reference asset in USD",
      "type": "string",
      "example": "13000.0000"
    },
    "initialMarginUSD": {
      "description": "The minimum margin one must maintain in order to be able to purposefully increase risk",
      "type": "string",
      "example": "0000.0000"
    },
    "warningMarginUSD": {
      "description": "The minimum margin when the customer will receive warning via email/notifications over UI",
      "type": "string",
      "example": "0000.0000"
    },
    "liquidationMarginUSD": {
      "description": "The minimum value of margin one must maintain in order to avoid liquidation",
      "type": "string",
      "example": "0000.0000"
    },
    "fullLiquidationMarginUSD": {
      "description": "The value of margin when full liquidation occurs",
      "type": "string",
      "example": "0000.0000"
    },
    "defaultedMarginUSD": {
      "description": "The value of margin when this trading account will be moved into a Defaulted state",
      "type": "string",
      "example": "0000.0000"
    },
    "endCustomerId": {
      "description": "The end customer id used for self trade prevention (default is institution id, max 32 characters)",
      "type": "string",
      "example": "PrimeBroker"
    },
    "isConcentrationRiskEnabled": {
      "description": "whether concentration risk checks are enforced for an account when sending new orders. By default, concentration risk checks will apply to all accounts",
      "type": "string",
      "example": true
    },
    "liquidityAddonUSD": {
      "description": "expected market impact of unwinding the portfolio in the case of a liquidation event",
      "type": "string",
      "example": "1000.0000"
    },
    "marketRiskUSD": {
      "description": "the worst possible loss on the portfolio based on scenario analysis",
      "type": "string",
      "example": "2000.0000"
    },
    "marginProfile": {
      "description": "Contains the market risk multipliers applied to a trading account to derive the five individual Margin Requirement values",
      "allOf": [
        {
          "properties": {
            "initialMarketRiskMultiplierPct": {
              "description": "market risk multiplier used to calculate initial margin requirement of the account",
              "type": "string",
              "example": "200.00"
            },
            "warningMarketRiskMultiplierPct": {
              "description": "market risk multiplier used to calculate warning margin requirement of the account",
              "type": "string",
              "example": "150.00"
            },
            "liquidationMarketRiskMultiplierPct": {
              "description": "market risk multiplier used to calculate liquidation margin requirement of the account",
              "type": "string",
              "example": "100.00"
            },
            "fullLiquidationMarketRiskMultiplierPct": {
              "description": "market risk multiplier used to calculate full liquidation margin requirement of the account",
              "type": "string",
              "example": "75.00"
            },
            "defaultedMarketRiskMultiplierPct": {
              "description": "market risk multiplier used to calculate defaulted margin requirement of the account",
              "type": "string",
              "example": "50.00"
            }
          }
        }
      ]
    }
  }
}
```

### Properties

| Name                       | Type                                        | Required | Restrictions | Description                                                                                                                                             |
| -------------------------- | ------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| isBorrowing                | string                                      | true     | none         | whether the trading account is borrowing                                                                                                                |
| isLending                  | string                                      | true     | none         | whether the trading account is lending                                                                                                                  |
| makerFee                   | string                                      | false    | none         | Deprecated and no longer accurate. See `tradeFeeRate` instead                                                                                           |
| takerFee                   | string                                      | false    | none         | Deprecated and no longer accurate. See `tradeFeeRate` instead                                                                                           |
| maxInitialLeverage         | string                                      | true     | none         | max initial leverage                                                                                                                                    |
| tradingAccountId           | [TradingAccountId](#schematradingaccountid) | true     | none         | id of the trading account                                                                                                                               |
| tradingAccountName         | string                                      | true     | none         | name of the trading account                                                                                                                             |
| tradingAccountDescription  | string                                      | true     | none         | description of the trading account                                                                                                                      |
| isPrimaryAccount           | string                                      | true     | none         | whether this is the primary account                                                                                                                     |
| rateLimitToken             | string                                      | true     | none         | unique rate limit token of the trading account                                                                                                          |
| isDefaulted                | string                                      | true     | none         | whether the trading account is defaulted                                                                                                                |
| tradeFeeRate               | [allOf]                                     | true     | none         | Trade fees per `feeGroupId` for this trading account                                                                                                    |
| riskLimitUSD               | string                                      | true     | none         | The maximum allowed borrowing for this trading account (in USD currency)                                                                                |
| totalLiabilitiesUSD        | string                                      | true     | none         | The The total liabilities for this trading account (in USD currency)                                                                                    |
| totalBorrowedUSD           | string                                      | true     | none         | total borrowed across all assets in this trading account displayed in the reference asset in USD                                                        |
| totalCollateralUSD         | string                                      | true     | none         | total collateral across all assets in this trading account displayed in the reference asset in USD                                                      |
| initialMarginUSD           | string                                      | true     | none         | The minimum margin one must maintain in order to be able to purposefully increase risk                                                                  |
| warningMarginUSD           | string                                      | true     | none         | The minimum margin when the customer will receive warning via email/notifications over UI                                                               |
| liquidationMarginUSD       | string                                      | true     | none         | The minimum value of margin one must maintain in order to avoid liquidation                                                                             |
| fullLiquidationMarginUSD   | string                                      | true     | none         | The value of margin when full liquidation occurs                                                                                                        |
| defaultedMarginUSD         | string                                      | true     | none         | The value of margin when this trading account will be moved into a Defaulted state                                                                      |
| endCustomerId              | string                                      | true     | none         | The end customer id used for self trade prevention (default is institution id, max 32 characters)                                                       |
| isConcentrationRiskEnabled | string                                      | true     | none         | whether concentration risk checks are enforced for an account when sending new orders. By default, concentration risk checks will apply to all accounts |
| liquidityAddonUSD          | string                                      | true     | none         | expected market impact of unwinding the portfolio in the case of a liquidation event                                                                    |
| marketRiskUSD              | string                                      | true     | none         | the worst possible loss on the portfolio based on scenario analysis                                                                                     |
| marginProfile              | [MarginProfile](#schemamarginprofile)       | true     | none         | Contains the market risk multipliers applied to a trading account to derive the five individual Margin Requirement values                               |

## MarginProfile

```json
{
  "properties": {
    "initialMarketRiskMultiplierPct": {
      "description": "market risk multiplier used to calculate initial margin requirement of the account",
      "type": "string",
      "example": "200.00"
    },
    "warningMarketRiskMultiplierPct": {
      "description": "market risk multiplier used to calculate warning margin requirement of the account",
      "type": "string",
      "example": "150.00"
    },
    "liquidationMarketRiskMultiplierPct": {
      "description": "market risk multiplier used to calculate liquidation margin requirement of the account",
      "type": "string",
      "example": "100.00"
    },
    "fullLiquidationMarketRiskMultiplierPct": {
      "description": "market risk multiplier used to calculate full liquidation margin requirement of the account",
      "type": "string",
      "example": "75.00"
    },
    "defaultedMarketRiskMultiplierPct": {
      "description": "market risk multiplier used to calculate defaulted margin requirement of the account",
      "type": "string",
      "example": "50.00"
    }
  }
}
```

### Properties

| Name                                   | Type   | Required | Restrictions | Description                                                                                 |
| -------------------------------------- | ------ | -------- | ------------ | ------------------------------------------------------------------------------------------- |
| initialMarketRiskMultiplierPct         | string | false    | none         | market risk multiplier used to calculate initial margin requirement of the account          |
| warningMarketRiskMultiplierPct         | string | false    | none         | market risk multiplier used to calculate warning margin requirement of the account          |
| liquidationMarketRiskMultiplierPct     | string | false    | none         | market risk multiplier used to calculate liquidation margin requirement of the account      |
| fullLiquidationMarketRiskMultiplierPct | string | false    | none         | market risk multiplier used to calculate full liquidation margin requirement of the account |
| defaultedMarketRiskMultiplierPct       | string | false    | none         | market risk multiplier used to calculate defaulted margin requirement of the account        |

## CreateAMMInstructionResponse

```json
{
  "type": "object",
  "required": ["message", "requestId", "liquidityId", "test"],
  "properties": {
    "message": {
      "description": "message",
      "type": "string",
      "example": "Command acknowledged - AddLiquidity"
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
    "liquidityId": {
      "description": "unique AMM instruction ID",
      "allOf": [
        {
          "type": "string",
          "example": "297735387747975680"
        }
      ]
    }
  }
}
```

### Properties

| Name        | Type                                        | Required | Restrictions | Description               |
| ----------- | ------------------------------------------- | -------- | ------------ | ------------------------- |
| message     | string                                      | true     | none         | message                   |
| requestId   | [RequestID](#schemarequestid)               | true     | none         | unique request ID         |
| liquidityId | [AMMInstructionID](#schemaamminstructionid) | true     | none         | unique AMM instruction ID |

## CreateAMMInstructionCommandResponseV3

```json
{
  "message": "Command acknowledged - CreateAMMInstruction",
  "requestId": "633906221577404416",
  "instructionId": "633906221577404424"
}
```

### Properties

| Name          | Type                                        | Required | Restrictions | Description               |
| ------------- | ------------------------------------------- | -------- | ------------ | ------------------------- |
| message       | string                                      | true     | none         | message                   |
| requestId     | [RequestID](#schemarequestid)               | true     | none         | unique request ID         |
| instructionId | [AMMInstructionID](#schemaamminstructionid) | true     | none         | unique AMM instruction ID |

## TerminateAMMInstructionCommandResponseV3

```json
{
  "message": "Command acknowledged - TerminateAMMInstruction",
  "requestId": "633906221577404416",
  "instructionId": "633906221577404424"
}
```

### Properties

| Name          | Type                                        | Required | Restrictions | Description               |
| ------------- | ------------------------------------------- | -------- | ------------ | ------------------------- |
| message       | string                                      | true     | none         | message                   |
| requestId     | [RequestID](#schemarequestid)               | true     | none         | unique request ID         |
| instructionId | [AMMInstructionID](#schemaamminstructionid) | true     | none         | unique AMM instruction ID |

## BadOrderEntryResponse

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

### Properties

| Name          | Type    | Required | Restrictions | Description            |
| ------------- | ------- | -------- | ------------ | ---------------------- |
| message       | string  | true     | none         | message                |
| errorCode     | integer | true     | none         | unique error code      |
| errorCodeName | string  | true     | none         | unique error code name |

## CreateAMMInstructionCommand

```json
{
  "type": "object",
  "required": [
    "commandType",
    "symbol",
    "baseQuantity",
    "quoteQuantity",
    "upperBound",
    "lowerBound",
    "feeTierId",
    "tradingAccountId"
  ],
  "properties": {
    "commandType": {
      "description": "The command type, it must be 'V2AddLiquidity'",
      "type": "string",
      "example": "V2AddLiquidity"
    },
    "symbol": {
      "allOf": [
        {
          "type": "string",
          "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
          "example": "BTCUSDC"
        }
      ]
    },
    "baseQuantity": {
      "description": "base quantity, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "quoteQuantity": {
      "description": "quote quantity, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "upperBound": {
      "type": "string",
      "description": "upper bound of price range, in quote currency",
      "example": "14000.0000"
    },
    "lowerBound": {
      "type": "string",
      "description": "lower bound of price range, in quote currency",
      "example": "12000.0000"
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
    "tradingAccountId": {
      "allOf": [
        {
          "description": "unique trading account ID",
          "type": "string",
          "example": "111000000000001"
        }
      ]
    }
  }
}
```

### Properties

| Name             | Type                                        | Required | Restrictions | Description                                                                       |
| ---------------- | ------------------------------------------- | -------- | ------------ | --------------------------------------------------------------------------------- |
| commandType      | string                                      | true     | none         | The command type, it must be 'V2AddLiquidity'                                     |
| symbol           | [MarketSymbol](#schemamarketsymbol)         | true     | none         | market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market     |
| baseQuantity     | [AssetValue](#schemaassetvalue)             | true     | none         | base quantity, see [asset value](#overview--price-and-quantity-precision) format  |
| quoteQuantity    | [AssetValue](#schemaassetvalue)             | true     | none         | quote quantity, see [asset value](#overview--price-and-quantity-precision) format |
| upperBound       | string                                      | true     | none         | upper bound of price range, in quote currency                                     |
| lowerBound       | string                                      | true     | none         | lower bound of price range, in quote currency                                     |
| feeTierId        | [FeeTierId](#schemafeetierid)               | true     | none         | unique fee tier ID, see [Get Market By Symbol](#get-/v1/markets/-symbol-)         |
| tradingAccountId | [TradingAccountId](#schematradingaccountid) | true     | none         | unique trading account ID                                                         |

## CreateAMMInstructionCommandV3

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

### Properties

| Name             | Type                                        | Required | Restrictions | Description                                                                   |
| ---------------- | ------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------- |
| commandType      | string                                      | true     | none         | The command type, it must be 'V3CreateAMMInstruction'                         |
| symbol           | [MarketSymbol](#schemamarketsymbol)         | true     | none         | market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market |
| baseQuantity     | [AssetValue](#schemaassetvalue)             | true     | none         | base quantity                                                                 |
| quoteQuantity    | [AssetValue](#schemaassetvalue)             | true     | none         | quote quantity                                                                |
| upperBound       | string                                      | true     | none         | upper bound of price range, in quote currency                                 |
| lowerBound       | string                                      | true     | none         | lower bound of price range, in quote currency                                 |
| feeTierId        | [FeeTierId](#schemafeetierid)               | true     | none         | unique fee tier ID, see [Get Market By Symbol](#get-/v1/markets/-symbol-)     |
| tradingAccountId | [TradingAccountId](#schematradingaccountid) | true     | none         | unique trading account ID                                                     |

## CancelOrderCommand

```json
{
  "type": "object",
  "required": [
    "commandType",
    "orderId",
    "handle",
    "symbol",
    "tradingAccountId"
  ],
  "properties": {
    "commandType": {
      "description": "The command type, it must be 'V2CancelOrder'",
      "type": "string",
      "example": "V2CancelOrder"
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
    "handle": {
      "allOf": [
        {
          "description": "Unique numeric (i64) identifier generated on the client side expressed as a string value",
          "type": "string",
          "example": "187"
        }
      ]
    },
    "symbol": {
      "allOf": [
        {
          "type": "string",
          "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
          "example": "BTCUSDC"
        }
      ]
    },
    "tradingAccountId": {
      "allOf": [
        {
          "description": "unique trading account ID",
          "type": "string",
          "example": "111000000000001"
        }
      ]
    }
  }
}
```

### Properties

| Name             | Type                                        | Required | Restrictions | Description                                                                              |
| ---------------- | ------------------------------------------- | -------- | ------------ | ---------------------------------------------------------------------------------------- |
| commandType      | string                                      | true     | none         | The command type, it must be 'V2CancelOrder'                                             |
| orderId          | [OrderID](#schemaorderid)                   | true     | none         | unique order ID                                                                          |
| handle           | [OrderHandle](#schemaorderhandle)           | true     | none         | Unique numeric (i64) identifier generated on the client side expressed as a string value |
| symbol           | [MarketSymbol](#schemamarketsymbol)         | true     | none         | market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market            |
| tradingAccountId | [TradingAccountId](#schematradingaccountid) | true     | none         | unique trading account ID                                                                |

## CancelOrderCommandV3

```json
{
  "commandType": "V3CancelOrder",
  "orderId": "297735387747975680",
  "symbol": "BTCUSDC",
  "tradingAccountId": "111000000000001",
  "x-widdershins-oldRef": "#/components/schemas/CancelOrderCommandV3/example"
}
```

### Properties

| Name             | Type                                        | Required | Restrictions | Description                                                                              |
| ---------------- | ------------------------------------------- | -------- | ------------ | ---------------------------------------------------------------------------------------- |
| commandType      | string                                      | true     | none         | The command type, it must be 'V3CancelOrder'                                             |
| orderId          | [OrderID](#schemaorderid)                   | false    | none         | unique order ID                                                                          |
| clientOrderId    | [OrderHandle](#schemaorderhandle)           | false    | none         | Unique numeric (i64) identifier generated on the client side expressed as a string value |
| symbol           | [MarketSymbol](#schemamarketsymbol)         | true     | none         | market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market            |
| tradingAccountId | [TradingAccountId](#schematradingaccountid) | true     | none         | unique trading account ID                                                                |

## AmendOrderCommandV1

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

### Properties

| Name             | Type                                                    | Required | Restrictions | Description                                                                        |
| ---------------- | ------------------------------------------------------- | -------- | ------------ | ---------------------------------------------------------------------------------- |
| commandType      | string                                                  | true     | none         | The command type, it must be 'V1AmendOrder'                                        |
| orderId          | [OrderID](#schemaorderid)                               | false    | none         | unique order ID                                                                    |
| symbol           | [MarketSymbol](#schemamarketsymbol)                     | true     | none         | market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market      |
| type             | [OrderTypeAsStringAmend](#schemaordertypeasstringamend) | false    | none         | order type can have the following string values `"LIMIT"`, `"POST_ONLY"`           |
| price            | [AssetValue](#schemaassetvalue)                         | false    | none         | price                                                                              |
| clientOrderId    | string                                                  | false    | none         | unique numeric identifier generated on the client side expressed as a string value |
| quantity         | [AssetValue](#schemaassetvalue)                         | false    | none         | quantity                                                                           |
| tradingAccountId | [TradingAccountId](#schematradingaccountid)             | true     | none         | unique trading account ID                                                          |

## TerminateAMMInstructionCommandV3

```json
{
  "commandType": "V3TerminateAMMInstruction",
  "instructionId": "297735387747975680",
  "symbol": "BTCUSDC",
  "tradingAccountId": "111000000000001",
  "x-widdershins-oldRef": "#/components/schemas/TerminateAMMInstructionCommandV3/example"
}
```

### Properties

| Name             | Type                                        | Required | Restrictions | Description                                                                   |
| ---------------- | ------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------- |
| commandType      | string                                      | true     | none         | The command type, it must be 'V3TerminateAMMInstruction'                      |
| instructionId    | [AMMInstructionID](#schemaamminstructionid) | true     | none         | unique AMM instruction ID                                                     |
| symbol           | [MarketSymbol](#schemamarketsymbol)         | true     | none         | market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market |
| tradingAccountId | [TradingAccountId](#schematradingaccountid) | true     | none         | unique trading account ID                                                     |

## CancelAllOrdersRequest

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
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "123456789",
          "description": "the nonce is a client side incremented unsigned 64 bit integer expressed as string"
        }
      ]
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
      "description": "the command to be executed which is sent in the request payload",
      "allOf": [
        {
          "type": "object",
          "required": ["commandType", "tradingAccountId"],
          "properties": {
            "commandType": {
              "description": "The command type, it must be 'V1CancelAllOrders'",
              "type": "string"
            },
            "tradingAccountId": {
              "description": "unique trading account Id",
              "allOf": [
                {
                  "description": "unique trading account ID",
                  "type": "string",
                  "example": "111000000000001"
                }
              ]
            }
          },
          "example": {
            "commandType": "V1CancelAllOrders",
            "tradingAccountId": "111000000000001"
          }
        }
      ]
    }
  }
}
```

### Properties

| Name       | Type                                                    | Required | Restrictions | Description                                                                                       |
| ---------- | ------------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------- |
| timestamp  | [TimeStampAsString](#schematimestampasstring)           | true     | none         | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string |
| nonce      | [NonceAsString](#schemanonceasstring)                   | true     | none         | the nonce is a client side incremented unsigned 64 bit integer expressed as string                |
| authorizer | [Authorizer](#schemaauthorizer)                         | true     | none         | JWT authorizer you obtain along with the [JWT token](#overview--generate-a-jwt-token)             |
| command    | [CancelAllOrdersCommand](#schemacancelallorderscommand) | true     | none         | the command to be executed which is sent in the request payload                                   |

## CancelAllOrdersCommand

```json
{
  "commandType": "V1CancelAllOrders",
  "tradingAccountId": "111000000000001",
  "x-widdershins-oldRef": "#/components/schemas/CancelAllOrdersCommand/example"
}
```

### Properties

| Name             | Type                                        | Required | Restrictions | Description                                      |
| ---------------- | ------------------------------------------- | -------- | ------------ | ------------------------------------------------ |
| commandType      | string                                      | true     | none         | The command type, it must be 'V1CancelAllOrders' |
| tradingAccountId | [TradingAccountId](#schematradingaccountid) | true     | none         | unique trading account Id                        |

## CancelAllOrdersResponse

```json
{
  "message": "Command acknowledged - CancelAllOrders",
  "requestId": "633900538459062272"
}
```

### Properties

| Name      | Type                          | Required | Restrictions | Description       |
| --------- | ----------------------------- | -------- | ------------ | ----------------- |
| message   | string                        | true     | none         | message           |
| requestId | [RequestID](#schemarequestid) | true     | none         | unique request ID |

## DelayedCancelAllOrdersRequest

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
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "123456789",
          "description": "the nonce is a client side incremented unsigned 64 bit integer expressed as string"
        }
      ]
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
      "description": "the command to be executed which is sent in the request payload",
      "allOf": [
        {
          "type": "object",
          "required": ["commandType", "delayBySeconds", "tradingAccountId"],
          "properties": {
            "commandType": {
              "description": "The command type, it must be 'V1DelayedCancelAllOrders'",
              "type": "string",
              "example": "V1DelayedCancelAllOrders"
            },
            "cancelId": {
              "allOf": [
                {
                  "description": "Unique id for this cancel request which is an unsigned 64 bit integer expressed as string",
                  "type": "string",
                  "example": "123456789"
                }
              ]
            },
            "delayBySeconds": {
              "description": "Delay of the cancel-all-order in seconds",
              "allOf": [
                {
                  "description": "Delay the cancel-all-orders request by (seconds) as a timeout mechanism",
                  "type": "string",
                  "enum": ["5", "10", "15", "20", "25", "30", "40", "50", "60"],
                  "example": "5"
                }
              ]
            },
            "tradingAccountId": {
              "allOf": [
                {
                  "description": "unique trading account ID",
                  "type": "string",
                  "example": "111000000000001"
                }
              ]
            }
          },
          "example": {
            "commandType": "V1DelayedCancelAllOrders",
            "delayBySeconds": "5",
            "tradingAccountId": "111000000000001"
          }
        }
      ]
    }
  }
}
```

### Properties

| Name       | Type                                                                  | Required | Restrictions | Description                                                                                       |
| ---------- | --------------------------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------- |
| timestamp  | [TimeStampAsString](#schematimestampasstring)                         | true     | none         | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string |
| nonce      | [NonceAsString](#schemanonceasstring)                                 | true     | none         | the nonce is a client side incremented unsigned 64 bit integer expressed as string                |
| authorizer | [Authorizer](#schemaauthorizer)                                       | true     | none         | JWT authorizer you obtain along with the [JWT token](#overview--generate-a-jwt-token)             |
| command    | [DelayedCancelAllOrdersCommand](#schemadelayedcancelallorderscommand) | true     | none         | the command to be executed which is sent in the request payload                                   |

## DelayedCancelAllOrdersCommand

```json
{
  "commandType": "V1DelayedCancelAllOrders",
  "delayBySeconds": "5",
  "tradingAccountId": "111000000000001",
  "x-widdershins-oldRef": "#/components/schemas/DelayedCancelAllOrdersCommand/example"
}
```

### Properties

| Name             | Type                                        | Required | Restrictions | Description                                                                               |
| ---------------- | ------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------------- |
| commandType      | string                                      | true     | none         | The command type, it must be 'V1DelayedCancelAllOrders'                                   |
| cancelId         | [CancelId](#schemacancelid)                 | false    | none         | Unique id for this cancel request which is an unsigned 64 bit integer expressed as string |
| delayBySeconds   | [DelayBySeconds](#schemadelaybyseconds)     | true     | none         | Delay of the cancel-all-order in seconds                                                  |
| tradingAccountId | [TradingAccountId](#schematradingaccountid) | true     | none         | unique trading account ID                                                                 |

## DelayedCancelAllOrdersResponse

```json
{
  "message": "Command acknowledged - DelayedCancelAllOrders",
  "requestId": "633914459442118656"
}
```

### Properties

| Name      | Type                          | Required | Restrictions | Description       |
| --------- | ----------------------------- | -------- | ------------ | ----------------- |
| message   | string                        | true     | none         | message           |
| requestId | [RequestID](#schemarequestid) | true     | none         | unique request ID |

## UnsetDelayedCancelAllOrdersRequest

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
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "123456789",
          "description": "the nonce is a client side incremented unsigned 64 bit integer expressed as string"
        }
      ]
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
      "description": "the command to be executed which is sent in the request payload",
      "allOf": [
        {
          "type": "object",
          "required": ["commandType", "tradingAccountId"],
          "properties": {
            "commandType": {
              "description": "The command type, it must be 'V1UnsetDelayedCancelAllOrders'",
              "type": "string",
              "example": "V1UnsetDelayedCancelAllOrders"
            },
            "tradingAccountId": {
              "allOf": [
                {
                  "description": "unique trading account ID",
                  "type": "string",
                  "example": "111000000000001"
                }
              ]
            }
          },
          "example": {
            "commandType": "V1UnsetDelayedCancelAllOrders",
            "tradingAccountId": "111000000000001"
          }
        }
      ]
    }
  }
}
```

### Properties

| Name       | Type                                                                            | Required | Restrictions | Description                                                                                       |
| ---------- | ------------------------------------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------- |
| timestamp  | [TimeStampAsString](#schematimestampasstring)                                   | true     | none         | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string |
| nonce      | [NonceAsString](#schemanonceasstring)                                           | true     | none         | the nonce is a client side incremented unsigned 64 bit integer expressed as string                |
| authorizer | [Authorizer](#schemaauthorizer)                                                 | true     | none         | JWT authorizer you obtain along with the [JWT token](#overview--generate-a-jwt-token)             |
| command    | [UnsetDelayedCancelAllOrdersCommand](#schemaunsetdelayedcancelallorderscommand) | true     | none         | the command to be executed which is sent in the request payload                                   |

## UnsetDelayedCancelAllOrdersCommand

```json
{
  "commandType": "V1UnsetDelayedCancelAllOrders",
  "tradingAccountId": "111000000000001",
  "x-widdershins-oldRef": "#/components/schemas/UnsetDelayedCancelAllOrdersCommand/example"
}
```

### Properties

| Name             | Type                                        | Required | Restrictions | Description                                                  |
| ---------------- | ------------------------------------------- | -------- | ------------ | ------------------------------------------------------------ |
| commandType      | string                                      | true     | none         | The command type, it must be 'V1UnsetDelayedCancelAllOrders' |
| tradingAccountId | [TradingAccountId](#schematradingaccountid) | true     | none         | unique trading account ID                                    |

## UnsetDelayedCancelAllOrdersResponse

```json
{
  "message": "Command acknowledged - UnsetDelayedCancelAllOrders",
  "requestId": "633914459442118656"
}
```

### Properties

| Name      | Type                          | Required | Restrictions | Description       |
| --------- | ----------------------------- | -------- | ------------ | ----------------- |
| message   | string                        | true     | none         | message           |
| requestId | [RequestID](#schemarequestid) | true     | none         | unique request ID |

## JWT

```json
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FuZGVlcCByYWtocmEifQ.wyVq6PlKaldWXtu-jz2hJCvkGl1lM2S7HUKCH8LnXp0"
```

JWT token

### Properties

| Name        | Type           | Required | Restrictions | Description |
| ----------- | -------------- | -------- | ------------ | ----------- |
| _anonymous_ | string(string) | false    | none         | JWT token   |

## Authorizer

```json
"03E02367E8C900000500000000000000"
```

JWT authorizer you obtain along with the
[JWT token](#overview--generate-a-jwt-token)

### Properties

| Name        | Type           | Required | Restrictions | Description                                                                           |
| ----------- | -------------- | -------- | ------------ | ------------------------------------------------------------------------------------- |
| _anonymous_ | string(string) | false    | none         | JWT authorizer you obtain along with the [JWT token](#overview--generate-a-jwt-token) |

## TradingAccountTransferRequest

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
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "123456789",
          "description": "the nonce is a client side incremented unsigned 64 bit integer expressed as string"
        }
      ]
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
      "description": "the command to be executed which is sent in the request payload",
      "allOf": [
        {
          "type": "object",
          "required": [
            "commandType",
            "assetSymbol",
            "quantity",
            "fromTradingAccountId",
            "toTradingAccountId"
          ],
          "properties": {
            "commandType": {
              "description": "The command type, e.g. 'V1TransferAsset'",
              "type": "string",
              "example": "V1TransferAsset"
            },
            "assetSymbol": {
              "description": "Symbol of the asset. i.e. currency",
              "allOf": [
                {
                  "type": "string",
                  "description": "asset symbol as denoted in the world",
                  "example": "BTC"
                }
              ]
            },
            "quantity": {
              "description": "Quantity of the asset.",
              "type": "string",
              "example": "100"
            },
            "fromTradingAccountId": {
              "description": "Source of the asset transfer",
              "allOf": [
                {
                  "description": "unique trading account ID",
                  "type": "string",
                  "example": "111000000000001"
                }
              ]
            },
            "toTradingAccountId": {
              "description": "Destination of the asset transfer",
              "allOf": [
                {
                  "description": "unique trading account ID",
                  "type": "string",
                  "example": "111000000000001"
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

### Properties

| Name       | Type                                                | Required | Restrictions | Description                                                                                       |
| ---------- | --------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------- |
| timestamp  | [TimeStampAsString](#schematimestampasstring)       | true     | none         | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string |
| nonce      | [NonceAsString](#schemanonceasstring)               | true     | none         | the nonce is a client side incremented unsigned 64 bit integer expressed as string                |
| authorizer | [Authorizer](#schemaauthorizer)                     | true     | none         | JWT authorizer you obtain along with the [JWT token](#overview--generate-a-jwt-token)             |
| command    | [TransferAssetCommand](#schematransferassetcommand) | true     | none         | the command to be executed which is sent in the request payload                                   |

## TradingAccountTransferResponse

```json
{
  "message": "Command acknowledged - TransferAsset",
  "requestId": "633909659774222336"
}
```

### Properties

| Name      | Type                          | Required | Restrictions | Description       |
| --------- | ----------------------------- | -------- | ------------ | ----------------- |
| message   | string                        | true     | none         | message           |
| requestId | [RequestID](#schemarequestid) | true     | none         | unique request ID |

## TransferAssetCommand

```json
{
  "type": "object",
  "required": [
    "commandType",
    "assetSymbol",
    "quantity",
    "fromTradingAccountId",
    "toTradingAccountId"
  ],
  "properties": {
    "commandType": {
      "description": "The command type, e.g. 'V1TransferAsset'",
      "type": "string",
      "example": "V1TransferAsset"
    },
    "assetSymbol": {
      "description": "Symbol of the asset. i.e. currency",
      "allOf": [
        {
          "type": "string",
          "description": "asset symbol as denoted in the world",
          "example": "BTC"
        }
      ]
    },
    "quantity": {
      "description": "Quantity of the asset.",
      "type": "string",
      "example": "100"
    },
    "fromTradingAccountId": {
      "description": "Source of the asset transfer",
      "allOf": [
        {
          "description": "unique trading account ID",
          "type": "string",
          "example": "111000000000001"
        }
      ]
    },
    "toTradingAccountId": {
      "description": "Destination of the asset transfer",
      "allOf": [
        {
          "description": "unique trading account ID",
          "type": "string",
          "example": "111000000000001"
        }
      ]
    }
  }
}
```

### Properties

| Name                 | Type                                        | Required | Restrictions | Description                              |
| -------------------- | ------------------------------------------- | -------- | ------------ | ---------------------------------------- |
| commandType          | string                                      | true     | none         | The command type, e.g. 'V1TransferAsset' |
| assetSymbol          | [AssetSymbol](#schemaassetsymbol)           | true     | none         | Symbol of the asset. i.e. currency       |
| quantity             | string                                      | true     | none         | Quantity of the asset.                   |
| fromTradingAccountId | [TradingAccountId](#schematradingaccountid) | true     | none         | Source of the asset transfer             |
| toTradingAccountId   | [TradingAccountId](#schematradingaccountid) | true     | none         | Destination of the asset transfer        |

## TransferAssetCommandV2

```json
{
  "commandType": "V2TransferAsset",
  "assetSymbol": "BTC",
  "quantity": "100.1",
  "fromTradingAccountId": "111000000000001",
  "toTradingAccountId": "111000000000002",
  "x-widdershins-oldRef": "#/components/schemas/TransferAssetCommandV2/example"
}
```

### Properties

| Name                                                                          | Type                                        | Required | Restrictions | Description                                                                                          |
| ----------------------------------------------------------------------------- | ------------------------------------------- | -------- | ------------ | ---------------------------------------------------------------------------------------------------- |
| commandType                                                                   | string                                      | true     | none         | The command type, e.g. 'V2TransferAsset'                                                             |
| assetSymbol                                                                   | [AssetSymbol](#schemaassetsymbol)           | true     | none         | Symbol of the asset. i.e. currency                                                                   |
| quantity                                                                      | string                                      | true     | none         | Quantity of the asset. Can be representated with any number of trailing zeroes up to asset precision |
| (eg `100.1`, `100.10`, `100.100`, `100.1000` are valid for asset precision 4) |
| fromTradingAccountId                                                          | [TradingAccountId](#schematradingaccountid) | true     | none         | Source of the asset transfer                                                                         |
| toTradingAccountId                                                            | [TradingAccountId](#schematradingaccountid) | true     | none         | Destination of the asset transfer                                                                    |

## CancelAllOrdersByMarketRequest

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
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "123456789",
          "description": "the nonce is a client side incremented unsigned 64 bit integer expressed as string"
        }
      ]
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
      "description": "the command to be executed which is sent in the request payload",
      "allOf": [
        {
          "type": "object",
          "required": ["commandType", "symbol", "tradingAccountId"],
          "properties": {
            "commandType": {
              "description": "The command type, it must be 'V1CancelAllOrdersByMarket'",
              "type": "string"
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
            "tradingAccountId": {
              "description": "unique trading account Id",
              "allOf": [
                {
                  "description": "unique trading account ID",
                  "type": "string",
                  "example": "111000000000001"
                }
              ]
            }
          },
          "example": {
            "commandType": "V1CancelAllOrdersByMarket",
            "symbol": "BTCUSDC",
            "tradingAccountId": "111000000000001"
          }
        }
      ]
    }
  }
}
```

### Properties

| Name       | Type                                                                    | Required | Restrictions | Description                                                                                       |
| ---------- | ----------------------------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------- |
| timestamp  | [TimeStampAsString](#schematimestampasstring)                           | true     | none         | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string |
| nonce      | [NonceAsString](#schemanonceasstring)                                   | true     | none         | the nonce is a client side incremented unsigned 64 bit integer expressed as string                |
| authorizer | [Authorizer](#schemaauthorizer)                                         | true     | none         | JWT authorizer you obtain along with the [JWT token](#overview--generate-a-jwt-token)             |
| command    | [CancelAllOrdersByMarketCommand](#schemacancelallordersbymarketcommand) | true     | none         | the command to be executed which is sent in the request payload                                   |

## CancelAllOrdersByMarketCommand

```json
{
  "commandType": "V1CancelAllOrdersByMarket",
  "symbol": "BTCUSDC",
  "tradingAccountId": "111000000000001",
  "x-widdershins-oldRef": "#/components/schemas/CancelAllOrdersByMarketCommand/example"
}
```

### Properties

| Name             | Type                                        | Required | Restrictions | Description                                              |
| ---------------- | ------------------------------------------- | -------- | ------------ | -------------------------------------------------------- |
| commandType      | string                                      | true     | none         | The command type, it must be 'V1CancelAllOrdersByMarket' |
| symbol           | [MarketSymbol](#schemamarketsymbol)         | true     | none         | market symbol                                            |
| tradingAccountId | [TradingAccountId](#schematradingaccountid) | true     | none         | unique trading account Id                                |

## CancelAllOrdersByMarketResponse

```json
{
  "message": "Command acknowledged - CancelAllOrdersByMarket",
  "requestId": "633914459442118656"
}
```

### Properties

| Name      | Type                          | Required | Restrictions | Description       |
| --------- | ----------------------------- | -------- | ------------ | ----------------- |
| message   | string                        | true     | none         | message           |
| requestId | [RequestID](#schemarequestid) | true     | none         | unique request ID |

## LoginRequest

```json
{
  "type": "object",
  "required": ["timestamp", "nonce", "authorizer", "command"],
  "properties": {
    "publicKey": {
      "allOf": [
        {
          "type": "string",
          "example": "PUB_R1_6PTdfWbXvXWQduhcCiRooGHTVpriu15xMqfr7EDq6sWLDj7NjS"
        }
      ]
    },
    "signature": {
      "allOf": [
        {
          "type": "string",
          "example": "SIG_R1_K35d5hSY5FbNoJwrCfmH6QvPG7m9XmhL2mgWYcSB7q2hKJ2mv39Luck9WBJroSB635ZAXhdg36TYG7QJX1fTidbsMvyE8N"
        }
      ]
    },
    "loginPayload": {
      "allOf": [
        {
          "type": "object",
          "required": [
            "userId",
            "nonce",
            "expirationTime",
            "biometricsUsed",
            "sessionKey"
          ],
          "properties": {
            "userId": {
              "description": "Bullish user ID corresponding to the metadata",
              "allOf": [
                {
                  "type": "string",
                  "example": "12345",
                  "description": "Bullish user ID"
                }
              ]
            },
            "nonce": {
              "description": "epoch timestamp in seconds; note this login API nonce has no connection to the orders API nonce",
              "allOf": [
                {
                  "type": "integer",
                  "format": "int64",
                  "example": 1621490985,
                  "description": "number of seconds since EPOCH as integer"
                }
              ]
            },
            "expirationTime": {
              "description": "epoch timestamp in seconds that is 5 minutes in the future",
              "allOf": [
                {
                  "type": "integer",
                  "format": "int64",
                  "example": 1621490985,
                  "description": "number of seconds since EPOCH as integer"
                }
              ]
            },
            "biometricsUsed": {
              "description": "biometrics flag. always `false`",
              "type": "boolean",
              "example": false
            },
            "sessionKey": {
              "description": "session key. always `null`",
              "type": "string",
              "example": null
            }
          }
        }
      ]
    }
  }
}
```

### Properties

| Name         | Type                                | Required | Restrictions | Description |
| ------------ | ----------------------------------- | -------- | ------------ | ----------- |
| publicKey    | [PublicKey](#schemapublickey)       | false    | none         | none        |
| signature    | [Signature](#schemasignature)       | false    | none         | none        |
| loginPayload | [LoginPayload](#schemaloginpayload) | false    | none         | none        |

## LoginPayload

```json
{
  "type": "object",
  "required": [
    "userId",
    "nonce",
    "expirationTime",
    "biometricsUsed",
    "sessionKey"
  ],
  "properties": {
    "userId": {
      "description": "Bullish user ID corresponding to the metadata",
      "allOf": [
        {
          "type": "string",
          "example": "12345",
          "description": "Bullish user ID"
        }
      ]
    },
    "nonce": {
      "description": "epoch timestamp in seconds; note this login API nonce has no connection to the orders API nonce",
      "allOf": [
        {
          "type": "integer",
          "format": "int64",
          "example": 1621490985,
          "description": "number of seconds since EPOCH as integer"
        }
      ]
    },
    "expirationTime": {
      "description": "epoch timestamp in seconds that is 5 minutes in the future",
      "allOf": [
        {
          "type": "integer",
          "format": "int64",
          "example": 1621490985,
          "description": "number of seconds since EPOCH as integer"
        }
      ]
    },
    "biometricsUsed": {
      "description": "biometrics flag. always `false`",
      "type": "boolean",
      "example": false
    },
    "sessionKey": {
      "description": "session key. always `null`",
      "type": "string",
      "example": null
    }
  }
}
```

### Properties

| Name           | Type                                            | Required | Restrictions | Description                                                                                     |
| -------------- | ----------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------- |
| userId         | [UserId](#schemauserid)                         | true     | none         | Bullish user ID corresponding to the metadata                                                   |
| nonce          | [TimeStampInSeconds](#schematimestampinseconds) | true     | none         | epoch timestamp in seconds; note this login API nonce has no connection to the orders API nonce |
| expirationTime | [TimeStampInSeconds](#schematimestampinseconds) | true     | none         | epoch timestamp in seconds that is 5 minutes in the future                                      |
| biometricsUsed | boolean                                         | true     | none         | biometrics flag. always `false`                                                                 |
| sessionKey     | string                                          | true     | none         | session key. always `null`                                                                      |

## LoginResponse

```json
{
  "type": "object",
  "required": ["authorizer", "token"],
  "properties": {
    "authorizer": {
      "description": "Authorizer",
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "03E02367E8C900000500000000000000",
          "description": "JWT authorizer you obtain along with the [JWT token](#overview--generate-a-jwt-token)"
        }
      ]
    },
    "token": {
      "description": "JWT token",
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FuZGVlcCByYWtocmEifQ.wyVq6PlKaldWXtu-jz2hJCvkGl1lM2S7HUKCH8LnXp0",
          "description": "JWT token"
        }
      ]
    }
  }
}
```

### Properties

| Name       | Type                            | Required | Restrictions | Description |
| ---------- | ------------------------------- | -------- | ------------ | ----------- |
| authorizer | [Authorizer](#schemaauthorizer) | true     | none         | Authorizer  |
| token      | [JWT](#schemajwt)               | true     | none         | JWT token   |

## CreateOrderRequest

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
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "123456789",
          "description": "the nonce is a client side incremented unsigned 64 bit integer expressed as string"
        }
      ]
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
      "description": "the command to be executed which is sent in the request payload",
      "allOf": [
        {
          "type": "object",
          "required": [
            "commandType",
            "handle",
            "symbol",
            "type",
            "side",
            "price",
            "stopPrice",
            "quantity",
            "allowMargin",
            "timeInForce",
            "tradingAccountId"
          ],
          "properties": {
            "commandType": {
              "description": "The command type, it must be 'V2CreateOrder'",
              "type": "string",
              "example": "V2CreateOrder"
            },
            "handle": {
              "allOf": [
                {
                  "description": "Unique numeric (i64) identifier generated on the client side expressed as a string value",
                  "type": "string",
                  "example": "187"
                }
              ]
            },
            "symbol": {
              "allOf": [
                {
                  "type": "string",
                  "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
                  "example": "BTCUSDC"
                }
              ]
            },
            "type": {
              "allOf": [
                {
                  "type": "string",
                  "description": "order type can have the following string values `\"LMT\"`, `\"MKT\"`, `\"STOP_LIMIT\"`, `\"POST_ONLY\"`.",
                  "example": "LMT"
                }
              ],
              "example": "LMT"
            },
            "side": {
              "allOf": [
                {
                  "type": "string",
                  "description": "order side can have the following string values `\"BUY\"`, `\"SELL\"`",
                  "example": "BUY"
                }
              ],
              "example": "BUY"
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
            "timeInForce": {
              "allOf": [
                {
                  "type": "string",
                  "description": "time in force can have the following string values `\"GTC\"`, `\"FOK\"`, `\"IOC\"`, see [details](#overview--order-timeinforce)"
                }
              ],
              "example": "GTC"
            },
            "allowMargin": {
              "description": "allows to borrow on the order",
              "type": "boolean",
              "example": false
            },
            "tradingAccountId": {
              "allOf": [
                {
                  "description": "unique trading account ID",
                  "type": "string",
                  "example": "111000000000001"
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

### Properties

| Name       | Type                                            | Required | Restrictions | Description                                                                                       |
| ---------- | ----------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------- |
| timestamp  | [TimeStampAsString](#schematimestampasstring)   | true     | none         | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string |
| nonce      | [NonceAsString](#schemanonceasstring)           | true     | none         | the nonce is a client side incremented unsigned 64 bit integer expressed as string                |
| authorizer | [Authorizer](#schemaauthorizer)                 | true     | none         | JWT authorizer you obtain along with the [JWT token](#overview--generate-a-jwt-token)             |
| command    | [CreateOrderCommand](#schemacreateordercommand) | true     | none         | the command to be executed which is sent in the request payload                                   |

## CreateAMMInstructionRequest

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
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "123456789",
          "description": "the nonce is a client side incremented unsigned 64 bit integer expressed as string"
        }
      ]
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
      "description": "the command to be executed which is sent in the request payload",
      "allOf": [
        {
          "type": "object",
          "required": [
            "commandType",
            "symbol",
            "baseQuantity",
            "quoteQuantity",
            "upperBound",
            "lowerBound",
            "feeTierId",
            "tradingAccountId"
          ],
          "properties": {
            "commandType": {
              "description": "The command type, it must be 'V2AddLiquidity'",
              "type": "string",
              "example": "V2AddLiquidity"
            },
            "symbol": {
              "allOf": [
                {
                  "type": "string",
                  "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
                  "example": "BTCUSDC"
                }
              ]
            },
            "baseQuantity": {
              "description": "base quantity, see [asset value](#overview--price-and-quantity-precision) format",
              "allOf": [
                {
                  "description": "see [asset value](#overview--price-and-quantity-precision) format",
                  "type": "string",
                  "example": "1.00000000"
                }
              ]
            },
            "quoteQuantity": {
              "description": "quote quantity, see [asset value](#overview--price-and-quantity-precision) format",
              "allOf": [
                {
                  "description": "see [asset value](#overview--price-and-quantity-precision) format",
                  "type": "string",
                  "example": "1.00000000"
                }
              ]
            },
            "upperBound": {
              "type": "string",
              "description": "upper bound of price range, in quote currency",
              "example": "14000.0000"
            },
            "lowerBound": {
              "type": "string",
              "description": "lower bound of price range, in quote currency",
              "example": "12000.0000"
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
            "tradingAccountId": {
              "allOf": [
                {
                  "description": "unique trading account ID",
                  "type": "string",
                  "example": "111000000000001"
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

### Properties

| Name       | Type                                                              | Required | Restrictions | Description                                                                                       |
| ---------- | ----------------------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------- |
| timestamp  | [TimeStampAsString](#schematimestampasstring)                     | true     | none         | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string |
| nonce      | [NonceAsString](#schemanonceasstring)                             | true     | none         | the nonce is a client side incremented unsigned 64 bit integer expressed as string                |
| authorizer | [Authorizer](#schemaauthorizer)                                   | true     | none         | JWT authorizer you obtain along with the [JWT token](#overview--generate-a-jwt-token)             |
| command    | [CreateAMMInstructionCommand](#schemacreateamminstructioncommand) | true     | none         | the command to be executed which is sent in the request payload                                   |

## CancelOrderRequest

```json
{
  "type": "object",
  "required": [
    "timestamp",
    "nonce",
    "authorizer",
    "tradingAccountId",
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
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "123456789",
          "description": "the nonce is a client side incremented unsigned 64 bit integer expressed as string"
        }
      ]
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
    "tradingAccountId": {
      "allOf": [
        {
          "description": "unique trading account ID",
          "type": "string",
          "example": "111000000000001"
        }
      ]
    },
    "command": {
      "description": "the command to be executed which is sent in the request payload",
      "allOf": [
        {
          "type": "object",
          "required": [
            "commandType",
            "orderId",
            "handle",
            "symbol",
            "tradingAccountId"
          ],
          "properties": {
            "commandType": {
              "description": "The command type, it must be 'V2CancelOrder'",
              "type": "string",
              "example": "V2CancelOrder"
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
            "handle": {
              "allOf": [
                {
                  "description": "Unique numeric (i64) identifier generated on the client side expressed as a string value",
                  "type": "string",
                  "example": "187"
                }
              ]
            },
            "symbol": {
              "allOf": [
                {
                  "type": "string",
                  "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
                  "example": "BTCUSDC"
                }
              ]
            },
            "tradingAccountId": {
              "allOf": [
                {
                  "description": "unique trading account ID",
                  "type": "string",
                  "example": "111000000000001"
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

### Properties

| Name             | Type                                            | Required | Restrictions | Description                                                                                       |
| ---------------- | ----------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------- |
| timestamp        | [TimeStampAsString](#schematimestampasstring)   | true     | none         | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string |
| nonce            | [NonceAsString](#schemanonceasstring)           | true     | none         | the nonce is a client side incremented unsigned 64 bit integer expressed as string                |
| authorizer       | [Authorizer](#schemaauthorizer)                 | true     | none         | JWT authorizer you obtain along with the [JWT token](#overview--generate-a-jwt-token)             |
| tradingAccountId | [TradingAccountId](#schematradingaccountid)     | true     | none         | unique trading account ID                                                                         |
| command          | [CancelOrderCommand](#schemacancelordercommand) | true     | none         | the command to be executed which is sent in the request payload                                   |

## Order

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

### Properties

| Name                  | Type                                                        | Required | Restrictions | Description                                                                                                                 |
| --------------------- | ----------------------------------------------------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------- |
| clientOrderId         | [OrderHandle](#schemaorderhandle)                           | true     | none         | Unique numeric (i64) identifier generated on the client side expressed as a string value                                    |
| orderId               | [OrderID](#schemaorderid)                                   | true     | none         | unique order ID                                                                                                             |
| symbol                | [MarketSymbol](#schemamarketsymbol)                         | true     | none         | market symbol                                                                                                               |
| price                 | [AssetValue](#schemaassetvalue)                             | true     | none         | price, see [asset value](#overview--price-and-quantity-precision) format                                                    |
| averageFillPrice      | [AssetValue](#schemaassetvalue)                             | true     | none         | average fill price, see [asset value](#overview--price-and-quantity-precision) format                                       |
| stopPrice             | [AssetValue](#schemaassetvalue)                             | true     | none         | stop price, see [asset value](#overview--price-and-quantity-precision) format                                               |
| allowBorrow           | boolean                                                     | true     | none         | indicates if the order was allowed to borrow (does not indicate that borrowing occurred)                                    |
| quantity              | [AssetValue](#schemaassetvalue)                             | true     | none         | quantity, see [asset value](#overview--price-and-quantity-precision) format                                                 |
| quantityFilled        | [AssetValue](#schemaassetvalue)                             | true     | none         | quantity filled, see [asset value](#overview--price-and-quantity-precision) format                                          |
| quoteAmount           | [AssetValue](#schemaassetvalue)                             | true     | none         | quote quantity deducted from asset account, see [asset value](#overview--price-and-quantity-precision) format               |
| baseFee               | [AssetValue](#schemaassetvalue)                             | true     | none         | base fee rate that will be charged upon trade execution, see [asset value](#overview--price-and-quantity-precision) format  |
| quoteFee              | [AssetValue](#schemaassetvalue)                             | true     | none         | quote fee rate that will be charged upon trade execution, see [asset value](#overview--price-and-quantity-precision) format |
| borrowedBaseQuantity  | [AssetValue](#schemaassetvalue)                             | false    | none         | quantity borrowed, see [asset value](#overview--price-and-quantity-precision) format                                        |
| borrowedQuoteQuantity | [AssetValue](#schemaassetvalue)                             | false    | none         | quantity borrowed, see [asset value](#overview--price-and-quantity-precision) format                                        |
| isLiquidation         | boolean                                                     | true     | none         | indicates if the order was executed as a liquidation order                                                                  |
| side                  | [OrderSideAsString](#schemaordersideasstring)               | true     | none         | order side                                                                                                                  |
| type                  | [OrderTypeAsString](#schemaordertypeasstring)               | true     | none         | order type                                                                                                                  |
| timeInForce           | [OrderTimeInForceAsString](#schemaordertimeinforceasstring) | true     | none         | time in force                                                                                                               |
| status                | [OrderStatusAsString](#schemaorderstatusasstring)           | true     | none         | order status                                                                                                                |
| statusReason          | string                                                      | true     | none         | status reason, describes why the order is in a specific state                                                               |
| statusReasonCode      | string                                                      | true     | none         | status reason code, see [details](#overview--error--rejection-codes)                                                        |
| createdAtDatetime     | [DateTime](#schemadatetime)                                 | true     | none         | denotes the time the order was ACK'd by the exchange, ISO 8601 with millisecond as string                                   |
| createdAtTimestamp    | [TimeStampAsString](#schematimestampasstring)               | true     | none         | denotes the time the order was ACK'd by the exchange                                                                        |

## AMMInstruction

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

### Properties

| Name                  | Type                                              | Required | Restrictions | Description                                                                                                                                   |
| --------------------- | ------------------------------------------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| liquidityId           | [AMMInstructionID](#schemaamminstructionid)       | true     | none         | unique AMM instruction ID                                                                                                                     |
| instructionId         | [AMMInstructionID](#schemaamminstructionid)       | true     | none         | unique AMM instruction ID                                                                                                                     |
| symbol                | [MarketSymbol](#schemamarketsymbol)               | true     | none         | market symbol                                                                                                                                 |
| baseFee               | [AssetValue](#schemaassetvalue)                   | true     | none         | base fee, see [asset value](#overview--price-and-quantity-precision) format                                                                   |
| quoteFee              | [AssetValue](#schemaassetvalue)                   | true     | none         | quote fee, see [asset value](#overview--price-and-quantity-precision) format                                                                  |
| status                | [OrderStatusAsString](#schemaorderstatusasstring) | true     | none         | order status                                                                                                                                  |
| statusReason          | string                                            | true     | none         | status reason, describes why the order is in a specific state                                                                                 |
| statusReasonCode      | integer                                           | true     | none         | status reason code, see [details](#overview--error--rejection-codes)                                                                          |
| createdAtDatetime     | [DateTime](#schemadatetime)                       | false    | none         | denotes the time the order was ACK'd by the exchange, ISO 8601 with millisecond as string                                                     |
| createdAtTimestamp    | [TimeStampAsString](#schematimestampasstring)     | true     | none         | denotes the time the order was ACK'd by the exchange                                                                                          |
| 24HrApy               | string                                            | false    | none         | APY of the last 24 Hours, only for AMM instructions with `OPEN` status                                                                        |
| 24HrYieldEarn         | string                                            | false    | none         | amount of money earned in USD from the last 24 Hours, only for AMM instructions with `OPEN` status                                            |
| apy                   | string                                            | true     | none         | yield generated from the time AMM instruction was created, in annualised percentage                                                           |
| baseCurrentQuantity   | string                                            | true     | none         | amount of base asset this AMM instruction currently holds, only for AMM instruction with `OPEN` status                                        |
| baseInvestQuantity    | string                                            | true     | none         | initial base investment                                                                                                                       |
| basePrice             | string                                            | true     | none         | current price of base asset                                                                                                                   |
| baseWithdrawQuantity  | string                                            | true     | none         | amount of base asset returned when AMM instruction is terminated                                                                              |
| currentValue          | string                                            | true     | none         | value of assets (base and quote) in USD amount that this AMM instruction currently holds                                                      |
| dislocationEnabled    | boolean                                           | true     | none         | dislocation enabled/disabled                                                                                                                  |
| feeTierId             | [FeeTierId](#schemafeetierid)                     | true     | none         | unique fee tier ID, see [Get Market By Symbol](#get-/v1/markets/-symbol-)                                                                     |
| finalValue            | string                                            | false    | none         | value of assets (base and quote) in USD amount when AMM instruction was terminated, only for AMM instruction with `CLOSED` status             |
| impermanentLoss       | string                                            | true     | none         | impermanent loss                                                                                                                              |
| initialBasePrice      | string                                            | true     | none         | price of base asset when AMM instruction was created                                                                                          |
| initialQuotePrice     | string                                            | true     | none         | price of quote asset when AMM instruction was created                                                                                         |
| initialValue          | string                                            | true     | none         | value of assets (base and quote) in USD amount when AMM instruction was created                                                               |
| lowerBound            | string                                            | true     | none         | lower bound of price range, in quote currency                                                                                                 |
| price                 | string                                            | true     | none         | current price of AMM, see [Get Tick By Symbol](#get-/v1/markets/-symbol-/tick)                                                                |
| quoteCurrentQuantity  | string                                            | false    | none         | amount of quote asset this AMM instruction currently holds, only for AMM instruction with `OPEN` status                                       |
| quoteInvestQuantity   | string                                            | true     | none         | initial quote investment                                                                                                                      |
| quotePrice            | string                                            | true     | none         | current price of quote asset                                                                                                                  |
| quoteWithdrawQuantity | string                                            | true     | none         | amount of quote asset returned when AMM instruction is terminated                                                                             |
| lastDistributedPrice  | string                                            | false    | none         | (Perpetual market only) The price used at the time of settlement for AMM Instructions that can be used to determine mtmPnl and the actual Pnl |
| requestId             | [RequestID](#schemarequestid)                     | true     | none         | unique request ID                                                                                                                             |
| staticSpreadFee       | string                                            | true     | none         | static spread fee, see [Get Market By Symbol](#get-/v1/markets/-symbol-)                                                                      |
| updatedAtDatetime     | [DateTime](#schemadatetime)                       | false    | none         | denotes the time the AMM instruction was updated by the exchange, ISO 8601 with millisecond as string                                         |
| updatedAtTimestamp    | [TimeStampAsString](#schematimestampasstring)     | true     | none         | denotes the time the AMM instruction was updated by the exchange                                                                              |
| upperBound            | string                                            | true     | none         | upper bound of price range, in quote currency                                                                                                 |
| yieldEarn             | string                                            | true     | none         | amount of money earned in USD                                                                                                                 |

## ObfuscatedTradeWithId

```json
{
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
```

### Properties

| Name               | Type                                          | Required | Restrictions | Description                                                                                  |
| ------------------ | --------------------------------------------- | -------- | ------------ | -------------------------------------------------------------------------------------------- |
| tradeId            | [TradeID](#schematradeid)                     | true     | none         | unique trade ID                                                                              |
| symbol             | [MarketSymbol](#schemamarketsymbol)           | true     | none         | market symbol                                                                                |
| price              | [AssetValue](#schemaassetvalue)               | true     | none         | price                                                                                        |
| quantity           | [AssetValue](#schemaassetvalue)               | true     | none         | quantity                                                                                     |
| side               | [OrderSideAsString](#schemaordersideasstring) | true     | none         | order side                                                                                   |
| isTaker            | [Boolean](#schemaboolean)                     | true     | none         | denotes whether this is a taker's trade                                                      |
| createdAtDatetime  | [DateTime](#schemadatetime)                   | true     | none         | denotes the time the trade was executed by the exchange, ISO 8601 with millisecond as string |
| createdAtTimestamp | [TimeStampAsString](#schematimestampasstring) | true     | none         | denotes the time the trade was executed by the exchange                                      |

## ObfuscatedTrade

```json
{
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
```

### Properties

| Name               | Type                                          | Required | Restrictions | Description                                                                                  |
| ------------------ | --------------------------------------------- | -------- | ------------ | -------------------------------------------------------------------------------------------- |
| tradeId            | [TradeID](#schematradeid)                     | true     | none         | unique trade ID                                                                              |
| symbol             | [MarketSymbol](#schemamarketsymbol)           | true     | none         | market symbol                                                                                |
| price              | [AssetValue](#schemaassetvalue)               | true     | none         | price                                                                                        |
| quantity           | [AssetValue](#schemaassetvalue)               | true     | none         | quantity                                                                                     |
| side               | [OrderSideAsString](#schemaordersideasstring) | true     | none         | order side                                                                                   |
| isTaker            | [Boolean](#schemaboolean)                     | true     | none         | denotes whether this is a taker's trade                                                      |
| createdAtDatetime  | [DateTime](#schemadatetime)                   | true     | none         | denotes the time the trade was executed by the exchange, ISO 8601 with millisecond as string |
| createdAtTimestamp | [TimeStampAsString](#schematimestampasstring) | true     | none         | denotes the time the trade was executed by the exchange                                      |

## CustodyApiWithdrawalCommand

```json
{
  "type": "object",
  "required": ["commandType", "destinationId", "symbol", "network", "quantity"],
  "properties": {
    "commandType": {
      "description": "the command type, it must be 'V1WithdrawalChallenge'",
      "type": "string",
      "example": "V1WithdrawalChallenge"
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
```

### Properties

| Name          | Type                                                | Required | Restrictions | Description                                                                                                                                                                           |
| ------------- | --------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| commandType   | string                                              | true     | none         | the command type, it must be 'V1WithdrawalChallenge'                                                                                                                                  |
| destinationId | [CustodyDestinationID](#schemacustodydestinationid) | true     | none         | destination id provided by bullish that uniquely identifies a whitelisted address or account                                                                                          |
| symbol        | [CustodySymbol](#schemacustodysymbol)               | true     | none         | symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB                                                                                                                          |
| network       | [NetworkID](#schemanetworkid)                       | true     | none         | the network of the native coin or token, e.g. BTC, ETH, SOL                                                                                                                           |
| quantity      | [CustodyQuantity](#schemacustodyquantity)           | true     | none         | total quantity of symbol to withdraw including fee in units of symbol, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei) - quantity received will have fee subtracted. |

## CustodyApiEcdsaWithdrawalCommand

```json
{
  "type": "object",
  "required": ["commandType", "destinationId", "symbol", "network", "quantity"],
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
```

### Properties

| Name          | Type                                                | Required | Restrictions | Description                                                                                                                                                                           |
| ------------- | --------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| commandType   | string                                              | true     | none         | the command type, it must be 'V1Withdrawal'                                                                                                                                           |
| destinationId | [CustodyDestinationID](#schemacustodydestinationid) | true     | none         | destination id provided by bullish that uniquely identifies a whitelisted address or account                                                                                          |
| symbol        | [CustodySymbol](#schemacustodysymbol)               | true     | none         | symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB                                                                                                                          |
| network       | [NetworkID](#schemanetworkid)                       | true     | none         | the network of the native coin or token, e.g. BTC, ETH, SOL                                                                                                                           |
| quantity      | [CustodyQuantity](#schemacustodyquantity)           | true     | none         | total quantity of symbol to withdraw including fee in units of symbol, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei) - quantity received will have fee subtracted. |

## CustodyApiWithdrawalRequest

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
      "description": "Withdrawal nonce, independent of header nonce, recommendation re-use header nonce",
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
              "description": "the command type, it must be 'V1WithdrawalChallenge'",
              "type": "string",
              "example": "V1WithdrawalChallenge"
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

### Properties

| Name       | Type                                                              | Required | Restrictions | Description                                                                                       |
| ---------- | ----------------------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------- |
| timestamp  | [TimeStampAsString](#schematimestampasstring)                     | true     | none         | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string |
| nonce      | string                                                            | true     | none         | Withdrawal nonce, independent of header nonce, recommendation re-use header nonce                 |
| authorizer | [Authorizer](#schemaauthorizer)                                   | true     | none         | JWT authorizer you obtain along with the [JWT token](#overview--generate-a-jwt-token)             |
| command    | [CustodyApiWithdrawalCommand](#schemacustodyapiwithdrawalcommand) | true     | none         | withdrawal command                                                                                |

## CustodyApiEcdsaWithdrawalRequest

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

### Properties

| Name       | Type                                                                        | Required | Restrictions | Description                                                                                       |
| ---------- | --------------------------------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------- |
| timestamp  | [TimeStampAsString](#schematimestampasstring)                               | true     | none         | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string |
| nonce      | string                                                                      | true     | none         | a UUID withdrawal nonce to protect against replay attacks                                         |
| authorizer | [Authorizer](#schemaauthorizer)                                             | true     | none         | JWT authorizer you obtain along with the [JWT token](#overview--generate-a-jwt-token)             |
| command    | [CustodyApiEcdsaWithdrawalCommand](#schemacustodyapiecdsawithdrawalcommand) | true     | none         | withdrawal command                                                                                |

## CustodyApiWithdrawalResponse

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

### Properties

| Name                 | Type                                                | Required | Restrictions | Description                                                               |
| -------------------- | --------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------- |
| statusReason         | string                                              | false    | none         | status reason, describes why withdrawal challenge is in a specific state  |
| statusReasonCode     | integer                                             | false    | none         | status reason code, see [details](#overview--error--rejection-codes)      |
| custodyTransactionId | [CustodyTransactionID](#schemacustodytransactionid) | false    | none         | unique identifier for tracking a withdrawal during signing and in history |

## CustodyHistory

```json
{
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
```

### Properties

| Name                 | Type                                                              | Required | Restrictions | Description                                                                                                                                                                           |
| -------------------- | ----------------------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| custodyTransactionId | [CustodyTransactionHistoryID](#schemacustodytransactionhistoryid) | false    | none         | unique identifier for tracking a deposit or withdrawal                                                                                                                                |
| direction            | [CustodyDirection](#schemacustodydirection)                       | false    | none         | direction of transaction from API user's perspective, 'DEPOSIT' or 'WITHDRAWAL'                                                                                                       |
| quantity             | [CustodyQuantity](#schemacustodyquantity)                         | false    | none         | total quantity of symbol to withdraw including fee in units of symbol, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei) - quantity received will have fee subtracted. |
| symbol               | [CustodySymbol](#schemacustodysymbol)                             | false    | none         | symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB                                                                                                                          |
| network              | [NetworkID](#schemanetworkid)                                     | false    | none         | the network of the native coin or token, e.g. BTC, ETH, SOL                                                                                                                           |
| fee                  | [CustodyWithdrawalFee](#schemacustodywithdrawalfee)               | false    | none         | withdrawal fee charged in units of symbol, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei)                                                                           |
| memo                 | [CustodyDepositMemo](#schemacustodydepositmemo)                   | false    | none         | memo or destination tag used during deposit to help identify account to credit funds to                                                                                               |
| createdAtDateTime    | [CustodyCreatedAtDateTime](#schemacustodycreatedatdatetime)       | false    | none         | time of initial transaction                                                                                                                                                           |
| status               | [CustodyTransactionStatus](#schemacustodytransactionstatus)       | false    | none         | one of 'PENDING', 'COMPLETE', 'CANCELLED', 'FAILED'                                                                                                                                   |
| transactionDetails   | [CustodyTransactionDetails](#schemacustodytransactiondetails)     | false    | none         | none                                                                                                                                                                                  |

## CustodyCryptoDepositInstructions

```json
{
  "network": "ETH",
  "symbol": "USDC",
  "address": "0xb0a64d976972d87b0783eeb1ff88306cd1891f02"
}
```

### Properties

| Name    | Type                                                  | Required | Restrictions | Description                                                                             |
| ------- | ----------------------------------------------------- | -------- | ------------ | --------------------------------------------------------------------------------------- |
| network | [NetworkID](#schemanetworkid)                         | true     | none         | the network of the native coin or token, e.g. BTC, ETH, SOL                             |
| symbol  | [CustodySymbol](#schemacustodysymbol)                 | true     | none         | symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB                            |
| memo    | [CustodyDepositMemo](#schemacustodydepositmemo)       | false    | none         | memo or destination tag used during deposit to help identify account to credit funds to |
| address | [CustodyNetworkAddress](#schemacustodynetworkaddress) | true     | none         | an address on the given network                                                         |

## CustodyCryptoWithdrawalInstructions

```json
{
  "type": "object",
  "required": ["network", "symbol", "address", "fee", "label", "destinationId"],
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
```

### Properties

| Name          | Type                                                    | Required | Restrictions | Description                                                                                                 |
| ------------- | ------------------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| network       | [NetworkID](#schemanetworkid)                           | true     | none         | the network of the native coin or token, e.g. BTC, ETH, SOL                                                 |
| symbol        | [CustodySymbol](#schemacustodysymbol)                   | true     | none         | symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB                                                |
| address       | [CustodyNetworkAddress](#schemacustodynetworkaddress)   | true     | none         | an address on the given network                                                                             |
| fee           | [CustodyWithdrawalFee](#schemacustodywithdrawalfee)     | true     | none         | withdrawal fee charged in units of symbol, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei) |
| memo          | [CustodyWithdrawalMemo](#schemacustodywithdrawalmemo)   | false    | none         | memo or destination tag that will be used as a reference on transaction                                     |
| label         | [CustodyWithdrawalLabel](#schemacustodywithdrawallabel) | true     | none         | descriptive label of destination provided by user                                                           |
| destinationId | [CustodyDestinationID](#schemacustodydestinationid)     | true     | none         | destination id provided by bullish that uniquely identifies a whitelisted address or account                |

## CustodySelfHostedInitiateRequest

```json
{
  "network": "ETH",
  "symbol": "USDC",
  "address": "0xb0a64d976972d87b0783eeb1ff88306cd1891f02",
  "label": "Our cold wallet",
  "requestedDepositAmount": "12.3456"
}
```

### Properties

| Name                   | Type                                                                                      | Required | Restrictions | Description                                                             |
| ---------------------- | ----------------------------------------------------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------- |
| network                | [NetworkID](#schemanetworkid)                                                             | true     | none         | the network of the native coin or token, e.g. BTC, ETH, SOL             |
| symbol                 | [CustodySymbol](#schemacustodysymbol)                                                     | true     | none         | symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB            |
| address                | [CustodyNetworkAddress](#schemacustodynetworkaddress)                                     | true     | none         | an address on the given network                                         |
| memo                   | [CustodyWithdrawalMemo](#schemacustodywithdrawalmemo)                                     | false    | none         | memo or destination tag that will be used as a reference on transaction |
| label                  | [CustodyWithdrawalLabel](#schemacustodywithdrawallabel)                                   | true     | none         | descriptive label of destination provided by user                       |
| requestedDepositAmount | [CustodySelfHostedRequestedDepositAmount](#schemacustodyselfhostedrequesteddepositamount) | true     | none         | User-requested amount for the deposit.                                  |

## CustodySelfHostedInitiateResponse

```json
{
  "destinationId": "1560ec0b406c0d909bb9f5f827dd6aa14a1f638884f33a2a3134878102e78038",
  "network": "ETH",
  "symbol": "USDC",
  "depositAddress": "0xb0a64d976972d87b0783eeb1ff88306cd1891f02",
  "requestedDepositAmount": "12.3456",
  "verificationAmount": "0.0012",
  "totalDepositAmount": "12.3468",
  "verificationExpiryTime": "2025-05-20T01:01:01.000Z"
}
```

### Properties

| Name                   | Type                                                                                      | Required | Restrictions | Description                                                                                                                                 |
| ---------------------- | ----------------------------------------------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| destinationId          | [CustodyDestinationID](#schemacustodydestinationid)                                       | false    | none         | destination id provided by bullish that uniquely identifies a whitelisted address or account                                                |
| network                | [NetworkID](#schemanetworkid)                                                             | false    | none         | the network of the native coin or token, e.g. BTC, ETH, SOL                                                                                 |
| symbol                 | [CustodySymbol](#schemacustodysymbol)                                                     | false    | none         | symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB                                                                                |
| depositAddress         | [CustodySelfHostedDepositAddress](#schemacustodyselfhosteddepositaddress)                 | false    | none         | The address of the Bullish trading account that the user should deposit to during a self hosted deposit attempt.                            |
| depositMemo            | [CustodySelfHostedDepositMemo](#schemacustodyselfhosteddepositmemo)                       | false    | none         | The memo or destination tag of the Bullish trading account that the user should deposit to during a self hosted deposit attempt.            |
| requestedDepositAmount | [CustodySelfHostedRequestedDepositAmount](#schemacustodyselfhostedrequesteddepositamount) | false    | none         | User-requested amount for the deposit.                                                                                                      |
| verificationAmount     | [CustodySelfHostedVerificationAmount](#schemacustodyselfhostedverificationamount)         | false    | none         | Bullish specified additional small deposit amount to add to the `requestedDepositAmount` for wallet verification.                           |
| totalDepositAmount     | [CustodySelfHostedTotalDepositAmount](#schemacustodyselfhostedtotaldepositamount)         | false    | none         | The actual amount that the user should deposit for wallet verification. It is the sum of `requestedDepositAmount` and `verificationAmount`. |
| verificationExpiryTime | [DateTime](#schemadatetime)                                                               | false    | none         | ISO 8601 with millisecond as string                                                                                                         |

## CustodyGetSelfHostedVerificationResponse

```json
{
  "destinationId": "1560ec0b406c0d909bb9f5f827dd6aa14a1f638884f33a2a3134878102e78038",
  "network": "ETH",
  "symbol": "USDC",
  "address": "0xb0a64d976972d87b0783eeb1ff88306cd1891f02",
  "verificationStatus": "VERIFIED",
  "requestedDepositAmount": "12.3456",
  "verificationAmount": "0.0012",
  "totalDepositAmount": "12.3468",
  "verificationExpiryTime": "2025-05-20T01:01:01.000Z"
}
```

### Properties

| Name               | Type                                                                              | Required | Restrictions | Description                                                                                  |
| ------------------ | --------------------------------------------------------------------------------- | -------- | ------------ | -------------------------------------------------------------------------------------------- |
| destinationId      | [CustodyDestinationID](#schemacustodydestinationid)                               | true     | none         | destination id provided by bullish that uniquely identifies a whitelisted address or account |
| network            | [NetworkID](#schemanetworkid)                                                     | true     | none         | the network of the native coin or token, e.g. BTC, ETH, SOL                                  |
| symbol             | [CustodySymbol](#schemacustodysymbol)                                             | true     | none         | symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB                                 |
| address            | [CustodyNetworkAddress](#schemacustodynetworkaddress)                             | true     | none         | an address on the given network                                                              |
| memo               | [CustodyWithdrawalMemo](#schemacustodywithdrawalmemo)                             | false    | none         | memo or destination tag that will be used as a reference on transaction                      |
| verificationStatus | [CustodySelfHostedVerificationStatus](#schemacustodyselfhostedverificationstatus) | true     | none         | The status for the self-hosted wallet verification attempt.                                  |

- `VERIFIED` - Self-hosted wallet has been verified
- `PENDING_VERIFICATION` - pending verification via satoshi test
- `VERIFICATION_EXPIRED` - the verification has expired|
  |requestedDepositAmount|[CustodySelfHostedRequestedDepositAmount](#schemacustodyselfhostedrequesteddepositamount)|true|none|User-requested
  amount for the deposit.|
  |verificationAmount|[CustodySelfHostedVerificationAmount](#schemacustodyselfhostedverificationamount)|true|none|Bullish
  specified additional small deposit amount to add to the
  `requestedDepositAmount` for wallet verification.|
  |totalDepositAmount|[CustodySelfHostedTotalDepositAmount](#schemacustodyselfhostedtotaldepositamount)|true|none|The
  actual amount that the user should deposit for wallet verification. It is the
  sum of `requestedDepositAmount` and `verificationAmount`.|
  |verificationExpiryTime|[DateTime](#schemadatetime)|true|none|ISO 8601 with
  millisecond as string|

## CustodyBankDetails

```json
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
```

### Properties

| Name            | Type                                                            | Required | Restrictions | Description               |
| --------------- | --------------------------------------------------------------- | -------- | ------------ | ------------------------- |
| name            | [CustodyBankName](#schemacustodybankname)                       | false    | none         | name of bank              |
| physicalAddress | [CustodyPhysicalBankAddress](#schemacustodyphysicalbankaddress) | false    | none         | physical location of bank |
| routingCode     | [CustodyBankRoutingCode](#schemacustodybankroutingcode)         | false    | none         | routing code of bank      |

## CustodyBankIntermediateDetails

```json
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
```

### Properties

| Name            | Type                                                            | Required | Restrictions | Description               |
| --------------- | --------------------------------------------------------------- | -------- | ------------ | ------------------------- |
| name            | [CustodyBankName](#schemacustodybankname)                       | false    | none         | name of bank              |
| physicalAddress | [CustodyPhysicalBankAddress](#schemacustodyphysicalbankaddress) | false    | none         | physical location of bank |
| routingCode     | [CustodyBankRoutingCode](#schemacustodybankroutingcode)         | false    | none         | routing code of bank      |

## CustodyFiatDepositInstructions

```json
{
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
```

### Properties

| Name            | Type                                                        | Required | Restrictions | Description                                                                                         |
| --------------- | ----------------------------------------------------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------- |
| network         | string                                                      | false    | none         | the network that the account belongs to and the transaction will be performed on SWIFT, ABA or SEPA |
| symbol          | string                                                      | false    | none         | the currency associated with the account, e.g. USD, EUR                                             |
| accountNumber   | [CustodyBankAccountNumber](#schemacustodybankaccountnumber) | false    | none         | the Bullish account number, varies for SWIFT/ABA and SEPA                                           |
| name            | string                                                      | false    | none         | official Bullish account holder name                                                                |
| physicalAddress | string                                                      | false    | none         | bullish entity's physical address for the bank account                                              |
| memo            | string                                                      | false    | none         | client specific reference to identify which account desposits should be allocated to on the exhange |
| bank            | [CustodyBankDetails](#schemacustodybankdetails)             | false    | none         | none                                                                                                |

## CustodyFiatWithdrawalInstructions

```json
{
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
```

### Properties

| Name             | Type                                                                    | Required | Restrictions | Description                                                                                                 |
| ---------------- | ----------------------------------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| destinationId    | [CustodyDestinationID](#schemacustodydestinationid)                     | false    | none         | destination id provided by bullish that uniquely identifies a whitelisted address or account                |
| accountNumber    | [CustodyBankAccountNumber](#schemacustodybankaccountnumber)             | false    | none         | bank account number                                                                                         |
| network          | [CustodyBankNetworkID](#schemacustodybanknetworkid)                     | false    | none         | the fiat network, e.g. SWIFT, ABA or SEPA                                                                   |
| symbol           | [CustodyFiatSymbol](#schemacustodyfiatsymbol)                           | false    | none         | symbol representing fiat currency, e.g. USD, EUR                                                            |
| name             | [CustodyBankName](#schemacustodybankname)                               | false    | none         | name of bank                                                                                                |
| physicalAddress  | [CustodyPhysicalBankAddress](#schemacustodyphysicalbankaddress)         | false    | none         | physical location of bank                                                                                   |
| fee              | [CustodyWithdrawalFee](#schemacustodywithdrawalfee)                     | false    | none         | withdrawal fee charged in units of symbol, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei) |
| memo             | [CustodyWithdrawalMemo](#schemacustodywithdrawalmemo)                   | false    | none         | memo or destination tag that will be used as a reference on transaction                                     |
| bank             | [CustodyBankDetails](#schemacustodybankdetails)                         | false    | none         | none                                                                                                        |
| intermediaryBank | [CustodyBankIntermediateDetails](#schemacustodybankintermediatedetails) | false    | none         | none                                                                                                        |

## CustodyLimits

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

### Properties

| Name           | Type                                                                      | Required | Restrictions | Description                                                                                                                                                                   |
| -------------- | ------------------------------------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | [CustodySymbol](#schemacustodysymbol)                                     | false    | none         | symbol representing coin or token, e.g. USDC, BTC, ETH, SHIB                                                                                                                  |
| available      | [CustodyAvailableWithdrawalLimit](#schemacustodyavailablewithdrawallimit) | false    | none         | remaining limit on amount of coin or token that could be withdrawn now, in units of the symbol itself, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei)       |
| twentyFourHour | [Custody24HWithdrawalLimit](#schemacustody24hwithdrawallimit)             | false    | none         | limit on amount of coin or token that can be withdrawn over a 24 hour period, in units of the symbol itself, not in smaller denominations (e.g. BTC not Satoshi, ETH not Wei) |

## Trade

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

### Properties

| Name                   | Type                                          | Required | Restrictions | Description                                                                                                   |
| ---------------------- | --------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------- |
| tradeId                | [TradeID](#schematradeid)                     | true     | none         | unique trade ID                                                                                               |
| orderId                | [OrderID](#schemaorderid)                     | true     | none         | unique order ID                                                                                               |
| symbol                 | [MarketSymbol](#schemamarketsymbol)           | true     | none         | market symbol                                                                                                 |
| price                  | [AssetValue](#schemaassetvalue)               | true     | none         | price, see [asset value](#overview--price-and-quantity-precision) format                                      |
| quantity               | [AssetValue](#schemaassetvalue)               | true     | none         | quantity, see [asset value](#overview--price-and-quantity-precision) format                                   |
| quoteAmount            | [AssetValue](#schemaassetvalue)               | true     | none         | quote quantity deducted from asset account, see [asset value](#overview--price-and-quantity-precision) format |
| baseFee                | [AssetValue](#schemaassetvalue)               | true     | none         | base fee, see [asset value](#overview--price-and-quantity-precision) format                                   |
| quoteFee               | [AssetValue](#schemaassetvalue)               | true     | none         | quote fee, see [asset value](#overview--price-and-quantity-precision) format                                  |
| side                   | [OrderSideAsString](#schemaordersideasstring) | true     | none         | order side                                                                                                    |
| isTaker                | [Boolean](#schemaboolean)                     | true     | none         | denotes whether this is a taker's trade                                                                       |
| tradeRebateAmount      | [AssetValue](#schemaassetvalue)               | true     | none         | amount of rebate that is credited to the user as part of the trade.                                           |
| tradeRebateAssetSymbol | [QuoteAssetSymbol](#schemaquoteassetsymbol)   | true     | none         | the symbol of the asset in which the rebate is paid                                                           |
| createdAtDatetime      | [DateTime](#schemadatetime)                   | true     | none         | denotes the time the trade was executed by the exchange, ISO 8601 with millisecond as string                  |
| createdAtTimestamp     | [TimeStampAsString](#schematimestampasstring) | true     | none         | denotes the time the trade was executed by the exchange                                                       |

## Tick

```json
{
  "type": "object",
  "required": [
    "createdAtDatetime",
    "createdAtTimestamp",
    "high",
    "low",
    "bestBid",
    "bidVolume",
    "bestAsk",
    "askVolume",
    "vwap",
    "open",
    "close",
    "last",
    "change",
    "percentage",
    "average",
    "baseVolume",
    "quoteVolume",
    "bancorPrice",
    "lastTradeDatetime",
    "lastTradeTimestamp",
    "lastTradeQuantity",
    "ammData"
  ],
  "properties": {
    "createdAtDatetime": {
      "description": "denotes the time of the current tick on the exchange, ISO 8601 with millisecond as string",
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
      "description": "denotes the time of the current tick on the exchange",
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "1621490985000",
          "description": "unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string"
        }
      ]
    },
    "high": {
      "description": "highest price, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "low": {
      "description": "lowest price, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "bestBid": {
      "description": "current best bid (buy) price, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "bidVolume": {
      "description": "current best bid (buy) quantity (may be missing or undefined), see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "bestAsk": {
      "description": "current best ask (sell) price, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "askVolume": {
      "description": "current best ask (sell) quantity (may be missing or undefined), see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "vwap": {
      "description": "volume weighed average price, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "open": {
      "description": "opening price, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "close": {
      "description": "price of last trade (closing price for current period), see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "last": {
      "description": "price of last trade (closing price for current period), see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "change": {
      "description": "absolute change, `last - open`, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "percentage": {
      "description": "relative change, `(change/open) * 100`, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "average": {
      "description": "average price, `(last + open) / 2`, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "baseVolume": {
      "description": "volume of base asset traded for last 24 hours, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "quoteVolume": {
      "description": "volume of quote asset traded for last 24 hours, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "bancorPrice": {
      "description": "current price, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "markPrice": {
      "description": "mark price represents the fair value of a contract at the current time.",
      "type": "string",
      "example": "19999.00"
    },
    "fundingRate": {
      "description": "funding rate is used to calculate funding, which measures the relative difference between the index price and mark price.",
      "type": "string",
      "example": "0.01"
    },
    "openInterest": {
      "description": "open interest is the total quantity of open long positions and short positions, see [asset value](#overview--price-and-quantity-precision) format (only applies to derivatives market)",
      "type": "string",
      "example": "100000.32452"
    },
    "lastTradeDatetime": {
      "description": "time of the last trade on this symbol, ISO 8601 with millisecond as string",
      "allOf": [
        {
          "type": "string",
          "format": "date-time",
          "example": "2025-05-20T01:01:01.000Z",
          "description": "ISO 8601 with millisecond as string"
        }
      ]
    },
    "lastTradeTimestamp": {
      "description": "time of the last trade on this symbol",
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "1621490985000",
          "description": "unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string"
        }
      ]
    },
    "lastTradeQuantity": {
      "description": "quantity of the last trade on this symbol, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "ammData": {
      "description": "AMM data of all available fee tiers.",
      "type": "array",
      "minItems": 0,
      "items": {
        "allOf": [
          {
            "type": "object",
            "description": "AMM data",
            "required": [
              "feeTierId",
              "bidSpreadFee",
              "askSpreadFee",
              "baseReservesQuantity",
              "quoteReservesQuantity",
              "currentPrice"
            ],
            "properties": {
              "feeTierId": {
                "allOf": [
                  {
                    "type": "string",
                    "description": "unique fee tier ID, see [Get Market By Symbol](#get-/v1/markets/-symbol-)",
                    "example": "1"
                  }
                ]
              },
              "bidSpreadFee": {
                "description": "bid spread fee",
                "type": "string",
                "example": "0.00040000"
              },
              "askSpreadFee": {
                "description": "ask spread fee",
                "type": "string",
                "example": "0.00040000"
              },
              "baseReservesQuantity": {
                "description": "base reserves quantity",
                "type": "string",
                "example": "245.56257825"
              },
              "quoteReservesQuantity": {
                "description": "quote reserves quantity",
                "type": "string",
                "example": "3424383.3629"
              },
              "currentPrice": {
                "description": "current AMM price",
                "type": "string",
                "example": "16856.0000"
              }
            }
          }
        ]
      }
    }
  }
}
```

### Properties

| Name               | Type                                          | Required | Restrictions | Description                                                                                                                                                                            |
| ------------------ | --------------------------------------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| createdAtDatetime  | [DateTime](#schemadatetime)                   | true     | none         | denotes the time of the current tick on the exchange, ISO 8601 with millisecond as string                                                                                              |
| createdAtTimestamp | [TimeStampAsString](#schematimestampasstring) | true     | none         | denotes the time of the current tick on the exchange                                                                                                                                   |
| high               | [AssetValue](#schemaassetvalue)               | true     | none         | highest price, see [asset value](#overview--price-and-quantity-precision) format                                                                                                       |
| low                | [AssetValue](#schemaassetvalue)               | true     | none         | lowest price, see [asset value](#overview--price-and-quantity-precision) format                                                                                                        |
| bestBid            | [AssetValue](#schemaassetvalue)               | true     | none         | current best bid (buy) price, see [asset value](#overview--price-and-quantity-precision) format                                                                                        |
| bidVolume          | [AssetValue](#schemaassetvalue)               | true     | none         | current best bid (buy) quantity (may be missing or undefined), see [asset value](#overview--price-and-quantity-precision) format                                                       |
| bestAsk            | [AssetValue](#schemaassetvalue)               | true     | none         | current best ask (sell) price, see [asset value](#overview--price-and-quantity-precision) format                                                                                       |
| askVolume          | [AssetValue](#schemaassetvalue)               | true     | none         | current best ask (sell) quantity (may be missing or undefined), see [asset value](#overview--price-and-quantity-precision) format                                                      |
| vwap               | [AssetValue](#schemaassetvalue)               | true     | none         | volume weighed average price, see [asset value](#overview--price-and-quantity-precision) format                                                                                        |
| open               | [AssetValue](#schemaassetvalue)               | true     | none         | opening price, see [asset value](#overview--price-and-quantity-precision) format                                                                                                       |
| close              | [AssetValue](#schemaassetvalue)               | true     | none         | price of last trade (closing price for current period), see [asset value](#overview--price-and-quantity-precision) format                                                              |
| last               | [AssetValue](#schemaassetvalue)               | true     | none         | price of last trade (closing price for current period), see [asset value](#overview--price-and-quantity-precision) format                                                              |
| change             | [AssetValue](#schemaassetvalue)               | true     | none         | absolute change, `last - open`, see [asset value](#overview--price-and-quantity-precision) format                                                                                      |
| percentage         | [AssetValue](#schemaassetvalue)               | true     | none         | relative change, `(change/open) * 100`, see [asset value](#overview--price-and-quantity-precision) format                                                                              |
| average            | [AssetValue](#schemaassetvalue)               | true     | none         | average price, `(last + open) / 2`, see [asset value](#overview--price-and-quantity-precision) format                                                                                  |
| baseVolume         | [AssetValue](#schemaassetvalue)               | true     | none         | volume of base asset traded for last 24 hours, see [asset value](#overview--price-and-quantity-precision) format                                                                       |
| quoteVolume        | [AssetValue](#schemaassetvalue)               | true     | none         | volume of quote asset traded for last 24 hours, see [asset value](#overview--price-and-quantity-precision) format                                                                      |
| bancorPrice        | [AssetValue](#schemaassetvalue)               | true     | none         | current price, see [asset value](#overview--price-and-quantity-precision) format                                                                                                       |
| markPrice          | string                                        | false    | none         | mark price represents the fair value of a contract at the current time.                                                                                                                |
| fundingRate        | string                                        | false    | none         | funding rate is used to calculate funding, which measures the relative difference between the index price and mark price.                                                              |
| openInterest       | string                                        | false    | none         | open interest is the total quantity of open long positions and short positions, see [asset value](#overview--price-and-quantity-precision) format (only applies to derivatives market) |
| lastTradeDatetime  | [DateTime](#schemadatetime)                   | true     | none         | time of the last trade on this symbol, ISO 8601 with millisecond as string                                                                                                             |
| lastTradeTimestamp | [TimeStampAsString](#schematimestampasstring) | true     | none         | time of the last trade on this symbol                                                                                                                                                  |
| lastTradeQuantity  | [AssetValue](#schemaassetvalue)               | true     | none         | quantity of the last trade on this symbol, see [asset value](#overview--price-and-quantity-precision) format                                                                           |
| ammData            | [allOf]                                       | true     | none         | AMM data of all available fee tiers.                                                                                                                                                   |

## AmmData

```json
{
  "type": "object",
  "description": "AMM data",
  "required": [
    "feeTierId",
    "bidSpreadFee",
    "askSpreadFee",
    "baseReservesQuantity",
    "quoteReservesQuantity",
    "currentPrice"
  ],
  "properties": {
    "feeTierId": {
      "allOf": [
        {
          "type": "string",
          "description": "unique fee tier ID, see [Get Market By Symbol](#get-/v1/markets/-symbol-)",
          "example": "1"
        }
      ]
    },
    "bidSpreadFee": {
      "description": "bid spread fee",
      "type": "string",
      "example": "0.00040000"
    },
    "askSpreadFee": {
      "description": "ask spread fee",
      "type": "string",
      "example": "0.00040000"
    },
    "baseReservesQuantity": {
      "description": "base reserves quantity",
      "type": "string",
      "example": "245.56257825"
    },
    "quoteReservesQuantity": {
      "description": "quote reserves quantity",
      "type": "string",
      "example": "3424383.3629"
    },
    "currentPrice": {
      "description": "current AMM price",
      "type": "string",
      "example": "16856.0000"
    }
  }
}
```

AMM data

### Properties

| Name                  | Type                          | Required | Restrictions | Description                                                               |
| --------------------- | ----------------------------- | -------- | ------------ | ------------------------------------------------------------------------- |
| feeTierId             | [FeeTierId](#schemafeetierid) | true     | none         | unique fee tier ID, see [Get Market By Symbol](#get-/v1/markets/-symbol-) |
| bidSpreadFee          | string                        | true     | none         | bid spread fee                                                            |
| askSpreadFee          | string                        | true     | none         | ask spread fee                                                            |
| baseReservesQuantity  | string                        | true     | none         | base reserves quantity                                                    |
| quoteReservesQuantity | string                        | true     | none         | quote reserves quantity                                                   |
| currentPrice          | string                        | true     | none         | current AMM price                                                         |

## MarketSymbol

```json
"BTCUSDC"
```

market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                   |
| ----------- | ------ | -------- | ------------ | ----------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market |

## DatedFutureMarketSymbol

```json
"BTC-USDC-20241201"
```

market symbol. Eg `BTC-USDC-PERP` for PERPETUAL and `BTC-USDC-20241201` for
DATED FUTURE markets.

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                                       |
| ----------- | ------ | -------- | ------------ | ------------------------------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | market symbol. Eg `BTC-USDC-PERP` for PERPETUAL and `BTC-USDC-20241201` for DATED FUTURE markets. |

## PerpMarketSymbol

```json
"BTC-USDC-PERP"
```

market symbol. Eg `BTC-USDC-PERP` for PERPETUAL market

### Properties

| Name        | Type   | Required | Restrictions | Description                                            |
| ----------- | ------ | -------- | ------------ | ------------------------------------------------------ |
| _anonymous_ | string | false    | none         | market symbol. Eg `BTC-USDC-PERP` for PERPETUAL market |

## FeeTier

```json
{
  "type": "object",
  "description": "unique fee tier",
  "required": ["feeTierId", "staticSpreadFee", "isDislocationEnabled"],
  "properties": {
    "feeTierId": {
      "allOf": [
        {
          "type": "string",
          "description": "unique fee tier ID, see [Get Market By Symbol](#get-/v1/markets/-symbol-)",
          "example": "1"
        }
      ]
    },
    "staticSpreadFee": {
      "description": "static spread fee",
      "type": "string",
      "example": "0.00040000"
    },
    "isDislocationEnabled": {
      "description": "dislocation enabled/disabled",
      "type": "boolean",
      "example": true
    }
  }
}
```

unique fee tier

### Properties

| Name                 | Type                          | Required | Restrictions | Description                                                               |
| -------------------- | ----------------------------- | -------- | ------------ | ------------------------------------------------------------------------- |
| feeTierId            | [FeeTierId](#schemafeetierid) | true     | none         | unique fee tier ID, see [Get Market By Symbol](#get-/v1/markets/-symbol-) |
| staticSpreadFee      | string                        | true     | none         | static spread fee                                                         |
| isDislocationEnabled | boolean                       | true     | none         | dislocation enabled/disabled                                              |

## FeeTierId

```json
"1"
```

unique fee tier ID, see [Get Market By Symbol](#get-/v1/markets/-symbol-)

### Properties

| Name        | Type   | Required | Restrictions | Description                                                               |
| ----------- | ------ | -------- | ------------ | ------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | unique fee tier ID, see [Get Market By Symbol](#get-/v1/markets/-symbol-) |

## InstrumentId

```json
"BTC"
```

custody identifier for instrument

### Properties

| Name        | Type   | Required | Restrictions | Description                       |
| ----------- | ------ | -------- | ------------ | --------------------------------- |
| _anonymous_ | string | false    | none         | custody identifier for instrument |

## AssetSymbol

```json
"BTC"
```

asset symbol as denoted in the world

### Properties

| Name        | Type   | Required | Restrictions | Description                          |
| ----------- | ------ | -------- | ------------ | ------------------------------------ |
| _anonymous_ | string | false    | none         | asset symbol as denoted in the world |

## UnderlyingAssetSymbol

```json
"BTC"
```

the underlying asset symbol of the options contract that is eligible for MMP
checks

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                         |
| ----------- | ------ | -------- | ------------ | ----------------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | the underlying asset symbol of the options contract that is eligible for MMP checks |

## QuoteAssetSymbol

```json
"USDC"
```

asset symbol as denoted in the world

### Properties

| Name        | Type   | Required | Restrictions | Description                          |
| ----------- | ------ | -------- | ------------ | ------------------------------------ |
| _anonymous_ | string | false    | none         | asset symbol as denoted in the world |

## AssetName

```json
"Bitcoin"
```

asset name

### Properties

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | string | false    | none         | asset name  |

## AssetID

```json
"1"
```

unique asset ID

### Properties

| Name        | Type   | Required | Restrictions | Description     |
| ----------- | ------ | -------- | ------------ | --------------- |
| _anonymous_ | string | false    | none         | unique asset ID |

## CollateralBand

```json
{
  "type": "object",
  "properties": {
    "collateralPercentage": {
      "description": "collateral percentage applied to the asset for this band - a value of 90.00 indicates 90% of the asset is eligible to be used as collateral",
      "type": "string",
      "example": "95.00"
    },
    "bandLimitUSD": {
      "description": "upper limit in USD for this band",
      "type": "string",
      "example": "1000000.0000"
    }
  }
}
```

### Properties

| Name                 | Type   | Required | Restrictions | Description                                                                                                                                 |
| -------------------- | ------ | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| collateralPercentage | string | false    | none         | collateral percentage applied to the asset for this band - a value of 90.00 indicates 90% of the asset is eligible to be used as collateral |
| bandLimitUSD         | string | false    | none         | upper limit in USD for this band                                                                                                            |

## UnderlyingAsset

```json
{
  "type": "object",
  "properties": {
    "symbol": {
      "description": "underlying asset symbol",
      "type": "string",
      "example": "BTC"
    },
    "assetId": {
      "description": "underlying asset ID",
      "type": "string",
      "example": "1"
    },
    "bpmMinReturnStart": {
      "description": "start of the 1/1000 biggest downward price movement of an underlying asset over 6 hours",
      "type": "string",
      "example": "40.0000"
    },
    "bpmMinReturnEnd": {
      "description": "end of the 1/1000 biggest downward price movement of an underlying asset over 6 hours",
      "type": "string",
      "example": "20.0000"
    },
    "bpmMaxReturnStart": {
      "description": "start of the 1/1000 biggest upward price movement of an underlying asset over 6 hours",
      "type": "string",
      "example": "30.0000"
    },
    "bpmMaxReturnEnd": {
      "description": "end of the 1/1000 biggest upward price movement of an underlying asset over 6 hours",
      "type": "string",
      "example": "50.0000"
    },
    "marketRiskFloorPctStart": {
      "description": "the percentage range of risk reduction allowed for a portfolio",
      "type": "string",
      "example": "1.00"
    },
    "marketRiskFloorPctEnd": {
      "description": "the percentage range of risk reduction allowed for a portfolio",
      "type": "string",
      "example": "5.00"
    },
    "bpmTransitionDateTimeStart": {
      "description": "the start datetime which the values linearly transition from `bpmMinReturnStart` to `bpmMinReturnEnd` for an underlying asset",
      "type": "string",
      "example": "2024-08-02T12:00:00.000Z"
    },
    "bpmTransitionDateTimeEnd": {
      "description": "the end datetime which the values linearly transition from `bpmMinReturnStart` to `bpmMinReturnEnd` for an underlying asset",
      "type": "string",
      "example": "2024-08-02T18:00:00.000Z"
    }
  }
}
```

### Properties

| Name                       | Type   | Required | Restrictions | Description                                                                                                                   |
| -------------------------- | ------ | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| symbol                     | string | false    | none         | underlying asset symbol                                                                                                       |
| assetId                    | string | false    | none         | underlying asset ID                                                                                                           |
| bpmMinReturnStart          | string | false    | none         | start of the 1/1000 biggest downward price movement of an underlying asset over 6 hours                                       |
| bpmMinReturnEnd            | string | false    | none         | end of the 1/1000 biggest downward price movement of an underlying asset over 6 hours                                         |
| bpmMaxReturnStart          | string | false    | none         | start of the 1/1000 biggest upward price movement of an underlying asset over 6 hours                                         |
| bpmMaxReturnEnd            | string | false    | none         | end of the 1/1000 biggest upward price movement of an underlying asset over 6 hours                                           |
| marketRiskFloorPctStart    | string | false    | none         | the percentage range of risk reduction allowed for a portfolio                                                                |
| marketRiskFloorPctEnd      | string | false    | none         | the percentage range of risk reduction allowed for a portfolio                                                                |
| bpmTransitionDateTimeStart | string | false    | none         | the start datetime which the values linearly transition from `bpmMinReturnStart` to `bpmMinReturnEnd` for an underlying asset |
| bpmTransitionDateTimeEnd   | string | false    | none         | the end datetime which the values linearly transition from `bpmMinReturnStart` to `bpmMinReturnEnd` for an underlying asset   |

## PriceQuantityTuple

```json
{
  "type": "object",
  "properties": {
    "price": {
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "priceLevelQuantity": {
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    }
  }
}
```

### Properties

| Name               | Type                            | Required | Restrictions | Description                                                       |
| ------------------ | ------------------------------- | -------- | ------------ | ----------------------------------------------------------------- |
| price              | [AssetValue](#schemaassetvalue) | false    | none         | see [asset value](#overview--price-and-quantity-precision) format |
| priceLevelQuantity | [AssetValue](#schemaassetvalue) | false    | none         | see [asset value](#overview--price-and-quantity-precision) format |

## OrderBook

```json
{
  "type": "object",
  "required": ["bids", "asks", "datetime", "timestamp", "sequenceNumber"],
  "properties": {
    "bids": {
      "description": "bids",
      "type": "array",
      "minItems": 0,
      "maxItems": 10,
      "items": {
        "allOf": [
          {
            "type": "object",
            "properties": {
              "price": {
                "allOf": [
                  {
                    "description": "see [asset value](#overview--price-and-quantity-precision) format",
                    "type": "string",
                    "example": "1.00000000"
                  }
                ]
              },
              "priceLevelQuantity": {
                "allOf": [
                  {
                    "description": "see [asset value](#overview--price-and-quantity-precision) format",
                    "type": "string",
                    "example": "1.00000000"
                  }
                ]
              }
            }
          }
        ]
      }
    },
    "asks": {
      "description": "asks",
      "type": "array",
      "minItems": 0,
      "maxItems": 10,
      "items": {
        "allOf": [
          {
            "type": "object",
            "properties": {
              "price": {
                "allOf": [
                  {
                    "description": "see [asset value](#overview--price-and-quantity-precision) format",
                    "type": "string",
                    "example": "1.00000000"
                  }
                ]
              },
              "priceLevelQuantity": {
                "allOf": [
                  {
                    "description": "see [asset value](#overview--price-and-quantity-precision) format",
                    "type": "string",
                    "example": "1.00000000"
                  }
                ]
              }
            }
          }
        ]
      }
    },
    "datetime": {
      "description": "date and time of order book snapshot, ISO 8601 with millisecond as string",
      "allOf": [
        {
          "type": "string",
          "format": "date-time",
          "example": "2025-05-20T01:01:01.000Z",
          "description": "ISO 8601 with millisecond as string"
        }
      ]
    },
    "timestamp": {
      "description": "timestamp of order book snapshot",
      "allOf": [
        {
          "type": "string",
          "format": "string",
          "example": "1621490985000",
          "description": "unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string"
        }
      ]
    },
    "sequenceNumber": {
      "description": "an incremented unique identifier of the order book snapshot",
      "type": "integer",
      "example": 999
    }
  }
}
```

### Properties

| Name           | Type                                          | Required | Restrictions | Description                                                               |
| -------------- | --------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------- |
| bids           | [allOf]                                       | true     | none         | bids                                                                      |
| asks           | [allOf]                                       | true     | none         | asks                                                                      |
| datetime       | [DateTime](#schemadatetime)                   | true     | none         | date and time of order book snapshot, ISO 8601 with millisecond as string |
| timestamp      | [TimeStampAsString](#schematimestampasstring) | true     | none         | timestamp of order book snapshot                                          |
| sequenceNumber | integer                                       | true     | none         | an incremented unique identifier of the order book snapshot               |

## IndexPrice

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

### Properties

| Name               | Type                              | Required | Restrictions | Description                                   |
| ------------------ | --------------------------------- | -------- | ------------ | --------------------------------------------- |
| assetSymbol        | [AssetSymbol](#schemaassetsymbol) | true     | none         | Asset symbol                                  |
| price              | string                            | true     | none         | Asset price in USD                            |
| updatedAtDatetime  | [DateTime](#schemadatetime)       | true     | none         | Date and time when the index price is updated |
| updatedAtTimestamp | [TimeStamp](#schematimestamp)     | true     | none         | Timestamp when the index price is updated     |

## Market

```json
{
  "type": "object",
  "required": [
    "marketId",
    "symbol",
    "quoteAssetId",
    "baseAssetId",
    "quoteSymbol",
    "baseSymbol",
    "quotePrecision",
    "basePrecision",
    "pricePrecision",
    "quantityPrecision",
    "costPrecision",
    "priceBuffer",
    "minQuantityLimit",
    "maxQuantityLimit",
    "maxPriceLimit",
    "minPriceLimit",
    "maxCostLimit",
    "minCostLimit",
    "timeZone",
    "tickSize",
    "liquidityTickSize",
    "liquidityPrecision",
    "feeGroupId",
    "roundingCorrectionFactor",
    "makerMinLiquidityAddition",
    "spotTradingEnabled",
    "marginTradingEnabled",
    "marketEnabled",
    "createOrderEnabled",
    "cancelOrderEnabled",
    "liquidityInvestEnabled",
    "liquidityWithdrawEnabled",
    "feeTiers",
    "marketType",
    "openInterestUSD",
    "concentrationRiskThresholdUSD",
    "concentrationRiskPercentage",
    "expiryDatetime"
  ],
  "properties": {
    "marketId": {
      "description": "unique market ID",
      "allOf": [
        {
          "type": "string",
          "example": "10000"
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
    "baseSymbol": {
      "description": "base asset symbol (only applies to spot market)",
      "allOf": [
        {
          "type": "string",
          "description": "asset symbol as denoted in the world",
          "example": "BTC"
        }
      ]
    },
    "underlyingBaseSymbol": {
      "description": "underlying base asset symbol (only applies to derivative market)",
      "example": null,
      "allOf": [
        {
          "type": "string",
          "description": "asset symbol as denoted in the world",
          "example": "BTC"
        }
      ]
    },
    "quoteSymbol": {
      "description": "quote asset symbol (only applies to spot market)",
      "allOf": [
        {
          "type": "string",
          "description": "asset symbol as denoted in the world",
          "example": "BTC"
        }
      ]
    },
    "underlyingQuoteSymbol": {
      "description": "underlying quote asset symbol (only applies to derivative market)",
      "example": null,
      "allOf": [
        {
          "type": "string",
          "description": "asset symbol as denoted in the world",
          "example": "BTC"
        }
      ]
    },
    "quoteAssetId": {
      "description": "quote asset id",
      "allOf": [
        {
          "type": "string",
          "description": "unique asset ID",
          "example": "1"
        }
      ]
    },
    "baseAssetId": {
      "description": "base asset id",
      "allOf": [
        {
          "type": "string",
          "description": "unique asset ID",
          "example": "1"
        }
      ]
    },
    "quotePrecision": {
      "description": "quote precision",
      "type": "integer",
      "example": 4
    },
    "basePrecision": {
      "description": "base precision",
      "type": "integer",
      "example": 8
    },
    "pricePrecision": {
      "description": "number of decimal digits 'after the dot' for price",
      "type": "integer",
      "example": 8
    },
    "quantityPrecision": {
      "description": "number of decimal digits 'after the dot' for quantity",
      "type": "integer",
      "example": 8
    },
    "costPrecision": {
      "description": "number of decimal digits 'after the dot' for cost, `price * quantity`",
      "type": "integer",
      "example": 8
    },
    "priceBuffer": {
      "description": "buffer range of limit price from the last traded price.",
      "type": "string",
      "example": 0.3
    },
    "minQuantityLimit": {
      "description": "order quantity should be > min, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "maxQuantityLimit": {
      "description": "order quantity should be < max, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "maxPriceLimit": {
      "description": "order price should be < max, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "minPriceLimit": {
      "description": "order price should be > min, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "maxCostLimit": {
      "description": "order cost, `price * quantity` should be < max, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "minCostLimit": {
      "description": "order cost, `price * quantity` should be > min, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "timeZone": {
      "description": "time zone",
      "type": "string",
      "example": "Etc/UTC"
    },
    "tickSize": {
      "description": "tick size, see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "liquidityTickSize": {
      "description": "liquidity tick size.",
      "type": "string",
      "example": "100.0000"
    },
    "liquidityPrecision": {
      "description": "liquidity precision.",
      "type": "integer",
      "example": 4
    },
    "makerFee": {
      "description": "Deprecated and no longer accurate. See `feeGroupId`",
      "type": "integer",
      "example": 0,
      "deprecated": true
    },
    "takerFee": {
      "description": "Deprecated and no longer accurate. See `feeGroupId`",
      "type": "integer",
      "example": 2,
      "deprecated": true
    },
    "roundingCorrectionFactor": {
      "description": "rounding correction factor for market",
      "type": "string",
      "example": "0.00000001"
    },
    "makerMinLiquidityAddition": {
      "description": "minimum amount required to invest liquidity to market.",
      "type": "string",
      "example": "5000"
    },
    "orderTypes": {
      "type": "array",
      "items": {
        "allOf": [
          {
            "type": "string",
            "description": "order type can have the following string values `\"LMT\"`, `\"MKT\"`, `\"STOP_LIMIT\"`, `\"POST_ONLY\"`.",
            "example": "LMT"
          }
        ]
      }
    },
    "spotTradingEnabled": {
      "description": "spot trading enabled (only applies for Spot markets)",
      "type": "boolean",
      "example": true
    },
    "marginTradingEnabled": {
      "description": "margin trading enabled (only applies for Spot markets)",
      "type": "boolean",
      "example": true
    },
    "marketEnabled": {
      "description": "market enabled",
      "type": "boolean",
      "example": true
    },
    "createOrderEnabled": {
      "description": "able to create order",
      "type": "boolean",
      "example": true
    },
    "amendOrderEnabled": {
      "description": "able to amend order",
      "type": "boolean",
      "example": true,
      "deprecated": true
    },
    "cancelOrderEnabled": {
      "description": "able to cancel order",
      "type": "boolean",
      "example": true
    },
    "liquidityInvestEnabled": {
      "description": "able to invest liquidity to market.",
      "type": "boolean",
      "example": true
    },
    "liquidityWithdrawEnabled": {
      "description": "able to withdraw liquidity from market.",
      "type": "boolean",
      "example": true
    },
    "feeGroupId": {
      "description": "Identifier to the trade fee assigned to this market. Used with `tradeFeeRate` at [Get Trading Account](#get-/v1/accounts/trading-accounts/-tradingAccountId-)",
      "type": "integer",
      "example": 1
    },
    "feeTiers": {
      "description": "all available fee tiers.",
      "type": "array",
      "minItems": 0,
      "items": {
        "allOf": [
          {
            "type": "object",
            "description": "unique fee tier",
            "required": [
              "feeTierId",
              "staticSpreadFee",
              "isDislocationEnabled"
            ],
            "properties": {
              "feeTierId": {
                "allOf": [
                  {
                    "type": "string",
                    "description": "unique fee tier ID, see [Get Market By Symbol](#get-/v1/markets/-symbol-)",
                    "example": "1"
                  }
                ]
              },
              "staticSpreadFee": {
                "description": "static spread fee",
                "type": "string",
                "example": "0.00040000"
              },
              "isDislocationEnabled": {
                "description": "dislocation enabled/disabled",
                "type": "boolean",
                "example": true
              }
            }
          }
        ]
      }
    },
    "marketType": {
      "description": "market type, e.g. \"SPOT\" for market like \"BTCUSD\", \"PERPETUAL\" for market like \"BTC-USDC-PERP\", \"DATED_FUTURE\" for market like \"BTC-USDC-20250901\", \"OPTION\" for market like \"BTC-USDC-20250901-90000-C\"",
      "allOf": [
        {
          "type": "string",
          "description": "market type can have the following string values `\"SPOT\"`, `\"PERPETUAL\"`, `\"DATED_FUTURE\"`",
          "enum": ["SPOT", "PERPETUAL", "DATED_FUTURE"],
          "example": "SPOT"
        }
      ]
    },
    "contractMultiplier": {
      "description": "contract multiplier. (only applies to perpetual market)",
      "type": "integer",
      "example": null
    },
    "settlementAssetSymbol": {
      "description": "settlement asset symbol. (only applies to perpetual market)",
      "type": "string",
      "example": null
    },
    "openInterestUSD": {
      "description": "cumulative notional value of all open interest for a specific derivative contract on the exchange.",
      "type": "string",
      "example": null
    },
    "concentrationRiskThresholdUSD": {
      "description": "open interest notional of an account for a specific derivative contract.",
      "type": "string",
      "example": null
    },
    "concentrationRiskPercentage": {
      "description": "percentage of the total open interest for a specific derivative contract.",
      "type": "string",
      "example": null
    },
    "expiryDatetime": {
      "description": "denotes the time when the market expires in ISO 8601 with millisecond format as string",
      "type": "string",
      "example": "2024-10-04T08:00:00.000Z"
    }
  }
}
```

### Properties

| Name                          | Type                                            | Required | Restrictions | Description                                                                                                                                                                                              |
| ----------------------------- | ----------------------------------------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| marketId                      | [MarketID](#schemamarketid)                     | true     | none         | unique market ID                                                                                                                                                                                         |
| symbol                        | [MarketSymbol](#schemamarketsymbol)             | true     | none         | market symbol                                                                                                                                                                                            |
| baseSymbol                    | [AssetSymbol](#schemaassetsymbol)               | true     | none         | base asset symbol (only applies to spot market)                                                                                                                                                          |
| underlyingBaseSymbol          | [AssetSymbol](#schemaassetsymbol)               | false    | none         | underlying base asset symbol (only applies to derivative market)                                                                                                                                         |
| quoteSymbol                   | [AssetSymbol](#schemaassetsymbol)               | true     | none         | quote asset symbol (only applies to spot market)                                                                                                                                                         |
| underlyingQuoteSymbol         | [AssetSymbol](#schemaassetsymbol)               | false    | none         | underlying quote asset symbol (only applies to derivative market)                                                                                                                                        |
| quoteAssetId                  | [AssetID](#schemaassetid)                       | true     | none         | quote asset id                                                                                                                                                                                           |
| baseAssetId                   | [AssetID](#schemaassetid)                       | true     | none         | base asset id                                                                                                                                                                                            |
| quotePrecision                | integer                                         | true     | none         | quote precision                                                                                                                                                                                          |
| basePrecision                 | integer                                         | true     | none         | base precision                                                                                                                                                                                           |
| pricePrecision                | integer                                         | true     | none         | number of decimal digits 'after the dot' for price                                                                                                                                                       |
| quantityPrecision             | integer                                         | true     | none         | number of decimal digits 'after the dot' for quantity                                                                                                                                                    |
| costPrecision                 | integer                                         | true     | none         | number of decimal digits 'after the dot' for cost, `price * quantity`                                                                                                                                    |
| priceBuffer                   | string                                          | true     | none         | buffer range of limit price from the last traded price.                                                                                                                                                  |
| minQuantityLimit              | [AssetValue](#schemaassetvalue)                 | true     | none         | order quantity should be > min, see [asset value](#overview--price-and-quantity-precision) format                                                                                                        |
| maxQuantityLimit              | [AssetValue](#schemaassetvalue)                 | true     | none         | order quantity should be < max, see [asset value](#overview--price-and-quantity-precision) format                                                                                                        |
| maxPriceLimit                 | [AssetValue](#schemaassetvalue)                 | true     | none         | order price should be < max, see [asset value](#overview--price-and-quantity-precision) format                                                                                                           |
| minPriceLimit                 | [AssetValue](#schemaassetvalue)                 | true     | none         | order price should be > min, see [asset value](#overview--price-and-quantity-precision) format                                                                                                           |
| maxCostLimit                  | [AssetValue](#schemaassetvalue)                 | true     | none         | order cost, `price * quantity` should be < max, see [asset value](#overview--price-and-quantity-precision) format                                                                                        |
| minCostLimit                  | [AssetValue](#schemaassetvalue)                 | true     | none         | order cost, `price * quantity` should be > min, see [asset value](#overview--price-and-quantity-precision) format                                                                                        |
| timeZone                      | string                                          | true     | none         | time zone                                                                                                                                                                                                |
| tickSize                      | [AssetValue](#schemaassetvalue)                 | true     | none         | tick size, see [asset value](#overview--price-and-quantity-precision) format                                                                                                                             |
| liquidityTickSize             | string                                          | true     | none         | liquidity tick size.                                                                                                                                                                                     |
| liquidityPrecision            | integer                                         | true     | none         | liquidity precision.                                                                                                                                                                                     |
| makerFee                      | integer                                         | false    | none         | Deprecated and no longer accurate. See `feeGroupId`                                                                                                                                                      |
| takerFee                      | integer                                         | false    | none         | Deprecated and no longer accurate. See `feeGroupId`                                                                                                                                                      |
| roundingCorrectionFactor      | string                                          | true     | none         | rounding correction factor for market                                                                                                                                                                    |
| makerMinLiquidityAddition     | string                                          | true     | none         | minimum amount required to invest liquidity to market.                                                                                                                                                   |
| orderTypes                    | [allOf]                                         | false    | none         | none                                                                                                                                                                                                     |
| spotTradingEnabled            | boolean                                         | true     | none         | spot trading enabled (only applies for Spot markets)                                                                                                                                                     |
| marginTradingEnabled          | boolean                                         | true     | none         | margin trading enabled (only applies for Spot markets)                                                                                                                                                   |
| marketEnabled                 | boolean                                         | true     | none         | market enabled                                                                                                                                                                                           |
| createOrderEnabled            | boolean                                         | true     | none         | able to create order                                                                                                                                                                                     |
| amendOrderEnabled             | boolean                                         | false    | none         | able to amend order                                                                                                                                                                                      |
| cancelOrderEnabled            | boolean                                         | true     | none         | able to cancel order                                                                                                                                                                                     |
| liquidityInvestEnabled        | boolean                                         | true     | none         | able to invest liquidity to market.                                                                                                                                                                      |
| liquidityWithdrawEnabled      | boolean                                         | true     | none         | able to withdraw liquidity from market.                                                                                                                                                                  |
| feeGroupId                    | integer                                         | true     | none         | Identifier to the trade fee assigned to this market. Used with `tradeFeeRate` at [Get Trading Account](#get-/v1/accounts/trading-accounts/-tradingAccountId-)                                            |
| feeTiers                      | [allOf]                                         | true     | none         | all available fee tiers.                                                                                                                                                                                 |
| marketType                    | [MarketTypeAsString](#schemamarkettypeasstring) | true     | none         | market type, e.g. "SPOT" for market like "BTCUSD", "PERPETUAL" for market like "BTC-USDC-PERP", "DATED_FUTURE" for market like "BTC-USDC-20250901", "OPTION" for market like "BTC-USDC-20250901-90000-C" |
| contractMultiplier            | integer                                         | false    | none         | contract multiplier. (only applies to perpetual market)                                                                                                                                                  |
| settlementAssetSymbol         | string                                          | false    | none         | settlement asset symbol. (only applies to perpetual market)                                                                                                                                              |
| openInterestUSD               | string                                          | true     | none         | cumulative notional value of all open interest for a specific derivative contract on the exchange.                                                                                                       |
| concentrationRiskThresholdUSD | string                                          | true     | none         | open interest notional of an account for a specific derivative contract.                                                                                                                                 |
| concentrationRiskPercentage   | string                                          | true     | none         | percentage of the total open interest for a specific derivative contract.                                                                                                                                |
| expiryDatetime                | string                                          | true     | none         | denotes the time when the market expires in ISO 8601 with millisecond format as string                                                                                                                   |

## Asset

```json
{
  "type": "object",
  "required": [
    "assetId",
    "symbol",
    "name",
    "precision",
    "minBalanceInterest",
    "minFee",
    "apr",
    "collateralRating",
    "maxBorrow",
    "totalOfferedLoanQuantity",
    "loanBorrowedQuantity",
    "collateralBands",
    "underlyingAsset"
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
    "symbol": {
      "description": "asset symbol",
      "allOf": [
        {
          "type": "string",
          "description": "asset symbol as denoted in the world",
          "example": "BTC"
        }
      ]
    },
    "name": {
      "description": "asset name",
      "allOf": [
        {
          "type": "string",
          "description": "asset name",
          "example": "Bitcoin"
        }
      ]
    },
    "precision": {
      "description": "number of decimal digits 'after the dot' for asset amount",
      "type": "string",
      "example": "8"
    },
    "minBalanceInterest": {
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "minFee": {
      "description": "minimum fee",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "apr": {
      "description": "annualized percentage rate",
      "type": "string",
      "example": "12.50"
    },
    "collateralRating": {
      "deprecated": true,
      "description": "collateral rating applied to this asset, a value of 100.00 indicates 100%. `Deprecated in favour of collateral bands`",
      "type": "string",
      "example": "95.00"
    },
    "maxBorrow": {
      "description": "maximum quantity that can be borrowed for this asset",
      "type": "string",
      "example": "10.00000000"
    },
    "totalOfferedLoanQuantity": {
      "description": "quantity of an asset that is across all loan offers on the exchange",
      "type": "string",
      "example": "5.00000000"
    },
    "loanBorrowedQuantity": {
      "description": "amount of loans that is currently being borrowed for the asset",
      "type": "string",
      "example": "3.00000000"
    },
    "collateralBands": {
      "description": "list of collateral bands for the asset. A collateral band holds the upper limit of the USD notional and the corresponding collateral percentage which applies to it. An asset's collateral value will be capped by the highest limit of the collateral bands, any remaining amount greater than this limit will have a collateral percentage of 0. If an asset has an empty list of CollateralBands, this signifies that the asset has a collateralValue of 0.",
      "type": "array",
      "items": {
        "allOf": [
          {
            "type": "object",
            "properties": {
              "collateralPercentage": {
                "description": "collateral percentage applied to the asset for this band - a value of 90.00 indicates 90% of the asset is eligible to be used as collateral",
                "type": "string",
                "example": "95.00"
              },
              "bandLimitUSD": {
                "description": "upper limit in USD for this band",
                "type": "string",
                "example": "1000000.0000"
              }
            }
          }
        ]
      }
    },
    "underlyingAsset": {
      "description": "underlying asset for the asset.",
      "allOf": [
        {
          "type": "object",
          "properties": {
            "symbol": {
              "description": "underlying asset symbol",
              "type": "string",
              "example": "BTC"
            },
            "assetId": {
              "description": "underlying asset ID",
              "type": "string",
              "example": "1"
            },
            "bpmMinReturnStart": {
              "description": "start of the 1/1000 biggest downward price movement of an underlying asset over 6 hours",
              "type": "string",
              "example": "40.0000"
            },
            "bpmMinReturnEnd": {
              "description": "end of the 1/1000 biggest downward price movement of an underlying asset over 6 hours",
              "type": "string",
              "example": "20.0000"
            },
            "bpmMaxReturnStart": {
              "description": "start of the 1/1000 biggest upward price movement of an underlying asset over 6 hours",
              "type": "string",
              "example": "30.0000"
            },
            "bpmMaxReturnEnd": {
              "description": "end of the 1/1000 biggest upward price movement of an underlying asset over 6 hours",
              "type": "string",
              "example": "50.0000"
            },
            "marketRiskFloorPctStart": {
              "description": "the percentage range of risk reduction allowed for a portfolio",
              "type": "string",
              "example": "1.00"
            },
            "marketRiskFloorPctEnd": {
              "description": "the percentage range of risk reduction allowed for a portfolio",
              "type": "string",
              "example": "5.00"
            },
            "bpmTransitionDateTimeStart": {
              "description": "the start datetime which the values linearly transition from `bpmMinReturnStart` to `bpmMinReturnEnd` for an underlying asset",
              "type": "string",
              "example": "2024-08-02T12:00:00.000Z"
            },
            "bpmTransitionDateTimeEnd": {
              "description": "the end datetime which the values linearly transition from `bpmMinReturnStart` to `bpmMinReturnEnd` for an underlying asset",
              "type": "string",
              "example": "2024-08-02T18:00:00.000Z"
            }
          }
        }
      ]
    }
  }
}
```

### Properties

| Name                     | Type                                      | Required | Restrictions | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------ | ----------------------------------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| assetId                  | [AssetID](#schemaassetid)                 | true     | none         | unique asset ID                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| symbol                   | [AssetSymbol](#schemaassetsymbol)         | true     | none         | asset symbol                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| name                     | [AssetName](#schemaassetname)             | true     | none         | asset name                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| precision                | string                                    | true     | none         | number of decimal digits 'after the dot' for asset amount                                                                                                                                                                                                                                                                                                                                                                                                      |
| minBalanceInterest       | [AssetValue](#schemaassetvalue)           | true     | none         | see [asset value](#overview--price-and-quantity-precision) format                                                                                                                                                                                                                                                                                                                                                                                              |
| minFee                   | [AssetValue](#schemaassetvalue)           | true     | none         | minimum fee                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| apr                      | string                                    | true     | none         | annualized percentage rate                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| collateralRating         | string                                    | true     | none         | collateral rating applied to this asset, a value of 100.00 indicates 100%. `Deprecated in favour of collateral bands`                                                                                                                                                                                                                                                                                                                                          |
| maxBorrow                | string                                    | true     | none         | maximum quantity that can be borrowed for this asset                                                                                                                                                                                                                                                                                                                                                                                                           |
| totalOfferedLoanQuantity | string                                    | true     | none         | quantity of an asset that is across all loan offers on the exchange                                                                                                                                                                                                                                                                                                                                                                                            |
| loanBorrowedQuantity     | string                                    | true     | none         | amount of loans that is currently being borrowed for the asset                                                                                                                                                                                                                                                                                                                                                                                                 |
| collateralBands          | [allOf]                                   | true     | none         | list of collateral bands for the asset. A collateral band holds the upper limit of the USD notional and the corresponding collateral percentage which applies to it. An asset's collateral value will be capped by the highest limit of the collateral bands, any remaining amount greater than this limit will have a collateral percentage of 0. If an asset has an empty list of CollateralBands, this signifies that the asset has a collateralValue of 0. |
| underlyingAsset          | [UnderlyingAsset](#schemaunderlyingasset) | true     | none         | underlying asset for the asset.                                                                                                                                                                                                                                                                                                                                                                                                                                |

## OHLCVCandle

```json
{
  "type": "object",
  "properties": {
    "open": {
      "description": "see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "high": {
      "description": "see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "low": {
      "description": "see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "close": {
      "description": "see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
    },
    "volume": {
      "description": "see [asset value](#overview--price-and-quantity-precision) format",
      "allOf": [
        {
          "description": "see [asset value](#overview--price-and-quantity-precision) format",
          "type": "string",
          "example": "1.00000000"
        }
      ]
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
      "description": "date and time of the candle, ISO 8601 with millisecond as string",
      "allOf": [
        {
          "type": "string",
          "format": "date-time",
          "example": "2025-05-20T01:01:01.000Z",
          "description": "ISO 8601 with millisecond as string"
        }
      ]
    },
    "publishedAtTimestamp": {
      "description": "date and time of the candle getting published, ISO 8601 with millisecond as string",
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

### Properties

| Name                 | Type                                          | Required | Restrictions | Description                                                                                       |
| -------------------- | --------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------- |
| open                 | [AssetValue](#schemaassetvalue)               | false    | none         | see [asset value](#overview--price-and-quantity-precision) format                                 |
| high                 | [AssetValue](#schemaassetvalue)               | false    | none         | see [asset value](#overview--price-and-quantity-precision) format                                 |
| low                  | [AssetValue](#schemaassetvalue)               | false    | none         | see [asset value](#overview--price-and-quantity-precision) format                                 |
| close                | [AssetValue](#schemaassetvalue)               | false    | none         | see [asset value](#overview--price-and-quantity-precision) format                                 |
| volume               | [AssetValue](#schemaassetvalue)               | false    | none         | see [asset value](#overview--price-and-quantity-precision) format                                 |
| createdAtTimestamp   | [TimeStampAsString](#schematimestampasstring) | false    | none         | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string |
| createdAtDatetime    | [DateTime](#schemadatetime)                   | false    | none         | date and time of the candle, ISO 8601 with millisecond as string                                  |
| publishedAtTimestamp | [TimeStampAsString](#schematimestampasstring) | false    | none         | date and time of the candle getting published, ISO 8601 with millisecond as string                |

## BorrowInterest

```json
{
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
```

### Properties

| Name                  | Type                              | Required | Restrictions | Description                                                                                                                         |
| --------------------- | --------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| assetId               | [AssetID](#schemaassetid)         | true     | none         | unique asset ID                                                                                                                     |
| assetSymbol           | [AssetSymbol](#schemaassetsymbol) | true     | none         | asset symbol                                                                                                                        |
| borrowedQuantity      | [AssetValue](#schemaassetvalue)   | true     | none         | the principal borrowed quantity                                                                                                     |
| totalBorrowedQuantity | [AssetValue](#schemaassetvalue)   | true     | none         | the sum of the principal borrowed quantity and the interest charged                                                                 |
| createdAtDatetime     | string(date-time)                 | true     | none         | denotes the hour in which the principal quantity was borrowed or when the interest was charged, ISO 8601 with millisecond as string |
| createdAtTimestamp    | string(string)                    | true     | none         | denotes the hour in which the principal quantity was borrowed or when the interest was charged                                      |

## CurrentExchangeTimeResponse

```json
{
  "type": "object",
  "required": ["timestamp", "datetime"],
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
    "datetime": {
      "description": "ISO 8601 with millisecond as string",
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
```

### Properties

| Name      | Type                                          | Required | Restrictions | Description                                                                                       |
| --------- | --------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------- |
| timestamp | [TimeStampAsString](#schematimestampasstring) | true     | none         | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string |
| datetime  | [DateTime](#schemadatetime)                   | true     | none         | ISO 8601 with millisecond as string                                                               |

## Nonce

```json
{
  "type": "object",
  "required": ["upperBound", "lowerBound"],
  "properties": {
    "lowerBound": {
      "description": "lower bound of nonce range",
      "type": "integer",
      "example": 8455
    },
    "upperBound": {
      "description": "upper bound of nonce range",
      "type": "integer",
      "example": 9455
    }
  }
}
```

### Properties

| Name       | Type    | Required | Restrictions | Description                |
| ---------- | ------- | -------- | ------------ | -------------------------- |
| lowerBound | integer | true     | none         | lower bound of nonce range |
| upperBound | integer | true     | none         | upper bound of nonce range |

## OrderTimeInForce

```json
{
  "description": "time in force",
  "type": "string",
  "enum": ["GTC", "FOK", "IOC"]
}
```

time in force

### Properties

| Name        | Type   | Required | Restrictions | Description   |
| ----------- | ------ | -------- | ------------ | ------------- |
| _anonymous_ | string | false    | none         | time in force |

#### Enumerated Values

| Property    | Value |
| ----------- | ----- |
| _anonymous_ | GTC   |
| _anonymous_ | FOK   |
| _anonymous_ | IOC   |

## OrderType

```json
{
  "type": "string",
  "description": "Order Types supported for the market.",
  "enum": ["LMT", "MKT", "STOP_LIMIT"]
}
```

Order Types supported for the market.

### Properties

| Name        | Type   | Required | Restrictions | Description                           |
| ----------- | ------ | -------- | ------------ | ------------------------------------- |
| _anonymous_ | string | false    | none         | Order Types supported for the market. |

#### Enumerated Values

| Property    | Value      |
| ----------- | ---------- |
| _anonymous_ | LMT        |
| _anonymous_ | MKT        |
| _anonymous_ | STOP_LIMIT |

## OrderSide

```json
"BUY"
```

### Properties

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | string | false    | none         | none        |

#### Enumerated Values

| Property    | Value |
| ----------- | ----- |
| _anonymous_ | BUY   |
| _anonymous_ | SELL  |

## TimeBucket

```json
"1m"
```

### Properties

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | string | false    | none         | none        |

#### Enumerated Values

| Property    | Value |
| ----------- | ----- |
| _anonymous_ | 1m    |
| _anonymous_ | 5m    |
| _anonymous_ | 30m   |
| _anonymous_ | 1h    |
| _anonymous_ | 6h    |
| _anonymous_ | 12h   |
| _anonymous_ | 1d    |

## OrderStatus

```json
"OPEN"
```

### Properties

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | string | false    | none         | none        |

#### Enumerated Values

| Property    | Value     |
| ----------- | --------- |
| _anonymous_ | OPEN      |
| _anonymous_ | CLOSED    |
| _anonymous_ | CANCELLED |
| _anonymous_ | REJECTED  |

## AMMInstructionStatus

```json
"OPEN"
```

### Properties

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | string | false    | none         | none        |

#### Enumerated Values

| Property    | Value  |
| ----------- | ------ |
| _anonymous_ | OPEN   |
| _anonymous_ | CLOSED |

## LiquidationRisk

```json
{
  "type": "string",
  "enum": ["LOW", "MEDIUM", "HIGH"]
}
```

### Properties

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | string | false    | none         | none        |

#### Enumerated Values

| Property    | Value  |
| ----------- | ------ |
| _anonymous_ | LOW    |
| _anonymous_ | MEDIUM |
| _anonymous_ | HIGH   |

## PositionType

```json
{
  "type": "string",
  "enum": ["LONG", "SHORT"]
}
```

### Properties

| Name        | Type   | Required | Restrictions | Description |
| ----------- | ------ | -------- | ------------ | ----------- |
| _anonymous_ | string | false    | none         | none        |

#### Enumerated Values

| Property    | Value |
| ----------- | ----- |
| _anonymous_ | LONG  |
| _anonymous_ | SHORT |

## DelayBySeconds

```json
"5"
```

Delay the cancel-all-orders request by (seconds) as a timeout mechanism

### Properties

| Name        | Type   | Required | Restrictions | Description                                                             |
| ----------- | ------ | -------- | ------------ | ----------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | Delay the cancel-all-orders request by (seconds) as a timeout mechanism |

#### Enumerated Values

| Property    | Value |
| ----------- | ----- |
| _anonymous_ | 5     |
| _anonymous_ | 10    |
| _anonymous_ | 15    |
| _anonymous_ | 20    |
| _anonymous_ | 25    |
| _anonymous_ | 30    |
| _anonymous_ | 40    |
| _anonymous_ | 50    |
| _anonymous_ | 60    |

## CancelId

```json
"123456789"
```

Unique id for this cancel request which is an unsigned 64 bit integer expressed
as string

### Properties

| Name        | Type   | Required | Restrictions | Description                                                                               |
| ----------- | ------ | -------- | ------------ | ----------------------------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | Unique id for this cancel request which is an unsigned 64 bit integer expressed as string |

## DerivativesPositionResponse

```json
{
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
```

Derivatives Position of one market for the trading account

### Properties

| Name                  | Type                                          | Required | Restrictions | Description                                                                                                                                                                                               |
| --------------------- | --------------------------------------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _anonymous_           | string                                        | false    | none         | Derivatives Position of one market for the trading account                                                                                                                                                |
| tradingAccountId      | [TradingAccountId](#schematradingaccountid)   | false    | none         | unique trading account ID                                                                                                                                                                                 |
| symbol                | [MarketSymbol](#schemamarketsymbol)           | false    | none         | market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market                                                                                                                             |
| side                  | [OrderSide](#schemaorderside)                 | false    | none         | none                                                                                                                                                                                                      |
| quantity              | [AssetValue](#schemaassetvalue)               | false    | none         | Current size of the position [asset value](#overview--price-and-quantity-precision) format                                                                                                                |
| notional              | [UsdcValue](#schemausdcvalue)                 | false    | none         | Notional value of the current position, calculated using the mark price                                                                                                                                   |
| entryNotional         | [UsdcValue](#schemausdcvalue)                 | false    | none         | Notional value of the position, using the average entry price                                                                                                                                             |
| mtmPnl                | [UsdcValue](#schemausdcvalue)                 | false    | none         | Sum of all mark-to-market profits and losses plus profits and losses realised from trading, accumulated since the last settlement                                                                         |
| reportedMtmPnl        | [UsdcValue](#schemausdcvalue)                 | false    | none         | The profit/losses from the net price change since the last time the absolute quantity decreased. It is updated with every mark to market and is not updated during settlement or a position size increase |
| reportedFundingPnl    | [UsdcValue](#schemausdcvalue)                 | false    | none         | Sum of all funding payments received since the position was opened. This is updated every time funding is paid.                                                                                           |
| realizedPnl           | [UsdcValue](#schemausdcvalue)                 | false    | none         | Total profits realized since the trading account first opened this position. This is only updated every time a position’s absolute quantity (aka size) is reduced.                                        |
| settlementAssetSymbol | string                                        | false    | none         | Settlement Asset Symbol                                                                                                                                                                                   |
| createdAtDatetime     | [DateTime](#schemadatetime)                   | false    | none         | Denotes the time the position was created by the exchange, ISO 8601 with millisecond as string                                                                                                            |
| createdAtTimestamp    | [TimeStampAsString](#schematimestampasstring) | false    | none         | Denotes the time the position was created by the exchange, number of milliseconds since EPOCH                                                                                                             |
| updatedAtDatetime     | [DateTime](#schemadatetime)                   | false    | none         | Denotes the time the position was updated by the exchange, ISO 8601 with millisecond as string                                                                                                            |
| updatedAtTimestamp    | [TimeStampAsString](#schematimestampasstring) | false    | none         | Denotes the time the position was updated by the exchange, number of milliseconds since EPOCH                                                                                                             |

## DerivativesSettlementResponse

```json
{
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
```

Derivatives Settlement of one market for the trading account

### Properties

| Name                  | Type                                                      | Required | Restrictions | Description                                                                                         |
| --------------------- | --------------------------------------------------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------- |
| _anonymous_           | string                                                    | false    | none         | Derivatives Settlement of one market for the trading account                                        |
| tradingAccountId      | [TradingAccountId](#schematradingaccountid)               | false    | none         | unique trading account ID                                                                           |
| symbol                | [DatedFutureMarketSymbol](#schemadatedfuturemarketsymbol) | false    | none         | market symbol. Eg `BTC-USDC-PERP` for PERPETUAL and `BTC-USDC-20241201` for DATED FUTURE markets.   |
| side                  | [OrderSide](#schemaorderside)                             | false    | none         | none                                                                                                |
| settlementQuantity    | [AssetValue](#schemaassetvalue)                           | false    | none         | position size at the time of the settlement                                                         |
| deltaTradingQuantity  | [AssetValue](#schemaassetvalue)                           | false    | none         | the change in the position size from the account’s trading activities                               |
| mtmPnl                | [UsdcValue](#schemausdcvalue)                             | false    | none         | mark to market profit (losses) accumulated since the last settlement                                |
| fundingPnl            | [UsdcValue](#schemausdcvalue)                             | false    | none         | funding profits (losses) accumulated since the last settlement. Applicable for perpetuals only.     |
| eventType             | string                                                    | false    | none         | derivatives position update event types                                                             |
| settlementMarkPrice   | [UsdcValue](#schemausdcvalue)                             | false    | none         | market price at which the position was settled for this past cycle                                  |
| settlementIndexPrice  | [UsdcValue](#schemausdcvalue)                             | false    | none         | index price at which the position was settled for this past cycle                                   |
| settlementFundingRate | string                                                    | false    | none         | funding rate at which the position was settled for this past cycle. Applicable for perpetuals only. |
| settlementDatetime    | [DateTime](#schemadatetime)                               | false    | none         | Denotes the time the position was settled by the exchange, ISO 8601 with millisecond as string      |
| settlementTimestamp   | [TimeStampAsString](#schematimestampasstring)             | false    | none         | Denotes the time the position was settled by the exchange, number of milliseconds since EPOCH       |

## SubAccountTransferResponse

```json
{
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
```

Get account transfer history

### Properties

| Name                 | Type                                          | Required | Restrictions | Description                                                                                       |
| -------------------- | --------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------- |
| _anonymous_          | string                                        | false    | none         | Get account transfer history                                                                      |
| requestId            | string                                        | false    | none         | unique identifier of the transfer request                                                         |
| toTradingAccountId   | [TradingAccountId](#schematradingaccountid)   | false    | none         | recipient's trading account                                                                       |
| fromTradingAccountId | string                                        | false    | none         | sender's trading account                                                                          |
| assetSymbol          | [AssetSymbol](#schemaassetsymbol)             | false    | none         | asset currency of the transfer                                                                    |
| quantity             | [AssetValue](#schemaassetvalue)               | false    | none         | transfer quantity                                                                                 |
| status               | string                                        | false    | none         | transfer status [CLOSED/OPEN/REJECTED]                                                            |
| statusReasonCode     | string                                        | false    | none         | status reason code                                                                                |
| statusReason         | string                                        | false    | none         | readable status reason                                                                            |
| createdAtTimestamp   | [TimeStampAsString](#schematimestampasstring) | false    | none         | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string |
| createdAtDatetime    | [DateTime](#schemadatetime)                   | false    | none         | ISO 8601 with millisecond as string                                                               |

## SimulationPosition

```json
{
  "type": "string",
  "required": ["symbol", "quantity"],
  "properties": {
    "symbol": {
      "description": "asset or market symbol. Eg `USDC` for asset and `BTCUSDC` for market",
      "type": "string",
      "example": "BTC-USDC-PERP"
    },
    "quantity": {
      "description": "size of the position",
      "type": "string",
      "example": "1.0"
    }
  }
}
```

### Properties

| Name        | Type   | Required | Restrictions | Description                                                          |
| ----------- | ------ | -------- | ------------ | -------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | none                                                                 |
| symbol      | string | true     | none         | asset or market symbol. Eg `USDC` for asset and `BTCUSDC` for market |
| quantity    | string | true     | none         | size of the position                                                 |

## SimulationOrder

```json
{
  "type": "string",
  "required": ["symbol", "quantity"],
  "properties": {
    "symbol": {
      "allOf": [
        {
          "type": "string",
          "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
          "example": "BTCUSDC"
        }
      ]
    },
    "quantity": {
      "description": "quantity placed for order",
      "type": "string",
      "example": "1.0"
    },
    "limitPrice": {
      "description": "limit price for order",
      "type": "string",
      "example": "10000.0"
    }
  }
}
```

### Properties

| Name        | Type                                | Required | Restrictions | Description                                                                   |
| ----------- | ----------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------- |
| _anonymous_ | string                              | false    | none         | none                                                                          |
| symbol      | [MarketSymbol](#schemamarketsymbol) | true     | none         | market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market |
| quantity    | string                              | true     | none         | quantity placed for order                                                     |
| limitPrice  | string                              | false    | none         | limit price for order                                                         |

## ReferencePrice

```json
{
  "type": "string",
  "properties": {
    "symbol": {
      "description": "asset or market symbol. Eg `USDC` for asset and `BTCUSDC` for market",
      "type": "string",
      "example": "BTC"
    },
    "price": {
      "description": "reference price for asset or market",
      "type": "string",
      "example": "12000.0"
    }
  }
}
```

### Properties

| Name        | Type   | Required | Restrictions | Description                                                          |
| ----------- | ------ | -------- | ------------ | -------------------------------------------------------------------- |
| _anonymous_ | string | false    | none         | none                                                                 |
| symbol      | string | false    | none         | asset or market symbol. Eg `USDC` for asset and `BTCUSDC` for market |
| price       | string | false    | none         | reference price for asset or market                                  |

## TradeFeeRate

```json
{
  "type": "object",
  "required": ["feeGroupId", "makerFee", "takerFee"],
  "properties": {
    "feeGroupId": {
      "type": "integer",
      "description": "Identifier for this particular fee tier",
      "example": 1
    },
    "makerFee": {
      "type": "string",
      "description": "Maker Fee in basis points (bps)",
      "example": "10"
    },
    "takerFee": {
      "type": "string",
      "description": "Taker Fee in basis points (bps)",
      "example": "10"
    }
  }
}
```

### Properties

| Name       | Type    | Required | Restrictions | Description                             |
| ---------- | ------- | -------- | ------------ | --------------------------------------- |
| feeGroupId | integer | true     | none         | Identifier for this particular fee tier |
| makerFee   | string  | true     | none         | Maker Fee in basis points (bps)         |
| takerFee   | string  | true     | none         | Taker Fee in basis points (bps)         |

## PortfolioSimulationRequest

```json
{
  "type": "object",
  "required": ["tradingAccountId"],
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
    "positions": {
      "type": "array",
      "description": "portfolio position to be used in simulation",
      "items": {
        "allOf": [
          {
            "type": "string",
            "required": ["symbol", "quantity"],
            "properties": {
              "symbol": {
                "description": "asset or market symbol. Eg `USDC` for asset and `BTCUSDC` for market",
                "type": "string",
                "example": "BTC-USDC-PERP"
              },
              "quantity": {
                "description": "size of the position",
                "type": "string",
                "example": "1.0"
              }
            }
          }
        ]
      }
    },
    "orders": {
      "type": "array",
      "description": "pending orders to be used in simulation",
      "items": {
        "allOf": [
          {
            "type": "string",
            "required": ["symbol", "quantity"],
            "properties": {
              "symbol": {
                "allOf": [
                  {
                    "type": "string",
                    "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
                    "example": "BTCUSDC"
                  }
                ]
              },
              "quantity": {
                "description": "quantity placed for order",
                "type": "string",
                "example": "1.0"
              },
              "limitPrice": {
                "description": "limit price for order",
                "type": "string",
                "example": "10000.0"
              }
            }
          }
        ]
      }
    },
    "referencePrices": {
      "type": "array",
      "description": "reference price to be used in simulation",
      "items": {
        "allOf": [
          {
            "type": "string",
            "properties": {
              "symbol": {
                "description": "asset or market symbol. Eg `USDC` for asset and `BTCUSDC` for market",
                "type": "string",
                "example": "BTC"
              },
              "price": {
                "description": "reference price for asset or market",
                "type": "string",
                "example": "12000.0"
              }
            }
          }
        ]
      }
    }
  }
}
```

### Properties

| Name             | Type                                        | Required | Restrictions | Description                                 |
| ---------------- | ------------------------------------------- | -------- | ------------ | ------------------------------------------- |
| tradingAccountId | [TradingAccountId](#schematradingaccountid) | true     | none         | unique trading account ID                   |
| positions        | [allOf]                                     | false    | none         | portfolio position to be used in simulation |
| orders           | [allOf]                                     | false    | none         | pending orders to be used in simulation     |
| referencePrices  | [allOf]                                     | false    | none         | reference price to be used in simulation    |

## PortfolioSimulationResponse

```json
{
  "description": "Simulation result",
  "type": "string",
  "properties": {
    "collateralUSD": {
      "description": "total collateral across all assets in this trading account displayed in the reference asset in USD",
      "type": "string",
      "example": "13000.0000"
    },
    "borrowedUSD": {
      "description": "total borrowed across all assets in this trading account displayed in the reference asset in USD",
      "type": "string",
      "example": "12000.0000"
    },
    "initialMarginUSD": {
      "description": "The minimum margin one must maintain in order to be able to purposefully increase risk",
      "type": "string",
      "example": "14000.0000"
    },
    "warningMarginUSD": {
      "description": "The minimum margin when the customer will receive warning via email/notifications over UI",
      "type": "string",
      "example": "15000.0000"
    },
    "liquidationMarginUSD": {
      "description": "The minimum value of margin one must maintain in order to avoid liquidation",
      "type": "string",
      "example": "16000.0000"
    },
    "fullLiquidationMarginUSD": {
      "description": "The value of margin when full liquidation occurs",
      "type": "string",
      "example": "17000.0000"
    },
    "defaultedMarginUSD": {
      "description": "The value of margin when this trading account will be moved into a Defaulted state",
      "type": "string",
      "example": "18000.0000"
    },
    "liquidityAddonUSD": {
      "description": "expected market impact of unwinding the portfolio in the case of a liquidation event",
      "type": "string",
      "example": "19000.0000"
    },
    "marketRiskUSD": {
      "description": "the worst possible loss on the portfolio based on scenario analysis",
      "type": "string",
      "example": "20000.0000"
    }
  }
}
```

Simulation result

### Properties

| Name                     | Type   | Required | Restrictions | Description                                                                                        |
| ------------------------ | ------ | -------- | ------------ | -------------------------------------------------------------------------------------------------- |
| _anonymous_              | string | false    | none         | Simulation result                                                                                  |
| collateralUSD            | string | false    | none         | total collateral across all assets in this trading account displayed in the reference asset in USD |
| borrowedUSD              | string | false    | none         | total borrowed across all assets in this trading account displayed in the reference asset in USD   |
| initialMarginUSD         | string | false    | none         | The minimum margin one must maintain in order to be able to purposefully increase risk             |
| warningMarginUSD         | string | false    | none         | The minimum margin when the customer will receive warning via email/notifications over UI          |
| liquidationMarginUSD     | string | false    | none         | The minimum value of margin one must maintain in order to avoid liquidation                        |
| fullLiquidationMarginUSD | string | false    | none         | The value of margin when full liquidation occurs                                                   |
| defaultedMarginUSD       | string | false    | none         | The value of margin when this trading account will be moved into a Defaulted state                 |
| liquidityAddonUSD        | string | false    | none         | expected market impact of unwinding the portfolio in the case of a liquidation event               |
| marketRiskUSD            | string | false    | none         | the worst possible loss on the portfolio based on scenario analysis                                |

## FundingRateHistoryResponse

```json
{
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
```

Hourly Funding Rate History of one market

### Properties

| Name              | Type   | Required | Restrictions | Description                                            |
| ----------------- | ------ | -------- | ------------ | ------------------------------------------------------ |
| fundingRate       | string | false    | none         | funding rate for this hour                             |
| updatedAtDatetime | string | false    | none         | date time of the last funding rate update for the hour |
