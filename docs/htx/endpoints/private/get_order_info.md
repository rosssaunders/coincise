# GET Order Info

**Source:** [Get Order Info](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-196a8401f83)

**Category:** Orders

## Authentication

Required (Private Endpoint)

### /v5/trade/order (Get Order Info)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 144 requests per UID per 3 seconds. This limit is shared across all trading interfaces (72 requests/3 seconds) and query interfaces (72 requests/3 seconds) for all symbols and contracts with different expiry dates for a given UID.

Interface description: Get information about your order.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | String | false | Symbol (trading pair) | "BTC-USDT"... |  |
| margin\_mode | String | false | Margin mode: cross (Cross margin) |  |  |
| order\_id | String | false | Either order\_id or client\_order\_id must be provided. If both are provided, order\_id will take precedence. |  |  |
| client\_order\_id | String | false | Order ID as assigned by the user |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| id | String | true | Query ID |  |
| contract\_code | String | true | Symbol | Perpetual: "BTC-USDT"...; Delivery: "BTC-USDT-210625"... |
| side | String | true | Order side | buy; sell |
| position\_side | String | true | Position side | "long": going long; "short": going short; "both": One-way mode |
| type | String | true | Order type; enumeration | "market": market order; "limit": limit order; "post\_only": post-only order |
| price\_match | String | false | BBO | opponent: counterparty price; "optimal\_5": Best 5 BBO; "optimal\_10": Best 10 BBO; "optimal\_20": Best 20 BBO |
| order\_id | String | true | Order ID |  |
| client\_order\_id | String | true | Order ID as assigned by the user |  |
| margin\_mode | String | true | Margin mode | Cross margin; enumeration |
| price | String | true | Order price |  |
| volume | String | true | Order size |  |
| lever\_rate | Long | true | Leverage |  |
| state | String | true | Order status | new, partially\_filled, filled, partially\_canceled, canceled, and rejected |
| order\_source | String | true | Order source | system: System; web: Website for PC clients, api: API, m: Website for mobile clients, risk: Risk management system, settlement: Delivery settlement, ios: iOS clients, android: Android clients, windows: Windows clients, mac: Mac clients, trigger: Conditional order trigger, tpsl: Take profit or stop loss order, ADL: Auto deleveraging orders |
| reduce\_only | String | true | Reduce only | false or true |
| time\_in\_force | String | true | Enumerate FOK, IOC, and GTC. It is an optional field with GTC by default. |  |
| tp\_trigger\_price | String | true | Trigger price of your take profit order |  |
| tp\_order\_price | String | true | Price of your take profit order. (There is no need to input a price when using BBO.) |  |
| tp\_type | String | true | Type of your take profit order. "market" is default with no input. "market": market order; "limit": limit order. "optimal\_5": Best 5 BBO; "optimal\_10": Best 10 BBO; "optimal\_20": Best 20 BBO. |  |
| tp\_trigger\_price\_type | String | false | Trigger price type of your take profit order. The last price is default. | "last": last price; "mark": mark price |
| sl\_trigger\_price | String | true | Trigger price of your stop loss order |  |
| sl\_order\_price | String | true | Price of your stop loss order. (There is no need to input a price when using BBO.) |  |
| sl\_type | String | true | Type of your stop loss order. "market" is default with no input. "market": market order; "limit": limit order. "optimal\_5": Best 5 BBO; "optimal\_10": Best 10 BBO; "optimal\_20": Best 20 BBO. |  |
| sl\_trigger\_price\_type | String | false | Trigger price type of your stop loss order. The last price is default. | "last": last price; "mark": mark price |
| trade\_avg\_price | String | true | Average execution price |  |
| trade\_volume | String | true | Execution amount |  |
| trade\_turnover | String | true | Total value executed |  |
| fee\_currency | String | true | Currency for fee payment; if multiple currencies are used, separate them with a comma. |  |
| fee | String | true | Total trading fees in USDT |  |
| price\_protect | boolean | false | Price protection. "false" is default. The parameter is needed when you set TP/SL. | false or true |
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

"order\_id":

"123123123123123"

}

#### Response Example

##### Success Example

{

"code":

200

"data":{

"id":

"1382748711814639616"

"side":

"buy"

"type":

"market"

"price":

"0"

"volume":

"1"

"state":

"filled"

"profit":

"0"

"contract\_code":

"BTC-USDT-250613"

"position\_side":

"long"

"price\_match":

NULL

"order\_id":

1382748711720767500

"client\_order\_id":

"1382748711720767488"

"margin\_mode":

"cross"

"lever\_rate":

10

"order\_source":

"api"

"reduce\_only":

false

"time\_in\_force":

"gtc"

"tp\_trigger\_price":

NULL

"tp\_order\_price":

NULL

"tp\_type":

NULL

"tp\_trigger\_price\_type":

NULL

"sl\_trigger\_price":

NULL

"sl\_order\_price":

NULL

"sl\_type":

NULL

"sl\_trigger\_price\_type":

NULL

"trade\_avg\_price":

"798"

"trade\_volume":

"1"

"trade\_turnover":

"0.798"

"fee\_currency":

"USDT"

"fee":

"-0.0004788"

"price\_protect":

false

"contract\_type":

"this\_week"

"created\_time":

"1749714583106"

"updated\_time":

"1749714583117"

"self\_match\_prevent":

"cancel\_both"

"cancel\_reason":

NULL

}

"message":

NULL

"success":

true

}