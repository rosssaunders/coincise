## Isolated Margin Change History

GET /openApi/swap/v1/positionMargin/history

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Used to query the history of margin adjustments for U-margin contracts in the
last 30 days.

### Request Parameters

| Parameter Name | Type   | Required | Description                                                            |
| -------------- | ------ | -------- | ---------------------------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, e.g.: BTC-USDT, please use uppercase letters             |
| positionId     | string | Yes      | Position ID                                                            |
| startTime      | int64  | Yes      | Start timestamp, in milliseconds                                       |
| endTime        | int64  | Yes      | End timestamp, in milliseconds                                         |
| pageIndex      | int64  | Yes      | Page number, must be greater than 0, if not provided, the default is 1 |
| pageSize       | int64  | Yes      | Page size, must be greater than 0, maximum value is 100                |
| timestamp      | int64  | Yes      | Request timestamp, in milliseconds                                     |
| recvWindow     | int64  | No       | Request valid window value, in milliseconds                            |

### Response Parameters

| Parameter Name    | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol            | string | Trading pair, e.g.: BTC-USDT                                                                                                                                                                                                                                                                                                                                                                                                                             |
| positionId        | string | Position ID                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| changeReason      | string | ManualMarginAddition: Manually add margin / ManualMarginReduction: Reduce margin manually / IncreaseLeverage: Increase leverage / ReduceLeverage: Reduce leverage / OpenPosition: Open position / ClosePosition: Close position / Liquidation: Liquidation / ADL:Automatically reduce positions / CloseOpenPosition : Close first and then open a position /FundingFeeSettlement: Funding rate settlement/ AutoMarginAddition: Automatic margin addition |
| marginChange      | string | change amount                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| marginAfterChange | string | Total amount after change                                                                                                                                                                                                                                                                                                                                                                                                                                |
| time              | int64  | Change time                                                                                                                                                                                                                                                                                                                                                                                                                                              |

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
