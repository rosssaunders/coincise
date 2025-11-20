# GET /v1/assets/{symbol}

**Summary**: Get Asset by Symbol

## Description

Get Asset by Symbol

**Operation ID**: asset-data-get-asset

**Tags**: asset-data

**Endpoint**: `GET /v1/assets/{symbol}`

**Authentication Required**: No

## Parameters

| Parameter | In   | Type   | Required | Description |
| --------- | ---- | ------ | -------- | ----------- |
| symbol    | path | string | Yes      |             |

## Responses

### 200 - OK

**Content-Type**: application/json

| Field                    | Type          | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------ | ------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| assetId                  | string        | Yes      | unique asset ID<br>**Example:** `"1"`                                                                                                                                                                                                                                                                                                                                                                                                                          |
| symbol                   | string        | Yes      | asset symbol as denoted in the world<br>**Example:** `"BTC"`                                                                                                                                                                                                                                                                                                                                                                                                   |
| name                     | string        | Yes      | asset name<br>**Example:** `"Bitcoin"`                                                                                                                                                                                                                                                                                                                                                                                                                         |
| precision                | string        | Yes      | number of decimal digits 'after the dot' for asset amount<br>**Example:** `"8"`                                                                                                                                                                                                                                                                                                                                                                                |
| minBalanceInterest       | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                                                                                                                                                                                                                                                                                               |
| minFee                   | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                                                                                                                                                                                                                                                                                               |
| apr                      | string        | Yes      | annualized percentage rate<br>**Example:** `"12.50"`                                                                                                                                                                                                                                                                                                                                                                                                           |
| collateralRating         | string        | Yes      | collateral rating applied to this asset, a value of 100.00 indicates 100%. `Deprecated in favour of collateral bands`<br>**Example:** `"95.00"` ⚠️ _Deprecated_                                                                                                                                                                                                                                                                                                |
| maxBorrow                | string        | Yes      | maximum quantity that can be borrowed for this asset<br>**Example:** `"10.00000000"`                                                                                                                                                                                                                                                                                                                                                                           |
| totalOfferedLoanQuantity | string        | Yes      | quantity of an asset that is across all loan offers on the exchange<br>**Example:** `"5.00000000"`                                                                                                                                                                                                                                                                                                                                                             |
| loanBorrowedQuantity     | string        | Yes      | amount of loans that is currently being borrowed for the asset<br>**Example:** `"3.00000000"`                                                                                                                                                                                                                                                                                                                                                                  |
| collateralBands          | array[object] | Yes      | list of collateral bands for the asset. A collateral band holds the upper limit of the USD notional and the corresponding collateral percentage which applies to it. An asset's collateral value will be capped by the highest limit of the collateral bands, any remaining amount greater than this limit will have a collateral percentage of 0. If an asset has an empty list of CollateralBands, this signifies that the asset has a collateralValue of 0. |
| underlyingAsset          | object        | Yes      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

### 429 - Too Many Requests

### 500 - Internal Server Error
