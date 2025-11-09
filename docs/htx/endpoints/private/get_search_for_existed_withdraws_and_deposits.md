# GET Search for Existed Withdraws and Deposits

**Source:** [Search for Existed Withdraws and Deposits](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4f050-7773-11ed-9966-0242ac110003)

**Category:** Wallet (Deposits and Withdrawals)

## Authentication

Required (Private Endpoint)

### /v1/query/deposit-withdraw ( Search for Existed Withdraws and Deposits)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 20times/2s

Interface description: Parent user and sub user search for all existed withdraws and deposits and return their latest status.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| currency | string | false | The crypto currency to withdraw | 1 ~ latest record ID | When currency is not specified, the response would include the records of ALL currencies. |
| type | string | true | Define transfer type to search | \[1-500\] | deposit, withdraw, sub user can only use deposit |
| from | string | false | The transfer id to begin search | 'prev' (ascending), 'next' (descending) | When 'from' is not specified, the default value would be 1 if 'direct' is 'prev' with the response in ascending order, the default value would be the ID of latest record if 'direct' is 'next' with the response in descending order. |
| size | string | false | The number of items to return | \[1-50\] | 50 |
| direct | string | false | the order of response |  | 'next' |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result |  |
| error-code | string | false | Error code for withdrawal failure, only returned when the type is "withdraw" and the state is "reject", "wallet-reject" and "failed". |  |
| error-msg | string | false | Error description of withdrawal failure, only returned when the type is "withdraw" and the state is "reject", "wallet-reject" and "failed". |  |
| DATA\_START | object | true |  |  |
| id | long | true | Transfer id |  |
| type | string | true | Define transfer type to search, possible values: \[deposit, withdraw\] Sub-user can only put "deposit" |  |
| currency | string | true | The crypto currency to withdraw |  |
| tx-hash | string | true | The on-chain transaction hash. If this is a "fast withdraw", then it is not on-chain transfer, and this value is empty. |  |
| chain | string | true | Block chain name |  |
| amount | float | true | The number of crypto asset transfered in its minimum unit |  |
| address | string | true | The deposit or withdraw target address |  |
| address-tag | string | true | The user defined address tag |  |
| fee | float | true | Withdrawal fee |  |
| state | string | true | deposit state\[unknown:On-chain transfer has not been received,confirming:On-chain transfer waits for first confirmation,confirmed:On-chain transfer confirmed for at least one block, user is able to transfer and trade,safe:Multiple on-chain confirmed, user is able to withdraw,orphan:On-chain transfer confirmed but currently in an orphan branch\];withdraw state\[verifying:Awaiting verification,failed;verification failed,submitted:Withdraw request submitted successfully,reexamine:Under examination for withdraw validation,canceled:Withdraw canceled by user,pass:Withdraw validation passed,reject:Withdraw validation rejected,pre-transfer:Withdraw is about to be released,wallet-transfer:On-chain transfer initiated,wallet-reject:Transfer rejected by chain,confirmed;On-chain transfer completed with one confirmation,confirm-error:On-chain transfer faied to get confirmation,repealed:Withdraw terminated by system,risk-action-fail:Risk control verification failed,risk-action-timeout:Risk control action timeout\] |  |
| created-at | long | true | The timestamp in milliseconds for the transfer creation |  |
| updated-at | long | true | The timestamp in milliseconds for the transfer's latest update |  |
| DATA\_END |  | true |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/query/deposit-withdraw?currency=usdt&type=withdraw"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"id":

45182894

"type":

"withdraw"

"sub-type":

"FAST"

"currency":

"usdt"

"chain":

"trc20usdt"

"tx-hash":

""

"amount":

400

"from-addr-tag":

""

"address":

"TRwkUYHWgUh23jbKpgTcYHgE9CcBzhGno9"

"address-tag":

""

"fee":

0

"state":

"confirmed"

"created-at":

1612261330443

"updated-at":

1612261389250

}

1:{

"id":

61003926

"type":

"withdraw"

"sub-type":

"FAST"

"currency":

"usdt"

"chain":

"trc20usdt"

"tx-hash":

""

"amount":

2

"from-addr-tag":

""

"address":

"TYGvZSD1duPctGaMPSP12Fy8BrQMu2KCdp"

"address-tag":

""

"fee":

0

"state":

"confirmed"

"created-at":

1621416907639

"updated-at":

1621416907788

}

\]

}