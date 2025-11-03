# Deribit Market Data Documentation

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

Enable Cancel On Disconnect for the connection. After enabling, all orders
created via this connection will be automatically cancelled when the connection
is closed.

Cancel is triggered in the following cases: when the TCP connection is properly
terminated, when the connection is closed due to 10 minutes of inactivity, or
when a heartbeat detects a disconnection. To reduce the inactivity timeout,
consider using
[public/set_heartbeat](https://docs.deribit.com/#public-set_heartbeat).

**Note**: If the connection is gracefully closed using
[private/logout](https://docs.deribit.com/#private-logout), cancel-on-disconnect
will **not** be triggered.

**Notice**: Cancel-on-Disconnect does not affect orders created by other
connections - they will remain active! When change is applied on the `account`
scope, then every newly opened connection will start with **active** Cancel on
Disconnect.

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

**📖 Related Support Article:**
[Market Data Collection Best Practices](https://support.deribit.com/hc/en-us/articles/29592500256669-Market-Data-Collection-Best-Practices)

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

Unsubscribe from one or more channels. The response contains only the channels
that were successfully unsubscribed in this request.

**Note:** The `result` field in the response contains only the channels that
were successfully processed and unsubscribed from this specific request. It does
not include all previously subscribed topics. If a channel in the request is
invalid, not subscribed, or fails validation, it will not appear in the result.

### Parameters

| Parameter | Required | Type  | Enum | Description                                                                                                     |
| --------- | -------- | ----- | ---- | --------------------------------------------------------------------------------------------------------------- |
| channels  | true     | array |      | A list of channels to unsubscribe from. Only successfully unsubscribed channels will be returned in the result. |

### Response

| Name    | Type            | Description                                                          |
| ------- | --------------- | -------------------------------------------------------------------- |
| id      | integer         |
| jsonrpc | string          |
| result  | array of string | List of channels that were successfully unsubscribed in this request |

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

**📖 Related Support Article:**
[Market Data Collection Best Practices](https://support.deribit.com/hc/en-us/articles/29592500256669-Market-Data-Collection-Best-Practices)

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
yield-generating tokens (`USDE`, `STETH`, `USDC`, `BUILD`).

**📖 Related Support Article:**
[Yield reward-bearing coins](https://support.deribit.com/hc/en-us/articles/26525792475677-Yield-reward-bearing-coins)

### Parameters

| Parameter | Required | Type    | Enum                                                                               | Description                                                                     |
| --------- | -------- | ------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| currency  | true     | string  | <code>usde</code><br><code>steth</code><br><code>usdc</code><br><code>build</code> | Currency for which to retrieve APR history                                      |
| limit     | false    | integer |                                                                                    | Number of days to retrieve (default <code>365</code>, maximum <code>365</code>) |
| before    | false    | integer |                                                                                    | Used to receive APR history before given epoch day                              |

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

| Name                                                    | Type                     | Description                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                      | integer                  | The id that was sent in the request                                                                                                                                                                                                                                                                     |
| jsonrpc                                                 | string                   | The JSON-RPC version (2.0)                                                                                                                                                                                                                                                                              |
| result                                                  | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;apr                            | number                   | Simple Moving Average (SMA) of the last 7 days of rewards. If fewer than 7 days of reward data are available, the APR is calculated as the average of the available rewards. Only applicable to yield-generating tokens (<code>USDE</code>, <code>STETH</code>, <code>USDC</code>, <code>BUILD</code>). |
| &nbsp;&nbsp;›&nbsp;&nbsp;coin_type                      | string                   | The type of the currency.                                                                                                                                                                                                                                                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency                       | string                   | The abbreviation of the currency. This abbreviation is used elsewhere in the API to identify the currency.                                                                                                                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency_long                  | string                   | The full name for the currency.                                                                                                                                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;decimals                       | integer                  | The number of decimal places for the currency                                                                                                                                                                                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;in_cross_collateral_pool       | boolean                  | <code>true</code> if the currency is part of the cross collateral pool                                                                                                                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;min_confirmations              | integer                  | Minimum number of block chain confirmations before deposit is accepted.                                                                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;min_withdrawal_fee             | number                   | The minimum transaction fee paid for withdrawals                                                                                                                                                                                                                                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;network_currency               | string                   | The currency of the network                                                                                                                                                                                                                                                                             |
| &nbsp;&nbsp;›&nbsp;&nbsp;network_fee                    | number                   | The network fee                                                                                                                                                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;withdrawal_fee                 | number                   | The total transaction fee paid for withdrawals                                                                                                                                                                                                                                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;withdrawal_priorities          | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;name  | string                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;value | number                   |

## /public/get_delivery_prices

Retrieves delivery prices for then given index

### Parameters

| Parameter  | Required | Type    | Enum                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Description                                                                       |
| ---------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| index_name | true     | string  | <code>btc_usd</code><br><code>eth_usd</code><br><code>ada_usdc</code><br><code>algo_usdc</code><br><code>avax_usdc</code><br><code>bch_usdc</code><br><code>bnb_usdc</code><br><code>btc_usdc</code><br><code>btcdvol_usdc</code><br><code>buidl_usdc</code><br><code>doge_usdc</code><br><code>dot_usdc</code><br><code>eurr_usdc</code><br><code>eth_usdc</code><br><code>ethdvol_usdc</code><br><code>link_usdc</code><br><code>ltc_usdc</code><br><code>near_usdc</code><br><code>paxg_usdc</code><br><code>shib_usdc</code><br><code>sol_usdc</code><br><code>steth_usdc</code><br><code>ton_usdc</code><br><code>trump_usdc</code><br><code>trx_usdc</code><br><code>uni_usdc</code><br><code>usde_usdc</code><br><code>usyc_usdc</code><br><code>xrp_usdc</code><br><code>btc_usdt</code><br><code>eth_usdt</code><br><code>eurr_usdt</code><br><code>sol_usdt</code><br><code>steth_usdt</code><br><code>usdc_usdt</code><br><code>usde_usdt</code><br><code>btc_eurr</code><br><code>btc_usde</code><br><code>btc_usyc</code><br><code>eth_btc</code><br><code>eth_eurr</code><br><code>eth_usde</code><br><code>eth_usyc</code><br><code>steth_eth</code><br><code>paxg_btc</code><br><code>drbfix-btc_usdc</code><br><code>drbfix-eth_usdc</code> | Index identifier, matches (base) cryptocurrency with quote currency               |
| offset     | false    | integer |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | The offset for pagination, default - <code>0</code>                               |
| count      | false    | integer |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Number of requested items, default - <code>10</code>, maximum - <code>1000</code> |

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

| Parameter     | Required | Type   | Enum                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Description                                                                                  |
| ------------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| currency      | true     | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>any</code><br><code>grouped</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | The currency symbol or <code>"any"</code> for all or '"grouped"' for all grouped by currency |
| kind          | true     | string | <code>future</code><br><code>option</code><br><code>any</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Instrument kind, <code>"future"</code> or <code>"option"</code> or <code>"any"</code>        |
| currency_pair | false    | string | <code>btc_usd</code><br><code>eth_usd</code><br><code>ada_usdc</code><br><code>algo_usdc</code><br><code>avax_usdc</code><br><code>bch_usdc</code><br><code>bnb_usdc</code><br><code>btc_usdc</code><br><code>btcdvol_usdc</code><br><code>buidl_usdc</code><br><code>doge_usdc</code><br><code>dot_usdc</code><br><code>eurr_usdc</code><br><code>eth_usdc</code><br><code>ethdvol_usdc</code><br><code>link_usdc</code><br><code>ltc_usdc</code><br><code>near_usdc</code><br><code>paxg_usdc</code><br><code>shib_usdc</code><br><code>sol_usdc</code><br><code>steth_usdc</code><br><code>ton_usdc</code><br><code>trump_usdc</code><br><code>trx_usdc</code><br><code>uni_usdc</code><br><code>usde_usdc</code><br><code>usyc_usdc</code><br><code>xrp_usdc</code><br><code>btc_usdt</code><br><code>eth_usdt</code><br><code>eurr_usdt</code><br><code>sol_usdt</code><br><code>steth_usdt</code><br><code>usdc_usdt</code><br><code>usde_usdt</code><br><code>btc_eurr</code><br><code>btc_usde</code><br><code>btc_usyc</code><br><code>eth_btc</code><br><code>eth_eurr</code><br><code>eth_usde</code><br><code>eth_usyc</code><br><code>steth_eth</code><br><code>paxg_btc</code><br><code>drbfix-btc_usdc</code><br><code>drbfix-eth_usdc</code> | The currency pair symbol                                                                     |

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

| Parameter  | Required | Type   | Enum                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Description                                                         |
| ---------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| index_name | true     | string | <code>btc_usd</code><br><code>eth_usd</code><br><code>ada_usdc</code><br><code>algo_usdc</code><br><code>avax_usdc</code><br><code>bch_usdc</code><br><code>bnb_usdc</code><br><code>btc_usdc</code><br><code>btcdvol_usdc</code><br><code>buidl_usdc</code><br><code>doge_usdc</code><br><code>dot_usdc</code><br><code>eurr_usdc</code><br><code>eth_usdc</code><br><code>ethdvol_usdc</code><br><code>link_usdc</code><br><code>ltc_usdc</code><br><code>near_usdc</code><br><code>paxg_usdc</code><br><code>shib_usdc</code><br><code>sol_usdc</code><br><code>steth_usdc</code><br><code>ton_usdc</code><br><code>trump_usdc</code><br><code>trx_usdc</code><br><code>uni_usdc</code><br><code>usde_usdc</code><br><code>usyc_usdc</code><br><code>xrp_usdc</code><br><code>btc_usdt</code><br><code>eth_usdt</code><br><code>eurr_usdt</code><br><code>sol_usdt</code><br><code>steth_usdt</code><br><code>usdc_usdt</code><br><code>usde_usdt</code><br><code>btc_eurr</code><br><code>btc_usde</code><br><code>btc_usyc</code><br><code>eth_btc</code><br><code>eth_eurr</code><br><code>eth_usde</code><br><code>eth_usyc</code><br><code>steth_eth</code><br><code>paxg_btc</code><br><code>drbfix-btc_usdc</code><br><code>drbfix-eth_usdc</code> | Index identifier, matches (base) cryptocurrency with quote currency |

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

| Parameter | Required | Type    | Enum | Description                                                                                                                                                                      |
| --------- | -------- | ------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| extended  | false    | boolean |      | When set to <code>true</code>, returns additional information including <code>future_combo_creation_enabled</code> and <code>option_combo_creation_enabled</code> for each index |

### Response

| Name                                                   | Type                     | Description                                                                                                         |
| ------------------------------------------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| id                                                     | integer                  | The id that was sent in the request                                                                                 |
| jsonrpc                                                | string                   | The JSON-RPC version (2.0)                                                                                          |
| result                                                 | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;future_combo_creation_enabled | boolean                  | Whether future combo creation is enabled for this index (only present when <code>extended</code>=<code>true</code>) |
| &nbsp;&nbsp;›&nbsp;&nbsp;name                          | string                   | Index name                                                                                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;option_combo_creation_enabled | boolean                  | Whether option combo creation is enabled for this index (only present when <code>extended</code>=<code>true</code>) |

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

| Parameter              | Required | Type    | Enum                                                                                                | Description                                                                       |
| ---------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| currency               | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol                                                               |
| type                   | false    | string  | <code>settlement</code><br><code>delivery</code><br><code>bankruptcy</code>                         | Settlement type                                                                   |
| count                  | false    | integer |                                                                                                     | Number of requested items, default - <code>20</code>, maximum - <code>1000</code> |
| continuation           | false    | string  |                                                                                                     | Continuation token for pagination                                                 |
| search_start_timestamp | false    | integer |                                                                                                     | The latest timestamp to return result from (milliseconds since the UNIX epoch)    |

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

| Parameter              | Required | Type    | Enum                                                                        | Description                                                                       |
| ---------------------- | -------- | ------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| instrument_name        | true     | string  |                                                                             | Instrument name                                                                   |
| type                   | false    | string  | <code>settlement</code><br><code>delivery</code><br><code>bankruptcy</code> | Settlement type                                                                   |
| count                  | false    | integer |                                                                             | Number of requested items, default - <code>20</code>, maximum - <code>1000</code> |
| continuation           | false    | string  |                                                                             | Continuation token for pagination                                                 |
| search_start_timestamp | false    | integer |                                                                             | The latest timestamp to return result from (milliseconds since the UNIX epoch)    |

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
| count           | false    | integer |                                                                                                                                                                     | Number of requested items, default - <code>10</code>, maximum - <code>1000</code>                                                                         |
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
| count           | false    | integer |                                                                                                                                                                     | Number of requested items, default - <code>10</code>, maximum - <code>1000</code>                                                                         |
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
| count           | false    | integer |                                                               | Number of requested items, default - <code>10</code>, maximum - <code>1000</code>                                                                         |
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
| count           | false    | integer |                                                               | Number of requested items, default - <code>10</code>, maximum - <code>1000</code>                                                                         |
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
| depth           | false    | integer | <code>1</code><br><code>5</code><br><code>10</code><br><code>20</code><br><code>50</code><br><code>100</code><br><code>1000</code><br><code>10000</code> | The number of entries to return for bids and asks, maximum - <code>10000</code>.                                                                                    |

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
| depth         | false    | integer | <code>1</code><br><code>5</code><br><code>10</code><br><code>20</code><br><code>50</code><br><code>100</code><br><code>1000</code><br><code>10000</code> | The number of entries to return for bids and asks, maximum - <code>10000</code>.                                                                                |

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

## /public/get_supported_index_names

Retrieves the identifiers of all supported Price Indexes

### Parameters

| Parameter | Required | Type   | Enum                                                             | Description                          |
| --------- | -------- | ------ | ---------------------------------------------------------------- | ------------------------------------ |
| type      | false    | string | <code>all</code><br><code>spot</code><br><code>derivative</code> | Type of a cryptocurrency price index |

### Response

| Name                                                   | Type                     | Description                                                                                                         |
| ------------------------------------------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| id                                                     | integer                  | The id that was sent in the request                                                                                 |
| jsonrpc                                                | string                   | The JSON-RPC version (2.0)                                                                                          |
| result                                                 | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;future_combo_creation_enabled | boolean                  | Whether future combo creation is enabled for this index (only present when <code>extended</code>=<code>true</code>) |
| &nbsp;&nbsp;›&nbsp;&nbsp;name                          | string                   | Index name                                                                                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;option_combo_creation_enabled | boolean                  | Whether option combo creation is enabled for this index (only present when <code>extended</code>=<code>true</code>) |

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
