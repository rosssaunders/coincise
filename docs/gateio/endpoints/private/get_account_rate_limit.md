# GET /account/rate_limit

**Source:**
[/account/rate_limit](https://www.gate.io/docs/developers/apiv4/en/#getaccountratelimit-responses)

## Authentication

Required (Private Endpoint)

## [#](#get-user-transaction-rate-limit-information) Get user transaction rate limit information

`GET /account/rate_limit`

_Get user transaction rate limit information_

> Example responses

> 200 Response

```
[
  {
    "type": "spot",
    "tier": "1",
    "ratio": "0",
    "main_ratio": "0",
    "updated_at": "1728230400"
  },
  {
    "type": "futures",
    "tier": "1",
    "ratio": "0",
    "main_ratio": "0",
    "updated_at": "1728230400"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getaccountratelimit-responses](https://www.gate.io/docs/developers/apiv4/en/#getaccountratelimit-responses)

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getaccountratelimit-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getaccountratelimit-responseschema)

Status Code **200**

_AccountRateLimit_

| Name             | Type   | Description                                                                                                                          |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| AccountRateLimit | array  | Account rate limit                                                                                                                   |
| » tier           | string | Frequency limit level (For detailed frequency limit rules, see [Transaction ratio frequency limit](#rate-limit-based-on-fill-ratio)) |
| » ratio          | string | Fill rate                                                                                                                            |
| » main_ratio     | string | Total fill ratio of main account                                                                                                     |
| » updated_at     | string | Update time                                                                                                                          |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-stp-user-group) Create STP user group

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#create-stp-user-group](https://www.gate.io/docs/developers/apiv4/en/#create-stp-user-group)

> Code samples
