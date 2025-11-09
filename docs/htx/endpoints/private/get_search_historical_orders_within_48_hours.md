# GET Search Historical Orders within 48 Hours

**Source:** [Search Historical Orders within 48 Hours](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4db3d-7773-11ed-9966-0242ac110003)

**Category:** Trading

## Authentication

Required (Private Endpoint)

### /v1/order/history ( Search Historical Orders within 48 Hours)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 20times/2s

Interface description: This endpoint returns orders based on a specific searching criteria. The orders created via API will no longer be queryable after being cancelled for more than 2 hours.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol |  | false | The trading symbol to trade | All supported trading symbol, e.g. btcusdt, bccbtc.Refer to GET /v1/common/symbols |  |
| start-time |  | false | Start time (included) | UTC time in millisecond | The time 48 hours ago |
| end-time |  | false | End time (included) | UTC time in millisecond | The query time |
| direct |  | false | Direction of the query. (Note: If the total number of items in the search result is within the limitation defined in "size", this field does not take effect.) | prev, next | next |
| size |  | false | Number of items in each response | \[10-1000\] | 100 |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status |  | true | status |  |
| DATA\_START |  | true |  |  |
| {account-id | string | true | Account ID |  |
| amount | string | true | Order size |  |
| canceled-at | string | true | Order cancellation time |  |
| created-at | string | true | Order creation time |  |
| field-amount | string | true | Executed order amount |  |
| field-cash-amount | string | true | Executed cash amount |  |
| field-fees | string | true | Transaction fee (Accurate fees refer to matchresults endpoint) |  |
| finished-at | string | true | Last trade time |  |
| id | string | true | Order ID |  |
| client-order-id | string | true | User-generated order number |  |
| price | string | false | Order price |  |
| source | string | false | All possible order source (refer to introduction in this section) |  |
| canceled-source | string | true | canceled source | "timeout-canceled-order"、"cross-margin-fl-sys"、"isolated-margin-fl-sys"、"coin-listing-delisting"、"api"、"user-actively-cancels-order-web"、"user-actively-cancels-order-ios"、"user-actively-cancels-order-android"、"admin"、"grid-end"、"system-manually-cancels-order"、"circuit"、"self\_match\_prevent"、"market"、"fok"、"ioc"、 "limit\_maker" |
| state | string | true | Order status ( filled, partial-canceled, canceled ) |  |
| symbol | string | true | Trading symbol |  |
| stop-price | string | true | trigger price of stop limit order |  |
| operator | string | true | operation character of stop price. e.g. get, lte |  |
| type | string | true | All possible order type (refer to introduction in this section) |  |
| next-time | string | true | Next query "start-time" (in response of "direct" = prev), Next query "end-time" (in response of "direct" = next). Note: Only when the total number of items in the search result exceeded the limitation defined in "size", this field exists. UTC time in millisecond. |  |
| role | string | true | Order transaction direction If the order is a taker transaction, role returns the taker enumeration If the order is a maker transaction, role returns the maker enumeration If the order is both a taker transaction and a maker achievement, role returns the taker, maker enumeration | taker or maker or both |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/order/history?symbol=btcusdi"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

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

1:{

"id":

357632718898330

"symbol":

"adausdt"

"account-id":

13496526

"client-order-id":

"2345"

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

\]

}