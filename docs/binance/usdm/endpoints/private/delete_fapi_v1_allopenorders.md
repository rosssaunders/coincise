# Cancel All Open Orders (TRADE)

### API Description

Cancel All Open Orders

### HTTP Request

DELETE `/fapi/v1/allOpenOrders`

### Request Weight

**1**

### Request Parameters

| Name       | Type   | Mandatory | Description |
| ---------- | ------ | --------- | ----------- |
| symbol     | STRING | YES       |             |
| recvWindow | LONG   | NO        |             |
| timestamp  | LONG   | YES       |             |

### Response Example

```json
{
  "code": 200,
  "msg": "The operation of cancel all open order is done."
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Cancel-All-Open-Orders](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Cancel-All-Open-Orders)
