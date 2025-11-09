# GET Get Account Futures Asset Transfer History (For Main/Sub Account) (KEYED)

**Source:**
[Get Account Futures Asset Transfer History (For Main/Sub Account) (KEYED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Get Account Futures Asset Transfer History (For Main/Sub Account) (KEYED)

`Get account Futures asset transfer history (For Main/Sub Account)`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/account/contract/sub-account/v1/transfer-history`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/account/contract/sub-account/v1/transfer-history?limit=10`

| Field | Type | Required? | Description                              |
| ----- | ---- | --------- | ---------------------------------------- |
| limit | Int  | Yes       | Recent N records, allowed range\[1,100\] |

#### Response Data

> Response

`{   "message": "OK",   "code": 1000,   "trace": "ba950ec2bd114fd7bc069cb812b0129f.62.16887215218140681",   "data": [     {       "fromAccount": "masterAccount@xxx.com",       "toAccount": "subAccount@xxx.com",       "toWalletType": "future",       "fromWalletType": "future",       "currency": "USDT",       "amount": "1",       "submissionTime": 1686207254     }   ] }`

| Field                      | Type   | Description                                         |
| -------------------------- | ------ | --------------------------------------------------- |
| fromAccount                | String | Transfer out Sub-Account username                   |
| fromWalletType             | String | Transfer out wallet type                            |
| \-`future`\=futures wallet |
| toAccount                  | String | Transfer to Sub-Account username                    |
| toWalletType               | String | Transfer to wallet type                             |
| \-`future`\=futures wallet |
| currency                   | String | currency                                            |
| amount                     | String | Transfer amount                                     |
| submissionTime             | Long   | The request timestamp is accurate to seconds(UTC-0) |
