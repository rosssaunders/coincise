# GET /private/approve\_block\_trade

Used to approve a pending block trade. `nonce` and `timestamp` are used to identify the block trade while `role` should be opposite to the trading counterparty.  
  
To use a block trade approval feature the additional API key setting feature called: `enabled_features: block_trade_approval` is required. This key has to be given to broker/registered partner who performs the trades on behalf of the user for the feature to be active. If the user wants to approve the trade, he has to approve it from different API key with doesn't have this feature enabled.

**Scope:** `block_trade:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| timestamp | true | integer | Timestamp, shared with other party (milliseconds since the UNIX epoch) |  |
| nonce | true | string | Nonce, shared with other party |  |
| role | true | string | maker taker | Describes if user wants to be maker or taker of trades |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) |
| result | string | Result of method execution. ok in case of success |