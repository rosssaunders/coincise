# GET /api/v5/public/interest-rate-loan-quota

Source:
[https://www.okx.com/docs-v5/en/#public-data-rest-api-get-interest-rate-and-loan-quota](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-interest-rate-and-loan-quota)

### Get interest rate and loan quota

Retrieve interest rate

#### Rate Limit: 2 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/interest-rate-loan-quota`

#### Response Parameters

| Parameter                                                                                                                                        | Type             | Description                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- | ----------------------------------------------------------------------------- |
| basic                                                                                                                                            | Array of objects | Basic interest rate                                                           |
| \> ccy                                                                                                                                           | String           | Currency                                                                      |
| \> rate                                                                                                                                          | String           | Daily borrowing rate                                                          |
| \> quota                                                                                                                                         | String           | Max borrow                                                                    |
| vip                                                                                                                                              | Array of objects | Interest info for vip users                                                   |
| \> level                                                                                                                                         | String           | VIP Level, e.g. `VIP1`                                                        |
| \> loanQuotaCoef                                                                                                                                 | String           | Loan quota coefficient. Loan quota = `quota` \* `level`                       |
| \> irDiscount                                                                                                                                    | String           | ~Interest rate discount~(Deprecated)                                          |
| regular                                                                                                                                          | Array of objects | Interest info for regular users                                               |
| \> level                                                                                                                                         | String           | Regular user Level, e.g. `Lv1`                                                |
| \> loanQuotaCoef                                                                                                                                 | String           | Loan quota coefficient. Loan quota = `quota` \* `level`                       |
| \> irDiscount                                                                                                                                    | String           | ~Interest rate discount~(Deprecated)                                          |
| configCcyList                                                                                                                                    | Array of strings | Currencies that have loan quota configured using customized absolute value.   |
| Users should refer to config to get the loan quota of a currency which is listed in configCcyList, instead of getting it from basic/vip/regular. |
| \> ccy                                                                                                                                           | String           | Currency                                                                      |
| \> rate                                                                                                                                          | String           | Daily rate                                                                    |
| config                                                                                                                                           | Array of objects | The currency details of loan quota configured using customized absolute value |
| \> ccy                                                                                                                                           | String           | Currency                                                                      |
| \> stgyType                                                                                                                                      | String           | Strategy type                                                                 |

`0`: general strategy  
`1`: delta neutral strategy  
If only `0` is returned for a currency, it means the loan quota is shared
between accounts in general strategy and accounts in delta neutral strategy; if
both `0/1` are returned for a currency, it means accounts in delta neutral
strategy have separate loan quotas. | | \> quota | String | Loan quota in
absolute value | | \> level | String | VIP level |
