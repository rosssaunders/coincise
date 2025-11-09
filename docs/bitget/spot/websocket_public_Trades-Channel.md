# Trading Channel

### Description[​](#description "Direct link to Description")

Push once if any trade is matched(taker orders)

After first subscription, it will push the recent snapshot data and then push
the update data

Real-time Push

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "SPOT",            "channel": "trade",            "instId": "BTCUSDT"        }    ]}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter     | Type               | Required | Description                          |
| :------------ | :----------------- | :------- | :----------------------------------- |
| op            | String             | Yes      | Operation, subscribe unsubscribe     |
| args          | List&lt;Object&gt; | Yes      | List of channels to subscribe to     |
| &gt; instType | String             | Yes      | Product Line Type, <code>SPOT</code> |
| &gt; channel  | String             | Yes      | Channel name, <code>trade</code>     |
| &gt; instId   | String             | Yes      | Product id For example: ETHUSDT      |

Response Example

```
{    "event": "subscribe",    "arg": {        "instType": "SPOT",        "channel": "trade",        "instId": "BTCUSDT"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type   | Description                                                               |
| :------------ | :----- | :------------------------------------------------------------------------ |
| event         | String | Event, <code>subscribe</code> <code>unsubscribe</code> <code>error</code> |
| arg           | Object | The channel subscribe to                                                  |
| &gt; instType | String | product type, <code>SPOT</code>                                           |
| &gt; channel  | String | Channel name, <code>trade</code>                                          |
| &gt; instId   | String | Product id. For example: ETHUSDT                                          |
| code          | String | Error code, returned only on error                                        |
| msg           | String | Error message                                                             |

Push Data

```
{    "action": "snapshot",    "arg": {        "instType": "SPOT",        "channel": "trade",        "instId": "BTCUSDT"    },    "data": [        {            "ts": "1695709835822",            "price": "26293.4",            "size": "0.0013",            "side": "buy",            "tradeId": "1000000000"        }    ],    "ts": 1695711090682}
```

### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter     | Type               | Description                                                                   |
| :------------ | :----------------- | :---------------------------------------------------------------------------- |
| arg           | Object             | Successfully subscribed channel                                               |
| &gt; instType | String             | Product Type, <code>SPOT</code>                                               |
| &gt; channel  | String             | Channel name, <code>trade</code>                                              |
| &gt; instId   | String             | Product id For example: ETHUSDT                                               |
| action        | String             | Push data action, <code>snapshot</code> or <code>update</code>                |
| data          | List&lt;Object&gt; | Subscribed data                                                               |
| &gt; tradeId  | String             | Transaction ID                                                                |
| &gt; ts       | String             | Transaction time, millisecond format of Unix timestamp, such as 1597026383085 |
| &gt; price    | String             | Transaction price                                                             |
| &gt; size     | String             | Transaction quantity                                                          |
| &gt; side     | String             | Transaction direction                                                         |

> **Source:**
> https://www.bitget.com/api-doc/spot/websocket/public/Trades-Channel
