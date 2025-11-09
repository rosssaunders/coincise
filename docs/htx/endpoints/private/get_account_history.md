# GET Account History

**Source:** [Get Account History](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4b85b-7773-11ed-9966-0242ac110003)

**Category:** Account

## Authentication

Required (Private Endpoint)

### /v1/account/history ( Get Account History)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 5times/2s

Interface description: This endpoint returns the amount changes of a specified user's account.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| account-id | string | true | Account Id, refer to GET /v1/account/accounts |  |  |
| currency | string | false | Currency name | Refer to /v1/common/currencys |  |
| transact-types | string | false | Amount change types (multiple selection allowed, separated by comma) | trade,etf, transact-fee, fee-deduction, transfer, credit, liquidation, interest, deposit, withdraw, withdraw-fee, exchange, other-types, rebate,fireblocks-dw：asset changes (deposit & withdrawal) | all |
| start-time | long | false | The start time of the query window (unix time in millisecond). Searching based on transact-time. The maximum size of the query window is 1 hour. The query window can be shifted within 30 days. | \[((end-time) – 1hour), (end-time)\] | ((end-time) – 1hour) |
| end-time | long | false | The end time of the query window (unix time in millisecond). Searching based on transact-time. The maximum size of the query window is 1 hour. The query window can be shifted within 30 days. | \[(current-time) – 29days,(current-time)\] | current-time |
| sort | string | false | Sorting order | asc or desc | asc |
| size | int | false | Maximum number of items in each response | \[1-500\] | 100 |
| from-id | long | false | First record ID in this query (only valid for next page querying, see Note 2) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | Status code |  |
| DATA\_START | object | false |  |  |
| account-id | long | false | Account ID |  |
| currency | string | false | Currency |  |
| transact-amt | string | false | Amount change (positive value if income, negative value if outcome) |  |
| transact-type | string | false | Amount change types |  |
| avail-balance | string | false | Available balance |  |
| acct-balance | string | false | Account balance |  |
| transact-time | long | false | Transaction time (database time) |  |
| record-id | long | false | Unique record ID in the database |  |
| DATA\_END |  | false |  |  |
| next-id | long | false | First record ID in next page (only valid if exceeded page size, see Note 2) |  |

Notes:  
Note 1:  
If ‘transact-type’ is shown as ‘rebate’, it implicates a paid maker rebate.  
A paid maker rebate could possibly include rebate from multiple trades.  
Note 2:  
Only when the number of items within the query window (between "start-time" and "end-time") exceeded the page limitation (defined by "size"), HTX server returns "next-id". Once received "next-id", API user should –  
1) Be aware of that, some items within the query window were not returned due to the page size limitation.  
2) In order to get these items from HTX server, adopt the "next-id" as "from-id" and submit another request, with other request parameters no change.  
3) As database record ID, "next-id" and "from-id" are for recurring query purpose and the ID itself does not have any business implication.  
Note 3:  
Change type contains a detailed list of account types：  
https://huobiapi.github.io/docs/spot/v1/en/#get-account-history

#### Request example

`curl"https://api.huobi.pro/v1/account/history?account-id=xxxxx¤cy=BTC&transact-types=transfer&start-time=1667814703000&end-time=1667909627238&sort=asc&size=100&from-id=xxxxxxx"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"account-id":

10000001

"currency":

"usdt"

"record-id":

359044707902783800

"transact-amt":

"-10.000000000000000000"

"transact-type":

"other-types"

"avail-balance":

"81.850043797676510303"

"acct-balance":

"97.010043797676510318"

"transact-time":

1629882096557

}

1:{

"account-id":

10000001

"currency":

"usdt"

"record-id":

359044690723242100

"transact-amt":

"-10.000000000000000000"

"transact-type":

"transfer"

"avail-balance":

"81.850043797676510303"

"acct-balance":

"87.010043797676510318"

"transact-time":

1629882096569

}

\]

"next-id":

47996522235

}