# DELETE /openApi/swap/v2/trade/allOpenOrders

**Source:**
[/openApi/swap/v2/trade/allOpenOrders](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Cancel All Open Orders

DELETE /openApi/swap/v2/trade/allOpenOrders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT,if you do not fill this field,will delete all type of orders                                                                                                                                                                                                                                                              |
| type           | string | no       | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order / TRAILING_TP_SL: Trailing TakeProfit or StopLoss |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                                                                                                                                                                                                                                                                                                                                              |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                                                                                                                                                                                                                                                                                            |

### Response Parameters

| Parameter Name | Type | Description                          |
| -------------- | ---- | ------------------------------------ |
| success        | LIST | list of successfully canceled orders |
| failed         | LIST | list of failed orders                |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
