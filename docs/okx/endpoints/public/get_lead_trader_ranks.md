# GET / Lead trader ranks

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-ranks](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-ranks)

### GET / Lead trader ranks

Public endpoint. Retrieve lead trader ranks.

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### Permission: Read

#### HTTP request

`GET /api/v5/copytrading/public-lead-traders`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | No | Instrument type  
`SWAP`, the default value |
| sortType | String | No | Sort type  
`overview`: overview, the default value  
`pnl`: profit and loss  
`aum`: assets under management  
`win_ratio`: win ratio  
`pnl_ratio`: pnl ratio  
`current_copy_trader_pnl`: current copy trader pnl |
| state | String | No | Lead trader state  
`0`: All lead traders, the default, including vacancy and non-vacancy  
`1`: lead traders who have vacancy |
| minLeadDays | String | No | Minimum lead days  
`1`: 7 days  
`2`: 30 days  
`3`: 90 days  
`4`: 180 days |
| minAssets | String | No | Minimum assets in USDT |
| maxAssets | String | No | Maximum assets in USDT |
| minAum | String | No | Minimum assets in USDT under management. |
| maxAum | String | No | Maximum assets in USDT under management. |
| dataVer | String | No | Data version. It is 14 numbers. e.g. 20231010182400. Generally, it is used for pagination  
A new version will be generated every 10 minutes. Only last 5 versions are stored  
The default is latest version. If it is not exist, error will not be throwed and the latest version will be used. |
| page | String | No | Page for pagination |
| limit | String | No | Number of results per request. The maximum is 20; the default is 10 |

#### Response parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| dataVer | String | Data version |
| totalPage | String | Total number of pages |
| ranks | Array of objects | The rank information of lead traders |
| \> aum | String | assets under management |
| \> copyState | String | Current copy state  
`0`: non-copy, `1`: copy |
| \> maxCopyTraderNum | String | Maximum number of copy traders |
| \> copyTraderNum | String | Current number of copy traders |
| \> accCopyTraderNum | String | Accumulated number of copy traders |
| \> portLink | String | Portrait link |
| \> nickName | String | Nick name |
| \> ccy | String | Margin currency |
| \> uniqueCode | String | Lead trader unique code |
| \> winRatio | String | Win ratio, 0.1 represents 10% |
| \> leadDays | String | Lead days |
| \> traderInsts | Array of strings | Contract list which lead trader is leading |
| \> pnl | String | Pnl (in USDT) of last 90 days. |
| \> pnlRatio | String | Pnl ratio of last 90 days. 0.1 represents 10% |
| \> pnlRatios | Array of objects | Pnl ratios |
| \>> beginTs | String | Begin time of pnl ratio on that day |
| \>> pnlRatio | String | Pnl ratio on that day |
