# GET [Isolated] Subscribe trigger orders updates(sub)

**Source:**
[[Isolated] Subscribe trigger orders updates(sub)](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7e5fc-77b5-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### trigger_order.$contract_code (\[Isolated\] Subscribe trigger orders updates(sub))

Signature verification: Yes

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY
Verification: Each UID can build at most create 30 WS connections for private
order push at the same time. For each account, contracts of the same underlying
coin only need to subscribe one WS order push, e.g. users only need to create
one WS order push connection for BTC Contract which will automatically push
orders of BTC-USDT contracts. Please note that the rate limit of WS order push
and RESTFUL private interface are separated from each other, with no relations.

Interface description: This interface only supports isolated margin mode.

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

| Subscribe(sub)               | Unsubscribe( unsub )         | Rule        |
| ---------------------------- | ---------------------------- | ----------- |
| trigger_order.\*             | trigger_order.\*             | Allowed     |
| trigger_order.contract_code1 | trigger_order.\*             | Allowed     |
| trigger_order.contract_code1 | trigger_order.contract_code1 | Allowed     |
| trigger_order.contract_code1 | trigger_order.contract_code1 | Not Allowed |
| trigger_order.\*             | trigger_order.contract_code1 | Not Allowed |

#### Subscription Parameter

| Parameter     | Data Type | Required | Description          | Value Range                                                         | Default Value |
| ------------- | --------- | -------- | -------------------- | ------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code        | "\*" all(it means to subscribe the all trigger order) "BTC-USDT"... |               |
| cid           | string    | false    | Current request's ID |                                                                     |               |

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
| contract_code     | string       | true     | contract code                                                                                                    | "BTC-USDT" ...                                                                                                                                                                           |
| trigger_type      | string       | true     | trigger type： ge great than or equal to；leless than or equal to                                                |                                                                                                                                                                                          |
| volume            | decimal      | true     | trigger order volume                                                                                             |                                                                                                                                                                                          |
| order_type        | int          | true     | Transaction Type                                                                                                 | 1\. Place orders                                                                                                                                                                         |
| direction         | string       | true     | order direction                                                                                                  | \[buy,sell\]                                                                                                                                                                             |
| offset            | string       | true     | offset direction                                                                                                 | \[open,close,both\]                                                                                                                                                                      |
| lever_rate        | int          | true     | Leverage                                                                                                         |                                                                                                                                                                                          |
| order_id          | decimal      | true     | trigger order ID                                                                                                 |                                                                                                                                                                                          |
| order_id_str      | string       | true     | the order ID with string                                                                                         |                                                                                                                                                                                          |
| relation_order_id | string       | true     | Relation order ID is the string related to the limit orders, The value is -1 before the trigger orders executed. |                                                                                                                                                                                          |
| order_price_type  | string       | true     | Order price type                                                                                                 | "limit": limit order，"optimal_5":optimal 5，"optimal_10":optimal 10，"optimal_20":optimal 20                                                                                            |
| status            | int          | true     | order status                                                                                                     | 2\. Ready to submit the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched;                                                        |
| order_source      | string       | true     | Order Source                                                                                                     | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger                                                                                                               |
| trigger_price     | decimal      | true     | trigger price                                                                                                    |                                                                                                                                                                                          |
| triggered_price   | decimal      | true     | the price when trigger orders executed                                                                           |                                                                                                                                                                                          |
| order_price       | decimal      | true     | the preset price by the client                                                                                   |                                                                                                                                                                                          |
| created_at        | long         | true     | order creation time                                                                                              |                                                                                                                                                                                          |
| triggered_at      | long         | true     | the execution time when orders getting triggered                                                                 |                                                                                                                                                                                          |
| order_insert_at   | long         | true     | the time when the triggered orders filled successfully                                                           |                                                                                                                                                                                          |
| canceled_at       | long         | true     | Order cancelation time                                                                                           |                                                                                                                                                                                          |
| fail_code         | string       | true     | the error code when the triggered orders failed to be filled                                                     |                                                                                                                                                                                          |
| fail_reason       | string       | true     | the error message with failure reason when triggered orders failed to filled                                     |                                                                                                                                                                                          |
| margin_mode       | int          | true     | margin mode                                                                                                      | isolated : "isolated"                                                                                                                                                                    |
| margin_account    | string       | true     | margin account                                                                                                   | "BTC-USDT"...                                                                                                                                                                            |
| reduce_only       | int          | true     | reduce only                                                                                                      | 0: no, 1: yes                                                                                                                                                                            |
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

"trigger_order.BTC-USDT"

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

"trigger_order.btc-usdt"

"ts":

1603778055069

"event":

"order"

"uid":

"123456789"

"data":\[

0:{

"symbol":

"BTC-USDT"

"contract_code":

"BTC-USDT"

"trigger_type":

"ge"

"volume":

1

"order_type":

1

"direction":

"sell"

"offset":

"open"

"lever_rate":

10

"order_id":

5

"order_id_str":

"5"

"relation_order_id":

"-1"

"order_price_type":

"limit"

"status":

2

"order_source":

"web"

"trigger_price":

15000

"triggered_price":

NULL

"order_price":

15000

"created_at":

1603778055064

"triggered_at":

0

"order_insert_at":

0

"canceled_at":

0

"margin_mode":

"isolated"

"margin_account":

"BTC-USDT"

"fail_code":

NULL

"fail_reason":

NULL

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

"trigger_order.BTC-USDT"

"cid":

"40sG903yz80oDFWr"

}
