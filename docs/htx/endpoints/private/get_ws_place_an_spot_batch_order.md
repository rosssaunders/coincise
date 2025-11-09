# GET ws Place An Spot Batch Order

**Source:** [ws Place An Spot Batch Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1928f115372)

**Category:** Websocket Trade

## Authentication

Required (Private Endpoint)

### create-batchorder (ws Place An Spot Batch Order)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: Supports spot batch order transactions via websocket.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.huobi.pro/ws/trade |
| Online (preferred by aws customers) | wss://api-aws.huobi.pro/ws/trade |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| ch | string | Required； Operator Name，create-batchorder; |
| params | string | Order parameters |
| cid | string | request id |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| account-id | string | false | The account id used for this trade |  |  |
| symbol | string | false | The trading symbol to trade |  |  |
| type | string | false | The order type。buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc, buy-limit-maker, sell-limit-maker, buy-stop-limit, sell-stop-limit, buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok |  |  |
| amount | string | false | order size (for buy market order, it's order value) |  |  |
| price | string | false | The order price (not available for market order) |  |  |
| source | string | false | When trade with spot use 'spot-api';When trade with isolated margin use 'margin-api'; When trade with cross margin use 'super-margin-api';When trade with c2c-margin use 'c2c-margin-api'; |  | spot-api |
| client-order-id | string | false | Client order ID |  |  |
| self-match-prevent | int | false | self match prevent. 0: no, means allowing self-trading; 1: yes, means not allowing self-trading |  | 0 |
| stop-price | string | false | Trigger price of stop limit order |  |  |
| operator | string | false | operation charactor of stop price |  |  |
| cid | string | false | Current request's ID |  |  |

Notes: buy-limit-maker If the order price is greater than or equal to the lowest selling price in the market, the order will be rejected. If the order price is less than the lowest selling price in the market, the order will be accepted. sell-limit-maker If the order price is less than or equal to the highest buy price in the market, the order will be rejected. If the order price is greater than the highest buy price in the market, the order will be accepted.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| DATA\_START | object | false |  |  |
| order-id | long | false | The order id |  |
| client-order-id | string | false | The client order id (if available) |  |
| err-code | string | false | The error code (only for rejected order) |  |
| err-msg | string | false | The error message (only for rejected order) |  |
| DATA\_END |  | false |  |  |

Notes: Notes: The returned data object is a single string which represents the order id

#### Subscription Example

{

"cid":

"a7ed6700-8799-11ef-9ce3-acde48001122"

"ch":

"create-batchorder"

"params":\[

0:{

"price":

60001

"amount":

"0.001"

"market-amount":

"0"

"account-id":

31276149

"source":

"spot-api"

"type":

"buy-limit-fok"

"symbol":

"btcusdt"

"coupon-id":

""

}

1:{

"price":

60001

"amount":

"0.001"

"market-amount":

"0"

"account-id":

31276149

"source":

"spot-api"

"type":

"buy-limit-fok"

"symbol":

"btcusdt"

"coupon-id":

""

}

\]

}

#### Example of a Successful Subscription

{

"status":

"ok"

"data":\[

0:{

"order-id":

1180298630694870

"client-order-id":

""

}

1:{

"order-id":

1180298630694871

"client-order-id":

""

}

\]

"cid":

"a7ed6700-8799-11ef-9ce3-acde48001122"

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data