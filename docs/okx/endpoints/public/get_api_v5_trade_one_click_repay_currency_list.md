# GET /api/v5/trade/one-click-repay-currency-list

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-one-click-repay-currency-list](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-one-click-repay-currency-list)

### GET / One-click repay currency list

Get list of debt currency data and repay currencies. Debt currencies include
both cross and isolated debts. Only applicable to
`Multi-currency margin`/`Portfolio margin`.

#### Rate Limit: 1 request per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/trade/one-click-repay-currency-list`

#### Request Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| debtType  | String | No       | Debt type   |

`cross`: cross  
`isolated`: isolated |

#### Response Parameters

| Parameter                        | Type             | Description             |
| -------------------------------- | ---------------- | ----------------------- |
| debtData                         | Array of objects | Debt currency data list |
| \> debtCcy                       | String           | Debt currency           |
| \> debtAmt                       | String           | Debt currency amount    |
| Including principal and interest |
| debtType                         | String           | Debt type               |

`cross`: cross  
`isolated`: isolated | | repayData | Array of objects | Repay currency data list
| | \> repayCcy | String | Repay currency | | \> repayAmt | String | Repay
currency's available balance amount |
