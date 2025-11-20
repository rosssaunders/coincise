# GET /v1/markets

**Summary**: Get Markets

## Description

Get Markets. Clients can ignore [test markets](#overview--test-markets). Note ->
"Leverage = Collateral ÷ (Collateral - Debt)"

**Operation ID**: market-data-get-markets

**Tags**: market-data

**Endpoint**: `GET /v1/markets`

**Authentication Required**: No

## Responses

### 200 - OK

**Content-Type**: application/json

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
        "type": "string",
        "example": "10000",
        "properties": {}
      },
      "symbol": {
        "type": "string",
        "description": "market symbol. Eg `BTC-USDC-20241004-70000-C` for OPTION markets.",
        "example": "BTC-USDC-20241004-70000-C",
        "properties": {}
      },
      "baseSymbol": {
        "type": "string",
        "description": "asset symbol as denoted in the world",
        "example": "BTC",
        "properties": {}
      },
      "underlyingBaseSymbol": {
        "type": "string",
        "description": "asset symbol as denoted in the world",
        "example": "BTC",
        "properties": {}
      },
      "quoteSymbol": {
        "type": "string",
        "description": "asset symbol as denoted in the world",
        "example": "BTC",
        "properties": {}
      },
      "underlyingQuoteSymbol": {
        "type": "string",
        "description": "asset symbol as denoted in the world",
        "example": "BTC",
        "properties": {}
      },
      "quoteAssetId": {
        "type": "string",
        "description": "unique asset ID",
        "example": "1",
        "properties": {}
      },
      "baseAssetId": {
        "type": "string",
        "description": "unique asset ID",
        "example": "1",
        "properties": {}
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
        "description": "buffer range of limit price from the last traded price. Not applicable for `Option` markets",
        "type": "string",
        "example": 0.3
      },
      "minQuantityLimit": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "maxQuantityLimit": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "maxPriceLimit": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "minPriceLimit": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "maxCostLimit": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "minCostLimit": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "timeZone": {
        "description": "time zone",
        "type": "string",
        "example": "Etc/UTC"
      },
      "tickSize": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "liquidityTickSize": {
        "description": "liquidity tick size. Not applicable for `Option` markets",
        "type": "string",
        "example": "100.0000"
      },
      "liquidityPrecision": {
        "description": "liquidity precision. Not applicable for `Option` markets",
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
        "description": "minimum amount required to invest liquidity to market. Not applicable for `Option` markets",
        "type": "string",
        "example": "5000"
      },
      "orderTypes": {
        "type": "array",
        "items": {
          "type": "string",
          "description": "order type can have the following string values `\"LMT\"`, `\"MKT\"`, `\"STOP_LIMIT\"`, `\"POST_ONLY\"`. `\"MKT\"` and `\"STOP_LIMIT\"` are not applicable for Options",
          "example": "LMT",
          "properties": {}
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
        "description": "able to invest liquidity to market. Not applicable for `Option` markets",
        "type": "boolean",
        "example": true
      },
      "liquidityWithdrawEnabled": {
        "description": "able to withdraw liquidity from market. Not applicable for `Option` markets",
        "type": "boolean",
        "example": true
      },
      "feeGroupId": {
        "description": "Identifier to the trade fee assigned to this market. Used with `tradeFeeRate` at [Get Trading Account](#get-/v1/accounts/trading-accounts/-tradingAccountId-)",
        "type": "integer",
        "example": 1
      },
      "feeTiers": {
        "description": "all available fee tiers. Not applicable for `Option` markets",
        "type": "array",
        "minItems": 0,
        "items": {
          "type": "object",
          "description": "unique fee tier",
          "required": ["feeTierId", "staticSpreadFee", "isDislocationEnabled"],
          "properties": {
            "feeTierId": {
              "type": "string",
              "description": "unique fee tier ID, see [Get Market By Symbol](#get-/v1/markets/-symbol-)",
              "example": "1",
              "properties": {}
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
      },
      "marketType": {
        "type": "string",
        "description": "market type can have the following string values `\"SPOT\"`, `\"PERPETUAL\"`, `\"DATED_FUTURE\"`, `\"OPTION\"`",
        "enum": ["SPOT", "PERPETUAL", "DATED_FUTURE", "OPTION"],
        "example": "SPOT",
        "properties": {}
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
        "example": "2024-10-04 08:00:00+00:00"
      },
      "optionStrikePrice": {
        "description": "The price at which the option can be exercised upon expiry.",
        "type": "string",
        "example": "70000.0000"
      },
      "optionType": {
        "description": "Type of Option market",
        "example": "CALL",
        "type": "string",
        "enum": ["CALL", "PUT"],
        "properties": {}
      },
      "premiumCapRatio": {
        "description": "A cap that is set on the underlying asset's movement as part of the premium that limits the option buyer's profit.",
        "type": "string",
        "example": "0.10"
      }
    }
  }
}
```

### 404 - Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
