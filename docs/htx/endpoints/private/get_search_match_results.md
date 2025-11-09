# GET Search Match Results

**Source:** [Search Match Results](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4de21-7773-11ed-9966-0242ac110003)

**Category:** Trading

## Authentication

Required (Private Endpoint)

### /v1/order/matchresults ( Search Match Results)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 20times/2s

Interface description: This endpoint returns the match results of past and current filled, or partially filled orders based on specific search criteria.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | The trading symbol to trade | All supported trading symbol, e.g. btcusdt, bccbtc.Refer to GET /v1/common/symbols | N/A |
| types | string | false | The types of order to include in the search | buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc, buy-limit-maker, sell-limit-maker, buy-stop-limit, sell-stop-limit | all |
| start-time | long | false | ((end-time) – 48hour) | \[((end-time) – 48hour), (end-time)\] | Far point of time of the query window (unix time in millisecond). Searching based on transact-time. The maximum size of the query window is 48 hour. The query window can be shifted within 120 days. |
| end-time | long | false | current-time | \[(current-time) – 120days,(current-time)\] | Near point of time of the query window (unix time in millisecond). Searching based on transact-time. The maximum size of the query window is 48 hour. The query window can be shifted within 120 days. |
| from | string | false | Search internal id to begin with | if search next page, then this should be the last id (not trade-id) of last page; if search previous page, then this should be the first id (not trade-id) of last page | N/A |
| direct | string | false | Search direction when 'from' is used | next, prev | next |
| size | string | false | The number of orders to return | \[1-500\] | 100 |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status |  |
| DATA\_START | object | true |  |  |
| id | long | true | Record id, non sequential, it can be used in "from" field for next request |  |
| symbol | string | true | The trading symbol to trade, e.g. btcusdt, bccbtc |  |
| order-id | long | true | The order id of this order |  |
| match-id | long | true | The match id of this match |  |
| trade-id | integer | true | Unique trade ID |  |
| price | string | true | The limit price of limit order |  |
| created-at | long | true | The timestamp in milliseconds when this record is created |  |
| type | string | true | All possible order type (refer to introduction in this section) | created：Created，submitted : The order is waiting for transaction，partial-filled : Partial deal，filled : Closed the deal，partial-canceled :Partial cancellation of transaction，canceling :Undo in process，canceled : Have been withdrawn |
| filled-amount | string | true | The amount which has been filled |  |
| filled-fees | string | true | Transaction fee (positive value). If maker rebate applicable, revert maker rebate value per trade (negative value). | When "fee-deduct-state" = "done", it represents the final state |
| fee-currency | string | true | Currency of transaction fee or transaction fee rebate (transaction fee of buy order is based on base currency, transaction fee of sell order is based on quote currency; transaction fee rebate of buy order is based on quote currency, transaction fee rebate of sell order is based on base currency) |  |
| source | string | true | All possible order source (refer to introduction in this section) | "sys","web","api","app","fl-sys","fl-mgt","spot-stop","margin-stop","super-margin-stop","grid-trading-sys" |
| role | string | true | The role in the transaction: taker or maker. |  |
| filled-points | string | true | deduction amount (unit: in htx or hbpoint) |  |
| fee-deduct-currency | string | true | deduction type: ht or hbpoint. |  |
| fee-deduct-state | string | true | Fee deduction status，In deduction：ongoing，Deduction completed：done |  |
| DATA\_END |  | false |  |  |

Notes:  
The calculated maker rebate value inside ‘filled-fees’ would not be paid immediately.

#### Request example

`curl"https://api.huobi.pro/v1/order/matchresults?symbol=btcusdi"`

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

"price":

"0.338"

"created-at":

1629443051839

"role":

"taker"

"order-id":

345487249132375

"match-id":

5014

"trade-id":

1085

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

"id":

313288753120940

"type":

"buy-market"

}

\]

}