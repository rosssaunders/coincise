# POST /options/mmp/reset

**Source:** [/options/mmp/reset](https://www.gate.io/docs/developers/apiv4/en/#resetoptionsmmp-parameters)

## Authentication

Required (Private Endpoint)

## [#](#mmp-reset) MMP Reset

`POST /options/mmp/reset`

_MMP Reset_

> Body parameter

```json
{
  "underlying": "BTC_USDT"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#resetoptionsmmp-parameters](https://www.gate.io/docs/developers/apiv4/en/#resetoptionsmmp-parameters)

| Name         | In   | Type   | Required | Description |
| ------------ | ---- | ------ | -------- | ----------- |
| body         | body | object | true     | none        |
| » underlying | body | string | true     | Underlying  |

> Example responses

> 200 Response

```json
{
  "underlying": "BTC_USDT",
  "window": 5000,
  "frozen_period": 200,
  "qty_limit": "10",
  "delta_limit": "10",
  "trigger_time_ms": 0,
  "frozen_until_ms": 0
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#resetoptionsmmp-responses](https://www.gate.io/docs/developers/apiv4/en/#resetoptionsmmp-responses)

| Status | Meaning                                                                    | Description     | Schema |
| ------ | -------------------------------------------------------------------------- | --------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | MMP Information | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#resetoptionsmmp-responseschema](https://www.gate.io/docs/developers/apiv4/en/#resetoptionsmmp-responseschema)

Status Code **200**

_MMP Settings_

| Name              | Type           | Description                                                                                                                          |
| ----------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| » underlying      | string         | Underlying                                                                                                                           |
| » window          | integer(int32) | Time window (milliseconds), between 1-5000, 0 means disable MMP                                                                      |
| » frozen_period   | integer(int32) | Freeze duration (milliseconds), 0 means always frozen, need to call reset API to unfreeze                                            |
| » qty_limit       | string         | Trading volume upper limit (positive number, up to 2 decimal places)                                                                 |
| » delta_limit     | string         | Upper limit of net delta value (positive number, up to 2 decimal places)                                                             |
| » trigger_time_ms | integer(int64) | Trigger freeze time (milliseconds), 0 means no freeze is triggered                                                                   |
| » frozen_until_ms | integer(int64) | Unfreeze time (milliseconds). If the freeze duration is not configured, there will be no unfreeze time after the freeze is triggered |

WARNING

To perform this operation, you must be authenticated by API key and secret
