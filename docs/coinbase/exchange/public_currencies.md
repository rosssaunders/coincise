# Coinbase Exchange API Documentation

## Table of Contents

- [Get all known currencies - Coinbase](#get-all-known-currencies-coinbase)
- [Get a currency - Coinbase](#get-a-currency-coinbase)

---

# Get all known currencies - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/currencies/get-a-currency](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/currencies/get-a-currency)

## Endpoint

`GET /currencies`

## Description

Not all currencies may be currently in use for trading.

## Response

### 200 Success

#### Response Fields

| Field              | Type     | Required | Description |
| ------------------ | -------- | -------- | ----------- |
| id                 | string   | Yes      |             |
| name               | string   | Yes      |             |
| min_size           | string   | Yes      |             |
| status             | string   | Yes      |             |
| max_precision      | string   | Yes      |             |
| details            | object   | Yes      |             |
| message            | string   | No       |             |
| convertible_to     | string[] | No       |             |
| default_network    | string   | No       |             |
| supported_networks | object[] | No       |             |
| display_name       | string   | No       |             |

#### Example Response

```json
[
  {
    "id": "USD",
    "name": "United States Dollar",
    "min_size": "0.01",
    "max_precision": "0.01",
    "status": "online",
    "details": {
      "type": "fiat",
      "symbol": "$",
      "sort_order": 1,
      "push_payment_methods": [
        "bank_wire",
        "fedwire",
        "swift_bank_account",
        "intra_bank_account"
      ],
      "display_name": "US Dollar",
      "group_types": ["fiat", "usd"]
    }
  }
]
```

---

# Get a currency - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/currencies/get-all-known-currencies](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/currencies/get-all-known-currencies)

## Endpoint

`GET /currencies/%7Bcurrency_id%7D`

## Description

Currency codes conform to the ISO 4217 standard where possible. Currencies that
have no representation in ISO 4217 can use a custom code.

## Path Parameters

| Parameter   | Type   | Required | Description |
| ----------- | ------ | -------- | ----------- |
| currency_id | string | Yes      |             |

## Response

### 200 Success

#### Response Fields

| Field              | Type     | Required | Description |
| ------------------ | -------- | -------- | ----------- |
| id                 | string   | Yes      |             |
| name               | string   | Yes      |             |
| min_size           | string   | Yes      |             |
| status             | string   | Yes      |             |
| max_precision      | string   | Yes      |             |
| details            | object   | Yes      |             |
| message            | string   | No       |             |
| convertible_to     | string[] | No       |             |
| default_network    | string   | No       |             |
| supported_networks | object[] | No       |             |
| display_name       | string   | No       |             |

#### Example Response

```json
{
  "id": "USD",
  "name": "United States Dollar",
  "min_size": "0.01",
  "max_precision": "0.01",
  "status": "online",
  "details": {
    "type": "fiat",
    "symbol": "$",
    "sort_order": 1,
    "push_payment_methods": [
      "bank_wire",
      "fedwire",
      "swift_bank_account",
      "intra_bank_account"
    ],
    "display_name": "US Dollar",
    "group_types": ["fiat", "usd"]
  }
}
```

---
