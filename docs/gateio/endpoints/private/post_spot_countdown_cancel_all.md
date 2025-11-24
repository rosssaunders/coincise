# POST /spot/countdown_cancel_all

**Source:**
[/spot/countdown_cancel_all](https://www.gate.io/docs/developers/apiv4/en/#countdowncancelallspot-parameters)

## Authentication

Required (Private Endpoint)

## [#](#countdown-cancel-orders) Countdown cancel orders

`POST /spot/countdown_cancel_all`

_Countdown cancel orders_

Spot order heartbeat detection. If there is no "cancel existing countdown" or
"set new countdown" when the user-set `timeout` time is reached, the related
`spot pending orders` will be automatically cancelled. This interface can be
called repeatedly to set a new countdown or cancel the countdown. Usage example:
Repeat this interface at 30s intervals, setting the countdown `timeout` to
`30 (seconds)` each time. If this interface is not called again within 30
seconds, all pending orders on the `market` you specified will be automatically
cancelled. If no `market` is specified, all market cancelled. If the `timeout`
is set to 0 within 30 seconds, the countdown timer will be terminated and the
automatic order cancellation function will be cancelled.

> Body parameter

```json
{
  "timeout": 30,
  "currency_pair": "BTC_USDT"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#countdowncancelallspot-parameters](https://www.gate.io/docs/developers/apiv4/en/#countdowncancelallspot-parameters)

| Name            | In   | Type           | Required | Description               |
| --------------- | ---- | -------------- | -------- | ------------------------- |
| body            | body | object         | true     | none                      |
| » timeout       | body | integer(int32) | true     | Countdown time in seconds |
| » currency_pair | body | string         | false    | Currency pair             |

#### [#](#detailed-descriptions-19) Detailed descriptions

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
[https://www.gate.io/docs/developers/apiv4/en/#countdowncancelallspot-responses](https://www.gate.io/docs/developers/apiv4/en/#countdowncancelallspot-responses)

| Status | Meaning                                                                    | Description                | Schema |
| ------ | -------------------------------------------------------------------------- | -------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Countdown set successfully | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#countdowncancelallspot-responseschema](https://www.gate.io/docs/developers/apiv4/en/#countdowncancelallspot-responseschema)

Status Code **200**

_triggerTime_

| Name          | Type           | Description                                    |
| ------------- | -------------- | ---------------------------------------------- |
| » triggerTime | integer(int64) | Timestamp when countdown ends, in milliseconds |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#batch-modification-of-orders) Batch modification of orders

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#batch-modification-of-orders](https://www.gate.io/docs/developers/apiv4/en/#batch-modification-of-orders)

> Code samples
