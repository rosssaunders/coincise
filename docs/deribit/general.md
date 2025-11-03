# Deribit General API Documentation

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

To see the list of your API keys check the
[Account > API](https://www.deribit.com/account/BTC/api) tab, where you'll also
find a link to [API Console](https://test.deribit.com/api_console/) which allows
you to test JSON-RPC API, both via HTTP and Websocket.

**Quick access links:**

- [API Management](https://www.deribit.com/account/BTC/api) - Manage your API
  keys and settings
- [Test Environment](https://test.deribit.com) - Testing environment for API
  development
- [Production](https://www.deribit.com) - Production trading platform
- [API Console](https://test.deribit.com/api_console/) - Interactive API testing
  tool
- [Support Center](https://support.deribit.com) - Documentation and help
  articles
- [Rate Limits](https://support.deribit.com/hc/en-us/articles/25944617523357-Rate-Limits) -
  API usage limits and guidelines
- [Error Codes](#rpc-error-codes) - HTTP and Websocket RPC Error codes

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

**Websocket** is the preferred transport mechanism for the JSON-RPC API, because
it is faster and because it can support [subscriptions](#subscriptions) and
[cancel on disconnect](#private-enable_cancel_on_disconnect). The code examples
that can be found next to each of the methods show how websockets can be used
from Python or Javascript/node.js.

Besides websockets it is also possible to use the API via **HTTP**. The code
examples for 'shell' show how this can be done using curl. Note that
subscriptions and cancel on disconnect are not supported via HTTP.

## Request messages

> An example of a request message:

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

**📖 Related Support Article:**
[API Authentication Guide](https://support.deribit.com/hc/en-us/articles/29748629634205-API-Authentication-Guide)

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

> The signature is generated by the following formula:

> Example of authorization using `client_signature`:

The Deribit service provides a dedicated authorization method that uses
user-generated signatures to increase security when passing request data. The
generated value is passed in the `Authorization` header:

`Authorization: deri-hmac-sha256 id=ClientId, ts=Timestamp, sig=Signature, nonce=Nonce`

where:

| Deribit credential | Description                                                                                                                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <em>ClientId</em>  | Can be found on the <a href="https://www.deribit.com/account/BTC/api">API page on the Deribit website</a> (the user can configure up to 8 different <code>IDs</code> - with different privileges)              |
| <em>Timestamp</em> | Time when the request was generated - given as <strong>milliseconds</strong>. It's valid for <strong>60 seconds</strong> since generation, after that time any request with an old timestamp will be rejected. |
| <em>Signature</em> | Value for signature calculated as described below                                                                                                                                                              |
| <em>Nonce</em>     | Single usage, user generated initialization vector for the server token                                                                                                                                        |

### Signature Credentials (WebSocket API)

> The WebSocket API signature is generated by the following formula:

> Example of WebSocket API authorization using `client_signature`:

> Websocket API JSON request created using the values from the shell example
> above:

When connecting through Websocket, user can request for authorization using
`client_signature` method, which requires providing following parameters (as a
part of JSON request):

| JSON parameter      | Description                                                                                                                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <em>grant_type</em> | Must be <strong>client_signature</strong>                                                                                                                                                                      |
| <em>client_id</em>  | Can be found on the <a href="https://www.deribit.com/account/BTC/api">API page on the Deribit website</a> (the user can configure up to 8 different <code>IDs</code> - with different privileges)              |
| <em>timestamp</em>  | Time when the request was generated - given as <strong>milliseconds</strong>. It's valid for <strong>60 seconds</strong> since generation, after that time any request with an old timestamp will be rejected. |
| <em>signature</em>  | Value for signature calculated as described below                                                                                                                                                              |
| <em>nonce</em>      | Single usage, user generated initialization vector for the server token                                                                                                                                        |
| <em>data</em>       | <strong>Optional</strong> field, which contains any user specific value                                                                                                                                        |

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

| Scope                                                            | Description                                                                                                                                                                                                                                                                                      |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <strong>Session Management</strong>                              |
| <em>mainaccount</em>                                             | Set <strong>automatically</strong> by the server when the connecting user's credentials belong to the main account, otherwise not included in the final scope.                                                                                                                                   |
| <em>connection</em>                                              | Access is granted for the duration of the connection (or until expiration). When the connection closes, users must repeat authentication to get new tokens. Set automatically by the server when neither <strong>connection</strong> nor <strong>session</strong> scope is specified.            |
| <em>session:name</em>                                            | Creates a new session with the specified <em>name</em>, generating tokens bound to the session. Allows reconnection and token reuse within session lifetime. Maximum 16 sessions per user.<br>For <strong>WebSocket</strong>: enables skipping <code>access_token</code> in subsequent requests. |
| <strong>Core API Access</strong>                                 |
| <em>account:read</em>                                            | Read-only access to <strong>account</strong> methods and data.                                                                                                                                                                                                                                   |
| <em>account:read_write</em>                                      | Full access to <strong>account</strong> methods - manage settings, add subaccounts, etc.                                                                                                                                                                                                         |
| <em>trade:read</em>                                              | Read-only access to <strong>trading</strong> methods and data.                                                                                                                                                                                                                                   |
| <em>trade:read_write</em>                                        | Full access to <strong>trading</strong> methods - create and modify orders.                                                                                                                                                                                                                      |
| <em>wallet:read</em>                                             | Read-only access to <strong>wallet</strong> methods and data.                                                                                                                                                                                                                                    |
| <em>wallet:read_write</em>                                       | Full access to <strong>wallet</strong> methods - withdraw, generate deposit addresses, etc.                                                                                                                                                                                                      |
| <strong>Block Trading</strong>                                   |
| <em>block_trade:read</em>                                        | Read-only access to block trading information.                                                                                                                                                                                                                                                   |
| <em>block_trade:read_write</em>                                  | Full access to create and manage block trades.                                                                                                                                                                                                                                                   |
| <strong>Block RFQ</strong>                                       |
| <em>block_rfq:read</em>                                          | Read-only access to Block RFQ information, quotes and available makers.                                                                                                                                                                                                                          |
| <em>block_rfq:read_write</em>                                    | Full access to create and quote Block RFQs.                                                                                                                                                                                                                                                      |
| <strong>Access Restrictions</strong>                             |
| <em>wallet:none</em>, <em>account:none</em>, <em>trade:none</em> | Explicitly block access to specified functionality.                                                                                                                                                                                                                                              |
| <em>expires:NUMBER</em>                                          | Set token expiration time to <code>NUMBER</code> seconds.                                                                                                                                                                                                                                        |
| <em>ip:ADDR</em>                                                 | Restrict token usage to specific IPv4 address. Use <code>\*</code> to allow all IP addresses.                                                                                                                                                                                                    |

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
