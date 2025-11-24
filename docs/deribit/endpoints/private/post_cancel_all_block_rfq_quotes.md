# POST /private/cancel\_all\_block\_rfq\_quotes

**Maker method**

This method cancels all user quotes in all Block RFQs. Optionally cancels all quotes in a specific RFQ if the `block_rfq_id` is provided.

**Note:** Mass cancellation by label is not supported. This method will cancel all quotes regardless of their labels.

**Scope:** `block_rfq:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| block_rfq_id | false | integer | ID of the Block RFQ |  |
| detailed | false | boolean | When detailed is set to true output format is changed. See description. Default: false |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) |
| result | number | Total number of successfully cancelled quotes |