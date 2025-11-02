## Query historical transaction orders

GET /openApi/swap/v1/market/historicalTrades

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

Used to query historical transaction data in the market

rate limitation by IP in group Number: 1

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                              |
| -------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------- |
| fromId         | int64  | no       | From which transaction ID to start returning. By default, it returns the most recent transaction records |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT                                     |
| limit          | int    | no       | The number of returned result sets The default value is 50, the maximum value is 100                     |
| timestamp      | int64  | yes      | request timestamp, unit: millisecond                                                                     |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                      |

### Response Parameters

| Parameter Name | Type   | Description                                                |
| -------------- | ------ | ---------------------------------------------------------- |
| time           | int64  | transaction time                                           |
| isBuyerMaker   | bool   | Whether the buyer is the maker of the order (true / false) |
| price          | string | transaction price                                          |
| qty            | string | transaction quantity                                       |
| quoteQty       | string | turnover                                                   |
| id             | string | transaction ID                                             |

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
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html)
