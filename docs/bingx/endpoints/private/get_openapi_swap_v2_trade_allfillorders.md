# GET /openApi/swap/v2/trade/allFillOrders

**Source:**
[/openApi/swap/v2/trade/allFillOrders](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query historical transaction orders

GET /openApi/swap/v2/trade/allFillOrders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                     |
| -------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| orderId        | int64  | no       | If orderId is provided, only the filled orders of that orderId are returned                                                                     |
| currency       | string | no       | USDC or USDT                                                                                                                                    |
| tradingUnit    | string | yes      | Trading unit, optional values: COIN,CONT; COIN directly represent assets such as BTC and ETH, and CONT represents the number of contract sheets |
| startTs        | int64  | yes      | Starting timestamp in milliseconds                                                                                                              |
| endTs          | int64  | yes      | End timestamp in milliseconds                                                                                                                   |
| timestamp      | int64  | yes      | request timestamp, unit: millisecond                                                                                                            |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                                             |

### Response Parameters

| Parameter Name        | Type   | Description                                                                                                                                                                                                                                                                                                                                  |
| --------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filledTm              | string | Transaction time, format: 2024-10-24T17:13:12Z                                                                                                                                                                                                                                                                                               |
| symbol                | string | trading pair, for example: BTC-USDT                                                                                                                                                                                                                                                                                                          |
| volume                | string | Transaction quantity                                                                                                                                                                                                                                                                                                                         |
| price                 | string | Transaction price                                                                                                                                                                                                                                                                                                                            |
| amount                | string | Transaction amount                                                                                                                                                                                                                                                                                                                           |
| commission            | string | commission                                                                                                                                                                                                                                                                                                                                   |
| currency              | string | Asset unit, usually USDT                                                                                                                                                                                                                                                                                                                     |
| orderId               | string | order id                                                                                                                                                                                                                                                                                                                                     |
| liquidatedPrice       | string | Estimating strong parity, triggering the estimated strong parity at the time of strong parity, only available for strong parity orders                                                                                                                                                                                                       |
| liquidatedMarginRatio | string | Strong average margin rate, which triggers the strong average margin rate at the time of strong average, only available for strong average orders                                                                                                                                                                                            |
| workingType           | string | StopPrice trigger price types: MARK_PRICE, CONTRACT_PRICE, default MARK_PRICE                                                                                                                                                                                                                                                                |
| filledTime            | string | Match the transaction time in the format of 2006-01-02T15:04:05.999+0800                                                                                                                                                                                                                                                                     |
| side                  | string | buying and selling direction                                                                                                                                                                                                                                                                                                                 |
| type                  | string | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order |
| positionSide          | string | Position direction, required for single position as BOTH, for both long and short positions only LONG or SHORT can be chosen, defaults to LONG if empty                                                                                                                                                                                      |
| clientOrderID         | string | Customized order ID for users                                                                                                                                                                                                                                                                                                                |
| onlyOnePosition       | bool   | is OneWay Position mode, true: yes; false: no                                                                                                                                                                                                                                                                                                |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
