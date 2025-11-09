# GET ws Cancel All Order

**Source:** [ws Cancel All Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1928f2962a5)

**Category:** Websocket Trade

## Authentication

Required (Private Endpoint)

### cancelall (ws Cancel All Order)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: Support for cancelling all (Maximum 100 at a time) orders through websocket.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.huobi.pro/ws/trade |
| Online (preferred by aws customers) | wss://api-aws.huobi.pro/ws/trade |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| ch | string | Required； Operator Name，cancelall; |
| params | string | Order parameters |
| cid | string | request id |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| account-id | string | false | The account id used for this cancel | Refer to GET /v1/account/accounts |  |
| symbol | string | false | The trading symbol list (maximum 10 symbols, separated by comma, default value all symbols) | All supported trading symbol, e.g. btcusdt, bccbtc.Refer to GET /v1/common/symbols | all |
| types | string | false | One or more types of order to include in the search, use comma to separate. | buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc, buy-stop-limit, sell-stop-limit, buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok |  |
| size | string | false | Filter on the direction of the trade | buy, sell |  |
| size | ion | false | The number of orders to cancel | \[1, 100\] | 100 |
| cid | string | false | Current request's ID |  |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| DATA\_START | object | false |  |  |
| success-count | int | false | The number of cancel request sent successfully |  |
| failed-count | int | false | The number of cancel request failed |  |
| next-id | long | false | the next order id that can be cancelled, -1 indicates no open orders |  |
| DATA\_END |  | false |  |  |

#### Subscription Example

{

"cid":

"9b5769cc-879a-11ef-9a6a-acde48001122"

"ch":

"cancelall"

"params":{

"account-id":

31276149

"symbol":

"btcusdt"

}

}

#### Example of a Successful Subscription

{

"status":

"ok"

"data":{

"success-count":

4

"failed-count":

0

"next-id":

\-1

}

"cid":

"9b5769cc-879a-11ef-9a6a-acde48001122"

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data