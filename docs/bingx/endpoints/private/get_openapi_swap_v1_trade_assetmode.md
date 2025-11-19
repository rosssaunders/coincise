# GET /openApi/swap/v1/trade/assetMode

**Source:**
[/openApi/swap/v1/trade/assetMode](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Query Multi-Assets Mode

GET /openApi/swap/v1/trade/assetMode

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type  | Required | Description                                         |
| -------------- | ----- | -------- | --------------------------------------------------- |
| timestamp      | int64 | yes      | request timestamp in milliseconds                   |
| recvWindow     | int64 | no       | Request valid time window value, Unit: milliseconds |

### Response Parameters

| Parameter Name | Type   | Description                                           |
| -------------- | ------ | ----------------------------------------------------- |
| assetMode      | string | multi-assets mode, singleAssetMode or multiAssetsMode |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
