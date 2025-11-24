# GET /private/get\_email\_language

Retrieves the language to be used for emails.

**Scope:** `account:read`

This is a private method; it can only be used after authentication.

### Parameters

*This method takes no parameters*

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) |
| result | string | The abbreviation of the language |