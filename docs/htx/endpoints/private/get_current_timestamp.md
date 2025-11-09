# GET Current Timestamp

**Source:**
[Get Current Timestamp](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4bb2c-7773-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /v1/common/timestamp ( Get Current Timestamp)

Request type: GET

Signature verification: No

Interface description: This endpoint returns the current timestamp, i.e. the
number of milliseconds that have elapsed since 00:00:00 UTC on 1 January 1970.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --------- | --------- | -------- | ----------- | ----------- | ------------- |

Notes:  
No parameter is needed for this endpoint.

#### Response Parameter

| Parameter | Data Type | Required | Description               | Value Range |
| --------- | --------- | -------- | ------------------------- | ----------- |
| status    | string    | false    | Request Processing Result |             |
| data      | long      | false    | current system timestamp  |             |

#### Request example

`curl"https://api.huobi.pro/v1/common/timestamp"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":

1629715504949

}
