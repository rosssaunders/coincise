# Order Channel

### Description[​](#description "Direct link to Description")

Get order information. Initial subscriptions will not trigger any push notifications.

Data will be pushed when the following events occurred:

1.  Place orders
2.  Orders are filled
3.  Cancel orders
4.  Modify orders

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "SPOT",            "channel": "orders",            "instId": "BTCUSDT"        }    ]}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| op | String | Yes | Operation, subscribe unsubscribe 
| args | List&lt;Object&gt; | Yes | List of channels to request subscription 
| &gt; instType | String | Yes | Product line type 
| &gt; channel | String | Yes | Channel name 
| &gt; instId | String | Yes | Product ID, e.g. <code>ETHUSDT</code><br><code>default</code>:subscribe all symbols 

Response Example

```
{  "event": "subscribe",  "arg": {    "instType": "SPOT",    "channel": "orders",    "instId": "BTCUSDT"  }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| event | String | Yes<br>Event 
| arg | Object | Subscribed channels 
| &gt; instType | String | Product type 
| &gt; channel | String | Channel name 
| &gt; instId | String | Product ID, e.g. ETHUSDT 
| code | String | Error code, returned only on error 
| msg | String | Error message 

Push Data

```
{  "action": "snapshot",  "arg": {    "instType": "SPOT",    "channel": "orders",    "instId": "BTCUSDT"  },  "data": [    {      "instId": "BTCUSDT",      "orderId": "1",      "clientOid": "1",      "size": "8.0000",      "newSize": "500.0000",      "notional": "8.000000",      "orderType": "market",      "force": "gtc",      "side": "buy",      "fillPrice": "26256.0",      "tradeId": "1",      "baseVolume": "0.0003",      "fillTime": "1695797773286",      "fillFee": "-0.00000018",      "fillFeeCoin": "BTC",      "tradeScope": "T",      "accBaseVolume": "0.0003",      "priceAvg": "26256.0",      "status": "partially_filled",      "cTime": "1695797773257",      "uTime": "1695797773326",      "stpMode": "cancel_taker",      "feeDetail": [        {          "feeCoin": "BTC",          "fee": "-0.00000018"        }      ],      "enterPointSource": "WEB"    }  ],  "ts": 1695797773370}
```

### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| arg | Object | Channels with successful subscription 
| &gt; instType | String | Product type 
| &gt; channel | String | Channel name 
| &gt; instId | String | Yes 
| action | String | Push data action, <code>snapshot</code> or <code>update</code> 
| data | List&lt;Object&gt; | Subscription data 
| &gt; instId | String | Product ID, e.g. ETHUSDT 
| &gt; orderId | String | Order ID 
| &gt; clientOid | String | Customized order ID 
| &gt; price | String | Order price 
| &gt; size | String | Order amount<br>when <code>side=buy</code>, it represents the amount of quote coin;<br>when <code>side=sell</code>, it represents the amount of base coin. 
| &gt; newSize | String | <code>newSize</code> represents the order quantity, following the specified rules:<br>when <code>orderType=limit</code>, <code>newSize</code> represents the quantity of base coin,<br>when <code>orderType=market</code>and<code>side=buy</code>, <code>newSize</code> represents the quantity of quote coin,<br>when <code>orderType=market</code>and<code>side=sell</code>, <code>newSize</code> represents the quantity of base coin. 
| &gt; notional | String | Buy amount, returned when buying at market price 
| &gt; ordType | String | Order type, market: market order. Limit: limit order 
| &gt; force | String | Order validity, GTC: normal limit order, good till canceled. post_only Post only. FOK: Fill or kill. IOC: Immediate or cancel. 
| &gt; side | String | Order direction 
| &gt; fillPrice | String | Latest filled price 
| &gt; tradeId | String | Latest transaction ID 
| &gt; baseVolume | String | Number of latest filled orders 
| &gt; fillTime | String | Latest transaction time 
| &gt; fillFee | String | Transaction fee of the latest transaction, negative value 
| &gt; fillFeeCoin | String | Currency of transaction fee of the latest transaction 
| &gt; tradeScope | String | Direction of liquidity of the latest transaction<br><code>T</code>:taker;<br><code>M</code>:maker; 
| &gt; accBaseVolume | String | Total filled quantity 
| &gt; priceAvg | String | Total average filled price. If the filled orders are 0, the field is 0. 
| &gt; status | String | Order status<br><code>live</code>:new order;<br><code>partially_filled</code>:partially filled;<br><code>filled</code>:full filled;<br><code>cancelled</code>: cancelled; 
| &gt; enterPointSource | String | Order source 
| &gt; feeDetail | List&lt;Object&gt; | transaction fee list 
| &gt;&gt; feeCoin | String | Transaction fee currency 
| &gt;&gt; fee | String | Order transaction fee, the transaction fee charged by the platform from the user. 
| &gt; cTime | String | Order creation time, milliseconds format of Unix timestamp, e.g.1630410492847 
| &gt; uTime | String | Order Update time, milliseconds format of Unix timestamp, e.g.1630410492847 
| &gt; stpMode | String | STP Mode<br><code>none</code> not setting STP<br><code>cancel_taker</code> cancel taker order<br><code>cancel_maker</code> cancel maker order<br><code>cancel_both</code> cancel both of taker and maker orders

> **Source:** https://www.bitget.com/api-doc/spot/websocket/private/Order-Channel
