# GET Get A Deposit Or Withdraw Detail (KEYED)

**Source:** [Get A Deposit Or Withdraw Detail (KEYED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Get A Deposit Or Withdraw Detail (KEYED)

`Query a single charge record`

#### Request URL

`GET https://api-cloud.bitmart.com/account/v1/deposit-withdraw/detail`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/v1/deposit-withdraw/detail?id=1679952`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| id | String | Yes | `withdraw_id` or `deposit_id` |

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{         "record":{             "withdraw_id":"1679952",             "deposit_id":"",             "operation_type":"withdraw",             "currency":"BMX",             "apply_time":1588867374000,             "arrival_amount":"59.000000000000",             "fee":"1.000000000000",             "status":0,             "address":"0xe57b69a8776b37860407965B73cdFFBDFe668Bb5",             "address_memo":"",             "tx_id":""         }     } }`

| Field | Type | Description |
| --- | --- | --- |
| withdraw\_id | String | withdraw id |
| deposit\_id | String | deposit id |
| operation\_type | String | type  
\- `deposit`\=deposit  
\- `withdraw`\=withdraw |
| currency | String | Token symbol, e.g., 'BTC' |
| apply\_time | Long | The request timestamp is accurate to milliseconds(UTC-0) |
| arrival\_amount | String | Actual amount received |
| fee | String | fee |
| status | Int | status  
\- `0`\=Create  
\- `1`\=Submitted, waiting for withdrawal  
\- `2`\=Processing  
\- `3`\=Done  
\- `4`\=Cancel  
\- `5`\=Fail |
| address | String | address |
| address\_memo | String | address tag |
| tx\_id | String | Hash record |

1\. The deposit id has a value when \`operation\_type\` = 'deposit'. The withdraw id has a value when \`operation\_type\` = 'withdraw'.  
2\. Tx\_id is an empty string before it is chained.

This interface is not available for sub-account