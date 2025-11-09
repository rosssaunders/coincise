# GET / Copy settings

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-copy-settings](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-copy-settings)

### GET / Copy settings

Retrieve the copy settings about certain lead trader.

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/copytrading/copy-settings`

#### Request Parameters

| Parameter                                                                                                         | Type   | Required | Description             |
| ----------------------------------------------------------------------------------------------------------------- | ------ | -------- | ----------------------- |
| instType                                                                                                          | String | No       | Instrument type         |
| `SWAP`                                                                                                            |
| uniqueCode                                                                                                        | String | Yes      | Lead trader unique code |
| A combination of case-sensitive alphanumerics, all numbers and the length is 16 characters, e.g. 213E8C92DC61EFAC |

#### Response parameters

| **Parameter**                                                                                 | **Type** | **Description**                           |
| --------------------------------------------------------------------------------------------- | -------- | ----------------------------------------- |
| copyMode                                                                                      | String   | Copy mode                                 |
| `fixed_amount` `ratio_copy`                                                                   |
| copyAmt                                                                                       | String   | Copy amount in USDT per order.            |
| copyRatio                                                                                     | String   | Copy ratio per order.                     |
| copyTotalAmt                                                                                  | String   | Maximum total amount in USDT.             |
| The maximum total amount you'll invest at any given time across all orders in this copy trade |
| tpRatio                                                                                       | String   | Take profit per order. 0.1 represents 10% |
| slRatio                                                                                       | String   | Stop loss per order. 0.1 represents 10%   |
| copyInstIdType                                                                                | String   | Copy contract type setted                 |

`custom`: custom by `instId` which is required；  
`copy`: Keep your contracts consistent with this trader by automatically adding
or removing contracts when they do | | instIds | Array of objects | Instrument
list. It will return all lead contracts of the lead trader | | \> instId |
String | Instrument ID | | \> enabled | String | Whether copying this `instId`  
`0` `1` | | slTotalAmt | String | Total stop loss in USDT for trader. | |
subPosCloseType | String | Action type for open positions  
`market_close`: immediately close at market price  
`copy_close`：close when trader closes  
`manual_close`: close manually | | copyMgnMode | String | Copy margin mode  
`cross`: cross  
`isolated`: isolated  
`copy`: Use the same margin mode as lead trader when opening positions | | ccy |
String | Margin currency | | copyState | String | Current copy state  
`0`: non-copy, `1`: copy | | tag | String | Order tag |
