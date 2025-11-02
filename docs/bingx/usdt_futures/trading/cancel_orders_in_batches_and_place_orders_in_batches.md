## Cancel orders in batches and place orders in batches

POST /openApi/swap/v1/trade/batchCancelReplace

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

This api is used to cancel orders in batches and place orders in batches.

### Request Parameters

| Parameter Name | Type   | Required | Description                                         |
| -------------- | ------ | -------- | --------------------------------------------------- |
| batchOrders    | string | yes      | A batch of orders, string form of LIST              |
| timestamp      | int64  | yes      | request timestamp, unit: millisecond                |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds |

### Response Parameters

| Parameter Name | Type          | Description                                                              |
| -------------- | ------------- | ------------------------------------------------------------------------ |
| code           | Int64         | error code, 0 means successfully response, others means response failure |
| msg            | string        | Error Details Description                                                |
| OrderResponse  | OrderResponse |                                                                          |

### Data Parameters

|                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type           | Only supports type: STOP_MARKET/STOP, TAKE_PROFIT_MARKET/TAKE_PROFIT                                                                                                                                                                                                                                                                                                                                                                                      |
| stopPrice      | Trigger price, only for STOP_MARKET, TAKE_PROFIT_MARKET, STOP, TAKE_PROFIT                                                                                                                                                                                                                                                                                                                                                                                |
| price          | Order price                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| workingType    | Trigger price type for stopPrice: MARK_PRICE, CONTRACT_PRICE, default is MARK_PRICE. When the type is STOP or STOP_MARKET, and stopGuaranteed is true, the workingType must only be CONTRACT_PRICE.                                                                                                                                                                                                                                                       |
| stopGuaranteed | true: Enables the guaranteed stop-loss and take-profit feature; false: Disables the feature. The guaranteed stop-loss feature is not enabled by default. Supported order types include: STOP_MARKET: Market stop-loss order / TAKE_PROFIT_MARKET: Market take-profit order / STOP: Limit stop-loss order / TAKE_PROFIT: Limit take-profit order / TRIGGER_LIMIT: Stop-limit order with trigger / TRIGGER_MARKET: Market order with trigger for stop-loss. |

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
