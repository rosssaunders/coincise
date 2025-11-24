# Get Pending Trigger Order

Rate limit: 10 req/sec/UID

### Description[​](#description "Direct link to Description")

Can be used to query one or all current trigger orders.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/mix/order/orders-plan-pending

Request Example

```
curl -X GET "https://api.bitget.com/api/v2/mix/order/orders-plan-pending?orderId=123&clientOid=1234&planType=profit_loss&productType=USDT-FUTURES" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter                                                                       | Type   | Required | Description                 |
| :------------------------------------------------------------------------------ | :----- | :------- | :-------------------------- |
| orderId                                                                         | String | No       | Trigger order ID            |
| Either orderId or clientOid is required. If both are entered, orderId prevails. |
| clientOid                                                                       | String | No       | Customized trigger order ID |
| Either orderId or clientOid is required. If both are entered, orderId prevails. |
| symbol                                                                          | String | No       | Trading pair, e.g. ETHUSDT  |
| planType                                                                        | String | Yes      | Trigger order type          |

normal_plan: average trigger order  
track_plan: trailing stop order  
profit_loss: take profit and stop loss orders(including the profit_plan,
loss_plan, moving_plan, pos_profit and pos_loss) | | symbol | String | No |
Trading pair, e.g. ETHUSDT | | productType | String | Yes | Product type  
`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures | | idLessThan | String | No | Requests the
content on the page before this ID (older data), the value input should be the
endId of the corresponding interface. | | startTime | String | No | Start
timestamp  
Unix timestamp in milliseconds format, e.g. 1597026383085  
(The maximum time span supported is three months. The default end time is three
months if no value is set for the end time. ) | | endTime | String | No | End
timestamp  
Unix timestamp in milliseconds format, e.g. 1597026383085  
(The maximum time span supported is three months. The default start time is
three months ago if no value is set for the start time. ) | | limit | String |
No | Number of queries: Default: 100, maximum: 100 |

Response Example

```json
{
  "code": "00000",
  "data": {
    "entrustedList": [
      {
        "planType": "normal_plan",
        "symbol": "ethusdt",
        "size": "1",
        "orderId": "123",
        "clientOid": "121212",
        "price": "1900",
        "executePrice": "1900",
        "callbackRatio": "",
        "triggerPrice": "1901",
        "triggerType": "mark_price",
        "planStatus": "not_trigger",
        "side": "buy",
        "posSide": "long",
        "marginCoin": "usdt",
        "marginMode": "crossed",
        "enterPointSource": "api",
        "tradeSide": "open",
        "posMode": "hedge_mode",
        "orderType": "limit",
        "orderSource": "normal",
        "cTime": "1627293504612",
        "uTime": "",
        "stopSurplusExecutePrice": "2001",
        "stopSurplusTriggerPrice": "2002",
        "stopSurplusTriggerType": "fill_price",
        "stopLossExecutePrice": "1800",
        "stopLossTriggerPrice": "1820",
        "stopLossTriggerType": "fill_price"
      }
    ],
    "endId": "123"
  },
  "msg": "success",
  "requestTime": 1627293504612
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type          | Description        |
| :------------ | :------------ | :----------------- |
| entrustedList | List<String\> | Order list         |
| \>planType    | String        | Trigger order type |

normal_plan: average trigger order  
track_plan: trailing stop order | | \>symbol | String | Trading pair | | \>size
| String | Amount | | \>orderId | String | Trigger order ID | | \>clientOid |
String | Customized trigger order ID | | \>price | String | Order execute
price  
For a common trigger order, it represents the order execute price.  
For a trailing stop order, the value doesn't exist. | | \>executePrice | String
| Execute Price | | \>callbackRatio | String | Implementation of the callback
rate. (Range 1-10)  
Only exists when the order is a trailing stop order. | | \>triggerPrice | String
| Trigger price  
It appears for both common trigger orders and trailing stop orders. | |
\>triggerType | String | Trigger type  
It appears for both common trigger orders and trailing stop orders.  
fill_price: filled price  
mark_price: mark price  
index_price: index price | | \>planStatus | String | Order status  
For a current trigger order, the status will only be `live` | | \>side | String
| Direction  
Buy; Sell | | \>posSide | String | Position direction  
long: hedge mode long position  
short: hedge mode short position  
net: one-way position | | \>marginCoin | String | Margin coin | | \>marginMode |
String | Margin mode  
`isolated`: isolated margin mode  
`crossed`: crossed margin | | \>enterPointSource | String | Order source  
WEB: Orders created on the website  
API: Orders created on API  
SYS: System managed orders, usually generated by forced liquidation logic  
ANDROID: Orders created on the Android app  
IOS: Orders created on the iOS app | | \>tradeSide | String | Direction  
open: Open (hedge-mode)  
close: Close (hedge-mode) | | \>posMode | String | Position mode  
one_way_mode: one-way mode  
hedge_mode: hedge mode | | \>orderType | String | Order type  
`limit`: limit order  
`market`: market order | | \>orderSource | String | Order sources  
normal: Normal order  
market: Market order  
profit_market: Market TP order  
loss_market: Market SL order  
Trader_delegate: Elite trade order  
trader_profit: Trader takes profit  
trader_loss: Trader stops loss  
trader_reverse: Reversed elite trades  
profit_limit: Take-profit limit order  
loss_limit: Stop-loss limit order  
delivery_close_short: close short positions  
pos_profit_limit: Position take-profit limit order  
pos_profit_market: Position take-profit market order  
pos_loss_limit: Position stop-loss limit order  
pos_loss_market: Position stop-loss market order | | \>cTime | String | Creation
time | | \>uTime | String | Last updated time | | \>stopSurplusExecutePrice |
String | Setting take profit execution price | | \>stopSurplusTriggerPrice |
String | Setting take-profit trigger price | | \>stopSurplusTriggerType | String
| Setting take-profit trigger type  
fill_price: filled price  
mark_price: mark price  
index_price: index price | | \>stopLossExecutePrice | String | Setting stop loss
execution price | | \>stopLossTriggerPrice | String | Setting stop-loss trigger
price | | \>stopLossTriggerType | String | Setting stop-loss trigger type  
fill_price: filled price  
mark_price: mark price  
index_price: index price | | endId | String | This is used when
idLessThan/idGreaterThan is set as a range. |

> **Source:**
> https://www.bitget.com/api-doc/contract/plan/get-orders-plan-pending
