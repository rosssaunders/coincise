# POST private/fiat/fiat-create-withdraw

**Source:** [private/fiat/fiat-create-withdraw](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-fiat-fiat-create-withdraw)

## Authentication

Required (Private Endpoint)

## private/fiat/fiat-create-withdraw

> Request Sample

```
--usd_swift
{
  "id": "123456",
  "method": "private/fiat/fiat-create-withdraw",
  "params": {
    "account_id": "550e8400-e29b-41d4-a716-446655440000",
    "amount": "1000.00",
    "currency": "USD",
    "payment_network": "usd_swift",
    "intermediate_bank": {
      "bank_identifier_type": "SWIFT",
      "bank_identifier_value": "CHASUS33",
      "bank_name": "JPMorgan Chase Bank",
      "address_1": "270 Park Avenue",
      "address_2": "New York, NY 10017"
    }
  },
  "nonce": 1640995200000
}
--other networks
{
    "id": 1750825432408138000,
    "method": "private/fiat/fiat-create-withdraw",
    "params": {
        "account_id": "47dcb68c-2cf5-456a-8b03-963f5f78e795",
        "amount": 700.1,
        "currency": "USD",
        "payment_network": "usd_fedwire"
    },
    "nonce": 1750825432408
}
```

> Response Sample

```
--usd (cubix)
{
  "id": "123456",
  "method": "private/fiat/fiat-create-withdraw",
  "code": 0,
  "msg": "success",
  "result": {
    "id": "withdraw_789012345",
    "account_id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "pending",
    "payment_network": "usd_cubix",
    "currency": "USD",
    "amount": 1000.00,
    "amount_in_usd": 1000.00,
    "fee_currency": "USD",
    "fee_amount": 25.00,
    "beneficiary_id": "beneficiary_123456",
    "authorization_id": "auth_789012345"
  }
}

-- usd (swift)
{
    "id": 0,
    "code": 0,
    "result": {
        "id": "27f3b781-e8e4-4ae9-871e-0edd7f9deba9",
        "account_id": "8a283a55-d081-4801-8d67-139d8690a82e",
        "status": "debit_processing",
        "payment_network": "usd_swift",
        "currency": "USD",
        "amount": 500.0,
        "amount_in_usd": 500.0,
        "fee_currency": "USD",
        "fee_amount": 45.0,
        "beneficiary_id": null,
        "authorization_id": null
    }
}

-- eur (openpayd)
{
    "id": 0,
    "code": 0,
    "result": {
        "id": "e21358d3-232a-4a7f-9a0d-d15bcf5ca0c9",
        "account_id": "8a283a55-d081-4801-8d67-139d8690a82e",
        "status": "debit_processing",
        "payment_network": "openpayd_exchange_sepa",
        "currency": "EUR",
        "amount": 100.0,
        "amount_in_usd": 100.0,
        "fee_currency": "EUR",
        "fee_amount": 0.0,
        "beneficiary_id": "5ef54d31-99c4-4b33-8071-3c51e43395c6",
        "authorization_id": null
    }
}

-- aed
{
    "id": 0,
    "code": 0,
    "result": {
        "id": "3f28eea1-81c0-4a1b-b807-342ff14ed373",
        "account_id": "9c4264e2-1842-479e-8b65-5734671efd6e",
        "status": "debit_processing",
        "payment_network": "aed_ipi",
        "currency": "AED",
        "amount": 105.0,
        "amount_in_usd": 105.0,
        "fee_currency": "AED",
        "fee_amount": 10.0,
        "beneficiary_id": null,
        "authorization_id": null,
        "bank_identifier_value": "LICOAEADXXX",
        "account_identifier_value": "123456789"
    }
}
--
```

Creates a new fiat withdrawal request for the authenticated user.

### Request Params

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | Y | Unique request identifier |
| method | string | Y | "private/fiat/fiat-create-withdraw" |
| params | object | Y | Request parameters |
| nonce | number | Y | Unix timestamp in milliseconds |

  
****params**** consists of:  

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| account\_id | string | Y | Account ID for the withdrawal (UUID format), please refer to the `private/fiat/fiat-get-bank-accounts` API for available accounts and use the id field in the response |
| amount | string | Y | Withdrawal amount as string |
| currency | string | Y | Currency code (3-letter format) |
| payment\_network | string | Y | Payment network identifier |
| intermediate\_bank | object | N | Only required for usd\_swift. Intermediary bank information will update the bank intermediate bank info if provided. Please check with your bank for the correct information. |
| beneficiary\_id | string | N | Beneficiary ID (optional) |
| authorization\_id | string | N | Authorization ID (optional) |
| bank\_identifier\_value | string | N | Only available to aed\_ipi. Bank identifier value for the AED network. |
| account\_identifier\_value | string | N | Only available to aed\_ipi. Account identifier value for the AED network. |

  
****intermediate\_bank**** consists of:  

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| bank\_identifier\_type | string | N | Type of bank identifier (e.g., SWIFT, ROUTING) |
| bank\_identifier\_value | string | N | Bank identifier value |
| bank\_name | string | N | Name of the intermediary bank |
| address\_1 | string | N | Bank address line 1 |
| address\_2 | string | N | Bank address line 2 |

### Response Params

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | N | Echo back the request identifier from the original request |
| method | string | Y | Method invoked |
| code | number | Y | 0 for success; otherwise, see error details |
| msg | string | N | Response message |
| data | object | Y | See below |

  
****data**** consists of:  

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | Y | System-generated withdrawal ID |
| account\_id | string | Y | Account ID for the withdrawal |
| status | string | Y | Withdrawal status (e.g., "pending") |
| payment\_network | string | Y | Payment network identifier |
| currency | string | Y | Currency code |
| amount | number | Y | Withdrawal amount as number |
| amount\_in\_usd | number | Y | Withdrawal amount converted to USD |
| fee\_currency | string | Y | Currency of the withdrawal fee |
| fee\_amount | number | Y | Withdrawal fee amount |
| beneficiary\_id | string | Y | Beneficiary identifier |
| authorization\_id | string | Y | Authorization identifier for the withdrawal |

### Applies To

REST

### REST Method

POST