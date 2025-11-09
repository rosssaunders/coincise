# GET discount rate and interest-free quota

Source:
[https://www.okx.com/docs-v5/en/#public-data-rest-api-get-discount-rate-and-interest-free-quota](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-discount-rate-and-interest-free-quota)

### Get discount rate and interest-free quota

Retrieve discount rate level and interest-free quota.

#### Rate Limit: 2 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/discount-rate-interest-free-quota`

#### Request Parameters

| Parameter  | Type   | Required | Description                   |
| ---------- | ------ | -------- | ----------------------------- |
| ccy        | String | No       | Currency                      |
| discountLv | String | No       | ~Discount level (Deprecated)~ |

#### Response Parameters

| **Parameter** | **Type** | **Description**                              |
| ------------- | -------- | -------------------------------------------- |
| ccy           | String   | Currency                                     |
| colRes        | String   | Platform level collateral restriction status |

`0`: The restriction is not enabled.  
`1`: The restriction is not enabled. But the crypto is close to the platform's
collateral limit.  
`2`: The restriction is enabled. This crypto can't be used as margin for your
new orders. This may result in failed orders. But it will still be included in
the account's adjusted equity and doesn't impact margin ratio.  
Refer to
[Introduction to the platform collateralized borrowing limit](https://www.okx.com/help/introduction-to-the-platforms-collateralized-borrowing-limit-mechanism)
for more details. | | collateralRestrict | Boolean | ~Platform level
collateralized borrow restriction  
`true`  
`false`~(deprecated, use colRes instead) | | amt | String | Interest-free quota
| | discountLv | String | ~Discount rate level.(Deprecated)~ | | minDiscountRate
| String | Minimum discount rate when it exceeds the maximum amount of the last
tier. | | details | Array of objects | New discount details. | | \> discountRate
| String | Discount rate | | \> maxAmt | String | Tier - upper bound.  
The unit is the currency like BTC. "" means positive infinity | | \> minAmt |
String | Tier - lower bound.  
The unit is the currency like BTC. The minimum is 0 | | \> tier | String | Tiers
| | \> liqPenaltyRate | String | Liquidation penalty rate | | \> disCcyEq |
String | Discount equity in currency for quick calculation if your equity is
the`maxAmt` |
