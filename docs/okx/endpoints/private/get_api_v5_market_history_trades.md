# GET /api/v5/market/history-trades

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-trades-history](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-trades-history)

### GET / Trades history

Retrieve the recent transactions of an instrument from the last 3 months with
pagination.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/history-trades`

#### Request Parameters

| Parameter | Type   | Required | Description                    |
| --------- | ------ | -------- | ------------------------------ |
| instId    | String | Yes      | Instrument ID, e.g. `BTC-USDT` |
| type      | String | No       | Pagination Type                |

`1`: tradeId `2`: timestamp  
The default is `1` | | after | String | No | Pagination of data to return
records earlier than the requested tradeId or ts. | | before | String | No |
Pagination of data to return records newer than the requested tradeId.  
Do not support timestamp for pagination. The latest data will be returned when
using `before` individually | | limit | String | No | Number of results per
request. The maximum and default both are `100` |

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
`0`: normal order  
`1`: Enhanced Liquidity Program order | | ts | String | Trade time, Unix
timestamp format in milliseconds, e.g. `1597026383085`. |
