# GET Place a New Order

**Source:** [Place a New Order](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4ee16-7773-11ed-9966-0242ac110003)

**Category:** Trading

## Authentication

Required (Private Endpoint)

### /v1/order/orders/place ( Place a New Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 100times/2s

Interface description: This endpoint places a new order and sends to the exchange to be matched.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| account-id | string | false | The account id used for this trade |  | NA |
| symbol | string | false | The trading symbol to trade |  | NA |
| type | string | false | The order type。buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc, buy-limit-maker, sell-limit-maker, buy-stop-limit, sell-stop-limit, buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok |  | NA |
| amount | string | false | order size (for buy market order, it's order value) |  | NA |
| price | string | false | The order price (not available for market order) |  | NA |
| source | string | false | When trade with spot use 'spot-api';When trade with isolated margin use 'margin-api'; When trade with cross margin use 'super-margin-api';When trade with c2c-margin use 'c2c-margin-api'; |  | spot-api |
| client-order-id | string | false | Client order ID |  | NA |
| self-match-prevent | int | false | self match prevent. 0: no, means allowing self-trading; 1: yes, means not allowing self-trading |  | 0 |
| stop-price | string | false | Trigger price of stop limit order |  | NA |
| operator | string | false | operation charactor of stop price |  | NA |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status | "OK" or "Error" |
| data | long | false | order number |  |

Notes:  
The returned data object is a single string which represents the order id  
  
buy-limit-maker  
If the order price is greater than or equal to the lowest selling price in the market, the order will be rejected.  
If the order price is less than the lowest selling price in the market, the order will be accepted.  
sell-limit-maker  
If the order price is less than or equal to the highest buy price in the market, the order will be rejected.  
If the order price is greater than the highest buy price in the market, the order will be accepted.

#### Request example

{

"account-id":

"100009"

"amount":

"10.1"

"price":

"100.1"

"source":

"spot-api"

"symbol":

"ethusdt"

"type":

"buy-limit"

"client-order-id":

"a0001"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":

"356501383558845"

}