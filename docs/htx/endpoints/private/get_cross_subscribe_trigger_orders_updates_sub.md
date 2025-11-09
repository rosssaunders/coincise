# GET [Cross] Subscribe trigger orders updates(sub)

**Source:**
[[Cross] Subscribe trigger orders updates(sub)](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7e753-77b5-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### trigger_order_cross.$contract_code (\[Cross\] Subscribe trigger orders updates(sub))

Signature verification: No

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY
Verification: Each UID can build at most create 30 WS connections for private
order push at the same time. For each account, contracts of the same underlying
coin only need to subscribe one WS order push, e.g. users only need to create
one WS order push connection for BTC Contract which will automatically push
orders of BTC-USDT contracts. Please note that the rate limit of WS order push
and RESTFUL private interface are separated from each other, with no relations.

Interface description: The interface only supports cross margin mode. The
request parameter "contract_code" supports the contract code of futures, in that
the format is BTC-USDT-210625.

#### Subscription Address

| Environment                         | Address                                     |
| ----------------------------------- | ------------------------------------------- |
| Online                              | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification  |

#### Request Parameter

| Field Name | Type   | Description                                                                                                                 |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------- |
| op         | string | Required； Operator Name，value for unsubscribe is unsub;                                                                   |
| cid        | string | Optional; ID Client requests unique ID                                                                                      |
| topic      | string | Required；Unsubscribe Topic Name, format: orders.$contract_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub)                     | Unsubscribe( unsub )               | Rule        |
| ---------------------------------- | ---------------------------------- | ----------- |
| trigger_order_cross.\*             | trigger_order_cross.\*             | Allowed     |
| trigger_order_cross.contract_code1 | trigger_order_cross.\*             | Allowed     |
| trigger_order_cross.contract_code1 | trigger_order_cross.contract_code1 | Allowed     |
| trigger_order_cross.contract_code1 | trigger_order_cross.contract_code1 | Not Allowed |
| trigger_order_cross.\*             | trigger_order_cross.contract_code1 | Not Allowed |

#### Subscription Parameter

| Parameter     | Data Type | Required | Description          | Value Range                                                                   | Default Value |
| ------------- | --------- | -------- | -------------------- | ----------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code        | all: \*(swap and future), swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |               |
| cid           | string    | false    | Current request's ID |                                                                               |               |

#### Data Update

