# GET Loan Interest Rate and Quota（Isolated）

**Source:** [Get Loan Interest Rate and Quota（Isolated）](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4d178-7773-11ed-9966-0242ac110003)

**Category:** Margin Loan (Cross/Isolated)

## Authentication

Required (Private Endpoint)

### /v1/margin/loan-info ( Get Loan Interest Rate and Quota（Isolated）)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 20times/2sec

Interface description: The endpoint returns loan interest rates and quota applied on the user.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbols | string | false | Trading symbol (multiple pairs available, separated by comma) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| DATA\_START | object | false |  |  |
| symbol | string | false | Trading symbol |  |
| CURRENCIES\_START | object | false |  |  |
| currency | string | false | Currency |  |
| interest-rate | string | false | Basic daily interest rate |  |
| min-loan-amt | string | false | Minimal loanable amount |  |
| max-loan-amt | string | false | Maximum loanable amount |  |
| loanable-amt | string | false | Remaining loanable amount |  |
| actual-rate | string | false | Actual interest rate (if deduction is inapplicable or disabled, return basic daily interest rate) |  |
| CURRENCIES\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/margin/loan-info?symbol=all"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"btcusdt"

"currencies":\[

0:{

"currency":

"btc"

"interest-rate":

"0.00098"

"min-loan-amt":

"0.020000000000000000"

"max-loan-amt":

"550.000000000000000000"

"loanable-amt":

"0.045696000000000000"

"actual-rate":

"0.00098"

}

1:{

"currency":

"usdt"

"interest-rate":

"0.00098"

"min-loan-amt":

"100.000000000000000000"

"max-loan-amt":

"4000000.000000000000000000"

"loanable-amt":

"400.000000000000000000"

"actual-rate":

"0.00098"

}

\]

}

\]

}