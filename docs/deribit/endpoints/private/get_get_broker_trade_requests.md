# GET /private/get\_broker\_trade\_requests

**Broker Method** Provides a list of broker block trade requests including pending approvals, declined trades, and expired trades. `timestamp` and `nonce` received in response can be used to approve or reject the pending broker block trade.

**Scope:** `block_trade:read`

This is a private method; it can only be used after authentication.

### Parameters

*This method takes no parameters*

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result array of object result[].maker object |
| result[].maker.client_id | integer | ID of a client; available to broker. Represents a group of users under a common name. |
| result[].maker.client_link_id | integer | ID assigned to a single user in a client; available to broker. |
| result[].maker.client_link_name | string | Name of the linked user within the client; available to broker. |
| result[].maker.client_name | string | Name of the client; available to broker. |
| result[].maker.state | string | State of the request from the maker side: initial, approved, or rejected. |
| result[].maker.user_id | string | Obscured user id of the maker. |
| result[].nonce | string | Nonce for approving or rejecting the broker block trade request. |
| result[].state | string | State of the broker block trade request. result[].taker object |
| result[].taker.client_id | integer | ID of a client; available to broker. Represents a group of users under a common name. |
| result[].taker.client_link_id | integer | ID assigned to a single user in a client; available to broker. |
| result[].taker.client_link_name | string | Name of the linked user within the client; available to broker. |
| result[].taker.client_name | string | Name of the client; available to broker. |
| result[].taker.state | string | State of the request from the taker side: initial, approved, or rejected. |
| result[].taker.user_id | string | Obscured user id of the taker. |
| result[].timestamp | integer | Timestamp of the broker block trade request (milliseconds since the UNIX epoch). result[].trades array of object |
| result[].trades[].amount | number | Trade amount. |
| result[].trades[].direction | string | Trade direction (buy or sell). |
| result[].trades[].instrument_name | string | Name of the traded instrument. |
| result[].trades[].price | number | Trade price. |