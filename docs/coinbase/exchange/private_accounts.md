# Coinbase Exchange API Documentation

## Table of Contents

- [Get a single account by id - Coinbase](#get-a-single-account-by-id-coinbase)
- [Get a single account's holds - Coinbase](#get-a-single-account-s-holds-coinbase)
- [Get a single account's ledger - Coinbase](#get-a-single-account-s-ledger-coinbase)
- [Get a single account's transfers - Coinbase](#get-a-single-account-s-transfers-coinbase)
- [Get all accounts for a profile - Coinbase](#get-all-accounts-for-a-profile-coinbase)

---

# Get a single account by id - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/accounts/get-single-account-by-id](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/accounts/get-single-account-by-id)

## Endpoint

`GET /accounts/%7Baccount_id%7D`

## Permissions

This endpoint requires either the “view” or “trade” permission.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| account_id | string | Yes      |             |

## Response

### 200 Success

Amount in pending deposits transfers.

#### Response Fields

| Field           | Type    | Required | Description                           |
| --------------- | ------- | -------- | ------------------------------------- |
| id              | string  | Yes      |                                       |
| currency        | string  | Yes      |                                       |
| balance         | string  | Yes      |                                       |
| hold            | string  | Yes      |                                       |
| available       | string  | Yes      |                                       |
| profile_id      | string  | Yes      |                                       |
| trading_enabled | boolean | Yes      |                                       |
| pending_deposit | string  | No       | Amount in pending deposits transfers. |
| display_name    | string  | No       |                                       |

#### Example Response

```json
{
  "id": "7fd0abc0-e5ad-4cbb-8d54-f2b3f43364da",
  "currency": "USD",
  "balance": "0.0000000000000000",
  "hold": "0.0000000000000000",
  "available": "0",
  "profile_id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
  "trading_enabled": true
}
```

---

# Get a single account's holds - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/accounts/get-single-account-hold](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/accounts/get-single-account-hold)

## Endpoint

`GET /accounts/%7Baccount_id%7D/holds`

## Description

List the holds of an account that belong to the same profile as the API key.
Holds are placed on an account for any active orders or pending withdraw
requests. As an order is filled, the hold amount is updated. If an order is
canceled, any remaining hold is removed. For withdrawals, the hold is removed
after it is completed.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| account_id | string | Yes      |             |

## Query Parameters

| Parameter | Type    | Description                                            |
| --------- | ------- | ------------------------------------------------------ |
| before    | string  | Used for pagination. Sets start cursor to before date. |
| after     | string  | Used for pagination. Sets end cursor to after date.    |
| limit     | integer | Limit on number of results to return.                  |

## Response

### 200 Success

#### Response Fields

| Field      | Type         | Required | Description |
| ---------- | ------------ | -------- | ----------- |
| id         | string       | Yes      |             |
| created_at | string       | Yes      |             |
| updated_at | string       | Yes      |             |
| type       | enum<string> | Yes      |             |
| ref        | string       | Yes      |             |

#### Example Response

```json
[
  {
    "created_at": "2020-03-11T20:48:46.622Z",
    "id": "c5cdd687-2d03-4a87-8dd7-c693a4bb766f",
    "amount": "10.0500000000000000",
    "type": "order",
    "ref": "a9625b04-fc66-4999-a876-543c3684d702"
  }
]
```

---

# Get a single account's ledger - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/accounts/get-single-account-ledger](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/accounts/get-single-account-ledger)

## Endpoint

`GET /accounts/%7Baccount_id%7D/ledger`

## Description

If neither start_date nor end_date is set, the endpoint will return ledger
activity for the past 1 day only.

## Permissions

This endpoint requires either the “view” or “trade” permission.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter  | Type   | Required | Description                                          |
| ---------- | ------ | -------- | ---------------------------------------------------- |
| account_id | string | Yes      | Returns list of ledger entries from this account id. |

## Query Parameters

| Parameter  | Type    | Description                                                                                                                                                  |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| start_date | string  | Search by minimum posted date time and is inclusive of time provided. Valid formats are either RFC3339, date or date time and must be after Unix Epoch time. |
| end_date   | string  | Search by maximum posted date time and is inclusive of time provided. Valid formats are either RFC3339, date or date time and must be after Unix Epoch time. |
| before     | string  | Used for pagination. Sets start cursor to before id.                                                                                                         |
| after      | string  | Used for pagination. Sets end cursor to after id.                                                                                                            |
| limit      | integer | Limit on number of results to return.                                                                                                                        |
| profile_id | string  |                                                                                                                                                              |

## Response

### 200 Success

#### Response Fields

| Field      | Type         | Required | Description |
| ---------- | ------------ | -------- | ----------- |
| id         | string       | Yes      |             |
| amount     | string       | Yes      |             |
| created_at | string       | Yes      |             |
| balance    | string       | Yes      |             |
| type       | enum<string> | Yes      |             |
| details    | object       | Yes      |             |

#### Example Response

```json
[
  {
    "created_at": "2019-06-11T22:11:56.382Z",
    "id": "1444415179",
    "amount": "3.2200000000000000",
    "balance": "3.2200000000000000",
    "type": "transfer",
    "details": {
      "to": "6d326768-71f2-4068-99dc-7075c78f6402",
      "from": "20640810-6219-4d3b-95f4-5e1741dd6ea4",
      "profile_transfer_id": "1f854356-4923-4b10-8db1-d82f7fae8eda"
    }
  }
]
```

---

# Get a single account's transfers - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/accounts/get-single-account-transfer](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/accounts/get-single-account-transfer)

## Endpoint

`GET /accounts/%7Baccount_id%7D/transfers`

## Description

Lists past withdrawals and deposits for an account.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter  | Type   | Required | Description                                     |
| ---------- | ------ | -------- | ----------------------------------------------- |
| account_id | string | Yes      | Returns list of transfers from this account id. |

## Query Parameters

| Parameter | Type    | Description                                            |
| --------- | ------- | ------------------------------------------------------ |
| before    | string  | Used for pagination. Sets start cursor to before date. |
| after     | string  | Used for pagination. Sets end cursor to after date.    |
| limit     | integer | Limit on number of results to return.                  |
| type      | string  |                                                        |

## Response

### 200 Success

#### Response Fields

| Field        | Type         | Required | Description |
| ------------ | ------------ | -------- | ----------- |
| id           | string       | Yes      |             |
| type         | enum<string> | Yes      |             |
| created_at   | string       | Yes      |             |
| completed_at | string       | Yes      |             |
| canceled_at  | string       | Yes      |             |
| processed_at | string       | Yes      |             |
| amount       | string       | Yes      |             |
| details      | object       | Yes      |             |
| user_nonce   | string       | Yes      |             |
| currency     | string       | Yes      |             |

#### Example Response

```json
[
  {
    "id": "19ac524d-8827-4246-a1b2-18dc5ca9472c",
    "type": "withdraw",
    "created_at": "2020-03-12T00:14:12.397Z",
    "completed_at": "2020-03-12T00:14:13.021Z",
    "amount": "1.00000000",
    "details": {
      "coinbase_account_id": "2b760113-fbba-5600-ac74-36482c130768",
      "coinbase_transaction_id": "5e697ed49f8417148f3366ea",
      "coinbase_payment_method_id": ""
    },
    "currency": "USD"
  }
]
```

---

# Get all accounts for a profile - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/accounts/get-all-account-profile](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/accounts/get-all-account-profile)

## Endpoint

`GET /accounts/%7Baccount_id%7D`

## Description

Your trading accounts are separate from your Coinbase accounts. See Deposit from
Coinbase account for documentation on how to deposit funds to begin trading.

## Permissions

This endpoint requires either the “view” or “trade” permission.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| account_id | string | Yes      |             |

## Response

### 200 Success

Amount in pending deposits transfers.

#### Response Fields

| Field           | Type    | Required | Description                           |
| --------------- | ------- | -------- | ------------------------------------- |
| id              | string  | Yes      |                                       |
| currency        | string  | Yes      |                                       |
| balance         | string  | Yes      |                                       |
| hold            | string  | Yes      |                                       |
| available       | string  | Yes      |                                       |
| profile_id      | string  | Yes      |                                       |
| trading_enabled | boolean | Yes      |                                       |
| pending_deposit | string  | No       | Amount in pending deposits transfers. |
| display_name    | string  | No       |                                       |

#### Example Response

```json
{
  "id": "7fd0abc0-e5ad-4cbb-8d54-f2b3f43364da",
  "currency": "USD",
  "balance": "0.0000000000000000",
  "hold": "0.0000000000000000",
  "available": "0",
  "profile_id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
  "trading_enabled": true
}
```

---
