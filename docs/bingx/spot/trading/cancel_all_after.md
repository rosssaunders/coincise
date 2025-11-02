## Cancel All After

POST /openApi/spot/v1/trade/cancelAllAfter

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Spot Trading

Content-Type:request body(application/json)

After the countdown ends, cancel all current pending orders. This request can be
continuously maintained to constantly extend the penalty time.

Rate limit: 1 time/1s

If you have a large amount of pending orders, they will be canceled in batches,
which may take several seconds to cancel in batches. In addition, during the
process of canceling all pending orders, the system will reject further ACTIVATE
and CLOSE requests. After the system has completed the task of canceling all
pending orders, it can continue to accept ACTIVATE and CLOSE requests.

HTTP request

Interface parameters

### Request Parameters

| Parameter Name | Type   | Required | Description                                        |
| -------------- | ------ | -------- | -------------------------------------------------- |
| type           | string | Yes      | Request type: ACTIVATE-Activate, CLOSE-Close       |
| timeOut        | int    | Yes      | Activate countdown time (seconds), range: 10s-120s |

### Response Parameters

| Parameter Name | Type   | Description                                                                    |
| -------------- | ------ | ------------------------------------------------------------------------------ |
| triggerTime    | int    | Trigger time for deleting all pending orders                                   |
| status         | Status | ACTIVATED (Activation successful)/CLOSED (Closed successfully)/FAILED (Failed) |
| note           | string | Explanation                                                                    |

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
> [https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html](https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html)
