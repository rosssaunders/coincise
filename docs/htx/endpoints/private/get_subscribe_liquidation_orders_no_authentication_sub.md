# GET Subscribe Liquidation Orders (no authentication) (sub)

**Source:**
[Subscribe Liquidation Orders (no authentication) (sub)](https://www.htx.com/en-us/opend/newApiPages/?id=5d51592a-77b6-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### public.$contract_code.liquidation_orders (Subscribe Liquidation Orders (no authentication) (sub))

Signature verification: Yes

Interface permission: Read

#### Subscription Address

| Environment                         | Address                              |
| ----------------------------------- | ------------------------------------ |
| Online                              | wss://api.hbdm.com/swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/swap-notification  |

#### Request Parameter

| Field Name | Type   | Description                                                                                                                                                                                                                            |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| op         | string | Required;Operator Name，value for unsubscribe is unsub;                                                                                                                                                                                |
| cid        | string | Optional; Client requests unique ID                                                                                                                                                                                                    |
| topic      | string | Subscribe topic name，Require subscribe public.$contract_code.liquidation_orders Subscribe/unsubscribe the data of a given coin; when the $contract_code value is \*, it stands for subscribing/unsubscribing the data of all coins，; |

#### Rule description

| Subscribe(sub)                           | Unsubscribe( unsub )                     | Rule        |
| ---------------------------------------- | ---------------------------------------- | ----------- |
| public.\*.liquidation_orders             | public.\*.liquidation_orders             | Allowed     |
| public.contract_code1.liquidation_orders | public.\*.liquidation_orders             | Allowed     |
| public.contract_code1.liquidation_orders | public.contract_code1.liquidation_orders | Allowed     |
| public.contract_code1.liquidation_orders | public.contract_code2.liquidation_orders | Not Allowed |
| public.\*.liquidation_orders             | public.contract_code1.liquidation_orders | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description                                                                                                                                                       | Value Range | Default Value |
| --------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| op        | string    | true     | Required； Operator Name，required subscribe value is sub                                                                                                         |             |               |
| cid       | string    | false    | Optional; ID Client requests unique ID                                                                                                                            |             |               |
| topic     | string    | true     | Required；Topic name format: public.$contract_code.liquidation_orders. contract_code is case-insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |             |               |

#### Data Update

| Parameter     | Data Type    | Required | Description                                   | Value Range |
| ------------- | ------------ | -------- | --------------------------------------------- | ----------- |
| op            | string       | true     | value: 'notify';                              |             |
| topic         | string       | true     | topic subscribed                              |             |
| ts            | long         | true     | Time of Respond Generation，Unit：Millisecond |             |
| DATA_START    | array object | true     |                                               |             |
| symbol        | string       | true     | Coin                                          |             |
| contract_code | string       | true     | swap code E.G.: "BTC-USD"                     |             |
| direction     | string       | true     | Long or short                                 |             |
| offset        | string       | true     | Open or close                                 |             |
| volume        | decimal      | true     | liquidation volume (cotn)                     |             |
| amount        | decimal      | true     | liquidation amount (token)                    |             |
| price         | decimal      | true     | bankruptcy price                              |             |
| created_at    | long         | true     | Order Creation Time                           |             |
| DATA_END      |              | false    |                                               |             |

#### Subscription Example

{

"op":

"sub"

"cid":

"id generated by client"

"topic":

"public.swap.heartbeat"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"public.BTC-USD.liquidation_orders"

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

"public.BTC-USD.liquidation_orders"

"ts":

1603879731301

"data":\[

0:{

"contract_code":

"BTC-USD"

"symbol":

"BTC"

"direction":

"buy"

"offset":

"close"

"volume":

173

"price":

17102.9

"created_at":

1606381842485

"amount":

1.0115243613656164

}

\]

}

#### Example of a Subscription Cancellation

{

"op":

"unsub"

"topic":

"public.BTC-USD.liquidation_orders"

"cid":

"40sG903yz80oDFWr"

}
