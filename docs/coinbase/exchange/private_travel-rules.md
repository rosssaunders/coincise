# Coinbase Exchange API Documentation

## Table of Contents

- [Create travel rule entry - Coinbase](#create-travel-rule-entry-coinbase)
- [Delete existing travel rule entry - Coinbase](#delete-existing-travel-rule-entry-coinbase)
- [Get all travel rule information - Coinbase](#get-all-travel-rule-information-coinbase)

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
