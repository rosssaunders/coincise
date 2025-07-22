# Coinbase Exchange API Documentation

## Table of Contents

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
