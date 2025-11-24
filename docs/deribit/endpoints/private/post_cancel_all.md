# POST /private/cancel\_all

This method cancels all users orders and trigger orders within all currencies and instrument kinds.

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| detailed | false | boolean | When detailed is set to true output format is changed. See description. Default: false |  |
| freeze_quotes | false | boolean | Whether or not to reject incoming quotes for 1 second after cancelling (false by default). Related to private/mass_quote request. |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) |
| result | number | Total number of successfully cancelled orders |