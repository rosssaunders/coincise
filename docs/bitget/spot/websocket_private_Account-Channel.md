# Account Channel

### Description[​](#description "Direct link to Description")

Get account information, push data according to the subscription dimensions for
the first subscription.

Data will be pushed when the following events occurred:

1.  Orders are filled
2.  Transfer
3.  Deposit
4.  Withdrawal

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "SPOT",            "channel": "account",            "coin": "default"        }    ]}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter     | Type               | Required | Description                                                                             |
| :------------ | :----------------- | :------- | :-------------------------------------------------------------------------------------- |
| op            | String             | Yes      | Operation, subscribe unsubscribe                                                        |
| args          | List&lt;Object&gt; | Yes      | List of channels to request subscription                                                |
| &gt; instType | String             | Yes      | Product Type, <code>SPOT</code>                                                         |
| &gt; channel  | String             | Yes      | Channel name, <code>account</code>                                                      |
| &gt; coin     | String             | Yes      | Coin name，<code>default</code> represents all the coins，Only default is supported now |

Response Example

```
{  "event": "subscribe",  "arg": {    "instType": "SPOT",    "channel": "account",    "coin": "default"  }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type   | Description                        |
| :------------ | :----- | :--------------------------------- |
| event         | String | Yes<br>Event                       |
| arg           | Object | Subscribed channels                |
| &gt; instType | String | Product Type, <code>SPOT</code>    |
| &gt; channel  | String | Channel name, <code>account</code> |
| &gt; coin     | String | <code>default</code>               |
| code          | String | Error code, returned only on error |
| msg           | String | Error message                      |

Push Data

```
{    "action": "snapshot",    "arg": {        "instType": "SPOT",        "channel": "account",        "coin": "default"    },    "data": [        {            "coin": "USDT",            "available": "100000",            "frozen": "0",            "locked": "0",            "limitAvailable": "0",            "uTime":"1697092295506"        }    ],    "ts": 1695713887792}
```

### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter           | Type               | Description                                                                      |
| :------------------ | :----------------- | :------------------------------------------------------------------------------- |
| arg                 | Object             | Channels with successful subscription                                            |
| &gt; instType       | String             | Product Type, <code>SPOT</code>                                                  |
| &gt; channel        | String             | Channel name, <code>account</code>                                               |
| &gt; coin           | String             | <code>default</code>                                                             |
| action              | String             | Push data action, <code>snapshot</code> or <code>update</code>                   |
| data                | List&lt;Object&gt; | Subscription data                                                                |
| &gt; coin           | String             | Token name                                                                       |
| &gt; available      | String             | Available coin assets                                                            |
| &gt; frozen         | String             | Amount of frozen assets Usually frozen when the order is placed                  |
| &gt; locked         | String             | Amount of locked assets Locked assests required to become a fiat merchants, etc. |
| &gt; limitAvailable | String             | Restricted availability For spot copy trading                                    |
| &gt; uTime          | String             | Update time                                                                      |

> **Source:**
> https://www.bitget.com/api-doc/spot/websocket/private/Account-Channel
