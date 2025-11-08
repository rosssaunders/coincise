## /private/cancel_all_by_kind_or_type

Cancels all orders in currency(currencies), optionally filtered by instrument
kind and/or order type.

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type                       | Enum     | Description                                                      |
| --------- | -------- | -------------------------- | -------- | ---------------------------------------------------------------- |
| currency  | true     | string or array of strings |          | The currency symbol, list of currency symbols or `"any"` for all |
| kind      | false    | string                     | `future` |

`option`  
`spot`  
`future_combo`  
`option_combo`  
`combo`  
`any` | Instrument kind, `"combo"` for any combo or `"any"` for all. If not
provided instruments of all kinds are considered | | type | false | string |
`all`  
`limit`  
`trigger_all`  
`stop`  
`take`  
`trailing_stop` | Order type - `limit`, `stop`, `take`, `trigger_all` or `all`,
default - `all` | | detailed | false | boolean | | When detailed is set to
`true` output format is changed. See
[description](#detailed-response-for-private-cancel_all-and-private-cancel_by_label-methods).
Default: `false` | | freeze_quotes | false | boolean | | Whether or not to
reject incoming quotes for 1 second after cancelling (`false` by default).
Related to `private/mass_quote` request. |

### Response

| Name    | Type    | Description                                   |
| ------- | ------- | --------------------------------------------- |
| id      | integer | The id that was sent in the request           |
| jsonrpc | string  | The JSON-RPC version (2.0)                    |
| result  | number  | Total number of successfully cancelled orders |
