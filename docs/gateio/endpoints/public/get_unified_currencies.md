# GET /unified/currencies

**Source:**
[/unified/currencies](https://www.gate.io/docs/developers/apiv4/en/#listunifiedcurrencies-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#list-of-loan-currencies-supported-by-unified-account) List of loan currencies supported by unified account

`GET /unified/currencies`

_List of loan currencies supported by unified account_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunifiedcurrencies-parameters](https://www.gate.io/docs/developers/apiv4/en/#listunifiedcurrencies-parameters)

| Name     | In    | Type   | Required | Description |
| -------- | ----- | ------ | -------- | ----------- |
| currency | query | string | false    | Currency    |

> Example responses

> 200 Response

```
[
  {
    "name": "BTC",
    "prec": "0.000001",
    "min_borrow_amount": "0.01",
    "user_max_borrow_amount": "1000000",
    "total_max_borrow_amount": "1000000",
    "loan_status": "enable"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunifiedcurrencies-responses](https://www.gate.io/docs/developers/apiv4/en/#listunifiedcurrencies-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunifiedcurrencies-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listunifiedcurrencies-responseschema)

Status Code **200**

| Name                      | Type   | Description                                  |
| ------------------------- | ------ | -------------------------------------------- |
| » name                    | string | Currency name                                |
| » prec                    | string | Currency precision                           |
| » min_borrow_amount       | string | Minimum borrowable limit, in currency units  |
| » user_max_borrow_amount  | string | User's maximum borrowable limit, in USDT     |
| » total_max_borrow_amount | string | Platform's maximum borrowable limit, in USDT |
| » loan_status             | string | Lending status                               |

\- `disable` : Lending prohibited  
\- `enable` : Lending supported |

This operation does not require authentication

## [#](#get-historical-lending-rates) Get historical lending rates

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-historical-lending-rates](https://www.gate.io/docs/developers/apiv4/en/#get-historical-lending-rates)

> Code samples
