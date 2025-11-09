# GET [Isolated] Unsubscribe Account Equity Updates Data (ubsub)

**Source:**
[[Isolated] Unsubscribe Account Equity Updates Data (ubsub)](https://www.htx.com/en-us/opend/newApiPages/?id=10000015-77b7-11ed-9966-0242ac110003)

**Category:** Downline Interface

## Authentication

Required (Private Endpoint)

### accounts.$contract_code (\[Isolated\] Unsubscribe Account Equity Updates Data (ubsub))

Signature verification: Yes

Interface permission: Read

Interface description: This interface only supports isolated margin mode.

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

| Subscribe(sub)          | Unsubscribe( unsub )    | Rule        |
| ----------------------- | ----------------------- | ----------- |
| accounts.\*             | accounts.\*             | Allowed     |
| accounts.contract_code1 | accounts.\*             | Allowed     |
| accounts.contract_code1 | accounts.contract_code1 | Allowed     |
| accounts.contract_code1 | accounts.contract_code1 | Not Allowed |
| accounts.\*             | accounts.contract_code1 | Not Allowed |

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

"accounts.BTC-USDT"

"cid":

"40sG903yz80oDFWr"

}

#### Example of a Successful Subscription

No data

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data
