# GET /margin/transferable

**Source:**
[/margin/transferable](https://www.gate.io/docs/developers/apiv4/en/#getisolatedmargintransferable-parameters)

## Authentication

Required (Private Endpoint)

## [#](#get-maximum-transferable-amount-for-isolated-margin) Get maximum transferable amount for isolated margin

`GET /margin/transferable`

_Get maximum transferable amount for isolated margin_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getisolatedmargintransferable-parameters](https://www.gate.io/docs/developers/apiv4/en/#getisolatedmargintransferable-parameters)

| Name          | In    | Type   | Required | Description                      |
| ------------- | ----- | ------ | -------- | -------------------------------- |
| currency      | query | string | true     | Query by specified currency name |
| currency_pair | query | string | false    | Trading pair                     |

> Example responses

> 200 Response

```json
{
  "currency": "ETH",
  "currency_pair": "ETH_USDT",
  "amount": "10000"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getisolatedmargintransferable-responses](https://www.gate.io/docs/developers/apiv4/en/#getisolatedmargintransferable-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getisolatedmargintransferable-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getisolatedmargintransferable-responseschema)

Status Code **200**

_MarginTransferable_

| Name            | Type   | Description             |
| --------------- | ------ | ----------------------- |
| » currency      | string | Currency detail         |
| » currency_pair | string | Trading pair            |
| » amount        | string | Max transferable amount |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-lending-markets) List lending markets

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#list-lending-markets](https://www.gate.io/docs/developers/apiv4/en/#list-lending-markets)

> Code samples
