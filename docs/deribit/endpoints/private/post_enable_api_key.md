## /private/enable_api_key

Enables api key with given id.
[Important notes](#creating-editing-removing-api-keys).

**Scope:** `account:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type    | Enum | Description |
| --------- | -------- | ------- | ---- | ----------- |
| id        | true     | integer |      | Id of key   |

### Response

| Name                  | Type            | Description                                                                                     |
| --------------------- | --------------- | ----------------------------------------------------------------------------------------------- |
| id                    | integer         | The id that was sent in the request                                                             |
| jsonrpc               | string          | The JSON-RPC version (2.0)                                                                      |
| result                | _object_        |                                                                                                 |
|   ›  client_id        | string          | Client identifier used for authentication                                                       |
|   ›  client_secret    | string          | Client secret or MD5 fingerprint of public key used for authentication                          |
|   ›  default          | boolean         | Informs whether this api key is default (field is deprecated and will be removed in the future) |
|   ›  enabled          | boolean         | Informs whether api key is enabled and can be used for authentication                           |
|   ›  enabled_features | array of string | List of enabled advanced on-key features. Available options:                                    |

\- `restricted_block_trades`: Limit the block_trade read the scope of the API
key to block trades that have been made using this specific API key  
\- `block_trade_approval`: Block trades created using this API key require
additional user approval. Methods that use `block_rfq` scope are not affected by
Block Trade approval feature  
 | |   ›  id | integer | key identifier | |   ›  ip_whitelist | array | List of
IP addresses whitelisted for a selected key | |   ›  max_scope | string |
Describes maximal access for tokens generated with given key, possible values:
`trade:[read, read_write, none]`, `wallet:[read, read_write, none]`,
`account:[read, read_write, none]`, `block_trade:[read, read_write, none]`,
`block_rfq:[read, read_write, none]`. If scope is not provided, its value is set
as none.

Please check details described in [Access scope](#access-scope) | |   ›  name |
string | Api key name that can be displayed in transaction log | |
  ›  public_key | string | PEM encoded public key (Ed25519/RSA) used for
asymmetric signatures (optional) | |   ›  timestamp | integer | The timestamp
(milliseconds since the Unix epoch) |
