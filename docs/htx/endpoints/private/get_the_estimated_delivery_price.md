# GET the estimated delivery price

**Source:** [Get the estimated delivery price](https://www.htx.com/en-us/opend/newApiPages/?id=28c2d5b0-77ae-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /api/v1/contract\_delivery\_price (Get the estimated delivery price)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP (this 120 times every 3 seconds public interface rate limit is shared by all the requests from that IP of non-marketing information, like above)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | Case-Insenstive.Both uppercase and lowercase are supported.e.g."BTC","ETH"... |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START |  | false |  |  |
| delivery\_price | decimal | true | estimated delivery price |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

`curl"https://api.hbdm.com/api/v1/contract_delivery_price?symbol=BTC"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"delivery\_price":

40883.18927358753

}

"ts":

1628652034810

}