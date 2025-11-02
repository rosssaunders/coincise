## Old Trade Lookup

GET /openApi/market/his/v1/trade

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

rate limitation by IP in group Number: 1

### Request Parameters

| Parameter Name | Type   | Required | Description                                                |
| -------------- | ------ | -------- | ---------------------------------------------------------- |
| symbol         | string | yes      | Trading pair, e.g., BTC-USDT, please use uppercase letters |
| limit          | int    | no       | Default 100, maximum 500                                   |
| fromId         | string | no       | The last recorded tid                                      |

### Response Parameters

| Parameter Name | Type    | Description |
| -------------- | ------- | ----------- |
| id             | long    | Trade id    |
| price          | float64 | Price       |
| qty            | float64 | Quantity    |
| time           | long    | Time        |
| buyerMaker     | boolean | Buyer maker |

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
