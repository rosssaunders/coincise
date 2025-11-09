# GET Repay Margin Loan（Cross/Isolated ）

**Source:**
[Repay Margin Loan（Cross/Isolated ）](https://www.htx.com/en-us/opend/newApiPages/?id=7ec5037d-7773-11ed-9966-0242ac110003)

**Category:** Margin Loan (Cross/Isolated)

## Authentication

Required (Private Endpoint)

### /v2/account/repayment ( Repay Margin Loan（Cross/Isolated ）)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 2/s

Interface description: Available Accounts: Main and Sub-Accounts While repaying
the loan, loan interest will be paid first if there is no appointed transactId.
Otherwise, currency will not be authenticated.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter  | Data Type | Required | Description          | Value Range | Default Value |
| ---------- | --------- | -------- | -------------------- | ----------- | ------------- |
| accountId  | string    | false    | repayment account ID |             |               |
| currency   | string    | false    | repayment currency   |             |               |
| amount     | string    | false    | repayment amount     |             |               |
| transactId | string    | false    | loan transaction ID  |             |               |

#### Response Parameter

| Parameter  | Data Type | Required | Description                               | Value Range |
| ---------- | --------- | -------- | ----------------------------------------- | ----------- |
| code       | integer   | false    | status code                               |             |
| message    | string    | false    | error description (if any)                |             |
| DATA_START | array     | false    |                                           |             |
| repayId    | string    | false    | repayment ID                              |             |
| repayTime  | long      | false    | repayment time (unix time in millisecond) |             |
| DATA_END   |           | false    |                                           |             |

Notes:  
Returning "repayId" doesn’t mean the repayment is 100% successful. Please check
the transaction record to confirm the repayment status.

#### Request example

{

"accountid":

"1266826"

"currency":

"btc"

"amount":

"0.00800334"

"transactId":

"437"

}

#### Response Example

##### Success Example

{

"code":

200

"Data":\[

0:{

"repayId":

1174424

"repayTime":

1600747722018

}

\]

}
