# Change Position Mode(TRADE)

### API Description

Change user's position mode (Hedge Mode or One-way Mode ) on **_EVERY symbol_**

### HTTP Request

POST `/dapi/v1/positionSide/dual`

### Request Weight

**1**

### Request Parameters

| Name             | Type   | Mandatory | Description                               |
| ---------------- | ------ | --------- | ----------------------------------------- |
| dualSidePosition | STRING | YES       | "true": Hedge Mode; "false": One-way Mode |
| recvWindow       | LONG   | NO        |                                           |
| timestamp        | LONG   | YES       |                                           |

### Response Example

```json
{
  "code": 200,
  "msg": "success"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/coin-margined-futures/trade/rest-api/Change-Position-Mode](https://developers.binance.com/docs/derivatives/coin-margined-futures/trade/rest-api/Change-Position-Mode)
