# Coinbase Exchange API Documentation

## Table of Contents

- [Welcome to Coinbase Exchange API - Coinbase](#welcome-to-coinbase-exchange-api-coinbase)
- [Exchange REST API Requests - Coinbase](#exchange-rest-api-requests-coinbase)
- [Exchange REST API Authentication - Coinbase](#exchange-rest-api-authentication-coinbase)
- [Exchange REST API Rate Limits - Coinbase](#exchange-rest-api-rate-limits-coinbase)
- [Exchange REST API Pagination - Coinbase](#exchange-rest-api-pagination-coinbase)
- [Exchange Profiles - Coinbase](#exchange-profiles-coinbase)
- [Exchange Types - Coinbase](#exchange-types-coinbase)
- [Get a single account by id - Coinbase](#get-a-single-account-by-id-coinbase)
- [Get a single account's holds - Coinbase](#get-a-single-account-s-holds-coinbase)
- [Get a single account's ledger - Coinbase](#get-a-single-account-s-ledger-coinbase)
- [Get a single account's transfers - Coinbase](#get-a-single-account-s-transfers-coinbase)
- [Get all accounts for a profile - Coinbase](#get-all-accounts-for-a-profile-coinbase)
- [Add addresses - Coinbase](#add-addresses-coinbase)
- [Delete address - Coinbase](#delete-address-coinbase)
- [Get address book - Coinbase](#get-address-book-coinbase)
- [Generate crypto address - Coinbase](#generate-crypto-address-coinbase)
- [Get all Coinbase wallets - Coinbase](#get-all-coinbase-wallets-coinbase)
- [Convert currency - Coinbase](#convert-currency-coinbase)
- [Get a conversion - Coinbase](#get-a-conversion-coinbase)
- [Get all conversions - Coinbase](#get-all-conversions-coinbase)
- [Get conversion fee rates - Coinbase](#get-conversion-fee-rates-coinbase)
- [Get all known currencies - Coinbase](#get-all-known-currencies-coinbase)
- [Get a currency - Coinbase](#get-a-currency-coinbase)
- [Get fees - Coinbase](#get-fees-coinbase)
- [Get auto loan setting - Coinbase](#get-auto-loan-setting-coinbase)
- [Get USDC conversion - Coinbase](#get-usdc-conversion-coinbase)
- [Set auto loan - Coinbase](#set-auto-loan-coinbase)
- [Set USDC conversion - Coinbase](#set-usdc-conversion-coinbase)
- [Get lending overview - Coinbase](#get-lending-overview-coinbase)
- [Get new loan preview - Coinbase](#get-new-loan-preview-coinbase)
- [Get principal repayment preview - Coinbase](#get-principal-repayment-preview-coinbase)
- [List interest charges - Coinbase](#list-interest-charges-coinbase)
- [List interest rate history - Coinbase](#list-interest-rate-history-coinbase)
- [List interest summaries - Coinbase](#list-interest-summaries-coinbase)
- [List loan assets - Coinbase](#list-loan-assets-coinbase)
- [List loans - Coinbase](#list-loans-coinbase)
- [List new loan options - Coinbase](#list-new-loan-options-coinbase)
- [Open new loan - Coinbase](#open-new-loan-coinbase)
- [Repay loan interest - Coinbase](#repay-loan-interest-coinbase)
- [Repay loan principal - Coinbase](#repay-loan-principal-coinbase)
- [Cancel all orders - Coinbase](#cancel-all-orders-coinbase)
- [Cancel an order - Coinbase](#cancel-an-order-coinbase)
- [Create a new order - Coinbase](#create-a-new-order-coinbase)
- [Get all fills - Coinbase](#get-all-fills-coinbase)
- [Get all orders - Coinbase](#get-all-orders-coinbase)
- [Get single order - Coinbase](#get-single-order-coinbase)
- [Get all known trading pairs - Coinbase](#get-all-known-trading-pairs-coinbase)
- [Get all product volume - Coinbase](#get-all-product-volume-coinbase)
- [Get product book - Coinbase](#get-product-book-coinbase)
- [Get product candles - Coinbase](#get-product-candles-coinbase)
- [Get product stats - Coinbase](#get-product-stats-coinbase)
- [Get product ticker - Coinbase](#get-product-ticker-coinbase)
- [Get product trades - Coinbase](#get-product-trades-coinbase)
- [Get single product - Coinbase](#get-single-product-coinbase)
- [Create a profile - Coinbase](#create-a-profile-coinbase)
- [Delete a profile - Coinbase](#delete-a-profile-coinbase)
- [Get profile by id - Coinbase](#get-profile-by-id-coinbase)
- [Get profiles - Coinbase](#get-profiles-coinbase)
- [Rename a profile - Coinbase](#rename-a-profile-coinbase)
- [Transfer funds between profiles - Coinbase](#transfer-funds-between-profiles-coinbase)
- [Create a report - Coinbase](#create-a-report-coinbase)
- [Get a report - Coinbase](#get-a-report-coinbase)
- [Get all reports - Coinbase](#get-all-reports-coinbase)
- [Deposit from Coinbase account - Coinbase](#deposit-from-coinbase-account-coinbase)
- [Deposit from payment method - Coinbase](#deposit-from-payment-method-coinbase)
- [Get a single transfer - Coinbase](#get-a-single-transfer-coinbase)
- [Get all payment methods - Coinbase](#get-all-payment-methods-coinbase)
- [Get all transfers - Coinbase](#get-all-transfers-coinbase)
- [Get fee estimate for crypto withdrawal - Coinbase](#get-fee-estimate-for-crypto-withdrawal-coinbase)
- [Submit travel information for a transfer - Coinbase](#submit-travel-information-for-a-transfer-coinbase)
- [Withdraw to Coinbase account - Coinbase](#withdraw-to-coinbase-account-coinbase)
- [Withdraw to crypto address - Coinbase](#withdraw-to-crypto-address-coinbase)
- [Withdraw to payment method - Coinbase](#withdraw-to-payment-method-coinbase)
- [Create travel rule entry - Coinbase](#create-travel-rule-entry-coinbase)
- [Delete existing travel rule entry - Coinbase](#delete-existing-travel-rule-entry-coinbase)
- [Get all travel rule information - Coinbase](#get-all-travel-rule-information-coinbase)
- [Get user exchange limits - Coinbase](#get-user-exchange-limits-coinbase)
- [Get user trading volume - Coinbase](#get-user-trading-volume-coinbase)
- [Update settlement preference - Coinbase](#update-settlement-preference-coinbase)
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

# Welcome to Coinbase Exchange API - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/introduction](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/introduction)

## ​Getting Started

- [Authentication](/exchange/rest-api/authentication)
- [Rate Limits](/exchange/rest-api/rate-limits)
- [Pagination](/exchange/rest-api/pagination)
- [Status Codes](/exchange/rest-api/requests)
- [Quickstart](/exchange/introduction/rest-quickstart)

## ​FIX API

- [FIX API reference](/exchange/fix-api/connectivity)

## ​WebSocket API

- [WebSocket API reference](/exchange/websocket-feed/overview)

---

# Exchange REST API Requests - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/exchange/rest-api/requests](https://docs.cdp.coinbase.com/exchange/rest-api/requests)

### ​Common Error Codes

| Status Code | Reason                                                       |
| ----------- | ------------------------------------------------------------ |
| 400         | Bad Request — Invalid request format                         |
| 401         | Unauthorized — Invalid API Key                               |
| 403         | Forbidden — You do not have access to the requested resource |
| 404         | Not Found                                                    |
| 500         | Internal Server Error — We had a problem with our server     |

---

# Exchange REST API Authentication - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/exchange/rest-api/authentication](https://docs.cdp.coinbase.com/exchange/rest-api/authentication)

### ​API Key Permissions

| Permission | Description                                                                            |
| ---------- | -------------------------------------------------------------------------------------- |
| View       | Key has read permissions for all endpoints (including GET)                             |
| Transfer   | Key can transfer value for accounts, including deposits/withdrawals (and bypasses 2FA) |
| Trade      | Key can post orders and get data                                                       |
| Manage     | Key can manage user settings and preferences such as address books entries             |

## ​Signing Requests

| Header                 | Description                                                            |
| ---------------------- | ---------------------------------------------------------------------- |
| `CB-ACCESS-KEY`        | API key as a string                                                    |
| `CB-ACCESS-SIGN`       | base64-encoded signature (see [Signing a Message](#signing-a-message)) |
| `CB-ACCESS-TIMESTAMP`  | Timestamp for your request                                             |
| `CB-ACCESS-PASSPHRASE` | Passphrase you specified when creating the API key                     |

### ​Signing a Message

- `timestamp` is the same as the `CB-ACCESS-TIMESTAMP` header.
- `method` should be UPPER CASE e.g., `GET` or `POST`.
- `requestPath` should only include the path of the API endpoint.
- `body` is the request body string or omitted if there is no request body
  (typically for `GET` requests).

---

# Exchange REST API Rate Limits - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/exchange/rest-api/rate-limits](https://docs.cdp.coinbase.com/exchange/rest-api/rate-limits)

### ​Public Endpoints

- Requests per second per IP: 10
- Requests per second per IP in bursts: Up to 15

### ​Private Endpoints

- Requests per second per profile: 15
- Requests per second per profile in bursts: Up to 30

### ​Private /fills Endpoint

- Requests per second per profile: 10
- Requests per second per profile in bursts: Up to 20

### ​Private /loans Endpoint

- Requests per second per profile: 10

---

# Exchange REST API Pagination - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/exchange/rest-api/pagination](https://docs.cdp.coinbase.com/exchange/rest-api/pagination)

### ​Parameters

| Parameter | Default | Description                                                |
| --------- | ------- | ---------------------------------------------------------- |
| `before`  |         | Request page before (newer) this pagination id             |
| `after`   |         | Request page after (older) this pagination id              |
| `limit`   | 1000    | Number of results per request. Maximum 1000 (default 1000) |

---

# Exchange Profiles - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/exchange/rest-api/profiles](https://docs.cdp.coinbase.com/exchange/rest-api/profiles)

---

# Exchange Types - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/exchange/rest-api/types](https://docs.cdp.coinbase.com/exchange/rest-api/types)

```
2014-11-06T10:34:47.123456Z
```

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

# Add addresses - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/address-book/add-addresses](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/address-book/add-addresses)

## Endpoint

`POST /address-book`

## Description

List of addresses to add to the address book

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

| Field | Type     | Required | Description |
| ----- | -------- | -------- | ----------- |
| body  | object[] | No       |             |

#### Example Response

```json
{
  "body": [
    {
      "id": "1",
      "address": "1JmYrFBLMSCLBwoL87gdQ5Qc9MLvb2egKk",
      "display_address": "1JmYrFBLMSCLBwoL87gdQ5Qc9MLvb2egKk",
      "address_info": {
        "address": "1JmYrFBLMSCLBwoL87gdQ5Qc9MLvb2egKk",
        "display_address": "1JmYrFBLMSCLBwoL87gdQ5Qc9MLvb2egKk"
      },
      "currency": "BTC",
      "label": "my wallet",
      "address_booked": true,
      "address_book_added_at": "2019-02-06T22:27:50.221Z"
    }
  ]
}
```

---

# Delete address - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/address-book/delete-address](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/address-book/delete-address)

## Endpoint

`DELETE /address-book/%7Bid%7D`

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter | Type   | Required | Description             |
| --------- | ------ | -------- | ----------------------- |
| id        | string | Yes      | Address book identifier |

## Response

### 200 Success

A successful response.

#### Example Response

```json
{}
```

---

# Get address book - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/address-book/get-address-book](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/address-book/get-address-book)

## Endpoint

`GET /address-book`

## Description

Get all addresses stored in the address book.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Response

### 200 Success

Flag to indicate if the crypto addresses has previously been digitally signed
and verified when added in the Address Book UI tab

#### Response Fields

| Field                          | Type    | Required | Description                                                                                                                      |
| ------------------------------ | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| id                             | string  | Yes      |                                                                                                                                  |
| address                        | string  | Yes      |                                                                                                                                  |
| currency                       | string  | Yes      |                                                                                                                                  |
| label                          | string  | Yes      |                                                                                                                                  |
| address_book_added_at          | string  | Yes      |                                                                                                                                  |
| destination_tag                | string  | No       |                                                                                                                                  |
| is_verified_self_hosted_wallet | boolean | No       | Flag to indicate if the crypto addresses has previously been digitally signed and verified when added in the Address Book UI tab |
| vasp_id                        | string  | No       | The VASP identifier if the address is owned by one of the supported Virtual Asset Service Providers                              |
| business_name                  | string  | No       | Business name of the originator's account - only populated for travel rules regions                                              |
| business_country_code          | string  | No       | The country code (ISO 3166-1 alpha-2) of the originator's account location - only populated for travel rules regions             |

#### Example Response

```json
[
  {
    "id": "e9c483b8-c502-11ec-9d64-0242ac120002",
    "address": "1JmYrFBLMSCLBwoL87gdQ5Qc9MLvb2egKk",
    "currency": "ETH",
    "label": "my wallet",
    "address_book_added_at": "2019-02-06T22:27:50.221Z",
    "is_verified_self_hosted_wallet": false,
    "business_name": "Example Business",
    "business_country_code": "US"
  }
]
```

---

# Generate crypto address - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/coinbase-accounts/generate-crypto-address](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/coinbase-accounts/generate-crypto-address)

## Endpoint

`POST /coinbase-accounts/%7Baccount_id%7D/addresses`

## Description

You can generate an address for crypto deposits. See the Coinbase Accounts
section for information on how to retrieve your coinbase account ID.

## Permissions

This endpoint requires the “transfer” permission. API key must belong to default
profile.

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

#### Response Fields

| Field                    | Type     | Required | Description |
| ------------------------ | -------- | -------- | ----------- |
| id                       | string   | Yes      |             |
| address                  | string   | Yes      |             |
| address_info             | object   | Yes      |             |
| name                     | string   | Yes      |             |
| created_at               | string   | Yes      |             |
| updated_at               | string   | Yes      |             |
| network                  | string   | Yes      |             |
| uri_scheme               | string   | Yes      |             |
| resource                 | string   | Yes      |             |
| resource_path            | string   | Yes      |             |
| warnings                 | object[] | Yes      |             |
| legacy_address           | string   | No       |             |
| destination_tag          | string   | No       |             |
| deposit_uri              | string   | No       |             |
| callback_url             | string   | No       |             |
| qr_code_image_url        | string   | No       |             |
| address_label            | string   | No       |             |
| share_address_copy       | object   | No       |             |
| exchange_deposit_address | boolean  | No       |             |
| inline_warning           | object   | No       |             |

#### Example Response

```json
{
  "id": "fc9fed1e-d25b-54d8-b52b-7fa250c9ae2d",
  "address": 1.2165647733617772e48,
  "address_info": {
    "address": 1.2165647733617772e48
  },
  "name": "New exchange deposit address",
  "created_at": "2020-03-31T02:38:44.000Z",
  "updated_at": "2020-03-31T02:38:44.000Z",
  "network": "ethereum",
  "uri_scheme": "ethereum",
  "resource": "address",
  "resource_path": "/v2/accounts/faf4b657-a48c-56b2-bec2-77567e3f4f97/addresses/fc9fed1e-d25b-54d8-b52b-7fa250c9ae2d",
  "warnings": [
    {
      "title": "Only send Orchid (OXT) to this address",
      "details": "Sending any other digital asset, including Ethereum (ETH), will result in permanent loss.",
      "image_url": "https://dynamic-assets.coinbase.com/22b24ad9886150535671f158ccb0dd9d12089803728551c998e17e0f503484e9c38f3e8735354b5e622753684f040488b08d55b8ef5fef51592680f0c572bdfe/asset_icons/023010d790b9b1f47bc285802eafeab3d83c4de2029fe808d59935fbc54cdd7c.png"
    }
  ],
  "deposit_uri": "ethereum:0x4575f41308ec1483f3d399aa9a2826d74da13deb/transfer?address=0xd518A6B23D8bCA15B9cC46a00Be8a818E34Ca79E",
  "exchange_deposit_address": true
}
```

---

# Get all Coinbase wallets - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/coinbase-accounts/get-all-coinbase-wallets](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/coinbase-accounts/get-all-coinbase-wallets)

## Endpoint

`GET /coinbase-accounts`

## Description

Gets all the user’s available Coinbase wallets (These are the wallets/accounts
that are used for buying and selling on www.coinbase.com)

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

| Field                 | Type         | Required | Description |
| --------------------- | ------------ | -------- | ----------- |
| id                    | string       | Yes      |             |
| name                  | string       | Yes      |             |
| balance               | string       | Yes      |             |
| currency              | string       | Yes      |             |
| type                  | enum<string> | Yes      |             |
| primary               | boolean      | Yes      |             |
| active                | boolean      | Yes      |             |
| hold_balance          | string       | Yes      |             |
| hold_currency         | string       | Yes      |             |
| destination_tag_name  | string       | No       |             |
| destination_tag_regex | string       | No       |             |

#### Example Response

```json
[
  {
    "available_on_consumer": true,
    "hold_balance": "0.00",
    "id": "OXT",
    "hold_currency": "USD",
    "balance": "0.00000000",
    "currency": "OXT",
    "primary": false,
    "name": "OXT Wallet",
    "type": "wallet",
    "active": true
  }
]
```

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

# Get fees - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/fees/get-fee](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/fees/get-fee)

## Endpoint

`GET /fees`

## Description

Get fees rates and 30 days trailing volume.

## Permissions

This endpoint requires the “view” permission.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Response

### 200 Success

Fees defines taker and maker fees for a given user including the volume in USD.

#### Response Fields

| Field          | Type   | Required | Description                         |
| -------------- | ------ | -------- | ----------------------------------- |
| taker_fee_rate | string | Yes      | Taker fee rate.                     |
| maker_fee_rate | string | Yes      | Maker fee rate.                     |
| usd_volume     | string | No       | The 30 days trailing volume in USD. |

#### Example Response

```json
{
  "maker_fee_rate": "0.0050",
  "taker_fee_rate": "0.0050",
  "usd_volume": "43806.92"
}
```

---

# Get auto loan setting - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/futures/get-auto-loan-setting](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/futures/get-auto-loan-setting)

## Endpoint

`GET /margin/auto-loan`

## Description

Get the setting to automatically initiate loans to meet margin calls with
Coinbase affiliates in accordance with the Lending Agreement and Side Letter

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

| Field     | Type    | Required | Description |
| --------- | ------- | -------- | ----------- |
| auto_loan | boolean | No       |             |

#### Example Response

```json
{
  "auto_loan": true
}
```

---

# Get USDC conversion - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/futures/get-usdc-conversion](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/futures/get-usdc-conversion)

## Endpoint

`GET /margin/usdc`

## Description

Get the USDC to USD auto conversion setting to meet margin calls with eligible
Coinbase Affiliate

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

| Field   | Type    | Required | Description |
| ------- | ------- | -------- | ----------- |
| enabled | boolean | No       |             |

#### Example Response

```json
{
  "enabled": true
}
```

---

# Set auto loan - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/futures/set-auto-loan](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/futures/set-auto-loan)

## Endpoint

`POST /margin/auto-loan`

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

| Field     | Type    | Required | Description |
| --------- | ------- | -------- | ----------- |
| auto_loan | boolean | No       |             |

#### Example Response

```json
{
  "auto_loan": true
}
```

---

# Set USDC conversion - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/futures/set-usdc-conversion](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/futures/set-usdc-conversion)

## Endpoint

`POST /margin/usdc`

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

| Field   | Type    | Required | Description |
| ------- | ------- | -------- | ----------- |
| enabled | boolean | No       |             |

#### Example Response

```json
{
  "enabled": true
}
```

---

# Get lending overview - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/get-lending-overview](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/get-lending-overview)

## Endpoint

`GET /loans/lending-overview`

## Description

Get lending overview returns all amounts in USD notional values, except
available_per_asset mappings which are returned in both notional and native
values.

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

| Field    | Type     | Required | Description |
| -------- | -------- | -------- | ----------- |
| overview | object   | No       |             |
| loans    | object[] | No       |             |

#### Example Response

```json
{
  "overview": {
    "open_loan_value": "<string>",
    "collateral_value": "<string>",
    "collateralization_percentage": "<string>",
    "available_to_borrow": "<string>",
    "available_per_asset": {},
    "withdrawal_restricted": true,
    "credit_limit_value": "<string>",
    "available_credit_value": "<string>",
    "collateralization_percentage_open_only": "<string>",
    "pending_loan_value": "<string>",
    "initial_margin_percentage": "<string>",
    "minimum_margin_percentage": "<string>",
    "unlock_margin_percentage": "<string>"
  },
  "loans": [
    {
      "id": "<string>",
      "currency": "<string>",
      "principal_amount": "<string>",
      "outstanding_principal_amount": "<string>",
      "interest_rate": "<string>",
      "interest_currency": "<string>",
      "status": "loan_pending",
      "effective_at": "2023-11-07T05:31:56Z",
      "closed_at": "2023-11-07T05:31:56Z",
      "term_start_date": "2023-11-07T05:31:56Z",
      "term_end_date": "2023-11-07T05:31:56Z"
    }
  ]
}
```

---

# Get new loan preview - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/get-new-loan-preview](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/get-new-loan-preview)

## Endpoint

`GET /loans/loan-preview`

## Description

Coinbase Exchange Loans Program

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Query Parameters

| Parameter     | Type   | Description |
| ------------- | ------ | ----------- |
| currency      | string |             |
| native_amount | string |             |

## Response

### 200 Success

A successful response.

#### Response Fields

| Field  | Type   | Required | Description |
| ------ | ------ | -------- | ----------- |
| before | object | No       |             |
| after  | object | No       |             |

#### Example Response

```json
{
  "before": {
    "open_loan_value": "<string>",
    "collateral_value": "<string>",
    "collateralization_percentage": "<string>",
    "available_to_borrow": "<string>",
    "available_per_asset": {},
    "withdrawal_restricted": true,
    "credit_limit_value": "<string>",
    "available_credit_value": "<string>",
    "collateralization_percentage_open_only": "<string>",
    "pending_loan_value": "<string>",
    "initial_margin_percentage": "<string>",
    "minimum_margin_percentage": "<string>",
    "unlock_margin_percentage": "<string>"
  },
  "after": {
    "open_loan_value": "<string>",
    "collateral_value": "<string>",
    "collateralization_percentage": "<string>",
    "available_to_borrow": "<string>",
    "available_per_asset": {},
    "withdrawal_restricted": true,
    "credit_limit_value": "<string>",
    "available_credit_value": "<string>",
    "collateralization_percentage_open_only": "<string>",
    "pending_loan_value": "<string>",
    "initial_margin_percentage": "<string>",
    "minimum_margin_percentage": "<string>",
    "unlock_margin_percentage": "<string>"
  }
}
```

---

# Get principal repayment preview - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/get-principal-repayment-preview](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/get-principal-repayment-preview)

## Endpoint

`GET /loans/repayment-preview`

## Description

Like the Get lending overview API, all values are notional except
available_per_asset which returns both notional and native values per currency.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Query Parameters

| Parameter     | Type   | Description |
| ------------- | ------ | ----------- |
| loan_id       | string |             |
| currency      | string |             |
| native_amount | string |             |

## Response

### 200 Success

A successful response.

#### Response Fields

| Field  | Type   | Required | Description |
| ------ | ------ | -------- | ----------- |
| before | object | No       |             |
| after  | object | No       |             |

#### Example Response

```json
{
  "before": {
    "open_loan_value": "<string>",
    "collateral_value": "<string>",
    "collateralization_percentage": "<string>",
    "available_to_borrow": "<string>",
    "available_per_asset": {},
    "withdrawal_restricted": true,
    "credit_limit_value": "<string>",
    "available_credit_value": "<string>",
    "collateralization_percentage_open_only": "<string>",
    "pending_loan_value": "<string>",
    "initial_margin_percentage": "<string>",
    "minimum_margin_percentage": "<string>",
    "unlock_margin_percentage": "<string>"
  },
  "after": {
    "open_loan_value": "<string>",
    "collateral_value": "<string>",
    "collateralization_percentage": "<string>",
    "available_to_borrow": "<string>",
    "available_per_asset": {},
    "withdrawal_restricted": true,
    "credit_limit_value": "<string>",
    "available_credit_value": "<string>",
    "collateralization_percentage_open_only": "<string>",
    "pending_loan_value": "<string>",
    "initial_margin_percentage": "<string>",
    "minimum_margin_percentage": "<string>",
    "unlock_margin_percentage": "<string>"
  }
}
```

---

# List interest charges - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/list-interest-charges](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/list-interest-charges)

## Endpoint

`GET /loans/interest/%7Bloan_id%7D`

## Description

List interest charges for a loan

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
| loan_id   | string | Yes      |             |

## Response

### 200 Success

#### Response Fields

| Field            | Type   | Required | Description |
| ---------------- | ------ | -------- | ----------- |
| date             | string | No       |             |
| currency         | string | No       |             |
| principal_amount | string | No       |             |
| interest_rate    | string | No       |             |
| interest_accrued | string | No       |             |

#### Example Response

```json
[
  {
    "date": "2023-11-07T05:31:56Z",
    "currency": "<string>",
    "principal_amount": "<string>",
    "interest_rate": "<string>",
    "interest_accrued": "<string>"
  }
]
```

---

# List interest rate history - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/list-interest-rate-history](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/list-interest-rate-history)

## Endpoint

`GET /loans/interest/history/%7Bloan_id%7D`

## Description

List interest rate history for a loan

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
| loan_id   | string | Yes      |             |

## Response

### 200 Success

#### Response Fields

| Field         | Type   | Required | Description |
| ------------- | ------ | -------- | ----------- |
| interest_rate | string | No       |             |
| effective_at  | string | No       |             |

#### Example Response

```json
[
  {
    "interest_rate": "<string>",
    "effective_at": "2023-11-07T05:31:56Z"
  }
]
```

---

# List interest summaries - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/list-interest-summaries](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/list-interest-summaries)

## Endpoint

`GET /loans/interest`

## Description

List summaries of interest owed by asset

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Response

### 200 Success

amount accrued in current month and not yet due

#### Response Fields

| Field                     | Type         | Required | Description                                                     |
| ------------------------- | ------------ | -------- | --------------------------------------------------------------- |
| currency                  | string       | No       |                                                                 |
| current_owed              | string       | No       | amount accrued in current month and not yet due                 |
| last_payment_date         | string       | No       |                                                                 |
| payment_status            | enum<string> | No       |                                                                 |
| last_payment_amount       | string       | No       |                                                                 |
| prior_period_overdue      | string       | No       | interest payable that accrued in previous months and is now due |
| current_interest_due_date | string       | No       |                                                                 |

#### Example Response

```json
[
  {
    "currency": "<string>",
    "current_owed": "<string>",
    "last_payment_date": "2023-11-07T05:31:56Z",
    "payment_status": "STATUS_UNSPECIFIED",
    "last_payment_amount": "<string>",
    "prior_period_overdue": "<string>",
    "current_interest_due_date": "2023-11-07T05:31:56Z"
  }
]
```

---

# List loan assets - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/list-loan-assets](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/list-loan-assets)

## Endpoint

`GET /loans/assets`

## Description

Coinbase Exchange Loans Program

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

| Field                 | Type     | Required | Description |
| --------------------- | -------- | -------- | ----------- |
| collateral_assets     | object   | No       |             |
| diversification_ratio | string   | No       |             |
| borrowable_assets     | string[] | No       |             |

#### Example Response

```json
{
  "collateral_assets": {},
  "diversification_ratio": "<string>",
  "borrowable_assets": ["<string>"]
}
```

---

# List loans - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/list-loans](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/list-loans)

## Endpoint

`GET /loans`

## Description

Coinbase Exchange Loans Program

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Query Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| ids       | string |             |

## Response

### 200 Success

#### Response Fields

| Field                        | Type         | Required | Description |
| ---------------------------- | ------------ | -------- | ----------- |
| id                           | string       | No       |             |
| currency                     | string       | No       |             |
| principal_amount             | string       | No       |             |
| outstanding_principal_amount | string       | No       |             |
| interest_rate                | string       | No       |             |
| interest_currency            | string       | No       |             |
| status                       | enum<string> | No       |             |
| effective_at                 | string       | No       |             |
| closed_at                    | string       | No       |             |
| term_start_date              | string       | No       |             |
| term_end_date                | string       | No       |             |

#### Example Response

```json
[
  {
    "id": "<string>",
    "currency": "<string>",
    "principal_amount": "<string>",
    "outstanding_principal_amount": "<string>",
    "interest_rate": "<string>",
    "interest_currency": "<string>",
    "status": "loan_pending",
    "effective_at": "2023-11-07T05:31:56Z",
    "closed_at": "2023-11-07T05:31:56Z",
    "term_start_date": "2023-11-07T05:31:56Z",
    "term_end_date": "2023-11-07T05:31:56Z"
  }
]
```

---

# List new loan options - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/list-new-loan-options](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/list-new-loan-options)

## Endpoint

`GET /loans`

## Description

Coinbase Exchange Loans Program

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Query Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| ids       | string |             |

## Response

### 200 Success

#### Response Fields

| Field                        | Type         | Required | Description |
| ---------------------------- | ------------ | -------- | ----------- |
| id                           | string       | No       |             |
| currency                     | string       | No       |             |
| principal_amount             | string       | No       |             |
| outstanding_principal_amount | string       | No       |             |
| interest_rate                | string       | No       |             |
| interest_currency            | string       | No       |             |
| status                       | enum<string> | No       |             |
| effective_at                 | string       | No       |             |
| closed_at                    | string       | No       |             |
| term_start_date              | string       | No       |             |
| term_end_date                | string       | No       |             |

#### Example Response

```json
[
  {
    "id": "<string>",
    "currency": "<string>",
    "principal_amount": "<string>",
    "outstanding_principal_amount": "<string>",
    "interest_rate": "<string>",
    "interest_currency": "<string>",
    "status": "loan_pending",
    "effective_at": "2023-11-07T05:31:56Z",
    "closed_at": "2023-11-07T05:31:56Z",
    "term_start_date": "2023-11-07T05:31:56Z",
    "term_end_date": "2023-11-07T05:31:56Z"
  }
]
```

---

# Open new loan - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/open-new-loan](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/open-new-loan)

## Endpoint

`POST /loans/open`

## Description

Coinbase Exchange Loans Program

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

| Field | Type   | Required | Description |
| ----- | ------ | -------- | ----------- |
| loan  | object | No       |             |

#### Example Response

```json
{
  "loan": {
    "id": "<string>",
    "currency": "<string>",
    "principal_amount": "<string>",
    "outstanding_principal_amount": "<string>",
    "interest_rate": "<string>",
    "interest_currency": "<string>",
    "status": "loan_pending",
    "effective_at": "2023-11-07T05:31:56Z",
    "closed_at": "2023-11-07T05:31:56Z",
    "term_start_date": "2023-11-07T05:31:56Z",
    "term_end_date": "2023-11-07T05:31:56Z"
  }
}
```

---

# Repay loan interest - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/repay-loan-interest](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/repay-loan-interest)

## Endpoint

`POST /loans/repay-interest`

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

| Field     | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| repayment | object | No       |             |

#### Example Response

```json
{
  "repayment": {
    "id": "<string>",
    "native_amount": "<string>",
    "status": "REPAYMENT_UNSET",
    "type": "REPAYMENT_TYPE_UNSET"
  }
}
```

---

# Repay loan principal - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/repay-loan-principal](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/loan/repay-loan-principal)

## Endpoint

`POST /loans/repay-principal`

## Description

Coinbase Exchange Loans Program

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

| Field     | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| repayment | object | No       |             |

#### Example Response

```json
{
  "repayment": {
    "id": "<string>",
    "loan_id": "<string>",
    "native_amount": "<string>",
    "initial_native_amount": "<string>",
    "status": "REPAYMENT_UNSET",
    "type": "REPAYMENT_TYPE_UNSET"
  }
}
```

---

# Cancel all orders - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/cancel-all-orders](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/cancel-all-orders)

## Endpoint

`DELETE /orders`

## Description

With best effort, cancel all open orders. This may require you to make the
request multiple times until all of the open orders are deleted.

## Permissions

This endpoint requires the “trade” permission.

## Examples

| Example                    | Response                                 |
| -------------------------- | ---------------------------------------- |
| /orders?product_id=FOO-BAR | (404) ProductNotFound                    |
| /orders?product_id=BtC-uSd | (200) Cancel all orders for BTC-USD      |
| /orders?Product_id=BTC-USD | (400) Return BadRequest Error            |
| /orders                    | (200) Cancel all orders for all products |

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Query Parameters

| Parameter  | Type   | Description                               |
| ---------- | ------ | ----------------------------------------- |
| profile_id | string | Cancels orders on a specific profile      |
| product_id | string | Cancels orders on a specific product only |

## Response

### 200 Success

A list of the ids of open orders that were successfully cancelled

#### Example Response

```json
["<string>"]
```

---

# Cancel an order - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/cancel-an-order](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/cancel-an-order)

## Endpoint

`DELETE /orders/%7Border_id%7D`

## Description

Cancel a previously placed order

## Permissions

This endpoint requires the “trade” permission.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter | Type   | Required | Description                                                                                                                                                         |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| order_id  | string | Yes      | Orders may be canceled using either the exchange assigned id or the client assigned client_oid. When using client_oid it must be preceded by the client: namespace. |

## Query Parameters

| Parameter  | Type   | Description                          |
| ---------- | ------ | ------------------------------------ |
| profile_id | string | Cancels orders on a specific profile |
| product_id | string | Optional product id of order         |

## Response

### 200 Success

the id of the order that was cancelled`

---

# Create a new order - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/create-new-order](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/create-new-order)

## Endpoint

`POST /orders`

## Description

Each profile can place a maximum of 500 open orders on a product. Once reached,
the profile cannot place any new orders until the total number of open orders is
below 500.

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

The new order that was successfully created

#### Response Fields

| Field              | Type         | Required | Description                                                 |
| ------------------ | ------------ | -------- | ----------------------------------------------------------- |
| id                 | string       | Yes      | uuid                                                        |
| product_id         | string       | Yes      | book the order was placed on                                |
| side               | enum<string> | Yes      |                                                             |
| type               | enum<string> | Yes      |                                                             |
| post_only          | boolean      | Yes      | if true, forces order to be maker only                      |
| created_at         | string       | Yes      | timestamp at which order was placed                         |
| fill_fees          | string       | Yes      | fees paid on current filled amount                          |
| filled_size        | string       | Yes      | amount (in base currency) of the order that has been filled |
| status             | enum<string> | Yes      |                                                             |
| settled            | boolean      | Yes      | true if funds have been exchanged and settled               |
| price              | string       | No       | price per unit of base currency                             |
| size               | string       | No       | amount of base currency to buy/sell                         |
| profile_id         | string       | No       | profile_id that placed the order                            |
| funds              | string       | No       | amount of quote currency to spend (for market orders)       |
| specified_funds    | string       | No       | funds with fees                                             |
| time_in_force      | enum<string> | No       |                                                             |
| expire_time        | string       | No       | timestamp at which order expires                            |
| done_at            | string       | No       | timestamp at which order was done                           |
| done_reason        | string       | No       | reason order was done (filled, rejected, or otherwise)      |
| reject_reason      | string       | No       | reason order was rejected by engine                         |
| executed_value     | string       | No       |                                                             |
| stop               | enum<string> | No       |                                                             |
| stop_price         | string       | No       | price (in quote currency) at which to execute the order     |
| funding_amount     | string       | No       |                                                             |
| client_oid         | string       | No       | client order id                                             |
| market_type        | string       | No       | market type where order was traded                          |
| max_floor          | string       | No       | maximum visible quantity for iceberg order                  |
| secondary_order_id | string       | No       | order id for the visible order for iceberg order            |
| stop_limit_price   | string       | No       | stop limit price for TPSL order                             |

#### Example Response

```json
{
  "id": "a9625b04-fc66-4999-a876-543c3684d702",
  "price": "10.00000000",
  "size": "1.00000000",
  "product_id": "BTC-USD",
  "profile_id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
  "side": "buy",
  "type": "limit",
  "time_in_force": "GTC",
  "post_only": true,
  "max_floor": "4",
  "created_at": "2020-03-11T20:48:46.622Z",
  "fill_fees": "0.0000000000000000",
  "filled_size": "0.00000000",
  "executed_value": "0.0000000000000000",
  "status": "open",
  "settled": false
}
```

---

# Get all fills - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/get-all-fills](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/get-all-fills)

## Endpoint

`GET /fills`

## Description

Get a list of recent fills of the API key’s profile.

## Permissions

This endpoint requires either the “view” or “trade” permission.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Query Parameters

| Parameter   | Type         | Description                                                                                                                                                  |
| ----------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| order_id    | string       | limit to fills on a specific order. Either order_id or product_id is required.                                                                               |
| product_id  | string       | limit to fills on a specific product. Either order_id or product_id is required.                                                                             |
| limit       | integer      | Limit on number of results to return.                                                                                                                        |
| before      | string       | Used for pagination. Sets start cursor to before id.                                                                                                         |
| after       | string       | Used for pagination. Sets end cursor to after id.                                                                                                            |
| market_type | enum<string> | Market type which the order was filled in.                                                                                                                   |
| start_date  | string       | Search by minimum posted date time and is inclusive of time provided. Valid formats are either RFC3339, date or date time and must be after Unix Epoch time. |
| end_date    | string       | Search by maximum posted date time and is inclusive of time provided. Valid formats are either RFC3339, date or date time and must be after Unix Epoch time. |

## Response

### 200 Success

id of trade that created the fill

#### Response Fields

| Field            | Type         | Required | Description                                    |
| ---------------- | ------------ | -------- | ---------------------------------------------- |
| trade_id         | integer      | Yes      | id of trade that created the fill              |
| product_id       | string       | Yes      | book the order was placed on                   |
| order_id         | string       | Yes      | uuid                                           |
| user_id          | string       | Yes      | id of user's account                           |
| profile_id       | string       | Yes      | profile_id that placed the order               |
| liquidity        | enum<string> | Yes      |                                                |
| price            | string       | Yes      | price per unit of base currency                |
| size             | string       | Yes      | amount of base currency to buy/sell            |
| fee              | string       | Yes      | fees paid on current filled amount             |
| created_at       | string       | Yes      | timestamp of fill                              |
| side             | enum<string> | Yes      |                                                |
| settled          | boolean      | Yes      | true if funds have been exchanged and settled  |
| usd_volume       | string       | Yes      | true if funds have been exchanged and settled  |
| funding_currency | string       | Yes      | funding currency which the order was filled in |
| market_type      | string       | No       | market type which the order was filled in      |

#### Example Response

```json
[
  {
    "created_at": "2019-11-21T01:38:23.878Z",
    "trade_id": 78098253,
    "product_id": "BTC-USD",
    "order_id": "41473628-db2c-464e-b9f4-82df7e4fb4f4",
    "user_id": "5cf6e115aaf44503db300f1e",
    "profile_id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
    "liquidity": "T",
    "price": "8087.38000000",
    "size": "0.00601800",
    "fee": "0.2433492642000000",
    "side": "sell",
    "settled": true,
    "usd_volume": "48.6698528400000000",
    "funding_currency": "USDC"
  }
]
```

---

# Get all orders - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/get-all-orders](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/get-all-orders)

## Endpoint

`GET /orders`

## Description

Orders with a “pending” status have fewer fields in the response.

## Permissions

This endpoint requires either the “view” or “trade” permission.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Query Parameters

| Parameter   | Type           | Description                                            |
| ----------- | -------------- | ------------------------------------------------------ |
| profile_id  | string         | Filter results by a specific profile_id                |
| product_id  | string         | Filter results by a specific product_id                |
| sortedBy    | enum<string>   | Sort criteria for results.                             |
| sorting     | enum<string>   | Ascending or descending order, by sortedBy             |
| start_date  | string         | Filter results by minimum posted date                  |
| end_date    | string         | Filter results by maximum posted date                  |
| before      | string         | Used for pagination. Sets start cursor to before date. |
| after       | string         | Used for pagination. Sets end cursor to after date.    |
| limit       | integer        | Limit on number of results to return.                  |
| status      | enum<string>[] | Array with order statuses to filter by.                |
| market_type | string         | Market type which the order was traded in.             |

## Response

### 200 Success

uuid

#### Response Fields

| Field              | Type         | Required | Description                                                 |
| ------------------ | ------------ | -------- | ----------------------------------------------------------- |
| id                 | string       | Yes      | uuid                                                        |
| product_id         | string       | Yes      | book the order was placed on                                |
| side               | enum<string> | Yes      |                                                             |
| type               | enum<string> | Yes      |                                                             |
| post_only          | boolean      | Yes      | if true, forces order to be maker only                      |
| created_at         | string       | Yes      | timestamp at which order was placed                         |
| fill_fees          | string       | Yes      | fees paid on current filled amount                          |
| filled_size        | string       | Yes      | amount (in base currency) of the order that has been filled |
| status             | enum<string> | Yes      |                                                             |
| settled            | boolean      | Yes      | true if funds have been exchanged and settled               |
| price              | string       | No       | price per unit of base currency                             |
| size               | string       | No       | amount of base currency to buy/sell                         |
| profile_id         | string       | No       | profile_id that placed the order                            |
| funds              | string       | No       | amount of quote currency to spend (for market orders)       |
| specified_funds    | string       | No       | funds with fees                                             |
| time_in_force      | enum<string> | No       |                                                             |
| expire_time        | string       | No       | timestamp at which order expires                            |
| done_at            | string       | No       | timestamp at which order was done                           |
| done_reason        | string       | No       | reason order was done (filled, rejected, or otherwise)      |
| reject_reason      | string       | No       | reason order was rejected by engine                         |
| executed_value     | string       | No       |                                                             |
| stop               | enum<string> | No       |                                                             |
| stop_price         | string       | No       | price (in quote currency) at which to execute the order     |
| funding_amount     | string       | No       |                                                             |
| client_oid         | string       | No       | client order id                                             |
| market_type        | string       | No       | market type where order was traded                          |
| max_floor          | string       | No       | maximum visible quantity for iceberg order                  |
| secondary_order_id | string       | No       | order id for the visible order for iceberg order            |
| stop_limit_price   | string       | No       | stop limit price for TPSL order                             |

#### Example Response

```json
[
  {
    "id": "a9625b04-fc66-4999-a876-543c3684d702",
    "price": "10.00000000",
    "size": "1.00000000",
    "product_id": "BTC-USD",
    "profile_id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
    "side": "buy",
    "type": "limit",
    "time_in_force": "GTC",
    "post_only": true,
    "max_floor": "4",
    "created_at": "2020-03-11T20:48:46.622Z",
    "fill_fees": "0.0000000000000000",
    "filled_size": "0.00000000",
    "executed_value": "0.0000000000000000",
    "status": "open",
    "settled": false
  }
]
```

---

# Get single order - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/get-single-order](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/get-single-order)

## Endpoint

`GET /orders/%7Border_id%7D`

## Description

Orders can be queried using either the exchange assigned id or the client
assigned client_oid. When using client_oid it must be preceded by the client:
namespace.

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

| Parameter | Type   | Required | Description                                                                                                                                        |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| order_id  | string | Yes      | order_id is either the exchange assigned id or the client assigned client_oid. When using client_oid it must be preceded by the client: namespace. |

## Query Parameters

| Parameter   | Type   | Description                                |
| ----------- | ------ | ------------------------------------------ |
| market_type | string | Market type which the order was traded in. |

## Response

### 200 Success

uuid

#### Response Fields

| Field              | Type         | Required | Description                                                 |
| ------------------ | ------------ | -------- | ----------------------------------------------------------- |
| id                 | string       | Yes      | uuid                                                        |
| product_id         | string       | Yes      | book the order was placed on                                |
| side               | enum<string> | Yes      |                                                             |
| type               | enum<string> | Yes      |                                                             |
| post_only          | boolean      | Yes      | if true, forces order to be maker only                      |
| created_at         | string       | Yes      | timestamp at which order was placed                         |
| fill_fees          | string       | Yes      | fees paid on current filled amount                          |
| filled_size        | string       | Yes      | amount (in base currency) of the order that has been filled |
| status             | enum<string> | Yes      |                                                             |
| settled            | boolean      | Yes      | true if funds have been exchanged and settled               |
| price              | string       | No       | price per unit of base currency                             |
| size               | string       | No       | amount of base currency to buy/sell                         |
| profile_id         | string       | No       | profile_id that placed the order                            |
| funds              | string       | No       | amount of quote currency to spend (for market orders)       |
| specified_funds    | string       | No       | funds with fees                                             |
| time_in_force      | enum<string> | No       |                                                             |
| expire_time        | string       | No       | timestamp at which order expires                            |
| done_at            | string       | No       | timestamp at which order was done                           |
| done_reason        | string       | No       | reason order was done (filled, rejected, or otherwise)      |
| reject_reason      | string       | No       | reason order was rejected by engine                         |
| executed_value     | string       | No       |                                                             |
| stop               | enum<string> | No       |                                                             |
| stop_price         | string       | No       | price (in quote currency) at which to execute the order     |
| funding_amount     | string       | No       |                                                             |
| client_oid         | string       | No       | client order id                                             |
| market_type        | string       | No       | market type where order was traded                          |
| max_floor          | string       | No       | maximum visible quantity for iceberg order                  |
| secondary_order_id | string       | No       | order id for the visible order for iceberg order            |
| stop_limit_price   | string       | No       | stop limit price for TPSL order                             |

#### Example Response

```json
{
  "id": "a9625b04-fc66-4999-a876-543c3684d702",
  "price": "10.00000000",
  "size": "1.00000000",
  "product_id": "BTC-USD",
  "profile_id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
  "side": "buy",
  "type": "limit",
  "time_in_force": "GTC",
  "post_only": true,
  "max_floor": "4",
  "created_at": "2020-03-11T20:48:46.622Z",
  "fill_fees": "0.0000000000000000",
  "filled_size": "0.00000000",
  "executed_value": "0.0000000000000000",
  "status": "open",
  "settled": false
}
```

---

# Get all known trading pairs - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-all-known-trading-pairs](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-all-known-trading-pairs)

## Endpoint

`GET /products`

## Description

Order Size Limits Removed

## Query Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| type      | string |             |

## Response

### 200 Success

Min order price (a.k.a. price increment

#### Response Fields

| Field                     | Type         | Required | Description                                                                               |
| ------------------------- | ------------ | -------- | ----------------------------------------------------------------------------------------- |
| id                        | string       | Yes      |                                                                                           |
| base_currency             | string       | Yes      |                                                                                           |
| quote_currency            | string       | Yes      |                                                                                           |
| quote_increment           | string       | Yes      | Min order price (a.k.a. price increment                                                   |
| base_increment            | string       | Yes      |                                                                                           |
| display_name              | string       | Yes      |                                                                                           |
| min_market_funds          | string       | Yes      |                                                                                           |
| margin_enabled            | boolean      | Yes      |                                                                                           |
| post_only                 | boolean      | Yes      |                                                                                           |
| limit_only                | boolean      | Yes      |                                                                                           |
| cancel_only               | boolean      | Yes      |                                                                                           |
| status                    | enum<string> | Yes      |                                                                                           |
| status_message            | string       | Yes      |                                                                                           |
| auction_mode              | boolean      | Yes      |                                                                                           |
| trading_disabled          | boolean      | No       |                                                                                           |
| fx_stablecoin             | boolean      | No       |                                                                                           |
| max_slippage_percentage   | string       | No       |                                                                                           |
| high_bid_limit_percentage | string       | No       | Percentage to calculate highest price for limit buy order (Stable coin trading pair only) |

#### Example Response

```json
[
  {
    "id": "BTC-USD",
    "base_currency": "BTC",
    "quote_currency": "USD",
    "quote_increment": "0.01000000",
    "base_increment": "0.00000001",
    "display_name": "BTC/USD",
    "min_market_funds": "10",
    "margin_enabled": false,
    "post_only": false,
    "limit_only": false,
    "cancel_only": false,
    "status": "online",
    "status_message": "",
    "auction_mode": true
  }
]
```

---

# Get all product volume - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-all-product-volume](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-all-product-volume)

## Endpoint

`GET /products/volume-summary`

## Description

Gets 30day and 24hour volume for all products and market types

## Response

### 200 Success

#### Response Fields

| Field                    | Type     | Required | Description |
| ------------------------ | -------- | -------- | ----------- |
| id                       | string   | Yes      |             |
| base_currency            | string   | Yes      |             |
| quote_currency           | string   | Yes      |             |
| display_name             | string   | Yes      |             |
| market_types             | object[] | Yes      |             |
| spot_volume_24hour       | string   | Yes      |             |
| spot_volume_30day        | string   | Yes      |             |
| rfq_volume_24hour        | string   | Yes      |             |
| rfq_volume_30day         | string   | Yes      |             |
| conversion_volume_24hour | string   | Yes      |             |
| conversion_volume_30day  | string   | Yes      |             |

#### Example Response

```json
[
  [
    {
      "id": "GALA-XYO",
      "base_currency": "GALA",
      "quote_currency": "XYO",
      "display_name": "GALA-XYO",
      "market_types": ["rfq"],
      "spot_volume_24hour": "",
      "spot_volume_30day": "",
      "rfq_volume_24hour": "1232.2342",
      "rfq_volume_30day": "2453232.2342",
      "conversion_volume_24hour": "0",
      "conversion_volume_30day": "0"
    }
  ]
]
```

---

# Get product book - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-book](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-book)

## Endpoint

`GET /products/%7Bproduct_id%7D/book`

## Description

By default, only the inside (i.e., the best) bid and ask are returned. This is
equivalent to a book depth of 1 level. To see a larger order book, specify the
level query parameter.

## Path Parameters

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| product_id | string | Yes      |             |

## Query Parameters

| Parameter | Type    | Description |
| --------- | ------- | ----------- |
| level     | integer |             |

## Response

### 200 Success

#### Response Fields

| Field        | Type     | Required | Description |
| ------------ | -------- | -------- | ----------- |
| bids         | object[] | Yes      |             |
| asks         | object[] | Yes      |             |
| sequence     | number   | Yes      |             |
| time         | string   | Yes      |             |
| auction_mode | boolean  | No       |             |
| auction      | object   | No       |             |

#### Example Response

```json
{
  "indicative_open_price": "333.99",
  "indicative_open_size": "0.193",
  "indicative_bid_price": "333.98",
  "indicative_bid_size": "4.39088265",
  "indicative_ask_price": "333.99",
  "indicative_ask_size": "25.23542881",
  "auction_status": "CAN_OPEN"
}
```

---

# Get product candles - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-candles](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-candles)

## Endpoint

`GET /products/%7Bproduct_id%7D/candles`

## Description

If the start or end fields are not provided, both fields are ignored. If a
custom time range is not declared, then one ending now is selected.

## Path Parameters

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| product_id | string | Yes      |             |

## Query Parameters

| Parameter   | Type   | Description                                  |
| ----------- | ------ | -------------------------------------------- |
| granularity | string |                                              |
| start       | string | Timestamp for starting range of aggregations |
| end         | string | Timestamp for ending range of aggregations   |

## Response

### 200 Success

The response is of type object[].

#### Example Response

```json
[{}]
```

---

# Get product stats - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-stats](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-stats)

## Endpoint

`GET /products/%7Bproduct_id%7D/stats`

## Description

Thevolume property is in base currency units. Properties open, high, low are in
quote currency units.

## Path Parameters

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| product_id | string | Yes      |             |

## Response

### 200 Success

#### Response Fields

| Field                     | Type   | Required | Description |
| ------------------------- | ------ | -------- | ----------- |
| open                      | string | Yes      |             |
| high                      | string | Yes      |             |
| low                       | string | Yes      |             |
| last                      | string | Yes      |             |
| volume                    | string | Yes      |             |
| volume_30day              | string | No       |             |
| rfq_volume_24hour         | string | No       |             |
| rfq_volume_30day          | string | No       |             |
| conversions_volume_24hour | string | No       |             |
| conversions_volume_30day  | string | No       |             |

#### Example Response

```json
{
  "open": "5414.18000000",
  "high": "6441.37000000",
  "low": "5261.69000000",
  "volume": "53687.76764233",
  "last": "6250.02000000",
  "volume_30day": "786763.72930864",
  "rfq_volume_24hour": "78.23",
  "conversions_volume_24hour": "0.000000",
  "rfq_volume_30day": "0.000000",
  "conversions_volume_30day": "0.000000"
}
```

---

# Get product ticker - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-ticker](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-ticker)

## Endpoint

`GET /products/%7Bproduct_id%7D/ticker`

## Description

Coinbase recommends that you get real-time updates by connecting with the
WebSocket stream and listening for match messages, rather than polling.

## Path Parameters

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| product_id | string | Yes      |             |

## Response

### 200 Success

#### Response Fields

| Field              | Type    | Required | Description |
| ------------------ | ------- | -------- | ----------- |
| ask                | string  | Yes      |             |
| bid                | string  | Yes      |             |
| volume             | string  | Yes      |             |
| trade_id           | integer | Yes      |             |
| price              | string  | Yes      |             |
| size               | string  | Yes      |             |
| time               | string  | Yes      |             |
| rfq_volume         | string  | No       |             |
| conversions_volume | string  | No       |             |

#### Example Response

```json
{
  "trade_id": 86326522,
  "price": "6268.48",
  "size": "0.00698254",
  "time": "2020-03-20T00:22:57.833Z",
  "bid": "6265.15",
  "ask": "6267.71",
  "volume": "53602.03940154",
  "rfq_volume": "123.122",
  "conversions_volume": "0.00"
}
```

---

# Get product trades - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-trades](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-trades)

## Endpoint

`GET /products/%7Bproduct_id%7D/trades`

## Description

The side of a trade indicates the maker order side. The maker order is the order
that was open on the order book.

## Path Parameters

| Parameter  | Type   | Required | Description                       |
| ---------- | ------ | -------- | --------------------------------- |
| product_id | string | Yes      | list trades for specific product. |

## Query Parameters

| Parameter | Type    | Description                                          |
| --------- | ------- | ---------------------------------------------------- |
| limit     | integer | Limit on number of results to return.                |
| before    | string  | Used for pagination. Sets start cursor to before id. |
| after     | string  | Used for pagination. Sets end cursor to after id.    |

## Response

### 200 Success

#### Response Fields

| Field    | Type         | Required | Description |
| -------- | ------------ | -------- | ----------- |
| trade_id | integer      | Yes      |             |
| side     | enum<string> | Yes      |             |
| size     | string       | Yes      |             |
| price    | string       | Yes      |             |
| time     | string       | Yes      |             |

#### Example Response

```json
[
  {
    "time": "2020-03-20T00:36:59.860Z",
    "trade_id": 86327327,
    "price": "6225.32000000",
    "size": "0.06469797",
    "side": "sell"
  }
]
```

---

# Get single product - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-single-product](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-single-product)

## Endpoint

`GET /products/%7Bproduct_id%7D`

## Description

Get information on a single product.

## Path Parameters

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| product_id | string | Yes      |             |

## Response

### 200 Success

Min order price (a.k.a. price increment

#### Response Fields

| Field                     | Type         | Required | Description                                                                               |
| ------------------------- | ------------ | -------- | ----------------------------------------------------------------------------------------- |
| id                        | string       | Yes      |                                                                                           |
| base_currency             | string       | Yes      |                                                                                           |
| quote_currency            | string       | Yes      |                                                                                           |
| quote_increment           | string       | Yes      | Min order price (a.k.a. price increment                                                   |
| base_increment            | string       | Yes      |                                                                                           |
| display_name              | string       | Yes      |                                                                                           |
| min_market_funds          | string       | Yes      |                                                                                           |
| margin_enabled            | boolean      | Yes      |                                                                                           |
| post_only                 | boolean      | Yes      |                                                                                           |
| limit_only                | boolean      | Yes      |                                                                                           |
| cancel_only               | boolean      | Yes      |                                                                                           |
| status                    | enum<string> | Yes      |                                                                                           |
| status_message            | string       | Yes      |                                                                                           |
| auction_mode              | boolean      | Yes      |                                                                                           |
| trading_disabled          | boolean      | No       |                                                                                           |
| fx_stablecoin             | boolean      | No       |                                                                                           |
| max_slippage_percentage   | string       | No       |                                                                                           |
| high_bid_limit_percentage | string       | No       | Percentage to calculate highest price for limit buy order (Stable coin trading pair only) |

#### Example Response

```json
{
  "id": "BTC-USD",
  "base_currency": "BTC",
  "quote_currency": "USD",
  "quote_increment": "0.01000000",
  "base_increment": "0.00000001",
  "display_name": "BTC/USD",
  "min_market_funds": "10",
  "margin_enabled": false,
  "post_only": false,
  "limit_only": false,
  "cancel_only": false,
  "status": "online",
  "status_message": "",
  "auction_mode": true
}
```

---

# Create a profile - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/create-profile](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/create-profile)

## Endpoint

`POST /profiles`

## Description

Create a new profile. Will fail if no name is provided or if user already has
max number of profiles.

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

| Field      | Type    | Required | Description |
| ---------- | ------- | -------- | ----------- |
| id         | string  | Yes      |             |
| user_id    | string  | Yes      |             |
| name       | string  | Yes      |             |
| active     | boolean | Yes      |             |
| is_default | boolean | Yes      |             |
| created_at | string  | Yes      |             |

#### Example Response

```json
{
  "id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
  "user_id": "5cf6e115aaf44503db300f1e",
  "name": "default",
  "active": true,
  "is_default": true,
  "created_at": "2019-06-04T21:22:32.226Z"
}
```

---

# Delete a profile - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/delete-profile](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/delete-profile)

## Endpoint

`PUT /profiles/%7Bprofile_id%7D/deactivate`

## Description

Deletes the profile specified by profile_id and transfers all funds to the
profile specified by to. Fails if there are any open orders on the profile to be
deleted.

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
| profile_id | string | Yes      |             |

## Response

### 200 Success

A successful response.

#### Example Response

```json
{}
```

---

# Get profile by id - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/get-profile-by-id](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/get-profile-by-id)

## Endpoint

`GET /profiles/%7Bprofile_id%7D`

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
| profile_id | string | Yes      |             |

## Query Parameters

| Parameter | Type    | Description |
| --------- | ------- | ----------- |
| active    | boolean |             |

## Response

### 200 Success

#### Response Fields

| Field      | Type    | Required | Description |
| ---------- | ------- | -------- | ----------- |
| id         | string  | Yes      |             |
| user_id    | string  | Yes      |             |
| name       | string  | Yes      |             |
| active     | boolean | Yes      |             |
| is_default | boolean | Yes      |             |
| created_at | string  | Yes      |             |

#### Example Response

```json
{
  "id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
  "user_id": "5cf6e115aaf44503db300f1e",
  "name": "default",
  "active": true,
  "is_default": true,
  "created_at": "2019-06-04T21:22:32.226Z"
}
```

---

# Get profiles - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/get-profiles](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/get-profiles)

## Endpoint

`GET /profiles`

## Description

Gets a list of all of the current user’s profiles.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Query Parameters

| Parameter | Type    | Description |
| --------- | ------- | ----------- |
| active    | boolean |             |

## Response

### 200 Success

#### Response Fields

| Field      | Type    | Required | Description |
| ---------- | ------- | -------- | ----------- |
| id         | string  | Yes      |             |
| user_id    | string  | Yes      |             |
| name       | string  | Yes      |             |
| active     | boolean | Yes      |             |
| is_default | boolean | Yes      |             |
| created_at | string  | Yes      |             |

#### Example Response

```json
[
  {
    "id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
    "user_id": "5cf6e115aaf44503db300f1e",
    "name": "default",
    "active": true,
    "is_default": true,
    "created_at": "2019-06-04T21:22:32.226Z"
  }
]
```

---

# Rename a profile - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/rename-profile](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/rename-profile)

## Endpoint

`PUT /profiles/%7Bprofile_id%7D`

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
| profile_id | string | Yes      |             |

## Response

### 200 Success

#### Response Fields

| Field      | Type    | Required | Description |
| ---------- | ------- | -------- | ----------- |
| id         | string  | Yes      |             |
| user_id    | string  | Yes      |             |
| name       | string  | Yes      |             |
| active     | boolean | Yes      |             |
| is_default | boolean | Yes      |             |
| created_at | string  | Yes      |             |

#### Example Response

```json
{
  "id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
  "user_id": "5cf6e115aaf44503db300f1e",
  "name": "default",
  "active": true,
  "is_default": true,
  "created_at": "2019-06-04T21:22:32.226Z"
}
```

---

# Transfer funds between profiles - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/transfer-funds-profile](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/transfer-funds-profile)

## Endpoint

`POST /profiles/transfer`

## Permissions

This endpoint requires the “transfer” permission.

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

#### Example Response

```json
{}
```

---

# Create a report - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/reports/create-report](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/reports/create-report)

## Endpoint

`POST /reports`

## Description

Reports provide batches of historic information about your profile in various
human and machine readable forms.

## Permissions

This endpoint requires either the “view” or “trade” permission.

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

| Field  | Type         | Required | Description |
| ------ | ------------ | -------- | ----------- |
| id     | string       | Yes      |             |
| type   | string       | Yes      |             |
| status | enum<string> | Yes      |             |

#### Example Response

```json
{
  "id": "<string>",
  "type": "<string>",
  "status": "pending"
}
```

---

# Get a report - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/reports/get-report](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/reports/get-report)

## Endpoint

`GET /reports/%7Breport_id%7D`

## Description

Once a report request has been accepted for processing, you can poll the report
resource endpoint at /reports/{report_id} for its status. When status is ready,
the final report is uploaded and available at {file_url}.

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

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| report_id | string | Yes      |             |

## Response

### 200 Success

#### Response Fields

| Field        | Type         | Required | Description |
| ------------ | ------------ | -------- | ----------- |
| id           | string       | Yes      |             |
| type         | string       | Yes      |             |
| created_at   | string       | Yes      |             |
| completed_at | string       | Yes      |             |
| expires_at   | string       | Yes      |             |
| status       | enum<string> | Yes      |             |
| user_id      | string       | Yes      |             |
| file_url     | string       | Yes      |             |
| params       | object       | Yes      |             |
| file_count   | string       | No       |             |

#### Example Response

```json
{
  "start_date": "2019-06-25T22:13:48.592Z",
  "end_date": "2019-07-25T22:13:48.592Z",
  "format": "pdf",
  "product_id": "ALL",
  "account_id": "ALL",
  "profile_id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
  "email": "user1@example.com",
  "user": {
    "created_at": "2019-06-04T21:22:32.226Z",
    "active_at": "2019-06-04T21:27:49.250Z",
    "id": "5cf6e115aaf44503db300f1e",
    "name": "User One",
    "email": "user1@example.com",
    "is_banned": false,
    "user_type": "individual",
    "fulfills_new_requirements": true,
    "oauth_client": "pro",
    "preferences": {
      "preferred_market": "BTC-USD",
      "margin_terms_completed_in_utc": "2019-06-13T23:40:17.752Z",
      "margin_tutorial_completed_in_utc": "2019-06-19T23:56:59.411Z"
    },
    "has_default": false
  },
  "new_york_state": false
}
```

---

# Get all reports - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/reports/get-all-reports](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/reports/get-all-reports)

## Endpoint

`GET /reports`

## Description

Once a report request has been accepted for processing, you can poll the report
resource endpoint at /reports/{report_id} for its status. When status is ready,
the final report is uploaded and available at {file_url}.

## Permissions

This endpoint requires either the “view” or “trade” permission.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Query Parameters

| Parameter      | Type    | Description                                                                                                                                |
| -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| profile_id     | string  | Filter results by a specific profile_id                                                                                                    |
| after          | string  | Filter results after a specific date                                                                                                       |
| limit          | integer | Limit results to a specific number                                                                                                         |
| type           | string  | Filter results by type of report. Possible values: [account, balance, fills, otc-fills, rfq-fills, tax-invoice, 1099k-transaction-history] |
| ignore_expired | boolean | Ignore expired results                                                                                                                     |

## Response

### 200 Success

#### Response Fields

| Field        | Type         | Required | Description |
| ------------ | ------------ | -------- | ----------- |
| id           | string       | Yes      |             |
| type         | string       | Yes      |             |
| created_at   | string       | Yes      |             |
| completed_at | string       | Yes      |             |
| expires_at   | string       | Yes      |             |
| status       | enum<string> | Yes      |             |
| user_id      | string       | Yes      |             |
| file_url     | string       | Yes      |             |
| params       | object       | Yes      |             |
| file_count   | string       | No       |             |

#### Example Response

```json
{
  "start_date": "2019-06-25T22:13:48.592Z",
  "end_date": "2019-07-25T22:13:48.592Z",
  "format": "pdf",
  "product_id": "ALL",
  "account_id": "ALL",
  "profile_id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
  "email": "user1@example.com",
  "user": {
    "created_at": "2019-06-04T21:22:32.226Z",
    "active_at": "2019-06-04T21:27:49.250Z",
    "id": "5cf6e115aaf44503db300f1e",
    "name": "User One",
    "email": "user1@example.com",
    "is_banned": false,
    "user_type": "individual",
    "fulfills_new_requirements": true,
    "oauth_client": "pro",
    "preferences": {
      "preferred_market": "BTC-USD",
      "margin_terms_completed_in_utc": "2019-06-13T23:40:17.752Z",
      "margin_tutorial_completed_in_utc": "2019-06-19T23:56:59.411Z"
    },
    "has_default": false
  },
  "new_york_state": false
}
```

---

# Deposit from Coinbase account - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/transfers/deposit-from-coinbase-account](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/transfers/deposit-from-coinbase-account)

## Endpoint

`POST /deposits/coinbase-account`

## Description

Deposit funds from a Coinbase account

## Permissions

This endpoint requires the “transfer” permission.

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

| Field    | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| id       | string | No       |             |
| amount   | string | No       |             |
| currency | string | No       |             |

#### Example Response

```json
{
  "id": "<string>",
  "amount": "<string>",
  "currency": "<string>"
}
```

---

# Deposit from payment method - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/transfers/deposit-from-payment-method](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/transfers/deposit-from-payment-method)

## Endpoint

`POST /deposits/payment-method`

## Description

Deposit funds from a payment method

## Permissions

This endpoint requires the “transfer” permission. API key must belong to default
profile.

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

| Field     | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| id        | string | No       |             |
| amount    | string | No       |             |
| currency  | string | No       |             |
| payout_at | string | No       |             |
| fee       | string | No       |             |

#### Example Response

```json
{
  "id": "<string>",
  "amount": "<string>",
  "currency": "<string>",
  "payout_at": "<string>",
  "fee": "<string>"
}
```

---

# Get a single transfer - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/transfers/get-single-transfer](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/transfers/get-single-transfer)

## Endpoint

`GET /transfers/%7Btransfer_id%7D`

## Description

Get information on a single transfer.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter   | Type   | Required | Description |
| ----------- | ------ | -------- | ----------- |
| transfer_id | string | Yes      |             |

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
```

---

# Get all payment methods - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/transfers/get-all-payment-methods](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/transfers/get-all-payment-methods)

## Endpoint

`GET /payment-methods`

## Description

Gets a list of the user’s linked payment methods.

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

| Field              | Type     | Required | Description |
| ------------------ | -------- | -------- | ----------- |
| id                 | string   | Yes      |             |
| type               | string   | Yes      |             |
| name               | string   | Yes      |             |
| currency           | string   | Yes      |             |
| primary_buy        | boolean  | Yes      |             |
| primary_sell       | boolean  | Yes      |             |
| instant_buy        | boolean  | Yes      |             |
| instant_sell       | boolean  | Yes      |             |
| created_at         | string   | Yes      |             |
| updated_at         | string   | Yes      |             |
| resource           | string   | Yes      |             |
| resource_path      | string   | Yes      |             |
| verified           | boolean  | No       |             |
| limits             | object   | No       |             |
| allow_buy          | boolean  | No       |             |
| allow_sell         | boolean  | No       |             |
| allow_deposit      | boolean  | No       |             |
| allow_withdraw     | boolean  | No       |             |
| fiat_account       | object   | No       |             |
| crypto_account     | object   | No       |             |
| recurring_options  | object[] | No       |             |
| available_balance  | object   | No       |             |
| picker_data        | object   | No       |             |
| hold_business_days | integer  | No       |             |
| hold_days          | integer  | No       |             |
| verificationMethod | string   | No       |             |
| cdvStatus          | string   | No       |             |

#### Example Response

```json
[
  {
    "id": "cbdd9f28-34e7-5152-b1dc-d657bf8df858",
    "type": "fiat_account",
    "name": "Cash (USD)",
    "currency": "USD",
    "primary_buy": true,
    "primary_sell": true,
    "instant_buy": true,
    "instant_sell": true,
    "created_at": "2019-06-04T21:24:32.000Z",
    "updated_at": "2019-06-04T21:24:32.000Z",
    "resource": "payment_method",
    "resource_path": "/v2/payment-methods/cbdd9f28-34e7-5152-b1dc-d657bf8df858",
    "limits": {
      "type": "fiat_account",
      "name": "Coinbase Account"
    },
    "allow_buy": true,
    "allow_sell": true,
    "allow_deposit": false,
    "allow_withdraw": false,
    "fiat_account": {
      "id": "2b760113-fbba-5600-ac74-36482c130768",
      "resource": "account",
      "resource_path": "/v2/accounts/2b760113-fbba-5600-ac74-36482c130768"
    },
    "verified": true,
    "picker_data": {
      "symbol": "fiat_account",
      "balance": {
        "amount": "1.00",
        "currency": "USD"
      }
    },
    "hold_business_days": 0,
    "hold_days": 0
  }
]
```

---

# Get all transfers - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/transfers/get-all-transfers](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/transfers/get-all-transfers)

## Endpoint

`GET /transfers`

## Description

Gets a list of in-progress and completed transfers of funds in/out of any of the
user’s accounts.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Query Parameters

| Parameter       | Type         | Description                                                                                                                                             |
| --------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| profile_id      | string       | Returns list of transfers from this portfolio id.                                                                                                       |
| before          | string       | Used for pagination. Sets start cursor to before date.                                                                                                  |
| after           | string       | Used for pagination. Sets end cursor to after date.                                                                                                     |
| limit           | integer      | Limit on number of results to return.                                                                                                                   |
| type            | enum<string> | Specifies deposit and withdrawal transfer types. Internal transfers represent the transfers of a user depositing/withdrawing across their own profiles. |
| currency_type   | string       | Filter results by type of currency. Possible values: [crypto, fiat]                                                                                     |
| transfer_reason | string       | Filter results by reason of transfer. Possible values: [usdc_reward]                                                                                    |
| currency        | string       | Filter results by currency.                                                                                                                             |

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

# Get fee estimate for crypto withdrawal - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/transfers/get-fee-estimate](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/transfers/get-fee-estimate)

## Endpoint

`GET /withdrawals/fee-estimate`

## Description

Gets the fee estimate for the crypto withdrawal to crypto address

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Query Parameters

| Parameter      | Type   | Description |
| -------------- | ------ | ----------- |
| currency       | string |             |
| crypto_address | string |             |
| network        | string |             |

## Response

### 200 Success

#### Response Fields

| Field              | Type   | Required | Description |
| ------------------ | ------ | -------- | ----------- |
| fee                | string | No       |             |
| fee_before_subsidy | string | No       |             |

#### Example Response

```json
{
  "fee": "<string>",
  "fee_before_subsidy": "<string>"
}
```

---

# Submit travel information for a transfer - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/transfers/submit-travel-info](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/transfers/submit-travel-info)

## Endpoint

`POST /transfers/%7Btransfer_id%7D/travel-rules`

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter   | Type   | Required | Description |
| ----------- | ------ | -------- | ----------- |
| transfer_id | string | Yes      |             |

## Response

### 200 Success

A successful response.

#### Response Fields

| Field   | Type   | Required | Description |
| ------- | ------ | -------- | ----------- |
| message | string | No       |             |

#### Example Response

```json
{
  "message": "<string>"
}
```

---

# Withdraw to Coinbase account - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/transfers/withdraw-to-coinbase-account](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/transfers/withdraw-to-coinbase-account)

## Endpoint

`POST /withdrawals/coinbase-account`

## Description

Withdraw funds to a Coinbase account

## Permissions

This endpoint requires the “transfer” permission.

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

| Field    | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| id       | string | No       |             |
| amount   | string | No       |             |
| currency | string | No       |             |

#### Example Response

```json
{
  "id": "<string>",
  "amount": "<string>",
  "currency": "<string>"
}
```

---

# Withdraw to crypto address - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/transfers/withdraw-to-crypto-address](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/transfers/withdraw-to-crypto-address)

## Endpoint

`POST /withdrawals/crypto`

## Description

The Travel Rule requires financial institutions, including custodial
cryptocurrency exchanges, to share basic information about their customers when
sending funds over a certain amount. VASPs that are part of the TRUST consortium
use the TRUST solution when sharing PII to satisfy the Travel Rule data
requirements.

## Permissions

This endpoint requires the “transfer” permission. API key must belong to default
profile.

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

| Field     | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| id        | string | No       |             |
| amount    | string | No       |             |
| currency  | string | No       |             |
| payout_at | string | No       |             |
| fee       | string | No       |             |
| subtotal  | string | No       |             |

#### Example Response

```json
{
  "id": "<string>",
  "amount": "<string>",
  "currency": "<string>",
  "payout_at": "<string>",
  "fee": "<string>",
  "subtotal": "<string>"
}
```

---

# Withdraw to payment method - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/transfers/withdraw-to-payment-method](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/transfers/withdraw-to-payment-method)

## Endpoint

`POST /withdrawals/payment-method`

## Description

Withdraw funds to a payment method

## Permissions

This endpoint requires the “transfer” permission. API key is restricted to the
default profile.

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

| Field     | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| id        | string | No       |             |
| amount    | string | No       |             |
| currency  | string | No       |             |
| payout_at | string | No       |             |
| fee       | string | No       |             |

#### Example Response

```json
{
  "id": "<string>",
  "amount": "<string>",
  "currency": "<string>",
  "payout_at": "<string>",
  "fee": "<string>"
}
```

---

# Create travel rule entry - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/travel-rules/create-travel-rule](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/travel-rules/create-travel-rule)

## Endpoint

`POST /travel-rules`

## Description

Create travel rule entry for sending address

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Response

### 200 Success

Travel rule identifier

#### Response Fields

| Field              | Type   | Required | Description                                                      |
| ------------------ | ------ | -------- | ---------------------------------------------------------------- |
| id                 | string | No       | Travel rule identifier                                           |
| created_at         | string | No       | Timestamp of when entry was added                                |
| address            | string | No       | Crypto address where funds will be deposited from                |
| originator_name    | string | No       | Name of the originator of the funds                              |
| originator_country | string | No       | country code (ISO 3166-1 alpha-2) of the originator of the funds |
| vasp_id            | string | No       | VASP-uuid                                                        |
| vasp_country       | string | No       | ISO 3166-1 alpha-2 formatted country code of the VASP            |
| lei_number         | string | No       | Legal Entity Identifier (LEI) of the VASP                        |
| originator_address | object | No       |                                                                  |

#### Example Response

```json
{
  "id": "<string>",
  "created_at": "2023-11-07T05:31:56Z",
  "address": "<string>",
  "originator_name": "<string>",
  "originator_country": "<string>",
  "vasp_id": "<string>",
  "vasp_country": "<string>",
  "lei_number": "<string>",
  "originator_address": {
    "address_1": "<string>",
    "address_2": "<string>",
    "address_3": "<string>",
    "city": "<string>",
    "state": "<string>",
    "country": "<string>",
    "postal_code": "<string>"
  }
}
```

---

# Delete existing travel rule entry - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/travel-rules/delete-existing-travel-rule](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/travel-rules/delete-existing-travel-rule)

## Endpoint

`DELETE /travel-rules/%7Bid%7D`

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter | Type   | Required | Description            |
| --------- | ------ | -------- | ---------------------- |
| id        | string | Yes      | Travel rule identifier |

## Response

### 200 Success

A successful response.

#### Example Response

```json
{}
```

---

# Get all travel rule information - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/travel-rules/get-all-travel-rule](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/travel-rules/get-all-travel-rule)

## Endpoint

`GET /travel-rules`

## Description

Return a list of all stored travel rule information

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Query Parameters

| Parameter | Type    | Description                                          |
| --------- | ------- | ---------------------------------------------------- |
| before    | string  | Used for pagination. Sets start cursor to before id. |
| after     | string  | Used for pagination. Sets end cursor to after id.    |
| limit     | integer | Limit on number of results to return.                |
| address   | string  | Optional filter by address                           |

## Response

### 200 Success

Travel rule identifier

#### Response Fields

| Field              | Type   | Required | Description                                                      |
| ------------------ | ------ | -------- | ---------------------------------------------------------------- |
| id                 | string | No       | Travel rule identifier                                           |
| created_at         | string | No       | Timestamp of when entry was added                                |
| address            | string | No       | Crypto address where funds will be deposited from                |
| originator_name    | string | No       | Name of the originator of the funds                              |
| originator_country | string | No       | country code (ISO 3166-1 alpha-2) of the originator of the funds |
| vasp_id            | string | No       | VASP-uuid                                                        |
| vasp_country       | string | No       | ISO 3166-1 alpha-2 formatted country code of the VASP            |
| lei_number         | string | No       | Legal Entity Identifier (LEI) of the VASP                        |
| originator_address | object | No       |                                                                  |

#### Example Response

```json
[
  {
    "id": "<string>",
    "created_at": "2023-11-07T05:31:56Z",
    "address": "<string>",
    "originator_name": "<string>",
    "originator_country": "<string>",
    "vasp_id": "<string>",
    "vasp_country": "<string>",
    "lei_number": "<string>",
    "originator_address": {
      "address_1": "<string>",
      "address_2": "<string>",
      "address_3": "<string>",
      "city": "<string>",
      "state": "<string>",
      "country": "<string>",
      "postal_code": "<string>"
    }
  }
]
```

---

# Get user exchange limits - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/users/get-user-exchange-limits](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/users/get-user-exchange-limits)

## Endpoint

`GET /users/%7Buser_id%7D/exchange-limits`

## Description

This request returns information on your payment method transfer limits, as well
as buy/sell limits per currency.

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
| user_id   | string | Yes      |             |

## Response

### 200 Success

#### Response Fields

| Field           | Type   | Required | Description |
| --------------- | ------ | -------- | ----------- |
| transfer_limits | object | Yes      |             |
| limit_currency  | string | Yes      |             |

#### Example Response

```json
{
  "exchange_withdraw": {
    "MANA": {
      "max": "391282.23187385",
      "remaining": "391282.23187385",
      "period_in_days": 7
    },
    "ALGO": {
      "max": "59844.404548",
      "remaining": "59844.404548",
      "period_in_days": 7
    },
    "ATOM": {
      "max": "4624.277457",
      "remaining": "4624.277457",
      "period_in_days": 7
    },
    "KNC": {
      "max": "21584.28663933",
      "remaining": "21584.28663933",
      "period_in_days": 7
    }
  }
}
```

---

# Get user trading volume - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/users/get-user-trading-volume](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/users/get-user-trading-volume)

## Endpoint

`GET /users/%7Buser_id%7D/trading-volumes`

## Description

Gets aggregated and individual trading volumes for users.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter | Type   | Required | Description                             |
| --------- | ------ | -------- | --------------------------------------- |
| user_id   | string | Yes      | The ID of the user who owns the account |

## Response

### 200 Success

A successful response.

#### Response Fields

| Field           | Type     | Required | Description |
| --------------- | -------- | -------- | ----------- |
| aggregated_data | object   | No       |             |
| individual_data | object[] | No       |             |

#### Example Response

```json
{
  "aggregated_data": {
    "activity_metrics": {
      "start_date": "<string>",
      "end_date": "<string>",
      "maker_volume_notional_usd": "<string>",
      "maker_volume_relative_percentage": "<string>",
      "taker_volume_notional_usd": "<string>",
      "taker_volume_relative_percentage": "<string>",
      "total_exchange_volume_notional_usd": "<string>",
      "total_exchange_volume_relative_percentage": "<string>",
      "maker_rank": "<string>",
      "taker_rank": "<string>",
      "total_exchange_volume_rank": "<string>",
      "adjusted_maker_volume_notional_usd": "<string>",
      "adjusted_maker_volume_relative_percentage": "<string>",
      "adjusted_total_exchange_volume_notional_usd": "<string>",
      "adjusted_total_exchange_volume_relative_percentage": "<string>",
      "adjusted_maker_volume_rank": "<string>",
      "adjusted_total_exchange_volume_rank": "<string>",
      "liquidity_program_tier": "<string>",
      "next_liquidity_program_tier": "<string>"
    }
  },
  "individual_data": [
    {
      "email": "<string>",
      "activity_metrics": {
        "start_date": "<string>",
        "end_date": "<string>",
        "maker_volume_notional_usd": "<string>",
        "maker_volume_relative_percentage": "<string>",
        "taker_volume_notional_usd": "<string>",
        "taker_volume_relative_percentage": "<string>",
        "total_exchange_volume_notional_usd": "<string>",
        "total_exchange_volume_relative_percentage": "<string>",
        "maker_rank": "<string>",
        "taker_rank": "<string>",
        "total_exchange_volume_rank": "<string>",
        "adjusted_maker_volume_notional_usd": "<string>",
        "adjusted_maker_volume_relative_percentage": "<string>",
        "adjusted_total_exchange_volume_notional_usd": "<string>",
        "adjusted_total_exchange_volume_relative_percentage": "<string>",
        "adjusted_maker_volume_rank": "<string>",
        "adjusted_total_exchange_volume_rank": "<string>"
      }
    }
  ]
}
```

---

# Update settlement preference - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/users/update-settlement-preference](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/users/update-settlement-preference)

## Endpoint

`POST /users/%7Buser_id%7D/settlement-preferences`

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter | Type   | Required | Description                             |
| --------- | ------ | -------- | --------------------------------------- |
| user_id   | string | Yes      | The ID of the user who owns the account |

## Response

### 200 Success

#### Response Fields

| Field                 | Type   | Required | Description |
| --------------------- | ------ | -------- | ----------- |
| settlement_preference | string | No       |             |

#### Example Response

```json
{
  "settlement_preference": "<string>"
}
```

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
