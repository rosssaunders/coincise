# GET ws Batch Cancel Specified Order

**Source:** [ws Batch Cancel Specified Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1928f2fa07f)

**Category:** Websocket Trade

## Authentication

Required (Private Endpoint)

### cancel (ws Batch Cancel Specified Order)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit.If you cancel an order individually, the frequency limit for single order cancellation will be used. If you cancel orders in batches, the frequency limit for batch order cancellation will be used. They will not affect each other.

Interface description: Supports batch cancellation of specified orders via websocket.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online (preferred by aws customers) | wss://api-aws.huobi.pro/ws/trade |
| Online | wss://api.huobi.pro/ws/trade |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| ch | string | Required； Operator Name，cancel; |
| params | string | Order parameters |
| cid | string | request id |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| order-ids | string | false | The order ids to cancel (Either order-ids or client-order-ids can be filled in one batch request). It is suggest to use order-ids rather than client-order-ids, the former is faster and more stable |  | No more than 50 orders per request |
| client-order-ids | string | false | The client order ids to cancel (Either order-ids or client-order-ids can be filled in one batch request), it must exist already, otherwise it is not allowed to use when placing a new order |  | No more than 50 orders per request |
| cid | string | false | Current request's ID |  |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false |  |  |
| DATA\_START | object | false |  |  |
| success | array | false |  |  |
| FAILED\_START | object | false |  |  |
| order-id | string | false |  |  |
| client-order-id | string | false |  |  |
| err-code | string | false |  |  |
| err-msg | string | false |  |  |
| order-state | string | false |  |  |
| FAILED\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Subscription Example

{

"cid":

"70675af0-879b-11ef-9123-acde48001122"

"ch":

"cancel"

"params":{

"order-ids":\[

0

:

"1180298630694875"

1

:

"1180298630694876"

\]

}

}

#### Example of a Successful Subscription

{

"status":

"ok"

"data":{

"success":\[

0

:

"1180298630694875"

1

:

"1180298630694876"

\]

"failed":\[\]

}

"cid":

"70675af0-879b-11ef-9123-acde48001122"

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data