# GET / Lead trader current lead positions

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-current-lead-positions](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-current-lead-positions)

### GET / Lead trader current lead positions

Public endpoint. Get current leading positions of lead trader

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### Permission: Read

#### HTTP request

`GET /api/v5/copytrading/public-current-subpositions`

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

#### Response Parameters

| **Parameter** | **Type** | **Description**                   |
| ------------- | -------- | --------------------------------- |
| instId        | String   | Instrument ID, e.g. BTC-USDT-SWAP |
| subPosId      | String   | Lead position ID                  |
| posSide       | String   | Position side                     |

`long`  
`short`  
`net`  
(Long positions have positive subPos; short positions have negative subPos) | |
mgnMode | String | Margin mode. `cross` `isolated` | | lever | String | Leverage
| | openAvgPx | String | Average open price | | openTime | String | Open time |
| subPos | String | Quantity of positions | | instType | String | Instrument
type | | margin | String | Margin | | upl | String | Unrealized profit and loss
| | uplRatio | String | Unrealized profit and loss ratio | | markPx | String |
Latest mark price, only applicable to contract | | uniqueCode | String | Lead
trader unique code | | ccy | String | Currency |
