# GET /futures/{settle}/index_constituents/{index}

**Source:** [/futures/{settle}/index_constituents/{index}](https://www.gate.io/docs/developers/apiv4/en/#getindexconstituents-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#query-index-constituents) Query index constituents

`GET /futures/{settle}/index_constituents/{index}`

_Query index constituents_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getindexconstituents-parameters](https://www.gate.io/docs/developers/apiv4/en/#getindexconstituents-parameters)

| Name   | In   | Type   | Required | Description     |
| ------ | ---- | ------ | -------- | --------------- |
| settle | path | string | true     | Settle currency |
| index  | path | string | true     | Index name      |

#### [#](#enumerated-values-40) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```json
{
  "index": "BTC_USDT",
  "constituents": [
    {
      "exchange": "Binance",
      "symbols": [
        "BTC_USDT"
      ]
    },
    {
      "exchange": "Gate.com",
      "symbols": [
        "BTC_USDT"
      ]
    },
    {
      "exchange": "Huobi",
      "symbols": [
        "BTC_USDT"
      ]
    }
  ]
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getindexconstituents-responses](https://www.gate.io/docs/developers/apiv4/en/#getindexconstituents-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getindexconstituents-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getindexconstituents-responseschema)

Status Code **200**

| Name                | Type   | Description  |
| ------------------- | ------ | ------------ |
| » index             | string | Index name   |
| » constituents      | array  | Constituents |
| »» IndexConstituent | object | none         |
| »»» exchange        | string | Exchange     |
| »»» symbols         | array  | Symbol list  |

This operation does not require authentication

## [#](#query-liquidation-order-history) Query liquidation order history

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-liquidation-order-history](https://www.gate.io/docs/developers/apiv4/en/#query-liquidation-order-history)

> Code samples
