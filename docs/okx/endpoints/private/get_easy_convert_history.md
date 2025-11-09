# GET / Easy convert history

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-easy-convert-history](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-easy-convert-history)

### GET / Easy convert history

Get the history and status of easy convert trades in the past 7 days.

#### Rate Limit: 1 request per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/trade/easy-convert-history`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                 |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| after     | String | No       | Pagination of data to return records earlier than the requested time (exclude), Unix timestamp format in milliseconds, e.g. `1597026383085` |
| before    | String | No       | Pagination of data to return records newer than the requested time (exclude), Unix timestamp format in milliseconds, e.g. `1597026383085`   |
| limit     | String | No       | Number of results per request. The maximum is 100. The default is 100.                                                                      |

#### Response Parameters

| Parameter  | Type   | Description                                          |
| ---------- | ------ | ---------------------------------------------------- |
| fromCcy    | String | Type of small payment currency convert from          |
| fillFromSz | String | Amount of small payment currency convert from        |
| toCcy      | String | Type of mainstream currency convert to               |
| fillToSz   | String | Amount of mainstream currency convert to             |
| acct       | String | The account where the mainstream currency is located |

`6`: Funding account  
`18`: Trading account | | status | String | Current status of easy convert  
`running`: Running  
`filled`: Filled  
`failed`: Failed | | uTime | String | Trade time, Unix timestamp format in
milliseconds, e.g. `1597026383085` |
