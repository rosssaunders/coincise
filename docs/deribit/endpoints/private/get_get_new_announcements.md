## /private/get_new_announcements

Retrieves announcements that have not been marked read by the user.

**Scope:** `account:read`

This is a private method; it can only be used after authentication.

### Parameters

_This method takes no parameters_

### Response

| Name                       | Type              | Description                                                                   |
| -------------------------- | ----------------- | ----------------------------------------------------------------------------- |
| id                         | integer           | The id that was sent in the request                                           |
| jsonrpc                    | string            | The JSON-RPC version (2.0)                                                    |
| result                     | array of _object_ |                                                                               |
|   ›  body                  | string            | The HTML body of the announcement                                             |
|   ›  confirmation          | boolean           | Whether the user confirmation is required for this announcement               |
|   ›  id                    | number            | A unique identifier for the announcement                                      |
|   ›  important             | boolean           | Whether the announcement is marked as important                               |
|   ›  publication_timestamp | integer           | The timestamp (milliseconds since the Unix epoch) of announcement publication |
|   ›  title                 | string            | The title of the announcement                                                 |
