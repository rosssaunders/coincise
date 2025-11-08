# GET Get Sub-Account Transfer History (For Main Account) (KEYED)

**Source:** [Get Sub-Account Transfer History (For Main Account) (KEYED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Get Sub-Account Transfer History (For Main Account) (KEYED)

`Query Sub-Account Futures Asset Transfer History (For Main Account)`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/account/contract/sub-account/main/v1/transfer-list`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/account/contract/sub-account/main/v1/transfer-list?subAccount=subAccountName@xxx.com&limit=10`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| subAccount | String | Yes | Sub-Account username |
| limit | Int | Yes | Recent N records, allowed range\[1,100\] |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "message": "OK",   "code": 1000,   "trace": "ba950ec2bd114fd7bc069cb812b0129f.62.16887213774200649",   "data": [     {       "fromAccount": "subAccountName@xxx.com",       "toAccount": "masterAccountName@xxx.com",       "toWalletType": "future",       "fromWalletType": "future",       "currency": "USDT",       "amount": "1",       "submissionTime": 1686207254     }   ] }`

| Field | Type | Description |
| --- | --- | --- |
| fromAccount | String | Transfer out Sub-Account username |
| fromWalletType | String | Transfer out wallet type  
\-`future`\=futures wallet |
| toAccount | String | Transfer to Sub-Account username |
| toWalletType | String | Transfer to wallet type  
\-`future`\=futures wallet |
| currency | String | currency |
| amount | String | Transfer amount |
| submissionTime | Long | The request timestamp is accurate to seconds(UTC-0) |