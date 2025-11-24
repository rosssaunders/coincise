# GET /unified/estimate_rate

**Source:** [/unified/estimate_rate](https://www.gate.io/docs/developers/apiv4/en/#getunifiedestimaterate-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-unified-account-estimated-interest-rate) Query unified account estimated interest rate

`GET /unified/estimate_rate`

_Query unified account estimated interest rate_

Interest rates fluctuate hourly based on lending depth, so exact rates cannot be
provided. When a currency is not supported, the interest rate returned will be
an empty string

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getunifiedestimaterate-parameters](https://www.gate.io/docs/developers/apiv4/en/#getunifiedestimaterate-parameters)

| Name       | In    | Type            | Required | Description                                                                                 |
| ---------- | ----- | --------------- | -------- | ------------------------------------------------------------------------------------------- |
| currencies | query | array\[string\] | true     | Specify currency names for querying in an array, separated by commas, maximum 10 currencies |

> Example responses

> 200 Response

```json
{
  "BTC": "0.000002",
  "GT": "0.000001",
  "ETH": ""
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getunifiedestimaterate-responses](https://www.gate.io/docs/developers/apiv4/en/#getunifiedestimaterate-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getunifiedestimaterate-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getunifiedestimaterate-responseschema)

Status Code **200**

_Estimate current hourly lending rates, returned by currency_

| Name                       | Type   | Description |
| -------------------------- | ------ | ----------- |
| » **additionalProperties** | string | none        |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-unified-account-tiered) Query unified account tiered

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-unified-account-tiered](https://www.gate.io/docs/developers/apiv4/en/#query-unified-account-tiered)

> Code samples
