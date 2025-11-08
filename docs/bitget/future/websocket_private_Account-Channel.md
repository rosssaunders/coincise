# Account channel

### Description[​](#description "Direct link to Description")

Subscribe account channel

Data will be pushed when the following events occurred:

1.  Transfer balance to Futures account
2.  Trading voucher deposit
3.  Open/close orders are filled

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "USDT-FUTURES",            "channel": "account",            "coin": "default"        }    ]}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| op | String | Yes | Operation, subscribe unsubscribe 
| args | List&lt;Object&gt; | Yes | List of channels to request subscription 
| &gt; instType | String | Yes | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 
| &gt; channel | String | Yes | Channel name 
| &gt; coin | String | Yes | Coin name，<code>default</code> represents all the coins，Only default is supported now 

Response Example

```
{    "event": "subscribe",    "arg": {        "instType": "USDT-FUTURES",        "channel": "account",        "coin": "default"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| event | String | Yes<br>Operation 
| arg | Object | Subscribed channels 
| &gt; instType | String | Product type<br><code>USDT-FUTURES</code> USDT professional futures<br><code>COIN-FUTURES</code> Futures settled in cryptocurrencies<br><code>USDC-FUTURES</code> USDC professional futures 
| &gt; channel | String | Channel name 
| &gt; coin | String | <code>default</code> 
| code | String | Error code 
| msg | String | Error message 

Push Data

```
{    "action": "snapshot",    "arg": {        "instType": "USDT-FUTURES",        "channel": "account",        "coin": "default"    },    "data": [      {        "marginCoin": "USDT",        "frozen": "0.00000000",        "available": "11.98545761",        "maxOpenPosAvailable": "11.98545761",        "maxTransferOut": "11.98545761",        "equity": "11.98545761",        "usdtEquity": "11.985457617660",        "crossedRiskRate": "0",        "unrealizedPL": "0.000000000000",        "unionTotalMargin": "100",        "unionAvailable": "20",        "unionMm": "15",        "assetMode": "union"      }    ],    "ts": 1695717225146}
```

### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| action | String | <code>snapshot</code> 
| arg | Object | Channels to request subscription 
| &gt; instType | String | Product type<br><code>USDT-FUTURES</code> USDT professional futures<br><code>COIN-FUTURES</code> Futures settled in cryptocurrencies<br><code>USDC-FUTURES</code> USDC professional futures 
| &gt; channel | String | Channel name 
| &gt; coin | String | <code>default</code> 
| data | List&lt;Object&gt; | Subscription data 
| &gt;marginCoin | String | Margin coin 
| &gt;frozen | String | Locked quantity (margin coin) 
| &gt;available | String | Currently available assets 
| &gt;maxOpenPosAvailable | String | Maximum available balance to open positions 
| &gt;maxTransferOut | String | Maximum transferable amount 
| &gt;equity | String | Account assets 
| &gt;usdtEquity | String | Account equity in USD 
| &gt;crossedRiskRate | String | Risk ratio in cross margin mode 
| &gt;unrealizedPL | String | Unrealized PnL 
| &gt;unionTotalMargin | String | Margin Amount under Union Margin Mode 
| &gt;unionAvailable | String | Available Balance under Union Margin Mode 
| &gt;unionMm | String | Maintenance Margin under Union Margin Mode 
| &gt;assetMode | String |

> **Source:** https://www.bitget.com/api-doc/contract/websocket/private/Account-Channel
