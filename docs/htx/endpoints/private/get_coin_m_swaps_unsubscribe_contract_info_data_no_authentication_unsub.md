# GET 【Coin-M Swaps】Unsubscribe Contract Info Data(no authentication)(unsub)

**Source:**
[【Coin-M Swaps】Unsubscribe Contract Info Data(no authentication)(unsub)](https://www.htx.com/en-us/opend/newApiPages/?id=10000063-77b7-11ed-9966-0242ac110003)

**Category:** Downline Interface

## Authentication

Required (Private Endpoint)

### public.$contract_code.contract_info (【Coin-M Swaps】Unsubscribe Contract Info Data(no authentication)(unsub) )

Signature verification: Yes

Interface permission: Read

#### Subscription Address

| Environment | Address |
| ----------- | ------- |

#### Request Parameter

| Field Name | Type   | Description                                                                                                                                                                                                                                                  |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| op         | string | 必填;操作名称，订阅固定值为 unsub;                                                                                                                                                                                                                           |
| cid        | string | 选填;Client 请求唯一 ID                                                                                                                                                                                                                                      |
| topic      | string | Subscribe topic name，Require subscribe public.$contract_code.contract_info Subscribe/unsubscribe the data of a given contract code; when the $contract_code value is \*, it stands for subscribing/unsubscribing all the funding rates of contract codes，; |

#### Rule description

| Subscribe(sub)                     | Unsubscribe( unsub )                | Rule        |
| ---------------------------------- | ----------------------------------- | ----------- |
| public.\*.contract_info            | public.\*.contract_info             | Allowed     |
| public.contract_code1.funding_rate | public.\*.contract_info             | Allowed     |
| public.contract_code1.funding_rate | public.contract_code1.contract_info | Allowed     |
| public.contract_code1.funding_rate | public.contract_code2.contract_info | Not Allowed |
| public.\*.contract_info            | public.contract_code1.contract_info | Not Allowed |

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

"public.BTC-USD.contract_info"

"cid":

"40sG903yz80oDFWr"

}

#### Example of a Successful Subscription

No data

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data
