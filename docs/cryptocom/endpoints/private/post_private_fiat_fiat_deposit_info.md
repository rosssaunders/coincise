# POST private/fiat/fiat-deposit-info

**Source:**
[private/fiat/fiat-deposit-info](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-fiat-fiat-deposit-info)

## Authentication

Required (Private Endpoint)

## private/fiat/fiat-deposit-info

> Request Sample

```
{
  "id": "123456",
  "method": "private/fiat/fiat-deposit-info",
  "params": {
    "payment_networks": "usd_cubix"
  },
  "nonce": 1640995200000
}
```

> Response Sample

```
--usd_cubix
{
    "id": "123456",
    "code": 0,
    "result": {
        "deposit_info_list": [
            {
                "payment_network": "usd_cubix",
                "currency": "USD",
                "bank_details": {
                    "account_holder_name": null,
                    "bank_name": null,
                    "bank_address": null,
                    "bank_country": null,
                    "routing_number": null,
                    "account_number": null,
                    "recipient_name": null,
                    "recipient_address": null,
                    "bic_code": null,
                    "iban_code": null,
                    "reference_code": null,
                    "sort_code": null,
                    "cubix_partner_name": "Crypto.com",
                    "cubix_account_name": "Foris Dax Inc",
                    "cubix_account_id": "48e8431d-2026-41d4-a872-b1ed00db8626",
                    "cubix_account_number": "5859",
                    "account_type": null,
                    "meta": null
                }
            }
        ]
    }
}

--usd_swift
{
      "id": 0,
      "code": 0,
      "result": {
          "deposit_info_list": [
              {
                  "payment_network": "usd_swift",
                  "currency": "USD",
                  "bank_details": {
                      "account_holder_name": null,
                      "bank_name": "Customers Bank",
                      "bank_address": "701 Reading Avenue, West Reading, Pennsylvania 19611",
                      "bank_country": null,
                      "routing_number": "031302971",
                      "account_number": "5415859",
                      "recipient_name": "FORIS DAX LIMITED",
                      "recipient_address": "P.O. BOX 31910, 20 GENESIS CLOSE GRAND CAYMAN",
                      "bic_code": "CUESUS33",
                      "iban_code": null,
                      "reference_code": "676938157158298",
                      "sort_code": null,
                      "cubix_partner_name": null,
                      "cubix_account_name": null,
                      "cubix_account_id": null,
                      "cubix_account_number": null,
                      "meta": null
                  }
              }
          ]
      }
  }
```

Retrieves fiat deposit information for the authenticated user. Returns bank
details for depositing fiat currency with optional payment network filtering.

### Request Params

| Field  | Type   | Required | Description                      |
| ------ | ------ | -------- | -------------------------------- |
| id     | string | Y        | Unique request identifier        |
| method | string | Y        | "private/fiat/fiat-deposit-info" |
| params | object | N        | Request parameters               |
| nonce  | number | Y        | Unix timestamp in milliseconds   |

\***\*params\*\*** consists of:

| Field            | Type   | Required | Description                                           |
| ---------------- | ------ | -------- | ----------------------------------------------------- |
| payment_networks | string | N        | Comma-separated list of payment networks to filter by |

### Response Params

| Field  | Type   | Required | Description                                                |
| ------ | ------ | -------- | ---------------------------------------------------------- |
| id     | string | N        | Echo back the request identifier from the original request |
| method | string | Y        | Method invoked                                             |
| code   | number | Y        | 0 for success; otherwise, see error details                |
| msg    | string | N        | Response message                                           |
| data   | object | Y        | See below                                                  |

\***\*data\*\*** consists of:

| Field             | Type                    | Required | Description                 |
| ----------------- | ----------------------- | -------- | --------------------------- |
| deposit_info_list | deposit_info_list array | Y        | List of deposit information |

\***\*deposit_info_list\*\*** consists of:

| Field           | Type         | Required | Description                |
| --------------- | ------------ | -------- | -------------------------- |
| payment_network | string       | Y        | Payment network identifier |
| currency        | string       | Y        | Currency code              |
| bank_details    | bank_details | Y        | Bank details object        |

\***\*bank_details\*\*** consists of:

| Field                | Type   | Required | Description                           |
| -------------------- | ------ | -------- | ------------------------------------- |
| account_holder_name  | string | N        | Account holder name                   |
| bank_name            | string | N        | Bank name                             |
| bank_address         | string | N        | Bank address                          |
| bank_country         | string | N        | Bank country                          |
| routing_number       | string | N        | Bank routing number                   |
| account_number       | string | N        | Bank account number                   |
| recipient_name       | string | N        | Recipient name                        |
| recipient_address    | string | N        | Recipient address                     |
| bic_code             | string | N        | Bank Identifier Code (SWIFT code)     |
| iban_code            | string | N        | International Bank Account Number     |
| reference_code       | string | N        | Reference code for the deposit        |
| sort_code            | string | N        | UK bank sort code                     |
| cubix_partner_name   | string | N        | Cubix partner name                    |
| cubix_account_name   | string | N        | Cubix account name                    |
| cubix_account_id     | string | N        | Cubix account ID                      |
| cubix_account_number | string | N        | Last 4 digits of Cubix account number |
| meta                 | object | N        | Additional metadata                   |

### Applies To

REST

### REST Method

POST
