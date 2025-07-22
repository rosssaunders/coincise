# Coinbase Exchange API Documentation

## Table of Contents

- [Get auto loan setting - Coinbase](#get-auto-loan-setting-coinbase)
- [Get USDC conversion - Coinbase](#get-usdc-conversion-coinbase)
- [Set auto loan - Coinbase](#set-auto-loan-coinbase)
- [Set USDC conversion - Coinbase](#set-usdc-conversion-coinbase)

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
