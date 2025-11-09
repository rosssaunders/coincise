# GET [Cross] Unsubscribe Match Order Data（unsub）

**Source:**
[[Cross] Unsubscribe Match Order Data（unsub）](https://www.htx.com/en-us/opend/newApiPages/?id=10000020-77b7-11ed-9966-0242ac110003)

**Category:** Downline Interface

## Authentication

Required (Private Endpoint)

### matchOrders_cross.$contract_code (\[Cross\] Unsubscribe Match Order Data（unsub）)

Signature verification: Yes

Interface permission: Read

Interface description: The interface only supports cross margin mode.The request
parameter "contract_code" supports the contract code of futures, in that the
format is BTC-USDT-210625.

#### Subscription Address

| Environment | Address |
| ----------- | ------- |

#### Request Parameter

| Field Name | Type   | Description                                                                                                                 |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------- |
| op         | string | Required； Operator Name，value for unsubscribe is unsub;                                                                   |
| cid        | string | Optional; ID Client requests unique ID                                                                                      |
| topic      | string | Required；Unsubscribe Topic Name, format: orders.$contract_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub)                   | Unsubscribe( unsub )             | Rule        |
| -------------------------------- | -------------------------------- | ----------- |
| matchOrders_cross.\*             | matchOrders_cross.\*             | Allowed     |
| matchOrders_cross.contract_code1 | matchOrders_cross.\*             | Allowed     |
| matchOrders_cross.contract_code1 | matchOrders_cross.contract_code1 | Allowed     |
| matchOrders_cross.contract_code1 | matchOrders_cross.contract_code1 | Not Allowed |
| matchOrders_cross.\*             | matchOrders_cross.contract_code1 | Not Allowed |

#### Subscription Parameter

| Parameter     | Data Type | Required | Description                                                         | Value Range | Default Value |
| ------------- | --------- | -------- | ------------------------------------------------------------------- | ----------- | ------------- |
| contract_code | string    | true     | \* all(it means to unsubscribe the all orders) BTC-USDT,ETH-USDT... |             |               |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --------- | --------- | -------- | ----------- | ----------- |

#### Subscription Example

{

"op":

"unsub"

"topic":

"matchOrders_cross.BTC-USDT"

"cid":

"40sG903yz80oDFWr"

}

#### Example of a Successful Subscription

No data

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data
