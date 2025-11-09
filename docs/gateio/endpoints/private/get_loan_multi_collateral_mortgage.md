# GET /loan/multi_collateral/mortgage

**Source:**
[/loan/multi_collateral/mortgage](https://www.gate.io/docs/developers/apiv4/en/#listmulticollateralrecords-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-collateral-adjustment-records-2) Query collateral adjustment records

`GET /loan/multi_collateral/mortgage`

_Query collateral adjustment records_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listmulticollateralrecords-parameters](https://www.gate.io/docs/developers/apiv4/en/#listmulticollateralrecords-parameters)

| Name                | In    | Type           | Required | Description                                                            |
| ------------------- | ----- | -------------- | -------- | ---------------------------------------------------------------------- |
| page                | query | integer        | false    | Page number                                                            |
| limit               | query | integer        | false    | Maximum number of records returned in a single list                    |
| from                | query | integer(int64) | false    | Start timestamp for the query                                          |
| to                  | query | integer(int64) | false    | End timestamp for the query, defaults to current time if not specified |
| collateral_currency | query | string         | false    | Collateral currency                                                    |

> Example responses

> 200 Response

```
[
  {
    "order_id": 10000417,
    "record_id": 10000452,
    "before_ltv": "0.00039345555621480000",
    "after_ltv": "0.00019672777810740000",
    "operate_time": 1688461924,
    "borrow_currencies": [
      {
        "currency": "BTC",
        "index_price": "30000",
        "before_amount": "0.1",
        "before_amount_usdt": "1000",
        "after_amount": "0.6",
        "after_amount_usdt": "1006"
      }
    ],
    "collateral_currencies": [
      {
        "currency": "BTC",
        "index_price": "30000",
        "before_amount": "0.1",
        "before_amount_usdt": "1000",
        "after_amount": "0.6",
        "after_amount_usdt": "1006"
      }
    ]
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listmulticollateralrecords-responses](https://www.gate.io/docs/developers/apiv4/en/#listmulticollateralrecords-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listmulticollateralrecords-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listmulticollateralrecords-responseschema)

Status Code **200**

| Name                     | Type           | Description                          |
| ------------------------ | -------------- | ------------------------------------ |
| » _None_                 | object         | Multi-Collateral adjustment record   |
| »» order_id              | integer(int64) | Order ID                             |
| »» record_id             | integer(int64) | Collateral record ID                 |
| »» before_ltv            | string         | Collateral ratio before adjustment   |
| »» after_ltv             | string         | Collateral ratio before adjustment   |
| »» operate_time          | integer(int64) | Operation time, timestamp in seconds |
| »» borrow_currencies     | array          | Borrowing Currency List              |
| »»» currency             | string         | Currency                             |
| »»» index_price          | string         | Currency Index Price                 |
| »»» before_amount        | string         | Amount before the operation          |
| »»» before_amount_usdt   | string         | USDT Amount before the operation     |
| »»» after_amount         | string         | Amount after the operation           |
| »»» after_amount_usdt    | string         | USDT Amount after the operation      |
| »» collateral_currencies | array          | Collateral Currency List             |
| »»» currency             | string         | Currency                             |
| »»» index_price          | string         | Currency Index Price                 |
| »»» before_amount        | string         | Amount before the operation          |
| »»» before_amount_usdt   | string         | USDT Amount before the operation     |
| »»» after_amount         | string         | Amount after the operation           |
| »»» after_amount_usdt    | string         | USDT Amount after the operation      |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-user-s-collateral-and-borrowing-currency-quota-information) Query user's collateral and borrowing currency quota information

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-user-s-collateral-and-borrowing-currency-quota-information](https://www.gate.io/docs/developers/apiv4/en/#query-user-s-collateral-and-borrowing-currency-quota-information)

> Code samples
