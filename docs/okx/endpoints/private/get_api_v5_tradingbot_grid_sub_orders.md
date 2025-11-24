# GET /api/v5/tradingBot/grid/sub-orders

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-sub-orders](https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-sub-orders)

### GET / Grid algo sub orders

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/tradingBot/grid/sub-orders`

#### Request Parameters

| Parameter   | Type   | Required | Description     |
| ----------- | ------ | -------- | --------------- |
| algoOrdType | String | Yes      | Algo order type |

`grid`: Spot grid  
`contract_grid`: Contract grid | | algoId | String | Yes | Algo ID | | type |
String | Yes | Sub order state  
`live`  
`filled` | | groupId | String | No | Group ID | | after | String | No |
Pagination of data to return records earlier than the requested `ordId`. | |
before | String | No | Pagination of data to return records newer than the
requested `ordId`. | | limit | String | No | Number of results per request. The
maximum is 100. The default is 100 |

#### Response Parameters

| **Parameter** | **Type** | **Description**         |
| ------------- | -------- | ----------------------- |
| algoId        | String   | Algo ID                 |
| algoClOrdId   | String   | Client-supplied Algo ID |
| instType      | String   | Instrument type         |
| instId        | String   | Instrument ID           |
| algoOrdType   | String   | Algo order type         |

`grid`: Spot grid  
`contract_grid`: Contract grid | | groupId | String | Group ID | | ordId |
String | Sub order ID | | cTime | String | Sub order created time, Unix
timestamp format in milliseconds, e.g. `1597026383085` | | uTime | String | Sub
order updated time, Unix timestamp format in milliseconds, e.g. `1597026383085`
| | tdMode | String | Sub order trade mode  
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
`buy` `sell` | | px | String | Sub order price | | fee | String | Sub order fee
amount | | feeCcy | String | Sub order fee currency | | rebate | String | Sub
order rebate amount | | rebateCcy | String | Sub order rebate currency | | avgPx
| String | Sub order average filled price | | accFillSz | String | Sub order
accumulated fill quantity | | posSide | String | Sub order position side  
`net` | | pnl | String | Sub order profit and loss | | ctVal | String | Contract
value  
Only applicable to `FUTURES`/`SWAP` | | lever | String | Leverage | | tag |
String | Order tag |
