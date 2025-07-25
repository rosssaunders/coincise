# Deribit Public API Documentation

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
  - `type` - type of security key: `tfa` for TOTP Two Factor Authentication
  - `name` - name of security key
- `rp_id` - relying party identifier (need to be used with WebAuthn)
- `challenge` - this string needs to be resend, it is valid for 1 minute

> Example of response with request to make Security Key authorization:

### TFA authorization

When the user chooses TFA authorization, he should read the TFA code from his
application, and it should be added to original requests parameters as
`authorization_data`. It is required to add to parameters `challenge` too. Then
request should be repeated with those updated parameters.

> Example of request when TFA code is `602051`:

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

# Supporting

## /public/get_time

Retrieves the current time (in milliseconds). This API endpoint can be used to
check the clock skew between your software and Deribit's systems.

### Parameters

_This method takes no parameters_

### Response

| Name    | Type    | Description                                           |
| ------- | ------- | ----------------------------------------------------- |
| id      | integer | The id that was sent in the request                   |
| jsonrpc | string  | The JSON-RPC version (2.0)                            |
| result  | integer | Current timestamp (milliseconds since the UNIX epoch) |

## /public/hello

> _This method is only available via websockets._

Method used to introduce the client software connected to Deribit platform over
websocket. Provided data may have an impact on the maintained connection and
will be collected for internal statistical purposes. In response, Deribit will
also introduce itself.

### Parameters

| Parameter      | Required | Type   | Enum | Description             |
| -------------- | -------- | ------ | ---- | ----------------------- |
| client_name    | true     | string |      | Client software name    |
| client_version | true     | string |      | Client software version |

### Response

| Name                             | Type            | Description                         |
| -------------------------------- | --------------- | ----------------------------------- |
| id                               | integer         | The id that was sent in the request |
| jsonrpc                          | string          | The JSON-RPC version (2.0)          |
| result                           | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;version | string          | The API version                     |

## /public/status

Method used to get information about locked currencies

### Parameters

_This method takes no parameters_

### Response

| Name                                    | Type            | Description                                                                                                                                                                  |
| --------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                      | integer         | The id that was sent in the request                                                                                                                                          |
| jsonrpc                                 | string          | The JSON-RPC version (2.0)                                                                                                                                                   |
| result                                  | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;locked         | string          | <code>true</code> when platform is locked in all currencies, <code>partial</code> when some currencies are locked, <code>false</code> - when there are not currencies locked |
| &nbsp;&nbsp;›&nbsp;&nbsp;locked_indices | array           | List of currency indices locked platform-wise                                                                                                                                |

## /public/test

Tests the connection to the API server, and returns its version. You can use
this to make sure the API is reachable, and matches the expected version.

### Parameters

| Parameter       | Required | Type   | Enum                   | Description                                                                                             |
| --------------- | -------- | ------ | ---------------------- | ------------------------------------------------------------------------------------------------------- |
| expected_result | false    | string | <code>exception</code> | The value "exception" will trigger an error response. This may be useful for testing wrapper libraries. |

### Response

| Name                             | Type            | Description                         |
| -------------------------------- | --------------- | ----------------------------------- |
| id                               | integer         | The id that was sent in the request |
| jsonrpc                          | string          | The JSON-RPC version (2.0)          |
| result                           | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;version | string          | The API version                     |

# Subscription management

