# GET /private/get_pending_block_trades

**DEPRECATED**: This method is deprecated. Please use
`private/get_block_trade_requests` instead.

Provides a list of pending block trade approvals. `timestamp` and `nonce`
received in response can be used to approve or reject the pending block trade.

To use a block trade approval feature the additional API key setting feature
called: `enabled_features: block_trade_approval` is required. This key has to be
given to broker/registered partner who performs the trades on behalf of the user
for the feature to be active. If the user wants to approve the trade, he has to
approve it from different API key with doesn't have this feature enabled.

**Scope:** `block_trade:read`

This is a private method; it can only be used after authentication.

### Parameters

_This method takes no parameters_

### Response

| Name                                  | Type    | Description                                                                                                                                             |
| ------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                    | integer | The id that was sent in the request                                                                                                                     |
| jsonrpc                               | string  | The JSON-RPC version (2.0) result array of object                                                                                                       |
| result[].app_name                     | string  | The name of the application that executed the block trade on behalf of the user (optional).                                                             |
| result[].broker_code                  | string  | Broker code associated with the broker block trade.                                                                                                     |
| result[].broker_name                  | string  | Name of the broker associated with the block trade.                                                                                                     |
| result[].combo_id                     | string  | Combo instrument identifier                                                                                                                             |
| result[].counterparty_state           | object  | State of the pending block trade for the other party (optional).                                                                                        |
| result[].counterparty_state.timestamp | integer | State timestamp.                                                                                                                                        |
| result[].counterparty_state.value     | string  | State value.                                                                                                                                            |
| result[].nonce                        | string  | Nonce that can be used to approve or reject pending block trade.                                                                                        |
| result[].role                         | string  | Trade role of the user: maker or taker                                                                                                                  |
| result[].state                        | object  | State of the pending block trade for current user.                                                                                                      |
| result[].state.timestamp              | integer | State timestamp.                                                                                                                                        |
| result[].state.value                  | string  | State value.                                                                                                                                            |
| result[].timestamp                    | integer | Timestamp that can be used to approve or reject pending block trade. result[].trades array of object                                                    |
| result[].trades[].amount              | number  | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| result[].trades[].direction           | string  | Direction: buy, or sell                                                                                                                                 |
| result[].trades[].instrument_name     | string  | Unique instrument identifier                                                                                                                            |
| result[].trades[].price               | number  | Price in base currency                                                                                                                                  |
| result[].user_id                      | integer | Unique user identifier                                                                                                                                  |
| result[].username                     | string  | Username of the user who initiated the block trade.                                                                                                     |
