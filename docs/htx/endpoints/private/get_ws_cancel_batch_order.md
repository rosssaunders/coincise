# GET Ws Cancel batch Order

**Source:** [Ws Cancel batch Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-196a9cdf9dc)

**Category:** Websocket Trade

## Authentication

Required (Private Endpoint)

### cancel\_batch\_orders (Ws Cancel batch Order)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: This interface supports websocket contract batch order cancellation.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-trade |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-trade |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，cancel\_batch\_orders |
| cid | string | Optional; Requests unique ID |
| data | string | cancellation parameters |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | String | true | Symbol |  |  |
| order\_id | String | false | Order ID |  |  |
| client\_order\_id | String | false | Your order ID | Clients fill and maintain themselves. the value must be in \[1, 9223372036854775807\] |  |
| cid | string | false | Current request's ID |  |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | Response Code | 200: Success, non 200: Error |
| message | String | true | Response Description |  |
| DATA\_START | object | false |  |  |
| code | int | true | Order cancellation result | 200: Success, non 200: Error |
| message | String | true | Order cancellation result description |  |
| order\_id | String | true | Order ID |  |
| client\_order\_id | String | true | Your order ID |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Subscription Example

{

"op":

"cancel\_batch\_orders"

"cid":

"cancel\_batch\_orders\_1240"

"data":{

"contract\_code":

"BTC-USDT"

"order\_id":\[

0

:

"1329854623927160832"

1

:

"1329854624082350080"

\]

"client\_order\_id":\[

0

:

"1329854623927160832"

1

:

"1329854624082350080"

\]

}

}

#### Example of a Successful Subscription

{

"code":

200

"message":

"Success"

"data":\[

0:{

"orderId":

"1358944125296009216"

"clientOrderId":

"1358944125296009216"

"code":

200

"message":

"Success"

}

1:{

"orderId":

"1358944503467040768"

"clientOrderId":

"1358944503467040768"

"code":

200

"message":

"Success"

}

\]

"ts":

1744041034439

"cid":

"cancel\_batch\_orders\_1240"

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data