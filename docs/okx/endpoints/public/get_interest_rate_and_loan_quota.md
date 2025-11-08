# GET interest rate and loan quota

Source: [https://www.okx.com/docs-v5/en/#public-data-rest-api-get-interest-rate-and-loan-quota](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-interest-rate-and-loan-quota)

### Get interest rate and loan quota

Retrieve interest rate

#### Rate Limit: 2 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/interest-rate-loan-quota`

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| basic | Array of objects | Basic interest rate |
| \> ccy | String | Currency |
| \> rate | String | Daily rate |
| \> quota | String | Max borrow |
| vip | Array of objects | Interest info for vip users |
| \> level | String | VIP Level, e.g. `VIP1` |
| \> loanQuotaCoef | String | Loan quota coefficient. Loan quota = `quota` \* `level` |
| \> irDiscount | String | ~Interest rate discount~(Deprecated) |
| regular | Array of objects | Interest info for regular users |
| \> level | String | Regular user Level, e.g. `Lv1` |
| \> loanQuotaCoef | String | Loan quota coefficient. Loan quota = `quota` \* `level` |
| \> irDiscount | String | ~Interest rate discount~(Deprecated) |
