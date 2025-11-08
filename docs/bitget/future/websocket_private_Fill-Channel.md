# Fill Channel

Data will be pushed when order filled.

### Description[​](#description "Direct link to Description")

Trade details channel

Data will be pushed when order filled.

Request Example

```
{    "op": "subscribe",    "args": [        {            "instType": "USDT-FUTURES",            "channel": "fill",            "instId": "default"        }    ]}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| op | String | Yes | Operation, subscribe unsubscribe 
| args | List&lt;Object&gt; | Yes | List of channels to request subscription 
| &gt; channel | String | Yes | Channel name: <code>fill</code> 
| &gt; instType | String | Yes | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 
| &gt; instId | String | No | Product ID or default，<br>delivery contract reference：<a href="https://www.bitget.com/api-doc/common/release-note#optimization-of-delivery-futures" target="_blank" rel="noopener noreferrer">https://www.bitget.com/api-doc/common/release-note#optimization-of-delivery-futures</a> 

Response Example

```
{    "event": "subscribe",    "arg": {        "instType": "USDT-FUTURES",        "channel": "fill",        "instId": "default"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| event | String | Event 
| arg | Object | Subscribed channels 
| &gt; channel | String | Channel name: <code>fill</code> 
| &gt; instType | String | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 
| &gt; instId | String | Product ID or default<br>delivery contract reference：<a href="https://www.bitget.com/api-doc/common/release-note#optimization-of-delivery-futures" target="_blank" rel="noopener noreferrer">https://www.bitget.com/api-doc/common/release-note#optimization-of-delivery-futures</a> 
| code | String | Error code 
| msg | String | Error message 

Push Data

```
{    "action":"snapshot",    "arg":{        "instType":"USDT-FUTURES",        "channel":"fill",        "instId":"default"    },    "data":[        {            "orderId":"111",            "clientOid":"111",            "tradeId":"222",            "symbol":"BTCUSDT",            "side":"buy",            "orderType":"market",            "posMode":"one_way_mode",            "price":"51000.5",            "baseVolume":"0.01",            "quoteVolume":"510.005",            "profit":"0",            "tradeSide":"open",            "tradeScope":"taker",            "feeDetail":[                {                    "feeCoin":"USDT",                    "deduction":"no",                    "totalDeductionFee":"0",                    "totalFee":"-0.183717"                }            ],            "cTime":"1703577336606",            "uTime":"1703577336606"        }    ],    "ts":1703577336700}
```

### 推送数据参数[​](#推送数据参数 "Direct link to 推送数据参数")

| 返回字段 | 参数类型 | 字段说明 |
| :-- | :-- | :-- |
| action | String | <code>snapshot</code> 
| arg | Object | Channels with successful subscription 
| &gt; channel | String | Channel name: <code>fill</code> 
| &gt; instType | String | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 
| &gt; instId | String | Product ID or default<br>delivery contract reference：<a href="https://www.bitget.com/api-doc/common/release-note#optimization-of-delivery-futures" target="_blank" rel="noopener noreferrer">https://www.bitget.com/api-doc/common/release-note#optimization-of-delivery-futures</a> 
| data | List&lt;Object&gt; | Subscription data 
| &gt; orderId | String | Order ID 
| &gt; clientOid | String | Customize order ID 
| &gt; tradeId | String | Trade ID 
| &gt; symbol | String | Symbol Name 
| &gt; side | String | Trade direction<br><code>buy</code>: Buy<br><code>sell</code>: Sell<br>Please note, for this channel, in hedge position mode, <strong>Open Long</strong> and <strong>Close Short</strong>, the "side" will be <code>buy</code>; <strong>Close Long</strong> and <strong>Open Short</strong>, the "side" will be <code>sell</code> 
| &gt; orderType | String | Order type<br><code>limit </code>limit order<br><code>market</code> market order 
| &gt; posMode | String | Hold Mode<br><code>one_way_mode</code><br><code>hedge_mode</code> 
| &gt; price | String | Order price 
| &gt; baseVolume | String | Amount of base coin 
| &gt; quoteVolume | String | Amount of denomination coin 
| &gt; profit | String | Realized PnL 
| &gt; tradeSide | String | Trade type<br><code>close</code>: Close (open and close mode)<br><code>open</code>: Open (open and close mode)<br><code>reduce_close_long</code>: Liquidate partial long positions for hedge position mode<br><code>reduce_close_short</code>：Liquidate partial short positions for hedge position mode<br><code>burst_close_long</code>：Liquidate long positions for hedge position mode<br><code>burst_close_short</code>：Liquidate short positions for hedge position mode<br><code>offset_close_long</code>：Liquidate partial long positions for netting for hedge position mode<br><code>offset_close_short</code>：Liquidate partial short positions for netting for hedge position mode<br><code>delivery_close_long</code>：Delivery long positions for hedge position mode<br><code>delivery_close_short</code>：Delivery short positions for hedge position mode<br><code>dte_sys_adl_close_long</code>：ADL close long position for hedge position mode<br><code>dte_sys_adl_close_short</code>：ADL close short position for hedge position mode<br><code>buy_single</code>：Buy, one way postion mode<br><code>sell_single</code>：Sell, one way postion mode<br><code>reduce_buy_single</code>：Liquidate partial positions, buy, one way position mode<br><code>reduce_sell_single</code>：Liquidate partial positions, sell, one way position mode<br><code>burst_buy_single</code>：Liquidate short positions, buy, one way postion mode<br><code>burst_sell_single</code>：Liquidate partial positions, sell, one way position mode<br><code>delivery_sell_single</code>：Delivery sell, one way position mode<br><code>delivery_buy_single</code>：Delivery buy, one way position mode<br><code>dte_sys_adl_buy_in_single_side_mode</code>：ADL close position, buy, one way position mode<br><code>dte_sys_adl_sell_in_single_side_mode</code>：ADL close position, sell, one way position mode 
| &gt; tradeScope | String | The liquidity direction<br><code>taker</code><br><code>maker</code> 
| &gt; feeDetail | List&lt;Object&gt; | Transaction fee of the order 
| &nbsp;&nbsp;&gt;&gt; deduction | String | deduction<br><code>yes</code><br><code>no</code> 
| &nbsp;&nbsp;&gt;&gt; totalDeductionFee | String | Fee of deduction 
| &nbsp;&nbsp;&gt;&gt; totalFee | String | Fee of all 
| &nbsp;&nbsp;&gt;&gt; feeCoin | String | Currency of transaction fee 
| &gt; cTime | String | Create Time，milliseconds format of Unix timestamp, e.g.1597026383085 
| &gt; uTime | String | Update Time，milliseconds format of Unix timestamp, e.g.1597026383085

> **Source:** https://www.bitget.com/api-doc/contract/websocket/private/Fill-Channel
