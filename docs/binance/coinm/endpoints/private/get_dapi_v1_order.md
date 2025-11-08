# Query Order (USER_DATA)

### API Description

Check an order's status.

- These orders will not be found:
  - order status is CANCELED or EXPIRED AND order has NO filled trade AND
    created time + 3 days < current time
  - order create time + 90 days < current time

### HTTP Request

GET `/dapi/v1/order`

### Request Weight

**1**

### Request Parameters

| Name              | Type   | Mandatory | Description |
| ----------------- | ------ | --------- | ----------- |
| symbol            | STRING | YES       |             |
| orderId           | LONG   | NO        |             |
| origClientOrderId | STRING | NO        |             |
| recvWindow        | LONG   | NO        |             |
| timestamp         | LONG   | YES       |             |

> - Either `orderId` or `origClientOrderId` must be sent.

### Response Example

```json
{
  "avgPrice": "0.0",
  "clientOrderId": "abc",
  "cumBase": "0",
  "executedQty": "0",
  "orderId": 1917641,
  "origQty": "0.40",
  "origType": "TRAILING_STOP_MARKET",
  "price": "0",
  "reduceOnly": false,
  "side": "BUY",
  "positionSide": "SHORT",
  "status": "NEW",
  "stopPrice": "9300", // please ignore when order type is TRAILING_STOP_MARKET
  "closePosition": false, // if Close-All
  "symbol": "BTCUSD_200925",
  "pair": "BTCUSD",
  "time": 1579276756075, // order time
  "timeInForce": "GTC",
  "type": "TRAILING_STOP_MARKET",
  "activatePrice": "9020", // activation price, only return with TRAILING_STOP_MARKET order
  "priceRate": "0.3", // callback rate, only return with TRAILING_STOP_MARKET order
  "updateTime": 1579276756075, // update time
  "workingType": "CONTRACT_PRICE",
  "priceProtect": false, // if conditional order trigger is protected
  "priceMatch": "NONE", //price match mode
  "selfTradePreventionMode": "NONE" //self trading preventation mode
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/coin-margined-futures/trade/rest-api/Query-Order](https://developers.binance.com/docs/derivatives/coin-margined-futures/trade/rest-api/Query-Order)
