## Order Book aggregation

GET /openApi/spot/v2/market/depth

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

Interface Parameters

rate limitation by IP in group Number: 1

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                           |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, such as: BTC-USDT                                                       |
| depth          | int64  | Yes      | Query depth                                                                           |
| type           | string | Yes      | step0 default precision, step1 to step5 are 10 to 100000 times precision respectively |

### Response Parameters

| Parameter Name | Type  | Description                                                                                          |
| -------------- | ----- | ---------------------------------------------------------------------------------------------------- |
| bids           | array | Buy depth, where the first element of the array is the price and the second element is the quantity  |
| asks           | array | Sell depth, where the first element of the array is the price and the second element is the quantity |
| ts             | int64 | Timestamp                                                                                            |

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
> [https://bingx-api.github.io/docs/#/en-us/spot/market-api.html](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html)
