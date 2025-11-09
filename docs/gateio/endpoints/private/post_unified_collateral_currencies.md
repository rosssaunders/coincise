# POST /unified/collateral_currencies

**Source:** [/unified/collateral_currencies](https://www.gate.io/docs/developers/apiv4/en/#setunifiedcollateral-parameters)

## Authentication

Required (Private Endpoint)

## [#](#set-collateral-currency) Set collateral currency

`POST /unified/collateral_currencies`

_Set collateral currency_

> Body parameter

```
{
  "collateral_type": 1,
  "enable_list": [
    "BTC",
    "ETH"
  ],
  "disable_list": [
    "SOL",
    "GT"
  ]
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#setunifiedcollateral-parameters](https://www.gate.io/docs/developers/apiv4/en/#setunifiedcollateral-parameters)

| Name              | In   | Type    | Required | Description                                                                                                                                                                                   |
| ----------------- | ---- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| body              | body | object  | true     | none                                                                                                                                                                                          |
| » collateral_type | body | integer | false    | User-set collateral mode: 0(all)-All currencies as collateral, 1(custom)-Custom currencies as collateral. When collateral_type is 0(all), enable_list and disable_list parameters are invalid |
| » enable_list     | body | array   | false    | Currency list, where collateral_type=1(custom) indicates the addition logic                                                                                                                   |
| » disable_list    | body | array   | false    | Disable list, indicating the disable logic                                                                                                                                                    |

#### [#](#enumerated-values-5) Enumerated Values

| Parameter         | Value |
| ----------------- | ----- |
| » collateral_type | 0     |
| » collateral_type | 1     |

> Example responses

> 200 Response

```
{
  "is_success": true
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#setunifiedcollateral-responses](https://www.gate.io/docs/developers/apiv4/en/#setunifiedcollateral-responses)

| Status | Meaning                                                                    | Description          | Schema |
| ------ | -------------------------------------------------------------------------- | -------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Updated successfully | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#setunifiedcollateral-responseschema](https://www.gate.io/docs/developers/apiv4/en/#setunifiedcollateral-responseschema)

Status Code **200**

_Unified account collateral mode settings response_

| Name         | Type    | Description                        |
| ------------ | ------- | ---------------------------------- |
| » is_success | boolean | Whether the setting was successful |

WARNING

To perform this operation, you must be authenticated by API key and secret
