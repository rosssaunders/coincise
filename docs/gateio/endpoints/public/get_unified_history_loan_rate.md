# GET /unified/history_loan_rate

**Source:** [/unified/history_loan_rate](https://www.gate.io/docs/developers/apiv4/en/#gethistoryloanrate-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#get-historical-lending-rates) Get historical lending rates

`GET /unified/history_loan_rate`

_Get historical lending rates_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#gethistoryloanrate-parameters](https://www.gate.io/docs/developers/apiv4/en/#gethistoryloanrate-parameters)

| Name     | In    | Type           | Required | Description                                                              |
| -------- | ----- | -------------- | -------- | ------------------------------------------------------------------------ |
| tier     | query | string         | false    | VIP level for the floating rate to be queried                            |
| currency | query | string         | true     | Currency                                                                 |
| page     | query | integer(int32) | false    | Page number                                                              |
| limit    | query | integer(int32) | false    | Maximum number of items returned. Default: 100, minimum: 1, maximum: 100 |

> Example responses

> 200 Response

```
{
  "currency": "USDT",
  "tier": "1",
  "tier_up_rate": "1.18",
  "rates": [
    {
      "time": 1729047616000,
      "rate": "0.00010287"
    }
  ]
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#gethistoryloanrate-responses](https://www.gate.io/docs/developers/apiv4/en/#gethistoryloanrate-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#gethistoryloanrate-responseschema](https://www.gate.io/docs/developers/apiv4/en/#gethistoryloanrate-responseschema)

Status Code **200**

| Name           | Type           | Description                                                                                                                                                                   |
| -------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » currency     | string         | Currency name                                                                                                                                                                 |
| » tier         | string         | VIP level for the floating rate to be retrieved                                                                                                                               |
| » tier_up_rate | string         | Floating rate corresponding to VIP level                                                                                                                                      |
| » rates        | array          | Historical interest rate information, one data point per hour, array size determined by page and limit parameters from the API request, sorted by time from recent to distant |
| »» time        | integer(int64) | Hourly timestamp corresponding to this interest rate, in milliseconds                                                                                                         |
| »» rate        | string         | Historical interest rate for this hour                                                                                                                                        |

This operation does not require authentication

## [#](#set-collateral-currency) Set collateral currency

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#set-collateral-currency](https://www.gate.io/docs/developers/apiv4/en/#set-collateral-currency)

> Code samples
