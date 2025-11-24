# GET /api/v5/sprd/trades

Source:
[https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-trades-last-7-days](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-trades-last-7-days)

### Get trades (last 7 days)

Retrieve historical transaction details **for the last 7 days**. Results are
returned in counter chronological order.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/sprd/trades`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                            |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| sprdId    | String | No       | spread ID, e.g.                                                                                                                        |
| tradeId   | String | No       | Trade ID                                                                                                                               |
| ordId     | String | No       | Order ID                                                                                                                               |
| beginId   | String | No       | Start trade ID the request to begin with. Pagination of data to return records newer than the requested tradeId, not including beginId |
| endId     | String | No       | End trade ID the request to end with. Pagination of data to return records earlier than the requested tradeId, not including endId     |
| begin     | String | No       | Filter with a begin timestamp. Unix timestamp format in milliseconds, e.g. `1597026383085`                                             |
| end       | String | No       | Filter with an end timestamp. Unix timestamp format in milliseconds, e.g. `1597026383085`                                              |
| limit     | String | No       | Number of results per request. The maximum is 100. The default is 100                                                                  |

#### Response Parameters

| Parameter                                        | Type             | Description                                                                                                                        |
| ------------------------------------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| sprdId                                           | String           | spread ID                                                                                                                          |
| tradeId                                          | String           | Trade ID                                                                                                                           |
| ordId                                            | String           | Order ID                                                                                                                           |
| clOrdId                                          | String           | Client Order ID as assigned by the client                                                                                          |
| tag                                              | String           | Order tag                                                                                                                          |
| fillPx                                           | String           | Filled price                                                                                                                       |
| fillSz                                           | String           | Filled quantity                                                                                                                    |
| side                                             | String           | Order side, `buy` `sell`                                                                                                           |
| state                                            | String           | Trade state.                                                                                                                       |
| Valid values are `filled` and `rejected`         |
| execType                                         | String           | Liquidity taker or maker, `T`: taker `M`: maker                                                                                    |
| ts                                               | String           | Data generation time, Unix timestamp format in milliseconds, e.g. `1597026383085`.                                                 |
| legs                                             | Array of objects | Legs of trade                                                                                                                      |
| \> instId                                        | String           | Instrument ID, e.g. BTC-USDT-SWAP                                                                                                  |
| \> px                                            | String           | The price the leg executed                                                                                                         |
| \> sz                                            | String           | The size of each leg                                                                                                               |
| \> szCont                                        | String           | Filled amount of the contract                                                                                                      |
| Only applicable to contracts, return "" for spot |
| \> side                                          | String           | The direction of the leg. Valid value can be `buy` or `sell`.                                                                      |
| \> fillPnl                                       | String           | Last filled profit and loss, applicable to orders which have a trade and aim to close position. It always is 0 in other conditions |
| \> fee                                           | String           | Fee. Negative number represents the user transaction fee charged by the platform. Positive number represents rebate.               |
| \> feeCcy                                        | String           | Fee currency                                                                                                                       |
| \> tradeId                                       | String           | Traded ID in the OKX orderbook.                                                                                                    |
| code                                             | String           | Error Code, the default is 0                                                                                                       |
| msg                                              | String           | Error Message, the default is ""                                                                                                   |
