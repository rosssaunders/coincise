# Cancel All Option Orders By Underlying (TRADE)

### API Description

Cancel all active orders on specified underlying.

### HTTP Request

DELETE `/eapi/v1/allOpenOrdersByUnderlying`

### Request Weight

**1**

### Request Parameters

| Name       | Type   | Mandatory | Description                    |
| ---------- | ------ | --------- | ------------------------------ |
| underlying | STRING | YES       | Option underlying, e.g BTCUSDT |
| recvWindow | LONG   | NO        |                                |
| timestamp  | LONG   | YES       |                                |

### Response Example

```json
{
  "code": 0,
  "msg": "success",
  "data": 0
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade/Cancel-All-Option-Orders-By-Underlying](https://developers.binance.com/docs/derivatives/option/trade/Cancel-All-Option-Orders-By-Underlying)
