# GET [Cross] ws Place an Order

**Source:** [[Cross] ws Place an Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1902650839d)

**Category:** Websocket Trade

## Authentication

Required (Private Endpoint)

### create\_cross\_order (\[Cross\] ws Place an Order )

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: This interface only supports websocket contract orders in cross position mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-trade |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-trade |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name， create\_cross\_order; |
| cid | string | Optional; ID Client requests unique ID |
| data | string | Order parameters |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| DATA\_START |  | false |  |  |  |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| reduce\_only | int | false | reduce only(in hedge mode it is invalid, and in one-way mode it's value is 0 when not filled.) | 0: no, 1: yes |  |
| client\_order\_id | long | false | Clients fill and maintain themselves. | \[1, 9223372036854775807\] |  |
| price | decimal | false | price |  |  |
| volume | long | true | Numbers of orders (volume) |  |  |
| direction | string | true | Transaction direction | "buy"/"sell" |  |
| offset | string | false | "open", "close" | "open","close","both" |  |
| lever\_rate | int | true | leverage \[ if“Open”is multiple orders in 10 rate, there will be not multiple orders in 20 rate; high leverage has a high risk factor, so please use it with caution. |  |  |
| order\_price\_type | string | true | order price type | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |  |
| tp\_trigger\_price | decimal | false | Trigger price of take-profit order |  |  |
| tp\_order\_price | decimal | false | Order price of take-profit order（The order price is not required to fill in for Optimal N) |  |  |
| tp\_order\_price\_type | string | false | Order type of take-profit order default is limit; | default is market; market，limit，optimal\_5，optimal\_10，optimal\_20 |  |
| sl\_trigger\_price | decimal | false | Trigger price of stop-loss order |  |  |
| sl\_order\_price | decimal | false | Order price of stop-loss order（The order price is not required to fill in for Optimal N） |  |  |
| sl\_order\_price\_type | string | false | Order type of stop-loss order default is limit; | default is market; market，limit，optimal\_5，optimal\_10，optimal\_20 |  |
| self\_match\_prevent | int | false | Self trading prevention | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |  |
| self\_match\_prevent\_new | string | false | Prevent self-trading | cancel\_taker: Cancel a taker order cancel\_maker: Cancel a maker order cancel\_both: Cancel all orders | cancel\_taker by default. |
| DATA\_START |  | false |  |  |  |
| cid | string | false | Current request's ID |  |  |

Notes: "limit"，"post\_only"，"ioc" and "fok" the four order price type need price value and the other don't need. Post-Only orders are limit orders that will never take liquidity (also called maker-only order). There are order limit and position for post-only orders which the upper limit is 5,000,000 for open/close orders. If you’re holding a position currently, the leverage you choose when placing an order should be the same as the leverage of your current positions, otherwise, the order will fail to be placed. If you need a new leverage to place an order, you should switch the leverage of current positions first by using the Switch Leverage interface. Only open orders can support setting take profit and stop loss. The take profit trigger price is a required field for setting a take profit order, and the stop loss trigger price is a required field for setting a stop loss order; if the trigger price field is not filled in, the corresponding take profit order or stop loss order will not be set. Description of post\_only: assure that the maker order remains as maker order, it will not be filled immediately with the use of post\_only, for the match system will automatically check whether the price of the maker order is higher/lower than the opponent first price, i.e. higher than bid price 1 or lower than the ask price 1. If yes, the maker order will placed on the orderbook, if not, the maker order will be cancelled. offset, in hedge mode it is a required field, and in one-way mode it is optional paramater which's value must be both when filled. open long: direction - buy、offset - open close long: direction -sell、offset - close open short: direction -sell、offset - open close short: direction -buy、offset - close No need to transfer BBO order price(ask 1 and bid 1) parameter, optimal\_5: top 5 optimal BBO price, optimal\_10：top 10 optimal BBO price, optimal\_20：top 20 optimal BBO price (No need to transfer price data) ，limit": limit order, "post\_only": maker order only (price data transfer is needed),IOC :Immediate-Or-cancel Order,FOK:Fill-Or-Kill Order. Risk Reminder:By using Best Bid/Offer( bbo ), you are to place limit orders at the best prices offered by the opposite side. In the event of extreme volatility or insufficient liquidity，there is a risk that your orders may not be filled in full. Any unfilled part will remain open in the market pending further execution. Selecting BBO means you understand how this order type is executed and acknowledge to bear the risk of incomplete execution.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result |  |
| DATA\_START |  | false |  |  |
| order\_id | long | true | Order ID |  |
| order\_id\_str | string | true | Order ID |  |
| client\_order\_id | long | true | the client ID that is filled in when the order is placed, if it’s not filled, it won’t be returned |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

Notes: The return order\_id is 18 bits, it will make mistake when nodejs and JavaScript analysed 18 bits. Because the Json.parse in nodejs and JavaScript is int by default. so the number over 18 bits need be parsed by json-bigint package

#### Subscription Example

{

"op":

"create\_cross\_order"

"cid":

"40sG903yz80oDFWr"

"data":{

"contract\_code":

"btc-usdt"

"direction":

"buy"

"offset":

"open"

"price":

"29999"

"lever\_rate":

5

"volume":

1

"order\_price\_type":

"opponent"

"tp\_trigger\_price":

31000

"tp\_order\_price":

31000

"tp\_order\_price\_type":

"optimal\_5"

"sl\_trigger\_price":

"29100"

"sl\_order\_price":

"29100"

"sl\_order\_price\_type":

"optimal\_5"

}

}

#### Example of a Successful Subscription

{

"status":

"ok"

"cid":

"40sG903yz80oDFWr"

"data":{

"order\_id":

770323133537685500

"client\_order\_id":

57012021022

"order\_id\_str":

"770323133537685504"

}

"ts":

1603700946949

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data