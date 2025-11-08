# JSON-RPC

JSON-RPC is a light-weight remote procedure call (RPC) protocol. The
[JSON-RPC specification](https://www.jsonrpc.org/specification) defines the data
structures that are used for the messages that are exchanged between client and
server, as well as the rules around their processing. JSON-RPC uses JSON
(RFC 4627) as data format.

JSON-RPC is transport agnostic: it does not specify which transport mechanism
must be used. The Deribit API supports both Websocket (preferred) and HTTP (with
limitations: subscriptions are not supported over HTTP).

**Websocket** is the preferred transport mechanism for the JSON-RPC API, because
it is faster and because it can support [subscriptions](#subscriptions) and
[cancel on disconnect](#private-enable_cancel_on_disconnect). The code examples
that can be found next to each of the methods show how websockets can be used
from Python or Javascript/node.js.

Besides websockets it is also possible to use the API via **HTTP**. The code
examples for 'shell' show how this can be done using curl. Note that
subscriptions and cancel on disconnect are not supported via HTTP.

## Request messages

According to the JSON-RPC specification the requests must be JSON objects with
the following fields.

| Name    | Type              | Description                                                                                                                                                                                                                                                       |
| ------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| jsonrpc | string            | The version of the JSON-RPC spec: "2.0"                                                                                                                                                                                                                           |
| id      | integer or string | An identifier of the request. If it is included, then the response will contain the same identifier. The identifier must be unique for each request if you want to correctly match responses to requests — especially important when using WebSocket connections. |
| method  | string            | The method to be invoked                                                                                                                                                                                                                                          |
| params  | object            | The parameters values for the method. The field names must match with the expected parameter names. The parameters that are expected are described in the documentation for the methods, below.                                                                   |

The JSON-RPC specification describes two features that are currently not
supported by the API:

- Specification of parameter values by position
- Batch requests

## Response messages

The JSON-RPC API always responds with a JSON object with the following fields.

| Name    | Type         | Description                                                                                                       |
| ------- | ------------ | ----------------------------------------------------------------------------------------------------------------- |
| id      | integer      | This is the same id that was sent in the request.                                                                 |
| result  | any          | If successful, the result of the API call. The format for the result is described with each method.               |
| error   | error object | Only present if there was an error invoking the method. The error object is described below.                      |
| testnet | boolean      | Indicates whether the API in use is actually the test API. `false` for production server, `true` for test server. |
| usIn    | integer      | The timestamp when the requests was received (microseconds since the Unix epoch)                                  |
| usOut   | integer      | The timestamp when the response was sent (microseconds since the Unix epoch)                                      |
| usDiff  | integer      | The number of microseconds that was spent handling the request                                                    |

The fields `testnet`, `usIn`, `usOut` and `usDiff` are not part of the JSON-RPC
standard.

In order not to clutter the examples they will generally be omitted from the
example code.

In case of an error the response message will contain the error field, with as
value an object with the following with the following fields:

| Name    | Type    | Description                                                 |
| ------- | ------- | ----------------------------------------------------------- |
| code    | integer | A number that indicates the kind of error.                  |
| message | string  | A short description that indicates the kind of error.       |
| data    | any     | Additional data about the error. This field may be omitted. |

## Detailed response for `private/cancel_all*` and `private/cancel_by_label` methods

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

## Security keys

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

### TFA authorization

When the user chooses TFA authorization, he should read the TFA code from his
application, and it should be added to original requests parameters as
`authorization_data`. It is required to add to parameters `challenge` too. Then
request should be repeated with those updated parameters.

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

## Notifications

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

**📖 Related Support Article:**
[API Authentication Guide](https://support.deribit.com/hc/en-us/articles/29748629634205-API-Authentication-Guide)

The API consists of `public` and `private` methods. The public methods do not
require authentication. The private methods use OAuth 2.0 authentication. This
means that a valid OAuth access token must be included in the request, which can
be achieved by calling method [public/auth](#public-auth).

When the token was assigned to the user, it should be passed along, with other
request parameters, back to the server:

| Connection type | Access token placement                                     |
| --------------- | ---------------------------------------------------------- |
| **Websocket**   | Inside request JSON parameters, as an `access_token` field |
| **HTTP (REST)** | Header `Authorization: bearer``Token` value                |

### Basic User Credentials

Every `private` method can be accessed by providing an HTTP
`Authorization: Basic XXX` header with user `ClientId` and assigned
`ClientSecret` (both values can be found on the
[API page on the Deribit website](https://www.deribit.com/account/BTC/api))
encoded with `Base64`:

`Authorization: Basic BASE64(ClientId + : + ClientSecret)`

This is the easiest way of authenticating HTTP (REST) requests. If you don't
like the fact that you are sending ClientSecret over HTTPS connection, you can
consider using one of the authorization methods described below.

### Deribit Signature Credentials

The Deribit service provides a dedicated authorization method that uses
user-generated signatures to increase security when passing request data. The
generated value is passed in the `Authorization` header:

`Authorization: deri-hmac-sha256 id=ClientId, ts=Timestamp, sig=Signature, nonce=Nonce`

where:

| Deribit credential | Description                                                                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _ClientId_         | Can be found on the [API page on the Deribit website](https://www.deribit.com/account/BTC/api) (the user can configure up to 8 different `IDs` - with different privileges)          |
| _Timestamp_        | Time when the request was generated - given as **milliseconds**. It's valid for **60 seconds** since generation, after that time any request with an old timestamp will be rejected. |
| _Signature_        | Value for signature calculated as described below                                                                                                                                    |
| _Nonce_            | Single usage, user generated initialization vector for the server token                                                                                                              |

### Signature Credentials (WebSocket API)

When connecting through Websocket, user can request for authorization using
`client_signature` method, which requires providing following parameters (as a
part of JSON request):

| JSON parameter | Description                                                                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _grant_type_   | Must be **client_signature**                                                                                                                                                         |
| _client_id_    | Can be found on the [API page on the Deribit website](https://www.deribit.com/account/BTC/api) (the user can configure up to 8 different `IDs` - with different privileges)          |
| _timestamp_    | Time when the request was generated - given as **milliseconds**. It's valid for **60 seconds** since generation, after that time any request with an old timestamp will be rejected. |
| _signature_    | Value for signature calculated as described below                                                                                                                                    |
| _nonce_        | Single usage, user generated initialization vector for the server token                                                                                                              |
| _data_         | **Optional** field, which contains any user specific value                                                                                                                           |

You can also check the signature value using some online tools like, e.g:
[https://codebeautify.org/hmac-generator](https://codebeautify.org/hmac-generator)
(remember that you **should use** it only with your **test credentials**).

## Access scope

When requesting an `access token`, users can specify the required access level
(called `scope`) which defines what type of functionality they want to use, and
whether requests will only read data or also modify it.

Scopes are required and validated for `private` methods. If you only plan to use
`public` methods, you can use the default scope values.

**📖 Related Support Article:**
[Connection Management](https://support.deribit.com/hc/en-us/articles/25944603459613-Connection-Management)

| Scope                                                                      | Description                                                                                                                                                                                                                                                 |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Session Management**                                                     |                                                                                                                                                                                                                                                             |
| _mainaccount_                                                              | Set **automatically** by the server when the connecting user's credentials belong to the main account, otherwise not included in the final scope.                                                                                                           |
| _connection_                                                               | Access is granted for the duration of the connection (or until expiration). When the connection closes, users must repeat authentication to get new tokens. Set automatically by the server when neither **connection** nor **session** scope is specified. |
| _session:name_                                                             | Creates a new session with the specified _name_, generating tokens bound to the session. Allows reconnection and token reuse within session lifetime. Maximum 16 sessions per user.                                                                         |
| For **WebSocket**: enables skipping `access_token` in subsequent requests. |
| **Core API Access**                                                        |                                                                                                                                                                                                                                                             |
| _account:read_                                                             | Read-only access to **account** methods and data.                                                                                                                                                                                                           |
| _account:read_write_                                                       | Full access to **account** methods - manage settings, add subaccounts, etc.                                                                                                                                                                                 |
| _trade:read_                                                               | Read-only access to **trading** methods and data.                                                                                                                                                                                                           |
| _trade:read_write_                                                         | Full access to **trading** methods - create and modify orders.                                                                                                                                                                                              |
| _wallet:read_                                                              | Read-only access to **wallet** methods and data.                                                                                                                                                                                                            |
| _wallet:read_write_                                                        | Full access to **wallet** methods - withdraw, generate deposit addresses, etc.                                                                                                                                                                              |
| **Block Trading**                                                          |                                                                                                                                                                                                                                                             |
| _block_trade:read_                                                         | Read-only access to block trading information.                                                                                                                                                                                                              |
| _block_trade:read_write_                                                   | Full access to create and manage block trades.                                                                                                                                                                                                              |
| **Block RFQ**                                                              |                                                                                                                                                                                                                                                             |
| _block_rfq:read_                                                           | Read-only access to Block RFQ information, quotes and available makers.                                                                                                                                                                                     |
| _block_rfq:read_write_                                                     | Full access to create and quote Block RFQs.                                                                                                                                                                                                                 |
| **Access Restrictions**                                                    |                                                                                                                                                                                                                                                             |
| _wallet:none_, _account:none_, _trade:none_                                | Explicitly block access to specified functionality.                                                                                                                                                                                                         |
| _expires:NUMBER_                                                           | Set token expiration time to `NUMBER` seconds.                                                                                                                                                                                                              |
| _ip:ADDR_                                                                  | Restrict token usage to specific IPv4 address. Use `*` to allow all IP addresses.                                                                                                                                                                           |

**⚠️ NOTICE:** Depending on choosing an authentication method (`grant type`)
some scopes could be narrowed by the server or limited by user API key
configured scope, e.g. when `grant_type = client_credentials` and
`scope = wallet:read_write` could be modified by the server as
`scope = wallet:read`.

**The user shouldn't assume that requested values are blindly accepted and
should verify assigned scopes.**

## Creating/editing/removing API Keys

**📖 Related Support Article:**
[Creating new API key on Deribit](https://support.deribit.com)

Creating, editing and removing API Keys is available only with access tokens
with scope `account:read_write`. Additionally when the methods of the API Key
management are called with access token with scope set than server ensures that
we do allow to create/remove/manage (or show client secrets in case of
`private/list_api_keys`) the keys up to the same level of the scopes as calling
set from access token. If not error `scope_exceeded` (code: 13403) is returned.
