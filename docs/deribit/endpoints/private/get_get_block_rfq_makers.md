# GET /private/get_block_rfq_makers

This method returns a list of all available Block RFQ makers.

**Scope:** `block_rfq:read`

This is a private method; it can only be used after authentication.

### Parameters

_This method takes no parameters_

### Response

| Name    | Type    | Description                         |
| ------- | ------- | ----------------------------------- |
| id      | integer | The id that was sent in the request |
| jsonrpc | string  | The JSON-RPC version (2.0)          |
| result  | array   | A list of available makers.         |
