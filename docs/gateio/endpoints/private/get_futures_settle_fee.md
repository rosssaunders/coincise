# GET /futures/{settle}/fee

**Source:**
[/futures/{settle}/fee](https://www.gate.io/docs/developers/apiv4/en/#getfuturesfee-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-futures-market-trading-fee-rates) Query futures market trading fee rates

`GET /futures/{settle}/fee`

_Query futures market trading fee rates_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getfuturesfee-parameters](https://www.gate.io/docs/developers/apiv4/en/#getfuturesfee-parameters)

| Name     | In    | Type   | Required | Description                                             |
| -------- | ----- | ------ | -------- | ------------------------------------------------------- |
| settle   | path  | string | true     | Settle currency                                         |
| contract | query | string | false    | Futures contract, return related data only if specified |

#### [#](#enumerated-values-76) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
{
  "1INCH_USDT": {
    "taker_fee": "0.00025",
    "maker_fee": "-0.00010"
  },
  "AAVE_USDT": {
    "taker_fee": "0.00025",
    "maker_fee": "-0.00010"
  }
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getfuturesfee-responses](https://www.gate.io/docs/developers/apiv4/en/#getfuturesfee-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getfuturesfee-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getfuturesfee-responseschema)

Status Code **200**

_FuturesFee_

| Name                       | Type   | Description                                                                                          |
| -------------------------- | ------ | ---------------------------------------------------------------------------------------------------- |
| » **additionalProperties** | object | The returned result is a map type, where the key represents the market and taker and maker fee rates |
| »» taker_fee               | string | Taker fee                                                                                            |
| »» maker_fee               | string | maker fee                                                                                            |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-batch-orders-by-specified-id-list-2) Cancel batch orders by specified ID list

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancel-batch-orders-by-specified-id-list-2](https://www.gate.io/docs/developers/apiv4/en/#cancel-batch-orders-by-specified-id-list-2)

> Code samples
