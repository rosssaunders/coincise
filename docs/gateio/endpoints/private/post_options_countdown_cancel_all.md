# POST /options/countdown_cancel_all

**Source:** [/options/countdown_cancel_all](https://www.gate.io/docs/developers/apiv4/en/#countdowncancelalloptions-parameters)

## Authentication

Required (Private Endpoint)

## [#](#countdown-cancel-orders-3) Countdown cancel orders

`POST /options/countdown_cancel_all`

_Countdown cancel orders_

Option order heartbeat detection, when the `timeout` time set by the user is
reached, if the existing countdown is not canceled or a new countdown is set,
the related `option pending order` will be automatically canceled. This
interface can be called repeatedly to set a new countdown or cancel the
countdown. Usage example: Repeat this interface at intervals of 30 seconds, with
each countdown `timeout` set to 30 (seconds). If this interface is not called
again within 30 seconds, all pending orders on the `underlying` `contract` you
specified will be automatically cancelled. If `underlying` `contract` is not
specified, user will be automatically cancelled If `timeout` is set to 0 within
30 seconds, the countdown timer will expire and the automatic order cancellation
function will be cancelled.

> Body parameter

```json
{
  "timeout": 30,
  "contract": "BTC_USDT-20241001-46000-C",
  "underlying": "BTC_USDT"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#countdowncancelalloptions-parameters](https://www.gate.io/docs/developers/apiv4/en/#countdowncancelalloptions-parameters)

| Name         | In   | Type           | Required | Description               |
| ------------ | ---- | -------------- | -------- | ------------------------- |
| body         | body | object         | true     | none                      |
| » timeout    | body | integer(int32) | true     | Countdown time in seconds |
| » contract   | body | string         | false    | Options contract name     |
| » underlying | body | string         | false    | Underlying                |

#### [#](#detailed-descriptions-51) Detailed descriptions

**» timeout**: Countdown time in seconds At least 5 seconds, 0 means cancel
countdown

> Example responses

> 200 Response

```json
{
  "triggerTime": "1660039145000"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#countdowncancelalloptions-responses](https://www.gate.io/docs/developers/apiv4/en/#countdowncancelalloptions-responses)

| Status | Meaning                                                                    | Description                | Schema |
| ------ | -------------------------------------------------------------------------- | -------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Countdown set successfully | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#countdowncancelalloptions-responseschema](https://www.gate.io/docs/developers/apiv4/en/#countdowncancelalloptions-responseschema)

Status Code **200**

_triggerTime_

| Name          | Type           | Description                                    |
| ------------- | -------------- | ---------------------------------------------- |
| » triggerTime | integer(int64) | Timestamp when countdown ends, in milliseconds |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-personal-trading-records-4) Query personal trading records

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-personal-trading-records-4](https://www.gate.io/docs/developers/apiv4/en/#query-personal-trading-records-4)

> Code samples
