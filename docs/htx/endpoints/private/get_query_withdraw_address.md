# GET Query withdraw address

**Source:** [Query withdraw address](https://www.htx.com/en-us/opend/newApiPages/?id=7ec50654-7773-11ed-9966-0242ac110003)

**Category:** Wallet (Deposits and Withdrawals)

## Authentication

Required (Private Endpoint)

### /v2/account/withdraw/address (Query withdraw address)

Request type: GET

Signature verification: Yes

Interface permission: Read

Interface description: This endpoint allows parent user to query withdraw address available for API key.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| currency | string | false | Crypto currency | btc, ltc, bch, eth, etc ...(refer to GET /v1/common/currencys).Currency If you need to query a universal address, then "currency": you need to pass "t247117" |  |
| chain | string | false | Block chain name |  | When chain is not specified, the reponse would include the records of ALL chains. |
| note | string | false | The note of withdraw address |  | When note is not specified, the reponse would include the records of ALL notes. |
| limit | int | false | The number of items to return | \[1-500\] | 100 |
| fromId | long | false | First record ID in this query (only valid for next page querying; please refer to note) |  |  |

Notes: The chain names of the universal addresses include: erc20、trc20、avaxcchain、SOLANA、BRC20、ARBITRUM、OPTIMISM、BTT、bep20、adachain、heco

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| currency | string | true | currency |  |
| chain | string | true | Block chain name |  |
| note | string | true | The address note |  |
| addressTag | string | false | The address tag，if any |  |
| address | string | true | Withdraw address |  |
| status | string | true | Address status: normal(usual address), whtite(whitelist effective), white-delaying(Whitelist delayed effective),processing(pending 2FA/risk control verification) | Address status: normal(usual address), white(whitelist effective), white-delaying(Whitelist delayed effective),processing(pending 2FA/risk control verification) |
| DATA\_END |  | false |  |  |
| nextId | long | false | First record ID in next page (only valid if exceeded page size) |  |

#### Request example

`curl"https://api.huobi.pro/v2/account/withdraw/address?currency=usdt&chain=usdterc20¬e=HelloWorld"`

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"currency":

"usdt"

"chain":

"hrc20usdt"

"note":

"tom"

"addressTag":

""

"address":

"0x3b994f25c4c25e99d4d26364ffc014cce64600ca"

}

\]

"next-id":

30137790

}