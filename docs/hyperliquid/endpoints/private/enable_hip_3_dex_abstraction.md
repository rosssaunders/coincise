# POST /exchange

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

## Description

If set, actions on HIP-3 perps will automatically transfer collateral from validator-operated USDC perps balance for HIP-3 DEXs where USDC is the collateral token, and spot otherwise. When HIP-3 DEX abstraction is active, collateral is returned to the same source (validator-operated USDC perps or spot balance) when released from positions or open orders.

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
