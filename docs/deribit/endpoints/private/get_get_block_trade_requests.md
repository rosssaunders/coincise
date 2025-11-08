## /private/get_block_trade_requests

Provides a list of block trade requests including pending approvals, declined
trades, and expired trades. `timestamp` and `nonce` received in response can be
used to approve or reject the pending block trade.

To use a block trade approval feature the additional API key setting feature
called: `enabled_features: block_trade_approval` is required. This key has to be
given to broker/registered partner who performs the trades on behalf of the user
for the feature to be active. If the user wants to approve the trade, he has to
approve it from different API key with doesn't have this feature enabled.

Only broker clients can use `broker_code` to query for their broker block trade
requests.

**Scope:** `block_trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter   | Required | Type   | Enum | Description                                                                                                                            |
| ----------- | -------- | ------ | ---- | -------------------------------------------------------------------------------------------------------------------------------------- |
| broker_code | false    | string |      | Broker code to filter block trade requests. Only broker clients can use `broker_code` to query for their executed broker block trades. |

### Response

| Name                      | Type              | Description                                                                                                                                             |
| ------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                        | integer           | The id that was sent in the request                                                                                                                     |
| jsonrpc                   | string            | The JSON-RPC version (2.0)                                                                                                                              |
| result                    | array of _object_ |                                                                                                                                                         |
|   ›  app_name             | string            | The name of the application that executed the block trade on behalf of the user (optional).                                                             |
|   ›  broker_code          | string            | Broker code associated with the broker block trade.                                                                                                     |
|   ›  broker_name          | string            | Name of the broker associated with the block trade.                                                                                                     |
|   ›  combo_id             | string            | Combo instrument identifier                                                                                                                             |
|   ›  counterparty_state   | _object_          | State of the pending block trade for the other party (optional).                                                                                        |
|   ›    ›  timestamp       | integer           | State timestamp.                                                                                                                                        |
|   ›    ›  value           | string            | State value.                                                                                                                                            |
|   ›  nonce                | string            | Nonce that can be used to approve or reject pending block trade.                                                                                        |
|   ›  role                 | string            | Trade role of the user: `maker` or `taker`                                                                                                              |
|   ›  state                | _object_          | State of the pending block trade for current user.                                                                                                      |
|   ›    ›  timestamp       | integer           | State timestamp.                                                                                                                                        |
|   ›    ›  value           | string            | State value.                                                                                                                                            |
|   ›  timestamp            | integer           | Timestamp that can be used to approve or reject pending block trade.                                                                                    |
|   ›  trades               | array of _object_ |                                                                                                                                                         |
|   ›    ›  amount          | number            | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
|   ›    ›  direction       | string            | Direction: `buy`, or `sell`                                                                                                                             |
|   ›    ›  instrument_name | string            | Unique instrument identifier                                                                                                                            |
|   ›    ›  price           | number            | Price in base currency                                                                                                                                  |
|   ›  user_id              | integer           | Unique user identifier                                                                                                                                  |
|   ›  username             | string            | Username of the user who initiated the block trade.                                                                                                     |
