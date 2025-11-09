# History Position Channel

Data will be pushed when the position totally closed

### Description[​](#description "Direct link to Description")

Subscribe the position channel

Data will be pushed when the position totally closed

Request Example

```
{    "args":[        {            "channel":"positions-history",            "instId":"default",            "instType":"USDT-FUTURES"        }    ],    "op":"subscribe"}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter     | Type               | Required | Description                                                                                                                                      |
| :------------ | :----------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| op            | String             | Yes      | subscribe unsubscribe                                                                                                                            |
| args          | List&lt;Object&gt; | Yes      | List of channels to request subscription                                                                                                         |
| &gt; channel  | String             | Yes      | Channel name: <code>positions-history</code>                                                                                                     |
| &gt; instType | String             | Yes      | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures |
| &gt; instId   | String             | Yes      | Symbol name,<code>default</code>represents all the symbols，Only default is supported now                                                        |

Response Example

```
{    "event":"subscribe",    "arg":{        "instType":"USDT-FUTURES",        "channel":"positions-history",        "instId":"default"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type   | Description                                                                                                                                      |
| :------------ | :----- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| event         | String | Event                                                                                                                                            |
| arg           | Object | Subscribed channels                                                                                                                              |
| &gt; channel  | String | Channel name: <code>positions-history</code>                                                                                                     |
| &gt; instType | String | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures |
| &gt; instId   | String | <code>default</code>                                                                                                                             |
| code          | String | Error code                                                                                                                                       |
| msg           | String | Error message                                                                                                                                    |

Push Data

```
{    "action":"snapshot",    "arg":{        "instType":"USDT-FUTURES",        "channel":"positions-history",        "instId":"default"    },    "data":[        {            "posId":"1",            "instId":"BTCUSDT",            "marginCoin":"USDT",            "marginMode":"crossed",            "holdSide":"short",            "posMode":"one_way_mode",            "openPriceAvg":"20000.0",            "closePriceAvg":"26221.0",            "openSize":"0.010",            "closeSize":"0.010",            "achievedProfits":"-62.21000000",            "settleFee":"-0.02277989",            "openFee":"-0.12000000",            "closeFee":"-0.15732600",            "cTime":"1696907951177",            "uTime":"1697090609976"        }    ],    "ts":1697099840122}
```

### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter            | Type               | Description                                                                                                                                                                                              |
| :------------------- | :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action               | String             | 'snapshot'                                                                                                                                                                                               |
| arg                  | Object             | Channels with successful subscription                                                                                                                                                                    |
| &gt; channel         | String             | Channel name: <code>positions-history</code>                                                                                                                                                             |
| &gt; instType        | String             | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures                                                         |
| &gt; instId          | String             | <code>default</code>                                                                                                                                                                                     |
| data                 | List&lt;Object&gt; | Subscription data                                                                                                                                                                                        |
| &gt; posId           | String             | Position ID                                                                                                                                                                                              |
| &gt; instId          | String             | Product ID<br>delivery contract reference：<a href="https://www.bitget.com/api-doc/common/release-note" target="_blank" rel="noopener noreferrer">https://www.bitget.com/api-doc/common/release-note</a> |
| &gt; marginCoin      | String             | Currency of occupied margin                                                                                                                                                                              |
| &gt; marginMode      | String             | Margin mode<br><code>fixed</code>: isolated mode<br><code>crossed</code>: crossed mode                                                                                                                   |
| &gt; holdSide        | String             | Position direction                                                                                                                                                                                       |
| &gt; posMode         | String             | Position mode                                                                                                                                                                                            |
| &gt; openPriceAvg    | String             | Average entry price                                                                                                                                                                                      |
| &gt; closePriceAvg   | String             | Average close price                                                                                                                                                                                      |
| &gt; openSize        | String             | Open size                                                                                                                                                                                                |
| &gt; closeSize       | String             | Close size                                                                                                                                                                                               |
| &gt; achievedProfits | String             | Realized PnL                                                                                                                                                                                             |
| &gt; settleFee       | String             | Settle fee                                                                                                                                                                                               |
| &gt; openFee         | String             | Total open fee                                                                                                                                                                                           |
| &gt; closeFee        | String             | Total close fee                                                                                                                                                                                          |
| &gt; cTime           | String             | Position creation time, milliseconds format of Unix timestamp, e.g.1597026383085                                                                                                                         |
| &gt; uTime           | String             | Lastest position update time, milliseconds format of Unix timestamp, e.g.1597026383085                                                                                                                   |

> **Source:**
> https://www.bitget.com/api-doc/contract/websocket/private/History-Positions-Channel