Subscription works as [notifications](#notifications), so users will
automatically (after subscribing) receive messages from the server. Overview for
each channel response format is described in [subscriptions](#subscriptions)
section.

## /public/subscribe

> _This method is only available via websockets._

Subscribe to one or more channels.

This is the same method as [/private/subscribe](#private_subscribe), but it can
only be used for 'public' channels.

### Parameters

| Parameter | Required | Type  | Enum | Description                         |
| --------- | -------- | ----- | ---- | ----------------------------------- |
| channels  | true     | array |      | A list of channels to subscribe to. |

### Response

| Name    | Type            | Description                         |
| ------- | --------------- | ----------------------------------- |
| id      | integer         | The id that was sent in the request |
| jsonrpc | string          | The JSON-RPC version (2.0)          |
| result  | array of string | A list of subscribed channels.      |

## /public/unsubscribe

> _This method is only available via websockets._

Unsubscribe from one or more channels.

### Parameters

| Parameter | Required | Type  | Enum | Description                             |
| --------- | -------- | ----- | ---- | --------------------------------------- |
| channels  | true     | array |      | A list of channels to unsubscribe from. |

### Response

| Name    | Type            | Description                         |
| ------- | --------------- | ----------------------------------- |
| id      | integer         | The id that was sent in the request |
| jsonrpc | string          | The JSON-RPC version (2.0)          |
| result  | array of string | A list of subscribed channels.      |

## /public/unsubscribe_all

> _This method is only available via websockets._

Unsubscribe from all the channels subscribed so far.

### Parameters

_This method takes no parameters_

### Response

| Name    | Type    | Description                                                    |
| ------- | ------- | -------------------------------------------------------------- |
| id      | integer | The id that was sent in the request                            |
| jsonrpc | string  | The JSON-RPC version (2.0)                                     |
| result  | string  | Result of method execution. <code>ok</code> in case of success |

## /private/subscribe

> _This method is only available via websockets._

Subscribe to one or more channels.

The name of the channel determines what information will be provided, and in
what form.

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum | Description                                                                                  |
| --------- | -------- | ------ | ---- | -------------------------------------------------------------------------------------------- |
| channels  | true     | array  |      | A list of channels to subscribe to.                                                          |
| label     | false    | string |      | Optional label which will be added to notifications of private channels (max 16 characters). |

### Response

| Name    | Type            | Description                         |
| ------- | --------------- | ----------------------------------- |
| id      | integer         | The id that was sent in the request |
| jsonrpc | string          | The JSON-RPC version (2.0)          |
| result  | array of string | A list of subscribed channels.      |

## /private/unsubscribe

> _This method is only available via websockets._

Unsubscribe from one or more channels.

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type  | Enum | Description                             |
| --------- | -------- | ----- | ---- | --------------------------------------- |
| channels  | true     | array |      | A list of channels to unsubscribe from. |

### Response

| Name    | Type            | Description                         |
| ------- | --------------- | ----------------------------------- |
| id      | integer         | The id that was sent in the request |
| jsonrpc | string          | The JSON-RPC version (2.0)          |
| result  | array of string | A list of subscribed channels.      |

## /private/unsubscribe_all

> _This method is only available via websockets._

Unsubscribe from all the channels subscribed so far.

This is a private method; it can only be used after authentication.

### Parameters

_This method takes no parameters_

### Response

| Name    | Type    | Description                                                    |
| ------- | ------- | -------------------------------------------------------------- |
| id      | integer | The id that was sent in the request                            |
| jsonrpc | string  | The JSON-RPC version (2.0)                                     |
| result  | string  | Result of method execution. <code>ok</code> in case of success |

# Market data

## /public/get_apr_history

Retrieves historical APR data for specified currency. Only applicable to
yield-generating tokens (`USDE`, `STETH`).

### Parameters

| Parameter | Required | Type    | Enum                                    | Description                                                                     |
| --------- | -------- | ------- | --------------------------------------- | ------------------------------------------------------------------------------- |
| currency  | true     | string  | <code>usde</code><br><code>steth</code> | Currency for which to retrieve APR history                                      |
| limit     | false    | integer |                                         | Number of days to retrieve (default <code>365</code>, maximum <code>365</code>) |
| before    | false    | integer |                                         | Used to receive APR history before given epoch day                              |

### Response

| Name                                                  | Type                     | Description                         |
| ----------------------------------------------------- | ------------------------ | ----------------------------------- |
| id                                                    | integer                  | The id that was sent in the request |
| jsonrpc                                               | string                   | The JSON-RPC version (2.0)          |
| result                                                | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;continuation                 | string                   | Continuation token for pagination.  |
| &nbsp;&nbsp;›&nbsp;&nbsp;data                         | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;apr | number                   | The APR of the day                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;day | integer                  | The full epoch day                  |

## /public/get_book_summary_by_currency

Retrieves the summary information such as open interest, 24h volume, etc. for
all instruments for the currency (optionally filtered by kind). **Note** - For
real-time updates, we recommend using the WebSocket subscription to
`ticker.{instrument_name}.{interval}` instead of polling this endpoint.

### Parameters

| Parameter | Required | Type   | Enum                                                                                                                      | Description                                                              |
| --------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| currency  | true     | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code>                       | The currency symbol                                                      |
| kind      | false    | string | <code>future</code><br><code>option</code><br><code>spot</code><br><code>future_combo</code><br><code>option_combo</code> | Instrument kind, if not provided instruments of all kinds are considered |

### Response

| Name                                              | Type                     | Description                                                                                                                                                                                                                                             |
| ------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                | integer                  | The id that was sent in the request                                                                                                                                                                                                                     |
| jsonrpc                                           | string                   | The JSON-RPC version (2.0)                                                                                                                                                                                                                              |
| result                                            | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;ask_price                | number                   | The current best ask price, <code>null</code> if there aren't any asks                                                                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;base_currency            | string                   | Base currency                                                                                                                                                                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;bid_price                | number                   | The current best bid price, <code>null</code> if there aren't any bids                                                                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp       | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;current_funding          | number                   | Current funding (perpetual only)                                                                                                                                                                                                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;estimated_delivery_price | number                   | Optional (only for derivatives). Estimated delivery price for the market. For more details, see Contract Specification &gt; General Documentation &gt; Expiration Price.                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;funding_8h               | number                   | Funding 8h (perpetual only)                                                                                                                                                                                                                             |
| &nbsp;&nbsp;›&nbsp;&nbsp;high                     | number                   | Price of the 24h highest trade                                                                                                                                                                                                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_name          | string                   | Unique instrument identifier                                                                                                                                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;interest_rate            | number                   | Interest rate used in implied volatility calculations (options only)                                                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;last                     | number                   | The price of the latest trade, <code>null</code> if there weren't any trades                                                                                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;low                      | number                   | Price of the 24h lowest trade, <code>null</code> if there weren't any trades                                                                                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;mark_iv                  | number                   | (Only for option) implied volatility for mark price                                                                                                                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;mark_price               | number                   | The current instrument market price                                                                                                                                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;mid_price                | number                   | The average of the best bid and ask, <code>null</code> if there aren't any asks or bids                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;open_interest            | number                   | Optional (only for derivatives). The total amount of outstanding contracts in the corresponding amount units. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| &nbsp;&nbsp;›&nbsp;&nbsp;price_change             | number                   | 24-hour price change expressed as a percentage, <code>null</code> if there weren't any trades                                                                                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_currency           | string                   | Quote currency                                                                                                                                                                                                                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;underlying_index         | string                   | Name of the underlying future, or <code>'index_price'</code> (options only)                                                                                                                                                                             |
| &nbsp;&nbsp;›&nbsp;&nbsp;underlying_price         | number                   | underlying price for implied volatility calculations (options only)                                                                                                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;volume                   | number                   | The total 24h traded volume (in base currency)                                                                                                                                                                                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;volume_notional          | number                   | Volume in quote currency (futures and spots only)                                                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;volume_usd               | number                   | Volume in USD                                                                                                                                                                                                                                           |

## /public/get_book_summary_by_instrument

Retrieves the summary information such as open interest, 24h volume, etc. for a
specific instrument.

### Parameters

| Parameter       | Required | Type   | Enum | Description     |
| --------------- | -------- | ------ | ---- | --------------- |
| instrument_name | true     | string |      | Instrument name |

### Response

| Name                                              | Type                     | Description                                                                                                                                                                                                                                             |
| ------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                | integer                  | The id that was sent in the request                                                                                                                                                                                                                     |
| jsonrpc                                           | string                   | The JSON-RPC version (2.0)                                                                                                                                                                                                                              |
| result                                            | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;ask_price                | number                   | The current best ask price, <code>null</code> if there aren't any asks                                                                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;base_currency            | string                   | Base currency                                                                                                                                                                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;bid_price                | number                   | The current best bid price, <code>null</code> if there aren't any bids                                                                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp       | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;current_funding          | number                   | Current funding (perpetual only)                                                                                                                                                                                                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;estimated_delivery_price | number                   | Optional (only for derivatives). Estimated delivery price for the market. For more details, see Contract Specification &gt; General Documentation &gt; Expiration Price.                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;funding_8h               | number                   | Funding 8h (perpetual only)                                                                                                                                                                                                                             |
| &nbsp;&nbsp;›&nbsp;&nbsp;high                     | number                   | Price of the 24h highest trade                                                                                                                                                                                                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_name          | string                   | Unique instrument identifier                                                                                                                                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;interest_rate            | number                   | Interest rate used in implied volatility calculations (options only)                                                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;last                     | number                   | The price of the latest trade, <code>null</code> if there weren't any trades                                                                                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;low                      | number                   | Price of the 24h lowest trade, <code>null</code> if there weren't any trades                                                                                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;mark_iv                  | number                   | (Only for option) implied volatility for mark price                                                                                                                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;mark_price               | number                   | The current instrument market price                                                                                                                                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;mid_price                | number                   | The average of the best bid and ask, <code>null</code> if there aren't any asks or bids                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;open_interest            | number                   | Optional (only for derivatives). The total amount of outstanding contracts in the corresponding amount units. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| &nbsp;&nbsp;›&nbsp;&nbsp;price_change             | number                   | 24-hour price change expressed as a percentage, <code>null</code> if there weren't any trades                                                                                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_currency           | string                   | Quote currency                                                                                                                                                                                                                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;underlying_index         | string                   | Name of the underlying future, or <code>'index_price'</code> (options only)                                                                                                                                                                             |
| &nbsp;&nbsp;›&nbsp;&nbsp;underlying_price         | number                   | underlying price for implied volatility calculations (options only)                                                                                                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;volume                   | number                   | The total 24h traded volume (in base currency)                                                                                                                                                                                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;volume_notional          | number                   | Volume in quote currency (futures and spots only)                                                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;volume_usd               | number                   | Volume in USD                                                                                                                                                                                                                                           |

## /public/get_contract_size

Retrieves contract size of provided instrument.

### Parameters

| Parameter       | Required | Type   | Enum | Description     |
| --------------- | -------- | ------ | ---- | --------------- |
| instrument_name | true     | string |      | Instrument name |

### Response

| Name                                   | Type            | Description                                                                                       |
| -------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------- |
| id                                     | integer         | The id that was sent in the request                                                               |
| jsonrpc                                | string          | The JSON-RPC version (2.0)                                                                        |
| result                                 | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;contract_size | integer         | Contract size, for futures in USD, for options in base currency of the instrument (BTC, ETH, ...) |

## /public/get_currencies

Retrieves all cryptocurrencies supported by the API.

### Parameters

_This method takes no parameters_

### Response

| Name                                                    | Type                     | Description                                                                                                                                                                                                                                                      |
| ------------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                      | integer                  | The id that was sent in the request                                                                                                                                                                                                                              |
| jsonrpc                                                 | string                   | The JSON-RPC version (2.0)                                                                                                                                                                                                                                       |
| result                                                  | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;apr                            | number                   | Simple Moving Average (SMA) of the last 7 days of rewards. If fewer than 7 days of reward data are available, the APR is calculated as the average of the available rewards. Only applicable to yield-generating tokens (<code>USDE</code>, <code>STETH</code>). |
| &nbsp;&nbsp;›&nbsp;&nbsp;coin_type                      | string                   | The type of the currency.                                                                                                                                                                                                                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency                       | string                   | The abbreviation of the currency. This abbreviation is used elsewhere in the API to identify the currency.                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency_long                  | string                   | The full name for the currency.                                                                                                                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;fee_precision                  | integer                  | fee precision                                                                                                                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;in_cross_collateral_pool       | boolean                  | <code>true</code> if the currency is part of the cross collateral pool                                                                                                                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;min_confirmations              | integer                  | Minimum number of block chain confirmations before deposit is accepted.                                                                                                                                                                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;min_withdrawal_fee             | number                   | The minimum transaction fee paid for withdrawals                                                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;withdrawal_fee                 | number                   | The total transaction fee paid for withdrawals                                                                                                                                                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;withdrawal_priorities          | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;name  | string                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;value | number                   |

## /public/get_delivery_prices

Retrieves delivery prices for then given index

### Parameters

| Parameter  | Required | Type    | Enum                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Description                                                         |
| ---------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| index_name | true     | string  | <code>btc_usd</code><br><code>eth_usd</code><br><code>ada_usdc</code><br><code>algo_usdc</code><br><code>avax_usdc</code><br><code>bch_usdc</code><br><code>bnb_usdc</code><br><code>btc_usdc</code><br><code>btcdvol_usdc</code><br><code>buidl_usdc</code><br><code>doge_usdc</code><br><code>dot_usdc</code><br><code>eurr_usdc</code><br><code>eth_usdc</code><br><code>ethdvol_usdc</code><br><code>link_usdc</code><br><code>ltc_usdc</code><br><code>near_usdc</code><br><code>paxg_usdc</code><br><code>shib_usdc</code><br><code>sol_usdc</code><br><code>steth_usdc</code><br><code>ton_usdc</code><br><code>trump_usdc</code><br><code>trx_usdc</code><br><code>uni_usdc</code><br><code>usde_usdc</code><br><code>usyc_usdc</code><br><code>xrp_usdc</code><br><code>btc_usdt</code><br><code>eth_usdt</code><br><code>eurr_usdt</code><br><code>sol_usdt</code><br><code>steth_usdt</code><br><code>usdc_usdt</code><br><code>usde_usdt</code><br><code>btc_eurr</code><br><code>btc_usde</code><br><code>btc_usyc</code><br><code>eth_btc</code><br><code>eth_eurr</code><br><code>eth_usde</code><br><code>eth_usyc</code><br><code>steth_eth</code><br><code>paxg_btc</code> | Index identifier, matches (base) cryptocurrency with quote currency |
| offset     | false    | integer |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | The offset for pagination, default - <code>0</code>                 |
| count      | false    | integer |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Number of requested items, default - <code>10</code>                |

### Response

| Name                                                             | Type                     | Description                                                                    |
| ---------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------ |
| id                                                               | integer                  | The id that was sent in the request                                            |
| jsonrpc                                                          | string                   | The JSON-RPC version (2.0)                                                     |
| result                                                           | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;data                                    | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;date           | string                   | The event date with year, month and day                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;delivery_price | number                   | The settlement price for the instrument. Only when <code>state = closed</code> |
| &nbsp;&nbsp;›&nbsp;&nbsp;records_total                           | number                   | Available delivery prices                                                      |

## /public/get_expirations

Retrieves expirations for instruments. This method can be used to see
instruments's expirations.

### Parameters

| Parameter     | Required | Type   | Enum                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Description                                                                                  |
| ------------- | -------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| currency      | true     | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>any</code><br><code>grouped</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | The currency symbol or <code>"any"</code> for all or '"grouped"' for all grouped by currency |
| kind          | true     | string | <code>future</code><br><code>option</code><br><code>any</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Instrument kind, <code>"future"</code> or <code>"option"</code> or <code>"any"</code>        |
| currency_pair | false    | string | <code>btc_usd</code><br><code>eth_usd</code><br><code>ada_usdc</code><br><code>algo_usdc</code><br><code>avax_usdc</code><br><code>bch_usdc</code><br><code>bnb_usdc</code><br><code>btc_usdc</code><br><code>btcdvol_usdc</code><br><code>buidl_usdc</code><br><code>doge_usdc</code><br><code>dot_usdc</code><br><code>eurr_usdc</code><br><code>eth_usdc</code><br><code>ethdvol_usdc</code><br><code>link_usdc</code><br><code>ltc_usdc</code><br><code>near_usdc</code><br><code>paxg_usdc</code><br><code>shib_usdc</code><br><code>sol_usdc</code><br><code>steth_usdc</code><br><code>ton_usdc</code><br><code>trump_usdc</code><br><code>trx_usdc</code><br><code>uni_usdc</code><br><code>usde_usdc</code><br><code>usyc_usdc</code><br><code>xrp_usdc</code><br><code>btc_usdt</code><br><code>eth_usdt</code><br><code>eurr_usdt</code><br><code>sol_usdt</code><br><code>steth_usdt</code><br><code>usdc_usdt</code><br><code>usde_usdt</code><br><code>btc_eurr</code><br><code>btc_usde</code><br><code>btc_usyc</code><br><code>eth_btc</code><br><code>eth_eurr</code><br><code>eth_usde</code><br><code>eth_usyc</code><br><code>steth_eth</code><br><code>paxg_btc</code> | The currency pair symbol                                                                     |

### Response

| Name                              | Type                     | Description                                                                                                                                                                                                               |
| --------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                | integer                  | The id that was sent in the request                                                                                                                                                                                       |
| jsonrpc                           | string                   | The JSON-RPC version (2.0)                                                                                                                                                                                                |
| result                            | array of <em>object</em> | A map where each key is valid currency (e.g. btc, eth, usdc), and the value is a list of expirations or a map where each key is a valid kind (future or options) and value is a list of expirations from every instrument |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency | string                   | Currency name or <code>"any"</code> if don't care or <code>"grouped"</code> if grouped by currencies                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;kind     | string                   | Instrument kind: <code>"future"</code>, <code>"option"</code> or <code>"any"</code> for all                                                                                                                               |

## /public/get_funding_chart_data

Retrieve the list of the latest PERPETUAL funding chart points within a given
time period.

### Parameters

| Parameter       | Required | Type   | Enum                                                   | Description                                                                                              |
| --------------- | -------- | ------ | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| instrument_name | true     | string |                                                        | Instrument name                                                                                          |
| length          | true     | string | <code>8h</code><br><code>24h</code><br><code>1m</code> | Specifies time period. <code>8h</code> - 8 hours, <code>24h</code> - 24 hours, <code>1m</code> - 1 month |

### Response

| Name                                                          | Type                     | Description                                       |
| ------------------------------------------------------------- | ------------------------ | ------------------------------------------------- |
| id                                                            | integer                  | The id that was sent in the request               |
| jsonrpc                                                       | string                   | The JSON-RPC version (2.0)                        |
| result                                                        | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;current_interest                     | number                   | Current interest                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;data                                 | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;index_price | number                   | Current index price                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;interest_8h | number                   | Historical interest 8h value                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;timestamp   | integer                  | The timestamp (milliseconds since the Unix epoch) |
| &nbsp;&nbsp;›&nbsp;&nbsp;interest_8h                          | number                   | Current interest 8h                               |

## /public/get_funding_rate_history

Retrieves hourly historical interest rate for requested PERPETUAL instrument.

### Parameters

| Parameter       | Required | Type    | Enum | Description                                                                         |
| --------------- | -------- | ------- | ---- | ----------------------------------------------------------------------------------- |
| instrument_name | true     | string  |      | Instrument name                                                                     |
| start_timestamp | true     | integer |      | The earliest timestamp to return result from (milliseconds since the UNIX epoch)    |
| end_timestamp   | true     | integer |      | The most recent timestamp to return result from (milliseconds since the UNIX epoch) |

### Response

| Name                                      | Type                     | Description                                       |
| ----------------------------------------- | ------------------------ | ------------------------------------------------- |
| id                                        | integer                  | The id that was sent in the request               |
| jsonrpc                                   | string                   | The JSON-RPC version (2.0)                        |
| result                                    | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;index_price      | number                   | Price in base currency                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;interest_1h      | float                    | 1hour interest rate                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;interest_8h      | float                    | 8hour interest rate                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;prev_index_price | number                   | Price in base currency                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;timestamp        | integer                  | The timestamp (milliseconds since the Unix epoch) |

## /public/get_funding_rate_value

Retrieves interest rate value for requested period. Applicable only for
PERPETUAL instruments.

### Parameters

| Parameter       | Required | Type    | Enum | Description                                                                         |
| --------------- | -------- | ------- | ---- | ----------------------------------------------------------------------------------- |
| instrument_name | true     | string  |      | Instrument name                                                                     |
| start_timestamp | true     | integer |      | The earliest timestamp to return result from (milliseconds since the UNIX epoch)    |
| end_timestamp   | true     | integer |      | The most recent timestamp to return result from (milliseconds since the UNIX epoch) |

### Response

| Name    | Type    | Description                         |
| ------- | ------- | ----------------------------------- |
| id      | integer | The id that was sent in the request |
| jsonrpc | string  | The JSON-RPC version (2.0)          |
| result  | float   |

## /public/get_historical_volatility

Provides information about historical volatility for given cryptocurrency.

### Parameters

| Parameter | Required | Type   | Enum                                                                                                | Description         |
| --------- | -------- | ------ | --------------------------------------------------------------------------------------------------- | ------------------- |
| currency  | true     | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol |

### Response

| Name    | Type                        | Description                         |
| ------- | --------------------------- | ----------------------------------- |
| id      | integer                     | The id that was sent in the request |
| jsonrpc | string                      | The JSON-RPC version (2.0)          |
| result  | array of [timestamp, value] |

## /public/get_index

Retrieves the current index price for the instruments, for the selected
currency.

This method is deprecated and will be removed in the future.

### Parameters

| Parameter | Required | Type   | Enum                                                                                                | Description         |
| --------- | -------- | ------ | --------------------------------------------------------------------------------------------------- | ------------------- |
| currency  | true     | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol |

### Response

| Name                         | Type            | Description                                                                                                       |
| ---------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------- |
| id                           | integer         | The id that was sent in the request                                                                               |
| jsonrpc                      | string          | The JSON-RPC version (2.0)                                                                                        |
| result                       | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;BTC | number          | The current index price for BTC-USD (only for selected currency == BTC)                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;ETH | number          | The current index price for ETH-USD (only for selected currency == ETH)                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;edp | number          | Estimated delivery price for the currency. For more details, see Documentation &gt; General &gt; Expiration Price |

## /public/get_index_price

Retrieves the current index price value for given index name.

### Parameters

| Parameter  | Required | Type   | Enum                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Description                                                         |
| ---------- | -------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| index_name | true     | string | <code>btc_usd</code><br><code>eth_usd</code><br><code>ada_usdc</code><br><code>algo_usdc</code><br><code>avax_usdc</code><br><code>bch_usdc</code><br><code>bnb_usdc</code><br><code>btc_usdc</code><br><code>btcdvol_usdc</code><br><code>buidl_usdc</code><br><code>doge_usdc</code><br><code>dot_usdc</code><br><code>eurr_usdc</code><br><code>eth_usdc</code><br><code>ethdvol_usdc</code><br><code>link_usdc</code><br><code>ltc_usdc</code><br><code>near_usdc</code><br><code>paxg_usdc</code><br><code>shib_usdc</code><br><code>sol_usdc</code><br><code>steth_usdc</code><br><code>ton_usdc</code><br><code>trump_usdc</code><br><code>trx_usdc</code><br><code>uni_usdc</code><br><code>usde_usdc</code><br><code>usyc_usdc</code><br><code>xrp_usdc</code><br><code>btc_usdt</code><br><code>eth_usdt</code><br><code>eurr_usdt</code><br><code>sol_usdt</code><br><code>steth_usdt</code><br><code>usdc_usdt</code><br><code>usde_usdt</code><br><code>btc_eurr</code><br><code>btc_usde</code><br><code>btc_usyc</code><br><code>eth_btc</code><br><code>eth_eurr</code><br><code>eth_usde</code><br><code>eth_usyc</code><br><code>steth_eth</code><br><code>paxg_btc</code> | Index identifier, matches (base) cryptocurrency with quote currency |

### Response

| Name                                              | Type            | Description                                                                                                     |
| ------------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------- |
| id                                                | integer         | The id that was sent in the request                                                                             |
| jsonrpc                                           | string          | The JSON-RPC version (2.0)                                                                                      |
| result                                            | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;estimated_delivery_price | number          | Estimated delivery price for the market. For more details, see Documentation &gt; General &gt; Expiration Price |
| &nbsp;&nbsp;›&nbsp;&nbsp;index_price              | number          | Value of requested index                                                                                        |

## /public/get_index_price_names

Retrieves the identifiers of all supported Price Indexes

### Parameters

_This method takes no parameters_

### Response

| Name    | Type            | Description                         |
| ------- | --------------- | ----------------------------------- |
| id      | integer         | The id that was sent in the request |
| jsonrpc | string          | The JSON-RPC version (2.0)          |
| result  | array of string |

## /public/get_instrument

Retrieves information about instrument

### Parameters

| Parameter       | Required | Type   | Enum | Description     |
| --------------- | -------- | ------ | ---- | --------------- |
| instrument_name | true     | string |      | Instrument name |

### Response

| Name                                                          | Type            | Description                                                                                                                                                           |
| ------------------------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                            | integer         | The id that was sent in the request                                                                                                                                   |
| jsonrpc                                                       | string          | The JSON-RPC version (2.0)                                                                                                                                            |
| result                                                        | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;base_currency                        | string          | The underlying currency being traded.                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;block_trade_commission               | number          | Block Trade commission for instrument.                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;block_trade_min_trade_amount         | number          | Minimum amount for block trading.                                                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;block_trade_tick_size                | number          | Specifies minimal price change for block trading.                                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;contract_size                        | integer         | Contract size for instrument.                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;counter_currency                     | string          | Counter currency for the instrument.                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp                   | integer         | The time when the instrument was first created (milliseconds since the UNIX epoch).                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;expiration_timestamp                 | integer         | The time when the instrument will expire (milliseconds since the UNIX epoch).                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;future_type                          | string          | Future type (only for futures)(field is deprecated and will be removed in the future, <code>instrument_type</code> should be used instead).                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_id                        | integer         | Instrument ID                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_name                      | string          | Unique instrument identifier                                                                                                                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_type                      | string          | Type of the instrument. <code>linear</code> or <code>reversed</code>                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;is_active                            | boolean         | Indicates if the instrument can currently be traded.                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;kind                                 | string          | Instrument kind: <code>"future"</code>, <code>"option"</code>, <code>"spot"</code>, <code>"future_combo"</code>, <code>"option_combo"</code>                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;maker_commission                     | number          | Maker commission for instrument.                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;max_leverage                         | integer         | Maximal leverage for instrument (only for futures).                                                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;max_liquidation_commission           | number          | Maximal liquidation trade commission for instrument (only for futures).                                                                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;min_trade_amount                     | number          | Minimum amount for trading. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| &nbsp;&nbsp;›&nbsp;&nbsp;option_type                          | string          | The option type (only for options).                                                                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;price_index                          | string          | Name of price index that is used for this instrument                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_currency                       | string          | The currency in which the instrument prices are quoted.                                                                                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;rfq                                  | boolean         | Whether or not RFQ is active on the instrument.                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;settlement_currency                  | string          | Optional (not added for spot). Settlement currency for the instrument.                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;settlement_period                    | string          | Optional (not added for spot). The settlement period.                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;strike                               | number          | The strike value (only for options).                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;taker_commission                     | number          | Taker commission for instrument.                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;tick_size                            | number          | Specifies minimal price change and, as follows, the number of decimal places for instrument prices.                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;tick_size_steps                      | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;above_price | number          | The price from which the increased tick size applies                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;tick_size   | number          | Tick size to be used above the price. It must be multiple of the minimum tick size.                                                                                   |

## /public/get_instruments

Retrieves available trading instruments. This method can be used to see which
instruments are available for trading, or which instruments have recently
expired. **Note - This endpoint has distinct API rate limiting requirements:** 1
request per 10 seconds, with a burst of 5. To avoid rate limits, we recommend
using either the REST requests for server-cached data or the WebSocket
subscription to
[instrument_state.{kind}.{currency}](https://docs.deribit.com/#instrument-state-kind-currency)
for real-time updates. For more information, see
[Rate Limits](https://support.deribit.com/hc/en-us/articles/25944617523357-Rate-Limits).

### Parameters

| Parameter | Required | Type    | Enum                                                                                                                      | Description                                                              |
| --------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| currency  | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code><br><code>any</code>   | The currency symbol or <code>"any"</code> for all                        |
| kind      | false    | string  | <code>future</code><br><code>option</code><br><code>spot</code><br><code>future_combo</code><br><code>option_combo</code> | Instrument kind, if not provided instruments of all kinds are considered |
| expired   | false    | boolean |                                                                                                                           | Set to true to show recently expired instruments instead of active ones. |

### Response

| Name                                                          | Type                     | Description                                                                                                                                                           |
| ------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                            | integer                  | The id that was sent in the request                                                                                                                                   |
| jsonrpc                                                       | string                   | The JSON-RPC version (2.0)                                                                                                                                            |
| result                                                        | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;base_currency                        | string                   | The underlying currency being traded.                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;block_trade_commission               | number                   | Block Trade commission for instrument.                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;block_trade_min_trade_amount         | number                   | Minimum amount for block trading.                                                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;block_trade_tick_size                | number                   | Specifies minimal price change for block trading.                                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;contract_size                        | integer                  | Contract size for instrument.                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;counter_currency                     | string                   | Counter currency for the instrument.                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp                   | integer                  | The time when the instrument was first created (milliseconds since the UNIX epoch).                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;expiration_timestamp                 | integer                  | The time when the instrument will expire (milliseconds since the UNIX epoch).                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;future_type                          | string                   | Future type (only for futures)(field is deprecated and will be removed in the future, <code>instrument_type</code> should be used instead).                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_id                        | integer                  | Instrument ID                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_name                      | string                   | Unique instrument identifier                                                                                                                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_type                      | string                   | Type of the instrument. <code>linear</code> or <code>reversed</code>                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;is_active                            | boolean                  | Indicates if the instrument can currently be traded.                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;kind                                 | string                   | Instrument kind: <code>"future"</code>, <code>"option"</code>, <code>"spot"</code>, <code>"future_combo"</code>, <code>"option_combo"</code>                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;maker_commission                     | number                   | Maker commission for instrument.                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;max_leverage                         | integer                  | Maximal leverage for instrument (only for futures).                                                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;max_liquidation_commission           | number                   | Maximal liquidation trade commission for instrument (only for futures).                                                                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;min_trade_amount                     | number                   | Minimum amount for trading. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| &nbsp;&nbsp;›&nbsp;&nbsp;option_type                          | string                   | The option type (only for options).                                                                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;price_index                          | string                   | Name of price index that is used for this instrument                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;quote_currency                       | string                   | The currency in which the instrument prices are quoted.                                                                                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;rfq                                  | boolean                  | Whether or not RFQ is active on the instrument.                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;settlement_currency                  | string                   | Optional (not added for spot). Settlement currency for the instrument.                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;settlement_period                    | string                   | Optional (not added for spot). The settlement period.                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;strike                               | number                   | The strike value (only for options).                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;taker_commission                     | number                   | Taker commission for instrument.                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;tick_size                            | number                   | Specifies minimal price change and, as follows, the number of decimal places for instrument prices.                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;tick_size_steps                      | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;above_price | number                   | The price from which the increased tick size applies                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;tick_size   | number                   | Tick size to be used above the price. It must be multiple of the minimum tick size.                                                                                   |

## /public/get_last_settlements_by_currency

Retrieves historical settlement, delivery and bankruptcy events coming from all
instruments within a given currency.

### Parameters

| Parameter              | Required | Type    | Enum                                                                                                | Description                                                                    |
| ---------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| currency               | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol                                                            |
| type                   | false    | string  | <code>settlement</code><br><code>delivery</code><br><code>bankruptcy</code>                         | Settlement type                                                                |
| count                  | false    | integer |                                                                                                     | Number of requested items, default - <code>20</code>                           |
| continuation           | false    | string  |                                                                                                     | Continuation token for pagination                                              |
| search_start_timestamp | false    | integer |                                                                                                     | The latest timestamp to return result from (milliseconds since the UNIX epoch) |

### Response

| Name                                                                  | Type                     | Description                                                                                        |
| --------------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| id                                                                    | integer                  | The id that was sent in the request                                                                |
| jsonrpc                                                               | string                   | The JSON-RPC version (2.0)                                                                         |
| result                                                                | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;continuation                                 | string                   | Continuation token for pagination.                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;settlements                                  | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;funded              | number                   | funded amount (bankruptcy only)                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;funding             | number                   | funding (in base currency ; settlement for perpetual product only)                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;index_price         | number                   | underlying index price at time of event (in quote currency; settlement and delivery only)          |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name     | string                   | instrument name (settlement and delivery only)                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mark_price          | number                   | mark price for at the settlement time (in quote currency; settlement and delivery only)            |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;position            | number                   | position size (in quote currency; settlement and delivery only)                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;profit_loss         | number                   | profit and loss (in base currency; settlement and delivery only)                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;session_bankruptcy  | number                   | value of session bankruptcy (in base currency; bankruptcy only)                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;session_profit_loss | number                   | total value of session profit and losses (in base currency)                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;session_tax         | number                   | total amount of paid taxes/fees (in base currency; bankruptcy only)                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;session_tax_rate    | number                   | rate of paid taxes/fees (in base currency; bankruptcy only)                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;socialized          | number                   | the amount of the socialized losses (in base currency; bankruptcy only)                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;timestamp           | integer                  | The timestamp (milliseconds since the Unix epoch)                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;type                | string                   | The type of settlement. <code>settlement</code>, <code>delivery</code> or <code>bankruptcy</code>. |

## /public/get_last_settlements_by_instrument

Retrieves historical public settlement, delivery and bankruptcy events filtered
by instrument name.

### Parameters

| Parameter              | Required | Type    | Enum                                                                        | Description                                                                    |
| ---------------------- | -------- | ------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| instrument_name        | true     | string  |                                                                             | Instrument name                                                                |
| type                   | false    | string  | <code>settlement</code><br><code>delivery</code><br><code>bankruptcy</code> | Settlement type                                                                |
| count                  | false    | integer |                                                                             | Number of requested items, default - <code>20</code>                           |
| continuation           | false    | string  |                                                                             | Continuation token for pagination                                              |
| search_start_timestamp | false    | integer |                                                                             | The latest timestamp to return result from (milliseconds since the UNIX epoch) |

### Response

| Name                                                                  | Type                     | Description                                                                                        |
| --------------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| id                                                                    | integer                  | The id that was sent in the request                                                                |
| jsonrpc                                                               | string                   | The JSON-RPC version (2.0)                                                                         |
| result                                                                | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;continuation                                 | string                   | Continuation token for pagination.                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;settlements                                  | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;funded              | number                   | funded amount (bankruptcy only)                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;funding             | number                   | funding (in base currency ; settlement for perpetual product only)                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;index_price         | number                   | underlying index price at time of event (in quote currency; settlement and delivery only)          |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name     | string                   | instrument name (settlement and delivery only)                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mark_price          | number                   | mark price for at the settlement time (in quote currency; settlement and delivery only)            |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;position            | number                   | position size (in quote currency; settlement and delivery only)                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;profit_loss         | number                   | profit and loss (in base currency; settlement and delivery only)                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;session_bankruptcy  | number                   | value of session bankruptcy (in base currency; bankruptcy only)                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;session_profit_loss | number                   | total value of session profit and losses (in base currency)                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;session_tax         | number                   | total amount of paid taxes/fees (in base currency; bankruptcy only)                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;session_tax_rate    | number                   | rate of paid taxes/fees (in base currency; bankruptcy only)                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;socialized          | number                   | the amount of the socialized losses (in base currency; bankruptcy only)                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;timestamp           | integer                  | The timestamp (milliseconds since the Unix epoch)                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;type                | string                   | The type of settlement. <code>settlement</code>, <code>delivery</code> or <code>bankruptcy</code>. |

## /public/get_last_trades_by_currency

Retrieve the latest trades that have occurred for instruments in a specific
currency symbol.

### Parameters

| Parameter       | Required | Type    | Enum                                                                                                                                                                | Description                                                                                                                                               |
| --------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| currency        | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code>                                                                 | The currency symbol                                                                                                                                       |
| kind            | false    | string  | <code>future</code><br><code>option</code><br><code>spot</code><br><code>future_combo</code><br><code>option_combo</code><br><code>combo</code><br><code>any</code> | Instrument kind, <code>"combo"</code> for any combo or <code>"any"</code> for all. If not provided instruments of all kinds are considered                |
| start_id        | false    | string  |                                                                                                                                                                     | The ID of the first trade to be returned. Number for BTC trades, or hyphen name in ex. <code>"ETH-15"</code> # <code>"ETH_USDC-16"</code>                 |
| end_id          | false    | string  |                                                                                                                                                                     | The ID of the last trade to be returned. Number for BTC trades, or hyphen name in ex. <code>"ETH-15"</code> # <code>"ETH_USDC-16"</code>                  |
| start_timestamp | false    | integer |                                                                                                                                                                     | The earliest timestamp to return result from (milliseconds since the UNIX epoch). When param is provided trades are returned from the earliest            |
| end_timestamp   | false    | integer |                                                                                                                                                                     | The most recent timestamp to return result from (milliseconds since the UNIX epoch). Only one of params: start_timestamp, end_timestamp is truly required |
| count           | false    | integer |                                                                                                                                                                     | Number of requested items, default - <code>10</code>                                                                                                      |
| sorting         | false    | string  | <code>asc</code><br><code>desc</code><br><code>default</code>                                                                                                       | Direction of results sorting (<code>default</code> value means no sorting, results will be returned in order in which they left the database)             |

### Response

| Name                                                                    | Type                     | Description                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                                      | integer                  | The id that was sent in the request                                                                                                                                                                                                                |
| jsonrpc                                                                 | string                   | The JSON-RPC version (2.0)                                                                                                                                                                                                                         |
| result                                                                  | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;has_more                                       | boolean                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;trades                                         | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount                | number                   | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin.                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_id          | integer                  | ID of the Block RFQ - when trade was part of the Block RFQ                                                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade_id        | string                   | Block trade id - when trade was part of a block trade                                                                                                                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade_leg_count | integer                  | Block trade leg count - when trade was part of a block trade                                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_id              | string                   | Optional field containing combo instrument name if the trade is a combo trade                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_trade_id        | number                   | Optional field containing combo trade identifier if the trade is a combo trade                                                                                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;contracts             | number                   | Trade size in contract units (optional, may be absent in historical trades)                                                                                                                                                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction             | string                   | Direction: <code>buy</code>, or <code>sell</code>                                                                                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;index_price           | number                   | Index Price at the moment of trade                                                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name       | string                   | Unique instrument identifier                                                                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;iv                    | number                   | Option implied volatility for the price (Option only)                                                                                                                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidation           | string                   | Optional field (only for trades caused by liquidation): <code>"M"</code> when maker side of trade was under liquidation, <code>"T"</code> when taker side was under liquidation, <code>"MT"</code> when both sides of trade were under liquidation |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mark_price            | number                   | Mark Price at the moment of trade                                                                                                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price                 | number                   | Price in base currency                                                                                                                                                                                                                             |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;tick_direction        | integer                  | Direction of the "tick" (<code>0</code> = Plus Tick, <code>1</code> = Zero-Plus Tick, <code>2</code> = Minus Tick, <code>3</code> = Zero-Minus Tick).                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;timestamp             | integer                  | The timestamp of the trade (milliseconds since the UNIX epoch)                                                                                                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_id              | string                   | Unique (per currency) trade identifier                                                                                                                                                                                                             |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_seq             | integer                  | The sequence number of the trade within instrument                                                                                                                                                                                                 |

## /public/get_last_trades_by_currency_and_time

Retrieve the latest trades that have occurred for instruments in a specific
currency symbol and within a given time range.

**Scope:** `trade:read`

### Parameters

| Parameter       | Required | Type    | Enum                                                                                                                                                                | Description                                                                                                                                               |
| --------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| currency        | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code>                                                                 | The currency symbol                                                                                                                                       |
| kind            | false    | string  | <code>future</code><br><code>option</code><br><code>spot</code><br><code>future_combo</code><br><code>option_combo</code><br><code>combo</code><br><code>any</code> | Instrument kind, <code>"combo"</code> for any combo or <code>"any"</code> for all. If not provided instruments of all kinds are considered                |
| start_timestamp | true     | integer |                                                                                                                                                                     | The earliest timestamp to return result from (milliseconds since the UNIX epoch). When param is provided trades are returned from the earliest            |
| end_timestamp   | true     | integer |                                                                                                                                                                     | The most recent timestamp to return result from (milliseconds since the UNIX epoch). Only one of params: start_timestamp, end_timestamp is truly required |
| count           | false    | integer |                                                                                                                                                                     | Number of requested items, default - <code>10</code>                                                                                                      |
| sorting         | false    | string  | <code>asc</code><br><code>desc</code><br><code>default</code>                                                                                                       | Direction of results sorting (<code>default</code> value means no sorting, results will be returned in order in which they left the database)             |

### Response

| Name                                                                    | Type                     | Description                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                                      | integer                  | The id that was sent in the request                                                                                                                                                                                                                |
| jsonrpc                                                                 | string                   | The JSON-RPC version (2.0)                                                                                                                                                                                                                         |
| result                                                                  | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;has_more                                       | boolean                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;trades                                         | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount                | number                   | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin.                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_id          | integer                  | ID of the Block RFQ - when trade was part of the Block RFQ                                                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade_id        | string                   | Block trade id - when trade was part of a block trade                                                                                                                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade_leg_count | integer                  | Block trade leg count - when trade was part of a block trade                                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_id              | string                   | Optional field containing combo instrument name if the trade is a combo trade                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_trade_id        | number                   | Optional field containing combo trade identifier if the trade is a combo trade                                                                                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;contracts             | number                   | Trade size in contract units (optional, may be absent in historical trades)                                                                                                                                                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction             | string                   | Direction: <code>buy</code>, or <code>sell</code>                                                                                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;index_price           | number                   | Index Price at the moment of trade                                                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name       | string                   | Unique instrument identifier                                                                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;iv                    | number                   | Option implied volatility for the price (Option only)                                                                                                                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidation           | string                   | Optional field (only for trades caused by liquidation): <code>"M"</code> when maker side of trade was under liquidation, <code>"T"</code> when taker side was under liquidation, <code>"MT"</code> when both sides of trade were under liquidation |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mark_price            | number                   | Mark Price at the moment of trade                                                                                                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price                 | number                   | Price in base currency                                                                                                                                                                                                                             |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;tick_direction        | integer                  | Direction of the "tick" (<code>0</code> = Plus Tick, <code>1</code> = Zero-Plus Tick, <code>2</code> = Minus Tick, <code>3</code> = Zero-Minus Tick).                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;timestamp             | integer                  | The timestamp of the trade (milliseconds since the UNIX epoch)                                                                                                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_id              | string                   | Unique (per currency) trade identifier                                                                                                                                                                                                             |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_seq             | integer                  | The sequence number of the trade within instrument                                                                                                                                                                                                 |

## /public/get_last_trades_by_instrument

Retrieve the latest trades that have occurred for a specific instrument.

### Parameters

| Parameter       | Required | Type    | Enum                                                          | Description                                                                                                                                               |
| --------------- | -------- | ------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instrument_name | true     | string  |                                                               | Instrument name                                                                                                                                           |
| start_seq       | false    | integer |                                                               | The sequence number of the first trade to be returned                                                                                                     |
| end_seq         | false    | integer |                                                               | The sequence number of the last trade to be returned                                                                                                      |
| start_timestamp | false    | integer |                                                               | The earliest timestamp to return result from (milliseconds since the UNIX epoch). When param is provided trades are returned from the earliest            |
| end_timestamp   | false    | integer |                                                               | The most recent timestamp to return result from (milliseconds since the UNIX epoch). Only one of params: start_timestamp, end_timestamp is truly required |
| count           | false    | integer |                                                               | Number of requested items, default - <code>10</code>                                                                                                      |
| sorting         | false    | string  | <code>asc</code><br><code>desc</code><br><code>default</code> | Direction of results sorting (<code>default</code> value means no sorting, results will be returned in order in which they left the database)             |

### Response

| Name                                                                    | Type                     | Description                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                                      | integer                  | The id that was sent in the request                                                                                                                                                                                                                |
| jsonrpc                                                                 | string                   | The JSON-RPC version (2.0)                                                                                                                                                                                                                         |
| result                                                                  | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;has_more                                       | boolean                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;trades                                         | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount                | number                   | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin.                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_id          | integer                  | ID of the Block RFQ - when trade was part of the Block RFQ                                                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade_id        | string                   | Block trade id - when trade was part of a block trade                                                                                                                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade_leg_count | integer                  | Block trade leg count - when trade was part of a block trade                                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_id              | string                   | Optional field containing combo instrument name if the trade is a combo trade                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_trade_id        | number                   | Optional field containing combo trade identifier if the trade is a combo trade                                                                                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;contracts             | number                   | Trade size in contract units (optional, may be absent in historical trades)                                                                                                                                                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction             | string                   | Direction: <code>buy</code>, or <code>sell</code>                                                                                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;index_price           | number                   | Index Price at the moment of trade                                                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name       | string                   | Unique instrument identifier                                                                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;iv                    | number                   | Option implied volatility for the price (Option only)                                                                                                                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidation           | string                   | Optional field (only for trades caused by liquidation): <code>"M"</code> when maker side of trade was under liquidation, <code>"T"</code> when taker side was under liquidation, <code>"MT"</code> when both sides of trade were under liquidation |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mark_price            | number                   | Mark Price at the moment of trade                                                                                                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price                 | number                   | Price in base currency                                                                                                                                                                                                                             |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;tick_direction        | integer                  | Direction of the "tick" (<code>0</code> = Plus Tick, <code>1</code> = Zero-Plus Tick, <code>2</code> = Minus Tick, <code>3</code> = Zero-Minus Tick).                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;timestamp             | integer                  | The timestamp of the trade (milliseconds since the UNIX epoch)                                                                                                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_id              | string                   | Unique (per currency) trade identifier                                                                                                                                                                                                             |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_seq             | integer                  | The sequence number of the trade within instrument                                                                                                                                                                                                 |

## /public/get_last_trades_by_instrument_and_time

Retrieve the latest trades that have occurred for a specific instrument and
within a given time range.

### Parameters

| Parameter       | Required | Type    | Enum                                                          | Description                                                                                                                                               |
| --------------- | -------- | ------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instrument_name | true     | string  |                                                               | Instrument name                                                                                                                                           |
| start_timestamp | true     | integer |                                                               | The earliest timestamp to return result from (milliseconds since the UNIX epoch). When param is provided trades are returned from the earliest            |
| end_timestamp   | true     | integer |                                                               | The most recent timestamp to return result from (milliseconds since the UNIX epoch). Only one of params: start_timestamp, end_timestamp is truly required |
| count           | false    | integer |                                                               | Number of requested items, default - <code>10</code>                                                                                                      |
| sorting         | false    | string  | <code>asc</code><br><code>desc</code><br><code>default</code> | Direction of results sorting (<code>default</code> value means no sorting, results will be returned in order in which they left the database)             |

### Response

| Name                                                                    | Type                     | Description                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                                      | integer                  | The id that was sent in the request                                                                                                                                                                                                                |
| jsonrpc                                                                 | string                   | The JSON-RPC version (2.0)                                                                                                                                                                                                                         |
| result                                                                  | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;has_more                                       | boolean                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;trades                                         | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount                | number                   | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin.                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_rfq_id          | integer                  | ID of the Block RFQ - when trade was part of the Block RFQ                                                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade_id        | string                   | Block trade id - when trade was part of a block trade                                                                                                                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;block_trade_leg_count | integer                  | Block trade leg count - when trade was part of a block trade                                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_id              | string                   | Optional field containing combo instrument name if the trade is a combo trade                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;combo_trade_id        | number                   | Optional field containing combo trade identifier if the trade is a combo trade                                                                                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;contracts             | number                   | Trade size in contract units (optional, may be absent in historical trades)                                                                                                                                                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction             | string                   | Direction: <code>buy</code>, or <code>sell</code>                                                                                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;index_price           | number                   | Index Price at the moment of trade                                                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name       | string                   | Unique instrument identifier                                                                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;iv                    | number                   | Option implied volatility for the price (Option only)                                                                                                                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;liquidation           | string                   | Optional field (only for trades caused by liquidation): <code>"M"</code> when maker side of trade was under liquidation, <code>"T"</code> when taker side was under liquidation, <code>"MT"</code> when both sides of trade were under liquidation |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;mark_price            | number                   | Mark Price at the moment of trade                                                                                                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price                 | number                   | Price in base currency                                                                                                                                                                                                                             |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;tick_direction        | integer                  | Direction of the "tick" (<code>0</code> = Plus Tick, <code>1</code> = Zero-Plus Tick, <code>2</code> = Minus Tick, <code>3</code> = Zero-Minus Tick).                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;timestamp             | integer                  | The timestamp of the trade (milliseconds since the UNIX epoch)                                                                                                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_id              | string                   | Unique (per currency) trade identifier                                                                                                                                                                                                             |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;trade_seq             | integer                  | The sequence number of the trade within instrument                                                                                                                                                                                                 |

## /public/get_mark_price_history

Public request for 5min history of markprice values for the instrument. For now
the markprice history is available only for a subset of options which take part
in the volatility index calculations. All other instruments, futures and
perpetuals will return an empty list.

### Parameters

| Parameter       | Required | Type    | Enum | Description                                                                         |
| --------------- | -------- | ------- | ---- | ----------------------------------------------------------------------------------- |
| instrument_name | true     | string  |      | Instrument name                                                                     |
| start_timestamp | true     | integer |      | The earliest timestamp to return result from (milliseconds since the UNIX epoch)    |
| end_timestamp   | true     | integer |      | The most recent timestamp to return result from (milliseconds since the UNIX epoch) |

### Response

| Name    | Type    | Description                                                                                                                                     |
| ------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| id      | integer | The id that was sent in the request                                                                                                             |
| jsonrpc | string  | The JSON-RPC version (2.0)                                                                                                                      |
| result  | array   | Markprice history values as an array of arrays with 2 values each. The inner values correspond to the timestamp in ms and the markprice itself. |

## /public/get_order_book

Retrieves the order book, along with other market values for a given instrument.

### Parameters

| Parameter       | Required | Type    | Enum                                                                                                                                                     | Description                                                                                                                                                         |
| --------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instrument_name | true     | string  |                                                                                                                                                          | The instrument name for which to retrieve the order book, see <a href="#public-get_instruments"><code>public/get_instruments</code></a> to obtain instrument names. |
| depth           | false    | integer | <code>1</code><br><code>5</code><br><code>10</code><br><code>20</code><br><code>50</code><br><code>100</code><br><code>1000</code><br><code>10000</code> | The number of entries to return for bids and asks.                                                                                                                  |

### Response

| Name                                                           | Type                     | Description                                                                                                                                                                                                            |
| -------------------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                             | integer                  | The id that was sent in the request                                                                                                                                                                                    |
| jsonrpc                                                        | string                   | The JSON-RPC version (2.0)                                                                                                                                                                                             |
| result                                                         | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;ask_iv                                | number                   | (Only for option) implied volatility for best ask                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;asks                                  | array of [price, amount] | List of asks                                                                                                                                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;best_ask_amount                       | number                   | It represents the requested order size of all best asks                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;best_ask_price                        | number                   | The current best ask price, <code>null</code> if there aren't any asks                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;best_bid_amount                       | number                   | It represents the requested order size of all best bids                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;best_bid_price                        | number                   | The current best bid price, <code>null</code> if there aren't any bids                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;bid_iv                                | number                   | (Only for option) implied volatility for best bid                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;bids                                  | array of [price, amount] | List of bids                                                                                                                                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;current_funding                       | number                   | Current funding (perpetual only)                                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;delivery_price                        | number                   | The settlement price for the instrument. Only when <code>state = closed</code>                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;funding_8h                            | number                   | Funding 8h (perpetual only)                                                                                                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;greeks                                | <em>object</em>          | Only for options                                                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;delta        | number                   | (Only for option) The delta value for the option                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;gamma        | number                   | (Only for option) The gamma value for the option                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;rho          | number                   | (Only for option) The rho value for the option                                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;theta        | number                   | (Only for option) The theta value for the option                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;vega         | number                   | (Only for option) The vega value for the option                                                                                                                                                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;index_price                           | number                   | Current index price                                                                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_name                       | string                   | Unique instrument identifier                                                                                                                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;interest_rate                         | number                   | Interest rate used in implied volatility calculations (options only)                                                                                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;last_price                            | number                   | The price for the last trade                                                                                                                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;mark_iv                               | number                   | (Only for option) implied volatility for mark price                                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;mark_price                            | number                   | The mark price for the instrument                                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;max_price                             | number                   | The maximum price for the future. Any buy orders you submit higher than this price, will be clamped to this maximum.                                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;min_price                             | number                   | The minimum price for the future. Any sell orders you submit lower than this price will be clamped to this minimum.                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;open_interest                         | number                   | The total amount of outstanding contracts in the corresponding amount units. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| &nbsp;&nbsp;›&nbsp;&nbsp;settlement_price                      | number                   | Optional (not added for spot). The settlement price for the instrument. Only when <code>state = open</code>                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;state                                 | string                   | The state of the order book. Possible values are <code>open</code> and <code>closed</code>.                                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;stats                                 | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;high         | number                   | Highest price during 24h                                                                                                                                                                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;low          | number                   | Lowest price during 24h                                                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price_change | number                   | 24-hour price change expressed as a percentage, <code>null</code> if there weren't any trades                                                                                                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;volume       | number                   | Volume during last 24h in base currency                                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;volume_usd   | number                   | Volume in usd (futures only)                                                                                                                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;timestamp                             | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;underlying_index                      | number                   | Name of the underlying future, or <code>index_price</code> (options only)                                                                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;underlying_price                      | number                   | Underlying price for implied volatility calculations (options only)                                                                                                                                                    |

## /public/get_order_book_by_instrument_id

Retrieves the order book, along with other market values for a given instrument
ID.

### Parameters

| Parameter     | Required | Type    | Enum                                                                                                                                                     | Description                                                                                                                                                     |
| ------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instrument_id | true     | integer |                                                                                                                                                          | The instrument ID for which to retrieve the order book, see <a href="#public-get_instruments"><code>public/get_instruments</code></a> to obtain instrument IDs. |
| depth         | false    | integer | <code>1</code><br><code>5</code><br><code>10</code><br><code>20</code><br><code>50</code><br><code>100</code><br><code>1000</code><br><code>10000</code> | The number of entries to return for bids and asks.                                                                                                              |

### Response

| Name                                                           | Type                     | Description                                                                                                                                                                                                            |
| -------------------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                             | integer                  | The id that was sent in the request                                                                                                                                                                                    |
| jsonrpc                                                        | string                   | The JSON-RPC version (2.0)                                                                                                                                                                                             |
| result                                                         | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;ask_iv                                | number                   | (Only for option) implied volatility for best ask                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;asks                                  | array of [price, amount] | List of asks                                                                                                                                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;best_ask_amount                       | number                   | It represents the requested order size of all best asks                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;best_ask_price                        | number                   | The current best ask price, <code>null</code> if there aren't any asks                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;best_bid_amount                       | number                   | It represents the requested order size of all best bids                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;best_bid_price                        | number                   | The current best bid price, <code>null</code> if there aren't any bids                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;bid_iv                                | number                   | (Only for option) implied volatility for best bid                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;bids                                  | array of [price, amount] | List of bids                                                                                                                                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;current_funding                       | number                   | Current funding (perpetual only)                                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;delivery_price                        | number                   | The settlement price for the instrument. Only when <code>state = closed</code>                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;funding_8h                            | number                   | Funding 8h (perpetual only)                                                                                                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;greeks                                | <em>object</em>          | Only for options                                                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;delta        | number                   | (Only for option) The delta value for the option                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;gamma        | number                   | (Only for option) The gamma value for the option                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;rho          | number                   | (Only for option) The rho value for the option                                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;theta        | number                   | (Only for option) The theta value for the option                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;vega         | number                   | (Only for option) The vega value for the option                                                                                                                                                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;index_price                           | number                   | Current index price                                                                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_name                       | string                   | Unique instrument identifier                                                                                                                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;interest_rate                         | number                   | Interest rate used in implied volatility calculations (options only)                                                                                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;last_price                            | number                   | The price for the last trade                                                                                                                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;mark_iv                               | number                   | (Only for option) implied volatility for mark price                                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;mark_price                            | number                   | The mark price for the instrument                                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;max_price                             | number                   | The maximum price for the future. Any buy orders you submit higher than this price, will be clamped to this maximum.                                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;min_price                             | number                   | The minimum price for the future. Any sell orders you submit lower than this price will be clamped to this minimum.                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;open_interest                         | number                   | The total amount of outstanding contracts in the corresponding amount units. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| &nbsp;&nbsp;›&nbsp;&nbsp;settlement_price                      | number                   | Optional (not added for spot). The settlement price for the instrument. Only when <code>state = open</code>                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;state                                 | string                   | The state of the order book. Possible values are <code>open</code> and <code>closed</code>.                                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;stats                                 | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;high         | number                   | Highest price during 24h                                                                                                                                                                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;low          | number                   | Lowest price during 24h                                                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price_change | number                   | 24-hour price change expressed as a percentage, <code>null</code> if there weren't any trades                                                                                                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;volume       | number                   | Volume during last 24h in base currency                                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;volume_usd   | number                   | Volume in usd (futures only)                                                                                                                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;timestamp                             | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;underlying_index                      | number                   | Name of the underlying future, or <code>index_price</code> (options only)                                                                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;underlying_price                      | number                   | Underlying price for implied volatility calculations (options only)                                                                                                                                                    |

## /public/get_rfqs

Retrieve active RFQs for instruments in given currency.

### Parameters

| Parameter | Required | Type   | Enum                                                                                                                      | Description                                                              |
| --------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| currency  | true     | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code>                       | The currency symbol                                                      |
| kind      | false    | string | <code>future</code><br><code>option</code><br><code>spot</code><br><code>future_combo</code><br><code>option_combo</code> | Instrument kind, if not provided instruments of all kinds are considered |

### Response

| Name                                        | Type                     | Description                                                                                                                                                                       |
| ------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                          | integer                  | The id that was sent in the request                                                                                                                                               |
| jsonrpc                                     | string                   | The JSON-RPC version (2.0)                                                                                                                                                        |
| result                                      | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;amount             | number                   | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_name    | string                   | Unique instrument identifier                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;last_rfq_timestamp | integer                  | The timestamp of last RFQ (milliseconds since the Unix epoch)                                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;side               | string                   | Side - <code>buy</code> or <code>sell</code>                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;traded_volume      | number                   | Volume traded since last RFQ                                                                                                                                                      |

## /public/get_supported_index_names

Retrieves the identifiers of all supported Price Indexes

### Parameters

| Parameter | Required | Type   | Enum                                                             | Description                          |
| --------- | -------- | ------ | ---------------------------------------------------------------- | ------------------------------------ |
| type      | false    | string | <code>all</code><br><code>spot</code><br><code>derivative</code> | Type of a cryptocurrency price index |

### Response

| Name    | Type            | Description                         |
| ------- | --------------- | ----------------------------------- |
| id      | integer         | The id that was sent in the request |
| jsonrpc | string          | The JSON-RPC version (2.0)          |
| result  | array of string |

## /public/get_trade_volumes

Retrieves aggregated 24h trade volumes for different instrument types and
currencies.

### Parameters

| Parameter | Required | Type    | Enum | Description                                                                           |
| --------- | -------- | ------- | ---- | ------------------------------------------------------------------------------------- |
| extended  | false    | boolean |      | Request for extended statistics. Including also 7 and 30 days volumes (default false) |

### Response

| Name                                        | Type                     | Description                                                               |
| ------------------------------------------- | ------------------------ | ------------------------------------------------------------------------- |
| id                                          | integer                  | The id that was sent in the request                                       |
| jsonrpc                                     | string                   | The JSON-RPC version (2.0)                                                |
| result                                      | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;calls_volume       | number                   | Total 24h trade volume for call options.                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;calls_volume_30d   | number                   | Total 30d trade volume for call options.                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;calls_volume_7d    | number                   | Total 7d trade volume for call options.                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency           | string                   | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code> |
| &nbsp;&nbsp;›&nbsp;&nbsp;futures_volume     | number                   | Total 24h trade volume for futures.                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;futures_volume_30d | number                   | Total 30d trade volume for futures.                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;futures_volume_7d  | number                   | Total 7d trade volume for futures.                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;puts_volume        | number                   | Total 24h trade volume for put options.                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;puts_volume_30d    | number                   | Total 30d trade volume for put options.                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;puts_volume_7d     | number                   | Total 7d trade volume for put options.                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;spot_volume        | number                   | Total 24h trade for spot.                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;spot_volume_30d    | number                   | Total 30d trade for spot.                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;spot_volume_7d     | number                   | Total 7d trade for spot.                                                  |

## /public/get_tradingview_chart_data

Publicly available market data used to generate a TradingView candle chart.

### Parameters

| Parameter       | Required | Type    | Enum                                                                                                                                                                                                                              | Description                                                                                                           |
| --------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| instrument_name | true     | string  |                                                                                                                                                                                                                                   | Instrument name                                                                                                       |
| start_timestamp | true     | integer |                                                                                                                                                                                                                                   | The earliest timestamp to return result from (milliseconds since the UNIX epoch)                                      |
| end_timestamp   | true     | integer |                                                                                                                                                                                                                                   | The most recent timestamp to return result from (milliseconds since the UNIX epoch)                                   |
| resolution      | true     | string  | <code>1</code><br><code>3</code><br><code>5</code><br><code>10</code><br><code>15</code><br><code>30</code><br><code>60</code><br><code>120</code><br><code>180</code><br><code>360</code><br><code>720</code><br><code>1D</code> | Chart bars resolution given in full minutes or keyword <code>1D</code> (only some specific resolutions are supported) |

### Response

| Name                            | Type             | Description                                                    |
| ------------------------------- | ---------------- | -------------------------------------------------------------- |
| id                              | integer          | The id that was sent in the request                            |
| jsonrpc                         | string           | The JSON-RPC version (2.0)                                     |
| result                          | <em>object</em>  |
| &nbsp;&nbsp;›&nbsp;&nbsp;close  | array of number  | List of prices at close (one per candle)                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;cost   | array of number  | List of cost bars (volume in quote currency, one per candle)   |
| &nbsp;&nbsp;›&nbsp;&nbsp;high   | array of number  | List of highest price levels (one per candle)                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;low    | array of number  | List of lowest price levels (one per candle)                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;open   | array of number  | List of prices at open (one per candle)                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;status | string           | Status of the query: <code>ok</code> or <code>no_data</code>   |
| &nbsp;&nbsp;›&nbsp;&nbsp;ticks  | array of integer | Values of the time axis given in milliseconds since UNIX epoch |
| &nbsp;&nbsp;›&nbsp;&nbsp;volume | array of number  | List of volume bars (in base currency, one per candle)         |

## /public/get_volatility_index_data

Public market data request for volatility index candles.

### Parameters

| Parameter       | Required | Type    | Enum                                                                                                | Description                                                                                                     |
| --------------- | -------- | ------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| currency        | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol                                                                                             |
| start_timestamp | true     | integer |                                                                                                     | The earliest timestamp to return result from (milliseconds since the UNIX epoch)                                |
| end_timestamp   | true     | integer |                                                                                                     | The most recent timestamp to return result from (milliseconds since the UNIX epoch)                             |
| resolution      | true     | string  | <code>1</code><br><code>60</code><br><code>3600</code><br><code>43200</code><br><code>1D</code>     | Time resolution given in full seconds or keyword <code>1D</code> (only some specific resolutions are supported) |

### Response

| Name                                  | Type            | Description                                                                                                                                                                      |
| ------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                    | integer         | The id that was sent in the request                                                                                                                                              |
| jsonrpc                               | string          | The JSON-RPC version (2.0)                                                                                                                                                       |
| result                                | <em>object</em> | Volatility index candles.                                                                                                                                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;continuation | integer         | Continuation - to be used as the <code>end_timestamp</code> parameter on the next request. <code>NULL</code> when no continuation.                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;data         | array           | Candles as an array of arrays with 5 values each. The inner values correspond to the timestamp in ms, open, high, low, and close values of the volatility index correspondingly. |

## /public/ticker

Get ticker for an instrument.

### Parameters

| Parameter       | Required | Type   | Enum | Description     |
| --------------- | -------- | ------ | ---- | --------------- |
| instrument_name | true     | string |      | Instrument name |

### Response

| Name                                                           | Type            | Description                                                                                                                                                                                                            |
| -------------------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                             | integer         | The id that was sent in the request                                                                                                                                                                                    |
| jsonrpc                                                        | string          | The JSON-RPC version (2.0)                                                                                                                                                                                             |
| result                                                         | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;ask_iv                                | number          | (Only for option) implied volatility for best ask                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;best_ask_amount                       | number          | It represents the requested order size of all best asks                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;best_ask_price                        | number          | The current best ask price, <code>null</code> if there aren't any asks                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;best_bid_amount                       | number          | It represents the requested order size of all best bids                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;best_bid_price                        | number          | The current best bid price, <code>null</code> if there aren't any bids                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;bid_iv                                | number          | (Only for option) implied volatility for best bid                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;current_funding                       | number          | Current funding (perpetual only)                                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;delivery_price                        | number          | The settlement price for the instrument. Only when <code>state = closed</code>                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;estimated_delivery_price              | number          | Estimated delivery price for the market. For more details, see Contract Specification &gt; General Documentation &gt; Expiration Price                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;funding_8h                            | number          | Funding 8h (perpetual only)                                                                                                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;greeks                                | <em>object</em> | Only for options                                                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;delta        | number          | (Only for option) The delta value for the option                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;gamma        | number          | (Only for option) The gamma value for the option                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;rho          | number          | (Only for option) The rho value for the option                                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;theta        | number          | (Only for option) The theta value for the option                                                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;vega         | number          | (Only for option) The vega value for the option                                                                                                                                                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;index_price                           | number          | Current index price                                                                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_name                       | string          | Unique instrument identifier                                                                                                                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;interest_rate                         | number          | Interest rate used in implied volatility calculations (options only)                                                                                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;interest_value                        | number          | Value used to calculate <code>realized_funding</code> in positions (perpetual only)                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;last_price                            | number          | The price for the last trade                                                                                                                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;mark_iv                               | number          | (Only for option) implied volatility for mark price                                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;mark_price                            | number          | The mark price for the instrument                                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;max_price                             | number          | The maximum price for the future. Any buy orders you submit higher than this price, will be clamped to this maximum.                                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;min_price                             | number          | The minimum price for the future. Any sell orders you submit lower than this price will be clamped to this minimum.                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;open_interest                         | number          | The total amount of outstanding contracts in the corresponding amount units. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| &nbsp;&nbsp;›&nbsp;&nbsp;settlement_price                      | number          | Optional (not added for spot). The settlement price for the instrument. Only when <code>state = open</code>                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;state                                 | string          | The state of the order book. Possible values are <code>open</code> and <code>closed</code>.                                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;stats                                 | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;high         | number          | Highest price during 24h                                                                                                                                                                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;low          | number          | Lowest price during 24h                                                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price_change | number          | 24-hour price change expressed as a percentage, <code>null</code> if there weren't any trades                                                                                                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;volume       | number          | Volume during last 24h in base currency                                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;volume_usd   | number          | Volume in usd (futures only)                                                                                                                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;timestamp                             | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;underlying_index                      | number          | Name of the underlying future, or <code>index_price</code> (options only)                                                                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;underlying_price                      | number          | Underlying price for implied volatility calculations (options only)                                                                                                                                                    |

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
| 11021       | <code>"post_only_price_modification_not_possible"</code>                | Price modification for post only order is not possible.                                                                                                                                                                  |
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
| 11055       | <code>"post_only_not_allowed"</code>                                    | Post only flag not allowed for given order type.                                                                                                                                                                         |
| 11056       | <code>"unauthenticated_public_requests_temporarily_disabled"</code>     | Request rejected because of unauthenticated public requests were temporarily disabled.                                                                                                                                   |
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
| 13032       | <code>"non_unique_order_label"</code>                                   | Request allowed only for orders uniquely identified by given label, more than one match was foun.                                                                                                                        |
| 13034       | <code>"no_more_security_keys_allowed"</code>                            | Maximal number of tokens allowed reached.                                                                                                                                                                                |
| 13035       | <code>"active_combo_limit_reached"</code>                               | Limit of active combo books was reached. The client should wait some time before retrying the request.                                                                                                                   |
| 13036       | <code>"unavailable_for_combo_books"</code>                              | Action is temporarily unavailable for combo books.                                                                                                                                                                       |
| 13037       | <code>"incomplete_KYC_data"</code>                                      | KYC verification data is insufficient for external service provider.                                                                                                                                                     |
| 13040       | <code>"mmp_required"</code>                                             | User is not a MMP user.                                                                                                                                                                                                  |
| 13042       | <code>"cod_not_enabled"</code>                                          | Cancel-on-Disconnect is not enabled for the connection.                                                                                                                                                                  |
| 13043       | <code>"quotes_frozen"</code>                                            | Quotes are still frozen after previous cancel.                                                                                                                                                                           |
| 13403       | <code>"scope_exceeded"</code>                                           | Error returned after the user tried to edit / delete an API key using an authorized key connection with insufficient scope.                                                                                              |
| 13503       | <code>"unavailable"</code>                                              | Method is currently not available.                                                                                                                                                                                       |
| 13666       | <code>"request_cancelled_by_user"</code>                                | Request was cancelled by the user with other api request.                                                                                                                                                                |
| 13777       | <code>"replaced"</code>                                                 | Edit request was replaced by other one.                                                                                                                                                                                  |
| 13778       | <code>"raw_subscriptions_not_available_for_unauthorized"</code>         | Raw subscriptions are not available for unauthorized requests.                                                                                                                                                           |
| 13780       | <code>"move_positions_over_limit"</code>                                | The client cannot execute the request yet, and should wait for <code>wait</code> seconds to try again.                                                                                                                   |
| 13781       | <code>"coupon_already_used"</code>                                      | The coupon has already been used by current account.                                                                                                                                                                     |
| 13791       | <code>"KYC_transfer_already_initiated"</code>                           | Sharing of KYC data with a third party provider was already initiated.                                                                                                                                                   |
| 13792       | <code>"incomplete_KYC_data"</code>                                      | User's KYC data stored on the platform is insufficient for sharing according to third party provider.                                                                                                                    |
| 13793       | <code>"KYC_data_inaccessible"</code>                                    | User's KYC data is inaccessible at the moment. Client should try again later.                                                                                                                                            |
| 13888       | <code>"timed_out"</code>                                                | Server did not manage to process request when it was valid (<code>valid_until</code>).                                                                                                                                   |
| 13901       | <code>"no_more_oto_orders"</code>                                       | Total limit of open "one triggers other" orders has been exceeded.                                                                                                                                                       |
| 13902       | <code>"mass_quotes_disabled"</code>                                     | Mass Quotes feature disabled for this user and currency.                                                                                                                                                                 |
| 13903       | <code>"too_many_quotes"</code>                                          | Number of quotes (in Mass Quotes requests) per second exceeded.                                                                                                                                                          |
| 13904       | <code>"security_key_setup_required"</code>                              | Not allowed without a full security key setup.                                                                                                                                                                           |
| 13905       | <code>"too_many_quotes_per_block_rfq"</code>                            | Number of quotes for single block rfq exceeded.                                                                                                                                                                          |
| 13906       | <code>"too_many_quotes_per_block_rfq_side"</code>                       | Number of quotes per single block rfq side exceeded.                                                                                                                                                                     |
| 13907       | <code>"not_fully_filled"</code>                                         | Block Rfq trade cannot be fully filled with matched quotes.                                                                                                                                                              |
| 13907       | <code>"too_many_open_block_rfqs"</code>                                 | Number of open block rfq by taker exceeds configured max amount.                                                                                                                                                         |
| 13910       | <code>"quote_crossed"</code>                                            | Quote placed by the maker crosses an already placed quote by the same maker.                                                                                                                                             |
| 13911       | <code>"max_broker_client_count"</code>                                  | Number of broker client's exceeds allowed max amount.                                                                                                                                                                    |
| 13912       | <code>"broker_cannot_be_client"</code>                                  | Broker accounts cannot be clients of other brokers.                                                                                                                                                                      |
| 13913       | <code>"broker_already_linked"</code>                                    | User has already been linked to this broker.                                                                                                                                                                             |
| 13914       | <code>"user_is_a_broker_client"</code>                                  | User is a client of a broker account.                                                                                                                                                                                    |
| 13915       | <code>"user_is_not_a_broker"</code>                                     | User account is not configured as broker account.                                                                                                                                                                        |
| 13916       | <code>"app_registered_to_broker"</code>                                 | Application is registered to a broker.                                                                                                                                                                                   |
| 13917       | <code>"account_quote_limit_crossed"</code>                              | Block Rfq quote limits set for the account were crossed.                                                                                                                                                                 |
| 13918       | <code>"inverse_future_cross_trading"</code>                             | Placed block rfq quote would cross trade inverse futures with block rfq quote limits set on the account.                                                                                                                 |
| 13919       | <code>"client_of_main_account"</code>                                   | Subaccounts of brokers cannot be linked to their own broker account.                                                                                                                                                     |
| -32602      | <code>"Invalid params"</code>                                           | See JSON-RPC spec.                                                                                                                                                                                                       |
| -32600      | <code>"request entity too large"</code>                                 | Error thrown when body size in POST request or single frame in websocket connection frame exceeds the limit (32 kB).                                                                                                     |
| -32601      | <code>"Method not found"</code>                                         | See JSON-RPC spec.                                                                                                                                                                                                       |
| -32700      | <code>"Parse error"</code>                                              | See JSON-RPC spec.                                                                                                                                                                                                       |
| -32000      | <code>"Missing params"</code>                                           | See JSON-RPC spec.                                                                                                                                                                                                       |
