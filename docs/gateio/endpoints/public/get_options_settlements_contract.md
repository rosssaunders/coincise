# GET /options/settlements/{contract}

**Source:** [/options/settlements/{contract}](https://www.gate.io/docs/developers/apiv4/en/#getoptionssettlement-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#get-specified-contract-settlement-information) Get specified contract settlement information

`GET /options/settlements/{contract}`

_Get specified contract settlement information_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getoptionssettlement-parameters](https://www.gate.io/docs/developers/apiv4/en/#getoptionssettlement-parameters)

| Name       | In    | Type           | Required | Description                                          |
| ---------- | ----- | -------------- | -------- | ---------------------------------------------------- |
| contract   | path  | string         | true     | none                                                 |
| underlying | query | string         | true     | Underlying (Obtained by listing underlying endpoint) |
| at         | query | integer(int64) | true     | none                                                 |

> Example responses

> 200 Response

```json
{
  "time": 1598839200,
  "profit": "312.35",
  "fee": "0.3284",
  "settle_price": "11687.65",
  "contract": "BTC-WEEKLY-200824-11000-P",
  "strike_price": "12000"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getoptionssettlement-responses](https://www.gate.io/docs/developers/apiv4/en/#getoptionssettlement-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getoptionssettlement-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getoptionssettlement-responseschema)

Status Code **200**

| Name           | Type           | Description                                     |
| -------------- | -------------- | ----------------------------------------------- |
| » time         | number(double) | Last configuration update time                  |
| » contract     | string         | Options contract name                           |
| » profit       | string         | Settlement profit per contract (quote currency) |
| » fee          | string         | Settlement fee per contract (quote currency)    |
| » strike_price | string         | Strike price (quote currency)                   |
| » settle_price | string         | Settlement price (quote currency)               |

This operation does not require authentication

## [#](#query-personal-settlement-records) Query personal settlement records

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-personal-settlement-records](https://www.gate.io/docs/developers/apiv4/en/#query-personal-settlement-records)

> Code samples
