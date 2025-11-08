## /private/create_api_key

Creates a new api key with a given scope.
[Important notes](#creating-editing-removing-api-keys)  
**[TFA required](#security-keys)**

**Note:** You can display the created API key using the
[private/list_api_keys](https://docs.deribit.com/#private-list_api_keys) method.

**📖 Related Support Article:**
[Creating new API key on Deribit](https://support.deribit.com/hc/en-us/articles/26268257333661-Creating-new-API-key-on-Deribit)

**Scope:** `account:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum | Description                                                                                                                                                                                                                                                                         |
| --------- | -------- | ------ | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| max_scope | true     | string |      | Describes maximal access for tokens generated with given key, possible values: `trade:[read, read_write, none]`, `wallet:[read, read_write, none]`, `account:[read, read_write, none]`, `block_trade:[read, read_write, none]`. If scope is not provided, its value is set as none. |

Please check details described in [Access scope](#access-scope) | | name | false
| string | | Name of key (only letters, numbers and underscores allowed; maximum
length - 16 characters) | | public_key | false | string | | ED25519 or RSA PEM
Encoded public key that should be used to create asymmetric API Key for signing
requests/authentication requests with user's private key.

**📖 Related Support Article:**
[Asymmetric API keys](https://support.deribit.com/hc/en-us/articles/25944616699165-Asymmetric-API-keys)
| | enabled_features | false | array | | List of enabled advanced on-key
features. Available options:  
\- `restricted_block_trades`: Limit the block_trade read the scope of the API
key to block trades that have been made using this specific API key  
\- `block_trade_approval`: Block trades created using this API key require
additional user approval. Methods that use `block_rfq` scope are not affected by
Block Trade approval feature  
 |

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
