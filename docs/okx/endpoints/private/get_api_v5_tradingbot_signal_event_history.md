# GET /api/v5/tradingBot/signal/event-history

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-get-signal-bot-event-history](https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-get-signal-bot-event-history)

### GET / Signal bot event history

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/tradingBot/signal/event-history`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                         |
| --------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| algoId    | String | Yes      | Algo ID                                                                                                                                             |
| after     | String | No       | Pagination of data to return records `eventCtime` earlier than the requested timestamp, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| before    | String | No       | Pagination of data to return records `eventCtime` newer than the requested timestamp, Unix timestamp format in milliseconds, e.g. `1597026383085`   |
| limit     | String | No       | Number of results per request. The maximum is 100. The default is 100.                                                                              |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| alertMsg      | String   | Alert message   |
| algoId        | String   | Algo ID         |
| eventType     | String   | Event type      |

`system_action`  
`user_action`  
`signal_processing` | | eventCtime | String | Event timestamp of creation. Unix
timestamp format in milliseconds, e.g. `1597026383085` | | eventUtime | String |
Event timestamp of update. Unix timestamp format in milliseconds, e.g.
`1597026383085` | | eventProcessMsg | String | Event process message | |
eventStatus | String | Event status  
`success`  
`failure` | | triggeredOrdData | Array of objects | Triggered sub order data | |
\> clOrdId | String | Sub order client-supplied id |
