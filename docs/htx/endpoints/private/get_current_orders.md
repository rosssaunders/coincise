# GET Current Orders

**Source:** [Get Current Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19589587da5)

**Category:** Orders

## Authentication

Required (Private Endpoint)

### /v5/trade/order/opens (Get Current Orders)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: Get unfilled futures orders. If no request parameters are specified, you will get all open orders sorted on the creation time in chronological order.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | String | false | Symbol |  |  |
| margin\_mode | String | false | Margin mode | cross: Cross margin |  |
| order\_id | String | false | Order ID |  |  |
| client\_order\_id | String | false | Order ID you entered |  |  |
| from | long | false | ID for the query starts at 0 by default. |  |  |
| limit | Intege | false | Pagination size defaults to 10, with a maximum limit of 100. |  |  |
| direct | String | false | prev, next |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| id | String | true | Query ID |  |
| contract\_code | String | true | Symbol | Perpetual: "BTC-USDT"...; Delivery: "BTC-USDT-210625"... |
| side | String | true | Buy or Sell | buy; sell |
| position\_side | String | true | Position side | long: going long; short: going short; both: One-way mode |
| type | String | true | Order type | "market": market order; "limit": limit order; "post\_only": post-only order |
| price\_match | String | true | BBO and price are mutually exclusive | opponent: counterparty price; "optimal\_5": Best 5 BBO; "optimal\_10": Best 10 BBO; "optimal\_20": Best 20 BBO |
| order\_id | String | true | Order ID |  |
| client\_order\_id | String | true | Order ID you entered |  |
| margin\_mode | String | true | Margin mode | cross: Cross margin |
| price | String | true | Price, applicable for limit orders only. No price input is required for market orders. |  |
| volume | String | true | Order size, specifically in Cont |  |
| lever\_rate | Long | true | Leverage |  |
| state | String | true | Status | new, partially\_filled, filled, partially\_canceled, canceled, and rejected |
| order\_source | String | true | Order source | system: System; web: Website for PC clients, api: API, m: Website for mobile clients, risk: Risk management system, settlement: Delivery settlement, ios: iOS clients, android: Android clients, windows: Windows clients, mac: Mac clients, trigger: Conditional order trigger, tpsl: Take profit or stop loss order, ADL: Auto deleveraging orders |
| reduce\_only | Boolean | true | Reduce only |  |
| time\_in\_force | String | true | Enumerate FOK, IOC, and GTC. It is an optional field with GTC by default |  |
| tp\_trigger\_price | String | true | Take Profit Trigger Price |  |
| tp\_order\_price | String | true | Take Profit Order Price (No need to fill in the price for the best N-level order type) |  |
| tp\_type | String | true | Take profit order type, if not filled in, default is market: market price, maket: limit price: limit, optimal 5: optimal\_5, optimal 10: optimal\_10, optimal 20: optimal\_20--Field reserved, not open to the public for the time being |  |
| tp\_trigger\_price\_type | int | false | The take profit price trigger type, the default is the latest price | "last": last price; "market": mark price |
| sl\_trigger\_price | String | true | Stop loss trigger price |  |
| sl\_order\_price | String | true | Stop loss order price (no need to fill in the price for the optimal N-level order type) |  |
| sl\_type | String | true | Stop loss order type, if not filled in, default is market price, maket: limit price: limit, optimal 5: optimal\_5, optimal 10: optimal\_10, optimal 20: optimal\_20 |  |
| sl\_trigger\_price\_type | int | false | Stop loss price trigger type, the default is the latest price | "last": last price; "market": mark price |
| trade\_avg\_price | String | true | Average execution price |  |
| trade\_volume | String | true | Execution amount |  |
| trade\_turnover | String | true | Total value executed |  |
| fee\_currency | String | true | Currency for fee payment; if multiple currencies are used, separate them with a comma. |  |
| fee | String | true | Total trading fees in USDT |  |
| profit | String | true | Closing PnL |  |
| contract\_type | String | true | Contract type | swap: Perpetual; this\_week: Weekly; next\_week: Bi-weekly; quarter: Quarterly; next\_quarter: Bi-quarterly |
| created\_time | Long | true | Order creation time with a UTC timestamp (MS) |  |
| updated\_time | Long | true | Order update time with a UTC timestamp (MS) |  |
| self\_match\_prevent | String | true | Prevent self-trading | cancel\_taker: Cancel a taker order cancel\_maker: Cancel a maker order cancel\_both: Cancel all orders allow: Allow self-trading |

#### Request example

{

"margin\_mode":

"cross"

"from":

"1331225286568849408"

"limit":

"2"

"direct":

"next"

"contract\_code":

""

"order\_id":

""

"client\_order\_id":

""

}

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"client\_order\_id":

"1331226415994253312"

"contract\_code":

"BTC-USDT-241122"

"contract\_type":

"this\_week"

"created\_time":

"1737430710575"

"fee":

"0"

"fee\_currency":

""

"id":

"1331226415994253312"

"lever\_rate":

5

"margin\_mode":

"cross"

"order\_id":

"1331226415994253312"

"order\_source":

"web"

"position\_side":

"long"

"price":

"6409.114"

"price\_match":

"optimal\_20"

"price\_protect":

""

"profit":

""

"reduce\_only":

""

"side":

"buy"

"sl\_order\_price":

""

"sl\_trigger\_price":

""

"sl\_trigger\_price\_type":

""

"sl\_type":

"0"

"state":

3

"time\_in\_force":

"gtc"

"tp\_order\_price":

""

"tp\_trigger\_price":

""

"tp\_trigger\_price\_type":

""

"tp\_type":

"0"

"trade\_avg\_price":

"0"

"trade\_turnover":

"0"

"trade\_volume":

"0"

"type":

"limit"

"updated\_time":

"1737455579520"

"self\_match\_prevent":

"cancel\_both"

"volume":

"1"

}

1:{

"client\_order\_id":

"1331268439239704576"

"contract\_code":

"BTC-USDT-241129"

"contract\_type":

"next\_week"

"created\_time":

"1737440729999"

"fee":

"0"

"fee\_currency":

""

"id":

"1331268439239704576"

"lever\_rate":

5

"margin\_mode":

"cross"

"order\_id":

"1331268439239704576"

"order\_source":

"api"

"position\_side":

"long"

"price":

"5000"

"price\_match":

""

"price\_protect":

""

"profit":

""

"reduce\_only":

""

"side":

"buy"

"sl\_order\_price":

""

"sl\_trigger\_price":

""

"sl\_trigger\_price\_type":

""

"sl\_type":

"0"

"state":

3

"time\_in\_force":

"gtc"

"tp\_order\_price":

""

"tp\_trigger\_price":

""

"tp\_trigger\_price\_type":

""

"tp\_type":

"0"

"trade\_avg\_price":

"0"

"trade\_turnover":

"0"

"trade\_volume":

"0"

"type":

"limit"

"updated\_time":

"1737455579520"

"self\_match\_prevent":

"cancel\_both"

"volume":

"1"

}

\]

"message":

"Success"

"ts":

1737455581526

}