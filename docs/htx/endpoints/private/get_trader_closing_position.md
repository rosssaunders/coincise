# GET Trader closing position

**Source:** [Trader closing position](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19126b59492)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/close\_order (Trader closing position)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: A single user requests all copytrading interfaces 18 times per second.

Interface description: The trader can only close a leading position once a time.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| sub\_position\_id | String | true | copy position ID |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| tid | String | true | request id |  |
| data | Boolean | true | Transaction results | true ,or false |
| code | long | true |  |  |

#### Request example

{

"sub\_position\_id":

249829

}

#### Response Example

##### Success Example

{

"code":

200

"data":

true

"tid":

"9d94488290b1468d9d79b98c12898ca3"

"success":

true

}