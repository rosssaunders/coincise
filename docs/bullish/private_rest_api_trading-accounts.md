# Bullish Trading API - Private REST API - Trading Accounts

# trading-accounts

## user-get-trading-accounts

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v1/accounts/trading-accounts",
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/accounts/trading-accounts', headers = headers)

print(r.json())

```

`GET /v1/accounts/trading-accounts`

_Get all trading Accounts details_

Gets details for all trading accounts accessible by the API key used in the
request. It requires [bearer token](#overview--add-authenticated-request-header)
in authorization header. The trading account's id will be used in all other REST
API

**Ratelimited:** `True`

### Parameters

| Name          | In     | Type   | Required | Description                                                                                  |
| ------------- | ------ | ------ | -------- | -------------------------------------------------------------------------------------------- |
| Authorization | header | string | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token) |

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

| Name                                      | Type                                                      | Required | Restrictions | Description                                                                                                                                             |
| ----------------------------------------- | --------------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _anonymous_                               | [[TradingAccountResponse](#schematradingaccountresponse)] | false    | none         | none                                                                                                                                                    |
| » isBorrowing                             | string                                                    | true     | none         | whether the trading account is borrowing                                                                                                                |
| » isLending                               | string                                                    | true     | none         | whether the trading account is lending                                                                                                                  |
| » makerFee                                | string                                                    | false    | none         | Deprecated and no longer accurate. See `tradeFeeRate` instead                                                                                           |
| » takerFee                                | string                                                    | false    | none         | Deprecated and no longer accurate. See `tradeFeeRate` instead                                                                                           |
| » maxInitialLeverage                      | string                                                    | true     | none         | max initial leverage                                                                                                                                    |
| » tradingAccountId                        | [TradingAccountId](#schematradingaccountid)               | true     | none         | id of the trading account                                                                                                                               |
| » tradingAccountName                      | string                                                    | true     | none         | name of the trading account                                                                                                                             |
| » tradingAccountDescription               | string                                                    | true     | none         | description of the trading account                                                                                                                      |
| » isPrimaryAccount                        | string                                                    | true     | none         | whether this is the primary account                                                                                                                     |
| » rateLimitToken                          | string                                                    | true     | none         | unique rate limit token of the trading account                                                                                                          |
| » isDefaulted                             | string                                                    | true     | none         | whether the trading account is defaulted                                                                                                                |
| » tradeFeeRate                            | [allOf]                                                   | true     | none         | Trade fees per `feeGroupId` for this trading account                                                                                                    |
| »» feeGroupId                             | integer                                                   | true     | none         | Identifier for this particular fee tier                                                                                                                 |
| »» makerFee                               | string                                                    | true     | none         | Maker Fee in basis points (bps)                                                                                                                         |
| »» takerFee                               | string                                                    | true     | none         | Taker Fee in basis points (bps)                                                                                                                         |
| » riskLimitUSD                            | string                                                    | true     | none         | The maximum allowed borrowing for this trading account (in USD currency)                                                                                |
| » totalLiabilitiesUSD                     | string                                                    | true     | none         | The The total liabilities for this trading account (in USD currency)                                                                                    |
| » totalBorrowedUSD                        | string                                                    | true     | none         | total borrowed across all assets in this trading account displayed in the reference asset in USD                                                        |
| » totalCollateralUSD                      | string                                                    | true     | none         | total collateral across all assets in this trading account displayed in the reference asset in USD                                                      |
| » initialMarginUSD                        | string                                                    | true     | none         | The minimum margin one must maintain in order to be able to purposefully increase risk                                                                  |
| » warningMarginUSD                        | string                                                    | true     | none         | The minimum margin when the customer will receive warning via email/notifications over UI                                                               |
| » liquidationMarginUSD                    | string                                                    | true     | none         | The minimum value of margin one must maintain in order to avoid liquidation                                                                             |
| » fullLiquidationMarginUSD                | string                                                    | true     | none         | The value of margin when full liquidation occurs                                                                                                        |
| » defaultedMarginUSD                      | string                                                    | true     | none         | The value of margin when this trading account will be moved into a Defaulted state                                                                      |
| » endCustomerId                           | string                                                    | true     | none         | The end customer id used for self trade prevention (default is institution id, max 32 characters)                                                       |
| » isConcentrationRiskEnabled              | string                                                    | true     | none         | whether concentration risk checks are enforced for an account when sending new orders. By default, concentration risk checks will apply to all accounts |
| » liquidityAddonUSD                       | string                                                    | true     | none         | expected market impact of unwinding the portfolio in the case of a liquidation event                                                                    |
| » marketRiskUSD                           | string                                                    | true     | none         | the worst possible loss on the portfolio based on scenario analysis                                                                                     |
| » marginProfile                           | object                                                    | true     | none         | Contains the market risk multipliers applied to a trading account to derive the five individual Margin Requirement values                               |
| »» initialMarketRiskMultiplierPct         | string                                                    | false    | none         | market risk multiplier used to calculate initial margin requirement of the account                                                                      |
| »» warningMarketRiskMultiplierPct         | string                                                    | false    | none         | market risk multiplier used to calculate warning margin requirement of the account                                                                      |
| »» liquidationMarketRiskMultiplierPct     | string                                                    | false    | none         | market risk multiplier used to calculate liquidation margin requirement of the account                                                                  |
| »» fullLiquidationMarketRiskMultiplierPct | string                                                    | false    | none         | market risk multiplier used to calculate full liquidation margin requirement of the account                                                             |
| »» defaultedMarketRiskMultiplierPct       | string                                                    | false    | none         | market risk multiplier used to calculate defaulted margin requirement of the account                                                                    |

> **Note:** To perform this operation, you must be authenticated by means of one
> of the following methods: jwtTokenAuth

## user-get-trading-account-by-id

> Code samples

```javascript
const headers = {
  Accept: "application/json",
  Authorization: {
    type: "string"
  }
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v1/accounts/trading-accounts/{tradingAccountId}",
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/accounts/trading-accounts/{tradingAccountId}', headers = headers)

print(r.json())

```

`GET /v1/accounts/trading-accounts/{tradingAccountId}`

_Get trading account details by trading account id_

Gets details for specific trading account by `tradingAccountId` and API key used
in the request. It requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header.

**Ratelimited:** `True`

### Parameters

| Name             | In     | Type                                        | Required | Description                                                                                  |
| ---------------- | ------ | ------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| Authorization    | header | string                                      | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token) |
| tradingAccountId | path   | [TradingAccountId](#schematradingaccountid) | true     | Id of the trading account                                                                    |

> Example responses

> 200 Response

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

### Responses

| Status | Meaning                                                                    | Description           | Schema                                                  |
| ------ | -------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | [TradingAccountResponse](#schematradingaccountresponse) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)           | Bad Request Parameter | None                                                    |
| 401    | [Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)            | Not Authenticated     | None                                                    |
| 403    | [Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)             | Access Forbidden      | None                                                    |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)             | Resource Not Found    | None                                                    |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None                                                    |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None                                                    |

> **Note:** To perform this operation, you must be authenticated by means of one
> of the following methods: jwtTokenAuth

## command

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

fetch('https://api.exchange.bullish.com/trading-api/v1/command?commandType=V1TransferAsset',
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

r = requests.post('https://api.exchange.bullish.com/trading-api/v1/command', params={
  'commandType': 'V1TransferAsset'
}, headers = headers)

print(r.json())

```

`POST /v1/command`

_Transfer Asset_

Send command to transfer asset between two trading accounts.

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

### Parameters

| Name          | In     | Type                                                                  | Required | Description                                                                                                                |
| ------------- | ------ | --------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| Authorization | header | string                                                                | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token)                               |
| BX-SIGNATURE  | header | string                                                                | true     | signature obtained using the [signing format](#overview--how-to-ensure-the-order-of-create-order-or-cancel-order-requests) |
| BX-TIMESTAMP  | header | string                                                                | true     | timestamp is the number of milliseconds since EPOCH                                                                        |
| BX-NONCE      | header | string                                                                | true     | nonce is a client side incremented unsigned 64 bit integer                                                                 |
| commandType   | query  | string                                                                | true     | The command type, must be 'V1TransferAsset'                                                                                |
| body          | body   | [TradingAccountTransferRequest](#schematradingaccounttransferrequest) | true     | Command for action                                                                                                         |

#### Enumerated Values

| Parameter   | Value           |
| ----------- | --------------- |
| commandType | V1TransferAsset |

> Example responses

> 200 Response

```json
{
  "message": "Command acknowledged - TransferAsset",
  "requestId": "633909659774222336"
}
```

### Responses

| Status | Meaning                                                          | Description                                                                                                                          | Schema                                                                  |
| ------ | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Status OK. This means the request was successfully acknowledged. It does not necessarily mean the command was successfully executed. | [TradingAccountTransferResponse](#schematradingaccounttransferresponse) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Bad Request                                                                                                                          |

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
