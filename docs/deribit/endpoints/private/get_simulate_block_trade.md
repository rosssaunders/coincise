# GET /private/simulate\_block\_trade

Checks if a block trade can be executed

**Scope:** `block_trade:read`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| role | false | string | maker taker | Describes if user wants to be maker or taker of trades |
| trades | true | array of objects | List of trades for block trade |  |
| trades[].instrument_name | true | string | Instrument name |  |
| trades[].price | true | number | Price for trade |  |
| trades[].amount | false | number | It represents the requested trade size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |  |
| trades[].direction | true | string | buy sell | Direction of trade from the maker perspective |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) |
| result | boolean | true if block trade can be executed, false otherwise |