---
title: Bullish Trading API - Public REST API - Asset Data
language_tabs:
  - javascript: JavaScript
  - python: Python
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2
---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="bullish-trading-api">Bullish Trading API - Public REST API - Asset Data</h1>

> Scroll down for code samples, example requests and responses. Select a
> language for code samples from the tabs above or the mobile navigation menu.

<h1 id="bullish-trading-api-asset-data">asset-data</h1>

Non-authenticated APIs for accessing general asset data information

## asset-data-get-assets

<a id="opIdasset-data-get-assets"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("https://api.exchange.bullish.com/trading-api/v1/assets", {
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/assets', headers = headers)

print(r.json())

```

`GET /v1/assets`

_Get Assets_

Get supported assets. Clients can ignore [test assets](#overview--test-assets).

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
}
```

<h3 id="asset-data-get-assets-responses">Responses</h3>

| Status | Meaning                                                                    | Description           | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | Inline |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None   |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None   |

<h3 id="asset-data-get-assets-responseschema">Response Schema</h3>

Status Code **200**

| Name                          | Type                                      | Required | Restrictions | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------------- | ----------------------------------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _anonymous_                   | [[Asset](#schemaasset)]                   | false    | none         | none                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| » assetId                     | [AssetID](#schemaassetid)                 | true     | none         | unique asset ID                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| » symbol                      | [AssetSymbol](#schemaassetsymbol)         | true     | none         | asset symbol                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| » name                        | [AssetName](#schemaassetname)             | true     | none         | asset name                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| » precision                   | string                                    | true     | none         | number of decimal digits 'after the dot' for asset amount                                                                                                                                                                                                                                                                                                                                                                                                      |
| » minBalanceInterest          | [AssetValue](#schemaassetvalue)           | true     | none         | see [asset value](#overview--price-and-quantity-precision) format                                                                                                                                                                                                                                                                                                                                                                                              |
| » minFee                      | [AssetValue](#schemaassetvalue)           | true     | none         | minimum fee                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| » apr                         | string                                    | true     | none         | annualized percentage rate                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| » collateralRating            | string                                    | true     | none         | collateral rating applied to this asset, a value of 100.00 indicates 100%. `Deprecated in favour of collateral bands`                                                                                                                                                                                                                                                                                                                                          |
| » maxBorrow                   | string                                    | true     | none         | maximum quantity that can be borrowed for this asset                                                                                                                                                                                                                                                                                                                                                                                                           |
| » totalOfferedLoanQuantity    | string                                    | true     | none         | quantity of an asset that is across all loan offers on the exchange                                                                                                                                                                                                                                                                                                                                                                                            |
| » loanBorrowedQuantity        | string                                    | true     | none         | amount of loans that is currently being borrowed for the asset                                                                                                                                                                                                                                                                                                                                                                                                 |
| » collateralBands             | [allOf]                                   | true     | none         | list of collateral bands for the asset. A collateral band holds the upper limit of the USD notional and the corresponding collateral percentage which applies to it. An asset's collateral value will be capped by the highest limit of the collateral bands, any remaining amount greater than this limit will have a collateral percentage of 0. If an asset has an empty list of CollateralBands, this signifies that the asset has a collateralValue of 0. |
| »» collateralPercentage       | string                                    | false    | none         | collateral percentage applied to the asset for this band - a value of 90.00 indicates 90% of the asset is eligible to be used as collateral                                                                                                                                                                                                                                                                                                                    |
| »» bandLimitUSD               | string                                    | false    | none         | upper limit in USD for this band                                                                                                                                                                                                                                                                                                                                                                                                                               |
| » underlyingAsset             | [UnderlyingAsset](#schemaunderlyingasset) | true     | none         | underlying asset for the asset.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| »» symbol                     | string                                    | false    | none         | underlying asset symbol                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| »» assetId                    | string                                    | false    | none         | underlying asset ID                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| »» bpmMinReturnStart          | string                                    | false    | none         | start of the 1/1000 biggest downward price movement of an underlying asset over 6 hours                                                                                                                                                                                                                                                                                                                                                                        |
| »» bpmMinReturnEnd            | string                                    | false    | none         | end of the 1/1000 biggest downward price movement of an underlying asset over 6 hours                                                                                                                                                                                                                                                                                                                                                                          |
| »» bpmMaxReturnStart          | string                                    | false    | none         | start of the 1/1000 biggest upward price movement of an underlying asset over 6 hours                                                                                                                                                                                                                                                                                                                                                                          |
| »» bpmMaxReturnEnd            | string                                    | false    | none         | end of the 1/1000 biggest upward price movement of an underlying asset over 6 hours                                                                                                                                                                                                                                                                                                                                                                            |
| »» marketRiskFloorPctStart    | string                                    | false    | none         | the percentage range of risk reduction allowed for a portfolio                                                                                                                                                                                                                                                                                                                                                                                                 |
| »» marketRiskFloorPctEnd      | string                                    | false    | none         | the percentage range of risk reduction allowed for a portfolio                                                                                                                                                                                                                                                                                                                                                                                                 |
| »» bpmTransitionDateTimeStart | string                                    | false    | none         | the start datetime which the values linearly transition from `bpmMinReturnStart` to `bpmMinReturnEnd` for an underlying asset                                                                                                                                                                                                                                                                                                                                  |
| »» bpmTransitionDateTimeEnd   | string                                    | false    | none         | the end datetime which the values linearly transition from `bpmMinReturnStart` to `bpmMinReturnEnd` for an underlying asset                                                                                                                                                                                                                                                                                                                                    |

<aside class="success">
This operation does not require authentication
</aside>

## asset-data-get-asset

<a id="opIdasset-data-get-asset"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("https://api.exchange.bullish.com/trading-api/v1/assets/{symbol}", {
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

r = requests.get('https://api.exchange.bullish.com/trading-api/v1/assets/{symbol}', headers = headers)

print(r.json())

```

`GET /v1/assets/{symbol}`

_Get Asset by Symbol_

Get Asset by Symbol

<h3 id="asset-data-get-asset-parameters">Parameters</h3>

| Name   | In   | Type   | Required | Description |
| ------ | ---- | ------ | -------- | ----------- |
| symbol | path | string | true     | none        |

> Example responses

> 200 Response

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

<h3 id="asset-data-get-asset-responses">Responses</h3>

| Status | Meaning                                                                    | Description           | Schema                |
| ------ | -------------------------------------------------------------------------- | --------------------- | --------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | [Asset](#schemaasset) |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None                  |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None                  |

<aside class="success">
This operation does not require authentication
</aside>
