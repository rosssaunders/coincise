# GET /api/v5/market/trades

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-trades](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-trades)

### GET / Trades

Retrieve the recent transactions of an instrument.

#### Rate Limit: 100 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/trades`

#### Request Parameters

| Parameter | Type   | Required | Description                                                               |
| --------- | ------ | -------- | ------------------------------------------------------------------------- |
| instId    | String | Yes      | Instrument ID, e.g. `BTC-USDT`                                            |
| limit     | String | No       | Number of results per request. The maximum is `500`; The default is `100` |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| instId        | String   | Instrument ID   |
| tradeId       | String   | Trade ID        |
| px            | String   | Trade price     |
| sz            | String   | Trade quantity  |

For spot trading, the unit is base currency  
For `FUTURES`/`SWAP`/`OPTION`, the unit is contract. | | side | String | Trade
side of taker  
`buy`  
`sell` | | source | String | Order source  
`0`: normal | | ts | String | Trade time, Unix timestamp format in milliseconds,
e.g. `1597026383085`. |

Up to 500 most recent historical public transaction data can be retrieved.
