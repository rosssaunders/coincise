# GET Set up spot/margin deduction fee method

**Source:**
[Set up spot/margin deduction fee method](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-18f7c4ff921)

**Category:** Account

## Authentication

Required (Private Endpoint)

### /v1/account/fee/switch (Set up spot/margin deduction fee method)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: 2 times/1s

Interface description: Used to set spot/margin transaction fee deductions, you
can use point cards to deduct, or you can use HTX to deduct.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter         | Data Type | Required | Description                                                        | Value Range                | Default Value |
| ----------------- | --------- | -------- | ------------------------------------------------------------------ | -------------------------- | ------------- |
| switchType        | int       | true     | 0: Point card deduction, 1: Currency deduction, 2: Close deduction |                            |               |
| deductionCurrency | String    | false    | When switchType = 1, you need to select deduction                  | For example HTX、TRX...... |               |

Notes: Assuming that the balance clicked by the user is zero, if
switchType=40406, an XXX error will be reported when calling this interface.

#### Response Parameter

| Parameter  | Data Type | Required | Description | Value Range |
| ---------- | --------- | -------- | ----------- | ----------- |
| code       | integer   | false    | code        |             |
| message    | string    | false    | message     |             |
| DATA_START | object    | true     |             |             |
| DATA_START |           | false    |             |             |

#### Request example

{

"switchType":

1

"deductionCurrency":

"TRX"

}

#### Response Example

##### Success Example

{

"code":

"200"

"data":{}

"success":

true

}
