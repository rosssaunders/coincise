# GET /v1/markets/{symbol}

**Summary**: Get Market by Symbol

## Description

Get Market by Symbol. Note -> "Leverage = Collateral ÷ (Collateral - Debt)"

**Operation ID**: market-data-get-market

**Tags**: market-data

**Endpoint**: `GET /v1/markets/{symbol}`

**Authentication Required**: No

## Responses

### 200 - OK

**Content-Type**: application/json

| Field                         | Type          | Required | Description                                                                                                                                                                       |
| ----------------------------- | ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| marketId                      | string        | Yes      | <br>**Example:** `"10000"`                                                                                                                                                        |
| symbol                        | string        | Yes      | market symbol. Eg `BTC-USDC-20241004-70000-C` for OPTION markets.<br>**Example:** `"BTC-USDC-20241004-70000-C"`                                                                   |
| baseSymbol                    | string        | Yes      | asset symbol as denoted in the world<br>**Example:** `"BTC"`                                                                                                                      |
| underlyingBaseSymbol          | string        | No       | asset symbol as denoted in the world<br>**Example:** `"BTC"`                                                                                                                      |
| quoteSymbol                   | string        | Yes      | asset symbol as denoted in the world<br>**Example:** `"BTC"`                                                                                                                      |
| underlyingQuoteSymbol         | string        | No       | asset symbol as denoted in the world<br>**Example:** `"BTC"`                                                                                                                      |
| quoteAssetId                  | string        | Yes      | unique asset ID<br>**Example:** `"1"`                                                                                                                                             |
| baseAssetId                   | string        | Yes      | unique asset ID<br>**Example:** `"1"`                                                                                                                                             |
| quotePrecision                | integer       | Yes      | quote precision<br>**Example:** `4`                                                                                                                                               |
| basePrecision                 | integer       | Yes      | base precision<br>**Example:** `8`                                                                                                                                                |
| pricePrecision                | integer       | Yes      | number of decimal digits 'after the dot' for price<br>**Example:** `8`                                                                                                            |
| quantityPrecision             | integer       | Yes      | number of decimal digits 'after the dot' for quantity<br>**Example:** `8`                                                                                                         |
| costPrecision                 | integer       | Yes      | number of decimal digits 'after the dot' for cost, `price * quantity`<br>**Example:** `8`                                                                                         |
| priceBuffer                   | string        | Yes      | buffer range of limit price from the last traded price. Not applicable for `Option` markets<br>**Example:** `0.3`                                                                 |
| minQuantityLimit              | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                  |
| maxQuantityLimit              | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                  |
| maxPriceLimit                 | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                  |
| minPriceLimit                 | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                  |
| maxCostLimit                  | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                  |
| minCostLimit                  | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                  |
| timeZone                      | string        | Yes      | time zone<br>**Example:** `"Etc/UTC"`                                                                                                                                             |
| tickSize                      | string        | Yes      | see [asset value](#overview--price-and-quantity-precision) format<br>**Example:** `"1.00000000"`                                                                                  |
| liquidityTickSize             | string        | Yes      | liquidity tick size. Not applicable for `Option` markets<br>**Example:** `"100.0000"`                                                                                             |
| liquidityPrecision            | integer       | Yes      | liquidity precision. Not applicable for `Option` markets<br>**Example:** `4`                                                                                                      |
| makerFee                      | integer       | No       | Deprecated and no longer accurate. See `feeGroupId`<br>**Example:** `0` ⚠️ _Deprecated_                                                                                           |
| takerFee                      | integer       | No       | Deprecated and no longer accurate. See `feeGroupId`<br>**Example:** `2` ⚠️ _Deprecated_                                                                                           |
| roundingCorrectionFactor      | string        | Yes      | rounding correction factor for market<br>**Example:** `"0.00000001"`                                                                                                              |
| makerMinLiquidityAddition     | string        | Yes      | minimum amount required to invest liquidity to market. Not applicable for `Option` markets<br>**Example:** `"5000"`                                                               |
| orderTypes                    | array[string] | No       |                                                                                                                                                                                   |
| spotTradingEnabled            | boolean       | Yes      | spot trading enabled (only applies for Spot markets)<br>**Example:** `true`                                                                                                       |
| marginTradingEnabled          | boolean       | Yes      | margin trading enabled (only applies for Spot markets)<br>**Example:** `true`                                                                                                     |
| marketEnabled                 | boolean       | Yes      | market enabled<br>**Example:** `true`                                                                                                                                             |
| createOrderEnabled            | boolean       | Yes      | able to create order<br>**Example:** `true`                                                                                                                                       |
| amendOrderEnabled             | boolean       | No       | able to amend order<br>**Example:** `true` ⚠️ _Deprecated_                                                                                                                        |
| cancelOrderEnabled            | boolean       | Yes      | able to cancel order<br>**Example:** `true`                                                                                                                                       |
| liquidityInvestEnabled        | boolean       | Yes      | able to invest liquidity to market. Not applicable for `Option` markets<br>**Example:** `true`                                                                                    |
| liquidityWithdrawEnabled      | boolean       | Yes      | able to withdraw liquidity from market. Not applicable for `Option` markets<br>**Example:** `true`                                                                                |
| feeGroupId                    | integer       | Yes      | Identifier to the trade fee assigned to this market. Used with `tradeFeeRate` at [Get Trading Account](#get-/v1/accounts/trading-accounts/-tradingAccountId-)<br>**Example:** `1` |
| feeTiers                      | array[object] | Yes      | all available fee tiers. Not applicable for `Option` markets                                                                                                                      |
| marketType                    | string        | Yes      | market type can have the following string values `"SPOT"`, `"PERPETUAL"`, `"DATED_FUTURE"`, `"OPTION"`<br>**Example:** `"SPOT"`                                                   |
| contractMultiplier            | integer       | No       | contract multiplier. (only applies to perpetual market)<br>**Example:** `null`                                                                                                    |
| settlementAssetSymbol         | string        | No       | settlement asset symbol. (only applies to perpetual market)<br>**Example:** `null`                                                                                                |
| openInterestUSD               | string        | Yes      | cumulative notional value of all open interest for a specific derivative contract on the exchange.<br>**Example:** `null`                                                         |
| concentrationRiskThresholdUSD | string        | Yes      | open interest notional of an account for a specific derivative contract.<br>**Example:** `null`                                                                                   |
| concentrationRiskPercentage   | string        | Yes      | percentage of the total open interest for a specific derivative contract.<br>**Example:** `null`                                                                                  |
| expiryDatetime                | string        | Yes      | denotes the time when the market expires in ISO 8601 with millisecond format as string<br>**Example:** `"2024-10-04 08:00:00+00:00"`                                              |
| optionStrikePrice             | string        | No       | The price at which the option can be exercised upon expiry.<br>**Example:** `"70000.0000"`                                                                                        |
| optionType                    | string        | No       | Type of Option market<br>**Example:** `"CALL"`                                                                                                                                    |
| premiumCapRatio               | string        | No       | A cap that is set on the underlying asset's movement as part of the premium that limits the option buyer's profit.<br>**Example:** `"0.10"`                                       |

### 404 - Not Found

### 429 - Too Many Requests

### 500 - Internal Server Error
