# Coinbase Exchange API Documentation

## Table of Contents

- [Generate crypto address - Coinbase](#generate-crypto-address-coinbase)
- [Get all Coinbase wallets - Coinbase](#get-all-coinbase-wallets-coinbase)

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
