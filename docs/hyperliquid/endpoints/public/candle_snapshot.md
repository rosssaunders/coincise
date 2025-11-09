# POST /info

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

## Description

Only the most recent 5000 candles are available

Supported intervals: "1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "8h", "12h", "1d", "3d", "1w", "1M"

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
| type | String | Yes | "candleSnapshot" |
| req | Object | Yes | {"coin": <coin>, "interval": "15m", "startTime": <epoch millis>, "endTime": <epoch millis>} |

## Request Example

```bash
curl -X POST "https://api.hyperliquid.xyz/info" \
  -H "Content-Type: application/json" \
  -d '{"type": "...", ...}'
```

## Response Example

```json
[
  {
    "T": 1681924499999,
    "c": "29258.0",
    "h": "29309.0",
    "i": "15m",
    "l": "29250.0",
    "n": 189,
    "o": "29295.0",
    "s": "BTC",
    "t": 1681923600000,
    "v": "0.98639"
  }
]
```
