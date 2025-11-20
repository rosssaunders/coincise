# GET /v1/accounts/trading-accounts

**Summary**: Get all trading Accounts details

## Description

Gets details for all trading accounts accessible by the API key used in the
request. It requires [bearer token](#overview--add-authenticated-request-header)
in authorization header. The trading account's id will be used in all other REST
API

**Ratelimited:** `True`

**Operation ID**: user-get-trading-accounts

**Tags**: trading-accounts

**Endpoint**: `GET /v1/accounts/trading-accounts`

**Authentication Required**: Yes

## Parameters

| Parameter | In  | Type   | Required | Description |
| --------- | --- | ------ | -------- | ----------- |
|           |     | string | No       |             |

## Responses

### 200 - OK

**Content-Type**: application/json

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
        "description": "unique trading account ID",
        "type": "string",
        "example": "111000000000001",
        "properties": {}
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
    }
  }
}
```

### 401 - Not Authenticated

### 403 - Access Forbidden

### 429 - Too Many Requests

### 500 - Internal Server Error
