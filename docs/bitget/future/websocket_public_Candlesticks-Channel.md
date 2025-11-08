# Candlestick Channel

### Description[​](#description "Direct link to Description")

The channel will push a snapshot after successful subscribed, later on the updates will be pushed

If intended to query history data in a customized time range, please refer to [Get Candle Data](/api-doc/contract/market/Get-Candle-Data)

When there are transactions in the K-line channel, data is pushed once per second.

When there are no transactions, data is pushed once at the specified time granularity.

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "USDT-FUTURES",            "channel": "candle1m",            "instId": "BTCUSDT"        }    ]}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| op | String | Yes | Operation, subscribe unsubscribe 
| args | List&lt;Object&gt; | Yes | List of channels to request subscription 
| &gt; instType | String | Yes | Product type 
| &gt; channel | String | Yes | Channel name, candle1m (1 minute) candle5m (5 minutes) candle15m (15 minutes) candle30m (30 minutes) candle1H (1 hour) candle4H (4 hours) candle12H (12 hours)<br>candle1D (1 day) candle1W (1 week) candle6H (6 hours) candle3D (3 days) candle1M (1-month line) candle6Hutc (6-hour line, UTC) candle12Hutc (12-hour line, UTC)<br>candle1Dutc (1-day line, UTC) candle3Dutc (3-day line, UTC) candle1Wutc (weekly line, UTC) candle1Mutc (monthly line. UTC) 
| &gt; instId | String | Yes | Product ID<br>E.g. ETHUSDT 

Response Example

```
{    "event": "subscribe",    "arg": {        "instType": "USDT-FUTURES",        "channel": "candle1m",        "instId": "BTCUSDT"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| event | String | Yes<br>Event 
| arg | Object | Subscribed channels 
| &gt; channel | String | Channel name, candle1m (1 minute) candle5m (5 minutes) candle15m (15 minutes) candle30m (30 minutes) candle1H (1 hour) candle4H (4 hours) candle12H (12 hours)<br>candle1D (1 day) candle1W (1 week) candle6H (6 hours) candle3D (3 days) candle1M (1-month line) candle6Hutc (6-hour line, UTC) candle12Hutc (12-hour line, UTC)<br>candle1Dutc (1-day line, UTC) candle3Dutc (3-day line, UTC) candle1Wutc (weekly line, UTC) candle1Mutc (monthly line. UTC) 
| &gt; instType | String | Product type 
| &gt; instId | String | Yes<br>E.g. ETHUSDT 
| code | String | Error code, returned only on error 
| msg | String | Error message 

Push Data

```
{    "action": "snapshot",    "arg": {        "instType": "USDT-FUTURES",        "channel": "candle1m",        "instId": "BTCUSDT"    },    "data": [        [            "1695685500000",            "27000",            "27000.5",            "27000",            "27000.5",            "0.057",            "1539.0155",            "1539.0155"        ]    ],    "ts": 1695715462250}
```

### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| arg | Object | Channels with successful subscription 
| &gt; channel | String | Channel name 
| &gt; instId | String | Product ID 
| &gt; instType | String | Product type 
| data | List&lt;String&gt; | Subscription data 
| &gt; index[0] | String | Start time, milliseconds format of Unix timestamp, e.g.1597026383085 
| &gt; index[1] | String | Opening price 
| &gt; index[2] | String | Highest price 
| &gt; index[3] | String | Lowest price 
| &gt; index[4] | String | Closing price 
| &gt; index[5] | String | The value is the trading volume of left coin 
| &gt; index[6] | String | Trading volume of quote currency 
| &gt; index[7] | String | Trading volume of USDT

> **Source:** https://www.bitget.com/api-doc/contract/websocket/public/Candlesticks-Channel
