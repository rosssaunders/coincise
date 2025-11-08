# GET / Grid algo order history

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-order-history](https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-order-history)

### GET / Grid algo order history

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/tradingBot/grid/orders-algo-history`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| algoOrdType | String | Yes | Algo order type  
`grid`: Spot grid  
`contract_grid`: Contract grid |
| algoId | String | No | Algo ID |
| instId | String | No | Instrument ID, e.g. `BTC-USDT` |
| instType | String | No | Instrument type  
`SPOT`  
`MARGIN`  
`FUTURES`  
`SWAP` |
| after | String | No | Pagination of data to return records earlier than the requested `algoId`. |
| before | String | No | Pagination of data to return records newer than the requested `algoId`. |
| limit | String | No | Number of results per request. The maximum is 100. The default is 100. |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| algoId | String | Algo ID |
| algoClOrdId | String | Client-supplied Algo ID |
| instType | String | Instrument type |
| instId | String | Instrument ID |
| cTime | String | Algo order created time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| uTime | String | Algo order updated time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| algoOrdType | String | Algo order type  
`grid`: Spot grid  
`contract_grid`: Contract grid |
| state | String | Algo order state  
`stopped` |
| rebateTrans | Array of objects | Rebate transfer info |
| \> rebate | String | Rebate amount |
| \> rebateCcy | String | Rebate currency |
| triggerParams | Array of objects | Trigger Parameters |
| \> triggerAction | String | Trigger action  
`start`  
`stop` |
| \> triggerStrategy | String | Trigger strategy  
`instant`  
`price`  
`rsi` |
| \> delaySeconds | String | Delay seconds after action triggered |
| \> triggerTime | String | Actual action triggered time, unix timestamp format in milliseconds, e.g. `1597026383085` |
| \> triggerType | String | Actual action triggered type  
`manual`  
`auto` |
| \> timeframe | String | K-line type  
`3m`, `5m`, `15m`, `30m` (`m`: minute)  
`1H`, `4H` (`H`: hour)  
`1D` (`D`: day)  
This field is only valid when `triggerStrategy` is `rsi` |
| \> thold | String | Threshold  
The value should be an integer between 1 to 100  
This field is only valid when `triggerStrategy` is `rsi` |
| \> triggerCond | String | Trigger condition  
`cross_up`  
`cross_down`  
`above`  
`below`  
`cross`  
This field is only valid when `triggerStrategy` is `rsi` |
| \> timePeriod | String | Time Period  
`14`  
This field is only valid when `triggerStrategy` is `rsi` |
| \> triggerPx | String | Trigger Price  
This field is only valid when `triggerStrategy` is `price` |
| \> stopType | String | Stop type  
Spot grid `1`: Sell base currency `2`: Keep base currency  
Contract grid `1`: Market Close All positions `2`: Keep positions  
This field is only valid when `triggerAction` is `stop` |
| maxPx | String | Upper price of price range |
| minPx | String | Lower price of price range |
| gridNum | String | Grid quantity |
| runType | String | Grid type  
`1`: Arithmetic, `2`: Geometric |
| tpTriggerPx | String | Take-profit trigger price |
| slTriggerPx | String | Stop-loss trigger price |
| arbitrageNum | String | The number of arbitrages executed |
| totalPnl | String | Total P&L |
| pnlRatio | String | P&L ratio |
| investment | String | Accumulated investment amount  
Spot grid investment amount calculated on quote currency |
| gridProfit | String | Grid profit |
| floatProfit | String | Variable P&L |
| cancelType | String | Algo order stop reason  
`0`: None  
`1`: Manual stop  
`2`: Take profit  
`3`: Stop loss  
`4`: Risk control  
`5`: Delivery  
`6`: Signal |
| stopType | String | Actual Stop type  
Spot grid `1`: Sell base currency `2`: Keep base currency  
Contract grid `1`: Market Close All positions `2`: Keep positions |
| quoteSz | String | Quote currency investment amount  
Only applicable to `Spot grid` |
| baseSz | String | Base currency investment amount  
Only applicable to `Spot grid` |
| direction | String | Contract grid type  
`long`,`short`,`neutral`  
Only applicable to `contract grid` |
| basePos | Boolean | Whether or not to open a position when the strategy is activated  
Only applicable to `contract grid` |
| sz | String | Used margin based on `USDT`  
Only applicable to `contract grid` |
| lever | String | Leverage  
Only applicable to `contract grid` |
| actualLever | String | Actual Leverage  
Only applicable to `contract grid` |
| liqPx | String | Estimated liquidation price  
Only applicable to `contract grid` |
| uly | String | Underlying  
Only applicable to `contract grid` |
| instFamily | String | Instrument family  
Only applicable to `FUTURES`/`SWAP`/`OPTION`  
Only applicable to `contract grid` |
| ordFrozen | String | Margin used by pending orders  
Only applicable to `contract grid` |
| availEq | String | Available margin  
Only applicable to `contract grid` |
| tag | String | Order tag |
| profitSharingRatio | String | Profit sharing ratio  
Value range \[0, 0.3\]  
If it is a normal order (neither copy order nor lead order), this field returns "" |
| copyType | String | Profit sharing order type  
`0`: Normal order  
`1`: Copy order without profit sharing  
`2`: Copy order with profit sharing  
`3`: Lead order |
| fee | String | Accumulated fee. Only applicable to contract grid, or it will be "" |
| fundingFee | String | Accumulated funding fee. Only applicable to contract grid, or it will be "" |
| stopResult | String | Stop result  
`0`: default, `1`: Successful selling of currency at market price, `-1`: Failed to sell currency at market price  
Only applicable to `Spot grid` |
| tradeQuoteCcy | String | The quote currency for trading. |
