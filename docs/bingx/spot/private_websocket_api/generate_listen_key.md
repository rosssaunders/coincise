## generate Listen Key

POST /openApi/user/auth/userDataStream

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

listen key Valid for 1 hour

interface

CURL

response

{"listenKey":"a8ea75681542e66f1a50a1616dd06ed77dab61baa0c296bca03a9b13ee5f2dd7"}

### Request Parameters

| Parameter Name | Type   | Required | Description |
| -------------- | ------ | -------- | ----------- |
| X-BX-APIKEY    | string | no       | API KEY     |

### Response Parameters

| Parameter Name | Type   | Description |
| -------------- | ------ | ----------- |
| listenKey      | string | listen Key  |

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
