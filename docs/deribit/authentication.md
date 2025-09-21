# Deribit Authentication Documentation

# Authentication

## /public/auth

Retrieve an Oauth access token, to be used for authentication of 'private'
requests.

Three methods of authentication are supported:

- `client_credentials` - using the client id and client secret that can be found
  on the API page on the website
- `client_signature` - using the client id that can be found on the API page on
  the website and user generated signature. The signature is calculated using
  some fields provided in the request, using formula described here
  [Deribit signature credentials](#additional-authorization-method-signature-credentials-websocket-api)
- `refresh_token` - using a refresh token that was received from an earlier
  invocation

The response will contain an access token, expiration period (number of seconds
that the token is valid) and a refresh token that can be used to get a new set
of tokens.

**📖 Related Support Article:**
[API Authentication Guide](https://support.deribit.com/hc/en-us/articles/29748629634205-API-Authentication-Guide)

### Parameters

| Parameter     | Required | Type    | Enum                                                                                           | Description                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------- | -------- | ------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| grant_type    | true     | string  | <code>client_credentials</code><br><code>client_signature</code><br><code>refresh_token</code> | Method of authentication                                                                                                                                                                                                                                                                                                                                                                     |
| client_id     | true     | string  |                                                                                                | Required for grant type <code>client_credentials</code> and <code>client_signature</code>                                                                                                                                                                                                                                                                                                    |
| client_secret | true     | string  |                                                                                                | Required for grant type <code>client_credentials</code>                                                                                                                                                                                                                                                                                                                                      |
| refresh_token | true     | string  |                                                                                                | Required for grant type <code>refresh_token</code>                                                                                                                                                                                                                                                                                                                                           |
| timestamp     | true     | integer |                                                                                                | Required for grant type <code>client_signature</code>, provides time when request has been generated (milliseconds since the UNIX epoch)                                                                                                                                                                                                                                                     |
| signature     | true     | string  |                                                                                                | Required for grant type <code>client_signature</code>; it's a cryptographic signature calculated over provided fields using user <strong>secret key</strong>. The signature should be calculated as an HMAC (Hash-based Message Authentication Code) with <code>SHA256</code> hash algorithm                                                                                                 |
| nonce         | false    | string  |                                                                                                | Optional for grant type <code>client_signature</code>; delivers user generated initialization vector for the server token                                                                                                                                                                                                                                                                    |
| data          | false    | string  |                                                                                                | Optional for grant type <code>client_signature</code>; contains any user specific value                                                                                                                                                                                                                                                                                                      |
| state         | false    | string  |                                                                                                | Will be passed back in the response                                                                                                                                                                                                                                                                                                                                                          |
| scope         | false    | string  |                                                                                                | Describes type of the access for assigned token, possible values: <code>connection</code>, <code>session:name</code>, <code>trade:[read, read_write, none]</code>, <code>wallet:[read, read_write, none]</code>, <code>account:[read, read_write, none]</code>, <code>expires:NUMBER</code>, <code>ip:ADDR</code>.<br><br>Details are elucidated in <a href="#access-scope">Access scope</a> |

### Response

| Name                                          | Type            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id                                            | integer         | The id that was sent in the request                                                                                                                                                                                                                                                                                                                                                                                                              |
| jsonrpc                                       | string          | The JSON-RPC version (2.0)                                                                                                                                                                                                                                                                                                                                                                                                                       |
| result                                        | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;access_token         | string          |
| &nbsp;&nbsp;›&nbsp;&nbsp;enabled_features     | array of string | List of enabled advanced on-key features. Available options:<br>- <code>restricted_block_trades</code>: Limit the block_trade read the scope of the API key to block trades that have been made using this specific API key<br>- <code>block_trade_approval</code>: Block trades created using this API key require additional user approval. Methods that use <code>block_rfq</code> scope are not affected by Block Trade approval feature<br> |
| &nbsp;&nbsp;›&nbsp;&nbsp;expires_in           | integer         | Token lifetime in seconds                                                                                                                                                                                                                                                                                                                                                                                                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;google_login         | boolean         | The access token was acquired by logging in through Google.                                                                                                                                                                                                                                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;mandatory_tfa_status | string          | 2FA is required for privileged methods                                                                                                                                                                                                                                                                                                                                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;refresh_token        | string          | Can be used to request a new token (with a new lifetime)                                                                                                                                                                                                                                                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;scope                | string          | Type of the access for assigned token                                                                                                                                                                                                                                                                                                                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;sid                  | string          | Optional Session id                                                                                                                                                                                                                                                                                                                                                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;state                | string          | Copied from the input (if applicable)                                                                                                                                                                                                                                                                                                                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;token_type           | string          | Authorization type, allowed value - <code>bearer</code>                                                                                                                                                                                                                                                                                                                                                                                          |

## /public/exchange_token

Generates a token for a new subject id. This method can be used to switch
between subaccounts.

### Parameters

| Parameter     | Required | Type    | Enum | Description                                                                                                                                                             |
| ------------- | -------- | ------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| refresh_token | true     | string  |      | Refresh token                                                                                                                                                           |
| subject_id    | true     | integer |      | New subject id                                                                                                                                                          |
| scope         | false    | string  |      | Optional scope override for the new session. Cannot exceed caller's permissions. Supports <code>session</code> scope for direct session creation during token exchange. |

### Response

| Name                                   | Type            | Description                                              |
| -------------------------------------- | --------------- | -------------------------------------------------------- |
| id                                     | integer         | The id that was sent in the request                      |
| jsonrpc                                | string          | The JSON-RPC version (2.0)                               |
| result                                 | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;access_token  | string          |
| &nbsp;&nbsp;›&nbsp;&nbsp;expires_in    | integer         | Token lifetime in seconds                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;refresh_token | string          | Can be used to request a new token (with a new lifetime) |
| &nbsp;&nbsp;›&nbsp;&nbsp;scope         | string          | Type of the access for assigned token                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;sid           | string          | Optional Session id                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;token_type    | string          | Authorization type, allowed value - <code>bearer</code>  |

## /public/fork_token

Generates a token for a new named session. This method can be used only with
session scoped tokens.

### Parameters

| Parameter     | Required | Type   | Enum | Description      |
| ------------- | -------- | ------ | ---- | ---------------- |
| refresh_token | true     | string |      | Refresh token    |
| session_name  | true     | string |      | New session name |

### Response

| Name                                   | Type            | Description                                              |
| -------------------------------------- | --------------- | -------------------------------------------------------- |
| id                                     | integer         | The id that was sent in the request                      |
| jsonrpc                                | string          | The JSON-RPC version (2.0)                               |
| result                                 | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;access_token  | string          |
| &nbsp;&nbsp;›&nbsp;&nbsp;expires_in    | integer         | Token lifetime in seconds                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;refresh_token | string          | Can be used to request a new token (with a new lifetime) |
| &nbsp;&nbsp;›&nbsp;&nbsp;scope         | string          | Type of the access for assigned token                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;sid           | string          | Optional Session id                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;token_type    | string          | Authorization type, allowed value - <code>bearer</code>  |

## /private/logout

> _This method is only available via websockets._

> _This method has no response body_

Gracefully close websocket connection, when COD (Cancel On Disconnect) is
enabled orders are not cancelled

This is a private method; it can only be used after authentication.

### Parameters

| Parameter        | Required | Type    | Enum | Description                                                                                                     |
| ---------------- | -------- | ------- | ---- | --------------------------------------------------------------------------------------------------------------- |
| invalidate_token | false    | boolean |      | If value is <code>true</code> all tokens created in current session are invalidated, default: <code>true</code> |

### Response

_This method has no response body_
