## Cancel an Order

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Cancel an order that the current account is in the current entrusted state.

DELETE /openApi/cswap/v1/trade/cancelOrder

### Request Parameters

| Parameter Name | Type   | Required | Description                                                         |
| -------------- | ------ | -------- | ------------------------------------------------------------------- |
| orderId        | int64  | no       | Order ID                                                            |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USD |
| clientOrderId  | string | no       | Customized order ID for users                                       |
| timestamp      | int64  | yes      | request timestamp, unit: millisecond                                |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                 |

### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                                                  |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| time           | int64  | order time, unit: millisecond                                                                                                                                                                                                                                                                                                                |
| symbol         | string | trading pair, for example: BTC-USD                                                                                                                                                                                                                                                                                                           |
| side           | string | buying and selling direction                                                                                                                                                                                                                                                                                                                 |
| type           | string | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order |
| positionSide   | string | position side                                                                                                                                                                                                                                                                                                                                |
| cumQuote       | string | transaction amount                                                                                                                                                                                                                                                                                                                           |
| status         | string | order status                                                                                                                                                                                                                                                                                                                                 |
| stopPrice      | string | Trigger price                                                                                                                                                                                                                                                                                                                                |
| price          | string | Price                                                                                                                                                                                                                                                                                                                                        |
| origQty        | string | original order quantity                                                                                                                                                                                                                                                                                                                      |
| avgPrice       | string | average transaction price                                                                                                                                                                                                                                                                                                                    |
| executedQty    | string | volume                                                                                                                                                                                                                                                                                                                                       |
| orderId        | int64  | Order ID                                                                                                                                                                                                                                                                                                                                     |
| profit         | string | profit and loss                                                                                                                                                                                                                                                                                                                              |
| commission     | string | Fee                                                                                                                                                                                                                                                                                                                                          |
| updateTime     | int64  | update time, unit: millisecond                                                                                                                                                                                                                                                                                                               |
| clientOrderId  | string | Customized order ID for users                                                                                                                                                                                                                                                                                                                |

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
> [https://bingx-api.github.io/docs//#/en-us/cswap/trade-api.html](https://bingx-api.github.io/docs//#/en-us/cswap/trade-api.html)
