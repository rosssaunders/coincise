## Query agent user information

GET /openApi/agent/v1/account/inviteRelationCheck

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

The agent KOL can use this api to query whether the corresponding UID is an
invited user under his or her name.

- The signature verification user must be a parent user and have an agent
  role; 2. It supports querying whether the UID is a user directly or indirectly
  invited by the signature verification user.

### Request Parameters

| Parameter Name | Type | Required | Description      |
| -------------- | ---- | -------- | ---------------- |
| uid            | long | YES      | Invited User UID |

### Response Parameters

| Parameter Name    | Type    | Description                                                                                 |
| ----------------- | ------- | ------------------------------------------------------------------------------------------- |
| uid               | long    | Invited User UID                                                                            |
| existInviter      | string  | true :There is an inviter ,false:There is no inviter                                        |
| inviteResult      | boolean | true: invitation relationship,false: non-invitation relationship                            |
| directInvitation  | boolean | true: Direct invitation, false: Indirect invitation                                         |
| inviterSid        | long    | superiors Uid                                                                               |
| registerTime      | long    | Registration timestamp, unit: milliseconds                                                  |
| deposit           | boolean | true :Deposited, false :Not deposited                                                       |
| kycResult         | string  | true : KYC,false:no KYC                                                                     |
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
