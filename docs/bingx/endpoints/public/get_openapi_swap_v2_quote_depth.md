# GET /openApi/swap/v2/quote/depth

**Source:** [/openApi/swap/v2/quote/depth](https://bingx-api.github.io/docs/)

## Authentication

Not Required (Public Endpoint)

## Order Book

GET /openApi/swap/v2/quote/depth

API KEY permission: No API KEY signature required

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                     |
| -------------- | ------ | -------- | --------------------------------------------------------------- |
| symbol         | string | yes      | Trading pair, for example: BTC-USDT, please use capital letters |
| limit          | int    | no       | Default 20, optional value:\[5, 10, 20, 50, 100, 500, 1000\]    |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds         |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds             |

### Response Parameters

| Parameter Name | Type  | Description                                                       |
| -------------- | ----- | ----------------------------------------------------------------- |
| T              | int64 | System time, unit: millisecond                                    |
| asks           | array | depth of asks. first element price, second element quantity       |
| bids           | array | Buyer depth. first element price, second element quantity         |
| asksCoin       | array | depth of asks. first element price, second element quantity(coin) |
| bidsCoin       | array | Buyer depth. first element price, second element quantity(coin)   |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html)
