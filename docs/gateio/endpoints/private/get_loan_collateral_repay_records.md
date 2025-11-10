# GET /loan/collateral/repay_records

**Source:**
[/loan/collateral/repay_records](https://www.gate.io/docs/developers/apiv4/en/#listrepayrecords-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-collateral-loan-repayment-records) Query collateral loan repayment records

`GET /loan/collateral/repay_records`

_Query collateral loan repayment records_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listrepayrecords-parameters](https://www.gate.io/docs/developers/apiv4/en/#listrepayrecords-parameters)

| Name                | In    | Type           | Required | Description                                                            |
| ------------------- | ----- | -------------- | -------- | ---------------------------------------------------------------------- |
| source              | query | string         | true     | Operation type: repay - Regular repayment, liquidate - Liquidation     |
| borrow_currency     | query | string         | false    | Borrowed currency                                                      |
| collateral_currency | query | string         | false    | Collateral currency                                                    |
| page                | query | integer(int32) | false    | Page number                                                            |
| limit               | query | integer        | false    | Maximum number of records returned in a single list                    |
| from                | query | integer(int64) | false    | Start timestamp for the query                                          |
| to                  | query | integer(int64) | false    | End timestamp for the query, defaults to current time if not specified |

> Example responses

> 200 Response

```
[
  {
    "order_id": 10000425,
    "record_id": 181,
    "repaid_amount": "10.00000000000000000000",
    "borrow_currency": "USDT",
    "collateral_currency": "BTC",
    "collateral_amount": "1.00000000000000000000",
    "init_ltv": "0.00039345337648310000",
    "borrow_time": 1688471851,
    "repay_time": 1688526310,
    "total_interest": "0.25446901544300000000",
    "before_left_principal": "11.00000000",
    "pre_left_principal": "990.00000000000000000000",
    "after_left_principal": "990.00000000000000000000",
    "before_left_collateral": "1.00000000000000000000",
    "after_left_collateral": "1.00000000000000000000"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listrepayrecords-responses](https://www.gate.io/docs/developers/apiv4/en/#listrepayrecords-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listrepayrecords-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listrepayrecords-responseschema)

Status Code **200**

| Name                      | Type           | Description                             |
| ------------------------- | -------------- | --------------------------------------- |
| » _None_                  | object         | Repayment record                        |
| »» order_id               | integer(int64) | Order ID                                |
| »» record_id              | integer(int64) | Repayment record ID                     |
| »» repaid_amount          | string         | Repayment amount                        |
| »» borrow_currency        | string         | Borrowed currency                       |
| »» collateral_currency    | string         | Collateral currency                     |
| »» init_ltv               | string         | Initial collateralization rate          |
| »» borrow_time            | integer(int64) | Borrowing time, timestamp               |
| »» repay_time             | integer(int64) | Repayment time, timestamp               |
| »» total_interest         | string         | Total interest                          |
| »» before_left_principal  | string         | Principal to be repaid before repayment |
| »» after_left_principal   | string         | Principal to be repaid after repayment  |
| »» before_left_collateral | string         | Collateral amount before repayment      |
| »» after_left_collateral  | string         | Collateral amount after repayment       |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#increase-or-redeem-collateral) Increase or redeem collateral

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#increase-or-redeem-collateral](https://www.gate.io/docs/developers/apiv4/en/#increase-or-redeem-collateral)

> Code samples
