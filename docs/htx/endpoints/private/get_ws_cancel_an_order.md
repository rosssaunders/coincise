# GET ws cancel an Order

**Source:** [ws cancel an Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1902a2eb5cd)

**Category:** Websocket Trade

## Authentication

Required (Private Endpoint)

### cancel (ws cancel an Order)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: This interface supports websocket cancel an order placement for Coin-M Swaps.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/swap-trade |
| Online (preferred by aws customers) | wss://api.hbdm.vn/swap-trade |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，cancel |
| cid | string | Optional; ID Client requests unique ID |
| data | string | cancellation parameters |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| order\_id | string | false | Order ID（different IDs are separated by ",", maximum 10 orders can be withdrew at one time） |  |  |
| client\_order\_id | string | false | Client order ID (different IDs are separated by ",", maximum 10 orders can be withdrew at one time) |  |  |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |  |  |
| cid | string | false | Current request's ID |  |  |

Notes: Both order\_id and client\_order\_id can be used for order withdrawl，one of them needed at one time，if both of them are set，the default will be order id。 The return data from cancel An Order Interface only means that order cancelation designation is executed successfully. To check cancelation result, please check your order status at Get Information Of An Order interface. client\_order\_id, order status query is available for orders placed within 8 hours; Otherwise, clients cannot check orders placed beyond 8 hours.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DICT>(ATTRIBUTE NAME: DATA\_START |  | false |  |  |
| LIST>(ATTRIBUTE NAME: ERRORS\_START |  | false |  |  |
| order\_id | string | true | Order ID |  |
| err\_code | int | true | Error code |  |
| err\_msg | string | true | Error information |  |
| LIST\_END |  | false |  |  |
| successes | string | true | Successfully withdrew list of order\_id or client\_order\_id |  |
| DICT\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Subscription Example

{

"op":

"cancel"

"cid":

"40sG903yz80oDFWr"

"data":{

"order\_id":

"123456"

"client\_order\_id":

"321456"

"contract\_code":

"BTC-USD"

}

}

#### Example of a Successful Subscription

{

"status":

"ok"

"cid":

"40sG903yz80oDFWr"

"data":{

"errors":\[

0:{

"order\_id":

"768503271974985728"

"err\_code":

1061

"err\_msg":

"This order doesnt exist."

}

\]

"successes":

"771038212360937472"

}

"ts":

1603871877639

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data