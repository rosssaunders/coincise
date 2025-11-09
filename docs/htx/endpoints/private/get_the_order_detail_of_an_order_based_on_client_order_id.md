# GET the Order Detail of an Order (based on client order ID)

**Source:** [Get the Order Detail of an Order (based on client order ID)](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4ec26-7773-11ed-9966-0242ac110003)

**Category:** Trading

## Authentication

Required (Private Endpoint)

### /v1/order/orders/getClientOrder ( Get the Order Detail of an Order (based on client order ID))

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 50times/2s

Interface description: This interface returns the latest status and details of the order with the specified user-created order number.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| clientOrderId | string | false | Client order ID |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status |  |
| DATA\_START | object | true |  |  |
| id | long | true | order id |  |
| client-order-id | string | true | Client order id |  |
| symbol | long | true | The trading symbol to trade, e.g. btcusdt, bccbtc |  |
| account-id | long | true | The account id which this order belongs to |  |
| amount | string | true | The amount of base currency in this order |  |
| price | string | true | The limit price of limit order |  |
| created-at | string | true | The timestamp in milliseconds when the order was created |  |
| finished-at | long | true | The timestamp in milliseconds when the order was changed to a final state. This is not the time the order is matched. |  |
| canceled-at | long | true | The timestamp in milliseconds when the order was canceled, if not canceled then has value of 0 |  |
| type | string | true | All possible order type (refer to introduction in this section) | buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc, buy-stop-limit, sell-stop-limit, buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok |
| field-amount | string | true | The amount which has been filled |  |
| field-cash-amount | string | true | The filled total in quote currency |  |
| field-fees | string | true | Transaction fee (Accurate fees refer to matchresults endpoint) |  |
| source | string | true | All possible order source (refer to introduction in this section) | "sys","web","api","app","fl-sys","fl-mgt","spot-stop","margin-stop","super-margin-stop","grid-trading-sys" |
| canceled-source | string | true | canceled source | "timeout-canceled-order"、"cross-margin-fl-sys"、"isolated-margin-fl-sys"、"coin-listing-delisting"、"api"、"user-actively-cancels-order-web"、"user-actively-cancels-order-ios"、"user-actively-cancels-order-android"、"admin"、"grid-end"、"system-manually-cancels-order"、"circuit"、"self\_match\_prevent"、"market"、"fok"、"ioc"、 "limit\_maker" |
| state | string | true | All possible order state (refer to introduction in this section) | created：Created，submitted : The order is waiting for transaction，partial-filled : Partial deal，filled : Closed the deal，partial-canceled :Partial cancellation of transaction，canceling :Undo in process，canceled : Have been withdrawn |
| stop-price | string | true | trigger price of stop limit order |  |
| operator | string | true | operation character of stop price |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/order/orders/getClientOrder?clientOrderId=xxxxxxxx"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"id":

357632718898331

"symbol":

"adausdt"

"account-id":

13496526

"client-order-id":

"23456"

"amount":

"5.000000000000000000"

"price":

"1.000000000000000000"

"created-at":

1630649406687

"type":

"buy-limit-maker"

"field-amount":

"0.0"

"field-cash-amount":

"0.0"

"field-fees":

"0.0"

"finished-at":

0

"source":

"spot-api"

"state":

"submitted"

"canceled-at":

0

}

}