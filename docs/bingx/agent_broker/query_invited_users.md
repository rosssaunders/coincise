## Query Invited Users

GET /openApi/agent/v1/account/inviteAccountList

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

The proxy KOL can use this api to query basic information of invited subordinate
users.

- startTime < endTime, and endTime - startTime <= 30 days. If not filled in, it
  will query all data.

- Only proxies with verified UID can use this function. 3. Search for
  subordinate users registered between startTime and endTime, sorted by
  registration time from recent to far.

### Request Parameters

| Parameter Name | Type  | Required | Description                                                                                                                                                                          |
| -------------- | ----- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| startTime      | int64 | no       | Start timestamp （millisecond）, The maximum query window is 30 days. If you want to retrieve all data, you can leave the startTime and endTime fields blank.                        |
| endTime        | int64 | No       | end timestamp (millisecond), The maximum query window is 30 days. If querying for all data, startTime and endTime can be left blank                                                  |
| lastUid        | int64 | No       | User UID, must be transmitted when the queried data exceeds 10,000.The first request does not need to be passed, and the last uid of the current page is passed each time afterwards |
| pageIndex      | int64 | YES      | Page number for pagination, must be greater than 0                                                                                                                                   |
| pageSize       | int64 | YES      | The number of pages must be greater than 0 and the maximum value is 200                                                                                                              |
| recvWindow     | int64 | Yes      | Request valid time window, in milliseconds. Default is 5 seconds if not provided.                                                                                                    |
| timestamp      | int64 | no       | Request timestamp in milliseconds                                                                                                                                                    |

### Response Parameters

| Parameter Name    | Type    | Description                                                                                 |
| ----------------- | ------- | ------------------------------------------------------------------------------------------- |
| uid               | string  | Invited User UID                                                                            |
| ownInviteCode     | string  | Invitation code for Invited User                                                            |
| inviterSid        | long    | superiors Uid                                                                               |
| InvitationCode    | string  | Invitation code for superiors                                                               |
| registerTime      | long    | Registration timestamp, unit: milliseconds                                                  |
| directInvitation  | boolean | true: Direct invitation, false: Indirect invitation                                         |
| kycResult         | string  | true : KYC,false:no KYC                                                                     |
| deposit           | boolean | true (Deposited), false (Not deposited)                                                     |
| balanceVolume     | string  | net assets(USDT)                                                                            |
| trade             | boolean | true: Traded, false: Not traded, excluding trades made with trial funds or additional funds |
| userLevel         | int     | Customer level                                                                              |
| commissionRatio   | int     | Commission percentage, unit: %                                                              |
| currentBenefit    | int     | Current welfare method: 0 - No welfare, 1 - Fee cashback, 2 - Perpetual fee discount        |
| benefitRatio      | int     | Transaction fee reduction percentage, unit: %                                               |
| benefitExpiration | long    | Welfare expiration timestamp, unit: milliseconds                                            |

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
> [https://bingx-api.github.io/docs/#/en-us/agent/agent-interface.html](https://bingx-api.github.io/docs/#/en-us/agent/agent-interface.html)
