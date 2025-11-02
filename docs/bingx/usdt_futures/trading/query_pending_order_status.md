## Query pending order status

GET /openApi/swap/v2/trade/openOrder

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Query order details

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                |
| -------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT                                                       |
| orderId        | int64  | no       | Order ID                                                                                                                   |
| clientOrderId  | string | no       | Customized order ID for users, with a limit of characters from 1 to 40. Different orders cannot use the same clientOrderId |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                                                                          |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                        |

### Response Parameters

| Parameter Name | Type   | Description                                                                                                                                                                                                                                                                                                                                  |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| time           | int64  | order time, unit: millisecond                                                                                                                                                                                                                                                                                                                |
| symbol         | string | trading pair, for example: BTC-USDT                                                                                                                                                                                                                                                                                                          |
| side           | string | buying and selling direction                                                                                                                                                                                                                                                                                                                 |
| type           | string | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order |
| positionSide   | string | Position direction, required for single position as BOTH, for both long and short positions only LONG or SHORT can be chosen, defaults to LONG if empty                                                                                                                                                                                      |
| reduceOnly     | string | true, false; Default value is false for single position mode; This parameter is not accepted for both long and short positions mode                                                                                                                                                                                                          |
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
| workingType    | string | StopPrice trigger price types: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE                                                                                                                                                                                                                                                                |
| clientOrderId  | string | Customized order ID for users                                                                                                                                                                                                                                                                                                                |

### Data Parameters

|     | Description |
| --- | ----------- |
| NEW | New Order   |

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
| 80016      | order does not exist                                                                                                                                         |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
