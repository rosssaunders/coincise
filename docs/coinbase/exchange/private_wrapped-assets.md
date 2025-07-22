# Coinbase Exchange API Documentation

## Table of Contents

- [Create a new redeem - Coinbase](#create-a-new-redeem-coinbase)
- [Create a new stake-wrap - Coinbase](#create-a-new-stake-wrap-coinbase)
- [Get a single redeem - Coinbase](#get-a-single-redeem-coinbase)
- [Get a single stake-wrap - Coinbase](#get-a-single-stake-wrap-coinbase)
- [Get all redeems - Coinbase](#get-all-redeems-coinbase)
- [Get all stake-wraps - Coinbase](#get-all-stake-wraps-coinbase)
- [Get all wrapped assets - Coinbase](#get-all-wrapped-assets-coinbase)
- [Get wrapped asset conversion rate - Coinbase](#get-wrapped-asset-conversion-rate-coinbase)
- [Get wrapped asset details - Coinbase](#get-wrapped-asset-details-coinbase)

---

# Create a new redeem - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/wrapped-assets/create-new-redeem](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/wrapped-assets/create-new-redeem)

## Endpoint

`POST /wrapped-assets/redeem`

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Response

### 200 Success

A successful response.

#### Response Fields

| Field  | Type   | Required | Description |
| ------ | ------ | -------- | ----------- |
| redeem | object | No       |             |

#### Example Response

```json
{
  "id": "c5aaf125-d99e-41fe-82ea-ad068038b278",
  "from_amount": "11.00000000",
  "to_amount": "11.00000000",
  "from_account_id": "5dcc143c-fb96-4f72-aebf-a165e3d29b53",
  "to_account_id": "6100247f-90fc-4335-ac17-d99839f0c909",
  "from_currency": "USDC",
  "to_currency": "USD",
  "status": "completed",
  "conversion_rate": "1.006",
  "created_at": "2019-06-11T22:11:56.382Z",
  "completed_at": "2019-06-11T22:11:56.382Z",
  "canceled_at": "2019-06-11T22:11:56.382Z",
  "idem": "1c23a08a-8d09-4b6f-b549-985997bb5990"
}
```

---

# Create a new stake-wrap - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/wrapped-assets/create-new-stake-wrap](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/wrapped-assets/create-new-stake-wrap)

## Endpoint

`POST /wrapped-assets/stake-wrap`

## Description

A successful stake-wrap is assigned a stake-wrap ID. The corresponding ledger
entries for a stake-wrap reference this stake-wrap ID.

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
| from_amount     | string | Yes      |             |
| to_amount       | string | Yes      |             |
| from_account_id | string | Yes      |             |
| to_account_id   | string | Yes      |             |
| from_currency   | string | Yes      |             |
| to_currency     | string | Yes      |             |
| status          | string | Yes      |             |
| conversion_rate | string | Yes      |             |
| created_at      | string | Yes      |             |
| completed_at    | string | Yes      |             |
| canceled_at     | string | Yes      |             |

#### Example Response

```json
{
  "id": "c5aaf125-d99e-41fe-82ea-ad068038b278",
  "from_amount": "11.00000000",
  "to_amount": "11.00000000",
  "from_account_id": "5dcc143c-fb96-4f72-aebf-a165e3d29b53",
  "to_account_id": "6100247f-90fc-4335-ac17-d99839f0c909",
  "from_currency": "USDC",
  "to_currency": "USD",
  "status": "pending",
  "conversion_rate": "1.006",
  "created_at": "2019-06-11T22:11:56.382Z",
  "completed_at": "2019-06-11T22:11:56.382Z",
  "canceled_at": "2019-06-11T22:11:56.382Z"
}
```

---

# Get a single redeem - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/wrapped-assets/get-single-redeem](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/wrapped-assets/get-single-redeem)

## Endpoint

`GET /wrapped-assets/redeem/%7Bredeem_id%7D`

## Description

Get details for a specific redeem in the profile associated with the API key.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| redeem_id | string | Yes      |             |

## Response

### 200 Success

#### Response Fields

| Field           | Type   | Required | Description |
| --------------- | ------ | -------- | ----------- |
| id              | string | Yes      |             |
| from_amount     | string | Yes      |             |
| to_amount       | string | Yes      |             |
| from_account_id | string | Yes      |             |
| to_account_id   | string | Yes      |             |
| from_currency   | string | Yes      |             |
| to_currency     | string | Yes      |             |
| status          | string | Yes      |             |
| conversion_rate | string | Yes      |             |
| created_at      | string | Yes      |             |
| completed_at    | string | Yes      |             |
| canceled_at     | string | Yes      |             |
| idem            | string | Yes      |             |

#### Example Response

```json
{
  "id": "c5aaf125-d99e-41fe-82ea-ad068038b278",
  "from_amount": "11.00000000",
  "to_amount": "11.00000000",
  "from_account_id": "5dcc143c-fb96-4f72-aebf-a165e3d29b53",
  "to_account_id": "6100247f-90fc-4335-ac17-d99839f0c909",
  "from_currency": "USDC",
  "to_currency": "USD",
  "status": "completed",
  "conversion_rate": "1.006",
  "created_at": "2019-06-11T22:11:56.382Z",
  "completed_at": "2019-06-11T22:11:56.382Z",
  "canceled_at": "2019-06-11T22:11:56.382Z",
  "idem": "1c23a08a-8d09-4b6f-b549-985997bb5990"
}
```

---

# Get a single stake-wrap - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/wrapped-assets/get-a-single-stake-wrap](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/wrapped-assets/get-a-single-stake-wrap)

## Endpoint

`GET /wrapped-assets/stake-wrap/%7Bstake_wrap_id%7D`

## Description

Get details for a specific stake-wrap in the profile associated with the API
key.

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
| stake_wrap_id | string | Yes      |             |

## Response

### 200 Success

#### Response Fields

| Field           | Type   | Required | Description |
| --------------- | ------ | -------- | ----------- |
| id              | string | Yes      |             |
| from_amount     | string | Yes      |             |
| to_amount       | string | Yes      |             |
| from_account_id | string | Yes      |             |
| to_account_id   | string | Yes      |             |
| from_currency   | string | Yes      |             |
| to_currency     | string | Yes      |             |
| status          | string | Yes      |             |
| conversion_rate | string | Yes      |             |
| created_at      | string | Yes      |             |
| completed_at    | string | Yes      |             |
| canceled_at     | string | Yes      |             |

#### Example Response

```json
{
  "id": "c5aaf125-d99e-41fe-82ea-ad068038b278",
  "from_amount": "11.00000000",
  "to_amount": "11.00000000",
  "from_account_id": "5dcc143c-fb96-4f72-aebf-a165e3d29b53",
  "to_account_id": "6100247f-90fc-4335-ac17-d99839f0c909",
  "from_currency": "USDC",
  "to_currency": "USD",
  "status": "pending",
  "conversion_rate": "1.006",
  "created_at": "2019-06-11T22:11:56.382Z",
  "completed_at": "2019-06-11T22:11:56.382Z",
  "canceled_at": "2019-06-11T22:11:56.382Z"
}
```

---

# Get all redeems - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/wrapped-assets/get-all-redeems](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/wrapped-assets/get-all-redeems)

## Endpoint

`GET /wrapped-assets/redeem`

## Description

Get details for all redeems in the profile associated with the API key.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Query Parameters

| Parameter     | Type    | Description                                                                                                                               |
| ------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| before        | string  | Used for pagination, returns stake-wraps with created_at timestamps newer than before date. Example date format 2023-03-15T23:40:04.505Z. |
| after         | string  | Used for pagination, returns stake-wraps with created_at timestamps older than after date. Example date format 2023-03-15T23:40:04.505Z.  |
| limit         | integer | Limit on number of results to return.                                                                                                     |
| from_currency | string  | from_currency, i.e. CBETH.                                                                                                                |
| to_currency   | string  | to_currency, i.e. ETH.                                                                                                                    |
| status        | string  |                                                                                                                                           |

## Response

### 200 Success

#### Response Fields

| Field           | Type   | Required | Description |
| --------------- | ------ | -------- | ----------- |
| id              | string | Yes      |             |
| from_amount     | string | Yes      |             |
| to_amount       | string | Yes      |             |
| from_account_id | string | Yes      |             |
| to_account_id   | string | Yes      |             |
| from_currency   | string | Yes      |             |
| to_currency     | string | Yes      |             |
| status          | string | Yes      |             |
| conversion_rate | string | Yes      |             |
| created_at      | string | Yes      |             |
| completed_at    | string | Yes      |             |
| canceled_at     | string | Yes      |             |
| idem            | string | Yes      |             |

#### Example Response

```json
[
  {
    "id": "c5aaf125-d99e-41fe-82ea-ad068038b278",
    "from_amount": "11.00000000",
    "to_amount": "11.00000000",
    "from_account_id": "5dcc143c-fb96-4f72-aebf-a165e3d29b53",
    "to_account_id": "6100247f-90fc-4335-ac17-d99839f0c909",
    "from_currency": "USDC",
    "to_currency": "USD",
    "status": "completed",
    "conversion_rate": "1.006",
    "created_at": "2019-06-11T22:11:56.382Z",
    "completed_at": "2019-06-11T22:11:56.382Z",
    "canceled_at": "2019-06-11T22:11:56.382Z",
    "idem": "1c23a08a-8d09-4b6f-b549-985997bb5990"
  }
]
```

---

# Get all stake-wraps - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/wrapped-assets/get-all-stake-wraps](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/wrapped-assets/get-all-stake-wraps)

## Endpoint

`GET /wrapped-assets/stake-wrap`

## Description

Get details for all stake-wraps in the profile associated with the API key.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Query Parameters

| Parameter | Type    | Description                                                                                                                               |
| --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| before    | string  | Used for pagination, returns stake-wraps with created_at timestamps newer than before date. Example date format 2023-03-15T23:40:04.505Z. |
| after     | string  | Used for pagination, returns stake-wraps with created_at timestamps older than after date. Example date format 2023-03-15T23:40:04.505Z.  |
| limit     | integer | Limit on number of results to return.                                                                                                     |
| from      | string  | from_currency, i.e. ETH.                                                                                                                  |
| to        | string  | to_currency, i.e. CBETH.                                                                                                                  |
| status    | string  |                                                                                                                                           |

## Response

### 200 Success

#### Response Fields

| Field           | Type   | Required | Description |
| --------------- | ------ | -------- | ----------- |
| id              | string | Yes      |             |
| from_amount     | string | Yes      |             |
| to_amount       | string | Yes      |             |
| from_account_id | string | Yes      |             |
| to_account_id   | string | Yes      |             |
| from_currency   | string | Yes      |             |
| to_currency     | string | Yes      |             |
| status          | string | Yes      |             |
| conversion_rate | string | Yes      |             |
| created_at      | string | Yes      |             |
| completed_at    | string | Yes      |             |
| canceled_at     | string | Yes      |             |

#### Example Response

```json
[
  {
    "id": "c5aaf125-d99e-41fe-82ea-ad068038b278",
    "from_amount": "11.00000000",
    "to_amount": "11.00000000",
    "from_account_id": "5dcc143c-fb96-4f72-aebf-a165e3d29b53",
    "to_account_id": "6100247f-90fc-4335-ac17-d99839f0c909",
    "from_currency": "USDC",
    "to_currency": "USD",
    "status": "pending",
    "conversion_rate": "1.006",
    "created_at": "2019-06-11T22:11:56.382Z",
    "completed_at": "2019-06-11T22:11:56.382Z",
    "canceled_at": "2019-06-11T22:11:56.382Z"
  }
]
```

---

# Get all wrapped assets - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/wrapped-assets/get-all-wrapped-assets](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/wrapped-assets/get-all-wrapped-assets)

## Endpoint

`GET /wrapped-assets`

## Description

Returns a list of all supported wrapped assets details objects

## Response

### 200 Success

#### Response Fields

| Field          | Type     | Required | Description |
| -------------- | -------- | -------- | ----------- |
| wrapped_assets | object[] | Yes      |             |

#### Example Response

```json
{
  "wrapped_assets": [
    {
      "id": "CBETH",
      "circulating_supply": "221127.7137774658",
      "total_supply": "926714.1251656958084",
      "conversion_rate": "1.006081377449935752",
      "apy": "0.0384"
    }
  ]
}
```

---

# Get wrapped asset conversion rate - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/wrapped-assets/get-wrapped-asset-conversion-rate](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/wrapped-assets/get-wrapped-asset-conversion-rate)

## Endpoint

`GET /wrapped-assets/%7Bwrapped_asset_id%7D/conversion-rate`

## Description

You can test the cbETH conversion rate by sending an HTTP GET request to the
following URL:

## Path Parameters

| Parameter        | Type   | Required | Description |
| ---------------- | ------ | -------- | ----------- |
| wrapped_asset_id | string | Yes      |             |

## Response

### 200 Success

#### Response Fields

| Field  | Type   | Required | Description |
| ------ | ------ | -------- | ----------- |
| amount | string | Yes      |             |

#### Example Response

```json
{
  "amount": "1.006081377449935752"
}
```

---

# Get wrapped asset details - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/wrapped-assets/get-wrapped-asset-details](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/wrapped-assets/get-wrapped-asset-details)

## Endpoint

`GET /wrapped-assets/%7Bwrapped_asset_id%7D`

## Description

The number of wrapped asset units in possession of customers. It excludes units
pre-minted and held in abeyance to quickly serve wrapping customers.

## Path Parameters

| Parameter        | Type   | Required | Description |
| ---------------- | ------ | -------- | ----------- |
| wrapped_asset_id | string | Yes      |             |

## Response

### 200 Success

The symbol of the wrapped asset

#### Response Fields

| Field                     | Type   | Required | Description                                                                                                           |
| ------------------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------- |
| id                        | string | Yes      | The symbol of the wrapped asset                                                                                       |
| circulating_supply        | string | Yes      | The assets wrapped by customers less the assets unwrapped by customers existing outside of Coinbase's premint account |
| total_supply              | string | Yes      | The total token supply of the asset matching that on Etherscan                                                        |
| conversion_rate           | string | Yes      | The conversion rate between the wrapped asset and the underlying asset                                                |
| apy                       | string | Yes      | The APY earned by the supply of the underlying asset                                                                  |
| redeem_time_estimate_days | string | Yes      | The estimated time to redeem the wrapped asset in days                                                                |

#### Example Response

```json
{
  "id": "CBETH",
  "circulating_supply": "221127.7137774658",
  "total_supply": "926714.1251656958084",
  "conversion_rate": "1.006081377449935752",
  "apy": "0.0384",
  "redeem_time_estimate_days": "12.34"
}
```

---
