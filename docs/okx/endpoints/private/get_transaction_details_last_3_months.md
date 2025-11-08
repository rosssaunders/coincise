# GET / Transaction details (last 3 months)

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-months](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-months)

### GET / Transaction details (last 3 months)

This endpoint can retrieve data from the last 3 months.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/trade/fills-history`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | YES | Instrument type  
`SPOT`  
`MARGIN`  
`SWAP`  
`FUTURES`  
`OPTION` |
| instFamily | String | No | Instrument family  
Applicable to `FUTURES`/`SWAP`/`OPTION` |
| instId | String | No | Instrument ID, e.g. `BTC-USDT` |
| ordId | String | No | Order ID |
| subType | String | No | Transaction type  
`1`: Buy  
`2`: Sell  
`3`: Open long  
`4`: Open short  
`5`: Close long  
`6`: Close short  
`100`: Partial liquidation close long  
`101`: Partial liquidation close short  
`102`: Partial liquidation buy  
`103`: Partial liquidation sell  
`104`: Liquidation long  
`105`: Liquidation short  
`106`: Liquidation buy  
`107`: Liquidation sell  
`110`: Liquidation transfer in  
`111`: Liquidation transfer out  
`118`: System token conversion transfer in  
`119`: System token conversion transfer out  
`112`: Delivery long  
`113`: Delivery short  
`125`: ADL close long  
`126`: ADL close short  
`127`: ADL buy  
`128`: ADL sell  
`212`: Auto borrow of quick margin  
`213`: Auto repay of quick margin  
`204`: block trade buy  
`205`: block trade sell  
`206`: block trade open long  
`207`: block trade open short  
`208`: block trade close long  
`209`: block trade close short  
`236`: Easy convert in  
`237`: Easy convert out  
`270`: Spread trading buy  
`271`: Spread trading sell  
`272`: Spread trading open long  
`273`: Spread trading open short  
`274`: Spread trading close long  
`275`: Spread trading close short  
`324`: Move position buy  
`325`: Move position sell  
`326`: Move position open long  
`327`: Move position open short  
`328`: Move position close long  
`329`: Move position close short  
`376`: Collateralized borrowing auto conversion buy  
`377`: Collateralized borrowing auto conversion sell |
| after | String | No | Pagination of data to return records earlier than the requested `billId` |
| before | String | No | Pagination of data to return records newer than the requested `billId` |
| begin | String | No | Filter with a begin timestamp `ts`. Unix timestamp format in milliseconds, e.g. `1597026383085` |
| end | String | No | Filter with an end timestamp `ts`. Unix timestamp format in milliseconds, e.g. `1597026383085` |
| limit | String | No | Number of results per request. The maximum is `100`; The default is `100` |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instType | String | Instrument type |
| instId | String | Instrument ID |
| tradeId | String | Last trade ID |
| ordId | String | Order ID |
| clOrdId | String | Client Order ID as assigned by the client |
| billId | String | Bill ID |
| subType | String | Transaction type |
| tag | String | Order tag |
| fillPx | String | Last filled price |
| fillSz | String | Last filled quantity |
| fillIdxPx | String | Index price at the moment of trade execution  
For cross currency spot pairs, it returns baseCcy-USDT index price. For example, for LTC-ETH, this field returns the index price of LTC-USDT. |
| fillPnl | String | Last filled profit and loss, applicable to orders which have a trade and aim to close position. It always is 0 in other conditions |
| fillPxVol | String | Implied volatility when filled  
Only applicable to options; return "" for other instrument types |
| fillPxUsd | String | Options price when filled, in the unit of USD  
Only applicable to options; return "" for other instrument types |
| fillMarkVol | String | Mark volatility when filled  
Only applicable to options; return "" for other instrument types |
| fillFwdPx | String | Forward price when filled  
Only applicable to options; return "" for other instrument types |
| fillMarkPx | String | Mark price when filled  
Applicable to `FUTURES`, `SWAP`, `OPTION` |
| side | String | Order side  
`buy`  
`sell` |
| posSide | String | Position side  
`long`  
`short`  
it returns `net` in`net` mode. |
| execType | String | Liquidity taker or maker  
`T`: taker  
`M`: maker  
Not applicable to system orders such as ADL and liquidation |
| feeCcy | String | Trading fee or rebate currency |
| fee | String | The amount of trading fee or rebate. The trading fee deduction is negative, such as '-0.01'; the rebate is positive, such as '0.01'. |
| ts | String | Data generation time, Unix timestamp format in milliseconds, e.g. `1597026383085`. |
| fillTime | String | Trade time which is the same as `fillTime` for the order channel. |
| feeRate | String | Fee rate. This field is returned for `SPOT` and `MARGIN` only |
| tradeQuoteCcy | String | The quote currency for trading. |

tradeId  
When the order category to which the transaction details belong is partial\_liquidation, full\_liquidation, or adl, this field will be assigned a negative value to distinguish it from other matching transaction scenarios.  

ordId  
Order ID, always "" for block trading.  

clOrdId  
Client-supplied order ID, always "" for block trading.

We advise you to use Get Transaction details (last 3 days)when you request data for recent 3 days.
