# GET /api/v5/rfq/mmp-config

Source:
[https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-mmp-config](https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-mmp-config)

### Get MMP Config

This endpoint is used to get MMP configure information and only applicable to
block trading market makers

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/rfq/mmp-config`

#### Request Parameters

none

#### Response Parameters

| **Parameter**            | **Type** | **Description**                                                                                                                  |
| ------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| timeInterval             | String   | Time window (ms). MMP interval where monitoring is done                                                                          |
| "0" means MMP is diabled |
| frozenInterval           | String   | Frozen period (ms). If it is "0", the trade will remain frozen until manually reset and `mmpFrozenUntil` will be "".             |
| countLimit               | String   | Limit in number of execution attempts                                                                                            |
| mmpFrozen                | Boolean  | Whether MMP is currently triggered. `true` or `false`                                                                            |
| mmpFrozenUntil           | String   | If frozenInterval is not "0" and mmpFrozen = True, it is the time interval (in ms) when MMP is no longer triggered, otherwise "" |
