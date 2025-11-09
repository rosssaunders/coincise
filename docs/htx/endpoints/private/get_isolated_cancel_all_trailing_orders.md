# GET [Isolated]Cancel All Trailing Orders

**Source:** [[Isolated]Cancel All Trailing Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb8924f-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_track\_cancelall (\[Isolated\]Cancel All Trailing Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: This interface only supports isolated margin mode. The frequency limit of this interface is 5 times per second. You can fill in only one of direction and offset to cancel the orders. (such as direction=buy, all buy orders will be cancelled, including "open" and "close" offset)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | BTC-USDT |  |
| direction | string | false | direction(if not filled in as all) | buy, sell |  |
| offset | string | false | offset(if not filledin as all) | open, close |  |

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

"direction":

"buy"

"offset":

"close"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"errors":\[\]

"successes":

"826054603831312384,826054608491184128,826054686706565120"

}

"ts":

1616988392280

}