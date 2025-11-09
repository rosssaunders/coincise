# GET [General] Unsubscribe Funding Rate Data(no authentication)(unsub)

**Source:** [[General] Unsubscribe Funding Rate Data(no authentication)(unsub)](https://www.htx.com/en-us/opend/newApiPages/?id=10000022-77b7-11ed-9966-0242ac110003)

**Category:** Downline Interface

## Authentication

Required (Private Endpoint)

### public.$contract\_code.funding\_rate (\[General\] Unsubscribe Funding Rate Data(no authentication)(unsub))

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
| public.\*.funding\_rate | public.\*.funding\_rate | Allowed |
| public.contract\_code1.funding\_rate | public.\*.funding\_rate | Allowed |
| public.contract\_code1.funding\_rate | public.contract\_code1.funding\_rate | Allowed |
| public.contract\_code1.funding\_rate | public.contract\_code1.funding\_rate | Not Allowed |
| public.\*.funding\_rate | public.contract\_code1.funding\_rate | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | \* all(it means to unsubscribe the all orders) BTC-USDT,ETH-USDT... |  |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |

#### Subscription Example

{

"op":

"unsub"

"topic":

"public.BTC-USDT.funding\_rate"

"cid":

"40sG903yz80oDFWr"

}

#### Example of a Successful Subscription

No data

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data