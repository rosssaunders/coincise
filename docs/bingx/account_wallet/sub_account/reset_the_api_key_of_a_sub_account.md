## Reset the API Key of a sub-account

POST /openApi/subAccount/v1/apiKey/edit

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Manage Subaccounts

Content-Type:request body(application/json)

This API is used for the main account to edit the API key remarks, permissions,
and IP addresses of the sub-account. The user who verifies the signature of this
API must be main account

### Request Parameters

| Parameter Name | Type   | Required | Field Description                                                                                                                 |
| -------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| subUid         | long   | yes      | Sub account uid                                                                                                                   |
| apiKey         | string | yes      |                                                                                                                                   |
| note           | string | yes      | notes                                                                                                                             |
| permissions    | Array  | yes      | permissions，1-Spot Trading，2-Read，3-Perpetual Futures Trading，4-Universal Transfer，7-Allow internal transfer of sub accounts |
| ipAddresses    | Array  | no       | IP whitelist                                                                                                                      |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds                                                                           |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                                                                               |

### Response Parameters

| Parameter Name | Type   | Field Description                                                                                                                 |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| permissions    | Array  | permissions，1-Spot Trading，2-Read，3-Perpetual Futures Trading，4-Universal Transfer，7-Allow internal transfer of sub accounts |
| ipAddresses    | Array  | IP whitelist                                                                                                                      |
| note           | string | notes                                                                                                                             |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/common/sub-account](https://bingx-api.github.io/docs/#/en-us/common/sub-account)
