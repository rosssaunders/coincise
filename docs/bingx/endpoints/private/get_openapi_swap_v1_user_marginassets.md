# GET /openApi/swap/v1/user/marginAssets

**Source:**
[/openApi/swap/v1/user/marginAssets](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query Multi-Assets Margin

GET /openApi/swap/v1/user/marginAssets

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type  | Required | Description                                     |
| -------------- | ----- | -------- | ----------------------------------------------- |
| timestamp      | int64 | Yes      | Request timestamp in milliseconds               |
| recvWindow     | int64 | No       | Request valid time window value in milliseconds |

### Response Parameters

| Parameter Name       | Type   | Description                                                                                                        |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| currency             | string | Margin assets, such as BTC and ETH etc.                                                                            |
| totalAmount          | string | Total amount of margin assets.                                                                                     |
| availableTransfer    | string | Current available amount for transfer out, dynamic data needs to be re-queried and calculated after each transfer. |
| latestMortgageAmount | string | Latest collateral amount available.                                                                                |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
