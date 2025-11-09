# GET / Copy traders

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-copy-traders](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-copy-traders)

### GET / Copy traders

Public endpoint. Retrieve copy trader coming from certain lead trader. Return
according to `pnl` from high to low

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### Permission: Read

#### HTTP request

`GET /api/v5/copytrading/public-copy-traders`

#### Request Parameters

| Parameter                                                                                                         | Type   | Required | Description                                                               |
| ----------------------------------------------------------------------------------------------------------------- | ------ | -------- | ------------------------------------------------------------------------- |
| instType                                                                                                          | String | No       | Instrument type                                                           |
| `SWAP`, the default value                                                                                         |
| uniqueCode                                                                                                        | String | Yes      | Lead trader unique code                                                   |
| A combination of case-sensitive alphanumerics, all numbers and the length is 16 characters, e.g. 213E8C92DC61EFAC |
| limit                                                                                                             | String | No       | Number of results per request. The maximum is `100`; The default is `100` |

#### Response parameters

| **Parameter**         | **Type**         | **Description**                                                              |
| --------------------- | ---------------- | ---------------------------------------------------------------------------- |
| copyTotalPnl          | String           | Total copy trader profit and loss                                            |
| ccy                   | String           | The currency name of profit and loss                                         |
| copyTraderNumChg      | String           | Number change in last 7 days                                                 |
| copyTraderNumChgRatio | String           | Ratio change in last 7 days                                                  |
| copyTraders           | Array of objects | Copy trader information                                                      |
| \> beginCopyTime      | String           | Begin copying time. Unix timestamp format in milliseconds, e.g.1597026383085 |
| \> nickName           | String           | Nick name                                                                    |
| \> portLink           | String           | Copy trader portrait link                                                    |
| \> pnl                | String           | Copy trading profit and loss                                                 |
