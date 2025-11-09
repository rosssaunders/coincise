# POST /options/mmp

**Source:** [/options/mmp](https://www.gate.io/docs/developers/apiv4/en/#setoptionsmmp-parameters)

## Authentication

Required (Private Endpoint)

## [#](#mmp-settings) MMP Settings

`POST /options/mmp`

_MMP Settings_

> Body parameter

```
{
  "underlying": "BTC_USDT",
  "window": 5000,
  "frozen_period": 200,
  "qty_limit": "10",
  "delta_limit": "10"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#setoptionsmmp-parameters](https://www.gate.io/docs/developers/apiv4/en/#setoptionsmmp-parameters)

| Name            | In   | Type           | Required | Description                                                                               |
| --------------- | ---- | -------------- | -------- | ----------------------------------------------------------------------------------------- |
| body            | body | object         | true     | none                                                                                      |
| » underlying    | body | string         | true     | Underlying                                                                                |
| » window        | body | integer(int32) | true     | Time window (milliseconds), between 1-5000, 0 means disable MMP                           |
| » frozen_period | body | integer(int32) | true     | Freeze duration (milliseconds), 0 means always frozen, need to call reset API to unfreeze |
| » qty_limit     | body | string         | true     | Trading volume upper limit (positive number, up to 2 decimal places)                      |
| » delta_limit   | body | string         | true     | Upper limit of net delta value (positive number, up to 2 decimal places)                  |

> Example responses

> 200 Response

```
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
[https://www.gate.io/docs/developers/apiv4/en/#setoptionsmmp-responses](https://www.gate.io/docs/developers/apiv4/en/#setoptionsmmp-responses)

| Status | Meaning                                                                    | Description     | Schema |
| ------ | -------------------------------------------------------------------------- | --------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | MMP Information | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#setoptionsmmp-responseschema](https://www.gate.io/docs/developers/apiv4/en/#setoptionsmmp-responseschema)

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

## [#](#mmp-query) MMP Query.

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#mmp-query](https://www.gate.io/docs/developers/apiv4/en/#mmp-query)

> Code samples
