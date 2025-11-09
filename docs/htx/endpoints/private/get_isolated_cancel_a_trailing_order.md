# GET [Isolated]Cancel a Trailing Order

**Source:** [[Isolated]Cancel a Trailing Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb88f2c-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_track\_cancel (\[Isolated\]Cancel a Trailing Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: This interface only supports isolated margin mode. The frequency limit of this interface is 5 times per second.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | BTC-USDT |  |
| order\_id | string | true | User's trailing order id (multiple order IDs are separated by ",", a maximum of 10 orders are allowed to be withdrawn at a time) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the result of server handling to request | "ok" :success, "error": failed |
| DATA\_START | object | true |  | dictionary |
| ERRORS\_START | object | true |  | dictionary |
| order\_id | string | true | trailing order id\[Globally Unique\] |  |
| err\_code | long | false | error code |  |
| err\_msg | string | false | error msg |  |
| ERRORS\_END |  | false |  |  |
| successes | string | true | the orders that are success |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"order\_id":

"456457123"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"errors":\[

0:{

"order\_id":

"826052268312821761"

"err\_code":

1061

"err\_msg":

"This order doesnt exist."

}

\]

"successes":

"826052268312821760"

}

"ts":

1616988039695

}