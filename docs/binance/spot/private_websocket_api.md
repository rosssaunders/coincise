# Binance Spot Private Websocket API Documentation

## User Data Streams for Binance

**Last Updated: 2025-08-12**

- There are currently two ways to subscribe to the User Data Stream:
  - **\[Preferred\]** Subscribing directly through the
    [WebSocket API](/docs/binance-spot-api-docs/websocket-api/user-data-stream-requests#user_data_stream_subscribe)
    using an API Key.
  - **\[Deprecated\]** Generating a **listen key** using
    [the REST API](/docs/binance-spot-api-docs/rest-api/account-endpoints#user-data-stream-requests)
    or
    [the WebSocket API](/docs/binance-spot-api-docs/websocket-api/user-data-stream-requests#user-data-stream-requests)
    and using it to listen on **stream.binance.com**
- Both sources will push all events related to your account **in real-time**.
- How to use a listen key on **stream.binance.com**:
  - The base endpoint is: **wss://stream.binance.com:9443** or
    **wss://stream.binance.com:443**.
  - A single connection to **stream.binance.com** is only valid for 24 hours;
    expect to be disconnected at the 24 hour mark.
  - User Data Streams are accessed at **/ws/<listenKey>** or
    **/stream?streams=<listenKey>**
  - All time and timestamp related fields in the JSON payload are **milliseconds
    by default**. To receive the information in microseconds, please add the
    parameter `timeUnit=MICROSECOND` or `timeUnit=microsecond` in the connection
    URL.
    - For example `/ws/<listenKey>?timeUnit=MICROSECOND`

### User Data Stream Events

#### Account Update

`outboundAccountPosition` is sent any time an account balance has changed and
contains the assets that were possibly changed by the event that generated the
balance change.

```json
{
  "e": "outboundAccountPosition", // Event type
  "E": 1564034571105, // Event Time
  "u": 1564034571073, // Time of last account update
  "B": [
    // Balances Array
    {
      "a": "ETH", // Asset
      "f": "10000.000000", // Free
      "l": "0.000000" // Locked
    }
  ]
}
```

#### Balance Update

Balance Update occurs during the following:

- Deposits or withdrawals from the account
- Transfer of funds between accounts (e.g. Spot to Margin)

**Payload**

```json
{
  "e": "balanceUpdate", // Event Type
  "E": 1573200697110, // Event Time
  "a": "BTC", // Asset
  "d": "100.00000000", // Balance Delta
  "T": 1573200697068 // Clear Time
}
```

#### Order Update

Orders are updated with the `executionReport` event.

**Payload:**

```json
{
  "e": "executionReport", // Event type
  "E": 1499405658658, // Event time
  "s": "ETHBTC", // Symbol
  "c": "mUvoqJxFIILMdfAW5iGSOW", // Client order ID
  "S": "BUY", // Side
  "o": "LIMIT", // Order type
  "f": "GTC", // Time in force
  "q": "1.00000000", // Order quantity
  "p": "0.10264410", // Order price
  "P": "0.00000000", // Stop price
  "F": "0.00000000", // Iceberg quantity
  "g": -1, // OrderListId
  "C": "", // Original client order ID; This is the ID of the order being canceled
  "x": "NEW", // Current execution type
  "X": "NEW", // Current order status
  "r": "NONE", // Order reject reason; Please see Order Reject Reason (below) for more information.
  "i": 4293153, // Order ID
  "l": "0.00000000", // Last executed quantity
  "z": "0.00000000", // Cumulative filled quantity
  "L": "0.00000000", // Last executed price
  "n": "0", // Commission amount
  "N": null, // Commission asset
  "T": 1499405658657, // Transaction time
  "t": -1, // Trade ID
  "v": 3, // Prevented Match Id; This is only visible if the order expired due to STP
  "I": 8641984, // Execution Id
  "w": true, // Is the order on the book?
  "m": false, // Is this trade the maker side?
  "M": false, // Ignore
  "O": 1499405658657, // Order creation time
  "Z": "0.00000000", // Cumulative quote asset transacted quantity
  "Y": "0.00000000", // Last quote asset transacted quantity (i.e. lastPrice * lastQty)
  "Q": "0.00000000", // Quote Order Quantity
  "W": 1499405658657, // Working Time; This is only visible if the order has been placed on the book.
  "V": "NONE" // SelfTradePreventionMode
}
```

**Note:** Average price can be found by doing `Z` divided by `z`.

##### Conditional Fields in Execution Report

These are fields that appear in the payload only if certain conditions are met.

For additional information on these parameters, please refer to the
[Spot Glossary](/docs/binance-spot-api-docs/faqs/spot_glossary).

| | | -d | -Trailing Delta | -Appears only for trailing stop orders. | -"d": 4
-D | -Trailing Time | -"D": 1668680518494 -j | -Strategy Id | -Appears only if
the strategyId parameter was provided upon order placement. | -"j": 1 -J |
-Strategy Type | -Appears only if the strategyType parameter was provided upon
order placement. | -"J": 1000000 -v | -Prevented Match Id | -Appears only for
orders that expired due to STP. | -"v": 3 -A | -Prevented Quantity |
-"A":"3.000000" -B | -Last Prevented Quantity | -"B":"3.000000" -u | -Trade
Group Id | -"u":1 -U | -Counter Order Id | -"U":37 -Cs | -Counter Symbol |
-"Cs": "BTCUSDT" -pl | -Prevented Execution Quantity | -"pl":"2.123456" -pL |
-Prevented Execution Price | -"pL":"0.10000001" -pY | -Prevented Execution Quote
Qty | -"pY":"0.21234562" -W | -Working Time | -Appears when the order is working
on the book | -"W": 1668683798379 -b | -Match Type | -Appears for orders that
have allocations | -"b":"ONE_PARTY_TRADE_REPORT" -a | -Allocation ID | -"a":1234
-k | -Working Floor | -Appears for orders that potentially have allocations |
-"k":"SOR" -uS | -UsedSor | -Appears for orders that used SOR | -"uS":true -gP |
-Pegged Price Type | -Appears only for Pegged Orders | -"gP": "PRIMARY_PEG" -gOT
| -Pegged offset Type | -"gOT": "PRICE_LEVEL" -gOV | -Pegged Offset Value |
-"gOV": 5 -gp | -Pegged Price | -"gp": "1.00000000" |

##### Order Reject Reason

For additional details, look up the Error Message in the
[Errors](/docs/binance-spot-api-docs/errors#other-errors) documentation.

| Rejection Reason (`r`)                   | Error Message                                                     |
| ---------------------------------------- | ----------------------------------------------------------------- |
| \-`NONE`                                 | \-N/A (i.e. The order was not rejected.)                          |
| \-`INSUFFICIENT_BALANCES`                | \-"Account has insufficient balance for requested action."        |
| \-`STOP_PRICE_WOULD_TRIGGER_IMMEDIATELY` | \-"Order would trigger immediately."                              |
| \-`WOULD_MATCH_IMMEDIATELY`              | \-"Order would immediately match and take."                       |
| \-`OCO_BAD_PRICES`                       | \-"The relationship of the prices for the orders is not correct." |

If the order is an order list, an event named `ListStatus` will be sent in
addition to the `executionReport` event.

**Payload**

```json
{
  "e": "listStatus", // Event Type
  "E": 1564035303637, // Event Time
  "s": "ETHBTC", // Symbol
  "g": 2, // OrderListId
  "c": "OCO", // Contingency Type
  "l": "EXEC_STARTED", // List Status Type
  "L": "EXECUTING", // List Order Status
  "r": "NONE", // List Reject Reason
  "C": "F4QN4G8DlFATFlIUQ0cjdD", // List Client Order ID
  "T": 1564035303625, // Transaction Time
  "O": [
    // An array of objects
    {
      "s": "ETHBTC", // Symbol
      "i": 17, // OrderId
      "c": "AJYsMjErWJesZvqlJCTUgL" // ClientOrderId
    },
    {
      "s": "ETHBTC",
      "i": 18,
      "c": "bfYPSQdLoqAJeNrOr9adzq"
    }
  ]
}
```

**Execution types:**

- `NEW` - The order has been accepted into the engine.
- `CANCELED` - The order has been canceled by the user.
- `REPLACED` - The order has been amended.
- `REJECTED` - The order has been rejected and was not processed (e.g. Cancel
  Replace Orders wherein the new order placement is rejected but the request to
  cancel request succeeds.)
- `TRADE` - Part of the order or all of the order's quantity has filled.
- `EXPIRED` - The order was canceled according to the order type's rules (e.g.
  LIMIT FOK orders with no fill, LIMIT IOC or MARKET orders that partially fill)
  or by the exchange, (e.g. orders canceled during liquidation, orders canceled
  during maintenance).
- `TRADE_PREVENTION` - The order has expired due to STP.

Check the [Enums page](/docs/binance-spot-api-docs/enums) for more relevant enum
definitions.

#### Listen Key Expired

This event is sent when the listen key expires.

No more events will be sent after this until a new `listenKey` is created.

This event will not be pushed when the stream is closed normally.

**Payload:**

```json
{
  "e": "listenKeyExpired", // Event type
  "E": 1699596037418, // Event time
  "listenKey": "OfYGbUzi3PraNagEkdKuFwUHn48brFsItTdsuiIXrucEvD0rhRXZ7I6URWfE8YE8"
}
```

### Event Stream Terminated

This event appears only when subscribed on the WebSocket API.

`eventStreamTerminated` is sent when the User Data Stream is stopped. For
example, after you send a `userDataStream.unsubscribe` request, or a
`session.logout` request.

**Payload:**

```json
{
  "event": {
    "e": "eventStreamTerminated", // Event Type
    "E": 1728973001334 // Event Time
  }
}
```

### External Lock Update

`externalLockUpdate` is sent when part of your spot wallet balance is
locked/unlocked by an external system, for example when used as margin
collateral.

**Payload:**

```json
{
  "e": "externalLockUpdate", // Event Type
  "E": 1581557507324, // Event Time
  "a": "NEO", // Asset
  "d": "10.00000000", // Delta
  "T": 1581557507268 // Transaction Time
}
```

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/user-data-stream](https://developers.binance.com/docs/binance-spot-api-docs/user-data-stream)

## Error codes for Binance

**Last Updated: 2025-08-12**

Errors consist of two parts: an error code and a message. Codes are universal,
but messages can vary. Here is the error JSON payload:

```json
{
  "code": -1121,
  "msg": "Invalid symbol."
}
```

| Code   | Name                                     | Description                                                                                                                                                                                                                                                                                                                                   |
| ------ | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \-1000 | \-UNKNOWN​                               | \-An unknown error occurred while processing the request.                                                                                                                                                                                                                                                                                     |
| \-1001 | \-DISCONNECTED​                          | \-Internal error; unable to process your request. Please try again.                                                                                                                                                                                                                                                                           |
| \-1002 | \-UNAUTHORIZED​                          | \-You are not authorized to execute this request.                                                                                                                                                                                                                                                                                             |
| \-1003 | \-TOO_MANY_REQUESTS​                     | \-- Too many requests queued. - Too much request weight used; current limit is %s request weight per %s. Please use WebSocket Streams for live updates to avoid polling the API. - Way too much request weight used; IP banned until %s. Please use WebSocket Streams for live updates to avoid bans.                                         |
| \-1006 | \-UNEXPECTED_RESP​                       | \-An unexpected response was received from the message bus. Execution status unknown.                                                                                                                                                                                                                                                         |
| \-1007 | \-TIMEOUT​                               | \-Timeout waiting for response from backend server. Send status unknown; execution status unknown.                                                                                                                                                                                                                                            |
| \-1008 | \-SERVER_BUSY​                           | \-Server is currently overloaded with other requests. Please try again in a few minutes.                                                                                                                                                                                                                                                      |
| \-1013 | \-INVALID_MESSAGE​                       | \-- The request is rejected by the API. (i.e. The request didn't reach the Matching Engine.) - Potential error messages can be found in [Filter Failures](/docs/binance-spot-api-docs/errors#filter-failures) or [Failures during order placement](/docs/binance-spot-api-docs/errors#other-errors).                                          |
| \-1014 | \-UNKNOWN_ORDER_COMPOSITION​             | \-Unsupported order combination.                                                                                                                                                                                                                                                                                                              |
| \-1015 | \-TOO_MANY_ORDERS​                       | \-- Too many new orders. - Too many new orders; current limit is %s orders per %s.                                                                                                                                                                                                                                                            |
| \-1016 | \-SERVICE_SHUTTING_DOWN​                 | \-This service is no longer available.                                                                                                                                                                                                                                                                                                        |
| \-1020 | \-UNSUPPORTED_OPERATION​                 | \-This operation is not supported.                                                                                                                                                                                                                                                                                                            |
| \-1021 | \-INVALID_TIMESTAMP​                     | \-- Timestamp for this request is outside of the recvWindow. - Timestamp for this request was 1000ms ahead of the server's time.                                                                                                                                                                                                              |
| \-1022 | \-INVALID_SIGNATURE​                     | \-Signature for this request is not valid.                                                                                                                                                                                                                                                                                                    |
| \-1033 | \-COMP_ID_IN_USE​                        | \-`SenderCompId(49)` is currently in use. Concurrent use of the same SenderCompId within one account is not allowed.                                                                                                                                                                                                                          |
| \-1034 | \-TOO_MANY_CONNECTIONS​                  | \-- Too many concurrent connections; current limit is '%s'. - Too many connection attempts for account; current limit is %s per '%s'. - Too many connection attempts from IP; current limit is %s per '%s'.                                                                                                                                   |
| \-1035 | \-LOGGED_OUT​                            | \-Please send [Logout`<5>`](/docs/binance-spot-api-docs/fix-api#logout) message to close the session.                                                                                                                                                                                                                                         |
| \-1100 | \-ILLEGAL_CHARS​                         | \-- Illegal characters found in a parameter. - Illegal characters found in parameter '%s'; legal range is '%s'.                                                                                                                                                                                                                               |
| \-1101 | \-TOO_MANY_PARAMETERS​                   | \-- Too many parameters sent for this endpoint. - Too many parameters; expected '%s' and received '%s'. - Duplicate values for a parameter detected.                                                                                                                                                                                          |
| \-1102 | \-MANDATORY_PARAM_EMPTY_OR_MALFORMED​    | \-- A mandatory parameter was not sent, was empty/null, or malformed. - Mandatory parameter '%s' was not sent, was empty/null, or malformed. - Param '%s' or '%s' must be sent, but both were empty/null! - Required tag '%s' missing. - Field value was empty or malformed. - '%s' contains unexpected value. Cannot be greater than %s.     |
| \-1103 | \-UNKNOWN_PARAM​                         | \-- An unknown parameter was sent. - Undefined Tag.                                                                                                                                                                                                                                                                                           |
| \-1104 | \-UNREAD_PARAMETERS​                     | \-- Not all sent parameters were read. - Not all sent parameters were read; read '%s' parameter(s) but was sent '%s'.                                                                                                                                                                                                                         |
| \-1105 | \-PARAM_EMPTY​                           | \-- A parameter was empty. - Parameter '%s' was empty.                                                                                                                                                                                                                                                                                        |
| \-1106 | \-PARAM_NOT_REQUIRED​                    | \-- A parameter was sent when not required. - Parameter '%s' sent when not required. - A tag '%s' was sent when not required.                                                                                                                                                                                                                 |
| \-1108 | \-PARAM_OVERFLOW​                        | \-Parameter '%s' overflowed.                                                                                                                                                                                                                                                                                                                  |
| \-1111 | \-BAD_PRECISION​                         | \-Parameter '%s' has too much precision.                                                                                                                                                                                                                                                                                                      |
| \-1112 | \-NO_DEPTH​                              | \-No orders on book for symbol.                                                                                                                                                                                                                                                                                                               |
| \-1114 | \-TIF_NOT_REQUIRED​                      | \-TimeInForce parameter sent when not required.                                                                                                                                                                                                                                                                                               |
| \-1115 | \-INVALID_TIF​                           | \-Invalid timeInForce.                                                                                                                                                                                                                                                                                                                        |
| \-1116 | \-INVALID_ORDER_TYPE​                    | \-Invalid orderType.                                                                                                                                                                                                                                                                                                                          |
| \-1117 | \-INVALID_SIDE​                          | \-Invalid side.                                                                                                                                                                                                                                                                                                                               |
| \-1118 | \-EMPTY_NEW_CL_ORD_ID​                   | \-New client order ID was empty.                                                                                                                                                                                                                                                                                                              |
| \-1119 | \-EMPTY_ORG_CL_ORD_ID​                   | \-Original client order ID was empty.                                                                                                                                                                                                                                                                                                         |
| \-1120 | \-BAD_INTERVAL​                          | \-Invalid interval.                                                                                                                                                                                                                                                                                                                           |
| \-1121 | \-BAD_SYMBOL​                            | \-Invalid symbol.                                                                                                                                                                                                                                                                                                                             |
| \-1122 | \-INVALID_SYMBOLSTATUS​                  | \-Invalid symbolStatus.                                                                                                                                                                                                                                                                                                                       |
| \-1125 | \-INVALID_LISTEN_KEY​                    | \-This listenKey does not exist.                                                                                                                                                                                                                                                                                                              |
| \-1127 | \-MORE_THAN_XX_HOURS​                    | \-- Lookup interval is too big. - More than %s hours between startTime and endTime.                                                                                                                                                                                                                                                           |
| \-1128 | \-OPTIONAL_PARAMS_BAD_COMBO​             | \-- Combination of optional parameters invalid. - Combination of optional fields invalid. Recommendation: '%s' and '%s' must both be sent. - Fields \[%s\] must be sent together or omitted entirely. - Invalid `MDEntryType (269)` combination. BID and OFFER must be requested together.                                                    |
| \-1130 | \-INVALID_PARAMETER​                     | \-- Invalid data sent for a parameter. - Data sent for parameter '%s' is not valid.                                                                                                                                                                                                                                                           |
| \-1134 | \-BAD_STRATEGY_TYPE​                     | \-- `strategyType` was less than 1000000. - `TargetStrategy (847)` was less than 1000000.                                                                                                                                                                                                                                                     |
| \-1135 | \-INVALID_JSON​                          | \-- Invalid JSON Request - JSON sent for parameter '%s' is not valid                                                                                                                                                                                                                                                                          |
| \-1139 | \-INVALID_TICKER_TYPE​                   | \-Invalid ticker type.                                                                                                                                                                                                                                                                                                                        |
| \-1145 | \-INVALID_CANCEL_RESTRICTIONS​           | \-`cancelRestrictions` has to be either `ONLY_NEW` or `ONLY_PARTIALLY_FILLED`.                                                                                                                                                                                                                                                                |
| \-1151 | \-DUPLICATE_SYMBOLS​                     | \-Symbol is present multiple times in the list.                                                                                                                                                                                                                                                                                               |
| \-1152 | \-INVALID_SBE_HEADER​                    | \-Invalid `X-MBX-SBE` header; expected `<SCHEMA_ID>:<VERSION>`.                                                                                                                                                                                                                                                                               |
| \-1153 | \-UNSUPPORTED_SCHEMA_ID​                 | \-Unsupported SBE schema ID or version specified in the `X-MBX-SBE` header.                                                                                                                                                                                                                                                                   |
| \-1155 | \-SBE_DISABLED​                          | \-SBE is not enabled.                                                                                                                                                                                                                                                                                                                         |
| \-1158 | \-OCO_ORDER_TYPE_REJECTED​               | \-- Order type not supported in OCO. - If the order type provided in the `aboveType` and/or `belowType` is not supported.                                                                                                                                                                                                                     |
| \-1160 | \-OCO_ICEBERGQTY_TIMEINFORCE​            | \-- Parameter '%s' is not supported if `aboveTimeInForce`/`belowTimeInForce` is not GTC. - If the order type for the above or below leg is `STOP_LOSS_LIMIT`, and `icebergQty` is provided for that leg, the `timeInForce` has to be `GTC` else it will throw an error. - `TimeInForce (59)` must be `GTC (1)` when `MaxFloor (111)` is used. |
| \-1161 | \-DEPRECATED_SCHEMA​                     | \-Unable to encode the response in SBE schema 'x'. Please use schema 'y' or higher.                                                                                                                                                                                                                                                           |
| \-1165 | \-BUY_OCO_LIMIT_MUST_BE_BELOW​           | \-A limit order in a buy OCO must be below.                                                                                                                                                                                                                                                                                                   |
| \-1166 | \-SELL_OCO_LIMIT_MUST_BE_ABOVE​          | \-A limit order in a sell OCO must be above.                                                                                                                                                                                                                                                                                                  |
| \-1168 | \-BOTH_OCO_ORDERS_CANNOT_BE_LIMIT​       | \-At least one OCO order must be contingent.                                                                                                                                                                                                                                                                                                  |
| \-1169 | \-INVALID_TAG_NUMBER​                    | \-Invalid tag number.                                                                                                                                                                                                                                                                                                                         |
| \-1170 | \-TAG_NOT_DEFINED_IN_MESSAGE​            | \-Tag '%s' not defined for this message type.                                                                                                                                                                                                                                                                                                 |
| \-1171 | \-TAG_APPEARS_MORE_THAN_ONCE​            | \-Tag '%s' appears more than once.                                                                                                                                                                                                                                                                                                            |
| \-1172 | \-TAG_OUT_OF_ORDER​                      | \-Tag '%s' specified out of required order.                                                                                                                                                                                                                                                                                                   |
| \-1173 | \-GROUP_FIELDS_OUT_OF_ORDER​             | \-Repeating group '%s' fields out of order.                                                                                                                                                                                                                                                                                                   |
| \-1174 | \-INVALID_COMPONENT​                     | \-Component '%s' is incorrectly populated on '%s' order. Recommendation: '%s'                                                                                                                                                                                                                                                                 |
| \-1175 | \-RESET_SEQ_NUM_SUPPORT​                 | \-Continuation of sequence numbers to new session is currently unsupported. Sequence numbers must be reset for each new session.                                                                                                                                                                                                              |
| \-1176 | \-ALREADY_LOGGED_IN​                     | \-[Logon`<A>`](/docs/binance-spot-api-docs/fix-api#logon-main) should only be sent once.                                                                                                                                                                                                                                                      |
| \-1177 | \-GARBLED_MESSAGE​                       | \-- `CheckSum(10)` contains an incorrect value. - `BeginString (8)` is not the first tag in a message. - `MsgType (35)` is not the third tag in a message. - `BodyLength (9)` does not contain the correct byte count. - Only printable ASCII characters and SOH (Start of Header) are allowed. - Tag specified without a value.              |
| \-1178 | \-BAD_SENDER_COMPID​                     | \-`SenderCompId(49)` contains an incorrect value. The SenderCompID value should not change throughout the lifetime of a session.                                                                                                                                                                                                              |
| \-1179 | \-BAD_SEQ_NUM​                           | \-`MsgSeqNum(34)` contains an unexpected value. Expected: '%d'.                                                                                                                                                                                                                                                                               |
| \-1180 | \-EXPECTED_LOGON​                        | \-[Logon`<A>`](/docs/binance-spot-api-docs/fix-api#logon-main) must be the first message in the session.                                                                                                                                                                                                                                      |
| \-1181 | \-TOO_MANY_MESSAGES​                     | \-Too many messages; current limit is '%d' messages per '%s'.                                                                                                                                                                                                                                                                                 |
| \-1182 | \-PARAMS_BAD_COMBO​                      | \-Conflicting fields: \[%s\]                                                                                                                                                                                                                                                                                                                  |
| \-1183 | \-NOT_ALLOWED_IN_DROP_COPY_SESSIONS​     | \-Requested operation is not allowed in DropCopy sessions.                                                                                                                                                                                                                                                                                    |
| \-1184 | \-DROP_COPY_SESSION_NOT_ALLOWED​         | \-DropCopy sessions are not supported on this server. Please reconnect to a drop copy server.                                                                                                                                                                                                                                                 |
| \-1185 | \-DROP_COPY_SESSION_REQUIRED​            | \-Only DropCopy sessions are supported on this server. Either reconnect to order entry server or send `DropCopyFlag (9406)` field.                                                                                                                                                                                                            |
| \-1186 | \-NOT_ALLOWED_IN_ORDER_ENTRY_SESSIONS​   | \-Requested operation is not allowed in order entry sessions.                                                                                                                                                                                                                                                                                 |
| \-1187 | \-NOT_ALLOWED_IN_MARKET_DATA_SESSIONS​   | \-Requested operation is not allowed in market data sessions.                                                                                                                                                                                                                                                                                 |
| \-1188 | \-INCORRECT_NUM_IN_GROUP_COUNT​          | \-Incorrect NumInGroup count for repeating group '%s'.                                                                                                                                                                                                                                                                                        |
| \-1189 | \-DUPLICATE_ENTRIES_IN_A_GROUP​          | \-Group '%s' contains duplicate entries.                                                                                                                                                                                                                                                                                                      |
| \-1190 | \-INVALID_REQUEST_ID​                    | \-- `MDReqID (262)` contains a subscription request id that is already in use on this connection. - `MDReqID (262)` contains an unsubscription request id that does not match any active subscription.                                                                                                                                        |
| \-1191 | \-TOO_MANY_SUBSCRIPTIONS​                | \-- Too many subscriptions. Connection may create up to '%s' subscriptions at a time. - Similar subscription is already active on this connection. Symbol='%s', active subscription id: '%s'.                                                                                                                                                 |
| \-1194 | \-INVALID_TIME_UNIT​                     | \-Invalid value for time unit; expected either MICROSECOND or MILLISECOND.                                                                                                                                                                                                                                                                    |
| \-1196 | \-BUY_OCO_STOP_LOSS_MUST_BE_ABOVE​       | \-A stop loss order in a buy OCO must be above.                                                                                                                                                                                                                                                                                               |
| \-1197 | \-SELL_OCO_STOP_LOSS_MUST_BE_BELOW​      | \-A stop loss order in a sell OCO must be below.                                                                                                                                                                                                                                                                                              |
| \-1198 | \-BUY_OCO_TAKE_PROFIT_MUST_BE_BELOW​     | \-A take profit order in a buy OCO must be below.                                                                                                                                                                                                                                                                                             |
| \-1199 | \-SELL_OCO_TAKE_PROFIT_MUST_BE_ABOVE​    | \-A take profit order in a sell OCO must be above.                                                                                                                                                                                                                                                                                            |
| \-1210 | \-INVALID_PEG_PRICE_TYPE​                | \-Invalid pegPriceType.                                                                                                                                                                                                                                                                                                                       |
| \-1211 | \-INVALID_PEG_OFFSET_TYPE​               | \-Invalid pegOffsetType.                                                                                                                                                                                                                                                                                                                      |
| \-2010 | \-NEW_ORDER_REJECTED​                    | \-NEW_ORDER_REJECTED                                                                                                                                                                                                                                                                                                                          |
| \-2011 | \-CANCEL_REJECTED​                       | \-CANCEL_REJECTED                                                                                                                                                                                                                                                                                                                             |
| \-2013 | \-NO_SUCH_ORDER​                         | \-Order does not exist.                                                                                                                                                                                                                                                                                                                       |
| \-2014 | \-BAD_API_KEY_FMT​                       | \-API-key format invalid.                                                                                                                                                                                                                                                                                                                     |
| \-2015 | \-REJECTED_MBX_KEY​                      | \-Invalid API-key, IP, or permissions for action.                                                                                                                                                                                                                                                                                             |
| \-2016 | \-NO_TRADING_WINDOW​                     | \-No trading window could be found for the symbol. Try ticker/24hrs instead.                                                                                                                                                                                                                                                                  |
| \-2026 | \-ORDER_ARCHIVED​                        | \-Order was canceled or expired with no executed qty over 90 days ago and has been archived.                                                                                                                                                                                                                                                  |
| \-2035 | \-SUBSCRIPTION_ACTIVE​                   | \-User Data Stream subscription already active.                                                                                                                                                                                                                                                                                               |
| \-2036 | \-SUBSCRIPTION_INACTIVE​                 | \-User Data Stream subscription not active.                                                                                                                                                                                                                                                                                                   |
| \-2039 | \-CLIENT_ORDER_ID_INVALID​               | \-Client order ID is not correct for this order ID.                                                                                                                                                                                                                                                                                           |
| \-2042 | \-MAXIMUM_SUBSCRIPTION_IDS​              | \-Maximum subscription ID reached for this connection.                                                                                                                                                                                                                                                                                        |
| \-2021 | \-Order cancel-replace partially failed​ | \-This code is sent when either the cancellation of the order failed or the new order placement failed but not both.                                                                                                                                                                                                                          |
| \-2022 | \-Order cancel-replace failed.​          | \-This code is sent when both the cancellation of the order failed and the new order placement failed.                                                                                                                                                                                                                                        |

### 10xx - General Server or Network issues

### 11xx - Request issues

### Messages for -1010 ERROR_MSG_RECEIVED, -2010 NEW_ORDER_REJECTED, -2011 CANCEL_REJECTED, and -2038 ORDER_AMEND_REJECTED

This code is sent when an error has been returned by the matching engine. The
following messages which will indicate the specific error:

| Error message                                                                    | Description                                                                                                                                                                                                       |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \-"Unknown order sent."                                                          | \-The order (by either `orderId`, `clOrdId`, `origClOrdId`) could not be found.                                                                                                                                   |
| \-"Duplicate order sent."                                                        | \-The `clOrdId` is already in use.                                                                                                                                                                                |
| \-"Market is closed."                                                            | \-The symbol is not trading.                                                                                                                                                                                      |
| \-"Account has insufficient balance for requested action."                       | \-Not enough funds to complete the action.                                                                                                                                                                        |
| \-"Market orders are not supported for this symbol."                             | \-`MARKET` is not enabled on the symbol.                                                                                                                                                                          |
| \-"Iceberg orders are not supported for this symbol."                            | \-`icebergQty` is not enabled on the symbol.                                                                                                                                                                      |
| \-"Stop loss orders are not supported for this symbol."                          | \-`STOP_LOSS` is not enabled on the symbol.                                                                                                                                                                       |
| \-"Stop loss limit orders are not supported for this symbol."                    | \-`STOP_LOSS_LIMIT` is not enabled on the symbol.                                                                                                                                                                 |
| \-"Take profit orders are not supported for this symbol."                        | \-`TAKE_PROFIT` is not enabled on the symbol.                                                                                                                                                                     |
| \-"Take profit limit orders are not supported for this symbol."                  | \-`TAKE_PROFIT_LIMIT` is not enabled on the symbol.                                                                                                                                                               |
| \-"Order amend is not supported for this symbol."                                | \-Order amend keep priority is not enabled on the symbol.                                                                                                                                                         |
| \-"Price \* QTY is zero or less."                                                | \-`price` \* `quantity` is too low.                                                                                                                                                                               |
| \-"IcebergQty exceeds QTY."                                                      | \-`icebergQty` must be less than the order quantity.                                                                                                                                                              |
| \-"This action is disabled on this account."                                     | \-Contact customer support; some actions have been disabled on the account.                                                                                                                                       |
| \-"This account may not place or cancel orders."                                 | \-Contact customer support; the account has trading ability disabled.                                                                                                                                             |
| \-"Unsupported order combination"                                                | \-The `orderType`, `timeInForce`, `stopPrice`, and/or `icebergQty` combination isn't allowed.                                                                                                                     |
| \-"Order would trigger immediately."                                             | \-The order's stop price is not valid when compared to the last traded price.                                                                                                                                     |
| \-"Cancel order is invalid. Check origClOrdId and orderId."                      | \-No `origClOrdId` or `orderId` was sent in.                                                                                                                                                                      |
| \-"Order would immediately match and take."                                      | \-`LIMIT_MAKER` order type would immediately match and trade, and not be a pure maker order.                                                                                                                      |
| \-"The relationship of the prices for the orders is not correct."                | \-The prices set in the `OCO` is breaking the Price restrictions. For reference: `BUY` : `LIMIT_MAKER` `price` < Last Traded Price < `stopPrice` `SELL` : `LIMIT_MAKER` `price` > Last Traded Price > `stopPrice` |
| \-"OCO orders are not supported for this symbol"                                 | \-`OCO` is not enabled on the symbol.                                                                                                                                                                             |
| \-"Quote order qty market orders are not support for this symbol."               | \-`MARKET` orders using the parameter `quoteOrderQty` are not enabled on the symbol.                                                                                                                              |
| \-"Trailing stop orders are not supported for this symbol."                      | \-Orders using `trailingDelta` are not enabled on the symbol.                                                                                                                                                     |
| \-"Order cancel-replace is not supported for this symbol."                       | \-`POST /api/v3/order/cancelReplace` (REST API) or `order.cancelReplace` (WebSocket API) is not enabled on the symbol.                                                                                            |
| \-"This symbol is not permitted for this account."                               | \-Account and symbol do not have the same permissions. (e.g. `SPOT`, `MARGIN`, etc)                                                                                                                               |
| \-"This symbol is restricted for this account."                                  | \-Account is unable to trade on that symbol. (e.g. An `ISOLATED_MARGIN` account cannot place `SPOT` orders.)                                                                                                      |
| \-"Order was not canceled due to cancel restrictions."                           | \-Either `cancelRestrictions` was set to `ONLY_NEW` but the order status was not `NEW` or `cancelRestrictions` was set to `ONLY_PARTIALLY_FILLED` but the order status was not `PARTIALLY_FILLED`.                |
| \-"Rest API trading is not enabled." / "WebSocket API trading is not enabled."   | \-Order is being placed or a server that is not configured to allow access to `TRADE` endpoints.                                                                                                                  |
| \-"FIX API trading is not enabled.                                               | \-Order is placed on a FIX server that is not TRADE enabled.                                                                                                                                                      |
| \-"Order book liquidity is less than `LOT_SIZE` filter minimum quantity."        | \-Quote quantity market orders cannot be placed when the order book liquidity is less than minimum quantity configured for the `LOT_SIZE` filter.                                                                 |
| \-"Order book liquidity is less than `MARKET_LOT_SIZE` filter minimum quantity." | \-Quote quantity market orders cannot be placed when the order book liquidity is less than the minimum quantity for `MARKET_LOT_SIZE` filter.                                                                     |
| \-"Order book liquidity is less than symbol minimum quantity."                   | \-Quote quantity market orders cannot be placed when there are no orders on the book.                                                                                                                             |
| \-"Order amend (quantity increase) is not supported."                            | \-`newQty` must be less than the order quantity.                                                                                                                                                                  |
| \-"The requested action would change no state; rejecting".                       | \-The request sent would not have changed the status quo.(e.g. `newQty` cannot equal the order quantity.)                                                                                                         |
| \-"Pegged orders are not supported for this symbol."                             | \-`pegInstructionsAllowed` has not been enabled.                                                                                                                                                                  |
| \-"This order type may not use pegged price."                                    | \-You are using parameter `pegPriceType` with an unsupported order type. (e.g. `MARKET`)                                                                                                                          |
| \-"This price peg cannot be used with this order type."                          | \-You are using `pegPriceType`\=`MARKET_PEG` for a `LIMIT_MAKER` order.                                                                                                                                           |
| \-"Order book liquidity is too low for this pegged order."                       | \-The order book doesn’t have the best price level to peg the price to.                                                                                                                                           |

### Errors regarding placing orders via cancelReplace

### Filter failures

| Error message                                       | Description                                                                                                                                                                         |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \-"Filter failure: PRICE_FILTER"                    | \-`price` is too high, too low, and/or not following the tick size rule for the symbol.                                                                                             |
| \-"Filter failure: PERCENT_PRICE"                   | \-`price` is X% too high or X% too low from the average weighted price over the last Y minutes.                                                                                     |
| \-"Filter failure: LOT_SIZE"                        | \-`quantity` is too high, too low, and/or not following the step size rule for the symbol.                                                                                          |
| \-"Filter failure: MIN_NOTIONAL"                    | \-`price` \* `quantity` is too low to be a valid order for the symbol.                                                                                                              |
| \-"Filter failure: NOTIONAL"                        | \-`price` \* `quantity` is not within range of the `minNotional` and `maxNotional`                                                                                                  |
| \-"Filter failure: ICEBERG_PARTS"                   | \-`ICEBERG` order would break into too many parts; icebergQty is too small.                                                                                                         |
| \-"Filter failure: MARKET_LOT_SIZE"                 | \-`MARKET` order's `quantity` is too high, too low, and/or not following the step size rule for the symbol.                                                                         |
| \-"Filter failure: MAX_POSITION"                    | \-The account's position has reached the maximum defined limit. This is composed of the sum of the balance of the base asset, and the sum of the quantity of all open `BUY` orders. |
| \-"Filter failure: MAX_NUM_ORDERS"                  | \-Account has too many open orders on the symbol.                                                                                                                                   |
| \-"Filter failure: MAX_NUM_ALGO_ORDERS"             | \-Account has too many open stop loss and/or take profit orders on the symbol.                                                                                                      |
| \-"Filter failure: MAX_NUM_ICEBERG_ORDERS"          | \-Account has too many open iceberg orders on the symbol.                                                                                                                           |
| \-"Filter failure: MAX_NUM_ORDER_AMENDS"            | \-Account has made too many amendments to a single order on the symbol.                                                                                                             |
| \-"Filter failure: MAX_NUM_ORDER_LISTS"             | \-Account has too many open order lists on the symbol.                                                                                                                              |
| \-"Filter failure: TRAILING_DELTA"                  | \-`trailingDelta` is not within the defined range of the filter for that order type.                                                                                                |
| \-"Filter failure: EXCHANGE_MAX_NUM_ORDERS"         | \-Account has too many open orders on the exchange.                                                                                                                                 |
| \-"Filter failure: EXCHANGE_MAX_NUM_ALGO_ORDERS"    | \-Account has too many open stop loss and/or take profit orders on the exchange.                                                                                                    |
| \-"Filter failure: EXCHANGE_MAX_NUM_ICEBERG_ORDERS" | \-Account has too many open iceberg orders on the exchange.                                                                                                                         |
| \-"Filter failure: EXCHANGE_MAX_NUM_ORDER_LISTS"    | \-Account has too many open order lists on the exchange.                                                                                                                            |

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/errors](https://developers.binance.com/docs/binance-spot-api-docs/errors)

## Filters

Filters define trading rules on a symbol or an exchange. Filters come in two
forms: `symbol filters` and `exchange filters`.

### Symbol filters

#### PRICE_FILTER

The `PRICE_FILTER` defines the `price` rules for a symbol. There are 3 parts:

- `minPrice` defines the minimum `price`/`stopPrice` allowed; disabled on
  `minPrice` == 0.
- `maxPrice` defines the maximum `price`/`stopPrice` allowed; disabled on
  `maxPrice` == 0.
- `tickSize` defines the intervals that a `price`/`stopPrice` can be
  increased/decreased by; disabled on `tickSize` == 0.

Any of the above variables can be set to 0, which disables that rule in the
`price filter`. In order to pass the `price filter`, the following must be true
for `price`/`stopPrice` of the enabled rules:

- `price` >= `minPrice`
- `price` <= `maxPrice`
- `price` % `tickSize` == 0

**/exchangeInfo format:**

```json
{
  "filterType": "PRICE_FILTER",
  "minPrice": "0.00000100",
  "maxPrice": "100000.00000000",
  "tickSize": "0.00000100"
}
```

#### PERCENT_PRICE

The `PERCENT_PRICE` filter defines the valid range for the price based on the
average of the previous trades. `avgPriceMins` is the number of minutes the
average price is calculated over. 0 means the last price is used.

In order to pass the `percent price`, the following must be true for `price`:

- `price` <= `weightedAveragePrice` \* `multiplierUp`
- `price` >= `weightedAveragePrice` \* `multiplierDown`

**/exchangeInfo format:**

```json
{
  "filterType": "PERCENT_PRICE",
  "multiplierUp": "1.3000",
  "multiplierDown": "0.7000",
  "avgPriceMins": 5
}
```

#### PERCENT_PRICE_BY_SIDE

The `PERCENT_PRICE_BY_SIDE` filter defines the valid range for the price based
on the average of the previous trades.  
`avgPriceMins` is the number of minutes the average price is calculated over. 0
means the last price is used.  
There is a different range depending on whether the order is placed on the `BUY`
side or the `SELL` side.

Buy orders will succeed on this filter if:

- `Order price` <= `weightedAveragePrice` \* `bidMultiplierUp`
- `Order price` >= `weightedAveragePrice` \* `bidMultiplierDown`

Sell orders will succeed on this filter if:

- `Order Price` <= `weightedAveragePrice` \* `askMultiplierUp`
- `Order Price` >= `weightedAveragePrice` \* `askMultiplierDown`

**/exchangeInfo format:**

```json
{
  "filterType": "PERCENT_PRICE_BY_SIDE",
  "bidMultiplierUp": "1.2",
  "bidMultiplierDown": "0.2",
  "askMultiplierUp": "5",
  "askMultiplierDown": "0.8",
  "avgPriceMins": 1
}
```

#### LOT_SIZE

The `LOT_SIZE` filter defines the `quantity` (aka "lots" in auction terms) rules
for a symbol. There are 3 parts:

- `minQty` defines the minimum `quantity`/`icebergQty` allowed.
- `maxQty` defines the maximum `quantity`/`icebergQty` allowed.
- `stepSize` defines the intervals that a `quantity`/`icebergQty` can be
  increased/decreased by.

In order to pass the `lot size`, the following must be true for
`quantity`/`icebergQty`:

- `quantity` >= `minQty`
- `quantity` <= `maxQty`
- `quantity` % `stepSize` == 0

**/exchangeInfo format:**

```json
{
  "filterType": "LOT_SIZE",
  "minQty": "0.00100000",
  "maxQty": "100000.00000000",
  "stepSize": "0.00100000"
}
```

#### MIN_NOTIONAL

The `MIN_NOTIONAL` filter defines the minimum notional value allowed for an
order on a symbol. An order's notional value is the `price` \* `quantity`.
`applyToMarket` determines whether or not the `MIN_NOTIONAL` filter will also be
applied to `MARKET` orders. Since `MARKET` orders have no price, the average
price is used over the last `avgPriceMins` minutes. `avgPriceMins` is the number
of minutes the average price is calculated over. 0 means the last price is used.

**/exchangeInfo format:**

```json
{
  "filterType": "MIN_NOTIONAL",
  "minNotional": "0.00100000",
  "applyToMarket": true,
  "avgPriceMins": 5
}
```

#### NOTIONAL

The `NOTIONAL` filter defines the acceptable notional range allowed for an order
on a symbol.

`applyMinToMarket` determines whether the `minNotional` will be applied to
`MARKET` orders.  
`applyMaxToMarket` determines whether the `maxNotional` will be applied to
`MARKET` orders.

In order to pass this filter, the notional (`price * quantity`) has to pass the
following conditions:

- `price * quantity` <= `maxNotional`
- `price * quantity` >= `minNotional`

For `MARKET` orders, the average price used over the last `avgPriceMins` minutes
will be used for calculation.  
If the `avgPriceMins` is 0, then the last price will be used.

**/exchangeInfo format:**

```json
{
  "filterType": "NOTIONAL",
  "minNotional": "10.00000000",
  "applyMinToMarket": false,
  "maxNotional": "10000.00000000",
  "applyMaxToMarket": false,
  "avgPriceMins": 5
}
```

#### ICEBERG_PARTS

The `ICEBERG_PARTS` filter defines the maximum parts an iceberg order can have.
The number of `ICEBERG_PARTS` is defined as `CEIL(qty / icebergQty)`.

**/exchangeInfo format:**

```json
{
  "filterType": "ICEBERG_PARTS",
  "limit": 10
}
```

#### MARKET_LOT_SIZE

The `MARKET_LOT_SIZE` filter defines the `quantity` (aka "lots" in auction
terms) rules for `MARKET` orders on a symbol. There are 3 parts:

- `minQty` defines the minimum `quantity` allowed.
- `maxQty` defines the maximum `quantity` allowed.
- `stepSize` defines the intervals that a `quantity` can be increased/decreased
  by.

In order to pass the `market lot size`, the following must be true for
`quantity`:

- `quantity` >= `minQty`
- `quantity` <= `maxQty`
- `quantity` % `stepSize` == 0

**/exchangeInfo format:**

```json
{
  "filterType": "MARKET_LOT_SIZE",
  "minQty": "0.00100000",
  "maxQty": "100000.00000000",
  "stepSize": "0.00100000"
}
```

#### MAX_NUM_ORDERS

The `MAX_NUM_ORDERS` filter defines the maximum number of orders an account is
allowed to have open on a symbol. Note that both "algo" orders and normal orders
are counted for this filter.

**/exchangeInfo format:**

```json
{
  "filterType": "MAX_NUM_ORDERS",
  "maxNumOrders": 25
}
```

#### MAX_NUM_ALGO_ORDERS

The `MAX_NUM_ALGO_ORDERS` filter defines the maximum number of "algo" orders an
account is allowed to have open on a symbol. "Algo" orders are `STOP_LOSS`,
`STOP_LOSS_LIMIT`, `TAKE_PROFIT`, and `TAKE_PROFIT_LIMIT` orders.

**/exchangeInfo format:**

```json
{
  "filterType": "MAX_NUM_ALGO_ORDERS",
  "maxNumAlgoOrders": 5
}
```

#### MAX_NUM_ICEBERG_ORDERS

The `MAX_NUM_ICEBERG_ORDERS` filter defines the maximum number of `ICEBERG`
orders an account is allowed to have open on a symbol. An `ICEBERG` order is any
order where the `icebergQty` is > 0.

**/exchangeInfo format:**

```json
{
  "filterType": "MAX_NUM_ICEBERG_ORDERS",
  "maxNumIcebergOrders": 5
}
```

#### MAX_POSITION

The `MAX_POSITION` filter defines the allowed maximum position an account can
have on the base asset of a symbol. An account's position defined as the sum of
the account's:

1.  free balance of the base asset
2.  locked balance of the base asset
3.  sum of the qty of all open BUY orders

`BUY` orders will be rejected if the account's position is greater than the
maximum position allowed.

If an order's `quantity` can cause the position to overflow, this will also fail
the `MAX_POSITION` filter.

**/exchangeInfo format:**

```json
{
  "filterType": "MAX_POSITION",
  "maxPosition": "10.00000000"
}
```

#### TRAILING_DELTA

The `TRAILING_DELTA` filter defines the minimum and maximum value for the
parameter [`trailingDelta`](/docs/binance-spot-api-docs/faqs/trailing-stop-faq).

In order for a trailing stop order to pass this filter, the following must be
true:

For `STOP_LOSS BUY`, `STOP_LOSS_LIMIT_BUY`,`TAKE_PROFIT SELL` and
`TAKE_PROFIT_LIMIT SELL` orders:

- `trailingDelta` >= `minTrailingAboveDelta`
- `trailingDelta` <= `maxTrailingAboveDelta`

For `STOP_LOSS SELL`, `STOP_LOSS_LIMIT SELL`, `TAKE_PROFIT BUY`, and
`TAKE_PROFIT_LIMIT BUY` orders:

- `trailingDelta` >= `minTrailingBelowDelta`
- `trailingDelta` <= `maxTrailingBelowDelta`

**/exchangeInfo format:**

```json
{
  "filterType": "TRAILING_DELTA",
  "minTrailingAboveDelta": 10,
  "maxTrailingAboveDelta": 2000,
  "minTrailingBelowDelta": 10,
  "maxTrailingBelowDelta": 2000
}
```

#### MAX_NUM_ORDER_AMENDS

The `MAX_NUM_ORDER_AMENDS` filter defines the maximum number of times an order
can be amended on the given symbol.

If there are too many order amendments made on a single order, you will receive
the `-2038` error code.

**/exchangeInfo format:**

```json
{
  "filterType": "MAX_NUM_ORDER_AMENDS",
  "maxNumOrderAmends": 10
}
```

#### MAX_NUM_ORDER_LISTS

The `MAX_NUM_ORDER_LISTS` filter defines the maximum number of open order lists
an account can have on a symbol. Note that OTOCOs count as one order list.

**/exchangeInfo format:**

```json
{
  "filterType": "MAX_NUM_ORDER_LISTS",
  "maxNumOrderLists": 20
}
```

### Exchange Filters

#### EXCHANGE_MAX_NUM_ORDERS

The `EXCHANGE_MAX_NUM_ORDERS` filter defines the maximum number of orders an
account is allowed to have open on the exchange. Note that both "algo" orders
and normal orders are counted for this filter.

**/exchangeInfo format:**

```json
{
  "filterType": "EXCHANGE_MAX_NUM_ORDERS",
  "maxNumOrders": 1000
}
```

#### EXCHANGE_MAX_NUM_ALGO_ORDERS

The `EXCHANGE_MAX_NUM_ALGO_ORDERS` filter defines the maximum number of "algo"
orders an account is allowed to have open on the exchange. "Algo" orders are
`STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`, and `TAKE_PROFIT_LIMIT` orders.

**/exchangeInfo format:**

```json
{
  "filterType": "EXCHANGE_MAX_NUM_ALGO_ORDERS",
  "maxNumAlgoOrders": 200
}
```

#### EXCHANGE_MAX_NUM_ICEBERG_ORDERS

The `EXCHANGE_MAX_NUM_ICEBERG_ORDERS` filter defines the maximum number of
iceberg orders an account is allowed to have open on the exchange.

**/exchangeInfo format:**

```json
{
  "filterType": "EXCHANGE_MAX_NUM_ICEBERG_ORDERS",
  "maxNumIcebergOrders": 10000
}
```

#### EXCHANGE_MAX_NUM_ORDER_LISTS

The `EXCHANGE_MAX_NUM_ORDERS` filter defines the maximum number of order lists
an account is allowed to have open on the exchange. Note that OTOCOs count as
one order list.

**/exchangeInfo format:**

````json
   {
      "filterType": "EXCHANGE_MAX_NUM_ORDER_LISTS",
      "maxNumOrderLists": 20
    }```
````

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/filters](https://developers.binance.com/docs/binance-spot-api-docs/filters)

## ENUM Definitions

This will apply for both REST API and WebSocket API.

### Symbol status (status)

- `TRADING`
- `END_OF_DAY`
- `HALT`
- `BREAK`

### Account and Symbol Permissions (permissions)

- `SPOT`
- `MARGIN`
- `LEVERAGED`
- `TRD_GRP_002`
- `TRD_GRP_003`
- `TRD_GRP_004`
- `TRD_GRP_005`
- `TRD_GRP_006`
- `TRD_GRP_007`
- `TRD_GRP_008`
- `TRD_GRP_009`
- `TRD_GRP_010`
- `TRD_GRP_011`
- `TRD_GRP_012`
- `TRD_GRP_013`
- `TRD_GRP_014`
- `TRD_GRP_015`
- `TRD_GRP_016`
- `TRD_GRP_017`
- `TRD_GRP_018`
- `TRD_GRP_019`
- `TRD_GRP_020`
- `TRD_GRP_021`
- `TRD_GRP_022`
- `TRD_GRP_023`
- `TRD_GRP_024`
- `TRD_GRP_025`

### Order status (status)

| Status               | Description                                                                                                                                                                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \-`NEW`              | \-The order has been accepted by the engine.                                                                                                                                                                                                        |
| \-`PENDING_NEW`      | \-The order is in a pending phase until the working order of an order list has been fully filled.                                                                                                                                                   |
| \-`PARTIALLY_FILLED` | \-A part of the order has been filled.                                                                                                                                                                                                              |
| \-`FILLED`           | \-The order has been completed.                                                                                                                                                                                                                     |
| \-`CANCELED`         | \-The order has been canceled by the user.                                                                                                                                                                                                          |
| \-`PENDING_CANCEL`   | \-Currently unused                                                                                                                                                                                                                                  |
| \-`REJECTED`         | \-The order was not accepted by the engine and not processed.                                                                                                                                                                                       |
| \-`EXPIRED`          | \-The order was canceled according to the order type's rules (e.g. LIMIT FOK orders with no fill, LIMIT IOC or MARKET orders that partially fill) or by the exchange, (e.g. orders canceled during liquidation, orders canceled during maintenance) |
| \-`EXPIRED_IN_MATCH` | \-The order was expired by the exchange due to STP. (e.g. an order with `EXPIRE_TAKER` will match with existing orders on the book with the same account or same `tradeGroupId`)                                                                    |

### Order List Status (listStatusType)

| Status           | Description                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| \-`RESPONSE`     | \-This is used when the ListStatus is responding to a failed action. (E.g. order list placement or cancellation) |
| \-`EXEC_STARTED` | \-The order list has been placed or there is an update to the order list status.                                 |
| \-`UPDATED`      | \-The clientOrderId of an order in the order list has been changed.                                              |
| \-`ALL_DONE`     | \-The order list has finished executing and thus is no longer active.                                            |

### Order List Order Status (listOrderStatus)

| Status        | Description                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------- |
| \-`EXECUTING` | \-Either an order list has been placed or there is an update to the status of the list.             |
| \-`ALL_DONE`  | \-An order list has completed execution and thus no longer active.                                  |
| \-`REJECT`    | \-The List Status is responding to a failed action either during order placement or order canceled. |

### ContingencyType

- `OCO`
- `OTO`

### AllocationType

- `SOR`

### Order types (orderTypes, type)

- `LIMIT`
- `MARKET`
- `STOP_LOSS`
- `STOP_LOSS_LIMIT`
- `TAKE_PROFIT`
- `TAKE_PROFIT_LIMIT`
- `LIMIT_MAKER`

### Order Response Type (newOrderRespType)

- `ACK`
- `RESULT`
- `FULL`

### Working Floor

- `EXCHANGE`
- `SOR`

### Order side (side)

- `BUY`
- `SELL`

### Time in force (timeInForce)

This sets how long an order will be active before expiration.

| Status  | Description                                                                                           |
| ------- | ----------------------------------------------------------------------------------------------------- |
| \-`GTC` | \-Good Til Canceled An order will be on the book unless the order is canceled.                        |
| \-`IOC` | \-Immediate Or Cancel An order will try to fill the order as much as it can before the order expires. |
| \-`FOK` | \-Fill or Kill An order will expire if the full order cannot be filled upon execution.                |

### Rate limiters (rateLimitType)

- REQUEST_WEIGHT

```json
{
  "rateLimitType": "REQUEST_WEIGHT",
  "interval": "MINUTE",
  "intervalNum": 1,
  "limit": 6000
}
```

- ORDERS

```json
{
  "rateLimitType": "ORDERS",
  "interval": "SECOND",
  "intervalNum": 1,
  "limit": 10
}
```

- RAW_REQUESTS

```json
{
  "rateLimitType": "RAW_REQUESTS",
  "interval": "MINUTE",
  "intervalNum": 5,
  "limit": 61000
}
```

### Rate limit intervals (interval)

- SECOND
- MINUTE
- DAY

### STP Modes

Read [Self Trade Prevention (STP) FAQ](/docs/binance-spot-api-docs/faqs/stp_faq)
to learn more.

- `NONE`
- `EXPIRE_MAKER`
- `EXPIRE_TAKER`
- `EXPIRE_BOTH`
- `DECREMENT`

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/enums](https://developers.binance.com/docs/binance-spot-api-docs/enums)

## WebSocket Streams for Binance (2025-01-28)

### General WSS information

- The base endpoint is: **wss://stream.binance.com:9443** or
  **wss://stream.binance.com:443**.
- Streams can be accessed either in a single raw stream or in a combined stream.
- Raw streams are accessed at **/ws/<streamName>**
- Combined streams are accessed at
  **/stream?streams=<streamName1>/<streamName2>/<streamName3>**
- Combined stream events are wrapped as follows:
  **{"stream":"<streamName>","data":<rawPayload>}**
- All symbols for streams are **lowercase**
- A single connection to **stream.binance.com** is only valid for 24 hours;
  expect to be disconnected at the 24 hour mark
- The WebSocket server will send a `ping frame` every 20 seconds.
  - If the WebSocket server does not receive a `pong frame` back from the
    connection within a minute the connection will be disconnected.
  - When you receive a ping, you must send a pong with a copy of ping's payload
    as soon as possible.
  - Unsolicited `pong frames` are allowed, but will not prevent disconnection.
    **It is recommended that the payload for these pong frames are empty.**
- The base endpoint **wss://data-stream.binance.vision** can be subscribed to
  receive **only** market data messages.  
  User data stream is **NOT** available from this URL.
- All time and timestamp related fields are **milliseconds by default**. To
  receive the information in microseconds, please add the parameter
  `timeUnit=MICROSECOND or timeUnit=microsecond` in the URL.
  - For example: `/stream?streams=btcusdt@trade&timeUnit=MICROSECOND`

### WebSocket Limits

- WebSocket connections have a limit of 5 incoming messages per second. A
  message is considered:
  - A PING frame
  - A PONG frame
  - A JSON controlled message (e.g. subscribe, unsubscribe)
- A connection that goes beyond the limit will be disconnected; IPs that are
  repeatedly disconnected may be banned.
- A single connection can listen to a maximum of 1024 streams.
- There is a limit of **300 connections per attempt every 5 minutes per IP**.

### Live Subscribing/Unsubscribing to streams

- The following data can be sent through the WebSocket instance in order to
  subscribe/unsubscribe from streams. Examples can be seen below.
- The `id` is used as an identifier to uniquely identify the messages going back
  and forth. The following formats are accepted:
  - 64-bit signed integer
  - alphanumeric strings; max length 36
  - `null`
- In the response, if the `result` received is `null` this means the request
  sent was a success for non-query requests (e.g. Subscribing/Unsubscribing).

#### Subscribe to a stream

- Request

  ```json
  {
    "method": "SUBSCRIBE",
    "params": ["btcusdt@aggTrade", "btcusdt@depth"],
    "id": 1
  }
  ```

- Response

  ```json
  {
    "result": null,
    "id": 1
  }
  ```

#### Unsubscribe to a stream

- Request

  ```json
  {
    "method": "UNSUBSCRIBE",
    "params": ["btcusdt@depth"],
    "id": 312
  }
  ```

- Response

  ```json
  {
    "result": null,
    "id": 312
  }
  ```

#### Listing Subscriptions

- Request

  ```json
  {
    "method": "LIST_SUBSCRIPTIONS",
    "id": 3
  }
  ```

- Response

  ```json
  {
    "result": ["btcusdt@aggTrade"],
    "id": 3
  }
  ```

#### Setting Properties

Currently, the only property that can be set is whether `combined` stream
payloads are enabled or not. The combined property is set to `false` when
connecting using `/ws/` ("raw streams") and `true` when connecting using
`/stream/`.

- Request

  ```json
  {
    "method": "SET_PROPERTY",
    "params": ["combined", true],
    "id": 5
  }
  ```

- Response

  ```json
  {
    "result": null,
    "id": 5
  }
  ```

#### Retrieving Properties

- Request

  ```json
  {
    "method": "GET_PROPERTY",
    "params": ["combined"],
    "id": 2
  }
  ```

- Response

  ```json
  {
    "result": true, // Indicates that combined is set to true.
    "id": 2
  }
  ```

#### Error Messages

| Error Message                                                                                                                                                                     | Description                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| \-{"code": 0, "msg": "Unknown property","id": %s}                                                                                                                                 | \-Parameter used in the `SET_PROPERTY` or `GET_PROPERTY` was invalid                                   |
| \-{"code": 1, "msg": "Invalid value type: expected Boolean"}                                                                                                                      | \-Value should only be `true` or `false`                                                               |
| \-{"code": 2, "msg": "Invalid request: property name must be a string"}                                                                                                           | \-Property name provided was invalid                                                                   |
| \-{"code": 2, "msg": "Invalid request: request ID must be an unsigned integer"}                                                                                                   | \-Parameter `id` had to be provided or the value provided in the `id` parameter is an unsupported type |
| \-{"code": 2, "msg": "Invalid request: unknown variant %s, expected one of `SUBSCRIBE`, `UNSUBSCRIBE`, `LIST_SUBSCRIPTIONS`, `SET_PROPERTY`, `GET_PROPERTY` at line 1 column 28"} | \-Possible typo in the provided method or provided method was neither of the expected values           |
| \-{"code": 2, "msg": "Invalid request: too many parameters"}                                                                                                                      | \-Unnecessary parameters provided in the data                                                          |
| \-{"code": 2, "msg": "Invalid request: property name must be a string"}                                                                                                           | \-Property name was not provided                                                                       |
| \-{"code": 2, "msg": "Invalid request: missing field `method` at line 1 column 73"}                                                                                               | \-`method` was not provided in the data                                                                |
| \-{"code":3,"msg":"Invalid JSON: expected value at line %s column %s"}                                                                                                            | \-JSON data sent has incorrect syntax.                                                                 |

## Detailed Stream information

### Aggregate Trade Streams

The Aggregate Trade Streams push trade information that is aggregated for a
single taker order.

**Stream Name:** <symbol>@aggTrade

**Update Speed:** Real-time

**Payload:**

```json
{
  "e": "aggTrade", // Event type
  "E": 1672515782136, // Event time
  "s": "BNBBTC", // Symbol
  "a": 12345, // Aggregate trade ID
  "p": "0.001", // Price
  "q": "100", // Quantity
  "f": 100, // First trade ID
  "l": 105, // Last trade ID
  "T": 1672515782136, // Trade time
  "m": true, // Is the buyer the market maker?
  "M": true // Ignore
}
```

### Trade Streams

The Trade Streams push raw trade information; each trade has a unique buyer and
seller.

**Stream Name:** <symbol>@trade

**Update Speed:** Real-time

**Payload:**

```json
{
  "e": "trade", // Event type
  "E": 1672515782136, // Event time
  "s": "BNBBTC", // Symbol
  "t": 12345, // Trade ID
  "p": "0.001", // Price
  "q": "100", // Quantity
  "T": 1672515782136, // Trade time
  "m": true, // Is the buyer the market maker?
  "M": true // Ignore
}
```

### Kline/Candlestick Streams for UTC

The Kline/Candlestick Stream push updates to the current klines/candlestick
every second in `UTC+0` timezone

**Kline/Candlestick chart intervals:**

s-> seconds; m -> minutes; h -> hours; d -> days; w -> weeks; M -> months

- 1s
- 1m
- 3m
- 5m
- 15m
- 30m
- 1h
- 2h
- 4h
- 6h
- 8h
- 12h
- 1d
- 3d
- 1w
- 1M

**Stream Name:** <symbol>@kline\_<interval>

**Update Speed:** 1000ms for `1s`, 2000ms for the other intervals

**Payload:**

```json
{
  "e": "kline", // Event type
  "E": 1672515782136, // Event time
  "s": "BNBBTC", // Symbol
  "k": {
    "t": 1672515780000, // Kline start time
    "T": 1672515839999, // Kline close time
    "s": "BNBBTC", // Symbol
    "i": "1m", // Interval
    "f": 100, // First trade ID
    "L": 200, // Last trade ID
    "o": "0.0010", // Open price
    "c": "0.0020", // Close price
    "h": "0.0025", // High price
    "l": "0.0015", // Low price
    "v": "1000", // Base asset volume
    "n": 100, // Number of trades
    "x": false, // Is this kline closed?
    "q": "1.0000", // Quote asset volume
    "V": "500", // Taker buy base asset volume
    "Q": "0.500", // Taker buy quote asset volume
    "B": "123456" // Ignore
  }
}
```

### Kline/Candlestick Streams with timezone offset

The Kline/Candlestick Stream push updates to the current klines/candlestick
every second in `UTC+8` timezone

**Kline/Candlestick chart intervals:**

Supported intervals: See
[`Kline/Candlestick chart intervals`](/docs/binance-spot-api-docs/web-socket-streams#kline-intervals)

**UTC+8 timezone offset:**

- Kline intervals open and close in the `UTC+8` timezone. For example the `1d`
  klines will open at the beginning of the `UTC+8` day, and close at the end of
  the `UTC+8` day.
- Note that `E` (event time), `t` (start time) and `T` (close time) in the
  payload are Unix timestamps, which are always interpreted in UTC.

**Stream Name:** <symbol>@kline\_<interval>@+08:00

**Update Speed:** 1000ms for `1s`, 2000ms for the other intervals

**Payload:**

```json
{
  "e": "kline", // Event type
  "E": 1672515782136, // Event time
  "s": "BNBBTC", // Symbol
  "k": {
    "t": 1672515780000, // Kline start time
    "T": 1672515839999, // Kline close time
    "s": "BNBBTC", // Symbol
    "i": "1m", // Interval
    "f": 100, // First trade ID
    "L": 200, // Last trade ID
    "o": "0.0010", // Open price
    "c": "0.0020", // Close price
    "h": "0.0025", // High price
    "l": "0.0015", // Low price
    "v": "1000", // Base asset volume
    "n": 100, // Number of trades
    "x": false, // Is this kline closed?
    "q": "1.0000", // Quote asset volume
    "V": "500", // Taker buy base asset volume
    "Q": "0.500", // Taker buy quote asset volume
    "B": "123456" // Ignore
  }
}
```

### Individual Symbol Mini Ticker Stream

24hr rolling window mini-ticker statistics. These are NOT the statistics of the
UTC day, but a 24hr rolling window for the previous 24hrs.

**Stream Name:** <symbol>@miniTicker

**Update Speed:** 1000ms

**Payload:**

```json
{
  "e": "24hrMiniTicker", // Event type
  "E": 1672515782136, // Event time
  "s": "BNBBTC", // Symbol
  "c": "0.0025", // Close price
  "o": "0.0010", // Open price
  "h": "0.0025", // High price
  "l": "0.0010", // Low price
  "v": "10000", // Total traded base asset volume
  "q": "18" // Total traded quote asset volume
}
```

### All Market Mini Tickers Stream

24hr rolling window mini-ticker statistics for all symbols that changed in an
array. These are NOT the statistics of the UTC day, but a 24hr rolling window
for the previous 24hrs. Note that only tickers that have changed will be present
in the array.

**Stream Name:** !miniTicker@arr

**Update Speed:** 1000ms

**Payload:**

```json
[
  {
    // Same as <symbol>@miniTicker payload
  }
]
```

### Individual Symbol Ticker Streams

24hr rolling window ticker statistics for a single symbol. These are NOT the
statistics of the UTC day, but a 24hr rolling window for the previous 24hrs.

**Stream Name:** <symbol>@ticker

**Update Speed:** 1000ms

**Payload:**

```json
{
  "e": "24hrTicker", // Event type
  "E": 1672515782136, // Event time
  "s": "BNBBTC", // Symbol
  "p": "0.0015", // Price change
  "P": "250.00", // Price change percent
  "w": "0.0018", // Weighted average price
  "x": "0.0009", // First trade(F)-1 price (first trade before the 24hr rolling window)
  "c": "0.0025", // Last price
  "Q": "10", // Last quantity
  "b": "0.0024", // Best bid price
  "B": "10", // Best bid quantity
  "a": "0.0026", // Best ask price
  "A": "100", // Best ask quantity
  "o": "0.0010", // Open price
  "h": "0.0025", // High price
  "l": "0.0010", // Low price
  "v": "10000", // Total traded base asset volume
  "q": "18", // Total traded quote asset volume
  "O": 0, // Statistics open time
  "C": 86400000, // Statistics close time
  "F": 0, // First trade ID
  "L": 18150, // Last trade Id
  "n": 18151 // Total number of trades
}
```

### All Market Tickers Stream

24hr rolling window ticker statistics for all symbols that changed in an array.
These are NOT the statistics of the UTC day, but a 24hr rolling window for the
previous 24hrs. Note that only tickers that have changed will be present in the
array.

**Stream Name:** !ticker@arr

**Update Speed:** 1000ms

**Payload:**

```json
[
  {
    // Same as <symbol>@ticker payload
  }
]
```

### Individual Symbol Rolling Window Statistics Streams

Rolling window ticker statistics for a single symbol, computed over multiple
windows.

**Stream Name:** <symbol>@ticker\_<window_size>

**Window Sizes:** 1h,4h,1d

**Update Speed:** 1000ms

**Note**: This stream is different from the <symbol>@ticker stream. The open
time `"O"` always starts on a minute, while the closing time `"C"` is the
current time of the update. As such, the effective window might be up to 59999ms
wider than <window_size>.

**Payload:**

```json
{
  "e": "1hTicker", // Event type
  "E": 1672515782136, // Event time
  "s": "BNBBTC", // Symbol
  "p": "0.0015", // Price change
  "P": "250.00", // Price change percent
  "o": "0.0010", // Open price
  "h": "0.0025", // High price
  "l": "0.0010", // Low price
  "c": "0.0025", // Last price
  "w": "0.0018", // Weighted average price
  "v": "10000", // Total traded base asset volume
  "q": "18", // Total traded quote asset volume
  "O": 0, // Statistics open time
  "C": 1675216573749, // Statistics close time
  "F": 0, // First trade ID
  "L": 18150, // Last trade Id
  "n": 18151 // Total number of trades
}
```

### All Market Rolling Window Statistics Streams

Rolling window ticker statistics for all market symbols, computed over multiple
windows. Note that only tickers that have changed will be present in the array.

**Stream Name:** !ticker\_<window-size>@arr

**Window Size:** 1h,4h,1d

**Update Speed:** 1000ms

**Payload:**

```json
[
  {
    // Same as <symbol>@ticker_<window_size> payload,
    // one for each symbol updated within the interval.
  }
]
```

### Individual Symbol Book Ticker Streams

Pushes any update to the best bid or ask's price or quantity in real-time for a
specified symbol. Multiple `<symbol>@bookTicker` streams can be subscribed to
over one connection.

**Stream Name:** <symbol>@bookTicker

**Update Speed:** Real-time

**Payload:**

```json
{
  "u": 400900217, // order book updateId
  "s": "BNBUSDT", // symbol
  "b": "25.35190000", // best bid price
  "B": "31.21000000", // best bid qty
  "a": "25.36520000", // best ask price
  "A": "40.66000000" // best ask qty
}
```

### Average Price

Average price streams push changes in the average price over a fixed time
interval.

**Stream Name:** <symbol>@avgPrice

**Update Speed:** 1000ms

**Payload:**

```json
{
  "e": "avgPrice", // Event type
  "E": 1693907033000, // Event time
  "s": "BTCUSDT", // Symbol
  "i": "5m", // Average price interval
  "w": "25776.86000000", // Average price
  "T": 1693907032213 // Last trade time
}
```

### Partial Book Depth Streams

Top **<levels>** bids and asks, pushed every second. Valid **<levels>** are 5,
10, or 20.

**Stream Names:** <symbol>@depth<levels> OR <symbol>@depth<levels>@100ms

**Update Speed:** 1000ms or 100ms

**Payload:**

```json
{
  "lastUpdateId": 160, // Last update ID
  "bids": [
    // Bids to be updated
    [
      "0.0024", // Price level to be updated
      "10" // Quantity
    ]
  ],
  "asks": [
    // Asks to be updated
    [
      "0.0026", // Price level to be updated
      "100" // Quantity
    ]
  ]
}
```

### Diff. Depth Stream

Order book price and quantity depth updates used to locally manage an order
book.

**Stream Name:** <symbol>@depth OR <symbol>@depth@100ms

**Update Speed:** 1000ms or 100ms

**Payload:**

```json
{
  "e": "depthUpdate", // Event type
  "E": 1672515782136, // Event time
  "s": "BNBBTC", // Symbol
  "U": 157, // First update ID in event
  "u": 160, // Final update ID in event
  "b": [
    // Bids to be updated
    [
      "0.0024", // Price level to be updated
      "10" // Quantity
    ]
  ],
  "a": [
    // Asks to be updated
    [
      "0.0026", // Price level to be updated
      "100" // Quantity
    ]
  ]
}
```

### How to manage a local order book correctly

1.  Open a WebSocket connection to
    `wss://stream.binance.com:9443/ws/bnbbtc@depth`.
2.  Buffer the events received from the stream. Note the `U` of the first event
    you received.
3.  Get a depth snapshot from
    `https://api.binance.com/api/v3/depth?symbol=BNBBTC&limit=5000`.
4.  If the `lastUpdateId` from the snapshot is strictly less than the `U` from
    step 2, go back to step 3.
5.  In the buffered events, discard any event where `u` is <= `lastUpdateId` of
    the snapshot. The first buffered event should now have `lastUpdateId` within
    its `[U;u]` range.
6.  Set your local order book to the snapshot. Its update ID is `lastUpdateId`.
7.  Apply the update procedure below to all buffered events, and then to all
    subsequent events received.

To apply an event to your local order book, follow this update procedure:

1.  If the event `u` (last update ID) is < the update ID of your local order
    book, ignore the event.
2.  If the event `U` (first update ID) is > the update ID of your local order
    book, something went wrong. Discard your local order book and restart the
    process from the beginning.
3.  For each price level in bids (`b`) and asks (`a`), set the new quantity in
    the order book:
    - If the price level does not exist in the order book, insert it with new
      quantity.
    - If the quantity is zero, remove the price level from the order book.
4.  Set the order book update ID to the last update ID (`u`) in the processed
    event.

> \[!NOTE\] Since depth snapshots retrieved from the API have a limit on the
> number of price levels (5000 on each side maximum), you won't learn the
> quantities for the levels outside of the initial snapshot unless they
> change.  
> So be careful when using the information for those levels, since they might
> not reflect the full view of the order book.  
> However, for most use cases, seeing 5000 levels on each side is enough to
> understand the market and trade effectively.

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams](https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams)

## General API Information

- The base endpoint is: **`wss://ws-api.binance.com:443/ws-api/v3`**.
  - If you experience issues with the standard 443 port, alternative port 9443
    is also available.
  - The base endpoint for [testnet](https://testnet.binance.vision/) is:
    `wss://ws-api.testnet.binance.vision/ws-api/v3`
- A single connection to the API is only valid for 24 hours; expect to be
  disconnected after the 24-hour mark.
- We support HMAC, RSA, and Ed25519 keys. For more information, please see
  [API Key types](/docs/binance-spot-api-docs/faqs/api_key_types).
- Responses are in JSON by default. To receive responses in SBE, refer to the
  [SBE FAQ](/docs/binance-spot-api-docs/faqs/sbe_faq) page.
- The WebSocket server will send a `ping frame` every 20 seconds.
  - If the WebSocket server does not receive a `pong frame` back from the
    connection within a minute the connection will be disconnected.
  - When you receive a ping, you must send a pong with a copy of ping's payload
    as soon as possible.
  - Unsolicited `pong frames` are allowed, but will not prevent disconnection.
    **It is recommended that the payload for these pong frames are empty.**
- Data is returned in **chronological order**, unless noted otherwise.
  - Without `startTime` or `endTime`, returns the most recent items up to the
    limit.
  - With `startTime`, returns oldest items from `startTime` up to the limit.
  - With `endTime`, returns most recent items up to `endTime` and the limit.
  - With both, behaves like `startTime` but does not exceed `endTime`.
- All timestamps in the JSON responses are in **milliseconds in UTC by
  default**. To receive the information in microseconds, please add the
  parameter `timeUnit=MICROSECOND` or `timeUnit=microsecond` in the URL.
- Timestamp parameters (e.g. `startTime`, `endTime`, `timestamp`) can be passed
  in milliseconds or microseconds.
- All field names and values are **case-sensitive**, unless noted otherwise.
- If there are enums or terms you want clarification on, please see
  [SPOT Glossary](/docs/binance-spot-api-docs/faqs/spot_glossary) for more
  information.
- APIs have a timeout of 10 seconds when processing a request. If a response
  from the Matching Engine takes longer than this, the API responds with
  "Timeout waiting for response from backend server. Send status unknown;
  execution status unknown."
  [(-1007 TIMEOUT)](/docs/binance-spot-api-docs/errors#-1007-timeout)
  - This does not always mean that the request failed in the Matching Engine.
  - If the status of the request has not appeared in
    [User Data Stream](/docs/binance-spot-api-docs/user-data-stream), please
    perform an API query for its status.

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/general-api-information](https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/general-api-information)

## Request format

Requests must be sent as JSON in **text frames**, one request per frame.

Example of request:

```json
{
  "id": "e2a85d9f-07a5-4f94-8d5f-789dc3deb097",
  "method": "order.place",
  "params": {
    "symbol": "BTCUSDT",
    "side": "BUY",
    "type": "LIMIT",
    "price": "0.1",
    "quantity": "10",
    "timeInForce": "GTC",
    "timestamp": 1655716096498,
    "apiKey": "T59MTDLWlpRW16JVeZ2Nju5A5C98WkMm8CSzWC4oqynUlTm1zXOxyauT8LmwXEv9",
    "signature": "5942ad337e6779f2f4c62cd1c26dba71c91514400a24990a3e7f5edec9323f90"
  }
}
```

Request fields:

| Name       | Type                    | Mandatory | Description                                                     |
| ---------- | ----------------------- | --------- | --------------------------------------------------------------- |
| \-`id`     | \-INT / STRING / `null` | \-YES     | \-Arbitrary ID used to match responses to requests              |
| \-`method` | \-STRING                | \-YES     | \-Request method name                                           |
| \-`params` | \-OBJECT                | \-NO      | \-Request parameters. May be omitted if there are no parameters |

- Request `id` is truly arbitrary. You can use UUIDs, sequential IDs, current
  timestamp, etc. The server does not interpret `id` in any way, simply echoing
  it back in the response.

  You can freely reuse IDs within a session. However, be careful to not send
  more than one request at a time with the same ID, since otherwise it might be
  impossible to tell the responses apart.

- Request method names may be prefixed with explicit version: e.g.,
  `"v3/order.place"`.
- The order of `params` is not significant.

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/request-format](https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/request-format)

## Response format

Responses are returned as JSON in **text frames**, one response per frame.

Example of successful response:

```json
{
  "id": "e2a85d9f-07a5-4f94-8d5f-789dc3deb097",
  "status": 200,
  "result": {
    "symbol": "BTCUSDT",
    "orderId": 12510053279,
    "orderListId": -1,
    "clientOrderId": "a097fe6304b20a7e4fc436",
    "transactTime": 1655716096505,
    "price": "0.10000000",
    "origQty": "10.00000000",
    "executedQty": "0.00000000",
    "origQuoteOrderQty": "0.000000",
    "cummulativeQuoteQty": "0.00000000",
    "status": "NEW",
    "timeInForce": "GTC",
    "type": "LIMIT",
    "side": "BUY",
    "workingTime": 1655716096505,
    "selfTradePreventionMode": "NONE"
  },
  "rateLimits": [
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 10,
      "limit": 50,
      "count": 12
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "DAY",
      "intervalNum": 1,
      "limit": 160000,
      "count": 4043
    },
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 321
    }
  ]
}
```

Example of failed response:

```json
{
  "id": "e2a85d9f-07a5-4f94-8d5f-789dc3deb097",
  "status": 400,
  "error": {
    "code": -2010,
    "msg": "Account has insufficient balance for requested action."
  },
  "rateLimits": [
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 10,
      "limit": 50,
      "count": 13
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "DAY",
      "intervalNum": 1,
      "limit": 160000,
      "count": 4044
    },
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 322
    }
  ]
}
```

Response fields:

| Name           | Type                    | Mandatory                                      | Description                                                                                                      |
| -------------- | ----------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| \-`id`         | \-INT / STRING / `null` | \-YES                                          | \-Same as in the original request                                                                                |
| \-`status`     | \-INT                   | \-YES                                          | \-Response status. See [Status codes](/docs/binance-spot-api-docs/websocket-api/response-format#status-codes)    |
| \-`result`     | \-OBJECT / ARRAY        | \-YES                                          | \-Response content. Present if request succeeded                                                                 |
| \-`error`      | \-OBJECT                | \-Error description. Present if request failed |
| \-`rateLimits` | \-ARRAY                 | \-NO                                           | \-Rate limiting status. See [Rate limits](/docs/binance-spot-api-docs/websocket-api/response-format#rate-limits) |

#### Status codes

Status codes in the `status` field are the same as in HTTP.

Here are some common status codes that you might encounter:

- `200` indicates a successful response.
- `4XX` status codes indicate invalid requests; the issue is on your side.
  - `400` – your request failed, see `error` for the reason.
  - `403` – you have been blocked by the Web Application Firewall.
  - `409` – your request partially failed but also partially succeeded, see
    `error` for details.
  - `418` – you have been auto-banned for repeated violation of rate limits.
  - `429` – you have exceeded API request rate limit, please slow down.
- `5XX` status codes indicate internal errors; the issue is on Binance's side.
  - **Important:** If a response contains 5xx status code, it **does not**
    necessarily mean that your request has failed. Execution status is _unknown_
    and the request might have actually succeeded. Please use query methods to
    confirm the status. You might also want to establish a new WebSocket
    connection for that.

See [Error codes for Binance](/docs/binance-spot-api-docs/errors) for a list of
error codes and messages.

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/response-format](https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/response-format)

## Event format

User Data Stream events for non-SBE sessions are sent as JSON in **text
frames**, one event per frame.

Events in SBE sessions will be sent as **binary frames**.

Please refer to
[`userDataStream.subscribe`](/docs/binance-spot-api-docs/websocket-api/user-data-stream-requests#user_data_stream_subscribe)
for details on how to subscribe to User Data Stream in WebSocket API.

Example of an event:

```json
{
  "event": {
    "e": "outboundAccountPosition",
    "E": 1728972148778,
    "u": 1728972148778,
    "B": [
      {
        "a": "ABC",
        "f": "11818.00000000",
        "l": "182.00000000"
      },
      {
        "a": "DEF",
        "f": "10580.00000000",
        "l": "70.00000000"
      }
    ]
  }
}
```

Event fields:

| Name      | Type     | Mandatory | Description                                                                            |
| --------- | -------- | --------- | -------------------------------------------------------------------------------------- |
| \-`event` | \-OBJECT | \-YES     | \-Event payload. See [User Data Streams](/docs/binance-spot-api-docs/user-data-stream) |

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/event-format](https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/event-format)

## Request security

- Every method has a security type which determines how to call it.
  - Security type is stated next to the method name. For example,
    [Place new order (TRADE)](/docs/binance-spot-api-docs/websocket-api/request-security#place-new-order-trade).
  - If no security type is stated, the security type is NONE.

| Security type   | API key    | Signature  | Description                                                                  |
| --------------- | ---------- | ---------- | ---------------------------------------------------------------------------- |
| \-`NONE`        |            |            | \-Public market data                                                         |
| \-`TRADE`       | \-required | \-required | \-Trading on the exchange, placing and canceling orders                      |
| \-`USER_DATA`   | \-required | \-required | \-Private account information, such as order status and your trading history |
| \-`USER_STREAM` | \-required |            | \-Managing User Data Stream subscriptions                                    |

- Secure methods require a valid API key to be specified and authenticated.
  - API keys can be created on the
    [API Management](https://www.binance.com/en/support/faq/360002502072) page
    of your Binance account.
  - **Both API key and secret key are sensitive.** Never share them with anyone.
    If you notice unusual activity in your account, immediately revoke all the
    keys and contact Binance support.
- API keys can be configured to allow access only to certain types of secure
  methods.
  - For example, you can have an API key with `TRADE` permission for trading,
    while using a separate API key with `USER_DATA` permission to monitor your
    order status.
  - By default, an API key cannot `TRADE`. You need to enable trading in API
    Management first.
- `TRADE` and `USER_DATA` requests are also known as `SIGNED` requests.

#### SIGNED (TRADE and USER_DATA) request security

- `SIGNED` requests require an additional parameter: `signature`, authorizing
  the request.
- Please consult
  [SIGNED request example (HMAC)](/docs/binance-spot-api-docs/websocket-api/request-security#signed-request-example-hmac),
  [SIGNED request example (RSA)](/docs/binance-spot-api-docs/websocket-api/request-security#signed-request-example-rsa),
  and
  [SIGNED request example (Ed25519)](/docs/binance-spot-api-docs/websocket-api/request-security#signed-request-example-ed25519)
  on how to compute signature, depending on which API key type you are using.

#### Timing security

- `SIGNED` requests also require a `timestamp` parameter which should be the
  current timestamp either in milliseconds or microseconds. (See
  [General API Information](/docs/binance-spot-api-docs/websocket-api/request-security#general-api-information))
- An additional optional parameter, `recvWindow`, specifies for how long the
  request stays valid and may only be specified in milliseconds.
  - If `recvWindow` is not sent, **it defaults to 5000 milliseconds**.
  - Maximum `recvWindow` is 60000 milliseconds.
- Request processing logic is as follows:

```javascript
serverTime = getCurrentTime()
if (timestamp < (serverTime + 1 second) && (serverTime - timestamp) <= recvWindow) {
  // begin processing request
  serverTime = getCurrentTime()
  if (serverTime - timestamp) <= recvWindow {
    // forward request to Matching Engine
  } else {
    // reject request
  }
  // finish processing request
} else {
  // reject request
}
```

**Serious trading is about timing.** Networks can be unstable and unreliable,
which can lead to requests taking varying amounts of time to reach the servers.
With `recvWindow`, you can specify that the request must be processed within a
certain number of milliseconds or be rejected by the server.

**It is recommended to use a small `recvWindow` of 5000 or less!**

#### SIGNED request example (HMAC)

Here is a step-by-step guide on how to sign requests using HMAC secret key.

Example API key and secret key:

| Key         | Value                                                                |
| ----------- | -------------------------------------------------------------------- |
| \-apiKey    | \-`vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A` |
| \-secretKey | \-`NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j` |

**WARNING: DO NOT SHARE YOUR API KEY AND SECRET KEY WITH ANYONE.**

The example keys are provided here only for illustrative purposes.

Example of request:

```json
{
  "id": "4885f793-e5ad-4c3b-8f6c-55d891472b71",
  "method": "order.place",
  "params": {
    "symbol": "BTCUSDT",
    "side": "SELL",
    "type": "LIMIT",
    "timeInForce": "GTC",
    "quantity": "0.01000000",
    "price": "52000.00",
    "newOrderRespType": "ACK",
    "recvWindow": 100,
    "timestamp": 1645423376532,
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "------ FILL ME ------"
  }
}
```

As you can see, the `signature` parameter is currently missing.

**Step 1. Construct the signature payload**

Take all request `params` except for the `signature`, sort them by name in
alphabetical order:

| Parameter          | Value                                                              |
| ------------------ | ------------------------------------------------------------------ |
| \-apiKey           | \-vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A |
| \-newOrderRespType | \-ACK                                                              |
| \-price            | \-52000.00                                                         |
| \-quantity         | \-0.01000000                                                       |
| \-recvWindow       | \-100                                                              |
| \-side             | \-SELL                                                             |
| \-symbol           | \-BTCUSDT                                                          |
| \-timeInForce      | \-GTC                                                              |
| \-timestamp        | \-1645423376532                                                    |
| \-type             | \-LIMIT                                                            |

Format parameters as `parameter=value` pairs separated by `&`.

Resulting signature payload:

```null
apiKey=vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A&newOrderRespType=ACK&price=52000.00&quantity=0.01000000&recvWindow=100&side=SELL&symbol=BTCUSDT&timeInForce=GTC&timestamp=1645423376532&type=LIMIT
```

**Step 2. Compute the signature**

1.  Interpret `secretKey` as ASCII data, using it as a key for HMAC-SHA-256.
2.  Sign signature payload as ASCII data.
3.  Encode HMAC-SHA-256 output as a hex string.

Note that `apiKey`, `secretKey`, and the payload are **case-sensitive**, while
resulting signature value is case-insensitive.

You can cross-check your signature algorithm implementation with OpenSSL:

```shell
$ echo -n 'apiKey=vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A&newOrderRespType=ACK&price=52000.00&quantity=0.01000000&recvWindow=100&side=SELL&symbol=BTCUSDT&timeInForce=GTC&timestamp=1645423376532&type=LIMIT' \
  | openssl dgst -hex -sha256 -hmac 'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j'

cc15477742bd704c29492d96c7ead9414dfd8e0ec4a00f947bb5bb454ddbd08a
```

**Step 3. Add `signature` to request `params`**

Finally, complete the request by adding the `signature` parameter with the
signature string.

```json
{
  "id": "4885f793-e5ad-4c3b-8f6c-55d891472b71",
  "method": "order.place",
  "params": {
    "symbol": "BTCUSDT",
    "side": "SELL",
    "type": "LIMIT",
    "timeInForce": "GTC",
    "quantity": "0.01000000",
    "price": "52000.00",
    "newOrderRespType": "ACK",
    "recvWindow": 100,
    "timestamp": 1645423376532,
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "cc15477742bd704c29492d96c7ead9414dfd8e0ec4a00f947bb5bb454ddbd08a"
  }
}
```

#### SIGNED request example (RSA)

Here is a step-by-step guide on how to sign requests using your RSA private key.

| Key      | Value                                                                |
| -------- | -------------------------------------------------------------------- |
| \-apiKey | \-`CAvIjXy3F44yW6Pou5k8Dy1swsYDWJZLeoK2r8G4cFDnE9nosRppc2eKc1T8TRTQ` |

In this example, we assume the private key is stored in the `test-prv-key.pem`
file.

**WARNING: DO NOT SHARE YOUR API KEY AND PRIVATE KEY WITH ANYONE.**

The example keys are provided here only for illustrative purposes.

Example of request:

```json
{
  "id": "4885f793-e5ad-4c3b-8f6c-55d891472b71",
  "method": "order.place",
  "params": {
    "symbol": "BTCUSDT",
    "side": "SELL",
    "type": "LIMIT",
    "timeInForce": "GTC",
    "quantity": "0.01000000",
    "price": "52000.00",
    "newOrderRespType": "ACK",
    "recvWindow": 100,
    "timestamp": 1645423376532,
    "apiKey": "CAvIjXy3F44yW6Pou5k8Dy1swsYDWJZLeoK2r8G4cFDnE9nosRppc2eKc1T8TRTQ",
    "signature": "------ FILL ME ------"
  }
}
```

**Step 1. Construct the signature payload**

Take all request `params` except for the `signature`, sort them by name in
alphabetical order:

| Parameter          | Value                                                              |
| ------------------ | ------------------------------------------------------------------ |
| \-apiKey           | \-CAvIjXy3F44yW6Pou5k8Dy1swsYDWJZLeoK2r8G4cFDnE9nosRppc2eKc1T8TRTQ |
| \-newOrderRespType | \-ACK                                                              |
| \-price            | \-52000.00                                                         |
| \-quantity         | \-0.01000000                                                       |
| \-recvWindow       | \-100                                                              |
| \-side             | \-SELL                                                             |
| \-symbol           | \-BTCUSDT                                                          |
| \-timeInForce      | \-GTC                                                              |
| \-timestamp        | \-1645423376532                                                    |
| \-type             | \-LIMIT                                                            |

Format parameters as `parameter=value` pairs separated by `&`.

Resulting signature payload:

```null
apiKey=CAvIjXy3F44yW6Pou5k8Dy1swsYDWJZLeoK2r8G4cFDnE9nosRppc2eKc1T8TRTQ&newOrderRespType=ACK&price=52000.00&quantity=0.01000000&recvWindow=100&side=SELL&symbol=BTCUSDT&timeInForce=GTC&timestamp=1645423376532&type=LIMIT
```

**Step 2. Compute the signature**

1.  Encode signature payload as ASCII data.
2.  Sign payload using RSASSA-PKCS1-v1_5 algorithm with SHA-256 hash function.
3.  Encode output as base64 string.

Note that `apiKey`, the payload, and the resulting `signature` are
**case-sensitive**.

You can cross-check your signature algorithm implementation with OpenSSL:

```shell
$ echo -n 'apiKey=CAvIjXy3F44yW6Pou5k8Dy1swsYDWJZLeoK2r8G4cFDnE9nosRppc2eKc1T8TRTQ&newOrderRespType=ACK&price=52000.00&quantity=0.01000000&recvWindow=100&side=SELL&symbol=BTCUSDT&timeInForce=GTC&timestamp=1645423376532&type=LIMIT' \
  | openssl dgst -sha256 -sign test-prv-key.pem \
  | openssl enc -base64 -A

OJJaf8C/3VGrU4ATTR4GiUDqL2FboSE1Qw7UnnoYNfXTXHubIl1iaePGuGyfct4NPu5oVEZCH4Q6ZStfB1w4ssgu0uiB/Bg+fBrRFfVgVaLKBdYHMvT+ljUJzqVaeoThG9oXlduiw8PbS9U8DYAbDvWN3jqZLo4Z2YJbyovyDAvDTr/oC0+vssLqP7NmlNb3fF3Bj7StmOwJvQJTbRAtzxK5PP7OQe+0mbW+D7RqVkUiSswR8qJFWTeSe4nXXNIdZdueYhF/Xf25L+KitJS5IHdIHcKfEw3MQzHFb2ZsGWkjDQwxkwr7Noi0Zaa+gFtxCuatGFm9dFIyx217pmSHtA==
```

**Step 3. Add `signature` to request `params`**

Finally, complete the request by adding the `signature` parameter with the
signature string.

```json
{
  "id": "4885f793-e5ad-4c3b-8f6c-55d891472b71",
  "method": "order.place",
  "params": {
    "symbol": "BTCUSDT",
    "side": "SELL",
    "type": "LIMIT",
    "timeInForce": "GTC",
    "quantity": "0.01000000",
    "price": "52000.00",
    "newOrderRespType": "ACK",
    "recvWindow": 100,
    "timestamp": 1645423376532,
    "apiKey": "CAvIjXy3F44yW6Pou5k8Dy1swsYDWJZLeoK2r8G4cFDnE9nosRppc2eKc1T8TRTQ",
    "signature": "OJJaf8C/3VGrU4ATTR4GiUDqL2FboSE1Qw7UnnoYNfXTXHubIl1iaePGuGyfct4NPu5oVEZCH4Q6ZStfB1w4ssgu0uiB/Bg+fBrRFfVgVaLKBdYHMvT+ljUJzqVaeoThG9oXlduiw8PbS9U8DYAbDvWN3jqZLo4Z2YJbyovyDAvDTr/oC0+vssLqP7NmlNb3fF3Bj7StmOwJvQJTbRAtzxK5PP7OQe+0mbW+D7RqVkUiSswR8qJFWTeSe4nXXNIdZdueYhF/Xf25L+KitJS5IHdIHcKfEw3MQzHFb2ZsGWkjDQwxkwr7Noi0Zaa+gFtxCuatGFm9dFIyx217pmSHtA=="
  }
}
```

#### SIGNED Request Example (Ed25519)

**Note: It is highly recommended to use Ed25519 API keys as it should provide
the best performance and security out of all supported key types.**

| Parameter       | Value           |
| --------------- | --------------- |
| \-`symbol`      | \-BTCUSDT       |
| \-`side`        | \-SELL          |
| \-`type`        | \-LIMIT         |
| \-`timeInForce` | \-GTC           |
| \-`quantity`    | \-1             |
| \-`price`       | \-0.2           |
| \-`timestamp`   | \-1668481559918 |

This is a sample code in Python to show how to sign the payload with an Ed25519
key.

```python
#!/usr/bin/env python3

import base64
import time
import json
from cryptography.hazmat.primitives.serialization import load_pem_private_key
from websocket import create_connection

# Set up authentication
API_KEY='put your own API Key here'
PRIVATE_KEY_PATH='test-prv-key.pem'

# Load the private key.
# In this example the key is expected to be stored without encryption,
# but we recommend using a strong password for improved security.
with open(PRIVATE_KEY_PATH, 'rb') as f:
    private_key = load_pem_private_key(data=f.read(),
                                       password=None)

# Set up the request parameters
params = {
    'apiKey':        API_KEY,
    'symbol':       'BTCUSDT',
    'side':         'SELL',
    'type':         'LIMIT',
    'timeInForce':  'GTC',
    'quantity':     '1.0000000',
    'price':        '0.20'
}

# Timestamp the request
timestamp = int(time.time() * 1000) # UNIX timestamp in milliseconds
params['timestamp'] = timestamp

# Sign the request
payload = '&'.join([f'{param}={value}' for param, value in sorted(params.items())])

signature = base64.b64encode(private_key.sign(payload.encode('ASCII')))
params['signature'] = signature.decode('ASCII')

# Send the request
request = {
    'id': 'my_new_order',
    'method': 'order.place',
    'params': params
}

ws = create_connection("wss://ws-api.binance.com:443/ws-api/v3")
ws.send(json.dumps(request))
result =  ws.recv()
ws.close()

print(result)
```

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/request-security](https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/request-security)

## Session Authentication

**Note:** Only _Ed25519_ keys are supported for this feature.

If you do not want to specify `apiKey` and `signature` in each individual
request, you can authenticate your API key for the active WebSocket session.

Once authenticated, you no longer have to specify `apiKey` and `signature` for
those requests that need them. Requests will be performed on behalf of the
account owning the authenticated API key.

**Note:** You still have to specify the `timestamp` parameter for `SIGNED`
requests.

#### Authenticate after connection

You can authenticate an already established connection using session
authentication requests:

- [`session.logon`](/docs/binance-spot-api-docs/websocket-api/session-authentication#log-in-with-api-key-signed)
  – authenticate, or change the API key associated with the connection
- [`session.status`](/docs/binance-spot-api-docs/websocket-api/session-authentication#query-session-status)
  – check connection status and the current API key
- [`session.logout`](/docs/binance-spot-api-docs/websocket-api/session-authentication#log-out-of-the-session)
  – forget the API key associated with the connection

**Regarding API key revocation:**

If during an active session the API key becomes invalid for _any reason_ (e.g.
IP address is not whitelisted, API key was deleted, API key doesn't have correct
permissions, etc), after the next request the session will be revoked with the
following error message:

```json
{
  "id": null,
  "status": 401,
  "error": {
    "code": -2015,
    "msg": "Invalid API-key, IP, or permissions for action."
  }
}
```

#### Authorize _ad hoc_ requests

Only one API key can be authenticated with the WebSocket connection. The
authenticated API key is used by default for requests that require an `apiKey`
parameter. However, you can always specify the `apiKey` and `signature`
explicitly for individual requests, overriding the authenticated API key and
using a different one to authorize a specific request.

For example, you might want to authenticate your `USER_DATA` key to be used by
default, but specify the `TRADE` key with an explicit signature when placing
orders.

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/session-authentication](https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/session-authentication)

## Data sources

- The API system is asynchronous. Some delay in the response is normal and
  expected.
- Each method has a data source indicating where the data is coming from, and
  thus how up-to-date it is.

| Data Source       | Latency    | Description                                                        |
| ----------------- | ---------- | ------------------------------------------------------------------ |
| \-Matching Engine | \-lowest   | \-The Matching Engine produces the response directly               |
| \-Memory          | \-low      | \-Data is fetched from API server's local or external memory cache |
| \-Database        | \-moderate | \-Data is retrieved from the database                              |

- Some methods have more than one data source (e.g., Memory => Database).

  This means that the API will look for the latest data in that order: first in
  the cache, then in the database.

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/data-sources](https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/data-sources)

## General requests

#### Test connectivity

```json
{
  "id": "922bcc6e-9de8-440d-9e84-7c80933a8d0d",
  "method": "ping"
}
```

Test connectivity to the WebSocket API.

**Note:** You can use regular WebSocket ping frames to test connectivity as
well, WebSocket API will respond with pong frames as soon as possible. `ping`
request along with `time` is a safe way to test request-response handling in
your application.

**Weight:** 1

**Parameters:** NONE

**Data Source:** Memory

**Response:**

```json
{
  "id": "922bcc6e-9de8-440d-9e84-7c80933a8d0d",
  "status": 200,
  "result": {},
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

#### Check server time

```json
{
  "id": "187d3cb2-942d-484c-8271-4e2141bbadb1",
  "method": "time"
}
```

Test connectivity to the WebSocket API and get the current server time.

**Weight:** 1

**Parameters:** NONE

**Data Source:** Memory

**Response:**

```json
{
  "id": "187d3cb2-942d-484c-8271-4e2141bbadb1",
  "status": 200,
  "result": {
    "serverTime": 1656400526260
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

#### Exchange information

```json
{
  "id": "5494febb-d167-46a2-996d-70533eb4d976",
  "method": "exchangeInfo",
  "params": {
    "symbols": ["BNBBTC"]
  }
}
```

Query current exchange trading rules, rate limits, and symbol information.

**Weight:** 20

**Parameters:**

| Name                   | Type              | Mandatory                                                                                                                                           | Description                |
| ---------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| \-`symbol`             | \-STRING          | \-NO                                                                                                                                                | \-Describe a single symbol |
| \-`symbols`            | \-ARRAY of STRING | \-Describe multiple symbols                                                                                                                         |
| \-`permissions`        | \-ARRAY of STRING | \-Filter symbols by permissions                                                                                                                     |
| \-`showPermissionSets` | \-BOOLEAN         | \-Controls whether the content of the `permissionSets` field is populated or not. Defaults to `true`.                                               |
| \-`symbolStatus`       | \-ENUM            | \-Filters symbols that have this `tradingStatus`. Valid values: `TRADING`, `HALT`, `BREAK` Cannot be used in combination with `symbol` or `symbols` |

Notes:

- Only one of `symbol`, `symbols`, `permissions` parameters can be specified.
- Without parameters, `exchangeInfo` displays all symbols with
  `["SPOT, "MARGIN", "LEVERAGED"]` permissions.

  - In order to list _all_ active symbols on the exchange, you need to
    explicitly request all permissions.

- `permissions` accepts either a list of permissions, or a single permission
  name. E.g. `"SPOT"`.
- [Available Permissions](/docs/binance-spot-api-docs/enums#account-and-symbol-permissions)

**Examples of Symbol Permissions Interpretation from the Response:**

- `[["A","B"]]` means you may place an order if your account has either
  permission "A" **or** permission "B".
- `[["A"],["B"]]` means you can place an order if your account has permission
  "A" **and** permission "B".
- `[["A"],["B","C"]]` means you can place an order if your account has
  permission "A" **and** permission "B" or permission "C". (Inclusive or is
  applied here, not exclusive or, so your account may have both permission "B"
  and permission "C".)

**Data Source:** Memory

**Response:**

```json
{
  "id": "5494febb-d167-46a2-996d-70533eb4d976",
  "status": 200,
  "result": {
    "timezone": "UTC",
    "serverTime": 1655969291181,
    // Global rate limits. See "Rate limits" section.
    "rateLimits": [
      {
        "rateLimitType": "REQUEST_WEIGHT", // Rate limit type: REQUEST_WEIGHT, ORDERS, CONNECTIONS
        "interval": "MINUTE", // Rate limit interval: SECOND, MINUTE, DAY
        "intervalNum": 1, // Rate limit interval multiplier (i.e., "1 minute")
        "limit": 6000 // Rate limit per interval
      },
      {
        "rateLimitType": "ORDERS",
        "interval": "SECOND",
        "intervalNum": 10,
        "limit": 50
      },
      {
        "rateLimitType": "ORDERS",
        "interval": "DAY",
        "intervalNum": 1,
        "limit": 160000
      },
      {
        "rateLimitType": "CONNECTIONS",
        "interval": "MINUTE",
        "intervalNum": 5,
        "limit": 300
      }
    ],
    // Exchange filters are explained on the "Filters" page:
    // https://github.com/binance/binance-spot-api-docs/blob/master/filters.md
    // All exchange filters are optional.
    "exchangeFilters": [],
    "symbols": [
      {
        "symbol": "BNBBTC",
        "status": "TRADING",
        "baseAsset": "BNB",
        "baseAssetPrecision": 8,
        "quoteAsset": "BTC",
        "quotePrecision": 8,
        "quoteAssetPrecision": 8,
        "baseCommissionPrecision": 8,
        "quoteCommissionPrecision": 8,
        "orderTypes": [
          "LIMIT",
          "LIMIT_MAKER",
          "MARKET",
          "STOP_LOSS_LIMIT",
          "TAKE_PROFIT_LIMIT"
        ],
        "icebergAllowed": true,
        "ocoAllowed": true,
        "otoAllowed": true,
        "quoteOrderQtyMarketAllowed": true,
        "allowTrailingStop": true,
        "cancelReplaceAllowed": true,
        "amendAllowed": false,
        "pegInstructionsAllowed": true,
        "isSpotTradingAllowed": true,
        "isMarginTradingAllowed": true,
        // Symbol filters are explained on the "Filters" page:
        // https://github.com/binance/binance-spot-api-docs/blob/master/filters.md
        // All symbol filters are optional.
        "filters": [
          {
            "filterType": "PRICE_FILTER",
            "minPrice": "0.00000100",
            "maxPrice": "100000.00000000",
            "tickSize": "0.00000100"
          },
          {
            "filterType": "LOT_SIZE",
            "minQty": "0.00100000",
            "maxQty": "100000.00000000",
            "stepSize": "0.00100000"
          }
        ],
        "permissions": [],
        "permissionSets": [["SPOT", "MARGIN", "TRD_GRP_004"]],
        "defaultSelfTradePreventionMode": "NONE",
        "allowedSelfTradePreventionModes": ["NONE"]
      }
    ],
    // Optional field. Present only when SOR is available.
    // https://github.com/binance/binance-spot-api-docs/blob/master/faqs/sor_faq.md
    "sors": [
      {
        "baseAsset": "BTC",
        "symbols": ["BTCUSDT", "BTCUSDC"]
      }
    ]
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 20
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/general-requests](https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/general-requests)

## Authentication requests

**Note:** Only _Ed25519_ keys are supported for this feature.

#### Log in with API key (SIGNED)

```json
{
  "id": "c174a2b1-3f51-4580-b200-8528bd237cb7",
  "method": "session.logon",
  "params": {
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "1cf54395b336b0a9727ef27d5d98987962bc47aca6e13fe978612d0adee066ed",
    "timestamp": 1649729878532
  }
}
```

Authenticate WebSocket connection using the provided API key.

After calling `session.logon`, you can omit `apiKey` and `signature` parameters
for future requests that require them.

Note that only one API key can be authenticated. Calling `session.logon`
multiple times changes the current authenticated API key.

**Weight:** 2

**Parameters:**

| Name           | Type     | Mandatory | Description                                |
| -------------- | -------- | --------- | ------------------------------------------ |
| \-`apiKey`     | \-STRING | \-YES     |                                            |
| \-`recvWindow` | \-LONG   | \-NO      | \-The value cannot be greater than `60000` |
| \-`signature`  | \-STRING | \-YES     |                                            |
| \-`timestamp`  | \-LONG   | \-YES     |                                            |

**Data Source:** Memory

**Response:**

```json
{
  "id": "c174a2b1-3f51-4580-b200-8528bd237cb7",
  "status": 200,
  "result": {
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "authorizedSince": 1649729878532,
    "connectedSince": 1649729873021,
    "returnRateLimits": false,
    "serverTime": 1649729878630,
    "userDataStream": false // is User Data Stream subscription active?
  }
}
```

#### Query session status

```json
{
  "id": "b50c16cd-62c9-4e29-89e4-37f10111f5bf",
  "method": "session.status"
}
```

Query the status of the WebSocket connection, inspecting which API key (if any)
is used to authorize requests.

**Weight:** 2

**Parameters:** NONE

**Data Source:** Memory

**Response:**

```json
{
  "id": "b50c16cd-62c9-4e29-89e4-37f10111f5bf",
  "status": 200,
  "result": {
    // if the connection is not authenticated, "apiKey" and "authorizedSince" will be shown as null
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "authorizedSince": 1649729878532,
    "connectedSince": 1649729873021,
    "returnRateLimits": false,
    "serverTime": 1649730611671,
    "userDataStream": true // is User Data Stream subscription active?
  }
}
```

#### Log out of the session

```json
{
  "id": "c174a2b1-3f51-4580-b200-8528bd237cb7",
  "method": "session.logout"
}
```

Forget the API key previously authenticated. If the connection is not
authenticated, this request does nothing.

Note that the WebSocket connection stays open after `session.logout` request.
You can continue using the connection, but now you will have to explicitly
provide the `apiKey` and `signature` parameters where needed.

**Weight:** 2

**Parameters:** NONE

**Data Source:** Memory

**Response:**

```json
{
  "id": "c174a2b1-3f51-4580-b200-8528bd237cb7",
  "status": 200,
  "result": {
    "apiKey": null,
    "authorizedSince": null,
    "connectedSince": 1649729873021,
    "returnRateLimits": false,
    "serverTime": 1649730611671,
    "userDataStream": false // is User Data Stream subscription active?
  }
}
```

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/authentication-requests](https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/authentication-requests)

## Trading requests

#### Place new order (TRADE)

```json
{
  "id": "56374a46-3061-486b-a311-99ee972eb648",
  "method": "order.place",
  "params": {
    "symbol": "BTCUSDT",
    "side": "SELL",
    "type": "LIMIT",
    "timeInForce": "GTC",
    "price": "23416.10000000",
    "quantity": "0.00847000",
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "15af09e41c36f3cc61378c2fbe2c33719a03dd5eba8d0f9206fbda44de717c88",
    "timestamp": 1660801715431
  }
}
```

Send in a new order.

This adds 1 order to the `EXCHANGE_MAX_ORDERS` filter and the `MAX_NUM_ORDERS`
filter.

**Weight:** 1

**Unfilled Order Count:** 1

**Parameters:**

| Name                 | Type      | Mandatory | Description                                                                  |
| -------------------- | --------- | --------- | ---------------------------------------------------------------------------- |
| \-`symbol`           | \-STRING  | \-YES     |                                                                              |
| \-`side`             | \-ENUM    | \-YES     | \-`BUY` or `SELL`                                                            |
| \-`type`             | \-ENUM    | \-YES     |                                                                              |
| \-`timeInForce`      | \-ENUM    | \-NO \*   |                                                                              |
| \-`price`            | \-DECIMAL | \-NO \*   |                                                                              |
| \-`quantity`         | \-DECIMAL | \-NO \*   |                                                                              |
| \-`quoteOrderQty`    | \-DECIMAL | \-NO \*   |                                                                              |
| \-`newClientOrderId` | \-STRING  | \-NO      | \-Arbitrary unique ID among open orders. Automatically generated if not sent |
| \-`newOrderRespType` | \-ENUM    | \-NO      | \-                                                                           |

Select response format: `ACK`, `RESULT`, `FULL`.

`MARKET` and `LIMIT` orders use `FULL` by default, other order types default to
`ACK`.

| | \-`stopPrice` | \-DECIMAL | \-NO \* | | | \-`trailingDelta` | \-INT |
\-NO \* | \-See
[Trailing Stop order FAQ](/docs/binance-spot-api-docs/faqs/trailing-stop-faq) |
| \-`icebergQty` | \-DECIMAL | \-NO | | | \-`strategyId` | \-LONG | \-NO |
\-Arbitrary numeric value identifying the order within an order strategy. | |
\-`strategyType` | \-INT | \-NO | \-

Arbitrary numeric value identifying the order strategy.

Values smaller than `1000000` are reserved and cannot be used.

| | \-`selfTradePreventionMode` | \-ENUM | \-NO | \-The allowed enums is
dependent on what is configured on the symbol. Supported values:
[STP Modes](/docs/binance-spot-api-docs/enums#stpmodes) | | \-`pegPriceType` |
\-ENUM | \-NO | \-`PRIMARY_PEG` or `MARKET_PEG` See
[Pegged Orders](/docs/binance-spot-api-docs/websocket-api/trading-requests#pegged-orders-info)
| | \-`pegOffsetValue` | \-INT | \-NO | \-Price level to peg the price to
(max: 100) See
[Pegged Orders](/docs/binance-spot-api-docs/websocket-api/trading-requests#pegged-orders-info)
| | \-`pegOffsetType` | \-ENUM | \-NO | \-Only `PRICE_LEVEL` is supported See
[Pegged Orders](/docs/binance-spot-api-docs/websocket-api/trading-requests#pegged-orders-info)
| | \-`apiKey` | \-STRING | \-YES | | | \-`recvWindow` | \-LONG | \-NO | \-The
value cannot be greater than `60000` | | \-`signature` | \-STRING | \-YES | | |
\-`timestamp` | \-LONG | \-YES | |

Certain parameters (\*) become mandatory based on the order `type`:

| Order `type` | Mandatory parameters |
| ------------ | -------------------- |
| \-`LIMIT`    | \-                   |

- `timeInForce`
- `price`
- `quantity`

| | \-`LIMIT_MAKER` | \-

- `price`
- `quantity`

| | \-`MARKET` | \-

- `quantity` or `quoteOrderQty`

| | \-`STOP_LOSS` | \-

- `quantity`
- `stopPrice` or `trailingDelta`

| | \-`STOP_LOSS_LIMIT` | \-

- `timeInForce`
- `price`
- `quantity`
- `stopPrice` or `trailingDelta`

| | \-`TAKE_PROFIT` | \-

- `quantity`
- `stopPrice` or `trailingDelta`

| | \-`TAKE_PROFIT_LIMIT` | \-

- `timeInForce`
- `price`
- `quantity`
- `stopPrice` or `trailingDelta`

|

Supported order types:

| Order `type` | Description |
| ------------ | ----------- |
| \-`LIMIT`    | \-          |

Buy or sell `quantity` at the specified `price` or better.

| | \-`LIMIT_MAKER` | \-

`LIMIT` order that will be rejected if it immediately matches and trades as a
taker.

This order type is also known as a POST-ONLY order.

| | \-`MARKET` | \-

Buy or sell at the best available market price.

- `MARKET` order with `quantity` parameter specifies the amount of the _base
  asset_ you want to buy or sell. Actually executed quantity of the quote asset
  will be determined by available market liquidity.

  E.g., a MARKET BUY order on BTCUSDT for `"quantity": "0.1000"` specifies that
  you want to buy 0.1 BTC at the best available price. If there is not enough
  BTC at the best price, keep buying at the next best price, until either your
  order is filled, or you run out of USDT, or market runs out of BTC.

- `MARKET` order with `quoteOrderQty` parameter specifies the amount of the
  _quote asset_ you want to spend (when buying) or receive (when selling).
  Actually executed quantity of the base asset will be determined by available
  market liquidity.

  E.g., a MARKET BUY on BTCUSDT for `"quoteOrderQty": "100.00"` specifies that
  you want to buy as much BTC as you can for 100 USDT at the best available
  price. Similarly, a SELL order will sell as much available BTC as needed for
  you to receive 100 USDT (before commission).

| | \-`STOP_LOSS` | \-

Execute a `MARKET` order for given `quantity` when specified conditions are met.

I.e., when `stopPrice` is reached, or when `trailingDelta` is activated.

| | \-`STOP_LOSS_LIMIT` | \-

Place a `LIMIT` order with given parameters when specified conditions are met.

| | \-`TAKE_PROFIT` | \-

Like `STOP_LOSS` but activates when market price moves in the favorable
direction.

| | \-`TAKE_PROFIT_LIMIT` | \-

Like `STOP_LOSS_LIMIT` but activates when market price moves in the favorable
direction.

|

Notes on using parameters for Pegged Orders:

- These parameters are allowed for `LIMIT`, `LIMIT_MAKER`, `STOP_LOSS_LIMIT`,
  `TAKE_PROFIT_LIMIT` orders.
- If `pegPriceType` is specified, `price` becomes optional. Otherwise, it is
  still mandatory.
- `pegPriceType=PRIMARY_PEG` means the primary peg, that is the best price on
  the same side of the order book as your order.
- `pegPriceType=MARKET_PEG` means the market peg, that is the best price on the
  opposite side of the order book from your order.
- Use `pegOffsetType` and `pegOffsetValue` to request a price level other than
  the best one. These parameters must be specified together.

Available `timeInForce` options, setting how long the order should be active
before expiration:

| TIF     | Description                                                                                                              |
| ------- | ------------------------------------------------------------------------------------------------------------------------ |
| \-`GTC` | \-**Good 'til Canceled** – the order will remain on the book until you cancel it, or the order is completely filled.     |
| \-`IOC` | \-**Immediate or Cancel** – the order will be filled for as much as possible, the unfilled quantity immediately expires. |
| \-`FOK` | \-**Fill or Kill** – the order will expire unless it cannot be immediately filled for the entire quantity.               |

Notes:

- `newClientOrderId` specifies `clientOrderId` value for the order.

  A new order with the same `clientOrderId` is accepted only when the previous
  one is filled or expired.

- Any `LIMIT` or `LIMIT_MAKER` order can be made into an iceberg order by
  specifying the `icebergQty`.

  An order with an `icebergQty` must have `timeInForce` set to `GTC`.

- Trigger order price rules for `STOP_LOSS`/`TAKE_PROFIT` orders:

  - `stopPrice` must be above market price: `STOP_LOSS BUY`, `TAKE_PROFIT SELL`
  - `stopPrice` must be below market price: `STOP_LOSS SELL`, `TAKE_PROFIT BUY`

- `MARKET` orders using `quoteOrderQty` follow
  [`LOT_SIZE`](/docs/binance-spot-api-docs/filters#lot_size) filter rules.

  The order will execute a quantity that has notional value as close as possible
  to requested `quoteOrderQty`.

**Data Source:** Matching Engine

**Response:**

Response format is selected by using the `newOrderRespType` parameter.

`ACK` response type:

```json
{
  "id": "56374a46-3061-486b-a311-99ee972eb648",
  "status": 200,
  "result": {
    "symbol": "BTCUSDT",
    "orderId": 12569099453,
    "orderListId": -1, // always -1 for singular orders
    "clientOrderId": "4d96324ff9d44481926157ec08158a40",
    "transactTime": 1660801715639
  },
  "rateLimits": [
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 10,
      "limit": 50,
      "count": 1
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "DAY",
      "intervalNum": 1,
      "limit": 160000,
      "count": 1
    },
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

`RESULT` response type:

```json
{
  "id": "56374a46-3061-486b-a311-99ee972eb648",
  "status": 200,
  "result": {
    "symbol": "BTCUSDT",
    "orderId": 12569099453,
    "orderListId": -1, // always -1 for singular orders
    "clientOrderId": "4d96324ff9d44481926157ec08158a40",
    "transactTime": 1660801715639,
    "price": "23416.10000000",
    "origQty": "0.00847000",
    "executedQty": "0.00000000",
    "origQuoteOrderQty": "0.000000",
    "cummulativeQuoteQty": "0.00000000",
    "status": "NEW",
    "timeInForce": "GTC",
    "type": "LIMIT",
    "side": "SELL",
    "workingTime": 1660801715639,
    "selfTradePreventionMode": "NONE"
  },
  "rateLimits": [
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 10,
      "limit": 50,
      "count": 1
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "DAY",
      "intervalNum": 1,
      "limit": 160000,
      "count": 1
    },
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

`FULL` response type:

```json
{
  "id": "56374a46-3061-486b-a311-99ee972eb648",
  "status": 200,
  "result": {
    "symbol": "BTCUSDT",
    "orderId": 12569099453,
    "orderListId": -1,
    "clientOrderId": "4d96324ff9d44481926157ec08158a40",
    "transactTime": 1660801715793,
    "price": "23416.10000000",
    "origQty": "0.00847000",
    "executedQty": "0.00847000",
    "origQuoteOrderQty": "0.000000",
    "cummulativeQuoteQty": "198.33521500",
    "status": "FILLED",
    "timeInForce": "GTC",
    "type": "LIMIT",
    "side": "SELL",
    "workingTime": 1660801715793,
    // FULL response is identical to RESULT response, with the same optional fields
    // based on the order type and parameters. FULL response additionally includes
    // the list of trades which immediately filled the order.
    "fills": [
      {
        "price": "23416.10000000",
        "qty": "0.00635000",
        "commission": "0.000000",
        "commissionAsset": "BNB",
        "tradeId": 1650422481
      },
      {
        "price": "23416.50000000",
        "qty": "0.00212000",
        "commission": "0.000000",
        "commissionAsset": "BNB",
        "tradeId": 1650422482
      }
    ]
  },
  "rateLimits": [
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 10,
      "limit": 50,
      "count": 1
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "DAY",
      "intervalNum": 1,
      "limit": 160000,
      "count": 1
    },
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

**Conditional fields in Order Responses**

There are fields in the order responses (e.g. order placement, order query,
order cancellation) that appear only if certain conditions are met.

These fields can apply to Order lists.

The fields are listed below:

| Field                 | Description                                                                                                           | Visibility conditions                                                                       | Examples                            |
| --------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------- |
| \-`icebergQty`        | \-Quantity for the iceberg order                                                                                      | \-Appears only if the parameter `icebergQty` was sent in the request.                       | \-`"icebergQty": "0.00000000"`      |
| \-`preventedMatchId`  | \-When used in combination with `symbol`, can be used to query a prevented match.                                     | \-Appears only if the order expired due to STP.                                             | \-`"preventedMatchId": 0`           |
| \-`preventedQuantity` | \-Order quantity that expired due to STP                                                                              | \-Appears only if the order expired due to STP.                                             | \-`"preventedQuantity": "1.200000"` |
| \-`stopPrice`         | \-Price when the algorithmic order will be triggered                                                                  | \-Appears for `STOP_LOSS`. `TAKE_PROFIT`, `STOP_LOSS_LIMIT` and `TAKE_PROFIT_LIMIT` orders. | \-`"stopPrice": "23500.00000000"`   |
| \-`strategyId`        | \-Can be used to label an order that's part of an order strategy.                                                     | \-Appears if the parameter was populated in the request.                                    | \-`"strategyId": 37463720`          |
| \-`strategyType`      | \-Can be used to label an order that is using an order strategy.                                                      | \-Appears if the parameter was populated in the request.                                    | \-`"strategyType": 1000000`         |
| \-`trailingDelta`     | \-Delta price change required before order activation                                                                 | \-Appears for Trailing Stop Orders.                                                         | \-`"trailingDelta": 10`             |
| \-`trailingTime`      | \-Time when the trailing order is now active and tracking price changes                                               | \-Appears only for Trailing Stop Orders.                                                    | \-`"trailingTime": -1`              |
| \-`usedSor`           | \-Field that determines whether order used SOR                                                                        | \-Appears when placing orders using SOR                                                     | \-`"usedSor": true`                 |
| \-`workingFloor`      | \-Field that determines whether the order is being filled by the SOR or by the order book the order was submitted to. | \-Appears when placing orders using SOR                                                     | \-`"workingFloor": "SOR"`           |
| \-`pegPriceType`      | \-Price peg type                                                                                                      | \-Only for pegged orders                                                                    | \-`"pegPriceType": "PRIMARY_PEG"`   |
| \-`pegOffsetType`     | \-Price peg offset type                                                                                               | \-Only for pegged orders, if requested                                                      | \-`"pegOffsetType": "PRICE_LEVEL"`  |
| \-`pegOffsetValue`    | \-Price peg offset value                                                                                              | \-Only for pegged orders, if requested                                                      | \-`"pegOffsetValue": 5`             |
| \-`peggedPrice`       | \-Current price order is pegged at                                                                                    | \-Only for pegged orders, once determined                                                   | \-`"peggedPrice": "87523.83710000"` |

#### Test new order (TRADE)

```json
{
  "id": "6ffebe91-01d9-43ac-be99-57cf062e0e30",
  "method": "order.test",
  "params": {
    "symbol": "BTCUSDT",
    "side": "SELL",
    "type": "LIMIT",
    "timeInForce": "GTC",
    "price": "23416.10000000",
    "quantity": "0.00847000",
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "15af09e41c36f3cc61378c2fbe2c33719a03dd5eba8d0f9206fbda44de717c88",
    "timestamp": 1660801715431
  }
}
```

Test order placement.

Validates new order parameters and verifies your signature but does not send the
order into the matching engine.

**Weight:**

| Condition                          | Request Weight |
| ---------------------------------- | -------------- |
| \-Without `computeCommissionRates` | \-1            |
| \-With `computeCommissionRates`    | \-20           |

**Parameters:**

In addition to all parameters accepted by
[`order.place`](/docs/binance-spot-api-docs/websocket-api/trading-requests#place-new-order-trade),
the following optional parameters are also accepted:

| Name                       | Type      | Mandatory | Description                                                                                                                    |
| -------------------------- | --------- | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| \-`computeCommissionRates` | \-BOOLEAN | \-NO      | \-Default: `false` See [Commissions FAQ](/docs/binance-spot-api-docs/faqs/commission_faq#test-order-diferences) to learn more. |

**Data Source:** Memory

**Response:**

Without `computeCommissionRates`:

```json
{
  "id": "6ffebe91-01d9-43ac-be99-57cf062e0e30",
  "status": 200,
  "result": {},
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

With `computeCommissionRates`:

```json
{
  "id": "6ffebe91-01d9-43ac-be99-57cf062e0e30",
  "status": 200,
  "result": {
    "standardCommissionForOrder": {
      //Standard commission rates on trades from the order.
      "maker": "0.00000112",
      "taker": "0.00000114"
    },
    "specialCommissionForOrder": {
      //Special commission rates on trades from the order.
      "maker": "0.05000000",
      "taker": "0.06000000"
    },
    "taxCommissionForOrder": {
      //Tax commission rates for trades from the order
      "maker": "0.00000112",
      "taker": "0.00000114"
    },
    "discount": {
      //Discount on standard commissions when paying in BNB.
      "enabledForAccount": true,
      "enabledForSymbol": true,
      "discountAsset": "BNB",
      "discount": "0.25000000" //Standard commission is reduced by this rate when paying in BNB.
    }
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 20
    }
  ]
}
```

#### Cancel order (TRADE)

```json
{
  "id": "5633b6a2-90a9-4192-83e7-925c90b6a2fd",
  "method": "order.cancel",
  "params": {
    "symbol": "BTCUSDT",
    "origClientOrderId": "4d96324ff9d44481926157",
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "33d5b721f278ae17a52f004a82a6f68a70c68e7dd6776ed0be77a455ab855282",
    "timestamp": 1660801715830
  }
}
```

Cancel an active order.

**Weight:** 1

**Parameters:**

| Name                   | Type     | Mandatory                         | Description                                                                                                                                                             |
| ---------------------- | -------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \-`symbol`             | \-STRING | \-YES                             |                                                                                                                                                                         |
| \-`orderId`            | \-LONG   | \-YES                             | \-Cancel order by `orderId`                                                                                                                                             |
| \-`origClientOrderId`  | \-STRING | \-Cancel order by `clientOrderId` |
| \-`newClientOrderId`   | \-STRING | \-NO                              | \-New ID for the canceled order. Automatically generated if not sent                                                                                                    |
| \-`cancelRestrictions` | \-ENUM   | \-NO                              | \-Supported values: `ONLY_NEW` - Cancel will succeed if the order status is `NEW`. `ONLY_PARTIALLY_FILLED` - Cancel will succeed if order status is `PARTIALLY_FILLED`. |
| \-`apiKey`             | \-STRING | \-YES                             |                                                                                                                                                                         |
| \-`recvWindow`         | \-LONG   | \-NO                              | \-The value cannot be greater than 60000                                                                                                                                |
| \-`signature`          | \-STRING | \-YES                             |                                                                                                                                                                         |
| \-`timestamp`          | \-LONG   | \-YES                             |                                                                                                                                                                         |

Notes:

- If both `orderId` and `origClientOrderId` parameters are provided, the
  `orderId` is searched first, then the `origClientOrderId` from that result is
  checked against that order. If both conditions are not met the request will be
  rejected.
- `newClientOrderId` will replace `clientOrderId` of the canceled order, freeing
  it up for new orders.
- If you cancel an order that is a part of an order list, the entire order list
  is canceled.
- The performance for canceling an order (single cancel or as part of a
  cancel-replace) is always better when only `orderId` is sent. Sending
  `origClientOrderId` or both `orderId` + `origClientOrderId` will be slower.

**Data Source:** Matching Engine

**Response:**

When an individual order is canceled:

```json
{
  "id": "5633b6a2-90a9-4192-83e7-925c90b6a2fd",
  "status": 200,
  "result": {
    "symbol": "BTCUSDT",
    "origClientOrderId": "4d96324ff9d44481926157", // clientOrderId that was canceled
    "orderId": 12569099453,
    "orderListId": -1, // set only for legs of an order list
    "clientOrderId": "91fe37ce9e69c90d6358c0", // newClientOrderId from request
    "transactTime": 1684804350068,
    "price": "23416.10000000",
    "origQty": "0.00847000",
    "executedQty": "0.00001000",
    "origQuoteOrderQty": "0.000000",
    "cummulativeQuoteQty": "0.23416100",
    "status": "CANCELED",
    "timeInForce": "GTC",
    "type": "LIMIT",
    "side": "SELL",
    "stopPrice": "0.00000000", // present only if stopPrice set for the order
    "trailingDelta": 0, // present only if trailingDelta set for the order
    "icebergQty": "0.00000000", // present only if icebergQty set for the order
    "strategyId": 37463720, // present only if strategyId set for the order
    "strategyType": 1000000, // present only if strategyType set for the order
    "selfTradePreventionMode": "NONE"
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

When an order list is canceled:

```json
{
  "id": "16eaf097-bbec-44b9-96ff-e97e6e875870",
  "status": 200,
  "result": {
    "orderListId": 19431,
    "contingencyType": "OCO",
    "listStatusType": "ALL_DONE",
    "listOrderStatus": "ALL_DONE",
    "listClientOrderId": "iuVNVJYYrByz6C4yGOPPK0",
    "transactionTime": 1660803702431,
    "symbol": "BTCUSDT",
    "orders": [
      {
        "symbol": "BTCUSDT",
        "orderId": 12569099453,
        "clientOrderId": "bX5wROblo6YeDwa9iTLeyY"
      },
      {
        "symbol": "BTCUSDT",
        "orderId": 12569099454,
        "clientOrderId": "Tnu2IP0J5Y4mxw3IATBfmW"
      }
    ],
    //order list order's status format is the same as for individual orders.
    "orderReports": [
      {
        "symbol": "BTCUSDT",
        "origClientOrderId": "bX5wROblo6YeDwa9iTLeyY",
        "orderId": 12569099453,
        "orderListId": 19431,
        "clientOrderId": "OFFXQtxVFZ6Nbcg4PgE2DA",
        "transactTime": 1684804350068,
        "price": "23450.50000000",
        "origQty": "0.00850000",
        "executedQty": "0.00000000",
        "origQuoteOrderQty": "0.000000",
        "cummulativeQuoteQty": "0.00000000",
        "status": "CANCELED",
        "timeInForce": "GTC",
        "type": "STOP_LOSS_LIMIT",
        "side": "BUY",
        "stopPrice": "23430.00000000",
        "selfTradePreventionMode": "NONE"
      },
      {
        "symbol": "BTCUSDT",
        "origClientOrderId": "Tnu2IP0J5Y4mxw3IATBfmW",
        "orderId": 12569099454,
        "orderListId": 19431,
        "clientOrderId": "OFFXQtxVFZ6Nbcg4PgE2DA",
        "transactTime": 1684804350068,
        "price": "23400.00000000",
        "origQty": "0.00850000",
        "executedQty": "0.00000000",
        "origQuoteOrderQty": "0.000000",
        "cummulativeQuoteQty": "0.00000000",
        "status": "CANCELED",
        "timeInForce": "GTC",
        "type": "LIMIT_MAKER",
        "side": "BUY",
        "selfTradePreventionMode": "NONE"
      }
    ]
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

**Note:** The payload above does not show all fields that can appear. Please
refer to
[Conditional fields in Order Responses](/docs/binance-spot-api-docs/websocket-api/trading-requests#conditional-fields-in-order-responses).

**Regarding `cancelRestrictions`**

- If the `cancelRestrictions` value is not any of the supported values, the
  error will be:

```json
{
  "code": -1145,
  "msg": "Invalid cancelRestrictions"
}
```

- If the order did not pass the conditions for `cancelRestrictions`, the error
  will be:

```json
{
  "code": -2011,
  "msg": "Order was not canceled due to cancel restrictions."
}
```

#### Cancel and replace order (TRADE)

```json
{
  "id": "99de1036-b5e2-4e0f-9b5c-13d751c93a1a",
  "method": "order.cancelReplace",
  "params": {
    "symbol": "BTCUSDT",
    "cancelReplaceMode": "ALLOW_FAILURE",
    "cancelOrigClientOrderId": "4d96324ff9d44481926157",
    "side": "SELL",
    "type": "LIMIT",
    "timeInForce": "GTC",
    "price": "23416.10000000",
    "quantity": "0.00847000",
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "7028fdc187868754d25e42c37ccfa5ba2bab1d180ad55d4c3a7e2de643943dc5",
    "timestamp": 1660813156900
  }
}
```

Cancel an existing order and immediately place a new order instead of the
canceled one.

A new order that was not attempted (i.e. when `newOrderResult: NOT_ATTEMPTED`),
will still increase the unfilled order count by 1.

**Weight:** 1

**Unfilled Order Count:** 1

**Parameters:**

| Name                        | Type      | Mandatory                         | Description                                                                  |
| --------------------------- | --------- | --------------------------------- | ---------------------------------------------------------------------------- |
| \-`symbol`                  | \-STRING  | \-YES                             |                                                                              |
| \-`cancelReplaceMode`       | \-ENUM    | \-YES                             |                                                                              |
| \-`cancelOrderId`           | \-LONG    | \-YES                             | \-Cancel order by `orderId`                                                  |
| \-`cancelOrigClientOrderId` | \-STRING  | \-Cancel order by `clientOrderId` |
| \-`cancelNewClientOrderId`  | \-STRING  | \-NO                              | \-New ID for the canceled order. Automatically generated if not sent         |
| \-`side`                    | \-ENUM    | \-YES                             | \-`BUY` or `SELL`                                                            |
| \-`type`                    | \-ENUM    | \-YES                             |                                                                              |
| \-`timeInForce`             | \-ENUM    | \-NO \*                           |                                                                              |
| \-`price`                   | \-DECIMAL | \-NO \*                           |                                                                              |
| \-`quantity`                | \-DECIMAL | \-NO \*                           |                                                                              |
| \-`quoteOrderQty`           | \-DECIMAL | \-NO \*                           |                                                                              |
| \-`newClientOrderId`        | \-STRING  | \-NO                              | \-Arbitrary unique ID among open orders. Automatically generated if not sent |
| \-`newOrderRespType`        | \-ENUM    | \-NO                              | \-                                                                           |

Select response format: `ACK`, `RESULT`, `FULL`.

`MARKET` and `LIMIT` orders produce `FULL` response by default, other order
types default to `ACK`.

| | \-`stopPrice` | \-DECIMAL | \-NO \* | | | \-`trailingDelta` | \-DECIMAL |
\-NO \* | \-See
[Trailing Stop order FAQ](/docs/binance-spot-api-docs/faqs/trailing-stop-faq) |
| \-`icebergQty` | \-DECIMAL | \-NO | | | \-`strategyId` | \-LONG | \-NO |
\-Arbitrary numeric value identifying the order within an order strategy. | |
\-`strategyType` | \-INT | \-NO | \-

Arbitrary numeric value identifying the order strategy.

Values smaller than 1000000 are reserved and cannot be used.

| | \-`selfTradePreventionMode` | \-ENUM | \-NO | \-

The allowed enums is dependent on what is configured on the symbol.

Supported values: [STP Modes](/docs/binance-spot-api-docs/enums.md#stpmodes).

| | \-`cancelRestrictions` | \-ENUM | \-NO | \-Supported values: `ONLY_NEW` -
Cancel will succeed if the order status is `NEW`. `ONLY_PARTIALLY_FILLED` -
Cancel will succeed if order status is `PARTIALLY_FILLED`. For more information
please refer to
[Regarding `cancelRestrictions`](/docs/binance-spot-api-docs/websocket-api/trading-requests#regarding-cancelrestrictions).
| | \-`apiKey` | \-STRING | \-YES | | | \-`orderRateLimitExceededMode` | \-ENUM
| \-NO | \-Supported values: `DO_NOTHING` (default)- will only attempt to cancel
the order if account has not exceeded the unfilled order rate limit
`CANCEL_ONLY` - will always cancel the order. | | \-`pegPriceType` | \-ENUM |
\-NO | \-`PRIMARY_PEG` or `MARKET_PEG`. See
[Pegged Orders](/docs/binance-spot-api-docs/websocket-api/trading-requests#pegged-orders-info)"
| | \-`pegOffsetValue` | \-INT | \-NO | \-Price level to peg the price to
(max: 100) See
[Pegged Orders](/docs/binance-spot-api-docs/websocket-api/trading-requests#pegged-orders-info)
| | \-`pegOffsetType` | \-ENUM | \-NO | \-Only `PRICE_LEVEL` is supportedSee
[Pegged Orders](/docs/binance-spot-api-docs/websocket-api/trading-requests#pegged-orders-info)
| | \-`recvWindow` | \-LONG | \-NO | \-The value cannot be greater than 60000 |
| \-`signature` | \-STRING | \-YES | | | \-`timestamp` | \-LONG | \-YES | |

Similar to the
[`order.place`](/docs/binance-spot-api-docs/websocket-api/trading-requests#place-new-order-trade)
request, additional mandatory parameters (\*) are determined by the new order
[`type`](/docs/binance-spot-api-docs/websocket-api/trading-requests#order-type).

Available `cancelReplaceMode` options:

- `STOP_ON_FAILURE` – if cancellation request fails, new order placement will
  not be attempted.
- `ALLOW_FAILURE` – new order placement will be attempted even if the cancel
  request fails.

| Request             | Response                     |
| ------------------- | ---------------------------- | -------------------- | -------------- | ---------------- | -------- |
| `cancelReplaceMode` | `orderRateLimitExceededMode` | Unfilled Order Count | `cancelResult` | `newOrderResult` | `status` |
| ---                 | ---                          | ---                  | ---            | ---              | ---      |
| \-`STOP_ON_FAILURE` | \-`DO_NOTHING`               | \-Within Limits      | \-✅ `SUCCESS` | \-✅ `SUCCESS`   | \-`200`  |
| \-❌ `FAILURE`      | \-➖ `NOT_ATTEMPTED`         | \-`400`              |
| \-✅ `SUCCESS`      | \-❌ `FAILURE`               | \-`409`              |
| \-Exceeds Limits    | \-✅ `SUCCESS`               | \-✅ `SUCCESS`       | \-N/A          |
| \-❌ `FAILURE`      | \-➖ `NOT_ATTEMPTED`         | \-N/A                |
| \-✅ `SUCCESS`      | \-❌ `FAILURE`               | \-N/A                |
| \-`CANCEL_ONLY`     | \-Within Limits              | \-✅ `SUCCESS`       | \-✅ `SUCCESS` | \-`200`          |
| \-❌ `FAILURE`      | \-➖ `NOT_ATTEMPTED`         | \-`400`              |
| \-✅ `SUCCESS`      | \-❌ `FAILURE`               | \-`409`              |
| \-Exceeds Limits    | \-❌ `FAILURE`               | \-➖ `NOT_ATTEMPTED` | \-`429`        |
| \-✅ `SUCCESS`      | \-❌ `FAILURE`               | \-`429`              |
| \-`ALLOW_FAILURE`   | \-`DO_NOTHING`               | \-Within Limits      | \-✅ `SUCCESS` | \-✅ `SUCCESS`   | \-`200`  |
| \-❌ `FAILURE`      | \-❌ `FAILURE`               | \-`400`              |
| \-❌ `FAILURE`      | \-✅ `SUCCESS`               | \-`409`              |
| \-✅ `SUCCESS`      | \-❌ `FAILURE`               | \-`409`              |
| \-Exceeds Limits    | \-✅ `SUCCESS`               | \-✅ `SUCCESS`       | \-N/A          |
| \-❌ `FAILURE`      | \-❌ `FAILURE`               | \-N/A                |
| \-❌ `FAILURE`      | \-✅ `SUCCESS`               | \-N/A                |
| \-✅ `SUCCESS`      | \-❌ `FAILURE`               | \-N/A                |
| \-`CANCEL_ONLY`     | \-Within Limits              | \-✅ `SUCCESS`       | \-✅ `SUCCESS` | \-`200`          |
| \-❌ `FAILURE`      | \-❌ `FAILURE`               | \-`400`              |
| \-❌ `FAILURE`      | \-✅ `SUCCESS`               | \-`409`              |
| \-✅ `SUCCESS`      | \-❌ `FAILURE`               | \-`409`              |
| \-Exceeds Limits    | \-✅ `SUCCESS`               | \-✅ `SUCCESS`       | \-`200`        |
| \-❌ `FAILURE`      | \-❌ `FAILURE`               | \-`400`              |
| \-❌ `FAILURE`      | \-✅ `SUCCESS`               | \-N/A                |
| \-✅ `SUCCESS`      | \-❌ `FAILURE`               | \-`409`              |

Notes:

- If both `cancelOrderId` and `cancelOrigClientOrderId` parameters are provided,
  the `cancelOrderId` is searched first, then the `cancelOrigClientOrderId` from
  that result is checked against that order. If both conditions are not met the
  request will be rejected.
- `cancelNewClientOrderId` will replace `clientOrderId` of the canceled order,
  freeing it up for new orders.
- `newClientOrderId` specifies `clientOrderId` value for the placed order.

  A new order with the same `clientOrderId` is accepted only when the previous
  one is filled or expired.

  The new order can reuse old `clientOrderId` of the canceled order.

- This cancel-replace operation is **not transactional**.

  If one operation succeeds but the other one fails, the successful operation is
  still executed.

  For example, in `STOP_ON_FAILURE` mode, if the new order placement fails, the
  old order is still canceled.

- Filters and order count limits are evaluated before cancellation and order
  placement occurs.
- If new order placement is not attempted, your order count is still
  incremented.
- Like
  [`order.cancel`](/docs/binance-spot-api-docs/websocket-api/trading-requests#cancel-order-trade),
  if you cancel an individual order from an order list, the entire order list is
  canceled.
- The performance for canceling an order (single cancel or as part of a
  cancel-replace) is always better when only `orderId` is sent. Sending
  `origClientOrderId` or both `orderId` + `origClientOrderId` will be slower.

**Data Source:** Matching Engine

**Response:**

If both cancel and placement succeed, you get the following response with
`"status": 200`:

```json
{
  "id": "99de1036-b5e2-4e0f-9b5c-13d751c93a1a",
  "status": 200,
  "result": {
    "cancelResult": "SUCCESS",
    "newOrderResult": "SUCCESS",
    // Format is identical to "order.cancel" format.
    // Some fields are optional and are included only for orders that set them.
    "cancelResponse": {
      "symbol": "BTCUSDT",
      "origClientOrderId": "4d96324ff9d44481926157", // cancelOrigClientOrderId from request
      "orderId": 125690984230,
      "orderListId": -1,
      "clientOrderId": "91fe37ce9e69c90d6358c0", // cancelNewClientOrderId from request
      "transactTime": 1684804350068,
      "price": "23450.00000000",
      "origQty": "0.00847000",
      "executedQty": "0.00001000",
      "origQuoteOrderQty": "0.000000",
      "cummulativeQuoteQty": "0.23450000",
      "status": "CANCELED",
      "timeInForce": "GTC",
      "type": "LIMIT",
      "side": "SELL",
      "selfTradePreventionMode": "NONE"
    },
    // Format is identical to "order.place" format, affected by "newOrderRespType".
    // Some fields are optional and are included only for orders that set them.
    "newOrderResponse": {
      "symbol": "BTCUSDT",
      "orderId": 12569099453,
      "orderListId": -1,
      "clientOrderId": "bX5wROblo6YeDwa9iTLeyY", // newClientOrderId from request
      "transactTime": 1660813156959,
      "price": "23416.10000000",
      "origQty": "0.00847000",
      "executedQty": "0.00000000",
      "origQuoteOrderQty": "0.000000",
      "cummulativeQuoteQty": "0.00000000",
      "status": "NEW",
      "timeInForce": "GTC",
      "type": "LIMIT",
      "side": "SELL",
      "selfTradePreventionMode": "NONE"
    }
  },
  "rateLimits": [
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 10,
      "limit": 50,
      "count": 1
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "DAY",
      "intervalNum": 1,
      "limit": 160000,
      "count": 1
    },
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

In `STOP_ON_FAILURE` mode, failed order cancellation prevents new order from
being placed and returns the following response with `"status": 400`:

```json
{
  "id": "27e1bf9f-0539-4fb0-85c6-06183d36f66c",
  "status": 400,
  "error": {
    "code": -2022,
    "msg": "Order cancel-replace failed.",
    "data": {
      "cancelResult": "FAILURE",
      "newOrderResult": "NOT_ATTEMPTED",
      "cancelResponse": {
        "code": -2011,
        "msg": "Unknown order sent."
      },
      "newOrderResponse": null
    }
  },
  "rateLimits": [
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 10,
      "limit": 50,
      "count": 1
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "DAY",
      "intervalNum": 1,
      "limit": 160000,
      "count": 1
    },
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

If cancel-replace mode allows failure and one of the operations fails, you get a
response with `"status": 409`, and the `"data"` field detailing which operation
succeeded, which failed, and why:

```json
{
  "id": "b220edfe-f3c4-4a3a-9d13-b35473783a25",
  "status": 409,
  "error": {
    "code": -2021,
    "msg": "Order cancel-replace partially failed.",
    "data": {
      "cancelResult": "SUCCESS",
      "newOrderResult": "FAILURE",
      "cancelResponse": {
        "symbol": "BTCUSDT",
        "origClientOrderId": "4d96324ff9d44481926157",
        "orderId": 125690984230,
        "orderListId": -1,
        "clientOrderId": "91fe37ce9e69c90d6358c0",
        "transactTime": 1684804350068,
        "price": "23450.00000000",
        "origQty": "0.00847000",
        "executedQty": "0.00001000",
        "origQuoteOrderQty": "0.000000",
        "cummulativeQuoteQty": "0.23450000",
        "status": "CANCELED",
        "timeInForce": "GTC",
        "type": "LIMIT",
        "side": "SELL",
        "selfTradePreventionMode": "NONE"
      },
      "newOrderResponse": {
        "code": -2010,
        "msg": "Order would immediately match and take."
      }
    }
  },
  "rateLimits": [
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 10,
      "limit": 50,
      "count": 1
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "DAY",
      "intervalNum": 1,
      "limit": 160000,
      "count": 1
    },
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

```json
{
  "id": "ce641763-ff74-41ac-b9f7-db7cbe5e93b1",
  "status": 409,
  "error": {
    "code": -2021,
    "msg": "Order cancel-replace partially failed.",
    "data": {
      "cancelResult": "FAILURE",
      "newOrderResult": "SUCCESS",
      "cancelResponse": {
        "code": -2011,
        "msg": "Unknown order sent."
      },
      "newOrderResponse": {
        "symbol": "BTCUSDT",
        "orderId": 12569099453,
        "orderListId": -1,
        "clientOrderId": "bX5wROblo6YeDwa9iTLeyY",
        "transactTime": 1660813156959,
        "price": "23416.10000000",
        "origQty": "0.00847000",
        "executedQty": "0.00000000",
        "origQuoteOrderQty": "0.000000",
        "cummulativeQuoteQty": "0.00000000",
        "status": "NEW",
        "timeInForce": "GTC",
        "type": "LIMIT",
        "side": "SELL",
        "workingTime": 1669693344508,
        "fills": [],
        "selfTradePreventionMode": "NONE"
      }
    }
  },
  "rateLimits": [
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 10,
      "limit": 50,
      "count": 1
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "DAY",
      "intervalNum": 1,
      "limit": 160000,
      "count": 1
    },
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

If both operations fail, response will have `"status": 400`:

```json
{
  "id": "3b3ac45c-1002-4c7d-88e8-630c408ecd87",
  "status": 400,
  "error": {
    "code": -2022,
    "msg": "Order cancel-replace failed.",
    "data": {
      "cancelResult": "FAILURE",
      "newOrderResult": "FAILURE",
      "cancelResponse": {
        "code": -2011,
        "msg": "Unknown order sent."
      },
      "newOrderResponse": {
        "code": -2010,
        "msg": "Order would immediately match and take."
      }
    }
  },
  "rateLimits": [
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 10,
      "limit": 50,
      "count": 1
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "DAY",
      "intervalNum": 1,
      "limit": 160000,
      "count": 1
    },
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

If `orderRateLimitExceededMode` is `DO_NOTHING` regardless of
`cancelReplaceMode`, and you have exceeded your unfilled order count, you will
get status `429` with the following error:

```json
{
  "id": "3b3ac45c-1002-4c7d-88e8-630c408ecd87",
  "status": 429,
  "error": {
    "code": -1015,
    "msg": "Too many new orders; current limit is 50 orders per 10 SECOND."
  },
  "rateLimits": [
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 10,
      "limit": 50,
      "count": 50
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "DAY",
      "intervalNum": 1,
      "limit": 160000,
      "count": 50
    },
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

If `orderRateLimitExceededMode` is `CANCEL_ONLY` regardless of
`cancelReplaceMode`, and you have exceeded your unfilled order count, you will
get status `409` with the following error:

```json
{
  "id": "3b3ac45c-1002-4c7d-88e8-630c408ecd87",
  "status": 409,
  "error": {
    "code": -2021,
    "msg": "Order cancel-replace partially failed.",
    "data": {
      "cancelResult": "SUCCESS",
      "newOrderResult": "FAILURE",
      "cancelResponse": {
        "symbol": "LTCBNB",
        "origClientOrderId": "GKt5zzfOxRDSQLveDYCTkc",
        "orderId": 64,
        "orderListId": -1,
        "clientOrderId": "loehOJF3FjoreUBDmv739R",
        "transactTime": 1715779007228,
        "price": "1.00",
        "origQty": "10.00000000",
        "executedQty": "0.00000000",
        "origQuoteOrderQty": "0.000000",
        "cummulativeQuoteQty": "0.00",
        "status": "CANCELED",
        "timeInForce": "GTC",
        "type": "LIMIT",
        "side": "SELL",
        "selfTradePreventionMode": "NONE"
      },
      "newOrderResponse": {
        "code": -1015,
        "msg": "Too many new orders; current limit is 50 orders per 10 SECOND."
      }
    }
  },
  "rateLimits": [
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 10,
      "limit": 50,
      "count": 50
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "DAY",
      "intervalNum": 1,
      "limit": 160000,
      "count": 50
    },
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

**Note:** The payload above does not show all fields that can appear. Please
refer to
[Conditional fields in Order Responses](/docs/binance-spot-api-docs/websocket-api/trading-requests#conditional-fields-in-order-responses).

#### Order Amend Keep Priority (TRADE)

```json
{
  "id": "56374a46-3061-486b-a311-89ee972eb648",
  "method": "order.amend.keepPriority",
  "params": {
    "newQty": "5",
    "origClientOrderId": "my_test_order1",
    "recvWindow": 5000,
    "symbol": "BTCUSDT",
    "timestamp": 1741922620419,
    "apiKey": "Rl1KOMDCpSg6xviMYOkNk9ENUB5QOTnufXukVe0Ijd40yduAlpHn78at3rJyJN4F",
    "signature": "fa49c0c4ebc331c6ebd3fcb20deb387f60081ea858eebe6e35aa6fcdf2a82e08"
  }
}
```

Reduce the quantity of an existing open order.

This adds 0 orders to the `EXCHANGE_MAX_ORDERS` filter and the `MAX_NUM_ORDERS`
filter.

Read
[Order Amend Keep Priority FAQ](/docs/binance-spot-api-docs/faqs/order_amend_keep_priority)
to learn more.

**Weight**: 4

**Unfilled Order Count:** 0

**Parameters:**

| Name                | Type      | Mandatory | Description                                                                                                                                                                                          |
| ------------------- | --------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \-symbol            | \-STRING  | \-YES     |                                                                                                                                                                                                      |
| \-orderId           | \-LONG    | \-NO\*    | \-`orderId` or `origClientOrderId` must be sent                                                                                                                                                      |
| \-origClientOrderId | \-STRING  | \-NO\*    | \-`orderId` or `origClientOrderId` must be sent                                                                                                                                                      |
| \-newClientOrderId  | \-STRING  | \-NO\*    | \-The new client order ID for the order after being amended. If not sent, one will be randomly generated. It is possible to reuse the current clientOrderId by sending it as the `newClientOrderId`. |
| \-newQty            | \-DECIMAL | \-YES     | \-`newQty` must be greater than 0 and less than the order's quantity.                                                                                                                                |
| \-recvWindow        | \-LONG    | \-NO      | \-The value cannot be greater than `60000`.                                                                                                                                                          |
| \-timestamp         | \-LONG    | \-YES     |                                                                                                                                                                                                      |

**Data Source**: Matching Engine

**Response:**

Response for a single order:

```json
{
  "id": "56374a46-3061-486b-a311-89ee972eb648",
  "status": 200,
  "result": {
    "transactTime": 1741923284382,
    "executionId": 16,
    "amendedOrder": {
      "symbol": "BTCUSDT",
      "orderId": 12,
      "orderListId": -1,
      "origClientOrderId": "my_test_order1",
      "clientOrderId": "4zR9HFcEq8gM1tWUqPEUHc",
      "price": "5.00000000",
      "qty": "5.00000000",
      "executedQty": "0.00000000",
      "preventedQty": "0.00000000",
      "quoteOrderQty": "0.00000000",
      "cumulativeQuoteQty": "0.00000000",
      "status": "NEW",
      "timeInForce": "GTC",
      "type": "LIMIT",
      "side": "BUY",
      "workingTime": 1741923284364,
      "selfTradePreventionMode": "NONE"
    }
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

Response for an order which is part of an Order list:

```json
{
  "id": "56374b46-3061-486b-a311-89ee972eb648",
  "status": 200,
  "result": {
    "transactTime": 1741924229819,
    "executionId": 60,
    "amendedOrder": {
      "symbol": "BTUCSDT",
      "orderId": 23,
      "orderListId": 4,
      "origClientOrderId": "my_pending_order",
      "clientOrderId": "xbxXh5SSwaHS7oUEOCI88B",
      "price": "1.00000000",
      "qty": "5.00000000",
      "executedQty": "0.00000000",
      "preventedQty": "0.00000000",
      "quoteOrderQty": "0.00000000",
      "cumulativeQuoteQty": "0.00000000",
      "status": "NEW",
      "timeInForce": "GTC",
      "type": "LIMIT",
      "side": "BUY",
      "workingTime": 1741924204920,
      "selfTradePreventionMode": "NONE"
    },
    "listStatus": {
      "orderListId": 4,
      "contingencyType": "OTO",
      "listOrderStatus": "EXECUTING",
      "listClientOrderId": "8nOGLLawudj1QoOiwbroRH",
      "symbol": "BTCUSDT",
      "orders": [
        {
          "symbol": "BTCUSDT",
          "orderId": 22,
          "clientOrderId": "g04EWsjaackzedjC9wRkWD"
        },
        {
          "symbol": "BTCUSDT",
          "orderId": 23,
          "clientOrderId": "xbxXh5SSwaHS7oUEOCI88B"
        }
      ]
    }
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

**Note:** The payloads above do not show all fields that can appear. Please
refer to
[Conditional fields in Order Responses](/docs/binance-spot-api-docs/websocket-api/trading-requests#conditional-fields-in-order-responses).

#### Cancel open orders (TRADE)

```json
{
  "id": "778f938f-9041-4b88-9914-efbf64eeacc8",
  "method": "openOrders.cancelAll",
  "params": {
    "symbol": "BTCUSDT",
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "773f01b6e3c2c9e0c1d217bc043ce383c1ddd6f0e25f8d6070f2b66a6ceaf3a5",
    "timestamp": 1660805557200
  }
}
```

Cancel all open orders on a symbol. This includes orders that are part of an
order list.

**Weight:** 1

**Parameters:**

| Name           | Type     | Mandatory | Description                                |
| -------------- | -------- | --------- | ------------------------------------------ |
| \-`symbol`     | \-STRING | \-YES     |                                            |
| \-`apiKey`     | \-STRING | \-YES     |                                            |
| \-`recvWindow` | \-LONG   | \-NO      | \-The value cannot be greater than `60000` |
| \-`signature`  | \-STRING | \-YES     |                                            |
| \-`timestamp`  | \-LONG   | \-YES     |                                            |

**Data Source:** Matching Engine

**Response:**

Cancellation reports for orders and order lists have the same format as in
[`order.cancel`](/docs/binance-spot-api-docs/websocket-api/trading-requests#cancel-order-trade).

```json
{
  "id": "778f938f-9041-4b88-9914-efbf64eeacc8",
  "status": 200,
  "result": [
    {
      "symbol": "BTCUSDT",
      "origClientOrderId": "4d96324ff9d44481926157",
      "orderId": 12569099453,
      "orderListId": -1,
      "clientOrderId": "91fe37ce9e69c90d6358c0",
      "transactTime": 1684804350068,
      "price": "23416.10000000",
      "origQty": "0.00847000",
      "executedQty": "0.00001000",
      "origQuoteOrderQty": "0.000000",
      "cummulativeQuoteQty": "0.23416100",
      "status": "CANCELED",
      "timeInForce": "GTC",
      "type": "LIMIT",
      "side": "SELL",
      "stopPrice": "0.00000000",
      "trailingDelta": 0,
      "trailingTime": -1,
      "icebergQty": "0.00000000",
      "strategyId": 37463720,
      "strategyType": 1000000,
      "selfTradePreventionMode": "NONE"
    },
    {
      "orderListId": 19431,
      "contingencyType": "OCO",
      "listStatusType": "ALL_DONE",
      "listOrderStatus": "ALL_DONE",
      "listClientOrderId": "iuVNVJYYrByz6C4yGOPPK0",
      "transactionTime": 1660803702431,
      "symbol": "BTCUSDT",
      "orders": [
        {
          "symbol": "BTCUSDT",
          "orderId": 12569099453,
          "clientOrderId": "bX5wROblo6YeDwa9iTLeyY"
        },
        {
          "symbol": "BTCUSDT",
          "orderId": 12569099454,
          "clientOrderId": "Tnu2IP0J5Y4mxw3IATBfmW"
        }
      ],
      "orderReports": [
        {
          "symbol": "BTCUSDT",
          "origClientOrderId": "bX5wROblo6YeDwa9iTLeyY",
          "orderId": 12569099453,
          "orderListId": 19431,
          "clientOrderId": "OFFXQtxVFZ6Nbcg4PgE2DA",
          "transactTime": 1684804350068,
          "price": "23450.50000000",
          "origQty": "0.00850000",
          "executedQty": "0.00000000",
          "origQuoteOrderQty": "0.000000",
          "cummulativeQuoteQty": "0.00000000",
          "status": "CANCELED",
          "timeInForce": "GTC",
          "type": "STOP_LOSS_LIMIT",
          "side": "BUY",
          "stopPrice": "23430.00000000",
          "selfTradePreventionMode": "NONE"
        },
        {
          "symbol": "BTCUSDT",
          "origClientOrderId": "Tnu2IP0J5Y4mxw3IATBfmW",
          "orderId": 12569099454,
          "orderListId": 19431,
          "clientOrderId": "OFFXQtxVFZ6Nbcg4PgE2DA",
          "transactTime": 1684804350068,
          "price": "23400.00000000",
          "origQty": "0.00850000",
          "executedQty": "0.00000000",
          "origQuoteOrderQty": "0.000000",
          "cummulativeQuoteQty": "0.00000000",
          "status": "CANCELED",
          "timeInForce": "GTC",
          "type": "LIMIT_MAKER",
          "side": "BUY",
          "selfTradePreventionMode": "NONE"
        }
      ]
    }
  ],
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

**Note:** The payload above does not show all fields that can appear. Please
refer to
[Conditional fields in Order Responses](/docs/binance-spot-api-docs/websocket-api/trading-requests#conditional-fields-in-order-responses).

#### Order lists

##### Place new OCO - Deprecated (TRADE)

```json
{
  "id": "56374a46-3061-486b-a311-99ee972eb648",
  "method": "orderList.place",
  "params": {
    "symbol": "BTCUSDT",
    "side": "SELL",
    "price": "23420.00000000",
    "quantity": "0.00650000",
    "stopPrice": "23410.00000000",
    "stopLimitPrice": "23405.00000000",
    "stopLimitTimeInForce": "GTC",
    "newOrderRespType": "RESULT",
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "6689c2a36a639ff3915c2904871709990ab65f3c7a9ff13857558fd350315c35",
    "timestamp": 1660801713767
  }
}
```

Send in a new one-cancels-the-other (OCO) pair: `LIMIT_MAKER` +
`STOP_LOSS`/`STOP_LOSS_LIMIT` orders (called _legs_), where activation of one
order immediately cancels the other.

This adds 1 order to `EXCHANGE_MAX_ORDERS` filter and the `MAX_NUM_ORDERS`
filter

**Weight:** 1

**Unfilled Order Count:** 1

**Parameters:**

| Name                   | Type      | Mandatory | Description                                                                                      |
| ---------------------- | --------- | --------- | ------------------------------------------------------------------------------------------------ |
| \-`symbol`             | \-STRING  | \-YES     |                                                                                                  |
| \-`side`               | \-ENUM    | \-YES     | \-`BUY` or `SELL`                                                                                |
| \-`price`              | \-DECIMAL | \-YES     | \-Price for the limit order                                                                      |
| \-`quantity`           | \-DECIMAL | \-YES     |                                                                                                  |
| \-`listClientOrderId`  | \-STRING  | \-NO      | \-Arbitrary unique ID among open order lists. Automatically generated if not sent                |
| \-`limitClientOrderId` | \-STRING  | \-NO      | \-Arbitrary unique ID among open orders for the limit order. Automatically generated if not sent |
| \-`limitIcebergQty`    | \-DECIMAL | \-NO      |                                                                                                  |
| \-`limitStrategyId`    | \-LONG    | \-NO      | \-Arbitrary numeric value identifying the limit order within an order strategy.                  |
| \-`limitStrategyType`  | \-INT     | \-NO      | \-                                                                                               |

Arbitrary numeric value identifying the limit order strategy.

Values smaller than `1000000` are reserved and cannot be used.

| | \-`stopPrice` | \-DECIMAL | \-YES \* | \-Either `stopPrice` or
`trailingDelta`, or both must be specified | | \-`trailingDelta` | \-INT |
\-YES \* | \-See
[Trailing Stop order FAQ](/docs/binance-spot-api-docs/faqs/trailing-stop-faq) |
| \-`stopClientOrderId` | \-STRING | \-NO | \-Arbitrary unique ID among open
orders for the stop order. Automatically generated if not sent | |
\-`stopLimitPrice` | \-DECIMAL | \-NO \* | | | \-`stopLimitTimeInForce` | \-ENUM
| \-NO \* | \-See
[`order.place`](/docs/binance-spot-api-docs/websocket-api/trading-requests#timeInForce)
for available options | | \-`stopIcebergQty` | \-DECIMAL | \-NO \* | | |
\-`stopStrategyId` | \-LONG | \-NO | \-Arbitrary numeric value identifying the
stop order within an order strategy. | | \-`stopStrategyType` | \-INT | \-NO |
\-

Arbitrary numeric value identifying the stop order strategy.

Values smaller than `1000000` are reserved and cannot be used.

| | \-`newOrderRespType` | \-ENUM | \-NO | \-Select response format: `ACK`,
`RESULT`, `FULL` (default) | | \-`selfTradePreventionMode` | \-ENUM | \-NO |
\-The allowed enums is dependent on what is configured on the symbol. The
possible supported values are:
[STP Modes](/docs/binance-spot-api-docs/enums#stpmodes) | | \-`apiKey` |
\-STRING | \-YES | | | \-`recvWindow` | \-LONG | \-NO | \-The value cannot be
greater than `60000` | | \-`signature` | \-STRING | \-YES | | | \-`timestamp` |
\-LONG | \-YES | |

Notes:

- `listClientOrderId` parameter specifies `listClientOrderId` for the OCO pair.

  A new OCO with the same `listClientOrderId` is accepted only when the previous
  one is filled or completely expired.

  `listClientOrderId` is distinct from `clientOrderId` of individual orders.

- `limitClientOrderId` and `stopClientOrderId` specify `clientOrderId` values
  for both legs of the OCO.

  A new order with the same `clientOrderId` is accepted only when the previous
  one is filled or expired.

- Price restrictions on the legs:

  | `side`   | Price relation                         |
  | -------- | -------------------------------------- |
  | \-`BUY`  | \-`price` < market price < `stopPrice` |
  | \-`SELL` | \-`price` > market price > `stopPrice` |

- Both legs have the same `quantity`.

  However, you can set different iceberg quantity for individual legs.

  If `stopIcebergQty` is used, `stopLimitTimeInForce` must be `GTC`.

- `trailingDelta` applies only to the `STOP_LOSS`/`STOP_LOSS_LIMIT` leg of the
  OCO.

**Data Source:** Matching Engine

**Response:**

Response format for `orderReports` is selected using the `newOrderRespType`
parameter. The following example is for `RESULT` response type. See
[`order.place`](/docs/binance-spot-api-docs/websocket-api/trading-requests#place-new-order-trade)
for more examples.

```json
{
  "id": "57833dc0-e3f2-43fb-ba20-46480973b0aa",
  "status": 200,
  "result": {
    "orderListId": 1274512,
    "contingencyType": "OCO",
    "listStatusType": "EXEC_STARTED",
    "listOrderStatus": "EXECUTING",
    "listClientOrderId": "08985fedd9ea2cf6b28996",
    "transactionTime": 1660801713793,
    "symbol": "BTCUSDT",
    "orders": [
      {
        "symbol": "BTCUSDT",
        "orderId": 12569138901,
        "clientOrderId": "BqtFCj5odMoWtSqGk2X9tU"
      },
      {
        "symbol": "BTCUSDT",
        "orderId": 12569138902,
        "clientOrderId": "jLnZpj5enfMXTuhKB1d0us"
      }
    ],
    "orderReports": [
      {
        "symbol": "BTCUSDT",
        "orderId": 12569138901,
        "orderListId": 1274512,
        "clientOrderId": "BqtFCj5odMoWtSqGk2X9tU",
        "transactTime": 1660801713793,
        "price": "23410.00000000",
        "origQty": "0.00650000",
        "executedQty": "0.00000000",
        "origQuoteOrderQty": "0.000000",
        "cummulativeQuoteQty": "0.00000000",
        "status": "NEW",
        "timeInForce": "GTC",
        "type": "STOP_LOSS_LIMIT",
        "side": "SELL",
        "stopPrice": "23405.00000000",
        "workingTime": -1,
        "selfTradePreventionMode": "NONE"
      },
      {
        "symbol": "BTCUSDT",
        "orderId": 12569138902,
        "orderListId": 1274512,
        "clientOrderId": "jLnZpj5enfMXTuhKB1d0us",
        "transactTime": 1660801713793,
        "price": "23420.00000000",
        "origQty": "0.00650000",
        "executedQty": "0.00000000",
        "origQuoteOrderQty": "0.000000",
        "cummulativeQuoteQty": "0.00000000",
        "status": "NEW",
        "timeInForce": "GTC",
        "type": "LIMIT_MAKER",
        "side": "SELL",
        "workingTime": 1660801713793,
        "selfTradePreventionMode": "NONE"
      }
    ]
  },
  "rateLimits": [
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 10,
      "limit": 50,
      "count": 2
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "DAY",
      "intervalNum": 1,
      "limit": 160000,
      "count": 2
    },
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

##### Place new Order list - OCO (TRADE)

```json
{
  "id": "56374a46-3261-486b-a211-99ed972eb648",
  "method": "orderList.place.oco",
  "params": {
    "symbol": "LTCBNB",
    "side": "BUY",
    "quantity": 1,
    "timestamp": 1711062760647,
    "aboveType": "STOP_LOSS_LIMIT",
    "abovePrice": "1.5",
    "aboveStopPrice": "1.50000001",
    "aboveTimeInForce": "GTC",
    "belowType": "LIMIT_MAKER",
    "belowPrice": "1.49999999",
    "apiKey": "duwNf97YPLqhFIk7kZF0dDdGYVAXStA7BeEz0fIT9RAhUbixJtyS6kJ3hhzJsRXC",
    "signature": "64614cfd8dd38260d4fd86d3c455dbf4b9d1c8a8170ea54f700592a986c30ddb"
  }
}
```

Send in an one-cancels-the-other (OCO) pair, where activation of one order
immediately cancels the other.

- An OCO has 2 orders called the **above order** and **below order**.
- One of the orders must be a `LIMIT_MAKER/TAKE_PROFIT/TAKE_PROFIT_LIMIT` order
  and the other must be `STOP_LOSS` or `STOP_LOSS_LIMIT` order.
- Price restrictions:
  - If the OCO is on the `SELL` side:
    - `LIMIT_MAKER/TAKE_PROFIT_LIMIT` `price` > Last Traded Price >
      `STOP_LOSS/STOP_LOSS_LIMIT` `stopPrice`
    - `TAKE_PROFIT stopPrice` > Last Traded Price >
      `STOP_LOSS/STOP_LOSS_LIMIT stopPrice`
  - If the OCO is on the `BUY` side:
    - `LIMIT_MAKER` `price` < Last Traded Price < `STOP_LOSS/STOP_LOSS_LIMIT`
      `stopPrice`
    - `TAKE_PROFIT stopPrice` > Last Traded Price >
      `STOP_LOSS/STOP_LOSS_LIMIT stopPrice`
- OCOs add **2 orders** to the `EXCHANGE_MAX_ORDERS` filter and `MAX_NUM_ORDERS`
  filter.

**Weight:** 1

**Unfilled Order Count:** 2

**Parameters:**

| Name                        | Type      | Mandatory | Description                                                                                                                                                                                                                                                                                               |
| --------------------------- | --------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \-`symbol`                  | \-STRING  | \-YES     |                                                                                                                                                                                                                                                                                                           |
| \-`listClientOrderId`       | \-STRING  | \-NO      | \-Arbitrary unique ID among open order lists. Automatically generated if not sent. A new order list with the same `listClientOrderId` is accepted only when the previous one is filled or completely expired. `listClientOrderId` is distinct from the `aboveClientOrderId` and the `belowCLientOrderId`. |
| \-`side`                    | \-ENUM    | \-YES     | \-`BUY` or `SELL`                                                                                                                                                                                                                                                                                         |
| \-`quantity`                | \-DECIMAL | \-YES     | \-Quantity for both orders of the order list.                                                                                                                                                                                                                                                             |
| \-`aboveType`               | \-ENUM    | \-YES     | \-Supported values: `STOP_LOSS_LIMIT`, `STOP_LOSS`, `LIMIT_MAKER`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT`                                                                                                                                                                                                     |
| \-`aboveClientOrderId`      | \-STRING  | \-NO      | \-Arbitrary unique ID among open orders for the above order. Automatically generated if not sent                                                                                                                                                                                                          |
| \-`aboveIcebergQty`         | \-LONG    | \-NO      | \-Note that this can only be used if `aboveTimeInForce` is `GTC`.                                                                                                                                                                                                                                         |
| \-`abovePrice`              | \-DECIMAL | \-NO      | \-Can be used if `aboveType` is `STOP_LOSS_LIMIT` , `LIMIT_MAKER`, or `TAKE_PROFIT_LIMIT` to specify the limit price.                                                                                                                                                                                     |
| \-`aboveStopPrice`          | \-DECIMAL | \-NO      | \-Can be used if `aboveType` is `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT`. Either `aboveStopPrice` or `aboveTrailingDelta` or both, must be specified.                                                                                                                           |
| \-`aboveTrailingDelta`      | \-LONG    | \-NO      | \-See [Trailing Stop order FAQ](/docs/binance-spot-api-docs/faqs/trailing-stop-faq).                                                                                                                                                                                                                      |
| \-`aboveTimeInForce`        | \-DECIMAL | \-NO      | \-Required if `aboveType` is `STOP_LOSS_LIMIT` or `TAKE_PROFIT_LIMIT`.                                                                                                                                                                                                                                    |
| \-`aboveStrategyId`         | \-LONG    | \-NO      | \-Arbitrary numeric value identifying the above order within an order strategy.                                                                                                                                                                                                                           |
| \-`aboveStrategyType`       | \-INT     | \-NO      | \-Arbitrary numeric value identifying the above order strategy. Values smaller than 1000000 are reserved and cannot be used.                                                                                                                                                                              |
| \-`abovePegPriceType`       | \-ENUM    | \-NO      | \-See [Pegged Orders](/docs/binance-spot-api-docs/websocket-api/trading-requests#pegged-orders-info)                                                                                                                                                                                                      |
| \-`abovePegOffsetType`      | \-ENUM    | \-NO      |                                                                                                                                                                                                                                                                                                           |
| \-`abovePegOffsetValue`     | \-INT     | \-NO      |                                                                                                                                                                                                                                                                                                           |
| \-`belowType`               | \-ENUM    | \-YES     | \-Supported values: `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`,`TAKE_PROFIT_LIMIT`                                                                                                                                                                                                                     |
| \-`belowClientOrderId`      | \-STRING  | \-NO      |                                                                                                                                                                                                                                                                                                           |
| \-`belowIcebergQty`         | \-LONG    | \-NO      | \-Note that this can only be used if `belowTimeInForce` is `GTC`.                                                                                                                                                                                                                                         |
| \-`belowPrice`              | \-DECIMAL | \-NO      | \-Can be used if `belowType` is `STOP_LOSS_LIMIT` , `LIMIT_MAKER`, or `TAKE_PROFIT_LIMIT` to specify the limit price.                                                                                                                                                                                     |
| \-`belowStopPrice`          | \-DECIMAL | \-NO      | \-Can be used if `belowType` is `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT` or `TAKE_PROFIT_LIMIT`. Either `belowStopPrice` or `belowTrailingDelta` or both, must be specified.                                                                                                                         |
| \-`belowTrailingDelta`      | \-LONG    | \-NO      | \-See [Trailing Stop order FAQ](/docs/binance-spot-api-docs/faqs/trailing-stop-faq).                                                                                                                                                                                                                      |
| \-`belowTimeInForce`        | \-ENUM    | \-NO      | \-Required if `belowType` is `STOP_LOSS_LIMIT` or `TAKE_PROFIT_LIMIT`                                                                                                                                                                                                                                     |
| \-`belowStrategyId`         | \-LONG    | \-NO      | \-Arbitrary numeric value identifying the below order within an order strategy.                                                                                                                                                                                                                           |
| \-`belowStrategyType`       | \-INT     | \-NO      | \-Arbitrary numeric value identifying the below order strategy. Values smaller than 1000000 are reserved and cannot be used.                                                                                                                                                                              |
| \-`belowPegPriceType`       | \-ENUM    | \-NO      | \-See [Pegged Orders](/docs/binance-spot-api-docs/websocket-api/trading-requests#pegged-orders-info)                                                                                                                                                                                                      |
| \-`belowPegOffsetType`      | \-ENUM    | \-NO      |                                                                                                                                                                                                                                                                                                           |
| \-`belowPegOffsetValue`     | \-INT     | \-NO      |                                                                                                                                                                                                                                                                                                           |
| \-`newOrderRespType`        | \-ENUM    | \-NO      | \-Select response format: `ACK`, `RESULT`, `FULL`                                                                                                                                                                                                                                                         |
| \-`selfTradePreventionMode` | \-ENUM    | \-NO      | \-The allowed enums is dependent on what is configured on the symbol. The possible supported values are: [STP Modes](/docs/binance-spot-api-docs/enums#stpmodes).                                                                                                                                         |
| \-`apiKey`                  | \-STRING  | \-YES     |                                                                                                                                                                                                                                                                                                           |
| \-`recvWindow`              | \-LONG    | \-NO      | \-The value cannot be greater than `60000`.                                                                                                                                                                                                                                                               |
| \-`timestamp`               | \-LONG    | \-YES     |                                                                                                                                                                                                                                                                                                           |
| \-`signature`               | \-STRING  | \-YES     |                                                                                                                                                                                                                                                                                                           |

**Data Source:** Matching Engine

**Response:**

Response format for `orderReports` is selected using the `newOrderRespType`
parameter. The following example is for `RESULT` response type. See
[`order.place`](/docs/binance-spot-api-docs/websocket-api/trading-requests#place-new-order-trade)
for more examples.

```json
{
  "id": "56374a46-3261-486b-a211-99ed972eb648",
  "status": 200,
  "result": {
    "orderListId": 2,
    "contingencyType": "OCO",
    "listStatusType": "EXEC_STARTED",
    "listOrderStatus": "EXECUTING",
    "listClientOrderId": "cKPMnDCbcLQILtDYM4f4fX",
    "transactionTime": 1711062760648,
    "symbol": "LTCBNB",
    "orders": [
      {
        "symbol": "LTCBNB",
        "orderId": 2,
        "clientOrderId": "0m6I4wfxvTUrOBSMUl0OPU"
      },
      {
        "symbol": "LTCBNB",
        "orderId": 3,
        "clientOrderId": "Z2IMlR79XNY5LU0tOxrWyW"
      }
    ],
    "orderReports": [
      {
        "symbol": "LTCBNB",
        "orderId": 2,
        "orderListId": 2,
        "clientOrderId": "0m6I4wfxvTUrOBSMUl0OPU",
        "transactTime": 1711062760648,
        "price": "1.50000000",
        "origQty": "1.000000",
        "executedQty": "0.000000",
        "origQuoteOrderQty": "0.000000",
        "cummulativeQuoteQty": "0.00000000",
        "status": "NEW",
        "timeInForce": "GTC",
        "type": "STOP_LOSS_LIMIT",
        "side": "BUY",
        "stopPrice": "1.50000001",
        "workingTime": -1,
        "selfTradePreventionMode": "NONE"
      },
      {
        "symbol": "LTCBNB",
        "orderId": 3,
        "orderListId": 2,
        "clientOrderId": "Z2IMlR79XNY5LU0tOxrWyW",
        "transactTime": 1711062760648,
        "price": "1.49999999",
        "origQty": "1.000000",
        "executedQty": "0.000000",
        "origQuoteOrderQty": "0.000000",
        "cummulativeQuoteQty": "0.00000000",
        "status": "NEW",
        "timeInForce": "GTC",
        "type": "LIMIT_MAKER",
        "side": "BUY",
        "workingTime": 1711062760648,
        "selfTradePreventionMode": "NONE"
      }
    ]
  },
  "rateLimits": [
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 10,
      "limit": 50,
      "count": 2
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "DAY",
      "intervalNum": 1,
      "limit": 160000,
      "count": 2
    },
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

##### Place new Order list - OTO (TRADE)

```json
{
  "id": "1712544395950",
  "method": "orderList.place.oto",
  "params": {
    "signature": "3e1e5ac8690b0caf9a2afd5c5de881ceba69939cc9d817daead5386bf65d0cbb",
    "apiKey": "Rf07JlnL9PHVxjs27O5CvKNyOsV4qJ5gXdrRfpvlOdvMZbGZbPO5Ce2nIwfRP0iA",
    "pendingQuantity": 1,
    "pendingSide": "BUY",
    "pendingType": "MARKET",
    "symbol": "LTCBNB",
    "recvWindow": "5000",
    "timestamp": "1712544395951",
    "workingPrice": 1,
    "workingQuantity": 1,
    "workingSide": "SELL",
    "workingTimeInForce": "GTC",
    "workingType": "LIMIT"
  }
}
```

Places an OTO.

- An OTO (One-Triggers-the-Other) is an order list comprised of 2 orders.
- The first order is called the **working order** and must be `LIMIT` or
  `LIMIT_MAKER`. Initially, only the working order goes on the order book.
- The second order is called the **pending order**. It can be any order type
  except for `MARKET` orders using parameter `quoteOrderQty`. The pending order
  is only placed on the order book when the working order gets **fully filled**.
- If either the working order or the pending order is cancelled individually,
  the other order in the order list will also be canceled or expired.
- When the order list is placed, if the working order gets **immediately fully
  filled**, the placement response will show the working order as `FILLED` but
  the pending order will still appear as `PENDING_NEW`. You need to query the
  status of the pending order again to see its updated status.
- OTOs add **2 orders** to the `EXCHANGE_MAX_NUM_ORDERS` filter and
  `MAX_NUM_ORDERS` filter.

**Weight:** 1

**Unfilled Order Count:** 2

**Parameters:**

| Name                        | Type      | Mandatory | Description                                                                                                                                                                                                                                                                                                 |
| --------------------------- | --------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \-`symbol`                  | \-STRING  | \-YES     |                                                                                                                                                                                                                                                                                                             |
| \-`listClientOrderId`       | \-STRING  | \-NO      | \-Arbitrary unique ID among open order lists. Automatically generated if not sent. A new order list with the same listClientOrderId is accepted only when the previous one is filled or completely expired. `listClientOrderId` is distinct from the `workingClientOrderId` and the `pendingClientOrderId`. |
| \-`newOrderRespType`        | \-ENUM    | \-NO      | \-Format of the JSON response. Supported values: [Order Response Type](/docs/binance-spot-api-docs/enums#orderresponsetype)                                                                                                                                                                                 |
| \-`selfTradePreventionMode` | \-ENUM    | \-NO      | \-The allowed values are dependent on what is configured on the symbol. Supported values: [STP Modes](/docs/binance-spot-api-docs/enums#stpmodes)                                                                                                                                                           |
| \-`workingType`             | \-ENUM    | \-YES     | \-Supported values: `LIMIT`,`LIMIT_MAKER`                                                                                                                                                                                                                                                                   |
| \-`workingSide`             | \-ENUM    | \-YES     | \-Supported values: [Order side](/docs/binance-spot-api-docs/enums#side)                                                                                                                                                                                                                                    |
| \-`workingClientOrderId`    | \-STRING  | \-NO      | \-Arbitrary unique ID among open orders for the working order. Automatically generated if not sent.                                                                                                                                                                                                         |
| \-`workingPrice`            | \-DECIMAL | \-YES     |                                                                                                                                                                                                                                                                                                             |
| \-`workingQuantity`         | \-DECIMAL | \-YES     | \-Sets the quantity for the working order.                                                                                                                                                                                                                                                                  |
| \-`workingIcebergQty`       | \-DECIMAL | \-NO      | \-This can only be used if `workingTimeInForce` is `GTC`, or if `workingType` is `LIMIT_MAKER`.                                                                                                                                                                                                             |
| \-`workingTimeInForce`      | \-ENUM    | \-NO      | \-Supported values: [Time In Force](/docs/binance-spot-api-docs/enums#timeinforce)                                                                                                                                                                                                                          |
| \-`workingStrategyId`       | \-LONG    | \-NO      | \-Arbitrary numeric value identifying the working order within an order strategy.                                                                                                                                                                                                                           |
| \-`workingStrategyType`     | \-INT     | \-NO      | \-Arbitrary numeric value identifying the working order strategy. Values smaller than 1000000 are reserved and cannot be used.                                                                                                                                                                              |
| \-`workingPegPriceType`     | \-ENUM    | \-NO      | \-See [Pegged Orders](/docs/binance-spot-api-docs/websocket-api/trading-requests#pegged-orders-info)                                                                                                                                                                                                        |
| \-`workingPegOffsetType`    | \-ENUM    | \-NO      |                                                                                                                                                                                                                                                                                                             |
| \-`workingPegOffsetValue`   | \-INT     | \-NO      |                                                                                                                                                                                                                                                                                                             |
| \-`pendingType`             | \-ENUM    | \-YES     | \-Supported values: [Order types](/docs/binance-spot-api-docs/websocket-api/trading-requests#order-type). Note that `MARKET` orders using `quoteOrderQty` are not supported.                                                                                                                                |
| \-`pendingSide`             | \-ENUM    | \-YES     | \-Supported values: [Order side](/docs/binance-spot-api-docs/enums#side)                                                                                                                                                                                                                                    |
| \-`pendingClientOrderId`    | \-STRING  | \-NO      | \-Arbitrary unique ID among open orders for the pending order. Automatically generated if not sent.                                                                                                                                                                                                         |
| \-`pendingPrice`            | \-DECIMAL | \-NO      |                                                                                                                                                                                                                                                                                                             |
| \-`pendingStopPrice`        | \-DECIMAL | \-NO      |                                                                                                                                                                                                                                                                                                             |
| \-`pendingTrailingDelta`    | \-DECIMAL | \-NO      |                                                                                                                                                                                                                                                                                                             |
| \-`pendingQuantity`         | \-DECIMAL | \-YES     | \-Sets the quantity for the pending order.                                                                                                                                                                                                                                                                  |
| \-`pendingIcebergQty`       | \-DECIMAL | \-NO      | \-This can only be used if `pendingTimeInForce` is `GTC`, or if `pendingType` is `LIMIT_MAKER`.                                                                                                                                                                                                             |
| \-`pendingTimeInForce`      | \-ENUM    | \-NO      | \-Supported values: [Time In Force](/docs/binance-spot-api-docs/enums#timeinforce)                                                                                                                                                                                                                          |
| \-`pendingStrategyId`       | \-LONG    | \-NO      | \-Arbitrary numeric value identifying the pending order within an order strategy.                                                                                                                                                                                                                           |
| \-`pendingStrategyType`     | \-INT     | \-NO      | \-Arbitrary numeric value identifying the pending order strategy. Values smaller than 1000000 are reserved and cannot be used.                                                                                                                                                                              |
| \-`pendingPegOffsetType`    | \-ENUM    | \-NO      | \-See [Pegged Orders](/docs/binance-spot-api-docs/websocket-api/trading-requests#pegged-orders-info)                                                                                                                                                                                                        |
| \-`pendingPegPriceType`     | \-ENUM    | \-NO      |                                                                                                                                                                                                                                                                                                             |
| \-`pendingPegOffsetValue`   | \-INT     | \-NO      |                                                                                                                                                                                                                                                                                                             |
| \-`recvWindow`              | \-LONG    | \-NO      | \-The value cannot be greater than `60000`.                                                                                                                                                                                                                                                                 |
| \-`timestamp`               | \-LONG    | \-YES     |                                                                                                                                                                                                                                                                                                             |
| \-`signature`               | \-STRING  | \-YES     |                                                                                                                                                                                                                                                                                                             |

**Mandatory parameters based on `pendingType` or `workingType`**

Depending on the `pendingType` or `workingType`, some optional parameters will
become mandatory.

| Type                                                      | Additional mandatory parameters                                                          | Additional information |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------- |
| \-`workingType` = `LIMIT`                                 | \-`workingTimeInForce`                                                                   |                        |
| \-`pendingType` = `LIMIT`                                 | \-`pendingPrice`, `pendingTimeInForce`                                                   |                        |
| \-`pendingType` = `STOP_LOSS` or `TAKE_PROFIT`            | \-`pendingStopPrice` and/or `pendingTrailingDelta`                                       |                        |
| \-`pendingType` =`STOP_LOSS_LIMIT` or `TAKE_PROFIT_LIMIT` | \-`pendingPrice`, `pendingStopPrice` and/or `pendingTrailingDelta`, `pendingTimeInForce` |                        |

**Data Source:**

Matching Engine

**Response:**

```json
{
  "id": "1712544395950",
  "status": 200,
  "result": {
    "orderListId": 626,
    "contingencyType": "OTO",
    "listStatusType": "EXEC_STARTED",
    "listOrderStatus": "EXECUTING",
    "listClientOrderId": "KA4EBjGnzvSwSCQsDdTrlf",
    "transactionTime": 1712544395981,
    "symbol": "1712544378871",
    "orders": [
      {
        "symbol": "LTCBNB",
        "orderId": 13,
        "clientOrderId": "YiAUtM9yJjl1a2jXHSp9Ny"
      },
      {
        "symbol": "LTCBNB",
        "orderId": 14,
        "clientOrderId": "9MxJSE1TYkmyx5lbGLve7R"
      }
    ],
    "orderReports": [
      {
        "symbol": "LTCBNB",
        "orderId": 13,
        "orderListId": 626,
        "clientOrderId": "YiAUtM9yJjl1a2jXHSp9Ny",
        "transactTime": 1712544395981,
        "price": "1.000000",
        "origQty": "1.000000",
        "executedQty": "0.000000",
        "origQuoteOrderQty": "0.000000",
        "cummulativeQuoteQty": "0.000000",
        "status": "NEW",
        "timeInForce": "GTC",
        "type": "LIMIT",
        "side": "SELL",
        "workingTime": 1712544395981,
        "selfTradePreventionMode": "NONE"
      },
      {
        "symbol": "LTCBNB",
        "orderId": 14,
        "orderListId": 626,
        "clientOrderId": "9MxJSE1TYkmyx5lbGLve7R",
        "transactTime": 1712544395981,
        "price": "0.000000",
        "origQty": "1.000000",
        "executedQty": "0.000000",
        "origQuoteOrderQty": "0.000000",
        "cummulativeQuoteQty": "0.000000",
        "status": "PENDING_NEW",
        "timeInForce": "GTC",
        "type": "MARKET",
        "side": "BUY",
        "workingTime": -1,
        "selfTradePreventionMode": "NONE"
      }
    ]
  },
  "rateLimits": [
    {
      "rateLimitType": "ORDERS",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 10000000,
      "count": 10
    },
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 1000,
      "count": 38
    }
  ]
}
```

**Note:** The payload above does not show all fields that can appear. Please
refer to
[Conditional fields in Order Responses](/docs/binance-spot-api-docs/websocket-api/trading-requests#conditional-fields-in-order-responses).

##### Place new Order list - OTOCO (TRADE)

```json
{
  "id": "1712544408508",
  "method": "orderList.place.otoco",
  "params": {
    "signature": "c094473304374e1b9c5f7e2558358066cfa99df69f50f63d09cfee755136cb07",
    "apiKey": "Rf07JlnL9PHVxjs27O5CvKNyOsV4qJ5gXdrRfpvlOdvMZbGZbPO5Ce2nIwfRP0iA",
    "pendingQuantity": 5,
    "pendingSide": "SELL",
    "pendingBelowPrice": 5,
    "pendingBelowType": "LIMIT_MAKER",
    "pendingAboveStopPrice": 0.5,
    "pendingAboveType": "STOP_LOSS",
    "symbol": "LTCBNB",
    "recvWindow": "5000",
    "timestamp": "1712544408509",
    "workingPrice": 1.5,
    "workingQuantity": 1,
    "workingSide": "BUY",
    "workingTimeInForce": "GTC",
    "workingType": "LIMIT"
  }
}
```

Place an OTOCO.

- An OTOCO (One-Triggers-One-Cancels-the-Other) is an order list comprised of 3
  orders.
- The first order is called the **working order** and must be `LIMIT` or
  `LIMIT_MAKER`. Initially, only the working order goes on the order book.
  - The behavior of the working order is the same as the
    [OTO](/docs/binance-spot-api-docs/websocket-api/trading-requests#place-new-order-list---oto-trade).
- OTOCO has 2 pending orders (pending above and pending below), forming an OCO
  pair. The pending orders are only placed on the order book when the working
  order gets **fully filled**.
  - The rules of the pending above and pending below follow the same rules as
    the
    [Order list OCO](/docs/binance-spot-api-docs/websocket-api/trading-requests#new-order-list---oco-trade).
- OTOCOs add **3 orders** to the `EXCHANGE_MAX_NUM_ORDERS` filter and
  `MAX_NUM_ORDERS` filter.

**Weight:** 1

**Unfilled Order Count:** 3

**Parameters:**

| Name                           | Type      | Mandatory | Description                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------ | --------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \-`symbol`                     | \-STRING  | \-YES     |                                                                                                                                                                                                                                                                                                                                                |
| \-`listClientOrderId`          | \-STRING  | \-NO      | \-Arbitrary unique ID among open order lists. Automatically generated if not sent. A new order list with the same listClientOrderId is accepted only when the previous one is filled or completely expired. `listClientOrderId` is distinct from the `workingClientOrderId`, `pendingAboveClientOrderId`, and the `pendingBelowClientOrderId`. |
| \-`newOrderRespType`           | \-ENUM    | \-NO      | \-Format of the JSON response. Supported values: [Order Response Type](/docs/binance-spot-api-docs/enums#orderresponsetype)                                                                                                                                                                                                                    |
| \-`selfTradePreventionMode`    | \-ENUM    | \-NO      | \-The allowed values are dependent on what is configured on the symbol. Supported values: [STP Modes](/docs/binance-spot-api-docs/enums#stpmodes)                                                                                                                                                                                              |
| \-`workingType`                | \-ENUM    | \-YES     | \-Supported values: `LIMIT`, `LIMIT_MAKER`                                                                                                                                                                                                                                                                                                     |
| \-`workingSide`                | \-ENUM    | \-YES     | \-Supported values: [Order Side](/docs/binance-spot-api-docs/enums#side)                                                                                                                                                                                                                                                                       |
| \-`workingClientOrderId`       | \-STRING  | \-NO      | \-Arbitrary unique ID among open orders for the working order. Automatically generated if not sent.                                                                                                                                                                                                                                            |
| \-`workingPrice`               | \-DECIMAL | \-YES     |                                                                                                                                                                                                                                                                                                                                                |
| \-`workingQuantity`            | \-DECIMAL | \-YES     |                                                                                                                                                                                                                                                                                                                                                |
| \-`workingIcebergQty`          | \-DECIMAL | \-NO      | \-This can only be used if `workingTimeInForce` is `GTC`.                                                                                                                                                                                                                                                                                      |
| \-`workingTimeInForce`         | \-ENUM    | \-NO      | \-Supported values: [Time In Force](/docs/binance-spot-api-docs/enums#timeinforce)                                                                                                                                                                                                                                                             |
| \-`workingStrategyId`          | \-LONG    | \-NO      | \-Arbitrary numeric value identifying the working order within an order strategy.                                                                                                                                                                                                                                                              |
| \-`workingStrategyType`        | \-INT     | \-NO      | \-Arbitrary numeric value identifying the working order strategy. Values smaller than 1000000 are reserved and cannot be used.                                                                                                                                                                                                                 |
| \-`workingPegPriceType`        | \-ENUM    | \-NO      | \-See [Pegged Orders](/docs/binance-spot-api-docs/websocket-api/trading-requests#pegged-orders-info)                                                                                                                                                                                                                                           |
| \-`workingPegOffsetType`       | \-ENUM    | \-NO      |                                                                                                                                                                                                                                                                                                                                                |
| \-`workingPegOffsetValue`      | \-INT     | \-NO      |                                                                                                                                                                                                                                                                                                                                                |
| \-`pendingSide`                | \-ENUM    | \-YES     | \-Supported values: [Order Side](/docs/binance-spot-api-docs/enums#side)                                                                                                                                                                                                                                                                       |
| \-`pendingQuantity`            | \-DECIMAL | \-YES     |                                                                                                                                                                                                                                                                                                                                                |
| \-`pendingAboveType`           | \-ENUM    | \-YES     | \-Supported values: `STOP_LOSS_LIMIT`, `STOP_LOSS`, `LIMIT_MAKER`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT`                                                                                                                                                                                                                                          |
| \-`pendingAboveClientOrderId`  | \-STRING  | \-NO      | \-Arbitrary unique ID among open orders for the pending above order. Automatically generated if not sent.                                                                                                                                                                                                                                      |
| \-`pendingAbovePrice`          | \-DECIMAL | \-NO      | \-Can be used if `pendingAboveType` is `STOP_LOSS_LIMIT` , `LIMIT_MAKER`, or `TAKE_PROFIT_LIMIT` to specify the limit price.                                                                                                                                                                                                                   |
| \-`pendingAboveStopPrice`      | \-DECIMAL | \-NO      | \-Can be used if `pendingAboveType` is `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT`                                                                                                                                                                                                                                      |
| \-`pendingAboveTrailingDelta`  | \-DECIMAL | \-NO      | \-See [Trailing Stop FAQ](/docs/binance-spot-api-docs/faqs/trailing-stop-faq)                                                                                                                                                                                                                                                                  |
| \-`pendingAboveIcebergQty`     | \-DECIMAL | \-NO      | \-This can only be used if `pendingAboveTimeInForce` is `GTC` or if `pendingAboveType` is `LIMIT_MAKER`.                                                                                                                                                                                                                                       |
| \-`pendingAboveTimeInForce`    | \-ENUM    | \-NO      |                                                                                                                                                                                                                                                                                                                                                |
| \-`pendingAboveStrategyId`     | \-LONG    | \-NO      | \-Arbitrary numeric value identifying the pending above order within an order strategy.                                                                                                                                                                                                                                                        |
| \-`pendingAboveStrategyType`   | \-INT     | \-NO      | \-Arbitrary numeric value identifying the pending above order strategy. Values smaller than 1000000 are reserved and cannot be used.                                                                                                                                                                                                           |
| \-`pendingAbovePegPriceType`   | \-ENUM    | \-NO      | \-See [Pegged Orders](/docs/binance-spot-api-docs/websocket-api/trading-requests#pegged-orders-info)                                                                                                                                                                                                                                           |
| \-`pendingAbovePegOffsetType`  | \-ENUM    | \-NO      |                                                                                                                                                                                                                                                                                                                                                |
| \-`pendingAbovePegOffsetValue` | \-INT     | \-NO      |                                                                                                                                                                                                                                                                                                                                                |
| \-`pendingBelowType`           | \-ENUM    | \-NO      | \-Supported values: `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`,`TAKE_PROFIT_LIMIT`                                                                                                                                                                                                                                                          |
| \-`pendingBelowClientOrderId`  | \-STRING  | \-NO      | \-Arbitrary unique ID among open orders for the pending below order. Automatically generated if not sent.                                                                                                                                                                                                                                      |
| \-`pendingBelowPrice`          | \-DECIMAL | \-NO      | \-Can be used if `pendingBelowType` is `STOP_LOSS_LIMIT` or `TAKE_PROFIT_LIMIT` to specify the limit price.                                                                                                                                                                                                                                    |
| \-`pendingBelowStopPrice`      | \-DECIMAL | \-NO      | \-Can be used if `pendingBelowType` is `STOP_LOSS`, `STOP_LOSS_LIMIT, TAKE_PROFIT or TAKE_PROFIT_LIMIT`. Either `pendingBelowStopPrice` or `pendingBelowTrailingDelta` or both, must be specified.                                                                                                                                             |
| \-`pendingBelowTrailingDelta`  | \-DECIMAL | \-NO      |                                                                                                                                                                                                                                                                                                                                                |
| \-`pendingBelowIcebergQty`     | \-DECIMAL | \-NO      | \-This can only be used if `pendingBelowTimeInForce` is `GTC`, or if `pendingBelowType` is `LIMIT_MAKER`.                                                                                                                                                                                                                                      |
| \-`pendingBelowTimeInForce`    | \-ENUM    | \-NO      | \-Supported values: [Time In Force](/docs/binance-spot-api-docs/enums#timeinforce)                                                                                                                                                                                                                                                             |
| \-`pendingBelowStrategyId`     | \-LONG    | \-NO      | \-Arbitrary numeric value identifying the pending below order within an order strategy.                                                                                                                                                                                                                                                        |
| \-`pendingBelowStrategyType`   | \-INT     | \-NO      | \-Arbitrary numeric value identifying the pending below order strategy. Values smaller than 1000000 are reserved and cannot be used.                                                                                                                                                                                                           |
| \-`pendingBelowPegPriceType`   | \-ENUM    | \-NO      | \-See [Pegged Orders](/docs/binance-spot-api-docs/websocket-api/trading-requests#pegged-orders-info)                                                                                                                                                                                                                                           |
| \-`pendingBelowPegOffsetType`  | \-ENUM    | \-NO      |                                                                                                                                                                                                                                                                                                                                                |
| \-`pendingBelowPegOffsetValue` | \-INT     | \-NO      |                                                                                                                                                                                                                                                                                                                                                |
| \-`recvWindow`                 | \-LONG    | \-NO      | \-The value cannot be greater than `60000`.                                                                                                                                                                                                                                                                                                    |
| \-`timestamp`                  | \-LONG    | \-YES     |                                                                                                                                                                                                                                                                                                                                                |
| \-`signature`                  | \-STRING  | \-YES     |                                                                                                                                                                                                                                                                                                                                                |

**Mandatory parameters based on `pendingAboveType`, `pendingBelowType` or
`workingType`**

Depending on the `pendingAboveType`/`pendingBelowType` or `workingType`, some
optional parameters will become mandatory.

| Type                                                   | Additional mandatory parameters                                                                              | Additional information |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ---------------------- |
| \-`workingType` = `LIMIT`                              | \-`workingTimeInForce`                                                                                       |                        |
| \-`pendingAboveType`\= `LIMIT_MAKER`                   | \-`pendingAbovePrice`                                                                                        |                        |
| \-`pendingAboveType` = `STOP_LOSS/TAKE_PROFIT`         | \-`pendingAboveStopPrice` and/or `pendingAboveTrailingDelta`                                                 |                        |
| \-`pendingAboveType=STOP_LOSS_LIMIT/TAKE_PROFIT_LIMIT` | \-`pendingAbovePrice`, `pendingAboveStopPrice` and/or `pendingAboveTrailingDelta`, `pendingAboveTimeInForce` |                        |
| \-`pendingBelowType`\= `LIMIT_MAKER`                   | \-`pendingBelowPrice`                                                                                        |                        |
| \-`pendingBelowType= STOP_LOSS/TAKE_PROFIT`            | \-`pendingBelowStopPrice` and/or `pendingBelowTrailingDelta`                                                 |                        |
| \-`pendingBelowType=STOP_LOSS_LIMIT/TAKE_PROFIT_LIMIT` | \-`pendingBelowPrice`, `pendingBelowStopPrice` and/or `pendingBelowTrailingDelta`, `pendingBelowTimeInForce` |                        |

**Data Source:** Matching Engine

**Response:**

```json
{
  "id": "1712544408508",
  "status": 200,
  "result": {
    "orderListId": 629,
    "contingencyType": "OTO",
    "listStatusType": "EXEC_STARTED",
    "listOrderStatus": "EXECUTING",
    "listClientOrderId": "GaeJHjZPasPItFj4x7Mqm6",
    "transactionTime": 1712544408537,
    "symbol": "1712544378871",
    "orders": [
      {
        "symbol": "LTCBNB",
        "orderId": 23,
        "clientOrderId": "OVQOpKwfmPCfaBTD0n7e7H"
      },
      {
        "symbol": "LTCBNB",
        "orderId": 24,
        "clientOrderId": "YcCPKCDMQIjNvLtNswt82X"
      },
      {
        "symbol": "LTCBNB",
        "orderId": 25,
        "clientOrderId": "ilpIoShcFZ1ZGgSASKxMPt"
      }
    ],
    "orderReports": [
      {
        "symbol": "LTCBNB",
        "orderId": 23,
        "orderListId": 629,
        "clientOrderId": "OVQOpKwfmPCfaBTD0n7e7H",
        "transactTime": 1712544408537,
        "price": "1.500000",
        "origQty": "1.000000",
        "executedQty": "0.000000",
        "origQuoteOrderQty": "0.000000",
        "cummulativeQuoteQty": "0.000000",
        "status": "NEW",
        "timeInForce": "GTC",
        "type": "LIMIT",
        "side": "BUY",
        "workingTime": 1712544408537,
        "selfTradePreventionMode": "NONE"
      },
      {
        "symbol": "LTCBNB",
        "orderId": 24,
        "orderListId": 629,
        "clientOrderId": "YcCPKCDMQIjNvLtNswt82X",
        "transactTime": 1712544408537,
        "price": "0.000000",
        "origQty": "5.000000",
        "executedQty": "0.000000",
        "origQuoteOrderQty": "0.000000",
        "cummulativeQuoteQty": "0.000000",
        "status": "PENDING_NEW",
        "timeInForce": "GTC",
        "type": "STOP_LOSS",
        "side": "SELL",
        "stopPrice": "0.500000",
        "workingTime": -1,
        "selfTradePreventionMode": "NONE"
      },
      {
        "symbol": "LTCBNB",
        "orderId": 25,
        "orderListId": 629,
        "clientOrderId": "ilpIoShcFZ1ZGgSASKxMPt",
        "transactTime": 1712544408537,
        "price": "5.000000",
        "origQty": "5.000000",
        "executedQty": "0.000000",
        "origQuoteOrderQty": "0.000000",
        "cummulativeQuoteQty": "0.000000",
        "status": "PENDING_NEW",
        "timeInForce": "GTC",
        "type": "LIMIT_MAKER",
        "side": "SELL",
        "workingTime": -1,
        "selfTradePreventionMode": "NONE"
      }
    ]
  },
  "rateLimits": [
    {
      "rateLimitType": "ORDERS",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 10000000,
      "count": 18
    },
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 1000,
      "count": 65
    }
  ]
}
```

**Note:** The payload above does not show all fields that can appear. Please
refer to
[Conditional fields in Order Responses](/docs/binance-spot-api-docs/websocket-api/trading-requests#conditional-fields-in-order-responses).

##### Cancel Order list (TRADE)

```json
{
  "id": "c5899911-d3f4-47ae-8835-97da553d27d0",
  "method": "orderList.cancel",
  "params": {
    "symbol": "BTCUSDT",
    "orderListId": 1274512,
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "4973f4b2fee30bf6d45e4a973e941cc60fdd53c8dd5a25edeac96f5733c0ccee",
    "timestamp": 1660801720210
  }
}
```

Cancel an active order list.

**Weight**: 1

**Parameters:**

| Name                  | Type     | Mandatory                             | Description                                                               |
| --------------------- | -------- | ------------------------------------- | ------------------------------------------------------------------------- |
| \-`symbol`            | \-STRING | \-YES                                 |                                                                           |
| \-`orderListId`       | \-INT    | \-YES                                 | \-Cancel order list by `orderListId`                                      |
| \-`listClientOrderId` | \-STRING | \-Cancel order list by `listClientId` |
| \-`newClientOrderId`  | \-STRING | \-NO                                  | \-New ID for the canceled order list. Automatically generated if not sent |
| \-`apiKey`            | \-STRING | \-YES                                 |                                                                           |
| \-`recvWindow`        | \-LONG   | \-NO                                  | \-The value cannot be greater than 60000                                  |
| \-`signature`         | \-STRING | \-YES                                 |                                                                           |
| \-`timestamp`         | \-LONG   | \-YES                                 |                                                                           |

Notes:

- If both `orderListId` and `listClientOrderId` parameters are provided, the
  `orderListId` is searched first, then the `listClientOrderId` from that result
  is checked against that order. If both conditions are not met the request will
  be rejected.
- Canceling an individual order with
  [`order.cancel`](/docs/binance-spot-api-docs/websocket-api/trading-requests#cancel-order-trade)
  will cancel the entire order list as well.

**Data Source:** Matching Engine

**Response:**

```json
{
  "id": "c5899911-d3f4-47ae-8835-97da553d27d0",
  "status": 200,
  "result": {
    "orderListId": 1274512,
    "contingencyType": "OCO",
    "listStatusType": "ALL_DONE",
    "listOrderStatus": "ALL_DONE",
    "listClientOrderId": "6023531d7edaad348f5aff",
    "transactionTime": 1660801720215,
    "symbol": "BTCUSDT",
    "orders": [
      {
        "symbol": "BTCUSDT",
        "orderId": 12569138901,
        "clientOrderId": "BqtFCj5odMoWtSqGk2X9tU"
      },
      {
        "symbol": "BTCUSDT",
        "orderId": 12569138902,
        "clientOrderId": "jLnZpj5enfMXTuhKB1d0us"
      }
    ],
    "orderReports": [
      {
        "symbol": "BTCUSDT",
        "orderId": 12569138901,
        "orderListId": 1274512,
        "clientOrderId": "BqtFCj5odMoWtSqGk2X9tU",
        "transactTime": 1660801720215,
        "price": "23410.00000000",
        "origQty": "0.00650000",
        "executedQty": "0.00000000",
        "origQuoteOrderQty": "0.000000",
        "cummulativeQuoteQty": "0.00000000",
        "status": "CANCELED",
        "timeInForce": "GTC",
        "type": "STOP_LOSS_LIMIT",
        "side": "SELL",
        "stopPrice": "23405.00000000",
        "selfTradePreventionMode": "NONE"
      },
      {
        "symbol": "BTCUSDT",
        "orderId": 12569138902,
        "orderListId": 1274512,
        "clientOrderId": "jLnZpj5enfMXTuhKB1d0us",
        "transactTime": 1660801720215,
        "price": "23420.00000000",
        "origQty": "0.00650000",
        "executedQty": "0.00000000",
        "origQuoteOrderQty": "0.000000",
        "cummulativeQuoteQty": "0.00000000",
        "status": "CANCELED",
        "timeInForce": "GTC",
        "type": "LIMIT_MAKER",
        "side": "SELL",
        "selfTradePreventionMode": "NONE"
      }
    ]
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

#### SOR

##### Place new order using SOR (TRADE)

```json
{
  "id": "3a4437e2-41a3-4c19-897c-9cadc5dce8b6",
  "method": "sor.order.place",
  "params": {
    "symbol": "BTCUSDT",
    "side": "BUY",
    "type": "LIMIT",
    "quantity": 0.5,
    "timeInForce": "GTC",
    "price": 31000,
    "timestamp": 1687485436575,
    "apiKey": "u5lgqJb97QWXWfgeV4cROuHbReSJM9rgQL0IvYcYc7BVeA5lpAqqc3a5p2OARIFk",
    "signature": "fd301899567bc9472ce023392160cdc265ad8fcbbb67e0ea1b2af70a4b0cd9c7"
  }
}
```

Places an order using smart order routing (SOR).

This adds 1 order to the `EXCHANGE_MAX_ORDERS` filter and the `MAX_NUM_ORDERS`
filter.

Read [SOR FAQ](/docs/faqs/sor_faq) to learn more.

**Weight:** 1

**Unfilled Order Count:** 1

**Parameters:**

| Name                 | Type      | Mandatory | Description                                                                  |
| -------------------- | --------- | --------- | ---------------------------------------------------------------------------- |
| \-`symbol`           | \-STRING  | \-YES     |                                                                              |
| \-`side`             | \-ENUM    | \-YES     | \-`BUY` or `SELL`                                                            |
| \-`type`             | \-ENUM    | \-YES     |                                                                              |
| \-`timeInForce`      | \-ENUM    | \-NO      | \-Applicable only to `LIMIT` order type                                      |
| \-`price`            | \-DECIMAL | \-NO      | \-Applicable only to `LIMIT` order type                                      |
| \-`quantity`         | \-DECIMAL | \-YES     |                                                                              |
| \-`newClientOrderId` | \-STRING  | \-NO      | \-Arbitrary unique ID among open orders. Automatically generated if not sent |
| \-`newOrderRespType` | \-ENUM    | \-NO      | \-                                                                           |

Select response format: `ACK`, `RESULT`, `FULL`.

`MARKET` and `LIMIT` orders use `FULL` by default.

| | \-`icebergQty` | \-DECIMAL | \-NO | | | \-`strategyId` | \-LONG | \-NO |
\-Arbitrary numeric value identifying the order within an order strategy. | |
\-`strategyType` | \-INT | \-NO | \-

Arbitrary numeric value identifying the order strategy.

Values smaller than `1000000` are reserved and cannot be used.

| | \-`selfTradePreventionMode` | \-ENUM | \-NO | \-The allowed enums is
dependent on what is configured on the symbol. The possible supported values
are: [STP Modes](/docs/binance-spot-api-docs/enums#stpmodes). | | \-`apiKey` |
\-STRING | \-YES | | | \-`timestamp` | \-LONG | \-YES | | | \-`recvWindow` |
\-LONG | \-NO | \-The value cannot be greater than `60000` | | \-`signature` |
\-STRING | \-YES | |

**Note:** `sor.order.place` only supports `LIMIT` and `MARKET` orders.
`quoteOrderQty` is not supported.

**Data Source:** Matching Engine

**Response:**

```json
{
  "id": "3a4437e2-41a3-4c19-897c-9cadc5dce8b6",
  "status": 200,
  "result": [
    {
      "symbol": "BTCUSDT",
      "orderId": 2,
      "orderListId": -1,
      "clientOrderId": "sBI1KM6nNtOfj5tccZSKly",
      "transactTime": 1689149087774,
      "price": "31000.00000000",
      "origQty": "0.50000000",
      "executedQty": "0.50000000",
      "origQuoteOrderQty": "0.000000",
      "cummulativeQuoteQty": "14000.00000000",
      "status": "FILLED",
      "timeInForce": "GTC",
      "type": "LIMIT",
      "side": "BUY",
      "workingTime": 1689149087774,
      "fills": [
        {
          "matchType": "ONE_PARTY_TRADE_REPORT",
          "price": "28000.00000000",
          "qty": "0.50000000",
          "commission": "0.00000000",
          "commissionAsset": "BTC",
          "tradeId": -1,
          "allocId": 0
        }
      ],
      "workingFloor": "SOR",
      "selfTradePreventionMode": "NONE",
      "usedSor": true
    }
  ],
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

##### Test new order using SOR (TRADE)

```json
{
  "id": "3a4437e2-41a3-4c19-897c-9cadc5dce8b6",
  "method": "sor.order.test",
  "params": {
    "symbol": "BTCUSDT",
    "side": "BUY",
    "type": "LIMIT",
    "quantity": 0.1,
    "timeInForce": "GTC",
    "price": 0.1,
    "timestamp": 1687485436575,
    "apiKey": "u5lgqJb97QWXWfgeV4cROuHbReSJM9rgQL0IvYcYc7BVeA5lpAqqc3a5p2OARIFk",
    "signature": "fd301899567bc9472ce023392160cdc265ad8fcbbb67e0ea1b2af70a4b0cd9c7"
  }
}
```

Test new order creation and signature/recvWindow using smart order routing
(SOR). Creates and validates a new order but does not send it into the matching
engine.

**Weight:**

| Condition                          | Request Weight |
| ---------------------------------- | -------------- |
| \-Without `computeCommissionRates` | \-1            |
| \-With `computeCommissionRates`    | \-20           |

**Parameters:**

In addition to all parameters accepted by
[`sor.order.place`](/docs/binance-spot-api-docs/websocket-api/trading-requests#place-new-order-using-sor-trade),
the following optional parameters are also accepted:

| Name                       | Type      | Mandatory | Description        |
| -------------------------- | --------- | --------- | ------------------ |
| \-`computeCommissionRates` | \-BOOLEAN | \-NO      | \-Default: `false` |

**Data Source:** Memory

**Response:**

Without `computeCommissionRates`:

```json
{
  "id": "3a4437e2-41a3-4c19-897c-9cadc5dce8b6",
  "status": 200,
  "result": {},
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 1
    }
  ]
}
```

With `computeCommissionRates`:

```json
{
  "id": "3a4437e2-41a3-4c19-897c-9cadc5dce8b6",
  "status": 200,
  "result": {
    "standardCommissionForOrder": {
      //Commission rates for the order depending on its role (e.g. maker or taker)
      "maker": "0.00000112",
      "taker": "0.00000114"
    },
    "taxCommissionForOrder": {
      //Tax deduction rates for the order depending on its role (e.g. maker or taker)
      "maker": "0.00000112",
      "taker": "0.00000114"
    },
    "discount": {
      //Discount on standard commissions when paying in BNB.
      "enabledForAccount": true,
      "enabledForSymbol": true,
      "discountAsset": "BNB",
      "discount": "0.25" //Standard commission is reduced by this rate when paying in BNB.
    }
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 20
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/trading-requests](https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/trading-requests)

## Account requests

#### Account information (USER_DATA)

```json
{
  "id": "605a6d20-6588-4cb9-afa0-b0ab087507ba",
  "method": "account.status",
  "params": {
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "83303b4a136ac1371795f465808367242685a9e3a42b22edb4d977d0696eb45c",
    "timestamp": 1660801839480
  }
}
```

Query information about your account.

**Weight:** 20

**Parameters:**

| Name                 | Type      | Mandatory | Description                                                                                |
| -------------------- | --------- | --------- | ------------------------------------------------------------------------------------------ |
| \-`apiKey`           | \-STRING  | \-YES     |                                                                                            |
| \-`omitZeroBalances` | \-BOOLEAN | \-NO      | \-When set to `true`, emits only the non-zero balances of an account. Default value: false |
| \-`recvWindow`       | \-LONG    | \-NO      | \-The value cannot be greater than `60000`                                                 |
| \-`signature`        | \-STRING  | \-YES     |                                                                                            |
| \-`timestamp`        | \-LONG    | \-YES     |                                                                                            |

**Data Source:** Memory => Database

**Response:**

```json
{
  "id": "605a6d20-6588-4cb9-afa0-b0ab087507ba",
  "status": 200,
  "result": {
    "makerCommission": 15,
    "takerCommission": 15,
    "buyerCommission": 0,
    "sellerCommission": 0,
    "canTrade": true,
    "canWithdraw": true,
    "canDeposit": true,
    "commissionRates": {
      "maker": "0.00150000",
      "taker": "0.00150000",
      "buyer": "0.00000000",
      "seller": "0.00000000"
    },
    "brokered": false,
    "requireSelfTradePrevention": false,
    "preventSor": false,
    "updateTime": 1660801833000,
    "accountType": "SPOT",
    "balances": [
      {
        "asset": "BNB",
        "free": "0.00000000",
        "locked": "0.00000000"
      },
      {
        "asset": "BTC",
        "free": "1.3447112",
        "locked": "0.08600000"
      },
      {
        "asset": "USDT",
        "free": "1021.21000000",
        "locked": "0.00000000"
      }
    ],
    "permissions": ["SPOT"],
    "uid": 354937868
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 20
    }
  ]
}
```

#### Query order (USER_DATA)

```json
{
  "id": "aa62318a-5a97-4f3b-bdc7-640bbe33b291",
  "method": "order.status",
  "params": {
    "symbol": "BTCUSDT",
    "orderId": 12569099453,
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "2c3aab5a078ee4ea465ecd95523b77289f61476c2f238ec10c55ea6cb11a6f35",
    "timestamp": 1660801720951
  }
}
```

Check execution status of an order.

**Weight:** 4

**Parameters:**

| Name                  | Type     | Mandatory                         | Description                              |
| --------------------- | -------- | --------------------------------- | ---------------------------------------- |
| \-`symbol`            | \-STRING | \-YES                             |                                          |
| \-`orderId`           | \-LONG   | \-YES                             | \-Lookup order by `orderId`              |
| \-`origClientOrderId` | \-STRING | \-Lookup order by `clientOrderId` |
| \-`apiKey`            | \-STRING | \-YES                             |                                          |
| \-`recvWindow`        | \-LONG   | \-NO                              | \-The value cannot be greater than 60000 |
| \-`signature`         | \-STRING | \-YES                             |                                          |
| \-`timestamp`         | \-LONG   | \-YES                             |                                          |

Notes:

- If both `orderId` and `origClientOrderId` are provided, the `orderId` is
  searched first, then the `origClientOrderId` from that result is checked
  against that order. If both conditions are not met the request will be
  rejected.
- For some historical orders the `cummulativeQuoteQty` response field may be
  negative, meaning the data is not available at this time.

**Data Source:** Memory => Database

**Response:**

```json
{
  "id": "aa62318a-5a97-4f3b-bdc7-640bbe33b291",
  "status": 200,
  "result": {
    "symbol": "BTCUSDT",
    "orderId": 12569099453,
    "orderListId": -1, // set only for orders of an order list
    "clientOrderId": "4d96324ff9d44481926157",
    "price": "23416.10000000",
    "origQty": "0.00847000",
    "executedQty": "0.00847000",
    "cummulativeQuoteQty": "198.33521500",
    "status": "FILLED",
    "timeInForce": "GTC",
    "type": "LIMIT",
    "side": "SELL",
    "stopPrice": "0.00000000", // always present, zero if order type does not use stopPrice
    "trailingDelta": 10, // present only if trailingDelta set for the order
    "trailingTime": -1, // present only if trailingDelta set for the order
    "icebergQty": "0.00000000", // always present, zero for non-iceberg orders
    "time": 1660801715639, // time when the order was placed
    "updateTime": 1660801717945, // time of the last update to the order
    "isWorking": true,
    "workingTime": 1660801715639,
    "origQuoteOrderQty": "0.00000000", // always present, zero if order type does not use quoteOrderQty
    "strategyId": 37463720, // present only if strategyId set for the order
    "strategyType": 1000000, // present only if strategyType set for the order
    "selfTradePreventionMode": "NONE",
    "preventedMatchId": 0, // present only if the order expired due to STP
    "preventedQuantity": "1.200000" // present only if the order expired due to STP
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 4
    }
  ]
}
```

**Note:** The payload above does not show all fields that can appear. Please
refer to
[Conditional fields in Order Responses](/docs/binance-spot-api-docs/websocket-api/trading-requests#conditional-fields-in-order-responses).

#### Current open orders (USER_DATA)

```json
{
  "id": "55f07876-4f6f-4c47-87dc-43e5fff3f2e7",
  "method": "openOrders.status",
  "params": {
    "symbol": "BTCUSDT",
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "d632b3fdb8a81dd44f82c7c901833309dd714fe508772a89b0a35b0ee0c48b89",
    "timestamp": 1660813156812
  }
}
```

Query execution status of all open orders.

If you need to continuously monitor order status updates, please consider using
WebSocket Streams:

- [`userDataStream.start`](/docs/binance-spot-api-docs/websocket-api/user-data-stream-requests#user-data-stream-requests)
  request
- [`executionReport`](/docs/binance-spot-api-docs/user-data-stream#order-update)
  user data stream event

**Weight:** Adjusted based on the number of requested symbols:

| Parameter  | Weight |
| ---------- | ------ |
| \-`symbol` | \-6    |
| \-none     | \-80   |

**Parameters:**

| Name           | Type     | Mandatory | Description                                            |
| -------------- | -------- | --------- | ------------------------------------------------------ |
| \-`symbol`     | \-STRING | \-NO      | \-If omitted, open orders for all symbols are returned |
| \-`apiKey`     | \-STRING | \-YES     |                                                        |
| \-`recvWindow` | \-LONG   | \-NO      | \-The value cannot be greater than `60000`             |
| \-`signature`  | \-STRING | \-YES     |                                                        |
| \-`timestamp`  | \-LONG   | \-YES     |                                                        |

**Data Source:** Memory => Database

**Response:**

Status reports for open orders are identical to
[`order.status`](/docs/binance-spot-api-docs/websocket-api/account-requests#query-order-user_data).

Note that some fields are optional and included only for orders that set them.

Open orders are always returned as a flat list. If all symbols are requested,
use the `symbol` field to tell which symbol the orders belong to.

```json
{
  "id": "55f07876-4f6f-4c47-87dc-43e5fff3f2e7",
  "status": 200,
  "result": [
    {
      "symbol": "BTCUSDT",
      "orderId": 12569099453,
      "orderListId": -1,
      "clientOrderId": "4d96324ff9d44481926157",
      "price": "23416.10000000",
      "origQty": "0.00847000",
      "executedQty": "0.00720000",
      "origQuoteOrderQty": "0.000000",
      "cummulativeQuoteQty": "172.43931000",
      "status": "PARTIALLY_FILLED",
      "timeInForce": "GTC",
      "type": "LIMIT",
      "side": "SELL",
      "stopPrice": "0.00000000",
      "icebergQty": "0.00000000",
      "time": 1660801715639,
      "updateTime": 1660801717945,
      "isWorking": true,
      "workingTime": 1660801715639,
      "origQuoteOrderQty": "0.00000000",
      "selfTradePreventionMode": "NONE"
    }
  ],
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 6
    }
  ]
}
```

**Note:** The payload above does not show all fields that can appear. Please
refer to
[Conditional fields in Order Responses](/docs/binance-spot-api-docs/websocket-api/trading-requests#conditional-fields-in-order-responses).

#### Account order history (USER_DATA)

```json
{
  "id": "734235c2-13d2-4574-be68-723e818c08f3",
  "method": "allOrders",
  "params": {
    "symbol": "BTCUSDT",
    "startTime": 1660780800000,
    "endTime": 1660867200000,
    "limit": 5,
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "f50a972ba7fad92842187643f6b930802d4e20bce1ba1e788e856e811577bd42",
    "timestamp": 1661955123341
  }
}
```

Query information about all your orders – active, canceled, filled – filtered by
time range.

**Weight:** 20

**Parameters:**

| Name           | Type     | Mandatory | Description                                |
| -------------- | -------- | --------- | ------------------------------------------ |
| \-`symbol`     | \-STRING | \-YES     |                                            |
| \-`orderId`    | \-LONG   | \-NO      | \-Order ID to begin at                     |
| \-`startTime`  | \-LONG   | \-NO      |                                            |
| \-`endTime`    | \-LONG   | \-NO      |                                            |
| \-`limit`      | \-INT    | \-NO      | \-Default: 500; Maximum: 1000              |
| \-`apiKey`     | \-STRING | \-YES     |                                            |
| \-`recvWindow` | \-LONG   | \-NO      | \-The value cannot be greater than `60000` |
| \-`signature`  | \-STRING | \-YES     |                                            |
| \-`timestamp`  | \-LONG   | \-YES     |                                            |

Notes:

- If `startTime` and/or `endTime` are specified, `orderId` is ignored.

  Orders are filtered by `time` of the last execution status update.

- If `orderId` is specified, return orders with order ID >= `orderId`.
- If no condition is specified, the most recent orders are returned.
- For some historical orders the `cummulativeQuoteQty` response field may be
  negative, meaning the data is not available at this time.
- The time between `startTime` and `endTime` can't be longer than 24 hours.

**Data Source:** Database

**Response:**

Status reports for orders are identical to
[`order.status`](/docs/binance-spot-api-docs/websocket-api/account-requests#query-order-user_data).

Note that some fields are optional and included only for orders that set them.

```json
{
  "id": "734235c2-13d2-4574-be68-723e818c08f3",
  "status": 200,
  "result": [
    {
      "symbol": "BTCUSDT",
      "orderId": 12569099453,
      "orderListId": -1,
      "clientOrderId": "4d96324ff9d44481926157",
      "price": "23416.10000000",
      "origQty": "0.00847000",
      "executedQty": "0.00847000",
      "cummulativeQuoteQty": "198.33521500",
      "status": "FILLED",
      "timeInForce": "GTC",
      "type": "LIMIT",
      "side": "SELL",
      "stopPrice": "0.00000000",
      "icebergQty": "0.00000000",
      "time": 1660801715639,
      "updateTime": 1660801717945,
      "isWorking": true,
      "workingTime": 1660801715639,
      "origQuoteOrderQty": "0.00000000",
      "selfTradePreventionMode": "NONE",
      "preventedMatchId": 0, // This field only appears if the order expired due to STP.
      "preventedQuantity": "1.200000" // This field only appears if the order expired due to STP.
    }
  ],
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 20
    }
  ]
}
```

#### Query Order list (USER_DATA)

```json
{
  "id": "b53fd5ff-82c7-4a04-bd64-5f9dc42c2100",
  "method": "orderList.status",
  "params": {
    "origClientOrderId": "08985fedd9ea2cf6b28996",
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "d12f4e8892d46c0ddfbd43d556ff6d818581b3be22a02810c2c20cb719aed6a4",
    "timestamp": 1660801713965
  }
}
```

Check execution status of an Order list.

For execution status of individual orders, use
[`order.status`](/docs/binance-spot-api-docs/websocket-api/account-requests#query-order-user_data).

**Weight:** 4

**Parameters**:

| Name                  | Type     | Mandatory                                                                                  | Description                                                                                      |
| --------------------- | -------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| \-`origClientOrderId` | \-STRING | \-NO\*                                                                                     | \-Query order list by `listClientOrderId`.`orderListId` or `origClientOrderId` must be provided. |
| \-`orderListId`       | \-INT    | \-Query order list by `orderListId`.`orderListId` or `origClientOrderId` must be provided. |
| \-`apiKey`            | \-STRING | \-YES                                                                                      |                                                                                                  |
| \-`recvWindow`        | \-LONG   | \-NO                                                                                       | \-The value cannot be greater than 60000                                                         |
| \-`signature`         | \-STRING | \-YES                                                                                      |                                                                                                  |
| \-`timestamp`         | \-LONG   | \-YES                                                                                      |                                                                                                  |

Notes:

- `origClientOrderId` refers to `listClientOrderId` of the order list itself.
- If both `origClientOrderId` and `orderListId` parameters are specified, only
  `origClientOrderId` is used and `orderListId` is ignored.

**Data Source:** Database

**Response:**

```json
{
  "id": "b53fd5ff-82c7-4a04-bd64-5f9dc42c2100",
  "status": 200,
  "result": {
    "orderListId": 1274512,
    "contingencyType": "OCO",
    "listStatusType": "EXEC_STARTED",
    "listOrderStatus": "EXECUTING",
    "listClientOrderId": "08985fedd9ea2cf6b28996",
    "transactionTime": 1660801713793,
    "symbol": "BTCUSDT",
    "orders": [
      {
        "symbol": "BTCUSDT",
        "orderId": 12569138901,
        "clientOrderId": "BqtFCj5odMoWtSqGk2X9tU"
      },
      {
        "symbol": "BTCUSDT",
        "orderId": 12569138902,
        "clientOrderId": "jLnZpj5enfMXTuhKB1d0us"
      }
    ]
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 4
    }
  ]
}
```

#### Current open Order lists (USER_DATA)

```json
{
  "id": "3a4437e2-41a3-4c19-897c-9cadc5dce8b6",
  "method": "openOrderLists.status",
  "params": {
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "1bea8b157dd78c3da30359bddcd999e4049749fe50b828e620e12f64e8b433c9",
    "timestamp": 1660801713831
  }
}
```

Query execution status of all open order lists.

If you need to continuously monitor order status updates, please consider using
WebSocket Streams:

- [`userDataStream.start`](/docs/binance-spot-api-docs/websocket-api/user-data-stream-requests#user-data-stream-requests)
  request
- [`executionReport`](/docs/binance-spot-api-docs/user-data-stream#order-update)
  user data stream event

**Weight**: 6

**Parameters:**

| Name           | Type     | Mandatory | Description                                |
| -------------- | -------- | --------- | ------------------------------------------ |
| \-`apiKey`     | \-STRING | \-YES     |                                            |
| \-`recvWindow` | \-LONG   | \-NO      | \-The value cannot be greater than `60000` |
| \-`signature`  | \-STRING | \-YES     |                                            |
| \-`timestamp`  | \-LONG   | \-YES     |                                            |

**Data Source:** Database

**Response:**

```json
{
  "id": "3a4437e2-41a3-4c19-897c-9cadc5dce8b6",
  "status": 200,
  "result": [
    {
      "orderListId": 0,
      "contingencyType": "OCO",
      "listStatusType": "EXEC_STARTED",
      "listOrderStatus": "EXECUTING",
      "listClientOrderId": "08985fedd9ea2cf6b28996",
      "transactionTime": 1660801713793,
      "symbol": "BTCUSDT",
      "orders": [
        {
          "symbol": "BTCUSDT",
          "orderId": 4,
          "clientOrderId": "CUhLgTXnX5n2c0gWiLpV4d"
        },
        {
          "symbol": "BTCUSDT",
          "orderId": 5,
          "clientOrderId": "1ZqG7bBuYwaF4SU8CwnwHm"
        }
      ]
    }
  ],
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 6
    }
  ]
}
```

#### Account order list history (USER_DATA)

```json
{
  "id": "8617b7b3-1b3d-4dec-94cd-eefd929b8ceb",
  "method": "allOrderLists",
  "params": {
    "startTime": 1660780800000,
    "endTime": 1660867200000,
    "limit": 5,
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "c8e1484db4a4a02d0e84dfa627eb9b8298f07ebf12fcc4eaf86e4a565b2712c2",
    "timestamp": 1661955123341
  }
}
```

Query information about all your order lists, filtered by time range.

**Weight:** 20

**Parameters:**

| Name           | Type     | Mandatory | Description                                |
| -------------- | -------- | --------- | ------------------------------------------ |
| \-`fromId`     | \-INT    | \-NO      | \-Order list ID to begin at                |
| \-`startTime`  | \-LONG   | \-NO      |                                            |
| \-`endTime`    | \-LONG   | \-NO      |                                            |
| \-`limit`      | \-INT    | \-NO      | \-Default: 500; Maximum: 1000              |
| \-`apiKey`     | \-STRING | \-YES     |                                            |
| \-`recvWindow` | \-LONG   | \-NO      | \-The value cannot be greater than `60000` |
| \-`signature`  | \-STRING | \-YES     |                                            |
| \-`timestamp`  | \-LONG   | \-YES     |                                            |

Notes:

- If `startTime` and/or `endTime` are specified, `fromId` is ignored.

  Order lists are filtered by `transactionTime` of the last order list execution
  status update.

- If `fromId` is specified, return order lists with order list ID >= `fromId`.
- If no condition is specified, the most recent order lists are returned.
- The time between `startTime` and `endTime` can't be longer than 24 hours.

**Data Source:** Database

**Response:**

Status reports for order lists are identical to
[`orderList.status`](/docs/binance-spot-api-docs/websocket-api/account-requests#query-order-list-user_data).

```json
{
  "id": "8617b7b3-1b3d-4dec-94cd-eefd929b8ceb",
  "status": 200,
  "result": [
    {
      "orderListId": 1274512,
      "contingencyType": "OCO",
      "listStatusType": "EXEC_STARTED",
      "listOrderStatus": "EXECUTING",
      "listClientOrderId": "08985fedd9ea2cf6b28996",
      "transactionTime": 1660801713793,
      "symbol": "BTCUSDT",
      "orders": [
        {
          "symbol": "BTCUSDT",
          "orderId": 12569138901,
          "clientOrderId": "BqtFCj5odMoWtSqGk2X9tU"
        },
        {
          "symbol": "BTCUSDT",
          "orderId": 12569138902,
          "clientOrderId": "jLnZpj5enfMXTuhKB1d0us"
        }
      ]
    }
  ],
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 20
    }
  ]
}
```

#### Account trade history (USER_DATA)

```json
{
  "id": "f4ce6a53-a29d-4f70-823b-4ab59391d6e8",
  "method": "myTrades",
  "params": {
    "symbol": "BTCUSDT",
    "startTime": 1660780800000,
    "endTime": 1660867200000,
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "c5a5ffb79fd4f2e10a92f895d488943a57954edf5933bde3338dfb6ea6d6eefc",
    "timestamp": 1661955125250
  }
}
```

Query information about all your trades, filtered by time range.

**Weight:**

| Condition         | Weight |
| ----------------- | ------ |
| \-Without orderId | \-20   |
| \-With orderId    | \-5    |

**Parameters:**

| Name           | Type     | Mandatory | Description                                |
| -------------- | -------- | --------- | ------------------------------------------ |
| \-`symbol`     | \-STRING | \-YES     |                                            |
| \-`orderId`    | \-LONG   | \-NO      |                                            |
| \-`startTime`  | \-LONG   | \-NO      |                                            |
| \-`endTime`    | \-LONG   | \-NO      |                                            |
| \-`fromId`     | \-INT    | \-NO      | \-First trade ID to query                  |
| \-`limit`      | \-INT    | \-NO      | \-Default: 500; Maximum: 1000              |
| \-`apiKey`     | \-STRING | \-YES     |                                            |
| \-`recvWindow` | \-LONG   | \-NO      | \-The value cannot be greater than `60000` |
| \-`signature`  | \-STRING | \-YES     |                                            |
| \-`timestamp`  | \-LONG   | \-YES     |                                            |

Notes:

- If `fromId` is specified, return trades with trade ID >= `fromId`.
- If `startTime` and/or `endTime` are specified, trades are filtered by
  execution time (`time`).

  `fromId` cannot be used together with `startTime` and `endTime`.

- If `orderId` is specified, only trades related to that order are returned.

  `startTime` and `endTime` cannot be used together with `orderId`.

- If no condition is specified, the most recent trades are returned.
- The time between `startTime` and `endTime` can't be longer than 24 hours.

**Data Source:** Memory => Database

**Response:**

```json
{
  "id": "f4ce6a53-a29d-4f70-823b-4ab59391d6e8",
  "status": 200,
  "result": [
    {
      "symbol": "BTCUSDT",
      "id": 1650422481,
      "orderId": 12569099453,
      "orderListId": -1,
      "price": "23416.10000000",
      "qty": "0.00635000",
      "quoteQty": "148.69223500",
      "commission": "0.00000000",
      "commissionAsset": "BNB",
      "time": 1660801715793,
      "isBuyer": false,
      "isMaker": true,
      "isBestMatch": true
    },
    {
      "symbol": "BTCUSDT",
      "id": 1650422482,
      "orderId": 12569099453,
      "orderListId": -1,
      "price": "23416.50000000",
      "qty": "0.00212000",
      "quoteQty": "49.64298000",
      "commission": "0.00000000",
      "commissionAsset": "BNB",
      "time": 1660801715793,
      "isBuyer": false,
      "isMaker": true,
      "isBestMatch": true
    }
  ],
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 20
    }
  ]
}
```

#### Unfilled Order Count (USER_DATA)

```json
{
  "id": "d3783d8d-f8d1-4d2c-b8a0-b7596af5a664",
  "method": "account.rateLimits.orders",
  "params": {
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "76289424d6e288f4dc47d167ac824e859dabf78736f4348abbbac848d719eb94",
    "timestamp": 1660801839500
  }
}
```

Query your current unfilled order count for all intervals.

**Weight:** 40

**Parameters:**

| Name           | Type     | Mandatory | Description                                |
| -------------- | -------- | --------- | ------------------------------------------ |
| \-`apiKey`     | \-STRING | \-YES     |                                            |
| \-`recvWindow` | \-LONG   | \-NO      | \-The value cannot be greater than `60000` |
| \-`signature`  | \-STRING | \-YES     |                                            |
| \-`timestamp`  | \-LONG   | \-YES     |                                            |

**Data Source:** Memory

**Response:**

```json
{
  "id": "d3783d8d-f8d1-4d2c-b8a0-b7596af5a664",
  "status": 200,
  "result": [
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 10,
      "limit": 50,
      "count": 0
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "DAY",
      "intervalNum": 1,
      "limit": 160000,
      "count": 0
    }
  ],
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 40
    }
  ]
}
```

#### Account prevented matches (USER_DATA)

```json
{
  "id": "g4ce6a53-a39d-4f71-823b-4ab5r391d6y8",
  "method": "myPreventedMatches",
  "params": {
    "symbol": "BTCUSDT",
    "orderId": 35,
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "c5a5ffb79fd4f2e10a92f895d488943a57954edf5933bde3338dfb6ea6d6eefc",
    "timestamp": 1673923281052
  }
}
```

Displays the list of orders that were expired due to STP.

These are the combinations supported:

- `symbol` + `preventedMatchId`
- `symbol` + `orderId`
- `symbol` + `orderId` + `fromPreventedMatchId` (`limit` will default to 500)
- `symbol` + `orderId` + `fromPreventedMatchId` + `limit`

**Parameters:**

| Name                   | Type     | Mandatory | Description                                |
| ---------------------- | -------- | --------- | ------------------------------------------ |
| \-symbol               | \-STRING | \-YES     |                                            |
| \-preventedMatchId     | \-LONG   | \-NO      |                                            |
| \-orderId              | \-LONG   | \-NO      |                                            |
| \-fromPreventedMatchId | \-LONG   | \-NO      |                                            |
| \-limit                | \-INT    | \-NO      | \-Default: `500`; Maximum: `1000`          |
| \-recvWindow           | \-LONG   | \-NO      | \-The value cannot be greater than `60000` |
| \-timestamp            | \-LONG   | \-YES     |                                            |

**Weight**

| Case                             | Weight |
| -------------------------------- | ------ |
| \-If `symbol` is invalid         | \-2    |
| \-Querying by `preventedMatchId` | \-2    |
| \-Querying by `orderId`          | \-20   |

**Data Source:**

Database

**Response:**

```json
{
  "id": "g4ce6a53-a39d-4f71-823b-4ab5r391d6y8",
  "status": 200,
  "result": [
    {
      "symbol": "BTCUSDT",
      "preventedMatchId": 1,
      "takerOrderId": 5,
      "makerSymbol": "BTCUSDT",
      "makerOrderId": 3,
      "tradeGroupId": 1,
      "selfTradePreventionMode": "EXPIRE_MAKER",
      "price": "1.100000",
      "makerPreventedQuantity": "1.300000",
      "transactTime": 1669101687094
    }
  ],
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 20
    }
  ]
}
```

#### Account allocations (USER_DATA)

```json
{
  "id": "g4ce6a53-a39d-4f71-823b-4ab5r391d6y8",
  "method": "myAllocations",
  "params": {
    "symbol": "BTCUSDT",
    "orderId": 500,
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "c5a5ffb79fd4f2e10a92f895d488943a57954edf5933bde3338dfb6ea6d6eefc",
    "timestamp": 1673923281052
  }
}
```

Retrieves allocations resulting from SOR order placement.

**Weight:** 20

**Parameters:**

| Name                 | Type     | Mandatory | Description                                |
| -------------------- | -------- | --------- | ------------------------------------------ |
| \-`symbol`           | \-STRING | \-Yes     |                                            |
| \-`startTime`        | \-LONG   | \-No      |                                            |
| \-`endTime`          | \-LONG   | \-No      |                                            |
| \-`fromAllocationId` | \-INT    | \-No      |                                            |
| \-`limit`            | \-INT    | \-No      | \-Default: 500; Maximum: 1000              |
| \-`orderId`          | \-LONG   | \-No      |                                            |
| \-`recvWindow`       | \-LONG   | \-No      | \-The value cannot be greater than `60000` |
| \-`timestamp`        | \-LONG   | \-No      |                                            |

Supported parameter combinations:

| Parameters                                  | Response                                               |
| ------------------------------------------- | ------------------------------------------------------ |
| \-`symbol`                                  | \-allocations from oldest to newest                    |
| \-`symbol` + `startTime`                    | \-oldest allocations since `startTime`                 |
| \-`symbol` + `endTime`                      | \-newest allocations until `endTime`                   |
| \-`symbol` + `startTime` + `endTime`        | \-allocations within the time range                    |
| \-`symbol` + `fromAllocationId`             | \-allocations by allocation ID                         |
| \-`symbol` + `orderId`                      | \-allocations related to an order starting with oldest |
| \-`symbol` + `orderId` + `fromAllocationId` | \-allocations related to an order by allocation ID     |

**Note:** The time between `startTime` and `endTime` can't be longer than 24
hours.

**Data Source:** Database

**Response:**

```json
{
  "id": "g4ce6a53-a39d-4f71-823b-4ab5r391d6y8",
  "status": 200,
  "result": [
    {
      "symbol": "BTCUSDT",
      "allocationId": 0,
      "allocationType": "SOR",
      "orderId": 500,
      "orderListId": -1,
      "price": "1.00000000",
      "qty": "0.10000000",
      "quoteQty": "0.10000000",
      "commission": "0.00000000",
      "commissionAsset": "BTC",
      "time": 1687319487614,
      "isBuyer": false,
      "isMaker": false,
      "isAllocator": false
    }
  ],
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 20
    }
  ]
}
```

#### Account Commission Rates (USER_DATA)

```json
{
  "id": "d3df8a61-98ea-4fe0-8f4e-0fcea5d418b0",
  "method": "account.commission",
  "params": {
    "symbol": "BTCUSDT",
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "c5a5ffb79fd4f2e10a92f895d488943a57954edf5933bde3338dfb6ea6d6eefc",
    "timestamp": 1673923281052
  }
}
```

Get current account commission rates.

**Parameters:**

| Name       | Type     | Mandatory | Description |
| ---------- | -------- | --------- | ----------- |
| \-`symbol` | \-STRING | \-YES     |             |

**Weight:** 20

**Data Source:** Database

**Response:**

```json
{
  "id": "d3df8a61-98ea-4fe0-8f4e-0fcea5d418b0",
  "status": 200,
  "result": {
    "symbol": "BTCUSDT",
    "standardCommission": {
      //Standard commission rates on trades from the order.
      "maker": "0.00000010",
      "taker": "0.00000020",
      "buyer": "0.00000030",
      "seller": "0.00000040"
    },
    "specialCommission": {
      // Special commission rates from the order.
      "maker": "0.01000000",
      "taker": "0.02000000",
      "buyer": "0.03000000",
      "seller": "0.04000000"
    },
    "taxCommission": {
      //Tax commission rates on trades from the order.
      "maker": "0.00000112",
      "taker": "0.00000114",
      "buyer": "0.00000118",
      "seller": "0.00000116"
    },
    "discount": {
      //Discount on standard commissions when paying in BNB.
      "enabledForAccount": true,
      "enabledForSymbol": true,
      "discountAsset": "BNB",
      "discount": "0.75000000" //Standard commission is reduced by this rate when paying commission in BNB.
    }
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 20
    }
  ]
}
```

#### Query Order Amendments (USER_DATA)

```json
{
  "id": "6f5ebe91-01d9-43ac-be99-57cf062e0e30",
  "method": "order.amendments",
  "params": {
    "orderId": "23",
    "recvWindow": 5000,
    "symbol": "BTCUSDT",
    "timestamp": 1741925524887,
    "apiKey": "N3Swv7WaBF7S2rzA12UkPunM3udJiDddbgv1W7CzFGnsQXH9H62zzSCST0CndjeE",
    "signature": "0eed2e9d95b6868ea5ec21da0d14538192ef344c30ecf9fe83d58631699334dc"
  }
}
```

Queries all amendments of a single order.

**Weight**: 4

**Parameters:**

| Name              | Type     | Mandatory | Description                                 |
| ----------------- | -------- | --------- | ------------------------------------------- |
| \-symbol          | \-STRING | \-YES     |                                             |
| \-orderId         | \-LONG   | \-YES     |                                             |
| \-fromExecutionId | \-LONG   | \-NO      |                                             |
| \-limit           | \-INT    | \-NO      | \-Default:500; Maximum: 1000                |
| \-recvWindow      | \-LONG   | \-NO      | \-The value cannot be greater than `60000`. |
| \-timestamp       | \-LONG   | \-YES     |                                             |

**Data Source:** Database

**Response:**

```json
{
  "id": "6f5ebe91-01d9-43ac-be99-57cf062e0e30",
  "status": 200,
  "result": [
    {
      "symbol": "BTCUSDT",
      "orderId": 23,
      "executionId": 60,
      "origClientOrderId": "my_pending_order",
      "newClientOrderId": "xbxXh5SSwaHS7oUEOCI88B",
      "origQty": "7.00000000",
      "newQty": "5.00000000",
      "time": 1741924229819
    }
  ],
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 4
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/account-requests](https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/account-requests)

## User Data Stream requests

#### User Data Stream subscription

**General information:**

- User Data Stream subscriptions allow you to receive all the events related to
  a given account on a WebSocket connection.
- There are 2 ways to start a subscription:
  - If you have an authenticated session, then you can subscribe to events for
    that authenticated account using
    [`userDataStream.subscribe`](/docs/binance-spot-api-docs/websocket-api/user-data-stream-requests#user_data_stream_subscribe).
  - You can additionally open extra subscriptions for any account for which you
    have an API Key, using
    [`userdataStream.subscribe.signature`](/docs/binance-spot-api-docs/websocket-api/user-data-stream-requests#user-data-signature).
  - You can have only one active subscription for a given account on a given
    connection.
- Subscriptions are identified by a `subscriptionId` which is returned when
  starting the subscription. That `subscriptionId` allows you to map the events
  you receive to a given subscription.
  - All active subscriptions for a session can be found using
    [`session.subscriptions`](/docs/binance-spot-api-docs/websocket-api/user-data-stream-requests#session-subscription).
- Limits
  - A single session supports **up to 1,000 active subscriptions**
    simultaneously.
    - Attempting to start a new subscription beyond this limit will result in an
      error.
    - If your accounts are very active, we suggest not opening too many
      subscriptions at once, in order to not overload your connection.
  - A single session can handle a maximum of **65,535 total subscriptions** over
    its lifetime.
    - If this limit is reached, you will receive an error and must re-establish
      a new connection to be able to start new subscriptions.
- To verify the status of User Data Stream subscriptions, check the
  `userDataStream` field in
  [`session.status`](/docs/binance-spot-api-docs/websocket-api/user-data-stream-requests#query-session-status):
  - `null` - User Data Stream subscriptions are **not available** on this
    WebSocket API.
  - `true` - There is at **least one subscription active** in this session.
  - `false` - There are **no active subscriptions** in this session.

##### Subscribe to User Data Stream (USER_STREAM)

```json
{
  "id": "d3df8a21-98ea-4fe0-8f4e-0fcea5d418b7",
  "method": "userDataStream.subscribe"
}
```

Subscribe to the User Data Stream in the current WebSocket connection.

**Notes:**

- This method requires an authenticated WebSocket connection using Ed25519 keys.
  Please refer to
  [`session.logon`](/docs/binance-spot-api-docs/websocket-api/authentication-requests#session-logon).
- To check the subscription status, use
  [`session.status`](/docs/binance-spot-api-docs/websocket-api/authentication-requests#session-status),
  see the `userDataStream` flag indicating you have have an active subscription.
- User Data Stream events are available in both JSON and
  [SBE](/docs/binance-spot-api-docs/faqs/sbe_faq) sessions.
  - Please refer to
    [User Data Streams](/docs/binance-spot-api-docs/user-data-stream) for the
    event format details.
  - For SBE, only SBE schema 2:1 or later is supported.

**Weight**: 2

**Parameters**: NONE

**Response**:

```json
{
  "id": "d3df8a21-98ea-4fe0-8f4e-0fcea5d418b7",
  "status": 200,
  "result": {
    "subscriptionId": 0
  }
}
```

##### Unsubscribe from User Data Stream

```json
{
  "id": "d3df8a21-98ea-4fe0-8f4e-0fcea5d418b7",
  "method": "userDataStream.unsubscribe"
}
```

Stop listening to the User Data Stream in the current WebSocket connection.

Note that `session.logout` will only close the subscription created with
`userdataStream.subscribe` but not subscriptions opened with
`userDataStream.subscribe.signature`.

**Weight**: 2

**Parameters**:

| Name               | Type  | Mandatory | Description                                                                                                                                                                                               |
| ------------------ | ----- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \-`subscriptionId` | \-INT | \-No      | \-When called with no parameter, this will close all subscriptions. When called with the `subscriptionId` parameter, this will attempt to close the subscription with that subscription id, if it exists. |

**Response**:

```json
{
  "id": "d3df8a21-98ea-4fe0-8f4e-0fcea5d418b7",
  "status": 200,
  "result": {}
}
```

##### Listing all subscriptions

```json
{
  "id": "d3df5a22-88ea-4fe0-9f4e-0fcea5d418b7",
  "method": "session.subscriptions",
  "params": {}
}
```

**Note:**

- Users are expected to track on their side which subscription corresponds to
  which account.

**Weight**: 2

**Data Source**: Memory

**Response**:

```json
{
  "id": "d3df5a22-88ea-4fe0-9f4e-0fcea5d418b7",
  "status": 200,
  "result": [
    {
      "subscriptionId": 0
    },
    {
      "subscriptionId": 1
    }
  ]
}
```

##### Subscribe to User Data Stream through signature subscription (USER_DATA)

```json
{
  "id": "d3df8a22-98ea-4fe0-9f4e-0fcea5d418b7",
  "method": "userDataStream.subscribe.signature",
  "params": {
    "apiKey": "mjcKCrJzTU6TChLsnPmgnQJJMR616J4yWvdZWDUeXkk6vL6dLyS7rcVOQlADlVjA",
    "timestamp": 1747385641636,
    "signature": "yN1vWpXb+qoZ3/dGiFs9vmpNdV7e3FxkA+BstzbezDKwObcijvk/CVkWxIwMCtCJbP270R0OempYwEpS6rDZCQ=="
  }
}
```

**Weight:** 2

**Parameters**:

| Name          | Type     | Mandatory | Description |
| ------------- | -------- | --------- | ----------- |
| \-`apiKey`    | \-STRING | \-Yes     |             |
| \-`timestamp` | \-LONG   | \-Yes     |             |
| \-`signature` | \-STRING | \-Yes     |             |

**Data Source:** Memory

**Response:**

```json
{
  "id": "d3df8a22-98ea-4fe0-9f4e-0fcea5d418b7",
  "status": 200,
  "result": {
    "subscriptionId": 0
  }
}
```

#### Listen Key Management (Deprecated)

> \[!IMPORTANT\] These requests have been deprecated, which means we will remove
> them in the future. Please subscribe to the User Data Stream through the
> [WebSocket API](/docs/binance-spot-api-docs/websocket-api/user-data-stream-requests#user_data_stream_subscribe)
> instead.

The following requests manage
[User Data Stream](/docs/binance-spot-api-docs/user-data-stream) subscriptions.

##### Start user data stream (USER_STREAM) (Deprecated)

```json
{
  "id": "d3df8a61-98ea-4fe0-8f4e-0fcea5d418b0",
  "method": "userDataStream.start",
  "params": {
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A"
  }
}
```

Start a new user data stream.

**Note:** the stream will close in 60 minutes unless
[`userDataStream.ping`](/docs/binance-spot-api-docs/websocket-api/user-data-stream-requests#ping-user-data-stream-user_stream)
requests are sent regularly.

**Weight:** 2

**Parameters:**

| Name       | Type     | Mandatory | Description |
| ---------- | -------- | --------- | ----------- |
| \-`apiKey` | \-STRING | \-YES     |             |

**Data Source:** Memory

**Response:**

Subscribe to the received listen key on WebSocket Stream afterwards.

```json
{
  "id": "d3df8a61-98ea-4fe0-8f4e-0fcea5d418b0",
  "status": 200,
  "result": {
    "listenKey": "xs0mRXdAKlIPDRFrlPcw0qI41Eh3ixNntmymGyhrhgqo7L6FuLaWArTD7RLP"
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 2
    }
  ]
}
```

##### Ping user data stream (USER_STREAM) (Deprecated)

```json
{
  "id": "815d5fce-0880-4287-a567-80badf004c74",
  "method": "userDataStream.ping",
  "params": {
    "listenKey": "xs0mRXdAKlIPDRFrlPcw0qI41Eh3ixNntmymGyhrhgqo7L6FuLaWArTD7RLP",
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A"
  }
}
```

Ping a user data stream to keep it alive.

User data streams close automatically after 60 minutes, even if you're listening
to them on WebSocket Streams. In order to keep the stream open, you have to
regularly send pings using the `userDataStream.ping` request.

It is recommended to send a ping once every 30 minutes.

**Weight:** 2

**Parameters:**

| Name          | Type     | Mandatory | Description |
| ------------- | -------- | --------- | ----------- |
| \-`listenKey` | \-STRING | \-YES     |             |
| \-`apiKey`    | \-STRING | \-YES     |             |

**Data Source:** Memory

**Response:**

```json
{
  "id": "815d5fce-0880-4287-a567-80badf004c74",
  "status": 200,
  "response": {},
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 2
    }
  ]
}
```

##### Stop user data stream (USER_STREAM) (Deprecated)

```json
{
  "id": "819e1b1b-8c06-485b-a13e-131326c69599",
  "method": "userDataStream.stop",
  "params": {
    "listenKey": "xs0mRXdAKlIPDRFrlPcw0qI41Eh3ixNntmymGyhrhgqo7L6FuLaWArTD7RLP",
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A"
  }
}
```

Explicitly stop and close the user data stream.

**Weight:** 2

**Parameters:**

| Name          | Type     | Mandatory | Description |
| ------------- | -------- | --------- | ----------- |
| \-`listenKey` | \-STRING | \-YES     |             |
| \-`apiKey`    | \-STRING | \-YES     |             |

**Data Source:** Memory

**Response:**

```json
{
  "id": "819e1b1b-8c06-485b-a13e-131326c69599",
  "status": 200,
  "response": {},
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 6000,
      "count": 2
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/user-data-stream-requests](https://developers.binance.com/docs/binance-spot-api-docs/websocket-api/user-data-stream-requests)
