# POST Main-Account to Sub-Account (For Main Account) (SIGNED)

**Source:** [Main-Account to Sub-Account (For Main Account) (SIGNED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Main-Account to Sub-Account (For Main Account) (SIGNED)

`Main-account futures asset transfer to Sub-account futures asset (For Main Account)`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/account/contract/sub-account/main/v1/main-to-sub`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`` curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "requestNo":"4e2adcff-2122-1ce7-2557-4f65d2ce1ca2",     "amount":"1",     "currency":"BTC",     "subAccount":"subAccountName@xxx.com" }' https://api-cloud-v2.bitmart.com/account/contract/sub-account/main/v1/main-to-sub` ``

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| requestNo | String | Yes | UUID,unique identifier, max length 64 |
| amount | String | Yes | Transfer amount |
| currency | String | Yes | Currently only `USDT` is supported |
| subAccount | String | Yes | Sub-Account username |

#### Response Data

> Response

```json
{
  "message": "OK",
  "code": 1000,
  "trace": "c1e4e99ff0ec452f8b8bc5f1eb38d733.76.16861963186213159",
  "data": {}
}
```

If code value is 1000,it means the transfer is successful.