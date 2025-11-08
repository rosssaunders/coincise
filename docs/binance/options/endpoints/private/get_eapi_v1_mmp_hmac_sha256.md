# Get Market Maker Protection Config (TRADE)

### API Description

Get config for MMP.

### HTTP Request

GET `/eapi/v1/mmp (HMAC SHA256)`

### Request Weight

**1**

### Request Parameters

| Name       | Type   | Mandatory | Description             |
| ---------- | ------ | --------- | ----------------------- |
| underlying | STRING | TRUE      | underlying, e.g BTCUSDT |
| recvWindow | LONG   | NO        |                         |
| timestamp  | LONG   | YES       |                         |

### Response Example

```json
{
  "underlyingId": 2,
  "underlying": "BTCUSDT",
  "windowTimeInMilliseconds": 3000,
  "frozenTimeInMilliseconds": 300000,
  "qtyLimit": "2",
  "deltaLimit": "2.3",
  "lastTriggerTime": 0
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-maker-endpoints/Get-Market-Maker-Protection-Config](https://developers.binance.com/docs/derivatives/option/market-maker-endpoints/Get-Market-Maker-Protection-Config)
