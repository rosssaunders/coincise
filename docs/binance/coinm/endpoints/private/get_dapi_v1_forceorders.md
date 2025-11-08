# User's Force Orders(USER_DATA)

### API Description

User's Force Orders

### HTTP Request

GET `/dapi/v1/forceOrders`

### Request Weight

**20** with symbol, **50** without symbol

### Request Parameters

```xyz2
Name      |  Type  | Mandatory |                         Description
```

\------------- | ------ | --------- |
----------------------------------------------------------- symbol | STRING | NO
| autoCloseType | ENUM | NO | "LIQUIDATION" for liquidation orders, "ADL" for
ADL orders. startTime | LONG | NO | endTime | LONG | NO | limit | INT | NO |
Default 50; max 100. recvWindow | LONG | NO | timestamp | LONG | YES |

> - If "autoCloseType" is not sent, orders with both of the types will be
>   returned
> - If "startTime" is not sent, data within 200 days before "endTime" can be
>   queried

### Response Example

```json
[
  {
    "orderId": 165123080,
    "symbol": "BTCUSD_200925",
    "pair": "BTCUSD",
    "status": "FILLED",
    "clientOrderId": "autoclose-1596542005017000006",
    "price": "11326.9",
    "avgPrice": "11326.9",
    "origQty": "1",
    "executedQty": "1",
    "cumBase": "0.00882854",
    "timeInForce": "IOC",
    "type": "LIMIT",
    "reduceOnly": false,
    "closePosition": false,
    "side": "SELL",
    "positionSide": "BOTH",
    "stopPrice": "0",
    "workingType": "CONTRACT_PRICE",
    "priceProtect": false,
    "origType": "LIMIT",
    "time": 1596542005019,
    "updateTime": 1596542005050
  },
  {
    "orderId": 207251986,
    "symbol": "BTCUSD_200925",
    "pair": "BTCUSD",
    "status": "FILLED",
    "clientOrderId": "autoclose-1597307316020000006",
    "price": "11619.4",
    "avgPrice": "11661.2",
    "origQty": "1",
    "executedQty": "1",
    "cumBase": "0.00857544",
    "timeInForce": "IOC",
    "type": "LIMIT",
    "reduceOnly": false,
    "closePosition": false,
    "side": "SELL",
    "positionSide": "LONG",
    "stopPrice": "0",
    "workingType": "CONTRACT_PRICE",
    "priceProtect": false,
    "origType": "LIMIT",
    "time": 1597307316022,
    "updateTime": 1597307316035
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/coin-margined-futures/trade/rest-api/Users-Force-Orders](https://developers.binance.com/docs/derivatives/coin-margined-futures/trade/rest-api/Users-Force-Orders)
