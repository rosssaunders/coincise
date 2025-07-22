# Coinbase Exchange API Documentation

## Table of Contents

- [Get fees - Coinbase](#get-fees-coinbase)

---

# Get fees - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/fees/get-fee](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/fees/get-fee)

## Endpoint

`GET /fees`

## Description

Get fees rates and 30 days trailing volume.

## Permissions

This endpoint requires the “view” permission.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Response

### 200 Success

Fees defines taker and maker fees for a given user including the volume in USD.

#### Response Fields

| Field          | Type   | Required | Description                         |
| -------------- | ------ | -------- | ----------------------------------- |
| taker_fee_rate | string | Yes      | Taker fee rate.                     |
| maker_fee_rate | string | Yes      | Maker fee rate.                     |
| usd_volume     | string | No       | The 30 days trailing volume in USD. |

#### Example Response

```json
{
  "maker_fee_rate": "0.0050",
  "taker_fee_rate": "0.0050",
  "usd_volume": "43806.92"
}
```

---
