# GET 【Coin-M Swaps】Unsubscribe Liquidation Order Data（unsub）

**Source:**
[【Coin-M Swaps】Unsubscribe Liquidation Order Data（unsub）](https://www.htx.com/en-us/opend/newApiPages/?id=10000061-77b7-11ed-9966-0242ac110003)

**Category:** Downline Interface

## Authentication

Required (Private Endpoint)

### public.$contract_code.liquidation_orders (【Coin-M Swaps】Unsubscribe Liquidation Order Data（unsub）)

Signature verification: Yes

Interface permission: Read

#### Subscription Address

| Environment | Address |
| ----------- | ------- |

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

"public.BTC-USD.liquidation_orders"

"cid":

"40sG903yz80oDFWr"

}

#### Example of a Successful Subscription

No data

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data