| Parameter         | Data Type    | Required | Description                                                                                                      | Value Range                                                                                                                       |
| ----------------- | ------------ | -------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| op                | string       | true     | operaton name, fixed as notify                                                                                   |                                                                                                                                   |
| topic             | string       | true     | topic                                                                                                            |                                                                                                                                   |
| ts                | long         | true     | Time of Respond Generation, Unit: Millisecond                                                                    |                                                                                                                                   |
| uid               | string       | true     | uid                                                                                                              |                                                                                                                                   |
| event             | string       | true     | event                                                                                                            | order，cancel，trigger_success，trigger_fail                                                                                      |
| DATA_START        | object array | true     |                                                                                                                  |                                                                                                                                   |
| symbol            | string       | true     | symbol                                                                                                           |                                                                                                                                   |
| contract_code     | string       | true     | contract code                                                                                                    | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                                                                               |
| margin_mode       | string       | true     | margin mode                                                                                                      | cross: cross margin mode                                                                                                          |
| margin_account    | string       | true     | margin account                                                                                                   | "USDT"...                                                                                                                         |
| trigger_type      | string       | true     | trigger type： ge great than or equal to；le less than or equal to                                               |                                                                                                                                   |
| volume            | decimal      | true     | place volume                                                                                                     |                                                                                                                                   |
| order_type        | int          | true     | order type                                                                                                       | 1\. Place orders                                                                                                                  |
| direction         | string       | true     | direction                                                                                                        | "buy"/"sell"                                                                                                                      |
| offset            | string       | true     | "open", "close"                                                                                                  | "open","close",both                                                                                                               |
| lever_rate        | int          | true     | leverage                                                                                                         |                                                                                                                                   |
| order_id          | decimal      | true     | order ID                                                                                                         |                                                                                                                                   |
| order_id_str      | string       | true     | order ID                                                                                                         |                                                                                                                                   |
| relation_order_id | string       | true     | Relation order ID is the string related to the limit orders, The value is -1 before the trigger orders executed. |                                                                                                                                   |
| order_price_type  | string       | true     | type of order price                                                                                              | "limit"，"optimal_5"，"optimal_10"，"optimal_20"                                                                                  |
| status            | int          | true     | order status                                                                                                     | 2\. Ready to submit the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; |
| order_source      | string       | true     | order source                                                                                                     | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger                                                        |
| trigger_price     | decimal      | true     | trigger price                                                                                                    |                                                                                                                                   |
| triggered_price   | decimal      | true     | triggered price                                                                                                  |                                                                                                                                   |
| order_price       | decimal      | true     | order price                                                                                                      |                                                                                                                                   |
| created_at        | long         | true     | created time                                                                                                     |                                                                                                                                   |
| triggered_at      | long         | true     | triggered time                                                                                                   |                                                                                                                                   |
| order_insert_at   | long         | true     | insert time                                                                                                      |                                                                                                                                   |
| canceled_at       | long         | true     | canceled time                                                                                                    |                                                                                                                                   |
| fail_code         | int          | true     | fail code                                                                                                        |                                                                                                                                   |
| fail_reason       | string       | true     | fail reason                                                                                                      |                                                                                                                                   |
| contract_type     | string       | true     | contract type                                                                                                    | swap, this_week, next_week, quarter, next_quarter                                                                                 |
| pair              | string       | true     | pair                                                                                                             | such as: “BTC-USDT”                                                                                                               |
| business_type     | string       | true     | business type                                                                                                    | futures, swap                                                                                                                     |
| reduce_only       | int          | true     | reduce only                                                                                                      | 0: no, 1: yes                                                                                                                     |
| DATA_END          |              | false    |                                                                                                                  |                                                                                                                                   |

Notes:  
The intermediate states processed by the order status system will not be pushed,
such as in the progress of placing an order, The descriptions of specific event
notifications are as below:  
when the order status is 2（Submitted），event notification is order（trigger
order placed successfully）；  
when the order status is 4（Order placed successfully），event notification is
trigger_success（trigger order triggered successfully）；  
when the order status is 6（Canceled），event notification is cancel（trigger
order canceled successfully）；  
when the order status is 5（Order failed to be placed），event notification is
trigger_fail（trigger order failed to be triggered）；  
Single coin cannot be re-suscribed, and all coins subscription can cover single
coin subscription; single coin cannot be subscribed after subscribing all coins.

#### Subscription Example

{

"op":

"sub"

"topic":

"trigger_order_cross.BTC-USDT"

"cid":

"40sG903yz80oDFWr"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"trigger_order.BTC-USDT"

"ts":

1670903745088

"err-code":

0

}

#### Example of a Data Update

{

"op":

"notify"

"topic":

"trigger_order_cross.\*"

"ts":

1639123353369

"event":

"order"

"uid":

"123456789"

"data":\[

0:{

"contract_type":

"swap"

"pair":

"BTC-USDT"

"business_type":

"swap"

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"trigger_type":

"le"

"volume":

1

"order_type":

1

"direction":

"buy"

"offset":

"open"

"lever_rate":

1

"order_id":

918895474461802500

"order_id_str":

"918895474461802496"

"relation_order_id":

"-1"

"order_price_type":

"limit"

"status":

2

"order_source":

"api"

"trigger_price":

40000

"triggered_price":

NULL

"order_price":

40000

"created_at":

1639123353364

"triggered_at":

0

"order_insert_at":

0

"canceled_at":

0

"fail_code":

NULL

"fail_reason":

NULL

"margin_mode":

"cross"

"margin_account":

"USDT"

"reduce_only":

0

}

\]

}

#### Example of a Subscription Cancellation

{

"op":

"unsub"

"topic":

"trigger_order_cross.BTC-USDT"

"cid":

"40sG903yz80oDFWr"

}
