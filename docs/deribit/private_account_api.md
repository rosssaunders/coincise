# Deribit Private Account API Documentation

# Deribit API v2.1.1

# Overview

Deribit provides three different interfaces to access the API:

- [JSON-RPC over Websocket](#json-rpc)
- [JSON-RPC over HTTP](#json-rpc)
- [FIX](#fix-api) (Financial Information eXchange)

Deribit features a testing environment, `test.deribit.com`, which can be used to
test the API. For this reason all examples in this documentation refer to that
environment. To reach the production environment it should be changed to
`www.deribit.com`. Note that both environments are separate, which means that
they require separate accounts and credentials (API keys) to authenticate using
private methods - test credentials do not work in production environment and
vice versa.

To see the list of your API keys check **Account > API** tab, where you'll also
find a link to API Console (`>_ Api Console`) which allows you to test JSON-RPC
API, both via HTTP and Websocket.

- [Error Codes](#rpc-error-codes) (HTTP and Websocket RPC Error codes)

## Naming

Deribit tradeable assets or instruments use the following system of naming:

| Kind      | Examples                                                      | Template                         | Comments                                                                                                                                                                                                                                                                                                                                     |
| --------- | ------------------------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Future    | <code>BTC-25MAR23</code>, <code>BTC-5AUG23</code>             | <code>BTC-DMMMYY</code>          | <code>BTC</code> is currency, <code>DMMMYY</code> is expiration date, <code>D</code> stands for day of month (1 or 2 digits), <code>MMM</code> - month (3 first letters in English), <code>YY</code> stands for year.                                                                                                                        |
| Perpetual | <code>BTC-PERPETUAL</code>                                    |                                  | Perpetual contract for currency <code>BTC</code>.                                                                                                                                                                                                                                                                                            |
| Option    | <code>BTC-25MAR23-420-C</code>, <code>BTC-5AUG23-580-P</code> | <code>BTC-DMMMYY-STRIKE-K</code> | <code>STRIKE</code> is option strike price in USD. Template <code>K</code> is option kind: <code>C</code> for call options or <code>P</code> for put options.<p><b>In Linear Options <code>d</code> is used as a decimal point for decimal strikes.</b></p><p><b>Example: </b>For <code>XRP_USDC-30JUN23-0d625-C</code> strike is 0.625.</p> |

## Rate Limits

Rate limits are described in
[separate document](https://support.deribit.com/hc/en-us/articles/25944617523357-Rate-Limits).

# JSON-RPC

JSON-RPC is a light-weight remote procedure call (RPC) protocol. The
[JSON-RPC specification](https://www.jsonrpc.org/specification) defines the data
structures that are used for the messages that are exchanged between client and
server, as well as the rules around their processing. JSON-RPC uses JSON
(RFC 4627) as data format.

JSON-RPC is transport agnostic: it does not specify which transport mechanism
must be used. The Deribit API supports both Websocket (preferred) and HTTP (with
limitations: subscriptions are not supported over HTTP).

## Request messages

> An example of a request message:

According to the JSON-RPC specification the requests must be JSON objects with
the following fields.

| Name    | Type              | Description                                                                                                                                                                                     |
| ------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| jsonrpc | string            | The version of the JSON-RPC spec: "2.0"                                                                                                                                                         |
| id      | integer or string | An identifier of the request. If it is included, then the response will contain the same identifier                                                                                             |
| method  | string            | The method to be invoked                                                                                                                                                                        |
| params  | object            | The parameters values for the method. The field names must match with the expected parameter names. The parameters that are expected are described in the documentation for the methods, below. |

The JSON-RPC specification describes two features that are currently not
supported by the API:

- Specification of parameter values by position
- Batch requests

## Response messages

> An example of a response message:

The JSON-RPC API always responds with a JSON object with the following fields.

| Name    | Type         | Description                                                                                                                             |
| ------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| id      | integer      | This is the same id that was sent in the request.                                                                                       |
| result  | any          | If successful, the result of the API call. The format for the result is described with each method.                                     |
| error   | error object | Only present if there was an error invoking the method. The error object is described below.                                            |
| testnet | boolean      | Indicates whether the API in use is actually the test API. <code>false</code> for production server, <code>true</code> for test server. |
| usIn    | integer      | The timestamp when the requests was received (microseconds since the Unix epoch)                                                        |
| usOut   | integer      | The timestamp when the response was sent (microseconds since the Unix epoch)                                                            |
| usDiff  | integer      | The number of microseconds that was spent handling the request                                                                          |

The fields `testnet`, `usIn`, `usOut` and `usDiff` are not part of the JSON-RPC
standard.

In order not to clutter the examples they will generally be omitted from the
example code.

> An example of a response with an error:

In case of an error the response message will contain the error field, with as
value an object with the following with the following fields:

| Name    | Type    | Description                                                 |
| ------- | ------- | ----------------------------------------------------------- |
| code    | integer | A number that indicates the kind of error.                  |
| message | string  | A short description that indicates the kind of error.       |
| data    | any     | Additional data about the error. This field may be omitted. |

## Detailed response for `private/cancel_all*` and `private/cancel_by_label` methods

> An example of a positive execution of cancellation trigger orders in
> ETH-PERPETUAL when one order was cancelled:

When boolean parameter `detailed` with value `true` is added to `cancel_all*` or
`cancel_by_label` methods response format is changed. Instead of the number of
cancelled orders there is a returned list of execution reports objects for every
requested instrument, order type and currency: results of positive or erroneous
execution. It is done this way because internally during processing cancel_all
request there are done separate requests for every currency, order type and
book.

### Positive execution report

It is returned only when there were orders that were cancelled!

Positive execution report is object with fields:

- `currency`
- `type` - `trigger` or `limit`
- `instrument_name`
- `result` - array of orders formatted like in `private/cancel` response

### Erroneous execution report

Erroneous execution report is object with fields:

- `currency`
- `type` - `trigger` or `limit`
- `instrument_name` - it is attached only if the error is related to specific
  instrument
- `error` - error message formatted as usual

> An example of information that cancel of limit orders in ETH failed:

## Security keys

> Request that may require security key authorization

Some methods may require additional authorization using Security Keys (depending
on the user's account configuration). In this case, instead of a normal
response, there is a returned response with field
`security_key_authorization_required` set to `true`. When that happens the
client is required to resend a request with additional parameters:
`authorization_data` and `challenge`.

For example, after client sends request that needs Security Key confirmation,
like `private/list_api_keys` server return (non error) response with field:
`security_key_authorization_required` set to `true`. Other fields are attached
too:

- `security_keys` - a list of security keys that can be used for authentication.
  Fields in Security Key object are:
  - `type` - type of security key: `tfa` for TOTP Two Factor Authentication,
    `u2f` for authentication with Yubikey
  - `name` - name of security key
  - `credential_id` - optional filed for U2F keys only
- `rp_id` - relying party identifier (need to be used with WebAuthn)
- `challenge` - this string needs to be resend, it is valid for 1 minute

> Example of response with request to make Security Key authorization:

### TFA authorization

When the user chooses TFA authorization, he should read the TFA code from his
application, and it should be added to original requests parameters as
`authorization_data`. It is required to add to parameters `challenge` too. Then
request should be repeated with those updated parameters.

> Example of request when TFA code is `602051`:

### U2F authorization

For details of U2F authorization ask our staff.

### Errors:

When there is an error related to the Security Key authorization, a response
with the error `security_key_authorization_error` (code: 13668) is returned. It
will have a `data.reason` field that possible values are:

- `tfa_code_not_matched` - provided TFA code was invalid
- `used_tfa_code` - provided TFA code was already used
- `challenge_timeout` - challenge is invalid
- `tfa_code_is_required` - provided TFA code was empty

When an error occurrs, the request needs to be repeated without
authorization_data to obtain a new challenge.

> Example of erroneous response:

## Notifications

> An example of a notification:

API users can subscribe to certain types of notifications. This means that they
will receive JSON-RPC notification-messages from the server when certain events
occur, such as changes to the index price or changes to the order book for a
certain instrument.

The API methods [public/subscribe](#public-subscribe) and
[private/subscribe](#private-subscribe) are used to set up a subscription. Since
HTTP does not support the sending of messages from server to client, these
methods are only available when using the Websocket transport mechanism.

At the moment of subscription a "channel" must be specified. The channel
determines the type of events that will be received. See
[Subscriptions](#subscriptions) for more details about the channels.

In accordance with the JSON-RPC specification, the format of a notification is
that of a request message without an `id` field. The value of the `method` field
will always be `"subscription"`. The `params` field will always be an object
with 2 members: `channel` and `data`. The value of the `channel` member is the
name of the channel (a string). The value of the `data` member is an object that
contains data that is specific for the channel.

## Authentication

> An example of a JSON request with token:

The API consists of `public` and `private` methods. The public methods do not
require authentication. The private methods use OAuth 2.0 authentication. This
means that a valid OAuth access token must be included in the request, which can
be achieved by calling method [public/auth](#public-auth).

When the token was assigned to the user, it should be passed along, with other
request parameters, back to the server:

| Connection type              | Access token placement                                                         |
| ---------------------------- | ------------------------------------------------------------------------------ |
| <strong>Websocket</strong>   | Inside request JSON parameters, as an <code>access_token</code> field          |
| <strong>HTTP (REST)</strong> | Header <code>Authorization: bearer</code><code>Token</code><code></code> value |

### Additional authorization method - basic user credentials

Every `private` method could be accessed by providing, inside HTTP
`Authorization: Basic XXX` header, values with user `ClientId` and assigned
`ClientSecret` (both values can be found on the API page on the Deribit website)
encoded with `Base64`:

``Authorization: Basic BASE64(`ClientId` + `:` + `ClientSecret`)``

This is the easiest way of authenticating HTTP (REST) requests. If you don't
like the fact that you are sending ClientSecret over HTTPS connection, you can
consider using one of the authorization methods described below.

### Additional authorization method - Deribit signature credentials

The Derbit service provides a dedicated authorization method, which harnesses
user generated signature to increase security level for passing request data.
Generated value is passed inside `Authorization` header, coded as:

`` Authorization: deri-hmac-sha256 id=`ClientId`,ts=`Timestamp`,sig=`Signature`,nonce=`Nonce` ``

where:

| Deribit credential | Description                                                                                                                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <em>ClientId</em>  | Can be found on the API page on the Deribit website (the user can configure up to 8 different <code>IDs</code> - with different privileges)                                                                    |
| <em>Timestamp</em> | Time when the request was generated - given as <strong>milliseconds</strong>. It's valid for <strong>60 seconds</strong> since generation, after that time any request with an old timestamp will be rejected. |
| <em>Signature</em> | Value for signature calculated as described below                                                                                                                                                              |
| <em>Nonce</em>     | Single usage, user generated initialization vector for the server token                                                                                                                                        |

The signature is generated by the following formula:

`RequestData = UPPERCASE(HTTP_METHOD()) + "\n" + URI() + "\n" + RequestBody + "\n";`  
`StringToSign = Timestamp + "\n" + Nonce + "\n" + RequestData;`  
`Signature = HEX_STRING( HMAC-SHA256( ClientSecret, StringToSign ) );`

Note the _newline_ characters in `RequestData` and `StringToSign` variables. If
`RequestBody` is omitted in `RequestData`, it's treated as an empty string, so
these three newline characters **must** always be present.

Example using shell with `openssl` tool:

    `ClientId=AMANDA`  
    `ClientSecret=AMANDASECRECT`  
    `Timestamp=$( date +%s000 )`  
    `Nonce=$( cat /dev/urandom | tr -dc 'a-z0-9' | head -c8 )`  
    `URI="/api/v2/private/get_account_summary?currency=BTC"`  
    `HttpMethod=GET`  
    `Body=""`

    `Signature=$( echo -ne "${Timestamp}\n${Nonce}\n${HttpMethod}\n${URI}\n${Body}\n" | openssl sha256 -r -hmac "$ClientSecret" | cut -f1 -d' ' )`

    `echo $Signature`

    `shell output> 9bfbc51a2bc372d72cc396cf1a213dc78d42eb74cb7dc272351833ad0de276ab (**WARNING**: Exact value depends on current timestamp and client credentials)`

    `curl -s -X ${HttpMethod} -H "Authorization: deri-hmac-sha256 id=${ClientId},ts=${Timestamp},nonce=${Nonce},sig=${Signature}" "https://www.deribit.com${URI}"`

### Additional authorization method - signature credentials (WebSocket API)

> Example of authorization using `client_signature`:

When connecting through Websocket, user can request for authorization using
`client_signature` method, which requires providing following parameters (as a
part of JSON request):

| JSON parameter      | Description                                                                                                                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <em>grant_type</em> | Must be <strong>client_signature</strong>                                                                                                                                                                      |
| <em>client_id</em>  | Can be found on the API page on the Deribit website (the user can configure up to 8 different <code>IDs</code> - with different privileges)                                                                    |
| <em>timestamp</em>  | Time when the request was generated - given as <strong>milliseconds</strong>. It's valid for <strong>60 seconds</strong> since generation, after that time any request with an old timestamp will be rejected. |
| <em>signature</em>  | Value for signature calculated as described below                                                                                                                                                              |
| <em>nonce</em>      | Single usage, user generated initialization vector for the server token                                                                                                                                        |
| <em>data</em>       | <strong>Optional</strong> field, which contains any user specific value                                                                                                                                        |

The signature is generated by the following formula:

`StringToSign = Timestamp + "\n" + Nonce + "\n" + Data;`  
`Signature = HEX_STRING( HMAC-SHA256( ClientSecret, StringToSign ) );`

Note the _newline_ characters separating parts of the `StringToSign` variable.
If `Data` is omitted, it's treated as an empty string, so these two newline
characters **must** always be present.

Example using shell with `openssl` tool:

    `ClientId=AMANDA`  
    `ClientSecret=AMANDASECRECT`  
    `Timestamp=$( date +%s000 ) # e.g. 1576074319000`  
    `Nonce=$( cat /dev/urandom | tr -dc 'a-z0-9' | head -c8 ) # e.g. 1iqt2wls`  
    `Data=""`

    `Signature=$( echo -ne "${Timestamp}\n${Nonce}\n${Data}" | openssl sha256 -r -hmac "$ClientSecret" | cut -f1 -d' ' )`

    `echo $Signature`

    `shell output> 56590594f97921b09b18f166befe0d1319b198bbcdad7ca73382de2f88fe9aa1 (**WARNING**: Exact value depends on current timestamp and client credentials)`

You can also check the signature value using some online tools like, e.g:
[https://codebeautify.org/hmac-generator](https://codebeautify.org/hmac-generator)
(remember that you **should use** it only with your **test credentials**).

Here's a sample JSON request created using the values from the example above:

`{     "jsonrpc" : "2.0",     "id" : 9929,     "method" : "public/auth",     "params" :     {       "grant_type" : "client_signature",       "client_id" : "AMANDA",       "timestamp": 1576074319000,       "nonce": "1iqt2wls",       "data": "",       "signature" : "56590594f97921b09b18f166befe0d1319b198bbcdad7ca73382de2f88fe9aa1"     }   }`

## Access scope

When asking for `access token`, the user can provide the required access level
(called `scope`) which defines what type of functionality he/she wants to use,
and whether requests are only going to check for some data or also to update
them. Scopes are required and checked for `private` methods, so if you plan to
use only `public` information you can stay with values assigned by default.

| Scope                                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <em>mainaccount</em>                                             | It is set <strong>automatically</strong> by the server when the currently connecting user (his/her credentials) is the main user, otherwise it's not included in the final scope.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| <em>connection</em>                                              | Access with requested parameters is granted when connection is open (or till expiration time). When the connection is closed, user need to repeat the authentication request to get new tokens. It is set and used automatically by the server when neither <strong>connection</strong> nor <strong>session</strong> scope is provided within the request.                                                                                                                                                                                                                                                              |
| <em>session:name</em>                                            | The server creates a new session with the <em>name</em> provided by the user, then generates tokens and binds them with the session. Access is granted during session lifetime. It allows users to reconnect to the server and reuse assigned tokens (before their expiration time). Note that only 16 sessions are allowed per user - when the limit is reached, the session with the shortest lifetime is removed.<br>When using <strong>WebSocket</strong> it also allows (due to the fact that tokens are bound to the created session) skipping providing <code>access_token</code> with every subsequent request. |
| <em>account:read</em>                                            | Access to <strong>account</strong> methods - read only data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| <em>account:read_write</em>                                      | Access to <strong>account</strong> methods - allows to manage account settings, add subaccounts, etc.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| <em>trade:read</em>                                              | Access to <strong>trade</strong> methods - read only data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| <em>trade:read_write</em>                                        | Access to <strong>trade</strong> methods - required to create and modify orders.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| <em>wallet:read</em>                                             | Access to <strong>wallet</strong> methods - read only data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| <em>wallet:read_write</em>                                       | Access to <strong>wallet</strong> methods - allows to withdraw, generate new deposit address, etc.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| <em>wallet:none</em>, <em>account:none</em>, <em>trade:none</em> | Blocked access to specified functionality.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| <em>expires:NUMBER</em>                                          | <strong>Access token</strong> will expire after <code>NUMBER</code> of seconds.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| <em>ip:ADDR</em>                                                 | Token will work with connection from <code>ADDR</code> IPv4 address, when <code>\*</code> is provided as an <code>ADDR</code> token will work from all IP addresses.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| <em>block_trade:read</em>                                        | Access to <strong>block_trade</strong> methods - reading info about block trades - read only data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| <em>block_trade:read_write</em>                                  | Access to <strong>block_trade</strong> methods - required to create block trades.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| <em>block_rfq:read</em>                                          | Access to <strong>block_rfq</strong> methods - reading info about Block RFQs, quotes and available makers - read only data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| <em>block_rfq:read_write</em>                                    | Access to <strong>block_rfq</strong> methods - required to create and quote Block RFQs.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

**NOTICE:** Depending on choosing an authentication method (`grant type`) some
scopes could be narrowed by the server or limited by user API key configured
scope, e.g. when `grant_type = client_credentials` and
`scope = wallet:read_write` could be modified by the server as
`scope = wallet:read`.

**The user shouldn't assume that requested values are blindly accepted and
should verify assigned scopes.**

## Creating/editing/removing API Keys

Creating, editing and removing API Keys is available only with access tokens
with scope `account:read_write`. Additionally when the methods of the API Key
management are called with access token with scope set than server ensures that
we do allow to create/remove/manage (or show client secrets in case of
`private/list_api_keys`) the keys up to the same level of the scopes as calling
set from access token. If not error `scope_exceeded` (code: 13403) is returned.

## JSON-RPC over websocket

Websocket is the preferred transport mechanism for the JSON-RPC API, because it
is faster and because it can support [subscriptions](#subscriptions) and
[cancel on disconnect](#private-enable_cancel_on_disconnect). The code examples
that can be found next to each of the methods show how websockets can be used
from Python or Javascript/node.js.

## JSON-RPC over HTTP

Besides websockets it is also possible to use the API via HTTP. The code
examples for 'shell' show how this can be done using curl. Note that
subscriptions and cancel on disconnect are not supported via HTTP.

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

# Session management

## /public/set_heartbeat

> _This method is only available via websockets._

Signals the Websocket connection to send and request heartbeats. Heartbeats can
be used to detect stale connections. When heartbeats have been set up, the API
server will send `heartbeat` messages and `test_request` messages. Your software
should respond to `test_request` messages by sending a `/api/v2/public/test`
request. If your software fails to do so, the API server will immediately close
the connection. If your account is configured to cancel on disconnect, any
orders opened over the connection will be cancelled.

### Parameters

| Parameter | Required | Type   | Enum | Description                                             |
| --------- | -------- | ------ | ---- | ------------------------------------------------------- |
| interval  | true     | number |      | The heartbeat interval in seconds, but not less than 10 |

### Response

| Name    | Type    | Description                                                    |
| ------- | ------- | -------------------------------------------------------------- |
| id      | integer | The id that was sent in the request                            |
| jsonrpc | string  | The JSON-RPC version (2.0)                                     |
| result  | string  | Result of method execution. <code>ok</code> in case of success |

## /public/disable_heartbeat

> _This method is only available via websockets._

Stop sending heartbeat messages.

### Parameters

_This method takes no parameters_

### Response

| Name    | Type    | Description                                                    |
| ------- | ------- | -------------------------------------------------------------- |
| id      | integer | The id that was sent in the request                            |
| jsonrpc | string  | The JSON-RPC version (2.0)                                     |
| result  | string  | Result of method execution. <code>ok</code> in case of success |

## /private/enable_cancel_on_disconnect

Enable Cancel On Disconnect for the connection. After enabling Cancel On
Disconnect all orders created by the connection will be removed when the
connection is closed.

**NOTICE** It does not affect orders created by other connections - they will
remain active !

When change is applied for the account, then every newly opened connection will
start with **active** Cancel on Disconnect.

**Scope:** `account:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                            | Description                                                                                                                                                                                                                                                 |
| --------- | -------- | ------ | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scope     | false    | string | <code>connection</code><br><code>account</code> | Specifies if Cancel On Disconnect change should be applied/checked for the current connection or the account (default - <code>connection</code>)<br><br><strong>NOTICE:</strong> Scope <code>connection</code> can be used only when working via Websocket. |

### Response

| Name    | Type    | Description                                                    |
| ------- | ------- | -------------------------------------------------------------- |
| id      | integer | The id that was sent in the request                            |
| jsonrpc | string  | The JSON-RPC version (2.0)                                     |
| result  | string  | Result of method execution. <code>ok</code> in case of success |

## /private/disable_cancel_on_disconnect

Disable Cancel On Disconnect for the connection.

When change is applied for the account, then every newly opened connection will
start with **inactive** Cancel on Disconnect.

**Scope:** `account:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                            | Description                                                                                                                                                                                                                                                 |
| --------- | -------- | ------ | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scope     | false    | string | <code>connection</code><br><code>account</code> | Specifies if Cancel On Disconnect change should be applied/checked for the current connection or the account (default - <code>connection</code>)<br><br><strong>NOTICE:</strong> Scope <code>connection</code> can be used only when working via Websocket. |

### Response

| Name    | Type    | Description                                                    |
| ------- | ------- | -------------------------------------------------------------- |
| id      | integer | The id that was sent in the request                            |
| jsonrpc | string  | The JSON-RPC version (2.0)                                     |
| result  | string  | Result of method execution. <code>ok</code> in case of success |

## /private/get_cancel_on_disconnect

Read current Cancel On Disconnect configuration for the account.

**Scope:** `account:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                            | Description                                                                                                                                                                                                                                                 |
| --------- | -------- | ------ | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scope     | false    | string | <code>connection</code><br><code>account</code> | Specifies if Cancel On Disconnect change should be applied/checked for the current connection or the account (default - <code>connection</code>)<br><br><strong>NOTICE:</strong> Scope <code>connection</code> can be used only when working via Websocket. |

### Response

| Name                             | Type            | Description                                                                           |
| -------------------------------- | --------------- | ------------------------------------------------------------------------------------- |
| id                               | integer         | The id that was sent in the request                                                   |
| jsonrpc                          | string          | The JSON-RPC version (2.0)                                                            |
| result                           | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;enabled | boolean         | Current configuration status                                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;scope   | string          | Informs if Cancel on Disconnect was checked for the current connection or the account |

# Wallet

## /private/add_to_address_book

Adds new entry to address book of given type

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter                | Required | Type    | Enum                                                                                                                                                                                                                                                                                            | Description                                                                                                        |
| ------------------------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| currency                 | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>STETH</code><br><code>ETHW</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code><br><code>MATIC</code><br><code>SOL</code><br><code>XRP</code><br><code>USYC</code><br><code>PAXG</code><br><code>BNB</code><br><code>USDE</code> | The currency symbol                                                                                                |
| type                     | true     | string  | <code>transfer</code><br><code>withdrawal</code><br><code>deposit_source</code>                                                                                                                                                                                                                 | Address book type                                                                                                  |
| address                  | true     | string  |                                                                                                                                                                                                                                                                                                 | Address in currency format                                                                                         |
| label                    | true     | string  |                                                                                                                                                                                                                                                                                                 | Label of the address book entry                                                                                    |
| beneficiary_vasp_name    | true     | string  |                                                                                                                                                                                                                                                                                                 | Name of beneficiary VASP                                                                                           |
| beneficiary_vasp_did     | true     | string  |                                                                                                                                                                                                                                                                                                 | DID of beneficiary VASP                                                                                            |
| beneficiary_first_name   | false    | string  |                                                                                                                                                                                                                                                                                                 | First name of beneficiary (if beneficiary is a person)                                                             |
| beneficiary_last_name    | false    | string  |                                                                                                                                                                                                                                                                                                 | First name of beneficiary (if beneficiary is a person)                                                             |
| beneficiary_company_name | false    | string  |                                                                                                                                                                                                                                                                                                 | Beneficiary company name (if beneficiary is a company)                                                             |
| beneficiary_address      | true     | string  |                                                                                                                                                                                                                                                                                                 |
| agreed                   | true     | boolean |                                                                                                                                                                                                                                                                                                 | Indicates that the user agreed to shared provided information with 3rd parties                                     |
| personal                 | true     | boolean |                                                                                                                                                                                                                                                                                                 | The user confirms that he provided address belongs to him and he has access to it via an un-hosted wallet software |

### Response

| Name                                                  | Type            | Description                                                                                                                  |
| ----------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| id                                                    | integer         | The id that was sent in the request                                                                                          |
| jsonrpc                                               | string          | The JSON-RPC version (2.0)                                                                                                   |
| result                                                | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;address                      | string          | Address in proper format for currency                                                                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;agreed                       | boolean         | Indicates that the user agreed to shared provided information with 3rd parties                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_address          | string          | Geographical address of the beneficiary                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_company_name     | string          |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_first_name       | string          | First name of the beneficiary (if beneficiary is a person)                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_last_name        | string          | Last name of the beneficiary (if beneficiary is a person)                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_vasp_did         | string          | DID of beneficiary VASP                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_vasp_name        | string          | Name of beneficiary VASP                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp           | integer         | The timestamp (milliseconds since the Unix epoch)                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency                     | string          | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;info_required                | boolean         | Signalises that addition information regarding the beneficiary of the address is required                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;label                        | string          | Label of the address book entry                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;personal                     | boolean         | The user confirms that he provided address belongs to him and he has access to it via an un-hosted wallet software           |
| &nbsp;&nbsp;›&nbsp;&nbsp;requires_confirmation        | boolean         | If address requires email confirmation for withdrawals                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;requires_confirmation_change | boolean         | If email confirmation change is in progress                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;status                       | string          | Wallet address status, values: [<code>admin_locked</code>, <code>waiting</code>, <code>confirmed</code>, <code>ready</code>] |
| &nbsp;&nbsp;›&nbsp;&nbsp;type                         | string          | Address book type                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;waiting_timestamp            | boolean         | Timestamp when the address will be ready                                                                                     |

## /private/cancel_transfer_by_id

Cancel transfer

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type    | Enum                                                                                                | Description         |
| --------- | -------- | ------- | --------------------------------------------------------------------------------------------------- | ------------------- |
| currency  | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol |
| id        | true     | integer |                                                                                                     | Id of transfer      |

### Response

| Name                                       | Type            | Description                                                                                                                                                                                                                       |
| ------------------------------------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                         | integer         | The id that was sent in the request                                                                                                                                                                                               |
| jsonrpc                                    | string          | The JSON-RPC version (2.0)                                                                                                                                                                                                        |
| result                                     | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;amount            | number          | Amount of funds in given currency                                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;created_timestamp | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency          | string          | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;direction         | string          | Transfer direction                                                                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;id                | integer         | Id of transfer                                                                                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;other_side        | string          | For transfer from/to subaccount returns this subaccount name, for transfer to other account returns address, for transfer from other account returns that accounts username.                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;state             | string          | Transfer state, allowed values : <code>prepared</code>, <code>confirmed</code>, <code>cancelled</code>, <code>waiting_for_admin</code>, <code>insufficient_funds</code>, <code>withdrawal_limit</code> otherwise rejection reason |
| &nbsp;&nbsp;›&nbsp;&nbsp;type              | string          | Type of transfer: <code>user</code> - sent to user, <code>subaccount</code> - sent to subaccount                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;updated_timestamp | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                 |

## /private/cancel_withdrawal

Cancels withdrawal request

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                                                                                | Description         |
| --------- | -------- | ------ | --------------------------------------------------------------------------------------------------- | ------------------- |
| currency  | true     | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol |
| id        | true     | number |                                                                                                     | The withdrawal id   |

### Response

| Name                                         | Type            | Description                                                                                                                                                                          |
| -------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id                                           | integer         | The id that was sent in the request                                                                                                                                                  |
| jsonrpc                                      | string          | The JSON-RPC version (2.0)                                                                                                                                                           |
| result                                       | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;address             | string          | Address in proper format for currency                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;amount              | number          | Amount of funds in given currency                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;confirmed_timestamp | integer         | The timestamp (milliseconds since the Unix epoch) of withdrawal confirmation, <code>null</code> when not confirmed                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;created_timestamp   | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency            | string          | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;fee                 | number          | Fee in currency                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;id                  | integer         | Withdrawal id in Deribit system                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;priority            | number          | Id of priority level                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;state               | string          | Withdrawal state, allowed values : <code>unconfirmed</code>, <code>confirmed</code>, <code>cancelled</code>, <code>completed</code>, <code>interrupted</code>, <code>rejected</code> |
| &nbsp;&nbsp;›&nbsp;&nbsp;transaction_id      | string          | Transaction id in proper format for currency, <code>null</code> if id is not available                                                                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;updated_timestamp   | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                    |

## /private/create_deposit_address

Creates deposit address in currency

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                                                                                | Description         |
| --------- | -------- | ------ | --------------------------------------------------------------------------------------------------- | ------------------- |
| currency  | true     | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol |

### Response

| Name                                        | Type            | Description                                                                                                 |
| ------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------- |
| id                                          | integer         | The id that was sent in the request                                                                         |
| jsonrpc                                     | string          | The JSON-RPC version (2.0)                                                                                  |
| result                                      | <em>object</em> | Object if address is created, null otherwise                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;address            | string          | Address in proper format for currency                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp | integer         | The timestamp (milliseconds since the Unix epoch)                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency           | string          | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;type               | string          | Address type/purpose, allowed values : <code>deposit</code>, <code>withdrawal</code>, <code>transfer</code> |

## /private/get_address_book

Retrieves address book of given type

**Scope:** `wallet:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                                                                                                                                                                                                                                                                            | Description         |
| --------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| currency  | true     | string | <code>BTC</code><br><code>ETH</code><br><code>STETH</code><br><code>ETHW</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code><br><code>MATIC</code><br><code>SOL</code><br><code>XRP</code><br><code>USYC</code><br><code>PAXG</code><br><code>BNB</code><br><code>USDE</code> | The currency symbol |
| type      | true     | string | <code>transfer</code><br><code>withdrawal</code><br><code>deposit_source</code>                                                                                                                                                                                                                 | Address book type   |

### Response

| Name                                                  | Type                     | Description                                                                                                                  |
| ----------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| id                                                    | integer                  | The id that was sent in the request                                                                                          |
| jsonrpc                                               | string                   | The JSON-RPC version (2.0)                                                                                                   |
| result                                                | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;address                      | string                   | Address in proper format for currency                                                                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;agreed                       | boolean                  | Indicates that the user agreed to shared provided information with 3rd parties                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_address          | string                   | Geographical address of the beneficiary                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_company_name     | string                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_first_name       | string                   | First name of the beneficiary (if beneficiary is a person)                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_last_name        | string                   | Last name of the beneficiary (if beneficiary is a person)                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_vasp_did         | string                   | DID of beneficiary VASP                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_vasp_name        | string                   | Name of beneficiary VASP                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp           | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency                     | string                   | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;info_required                | boolean                  | Signalises that addition information regarding the beneficiary of the address is required                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;label                        | string                   | Label of the address book entry                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;personal                     | boolean                  | The user confirms that he provided address belongs to him and he has access to it via an un-hosted wallet software           |
| &nbsp;&nbsp;›&nbsp;&nbsp;requires_confirmation        | boolean                  | If address requires email confirmation for withdrawals                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;requires_confirmation_change | boolean                  | If email confirmation change is in progress                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;status                       | string                   | Wallet address status, values: [<code>admin_locked</code>, <code>waiting</code>, <code>confirmed</code>, <code>ready</code>] |
| &nbsp;&nbsp;›&nbsp;&nbsp;type                         | string                   | Address book type                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;waiting_timestamp            | boolean                  | Timestamp when the address will be ready                                                                                     |

## /private/get_current_deposit_address

Retrieve deposit address for currency

**Scope:** `wallet:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                                                                                | Description         |
| --------- | -------- | ------ | --------------------------------------------------------------------------------------------------- | ------------------- |
| currency  | true     | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol |

### Response

| Name                                        | Type            | Description                                                                                                 |
| ------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------- |
| id                                          | integer         | The id that was sent in the request                                                                         |
| jsonrpc                                     | string          | The JSON-RPC version (2.0)                                                                                  |
| result                                      | <em>object</em> | Object if address is created, null otherwise                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;address            | string          | Address in proper format for currency                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp | integer         | The timestamp (milliseconds since the Unix epoch)                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency           | string          | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;type               | string          | Address type/purpose, allowed values : <code>deposit</code>, <code>withdrawal</code>, <code>transfer</code> |

## /private/get_deposits

Retrieve the latest users deposits

**Scope:** `wallet:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type    | Enum                                                                                                | Description                                          |
| --------- | -------- | ------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| currency  | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol                                  |
| count     | false    | integer |                                                                                                     | Number of requested items, default - <code>10</code> |
| offset    | false    | integer |                                                                                                     | The offset for pagination, default - <code>0</code>  |

### Response

| Name                                                                    | Type                     | Description                                                                                                                                                                                                                                               |
| ----------------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                                      | integer                  | The id that was sent in the request                                                                                                                                                                                                                       |
| jsonrpc                                                                 | string                   | The JSON-RPC version (2.0)                                                                                                                                                                                                                                |
| result                                                                  | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;count                                          | integer                  | Total number of results available                                                                                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;data                                           | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;address               | string                   | Address in proper format for currency                                                                                                                                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount                | number                   | Amount of funds in given currency                                                                                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;clearance_state       | string                   | Clearance state, allowed values : <code>in_progress</code>, <code>pending_admin_decision</code>, <code>pending_user_input</code>, <code>success</code>, <code>failed</code>, <code>cancelled</code>, <code>refund_initiated</code>, <code>refunded</code> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;currency              | string                   | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;note                  | string                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;received_timestamp    | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;refund_transaction_id | string                   | Transaction id in proper format for currency, <code>null</code> if id is not available                                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;source_address        | string                   | Address in proper format for currency                                                                                                                                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;state                 | string                   | Deposit state, allowed values : <code>pending</code>, <code>completed</code>, <code>rejected</code>, <code>replaced</code>                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;transaction_id        | string                   | Transaction id in proper format for currency, <code>null</code> if id is not available                                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;updated_timestamp     | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                                         |

## /private/get_transfers

Retrieve the user's transfers list

**Scope:** `wallet:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type    | Enum                                                                                                | Description                                          |
| --------- | -------- | ------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| currency  | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol                                  |
| count     | false    | integer |                                                                                                     | Number of requested items, default - <code>10</code> |
| offset    | false    | integer |                                                                                                     | The offset for pagination, default - <code>0</code>  |

### Response

| Name                                                                | Type                     | Description                                                                                                                                                                                                                       |
| ------------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                                  | integer                  | The id that was sent in the request                                                                                                                                                                                               |
| jsonrpc                                                             | string                   | The JSON-RPC version (2.0)                                                                                                                                                                                                        |
| result                                                              | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;count                                      | integer                  | Total number of results available                                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;data                                       | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount            | number                   | Amount of funds in given currency                                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;created_timestamp | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;currency          | string                   | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction         | string                   | Transfer direction                                                                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;id                | integer                  | Id of transfer                                                                                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;other_side        | string                   | For transfer from/to subaccount returns this subaccount name, for transfer to other account returns address, for transfer from other account returns that accounts username.                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;state             | string                   | Transfer state, allowed values : <code>prepared</code>, <code>confirmed</code>, <code>cancelled</code>, <code>waiting_for_admin</code>, <code>insufficient_funds</code>, <code>withdrawal_limit</code> otherwise rejection reason |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;type              | string                   | Type of transfer: <code>user</code> - sent to user, <code>subaccount</code> - sent to subaccount                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;updated_timestamp | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                 |

## /private/get_withdrawals

Retrieve the latest users withdrawals

**Scope:** `wallet:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type    | Enum                                                                                                | Description                                          |
| --------- | -------- | ------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| currency  | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol                                  |
| count     | false    | integer |                                                                                                     | Number of requested items, default - <code>10</code> |
| offset    | false    | integer |                                                                                                     | The offset for pagination, default - <code>0</code>  |

### Response

| Name                                                                  | Type                     | Description                                                                                                                                                                          |
| --------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id                                                                    | integer                  | The id that was sent in the request                                                                                                                                                  |
| jsonrpc                                                               | string                   | The JSON-RPC version (2.0)                                                                                                                                                           |
| result                                                                | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;count                                        | integer                  | Total number of results available                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;data                                         | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;address             | string                   | Address in proper format for currency                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount              | number                   | Amount of funds in given currency                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;confirmed_timestamp | integer                  | The timestamp (milliseconds since the Unix epoch) of withdrawal confirmation, <code>null</code> when not confirmed                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;created_timestamp   | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;currency            | string                   | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee                 | number                   | Fee in currency                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;id                  | integer                  | Withdrawal id in Deribit system                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;priority            | number                   | Id of priority level                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;state               | string                   | Withdrawal state, allowed values : <code>unconfirmed</code>, <code>confirmed</code>, <code>cancelled</code>, <code>completed</code>, <code>interrupted</code>, <code>rejected</code> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;transaction_id      | string                   | Transaction id in proper format for currency, <code>null</code> if id is not available                                                                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;updated_timestamp   | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                                                    |

## /private/remove_from_address_book

Removes address book entry

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                                                                                                                                                                                                                                                                            | Description                                            |
| --------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| currency  | true     | string | <code>BTC</code><br><code>ETH</code><br><code>STETH</code><br><code>ETHW</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code><br><code>MATIC</code><br><code>SOL</code><br><code>XRP</code><br><code>USYC</code><br><code>PAXG</code><br><code>BNB</code><br><code>USDE</code> | The currency symbol                                    |
| type      | true     | string | <code>transfer</code><br><code>withdrawal</code><br><code>deposit_source</code>                                                                                                                                                                                                                 | Address book type                                      |
| address   | true     | string |                                                                                                                                                                                                                                                                                                 | Address in currency format, it must be in address book |

### Response

| Name    | Type    | Description                         |
| ------- | ------- | ----------------------------------- |
| id      | integer | The id that was sent in the request |
| jsonrpc | string  | The JSON-RPC version (2.0)          |
| result  | string  | ok                                  |

## /private/set_clearance_originator

Sets originator of the deposit

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter                                                      | Required | Type    | Enum                                                                                                | Description                                                        |
| -------------------------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| deposit_id                                                     | true     | object  |                                                                                                     | Id of the deposit                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;currency     | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;user_id      | true     | integer |                                                                                                     | Id of a (sub)account                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;address      | true     | string  |                                                                                                     | Address in currency format                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;tx_hash      | true     | string  |                                                                                                     | Transaction id in a proper format for the currency                 |
| originator                                                     | true     | object  |                                                                                                     | Information about the originator of the deposit                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_personal  | true     | boolean |                                                                                                     | If the user is the originator of the deposit                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;company_name | true     | string  |                                                                                                     | Company name of the originator if the originator is a legal entity |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;first_name   | true     | string  |                                                                                                     | If the user is the originator of the deposit                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;last_name    | true     | string  |                                                                                                     | Last name of the originator if the originator is a person          |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;address      | true     | string  |                                                                                                     | Geographical address of the originator                             |

### Response

| Name                  | Type    | Description                                                                                                                                                                                                                                               |
| --------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address               | string  | Address in proper format for currency                                                                                                                                                                                                                     |
| amount                | number  | Amount of funds in given currency                                                                                                                                                                                                                         |
| clearance_state       | string  | Clearance state, allowed values : <code>in_progress</code>, <code>pending_admin_decision</code>, <code>pending_user_input</code>, <code>success</code>, <code>failed</code>, <code>cancelled</code>, <code>refund_initiated</code>, <code>refunded</code> |
| currency              | string  | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                                                                                                                                                 |
| note                  | string  |
| received_timestamp    | integer | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                                         |
| refund_transaction_id | string  | Transaction id in proper format for currency, <code>null</code> if id is not available                                                                                                                                                                    |
| source_address        | string  | Address in proper format for currency                                                                                                                                                                                                                     |
| state                 | string  | Deposit state, allowed values : <code>pending</code>, <code>completed</code>, <code>rejected</code>, <code>replaced</code>                                                                                                                                |
| transaction_id        | string  | Transaction id in proper format for currency, <code>null</code> if id is not available                                                                                                                                                                    |
| updated_timestamp     | integer | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                                         |

## /private/submit_transfer_between_subaccounts

Transfer funds between two (sub)accounts.

**Scope:** `wallets:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter   | Required | Type    | Enum                                                                                                | Description                                                                                                                                                                                                                                                                                                              |
| ----------- | -------- | ------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| currency    | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol                                                                                                                                                                                                                                                                                                      |
| amount      | true     | number  |                                                                                                     | Amount of funds to be transferred                                                                                                                                                                                                                                                                                        |
| destination | true     | integer |                                                                                                     | Id of destination subaccount. Can be found in <code>My Account &gt;&gt; Subaccounts</code> tab                                                                                                                                                                                                                           |
| source      | false    | integer |                                                                                                     | Id of the source (sub)account. Can be found in <code>My Account &gt;&gt; Subaccounts</code> tab. By default, it is the Id of the account which made the request. However, if a different "source" is specified, the user must possess the mainaccount scope, and only other subaccounts can be designated as the source. |

### Response

| Name                                       | Type            | Description                                                                                                                                                                                                                       |
| ------------------------------------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                         | integer         | The id that was sent in the request                                                                                                                                                                                               |
| jsonrpc                                    | string          | The JSON-RPC version (2.0)                                                                                                                                                                                                        |
| result                                     | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;amount            | number          | Amount of funds in given currency                                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;created_timestamp | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency          | string          | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;direction         | string          | Transfer direction                                                                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;id                | integer         | Id of transfer                                                                                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;other_side        | string          | For transfer from/to subaccount returns this subaccount name, for transfer to other account returns address, for transfer from other account returns that accounts username.                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;state             | string          | Transfer state, allowed values : <code>prepared</code>, <code>confirmed</code>, <code>cancelled</code>, <code>waiting_for_admin</code>, <code>insufficient_funds</code>, <code>withdrawal_limit</code> otherwise rejection reason |
| &nbsp;&nbsp;›&nbsp;&nbsp;type              | string          | Type of transfer: <code>user</code> - sent to user, <code>subaccount</code> - sent to subaccount                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;updated_timestamp | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                 |

## /private/submit_transfer_to_subaccount

Transfer funds to subaccount.

**Scope:** `wallets:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter   | Required | Type    | Enum                                                                                                | Description                                                                                    |
| ----------- | -------- | ------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| currency    | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol                                                                            |
| amount      | true     | number  |                                                                                                     | Amount of funds to be transferred                                                              |
| destination | true     | integer |                                                                                                     | Id of destination subaccount. Can be found in <code>My Account &gt;&gt; Subaccounts</code> tab |

### Response

| Name                                       | Type            | Description                                                                                                                                                                                                                       |
| ------------------------------------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                         | integer         | The id that was sent in the request                                                                                                                                                                                               |
| jsonrpc                                    | string          | The JSON-RPC version (2.0)                                                                                                                                                                                                        |
| result                                     | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;amount            | number          | Amount of funds in given currency                                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;created_timestamp | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency          | string          | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;direction         | string          | Transfer direction                                                                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;id                | integer         | Id of transfer                                                                                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;other_side        | string          | For transfer from/to subaccount returns this subaccount name, for transfer to other account returns address, for transfer from other account returns that accounts username.                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;state             | string          | Transfer state, allowed values : <code>prepared</code>, <code>confirmed</code>, <code>cancelled</code>, <code>waiting_for_admin</code>, <code>insufficient_funds</code>, <code>withdrawal_limit</code> otherwise rejection reason |
| &nbsp;&nbsp;›&nbsp;&nbsp;type              | string          | Type of transfer: <code>user</code> - sent to user, <code>subaccount</code> - sent to subaccount                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;updated_timestamp | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                 |

## /private/submit_transfer_to_user

Transfer funds to another user.

**Scope:** `wallet:read_write` and mainaccount

This is a private method; it can only be used after authentication.

### Parameters

| Parameter   | Required | Type   | Enum                                                                                                | Description                                          |
| ----------- | -------- | ------ | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| currency    | true     | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol                                  |
| amount      | true     | number |                                                                                                     | Amount of funds to be transferred                    |
| destination | true     | string |                                                                                                     | Destination wallet's address taken from address book |

### Response

| Name                                       | Type            | Description                                                                                                                                                                                                                       |
| ------------------------------------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                         | integer         | The id that was sent in the request                                                                                                                                                                                               |
| jsonrpc                                    | string          | The JSON-RPC version (2.0)                                                                                                                                                                                                        |
| result                                     | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;amount            | number          | Amount of funds in given currency                                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;created_timestamp | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency          | string          | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;direction         | string          | Transfer direction                                                                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;id                | integer         | Id of transfer                                                                                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;other_side        | string          | For transfer from/to subaccount returns this subaccount name, for transfer to other account returns address, for transfer from other account returns that accounts username.                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;state             | string          | Transfer state, allowed values : <code>prepared</code>, <code>confirmed</code>, <code>cancelled</code>, <code>waiting_for_admin</code>, <code>insufficient_funds</code>, <code>withdrawal_limit</code> otherwise rejection reason |
| &nbsp;&nbsp;›&nbsp;&nbsp;type              | string          | Type of transfer: <code>user</code> - sent to user, <code>subaccount</code> - sent to subaccount                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;updated_timestamp | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                 |

## /private/update_in_address_book

Allows to provide beneficiary information for the address

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter                | Required | Type    | Enum                                                                                                                                                                                                                                                                                            | Description                                                                                                        |
| ------------------------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| currency                 | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>STETH</code><br><code>ETHW</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code><br><code>MATIC</code><br><code>SOL</code><br><code>XRP</code><br><code>USYC</code><br><code>PAXG</code><br><code>BNB</code><br><code>USDE</code> | The currency symbol                                                                                                |
| type                     | true     | string  | <code>transfer</code><br><code>withdrawal</code><br><code>deposit_source</code>                                                                                                                                                                                                                 | Address book type                                                                                                  |
| address                  | true     | string  |                                                                                                                                                                                                                                                                                                 | Address in currency format, it must be in address book                                                             |
| beneficiary_vasp_name    | true     | string  |                                                                                                                                                                                                                                                                                                 | Name of beneficiary VASP                                                                                           |
| beneficiary_vasp_did     | true     | string  |                                                                                                                                                                                                                                                                                                 | DID of beneficiary VASP                                                                                            |
| beneficiary_first_name   | false    | string  |                                                                                                                                                                                                                                                                                                 | First name of beneficiary (if beneficiary is a person)                                                             |
| beneficiary_last_name    | false    | string  |                                                                                                                                                                                                                                                                                                 | First name of beneficiary (if beneficiary is a person)                                                             |
| beneficiary_company_name | false    | string  |                                                                                                                                                                                                                                                                                                 | Beneficiary company name (if beneficiary is a company)                                                             |
| beneficiary_address      | true     | string  |                                                                                                                                                                                                                                                                                                 |
| agreed                   | true     | boolean |                                                                                                                                                                                                                                                                                                 | Indicates that the user agreed to shared provided information with 3rd parties                                     |
| personal                 | true     | boolean |                                                                                                                                                                                                                                                                                                 | The user confirms that he provided address belongs to him and he has access to it via an un-hosted wallet software |
| label                    | true     | string  |                                                                                                                                                                                                                                                                                                 | Label of the address book entry                                                                                    |

### Response

| Name    | Type    | Description                         |
| ------- | ------- | ----------------------------------- |
| id      | integer | The id that was sent in the request |
| jsonrpc | string  | The JSON-RPC version (2.0)          |
| result  | string  | ok                                  |

## /private/withdraw

Creates a new withdrawal request

**Scope:** `wallet:read_write` and mainaccount

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                                                                                                                                             | Description                                                       |
| --------- | -------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| currency  | true     | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code>                                                              | The currency symbol                                               |
| address   | true     | string |                                                                                                                                                                  | Address in currency format, it must be in address book            |
| amount    | true     | number |                                                                                                                                                                  | Amount of funds to be withdrawn                                   |
| priority  | false    | string | <code>insane</code><br><code>extreme_high</code><br><code>very_high</code><br><code>high</code><br><code>mid</code><br><code>low</code><br><code>very_low</code> | Withdrawal priority, optional for BTC, default: <code>high</code> |

### Response

| Name                                         | Type            | Description                                                                                                                                                                          |
| -------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id                                           | integer         | The id that was sent in the request                                                                                                                                                  |
| jsonrpc                                      | string          | The JSON-RPC version (2.0)                                                                                                                                                           |
| result                                       | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;address             | string          | Address in proper format for currency                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;amount              | number          | Amount of funds in given currency                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;confirmed_timestamp | integer         | The timestamp (milliseconds since the Unix epoch) of withdrawal confirmation, <code>null</code> when not confirmed                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;created_timestamp   | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency            | string          | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;fee                 | number          | Fee in currency                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;id                  | integer         | Withdrawal id in Deribit system                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;priority            | number          | Id of priority level                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;state               | string          | Withdrawal state, allowed values : <code>unconfirmed</code>, <code>confirmed</code>, <code>cancelled</code>, <code>completed</code>, <code>interrupted</code>, <code>rejected</code> |
| &nbsp;&nbsp;›&nbsp;&nbsp;transaction_id      | string          | Transaction id in proper format for currency, <code>null</code> if id is not available                                                                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;updated_timestamp   | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                    |

# RPC Error Codes

| Error Code  | Short message                                                           | Description                                                                                                                                                                                                              |
| ----------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0 or absent |                                                                         | Success, No error.                                                                                                                                                                                                       |
| 10000       | <code>"authorization_required"</code>                                   | Authorization issue, invalid or absent signature etc.                                                                                                                                                                    |
| 10001       | <code>"error"</code>                                                    | Some general failure, no public information available.                                                                                                                                                                   |
| 10002       | <code>"qty_too_low"</code>                                              | Order quantity is too low.                                                                                                                                                                                               |
| 10003       | <code>"order_overlap"</code>                                            | Rejection, order overlap is found and self-trading is not enabled.                                                                                                                                                       |
| 10004       | <code>"order_not_found"</code>                                          | Attempt to operate with order that can't be found by specified id or label.                                                                                                                                              |
| 10005       | <code>"price_too_low &lt;Limit&gt;"</code>                              | Price is too low, <code>&lt;Limit&gt;</code> defines current limit for the operation.                                                                                                                                    |
| 10006       | <code>"price_too_low4idx &lt;Limit&gt;"</code>                          | Price is too low for current index, <code>&lt;Limit&gt;</code> defines current bottom limit for the operation.                                                                                                           |
| 10007       | <code>"price_too_high &lt;Limit&gt;"</code>                             | Price is too high, <code>&lt;Limit&gt;</code> defines current up limit for the operation.                                                                                                                                |
| 10009       | <code>"not_enough_funds"</code>                                         | Account has not enough funds for the operation.                                                                                                                                                                          |
| 10010       | <code>"already_closed"</code>                                           | Attempt of doing something with closed order.                                                                                                                                                                            |
| 10011       | <code>"price_not_allowed"</code>                                        | This price is not allowed for some reason.                                                                                                                                                                               |
| 10012       | <code>"book_closed"</code>                                              | Operation for an instrument which order book had been closed.                                                                                                                                                            |
| 10013       | <code>"pme_max_total_open_orders &lt;Limit&gt;"</code>                  | Total limit of open orders has been exceeded, it is applicable for PME users.                                                                                                                                            |
| 10014       | <code>"pme_max_future_open_orders &lt;Limit&gt;"</code>                 | Limit of count of futures' open orders has been exceeded, it is applicable for PME users.                                                                                                                                |
| 10015       | <code>"pme_max_option_open_orders &lt;Limit&gt;"</code>                 | Limit of count of options' open orders has been exceeded, it is applicable for PME users.                                                                                                                                |
| 10016       | <code>"pme_max_future_open_orders_size &lt;Limit&gt;"</code>            | Limit of size for futures has been exceeded, it is applicable for PME users.                                                                                                                                             |
| 10017       | <code>"pme_max_option_open_orders_size &lt;Limit&gt;"</code>            | Limit of size for options has been exceeded, it is applicable for PME users.                                                                                                                                             |
| 10018       | <code>"non_pme_max_future_position_size &lt;Limit&gt;"</code>           | Limit of size for futures has been exceeded, it is applicable for non-PME users.                                                                                                                                         |
| 10019       | <code>"locked_by_admin"</code>                                          | Trading is temporary locked by the admin.                                                                                                                                                                                |
| 10020       | <code>"invalid_or_unsupported_instrument"</code>                        | Instrument name is not valid.                                                                                                                                                                                            |
| 10021       | <code>"invalid_amount"</code>                                           | Amount is not valid.                                                                                                                                                                                                     |
| 10022       | <code>"invalid_quantity"</code>                                         | quantity was not recognized as a valid number (for API v1).                                                                                                                                                              |
| 10023       | <code>"invalid_price"</code>                                            | price was not recognized as a valid number.                                                                                                                                                                              |
| 10024       | <code>"invalid_max_show"</code>                                         | <code>max_show</code> parameter was not recognized as a valid number.                                                                                                                                                    |
| 10025       | <code>"invalid_order_id"</code>                                         | Order id is missing or its format was not recognized as valid.                                                                                                                                                           |
| 10026       | <code>"price_precision_exceeded"</code>                                 | Extra precision of the price is not supported.                                                                                                                                                                           |
| 10027       | <code>"non_integer_contract_amount"</code>                              | Futures contract amount was not recognized as integer.                                                                                                                                                                   |
| 10028       | <code>"too_many_requests"</code>                                        | Allowed request rate has been exceeded.                                                                                                                                                                                  |
| 10029       | <code>"not_owner_of_order"</code>                                       | Attempt to operate with not own order.                                                                                                                                                                                   |
| 10030       | <code>"must_be_websocket_request"</code>                                | REST request where Websocket is expected.                                                                                                                                                                                |
| 10031       | <code>"invalid_args_for_instrument"</code>                              | Some of the arguments are not recognized as valid.                                                                                                                                                                       |
| 10032       | <code>"whole_cost_too_low"</code>                                       | Total cost is too low.                                                                                                                                                                                                   |
| 10033       | <code>"not_implemented"</code>                                          | Method is not implemented yet.                                                                                                                                                                                           |
| 10034       | <code>"trigger_price_too_high"</code>                                   | Trigger price is too high.                                                                                                                                                                                               |
| 10035       | <code>"trigger_price_too_low"</code>                                    | Trigger price is too low.                                                                                                                                                                                                |
| 10036       | <code>"invalid_max_show_amount"</code>                                  | Max Show Amount is not valid.                                                                                                                                                                                            |
| 10037       | <code>"non_pme_total_short_options_positions_size &lt;Limit&gt;"</code> | Limit of total size for short options positions has been exceeded, it is applicable for non-PME users.                                                                                                                   |
| 10038       | <code>"pme_max_risk_reducing_orders &lt;Limit&gt;"</code>               | Limit of open risk reducing orders has been reached, it is applicable for PME users.                                                                                                                                     |
| 10039       | <code>"not_enough_funds_in_currency &lt;Currency&gt;"</code>            | Returned when the user does not have sufficient spot reserves to complete the spot trade or when an option order would negatively impact the non-cross portfolio margin balance of Cross SM user.                        |
| 10040       | <code>"retry"</code>                                                    | Request can't be processed right now and should be retried.                                                                                                                                                              |
| 10041       | <code>"settlement_in_progress"</code>                                   | Settlement is in progress. Every day at settlement time for several seconds, the system calculates user profits and updates balances. That time trading is paused for several seconds till the calculation is completed. |
| 10043       | <code>"price_wrong_tick"</code>                                         | Price has to be rounded to an instrument tick size.                                                                                                                                                                      |
| 10044       | <code>"trigger_price_wrong_tick"</code>                                 | Trigger Price has to be rounded to an instrument tick size.                                                                                                                                                              |
| 10045       | <code>"can_not_cancel_liquidation_order"</code>                         | Liquidation order can't be cancelled.                                                                                                                                                                                    |
| 10046       | <code>"can_not_edit_liquidation_order"</code>                           | Liquidation order can't be edited.                                                                                                                                                                                       |
| 10047       | <code>"matching_engine_queue_full"</code>                               | Reached limit of pending Matching Engine requests for user.                                                                                                                                                              |
| 10048       | <code>"not_on_this_server"</code>                                       | The requested operation is not available on this server.                                                                                                                                                                 |
| 10049       | <code>"cancel_on_disconnect_failed"</code>                              | Enabling Cancel On Disconnect for the connection failed.                                                                                                                                                                 |
| 10066       | <code>"too_many_concurrent_requests"</code>                             | The client has sent too many public requests that have not yet been executed.                                                                                                                                            |
| 10072       | <code>"disabled_while_position_lock"</code>                             | Spot trading is disabled for users in reduce only mode.                                                                                                                                                                  |
| 11008       | <code>"already_filled"</code>                                           | This request is not allowed in regards to the filled order.                                                                                                                                                              |
| 11013       | <code>"max_spot_open_orders"</code>                                     | Total limit of open orders on spot instruments has been exceeded.                                                                                                                                                        |
| 11021       | <code>"post_only_price_modification_not_possible"</code>                | Price modification for post only order is not possible                                                                                                                                                                   |
| 11022       | <code>"max_spot_order_quantity"</code>                                  | Limit of quantity per currency for spot instruments has been exceeded.                                                                                                                                                   |
| 11029       | <code>"invalid_arguments"</code>                                        | Some invalid input has been detected.                                                                                                                                                                                    |
| 11030       | <code>"other_reject &lt;Reason&gt;"</code>                              | Some rejects which are not considered as very often, more info may be specified in <code>&lt;Reason&gt;</code>.                                                                                                          |
| 11031       | <code>"other_error &lt;Error&gt;"</code>                                | Some errors which are not considered as very often, more info may be specified in <code>&lt;Error&gt;</code>.                                                                                                            |
| 11035       | <code>"no_more_triggers &lt;Limit&gt;"</code>                           | Allowed amount of trigger orders has been exceeded.                                                                                                                                                                      |
| 11036       | <code>"invalid_trigger_price"</code>                                    | Invalid trigger price (too high or too low) in relation to the last trade, index or market price.                                                                                                                        |
| 11037       | <code>"outdated_instrument_for_IV_order"</code>                         | Instrument already not available for trading.                                                                                                                                                                            |
| 11038       | <code>"no_adv_for_futures"</code>                                       | Advanced orders are not available for futures.                                                                                                                                                                           |
| 11039       | <code>"no_adv_postonly"</code>                                          | Advanced post-only orders are not supported yet.                                                                                                                                                                         |
| 11041       | <code>"not_adv_order"</code>                                            | Advanced order properties can't be set if the order is not advanced.                                                                                                                                                     |
| 11042       | <code>"permission_denied"</code>                                        | Permission for the operation has been denied.                                                                                                                                                                            |
| 11043       | <code>"bad_argument"</code>                                             | Bad argument has been passed.                                                                                                                                                                                            |
| 11044       | <code>"not_open_order"</code>                                           | Attempt to do open order operations with the not open order.                                                                                                                                                             |
| 11045       | <code>"invalid_event"</code>                                            | Event name has not been recognized.                                                                                                                                                                                      |
| 11046       | <code>"outdated_instrument"</code>                                      | At several minutes to instrument expiration, corresponding advanced implied volatility orders are not allowed.                                                                                                           |
| 11047       | <code>"unsupported_arg_combination"</code>                              | The specified combination of arguments is not supported.                                                                                                                                                                 |
| 11048       | <code>"wrong_max_show_for_option"</code>                                | Wrong Max Show for options.                                                                                                                                                                                              |
| 11049       | <code>"bad_arguments"</code>                                            | Several bad arguments have been passed.                                                                                                                                                                                  |
| 11050       | <code>"bad_request"</code>                                              | Request has not been parsed properly.                                                                                                                                                                                    |
| 11051       | <code>"system_maintenance"</code>                                       | System is under maintenance.                                                                                                                                                                                             |
| 11052       | <code>"subscribe_error_unsubscribed"</code>                             | Subscription error. However, subscription may fail without this error, please check the list of subscribed channels returned, as some channels can be not subscribed due to wrong input or lack of permissions.          |
| 11053       | <code>"transfer_not_found"</code>                                       | Specified transfer is not found.                                                                                                                                                                                         |
| 11054       | <code>"post_only_reject"</code>                                         | Request rejected due to <code>reject_post_only</code> flag.                                                                                                                                                              |
| 11055       | <code>"post_only_not_allowed"</code>                                    | Post only flag not allowed for given order type                                                                                                                                                                          |
| 11056       | <code>"unauthenticated_public_requests_temporarily_disabled"</code>     | Request rejected because of unauthenticated public requests were temporarily disabled                                                                                                                                    |
| 11090       | <code>"invalid_addr"</code>                                             | Invalid address.                                                                                                                                                                                                         |
| 11091       | <code>"invalid_transfer_address"</code>                                 | Invalid address for the transfer.                                                                                                                                                                                        |
| 11092       | <code>"address_already_exist"</code>                                    | The address already exists.                                                                                                                                                                                              |
| 11093       | <code>"max_addr_count_exceeded"</code>                                  | Limit of allowed addresses has been reached.                                                                                                                                                                             |
| 11094       | <code>"internal_server_error"</code>                                    | Some unhandled error on server. Please report to admin. The details of the request will help to locate the problem.                                                                                                      |
| 11095       | <code>"disabled_deposit_address_creation"</code>                        | Deposit address creation has been disabled by admin.                                                                                                                                                                     |
| 11096       | <code>"address_belongs_to_user"</code>                                  | Withdrawal instead of transfer.                                                                                                                                                                                          |
| 11097       | <code>"no_deposit_address"</code>                                       | Deposit address not specified.                                                                                                                                                                                           |
| 11098       | <code>"account_locked"</code>                                           | Account locked.                                                                                                                                                                                                          |
| 12001       | <code>"too_many_subaccounts"</code>                                     | Limit of subbacounts is reached.                                                                                                                                                                                         |
| 12002       | <code>"wrong_subaccount_name"</code>                                    | The input is not allowed as the name of subaccount.                                                                                                                                                                      |
| 12003       | <code>"login_over_limit"</code>                                         | The number of failed login attempts is limited.                                                                                                                                                                          |
| 12004       | <code>"registration_over_limit"</code>                                  | The number of registration requests is limited.                                                                                                                                                                          |
| 12005       | <code>"country_is_banned"</code>                                        | The country is banned (possibly via IP check).                                                                                                                                                                           |
| 12100       | <code>"transfer_not_allowed"</code>                                     | Transfer is not allowed. Possible wrong direction or other mistake.                                                                                                                                                      |
| 12998       | <code>"security_key_authorization_over_limit"</code>                    | Too many failed security key authorizations. The client should wait for <code>wait</code> seconds to try again.                                                                                                          |
| 13004       | <code>"invalid_credentials"</code>                                      | Invalid credentials have been used.                                                                                                                                                                                      |
| 13005       | <code>"pwd_match_error"</code>                                          | Password confirmation error.                                                                                                                                                                                             |
| 13006       | <code>"security_error"</code>                                           | Invalid Security Code.                                                                                                                                                                                                   |
| 13007       | <code>"user_not_found"</code>                                           | User's security code has been changed or wrong.                                                                                                                                                                          |
| 13008       | <code>"request_failed"</code>                                           | Request failed because of invalid input or internal failure.                                                                                                                                                             |
| 13009       | <code>"unauthorized"</code>                                             | Wrong or expired authorization token or bad signature. For example, please check the scope of the token, "connection" scope can't be reused for other connections.                                                       |
| 13010       | <code>"value_required"</code>                                           | Invalid input, missing value.                                                                                                                                                                                            |
| 13011       | <code>"value_too_short"</code>                                          | Input is too short.                                                                                                                                                                                                      |
| 13012       | <code>"unavailable_in_subaccount"</code>                                | Subaccount restrictions.                                                                                                                                                                                                 |
| 13013       | <code>"invalid_phone_number"</code>                                     | Unsupported or invalid phone number.                                                                                                                                                                                     |
| 13014       | <code>"cannot_send_sms"</code>                                          | SMS sending failed -- phone number is wrong.                                                                                                                                                                             |
| 13015       | <code>"invalid_sms_code"</code>                                         | Invalid SMS code.                                                                                                                                                                                                        |
| 13016       | <code>"invalid_input"</code>                                            | Invalid input.                                                                                                                                                                                                           |
| 13018       | <code>"invalid_content_type"</code>                                     | Invalid content type of the request.                                                                                                                                                                                     |
| 13019       | <code>"orderbook_closed"</code>                                         | Closed, expired order book.                                                                                                                                                                                              |
| 13020       | <code>"not_found"</code>                                                | Instrument is not found, invalid instrument name.                                                                                                                                                                        |
| 13021       | <code>"forbidden"</code>                                                | Not enough permissions to execute the request, forbidden.                                                                                                                                                                |
| 13025       | <code>"method_switched_off_by_admin"</code>                             | API method temporarily switched off by the administrator.                                                                                                                                                                |
| 13028       | <code>"temporarily_unavailable"</code>                                  | The requested service is not responding or processing the response takes too long.                                                                                                                                       |
| 13030       | <code>"mmp_trigger"</code>                                              | Order has been rejected due to the MMP trigger.                                                                                                                                                                          |
| 13031       | <code>"verification_required"</code>                                    | API method allowed only for verified users.                                                                                                                                                                              |
| 13032       | <code>"non_unique_order_label"</code>                                   | Request allowed only for orders uniquely identified by given label, more than one match was found                                                                                                                        |
| 13034       | <code>"no_more_security_keys_allowed"</code>                            | Maximal number of tokens allowed reached                                                                                                                                                                                 |
| 13035       | <code>"active_combo_limit_reached"</code>                               | Limit of active combo books was reached. The client should wait some time before retrying the request.                                                                                                                   |
| 13036       | <code>"unavailable_for_combo_books"</code>                              | Action is temporarily unavailable for combo books.                                                                                                                                                                       |
| 13037       | <code>"incomplete_KYC_data"</code>                                      | KYC verification data is insufficient for external service provider.                                                                                                                                                     |
| 13040       | <code>"mmp_required"</code>                                             | User is not a MMP user.                                                                                                                                                                                                  |
| 13042       | <code>"cod_not_enabled"</code>                                          | Cancel-on-Disconnect is not enabled for the connection.                                                                                                                                                                  |
| 13043       | <code>"quotes_frozen"</code>                                            | Quotes are still frozen after previous cancel.                                                                                                                                                                           |
| 13403       | <code>"scope_exceeded"</code>                                           | Error returned after the user tried to edit / delete an API key using an authorized key connection with insufficient scope                                                                                               |
| 13503       | <code>"unavailable"</code>                                              | Method is currently not available.                                                                                                                                                                                       |
| 13666       | <code>"request_cancelled_by_user"</code>                                | Request was cancelled by the user with other api request.                                                                                                                                                                |
| 13777       | <code>"replaced"</code>                                                 | Edit request was replaced by other one.                                                                                                                                                                                  |
| 13778       | <code>"raw_subscriptions_not_available_for_unauthorized"</code>         | Raw subscriptions are not available for unauthorized requests.                                                                                                                                                           |
| 13780       | <code>"move_positions_over_limit"</code>                                | The client cannot execute the request yet, and should wait for <code>wait</code> seconds to try again                                                                                                                    |
| 13781       | <code>"coupon_already_used"</code>                                      | The coupon has already been used by current account                                                                                                                                                                      |
| 13791       | <code>"KYC_transfer_already_initiated"</code>                           | Sharing of KYC data with a third party provider was already initiated.                                                                                                                                                   |
| 13792       | <code>"incomplete_KYC_data"</code>                                      | User's KYC data stored on the platform is insufficient for sharing according to third party provider.                                                                                                                    |
| 13793       | <code>"KYC_data_inaccessible"</code>                                    | User's KYC data is inaccessible at the moment. Client should try again later.                                                                                                                                            |
| 13888       | <code>"timed_out"</code>                                                | Server did not manage to process request when it was valid (<code>valid_until</code>)                                                                                                                                    |
| 13901       | <code>"no_more_oto_orders"</code>                                       | Total limit of open "one triggers other" orders has been exceeded.                                                                                                                                                       |
| 13902       | <code>"mass_quotes_disabled"</code>                                     | Mass Quotes feature disabled for this user and currency.                                                                                                                                                                 |
| 13903       | <code>"too_many_quotes"</code>                                          | Number of qoutes (in Mass Quotes requests) per second exceeded.                                                                                                                                                          |
| 13904       | <code>"security_key_setup_required"</code>                              | Not allowed without a full security key setup.                                                                                                                                                                           |
| -32602      | <code>"Invalid params"</code>                                           | See JSON-RPC spec.                                                                                                                                                                                                       |
| -32600      | <code>"request entity too large"</code>                                 | Error thrown when body size in POST request or single frame in websocket connection frame exceeds the limit (32 kB)                                                                                                      |
| -32601      | <code>"Method not found"</code>                                         | See JSON-RPC spec.                                                                                                                                                                                                       |
| -32700      | <code>"Parse error"</code>                                              | See JSON-RPC spec.                                                                                                                                                                                                       |
| -32000      | <code>"Missing params"</code>                                           | See JSON-RPC spec.                                                                                                                                                                                                       |

## Support Articles

# Rate Limits

- Updated 1 month ago

Deribit uses a volume-tiered rate limit system, focusing primarily on matching
engine requests. These rate limits are implemented to ensure the robustness of
our system's order processing capabilities.

**General Mechanism of Rate Limits**

Our rate limiting approach is based on a credit system, where each request
consumes a certain number of credits and the credits are periodically refilled.
Exceeding the rate limit results in a "too_many_requests" 10028 error. If you
receive this error, it means you have used all of your credits, and will need to
wait for a credit refill. Key elements of this system include:

- **Credit Refill**: Credits are replenished at a consistent rate, ensuring a
  steady flow of allowable requests.
- **Maximum Credits**: Each user is allocated a maximum number of credits, which
  sets the limit on how many requests can be made in a given period.
- **Cost per Request**: Every API request consumes a predefined number of
  credits from the user's available credit pool.

**Default Settings for Non-Matching Engine Requests**

- **Cost per Request**: 500 credits.
- **Maximum Credits**: 50,000 credits.
- **Refill Rate**: Credits are refilled at a rate that allows up to 20 requests
  per second (10,000 credits per second).
- **Burst Capacity**: Allows up to 100 requests at once, considering the maximum
  credit pool.

**Matching Engine Requests**

Each sub-account has an hourly updated rate limit, applicable across all books.
Users can check their current rate limits via the
**/private/get_account_summary** method.

<table class="MuiTableContainer-root deribit-42 css-kge0eu" style="-webkit-text-stroke-width:0px;box-sizing:inherit;color:rgb(255, 255, 255);font-family:Roboto;font-size:13.7143px;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-weight:400;letter-spacing:normal;margin-bottom:0.5em;orphans:2;overflow-x:auto;text-align:start;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;white-space:normal;widows:2;width:852px;word-spacing:0px;" width="852" xml:id="UUID-9325394c-bca6-d0a5-291f-b19978b3ca89_informaltable-id4637951699055"><tbody><tr><td><p><span class="bold"><strong>Tier Level</strong></span></p></td><td><p><span class="bold"><strong>7-Day Trading Volume</strong></span></p></td><td><p><span class="bold"><strong>Sustained Rate Limit (Requests/Second)</strong></span></p></td><td><p><span class="bold"><strong>Burst Rate Limit</strong></span></p></td><td><p><span class="bold"><strong>Description</strong></span></p></td></tr><tr><td><p><span class="bold"><strong>Tier 1</strong></span></p></td><td><p>Over USD 25 million</p></td><td><p>30 requests/second</p></td><td><p>100 requests (burst)</p></td><td><p>Suitable for high-volume traders, allowing up to 100 requests in a rapid burst or a steady rate of 30 requests per second.</p></td></tr><tr><td><p><span class="bold"><strong>Tier 2</strong></span></p></td><td><p>Over USD 5 million</p></td><td><p>20 requests/second</p></td><td><p>50 requests (burst)</p></td><td><p>Designed for medium-volume traders, permitting up to 50 requests in a burst or 20 requests per second.</p></td></tr><tr><td><p><span class="bold"><strong>Tier 3</strong></span></p></td><td><p>Over USD 1 million</p></td><td><p>10 requests/second</p></td><td><p>30 requests (burst)</p></td><td><p>Appropriate for active traders, enabling up to 30 requests in a burst or 10 requests per second.</p></td></tr><tr><td><p><span class="bold"><strong>Tier 4</strong></span></p></td><td><p>Up to USD 1 million</p></td><td><p>5 requests/second</p></td><td><p>20 requests (burst)</p></td><td><p>For regular traders, allowing up to 20 requests in a burst or a steady rate of 5 requests per second.</p></td></tr></tbody></table>

## Checking current rate limits[](#heading-1)

Users can access the current rate limits by calling the
[**/private/get_account_summary**](https://docs.deribit.com/next/#private-get_account_summary)
method and receiving limits field in response. The configuration of rate limits
can be either on a per-currency basis or a default set applied globally across
all currencies. Per-currency limits are not the default setting and are enabled
only for specific clients upon request.

## **Limits field**[](#heading-2)

non_matching_engine: Describes rate limits applicable to requests that do not
involve the matching engine. Defined by:

- burst: The maximum number of requests permitted in a short burst.
- rate: The sustained number of requests allowed over time.

matching_engine: Outlines rate limits related to operations that utilize the
matching engine, with the following structure:

**Common Limits for All Configurations:**

- spot: Specific limits for spot trading, involving two different currencies.
- cancel_all: Limits applicable to canceling all orders across all currencies or
  canceling by label without specifying the currency.

**When** limits_per_currencyis set to false, the following default limits apply
globally across all currencies:

- trading: Total trading limits applied to all trading operations.
- maximum_quotes: Limits on the maximum number of quotes permissible.
- maximum_mass_quotes: Limits on mass quoting operations.
- guaranteed_mass_quotes: Guaranteed number of mass quotes that can be made.

**When** limits_per_currencyis set to true, rate limits are defined separately
for each settlement currency, providing detailed control:

- Each currency is represented by its code as a key in the matching_engine
  object.

Under each currency key, the limits are categorized as follows:

- trading: Limits specific to trading activities for that currency.
- maximum_quotes: Limits for the maximum number of quotes specific to the
  currency.
- maximum_mass_quotes: Limits for mass quoting operations for the currency.
- guaranteed_mass_quotes: Guaranteed number of mass quotes for the currency.

## **Additional Context for Cancel Operations**[](#heading-3)

private/cancel_all: This endpoint utilizes the cancel_all limit from the
matching_engine to determine allowable rates for canceling all orders across the
platform.

private/cancel_all_by_currency/instrument: For operations targeted at specific
currencies or instruments, the relevant limits under trading from the
matching_engine apply. If the operation involves spot trading, the spot limit is
applicable.

private/cancel_all_by_kind_or_type: The applicable limits depend on the
parameters specified in the request:

- For **all** currencies: thecancel_alllimit.
- For a **specific** currency: the corresponding currency limit.
- For **spot** operations: the spot limit.

**Example for users without per currency config (default):**

{ "non_matching_engine": { "burst": 1500, "rate": 1000 }, "limits_per_currency":
false, "matching_engine": { "trading": { "total": { "burst": 20, "rate": 5 } },
"spot": { "burst": 250, "rate": 200 }, "maximum_quotes": { "burst": 500, "rate":
500 }, "maximum_mass_quotes": { "burst": 10, "rate": 10 },
"guaranteed_mass_quotes": { "burst": 2, "rate": 2 }, "cancel_all": { "burst":
250, "rate": 200 } } }

**Example for users with per currency config:**

{ "non_matching_engine": { "burst": 1500, "rate": 1000 }, "limits_per_currency":
true, "matching_engine": { "cancel_all": { "burst": 250, "rate": 200 }, "spot":
{ "burst": 250, "rate": 200 }, "usdt": { "maximum_quotes": { "burst": 500,
"rate": 500 }, "maximum_mass_quotes": { "burst": 10, "rate": 10 },
"guaranteed_mass_quotes": { "burst": 2, "rate": 2 }, "trading": { "total": {
"burst": 250, "rate": 200 } } }, "usdc": { "maximum_quotes": { "burst": 500,
"rate": 500 }, "maximum_mass_quotes": { "burst": 10, "rate": 10 },
"guaranteed_mass_quotes": { "burst": 2, "rate": 2 }, "trading": { "total": {
"burst": 250, "rate": 200 } } }, "eth": { "maximum_quotes": { "burst": 500,
"rate": 500 }, "maximum_mass_quotes": { "burst": 10, "rate": 10 },
"guaranteed_mass_quotes": { "burst": 2, "rate": 2 }, "trading": { "total": {
"burst": 250, "rate": 200 } } }, "btc": { "maximum_quotes": { "burst": 500,
"rate": 500 }, "maximum_mass_quotes": { "burst": 10, "rate": 10 },
"guaranteed_mass_quotes": { "burst": 2, "rate": 2 }, "trading": { "perpetuals":
{ "burst": 20, "rate": 10 }, "total": { "burst": 150, "rate": 100 } } } } }

## Overview of Matching Engine Requests[](#heading-4)

All requests not in the list below are treated as non-matching engine requests.

**API V2**

/api/v2/private/buy

/api/v2/private/sell

/api/v2/private/edit

/api/v2/private/edit_by_label

/api/v2/private/cancel

/api/v2/private/cancel_by_label

/api/v2/private/cancel_all

/api/v2/private/cancel_all_by_instrument

/api/v2/private/cancel_all_by_currency

/api/v2/private/cancel_all_by_kind_or_type

/api/v2/private/close_position

/api/v2/private/verify_block_trade

/api/v2/private/execute_block_trade

 /api/v2/private/move_positions

/api/v2/private/mass_quote

 /api/v2/private/cancel_quotes

**FIX**

new_order_single

order_cancel_request

order_mass_cancel_request

order_cancel_replace_request

mass_quote

quote_cancel

# Connection Management

- Updated 1 month ago

## Connection[](#heading-1)

A connection is a single, continuous link between a client and a server over a
network. Users can authenticate with the `connection` scope as these connections
are exempt from the session limit. It is also set and used automatically by the
server when neither `connection` nor `session` scope is provided within the
request.

**Connection scope**

- Access and refresh tokens are strictly tied to the specific connection in
  which they were granted.
- Tokens are valid only during the active connection. Once the connection is
  terminated, the tokens become invalid, requiring a new authentication process
  for a new connection.
- **A maximum of 32 connections per IP address is permitted**. If a 33rd
  connection attempt is made, it will not be successful.

## Session[](#heading-2)

A session extends beyond a single connection and represents a period of
interaction between a user and a server, potentially across multiple
connections. Users can authenticate with the `session:name` scope to bind their
connection with a named session.

**Session scope**

- Tokens issued can be used across different connections, beneficial when a
  user’s connection might be intermittently interrupted.
- Tokens are tied to the session, not to any specific connection, allowing users
  to reconnect using the same tokens until the session expires.
- This scope is ideal for environments where users switch between devices or
  network connections, as it does not require repeated authentication.
- When using **WebSocket** it also allows skipping providing `access_token` with
  every subsequent request.
- Re-authenticating with a refresh token under session scope does not add new
  sessions but refreshes the existing one.
- **A maximum of 16 sessions per UID is allowed**. When session 17 is opened the
  Deribit removes the one that was not refreshed in the longest time.

## Connection Lifetime[](#heading-3)

Each established HTTP connection has an expiration timer of 15 minutes. Users
wishing to maintain an HTTP connection beyond this period should utilize
signature authorization for continued access without impacting session limits.

## Cancel on disconnect[](#heading-4)

The Cancel on Disconnect (COD) feature in the
[API](https://docs.deribit.com/#private-enable_cancel_on_disconnect) supports
two types of scope settings: connection and account. Please note cancel on
disconnect is not supported via HTTP.

- **Connection Scope:** When COD is set with the scope as connection, it applies
  only to the specific connection through which it is set. This setting does not
  affect any other existing or future connections. Each connection must
  individually enable COD if required.
- **Account Scope:** Setting the COD scope to account extends the feature to the
  initial connection where it is set and automatically applies it to all
  subsequent connections made under the same account. This ensures that COD is
  enabled by default for new connections without the need to set it individually
  for each one.

### FIX implementation

Upon initiating a session with the `Logon (A)` message, users have the option to
enable or disable Cancel on Disconnect for that session using Tag 9001. Later,
when logging out, they can override this setting with `Tag 9003.`

#### Message Types

- `Logon (A)`: Initiates the session. Must be the first message sent by the
  client.
- `LogOut (5)`: Used by either party to terminate the session. The sender must
  wait for an echo before closing the socket.

##### Tags

- `Tag 9001 - CancelOnDisconnect`: Boolean flag that controls session-level COD.
  Default is false (N). If not specified, the account’s default setting is used.
- `Tag 9003 - DontCancelOnDisconnect`: If set to `Y`, disables COD for the
  connection despite previous settings at logon or account level. Default is
  `false (N)`.

# Accessing historical trades and orders using API

- Updated 1 month ago

#### Overview

Deribit API allows users to retrieve historical trade and order records by
utilising the `historical` parameter. 

While recent records (**30 minutes** for orders and **24 hours** for trades) can
be accessed without this parameter, they are only stored temporarily and
eventually removed. After this period, the records are only available through
the historical parameter.

#### Retention Periods:

- **Recent orders**: Available for **30 minutes** before removal.
- **Recent trades**: Available for **24 hours** before removal.
- **Historical records**: Persist indefinitely.

#### Supported Endpoints

The following API endpoints support historical data retrieval:

- `private/get_order_history_by_instrument` 
- `private/get_order_history_by_currency` 
- `private/get_user_trades_by_instrument` 
- `private/get_user_trades_by_instrument_and_time` 
- `private/get_user_trades_by_currency` 
- `private/get_user_trades_by_currency_and_time` 
- `private/get_user_trades_by_order` 

#### API Usage

To retrieve historical trades and orders, use `historical` parameter in your API
request to any of the endpoints listed above.

- `historical: false` → Retrieves recent records (available immediately after
  execution).
- `historical: true` → Retrieves historical records (available after a short
  delay for indexing).

**Example Request:** 

{ "method": "private/get_user_trades_by_currency", "params": { "currency":
"ETH", "historical": true }, "jsonrpc": "2.0", "id": 2 }

**Example Response:** 

{ "jsonrpc": "2.0", "id": 2, "result": { "trades": \[ { "timestamp":
1741270338502, "state": "open", "price": 1355.9, "direction": "sell",
"index_price": 2246.9768, "instrument_name": "ETH_USDC", "trade_seq": 18009,
"api": false, "amount": 0.2505, "mark_price": 2246.9768, "order_id":
"ETH_USDC-109841952", "matching_id": null, "tick_direction": 3, "fee": 0,
"profit_loss": null, "mmp": false, "post_only": false, "self_trade": false,
"contracts": 2505, "original_order_type": "market", "trade_id":
"ETH_USDC-18820350", "fee_currency": "USDC", "order_type": "limit",
"risk_reducing": false, "liquidity": "M" }, { "timestamp": 1741270338460,
"state": "open", "price": 1355.9, "direction": "sell", "index_price": 2246.9768,
"instrument_name": "ETH_USDC", "trade_seq": 18006, "api": false, "amount":
0.2505, "mark_price": 2246.9768, "order_id": "ETH_USDC-109841952",
"matching_id": null, "tick_direction": 3, "fee": 0, "profit_loss": null, "mmp":
false, "post_only": false, "self_trade": false, "contracts": 2505,
"original_order_type": "market", "trade_id": "ETH_USDC-18820345",
"fee_currency": "USDC", "order_type": "limit", "risk_reducing": false,
"liquidity": "M" } \], "has_more": true } }

# API Usage Policy

- Updated 1 month ago

Deribit is committed to providing a fast, reliable, and efficient trading
platform for all users. To maintain the integrity and performance of our system,
we are introducing new guidelines for API usage. These guidelines are aimed at
ensuring that all users have fair access to the platform without unnecessary
strain on resources.

These guidelines sit on top of our rate limit policy. Limits are determined at
Deribit’s discretion. Deribit will not outright ban or limit API usage based on
these policies without notice but such penalties can arise in case of
non-cooperation.

## Matching Engine requests[](#heading-1)

List of matching engine requests can be found
here: [Rate Limits](/hc/en-us/articles/25944617523357#UUID-9325394c-bca6-d0a5-291f-b19978b3ca89 "Rate Limits")

To avoid unnecessary congestion of the matching engine Deribit monitors user’s
Order to Volume ratio. The Order to Volume Ratio (OTV) is a metric used to
assess the number of orders placed by a trader relative to the actual volume of
trades executed. It helps us identify patterns of excessive order placement that
might lead to system strain, market manipulation, or inefficiencies within our
trading platform.

OTV is defined as:

OTV = (# ME Changes / Volume)

A _ME Change_ is any change to an order book. This could be an insert, amend or
cancellation. Each cancellation done by a mass cancel counts towards the number
of ME changes separately. The same is true for quotes. A mass quote that inserts
100 double-sided quotes adds 200 to the limit. Immediate-or-cancel orders (IOCs)
and Fill-or-Kill orders (FOKs) that are cancelled count double towards the ME
changes, they are seen as an insert and an instant cancellation. Market-maker
protection (MMP) and self-match prevention (SMP) triggers are excluded, but are
monitored separately. To calculate volume we only consider trades on which the
client was the maker. We monitor these ratios per product group and currency.

A healthy OTV ensures that traders are placing orders that have a reasonable
likelihood of execution. Monitoring OTV helps us prevent orders that would put
unnecessary stress on the system, maintaining a smooth trading experience for
everyone.

Traders who consistently exhibit an unusually high OTV may be subject to rate
limits. OTV magnitude is determined at Deribit’s discretion. As a general rule
of thumb we consider OTV ratios higher than 10,000 BTC (10,000 ME changes per 1
BTC of volume traded) or 1,000 ETH high. We will never outright rate limit users
for high OTV ratios without proper communication beforehand.

## Non-Matching Engine requests[](#heading-2)

**Categories of API Calls**

To clarify the types of API calls that are subject to monitoring, we are
grouping them into specific categories:

**1\. Market Data API Calls**

To reduce unnecessary load, we encourage users to switch to WebSocket
subscriptions wherever possible. WebSocket connections provide a real-time,
efficient stream of market data, reducing the need for repeated polling via API
which can result in returning duplicate information multiple times.

These endpoints typically carry market information or user trading information.
Some examples include:

`/public/get_order_book`

`/public/ticker`

`/private/get_open_orders`

Full list of our websocket subscription coverage can be found here:

[Deribit API](https://docs.deribit.com/#subscriptions)

Please note that we also have a limit of 500 channels per subscription.

Excessive usage of these endpoints can result in stricter rate limits.

**2\. Excessive Errors and Failed Requests**

Repeatedly sending incorrect or malformed API requests can negatively impact
platform performance. Users who consistently send requests that result in high
error rates may be subject to additional monitoring. This includes users who
exceed rate limits and persist in making the same call resulting in an error.

Excessive errors can result in IP banning. This includes errors produced by
exceeding rate limits.

**3\. Protocol Pings**

While pings are a necessary part of keeping connections alive, excessive or
unnecessary ping requests can consume system resources. We recommend that users
minimize the frequency of protocol pings and confirm heartbeat every 30-60
seconds.

Unnecessary protocol calls may result in stricter rate limits.

**4\. Other**

We recognize that users need reliable access to their account and market data,
including withdrawals, account information, and contract specifications.
However, we ask users to refrain from making excessive or redundant calls and
ensure that they only request data as needed.

Unnecessary usage of these endpoints may result in stricter rate limits.

**5\. Unauthenticated Requests**

Unauthenticated API requests are used to access public information, such as
market data, without requiring a user account. We prefer users making
authenticated request to our platform even for publicly available information.
For this reason our policy is more strict on unauthenticated users.

Unauthenticated requests are more likely to result in an IP ban as we cannot
contact the client behind them directly.

If you have any questions or need assistance optimizing your API usage, please
reach out to our support team.
