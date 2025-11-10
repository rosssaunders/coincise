# PUT /unified/unified_mode

**Source:**
[/unified/unified_mode](https://www.gate.io/docs/developers/apiv4/en/#setunifiedmode-parameters)

## Authentication

Required (Private Endpoint)

## [#](#set-unified-account-mode) Set unified account mode

`PUT /unified/unified_mode`

_Set unified account mode_

Each account mode switch only requires passing the corresponding account mode
parameter, and also supports turning on or off the configuration switches under
the corresponding account mode during the switch.

- When enabling the classic account mode, mode=classic

```
 PUT /unified/unified_mode
 {
 "mode": "classic"
 }
```

- When enabling the cross-currency margin "multi_currency", "settings": {
  "usdt_futures": true } }

```
- When enabling the portfolio margin mode, mode=portfolio
```

PUT /unified/unified_mode { "mode": "portfolio", "settings": { "spot_hedge":
true } }

```
- When enabling the single-currency margin mode, mode=single_currency
```

PUT /unified/unified_mode { "mode": "single_currency" }

````

<Example>

> Body parameter

```json
{
  "mode": "portfolio",
  "settings": {
    "spot_hedge": true,
    "usdt_futures": true,
    "options": true
  }
}
````

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#setunifiedmode-parameters](https://www.gate.io/docs/developers/apiv4/en/#setunifiedmode-parameters)

| Name            | In   | Type    | Required | Description                                                                                    |
| --------------- | ---- | ------- | -------- | ---------------------------------------------------------------------------------------------- |
| body            | body | object  | true     | none                                                                                           |
| » mode          | body | string  | true     | Unified account mode:                                                                          |
| » settings      | body | object  | false    | none                                                                                           |
| »» usdt_futures | body | boolean | false    | USDT futures switch. In cross-currency margin mode, can only be enabled and cannot be disabled |
| »» spot_hedge   | body | boolean | false    | Spot hedging switch                                                                            |
| »» use_funding  | body | boolean | false    | Earn switch, when mode is cross-currency margin mode, whether to use Earn funds as margin      |
| »» options      | body | boolean | false    | Options switch. In cross-currency margin mode, can only be enabled and cannot be disabled      |

#### [#](#detailed-descriptions-7) Detailed descriptions

**» mode**: Unified account mode:

- `classic`: Classic account mode
- `multi_currency`: Cross-currency margin mode
- `portfolio`: Portfolio margin mode
- `single_currency`: Single-currency margin mode

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#setunifiedmode-responses](https://www.gate.io/docs/developers/apiv4/en/#setunifiedmode-responses)

| Status | Meaning                                                                            | Description      | Schema |
| ------ | ---------------------------------------------------------------------------------- | ---------------- | ------ |
| 204    | [No Content (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.5) | Set successfully | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-mode-of-the-unified-account) Query mode of the unified account

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-mode-of-the-unified-account](https://www.gate.io/docs/developers/apiv4/en/#query-mode-of-the-unified-account)

> Code samples
