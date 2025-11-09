# POST /exchange

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

## Description

Approve a maximum fee rate for a builder.

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
| action | Object | Yes | { "type": "approveBuilderFee", |
| "maxFeeRate": the maximum allowed builder fee rate as a percent string; e.g. "0.001%", | "builder": address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000, | No | "nonce": current timestamp in milliseconds as a Number, must match nonce in outer request body |
| } | nonce\* | No | number |
| Recommended to use the current timestamp in milliseconds | signature\* | No | Object |

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
