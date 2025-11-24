# POST Sub-Account to Sub-Account (For Main Account) (SIGNED)

**Source:**
[Sub-Account to Sub-Account (For Main Account) (SIGNED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Sub-Account to Sub-Account (For Main Account) (SIGNED)

`Sub-Account spot asset transfer to Sub-Account spot asset (For Main Account)`

#### Request URL

`POST https://api-cloud.bitmart.com/account/sub-account/main/v1/sub-to-sub`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "requestNo":"4e2adcff-2122-1ce7-2557-4f65d2ce1ca2",     "amount":"1",     "currency":"BTC",     "fromAccount":"subAccountName1@xxx.com",     "toAccount":"subAccountName2@xxx.com" }' https://api-cloud.bitmart.com/account/sub-account/main/v1/sub-to-sub`

| Field       | Type   | Required? | Description                           |
| ----------- | ------ | --------- | ------------------------------------- |
| requestNo   | String | Yes       | UUID,unique identifier, max length 64 |
| amount      | String | Yes       | Transfer amount                       |
| currency    | String | Yes       | Currency                              |
| fromAccount | String | Yes       | Transfer out Sub-Account username     |
| toAccount   | String | Yes       | Transfer to Sub-Account username      |

#### Response Data

> Response

```json
{
  "code": 1000,
  "trace": "886fb6ae-456b-4654-b4e0-d681ac05cea1",
  "message": "OK",
  "data": {}
}
```

If code value is 1000,it means the transfer is successful.
