## Query transaction details

GET /openApi/spot/v1/trade/myTrades

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

- Can only check data within the past 7 days range

- If trigTime/endTime is not filled in or invalid, the data of the past 24 hours
  is returned by default

- Simultaneously limit the maximum number of returns limit = 500

- Return to the list sorted by time field, from smallest to largest

### Request Parameters

| Parameter Name | Type    | Required | Description                                                       |
| -------------- | ------- | -------- | ----------------------------------------------------------------- |
| symbol         | string  | Yes      | Trading pair, e.g. BTC-USDT, please use uppercase letters         |
| orderId        | long    | no       | Order ID                                                          |
| startTime      | long    | No       | Start timestamp, unit: ms                                         |
| endTime        | long    | No       | End timestamp, unit: ms                                           |
| fromId         | long    | No       | Starting trade ID. By default, the latest trade will be retrieved |
| limit          | long    | No       | Default 500, maximum 1000                                         |
| recvWindow     | float64 | No       | Request valid time window, unit: milliseconds                     |
| timestamp      | int64   | Yes      | Request timestamp, unit: milliseconds                             |

### Response Parameters

| Parameter Name  | Type    | Description                 |
| --------------- | ------- | --------------------------- |
| symbol          | string  | Trading symbol              |
| id              | int     | Trade ID                    |
| orderId         | int64   | Order ID                    |
| price           | string  | Price of the trade          |
| qty             | string  | Quantity of the trade       |
| quoteQty        | string  | Quote asset quantity traded |
| commission      | float64 | Commission amount           |
| commissionAsset | string  | Commission asset type       |
| time            | int64   | Trade time                  |
| isBuyer         | bool    | Whether the buyer           |
| isMaker         | bool    | Whether the maker           |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html](https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html)
