# GET Dead man’s switch

**Source:** [Dead man’s switch](https://www.htx.com/en-us/opend/newApiPages/?id=7ec50a66-7773-11ed-9966-0242ac110003)

**Category:** Trading

## Authentication

Required (Private Endpoint)

### /v2/algo-orders/cancel-all-after (Dead man’s switch)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: The Dead man’s switch protects the user’s assets when the connection to the exchange is lost due to network or system errors. Turn on/off the Dead man’s switch. If the Dead man’s switch is turned on and the API call isn’t sent twice within the set time, the platform will cancel all of your orders on the spot market（a maximum cancellation of 500 orders）.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| timeout | int | false |  | 0 or >=5 seconds | time out duration (unit：second); see notes for details |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | status code |  |
| message | string | false | error description (if any) |  |
| DATA\_START | object | false |  |  |
| currentTime | long | false | current time |  |
| triggerTime | long | false | trigger time |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"timeout":

10

}

#### Response Example

##### Success Example

{

"code":

200

"message":

"success"

"data":{

"currentTime":

1630491627230

"triggerTime":

1630491637230

}

}