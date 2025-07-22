# Coinbase Exchange API Documentation

## Table of Contents

- [Convert currency - Coinbase](#convert-currency-coinbase)
- [Get a conversion - Coinbase](#get-a-conversion-coinbase)
- [Get all conversions - Coinbase](#get-all-conversions-coinbase)
- [Get conversion fee rates - Coinbase](#get-conversion-fee-rates-coinbase)

---

# Convert currency - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/conversions/convert-currency](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/conversions/convert-currency)

## Endpoint

`POST /conversions`

## Description

Users whose USD and USDC accounts are unified do not have access to the
conversion endpoint, and conversions from USDC to USD are automatic upon
deposit.

## Permissions

This endpoint requires the “trade” permission.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Response

### 200 Success

#### Response Fields

| Field           | Type   | Required | Description |
| --------------- | ------ | -------- | ----------- |
| id              | string | Yes      |             |
| amount          | string | Yes      |             |
| from_account_id | string | Yes      |             |
| to_account_id   | string | Yes      |             |
| from            | string | Yes      |             |
| to              | string | Yes      |             |
| fee_amount      | string | Yes      |             |
| created_at      | string | No       |             |

#### Example Response

```json
{
  "id": "c5aaf125-d99e-41fe-82ea-ad068038b278",
  "amount": "11.00000000",
  "from_account_id": "5dcc143c-fb96-4f72-aebf-a165e3d29b53",
  "to_account_id": "6100247f-90fc-4335-ac17-d99839f0c909",
  "from": "USDC",
  "to": "USD",
  "fee_amount": "0.0000000000000000"
}
```

---

# Get a conversion - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/conversions/get-a-conversion](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/conversions/get-a-conversion)

## Endpoint

`GET /conversions/%7Bconversion_id%7D`

## Description

Gets a currency conversion by id (i.e. USD -> USDC).

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter     | Type   | Required | Description |
| ------------- | ------ | -------- | ----------- |
| conversion_id | string | Yes      |             |

## Query Parameters

| Parameter  | Type   | Description |
| ---------- | ------ | ----------- |
| profile_id | string |             |

## Response

### 200 Success

#### Response Fields

| Field           | Type   | Required | Description |
| --------------- | ------ | -------- | ----------- |
| id              | string | Yes      |             |
| amount          | string | Yes      |             |
| from_account_id | string | Yes      |             |
| to_account_id   | string | Yes      |             |
| from            | string | Yes      |             |
| to              | string | Yes      |             |
| fee_amount      | string | Yes      |             |
| created_at      | string | No       |             |

#### Example Response

```json
{
  "id": "c5aaf125-d99e-41fe-82ea-ad068038b278",
  "amount": "11.00000000",
  "from_account_id": "5dcc143c-fb96-4f72-aebf-a165e3d29b53",
  "to_account_id": "6100247f-90fc-4335-ac17-d99839f0c909",
  "from": "USDC",
  "to": "USD",
  "fee_amount": "0.0000000000000000"
}
```

---

# Get all conversions - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/conversions/get-all-conversions](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/conversions/get-all-conversions)

## Endpoint

`GET /conversions`

## Description

Gets all currency conversions (i.e. USD -> USDC) for a given profile

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Query Parameters

| Parameter  | Type    | Description |
| ---------- | ------- | ----------- |
| profile_id | string  |             |
| before     | string  |             |
| after      | string  |             |
| limit      | integer |             |

## Response

### 200 Success

#### Response Fields

| Field           | Type   | Required | Description |
| --------------- | ------ | -------- | ----------- |
| id              | string | Yes      |             |
| amount          | string | Yes      |             |
| from_account_id | string | Yes      |             |
| to_account_id   | string | Yes      |             |
| from            | string | Yes      |             |
| to              | string | Yes      |             |
| fee_amount      | string | Yes      |             |
| created_at      | string | No       |             |

#### Example Response

```json
[
  {
    "id": "c5aaf125-d99e-41fe-82ea-ad068038b278",
    "amount": "11.00000000",
    "from_account_id": "5dcc143c-fb96-4f72-aebf-a165e3d29b53",
    "to_account_id": "6100247f-90fc-4335-ac17-d99839f0c909",
    "from": "USDC",
    "to": "USD",
    "fee_amount": "0.0000000000000000"
  }
]
```

---

# Get conversion fee rates - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/conversions/get-conversion-fee-rates](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/conversions/get-conversion-fee-rates)

## Endpoint

`GET /conversions/fees`

## Description

Gets a list of current conversion fee rates and trailing 30 day volume by
currency pair

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Response

### 200 Success

#### Response Fields

| Field                 | Type     | Required | Description |
| --------------------- | -------- | -------- | ----------- |
| from_currency         | string   | Yes      |             |
| to_currency           | string   | Yes      |             |
| available_credit      | string   | Yes      |             |
| min_fee_rate          | string   | No       |             |
| thirty_day_net_volume | string   | No       |             |
| fee_tiers             | object[] | No       |             |

#### Example Response

```json
[
  {
    "from_currency": "USDC",
    "to_currency": "USD",
    "fee_rate": "0.001",
    "thirty_day_volume": "1000000.00000000",
    "available_credit": "1000000.00000000"
  }
]
```

---
