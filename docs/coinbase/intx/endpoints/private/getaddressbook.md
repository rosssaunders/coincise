# GET /api/v1/address-book

## Get address book

Returns all eligible recipients for withdrawal.

**Operation ID:** getAddressBook

**Tags:** Address Book

**Endpoint:** `GET /api/v1/address-book`

**Base URL:** https://api.international.coinbase.com

## Parameters

| Name           | In    | Type   | Required | Description              |
| -------------- | ----- | ------ | -------- | ------------------------ |
| recipient_type | query | string | No       | Filter by recipient type |

## Authentication

This endpoint requires authentication. Include the following headers:

- `CB-ACCESS-KEY`: Your API key
- `CB-ACCESS-SIGN`: Request signature
- `CB-ACCESS-TIMESTAMP`: Request timestamp
- `CB-ACCESS-PASSPHRASE`: API key passphrase

## Responses

### 200

Saved addresses list

### 400

Invalid attribute

### 401

Authentication error

## Documentation

For more details, see the
[INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
