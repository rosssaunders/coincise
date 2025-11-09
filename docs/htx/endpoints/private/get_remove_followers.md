# GET remove followers

**Source:** [remove followers](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-191270dcdbf)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/remove\_follower (remove followers)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: A single user requests all copytrading interfaces 18 times per second.

Interface description: This interface is used to cancel followers

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| follower\_uid | string | true | follower uid |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| tid | String | true | request id |  |
| data | boolean | true |  |  |
| code | Long | true |  |  |

#### Request example

{

"follower\_uid":

"NDEzMDUzNjE"

}

#### Response Example

##### Success Example

{

"code":

200

"data":

true

"tid":

"bdcc03eb6cfd435a81baec759920d87e"

"success":

true

}