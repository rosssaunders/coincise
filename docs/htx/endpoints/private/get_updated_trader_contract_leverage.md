# GET updated trader contract leverage

**Source:**
[updated trader contract leverage](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19126b04331)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/updated_contract_lever (updated trader contract leverage)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: A single user requests all copytrading interfaces 18 times per
second.

Interface description: This interface is used to Updated the trader’s leverage
level

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description         | Value Range | Default Value |
| ------------- | --------- | -------- | ------------------- | ----------- | ------------- |
| contract_code | String    | true     | BTC-USDT            |             |               |
| lever         | Integer   | true     |                     |             |               |
| margin_mode   | String    | true     | isolated：，cross： |             |               |

#### Response Parameter

| Parameter     | Data Type | Required | Description         | Value Range |
| ------------- | --------- | -------- | ------------------- | ----------- |
| tid           | String    | true     | request id          |             |
| DATA_START    |           | true     |                     |             |
| contract_code | String    | true     | BTC-USDT            |             |
| lever         | Integer   | true     |                     |             |
| margin_mode   | String    | true     | isolated：，cross： |             |
| DATA_END      |           | false    |                     |             |
| code          | long      | true     |                     |             |

#### Request example

{

"contract_code":

"DOT-USDT"

"lever":

5

"margin_mode":

"cross"

}

#### Response Example

##### Success Example

{

"code":

200

"data":{

"lever":

5

"contract_code":

"DOT-USDT"

"margin_mode":

"cross"

}

"tid":

"5bc3deb33abe417dbe79b43d094e0474"

"success":

true

}
