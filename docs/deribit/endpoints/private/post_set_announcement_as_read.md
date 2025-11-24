# POST /private/set_announcement_as_read

Marks an announcement as read, so it will not be shown in
`get_new_announcements`.

**Scope:** `account:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter       | Required | Type   | Enum                       | Description |
| --------------- | -------- | ------ | -------------------------- | ----------- |
| announcement_id | true     | number | the ID of the announcement |             |

### Response

| Name    | Type    | Description                                       |
| ------- | ------- | ------------------------------------------------- |
| id      | integer | The id that was sent in the request               |
| jsonrpc | string  | The JSON-RPC version (2.0)                        |
| result  | string  | Result of method execution. ok in case of success |
