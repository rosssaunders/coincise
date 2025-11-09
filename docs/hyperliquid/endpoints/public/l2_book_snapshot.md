# POST /info

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

## Description

Returns at most 20 levels per side

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
| type | String | Yes | "l2Book" |
| coin | String | Yes | coin |
| nSigFigs | Number | No | Optional field to aggregate levels to `nSigFigs` significant figures. Valid values are 2, 3, 4, 5, and `null`, which means full precision |
| mantissa | Number | No | Optional field to aggregate levels. This field is only allowed if nSigFigs is 5. Accepts values of 1, 2 or 5. |

## Request Example

```bash
curl -X POST "https://api.hyperliquid.xyz/info" \
  -H "Content-Type: application/json" \
  -d '{"type": "...", ...}'
```

## Response Example

```json
{
  "coin": "BTC",
  "time": 1754450974231,
  "levels": [
    [
      {
        "px": "113377.0",
        "sz": "7.6699",
        "n": 17 // number of levels
      },
      {
        "px": "113376.0",
        "sz": "4.13714",
        "n": 8
      },
    ],
    [
      {
        "px": "113397.0",
        "sz": "0.11543",
        "n": 3
      }
    ]
  ]
}
```
