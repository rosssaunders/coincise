# GET /openApi/swap/v1/trade/multiAssetsRules

**Source:**
[/openApi/swap/v1/trade/multiAssetsRules](https://bingx-api.github.io/docs/)

## Authentication

Not Required (Public Endpoint)

## Query Multi-Assets Rules

GET /openApi/swap/v1/trade/multiAssetsRules

API KEY permission: No API KEY signature required

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type  | Required | Description                                         |
| -------------- | ----- | -------- | --------------------------------------------------- |
| timestamp      | int64 | yes      | request timestamp in milliseconds                   |
| recvWindow     | int64 | no       | Request valid time window value, Unit: milliseconds |

### Response Parameters

| Parameter Name       | Type   | Description                                                                         |
| -------------------- | ------ | ----------------------------------------------------------------------------------- |
| marginAssets         | string | Margin assets, such as BTC, ETH, etc.                                               |
| ltv                  | string | Loan-to-Value ratio, value conversion ratio used when calculating available margin. |
| collateralValueRatio | string | Collateral ratio, value conversion ratio used when calculating risk rate.           |
| maxTransfer          | string | Transfer limit, maximum amount that can be transferred in. Empty means no limit.    |
| indexPrice           | string | Current latest USD index price for the asset.                                       |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
