# POST /api/v5/tradingBot/recurring/order-algo

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-recurring-buy-post-place-recurring-buy-order](https://www.okx.com/docs-v5/en/#order-book-trading-recurring-buy-post-place-recurring-buy-order)

### POST / Place recurring buy order

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/tradingBot/recurring/order-algo`

#### Request Parameters

| Parameter     | Type             | Required | Description                                                          |
| ------------- | ---------------- | -------- | -------------------------------------------------------------------- |
| stgyName      | String           | Yes      | Custom name for trading bot, no more than 40 characters              |
| recurringList | Array of objects | Yes      | Recurring buy info                                                   |
| \> ccy        | String           | Yes      | Recurring currency, e.g. `BTC`                                       |
| \> ratio      | String           | Yes      | Proportion of recurring currency assets, e.g. "0.2" representing 20% |
| period        | String           | Yes      | Period                                                               |

`monthly`  
`weekly`  
`daily`  
`hourly` | | recurringDay | String | Conditional | Recurring buy date  
When the period is `monthly`, the value range is an integer of \[1,28\]  
When the period is `weekly`, the value range is an integer of \[1,7\]  
When the period is `daily`/`hourly`, the parameter is not required. | |
recurringHour | String | Conditional | Recurring buy by hourly  
`1`/`4`/`8`/`12`, e.g. `4` represents "recurring buy every 4 hour"  
When the period is `hourly`, the parameter is required. | | recurringTime |
String | Yes | Recurring buy time, the value range is an integer of \[0,23\]  
When the period is `hourly`, the parameter is the time of the first investment
occurs. | | timeZone | String | Yes | UTC time zone, the value range is an
integer of \[-12,14\]  
e.g. "8" representing UTC+8 (East 8 District), Beijing Time | | amt | String |
Yes | Quantity invested per cycle | | investmentCcy | String | Yes | The
invested quantity unit, can only be `USDT`/`USDC` | | tdMode | String | Yes |
Trading mode  
Margin mode: `cross`  
Non-Margin mode: `cash` | | algoClOrdId | String | No | Client-supplied Algo
ID  
There will be a value when algo order attaching algoClOrdId is triggered, or it
will be "".  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up
to 32 characters. | | tag | String | No | Order tag  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up
to 16 characters. | | tradeQuoteCcy | String | No | The quote currency for
trading. |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                         |
| ------------- | -------- | ------------------------------------------------------- |
| algoId        | String   | Algo ID                                                 |
| algoClOrdId   | String   | Client-supplied Algo ID                                 |
| sCode         | String   | The code of the event execution result, 0 means success |
| sMsg          | String   | Rejection message if the request is unsuccessful        |
| tag           | String   | Order tag                                               |
