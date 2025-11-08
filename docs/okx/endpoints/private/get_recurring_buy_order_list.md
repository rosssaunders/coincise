# GET / Recurring buy order list

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-recurring-buy-get-recurring-buy-order-list](https://www.okx.com/docs-v5/en/#order-book-trading-recurring-buy-get-recurring-buy-order-list)

### GET / Recurring buy order list

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/tradingBot/recurring/orders-algo-pending`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| algoId | String | No | Algo ID |
| after | String | No | Pagination of data to return records earlier than the requested `algoId`. |
| before | String | No | Pagination of data to return records newer than the requested `algoId`. |
| limit | String | No | Number of results per request. The maximum is 100. The default is 100 |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| algoId | String | Algo ID |
| algoClOrdId | String | Client-supplied Algo ID |
| instType | String | Instrument type |
| cTime | String | Algo order created time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| uTime | String | Algo order updated time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| algoOrdType | String | Algo order type  
`recurring`: recurring buy |
| state | String | Algo order state  
`running`  
`stopping`  
`pause` |
| stgyName | String | Custom name for trading bot, no more than 40 characters |
| recurringList | Array of objects | Recurring buy info |
| \> ccy | String | Recurring currency, e.g. `BTC` |
| \> ratio | String | Proportion of recurring currency assets, e.g. "0.2" representing 20% |
| period | String | Period  
`monthly`  
`weekly`  
`daily`  
`hourly` |
| recurringDay | String | Recurring buy date  
When the period is `monthly`, the value range is an integer of \[1,28\]  
When the period is `weekly`, the value range is an integer of \[1,7\] |
| recurringHour | String | Recurring buy by hourly  
`1`/`4`/`8`/`12`, e.g. `4` represents "recurring buy every 4 hour" |
| recurringTime | String | Recurring buy time, the value range is an integer of \[0,23\] |
| timeZone | String | UTC time zone, the value range is an integer of \[-12,14\]  
e.g. "8" representing UTC+8 (East 8 District), Beijing Time |
| amt | String | Quantity invested per cycle |
| investmentAmt | String | Accumulate quantity invested |
| investmentCcy | String | The invested quantity unit, can only be `USDT`/`USDC` |
| totalPnl | String | Total P&L |
| totalAnnRate | String | Total annualized rate of yield |
| pnlRatio | String | Rate of yield |
| mktCap | String | Market value in unit of `USDT` |
| cycles | String | Accumulate recurring buy cycles |
| tag | String | Order tag |
| tradeQuoteCcy | String | The quote currency for trading. |
