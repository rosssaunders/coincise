# GET /openApi/swap/v1/maintMarginRatio

**Source:**
[/openApi/swap/v1/maintMarginRatio](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Position and Maintenance Margin Ratio

GET /openApi/swap/v1/maintMarginRatio

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                |
| -------------- | ------ | -------- | ---------------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, e.g., BTC-USDT, please use uppercase letters |
| timestamp      | int64  | Yes      | Request timestamp in milliseconds                          |
| recvWindow     | int64  | No       | Request valid time window in milliseconds                  |

### Response Parameters

| Parameter Name   | Type   | Description                                 |
| ---------------- | ------ | ------------------------------------------- |
| tier             | string | Layer                                       |
| symbol           | string | Trading pair                                |
| minPositionVal   | string | Minimum position value                      |
| maxPositionVal   | string | Maximum position value                      |
| maintMarginRatio | string | Maintenance margin ratio                    |
| maintAmount      | string | Maintenance margin quick calculation amount |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
