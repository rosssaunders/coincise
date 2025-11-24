# GET /private/invalidate_block_trade_signature

User at any time (before the private/execute_block_trade is called) can
invalidate its own signature effectively cancelling block trade

**Scope:** `block_trade:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                              | Description |
| --------- | -------- | ------ | ------------------------------------------------- | ----------- |
| signature | true     | string | Signature of block trade that will be invalidated |             |

### Response

| Name    | Type    | Description                                       |
| ------- | ------- | ------------------------------------------------- |
| id      | integer | The id that was sent in the request               |
| jsonrpc | string  | The JSON-RPC version (2.0)                        |
| result  | string  | Result of method execution. ok in case of success |
