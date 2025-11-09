# GET Query trader contract leverage

**Source:**
[Query trader contract leverage](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19126a9c7ea)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/query_contract_lever (Query trader contract leverage)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: A single user requests all copytrading interfaces 18 times per
second.

Interface description: This interface is used to query the trader’s leverage
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
| margin_mode   | String    | true     | isolated：，cross： |             |               |

#### Response Parameter

| Parameter          | Data Type | Required | Description         | Value Range |
| ------------------ | --------- | -------- | ------------------- | ----------- |
| tid                | String    | true     | request id          |             |
| DATA>\_START       |           | true     |                     |             |
| contract_code      | String    | true     | BTC-USDT            |             |
| margin_mode        | String    | true     | isolated：，cross： |             |
| lever_rate_range   | Integer   | true     |                     |             |
| current_lever_rate | Integer   | true     |                     |             |
| DATA_END           |           | false    |                     |             |
| code               | long      | true     |                     |             |

#### Request example

`curl"https://api.hbdm.com/copytrading/trader/query_contract_lever?contract_code=DOT-USDT&margin_mode=cross"`

#### Response Example

##### Success Example

{

"code":

200

"data":{

"lever_rate_range":\[

0

:

1

1

:

75

\]

"current_lever_rate":

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
