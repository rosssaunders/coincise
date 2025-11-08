# GET order book (Public)

Source: [https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-order-book-public](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-order-book-public)

### Get order book (Public)

Retrieve the order book of the spread.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### Permission: Read

#### HTTP Request

`GET /api/v5/sprd/books`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| sprdId | String | Yes | spread ID, e.g. BTC-USDT\_BTC-USDT-SWAP |
| sz | String | No | Order book depth per side. Maximum value is 400. Default value is 5. |

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| asks | Array of arrays | Order book on sell side |
| bids | Array of arrays | Order book on buy side |
| ts | String | Order book generation time |

An example of the array of asks and bids values: \["411.8", "10", "4"\]  
\- "411.8" is the depth price  
\- "10" is the quantity at the price (Unit: szCcy)  
\- "4" is the number of orders at the price.
