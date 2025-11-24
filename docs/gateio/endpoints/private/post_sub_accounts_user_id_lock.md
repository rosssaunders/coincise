# POST /sub_accounts/{user_id}/lock

**Source:**
[/sub_accounts/{user_id}/lock](https://www.gate.io/docs/developers/apiv4/en/#locksubaccount-parameters)

## Authentication

Required (Private Endpoint)

## [#](#lock-sub-account) Lock sub-account

`POST /sub_accounts/{user_id}/lock`

_Lock sub-account_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#locksubaccount-parameters](https://www.gate.io/docs/developers/apiv4/en/#locksubaccount-parameters)

| Name    | In   | Type           | Required | Description         |
| ------- | ---- | -------------- | -------- | ------------------- |
| user_id | path | integer(int64) | true     | Sub-account user ID |

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#locksubaccount-responses](https://www.gate.io/docs/developers/apiv4/en/#locksubaccount-responses)

| Status | Meaning                                                                            | Description         | Schema |
| ------ | ---------------------------------------------------------------------------------- | ------------------- | ------ |
| 204    | [No Content (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.5) | Locked successfully | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#unlock-sub-account) Unlock sub-account

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#unlock-sub-account](https://www.gate.io/docs/developers/apiv4/en/#unlock-sub-account)

> Code samples
