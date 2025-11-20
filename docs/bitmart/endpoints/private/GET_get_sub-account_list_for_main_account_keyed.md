# GET Get Sub-Account List (For Main Account) (KEYED)

**Source:** [Get Sub-Account List (For Main Account) (KEYED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Get Sub-Account List (For Main Account) (KEYED)

`Get Sub-Account list (For Main Account)`

#### Request URL

`GET https://api-cloud.bitmart.com/account/sub-account/main/v1/subaccount-list`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/sub-account/main/v1/subaccount-list`

#### Response Data

> Response

```json
{
  "message": "OK",
  "code": 1000,
  "trace": "c03c22c3-75db-4aaa-9500-6dcd63dd9ccf",
  "data": {
    "subAccountList": [
      {
        "accountName": "subAccount1@xxx.com",
        "status": 1
      },
      {
        "accountName": "subAccount2@xxx.com",
        "status": 1
      }
    ]
  }
}
```

| Field | Type | Description |
| --- | --- | --- |
| accountName | String | Sub-Account username |
| status | Int | Account Status  
\-`0`\=disabled in background  
\-`1`\=normal  
\-`2`\=frozen by main account |