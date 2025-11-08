## /private/get_broker_trade_requests

**Broker Method** Provides a list of broker block trade requests including
pending approvals, declined trades, and expired trades. `timestamp` and `nonce`
received in response can be used to approve or reject the pending broker block
trade.

**Scope:** `block_trade:read`

This is a private method; it can only be used after authentication.

### Parameters

_This method takes no parameters_

### Response

| Name                       | Type              | Description                                                                           |
| -------------------------- | ----------------- | ------------------------------------------------------------------------------------- |
| id                         | integer           | The id that was sent in the request                                                   |
| jsonrpc                    | string            | The JSON-RPC version (2.0)                                                            |
| result                     | array of _object_ |                                                                                       |
|   ›  maker                 | _object_          |                                                                                       |
|   ›    ›  client_id        | integer           | ID of a client; available to broker. Represents a group of users under a common name. |
|   ›    ›  client_link_id   | integer           | ID assigned to a single user in a client; available to broker.                        |
|   ›    ›  client_link_name | string            | Name of the linked user within the client; available to broker.                       |
|   ›    ›  client_name      | string            | Name of the client; available to broker.                                              |
|   ›    ›  state            | string            | State of the request from the maker side: `initial`, `approved`, or `rejected`.       |
|   ›    ›  user_id          | string            | Obscured user id of the maker.                                                        |
|   ›  nonce                 | string            | Nonce for approving or rejecting the broker block trade request.                      |
|   ›  state                 | string            | State of the broker block trade request.                                              |
|   ›  taker                 | _object_          |                                                                                       |
|   ›    ›  client_id        | integer           | ID of a client; available to broker. Represents a group of users under a common name. |
|   ›    ›  client_link_id   | integer           | ID assigned to a single user in a client; available to broker.                        |
|   ›    ›  client_link_name | string            | Name of the linked user within the client; available to broker.                       |
|   ›    ›  client_name      | string            | Name of the client; available to broker.                                              |
|   ›    ›  state            | string            | State of the request from the taker side: `initial`, `approved`, or `rejected`.       |
|   ›    ›  user_id          | string            | Obscured user id of the taker.                                                        |
|   ›  timestamp             | integer           | Timestamp of the broker block trade request (milliseconds since the UNIX epoch).      |
|   ›  trades                | array of _object_ |                                                                                       |
|   ›    ›  amount           | number            | Trade amount.                                                                         |
|   ›    ›  direction        | string            | Trade direction (buy or sell).                                                        |
|   ›    ›  instrument_name  | string            | Name of the traded instrument.                                                        |
|   ›    ›  price            | number            | Trade price.                                                                          |
