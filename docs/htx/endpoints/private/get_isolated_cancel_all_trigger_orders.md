# GET [Isolated] Cancel All Trigger Orders

**Source:** [[Isolated] Cancel All Trigger Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb87161-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_trigger\_cancelall (\[Isolated\] Cancel All Trigger Orders)

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
| contract\_code | string | true | contract code,"BTC-USDT" ... |  |  |
| direction | string | false | Transaction direction(if not filled in means all) \["buy" , "sell"\] |  |  |
| offset | string | false | offset direction（if not filled in means all） \["open" , "close"\] |  |  |

Notes:  
You can fill in only one of direction and offset to cancel the orders. (such as direction=buy, all buy orders will be cancelled, including "open" and "close" offset)

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok" , "error" |
| DATA\_START |  | false |  |  |
| ERRORS\_START |  | false |  |  |
| order\_id | string | true | order id |  |
| err\_code | int | true | error code |  |
| err\_msg | string | true | error message |  |
| ERRORS\_END |  | false |  |  |
| successes | string | true | successful orders |  |
| DATA\_END |  | false |  |  |
| ts | long | true | response timestamp in millseconds |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"direction":

"buy"

"offset":

"open"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"errors":\[\]

"successes":

"2"

}

"ts":

1603704998960

}