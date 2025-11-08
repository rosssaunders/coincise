# Public Trade Channel

### Description[​](#description "Direct link to Description")

Get the public trade data(taker orders)

Real-time Push

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "USDT-FUTURES",            "channel": "trade",            "instId": "BTCUSDT"        }    ]}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| op | String | Yes | Operation, subscribe unsubscribe 
| args | List&lt;Object&gt; | Yes | op list 
| &gt; instType | String | Yes | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 
| &gt; channel | String | Yes | Channel, <code>trade</code> 
| &gt; instId | String | Yes | Product ID<br>e.g: ETHUSDT 

Response Example

```
{    "event": "subscribe",    "arg": {        "instType": "USDT-FUTURES",        "channel": "trade",        "instId": "BTCUSDT"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| event | String | event 
| arg | Object | arg list 
| &gt; instType | String | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 
| &gt; channel | String | Channel, <code>trade</code> 
| &gt; instId | String | Symbol name<br>e.g: ETHUSDT 
| code | String | Error code 
| msg | String | Error message 

Push Data

```
{    "action": "snapshot",    "arg": {        "instType": "USDT-FUTURES",        "channel": "trade",        "instId": "BTCUSDT"    },    "data": [        {            "ts": "1695716760565",            "price": "27000.5",            "size": "0.001",            "side": "buy",            "tradeId": "1111111111"        },        {            "ts": "1695716759514",            "price": "27000.0",            "size": "0.001",            "side": "sell",            "tradeId": "1111111111"        }    ],    "ts": 1695716761589}
```

### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| action | String | action 
| arg | Object | arg 
| &gt; instType | String | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 
| &gt; channel | String | Channel, <code>trade</code> 
| &gt; instId | String | Symbol: ETHUSDT 
| data | List&lt;Object&gt; | Data 
| &gt; ts | String | Fill time: 1597026383085 
| &gt; price | String | Filled price 
| &gt; size | String | Filled amount 
| &gt; side | String | Filled side, sell/buy 
| &gt; tradeId | String | tradeId

> **Source:** https://www.bitget.com/api-doc/contract/websocket/public/New-Trades-Channel
