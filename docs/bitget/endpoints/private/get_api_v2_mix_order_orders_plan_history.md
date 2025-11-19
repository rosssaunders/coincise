# Get History Trigger Order

Speed limit is 10 times/s (UID)

### Description[​](#description "Direct link to Description")

Can be used to query one or all previous common orders and trigger orders.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/mix/order/orders-plan-history

Request Example

```
curl "https://api.bitget.com/api/v2/mix/order/orders-plan-history?planType=normal_plan&symbol=ETHUSDT&productType=usdt-futures" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| orderId | String | No | Order ID  
Either orderId or clientOid is required. If both are entered, orderId prevails. |
| clientOid | String | No | Customize order ID  
Either orderId or clientOid is required. If both are entered, orderId prevails. |
| planType | String | Yes | Order type  
`normal_plan`: trigger order  
`track_plan`: trailing stop order  
`profit_loss`: take profit and stop loss orders(including the profit\_plan, loss\_plan, moving\_plan, pos\_profit and pos\_loss) |
| planStatus | String | No | Trigger order status  
If not specified, all states will be queried  
executed: the order triggered  
fail\_execute: Failed to trigger  
cancelled: Cancelled |
| symbol | String | No | Trading pair, e.g. ETHUSDT |
| productType | String | Yes | Product type  
`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures |
| idLessThan | String | No | Requests the content on the page before this ID (older data), the value input should be the endId of the corresponding interface. |
| startTime | String | No | Start timestamp  
Unix timestamp in milliseconds format, e.g. 1597026383085  
(The maximum time span supported is three months. The default end time is three months if no value is set for the end time. )  
(For Managed Sub-Account, the StartTime cannot be earlier than the binding time) |
| endTime | String | No | End timestamp  
Unix timestamp in milliseconds format, e.g. 1597026383085  
(The maximum time span supported is three months. The default start time is three months ago if no value is set for the start time. ) |
| limit | String | No | Number of queries: Default: 100, maximum: 100 |

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
        "executeOrderId": "123456",
        "clientOid": "",
        "planStatus": "executed",
        "price": "1990",
        "executePrice": "1990",
        "priceAvg": "1999.2",
        "baseVolume": "1",
        "callbackRatio": "",
        "triggerPrice": "1989",
        "triggerType": "fill_price",
        "side": "buy",
        "posSide": "long",
        "marginCoin": "usdt",
        "marginMode": "crossed",
        "enterPointSource": "api",
        "tradeSide": "open",
        "posMode": "hedge_mode",
        "orderType": "limit",
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

| Parameter | Type | Description |
| :-- | :-- | :-- |
| entrustedList | List<String\> | Order list |
| \>planType | String | Trigger order type  
normal\_plan: average trigger order  
track\_plan: trailing stop order |
| \>symbol | String | Trading pair |
| \>size | String | Amount |
| \>orderId | String | Trigger order ID |
| \>executeOrderId | String | the order ID after plan triggered |
| \>clientOid | String | Customized trigger order ID |
| \>planStatus | String | Order status  
`executed`: the order triggered  
`fail_execute`: Failed to trigger  
`cancelled`: Cancelled |
| \>price | String | Order price  
For a common trigger order, it represents the order price.  
For a trailing stop order, this field doesn't exist. |
| \>executePrice | String | Execute Price |
| \>baseVolume | String | Amount of coins traded  
It is only available when the order status is triggered. |
| callbackRatio | String | Implementation of the callback rate. (Maximum 1-10)  
Only exists for trailing stop orders. |
| \>triggerPrice | String | Trigger price  
It appears for both common trigger orders and trailing stop orders. |
| \>triggerType | String | Trigger type  
It appears for both common trigger orders and trailing stop orders.  
fill\_price: filled price  
mark\_price: mark price |
| \>side | String | Direction  
Buy; Sell |
| \>posSide | String | Position direction  
`long`: hedge mode long position  
`short`: hedge mode short position  
`net`: one-way position |
| \>marginCoin | String | Margin coin |
| \>marginMode | String | Margin mode  
`isolated`: isolated margin  
`crossed`: cross margin |
| \>enterPointSource | String | Order source  
WEB: Orders created on the website  
API: Orders created on API  
SYS: System managed orders, usually generated by forced liquidation logic  
ANDROID: Orders created on the Android app  
IOS: Orders created on the iOS app |
| \>tradeSide | String | Direction  
open (open and close mode)  
close: Close (open and close mode) |
| \>posMode | String | Position mode  
one\_way\_mode: one-way mode  
hedge\_mode: hedge mode |
| \>orderType | String | Order type  
limit: limit order  
market |
| \>cTime | String | Creation time |
| \>uTime | String | Last updated time |
| \>stopSurplusExecutePrice | String | Setting take-profit strike price |
| \>stopSurplusTriggerPrice | String | Setting take-profit trigger price |
| \>stopSurplusTriggerType | String | Setting take-profit trigger type  
fill\_price: filled price  
mark\_price: mark price |
| \>stopLossExecutePrice | String | Setting stop-loss strike price |
| \>stopLossTriggerPrice | String | Setting stop-loss trigger price |
| \>stopLossTriggerType | String | Setting stop-loss trigger type  
fill\_price: filled price  
mark\_price: mark price |
| endId | String | The last Trigger order ID.  
This is used when idLessThan/idGreaterThan is set as a range. |

> **Source:** https://www.bitget.com/api-doc/contract/plan/orders-plan-history
