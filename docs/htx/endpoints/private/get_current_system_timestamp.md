# GET current system timestamp

**Source:**
[Get current system timestamp](https://www.htx.com/en-us/opend/newApiPages/?id=5d5174ba-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### https://api.hbdm.com/api/v1/timestamp (Get current system timestamp)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment | Address                               |
| ----------- | ------------------------------------- |
| Online      | https://api.hbdm.com/api/v1/timestamp |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --------- | --------- | -------- | ----------- | ----------- | ------------- |

Notes:  
No parameters are needed for this endpoint.

#### Response Parameter

| Parameter | Data Type | Required | Description               | Value Range |
| --------- | --------- | -------- | ------------------------- | ----------- |
| status    | string    | true     | Request Processing Result |             |
| ts        | long      | true     | current system timestamp  |             |

Notes:  
It can be used for system time calibration.

#### Request example

`curl "https://api.hbdm.com/heartbeat/"`

#### Response Example

##### Success Example

{

"status":

"ok"

"ts":

1578124684692

}
