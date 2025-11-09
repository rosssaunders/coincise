# Candlestick Channel

### Description[​](#description "Direct link to Description")

Get the candlestick data of the product

After first subscription, it will push the recent snapshot data and then push
the update data

When there are transactions in the K-line channel, data is pushed once per
second.

When there are no transactions, data is pushed once at the specified time
granularity.

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "SPOT",            "channel": "candle1m",            "instId": "ETHUSDT"        }    ]}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter     | Type               | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :------------ | :----------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| op            | String             | Yes      | Operation, subscribe unsubscribe                                                                                                                                                                                                                                                                                                                                                                                                    |
| args          | List&lt;Object&gt; | Yes      | List of channels to request subscription                                                                                                                                                                                                                                                                                                                                                                                            |
| &gt; instType | String             | Yes      | Product line type                                                                                                                                                                                                                                                                                                                                                                                                                   |
| &gt; channel  | String             | Yes      | Channel name, candle1m, candle5m 5 minutes, candle15 15 minutes, candle30m 30 minutes, candle1H 1 hour, candle4H 4 hours, candle6H 6 hours, candle12H 12 hours.<br>candle1D 1 day, candle3D 3 days, candle1W 1 week, candle1M 1 month-line, candle6Hutc 6-hour line, UTC, candle12Hutc 12-hour line, UTC, candle1Dutc 1-day line, UTC<br>candle3Dutc, UTC, 3-day line, candle1Wutc UTC, weekly line, candle1Mutc monthly line, UTC. |
| &gt; instId   | String             | Yes      | Product ID, e.g. ETHUSDT                                                                                                                                                                                                                                                                                                                                                                                                            |

Response Example

```
{  "event": "subscribe",  "arg": {    "instType": "SPOT",    "channel": "candle1m",    "instId": "ETHUSDT"  }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :------------ | :----- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| event         | String | Yes<br>event, subscribe unsubscribe error                                                                                                                                                                                                                                                                                                                                                                                           |
| arg           | Object | Subscribed channels                                                                                                                                                                                                                                                                                                                                                                                                                 |
| &gt; instType | String | Product type                                                                                                                                                                                                                                                                                                                                                                                                                        |
| &gt; channel  | String | Channel name, candle1m, candle5m 5 minutes, candle15 15 minutes, candle30m 30 minutes, candle1H 1 hour, candle4H 4 hours, candle6H 6 hours, candle12H 12 hours.<br>candle1D 1 day, candle3D 3 days, candle1W 1 week, candle1M 1 month-line, candle6Hutc 6-hour line, UTC, candle12Hutc 12-hour line, UTC, candle1Dutc 1-day line, UTC<br>candle3Dutc, UTC, 3-day line, candle1Wutc UTC, weekly line, candle1Mutc monthly line, UTC. |
| &gt; instId   | String | Product ID, e.g. ETHUSDT                                                                                                                                                                                                                                                                                                                                                                                                            |
| code          | String | Error code, returned only on error                                                                                                                                                                                                                                                                                                                                                                                                  |
| msg           | String | Error message                                                                                                                                                                                                                                                                                                                                                                                                                       |

Push Data

```
{  "action": "snapshot",  "arg": {    "instType": "SPOT",    "channel": "candle1m",    "instId": "ETHUSDT"  },  "data": [    [      "1695672780000",      "2200.1",      "2200.1",      "2200.1",      "2200.1",      "0",      "0",      "0"    ]  ],  "ts": 1695702747821}
```

### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter     | Type               | Description                                                          |
| :------------ | :----------------- | :------------------------------------------------------------------- |
| action        | String             | Push data action, <code>snapshot</code> or <code>update</code>       |
| arg           | Object             | Subscribed channels                                                  |
| &gt; channel  | String             | Channel name                                                         |
| &gt; instType | String             | Product type                                                         |
| &gt; instId   | String             | Product ID, e.g. ETHUSDT                                             |
| data          | List&lt;String&gt; | Subscription data                                                    |
| &gt; index[0] | String             | Start time, milliseconds format of Unix timestamp, e.g.1597026383085 |
| &gt; index[1] | String             | Opening price                                                        |
| &gt; index[2] | String             | Highest price                                                        |
| &gt; index[3] | String             | Lowest price                                                         |
| &gt; index[4] | String             | Closing price                                                        |
| &gt; index[5] | String             | Trading volume of the coin                                           |
| &gt; index[6] | String             | Trading volume of quote currency                                     |
| &gt; index[7] | String             | Trading volume (USDT)                                                |

> **Source:**
> https://www.bitget.com/api-doc/spot/websocket/public/Candlesticks-Channel
