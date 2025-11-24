# GET /api/v5/sprd/public-trades

Source:
[https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-public-trades-public](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-public-trades-public)

### Get public trades (Public)

Retrieve the recent transactions of an instrument (at most 500 records per
request). Results are returned in counter chronological order.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### Permission: Read

#### HTTP Request

`GET /api/v5/sprd/public-trades`

#### Request Parameters

| Parameter | Type   | Required | Description                            |
| --------- | ------ | -------- | -------------------------------------- |
| sprdId    | String | No       | Spread ID, e.g. BTC-USDT_BTC-USDT-SWAP |

#### Response Parameters

| Parameter | Type   | Description              |
| --------- | ------ | ------------------------ |
| sprdId    | String | spread ID                |
| tradeId   | String | Trade ID                 |
| px        | String | Trade price              |
| sz        | String | Trade quantity           |
| side      | String | Trade side of the taker. |

`buy`  
`sell` | | ts | String | Trade time, Unix timestamp format in milliseconds, e.g.
`1597026383085`. |
