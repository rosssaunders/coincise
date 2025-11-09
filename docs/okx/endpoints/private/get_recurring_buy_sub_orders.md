# GET / Recurring buy sub orders

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-recurring-buy-get-recurring-buy-sub-orders](https://www.okx.com/docs-v5/en/#order-book-trading-recurring-buy-get-recurring-buy-sub-orders)

### GET / Recurring buy sub orders

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/tradingBot/recurring/sub-orders`

#### Request Parameters

| Parameter | Type   | Required | Description                                                               |
| --------- | ------ | -------- | ------------------------------------------------------------------------- |
| algoId    | String | Yes      | Algo ID                                                                   |
| ordId     | String | No       | Sub order ID                                                              |
| after     | String | No       | Pagination of data to return records earlier than the requested `algoId`. |
| before    | String | No       | Pagination of data to return records newer than the requested `algoId`.   |
| limit     | String | No       | Number of results per request. The maximum is 100. The default is 100     |

#### Response Parameters

| **Parameter**              | **Type** | **Description**                                                                     |
| -------------------------- | -------- | ----------------------------------------------------------------------------------- |
| algoId                     | String   | Algo ID                                                                             |
| instType                   | String   | Instrument type                                                                     |
| instId                     | String   | Instrument ID                                                                       |
| algoOrdType                | String   | Algo order type                                                                     |
| `recurring`: recurring buy |
| ordId                      | String   | Sub order ID                                                                        |
| cTime                      | String   | Sub order created time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| uTime                      | String   | Sub order updated time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| tdMode                     | String   | Sub order trade mode                                                                |

Margin mode : `cross`  
Non-Margin mode : `cash` | | ordType | String | Sub order type  
`market`: Market order | | sz | String | Sub order quantity to buy or sell | |
state | String | Sub order state  
`canceled`  
`live`  
`partially_filled`  
`filled`  
`cancelling` | | side | String | Sub order side  
`buy` `sell` | | px | String | Sub order limit price  
If it's a market order, "-1" will be return | | fee | String | Sub order fee | |
feeCcy | String | Sub order fee currency | | avgPx | String | Sub order average
filled price | | accFillSz | String | Sub order accumulated fill quantity | |
tag | String | Order tag | | algoClOrdId | String | Client-supplied Algo ID |
