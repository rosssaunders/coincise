# POST private/fiat/fiat-transaction-limit

**Source:**
[private/fiat/fiat-transaction-limit](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-fiat-fiat-transaction-limit)

## Authentication

Required (Private Endpoint)

## private/fiat/fiat-transaction-limit

> Request Sample

```
{
  "id": "123456",
  "method": "private/fiat/fiat-transaction-limit",
  "params": {
    "payment_network": "usd_cubix"
  },
  "nonce": 1640995200000
}
```

> Response Sample

```
{
    "id": 0,
    "code": 0,
    "result": {
        "deposit": {
            "min_deposit_amount": {
                "currency": "USD",
                "amount": "500"
            },
            "daily_max_deposit_amount": {
                "currency": "USD",
                "amount": null
            },
            "monthly_max_deposit_amount": {
                "currency": "USD",
                "amount": null
            },
            "currency_daily_max_deposit_amount": {
                "currency": "USD",
                "amount": null
            },
            "currency_monthly_max_deposit_amount": {
                "currency": "USD",
                "amount": null
            },
            "daily_quota": 0,
            "monthly_quota": 0,
            "daily_transaction_count": 0,
            "monthly_transaction_count": 0,
            "currency_daily_transaction_count": 0,
            "currency_monthly_transaction_count": 0,
            "fee_amount": {
                "currency": "USD",
                "amount": "0"
            },
            "daily_max_transaction_count": 0,
            "monthly_max_transaction_count": 0,
            "currency_daily_max_transaction_count": 0,
            "currency_monthly_max_transaction_count": 0
        },
        "payment": {
            "name": "CUBIX",
            "full_name": "CUBIX",
            "review_time_description": "1-2 working days",
            "review_time": {
                "min": "1",
                "max": "2",
                "unit": "working days"
            },
            "bank_transfer_time_description": "1-4 working days",
            "bank_transfer_time": {
                "min": "1",
                "max": "4",
                "unit": "working days"
            },
            "min_payment_amount": {
                "currency": "USD",
                "amount": "500"
            },
            "daily_max_payment_amount": {
                "currency": "USD",
                "amount": "5000000"
            },
            "monthly_max_payment_amount": {
                "currency": "USD",
                "amount": null
            },
            "auto_approve_max_payment_amount": {
                "currency": "USD",
                "amount": "5000000"
            },
            "currency_daily_max_payment_amount": {
                "currency": "USD",
                "amount": "10000000"
            },
            "currency_monthly_max_payment_amount": {
                "currency": "USD",
                "amount": null
            },
            "fee_amount": {
                "currency": "USD",
                "amount": "0"
            },
            "refund_fee_amount": {
                "currency": "USD",
                "amount": "0"
            },
            "daily_transaction_count": 0,
            "monthly_transaction_count": 0,
            "currency_daily_transaction_count": 0,
            "currency_monthly_transaction_count": 0,
            "daily_max_transaction_count": 0,
            "monthly_max_transaction_count": 0,
            "currency_daily_max_transaction_count": 0,
            "currency_monthly_max_transaction_count": 0
        }
    }
}
```

Retrieves transaction limits for a specific payment network.

### Request Params

| Field  | Type   | Required | Description                           |
| ------ | ------ | -------- | ------------------------------------- |
| id     | string | Y        | Unique request identifier             |
| method | string | Y        | "private/fiat/fiat-transaction-limit" |
| params | object | Y        | Request parameters                    |
| nonce  | number | Y        | Unix timestamp in milliseconds        |

\***\*params\*\*** consists of:

| Field           | Type   | Required | Description                |
| --------------- | ------ | -------- | -------------------------- |
| payment_network | string | Y        | Payment network identifier |

### Response Params

| Field  | Type   | Required | Description                                                |
| ------ | ------ | -------- | ---------------------------------------------------------- |
| id     | number | N        | Echo back the request identifier from the original request |
| code   | number | Y        | 0 for success; otherwise, see error details                |
| result | object | Y        | See below                                                  |

\***\*result\*\*** consists of:

| Field   | Type   | Required | Description                    |
| ------- | ------ | -------- | ------------------------------ |
| deposit | object | Y        | Deposit limits and information |
| payment | object | Y        | Payment limits and information |

\***\*deposit\*\*** consists of:

