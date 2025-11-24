# GET /api/v5/trade/one-click-repay-history-v2

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-one-click-repay-history-new](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-one-click-repay-history-new)

### GET / One-click repay history (New)

Get the history and status of one-click repay trades in the past 7 days. Only
applicable to `SPOT mode`.

#### Rate Limit: 1 request per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/trade/one-click-repay-history-v2`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                        |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| after     | String | No       | Pagination of data to return records earlier than (included) the requested time `ts` , Unix timestamp format in milliseconds, e.g. `1597026383085` |
| before    | String | No       | Pagination of data to return records newer than (included) the requested time `ts`, Unix timestamp format in milliseconds, e.g. `1597026383085`    |
| limit     | String | No       | Number of results per request. The maximum is 100. The default is 100.                                                                             |

#### Response Parameters

| Parameter    | Type             | Description                                |
| ------------ | ---------------- | ------------------------------------------ |
| debtCcy      | String           | Debt currency                              |
| repayCcyList | Array of strings | Repay currency list, e.g. \["USDC","BTC"\] |
| fillDebtSz   | String           | Amount of debt currency transacted         |
| status       | String           | Current status of one-click repay          |

`running`: Running  
`filled`: Filled  
`failed`: Failed | | ordIdInfo | Array of objects | Order info | | \> ordId |
String | Order ID | | \> instId | String | Instrument ID, e.g. `BTC-USDT` | | \>
ordType | String | Order type  
`ioc`: Immediate-or-cancel order | | \> side | String | Side  
`buy`  
`sell` | | \> px | String | Price | | \> sz | String | Quantity to buy or sell |
| \> fillPx | String | Last filled price.  
If none is filled, it will return "". | | \> fillSz | String | Last filled
quantity | | \> state | String | State  
`filled`  
`canceled` | | \> cTime | String | Creation time for order, Unix timestamp
format in milliseconds, e.g. `1597026383085` | | ts | String | Request time,
Unix timestamp format in milliseconds, e.g. `1597026383085` |
