# Coinbase Exchange API Documentation

## Table of Contents

- [Add addresses - Coinbase](#add-addresses-coinbase)
- [Delete address - Coinbase](#delete-address-coinbase)
- [Get address book - Coinbase](#get-address-book-coinbase)

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
