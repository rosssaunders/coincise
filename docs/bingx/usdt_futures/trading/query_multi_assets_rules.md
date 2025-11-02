## Query Multi-Assets Rules

GET /openApi/swap/v1/trade/multiAssetsRules

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

Query platform-defined multi-assets rules

Only available for live trading, live trading domain: https://open-api.bingx.com

rate limitation by IP in group Number: 1

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
| 109500     | Account Service Unavailable, err:symbol not exist                                                                                                            |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
