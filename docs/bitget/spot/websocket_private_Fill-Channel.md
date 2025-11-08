# Fill Channel

### Description[​](#description "Direct link to Description")

Trade Details channel

Request

```
{    "op": "subscribe",    "args": [        {            "instType": "SPOT",            "channel": "fill",            "instId": "default"        }    ]}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| op | String | Yes | Operation, subscribe unsubscribe 
| arg | Object | Yes | Subscribed channels 
| &gt; channel | String | Yes | Channel name: <code>fill</code> 
| &gt; instType | String | Yes | Product type<br><code>SPOT</code> 
| &gt; instId | String | No | Product ID or default 

Response

```
{    "event": "subscribe",    "arg": {        "instType": "SPOT",        "channel": "fill",        "instId": "default"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| event | String | Event 
| arg | Object | Subscribed channels 
| &gt; channel | String | Channel name: fill 
| &gt; instType | String | Product type<br><code>SPOT</code> 
| &gt; instId | String | Product ID/default 
| code | String | Error code 
| msg | String | Error message 

Push Data

```
{    "action":"snapshot",    "arg":{        "instType":"SPOT",        "channel":"fill",        "instId":"default"    },    "data":[        {            "orderId":"111",            "tradeId":"111",            "symbol":"BTCUSDT",            "orderType":"limit",            "side":"buy",            "priceAvg":"42740.41",            "size":"0.0006",            "amount":"25.644246",            "tradeScope":"marker",            "feeDetail":[                {                    "feeCoin":"USDT",                    "deduction":"no",                    "totalDeductionFee":"0",                    "totalFee":"0.01538655"                }            ],            "cTime":"1703580202094",            "uTime":"1703580202094"        },        {            "orderId":"111",            "tradeId":"222",            "symbol":"BTCUSDT",            "orderType":"limit",            "side":"buy",            "priceAvg":"42741.46",            "size":"0.0006",            "amount":"25.644876",                        "tradeScope":"marker",            "feeDetail":[                {                    "feeCoin":"USDT",                    "deduction":"no",                    "totalDeductionFee":"0",                    "totalFee":"0.01538693"                }            ],            "cTime":"1703580202094",            "uTime":"1703580202094"        }    ],    "ts":1703580202416}
```

### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| action | String | Push action<br><code>snapshot</code> 
| arg | Object | Channels with successful subscription 
| &gt; channel | String | Channel name: fill 
| &gt; instType | String | Product type<br><code>SPOT</code> 
| &gt; instId | String | Product ID 
| data | List&lt;Object&gt; | Subscription data 
| &gt; orderId | String | Order ID 
| &gt; tradeId | String | Trade ID 
| &gt; symbol | String | Symbol 
| &gt; orderType | String | Order type:<br><code>limit</code><br><code>market</code> 
| &gt; side | String | Order direction<br><code>buy</code><br><code>sell</code> 
| &gt; priceAvg | String | Total average filled price 
| &gt; size | String | Filled size 
| &gt; amount | String | Accumulated filled size 
| &gt; tradeScope | String | The liquidity direction of the latest transaction<br><code>taker</code><br><code>maker</code> 
| &gt; feeDetail | List&lt;Object&gt; | Transaction fee of the order 
| &nbsp;&nbsp;&gt;&gt; deduction | String | deduction<br><code>yes</code><br><code>no</code> 
| &nbsp;&nbsp;&gt;&gt; totalDeductionFee | String | Fee of deduction 
| &nbsp;&nbsp;&gt;&gt; totalFee | String | Fee of all 
| &nbsp;&nbsp;&gt;&gt; feeCoin | String | Currency of transaction fee 
| &gt; cTime | String | Create Time，milliseconds format of Unix timestamp, e.g.1597026383085 
| &gt; uTime | String | Update Time，milliseconds format of Unix timestamp, e.g.1597026383085

> **Source:** https://www.bitget.com/api-doc/spot/websocket/private/Fill-Channel
