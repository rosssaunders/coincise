# GET /private/get\_new\_announcements

Retrieves announcements that have not been marked read by the user.

**Scope:** `account:read`

This is a private method; it can only be used after authentication.

### Parameters

*This method takes no parameters*

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result array of object |
| result[].body | string | The HTML body of the announcement |
| result[].confirmation | boolean | Whether the user confirmation is required for this announcement |
| result[].id | number | A unique identifier for the announcement |
| result[].important | boolean | Whether the announcement is marked as important |
| result[].publication_timestamp | integer | The timestamp (milliseconds since the Unix epoch) of announcement publication |
| result[].title | string | The title of the announcement |