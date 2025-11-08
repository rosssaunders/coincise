# GET / Signal bot order details

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-get-signal-bot-order-details](https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-get-signal-bot-order-details)

### GET / Signal bot order details

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/tradingBot/signal/orders-algo-details`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| algoOrdType | String | Yes | Algo order type  
`contract`: Contract signal |
| algoId | String | Yes | Algo ID |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| algoId | String | Algo ID |
| algoClOrdId | String | Client-supplied Algo ID |
| instType | String | Instrument type |
| instIds | Array of strings | Instrument IDs |
| cTime | String | Algo order created time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| uTime | String | Algo order updated time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| algoOrdType | String | Algo order type  
`contract`: Contract signal |
| state | String | Algo order state  
`starting`  
`running`  
`stopping`  
`stopped` |
| cancelType | String | Algo order stop reason  
`0`: None  
`1`: Manual stop |
| totalPnl | String | Total P&L |
| totalPnlRatio | String | Total P&L ratio |
| totalEq | String | Total equity of strategy account |
| floatPnl | String | Float P&L |
| realizedPnl | String | Realized P&L |
| frozenBal | String | Frozen balance |
| availBal | String | Avail balance |
| lever | String | Leverage  
Only applicable to `contract signal` |
| investAmt | String | Investment amount |
| subOrdType | String | Sub order type  
`1`：limit order  
`2`：market order  
`9`：tradingView signal |
| ratio | String | Price offset ratio, calculate the limit price as a percentage offset from the best bid/ask price  
Only applicable to `subOrdType` is `limit order` |
| entrySettingParam | Object | Entry setting |
| \> allowMultipleEntry | Boolean | Whether or not allow multiple entries in the same direction for the same trading pairs |
| \> entryType | String | Entry type  
`1`: TradingView signal  
`2`: Fixed margin  
`3`: Contracts  
`4`: Percentage of free margin  
`5`: Percentage of the initial invested margin |
| \> amt | String | Amount per order  
Only applicable to `entryType` in `2`/`3` |
| \> ratio | String | Amount ratio per order  
Only applicable to `entryType` in `4`/`5` |
| exitSettingParam | Object | Exit setting |
| \> tpSlType | String | Type of set the take-profit and stop-loss trigger price  
`pnl`: Based on the estimated profit and loss percentage from the entry point  
`price`: Based on price increase or decrease from the crypto’s entry price |
| \> tpPct | String | Take-profit percentage |
| \> slPct | String | Stop-loss percentage |
| signalChanId | String | Signal channel Id |
| signalChanName | String | Signal channel name |
| signalSourceType | String | Signal source type  
`1`: Created by yourself  
`2`: Subscribe  
`3`: Free signal |
