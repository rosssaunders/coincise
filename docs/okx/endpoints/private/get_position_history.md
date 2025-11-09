# GET / Position history

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-get-position-history](https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-get-position-history)

### GET / Position history

Retrieve the updated position data for the last 3 months. Return in reverse
chronological order using utime.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/tradingBot/signal/positions-history`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                         |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| algoId    | String | Yes      | Algo ID                                                                                                                             |
| instId    | String | No       | Instrument ID, e.g.：`BTC-USD-SWAP`                                                                                                 |
| after     | String | No       | Pagination of data to return records earlier than the requested `uTime`, Unix timestamp format in milliseconds, e.g.`1597026383085` |
| before    | String | No       | Pagination of data to return records newer than the requested `uTime`, Unix timestamp format in milliseconds, e.g `1597026383085`   |
| limit     | String | No       | Number of results per request. The maximum is 100. The default is 100.                                                              |

#### Response Parameters

| **Parameter** | **Type** | **Description**                   |
| ------------- | -------- | --------------------------------- |
| instId        | String   | Instrument ID                     |
| mgnMode       | String   | Margin mode `cross` `isolated`    |
| cTime         | String   | Created time of position          |
| uTime         | String   | Updated time of position          |
| openAvgPx     | String   | Average price of opening position |
| closeAvgPx    | String   | Average price of closing position |
| pnl           | String   | Profit and loss                   |
| pnlRatio      | String   | P&L ratio                         |
| lever         | String   | Leverage                          |
| direction     | String   | Direction: `long` `short`         |
| uly           | String   | Underlying                        |
