# GET [General]Get current system timestamp

**Source:** [[General]Get current system timestamp](https://www.htx.com/en-us/opend/newApiPages/?id=8cb80500-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### https://api.hbdm.com/api/v1/timestamp (\[General\]Get current system timestamp)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit, settlement, delivery, open positions and so on, the rate limit is 240 times every 3 second at most for each IP (this 240 times every 3 second public interface rate limit is shared by all the requests from that IP of non-marketing information, like above).

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com/api/v1/timestamp |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

Notes:  
No parameters are needed for this endpoint.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result |  |
| ts | long | true | current system timestamp |  |

#### Request example

`curl"https://api.hbdm.com/api/v1/timestamp"`

#### Response Example

##### Success Example

{

"status":

"ok"

"ts":

1578124684692

}