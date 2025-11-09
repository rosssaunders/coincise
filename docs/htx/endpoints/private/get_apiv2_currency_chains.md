# GET APIv2 - Currency & Chains

**Source:**
[APIv2 - Currency & Chains](https://www.htx.com/en-us/opend/newApiPages/?id=7ec516fc-7773-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /v2/reference/currencies ( APIv2 - Currency & Chains)

Request type: GET

Signature verification: No

Interface permission: Read

Interface description: API user could query static reference information for
each currency, as well as its corresponding chain(s). (Public Endpoint)

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter      | Data Type | Required | Description     | Value Range                                              | Default Value |
| -------------- | --------- | -------- | --------------- | -------------------------------------------------------- | ------------- |
| currency       | string    | false    | Currency        | btc, ltc, bch, eth, etc ...(available currencies in HTX) |               |
| authorizedUser | boolean   | false    | Authorized user | true or false (if not filled, default value is true)     |               |

#### Response Parameter

| Parameter               | Data Type | Required | Description                                                                                                 | Value Range            |
| ----------------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------- | ---------------------- |
| code                    | int       | false    | Status code                                                                                                 |                        |
| message                 | string    | false    | Error message (if any)                                                                                      |                        |
| DATA_START              | object    | false    |                                                                                                             |                        |
| currency                | string    | false    | Currency                                                                                                    |                        |
| CHAINS_START            | object    | false    |                                                                                                             |                        |
| chain                   | string    | false    | Chain name                                                                                                  |                        |
| displayName             | string    | false    | Chain display name                                                                                          |                        |
| baseChain               | string    | false    | Base chain name                                                                                             |                        |
| baseChainProtocol       | string    | false    | Base chain protocol                                                                                         |                        |
| isDynamic               | boolean   | false    | Is dynamic fee type or not (only applicable to withdrawFeeType = fixed)                                     | true,false             |
| numOfConfirmations      | int       | false    | Number of confirmations required for deposit success (trading & withdrawal allowed once reached)            |                        |
| numOfFastConfirmations  | int       | false    | Number of confirmations required for quick success (trading allowed but withdrawal disallowed once reached) |                        |
| minDepositAmt           | string    | false    | Minimal deposit amount in each request                                                                      |                        |
| depositStatus           | string    | false    | Deposit status                                                                                              | allowed,prohibited     |
| minWithdrawAmt          | string    | false    | Minimal withdraw amount in each request                                                                     |                        |
| maxWithdrawAmt          | string    | false    | Maximum withdraw amount in each request                                                                     |                        |
| withdrawQuotaPerDay     | string    | false    | Maximum withdraw amount in a day (Singapore timezone)                                                       |                        |
| withdrawQuotaPerYear    | string    | false    | Maximum withdraw amount in a year                                                                           |                        |
| withdrawQuotaTotal      | string    | false    | Maximum withdraw amount in total                                                                            |                        |
| withdrawPrecision       | int       | false    | Withdraw amount precision                                                                                   |                        |
| withdrawFeeType         | string    | false    | Type of withdraw fee (only one type can be applied to each currency)                                        | fixed,circulated,ratio |
| transactFeeWithdraw     | string    | false    | Withdraw fee in each request (only applicable to withdrawFeeType = fixed)                                   |                        |
| minTransactFeeWithdraw  | string    | false    | Minimal withdraw fee in each request (only applicable to withdrawFeeType = circulated or ratio)             |                        |
| maxTransactFeeWithdraw  | string    | false    | Maximum withdraw fee in each request (only applicable to withdrawFeeType = circulated or ratio)             |                        |
| transactFeeRateWithdraw | string    | false    | Withdraw fee in each request (only applicable to withdrawFeeType = ratio)                                   |                        |
| withdrawStatus          | string    | false    | Withdraw status                                                                                             | allowed,prohibited     |
| DATA_END                |           | false    |                                                                                                             |                        |
| instStatus              | string    | false    | Instrument status                                                                                           | normal,delisted        |
| CHAINS_END              |           | false    |                                                                                                             |                        |

#### Request example

`curl"https://api.huobi.pro/v2/reference/currencies?currency=usdt"`

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"chains":\[

0:{

"chain":

"trc20usdt"

"displayName":

""

"baseChain":

"TRX"

"baseChainProtocol":

"TRC20"

"isDynamic":

false

"depositStatus":

"allowed"

"maxTransactFeeWithdraw":

"1.00000000"

"maxWithdrawAmt":

"280000.00000000"

"minDepositAmt":

"100"

"minTransactFeeWithdraw":

"0.10000000"

"minWithdrawAmt":

"0.01"

"numOfConfirmations":

999

"numOfFastConfirmations":

999

"withdrawFeeType":

"circulated"

"withdrawPrecision":

5

"withdrawQuotaPerDay":

"280000.00000000"

"withdrawQuotaPerYear":

"2800000.00000000"

"withdrawQuotaTotal":

"2800000.00000000"

"withdrawStatus":

"allowed"

}

1:{

"chain":

"usdt"

"displayName":

""

"baseChain":

"BTC"

"baseChainProtocol":

"OMNI"

"isDynamic":

false

"depositStatus":

"allowed"

"maxWithdrawAmt":

"19000.00000000"

"minDepositAmt":

"0.0001"

"minWithdrawAmt":

"2"

"numOfConfirmations":

30

"numOfFastConfirmations":

15

"transactFeeRateWithdraw":

"0.00100000"

"withdrawFeeType":

"ratio"

"withdrawPrecision":

7

"withdrawQuotaPerDay":

"90000.00000000"

"withdrawQuotaPerYear":

"111000.00000000"

"withdrawQuotaTotal":

"1110000.00000000"

"withdrawStatus":

"allowed"

}

2:{

"chain":

"usdterc20"

"displayName":

""

"baseChain":

"ETH"

"baseChainProtocol":

"ERC20"

"isDynamic":

false

"depositStatus":

"allowed"

"maxWithdrawAmt":

"18000.00000000"

"minDepositAmt":

"100"

"minWithdrawAmt":

"1"

"numOfConfirmations":

999

"numOfFastConfirmations":

999

"transactFeeWithdraw":

"0.10000000"

"withdrawFeeType":

"fixed"

"withdrawPrecision":

6

"withdrawQuotaPerDay":

"180000.00000000"

"withdrawQuotaPerYear":

"200000.00000000"

"withdrawQuotaTotal":

"300000.00000000"

"withdrawStatus":

"allowed"

}

\]

"currency":

"usdt"

"instStatus":

"normal"

}

\]

}
