# GET /openApi/swap/v2/quote/premiumIndex

**Source:**
[/openApi/swap/v2/quote/premiumIndex](https://bingx-api.github.io/docs/)

## Authentication

Not Required (Public Endpoint)

## Mark Price and Funding Rate

GET /openApi/swap/v2/quote/premiumIndex

API KEY permission: No API KEY signature required

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds              |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                  |

### Response Parameters

| Parameter Name  | Type   | Description                                                 |
| --------------- | ------ | ----------------------------------------------------------- |
| symbol          | string | trading pair, for example: BTC-USDT                         |
| lastFundingRate | string | Last updated funding rate                                   |
| markPrice       | string | current mark price                                          |
| indexPrice      | string | index price                                                 |
| nextFundingTime | int64  | The remaining time for the next settlement, in milliseconds |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html)
