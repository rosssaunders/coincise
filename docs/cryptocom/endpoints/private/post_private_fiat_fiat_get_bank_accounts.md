# POST private/fiat/fiat-get-bank-accounts

**Source:** [private/fiat/fiat-get-bank-accounts](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-fiat-fiat-get-bank-accounts)

## Authentication

Required (Private Endpoint)

## private/fiat/fiat-get-bank-accounts

> Request Sample

```
{
  "id": "123456",
  "method": "private/fiat/fiat-get-bank-accounts",
  "params": {
    "payment_networks": "usd_cubix"
  },
  "nonce": 1640995200000
}
```

> Response Sample

```
{
  "id": "123456",
  "method": "private/fiat/fiat-get-bank-accounts",
  "code": 0,
  "msg": "success",
  "result": {
    "bank_accounts_list": [
      {
        "ok": null,
        "code": null,
        "message": null,
        "id": "4c662477-a16d-4c99-a27b-a492b592ed62",
        "account_id": "adb80cff-f420-469c-b439-4d90272bf1a1",
        "user_uuid": "f0857b97-0d47-5897-8b1f-e358725cf49c",
        "status": "completed",
        "bank_name": "Customers Bank",
        "bank_city": "",
        "bank_country": "US",
        "bank_identifier_type": "cubix_account_number_last_4_digits",
        "bank_identifier_value": "****2565",
        "bank_account_holder_name": null,
        "account_identifier_type": "cubix_account_id",
        "account_identifier_value": "****cc63",
        "account_holder_name": "Smoke Test Co",
        "account_type": null,
        "currency": "USD",
        "verified_by": "Cubix",
        "reason": "zora.xu@crypto.com",
        "supported_payment_networks": [
          "usd_cubix"
        ],
        "withdrawal_payment_networks": null,
        "payment_network_identifier_value": "dbbb3eda-960f-4406-ae3c-b250010e7bef",
        "bank_details": {
          "institutional_street_address": null,
          "bank_street_address": null,
          "account_holder_address": null,
          "bank_account_address": null,
          "intermediate_bank": null,
          "intermediate_bank_options": null
        },
        "created_at": "1751126400000",
        "updated_at": "1751126400000"
      }
    ]
  }
}

```

Retrieves user's bank accounts with optional payment network filtering.

### Request Params

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | Y | Unique request identifier |
| method | string | Y | "private/fiat/fiat-get-bank-accounts" |
| params | object | N | Request parameters |
| nonce | number | Y | Unix timestamp in milliseconds |

  
****params**** consists of:  

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| payment\_networks | string | N | Comma-separated list of payment networks to filter by |

### Response Params

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | N | Echo back the request identifier from the original request |
| method | string | Y | Method invoked |
| code | number | Y | 0 for success; otherwise, see error details |
| msg | string | N | Response message |
| result | object | Y | See below |

  
****result**** consists of:  

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| bank\_accounts\_list | bank accounts array | Y | List of user's bank accounts |

  
****bank\_accounts\_list**** consists of:  

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| ok | string | N | Status indicator (null in most cases) |
| code | string | N | Response code (null in most cases) |
| message | string | N | Response message (null in most cases) |
| id | string | Y | Unique bank account ID (use this for withdrawals) |
| account\_id | string | Y | Account ID (cannot be used for withdrawal) |
| user\_uuid | string | Y | User UUID |
| status | string | Y | Account status (completed, pending, rejected, etc.) |
| bank\_name | string | Y | Bank name |
| bank\_city | string | N | Bank city |
| bank\_country | string | Y | Bank country code |
| bank\_identifier\_type | string | Y | Type of bank identifier (e.g., cubix\_account\_number\_last\_4\_digits, bic\_swift) |
| bank\_identifier\_value | string | Y | Masked bank identifier value |
| bank\_account\_holder\_name | string | N | Bank account holder name |
| account\_identifier\_type | string | Y | Type of account identifier (e.g., cubix\_account\_id, iban) |
| account\_identifier\_value | string | Y | Masked account identifier value |
| account\_holder\_name | string | Y | Account holder name |
| account\_type | string | N | Account type (null in most cases) |
| currency | string | Y | Currency code (e.g., USD) |
| verified\_by | string | Y | Verification method (e.g., Cubix, Deposit) |
| reason | string | N | Reason or additional information |
| supported\_payment\_networks | array | Y | Array of supported payment network identifiers |
| withdrawal\_payment\_networks | array | N | Array of withdrawal payment networks (null if not applicable) |
| payment\_network\_identifier\_value | string | N | Payment network identifier value |
| bank\_details | object | Y | Bank details object (see below) |
| created\_at | string | Y | Account creation timestamp |
| updated\_at | string | Y | Account last update timestamp |

  
****bank\_details**** consists of:  

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| institutional\_street\_address | string | N | Institutional street address |
| bank\_street\_address | string | N | Bank street address |
| account\_holder\_address | string | N | Account holder address |
| bank\_account\_address | object | N | Bank account address object |
| intermediate\_bank | object | N | Intermediate bank information |
| intermediate\_bank\_options | array | N | Array of intermediate bank options |

### Applies To

REST

### REST Method

POST