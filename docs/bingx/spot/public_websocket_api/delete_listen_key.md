## delete Listen Key

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

delete User data flow.

CURL

response

- http status 200 success

- http status 204 not content

- http status 404 not find key

DELETE /openApi/user/auth/userDataStream

### Request Parameters

| Parameter Name | Type   | Required | Description |
| -------------- | ------ | -------- | ----------- |
| listenKey      | string | yes      | listen Key  |

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
> [https://bingx-api.github.io/docs/#/en-us/spot/socket/listenKey.html](https://bingx-api.github.io/docs/#/en-us/spot/socket/listenKey.html)
