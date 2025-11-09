# GET Current Fee Rate Applied to The User

**Source:** [Get Current Fee Rate Applied to The User](https://www.htx.com/en-us/opend/newApiPages/?id=7ec51870-7773-11ed-9966-0242ac110003)

**Category:** Trading

## Authentication

Required (Private Endpoint)

### /v2/reference/transact-fee-rate ( Get Current Fee Rate Applied to The User)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 50 times / 2s

Interface description: Api users can query trading pair rates. They are limited to checking up to 10 trading pairs at a time. The rates for sub-users are the same as those for parent users.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbols | string | true | The trading symbols to query, separated by comma | btcusdt, ethbtc... |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false |  |  |
| message | string | false |  |  |
| DATA\_START | object | false |  |  |
| symbol | string | false | symbol |  |
| makerFeeRate | string | false | Basic rate - passive party, if transaction fee rebate is applicable, return rebate rate (negative value) |  |
| takerFeeRate | string | false | Base Rate - Active Party |  |
| actualMakerRate | string | false | Rate after deduction - Passive party, if deduction is not applicable or deduction is not enabled, the base rate will be returned; if transaction fee rebate is applicable, the rebate rate will be returned (negative value) |  |
| actualTakerRate | string | false | Rate after deduction – the active party, if the deduction is not applicable or the deduction is not enabled, the base rate will be returned |  |
| DATA\_END |  | false |  |  |

Notes:  
\- If makerFeeRate/actualMakerRate is positive，this field means the transaction fee rate. - If makerFeeRate/actualMakerRate is negative, this field means the rebate fee rate.

#### Request example

`curl"https://api.huobi.pro/v2/reference/transact-fee-rate?symbols=btcusdt"`

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"symbol":

"btcusdt"

"actualMakerRate":

"0.002"

"actualTakerRate":

"0.002"

"takerFeeRate":

"0.002"

"makerFeeRate":

"0.002"

}

1:{

"symbol":

"apnusdt"

"actualMakerRate":

"0.002"

"actualTakerRate":

"0.002"

"takerFeeRate":

"0.002"

"makerFeeRate":

"0.002"

}

2:{

"symbol":

"htusdt"

"actualMakerRate":

"0.002"

"actualTakerRate":

"0.002"

"takerFeeRate":

"0.002"

"makerFeeRate":

"0.002"

}

\]

"success":

true

}