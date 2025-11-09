# POST /info

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

## Description

Query aligned quote token status endpoint

## Authentication

Not Required (Public Endpoint)

## Rate Limit

**Weight:** 1

See [Rate Limits](/docs/hyperliquid/rate_limits.md) for complete rate limiting rules.

## HTTP Request

`POST /info`

## Request Example

```bash
curl -X POST "https://api.hyperliquid.xyz/info" \
  -H "Content-Type: application/json" \
  -d '{"type": "...", ...}'
```

## Response Example

```json
{
  "status": "ok"
}
```
