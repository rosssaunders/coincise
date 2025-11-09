# GET [General] Unsubscribe Contract Info Data(no authentication)(unsub)

**Source:** [[General] Unsubscribe Contract Info Data(no authentication)(unsub)](https://www.htx.com/en-us/opend/newApiPages/?id=10000023-77b7-11ed-9966-0242ac110003)

**Category:** Downline Interface

## Authentication

Required (Private Endpoint)

### public.$contract\_code.contract\_info (\[General\] Unsubscribe Contract Info Data(no authentication)(unsub))

Signature verification: No

Interface permission: Read

Interface description: The interface supports cross margin mode and isolated margin mode.

#### Subscription Address

| Environment | Address |
| --- | --- |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，value for unsubscribe is unsub; |
| cid | string | Optional; ID Client requests unique ID |
| topic | string | Required；Unsubscribe Topic Name, format: orders.$contract\_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| public.\*.contract\_info | public.\*.contract\_info | Allowed |
| public.contract\_code1.contract\_info | public.\*.contract\_info | Allowed |
| public.contract\_code1.contract\_info | public.contract\_code1.contract\_info | Allowed |
| public.contract\_code1.contract\_info | public.contract\_code1.contract\_info | Not Allowed |
| public.\*.contract\_info | public.contract\_code1.contract\_info | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | \* all(it means to unsubscribe the all orders) BTC-USDT,ETH-USDT... |  |  |

Notes:  
The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625.  
unsubscripting \* is ok under business\_type filled in. when business\_type is swap, unsubscripting \* means to unsubscripting all swap contracts; when business\_type is futures, unsubscripting \* means to unsubscripting all futures contracts;  
unsubscription scope must be greater than or equal to the subscription scope and in that it just can be success.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |

#### Subscription Example

{

"op":

"unsub"

"topic":

"public.BTC-USDT.contract\_info"

"cid":

"40sG903yz80oDFWr"

}

#### Example of a Successful Subscription

No data

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data