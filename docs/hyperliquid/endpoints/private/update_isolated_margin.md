# POST /exchange

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

## Description

Add or remove margin from isolated position

Note that to target a specific leverage instead of a USDC value of margin change, there is an alternate action `{"type": "topUpIsolatedOnlyMargin", "asset": <asset>, "leverage": <float string>}`

## Authentication

Required (Private Endpoint)

This endpoint requires authentication using EIP-712 signing with your private key or API wallet.

## Rate Limit

**Weight:** 1

See [Rate Limits](/docs/hyperliquid/rate_limits.md) for complete rate limiting rules.

## HTTP Request

`POST /exchange`

## Request Example

```bash
curl -X POST "https://api.hyperliquid.xyz/exchange" \
  -H "Content-Type: application/json" \
  -d '{"action": {...}, "nonce": 1234567890, "signature": {...}}'
```

## Response Example

```json
{
  "status": "ok"
}
```
