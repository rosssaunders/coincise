# GET [Cross] Unsubscribe Position Updates Data（unsub）

**Source:** [[Cross] Unsubscribe Position Updates Data（unsub）](https://www.htx.com/en-us/opend/newApiPages/?id=10000018-77b7-11ed-9966-0242ac110003)

**Category:** Downline Interface

## Authentication

Required (Private Endpoint)

### positions\_cross.$contract\_code (\[Cross\] Unsubscribe Position Updates Data（unsub）)

Signature verification: Yes

Interface permission: Read

Interface description: The interface only supports cross margin mode.The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625.

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
| positions\_cross.\* | positions\_cross.\* | Allowed |
| positions\_cross.contract\_code1 | positions\_cross.\* | Allowed |
| positions\_cross.contract\_code1 | positions\_cross.contract\_code1 | Allowed |
| positions\_cross.contract\_code1 | positions\_cross.contract\_code1 | Not Allowed |
| positions\_cross.\* | positions\_cross.contract\_code1 | Not Allowed |

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

"positions\_cross.BTC-USDT"

"cid":

"40sG903yz80oDFWr"

}

#### Example of a Successful Subscription

No data

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data