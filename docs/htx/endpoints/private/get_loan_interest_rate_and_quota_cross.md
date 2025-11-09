# GET Loan Interest Rate and Quota（Cross）

**Source:**
[Get Loan Interest Rate and Quota（Cross）](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4bef5-7773-11ed-9966-0242ac110003)

**Category:** Margin Loan (Cross/Isolated)

## Authentication

Required (Private Endpoint)

### /v1/cross-margin/loan-info ( Get Loan Interest Rate and Quota（Cross）)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 2times/2s

Interface description: This endpoint returns loan interest rates and loan quota
applied on the user.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --------- | --------- | -------- | ----------- | ----------- | ------------- |

Notes:  
No parameters are needed for this endpoint.

#### Response Parameter

| Parameter     | Data Type | Required | Description                                                                                                      | Value Range |
| ------------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------- | ----------- |
| status        | string    | false    | status                                                                                                           |             |
| DATA_START    | object    | false    |                                                                                                                  |             |
| currency      | string    | false    | Currency                                                                                                         |             |
| interest-rate | string    | false    | Basic daily interest rate                                                                                        |             |
| min-loan-amt  | string    | false    | Minimal loanable amount                                                                                          |             |
| max-loan-amt  | string    | false    | Maximum loanable amount                                                                                          |             |
| loanable-amt  | string    | false    | Remaining loanable amount                                                                                        |             |
| actual-rate   | string    | false    | Actual interest rate post deduction (if deduction is inapplicable or disabled, return basic daily interest rate) |             |
| DATA_END      |           | false    |                                                                                                                  |             |
| code          | int       | false    | status code                                                                                                      |             |

#### Request example

`curl"https://api.huobi.pro/v1/cross-margin/loan-info"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"currency":

"bch"

"interest-rate":

"0.00098"

"min-loan-amt":

"0.35"

"max-loan-amt":

"3500"

"loanable-amt":

"0.70405181"

"actual-rate":

"0.000343"

}

1:{

"currency":

"btc"

"interest-rate":

"0.00098"

"min-loan-amt":

"0.01"

"max-loan-amt":

"100"

"loanable-amt":

"0.02281914"

"actual-rate":

"0.000343"

}

2:{

"currency":

"eos"

"interest-rate":

"0.00098"

"min-loan-amt":

"30"

"max-loan-amt":

"300000"

"loanable-amt":

"57.69175296"

"actual-rate":

"0.000343"

}

3:{

"currency":

"eth"

"interest-rate":

"0.00098"

"min-loan-amt":

"0.5"

"max-loan-amt":

"6000"

"loanable-amt":

"1.06712197"

"actual-rate":

"0.000343"

}

4:{

"currency":

"ltc"

"interest-rate":

"0.00098"

"min-loan-amt":

"1.5"

"max-loan-amt":

"15000"

"loanable-amt":

"3.28947368"

"actual-rate":

"0.000343"

}

5:{

"currency":

"usdt"

"interest-rate":

"0.00098"

"min-loan-amt":

"100"

"max-loan-amt":

"1500000"

"loanable-amt":

"200.00000000"

"actual-rate":

"0.000343"

}

6:{

"currency":

"xrp"

"interest-rate":

"0.00098"

"min-loan-amt":

"380"

"max-loan-amt":

"4000000"

"loanable-amt":

"734.21439060"

"actual-rate":

"0.000343"

}

\]

"code":

200

}
