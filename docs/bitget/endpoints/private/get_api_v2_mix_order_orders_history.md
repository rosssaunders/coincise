# Get History Order

Rate limit: 10 req/sec/UID

### Description[​](#description "Direct link to Description")

Get history order(It only supports to get the data within 90days. The older data can be downloaded from web)

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/mix/order/orders-history

Request Example

```
curl "https://api.bitget.com/api/v2/mix/order/orders-history?productType=usdt-futures" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*" \  -H "ACCESS-PASSPHRASE:*" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:zh-CN" \  -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| orderId | String | No | Order ID  
If both orderId and clientOid are entered, orderId prevails. |
| clientOid | String | No | Customize order ID  
If both orderId and clientOid are entered, orderId prevails. |
| symbol | String | No | Trading pair, e.g. ETHUSDT |
| productType | String | Yes | Product type  
`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures |
| idLessThan | String | No | Requests the content on the page before this ID (older data), the value input should be the endId of the previous request response |
| orderSource | String | No | Order sources  
normal: Normal order  
market: market order  
profit\_market: Market TP order  
loss\_market: Market SL order  
Trader\_delegate: Elite trade order  
trader\_profit: Trader takes profit  
trader\_loss: Trader stops loss  
reverse: Reversed orders  
trader\_reverse: Reversed elite trades  
profit\_limit: Take-profit limit order  
loss\_limit: Stop-loss limit order  
liquidation: Liquidation order  
delivery\_close\_long: close long positions  
delivery\_close\_short: close short positions  
pos\_profit\_limit: Position take-profit limit order  
pos\_profit\_market: Position take-profit market order  
pos\_loss\_limit: Position stop-loss limit order  
pos\_loss\_market: Position stop-loss market order |
| startTime | String | No | Start timestamp  
Unix timestamp in milliseconds format, e.g. 1597026383085  
(For Managed Sub-Account, the StartTime cannot be earlier than the binding time) |
| endTime | String | No | End timestamp  
Unix timestamp in milliseconds format, e.g. 1597026383085  
 |
| limit | String | No | Number of queries: Maximum: 100, default: 100 |

Response Example

