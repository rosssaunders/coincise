# GET the Balance of the Margin Loan Account（Isolated）

**Source:**
[Get the Balance of the Margin Loan Account（Isolated）](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4d015-7773-11ed-9966-0242ac110003)

**Category:** Margin Loan (Cross/Isolated)

## Authentication

Required (Private Endpoint)

### /v1/margin/accounts/balance ( Get the Balance of the Margin Loan Account（Isolated）)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 100times/2s

Interface description: This endpoint returns the balance of the margin loan
account.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description                                                                  | Value Range | Default Value                                                                                                                        |
| --------- | --------- | -------- | ---------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| ymbol     | string    | false    | NA                                                                           |             | The trading symbol, e.g. btcusdt.If this is empty, then 'transfer-out-available' and 'loan-available' balance type won't be returned |
| sub-uid   | int       | false    | If not entered, by default it returns margin account details of current user |             | Sub user ID (Required field while parent user querying sub user’s margin account details)                                            |

#### Response Parameter

| Parameter  | Data Type | Required | Description                                                                                                                                          | Value Range |
| ---------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| DATA_START | object    | false    | object                                                                                                                                               |             |
| id         | int       | false    | int                                                                                                                                                  |             |
| type       | string    | false    | string                                                                                                                                               |             |
| symbol     | string    | false    | The margin loan pair, e.g. btcusdt, bccbtc                                                                                                           |             |
| state      | string    | false    | Loan state, possible values: created, accrual (loaned), cleared (paid), invalid                                                                      |             |
| risk-rate  | string    | false    | The risk rate                                                                                                                                        |             |
| fl-type    | string    | false    | safe,sell,buy                                                                                                                                        |             |
| fl-price   | string    | false    | The price which margin closeout was triggered                                                                                                        |             |
| LIST_START | array     | false    | The list of margin accounts and their details                                                                                                        |             |
| currency   | string    | false    | The currency name                                                                                                                                    |             |
| type       | string    | false    | The sub account type, possible values: trade, frozen, loan, interest ,transfer-out-available, loan-available                                         |             |
| balance    | string    | false    | The negative balance means the loan or interest that need to repay. All trade balance can be transferred out if transfer-out-available balance is -1 |             |
| LIST_END   |           | false    |                                                                                                                                                      |             |
| DATA_END   |           | false    |                                                                                                                                                      |             |

#### Request example

`curl"https://api.huobi.pro/v1/margin/accounts/balance?symbol=xxxx&sub-uid=xxxx"`

#### Response Example

##### Success Example

{

"data":\[

0:{

"id":

18264

"type":

"margin"

"state":

"working"

"symbol":

"btcusdt"

"fl-price":

"0"

"fl-type":

"safe"

"risk-rate":

"475.952571086994250554"

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

\]

}
