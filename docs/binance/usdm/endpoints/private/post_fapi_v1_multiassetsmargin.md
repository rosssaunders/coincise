# Change Multi-Assets Mode (TRADE)

### API Description

Change user's Multi-Assets mode (Multi-Assets Mode or Single-Asset Mode) on
**_Every symbol_**

### HTTP Request

POST `/fapi/v1/multiAssetsMargin`

### Request Weight

**1**

### Request Parameters

| Name              | Type   | Mandatory | Description                                           |
| ----------------- | ------ | --------- | ----------------------------------------------------- |
| multiAssetsMargin | STRING | YES       | "true": Multi-Assets Mode; "false": Single-Asset Mode |
| recvWindow        | LONG   | NO        |                                                       |
| timestamp         | LONG   | YES       |                                                       |

### Response Example

```json
{
  "code": 200,
  "msg": "success"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Change-Multi-Assets-Mode](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Change-Multi-Assets-Mode)
