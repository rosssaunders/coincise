# POST / Amend copy settings

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-post-amend-copy-settings](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-post-amend-copy-settings)

### POST / Amend copy settings

You need to use this endpoint to amend copy settings

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP request

`POST /api/v5/copytrading/amend-copy-settings`

#### Request Parameters

| Parameter                                                                                                         | Type   | Required | Description             |
| ----------------------------------------------------------------------------------------------------------------- | ------ | -------- | ----------------------- |
| instType                                                                                                          | String | No       | Instrument type         |
| `SWAP`                                                                                                            |
| uniqueCode                                                                                                        | String | Yes      | Lead trader unique code |
| A combination of case-sensitive alphanumerics, all numbers and the length is 16 characters, e.g. 213E8C92DC61EFAC |
| copyMgnMode                                                                                                       | String | Yes      | Copy margin mode        |

`cross`: cross  
`isolated`: isolated  
`copy`: Use the same margin mode as lead trader when opening positions | |
copyInstIdType | String | Yes | Copy contract type setted  
`custom`: custom by `instId` which is required；  
`copy`: Keep your contracts consistent with this trader by automatically adding
or removing contracts when they do | | instId | String | Conditional |
Instrument ID.  
If there are multiple instruments, separate them with commas. | | copyMode |
String | No | Copy mode  
`fixed_amount`: set the same fixed amount for each order, and `copyAmt` is
required；  
`ratio_copy`: set amount as a multiple of the lead trader’s order value, and
`copyRatio` is required  
The default is `fixed_amount` | | copyTotalAmt | String | Yes | Maximum total
amount in USDT.  
The maximum total amount you'll invest at any given time across all orders in
this copy trade  
You won’t copy new orders if you exceed this amount | | copyAmt | String |
Conditional | Copy amount per order in USDT | | copyRatio | String | Conditional
| Copy ratio per order. | | tpRatio | String | No | Take profit per order. 0.1
represents 10% | | slRatio | String | No | Stop loss per order. 0.1 represents
10% | | slTotalAmt | String | No | Total stop loss in USDT for trader.  
If your net loss (total profit - total loss) reaches this amount, you'll stop
copying this trader | | subPosCloseType | String | Yes | Action type for open
positions  
`market_close`: immediately close at market price  
`copy_close`：close when trader closes  
`manual_close`: close manually  
The default is `copy_close` | | tag | String | No | Order tag  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up
to 16 characters. |

#### Response parameters

| **Parameter** | **Type** | **Description**       |
| ------------- | -------- | --------------------- |
| result        | Boolean  | The result of setting |
| `true`        |
