# POST /sub_accounts/{user_id}/unlock

**Source:** [/sub_accounts/{user_id}/unlock](https://www.gate.io/docs/developers/apiv4/en/#unlocksubaccount-parameters)

## Authentication

Required (Private Endpoint)

## [#](#unlock-sub-account) Unlock sub-account

`POST /sub_accounts/{user_id}/unlock`

_Unlock sub-account_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#unlocksubaccount-parameters](https://www.gate.io/docs/developers/apiv4/en/#unlocksubaccount-parameters)

| Name    | In   | Type           | Required | Description         |
| ------- | ---- | -------------- | -------- | ------------------- |
| user_id | path | integer(int64) | true     | Sub-account user ID |

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#unlocksubaccount-responses](https://www.gate.io/docs/developers/apiv4/en/#unlocksubaccount-responses)

| Status | Meaning                                                                            | Description           | Schema |
| ------ | ---------------------------------------------------------------------------------- | --------------------- | ------ |
| 204    | [No Content (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.5) | Unlocked successfully | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-sub-account-mode) Get sub-account mode

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-sub-account-mode](https://www.gate.io/docs/developers/apiv4/en/#get-sub-account-mode)

> Code samples
