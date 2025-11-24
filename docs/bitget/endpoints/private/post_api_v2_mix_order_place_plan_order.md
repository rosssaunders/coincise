# Place Trigger Order

Rate limit: 10 req/sec/UID

### Description[​](#description "Direct link to Description")

The interface for placing an trigger or trailing stop order with TP/SL setting
feature.

- **API Broker rebate identifier**:  
  The following code block needs to be added to the HTTP Header of the request.

  > "X-CHANNEL-API-CODE":"your-channel-api-code"

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/mix/order/place-plan-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/order/place-plan-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{ "planType":"normal_plan", "symbol": "BTCUSDT", "productType": "USDT-FUTURES", "marginMode": "isolated", "marginCoin": "USDT", "size": "0.01", "price": "24000", "callbackRatio": "", "triggerPrice": "24100", "triggerType": "mark_price", "side": "buy", "tradeSide": "open", "orderType":"limit", "clientOid": "121212121212", "reduceOnly": "NO", "presetStopSurplusPrice": "", "stopSurplusTriggerPrice": "", "stopSurplusTriggerType": "", "presetStopLossPrice": "", "stopLossTriggerPrice": "", "stopLossTriggerType": "" }'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description        |
| :-------- | :----- | :------- | :----------------- |
| planType  | String | Yes      | Trigger order type |

`normal_plan`: Trigger order  
`track_plan`: Trailing stop order | | symbol | String | Yes | Trading pair, e.g.
ETHUSDT | | productType | String | Yes | Product type  
`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures | | marginMode | String | Yes | Position mode  
`isolated`: isolated margin  
`crossed`: cross margin | | marginCoin | String | Yes | Margin coin | | size |
String | Yes | Amount(base coin) | | price | String | No | Price  
1\. For `track_plan`, it must be empty.  
2\. For `normal_plan`, it is required when orderType is `limit`;It must be empty
when orderType is `market`. | | callbackRatio | String | No | Callback rate
(applies to trailing stop orders only)  
1\. Required for trailing stop orders and the rate cannot be greater than 10. |
| triggerPrice | String | Yes | Trigger price | | triggerType | String | Yes |
Trigger type  
1\. Required when placing a trigger order or a trailing stop order.  
mark_price: Mark price  
fill_price: Lastest price | | side | String | Yes | Order direction  
`buy`; `sell` | | tradeSide | String | No | Direction  
`open`: Open; `close`: Close  
1\. Only required in hedge position mode  
Notes:  
For open long, "side" fill in "buy"; tradeSide should be "open"  
For open short, "side" fill in "sell"; tradeSide should be "open"  
For close long, "side" fill in "buy"; "tradeSide" should be "close"  
For close short, "side" fill in "sell"; "tradeSide" should be "close" | |
orderType | String | Yes | Order type  
`limit`: limit order  
`market`: market order  
1\. For `track_plan`, it is required and must be `market` | | clientOid | String
| No | Customize order ID | | reduceOnly | String | No | Whether or not to just
reduce the position.  
`yes`: Yes; `no`: No(default)  
1\. Only applicable in buy/sell (one-way position) mode | |
stopSurplusTriggerPrice | String | No | Take-profit trigger price/Take-profit
ratio  
1\. For `normal_plan`, it represents the take-profit trigger price  
2\. For `track_plan`, it represents the take-profit percentage, with a maximum
of 999.99 and a minimum of 0.01  
3\. If left empty or set to 0, no take-profit will be set by default | |
stopSurplusExecutePrice | String | No | Take-profit execute price  
1\. For `track_plan`, it must be empty.  
2\. For a `normal_plan` that has stopSurplusTriggerPrice parameter set, if it is
empty or set to 0, it represents a market order execution; if not empty and
greater than 0, it represents a limit order execution | | stopSurplusTriggerType
| String | No | Take-profit trigger type  
`fill_price`: Lastest price  
`mark_price`: Mark price  
1\. For orders that have stopSurplusTriggerPrice parameter set, it is required  
2\. For `track_plan`, it only accepts `fill_price` | | stopLossTriggerPrice |
String | No | Stop-loss trigger price/Stop-loss ratio  
1\. For `normal_plan`, it represents the stop-loss trigger price  
2\. For `track_plan`, it represents the stop-loss percentage, with a maximum of
999.99 and a minimum of 0.01  
3\. If left empty or set to 0, no stop-loss will be set by default | |
stopLossExecutePrice | String | No | Stop-loss execute price  
1\. For `track_plan`, it must be empty.  
2\. For a `normal_plan` that has stopLossTriggerPrice parameter set, if it is
empty or set to 0, it represents a market order execution; if not empty and
greater than 0, it represents a limit order execution | | stopLossTriggerType |
String | No | Stop-loss trigger type  
`fill_price`: Lastest price  
`mark_price`: Mark price  
1\. For orders that have stopLossTriggerPrice parameter set, it is required  
2\. For `track_plan`, it only accepts `fill_price` | | stpMode | String | No |
STP Mode  
`none` not setting STP(default)  
`cancel_taker` cancel taker order  
`cancel_maker` cancel maker order  
`cancel_both` cancel both of taker and maker orders |

Response Example

```json
{
  "code": "00000",
  "data": {
    "orderId": "121212121212",
    "clientOid": "BITGET#121212121212"
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

> **Source:** https://www.bitget.com/api-doc/contract/plan/Place-Plan-Order