| Field                                  | Type   | Required | Description                                                                         |
| -------------------------------------- | ------ | -------- | ----------------------------------------------------------------------------------- |
| min_deposit_amount                     | object | Y        | Minimum deposit amount (currency/amount object)                                     |
| daily_max_deposit_amount               | object | Y        | Daily maximum deposit amount (currency/amount object) (null/0 means no limit)       |
| monthly_max_deposit_amount             | object | Y        | Monthly maximum deposit amount (currency/amount object) (null/0 means no limit)     |
| currency_daily_max_deposit_amount      | object | Y        | Currency-level daily max deposit (currency/amount object) (null/0 means no limit)   |
| currency_monthly_max_deposit_amount    | object | Y        | Currency-level monthly max deposit (currency/amount object) (null/0 means no limit) |
| daily_quota                            | number | Y        | Daily quota count (null/0 means no limit)                                           |
| monthly_quota                          | number | Y        | Monthly quota count (null/0 means no limit)                                         |
| daily_transaction_count                | number | Y        | Current daily transaction count (null/0 means no limit)                             |
| monthly_transaction_count              | number | Y        | Current monthly transaction count (null/0 means no limit)                           |
| currency_daily_transaction_count       | number | Y        | Currency-level daily transaction count (null/0 means no limit)                      |
| currency_monthly_transaction_count     | number | Y        | Currency-level monthly transaction count (null/0 means no limit)                    |
| fee_amount                             | object | Y        | Fee amount (currency/amount object)                                                 |
| daily_max_transaction_count            | number | Y        | Maximum daily transaction count (null/0 means no limit)                             |
| monthly_max_transaction_count          | number | Y        | Maximum monthly transaction count (null/0 means no limit)                           |
| currency_daily_max_transaction_count   | number | Y        | Currency-level max daily transaction count (null/0 means no limit)                  |
| currency_monthly_max_transaction_count | number | Y        | Currency-level max monthly transaction count (null/0 means no limit)                |

\***\*payment\*\*** consists of:

| Field                                  | Type   | Required | Description                                                                         |
| -------------------------------------- | ------ | -------- | ----------------------------------------------------------------------------------- |
| name                                   | string | Y        | Payment network name                                                                |
| full_name                              | string | Y        | Payment network full name                                                           |
| review_time_description                | string | Y        | Human-readable review time description                                              |
| review_time                            | object | Y        | Review time details (min/max/unit object)                                           |
| bank_transfer_time_description         | string | Y        | Human-readable bank transfer time description                                       |
| bank_transfer_time                     | object | Y        | Bank transfer time details (min/max/unit object)                                    |
| min_payment_amount                     | object | Y        | Minimum payment amount (currency/amount object)                                     |
| daily_max_payment_amount               | object | Y        | Daily maximum payment amount (currency/amount object) (null/0 means no limit)       |
| monthly_max_payment_amount             | object | Y        | Monthly maximum payment amount (currency/amount object) (null/0 means no limit)     |
| auto_approve_max_payment_amount        | object | Y        | Auto-approve maximum amount (currency/amount object) (null/0 means no limit)        |
| currency_daily_max_payment_amount      | object | Y        | Currency-level daily max payment (currency/amount object) (null/0 means no limit)   |
| currency_monthly_max_payment_amount    | object | Y        | Currency-level monthly max payment (currency/amount object) (null/0 means no limit) |
| fee_amount                             | object | Y        | Fee amount (currency/amount object)                                                 |
| refund_fee_amount                      | object | Y        | Refund fee amount (currency/amount object)                                          |
| daily_transaction_count                | number | Y        | Current daily transaction count                                                     |
| monthly_transaction_count              | number | Y        | Current monthly transaction count                                                   |
| currency_daily_transaction_count       | number | Y        | Currency-level daily transaction count                                              |
| currency_monthly_transaction_count     | number | Y        | Currency-level monthly transaction count                                            |
| daily_max_transaction_count            | number | Y        | Maximum daily transaction count (null/0 means no limit)                             |
| monthly_max_transaction_count          | number | Y        | Maximum monthly transaction count (null/0 means no limit)                           |
| currency_daily_max_transaction_count   | number | Y        | Currency-level max daily transaction count (null/0 means no limit)                  |
| currency_monthly_max_transaction_count | number | Y        | Currency-level max monthly transaction count (null/0 means no limit)                |

### Applies To

REST

### REST Method

POST
