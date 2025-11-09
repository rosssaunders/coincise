# GET / Signals

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-get-signals](https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-get-signals)

### GET / Signals

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/tradingBot/signal/signals`

#### Request Parameters

| Parameter        | Type   | Required | Description        |
| ---------------- | ------ | -------- | ------------------ |
| signalSourceType | String | Yes      | Signal source type |

`1`: Created by yourself  
`2`: Subscribe  
`3`: Free signal | | signalChanId | String | No | Signal channel id | | after |
String | No | Pagination of data to return records `signalChanId` earlier than
the requested timestamp, Unix timestamp format in milliseconds, e.g.
`1597026383085` | | before | String | No | Pagination of data to return records
`signalChanId` newer than the requested timestamp, Unix timestamp format in
milliseconds, e.g. `1597026383085` | | limit | String | No | Number of results
per request. The maximum is 100. The default is 100. |

#### Response Parameters

| **Parameter**    | **Type** | **Description**                              |
| ---------------- | -------- | -------------------------------------------- |
| signalChanId     | String   | Signal channel id                            |
| signalChanName   | String   | Signal channel name                          |
| signalChanDesc   | String   | Signal channel description                   |
| signalChanToken  | String   | User identify when placing orders via signal |
| signalSourceType | String   | Signal source type                           |

`1`: Created by yourself  
`2`: Subscribe  
`3`: Free signal |
