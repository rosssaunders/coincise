# GET /public/get_time

Retrieves the current time (in milliseconds). This API endpoint can be used to
check the clock skew between your software and Deribit's systems.

### Parameters

_This method takes no parameters_

### Response

| Name    | Type    | Description                                           |
| ------- | ------- | ----------------------------------------------------- |
| id      | integer | The id that was sent in the request                   |
| jsonrpc | string  | The JSON-RPC version (2.0)                            |
| result  | integer | Current timestamp (milliseconds since the UNIX epoch) |
