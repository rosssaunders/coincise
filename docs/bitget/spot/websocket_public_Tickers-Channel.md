# Market Channel

### Description[​](#description "Direct link to Description")

Get the product's latest price, bid price, bid price and 24h trading volume information. Frequency of data push: 200ms ~ 300ms

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "SPOT",            "channel": "ticker",            "instId": "ETHUSDT"        }    ]}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| op | String | Yes | Operation, subscribe unsubscribe 
| args | Array | List&lt;Object&gt; | Yes<br>List of channels to request subscription 
| &gt; instType | String | Yes | Product line type 
| &gt; channel | String | Yes | Channel name 
| &gt; instId | String | Yes | Product ID, e.g. ETHUSDT 

Response Example

```
{  "event": "subscribe",  "arg": {    "instType": "SPOT",    "channel": "ticker",    "instId": "ETHUSDT"  }}
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
{    "action": "snapshot",    "arg": {        "instType": "SPOT",        "channel": "ticker",        "instId": "ETHUSDT"    },    "data": [        {            "instId": "ETHUSDT",            "lastPr": "2200.10",            "open24h": "0.00",            "high24h": "0.00",            "low24h": "0.00",            "change24h": "0.00",            "bidPr": "1792",            "askPr": "2200.1",            "bidSz": "0.0084",            "askSz": "19740.8811",            "baseVolume": "0.0000",            "quoteVolume": "0.0000",            "openUtc": "0.00",            "changeUtc24h": "0",            "ts": "1695702438018"        }    ],    "ts": 1695702438029}
```

### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| arg | Object | Channels with successful subscription 
| &gt; instType | String | Product type 
| &gt; channel | String | Channel name 
| &gt; instId | String | Product ID, e.g. ETHUSDT 
| action | String | Push data action: <code>snapshot</code> 
| data | List&lt;Object&gt; | Subscription data 
| &gt; instId | String | Product ID, e.g. ETHUSDT 
| &gt; lastPr | String | Latest price 
| &gt; askPr | String | Ask price 
| &gt; bidPr | String | Bid price 
| &gt; open24h | String | Entry price of the last 24 hours 
| &gt; high24h | String | 24h high 
| &gt; low24h | String | 24h low 
| &gt; baseVolume | String | 24h trading volume in left coin 
| &gt; quoteVolume | String | 24h trading volume in right coin 
| &gt; ts | String | Milliseconds format of data generation time Unix timestamp, e.g. 1597026383085 
| &gt; openUtc | String | UTC±00:00 Entry price 
| &gt; changeUtc24h | String | Change at UTC+0, 0.01 means 1%. 
| &gt; bidSz | String | Buying amount 
| &gt; askSz | String | Selling amount 
| &gt; change24h | String | 24-hour change, 0.01 means 1%.

> **Source:** https://www.bitget.com/api-doc/spot/websocket/public/Tickers-Channel
