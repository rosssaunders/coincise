# GET Place Order

**Source:** [Place Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19588768fe7)

**Category:** Orders

## Authentication

Required (Private Endpoint)

### /v5/trade/order (Place Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: Place an order in futures trading.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | String | true | Symbol |  |  |
| margin\_mode | String | true | Margin mode: cross (Cross margin |  |  |
| position\_side | String | false | Position side | long: going long; short: going short; both: One-way mode. You must input long or short and both is default. |  |
| side | String | true | Order side | buy; sell |  |
| type | String | true | Order type; enumeration | "market": market order; "limit": limit order; "post\_only": post-only order |  |
| price\_match | String | false | BBO and price are mutually exclusive | opponent: counterparty price; "optimal\_5": Best 5 BBO; "optimal\_10": Best 10 BBO; "optimal\_20": Best 20 BBO |  |
| client\_order\_id | String | false | Order ID you entered | Clients fill and maintain themselves. the value must be in \[1, 9223372036854775807\] |  |
| price | String | false | Price, applicable for limit orders only. No price input is required for market orders. |  |  |
| volume | String | true | Order size, specifically in Cont |  |  |
| reduce\_only | Integer | false | Reduce only: 0 is false; 1 is true |  |  |
| time\_in\_force | String | false | Enumerate FOK, IOC, and GTC. It is an optional field with GTC by default. |  |  |
| tp\_trigger\_price | String | false | Trigger price of your take profit order |  |  |
| tp\_order\_price | String | false | Price of your take profit order. (There is no need to input a price when using BBO.) |  |  |
| tp\_type | String | false | Type of your take profit order. "market" is default with no input. "market": market order; "limit": limit order. "optimal\_5": Best 5 BBO; "optimal\_10": Best 10 BBO; "optimal\_20": Best 20 BBO. |  |  |
| tp\_trigger\_price\_type | String | false | Trigger price type of your take profit order. The last price is default. | "last": last price; "market": mark price |  |
| sl\_trigger\_price | String | false | SL Trigger Price |  |  |
| sl\_order\_price | String | false | Price of your stop loss order. (There is no need to input a price when using BBO.) |  |  |
| sl\_type | String | false | Type of your stop loss order. "market" is default with no input. "market": market order; "limit": limit order. "optimal\_5": Best 5 BBO; "optimal\_10": Best 10 BBO; "optimal\_20": Best 20 BBO. |  |  |
| sl\_trigger\_price\_type | String | false | Trigger price type of your stop loss order. The last price is default. | "last": last price; "market": mark price |  |
| price\_protect | boolean | false | Price protection. "false" is default. The parameter is needed when you set TP/SL. | false or true |  |
| self\_match\_prevent | String | false | Self-trading prevention | cancel\_taker: Cancel a taker order cancel\_maker: Cancel a maker order cancel\_both: Cancel all orders | cancel\_taker by default. |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| order\_id | String | true | Order ID |  |
| client\_order\_id | String | false | The order ID you entered when placing an order. The ID will not be returned if it is not provided. |  |

Notes: Remark: position\_side is the side of your position. This parameter is optional in the One-way mode. The field is optional, and only "both" can be entered. However, in Hedge mode, this field is mandatory, and only "long" or "short" can be selected. In Hedge mode, "side" and "position\_side" need to be combined. Open long (Enter "buy" in the side field; "long" in the position\_side field) Open short (Enter "sell" in the side field; "short" in the position\_side field) Close long (Enter "sell" in the side field; "long" in the position\_side field) Close short (Enter "buy" in the side field; "short" in the position\_side field) In One-way mode, a long position returns "buy," while a short position returns "sell."

#### Request example

{

"time\_in\_force":

"gtc"

"price\_protect":

"true"

"contract\_code":

"BTC-USDT-241115"

"margin\_mode":

"cross"

"position\_side":

"long"

"price":

5000

"volume":

1

"side":

"buy"

"type":

"limit"

"tp\_trigger\_price":

"6000"

"tp\_order\_price":

"6000"

"tp\_trigger\_price\_type":

"last"

"tp\_type":

"limit"

"sl\_trigger\_price":

"4000"

"sl\_order\_price":

"4000"

"sl\_trigger\_price\_type":

"last"

"sl\_type":

"limit"

}

#### Response Example

##### Success Example

{

"code":

200

"data":{

"client\_order\_id":

"1329503956647878656"

"order\_id":

"1329503956647878656"

}

"message":

"Success"

"ts":

1737020044270

}