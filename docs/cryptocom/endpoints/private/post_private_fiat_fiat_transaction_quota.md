# POST private/fiat/fiat-transaction-quota

**Source:**
[private/fiat/fiat-transaction-quota](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-fiat-fiat-transaction-quota)

## Authentication

Required (Private Endpoint)

## private/fiat/fiat-transaction-quota

> Request Sample

```
{
  "id": "123456",
  "method": "private/fiat/fiat-transaction-quota",
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
    "details": {
      "currency": "USD",
      "payment_network": "usd_cubix",
      "network_name": "CUBIX",
      "monthly_quota_in_usd": {
        "currency": "USD",
        "amount": null
      },
      "daily_quota_in_usd": {
        "currency": "USD",
        "amount": "5000000.0"
      },
      "used_monthly_quota_in_usd": {
        "currency": "USD",
        "amount": "0.0"
      },
      "used_daily_quota_in_usd": {
        "currency": "USD",
        "amount": "0.0"
      },
      "remaining_monthly_quota_in_usd": {
        "currency": "USD",
        "amount": null
      },
      "remaining_daily_quota_in_usd": {
        "currency": "USD",
        "amount": "5000000.0"
      },
      "minimum_withdrawal_amount_in_usd": {
        "currency": "USD",
        "amount": "500.0"
      },
      "monthly_quota": {
        "currency": "USD",
        "amount": null
      },
      "daily_quota": {
        "currency": "USD",
        "amount": "5000000.0"
      },
      "used_monthly_quota": {
        "currency": "USD",
        "amount": "0.0"
      },
      "used_daily_quota": {
        "currency": "USD",
        "amount": "0.0"
      },
      "remaining_monthly_quota": {
        "currency": "USD",
        "amount": null
      },
      "remaining_daily_quota": {
        "currency": "USD",
        "amount": "5000000.0"
      },
      "minimum_withdrawal_amount": {
        "currency": "USD",
        "amount": "500.0"
      },
      "currency_daily_quota": {
        "currency": "USD",
        "amount": "10000000.0"
      },
      "currency_monthly_quota": {
        "currency": "USD",
        "amount": null
      },
      "currency_used_daily_quota": {
        "currency": "USD",
        "amount": "0.0"
      },
      "currency_used_monthly_quota": {
        "currency": "USD",
        "amount": "0.0"
      },
      "currency_remaining_daily_quota": {
        "currency": "USD",
        "amount": "10000000.0"
      },
      "currency_remaining_monthly_quota": {
        "currency": "USD",
        "amount": null
      },
      "transactions_per_day": 10,
      "transactions_per_month": 100,
      "transactions_daily_count": 0,
      "transactions_monthly_count": 0,
      "remaining_transactions_daily_count": 10,
      "remaining_transactions_monthly_count": 100,
      "currency_transactions_per_day": 10,
      "currency_transactions_per_month": 100,
      "currency_transactions_daily_count": 0,
      "currency_transactions_monthly_count": 0,
      "currency_remaining_transactions_daily_count": 10,
      "currency_remaining_transactions_monthly_count": 100
    }
  }
}
```

Retrieves transaction quota information for a specific payment network.

### Request Params

| Field  | Type   | Required | Description                           |
| ------ | ------ | -------- | ------------------------------------- |
| id     | string | Y        | Unique request identifier             |
| method | string | Y        | "private/fiat/fiat-transaction-quota" |
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

| Field   | Type   | Required | Description                |
| ------- | ------ | -------- | -------------------------- |
| details | object | Y        | Detailed quota information |

\***\*details\*\*** consists of:

| Field                                         | Type   | Required | Description                                                           |
| --------------------------------------------- | ------ | -------- | --------------------------------------------------------------------- |
| currency                                      | string | Y        | Currency code                                                         |
| payment_network                               | string | Y        | Payment network identifier                                            |
| network_name                                  | string | Y        | Human-readable network name                                           |
| monthly_quota_in_usd                          | object | Y        | Monthly quota in USD (currency/amount object)                         |
| daily_quota_in_usd                            | object | Y        | Daily quota in USD (currency/amount object)                           |
| used_monthly_quota_in_usd                     | object | Y        | Used monthly quota in USD (currency/amount object)                    |
| used_daily_quota_in_usd                       | object | Y        | Used daily quota in USD (currency/amount object)                      |
| remaining_monthly_quota_in_usd                | object | Y        | Remaining monthly quota in USD (currency/amount object)               |
| remaining_daily_quota_in_usd                  | object | Y        | Remaining daily quota in USD (currency/amount object)                 |
| minimum_withdrawal_amount_in_usd              | object | Y        | Minimum withdrawal amount in USD (currency/amount object)             |
| monthly_quota                                 | object | Y        | Monthly quota in native currency (currency/amount object)             |
| daily_quota                                   | object | Y        | Daily quota in native currency (currency/amount object)               |
| used_monthly_quota                            | object | Y        | Used monthly quota in native currency (currency/amount object)        |
| used_daily_quota                              | object | Y        | Used daily quota in native currency (currency/amount object)          |
| remaining_monthly_quota                       | object | Y        | Remaining monthly quota in native currency (currency/amount object)   |
| remaining_daily_quota                         | object | Y        | Remaining daily quota in native currency (currency/amount object)     |
| minimum_withdrawal_amount                     | object | Y        | Minimum withdrawal amount in native currency (currency/amount object) |
| currency_daily_quota                          | object | Y        | Currency-level daily quota (currency/amount object)                   |
| currency_monthly_quota                        | object | Y        | Currency-level monthly quota (currency/amount object)                 |
| currency_used_daily_quota                     | object | Y        | Currency-level used daily quota (currency/amount object)              |
| currency_used_monthly_quota                   | object | Y        | Currency-level used monthly quota (currency/amount object)            |
| currency_remaining_daily_quota                | object | Y        | Currency-level remaining daily quota (currency/amount object)         |
| currency_remaining_monthly_quota              | object | Y        | Currency-level remaining monthly quota (currency/amount object)       |
| transactions_per_day                          | number | N        | Maximum transactions per day (null if no limit)                       |
| transactions_per_month                        | number | N        | Maximum transactions per month (null if no limit)                     |
| transactions_daily_count                      | number | Y        | Current daily transaction count                                       |
| transactions_monthly_count                    | number | Y        | Current monthly transaction count                                     |
| remaining_transactions_daily_count            | number | N        | Remaining daily transactions (null if no limit)                       |
| remaining_transactions_monthly_count          | number | N        | Remaining monthly transactions (null if no limit)                     |
| currency_transactions_per_day                 | number | N        | Currency-level max transactions per day (null if no limit)            |
| currency_transactions_per_month               | number | N        | Currency-level max transactions per month (null if no limit)          |
| currency_transactions_daily_count             | number | Y        | Currency-level current daily transaction count                        |
| currency_transactions_monthly_count           | number | Y        | Currency-level current monthly transaction count                      |
| currency_remaining_transactions_daily_count   | number | N        | Currency-level remaining daily transactions (null if no limit)        |
| currency_remaining_transactions_monthly_count | number | N        | Currency-level remaining monthly transactions (null if no limit)      |

\***\*Currency/Amount Object\*\*** consists of:

| Field    | Type   | Required | Description                                   |
| -------- | ------ | -------- | --------------------------------------------- |
| currency | string | Y        | Currency code (e.g., "USD")                   |
| amount   | string | N        | Amount as string (null if no limit/unlimited) |

### Applies To

REST

### REST Method

POST
