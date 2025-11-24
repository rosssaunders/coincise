# Stop-profit and stop-loss plan orders

Speed limit is 10 times/s (UID)

### Description[​](#description "Direct link to Description")

Place a stop-profit and stop-loss plan order

- **API Broker rebate identifier**:  
  The following code block needs to be added to the HTTP Header of the request.

  > "X-CHANNEL-API-CODE":"your-channel-api-code"

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/mix/order/place-tpsl-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/order/place-tpsl-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{"marginCoin": "USDT","productType": "usdt-futures","symbol": "ethusdt","planType": "profit_plan","triggerPrice": "2000","triggerType": "mark_price","executePrice": "0","holdSide": "long","size": "1","rangeRate": "","clientOid": "1234"}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter   | Type   | Required | Description                   |
| :---------- | :----- | :------- | :---------------------------- |
| marginCoin  | String | Yes      | Margin currency (Capitalized) |
| productType | String | Yes      | Product type                  |

`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures | | symbol | String | Yes | Trading pair, e.g.
ETHUSDT | | planType | String | Yes | Take profit and stop loss type  
profit_plan: take profit plan;  
loss_plan: stop loss plan;  
moving_plan: trailing stop;  
pos_profit: position take profit;  
pos_loss: position stop loss | | triggerPrice | String | Yes | Trigger price | |
triggerType | String | No | Trigger type  
fill_price: market price;  
mark_price: mark price | | executePrice | String | No | Execution price  
If it is 0 or not filled in, it means market price execution.If it is greater
than 0, it means limit price execution.  
Do not fill in this parameters when `planType` is moving_plan, it only executs
in market price. | | holdSide | String | Yes | Two-way position:(long: long
position, short: short position)  
one-way position: (buy: long position, sell: short position) | | size | String |
Yes | Order quantity(base coin)  
It's required when `planType` is profit_plan, loss_plan or moving_plan,and
should be greater than 0;  
It's NOT required when `planType` is pos_profit or pos_loss | | rangeRate |
String | No | Callback range  
It's required only in `planType` is moving_plan | | clientOid | String | No |
Customize order ID | | stpMode | String | No | STP Mode, default `none`  
`none` not setting STP  
`cancel_taker` cancel taker order  
`cancel_maker` cancel maker order  
`cancel_both` cancel both of taker and maker orders |

Response Example

```json
{
  "code": "00000",
  "data": {
    "orderId": "121212121212",
    "clientOid": "BITGET#1627293504612"
  },
  "msg": "success",
  "requestTime": 1627293504612
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description                 |
| :-------- | :----- | :-------------------------- |
| orderId   | String | Trigger order ID            |
| clientOid | String | Customized trigger order ID |

> **Source:** https://www.bitget.com/api-doc/contract/plan/Place-Tpsl-Order
