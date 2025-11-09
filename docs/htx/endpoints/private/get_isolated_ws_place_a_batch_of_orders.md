# GET [Isolated] ws Place a Batch of Orders

**Source:** [[Isolated] ws Place a Batch of Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-190266ce558)

**Category:** Websocket Trade

## Authentication

Required (Private Endpoint)

### create\_batchorder (\[Isolated\] ws Place a Batch of Orders)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: This interface only supports batch orders for websocket contracts in isolated position mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-trade |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-trade |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name， create\_batchorder |
| cid | string | Optional; ID Client requests unique ID |
| data | string | batch order parameters |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| DATA\_START |  | false |  |  |  |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |  |
| reduce\_only | int | false | reduce only(in hedge mode it is invalid, and in one-way mode it's value is 0 when not filled.) 0: no, 1: yes |  |  |
| client\_order\_id | long | false | Clients fill and maintain themselves. the value must be in \[1, 9223372036854775807\] |  |  |
| price | decimal | false | Price |  |  |
| volume | long | true | Numbers of orders (volume) |  |  |
| direction | string | true | Transaction direction |  |  |
| offset | string | false | "open", "close", "both" |  |  |
| lever\_rate | int | true | Leverage rate \[ if“Open”is multiple orders in 10 rate, there will be not multiple orders in 20 rate; high leverage has a high risk factor, so please use it with caution. |  |  |
| order\_price\_type | string | true | order price type | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |  |
| tp\_trigger\_price | decimal | false | Trigger price of take-profit order |  |  |
| tp\_order\_price | decimal | false | Order price of take-profit order（The order price is not required to fill in for Optimal N) |  |  |
| tp\_order\_price\_type | string | false | Order type of take-profit order default is limit; limit，optimal\_5，optimal\_10，optimal\_20 | default is market; market，limit，optimal\_5，optimal\_10，optimal\_20 |  |
| sl\_trigger\_price | decimal | false | Trigger price of stop-loss order |  |  |
| sl\_order\_price | decimal | false | Order price of stop-loss order（The order price is not required to fill in for Optimal N） |  |  |
| sl\_order\_price\_type | string | false | Order type of stop-loss order default is limit; limit，optimal\_5，optimal\_10，optimal\_20 | default is market; market，limit，optimal\_5，optimal\_10，optimal\_20 |  |
| self\_match\_prevent | int | false | Self trading prevention | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |  |
| self\_match\_prevent\_new | string | false | Prevent self-trading | cancel\_taker: Cancel a taker order cancel\_maker: Cancel a maker order cancel\_both: Cancel all orders | cancel\_taker by default. |
| DATA\_START |  | false |  |  |  |
| cid | string | false | Current request's ID |  |  |

Notes: "limit"，"post\_only"，"ioc" and "fok" the four order price type need price value and the other don't need. Description of post\_only: assure that the maker order remains as maker order, it will not be filled immediately with the use of post\_only, for the match system will automatically check whether the price of the maker order is higher/lower than the opponent first price, i.e. higher than bid price 1 or lower than the ask price 1. If yes, the maker order will placed on the orderbook, if not, the maker order will be cancelled. If you’re holding a position currently, the leverage you choose when placing an order should be the same as the leverage of your current positions, otherwise, the order will fail to be placed. If you need a new leverage to place an order, you should switch the leverage of current positions first by using the Switch Leverage interface. Only open orders can support setting take profit and stop loss. The take profit trigger price is a required field for setting a take profit order, and the stop loss trigger price is a required field for setting a stop loss order; if the trigger price field is not filled in, the corresponding take profit order or stop loss order will not be set. No need to transfer BBO order price(ask 1 and bid 1) parameter, optimal\_5: top 5 optimal BBO price, optimal\_10：top 10 optimal BBO price, optimal\_20：top 20 optimal BBO price (No need to transfer price data) ，limit": limit order, "post\_only": maker order only (price data transfer is needed),IOC :Immediate-Or-cancel Order,FOK:Fill-Or-Kill Order. offset, in hedge mode it is a required field, and in one-way mode it is optional paramater which's value must be both when filled. 10 orders at most Risk Reminder:By using Best Bid/Offer( bbo ), you are to place limit orders at the best prices offered by the opposite side. In the event of extreme volatility or insufficient liquidity，there is a risk that your orders may not be filled in full. Any unfilled part will remain open in the market pending further execution. Selecting BBO means you understand how this order type is executed and acknowledge to bear the risk of incomplete execution.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request processing result | ok , "error" |
| DATA\_START | object array | true |  |  |
| ERRORS\_START | object array | true |  |  |
| index | int | true | Index of orders |  |
| err\_code | int | true | error code |  |
| err\_msg | string | true | error massage |  |
| ERRORS\_END |  | false |  |  |
| SUCCESS\_START |  | false |  |  |
| index | int | true | Index of orders |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | The order ID is in string format |  |
| client\_order\_id | long | true | The client order ID filled in by the user when placing an order. If not filled, it will not be returned |  |
| SUCCESS\_END |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true |  |  |

Notes: The return order\_id is 18 bits, it will make mistake when nodejs and JavaScript analysed 18 bits. Because the Json.parse in nodejs and JavaScript is int by default. so the number over 18 bits need be parsed by json-bigint package.

#### Subscription Example

{

"op":

"create\_batchorder"

"cid":

"40sG903yz80oDFWr"

"data":{

"orders\_data":\[

0:{

"contract\_code":

"btc-usdt"

"direction":

"sell"

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

27000

"tp\_order\_price":

27000

"tp\_order\_price\_type":

"optimal\_5"

"sl\_trigger\_price":

"30100"

"sl\_order\_price":

"30100"

"sl\_order\_price\_type":

"optimal\_5"

}

1:{

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

"post\_only"

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

\]

}

}

#### Example of a Successful Subscription

{

"status":

"ok"

"cid":

"40sG903yz80oDFWr"

"data":{

"errors":\[

0:{

"index":

2

"err\_code":

1050

"err\_msg":

"Customers order number is repeated. Please try again later."

}

\]

"success":\[

0:{

"order\_id":

770323847022211100

"client\_order\_id":

57012021024

"index":

1

"order\_id\_str":

"770323847022211072"

}

\]

}

"ts":

1603701117058

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data