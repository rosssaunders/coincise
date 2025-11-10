# GET /options/underlyings

**Source:**
[/options/underlyings](https://www.gate.io/docs/developers/apiv4/en/#listoptionsunderlyings-responses)

## Authentication

Not Required (Public Endpoint)

## [#](#list-all-underlying-assets) List all underlying assets

`GET /options/underlyings`

_List all underlying assets_

> Example responses

> 200 Response

```
[
  {
    "name": "BTC_USDT",
    "index_price": "70000"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionsunderlyings-responses](https://www.gate.io/docs/developers/apiv4/en/#listoptionsunderlyings-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionsunderlyings-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listoptionsunderlyings-responseschema)

Status Code **200**

| Name          | Type   | Description                       |
| ------------- | ------ | --------------------------------- |
| » name        | string | Underlying name                   |
| » index_price | string | Spot index price (quote currency) |

This operation does not require authentication

## [#](#list-all-expiration-dates) List all expiration dates

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#list-all-expiration-dates](https://www.gate.io/docs/developers/apiv4/en/#list-all-expiration-dates)

> Code samples
