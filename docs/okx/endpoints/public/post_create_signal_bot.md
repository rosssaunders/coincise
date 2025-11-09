# POST / Create signal bot

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-post-create-signal-bot](https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-post-create-signal-bot)

### POST / Create signal bot

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/tradingBot/signal/order-algo`

#### Request Parameters

| Parameter                                        | Type    | Required | Description                                                                                                                                          |
| ------------------------------------------------ | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| signalChanId                                     | String  | Yes      | Signal channel Id                                                                                                                                    |
| lever                                            | String  | Yes      | Leverage                                                                                                                                             |
| Only applicable to `contract signal`             |
| investAmt                                        | String  | Yes      | Investment amount                                                                                                                                    |
| subOrdType                                       | String  | Yes      | Sub order type `1`：limit order `2`：market order `9`：tradingView signal                                                                            |
| includeAll                                       | Boolean | No       | Whether to include all USDT-margined contract.The default value is `false`. `true`: include `false` : exclude                                        |
| instIds                                          | String  | No       | Instrument IDs. Single currency or multiple currencies separated with comma. When `includeAll` is `true`, it is ignored                              |
| ratio                                            | String  | No       | Price offset ratio, calculate the limit price as a percentage offset from the best bid/ask price.                                                    |
| Only applicable to `subOrdType` is `limit` order |
| entrySettingParam                                | String  | No       | Entry setting                                                                                                                                        |
| \> allowMultipleEntry                            | String  | No       | Whether or not allow multiple entries in the same direction for the same trading pairs.The default value is `true`。 `true`：Allow `false`：Prohibit |
| \> entryType                                     | String  | No       | Entry type                                                                                                                                           |

`1`: TradingView signal  
`2`: Fixed margin  
`3`: Contracts  
`4`: Percentage of free margin  
`5`: Percentage of the initial invested margin | | \> amt | String | No | Amount
per order  
Only applicable to entryType in `2`/`3` | | \> ratio | Array of objects | No |
Amount ratio per order  
Only applicable to entryType in `4`/`5` | | exitSettingParam | String | No |
Exit setting | | \> tpSlType | String | 是 | Type of set the take-profit and
stop-loss trigger price  
`pnl`: Based on the estimated profit and loss percentage from the entry point  
`price`: Based on price increase or decrease from the crypto’s entry price | |
\> tpPct | String | No | Take-profit percentage | | \> slPct | String | No |
Stop-loss percentage |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                          |
| ------------- | -------- | -------------------------------------------------------- |
| algoId        | String   | Algo ID                                                  |
| algoClOrdId   | String   | Client-supplied Algo ID                                  |
| sCode         | String   | The code of the event execution result, 0 means success. |
| sMsg          | String   | The code of the event execution result, 0 means success. |
