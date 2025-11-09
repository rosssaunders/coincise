# GET 【Coin-M Swaps】Unsubscribe Funding Rate Data(no authentication)(unsub)

**Source:**
[【Coin-M Swaps】Unsubscribe Funding Rate Data(no authentication)(unsub)](https://www.htx.com/en-us/opend/newApiPages/?id=10000062-77b7-11ed-9966-0242ac110003)

**Category:** Downline Interface

## Authentication

Required (Private Endpoint)

### public.$contract_code.funding_rate (【Coin-M Swaps】Unsubscribe Funding Rate Data(no authentication)(unsub))

Signature verification: Yes

Interface permission: Read

#### Subscription Address

| Environment | Address |
| ----------- | ------- |

#### Request Parameter

| Field Name | Type   | Description                                                                                                                                                                                                                                                 |
| ---------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| op         | string | Required;Operator Name，value for unsubscribe is unsub;                                                                                                                                                                                                     |
| cid        | string | Optional; Client requests unique ID                                                                                                                                                                                                                         |
| topic      | string | Subscribe topic name，Require subscribe public.$contract_code.funding_rate Subscribe/unsubscribe the data of a given contract code; when the $contract_code value is \*, it stands for subscribing/unsubscribing all the funding rates of contract codes，; |

#### Rule description

| Subscribe(sub)                     | Unsubscribe( unsub )               | Rule        |
| ---------------------------------- | ---------------------------------- | ----------- |
| public.\*.funding_rate             | public.\*.funding_rate             | allowd      |
| public.contract_code1.funding_rate | public.\*.funding_rate             | allowd      |
| public.contract_code1.funding_rate | public.contract_code1.funding_rate | allowd      |
| public.contract_code1.funding_rate | public.contract_code2.funding_rate | not allowed |
| public.\*.funding_rate             | public.contract_code1.funding_rate | not allowed |

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

"public.BTC-USD.funding_rate"

"cid":

"40sG903yz80oDFWr"

}

#### Example of a Successful Subscription

No data

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data
