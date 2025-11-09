# GET /delivery/{settle}/insurance

**Source:** [/delivery/{settle}/insurance](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryinsuranceledger-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#futures-market-insurance-fund-history-2) Futures market insurance fund history

`GET /delivery/{settle}/insurance`

_Futures market insurance fund history_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliveryinsuranceledger-parameters](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryinsuranceledger-parameters)

| Name   | In    | Type    | Required | Description                                         |
| ------ | ----- | ------- | -------- | --------------------------------------------------- |
| settle | path  | string  | true     | Settle currency                                     |
| limit  | query | integer | false    | Maximum number of records returned in a single list |

#### [#](#enumerated-values-92) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | usdt  |

> Example responses

> 200 Response

```
[
  {
    "t": 1543968000,
    "b": "83.0031"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliveryinsuranceledger-responses](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryinsuranceledger-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliveryinsuranceledger-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryinsuranceledger-responseschema)

Status Code **200**

| Name   | Type           | Description               |
| ------ | -------------- | ------------------------- |
| _None_ | array          | none                      |
| » t    | integer(int64) | Unix timestamp in seconds |
| » b    | string         | Insurance balance         |

This operation does not require authentication

## [#](#get-futures-account-2) Get futures account

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-futures-account-2](https://www.gate.io/docs/developers/apiv4/en/#get-futures-account-2)

> Code samples
