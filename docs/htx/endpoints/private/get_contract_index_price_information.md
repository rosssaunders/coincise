# GET Contract Index Price Information

**Source:**
[Get Contract Index Price Information](https://www.htx.com/en-us/opend/newApiPages/?id=28c2da85-77ae-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /api/v1/contract_index (Get Contract Index Price Information)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP
(this 120 times every 3 seconds public interface rate limit is shared by all the
requests from that IP of non-marketing information, like above)

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description                                                                    | Value Range | Default Value |
| --------- | --------- | -------- | ------------------------------------------------------------------------------ | ----------- | ------------- |
| symbol    | string    | false    | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC","ETH"... |             |               |

#### Response Parameter

| Parameter   | Data Type | Required | Description                                       | Value Range    |
| ----------- | --------- | -------- | ------------------------------------------------- | -------------- |
| status      | string    | true     | Request Processing Result                         | "ok" , "error" |
| DATA_START  |           | false    |                                                   |                |
| symbol      | string    | true     | symbol                                            | "BTC","ETH"... |
| index_price | decimal   | true     | Index Price                                       |                |
| index_ts    | long      | true     | Response generation time point, unit: millisecond |                |
| DATA_END    |           | false    |                                                   |                |
| ts          | long      | true     | Time of Respond Generation，Unit：Millisecond     |                |

#### Request example

`curl"https://api.hbdm.com/api/v1/contract_index?symbol=BTC"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"BTC"

"index_price":

13707.26

"index_ts":

1604296614010

}

\]

"ts":

1604296620746

}
