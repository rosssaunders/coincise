# POST private/fiat/fiat-transaction-quota

**Source:** [private/fiat/fiat-transaction-quota](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-fiat-fiat-transaction-quota)

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

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | Y | Unique request identifier |
| method | string | Y | "private/fiat/fiat-transaction-quota" |
| params | object | Y | Request parameters |
| nonce | number | Y | Unix timestamp in milliseconds |

  
****params**** consists of:  

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| payment\_network | string | Y | Payment network identifier |

### Response Params

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| id | number | N | Echo back the request identifier from the original request |
| code | number | Y | 0 for success; otherwise, see error details |
| result | object | Y | See below |

  
****result**** consists of:  

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| details | object | Y | Detailed quota information |

  
****details**** consists of:  

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| currency | string | Y | Currency code |
| payment\_network | string | Y | Payment network identifier |
| network\_name | string | Y | Human-readable network name |
| monthly\_quota\_in\_usd | object | Y | Monthly quota in USD (currency/amount object) |
| daily\_quota\_in\_usd | object | Y | Daily quota in USD (currency/amount object) |
| used\_monthly\_quota\_in\_usd | object | Y | Used monthly quota in USD (currency/amount object) |
| used\_daily\_quota\_in\_usd | object | Y | Used daily quota in USD (currency/amount object) |
| remaining\_monthly\_quota\_in\_usd | object | Y | Remaining monthly quota in USD (currency/amount object) |
| remaining\_daily\_quota\_in\_usd | object | Y | Remaining daily quota in USD (currency/amount object) |
| minimum\_withdrawal\_amount\_in\_usd | object | Y | Minimum withdrawal amount in USD (currency/amount object) |
| monthly\_quota | object | Y | Monthly quota in native currency (currency/amount object) |
| daily\_quota | object | Y | Daily quota in native currency (currency/amount object) |
| used\_monthly\_quota | object | Y | Used monthly quota in native currency (currency/amount object) |
| used\_daily\_quota | object | Y | Used daily quota in native currency (currency/amount object) |
| remaining\_monthly\_quota | object | Y | Remaining monthly quota in native currency (currency/amount object) |
| remaining\_daily\_quota | object | Y | Remaining daily quota in native currency (currency/amount object) |
| minimum\_withdrawal\_amount | object | Y | Minimum withdrawal amount in native currency (currency/amount object) |
| currency\_daily\_quota | object | Y | Currency-level daily quota (currency/amount object) |
| currency\_monthly\_quota | object | Y | Currency-level monthly quota (currency/amount object) |
| currency\_used\_daily\_quota | object | Y | Currency-level used daily quota (currency/amount object) |
| currency\_used\_monthly\_quota | object | Y | Currency-level used monthly quota (currency/amount object) |
| currency\_remaining\_daily\_quota | object | Y | Currency-level remaining daily quota (currency/amount object) |
| currency\_remaining\_monthly\_quota | object | Y | Currency-level remaining monthly quota (currency/amount object) |
| transactions\_per\_day | number | N | Maximum transactions per day (null if no limit) |
| transactions\_per\_month | number | N | Maximum transactions per month (null if no limit) |
| transactions\_daily\_count | number | Y | Current daily transaction count |
| transactions\_monthly\_count | number | Y | Current monthly transaction count |
| remaining\_transactions\_daily\_count | number | N | Remaining daily transactions (null if no limit) |
| remaining\_transactions\_monthly\_count | number | N | Remaining monthly transactions (null if no limit) |
| currency\_transactions\_per\_day | number | N | Currency-level max transactions per day (null if no limit) |
| currency\_transactions\_per\_month | number | N | Currency-level max transactions per month (null if no limit) |
| currency\_transactions\_daily\_count | number | Y | Currency-level current daily transaction count |
| currency\_transactions\_monthly\_count | number | Y | Currency-level current monthly transaction count |
| currency\_remaining\_transactions\_daily\_count | number | N | Currency-level remaining daily transactions (null if no limit) |
| currency\_remaining\_transactions\_monthly\_count | number | N | Currency-level remaining monthly transactions (null if no limit) |

  
****Currency/Amount Object**** consists of:  

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| currency | string | Y | Currency code (e.g., "USD") |
| amount | string | N | Amount as string (null if no limit/unlimited) |

### Applies To

REST

### REST Method

POST