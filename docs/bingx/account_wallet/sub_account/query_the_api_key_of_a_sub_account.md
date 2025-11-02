## Query the API Key of a sub-account

GET /openApi/account/v1/apiKey/query

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

This interface is used by the main account to query its own API key information,
and the main user to query the API key information of the sub-user. The user who
verifies the signature of this API must be main account.

### Request Parameters

| Parameter Name | Type   | Required | Description                                             |
| -------------- | ------ | -------- | ------------------------------------------------------- |
| uid            | long   | yes      | User uid                                                |
| apiKey         | string | no       |                                                         |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds     |

### Response Parameters

| Parameter Name | Type   | Description                                                                                                                       |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| apiKey         | string |                                                                                                                                   |
| note           | string | notes                                                                                                                             |
| permissions    | Array  | permissions，1-Spot Trading，2-Read，3-Perpetual Futures Trading，4-Universal Transfer，7-Allow internal transfer of sub accounts |
| ipAddresses    | Array  | IP whitelist                                                                                                                      |
| createTime     | long   | Creation time                                                                                                                     |
| updateTime     | long   | update time                                                                                                                       |

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
