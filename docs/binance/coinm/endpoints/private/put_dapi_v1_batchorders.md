# Modify Multiple Orders(TRADE)

### API Description

Modify Multiple Orders

### HTTP Request

PUT `/dapi/v1/batchOrders`

### Request Weight

**5**

### Request Parameters

| Name        | Type       | Mandatory | Description              |
| ----------- | ---------- | --------- | ------------------------ |
| batchOrders | list<JSON> | YES       | order list. Max 5 orders |
| recvWindow  | LONG       | NO        |                          |
| timestamp   | LONG       | YES       |                          |

**Where `batchOrders` is the list of order parameters in JSON**

| Name              | Type    | Mandatory | Description                                              |
| ----------------- | ------- | --------- | -------------------------------------------------------- |
| orderId           | LONG    | NO        |                                                          |
| origClientOrderId | STRING  | NO        |                                                          |
| symbol            | STRING  | YES       |                                                          |
| side              | ENUM    | YES       | `SELL`, `BUY`                                            |
| quantity          | DECIMAL | NO        | Order quantity, cannot be sent with `closePosition=true` |
| price             | DECIMAL | NO        |                                                          |
| recvWindow        | LONG    | NO        |                                                          |
| timestamp         | LONG    | YES       |                                                          |

> - Parameter rules are same with `Modify Order`
> - Batch modify orders are processed concurrently, and the order of matching is
>   not guaranteed.
> - The order of returned contents for batch modify orders is the same as the
>   order of the order list.
> - One order can only be modfied for less than 10000 times

### Response Example

```json
[
  {
    "orderId": 20072994037,
    "symbol": "BTCUSD_PERP",
    "pair": "BTCUSD",
    "status": "NEW",
    "clientOrderId": "LJ9R4QZDihCaS8UAOOLpgW",
    "price": "30005",
    "avgPrice": "0.0",
    "origQty": "1",
    "executedQty": "0",
    "cumQty": "0",
    "cumBase": "0",
    "timeInForce": "GTC",
    "type": "LIMIT",
    "reduceOnly": false,
    "closePosition": false,
    "side": "BUY",
    "positionSide": "LONG",
    "stopPrice": "0",
    "workingType": "CONTRACT_PRICE",
    "priceProtect": false,
    "origType": "LIMIT",
    "priceMatch": "NONE", //price match mode
    "selfTradePreventionMode": "NONE", //self trading preventation mode
    "updateTime": 1629182711600
  },
  {
    "code": -2022,
    "msg": "ReduceOnly Order is rejected."
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/coin-margined-futures/trade/rest-api/Modify-Multiple-Orders](https://developers.binance.com/docs/derivatives/coin-margined-futures/trade/rest-api/Modify-Multiple-Orders)
