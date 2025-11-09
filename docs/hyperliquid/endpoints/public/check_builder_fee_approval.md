# POST /info

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

## Description

Check builder fee approval endpoint

## Authentication

Not Required (Public Endpoint)

## Rate Limit

**Weight:** 1

See [Rate Limits](/docs/hyperliquid/rate_limits.md) for complete rate limiting rules.

## HTTP Request

`POST /info`

## Request Parameters

### Body Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| type | String | Yes | "maxBuilderFee" |
| user | String | Yes | Address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000. |
| builder | String | Yes | Address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000. |

## Request Example

```bash
curl -X POST "https://api.hyperliquid.xyz/info" \
  -H "Content-Type: application/json" \
  -d '{"type": "...", ...}'
```

## Response Example

```
1 // maximum fee approved in tenths of a basis point i.e. 1 means 0.001%
```
