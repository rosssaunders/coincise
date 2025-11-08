# Cancel all Option orders on specific symbol (TRADE)

### API Description

Cancel all active order on a symbol.

### HTTP Request

DELETE `/eapi/v1/allOpenOrders`

### Request Weight

**5**

### Request Parameters

| Name       | Type   | Mandatory | Description                                |
| ---------- | ------ | --------- | ------------------------------------------ |
| symbol     | STRING | YES       | Option trading pair, e.g BTC-200730-9000-C |
| recvWindow | LONG   | NO        |                                            |
| timestamp  | LONG   | YES       |                                            |

### Response Example

```json
{
  "code": 0,
  "msg": "success"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade/Cancel-all-Option-orders-on-specific-symbol](https://developers.binance.com/docs/derivatives/option/trade/Cancel-all-Option-orders-on-specific-symbol)
