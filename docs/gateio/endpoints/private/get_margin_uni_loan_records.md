# GET /margin/uni/loan_records

**Source:**
[/margin/uni/loan_records](https://www.gate.io/docs/developers/apiv4/en/#listisolateduniloanrecords-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-loan-records-2) Query loan records

`GET /margin/uni/loan_records`

_Query loan records_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listisolateduniloanrecords-parameters](https://www.gate.io/docs/developers/apiv4/en/#listisolateduniloanrecords-parameters)

| Name          | In    | Type           | Required | Description                                         |
| ------------- | ----- | -------------- | -------- | --------------------------------------------------- |
| type          | query | string         | false    | Type: `borrow` - borrow, `repay` - repay            |
| currency      | query | string         | false    | Query by specified currency name                    |
| currency_pair | query | string         | false    | Trading pair                                        |
| page          | query | integer(int32) | false    | Page number                                         |
| limit         | query | integer        | false    | Maximum number of records returned in a single list |

#### [#](#enumerated-values-9) Enumerated Values

| Parameter | Value  |
| --------- | ------ |
| type      | borrow |
| type      | repay  |

> Example responses

> 200 Response

```json
[
  {
    "type": "borrow",
    "currency_pair": "AE_USDT",
    "currency": "USDT",
    "amount": "1000",
    "create_time": 1673247054000
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listisolateduniloanrecords-responses](https://www.gate.io/docs/developers/apiv4/en/#listisolateduniloanrecords-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listisolateduniloanrecords-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listisolateduniloanrecords-responseschema)

Status Code **200**

| Name             | Type           | Description                              |
| ---------------- | -------------- | ---------------------------------------- |
| » _None_         | object         | Borrowing Records                        |
| »» type          | string         | Type: `borrow` - borrow, `repay` - repay |
| »» currency_pair | string         | Trading pair                             |
| »» currency      | string         | Currency                                 |
| »» amount        | string         | Borrow or repayment amount               |
| »» create_time   | integer(int64) | Created time                             |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-interest-deduction-records-2) Query interest deduction records

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-interest-deduction-records-2](https://www.gate.io/docs/developers/apiv4/en/#query-interest-deduction-records-2)

> Code samples
