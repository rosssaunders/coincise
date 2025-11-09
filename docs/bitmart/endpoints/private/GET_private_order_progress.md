# GET 【Private】Order Progress

**Source:**
[【Private】Order Progress](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## 【Private】Order Progress

Subscribe to the order execution progress of a single trading pair, or you can
subscribe to the order execution progress of all trading pairs at once.

### Pushing Rules

1.  User login required
2.  Qualified orders will be pushed (Successfully placed an order, Partially
    filled, Fully filled, Canceled)
3.  Push frequency: Push when changes

### Subscribe Request

> Order transaction progress subscription request for a single trading pair

`{   "op": "subscribe",    "args": ["spot/user/order:BTC_USDT"] }`

> Order transaction progress subscription request for all trading pairs

`{   "op": "subscribe",    "args": ["spot/user/orders:ALL_SYMBOLS"] }`

Message Format:

1.The order transaction progress subscription of a single trading pair:

`{"op": "subscribe", "args": ["spot/user/order:<symbol>"]}`

- channel: Channel name, such as `spot/user/order`
- symbol: Trading pair, such as `BTC_USDT`

2.The order transaction progress of all trading pairs:

- channel: Channel name, such as `spot/user/orders`
- symbol: All Trading pair, fixed value: `ALL_SYMBOLS`

**Note: The channel names subscribed to for a single trading pair and all
trading pairs are different**

### Subscription successful

> Single trading pair subscription successful

`{   "event":  "subscribe",   "topic":  "spot/user/order:BTC_USDT" }`

1.The order transaction progress subscription of a single trading pair was
successfully subscribed.

`{"event":"subscribe","topic":"spot/user/order:<symbol>"}`

> All trading pairs subscription successful

`{   "event":  "subscribe",   "topic":  "spot/user/orders:ALL_SYMBOLS" }`

2.The order transaction progress of all trading pairs has been successfully
subscribed.

`{"event":"subscribe","topic":"spot/user/orders:ALL_SYMBOLS"}`

### After successful subscription, push data

> Push data

`{     "data":[         {             "symbol":"BTC_USDT",             "side":"buy",             "type":"market",             "notional":"",             "size":"1.0000000000",             "ms_t":"1609926028000",             "price":"46100.0000000000",             "filled_notional":"46100.0000000000",             "filled_size":"1.0000000000",             "margin_trading":"0",             "state":"4",             "order_id":"2147857398",             "order_type":"0",             "last_fill_time":"1609926039226",             "last_fill_price":"46100.00000",             "last_fill_count":"1.00000",             "exec_type":"M",             "detail_id":"256348632",             "client_order_id":"order4872191",             "create_time":"1609926028000",             "update_time":"1609926044000",             "order_mode":"0",             "entrust_type":"normal",             "order_state":"partially_filled",             "dealFee":"10.00",             "deal_fee_coin_name":"BMX"         }     ],     "table":"spot/user/order" }`

Return data description:

| Field    | Type   | Description                                                                                       |
| -------- | ------ | ------------------------------------------------------------------------------------------------- |
| symbol   | string | Trading pair, `BTC_USDT`                                                                          |
| order_id | string | Order ID                                                                                          |
| price    | string | Order price                                                                                       |
| size     | string | Order quantity                                                                                    |
| notional | string | The purchase amount, returned when buying at market price; otherwise, an empty string is returned |
| side     | string | Side                                                                                              |

\-`buy`  
\-`sell` | | type | string | Type  
\-`limit`  
\-`market` | | ms_t | string | Order Create Timestamp (in milliseconds) | |
filled_size | string | Filled size (Base currency) | | filled_notional | string
| Filled notional amount (Quote currency) | | margin_trading | string |
`0`：Spot order (The field will be removed, please use the order_mode field) | |
order_type | string | Order type (The field will be removed, please use the
entrust_type field)  
\-`0`\=Regular  
\-`1`\=Maker only(Post only)  
\-`2`\=Fill or kill(FOK)  
\-`3`\=Immediate or Cancel(IOC) | | state | string | Order state (The field will
be removed, please use the order_state field)  
\-`4`\=Order success, Pending for fulfilment  
\-`5`\=Partially filled  
\-`6`\=Fully filled  
\-`8`\=Canceled  
\-`12`\=Canceled after Partially filled | | last_fill_price | string | Latest
trade price(0 if not filled) | | last_fill_count | string | Latest trade
quantity(0 if not filled） | | last_fill_time | string | Latest trade time(0 if
not filled) millisecond | | exec_type | string | Whether the trade was created
by a maker or a taker.  
\-`M`\=Maker  
\-`T`\=Taker | | detail_id | string | Trade id | | client_order_id | string |
Client-defined OrderId | | create_time | String | Order Create Timestamp (in
milliseconds) | | update_time | String | Order Update Timestamp (in
milliseconds) | | order_mode | String | Order mode  
\-`spot`\=spot  
\-`iso_margin`\=margin | | entrust_type | String | Order Type  
\-`NORMAL`\=Normal trade order(Limit Order or Market Order)  
\-`LIMIT_MAKER`\=PostOnly Order  
\-`IOC`\=IOC Order | | order_state | String | Order State  
\-`new`\=The order has been accepted by the engine.  
\-`partially_filled`\=A part of the order has been filled.  
\-`filled`\=The order has been completed.  
\-`canceled`\=The order has been canceled by the user.  
\-`partially_canceled`\=A part of the order has been filled , and the order has
been canceled. | | dealFee | String | Fee | | deal_fee_coin_name | String | Fee
coin name |

**Notice：This data is displayed after decompression,
[Refer to Data Compression for details](#data-compression)**
