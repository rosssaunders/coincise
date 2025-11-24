# GET /public/hello

Method used to introduce the client software connected to Deribit platform over
websocket. Provided data may have an impact on the maintained connection and
will be collected for internal statistical purposes. In response, Deribit will
also introduce itself.

### Parameters

| Parameter      | Required | Type   | Enum                    | Description |
| -------------- | -------- | ------ | ----------------------- | ----------- |
| client_name    | true     | string | Client software name    |             |
| client_version | true     | string | Client software version |             |

### Response

| Name           | Type    | Description                              |
| -------------- | ------- | ---------------------------------------- |
| id             | integer | The id that was sent in the request      |
| jsonrpc        | string  | The JSON-RPC version (2.0) result object |
| result.version | string  | The API version                          |
