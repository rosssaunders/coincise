# Coinbase Exchange API Documentation

## Table of Contents

- [Get user exchange limits - Coinbase](#get-user-exchange-limits-coinbase)
- [Get user trading volume - Coinbase](#get-user-trading-volume-coinbase)
- [Update settlement preference - Coinbase](#update-settlement-preference-coinbase)

---

# Get user exchange limits - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/users/get-user-exchange-limits](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/users/get-user-exchange-limits)

## Endpoint

`GET /users/%7Buser_id%7D/exchange-limits`

## Description

This request returns information on your payment method transfer limits, as well
as buy/sell limits per currency.

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
| user_id   | string | Yes      |             |

## Response

### 200 Success

#### Response Fields

| Field           | Type   | Required | Description |
| --------------- | ------ | -------- | ----------- |
| transfer_limits | object | Yes      |             |
| limit_currency  | string | Yes      |             |

#### Example Response

```json
{
  "exchange_withdraw": {
    "MANA": {
      "max": "391282.23187385",
      "remaining": "391282.23187385",
      "period_in_days": 7
    },
    "ALGO": {
      "max": "59844.404548",
      "remaining": "59844.404548",
      "period_in_days": 7
    },
    "ATOM": {
      "max": "4624.277457",
      "remaining": "4624.277457",
      "period_in_days": 7
    },
    "KNC": {
      "max": "21584.28663933",
      "remaining": "21584.28663933",
      "period_in_days": 7
    }
  }
}
```

---

# Get user trading volume - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/users/get-user-trading-volume](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/users/get-user-trading-volume)

## Endpoint

`GET /users/%7Buser_id%7D/trading-volumes`

## Description

Gets aggregated and individual trading volumes for users.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter | Type   | Required | Description                             |
| --------- | ------ | -------- | --------------------------------------- |
| user_id   | string | Yes      | The ID of the user who owns the account |

## Response

### 200 Success

A successful response.

#### Response Fields

| Field           | Type     | Required | Description |
| --------------- | -------- | -------- | ----------- |
| aggregated_data | object   | No       |             |
| individual_data | object[] | No       |             |

#### Example Response

```json
{
  "aggregated_data": {
    "activity_metrics": {
      "start_date": "<string>",
      "end_date": "<string>",
      "maker_volume_notional_usd": "<string>",
      "maker_volume_relative_percentage": "<string>",
      "taker_volume_notional_usd": "<string>",
      "taker_volume_relative_percentage": "<string>",
      "total_exchange_volume_notional_usd": "<string>",
      "total_exchange_volume_relative_percentage": "<string>",
      "maker_rank": "<string>",
      "taker_rank": "<string>",
      "total_exchange_volume_rank": "<string>",
      "adjusted_maker_volume_notional_usd": "<string>",
      "adjusted_maker_volume_relative_percentage": "<string>",
      "adjusted_total_exchange_volume_notional_usd": "<string>",
      "adjusted_total_exchange_volume_relative_percentage": "<string>",
      "adjusted_maker_volume_rank": "<string>",
      "adjusted_total_exchange_volume_rank": "<string>",
      "liquidity_program_tier": "<string>",
      "next_liquidity_program_tier": "<string>"
    }
  },
  "individual_data": [
    {
      "email": "<string>",
      "activity_metrics": {
        "start_date": "<string>",
        "end_date": "<string>",
        "maker_volume_notional_usd": "<string>",
        "maker_volume_relative_percentage": "<string>",
        "taker_volume_notional_usd": "<string>",
        "taker_volume_relative_percentage": "<string>",
        "total_exchange_volume_notional_usd": "<string>",
        "total_exchange_volume_relative_percentage": "<string>",
        "maker_rank": "<string>",
        "taker_rank": "<string>",
        "total_exchange_volume_rank": "<string>",
        "adjusted_maker_volume_notional_usd": "<string>",
        "adjusted_maker_volume_relative_percentage": "<string>",
        "adjusted_total_exchange_volume_notional_usd": "<string>",
        "adjusted_total_exchange_volume_relative_percentage": "<string>",
        "adjusted_maker_volume_rank": "<string>",
        "adjusted_total_exchange_volume_rank": "<string>"
      }
    }
  ]
}
```

---

# Update settlement preference - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/users/update-settlement-preference](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/users/update-settlement-preference)

## Endpoint

`POST /users/%7Buser_id%7D/settlement-preferences`

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter | Type   | Required | Description                             |
| --------- | ------ | -------- | --------------------------------------- |
| user_id   | string | Yes      | The ID of the user who owns the account |

## Response

### 200 Success

#### Response Fields

| Field                 | Type   | Required | Description |
| --------------------- | ------ | -------- | ----------- |
| settlement_preference | string | No       |             |

#### Example Response

```json
{
  "settlement_preference": "<string>"
}
```

---
