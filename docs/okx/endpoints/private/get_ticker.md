# GET / Ticker

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-ticker](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-ticker)

### GET / Ticker

Retrieve the latest price snapshot, best bid/ask price, and trading volume in
the last 24 hours. Best ask price may be lower than the best bid price during
the pre-open period.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/ticker`

#### Request Parameters

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| instId    | String | Yes      | Instrument ID, e.g. `BTC-USD-SWAP` |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                           |
| ------------- | -------- | --------------------------------------------------------- |
| instType      | String   | Instrument type                                           |
| instId        | String   | Instrument ID                                             |
| last          | String   | Last traded price                                         |
| lastSz        | String   | Last traded size. 0 represents there is no trading volume |
| askPx         | String   | Best ask price                                            |
| askSz         | String   | Best ask size                                             |
| bidPx         | String   | Best bid price                                            |
| bidSz         | String   | Best bid size                                             |
| open24h       | String   | Open price in the past 24 hours                           |
| high24h       | String   | Highest price in the past 24 hours                        |
| low24h        | String   | Lowest price in the past 24 hours                         |
| volCcy24h     | String   | 24h trading volume, with a unit of `currency`.            |

If it is a `derivatives` contract, the value is the number of base currency.  
If it is `SPOT`/`MARGIN`, the value is the quantity in quote currency. | |
vol24h | String | 24h trading volume, with a unit of `contract`.  
If it is a `derivatives` contract, the value is the number of contracts.  
If it is `SPOT`/`MARGIN`, the value is the quantity in base currency. | |
sodUtc0 | String | Open price in the UTC 0 | | sodUtc8 | String | Open price in
the UTC 8 | | ts | String | Ticker data generation time, Unix timestamp format
in milliseconds, e.g. `1597026383085`. |
