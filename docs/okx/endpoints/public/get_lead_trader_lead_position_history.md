# GET / Lead trader lead position history

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-lead-position-history](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-lead-position-history)

### GET / Lead trader lead position history

Public endpoint. Retrieve the lead trader completed leading position of the last
3 months.  
Returns reverse chronological order with `subPosId`.

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### Permission: Read

#### HTTP request

`GET /api/v5/copytrading/public-subpositions-history`

#### Request Parameters

| Parameter                                                                                                         | Type   | Required | Description                                                                 |
| ----------------------------------------------------------------------------------------------------------------- | ------ | -------- | --------------------------------------------------------------------------- |
| instType                                                                                                          | String | No       | Instrument type                                                             |
| `SWAP`, the default value.                                                                                        |
| uniqueCode                                                                                                        | String | Yes      | Lead trader unique code                                                     |
| A combination of case-sensitive alphanumerics, all numbers and the length is 16 characters, e.g. 213E8C92DC61EFAC |
| after                                                                                                             | String | No       | Pagination of data to return records earlier than the requested `subPosId`. |
| before                                                                                                            | String | No       | Pagination of data to return records newer than the requested `subPosId`.   |
| limit                                                                                                             | String | No       | Number of results per request. Maximum is 100. Default is 100.              |

#### Response parameters

| **Parameter** | **Type** | **Description**                   |
| ------------- | -------- | --------------------------------- |
| instId        | String   | Instrument ID, e.g. BTC-USDT-SWAP |
| subPosId      | String   | Lead position ID                  |
| posSide       | String   | Position side                     |

`long`  
`short`  
`net`  
(long position has positive subPos; short position has negative subPos) | |
mgnMode | String | Margin mode. `cross` `isolated` | | lever | String | Leverage
| | openAvgPx | String | Average open price | | openTime | String | Time of
opening | | subPos | String | Quantity of positions | | closeTime | String |
Time of closing position | | closeAvgPx | String | Average price of closing
position | | pnl | String | Profit and loss | | pnlRatio | String | P&L ratio |
| instType | String | Instrument type | | margin | String | Margin | | ccy |
String | Currency | | uniqueCode | String | Lead trader unique code |
