## Query currency deposit and withdrawal data

GET /openApi/wallets/v1/capital/config/getall

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Get information of coins,And query the limit corresponding to the coins

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                     |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| coin           | string | no       | Coin identification                                                                                                             |
| displayName    | string | 否       | The platform displays the currency pair name for display only. Unlike coins, coins need to be used for withdrawal and recharge. |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds                                                                         |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                                                                             |

### Response Parameters

| Parameter Name | Type    | Description                                                                                                                     |
| -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| coin           | string  | Coin identification                                                                                                             |
| displayName    | string  | The platform displays the currency pair name for display only. Unlike coins, coins need to be used for withdrawal and recharge. |
| name           | string  | Coin name                                                                                                                       |
| networkList    | Network | Network information                                                                                                             |

### Data Parameters

|                   | Description                                                          |
| ----------------- | -------------------------------------------------------------------- |
| name              | Network name                                                         |
| network           | Network identification                                               |
| depositEnable     | Whether the currency is enabled for deposit                          |
| depositMin        | Minimum deposit amount                                               |
| minConfirm        | Minimum number of confirmed blocks                                   |
| isDefault         | Is it the default network                                            |
| withdrawEnable    | Is the coin open for withdrawal                                      |
| withdrawFee       | withdraw fee                                                         |
| withdrawMax       | Maximum withdrawal amount(Withdrawal limit)                          |
| withdrawMin       | Minimum withdrawal amount                                            |
| withdrawDesc      | Description of withdrawal                                            |
| withdrawPrecision | Withdrawal precision                                                 |
| depositPrecision  | Deposit precision                                                    |
| contractAddress   | Contract address                                                     |
| needTagOrMemo     | Whether memo or tag is required, true: required, false: not required |

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
> [https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html](https://bingx-api.github.io/docs/#/en-us/common/wallet-api.html)
