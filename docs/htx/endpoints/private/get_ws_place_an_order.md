# GET ws Place an Order

**Source:**
[ws Place an Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1902a04fad1)

**Category:** Websocket Trade

## Authentication

Required (Private Endpoint)

### create_order (ws Place an Order)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: This interface supports websocket order placement for
Coin-M Swaps.

#### Subscription Address

| Environment                         | Address                       |
| ----------------------------------- | ----------------------------- |
| Online                              | wss://api.hbdm.com/swap-trade |
| Online (preferred by aws customers) | wss://api.hbdm.vn/swap-trade  |

#### Request Parameter

| Field Name | Type   | Description                             |
| ---------- | ------ | --------------------------------------- |
| op         | string | Required； Operator Name，create_order; |
| cid        | string | Optional; ID Client requests unique ID  |
| data       | string | Order parameters                        |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| -------------- | -------------------- | ---- |

#### Subscription Parameter

| Parameter           | Data Type | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Value Range                                                                                                                                                  | Default Value |
| ------------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| DATA_START          |           | false    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                              |               |
| contract_code       | string    | true     | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD"                                                                                                                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                              |               |
| client_order_id     | long      | false    | Clients fill and maintain themselves. the value must be in \[1, 9223372036854775807\]                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                              |               |
| price               | decimal   | false    | Price                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                              |               |
| volume              | long      | true     | Numbers of orders (volume)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                              |               |
| direction           | string    | true     | Transaction direction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                              |               |
| offset              | string    | true     | "open", "close"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                              |               |
| lever_rate          | int       | true     | Leverage rate \[if“Open”is multiple orders in 10 rate, there will be not multiple orders in 20 rate;Using Leverage greater than 20 times requires prior approval of high-leverage agreement for the first time.\]                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                              |               |
| order_price_type    | string    | true     | "limit”: Limit Order "opponent":BBO "post_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal_5： Optimal , optimal_10： Optimal 10, optimal_20：Optimal 20，ioc: IOC Order,fok：FOK Order, "opponent_ioc"：IOC order using the BBO price，"optimal_5_ioc"：optimal_5 IOC，"optimal_10_ioc"：optimal_10 IOC，"optimal_20_ioc"：optimal_20 IOC, "opponent_fok"：FOK order using the BBO price，"optimal_5_fok"：optimal_5 FOK，"optimal_10_fok"：optimal_10 FOK，"optimal_20_fok"：optimal_20 FOK |                                                                                                                                                              |               |
| tp_trigger_price    | decimal   | false    | Trigger price of take-profit order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                              |               |
| tp_order_price      | decimal   | false    | Order price of take-profit order（The order price is not required to fill in for Optimal N)                                                                                                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                              |               |
| tp_order_price_type | string    | false    | Order type of take-profit order default is limit; limit，optimal_5，optimal_10，optimal_20                                                                                                                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                              |               |
| sl_trigger_price    | decimal   | false    | Trigger price of stop-loss order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                              |               |
| sl_order_price      | decimal   | false    | Order price of stop-loss order（The order price is not required to fill in for Optimal N）                                                                                                                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                              |               |
| sl_order_price_type | string    | false    | Order type of stop-loss order default is limit; limit，optimal_5，optimal_10，optimal_20                                                                                                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                              |               |
| self_match_preven   | int       | false    | Self trading prevention                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |               |
| DATA_START          |           | false    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                              |               |
| cid                 | string    | false    | Current request's ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                              |               |

Notes: Post-Only orders are limit orders that will never take liquidity (also
called maker-only order). There are order limit and position for post-only
orders which the upper limit is 500,000 for open/close orders. If you’re holding
a position currently, the leverage you choose when placing an order should be
the same as the leverage of your current positions, otherwise, the order will
fail to be placed. If you need a new leverage to place an order, you should
switch the leverage of current positions first by using the Switch Leverage
interface. Only open orders can support setting take profit and stop loss. The
take profit trigger price is a required field for setting a take profit order,
and the stop loss trigger price is a required field for setting a stop loss
order; if the trigger price field is not filled in, the corresponding take
profit order or stop loss order will not be set. Description of post_only:
assure that the maker order remains as maker order, it will not be filled
immediately with the use of post_only, for the match system will automatically
check whether the price of the maker order is higher/lower than the opponent
first price, i.e. higher than bid price 1 or lower than the ask price 1. If yes,
the maker order will placed on the orderbook, if not, the maker order will be
cancelled. open long: direction - buy、offset - open close long: direction
-sell、offset - close open short: direction -sell、offset - open close short:
direction -buy、offset - close No need to transfer BBO order price(ask 1 and
bid 1) parameter, optimal_5: top 5 optimal BBO price, optimal_10：top 10 optimal
BBO price, optimal_20：top 20 optimal BBO price (No need to transfer price
data) ，limit": limit order, "post_only": maker order only (price data transfer
is needed),IOC :Immediate-Or-cancel Order,FOK:Fill-Or-Kill Order. Risk
Reminder:By using Best Bid/Offer( bbo ), you are to place limit orders at the
best prices offered by the opposite side. In the event of extreme volatility or
insufficient liquidity，there is a risk that your orders may not be filled in
full. Any unfilled part will remain open in the market pending further
execution. Selecting BBO means you understand how this order type is executed
and acknowledge to bear the risk of incomplete execution.

#### Data Update

| Parameter       | Data Type | Required | Description                                                                                        | Value Range    |
| --------------- | --------- | -------- | -------------------------------------------------------------------------------------------------- | -------------- |
| status          | string    | true     | Request Processing Result                                                                          | "ok" , "error" |
| DATA_START      |           | false    |                                                                                                    |                |
| order_id        | long      | true     | Order ID                                                                                           |                |
| order_id_str    | string    | true     | Order ID                                                                                           |                |
| client_order_id | long      | true     | the client ID that is filled in when the order is placed, if it’s not filled, it won’t be returned |                |
| DATA_END        |           | false    |                                                                                                    |                |
| ts              | long      | true     | Time of Respond Generation, Unit: Millisecond                                                      |                |

Notes: The return order_id is 18 bits, it will make mistake when nodejs and
JavaScript analysed 18 bits. Because the Json.parse in nodejs and JavaScript is
int by default. so the number over 18 bits need be parsed by json-bigint
package.

#### Subscription Example

{

"op":

"create_order"

"cid":

"40sG903yz80oDFWr"

"data":{

"contract_code":

"bch210326"

"client_order_id":

123456

"direction":

"buy"

"offset":

"open"

"price":

360

"lever_rate":

75

"volume":

1

"order_price_type":

"opponent"

"tp_trigger_price":

450

"tp_order_price":

450

"tp_order_price_type":

"optimal_5"

"sl_trigger_price":

330

"sl_order_price":

330

"sl_order_price_type":

"optimal_5"

}

}

#### Example of a Successful Subscription

`{ "status": "ok", "cid": "40sG903yz80oDFWr", "data": { "order_id": 773119326353580000, "client_order_id":, "order_id_str": "773119326353580033" }, "ts": 1604367611267 }`

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data
