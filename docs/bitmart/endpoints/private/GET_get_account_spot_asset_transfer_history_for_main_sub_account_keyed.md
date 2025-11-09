# GET Get Account Spot Asset Transfer History (For Main/Sub Account) (KEYED)

**Source:**
[Get Account Spot Asset Transfer History (For Main/Sub Account) (KEYED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Get Account Spot Asset Transfer History (For Main/Sub Account) (KEYED)

`Get account spot asset transfer history (For Main/Sub Account)`

#### Request URL

`GET https://api-cloud.bitmart.com/account/sub-account/v1/transfer-history`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/sub-account/v1/transfer-history?moveType=spot to spot`

| Field                                                 | Type   | Required? | Description                              |
| ----------------------------------------------------- | ------ | --------- | ---------------------------------------- |
| moveType                                              | String | Yes       | type                                     |
| \-`spot to spot`\=Spot wallet transfer to spot wallet |
| N                                                     | Int    | Yes       | Recent N records, allowed range\[1,100\] |

#### Response Data

> Response

`{   "message": "OK",   "code": 1000,   "trace": "282fd16e-73ee-464f-adb7-7241345929f6",   "data": {     "total": 2,     "historyList": [       {         "fromAccount": "SubAccount1@xxx.com",         "fromWalletType": "spot",         "toAccount": "SubAccount2@xxx.com",         "toWalletType": "spot",         "currency": "BTC",         "amount": "1",         "submissionTime": 1648471522       },       {         "fromAccount": "SubAccount1@xxx.com",         "fromWalletType": "spot",         "toAccount": "SubAccount2@xxx.com",         "toWalletType": "spot",         "currency": "BTC",         "amount": "30",         "submissionTime": 1648466178       }     ]   } }`

| Field                 | Type   | Description                                         |
| --------------------- | ------ | --------------------------------------------------- |
| fromAccount           | String | Transfer out Sub-Account username                   |
| fromWalletType        | String | Transfer out wallet type                            |
| \-`spot`\=spot wallet |
| toAccount             | String | Transfer to Sub-Account username                    |
| toWalletType          | String | Transfer to wallet type                             |
| \-`spot`\=spot wallet |
| currency              | String | currency                                            |
| amount                | String | Transfer amount                                     |
| submissionTime        | Long   | The request timestamp is accurate to seconds(UTC-0) |

Note: Only the data for the last 3 months can be queried
