# Market Channel

### Description[​](#description "Direct link to Description")

Retrieve the latest traded price, bid price, ask price and 24-hour trading
volume of the instruments. When there is a change (deal, buy, sell, issue):
300ms to 400ms.

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "USDT-FUTURES",            "channel": "ticker",            "instId": "BTCUSDT"        }    ]}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter     | Type               | Required | Description                              |
| :------------ | :----------------- | :------- | :--------------------------------------- |
| op            | String             | Yes      | Operation, subscribe unsubscribe         |
| args          | List&lt;Object&gt; | Yes      | List of channels to request subscription |
| &gt; instType | String             | Yes      | Product type                             |
| &gt; channel  | String             | Yes      | Channel name                             |
| &gt; instId   | String             | Yes      | Product ID<br>E.g. ETHUSDT               |

Response Example

```
{    "event": "subscribe",    "arg": {        "instType": "USDT-FUTURES",        "channel": "ticker",        "instId": "BTCUSDT"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type   | Description                |
| :------------ | :----- | :------------------------- |
| event         | String | Event                      |
| arg           | Object | Subscribed channels        |
| &gt; instType | String | Product type               |
| &gt; channel  | String | Channel name               |
| &gt; instId   | String | Product ID<br>E.g. ETHUSDT |
| code          | String | Error code                 |
| msg           | String | Error message              |

Push Data

```
{    "action": "snapshot",    "arg": {        "instType": "USDT-FUTURES",        "channel": "ticker",        "instId": "BTCUSDT"    },    "data": [        {            "instId": "BTCUSDT",            "lastPr": "27000.5",            "bidPr": "27000",            "askPr": "27000.5",            "bidSz": "2.71",            "askSz": "8.76",            "open24h": "27000.5",            "high24h": "30668.5",            "low24h": "26999.0",            "change24h": "-0.00002",            "fundingRate": "0.000010",            "nextFundingTime": "1695722400000",            "markPrice": "27000.0",            "indexPrice": "25702.4",            "holdingAmount": "929.502",            "baseVolume": "368.900",            "quoteVolume": "10152429.961",            "openUtc": "27000.5",            "symbolType": 1,            "symbol": "BTCUSDT",            "deliveryPrice": "0",            "ts": "1695715383021"        }    ],    "ts": 1695715383039}
```

### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter           | Type    | Description                                                                                                                                                                                                         |
| :------------------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| arg                 | Object  | Channels with successful subscription                                                                                                                                                                               |
| &gt; instType       | String  | Product type                                                                                                                                                                                                        |
| &gt; channel        | String  | Channel name                                                                                                                                                                                                        |
| &gt; instId         | String  | Product ID                                                                                                                                                                                                          |
| action              | String  | Push data action, <code>snapshot</code> or <code>update</code>                                                                                                                                                      |
| data                | List    | Subscription data                                                                                                                                                                                                   |
| &gt; instId         | String  | Product ID, BTCUSDT                                                                                                                                                                                                 |
| &gt;lastPr          | String  | Latest price                                                                                                                                                                                                        |
| &gt;askPr           | String  | Ask price                                                                                                                                                                                                           |
| &gt;bidPr           | String  | Bid price                                                                                                                                                                                                           |
| &gt;high24h         | String  | 24h high                                                                                                                                                                                                            |
| &gt;low24h          | String  | 24h low                                                                                                                                                                                                             |
| &gt;change24h       | String  | 24h change                                                                                                                                                                                                          |
| &gt;fundingRate     | String  | Funding rate                                                                                                                                                                                                        |
| &gt;nextFundingTime | String  | Next funding rate settlement time, Milliseconds format of timestamp Unix, e.g. 1597026383085                                                                                                                        |
| &gt;ts              | String  | System time, Milliseconds format of current data timestamp Unix, e.g. 1597026383085                                                                                                                                 |
| &gt;markPrice       | String  | Mark price                                                                                                                                                                                                          |
| &gt;indexPrice      | String  | Index price                                                                                                                                                                                                         |
| &gt;holdingAmount   | String  | Open interest                                                                                                                                                                                                       |
| &gt;baseVolume      | String  | Trading volume of the coin                                                                                                                                                                                          |
| &gt;quoteVolume     | String  | Trading volume of quote currency                                                                                                                                                                                    |
| &gt;openUtc         | String  | Price at 00:00 (UTC)                                                                                                                                                                                                |
| &gt;symbolType      | Integer | SymbolType: 1-&gt;perpetual 2-&gt;delivery                                                                                                                                                                          |
| &gt;symbol          | String  | Trading pair                                                                                                                                                                                                        |
| &gt;deliveryPrice   | String  | Delivery price of the delivery futures, when symbolType = 1(perpetual) it is always 0<br>It will be pushed 1 hour before delivery                                                                                   |
| &gt;bidSz           | String  | Buying amount                                                                                                                                                                                                       |
| &gt;askSz           | String  | selling amount                                                                                                                                                                                                      |
| &gt;open24h         | String  | Entry price of the last 24 hours, The opening time is compared on a 24-hour basis. i.e.: Now it is 7:00 PM of the 2nd day of the month, then the corresponding opening time is 7:00 PM of the 1st day of the month. |

> **Source:**
> https://www.bitget.com/api-doc/contract/websocket/public/Tickers-Channel
