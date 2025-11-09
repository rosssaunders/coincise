# POST /exchange

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

## Description

Approves an API Wallet (also sometimes referred to as an Agent Wallet). See [here](https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/nonces-and-api-wallets#api-wallets) for more details.

## Authentication

Required (Private Endpoint)

This endpoint requires authentication using EIP-712 signing with your private key or API wallet.

## Rate Limit

**Weight:** 1

See [Rate Limits](/docs/hyperliquid/rate_limits.md) for complete rate limiting rules.

## HTTP Request

`POST /exchange`

## Request Parameters

### Body Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| action | Object | Yes | { "type": "approveAgent", |
| "nonce": current timestamp in milliseconds as a Number, must match nonce in outer request body | } | No | nonce\* |
| number | Recommended to use the current timestamp in milliseconds | No | signature\* |

## Request Example

```bash
curl -X POST "https://api.hyperliquid.xyz/exchange" \
  -H "Content-Type: application/json" \
  -d '{"action": {...}, "nonce": 1234567890, "signature": {...}}'
```

## Response Example

**Response**

200

Copy

```json
{'status': 'ok', 'response': {'type': 'default'}}
```
