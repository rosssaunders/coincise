# User Exercise Record (USER_DATA)

### API Description

Get account exercise records.

### HTTP Request

GET `/eapi/v1/exerciseRecord`

### Request Weight

**5**

### Request Parameters

| Name       | Type   | Mandatory | Description                                |
| ---------- | ------ | --------- | ------------------------------------------ |
| symbol     | STRING | NO        | Option trading pair, e.g BTC-200730-9000-C |
| startTime  | LONG   | NO        | startTime                                  |
| endTime    | LONG   | NO        | endTime                                    |
| limit      | INT    | NO        | default 1000, max 1000                     |
| recvWindow | LONG   | NO        |                                            |
| timestamp  | LONG   | YES       |                                            |

### Response Example

```json
[
  {
    "id": "1125899906842624042",
    "currency": "USDT",
    "symbol": "BTC-220721-25000-C",
    "exercisePrice": "25000.00000000",
    "markPrice": "25000.00000000",
    "quantity": "1.00000000",
    "amount": "0.00000000",
    "fee": "0.00000000",
    "createDate": 1658361600000,
    "priceScale": 2,
    "quantityScale": 2,
    "optionSide": "CALL",
    "positionSide": "LONG",
    "quoteAsset": "USDT"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade/User-Exercise-Record](https://developers.binance.com/docs/derivatives/option/trade/User-Exercise-Record)
