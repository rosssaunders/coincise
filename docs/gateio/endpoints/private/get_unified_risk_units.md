# GET /unified/risk_units

**Source:** [/unified/risk_units](https://www.gate.io/docs/developers/apiv4/en/#getunifiedriskunits-responses)

## Authentication

Required (Private Endpoint)

## [#](#get-user-risk-unit-details) Get user risk unit details

`GET /unified/risk_units`

_Get user risk unit details_

Get user risk unit details, only valid in portfolio margin mode

> Example responses

> 200 Response

```json
{
  "user_id": 0,
  "spot_hedge": true,
  "risk_units": [
    {
      "symbol": "BTC",
      "spot_in_use": "-13500.000001223",
      "maintain_margin": "2334.002",
      "initial_margin": "2334.002",
      "delta": "0.22",
      "gamma": "0.42",
      "theta": "0.29",
      "vega": "0.22"
    }
  ]
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getunifiedriskunits-responses](https://www.gate.io/docs/developers/apiv4/en/#getunifiedriskunits-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getunifiedriskunits-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getunifiedriskunits-responseschema)

Status Code **200**

| Name                | Type           | Description                                           |
| ------------------- | -------------- | ----------------------------------------------------- |
| » user_id           | integer(int64) | User ID                                               |
| » spot_hedge        | boolean        | Spot hedging status: true - enabled, false - disabled |
| » risk_units        | array          | Risk unit                                             |
| »» RiskUnits        | object         | none                                                  |
| »»» symbol          | string         | Risk unit flag                                        |
| »»» spot_in_use     | string         | Spot hedging occupied amount                          |
| »»» maintain_margin | string         | Maintenance margin for risk unit                      |
| »»» initial_margin  | string         | Initial margin for risk unit                          |
| »»» delta           | string         | Total Delta of risk unit                              |
| »»» gamma           | string         | Total Gamma of risk unit                              |
| »»» theta           | string         | Total Theta of risk unit                              |
| »»» vega            | string         | Total Vega of risk unit                               |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#set-unified-account-mode) Set unified account mode

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#set-unified-account-mode](https://www.gate.io/docs/developers/apiv4/en/#set-unified-account-mode)

> Code samples
