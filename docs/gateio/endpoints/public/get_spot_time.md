# GET /spot/time

**Source:**
[/spot/time](https://www.gate.io/docs/developers/apiv4/en/#getsystemtime-responses)

## Authentication

Not Required (Public Endpoint)

## [#](#get-server-current-time) Get server current time

`GET /spot/time`

_Get server current time_

> Example responses

> 200 Response

```json
{
  "server_time": 1597026383085
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getsystemtime-responses](https://www.gate.io/docs/developers/apiv4/en/#getsystemtime-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getsystemtime-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getsystemtime-responseschema)

Status Code **200**

_SystemTime_

| Name          | Type           | Description             |
| ------------- | -------------- | ----------------------- |
| » server_time | integer(int64) | Server current time(ms) |

This operation does not require authentication

## [#](#countdown-cancel-orders) Countdown cancel orders

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#countdown-cancel-orders](https://www.gate.io/docs/developers/apiv4/en/#countdown-cancel-orders)

> Code samples
