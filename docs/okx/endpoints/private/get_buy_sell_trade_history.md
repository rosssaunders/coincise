# GET buy/sell trade history

Source: [https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-buy-sell-trade-history](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-buy-sell-trade-history)

### Get buy/sell trade history

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/fiat/buy-sell/history`

#### Request Parameters

| Parameters | Types | Required | Description |
| --- | --- | --- | --- |
| ordId | String | No | Order ID |
| clOrdId | String | No | Client Order ID as assigned by the client  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| state | String | No | Trade state  
`processing`  
`completed`  
`failed` |
| begin | String | No | Filter with a begin timestamp. Unix timestamp format in milliseconds, e.g. `1597026383085` |
| end | String | No | Filter with an end timestamp. Unix timestamp format in milliseconds, e.g. `1597026383085` |
| limit | String | No | Number of results per request. The maximum is 100. The default is 100. |

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| ordId | String | Order ID |
| clOrdId | String | Client Order ID as assigned by the client |
| quoteId | String | Quote ID |
| state | String | Trade state  
`processing`  
`completed`  
`failed` |
| fromCcy | String | Currency to sell |
| toCcy | String | Currency to buy |
| rfqAmt | String | RFQ amount |
| rfqCcy | String | RFQ currency |
| fillPx | String | Filled price based on quote currency |
| fillQuoteCcy | String | Filled price quote currency  
e.g. `USD` |
| fillFromAmt | String | Filled amount unit in fromCcy |
| fillToAmt | String | Filled amount unit in toCcy |
| cTime | String | Request time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| uTime | String | Updated time, Unix timestamp format in milliseconds, e.g. `1597026383085` |

This feature is only available to Bahamas institutional users at the moment.
