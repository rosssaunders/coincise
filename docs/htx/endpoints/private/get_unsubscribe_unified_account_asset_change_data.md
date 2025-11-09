# GET Unsubscribe Unified Account Asset Change Data

**Source:**
[Unsubscribe Unified Account Asset Change Data](https://www.htx.com/en-us/opend/newApiPages/?id=10000086-77b7-11ed-9966-0242ac110003)

**Category:** USDT-M Unified Account

## Authentication

Required (Private Endpoint)

### accounts_unify.USDT (Unsubscribe Unified Account Asset Change Data)

Signature verification: Yes

Interface permission: Read

Interface description: It is used for real-time monitoring of asset changes in
the unified account.

#### Subscription Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Field Name | Type   | Description                                                                                                                                                                                           |
| ---------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| op         | string | Required; operation name, subscription fixed value is unsub                                                                                                                                           |
| cid        | string | Optional; Client requests a unique ID                                                                                                                                                                 |
| topic      | string | Required; subscription topic name, required (accounts.$contract_code) Subscribe and unsubscribe the asset change information of the unified account, and the value of $contract_code is fixed as USDT |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| -------------- | -------------------- | ---- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --------- | --------- | -------- | ----------- | ----------- | ------------- |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --------- | --------- | -------- | ----------- | ----------- |

#### Subscription Example

{

"op":

"unsub"

"topic":

"accounts_unify.USDT"

"cid":

"40sG903yz80oDFWr"

}

#### Example of a Successful Subscription

No data

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data
