# GET Submit Cancel for Multiple Orders by Criteria

**Source:** [Submit Cancel for Multiple Orders by Criteria](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4eb66-7773-11ed-9966-0242ac110003)

**Category:** Trading

## Authentication

Required (Private Endpoint)

### /v1/order/orders/batchCancelOpenOrders ( Submit Cancel for Multiple Orders by Criteria)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 50times/2s

Interface description: This endpoint submit cancellation for multiple orders (not exceeding 100 orders per request) at once with given criteria. This endpoint only submit the cancellation request, the actual cancellation result will need to be confirmed by other endpoints like order status, matchresult, etc.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| account-id | string | false | The account id used for this cancel | Refer to GET /v1/account/accounts | NA |
| symbol | string | false | The trading symbol list (maximum 10 symbols, separated by comma, default value all symbols) | All supported trading symbol, e.g. btcusdt, bccbtc.Refer to GET /v1/common/symbols | all |
| types | string | false | One or more types of order to include in the search, use comma to separate. | buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc, buy-stop-limit, sell-stop-limit, buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok | NA |
| side | string | false | Filter on the direction of the trade | buy, sell | NA |
| size | int | false | The number of orders to cancel | \[1, 100\] | 100 |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| DATA\_START | object | false |  |  |
| success-count | int | false | The number of cancel request sent successfully |  |
| failed-count | int | false | The number of cancel request failed |  |
| next-id | long | false | the next order id that can be cancelled, -1 indicates no open orders |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"account-id":

"178211"

"symbol":

"btcusdt"

"types":

"buy-limite"

"side":

"buy"

"size":

100

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"success-count":

2

"failed-count":

0

"next-id":

5454600

}

}