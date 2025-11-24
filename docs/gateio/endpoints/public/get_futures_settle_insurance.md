# GET /futures/{settle}/insurance

**Source:**
[/futures/{settle}/insurance](https://www.gate.io/docs/developers/apiv4/en/#listfuturesinsuranceledger-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#futures-market-insurance-fund-history) Futures market insurance fund history

`GET /futures/{settle}/insurance`

_Futures market insurance fund history_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listfuturesinsuranceledger-parameters](https://www.gate.io/docs/developers/apiv4/en/#listfuturesinsuranceledger-parameters)

| Name   | In    | Type    | Required | Description                                         |
| ------ | ----- | ------- | -------- | --------------------------------------------------- |
| settle | path  | string  | true     | Settle currency                                     |
| limit  | query | integer | false    | Maximum number of records returned in a single list |

#### [#](#enumerated-values-38) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```json
[
  {
    "t": 1543968000,
    "b": "83.0031"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listfuturesinsuranceledger-responses](https://www.gate.io/docs/developers/apiv4/en/#listfuturesinsuranceledger-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listfuturesinsuranceledger-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listfuturesinsuranceledger-responseschema)

Status Code **200**

| Name   | Type           | Description               |
| ------ | -------------- | ------------------------- |
| _None_ | array          | none                      |
| » t    | integer(int64) | Unix timestamp in seconds |
| » b    | string         | Insurance balance         |

This operation does not require authentication

## [#](#futures-statistics) Futures statistics

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#futures-statistics](https://www.gate.io/docs/developers/apiv4/en/#futures-statistics)

> Code samples
