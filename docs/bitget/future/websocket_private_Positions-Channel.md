# Position Channel

### Description[​](#description "Direct link to Description")

Subscribe the position channel

Data will be pushed when the following events occurred:

1.  Open/Close orders are created
2.  Open/Close orders are filled
3.  Orders are canceled

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "USDT-FUTURES",            "channel": "positions",            "instId": "default"        }    ]}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter     | Type               | Required | Description                                                                                                                                      |
| :------------ | :----------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| op            | String             | Yes      | Operation, subscribe unsubscribe                                                                                                                 |
| args          | List&lt;Object&gt; | Yes      | List of channels to request subscription                                                                                                         |
| &gt; channel  | String             | Yes      | Channel name: <code>positions</code>                                                                                                             |
| &gt; instType | String             | Yes      | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures |
| &gt; instId   | String             | Yes      | Symbol name,<code>default</code>represents all the symbols，Only default is supported now                                                        |

Response Example

```
{    "event": "subscribe",    "arg": {        "instType": "USDT-FUTURES",        "channel": "positions",        "instId": "default"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type   | Description                                                                                                                                      |
| :------------ | :----- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| event         | String | Event                                                                                                                                            |
| arg           | Object | Subscribed channels                                                                                                                              |
| &gt; channel  | String | Channel name: <code>positions</code>                                                                                                             |
| &gt; instType | String | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures |
| &gt; instId   | String | <code>default</code>                                                                                                                             |
| code          | String | Error code                                                                                                                                       |
| msg           | String | Error message                                                                                                                                    |

Push Data

```
{    "action": "snapshot",    "arg": {        "instType": "USDT-FUTURES",        "channel": "positions",        "instId": "default"    },    "data": [        {            "posId": "1",            "instId": "ETHUSDT",            "marginCoin": "USDT",            "marginSize": "9.5",            "marginMode": "crossed",            "holdSide": "short",            "posMode": "hedge_mode",            "total": "0.1",            "available": "0.1",            "frozen": "0",            "openPriceAvg": "1900",            "leverage": 20,            "achievedProfits": "0",            "unrealizedPL": "0",            "unrealizedPLR": "0",            "liquidationPrice": "5788.108475905242",            "keepMarginRate": "0.005",            "marginRate": "0.004416374196",            "cTime": "1695649246169",            "breakEvenPrice": "24778.97",            "totalFee": "1.45",            "deductedFee": "0.388",            "markPrice": "2500",            "uTime": "1695711602568",                        "assetMode": "union",            "autoMargin": "off"        }    ],    "ts": 1695717430441}
```

### Push Parameters[​](#push-parameters "Direct link to Push Parameters")

| Parameter               | Type               | Description                                                                                                                                                                                               |
| :---------------------- | :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action                  | String             | 'snapshot'                                                                                                                                                                                                |
| arg                     | Object             | Channels with successful subscription                                                                                                                                                                     |
| &gt; channel            | String             | Channel name: <code>positions</code>                                                                                                                                                                      |
| &gt; instType           | String             | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures                                                          |
| &gt; instId             | String             | <code>default</code>                                                                                                                                                                                      |
| data                    | List&lt;Object&gt; | Subscription data                                                                                                                                                                                         |
| &gt; posId              | String             | Position ID                                                                                                                                                                                               |
| &gt; instId             | String             | Product ID,<br>delivery contract reference：<a href="https://www.bitget.com/api-doc/common/release-note" target="_blank" rel="noopener noreferrer">https://www.bitget.com/api-doc/common/release-note</a> |
| &gt; marginCoin         | String             | Currency of occupied margin                                                                                                                                                                               |
| &gt; marginSize         | String             | Occupied margin (amount)                                                                                                                                                                                  |
| &gt; marginMode         | String             | Margin mode                                                                                                                                                                                               |
| &gt; holdSide           | String             | Position direction                                                                                                                                                                                        |
| &gt; posMode            | String             | Position mode                                                                                                                                                                                             |
| &gt; total              | String             | Open position size                                                                                                                                                                                        |
| &gt; available          | String             | Size of positions that can be closed                                                                                                                                                                      |
| &gt; frozen             | String             | Amount of frozen margin                                                                                                                                                                                   |
| &gt; openPriceAvg       | String             | Average entry price                                                                                                                                                                                       |
| &gt; leverage           | String             | Leverage                                                                                                                                                                                                  |
| &gt; achievedProfits    | String             | Realized PnL                                                                                                                                                                                              |
| &gt; unrealizedPL       | String             | Unrealized PnL                                                                                                                                                                                            |
| &gt; unrealizedPLR      | String             | Unrealized ROI                                                                                                                                                                                            |
| &gt; liquidationPrice   | String             | Estimated liquidation price                                                                                                                                                                               |
| &gt; keepMarginRate     | String             | Maintenance margin rate                                                                                                                                                                                   |
| &gt; isolatedMarginRate | String             | Actual margin ratio under isolated margin mode                                                                                                                                                            |
| &gt; marginRate         | String             | Occupancy rate of margin                                                                                                                                                                                  |
| &gt; breakEvenPrice     | String             | Position breakeven price                                                                                                                                                                                  |
| &gt; totalFee           | String             | Funding fee, the accumulated value of funding fee during the position,The initial value is empty, indicating that no funding fee has been charged yet.                                                    |
| &gt; deductedFee        | String             | Deducted transaction fees: transaction fees deducted during the position                                                                                                                                  |
| &gt; markPrice          | String             | Mark Price                                                                                                                                                                                                |
| &gt; assetMode          | String             | Account Mode<br><code>union</code>: Union Margin<br><code>single</code>: Single Margin                                                                                                                    |
| &gt; cTime              | String             | Position creation time, milliseconds format of Unix timestamp, e.g.1597026383085                                                                                                                          |
| &gt; uTime              | String             | Lastest position update time, milliseconds format of Unix timestamp, e.g.1597026383085                                                                                                                    |

> **Source:**
> https://www.bitget.com/api-doc/contract/websocket/private/Positions-Channel
