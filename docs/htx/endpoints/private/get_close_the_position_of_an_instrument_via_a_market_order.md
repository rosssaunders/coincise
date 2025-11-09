# GET Close the position of an instrument via a market order

**Source:**
[Close the position of an instrument via a market order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19126b9120e)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/close_all_position (Close the position of an instrument via a market order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: A single user requests all copytrading interfaces 18 times per
second.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description         | Value Range       | Default Value |
| ------------- | --------- | -------- | ------------------- | ----------------- | ------------- |
| contract_code | String    | true     |                     |                   |               |
| margin_mode   | String    | true     | isolated：，cross： |                   |               |
| position_side | String    | true     | position side       | 多:long, 空:short | long, short   |

#### Response Parameter

| Parameter | Data Type | Required | Description         | Value Range    |
| --------- | --------- | -------- | ------------------- | -------------- |
| tid       | String    | true     | request id          |                |
| data      | Boolean   | true     | Transaction results | true ,or false |
| code      | long      | true     |                     |                |

#### Request example

{

"contract_code":

"DOT-USDT"

"margin_mode":

"cross"

"position_side":

"long"

}

#### Response Example

##### Success Example

{

"code":

200

"data":

true

"tid":

"9d94488290b1468d9d99a98c12898aa2"

"success":

true

}
