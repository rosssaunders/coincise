# GET /public/test

Tests the connection to the API server, and returns its version. You can use this to make sure the API is reachable, and matches the expected version.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| expected_result | false | string | exception | The value "exception" will trigger an error response. This may be useful for testing wrapper libraries. |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result object |
| result.version | string | The API version |