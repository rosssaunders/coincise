# GET [Cross] Place A Batch Of Orders

**Source:**
[[Cross] Place A Batch Of Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb848f6-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_batchorder (\[Cross\] Place A Batch Of Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The
request parameter "contract_code" supports the contract code of futures, in that
the format is BTC-USDT-210625. one of (pair+contract_type) and contract_code
must be filled in(if all of them not filled in, will get 1014 error code); and
all filled in, the contract_code is the preferred.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter              | Data Type    | Required | Description                                                                                                                                                           | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Default Value            |
| ---------------------- | ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| ORDERS_DATA_START      | object array | true     |                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                          |
| contract_code          | string       | false    | contract code                                                                                                                                                         | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |                          |
| pair                   | string       | false    | pair                                                                                                                                                                  | BTC-USDT                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                          |
| contract_type          | string       | false    | contract type                                                                                                                                                         | swap, this_week, next_week, quarter, next_quarter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                          |
| reduce_only            | int          | false    | reduce only(in hedge mode it is invalid, and in one-way mode it's value is 0 when not filled.)                                                                        | 0: no, 1: yes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                          |
| client_order_id        | long         | false    | Clients fill and maintain themselves.                                                                                                                                 | \[1, 9223372036854775807\]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |                          |
| price                  | decimal      | false    | price                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                          |
| volume                 | long         | true     | Numbers of orders (volume)                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                          |
| direction              | string       | true     | Transaction direction                                                                                                                                                 | "buy"/"sell"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |                          |
| offset                 | string       | false    | offset                                                                                                                                                                | "open","close","both"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |                          |
| lever_rate             | int          | true     | leverage \[ if“Open”is multiple orders in 10 rate, there will be not multiple orders in 20 rate; high leverage has a high risk factor, so please use it with caution. |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                          |
| order_price_type       | string       | true     | order price type                                                                                                                                                      | "market": Market Order，"limit”: Limit Order "opponent":BBO "post_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal_5： Optimal , optimal_10： Optimal 10, optimal_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent_ioc"：IOC order using the BBO price，"optimal_5_ioc"：optimal_5 IOC，"optimal_10_ioc"：optimal_10 IOC，"optimal_20_ioc"：optimal_20 IOC, "opponent_fok"：FOK order using the BBO price，"optimal_5_fok"：optimal_5 FOK，"optimal_10_fok"：optimal_10 FOK，"optimal_20_fok"：optimal_20 FOK |                          |
| tp_trigger_price       | decimal      | false    | Trigger price of take-profit order                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                          |
| tp_order_price         | decimal      | false    | Order price of take-profit order（The order price is not required to fill in for Optimal N)                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                          |
| tp_order_price_type    | string       | false    | Order type of take-profit order default is limit;                                                                                                                     | default is market; market，limit，optimal_5，optimal_10，optimal_20，optimal_5，optimal_10，optimal_20                                                                                                                                                                                                                                                                                                                                                                                                                                                         |                          |
| sl_trigger_price       | decimal      | false    | Trigger price of stop-loss order                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                          |
| sl_order_price         | decimal      | false    | Order price of stop-loss order（The order price is not required to fill in for Optimal N）                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                          |
| sl_order_price_type    | string       | false    | Order type of stop-loss order default is limit;                                                                                                                       | default is market; market，limit，optimal_5，optimal_10，optimal_20，optimal_5，optimal_10，optimal_20                                                                                                                                                                                                                                                                                                                                                                                                                                                         |                          |
| price_protect          | boolean      | false    | price protection, default is false. This parameter is only required when setting tp/sl                                                                                | true or false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                          |
| self_match_prevent     | int          | false    | Self trading prevention                                                                                                                                               | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1.                                                                                                                                                                                                                                                                                                                                                                                                   |                          |
| self_match_prevent_new | string       | false    | Prevent self-trading                                                                                                                                                  | cancel_taker: Cancel a taker order cancel_maker: Cancel a maker order cancel_both: Cancel all orders                                                                                                                                                                                                                                                                                                                                                                                                                                                           | cancel_taker by default. |
| ORDERS_DATA_END        |              | false    |                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                          |

Notes:  
"limit"，"post_only"，"ioc" and "fok" the four order price type need price value
and the other don't need.  
Description of post_only: assure that the maker order remains as maker order, it
will not be filled immediately with the use of post_only, for the match system
will automatically check whether the price of the maker order is higher/lower
than the opponent first price, i.e. higher than bid price 1 or lower than the
ask price 1. If yes, the maker order will placed on the orderbook, if not, the
maker order will be cancelled.  
If you’re holding a position currently, the leverage you choose when placing an
order should be the same as the leverage of your current positions, otherwise,
the order will fail to be placed. If you need a new leverage to place an order,
you should switch the leverage of current positions first by using the Switch
Leverage interface.  
Only open orders can support setting take profit and stop loss.  
The take profit trigger price is a required field for setting a take profit
order, and the stop loss trigger price is a required field for setting a stop
loss order; if the trigger price field is not filled in, the corresponding take
profit order or stop loss order will not be set.  
No need to transfer BBO order price(ask 1 and bid 1) parameter, optimal_5: top 5
optimal BBO price, optimal_10：top 10 optimal BBO price, optimal_20：top 20
optimal BBO price (No need to transfer price data) ，limit": limit order,
"post_only": maker order only (price data transfer is needed),IOC
:Immediate-Or-Cancel Order,FOK:Fill-Or-Kill Order.  
offset, in hedge mode it is a required field, and in one-way mode it is optional
paramater which's value must be both when filled.  
25 orders at most  
Risk Reminder:By using Best Bid/Offer( bbo ), you are to place limit orders at
the best prices offered by the opposite side. In the event of extreme volatility
or insufficient liquidity，there is a risk that your orders may not be filled in
full. Any unfilled part will remain open in the market pending further
execution. Selecting BBO means you understand how this order type is executed
and acknowledge to bear the risk of incomplete execution.

#### Response Parameter

| Parameter       | Data Type    | Required | Description                                                                                        | Value Range    |
| --------------- | ------------ | -------- | -------------------------------------------------------------------------------------------------- | -------------- |
| status          | string       | true     | Request Processing Result                                                                          | "ok" , "error" |
| DATA_START      | object       | true     |                                                                                                    |                |
| ERRORS_START    | object array | true     |                                                                                                    |                |
| index           | int          | true     | order index                                                                                        |                |
| err_code        | int          | true     | error code                                                                                         |                |
| err_msg         | string       | true     | error message                                                                                      |                |
| ERRORS_END      |              | false    |                                                                                                    |                |
| SUCCESS_START   |              | false    |                                                                                                    |                |
| index           | int          | true     | order index                                                                                        |                |
| order_id        | long         | true     | order ID                                                                                           |                |
| order_id_str    | string       | true     | order ID                                                                                           |                |
| client_order_id | long         | true     | the client ID that is filled in when the order is placed, if it’s not filled, it won’t be returned |                |
| SUCCESS_END     |              | false    |                                                                                                    |                |
| DATA_END        |              | false    |                                                                                                    |                |
| ts              | long         | true     | Time of Respond Generation, Unit: Millisecond                                                      |                |

Notes:  
The return order_id is 18 bits, it will make mistake when nodejs and JavaScript
analysed 18 bits. Because the Json.parse in nodejs and JavaScript is int by
default. so the number over 18 bits need be parsed by json-bigint package.

#### Request example

{

"orders_data":\[

0:{

"contract_code":

"btc-usdt"

"direction":

"sell"

"offset":

"open"

"price":

"29999"

"lever_rate":

5

"volume":

1

"order_price_type":

"opponent"

"tp_trigger_price":

27000

"tp_order_price":

27000

"tp_order_price_type":

"optimal_5"

"sl_trigger_price":

"30100"

"sl_order_price":

"30100"

"sl_order_price_type":

"optimal_5"

}

1:{

"contract_code":

"btc-usdt"

"direction":

"buy"

"offset":

"open"

"price":

"29999"

"lever_rate":

5

"volume":

1

"order_price_type":

"post_only"

"tp_trigger_price":

31000

"tp_order_price":

31000

"tp_order_price_type":

"optimal_5"

"sl_trigger_price":

"29100"

"sl_order_price":

"29100"

"sl_order_price_type":

"optimal_5"

}

\]

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"errors":\[

0:{

"index":

2

"err_code":

1045

"err_msg":

"Unable to switch leverage due to open orders."

}

\]

"success":\[

0:{

"order_id":

784022175422087200

"index":

1

"order_id_str":

"784022175422087168"

}

\]

}

"ts":

1606967053089

}