```
{    "code": "00000",    "data": {        "entrustedList": [            {                "symbol": "ethusdt",                "size": "100",                "orderId": "123",                "clientOid": "12321",                "baseVolume": "12.1",                "fee": "-0.00854",                "price": "1900",                "priceAvg": "1903",                "status": "filled",                "side": "buy",                "force": "gtc",                "totalProfits": "0",                "posSide": "long",                "marginCoin": "usdt",                "quoteVolume": "22001.21",                "leverage": "20",                "marginMode": "crossed",                "enterPointSource": "api",                "tradeSide": "open",                "posMode": "hedge_mode",                "posAvg": "",                "orderType": "limit",                "orderSource": "normal",                "cTime": "1627293504612",                "uTime": "1627293505612",                "presetStopSurplusPrice": "2001",                "presetStopLossPrice": "1800"            }        ],        "endId": "123"    },    "msg": "success",    "requestTime": 1627293504612}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| endId | String | Last query ended order ID |
| entrustedList | List<Object\> | Order list |
| \>symbol | String | Trading pair |
| \>size | String | Amount |
| \>orderId | String | Order ID |
| \>clientOid | String | Custom id |
| \>baseVolume | String | Amount of coins traded |
| \>fee | String | Transaction fee |
| \>price | String | Order price |
| \>priceAvg | String | Average order price |
| \>status | String | Order status  
`filled`: All filled  
`canceled`: the order is cancelled |
| \>side | String | Direction  
`buy`: buy, `sell`: sell |
| \>force | String | Order expiration date  
(Confirm that if maker is supported)  
`ioc`: Immediate or cancel  
`fok`: Fill or kill  
`gtc`: Good till canceled  
`post_only`: Post only |
| \>totalProfits | String | Total PnL |
| \>posSide | String | Position direction  
`long`: two-way long position  
`short`: two-way short position  
`net`: one-way position |
| \>marginCoin | String | Margin coin |
| \>quoteVolume | String | Trading amount in quoting coin |
| \>leverage | String | Leverage |
| \>marginMode | String | Margin mode  
`isolated`: isolated margin  
`crossed`: cross margin |
| \>reduceOnly | String | Reduce only  
`YES`: Yes,`NO`: No |
| \>enterPointSource | String | Order source  
WEB: Orders created on the website  
API: Orders created on API  
SYS: System managed orders, usually generated by forced liquidation logic  
ANDROID: Orders created on the Android app  
IOS: Orders created on the iOS app |
| \>tradeSide | String | Direction  
`close`: Close (open and close mode)  
`open`: Open (open and close mode)  
`reduce_close_long`: Liquidate partial long positions for hedge position mode  
`reduce_close_short`：Liquidate partial short positions for hedge position mode  
`burst_close_long`：Liquidate long positions for hedge position mode  
`burst_close_short`：Liquidate short positions for hedge position mode  
`offset_close_long`：Liquidate partial long positions for netting for hedge position mode  
`offset_close_short`：Liquidate partial short positions for netting for hedge position mode  
`delivery_close_long`：Delivery long positions for hedge position mode  
`delivery_close_short`：Delivery short positions for hedge position mode  
`dte_sys_adl_close_long`：ADL close long position for hedge position mode  
`dte_sys_adl_close_short`：ADL close short position for hedge position mode  
`buy_single`：Buy, one way postion mode  
`sell_single`：Sell, one way postion mode  
`reduce_buy_single`：Liquidate partial positions, buy, one way position mode  
`reduce_sell_single`：Liquidate partial positions, sell, one way position mode  
`burst_buy_single`：Liquidate short positions, buy, one way postion mode  
`burst_sell_single`：Liquidate partial positions, sell, one way position mode  
`delivery_sell_single`：Delivery sell, one way position mode  
`delivery_buy_single`：Delivery buy, one way position mode  
`dte_sys_adl_buy_in_single_side_mode`：ADL close position, buy, one way position mode  
`dte_sys_adl_sell_in_single_side_mode`：ADL close position, sell, one way position mode |
| \>posMode | String | Position mode  
`one_way_mode`: one-way position  
`hedge_mode`: two-way position |
| \>orderType | String | Order type  
limit: limit order  
market: market order |
| \>orderSource | String | Order sources  
normal: Normal order  
market: market order  
profit\_market: Market TP order  
loss\_market: Market SL order  
Trader\_delegate: Elite trade order  
trader\_profit: Trader takes profit  
trader\_loss: Trader stops loss  
reverse: Reversed orders  
trader\_reverse: Reversed elite trades  
profit\_limit: Take-profit limit order  
loss\_limit: Stop-loss limit order  
liquidation: Liquidation order  
delivery\_close\_long: close long positions  
delivery\_close\_short: close short positions  
pos\_profit\_limit: Position take-profit limit order  
pos\_profit\_market: Position take-profit market order  
pos\_loss\_limit: Position stop-loss limit order  
pos\_loss\_market: Position stop-loss market order  
profit\_chase: Take Profit Chase Order  
loss\_chase: Stop Loss Chase Order  
follower\_delegate: Follower Delegate Order  
reduce\_offset: Reduce Position Offset Order  
market\_risk: Best Price Risk Handling  
plan\_limit: Limit Plan Order  
plan\_market: Best Price Plan Order  
pos\_loss\_limit: Position Stop Loss Limit  
strategy\_positive: Strategy-Positive Grid  
strategy\_reverse: Strategy-Reverse Grid  
strategy\_unlimited: Unlimited Strategy  
move\_limit: Limit Moving Take Profit and Stop Loss  
move\_market: Best Price Moving Take Profit and Stop Loss  
tracking\_limit: Limit Trailing Order  
tracking\_market: Best Price Trailing Order  
strategy\_dca\_positive: DCA Strategy-Positive  
strategy\_dca\_reverse: DCA Strategy-Reverse  
strategy\_oco\_limit: Strategy-OCO Limit Order  
strategy\_oco\_trigger: Strategy-OCO Trigger Order  
modify\_order\_limit: Limit Modify Order  
strategy\_regular\_buy: Strategy-Regular Buy  
strategy\_grid\_middle: Strategy-Neutral Grid |
| \>cTime | String | Creation time |
| \>uTime | String | Last updated time |
| \>presetStopSurplusPrice | String | Take profit price |
| \>presetStopLossPrice | String | Stop loss price |
| \>posAvg | String | Average position price |

> **Source:** https://www.bitget.com/api-doc/contract/trade/Get-Orders-History
