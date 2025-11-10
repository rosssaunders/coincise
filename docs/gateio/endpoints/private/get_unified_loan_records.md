# GET /unified/loan_records

**Source:**
[/unified/loan_records](https://www.gate.io/docs/developers/apiv4/en/#listunifiedloanrecords-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-loan-records) Query loan records

`GET /unified/loan_records`

_Query loan records_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunifiedloanrecords-parameters](https://www.gate.io/docs/developers/apiv4/en/#listunifiedloanrecords-parameters)

| Name     | In    | Type           | Required | Description                                                              |
| -------- | ----- | -------------- | -------- | ------------------------------------------------------------------------ |
| type     | query | string         | false    | Loan record type: borrow - borrowing, repay - repayment                  |
| currency | query | string         | false    | Query by specified currency name                                         |
| page     | query | integer(int32) | false    | Page number                                                              |
| limit    | query | integer(int32) | false    | Maximum number of items returned. Default: 100, minimum: 1, maximum: 100 |

> Example responses

> 200 Response

```
[
  {
    "id": 16442,
    "type": "borrow",
    "margin_mode": "cross",
    "currency_pair": "AE_USDT",
    "currency": "USDT",
    "amount": "1000",
    "create_time": 1673247054000,
    "repayment_type": "auto_repay"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunifiedloanrecords-responses](https://www.gate.io/docs/developers/apiv4/en/#listunifiedloanrecords-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunifiedloanrecords-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listunifiedloanrecords-responseschema)

Status Code **200**

| Name              | Type           | Description                                                                                                                                                                                                                              |
| ----------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » _None_          | object         | Borrowing Records                                                                                                                                                                                                                        |
| »» id             | integer(int64) | id                                                                                                                                                                                                                                       |
| »» type           | string         | Type: `borrow` - borrow, `repay` - repay                                                                                                                                                                                                 |
| »» repayment_type | string         | Repayment type: none - No repayment type, manual_repay - Manual repayment, auto_repay - Automatic repayment, cancel_auto_repay - Automatic repayment after order cancellation, different_currencies_repayment - Cross-currency repayment |
| »» borrow_type    | string         | Borrowing type, returned when querying loan records: manual_borrow - Manual borrowing, auto_borrow - Automatic borrowing                                                                                                                 |
| »» currency_pair  | string         | Trading pair                                                                                                                                                                                                                             |
| »» currency       | string         | Currency                                                                                                                                                                                                                                 |
| »» amount         | string         | Borrow or repayment amount                                                                                                                                                                                                               |
| »» create_time    | integer(int64) | Created time                                                                                                                                                                                                                             |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-interest-deduction-records) Query interest deduction records

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-interest-deduction-records](https://www.gate.io/docs/developers/apiv4/en/#query-interest-deduction-records)

> Code samples
