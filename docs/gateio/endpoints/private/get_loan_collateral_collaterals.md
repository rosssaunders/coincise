# GET /loan/collateral/collaterals

**Source:**
[/loan/collateral/collaterals](https://www.gate.io/docs/developers/apiv4/en/#listcollateralrecords-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-collateral-adjustment-records) Query collateral adjustment records

`GET /loan/collateral/collaterals`

_Query collateral adjustment records_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listcollateralrecords-parameters](https://www.gate.io/docs/developers/apiv4/en/#listcollateralrecords-parameters)

| Name                | In    | Type           | Required | Description                                                            |
| ------------------- | ----- | -------------- | -------- | ---------------------------------------------------------------------- |
| page                | query | integer(int32) | false    | Page number                                                            |
| limit               | query | integer        | false    | Maximum number of records returned in a single list                    |
| from                | query | integer(int64) | false    | Start timestamp for the query                                          |
| to                  | query | integer(int64) | false    | End timestamp for the query, defaults to current time if not specified |
| borrow_currency     | query | string         | false    | Borrowed currency                                                      |
| collateral_currency | query | string         | false    | Collateral currency                                                    |

> Example responses

> 200 Response

```json
[
  {
    "order_id": 10000417,
    "record_id": 10000452,
    "borrow_currency": "USDT",
    "borrow_amount": "1000.00000000000000000000",
    "collateral_currency": "BTC",
    "pre_collateral": "1.00000000000000000000",
    "after_collateral": "2.00000000000000000000",
    "pre_ltv": "0.00039345555621480000",
    "after_ltv": "0.00019672777810740000",
    "operate_time": 1688461924
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listcollateralrecords-responses](https://www.gate.io/docs/developers/apiv4/en/#listcollateralrecords-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listcollateralrecords-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listcollateralrecords-responseschema)

Status Code **200**

| Name                   | Type           | Description                          |
| ---------------------- | -------------- | ------------------------------------ |
| » _None_               | object         | Collateral record                    |
| »» order_id            | integer(int64) | Order ID                             |
| »» record_id           | integer(int64) | Collateral record ID                 |
| »» borrow_currency     | string         | Borrowed currency                    |
| »» borrow_amount       | string         | Borrowed amount                      |
| »» collateral_currency | string         | Collateral currency                  |
| »» before_collateral   | string         | Collateral amount before adjustment  |
| »» after_collateral    | string         | Collateral amount after adjustment   |
| »» before_ltv          | string         | Collateral ratio before adjustment   |
| »» after_ltv           | string         | Collateral ratio after adjustment    |
| »» operate_time        | integer(int64) | Operation time, timestamp in seconds |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-user-s-total-borrowing-and-collateral-amount) Query user's total borrowing and collateral amount

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-user-s-total-borrowing-and-collateral-amount](https://www.gate.io/docs/developers/apiv4/en/#query-user-s-total-borrowing-and-collateral-amount)

> Code samples
