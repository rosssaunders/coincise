# GET / Loan info

Source:
[https://www.okx.com/docs-v5/en/#financial-product-flexible-loan-get-loan-info](https://www.okx.com/docs-v5/en/#financial-product-flexible-loan-get-loan-info)

### GET / Loan info

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/flexible-loan/loan-info`

#### Response Parameters

| **Parameter**                                                                                                                        | **Type**         | **Description**                            |
| ------------------------------------------------------------------------------------------------------------------------------------ | ---------------- | ------------------------------------------ |
| loanNotionalUsd                                                                                                                      | String           | Loan value in `USD`                        |
| loanData                                                                                                                             | Array of objects | Loan data                                  |
| \> ccy                                                                                                                               | String           | Loan currency, e.g. `USDT`                 |
| \> amt                                                                                                                               | String           | Loan amount                                |
| collateralNotionalUsd                                                                                                                | String           | Collateral value in `USD`                  |
| collateralData                                                                                                                       | Array of objects | Collateral data                            |
| \> ccy                                                                                                                               | String           | Collateral currency, e.g. `BTC`            |
| \> amt                                                                                                                               | String           | Collateral amount                          |
| riskWarningData                                                                                                                      | Object           | Risk warning data                          |
| \> instId                                                                                                                            | String           | Liquidation instrument ID, e.g. `BTC-USDT` |
| This field is only valid when there is only one type of collateral and one type of borrowed currency. In other cases, it returns "". |
| \> liqPx                                                                                                                             | String           | Liquidation price                          |

The unit of the liquidation price is the quote currency of the instrument, e.g.
`USDT` in `BTC-USDT`.  
This field is only valid when there is only one type of collateral and one type
of borrowed currency. In other cases, it returns "". | | curLTV | String |
Current LTV, e.g. `0.1` represents `10%`  
Note: LTV = Loan to Value | | marginCallLTV | String | Margin call LTV, e.g.
`0.1` represents `10%`  
If your loan hits the margin call LTV, our system will automatically warn you
that your loan is getting close to forced liquidation. | | liqLTV | String |
Liquidation LTV, e.g. `0.1` represents `10%`  
If your loan reaches liquidation LTV, it'll trigger forced liquidation. When
this happens, you'll lose access to your collateral and any repayments made. |
