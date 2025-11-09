# GET Account Ledger

**Source:** [Get Account Ledger](https://www.htx.com/en-us/opend/newApiPages/?id=7ec501f7-7773-11ed-9966-0242ac110003)

**Category:** Account

## Authentication

Required (Private Endpoint)

### /v2/account/ledger ( Get Account Ledger)

Request type: GET

Signature verification: Yes

Interface permission: Read

Interface description: This endpoint returns the amount changes of specified user's account. Phase 1 release only supports historical assets transfer querying ("transactType" = "transfer"). The maximum query window size set by "startTime" & "endTime" is 10-day, which mean a maximum of 10-day records are queriable per request. The query window can be within the last 180 days, which means, by adjusting "startTime" & "endTime" accordingly, the records in last 180 days are queriable.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| accountId | string | false | Account ID |  |  |
| currency | string | false | Cryptocurrency (default value: all) |  |  |
| transactTypes | string | false | Transaction types (multiple inputs are allowed; default value: all; enumerated values: transfer) | transfer |  |
| startTime | long | false | Farthest time (180 days) |  |  |
| endTime | long | false | Nearest time (180 days) |  |  |
| sort | string | false | Sorting order (enumerated values: asc, desc) | （Deprecated） |  |
| limit | int | false | Maximum number of items in one page (valid range:\[1-500\]; default value:100) |  | 100 |
| fromId | long | false | First record ID in this query (only valid for next page querying. please refer to note 3) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false | Sorting as user defined (in request parameter "sort" ) |  |
| accountId | integer | false | Account ID |  |
| currency | string | false | Cryptocurrency |  |
| transactAmt | number | false | Transaction amount (income positive, expenditure negative) |  |
| transactType | string | false | Transaction type | transfer |
| transferType | string | false | Transfer type (only valid for transactType=transfer) | otc-to-spot, spot-to-otc, futures-to-spot, spot-to-futures, dm-swap-to-spot (coin-margined-swap), dm-spot-to-swap (coin-margined-swap), spot-to-linear-swap, linear-swap-to-spot，margin-transfer-in, margin-transfer-out, lock-transfer-in, lock-transfer-out, user-lock-transfer-in, user-lock-transfer-out, master-transfer-in, master-transfer-out, sub-transfer-in, sub-transfer-out, agency-transfer-in, agency-transfer-out, spot-to-super-margin, super-margin-to-spot |
| transactId | integer | false | Transaction ID |  |
| transactTime | integer | false | Transaction time |  |
| transferer | integer | false | Transferer’s account ID |  |
| transferee } | integer | false | Transferee’s account ID |  |
| DATA\_END |  | false |  |  |
| nextId | integer | false | First record ID in next page (only valid if exceeded page size. please refer to note 3.) |  |

Notes:  
Only when the number of items within the query window (between "startTime" and "endTime") exceeded the page limitation (defined by "limit"), HTX server returns "nextId". Once received "nextId", API user should –  
1) Be aware of that, some items within the query window were not returned due to the page size limitation.  
2) In order to get these items from HTX server, adopt the "nextId" as "fromId" and submit another request, with other request parameters no change.  
3) As database record ID, "nextId" and "fromId" are for recurring query purpose and the ID itself does not have any business implication.

#### Request example

`curl"https://api.huobi.pro/v2/account/ledger?accountId=xxxx¤cy=BTC&transactTypes=transfer"`

#### Response Example

##### Success Example

{

"code":

200

"message":

"success"

"data":\[

0:{

"accountId":

10000001

"currency":

"usdt"

"transactAmt":

10

"transactType":

"transfer"

"transferType":

"margin-transfer-out"

"transactId":

0

"transactTime":

1629882331066

"transferer":

28483123

"transferee":

13496526

}

1:{

"accountId":

10000001

"currency":

"usdt"

"transactAmt":

\-10

"transactType":

"transfer"

"transferType":

"margin-transfer-in"

"transactId":

0

"transactTime":

1629882096562

"transferer":

13496526

"transferee":

28483123

}

\]

"nextId":

1624316679

"ok":

true

}