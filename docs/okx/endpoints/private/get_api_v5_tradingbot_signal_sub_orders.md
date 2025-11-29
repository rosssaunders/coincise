# GET /api/v5/tradingBot/signal/sub-orders

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-get-signal-bot-sub-orders](https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-get-signal-bot-sub-orders)

### GET / Signal bot sub orders

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/tradingBot/signal/sub-orders`

#### Request Parameters

| Parameter                   | Type   | Required    | Description     |
| --------------------------- | ------ | ----------- | --------------- |
| algoId                      | String | Yes         | Algo ID         |
| algoOrdType                 | String | Yes         | Algo order type |
| `contract`: Contract signal |
| state                       | String | Conditional | Sub order state |

`live`  
`partially_filled`  
`filled`  
`cancelled`  
Either `state` or `signalOrdId` is required, if both are passed in, only `state`
is valid. | | signalOrdId | String | Conditional | Sub order ID | | after |
String | No | Pagination of data to return records earlier than the requested
`ordId` | | before | String | No | Pagination of data to return records newer
than the requested `ordId`. | | begin | String | No | Return records of `ctime`
after than the requested timestamp (include), Unix timestamp format in
milliseconds, e.g. `1597026383085` | | end | String | No | Return records of
`ctime` before than the requested timestamp (include), Unix timestamp format in
milliseconds, e.g. `1597026383085` | | limit | String | No | Number of results
per request. The maximum is 100. The default is 100. | | type | String | No |
Sub order type  
`live`  
`filled`  
Either `type` or `clOrdId` is required, if both are passed in, only `clOrdId` is
valid. | | clOrdId | String | No | Sub order client-supplied ID.  
`It will be deprecated soon` |

#### Response Parameters

| **Parameter**                | **Type** | **Description**                                                                     |
| ---------------------------- | -------- | ----------------------------------------------------------------------------------- |
| algoId                       | String   | Algo ID                                                                             |
| algoClOrdId                  | String   | Client-supplied Algo ID. Used to be extended in the future                          |
| instType                     | String   | Instrument type                                                                     |
| instId                       | String   | Instrument ID                                                                       |
| algoOrdType                  | String   | Algo order type                                                                     |
| `contract`: Contract signal  |
| ordId                        | String   | Sub order ID                                                                        |
| clOrdId                      | String   | Sub order client-supplied ID.                                                       |
| It is equal to `signalOrdId` |
| cTime                        | String   | Sub order created time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| uTime                        | String   | Sub order updated time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| tdMode                       | String   | Sub order trade mode                                                                |

Margin mode: `cross`/`isolated`  
Non-Margin mode: `cash` | | ccy | String | Margin currency  
Only applicable to cross MARGIN orders in `Futures mode`. | | ordType | String |
Sub order type  
`market`: Market order  
`limit`: Limit order  
`ioc`: Immediate-or-cancel order | | sz | String | Sub order quantity to buy or
sell | | state | String | Sub order state  
`canceled`  
`live`  
`partially_filled`  
`filled`  
`cancelling` | | side | String | Sub order side  
`buy`,`sell` | | px | String | Sub order price | | fee | String | Sub order fee
amount | | feeCcy | String | Sub order fee currency | | avgPx | String | Sub
order average filled price | | accFillSz | String | Sub order accumulated fill
quantity | | posSide | String | Sub order position side  
`net` | | pnl | String | Sub order profit and loss | | ctVal | String | Contract
value  
Only applicable to `FUTURES`/`SWAP` | | lever | String | Leverage | | tag |
String | Order tag |
