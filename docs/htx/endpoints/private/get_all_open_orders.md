# GET All Open Orders

**Source:** [Get All Open Orders](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4e04b-7773-11ed-9966-0242ac110003)

**Category:** Trading

## Authentication

Required (Private Endpoint)

### /v1/order/openOrders ( Get All Open Orders)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 50times/2s

Interface description: This endpoint returns all open orders which have not been filled completely.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| account-id | string | false | NA | Refer to GET /v1/account/accounts | The account id used for this trade |
| symbol | string | false | NA | Refer to GET /v1/common/symbols | The trading symbol to trade |
| side | string | false | NA | buy, sell | Filter on the direction of the trade |
| types | string | false |  |  | Query a combination of order types, separated by commas |
| from | string | false | NA |  | start order ID the searching to begin with |
| direct | string | false | NA | prev - in ascending order from the start order ID; next - in descending order from the start order ID | searching direction |
| size | int | false | 100 | \[1, 500\] | The number of orders to return |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| DATA\_START | object | false |  |  |
| id | long | false | Order id |  |
| client-order-id | string | false | Client order id |  |
| symbol | string | false | The trading symbol to trade, e.g. btcusdt, bccbtc |  |
| price | string | false | The limit price of limit order |  |
| created-at | long | false | The timestamp in milliseconds when the order was created |  |
| type | string | false | All possible order type (refer to introduction in this section) |  |
| filled-amount | string | false | The amount which has been filled |  |
| filled-cash-amount | string | false | The filled total in quote currency |  |
| filled-fees | string | false | Transaction fee (Accurate fees refer to matchresults endpoint) |  |
| source | string | false | The source where the order was triggered, possible values: sys, web, api, app |  |
| state | string | false | Order status, valid values: created, submitted, partial-filled |  |
| stop-price | string | false | Stop-loss orders trigger prices |  |
| operator | string | false | Stop profit stop loss order trigger price operator |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/order/openOrders?account-id=100009&symbol=ethusdt&side=buy"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"apnusdt"

"source":

"web"

"price":

"1.555550000000000000"

"created-at":

1630633835224

"amount":

"572.330000000000000000"

"account-id":

13496526

"filled-cash-amount":

"0.0"

"client-order-id":

""

"filled-amount":

"0.0"

"filled-fees":

"0.0"

"id":

357630527817871

"state":

"submitted"

"type":

"sell-limit"

}

\]

}