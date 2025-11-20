# GET /v1/assets

**Summary**: Get Assets

## Description

Get supported assets. Clients can ignore [test assets](#overview--test-assets).

**Operation ID**: asset-data-get-assets

**Tags**: asset-data

**Endpoint**: `GET /v1/assets`

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
        "type": "string",
        "description": "unique asset ID",
        "example": "1",
        "properties": {}
      },
      "symbol": {
        "type": "string",
        "description": "asset symbol as denoted in the world",
        "example": "BTC",
        "properties": {}
      },
      "name": {
        "type": "string",
        "description": "asset name",
        "example": "Bitcoin",
        "properties": {}
      },
      "precision": {
        "description": "number of decimal digits 'after the dot' for asset amount",
        "type": "string",
        "example": "8"
      },
      "minBalanceInterest": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
      },
      "minFee": {
        "description": "see [asset value](#overview--price-and-quantity-precision) format",
        "type": "string",
        "example": "1.00000000",
        "properties": {}
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
      },
      "underlyingAsset": {
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
    }
  }
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
