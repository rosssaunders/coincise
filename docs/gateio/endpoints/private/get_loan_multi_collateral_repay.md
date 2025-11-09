# GET /loan/multi_collateral/repay

**Source:** [/loan/multi_collateral/repay](https://www.gate.io/docs/developers/apiv4/en/#listmultirepayrecords-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-multi-currency-collateral-repayment-records) Query multi-currency collateral repayment records

`GET /loan/multi_collateral/repay`

_Query multi-currency collateral repayment records_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listmultirepayrecords-parameters](https://www.gate.io/docs/developers/apiv4/en/#listmultirepayrecords-parameters)

| Name            | In    | Type           | Required | Description                                                            |
| --------------- | ----- | -------------- | -------- | ---------------------------------------------------------------------- |
| type            | query | string         | true     | Operation type: repay - Regular repayment, liquidate - Liquidation     |
| borrow_currency | query | string         | false    | Borrowed currency                                                      |
| page            | query | integer        | false    | Page number                                                            |
| limit           | query | integer        | false    | Maximum number of records returned in a single list                    |
| from            | query | integer(int64) | false    | Start timestamp for the query                                          |
| to              | query | integer(int64) | false    | End timestamp for the query, defaults to current time if not specified |

> Example responses

> 200 Response

```
[
  {
    "order_id": 10005679,
    "record_id": 1348,
    "init_ltv": "0.2141",
    "before_ltv": "0.215",
    "after_ltv": "0.312",
    "borrow_time": 1702995889,
    "repay_time": 1703053927,
    "borrow_currencies": [
      {
        "currency": "BAT",
        "index_price": "103.02",
        "before_amount": "1",
        "before_amount_usdt": "103.02",
        "after_amount": "0.999017",
        "after_amount_usdt": "102.91873134"
      }
    ],
    "collateral_currencies": [
      {
        "currency": "ETC",
        "index_price": "0.6014228107",
        "before_amount": "1000",
        "before_amount_usdt": "601.4228107",
        "after_amount": "1000",
        "after_amount_usdt": "601.4228107"
      }
    ],
    "repaid_currencies": [
      {
        "currency": "BAT",
        "index_price": "103.02",
        "repaid_amount": "0.001",
        "repaid_principal": "0.000983",
        "repaid_interest": "0.000017",
        "repaid_amount_usdt": "0.10302"
      }
    ],
    "total_interest_list": [
      {
        "currency": "BAT",
        "index_price": "103.02",
        "amount": "0.000017",
        "amount_usdt": "0.00175134"
      }
    ],
    "left_repay_interest_list": [
      {
        "currency": "BAT",
        "index_price": "103.02",
        "before_amount": "0.000017",
        "before_amount_usdt": "0.00175134",
        "after_amount": "0",
        "after_amount_usdt": "0"
      }
    ]
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listmultirepayrecords-responses](https://www.gate.io/docs/developers/apiv4/en/#listmultirepayrecords-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listmultirepayrecords-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listmultirepayrecords-responseschema)

Status Code **200**

| Name                          | Type           | Description                                          |
| ----------------------------- | -------------- | ---------------------------------------------------- |
| » _None_                      | object         | Multi-Collateral Repayment Record                    |
| »» order_id                   | integer(int64) | Order ID                                             |
| »» record_id                  | integer(int64) | Repayment record ID                                  |
| »» init_ltv                   | string         | Initial collateralization rate                       |
| »» before_ltv                 | string         | Ltv before the operation                             |
| »» after_ltv                  | string         | Ltv after the operation                              |
| »» borrow_time                | integer(int64) | Borrowing time, timestamp in seconds                 |
| »» repay_time                 | integer(int64) | Repayment time, timestamp in seconds                 |
| »» borrow_currencies          | array          | List of borrowing information                        |
| »»» currency                  | string         | Currency                                             |
| »»» index_price               | string         | Currency Index Price                                 |
| »»» before_amount             | string         | Amount before the operation                          |
| »»» before_amount_usdt        | string         | USDT Amount before the operation                     |
| »»» after_amount              | string         | Amount after the operation                           |
| »»» after_amount_usdt         | string         | USDT Amount after the operation                      |
| »» collateral_currencies      | array          | List of collateral information                       |
| »»» currency                  | string         | Currency                                             |
| »»» index_price               | string         | Currency Index Price                                 |
| »»» before_amount             | string         | Amount before the operation                          |
| »»» before_amount_usdt        | string         | USDT Amount before the operation                     |
| »»» after_amount              | string         | Amount after the operation                           |
| »»» after_amount_usdt         | string         | USDT Amount after the operation                      |
| »» repaid_currencies          | array          | Repay Currency List                                  |
| »»» RepayRecordRepaidCurrency | object         | none                                                 |
| »»»» currency                 | string         | Repayment currency                                   |
| »»»» index_price              | string         | Currency Index Price                                 |
| »»»» repaid_amount            | string         | Repayment amount                                     |
| »»»» repaid_principal         | string         | Principal                                            |
| »»»» repaid_interest          | string         | Interest                                             |
| »»»» repaid_amount_usdt       | string         | Repayment amount converted to USDT                   |
| »»» total_interest_list       | array          | Total Interest List                                  |
| »»»» RepayRecordTotalInterest | object         | none                                                 |
| »»»»» currency                | string         | Currency                                             |
| »»»»» index_price             | string         | Currency Index Price                                 |
| »»»»» amount                  | string         | Interest Amount                                      |
| »»»»» amount_usdt             | string         | Interest amount converted to USDT                    |
| »»»» left_repay_interest_list | array          | List of remaining interest to be repaid              |
| »»»»» RepayRecordLeftInterest | object         | none                                                 |
| »»»»»» currency               | string         | Currency                                             |
| »»»»»» index_price            | string         | Currency Index Price                                 |
| »»»»»» before_amount          | string         | Interest amount before repayment                     |
| »»»»»» before_amount_usdt     | string         | Converted value of interest before repayment in USDT |
| »»»»»» after_amount           | string         | Interest amount after repayment                      |
| »»»»»» after_amount_usdt      | string         | Converted value of interest after repayment in USDT  |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#add-or-withdraw-collateral) Add or withdraw collateral

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#add-or-withdraw-collateral](https://www.gate.io/docs/developers/apiv4/en/#add-or-withdraw-collateral)

> Code samples
