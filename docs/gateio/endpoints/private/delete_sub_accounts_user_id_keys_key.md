# DELETE /sub_accounts/{user_id}/keys/{key}

**Source:**
[/sub_accounts/{user_id}/keys/{key}](https://www.gate.io/docs/developers/apiv4/en/#deletesubaccountkeys-parameters)

## Authentication

Required (Private Endpoint)

## [#](#delete-sub-account-api-key-pair) Delete sub-account API key pair

`DELETE /sub_accounts/{user_id}/keys/{key}`

_Delete sub-account API key pair_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#deletesubaccountkeys-parameters](https://www.gate.io/docs/developers/apiv4/en/#deletesubaccountkeys-parameters)

| Name    | In   | Type    | Required | Description         |
| ------- | ---- | ------- | -------- | ------------------- |
| user_id | path | integer | true     | Sub-account user ID |
| key     | path | string  | true     | Sub-account API key |

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#deletesubaccountkeys-responses](https://www.gate.io/docs/developers/apiv4/en/#deletesubaccountkeys-responses)

| Status | Meaning                                                                            | Description          | Schema |
| ------ | ---------------------------------------------------------------------------------- | -------------------- | ------ |
| 204    | [No Content (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.5) | Deleted successfully | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-specific-api-key-pair-of-the-sub-account) Get specific API key pair of the sub-account

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-specific-api-key-pair-of-the-sub-account](https://www.gate.io/docs/developers/apiv4/en/#get-specific-api-key-pair-of-the-sub-account)

> Code samples
