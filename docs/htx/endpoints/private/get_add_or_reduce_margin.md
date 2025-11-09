# GET Add Or Reduce Margin

**Source:** [Add Or Reduce Margin](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19126bd4850)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/add\_margin (Add Or Reduce Margin)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: A single user requests all copytrading interfaces 18 times per second.

Interface description: Manually add or reduce margin for isolated margin position

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | String | true |  |  |  |
| amount | String | true |  |  |  |
| type | Integer | true | 1：add,2：reduce |  |  |
| position\_side | String | true | long, short |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| tid | String | true | request id |  |
| DATA\_START |  | true |  |  |
| contract\_code | String | true |  |  |
| amount | String | true |  |  |
| type | Integer | true | 1：add,2：reduce |  |
| position\_side | String | true | long, short |  |
| DATA\_END |  | false |  |  |
| code | Long | true |  |  |

#### Request example

{

"contract\_code":

"DOT-USDT"

"amount":

1

"type":

1

"position\_side":

"long"

}

#### Response Example

##### Success Example

{

"code":

200

"data":{

"contract\_code":

"DOT-USDT"

"amount":

1

"type":

1

"position\_side":

"long"

}

"tid":

"bf1f7b4127eb40c9b0b2fcf6b81937ee"

"success":

true

}