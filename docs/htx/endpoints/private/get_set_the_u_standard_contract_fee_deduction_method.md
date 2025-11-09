# GET Set the U-standard contract fee deduction method

**Source:**
[Set the U-standard contract fee deduction method](https://www.htx.com/en-us/opend/newApiPages/?id=10000094-77b7-11ed-9966-0242ac110003)

**Category:** USDT-M Unified Account

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v3/linear_swap_fee_switch (Set the U-standard contract fee deduction method )

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID

Interface description: It is used to set deduction for U-standard contract
transaction fees. When the balance of the set currency is insufficient, the
transaction fees of other currencies will be deducted. For example, it is set to
use HTX to deduct the deduction, but if the HTX balance is insufficient, USDT
will be used to offset the deduction.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter          | Data Type | Required | Description                 | Value Range                | Default Value |
| ------------------ | --------- | -------- | --------------------------- | -------------------------- | ------------- |
| fee_option         | int       | true     | Whether to enable deduction | 1：yes,0：no               |               |
| deduction_currency | String    | true     | deduction currency          | For example HTX、TRX...... |               |

#### Response Parameter

| Parameter  | Data Type | Required | Description        | Value Range |
| ---------- | --------- | -------- | ------------------ | ----------- |
| code       | int       | true     | Status code        |             |
| msg        | String    | true     | Result description |             |
| ts         | Long      | true     | Timestamp          |             |
| DATA_START | object    | true     |                    |             |
| DATA_END   |           | true     |                    |             |

Notes: deduction_currency Only one currency can be entered

#### Request example

`{ "fee_option":1,}`

#### Response Example

##### Success Example

{

"code":

200

"msg":

"ok"

"data":{}

"ts":

1670844857777

}
