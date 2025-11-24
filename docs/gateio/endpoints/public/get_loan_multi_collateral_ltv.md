# GET /loan/multi_collateral/ltv

**Source:** [/loan/multi_collateral/ltv](https://www.gate.io/docs/developers/apiv4/en/#getmulticollateralltv-responses)

## Authentication

Not Required (Public Endpoint)

## [#](#query-collateralization-ratio-information) Query collateralization ratio information

`GET /loan/multi_collateral/ltv`

_Query collateralization ratio information_

Multi-currency collateral ratio is fixed, independent of currency

> Example responses

> 200 Response

```json
{
  "init_ltv": "0.7",
  "alert_ltv": "0.8",
  "liquidate_ltv": "0.9"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getmulticollateralltv-responses](https://www.gate.io/docs/developers/apiv4/en/#getmulticollateralltv-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getmulticollateralltv-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getmulticollateralltv-responseschema)

Status Code **200**

_Multi-collateral ratio_

| Name            | Type   | Description                        |
| --------------- | ------ | ---------------------------------- |
| » init_ltv      | string | Initial collateralization rate     |
| » alert_ltv     | string | Warning collateralization rate     |
| » liquidate_ltv | string | Liquidation collateralization rate |

This operation does not require authentication

## [#](#query-currency-s-7-day-and-30-day-fixed-interest-rates) Query currency's 7-day and 30-day fixed interest rates

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-currency-s-7-day-and-30-day-fixed-interest-rates](https://www.gate.io/docs/developers/apiv4/en/#query-currency-s-7-day-and-30-day-fixed-interest-rates)

> Code samples
