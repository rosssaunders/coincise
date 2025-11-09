# GET the Balance of the Margin Loan Account（Cross）

**Source:** [Get the Balance of the Margin Loan Account（Cross）](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4bca0-7773-11ed-9966-0242ac110003)

**Category:** Margin Loan (Cross/Isolated)

## Authentication

Required (Private Endpoint)

### /v1/cross-margin/accounts/balance ( Get the Balance of the Margin Loan Account（Cross）)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 2times/2s

Interface description: This endpoint returns the balance of the margin loan account.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| sub-uid | long | false | Sub user UID |  | If not specified, returns account balance of current logged in user |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false |  |  |
| DATA\_START | object | false |  |  |
| id | integer | false |  |  |
| type | integer | false |  |  |
| state | string | false | account state: working, fl-sys, fl-end, fl-negative |  |
| risk-rate | string | false |  |  |
| acct-balance-sum | string | false |  |  |
| debt-balance-sum | string | false |  |  |
| LIST\_START | array | false |  |  |
| currency | string | false |  |  |
| type | string | false | account type: trade, frozen, loan, interest, transfer-out-available, loan-available |  |
| balance | string | false | The negative balance means the loan or interest that need to repay. All trade balance can be transferred out if transfer-out-available balance is -1 |  |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/cross-margin/accounts/balance?sub-uid=xxx"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"id":

18264

"type":

"cross-margin"

"state":

"working"

"risk-rate":

"1000"

"acct-balance-sum":

"12312.123123"

"debt-balance-sum":

"1231.2123123"

"list":\[

0:{

"currency":

"btc"

"type":

"trade"

"balance":

"1168.533000000000000000"

}

1:{

"currency":

"btc"

"type":

"frozen"

"balance":

"0.000000000000000000"

}

2:{

"currency":

"btc"

"type":

"loan"

"balance":

"-2.433000000000000000"

}

3:{

"currency":

"btc"

"type":

"interest"

"balance":

"-0.000533000000000000"

}

4:{

"currency":

"btc"

"type":

"transfer-out-available"

"balance":

"1163.872174670000000000"

}

5:{

"currency":

"btc"

"type":

"loan-available"

"balance":

"8161.876538350676000000"

}

\]

}

}