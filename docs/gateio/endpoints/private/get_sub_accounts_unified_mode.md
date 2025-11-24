# GET /sub_accounts/unified_mode

**Source:**
[/sub_accounts/unified_mode](https://www.gate.io/docs/developers/apiv4/en/#listunifiedmode-responses)

## Authentication

Required (Private Endpoint)

## [#](#get-sub-account-mode) Get sub-account mode

`GET /sub_accounts/unified_mode`

_Get sub-account mode_

Unified account mode:

- `classic`: Classic account mode
- `multi_currency`: Multi-currency margin mode
- `portfolio`: Portfolio margin mode

> Example responses

> 200 Response

```json
[
  {
    "user_id": 110285555,
    "is_unified": true,
    "mode": "multi_currency"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunifiedmode-responses](https://www.gate.io/docs/developers/apiv4/en/#listunifiedmode-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunifiedmode-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listunifiedmode-responseschema)

Status Code **200**

| Name         | Type           | Description                     |
| ------------ | -------------- | ------------------------------- |
| » user_id    | integer(int64) | User ID                         |
| » is_unified | boolean        | Whether it is a unified account |
| » mode       | string         | Unified account mode:           |

\- `classic`: Classic account mode  
\- `multi_currency`: Multi-currency margin mode  
\- `portfolio`: Portfolio margin mode |

WARNING

To perform this operation, you must be authenticated by API key and secret
