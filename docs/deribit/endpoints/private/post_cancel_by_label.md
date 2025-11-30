# POST /private/cancel_by_label

Cancels orders by label. All user's orders (trigger orders too), with a given
label are cancelled in all currencies or in one given currency (in this case
currency queue is used)

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type   | Enum                                                     | Description         |
| --------- | -------- | ------ | -------------------------------------------------------- | ------------------- |
| label     | true     | string | user defined label for the order (maximum 64 characters) |                     |
| currency  | false    | string | BTC ETH USDC USDT EURR                                   | The currency symbol |

### Response

| Name    | Type    | Description                                   |
| ------- | ------- | --------------------------------------------- |
| id      | integer | The id that was sent in the request           |
| jsonrpc | string  | The JSON-RPC version (2.0)                    |
| result  | number  | Total number of successfully cancelled orders |
