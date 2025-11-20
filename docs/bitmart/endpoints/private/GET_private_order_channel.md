# GET 【Private】Order Channel

**Source:** [【Private】Order Channel](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## 【Private】Order Channel

Order Channel, which pushes immediately when the order status, transaction amount, etc. changes.

### Pushing Rules

1.  User login required
2.  After subscribing, then the changes will be pushed

### Request

> Request

```json
{
  "action": "subscribe",
  "args": [
    "futures/order"
  ]
}
```

Message Format:

```json
{
  "action": "subscribe",
  "args": [
    "<channel>"
  ]
}
```

-   actions: `subscribe`
-   channel: Channel name `futures/order`, fixed value

### Response

> Response

```json
{
  "group": "futures/order",
  "data": [
    {
      "action": 3,
      "order": {
        "order_id": "220906179895578",
        "client_order_id": "BM1234",
        "price": "1",
        "size": "1000",
        "symbol": "BTCUSDT",
        "state": 2,
        "side": 1,
        "type": "limit",
        "leverage": "5",
        "open_type": "isolated",
        "deal_avg_price": "0",
        "deal_size": "0",
        "create_time": 1662368173000,
        "update_time": 1662368173000,
        "plan_order_id": "220901412155341",
        "last_trade": {
          "lastTradeID": 1247592391,
          "fillQty": "1",
          "fillPrice": "25667.2",
          "fee": "-0.00027",
          "feeCcy": "USDT"
        },
        "trigger_price": "-",
        "trigger_price_type": "-",
        "execution_price": "-",
        "activation_price_type": "-",
        "activation_price": "-",
        "callback_rate": "-",
        "position_mode": "hedge_mode"
      }
    }
  ]
}
```

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| action | Int | Action  
\-`1`\=match deal  
\-`2`\=submit order  
\-`3`\=cancel order  
\-`4`\=liquidate cancel order  
\-`5`\=adl cancel order  
\-`6`\=part liquidate  
\-`7`\=bankruptcy order  
\-`8`\=passive adl match deal  
\-`9`\=active adl match deal |
| symbol | String | Symbol of the contract |
| order\_id | String | Order ID |
| client\_order\_id | String | Client-defined OrderId |
| side | Int | Order side  
hedge mode  
\-`1`\=buy\_open\_long  
\-`2`\=buy\_close\_short  
\-`3`\=sell\_close\_long  
\-`4`\=sell\_open\_short  
oneway mode  
\-`1`\=buy  
\-`2`\=buy(reduce only)  
\-`3`\=sell(reduce only)  
\-`4`\=sell |
| type | String | Order type  
\-`limit`  
\-`market`  
\-`plan_order`  
\-`trailing_order`  
\-`take_profit`  
\-`stop_loss` |
| leverage | String | Leverage order multipliers |
| open\_type | String | Open type  
\-`cross`  
\-`isolated` |
| deal\_avg\_price | String | Average deal price |
| deal\_size | String | Deal amount |
| price | String | Consignment price |
| state | Int | Order status  
\-`1`\=status\_approval  
\-`2`\=status\_check  
\-`4`\=status\_finish |
| create\_time | Long | Order created timestamp (ms) |
| update\_time | Long | Order updated timestamp (ms) |
| plan\_order\_id | String | Trigger plan order id |
| last\_trade | object | recently trade info for this order，return null if not exist |
| trigger\_price | String | Trigger price of TP/SL / plan order |
| trigger\_price\_type | String | Trigger price type of TP/SL / plan order  
\-`last_price`  
\-`fair_price` |
| execution\_price | String | Execution price of TP/SL / plan order |
| activation\_price | String | Activation price |
| activation\_price\_type | String | Activation price type  
\-`last_price`  
\-`fair_price` |
| callback\_rate | String | Call back rate of trailing stop order |
| position\_mode | String | Position mode  
\-`hedge_mode`  
\-`one_way_mode` |

`last_trade` fields describe：

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| lastTradeID | Long | recently trade id |
| fillQty | String | last trade deal vol |
| fillPrice | String | last trade deal price |
| fee | String | last trade fee |
| feeCcy | String | last trade fee coin name |