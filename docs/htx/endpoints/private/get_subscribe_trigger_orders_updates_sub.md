# GET Subscribe trigger orders updates(sub)

**Source:**
[Subscribe trigger orders updates(sub)](https://www.htx.com/en-us/opend/newApiPages/?id=5d515fbf-77b6-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### trigger_order.$contract_code (Subscribe trigger orders updates(sub))

Signature verification: Yes

Interface permission: Read

#### Subscription Address

| Environment                         | Address                              |
| ----------------------------------- | ------------------------------------ |
| Online                              | wss://api.hbdm.com/swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/swap-notification  |

#### Request Parameter

| Field Name | Type   | Description                                                                                                                                                                                                                                                 |
| ---------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| op         | string | Required;Operator Name，value for unsubscribe is unsub;                                                                                                                                                                                                     |
| cid        | string | Optional; Client requests unique ID                                                                                                                                                                                                                         |
| topic      | string | Subscribe topic name，Require subscribe public.$contract_code.funding_rate Subscribe/unsubscribe the data of a given contract code; when the $contract_code value is \*, it stands for subscribing/unsubscribing all the funding rates of contract codes，; |

#### Rule description

| Subscribe(sub)                     | Unsubscribe( unsub )               | Rule        |
| ---------------------------------- | ---------------------------------- | ----------- |
| public.\*.funding_rate             | public.\*.funding_rate             | allowd      |
| public.contract_code1.funding_rate | public.\*.funding_rate             | allowd      |
| public.contract_code1.funding_rate | public.contract_code1.funding_rate | allowd      |
| public.contract_code1.funding_rate | ublic.contract_code2.funding_rate  | not allowed |
| public.\*.funding_rate             | public.contract_code1.funding_rate | not allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description                                                                                                                                | Value Range | Default Value |
| --------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | ------------- |
| op        | string    | true     | Required； Operator Name，required subscribe value is sub                                                                                  |             |               |
| cid       | string    | false    | Optional; ID Client requests unique ID                                                                                                     |             |               |
| topic     | string    | true     | Required；format: trigger_order.$contract_code; contract_code is case-insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |             |               |

#### Data Update

| Parameter         | Data Type    | Required | Description                                                                                                      | Value Range                                                                                                                                                                              |
| ----------------- | ------------ | -------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| op                | string       | true     | Required;Operator Name，Order push value is notify                                                               |                                                                                                                                                                                          |
| topic             | string       | true     | Required; Order push topic                                                                                       |                                                                                                                                                                                          |
| ts                | long         | true     | Time of Respond Generation, Unit: Millisecond                                                                    |                                                                                                                                                                                          |
| uid               | string       | true     | account uid                                                                                                      |                                                                                                                                                                                          |
| event             | string       | true     | Event notification description                                                                                   | trigger order placed successfully（order），trigger order canceled successfully（cancel），order triggered successfully（trigger_success），order failed to be triggered（trigger_fail） |
| DATA_START        | object array | true     |                                                                                                                  |                                                                                                                                                                                          |
| symbol            | string       | true     | Variety code                                                                                                     |                                                                                                                                                                                          |
| contract_code     | string       | true     | contract code                                                                                                    | "BTC-USD" ...                                                                                                                                                                            |
| trigger_type      | string       | true     | trigger type： ge great than or equal to；le less than or equal to                                               |                                                                                                                                                                                          |
| volume            | decimal      | true     | trigger order volume                                                                                             |                                                                                                                                                                                          |
| order_type        | int          | true     | Transaction Type                                                                                                 | 1\. Place orders                                                                                                                                                                         |
| direction         | string       | true     | order direction                                                                                                  | \[buy,sell\]                                                                                                                                                                             |
| offset            | string       | true     | offset direction                                                                                                 | \[open,close\]                                                                                                                                                                           |
| lever_rate        | int          | true     | Leverage                                                                                                         |                                                                                                                                                                                          |
| order_id          | decimal      | true     | trigger order ID                                                                                                 |                                                                                                                                                                                          |
| order_id_str      | string       | true     | the order ID with string                                                                                         |                                                                                                                                                                                          |
| relation_order_id | string       | true     | Relation order ID is the string related to the limit orders, The value is -1 before the trigger orders executed. |                                                                                                                                                                                          |
| order_price_type  | string       | true     | Order price type                                                                                                 | "limit": limit order，"optimal_5":optimal 5，"optimal_10":optimal 10，"optimal_30":optimal 30                                                                                            |
| status            | int          | true     | order status                                                                                                     | 3\. Ready to submit the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched;                                                        |
| order_source      | string       | true     | Order Source                                                                                                     | （system、web、api、m、risk、settlement、ios、android、windows、mac、trigger ）                                                                                                          |
| trigger_price     | decimal      | true     | trigger price                                                                                                    |                                                                                                                                                                                          |
| triggered_price   | decimal      | true     | the price when trigger orders executed                                                                           |                                                                                                                                                                                          |
| order_price       | decimal      | true     | the preset price by the client                                                                                   |                                                                                                                                                                                          |
| created_at        | long         | true     | order creation time                                                                                              |                                                                                                                                                                                          |
| triggered_at      | long         | true     | the execution time when orders getting triggered                                                                 |                                                                                                                                                                                          |
| order_insert_at   | long         | true     | the time when the triggered orders filled successfully                                                           |                                                                                                                                                                                          |
| canceled_at       | long         | true     | Order cancelation time                                                                                           |                                                                                                                                                                                          |
| fail_code         | int          | true     | the error code when the triggered orders failed to be filled                                                     |                                                                                                                                                                                          |
| fail_reason       | string       | true     | the error message with failure reason when triggered orders failed to filled                                     |                                                                                                                                                                                          |
| DATA_END          |              | false    |                                                                                                                  |                                                                                                                                                                                          |

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

"trigger_order.BTC-USD"

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

"trigger_order.BTC-USD"

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

"trigger_order.theta-usd"

"ts":

1603880263724

"event":

"order"

"uid":

"123456789"

"data":\[

0:{

"symbol":

"THETA"

"contract_code":

"THETA-USD"

"trigger_type":

"le"

"volume":

20

"order_type":

1

"direction":

"buy"

"offset":

"open"

"lever_rate":

20

"order_id":

7002244

"order_id_str":

"7002244"

"relation_order_id":

"-1"

"order_price_type":

"limit"

"status":

2

"order_source":

"web"

"trigger_price":

0.59

"triggered_price":

NULL

"order_price":

0.59

"created_at":

1603880263721

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

}

\]

}

#### Example of a Subscription Cancellation

{

"op":

"unsub"

"topic":

"trigger_order.BTC-USD"

"cid":

"40sG903yz80oDFWr"

}
