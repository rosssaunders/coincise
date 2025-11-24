# POST /futures/{settle}/countdown_cancel_all

**Source:**
[/futures/{settle}/countdown_cancel_all](https://www.gate.io/docs/developers/apiv4/en/#countdowncancelallfutures-parameters)

## Authentication

Required (Private Endpoint)

## [#](#countdown-cancel-orders-2) Countdown cancel orders

`POST /futures/{settle}/countdown_cancel_all`

_Countdown cancel orders_

Heartbeat detection for contract orders: When the user-set `timeout` time is
reached, if neither the existing countdown is canceled nor a new countdown is
set, the relevant contract orders will be automatically canceled. This API can
be called repeatedly to or cancel the countdown. Usage example: Repeatedly call
this API at 30-second intervals, setting the `timeout` to 30 (seconds) each
time. If this API is not called again within 30 seconds, all open orders on your
specified `market` will be automatically canceled. If the `timeout` is set to 0
within 30 seconds, the countdown timer will terminate, and the automatic order
cancellation function will be disabled.

> Body parameter

```json
{
  "timeout": 30,
  "contract": "BTC_USDT"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#countdowncancelallfutures-parameters](https://www.gate.io/docs/developers/apiv4/en/#countdowncancelallfutures-parameters)

| Name       | In   | Type           | Required | Description               |
| ---------- | ---- | -------------- | -------- | ------------------------- |
| body       | body | object         | true     | none                      |
| » timeout  | body | integer(int32) | true     | Countdown time in seconds |
| » contract | body | string         | false    | Futures contract          |
| settle     | path | string         | true     | Settle currency           |

#### [#](#detailed-descriptions-37) Detailed descriptions

**» timeout**: Countdown time in seconds At least 5 seconds, 0 means cancel
countdown

#### [#](#enumerated-values-75) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```json
{
  "triggerTime": "1660039145000"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#countdowncancelallfutures-responses](https://www.gate.io/docs/developers/apiv4/en/#countdowncancelallfutures-responses)

| Status | Meaning                                                                    | Description                | Schema |
| ------ | -------------------------------------------------------------------------- | -------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Countdown set successfully | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#countdowncancelallfutures-responseschema](https://www.gate.io/docs/developers/apiv4/en/#countdowncancelallfutures-responseschema)

Status Code **200**

_triggerTime_

| Name          | Type           | Description                                    |
| ------------- | -------------- | ---------------------------------------------- |
| » triggerTime | integer(int64) | Timestamp when countdown ends, in milliseconds |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-futures-market-trading-fee-rates) Query futures market trading fee rates

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-futures-market-trading-fee-rates](https://www.gate.io/docs/developers/apiv4/en/#query-futures-market-trading-fee-rates)

> Code samples
