# GET the Match Result of an Order

**Source:** [Get the Match Result of an Order](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4e708-7773-11ed-9966-0242ac110003)

**Category:** Trading

## Authentication

Required (Private Endpoint)

### /v1/order/orders/{order-id}/matchresults ( Get the Match Result of an Order)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 50times/2s

Interface description: This endpoint returns the match result of an order.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| order-id | string | false | Order ID, place it into path |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| DATA\_START | object | false |  |  |
| id | long | false | Internal id |  |
| symbol | string | false | The trading symbol to trade, e.g. btcusdt, bccbtc |  |
| order-id | string | false | The order id of this order |  |
| match-id | string | false | The match id of this match |  |
| trade-id | long | false | Unique trade ID (NEW) |  |
| price | long | false | filled price |  |
| created-at | long | false | The timestamp in milliseconds when this record is created (slightly later than trade time) |  |
| type | integer | false | All possible order type (refer to introduction in this section) |  |
| filled-amount | string | false | The amount which has been filled |  |
| filled-fees | string | false | Transaction fee (positive value). If maker rebate applicable, revert maker rebate value per trade (negative value). | When "fee-deduct-state" = "done", it represents the final state |
| fee-currency | string | false | Currency of transaction fee or transaction fee rebate (transaction fee of buy order is based on base currency, transaction fee of sell order is based on quote currency; transaction fee rebate of buy order is based on quote currency, transaction fee rebate of sell order is based on base currency) |  |
| source | string | false | All possible order source (refer to introduction in this section) | buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc, buy-stop-limit, sell-stop-limit, buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok |
| role | string | false | the role in the transaction: taker or maker |  |
| filled-points | string | false | deduction amount (unit: in htx or hbpoint) |  |
| fee-deduct-currency | string | false | deduction type. if blank, the transaction fee is based on original currency; if showing value as "ht", the transaction fee is deducted by HT; if showing value as "hbpoint", the transaction fee is deducted by HB point. |  |
| fee-deduct-state | string | false | Fee deduction status，In deduction：ongoing，Deduction completed：done |  |
| DATA\_END |  | false |  |  |

Notes:  
The calculated maker rebate value inside ‘filled-fees’ would not be paid immediately.

#### Request example

`curl"https://api.huobi.pro/v1/order/orders/{order-id}/matchresults`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"polyusdt"

"fee-currency":

"poly"

"source":

"spot-web"

"order-id":

345487249132375

"price":

"0.338"

"created-at":

1629443051839

"role":

"taker"

"match-id":

5014

"filled-amount":

"147.928994082840236"

"filled-fees":

"0"

"filled-points":

"0.1"

"fee-deduct-currency":

"hbpoint"

"fee-deduct-state":

"done"

"trade-id":

1085

"id":

313288753120940

"type":

"buy-market"

}

\]

}