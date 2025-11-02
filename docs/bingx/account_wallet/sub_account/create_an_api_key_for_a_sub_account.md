## Create an API Key for a sub-account

POST /openApi/subAccount/v1/apiKey/create

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Manage Subaccounts

Content-Type:request body(application/json)

This API is used to create an API key for a sub-user of the main account. The
user who verifies the signature of this API must be main account

### Request Parameters

| Parameter Name | Type   | Required | Field Description                                                                                                                           |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| subUid         | long   | yes      | Sub account uid                                                                                                                             |
| note           | string | yes      | notes                                                                                                                                       |
| permissions    | Array  | yes      | permissions，1-Spot Trading，2-Read，3-Perpetual Futures Trading,4-Universal Transfer,5-Widthdraw,7-Allow internal transfer of sub accounts |
| ipAddresses    | Array  | no       | IP whitelist                                                                                                                                |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds                                                                                     |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                                                                                         |

### Response Parameters

| Parameter Name | Type   | Field Description                                                                                                                 |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| apiKey         | string | apiKey                                                                                                                            |
| apiSecret      | string | apiSecret                                                                                                                         |
| permissions    | Array  | permissions，1-Spot Trading，2-Read，3-Perpetual Futures Trading，4-Universal Transfer，7-Allow internal transfer of sub accounts |
| ipAddresses    | Array  | IP whitelist                                                                                                                      |
| note           | string | notes                                                                                                                             |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/common/sub-account](https://bingx-api.github.io/docs/#/en-us/common/sub-account)
