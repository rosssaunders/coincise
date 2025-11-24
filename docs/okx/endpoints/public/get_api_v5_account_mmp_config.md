# GET /api/v5/account/mmp-config

Source:
[https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-mmp-config](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-mmp-config)

### GET MMP Config

This endpoint is used to get MMP configure information

Only applicable to Option in Portfolio Margin mode, and MMP privilege is
required.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/mmp-config`

#### Request Parameters

| Parameter  | Type   | Required | Description       |
| ---------- | ------ | -------- | ----------------- |
| instFamily | String | No       | Instrument Family |

#### Response Parameters

| **Parameter**  | **Type** | **Description**                                                                                                                      |
| -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| instFamily     | String   | Instrument Family                                                                                                                    |
| mmpFrozen      | Boolean  | Whether MMP is currently triggered. `true` or `false`                                                                                |
| mmpFrozenUntil | String   | If frozenInterval is configured and mmpFrozen = True, it is the time interval (in ms) when MMP is no longer triggered, otherwise "". |
| timeInterval   | String   | Time window (ms). MMP interval where monitoring is done                                                                              |
| frozenInterval | String   | Frozen period (ms). If it is "0", the trade will remain frozen until manually reset and `mmpFrozenUntil` will be "".                 |
| qtyLimit       | String   | Trade qty limit in number of contracts                                                                                               |
