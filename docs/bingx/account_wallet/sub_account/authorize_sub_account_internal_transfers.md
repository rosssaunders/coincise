## Authorize sub-account internal transfers

POST /openApi/account/v1/innerTransfer/authorizeSubAccount

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Manage Subaccounts

Content-Type:request body(application/json)

It is used for the main account to set the asset transfer permission of
sub-account in batches, so that the sub-account with this permission can
transfer assets to other accounts under the name of the main account through the
transfer interface. By default, the main account can transfer assets to
sub-account, and the sub-account can transfer assets to the main account by
default, without separate settings. The user who verifies the signature of this
API must be main account

### Request Parameters

| Parameter Name | Type    | Required | Description                                             |
| -------------- | ------- | -------- | ------------------------------------------------------- |
| subUids        | string  | yes      | User uid list, comma separated                          |
| transferable   | boolean | yes      | Is it allowed? True allows false prohibits              |
| recvWindow     | int64   | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64   | yes      | Request valid time window value, Unit: milliseconds     |

### Response Parameters

| Parameter Name | Type    | Description |
| -------------- | ------- | ----------- | ------------------------------------------------------- |
| subUids        | string  | yes         | User uid list, comma separated                          |
| transferable   | boolean | yes         | Is it allowed? True allows false prohibits              |
| recvWindow     | int64   | no          | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64   | yes         | Request valid time window value, Unit: milliseconds     |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/common/sub-account](https://bingx-api.github.io/docs/#/en-us/common/sub-account)
