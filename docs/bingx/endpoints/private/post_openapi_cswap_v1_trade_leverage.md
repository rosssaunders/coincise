# POST /openApi/cswap/v1/trade/leverage

**Source:**
[/openApi/cswap/v1/trade/leverage](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Modify Leverage

POST /openApi/cswap/v1/trade/leverage

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                          |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| symbol         | string | Yes      | Trading pair, for example: BTC-USD, use capital letters                                                                              |
| side           | string | Yes      | For dual-position mode, the leverage rate of long or short positions. LONG represents long position, SHORT represents short position |
| leverage       | string | Yes      | Leverage rate                                                                                                                        |
| timestamp      | int64  | Yes      | Request timestamp, unit: millisecond                                                                                                 |
| recvWindow     | int64  | No       | Request valid time window value, unit: millisecond                                                                                   |

### Response Parameters

| Parameter Name | Type   | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| code           | int32  | Status code                                      |
| msg            | string | Description                                      |
| timestamp      | int64  | Response generation timestamp, unit: millisecond |
| data           | List   |                                                  |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html](https://bingx-api.github.io/docs/#/en-us/cswap/trade-api.html)
