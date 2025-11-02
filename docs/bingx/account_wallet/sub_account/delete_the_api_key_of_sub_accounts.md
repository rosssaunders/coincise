## Delete the API Key of sub-accounts

POST /openApi/subAccount/v1/apiKey/del

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Manage Subaccounts

Content-Type:request body(application/json)

This API is used for the main user to delete the API key of the sub-account. The
user who verifies the signature of this API must be main account

### Request Parameters

| Parameter Name | Type   | Required | Field Description                                       |
| -------------- | ------ | -------- | ------------------------------------------------------- |
| subUid         | long   | yes      | Sub account uid                                         |
| apiKey         | string | yes      |                                                         |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds     |

### Response Parameters

| Parameter Name | Type | Field Description |
| -------------- | ---- | ----------------- |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/common/sub-account](https://bingx-api.github.io/docs/#/en-us/common/sub-account)
