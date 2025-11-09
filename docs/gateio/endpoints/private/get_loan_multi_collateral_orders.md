# GET /loan/multi_collateral/orders

**Source:** [/loan/multi_collateral/orders](https://www.gate.io/docs/developers/apiv4/en/#listmulticollateralorders-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-multi-currency-collateral-order-list) Query multi-currency collateral order list

`GET /loan/multi_collateral/orders`

_Query multi-currency collateral order list_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listmulticollateralorders-parameters](https://www.gate.io/docs/developers/apiv4/en/#listmulticollateralorders-parameters)

| Name       | In    | Type    | Required | Description                                                                                                                                   |
| ---------- | ----- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| page       | query | integer | false    | Page number                                                                                                                                   |
| limit      | query | integer | false    | Maximum number of records returned in a single list                                                                                           |
| sort       | query | string  | false    | Sort type: `time_desc` - Created time descending (default), `ltv_asc` - Collateral ratio ascending, `ltv_desc` - Collateral ratio descending. |
| order_type | query | string  | false    | Order type: current - Query current orders, fixed - Query fixed orders, defaults to current orders if not specified                           |

> Example responses

> 200 Response

```
[
  {
    "order_id": "10005578",
    "order_type": "fixed",
    "fixed_type": "7d",
    "fixed_rate": 0.00001,
    "expire_time": 1703820105,
    "auto_renew": true,
    "auto_repay": true,
    "current_ltv": "0.0001004349664281",
    "status": "lent",
    "borrow_time": 1702615021,
    "total_left_repay_usdt": "106.491212982",
    "total_left_collateral_usdt": "1060300.18",
    "borrow_currencies": [
      {
        "currency": "GT",
        "index_price": "10.6491",
        "left_repay_principal": "10",
        "left_repay_interest": "0.00002",
        "left_repay_usdt": "106.491212982"
      }
    ],
    "collateral_currencies": [
      {
        "currency": "BTC",
        "index_price": "112794.7",
        "left_collateral": "9.4",
        "left_collateral_usdt": "1060270.18"
      },
      {
        "currency": "USDT",
        "index_price": "1",
        "left_collateral": "30",
        "left_collateral_usdt": "30"
      }
    ]
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listmulticollateralorders-responses](https://www.gate.io/docs/developers/apiv4/en/#listmulticollateralorders-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listmulticollateralorders-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listmulticollateralorders-responseschema)

Status Code **200**

| Name           | Type           | Description                                                  |
| -------------- | -------------- | ------------------------------------------------------------ |
| _None_         | array          | \[Multi-Collateral Order\]                                   |
| » _None_       | object         | Multi-Collateral Order                                       |
| »» order_id    | string         | Order ID                                                     |
| »» order_type  | string         | current - current, fixed - fixed                             |
| »» fixed_type  | string         | Fixed interest rate loan periods: 7d - 7 days, 30d - 30 days |
| »» fixed_rate  | string         | Fixed interest rate                                          |
| »» expire_time | integer(int64) | Expiration time, timestamp, unit in seconds                  |
| »» auto_renew  | boolean        | Fixed interest rate, auto-renewal                            |
| »» auto_repay  | boolean        | Fixed interest rate, auto-repayment                          |
| »» current_ltv | string         | Current collateralization rate                               |
| »» status      | string         | Order status:                                                |

\- initial: Initial state after placing the order  
\- collateral_deducted: Collateral deduction successful  
\- collateral_returning: Loan failed - Collateral return pending  
\- lent: Loan successful  
\- repaying: Repayment in progress  
\- liquidating: Liquidation in progress  
\- finished: Order completed  
\- closed_liquidated: Liquidation and repayment completed | | »» borrow_time |
integer(int64) | Borrowing time, timestamp in seconds | | »»
total_left_repay_usdt | string | Total outstanding value converted to USDT | |
»» total_left_collateral_usdt | string | Total collateral value converted to
USDT | | »» borrow_currencies | array | Borrowing Currency List | | »»»
BorrowCurrencyInfo | object | none | | »»»» currency | string | Currency | |
»»»» index_price | string | Currency Index Price | | »»»» left_repay_principal |
string | Outstanding principal | | »»»» left_repay_interest | string |
Outstanding interest | | »»»» left_repay_usdt | string | Remaining total
outstanding value converted to USDT | | »»» collateral_currencies | array |
Collateral Currency List | | »»»» CollateralCurrencyInfo | object | none | |
»»»»» currency | string | Currency | | »»»»» index_price | string | Currency
Index Price | | »»»»» left_collateral | string | Remaining collateral amount | |
»»»»» left_collateral_usdt | string | Remaining collateral value converted to
USDT |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-order-details) Query order details

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-order-details](https://www.gate.io/docs/developers/apiv4/en/#query-order-details)

> Code samples
