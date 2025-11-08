# GET position tiers

Source: [https://www.okx.com/docs-v5/en/#public-data-rest-api-get-position-tiers](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-position-tiers)

### Get position tiers

Retrieve position tiers information, maximum leverage depends on your borrowings and Maintenance margin ratio.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/position-tiers`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | Yes | Instrument type  
`MARGIN`  
`SWAP`  
`FUTURES`  
`OPTION` |
| tdMode | String | Yes | Trade mode  
Margin mode `cross` `isolated` |
| instFamily | String | Conditional | Single instrument familiy or multiple instrument families (no more than 5) separated with comma.  
If instType is `SWAP/FUTURES/OPTION`, `instFamily` is required. |
| instId | String | Conditional | Single instrument or multiple instruments (no more than 5) separated with comma.  
Either instId or ccy is required, if both are passed, instId will be used, ignore when instType is one of `SWAP`,`FUTURES`,`OPTION` |
| ccy | String | Conditional | Margin currency  
Only applicable to cross MARGIN. It will return borrowing amount for `Multi-currency margin` and `Portfolio margin` when `ccy` takes effect. |
| tier | String | No | Tiers |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| uly | String | Underlying  
Applicable to `FUTURES`/`SWAP`/`OPTION` |
| instFamily | String | Instrument family  
Applicable to `FUTURES`/`SWAP`/`OPTION` |
| instId | String | Instrument ID |
| tier | String | Tiers |
| minSz | String | The minimum borrowing amount or position of this gear is only applicable to margin/options/perpetual/delivery, the minimum position is 0 by default  
It will return the minimum borrowing amount when `ccy` takes effect. |
| maxSz | String | The maximum borrowing amount or number of positions held in this position is only applicable to margin/options/perpetual/delivery  
It will return the maximum borrowing amount when `ccy` takes effect. |
| mmr | String | Position maintenance margin requirement rate |
| imr | String | Initial margin requirement rate |
| maxLever | String | Maximum available leverage |
| optMgnFactor | String | Option Margin Coefficient (only applicable to options) |
| quoteMaxLoan | String | Quote currency borrowing amount (only applicable to leverage and the case when `instId` takes effect) |
| baseMaxLoan | String | Base currency borrowing amount (only applicable to leverage and the case when `instId` takes effect) |
