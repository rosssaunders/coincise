# GET ws Place An Margin Order

**Source:** [ws Place An Margin Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1928f216d9e)

**Category:** Websocket Trade

## Authentication

Required (Private Endpoint)

### create-margin-order (ws Place An Margin Order)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: Support margin order transactions through websocket.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.huobi.pro/ws/trade |
| Online (preferred by aws customers) | wss://api-aws.huobi.pro/ws/trade |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| ch | string | Required； Operator Name，create-margin-order; |
| params | string | Order parameters |
| cid | string | request id |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | The trading symbol to trade |  |  |
| account-id | string | true | The account id used for this trade |  |  |
| amount | string | false | Order transaction volume (market buy order is the order transaction amount); for market orders, you can only choose one of the two amounts, amount and market-amount, 0 means not to transmit; |  |  |
| market-amount | string | false | The market price order buy order is the order transaction volume, and the sell unit order transaction amount; amount and market-amount can only be selected from the two, 0 means not to be transmitted; |  |  |
| borrow-amount | string | false | The currency or quantity that needs to be borrowed (buying at market price represents the amount, and the rest represents the quantity) (borrowing needs to be uploaded). The maximum precision is 3 digits, if it exceeds, it will be rounded up. Such as: 6.12345 should pass 6.124 |  |  |
| type | string | true | buy-market, sell-market, buy-limit, sell-limit,, buy-stop-limit, sell-stop-limit |  |  |
| trade-purpose | string | true | Transaction purpose {1: automatic loan, 2: automatic repayment} |  |  |
| price | string | false | The order price (not available for market order) |  |  |
| stop-price | string | false | Trigger price of stop limit order |  |  |
| operator | string | false | operation charactor of stop price |  |  |
| source | string | true | When trade with spot use 'spot-api';When trade with isolated margin use 'margin-api'; When trade with cross margin use 'super-margin-api';When trade with c2c-margin use 'c2c-margin-api'; |  |  |
| cid | string | false | Current request's ID |  |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | Integer | true |  |  |
| success | Boolean | true |  |  |
| message | String | false |  |  |
| data | OrderResp | false |  |  |
| order-id | long | true |  |  |

#### Subscription Example

{

"cid":

"137fedb2-879a-11ef-bc0b-acde48001122"

"ch":

"create-margin-order"

"params":{

"price":

64350

"amount":

"0.001554"

"market-amount":

"0"

"account-id":

31276407

"repay-amount":

72.8

"source":

"super-margin-api"

"type":

"sell-limit-fok"

"symbol":

"btcusdt"

"trade-purpose":

2

}

}

#### Example of a Successful Subscription

{

"code":

200

"data":{

"orderId":

1180298630694873

}

"message":

NULL

"success":

true

"cid":

"137fedb2-879a-11ef-bc0b-acde48001122"

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data