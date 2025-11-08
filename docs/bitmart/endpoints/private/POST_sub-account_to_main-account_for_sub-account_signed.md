# POST Sub-Account to Main-Account (For Sub-Account) (SIGNED)

**Source:** [Sub-Account to Main-Account (For Sub-Account) (SIGNED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Sub-Account to Main-Account (For Sub-Account) (SIGNED)

`Sub-Account futures asset transfer to Main-Account futures asset (For Sub-Account)`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/account/contract/sub-account/sub/v1/sub-to-main`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`` curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'  -X POST -d '{     "requestNo":"4e2adcff-2122-1ce7-2557-4f65d2ce1ca2",     "amount":"1",     "currency":"USDT" }' https://api-cloud-v2.bitmart.com/account/contract/sub-account/sub/v1/sub-to-main` ``

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| requestNo | String | Yes | UUID,unique identifier, max length 64 |
| amount | String | Yes | Transfer amount |
| currency | String | Yes | Currently only `USDT` is supported |

#### Response Data

> Response

`{   "message": "OK",   "code": 1000,   "trace": "c1e4e99ff0ec452f8b8bc5f1eb38d733.76.16861970092723253",   "data": {} }`

If code value is 1000,it means the transfer is successful.