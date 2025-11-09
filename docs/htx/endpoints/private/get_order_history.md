# GET Order History

**Source:** [Get Order History](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19589bc57bc)

**Category:** Orders

## Authentication

Required (Private Endpoint)

### /v5/trade/order/history (Get Order History)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: Get previous futures orders.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | String | true | Futures symbol is a required field. You must use the specified futures symbol to search for perpetual or delivery futures contracts. | “BTC-USDT” “BTC-USDT-251103”... |  |
| margin\_mode | String | true | Margin mode cross: Full position |  |  |
| state | String | false | Status | You can check multiple statuses, separated by commas. "filled":"Finished", "partially\_canceled":""Partially filled, "canceled":"Cancelled" |  |
| type | String | false | Order type | Enumerate "market", "limit", and "post\_only." "market": market order; "limit": limit order; "post\_only": post-only order |  |
| price\_match | String | false | BBO and price are mutually exclusive | opponent: counterparty price; "optimal\_5": Best 5 BBO; "optimal\_10": Best 10 BBO; "optimal\_20": Best 20 BBO |  |
| start\_time | String | false | Starting time of the history, Unix timestamp format in milliseconds. | Last 90 days Default value (now) – 48h |  |
| end\_time | String | false | Ending time of the history, Unix timestamp format in milliseconds. | Last 90 days Default value (now) – 48h |  |
| from | Long | false | ID for the query starts at 0 by default. |  |  |
| limit | Integer | false | Pagination size defaults to 10, with a maximum limit of 100. |  |  |
| direct | String | false | prev, next |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| id | String | true | Query ID |  |
| contract\_code | String | true | Symbol | Perpetual: "BTC-USDT"...; Delivery: "BTC-USDT-210625"... |
| side | String | true | Buy or Sell | buy; sell |
| position\_side | String | true | Position side | long: going long; short: going short; both: One-way mode |
| type | String | true | Order type; enumeration | "market": market order; "limit": limit order; "post\_only": post-only order |
| price\_match | String | true | BBO and price are mutually exclusive | opponent: counterparty price; "optimal\_5": Best 5 BBO; "optimal\_10": Best 10 BBO; "optimal\_20": Best 20 BBO |
| order\_id | String | true | Order ID |  |
| client\_order\_id | String | true | Order ID you entered |  |
| margin\_mode | String | true | Margin mode | Cross margin; enumeration |
| price | String | true | Price |  |
| volume | String | true | Amount |  |
| lever\_rate | Long | true | Leverage |  |
| state | String | true | Status | filled, partially\_canceled, canceled |
| order\_source | String | true | Order source | system: System; web: Website for PC clients, api: API, m: Website for mobile clients, risk: Risk management system, settlement: Delivery settlement, ios: iOS clients, android: Android clients, windows: Windows clients, mac: Mac clients, trigger: Conditional order trigger, tpsl: Take profit or stop loss order, ADL: Auto deleveraging orders |
| reduce\_only | Boolean | true | Reduce only |  |
| time\_in\_force | String | true | Enumerate FOK, IOC, and GTC. It is an optional field with GTC by default. |  |
| tp\_trigger\_price | String | true | Take Profit Trigger Price |  |
| tp\_order\_price | String | true | Take Profit Order Price (No need to fill in the price for the best N-level order type) |  |
| tp\_type | String | true | Take profit order type, if not filled in, default is market: market price, maket: limit price: limit, optimal 5: optimal\_5, optimal 10: optimal\_10, optimal 20: optimal\_20--Field reserved, not open to the public for the time being |  |
| tp\_trigger\_price\_type | int | false | The take profit price trigger type, the default is the latest price | "last": last price; "market": mark price |
| sl\_trigger\_price | String | true | Stop loss trigger price |  |
| sl\_order\_price | String | true | Stop loss order price (no need to fill in the price for the optimal N-level order type) |  |
| sl\_type | String | true | Stop loss order type, if not filled in, default is market price, maket: limit price: limit, optimal 5: optimal\_5, optimal 10: optimal\_10, optimal 20: optimal\_20 |  |
| sl\_trigger\_price\_type | int | false | Stop loss price trigger type, the default is the latest price | "last": last price; "market": mark price |
| trade\_avg\_price | String | false | Average execution price |  |
| trade\_volume | String | true | Execution amount |  |
| trade\_turnover | String | true | Total value executed |  |
| fee\_currency | String | true | Currency for fee payment; if multiple currencies are used, separate them with a comma. |  |
| fee | String | true | Total trading fees in USDT |  |
| profit | String | true | Closing profit and loss (calculated using the average position price, excluding realized profit and loss from position settlement). |  |
| contract\_type | String | true | Contract type | swap: Perpetual; this\_week: Weekly; next\_week: Bi-weekly; quarter: Quarterly; next\_quarter: Bi-quarterly |
| cancel\_reason | String | true | cancel reason | "Limit order cancelation by the client","Order cancelation by system","Market order circuit-breaker","Bankruptcy price of market order","Order cancelation due to no matching orders"," Self trading prevention","Number of maker orders matched with your taker orders exceeding limit","Order cancelation due to API timeout" |
| created\_time | String | true | Order creation time with a UTC timestamp (MS) |  |
| updated\_time | String | true | Order update time with a UTC timestamp (MS) |  |
| self\_match\_prevent | String | true | Prevent self-trading | cancel\_taker: Cancel a taker order cancel\_maker: Cancel a maker order cancel\_both: Cancel all orders allow: Allow self-trading |

