# GET /public/auth

Retrieve an Oauth access token, to be used for authentication of 'private' requests.

Three methods of authentication are supported:

-   `client_credentials` - using the client id and client secret that can be found on the API page on the website
-   `client_signature` - using the client id that can be found on the API page on the website and user generated signature. The signature is calculated using some fields provided in the request, using formula described here [Deribit signature credentials](#additional-authorization-method-signature-credentials-websocket-api)
-   `refresh_token` - using a refresh token that was received from an earlier invocation

The response will contain an access token, expiration period (number of seconds that the token is valid) and a refresh token that can be used to get a new set of tokens.

**📖 Related Support Article:** [API Authentication Guide](https://support.deribit.com/hc/en-us/articles/29748629634205-API-Authentication-Guide)

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| grant_type | true | string | client_credentials client_signature refresh_token | Method of authentication |
| client_id | true | string | Required for grant type client_credentials and client_signature |  |
| client_secret | true | string | Required for grant type client_credentials |  |
| refresh_token | true | string | Required for grant type refresh_token |  |
| timestamp | true | integer | Required for grant type client_signature, provides time when request has been generated (milliseconds since the UNIX epoch) |  |
| signature | true | string | Required for grant type client_signature; it's a cryptographic signature calculated over provided fields using user secret key. The signature should be calculated as an HMAC (Hash-based Message Authentication Code) with SHA256 hash algorithm |  |
| nonce | false | string | Optional for grant type client_signature; delivers user generated initialization vector for the server token |  |
| data | false | string | Optional for grant type client_signature; contains any user specific value |  |
| state | false | string | Will be passed back in the response |  |
| scope | false | string | Describes type of the access for assigned token, possible values: connection, session:name, trade:[read, read_write, none], wallet:[read, read_write, none], account:[read, read_write, none], expires:NUMBER, ip:ADDR. Details are elucidated in Access scope |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result object result.access_token string |
| result.enabled_features | array of string | List of enabled advanced on-key features. Available options: - restricted_block_trades: Limit the block_trade read the scope of the API key to block trades that have been made using this specific API key - block_trade_approval: Block trades created using this API key require additional user approval. Methods that use block_rfq scope are not affected by Block Trade approval feature |
| result.expires_in | integer | Token lifetime in seconds |
| result.google_login | boolean | The access token was acquired by logging in through Google. |
| result.mandatory_tfa_status | string | 2FA is required for privileged methods |
| result.refresh_token | string | Can be used to request a new token (with a new lifetime) |
| result.scope | string | Type of the access for assigned token |
| result.sid | string | Optional Session id |
| result.state | string | Copied from the input (if applicable) |
| result.token_type | string | Authorization type, allowed value - bearer |