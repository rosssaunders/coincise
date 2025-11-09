# GET /wallet/small_balance_history

**Source:**
[/wallet/small_balance_history](https://www.gate.io/docs/developers/apiv4/en/#listsmallbalancehistory-parameters)

## Authentication

Required (Private Endpoint)

## [#](#get-convertible-small-balance-currency-history) Get convertible small balance currency history

`GET /wallet/small_balance_history`

_Get convertible small balance currency history_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsmallbalancehistory-parameters](https://www.gate.io/docs/developers/apiv4/en/#listsmallbalancehistory-parameters)

| Name     | In    | Type           | Required | Description                                                              |
| -------- | ----- | -------------- | -------- | ------------------------------------------------------------------------ |
| currency | query | string         | false    | Currency to convert                                                      |
| page     | query | integer(int32) | false    | Page number                                                              |
| limit    | query | integer(int32) | false    | Maximum number of items returned. Default: 100, minimum: 1, maximum: 100 |

> Example responses

> 200 Response

```
[
  [
    {
      "id": "28583810",
      "create_time": 1706670777,
      "currency": "FLOKI",
      "amount": "182.29400000",
      "gt_amount": "0.001079"
    }
  ]
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsmallbalancehistory-responses](https://www.gate.io/docs/developers/apiv4/en/#listsmallbalancehistory-responses)

| Status | Meaning                                                                    | Description | Schema     |
| ------ | -------------------------------------------------------------------------- | ----------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success     | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsmallbalancehistory-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listsmallbalancehistory-responseschema)

Status Code **200**

| Name           | Type           | Description                |
| -------------- | -------------- | -------------------------- |
| » _None_       | object         | Small Balance Conversion   |
| »» id          | string         | Order ID                   |
| »» currency    | string         | Currency                   |
| »» amount      | string         | Swap Amount                |
| »» gt_amount   | string         | GT amount                  |
| »» create_time | integer(int64) | Exchange time (in seconds) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-uid-transfer-history) Get UID transfer history

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-uid-transfer-history](https://www.gate.io/docs/developers/apiv4/en/#get-uid-transfer-history)

> Code samples
