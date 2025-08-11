# Bullish Trading API - Public REST API - Market Data

# market-data

Non-authenticated APIs for accessing general market data information

## market-data-get-markets

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("https://api.exchange.bullish.com/trading-api/v1/markets", {
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/markets', headers = headers)

print(r.json())

```

`GET /v1/markets`

_Get Markets_

Get Markets. Clients can ignore [test markets](#overview--test-markets). Note ->
"Leverage = Collateral ÷ (Collateral - Debt)"

### Parameters

| Name       | In    | Type                                            | Required | Description                            |
| ---------- | ----- | ----------------------------------------------- | -------- | -------------------------------------- |
| marketType | query | [MarketTypeAsString](#schemamarkettypeasstring) | false    | Market Types to filter markets against |

#### Enumerated Values

| Parameter  | Value        |
| ---------- | ------------ |
| marketType | SPOT         |
| marketType | PERPETUAL    |
| marketType | DATED_FUTURE |

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
}
```

### Responses

| Status | Meaning                                                                    | Description           | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | Inline |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)             | Not Found             | None   |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None   |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None   |

### Response Schema

Status Code **200**

| Name                            | Type                                            | Required | Restrictions | Description                                                                                                                                                                                              |
| ------------------------------- | ----------------------------------------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _anonymous_                     | [[Market](#schemamarket)]                       | false    | none         | none                                                                                                                                                                                                     |
| » marketId                      | [MarketID](#schemamarketid)                     | true     | none         | unique market ID                                                                                                                                                                                         |
| » symbol                        | [MarketSymbol](#schemamarketsymbol)             | true     | none         | market symbol                                                                                                                                                                                            |
| » baseSymbol                    | [AssetSymbol](#schemaassetsymbol)               | true     | none         | base asset symbol (only applies to spot market)                                                                                                                                                          |
| » underlyingBaseSymbol          | [AssetSymbol](#schemaassetsymbol)               | false    | none         | underlying base asset symbol (only applies to derivative market)                                                                                                                                         |
| » quoteSymbol                   | [AssetSymbol](#schemaassetsymbol)               | true     | none         | quote asset symbol (only applies to spot market)                                                                                                                                                         |
| » underlyingQuoteSymbol         | [AssetSymbol](#schemaassetsymbol)               | false    | none         | underlying quote asset symbol (only applies to derivative market)                                                                                                                                        |
| » quoteAssetId                  | [AssetID](#schemaassetid)                       | true     | none         | quote asset id                                                                                                                                                                                           |
| » baseAssetId                   | [AssetID](#schemaassetid)                       | true     | none         | base asset id                                                                                                                                                                                            |
| » quotePrecision                | integer                                         | true     | none         | quote precision                                                                                                                                                                                          |
| » basePrecision                 | integer                                         | true     | none         | base precision                                                                                                                                                                                           |
| » pricePrecision                | integer                                         | true     | none         | number of decimal digits 'after the dot' for price                                                                                                                                                       |
| » quantityPrecision             | integer                                         | true     | none         | number of decimal digits 'after the dot' for quantity                                                                                                                                                    |
| » costPrecision                 | integer                                         | true     | none         | number of decimal digits 'after the dot' for cost, `price * quantity`                                                                                                                                    |
| » priceBuffer                   | string                                          | true     | none         | buffer range of limit price from the last traded price.                                                                                                                                                  |
| » minQuantityLimit              | [AssetValue](#schemaassetvalue)                 | true     | none         | order quantity should be > min, see [asset value](#overview--price-and-quantity-precision) format                                                                                                        |
| » maxQuantityLimit              | [AssetValue](#schemaassetvalue)                 | true     | none         | order quantity should be < max, see [asset value](#overview--price-and-quantity-precision) format                                                                                                        |
| » maxPriceLimit                 | [AssetValue](#schemaassetvalue)                 | true     | none         | order price should be < max, see [asset value](#overview--price-and-quantity-precision) format                                                                                                           |
| » minPriceLimit                 | [AssetValue](#schemaassetvalue)                 | true     | none         | order price should be > min, see [asset value](#overview--price-and-quantity-precision) format                                                                                                           |
| » maxCostLimit                  | [AssetValue](#schemaassetvalue)                 | true     | none         | order cost, `price * quantity` should be < max, see [asset value](#overview--price-and-quantity-precision) format                                                                                        |
| » minCostLimit                  | [AssetValue](#schemaassetvalue)                 | true     | none         | order cost, `price * quantity` should be > min, see [asset value](#overview--price-and-quantity-precision) format                                                                                        |
| » timeZone                      | string                                          | true     | none         | time zone                                                                                                                                                                                                |
| » tickSize                      | [AssetValue](#schemaassetvalue)                 | true     | none         | tick size, see [asset value](#overview--price-and-quantity-precision) format                                                                                                                             |
| » liquidityTickSize             | string                                          | true     | none         | liquidity tick size.                                                                                                                                                                                     |
| » liquidityPrecision            | integer                                         | true     | none         | liquidity precision.                                                                                                                                                                                     |
| » makerFee                      | integer                                         | false    | none         | Deprecated and no longer accurate. See `feeGroupId`                                                                                                                                                      |
| » takerFee                      | integer                                         | false    | none         | Deprecated and no longer accurate. See `feeGroupId`                                                                                                                                                      |
| » roundingCorrectionFactor      | string                                          | true     | none         | rounding correction factor for market                                                                                                                                                                    |
| » makerMinLiquidityAddition     | string                                          | true     | none         | minimum amount required to invest liquidity to market.                                                                                                                                                   |
| » orderTypes                    | [allOf]                                         | false    | none         | none                                                                                                                                                                                                     |
| » spotTradingEnabled            | boolean                                         | true     | none         | spot trading enabled (only applies for Spot markets)                                                                                                                                                     |
| » marginTradingEnabled          | boolean                                         | true     | none         | margin trading enabled (only applies for Spot markets)                                                                                                                                                   |
| » marketEnabled                 | boolean                                         | true     | none         | market enabled                                                                                                                                                                                           |
| » createOrderEnabled            | boolean                                         | true     | none         | able to create order                                                                                                                                                                                     |
| » amendOrderEnabled             | boolean                                         | false    | none         | able to amend order                                                                                                                                                                                      |
| » cancelOrderEnabled            | boolean                                         | true     | none         | able to cancel order                                                                                                                                                                                     |
| » liquidityInvestEnabled        | boolean                                         | true     | none         | able to invest liquidity to market.                                                                                                                                                                      |
| » liquidityWithdrawEnabled      | boolean                                         | true     | none         | able to withdraw liquidity from market.                                                                                                                                                                  |
| » feeGroupId                    | integer                                         | true     | none         | Identifier to the trade fee assigned to this market. Used with `tradeFeeRate` at [Get Trading Account](#get-/v1/accounts/trading-accounts/-tradingAccountId-)                                            |
| » feeTiers                      | [allOf]                                         | true     | none         | all available fee tiers.                                                                                                                                                                                 |
| »» feeTierId                    | [FeeTierId](#schemafeetierid)                   | true     | none         | unique fee tier ID, see [Get Market By Symbol](#get-/v1/markets/-symbol-)                                                                                                                                |
| »» staticSpreadFee              | string                                          | true     | none         | static spread fee                                                                                                                                                                                        |
| »» isDislocationEnabled         | boolean                                         | true     | none         | dislocation enabled/disabled                                                                                                                                                                             |
| » marketType                    | [MarketTypeAsString](#schemamarkettypeasstring) | true     | none         | market type, e.g. "SPOT" for market like "BTCUSD", "PERPETUAL" for market like "BTC-USDC-PERP", "DATED_FUTURE" for market like "BTC-USDC-20250901", "OPTION" for market like "BTC-USDC-20250901-90000-C" |
| » contractMultiplier            | integer                                         | false    | none         | contract multiplier. (only applies to perpetual market)                                                                                                                                                  |
| » settlementAssetSymbol         | string                                          | false    | none         | settlement asset symbol. (only applies to perpetual market)                                                                                                                                              |
| » openInterestUSD               | string                                          | true     | none         | cumulative notional value of all open interest for a specific derivative contract on the exchange.                                                                                                       |
| » concentrationRiskThresholdUSD | string                                          | true     | none         | open interest notional of an account for a specific derivative contract.                                                                                                                                 |
| » concentrationRiskPercentage   | string                                          | true     | none         | percentage of the total open interest for a specific derivative contract.                                                                                                                                |
| » expiryDatetime                | string                                          | true     | none         | denotes the time when the market expires in ISO 8601 with millisecond format as string                                                                                                                   |

#### Enumerated Values

| Property   | Value        |
| ---------- | ------------ |
| marketType | SPOT         |
| marketType | PERPETUAL    |
| marketType | DATED_FUTURE |

> **Note:** This operation does not require authentication

## market-data-get-market

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("https://api.exchange.bullish.com/trading-api/v1/markets/{symbol}", {
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/markets/{symbol}', headers = headers)

print(r.json())

```

`GET /v1/markets/{symbol}`

_Get Market by Symbol_

Get Market by Symbol. Note -> "Leverage = Collateral ÷ (Collateral - Debt)"

### Parameters

| Name   | In   | Type                                | Required | Description |
| ------ | ---- | ----------------------------------- | -------- | ----------- |
| symbol | path | [MarketSymbol](#schemamarketsymbol) | true     | none        |

> Example responses

> 200 Response

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

### Responses

| Status | Meaning                                                                    | Description           | Schema                  |
| ------ | -------------------------------------------------------------------------- | --------------------- | ----------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | [Market](#schemamarket) |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)             | Not Found             | None                    |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None                    |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None                    |

> **Note:** This operation does not require authentication

## market-data-get-market-orderbook

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v1/markets/{symbol}/orderbook/hybrid",
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/markets/{symbol}/orderbook/hybrid', headers = headers)

print(r.json())

```

`GET /v1/markets/{symbol}/orderbook/hybrid`

_Get Market Order Book_

Get Order Book by Market Symbol

**Ratelimited:** `False`

### Parameters

| Name   | In   | Type                                | Required | Description   |
| ------ | ---- | ----------------------------------- | -------- | ------------- |
| symbol | path | [MarketSymbol](#schemamarketsymbol) | true     | symbol to get |

> Example responses

> 200 Response

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

### Responses

| Status | Meaning                                                                    | Description           | Schema                        |
| ------ | -------------------------------------------------------------------------- | --------------------- | ----------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | [OrderBook](#schemaorderbook) |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)             | Resource Not Found    | None                          |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None                          |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None                          |

> **Note:** This operation does not require authentication

## market-data-get-anonymous-trades-by-market-symbol

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v1/markets/{symbol}/trades",
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/markets/{symbol}/trades', headers = headers)

print(r.json())

```

`GET /v1/markets/{symbol}/trades`

_Get Latest Market Trades_

Get Market Trades by Market Symbol.

- return 100 most recent trades
- lookup from local cache

**Ratelimited:** `False`

### Parameters

| Name   | In   | Type                                | Required | Description   |
| ------ | ---- | ----------------------------------- | -------- | ------------- |
| symbol | path | [MarketSymbol](#schemamarketsymbol) | true     | symbol to get |

> Example responses

> 200 Response

```json
{
  "type": "array",
  "minItems": 0,
  "maxItems": 100,
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

| Name                 | Type                                                  | Required | Restrictions | Description                                                                                  |
| -------------------- | ----------------------------------------------------- | -------- | ------------ | -------------------------------------------------------------------------------------------- |
| _anonymous_          | [[ObfuscatedTrade](#schemaobfuscatedtrade)]           | false    | none         | none                                                                                         |
| » tradeId            | [TradeID](#schematradeid)                             | true     | none         | unique trade ID                                                                              |
| » symbol             | [MarketSymbol](#schemamarketsymbol)                   | true     | none         | market symbol                                                                                |
| » price              | [AssetValue](#schemaassetvalue)                       | true     | none         | price                                                                                        |
| » quantity           | [AssetValue](#schemaassetvalue)                       | true     | none         | quantity                                                                                     |
| » side               | [OrderSideAsString](#schemaordersideasstring)         | true     | none         | order side                                                                                   |
| » isTaker            | [Boolean](#schemaboolean)(true or false)              | true     | none         | denotes whether this is a taker's trade                                                      |
| » createdAtDatetime  | [DateTime](#schemadatetime)(date-time)                | true     | none         | denotes the time the trade was executed by the exchange, ISO 8601 with millisecond as string |
| » createdAtTimestamp | [TimeStampAsString](#schematimestampasstring)(string) | true     | none         | denotes the time the trade was executed by the exchange                                      |

> **Note:** This operation does not require authentication

## market-data-current-tick-by-market-symbol

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("https://api.exchange.bullish.com/trading-api/v1/markets/{symbol}/tick", {
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/markets/{symbol}/tick', headers = headers)

print(r.json())

```

`GET /v1/markets/{symbol}/tick`

_Get Market Tick_

Get Current Tick by Market Symbol.

- return top 100

**Ratelimited:** `False`

### Parameters

| Name   | In   | Type                                | Required | Description                                          |
| ------ | ---- | ----------------------------------- | -------- | ---------------------------------------------------- |
| symbol | path | [MarketSymbol](#schemamarketsymbol) | true     | symbol to get. Only perpetual markets are supported. |

> Example responses

> 200 Response

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

### Responses

| Status | Meaning                                                                    | Description           | Schema              |
| ------ | -------------------------------------------------------------------------- | --------------------- | ------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | [Tick](#schematick) |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)             | Resource Not Found    | None                |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None                |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None                |

> **Note:** This operation does not require authentication

## market-data-current-candle-by-market-symbol

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch(
  "https://api.exchange.bullish.com/trading-api/v1/markets/{symbol}/candle?createdAtDatetime%5Bgte%5D=2025-05-20T01%3A01%3A01.000Z&createdAtDatetime%5Blte%5D=2025-05-20T01%3A01%3A01.000Z&timeBucket=1m",
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/markets/{symbol}/candle', params={
  'createdAtDatetime[gte]': '2025-05-20T01:01:01.000Z',  'createdAtDatetime[lte]': '2025-05-20T01:01:01.000Z',  'timeBucket': '1m'
}, headers = headers)

print(r.json())

```

`GET /v1/markets/{symbol}/candle`

_Get Market Candle_

Get Current OHLCV Candle by Market Symbol

- [supports pagination](#overview--pagination-support)
- filtering on `createdAtDatetime`, `createdAtTimestamp` requires additional
  keywords, [see filtering support](#overview--filtering-support)

**Ratelimited:** `False`

### Parameters

| Name                   | In    | Type                                | Required | Description                                                    |
| ---------------------- | ----- | ----------------------------------- | -------- | -------------------------------------------------------------- |
| symbol                 | path  | [MarketSymbol](#schemamarketsymbol) | true     | none                                                           |
| createdAtDatetime[gte] | query | [DateTime](#schemadatetime)         | true     | start timestamp of window, ISO 8601 with millisecond as string |
| createdAtDatetime[lte] | query | [DateTime](#schemadatetime)         | true     | end timestamp of window, ISO 8601 with millisecond as string   |
| timeBucket             | query | [TimeBucket](#schematimebucket)     | true     | time bucket size                                               |

#### Enumerated Values

| Parameter  | Value |
| ---------- | ----- |
| timeBucket | 1m    |
| timeBucket | 5m    |
| timeBucket | 30m   |
| timeBucket | 1h    |
| timeBucket | 6h    |
| timeBucket | 12h   |
| timeBucket | 1d    |

> Example responses

> 200 Response

```json
{
  "type": "array",
  "minItems": 1,
  "maxItems": 25,
  "items": {
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

| Name                   | Type                                                  | Required | Restrictions | Description                                                                                       |
| ---------------------- | ----------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------- |
| _anonymous_            | [[OHLCVCandle](#schemaohlcvcandle)]                   | false    | none         | none                                                                                              |
| » open                 | [AssetValue](#schemaassetvalue)                       | false    | none         | see [asset value](#overview--price-and-quantity-precision) format                                 |
| » high                 | [AssetValue](#schemaassetvalue)                       | false    | none         | see [asset value](#overview--price-and-quantity-precision) format                                 |
| » low                  | [AssetValue](#schemaassetvalue)                       | false    | none         | see [asset value](#overview--price-and-quantity-precision) format                                 |
| » close                | [AssetValue](#schemaassetvalue)                       | false    | none         | see [asset value](#overview--price-and-quantity-precision) format                                 |
| » volume               | [AssetValue](#schemaassetvalue)                       | false    | none         | see [asset value](#overview--price-and-quantity-precision) format                                 |
| » createdAtTimestamp   | [TimeStampAsString](#schematimestampasstring)(string) | false    | none         | unsigned 64 bit integer value which is the number of milliseconds since EPOCH expressed as string |
| » createdAtDatetime    | [DateTime](#schemadatetime)(date-time)                | false    | none         | date and time of the candle, ISO 8601 with millisecond as string                                  |
| » publishedAtTimestamp | [TimeStampAsString](#schematimestampasstring)(string) | false    | none         | date and time of the candle getting published, ISO 8601 with millisecond as string                |

> **Note:** This operation does not require authentication
