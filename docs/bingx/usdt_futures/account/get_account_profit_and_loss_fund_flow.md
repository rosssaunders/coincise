## Get Account Profit and Loss Fund Flow

GET /openApi/swap/v2/user/income

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Query the capital flow of the perpetual contract under the current account.

- If neither startTime nor endTime is sent, only the data of the last 7 days
  will be returned.

- If the incomeType is not sent, return all types of account profit and loss
  fund flow.

- Only keep the last 3 months data.

### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| incomeType     | string | no       | Income type, see remarks                                             |
| startTime      | int64  | no       | start time                                                           |
| endTime        | int64  | no       | end time                                                             |
| limit          | int64  | no       | Number of result sets to return Default: 100 Maximum: 1000           |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                    |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                  |

### Response Parameters

| Parameter Name | Type   | Description                                                                                         |
| -------------- | ------ | --------------------------------------------------------------------------------------------------- |
| symbol         | string | trading pair, for example: BTC-USDT                                                                 |
| incomeType     | string | money flow type                                                                                     |
| income         | string | The amount of capital flow, positive numbers represent inflows, negative numbers represent outflows |
| asset          | string | asset content                                                                                       |
| info           | string | Remarks, depending on the type of stream                                                            |
| time           | int64  | time, unit: millisecond                                                                             |
| tranId         | string | transfer id                                                                                         |
| tradeId        | string | The original transaction ID that caused the transaction                                             |

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html)
