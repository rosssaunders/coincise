# GET /unified/unified_mode

**Source:**
[/unified/unified_mode](https://www.gate.io/docs/developers/apiv4/en/#getunifiedmode-responses)

## Authentication

Required (Private Endpoint)

## [#](#query-mode-of-the-unified-account) Query mode of the unified account

`GET /unified/unified_mode`

_Query mode of the unified account_

Unified account mode:

- `classic`: Classic account mode
- `multi_currency`: Cross-currency margin mode
- `portfolio`: Portfolio margin mode
- `single_currency`: Single-currency margin mode

> Example responses

> 200 Response

```
{
  "mode": "portfolio",
  "settings": {
    "spot_hedge": true,
    "usdt_futures": true,
    "options": true
  }
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getunifiedmode-responses](https://www.gate.io/docs/developers/apiv4/en/#getunifiedmode-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getunifiedmode-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getunifiedmode-responseschema)

Status Code **200**

| Name   | Type   | Description           |
| ------ | ------ | --------------------- |
| » mode | string | Unified account mode: |

\- `classic`: Classic account mode  
\- `multi_currency`: Cross-currency margin mode  
\- `portfolio`: Portfolio margin mode  
\- `single_currency`: Single-currency margin mode | | » settings | object | none
| | »» usdt_futures | boolean | USDT futures switch. In cross-currency margin
mode, can only be enabled and cannot be disabled | | »» spot_hedge | boolean |
Spot hedging switch | | »» use_funding | boolean | Earn switch, when mode is
cross-currency margin mode, whether to use Earn funds as margin | | »» options |
boolean | Options switch. In cross-currency margin mode, can only be enabled and
cannot be disabled |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-unified-account-estimated-interest-rate) Query unified account estimated interest rate

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-unified-account-estimated-interest-rate](https://www.gate.io/docs/developers/apiv4/en/#query-unified-account-estimated-interest-rate)

> Code samples