Notes: The following actions all fall within the scope of "Order cancelation by system": "Order cancellation by system". FOK order cancelation-- fok order cancellation IOC order cancelation-- ioc order cancellation Order cancelation by the management system-- MGT order cancellation Limit maker order cancelation--limit-maker order cancellation Order cancelation due to API timeout--api timeout order cancellation Order cancelation due to forced liquidation--forced liquidation order cancellation Order cancelation due to ADL--adl order cancellation Order cancelation due to delivery futures expiration--delivery contract expiration

#### Request example

{

"contract\_code":

"BTC-USDT"

"margin\_mode":

"cross"

}

#### Response Example

##### Success Example

{

"code":

200

"message":

"Success"

"data":\[

0:{

"id":

"1342444059268263936"

"side":

"buy"

"type":

"market"

"price":

"0"

"volume":

"6"

"state":

"filled"

"profit":

"-0.303999999999999996"

"contract\_code":

"BTC-USDT"

"position\_side":

"short"

"price\_match":

NULL

"order\_id":

"1342444059150655488"

"client\_order\_id":

"1342444059150655488"

"margin\_mode":

"cross"

"lever\_rate":

20

"order\_source":

"api"

"reduce\_only":

true

"time\_in\_force":

"gtc"

"tp\_trigger\_price":

""

"tp\_order\_price":

""

"tp\_type":

NULL

"tp\_trigger\_price\_type":

NULL

"sl\_trigger\_price":

""

"sl\_order\_price":

""

"sl\_type":

NULL

"sl\_trigger\_price\_type":

NULL

"trade\_avg\_price":

"31769.5"

"trade\_volume":

"6"

"trade\_turnover":

"190.617"

"fee\_currency":

"USDT"

"fee":

"-0.1143702"

"price\_protect":

false

"contract\_type":

"swap"

"cancel\_reason":

""

"created\_time":

""

"updated\_time":

""

"self\_match\_prevent":

"cancel\_both"

}

1:{

"id":

"1342152155381149696"

"side":

"buy"

"type":

"limit"

"price":

"4100.6"

"volume":

"6"

"state":

"canceled"

"profit":

"0"

"contract\_code":

"BTC-USDT"

"position\_side":

"both"

"price\_match":

NULL

"order\_id":

"1342152155259641856"

"client\_order\_id":

"1342151603610202112"

"margin\_mode":

"cross"

"lever\_rate":

20

"order\_source":

"tpsl"

"reduce\_only":

true

"time\_in\_force":

"gtc"

"tp\_trigger\_price":

""

"tp\_order\_price":

""

"tp\_type":

NULL

"tp\_trigger\_price\_type":

NULL

"sl\_trigger\_price":

""

"sl\_order\_price":

""

"sl\_type":

NULL

"sl\_trigger\_price\_type":

NULL

"trade\_avg\_price":

"0"

"trade\_volume":

"0"

"trade\_turnover":

"0"

"fee\_currency":

"USDT"

"fee":

"0"

"price\_protect":

false

"contract\_type":

"swap"

"cancel\_reason":

""

"created\_time":

""

"updated\_time":

""

"self\_match\_prevent":

"cancel\_both"

}

2:{

"id":

"1342151603528183808"

"side":

"sell"

"type":

"limit"

"price":

"4000.601"

"volume":

"6"

"state":

"filled"

"profit":

"0"

"contract\_code":

"BTC-USDT"

"position\_side":

"both"

"price\_match":

NULL

"order\_id":

"1342151603389898752"

"client\_order\_id":

"1342151603389898752"

"margin\_mode":

"cross"

"lever\_rate":

20

"order\_source":

"api"

"reduce\_only":

false

"time\_in\_force":

"gtc"

"tp\_trigger\_price":

"1.8"

"tp\_order\_price":

"1.8"

"tp\_type":

"limit"

"tp\_trigger\_price\_type":

"last"

"sl\_trigger\_price":

"4100.601"

"sl\_order\_price":

"4100.6"

"sl\_type":

"limit"

"sl\_trigger\_price\_type":

"last"

"trade\_avg\_price":

"31350.5"

"trade\_volume":

"2"

"trade\_turnover":

"62.701"

"fee\_currency":

"USDT"

"fee":

"-0.0376206"

"price\_protect":

false

"contract\_type":

"swap"

"cancel\_reason":

""

"created\_time":

""

"updated\_time":

""

"self\_match\_prevent":

"cancel\_both"

}

\]

"ts":

1740108246827

}