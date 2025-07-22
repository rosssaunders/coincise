# Coinbase Exchange API Documentation

## Table of Contents

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
