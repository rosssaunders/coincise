## /public/get_announcements

Retrieves announcements. Default "start_timestamp" parameter value is current
timestamp, "count" parameter value must be between 1 and 50, default is 5.

### Parameters

| Parameter       | Required | Type    | Enum | Description                                                                             |
| --------------- | -------- | ------- | ---- | --------------------------------------------------------------------------------------- |
| start_timestamp | false    | integer |      | The most recent timestamp to return the results for (milliseconds since the UNIX epoch) |
| count           | false    | integer |      | Maximum count of returned announcements, default - `5`, maximum - `50`                  |

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
