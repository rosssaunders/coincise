# GET Query Withdraw Quota

**Source:**
[Query Withdraw Quota](https://www.htx.com/en-us/opend/newApiPages/?id=7ec50799-7773-11ed-9966-0242ac110003)

**Category:** Wallet (Deposits and Withdrawals)

## Authentication

Required (Private Endpoint)

### /v2/account/withdraw/quota (Query Withdraw Quota)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 20times/2s

Interface description: Parent user could query withdrawing quota for currencies

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description     | Value Range                       | Default Value |
| --------- | --------- | -------- | --------------- | --------------------------------- | ------------- |
| currency  | string    | false    | Crypto currency | Refer to GET /v1/common/currencys |               |

#### Response Parameter

| Parameter                  | Data Type | Required | Description                             | Value Range |
| -------------------------- | --------- | -------- | --------------------------------------- | ----------- |
| code                       | int       | false    | Status code                             |             |
| message                    | string    | false    | Error message (if any)                  |             |
| DATA_START                 | object    | false    |                                         |             |
| currency                   | string    | false    | Crypto currency                         |             |
| CHAINS_START               | object    | false    |                                         |             |
| chain                      | string    | false    | Block chain name                        |             |
| maxWithdrawAmt             | string    | false    | Maximum withdraw amount in each request |             |
| withdrawQuotaPerDay        | string    | false    | Maximum withdraw amount in a day        |             |
| remainWithdrawQuotaPerDay  | string    | false    | Remaining withdraw quota in the day     |             |
| withdrawQuotaPerYear       | string    | false    | Maximum withdraw amount in a year       |             |
| remainWithdrawQuotaPerYear | string    | false    | Remaining withdraw quota in the year    |             |
| withdrawQuotaTotal         | string    | false    | Maximum withdraw amount in total        |             |
| remainWithdrawQuotaTotal   | string    | false    | Remaining withdraw quota in total       |             |
| CHAINS_END                 |           | false    |                                         |             |
| DATA_END                   |           | false    |                                         |             |

#### Request example

`curl"https://api.huobi.pro/v2/account/withdraw/quota?currency=btc"`

#### Response Example

##### Success Example

{

"code":

200

"data":{

"currency":

"usdt"

"chains":\[

0:{

"chain":

"hrc20usdt"

"maxWithdrawAmt":

"2000000.000000000000000000"

"withdrawQuotaPerDay":

"4845303.99999991"

"remainWithdrawQuotaPerDay":

"4845303.99999991"

"withdrawQuotaPerYear":

"-1"

"remainWithdrawQuotaPerYear":

"-1"

"withdrawQuotaTotal":

"-1"

"remainWithdrawQuotaTotal":

"-1"

}

1:{

"chain":

"trc20usdt"

"maxWithdrawAmt":

"1000000.000000000000000000"

"withdrawQuotaPerDay":

"4845303.99999991"

"remainWithdrawQuotaPerDay":

"4845303.99999991"

"withdrawQuotaPerYear":

"-1"

"remainWithdrawQuotaPerYear":

"-1"

"withdrawQuotaTotal":

"-1"

"remainWithdrawQuotaTotal":

"-1"

}

2:{

"chain":

"usdt"

"maxWithdrawAmt":

"600000.000000000000000000"

"withdrawQuotaPerDay":

"4845303.99999991"

"remainWithdrawQuotaPerDay":

"4845303.99999991"

"withdrawQuotaPerYear":

"-1"

"remainWithdrawQuotaPerYear":

"-1"

"withdrawQuotaTotal":

"-1"

"remainWithdrawQuotaTotal":

"-1"

}

3:{

"chain":

"usdterc20"

"maxWithdrawAmt":

"1000000.000000000000000000"

"withdrawQuotaPerDay":

"4845303.99999991"

"remainWithdrawQuotaPerDay":

"4845303.99999991"

"withdrawQuotaPerYear":

"-1"

"remainWithdrawQuotaPerYear":

"-1"

"withdrawQuotaTotal":

"-1"

"remainWithdrawQuotaTotal":

"-1"

}

\]

}

}
