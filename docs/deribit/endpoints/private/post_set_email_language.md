# POST /private/set_email_language

Changes the language to be used for emails.

**Scope:** `account:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                                                             | Description |
| --------- | -------- | ------ | -------------------------------------------------------------------------------- | ----------- |
| language  | true     | string | The abbreviated language name. Valid values include "en", "ko", "zh", "ja", "ru" |             |

### Response

| Name    | Type    | Description                                       |
| ------- | ------- | ------------------------------------------------- |
| id      | integer | The id that was sent in the request               |
| jsonrpc | string  | The JSON-RPC version (2.0)                        |
| result  | string  | Result of method execution. ok in case of success |
