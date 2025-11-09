# GET Margin Order

**Source:** [Margin Order](https://www.htx.com/en-us/opend/newApiPages/?id=10000066-77b7-11ed-9966-0242ac110003)

**Category:** Trading

## Authentication

Required (Private Endpoint)

### /v1/order/auto/place (Margin Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 100times/2s

Interface description: Margin orders are automatically borrowed to place orders or repay.Sub-accounts are not currently supported for automatic borrowing and automatic repayment.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | The trading symbol to trade |  |  |
| account-id | string | true | The account id used for this trade |  |  |
| amount | string | false | Order transaction volume (market buy order is the order transaction amount); for market orders, you can only choose one of the two amounts, amount and market-amount, 0 means not to transmit; |  |  |
| market-amount | String | false | The market price order buy order is the order transaction volume, and the sell unit order transaction amount; amount and market-amount can only be selected from the two, 0 means not to be transmitted; |  |  |
| borrow-amount | string | false | The currency or quantity that needs to be borrowed (buying at market price represents the amount, and the rest represents the quantity) (borrowing needs to be uploaded). The maximum precision is 3 digits, if it exceeds, it will be rounded up. Such as: 6.12345 should pass 6.124 |  |  |
| type | string | true | buy-market, sell-market, buy-limit, sell-limit,, buy-stop-limit, sell-stop-limit | buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc,buy-limit-maker, sell-limit-maker, buy-stop-limit, sell-stop-limit, buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok |  |
| trade-purpose | string | true | Transaction purpose {1: automatic loan, 2: automatic repayment} |  |  |
| price | string | false | The order price (not available for market order) |  |  |
| stop-price | string | false | Trigger price of stop limit order |  |  |
| operator | string | false | operation charactor of stop price |  |  |
| source | string | true | When trade with spot use 'spot-api';When trade with isolated margin use 'margin-api'; When trade with cross margin use 'super-margin-api';When trade with c2c-margin use 'c2c-margin-api'; |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | Integer | true | code |  |
| success | Boolean | true |  |  |
| message | String | false |  |  |
| data | OrderResp | false |  |  |
| order-id | long | true | order id |  |

#### Request example

{

"market-amount":

"10"

"account-id":

31253990

"source":

"super-margin-web"

"type":

"buy-market"

"symbol":

"btcusdt"

"trade-purpose":

"2"

}

#### Response Example

##### Success Example

{

"code":

200

"data":{

"order-id":

912928425935415

}

"message":

NULL

"success":

true

}