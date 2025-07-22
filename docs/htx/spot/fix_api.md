# HTX Spot FIX API Documentation

## FIX API

### Introduction

This API can only be used with the SPOT Exchange.

**Access URLs**

Order access URL:
`tcp+tls://`[`fix-order.huobi.pro`](http://fix-oe.binance.com)`: 9000 `

`Feature: `Place and cancel your orders.

Market access URL:
`tcp+tls://`[`fix-market.huobi.pro`](http://fix-oe.binance.com)`: 9000 `

`Feature: `Send push notifications of market movements.

**Connection Limits**

A maximum of 200 messages per second can be sent to the exchange per connection.
It is the same as orders. Upon breaching the limit, a Reject `<3>` message will
be sent.

A maximum of 10 TCP connections per account is allowed. Exceeding this limit
will result in a Logout `<5>` message being sent, followed by a disconnection.

**Response Mode**

FIX API allows multiple concurrent sessions for a single account.By default, all
sessions receive all of the account's successful ExecutionReport`<8>` messages.
These messages include responses from other FIX sessions as well as non-FIX API
orders.

**Header**

Appears at the beginning of every message.

| Tag | Name         | Type         | Required | Description                                                                                           |
| --- | ------------ | ------------ | -------- | ----------------------------------------------------------------------------------------------------- |
| 8   | BeginString  | String       | Y        | Always FIX.4.4 Must be the first field in the message.                                                |
| 9   | BodyLength   | Int          | Y        | Message length in bytes. Must be the second field in the message.                                     |
| 35  | MsgType      | String       | Y        | Must be the third field in the message.                                                               |
| 49  | SenderCompID | String       | Y        | Must be a unique mark with an alphanumeric combination of 10-32 characters. Your UUID is recommended. |
| 56  | TargetCompID | String       | Y        | On messages from client required to be set to "spot."                                                 |
| 34  | MsgSeqNum    | Int          | Y        | Integer message sequence number.Values that will cause a gap will be rejected.                        |
| 52  | SendingTime  | UTCTimestamp | Y        | Time of message transmission always expressed in UTC (YYYYMMDD-HH:MM:SS.sss).                         |

**Trailer**

Appears at the end of every message.

| Tag | Name     | Type   | Required | Description |
| --- | -------- | ------ | -------- | ----------- |
| 10  | CheckSum | String | Y        |             |

### Administrative Messages

#### Heartbeat <0>

Sent by the server if there is no outgoing traffic during the heartbeat interval
(`<A>HeartBtInt (108)` in Logon).

Sent by the client to indicate that the session is healthy.

Sent by the client or the server in response to a TestRequest`<1>` message.

| Tag | Name      | Type   | Required | Description                                                                                                  |
| --- | --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------ |
| 112 | TestReqID | String | N        | When a Heartbeat <35> is sent as a response to TestRequest <1>, it must mirror the value in TestRequest <1>. |

#### TestRequest <1>

Sent by the server if there is no incoming traffic during the heartbeat interval
(`<A>HeartBtInt (108)` in Logon).

Sent by the client to request a Heartbeat`<0>` response.

**Note:** If the client does not respond to TestRequest`<1>` with Heartbeat`<0>`
with a correct `TestReqID (112)` within timeout, the connection will be dropped.

| Tag | Name      | Type   | Required | Description                                                          |
| --- | --------- | ------ | -------- | -------------------------------------------------------------------- |
| 112 | TestReqID | String | Y        | Arbitrary string that must be included in the Heartbeat<0> response. |

#### Reject <3>

Sent by the server in response to an invalid message that cannot be processed.
Client messages containing syntax errors, missing required fields, or
referencing unknown trading pairs will be rejected by the server.

| Tag | Name                | Type   | Required | Description                                                                                     |
| --- | ------------------- | ------ | -------- | ----------------------------------------------------------------------------------------------- |
| 45  | RefSeqNum           | Int    | N        | The MsgSeqNum (34) of the rejected message that caused issuance of this Reject<3>.              |
| 371 | RefTagID            | Int    | N        | When present, identifies the field that directly caused the issuance of this Reject<3> message. |
| 372 | RefMsgType          | String | N        | The MsgType (35) of the rejected message that caused issuance of this Reject<3>.                |
| 373 | SessionRejectReason | String | N        | A reason for the rejection.                                                                     |
| 58  | Text                | String | N        | Human-readable error message.                                                                   |

#### Logon <A>

Sent by the client to authenticate the connection.Logon`<A>` must be the first
message sent by the client.

Sent by the server in response to a successful logon. Or a Logout<5> message
will be sent, followed by disconnection.

Note: Logon`<A>` can only be sent once for the entirety of the session.
MsgSeqNum must be 1.

| Tag | Name            | Type    | Required | Description                                                                                                                                           |
| --- | --------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 98  | EncryptMethod   | Int     | Y        | 0                                                                                                                                                     |
| 108 | HeartBtInt      | Int     | Y        | Required to be within range \[5, 30\]. Heartbeat interval in seconds.                                                                                 |
| 95  | RawDataLength   | Int     | Y        | Length of the RawData (96) field that comes strictly after this field.                                                                                |
| 96  | RawData         | String  | Y        | Signature.Sign the payload using your private key. Encode the signature with base64.The resulting text string is the value of the RawData (96) field. |
| 141 | ResetSeqNumFlag | Boolean | Y        | Required to be Y.                                                                                                                                     |
| 553 | Username        | String  | Y        | API key. Only Ed25519 API keys are supported.                                                                                                         |

Validate payload ( | SOH character ASCII value (0x01)):

SenderCompId (49) |TargetCompId (56) | MsgSeqNum (34) | SendingTime (52) |

```java
public static String sign25519(
  String SenderCompId,
  String TargetCompId,
  String MsgSeqNum,
  String SendingTime,
  String secretKey
) {
  StringBuilder sb = new StringBuilder(1024);
  sb.append(SenderCompId).append('\u0001');
  sb.append(TargetCompId).append('\u0001');
  sb.append(MsgSeqNum).append('\u0001');
  sb.append(SendingTime).append('\u0001');
  byte[] dataBytes = sb.toString().getBytes(StandardCharsets.UTF_8);
  Ed25519PrivateKeyParameters privateKey = null;
  try {
    privateKey = (Ed25519PrivateKeyParameters) PrivateKeyFactory.createKey(
      Base64.getDecoder().decode(secretKey)
    );
  } catch (IOException e) {
    throw new RuntimeException(e);
  }
  Ed25519Signer signer = new Ed25519Signer();
  signer.init(true, privateKey);
  signer.update(dataBytes, 0, dataBytes.length);
  byte[] signatureBytes = signer.generateSignature();
  String actualSign = Base64.getEncoder().encodeToString(signatureBytes);
  return actualSign;
}
```

#### Logout <5>

Sent by the server to initiate the process of closing the connection.

| Tag | Name | Type   | Required | Description |
| --- | ---- | ------ | -------- | ----------- |
| 58  | Text | String | N        |             |

## Order Entry Messages

### NewOrderSingle

Sent by the client to submit a new order for execution.

| Tag  | Name                  | Type    | Required | REST API Field     | Description                                                                                                                                                                                                                                                                              |
| ---- | --------------------- | ------- | -------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 11   | ClOrdID               | String  | Y        | client-order-id    | ClOrdID to be assigned to the order.                                                                                                                                                                                                                                                     |
| 1    | account               | String  | Y        | account-id         |                                                                                                                                                                                                                                                                                          |
| 38   | OrderQty              | Decimal | N        | amount             | Quantity of the orders                                                                                                                                                                                                                                                                   |
| 40   | OrdType               | String  | Y        | type               | Supported order types and the required fields to use them. It has the same meaning as OrdType. 1. buy-market 2. sell-market 3. buy-limit ...                                                                                                                                             |
| 55   | Symbol                | String  | Y        | Symbol             | Symbol to place the order on.                                                                                                                                                                                                                                                            |
| 44   | Price                 | Decimal | N        | price              | Price of the order                                                                                                                                                                                                                                                                       |
| 152  | CashOrderQty          | Decimal | N        | marketAmount       | Market order quantity                                                                                                                                                                                                                                                                    |
| 578  | TradeInputSource      | String  | Y        | source             | Input “spot-api” for spot trading                                                                                                                                                                                                                                                        |
| 2362 | SelfMatchPreventionID | Int     | N        | self-match-prevent | Self-trading: 0 indicates self-trading is allowed; 1 indicates self-trading is not allowed.                                                                                                                                                                                              |
| 111  | MaxFloor              | String  | N        | ice-amount         | Required by iceberg orders                                                                                                                                                                                                                                                               |
| 99   | StopPx                | Decimal | N        | stop-price         | Trigger price for a TP/SL order                                                                                                                                                                                                                                                          |
| 1109 | TriggerPriceDirection | String  | N        | operator           | Trigger price for a TP/SL order. Possible values: U: Trigger if market price goes UP to or through StopPx (default if StopPx is greater than current market price)  >=D: Trigger if market price goes DOWN to or through StopPx (default if StopPx is less than current market price) <= |

### ExecutionReport <8>

Sent by the server whenever an order state changes. It is the same as order and
settlement fee push.

**Note:**

·       Asset push notifications are sent at the user level. That is, they
monitor matching results.

- By default, ExecutionReport`<8>` is sent for all orders of an account,
  including those submitted in different connections.

| Tag    | Name               | Type         | API Field         | Required | Description                                                                                                                                          |
| ------ | ------------------ | ------------ | ----------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 11     | ClOrdID            | String       | client-order-id   | N        | ClOrdID of the list as assigned on the request.                                                                                                      |
| 37     | OrderID            | String       | orderId           | N        | Assigned by exchange.                                                                                                                                |
| 38     | OrderQty           | Decimal      | amount、orderSize | N        | Quantity of the orders                                                                                                                               |
| 40     | OrdType            | String       | type              | Y        | Possible values the same as NewOrderSingle: OrdType                                                                                                  |
| 55     | Symbol             | String       | Symbol            | Y        | Symbol of the order                                                                                                                                  |
| 54     | Side               | String       | orderSide         | N        | Order side: 1 - BUY 2 - SELL                                                                                                                         |
| 150    | ExecType           | String       | eventType         | N        | Event type with possible values: creation (Order creation) trade (Order execution) cancellation (Order cancellation) clearing (Trading fee) rejected |
| 60     | TransactTime       | UTCTimestamp | lastActTime       | N        | Timestamp of the eventTime of successful matching                                                                                                    |
| 39     | OrdStatus          | String       | orderStatus       | Y        | Order status: 1: rejected; 2: canceled; 3: submitted; 4: partial-filled; 5: filled; 6: partial-canceled; 7: canceled                                 |
| 1      | account            | String       | accountId         | N        | Account ID                                                                                                                                           |
| 578    | TradeInputSource   | String       | orderSource       | N        |                                                                                                                                                      |
| 42     | OrigTime           | UTCTIMESTAMP | orderCreateTime   | N        | Order creation time                                                                                                                                  |
| 44     | Price              | Decimal      | price、orderPrice | N        | Price of the order                                                                                                                                   |
| 103    | OrdRejReason       | String       | errCode           | N        | Error of order trigger failure                                                                                                                       |
| 58     | Text               | String       | errMessage        | N        | Error message for order trigger failure                                                                                                              |
| 119    | SettlCurrAmt       | Decimal      | orderValue        | N        | Order amount (only for market buy orders)                                                                                                            |
| 1003   | TradeID            | String       | tradeId           | N        | Trade ID                                                                                                                                             |
| 31     | LastPx             | Decimal      | tradePrice        | N        | Execution price                                                                                                                                      |
| 32     | LastQty            | String       | tradeVolume       | N        | Trading volume                                                                                                                                       |
| 1057   | AggressorIndicator | Boolean      | aggressor         | N        | Indicates whether the order was a taker in the trade. Possible values: true (taker), false (maker)                                                   |
| 151    | LeavesQty          | Decimal      | remainAmt         | N        | Quantity remaining for further execution. (Market buy orders: Value remaining for further execution.)                                                |
| 14     | CumQty             | Decimal      | execAmt           | N        | Executed quantity of the order. (Market buy orders: Executed value)                                                                                  |
| 136    | NoMiscFees         | Int          |                   | N        | Number of repeating groups of miscellaneous fees.                                                                                                    |
| \=>137 | MiscFeeAmt         | Decimal      | transactFee       | Y        | Amount of fees denominated in MiscFeeCurr(138) asset                                                                                                 |
| \=>138 | MiscFeeCurr        | String       | feeCurrency       | Y        | Currency of miscellaneous fee.                                                                                                                       |
| \=>139 | MiscFeeType        | Int          |                   | Y        | Possible values: 4 - EXCHANGE_FEES                                                                                                                   |

### OrderCancelRequest

Sent by the client to cancel an order.

- To cancel an order either `OrderID (11) `or
  `OrigClOrdID      (11) is required. Prioritize OrderID` if both of them are
  required.

| Tag | Name        | Type   | Required | Description                         |
| --- | ----------- | ------ | -------- | ----------------------------------- |
| 11  | ClOrdID     | String | Y        | Request ID                          |
| 41  | OrigClOrdID | String | N        | client id of the order to cancel    |
| 37  | OrderID     | String | N        | OrderID (37) of the order to cancel |

**Response:**

- ExecutionReport`<8> with ExecType (150)` value cancellation for the canceled
  order.
- OrderCancelReject`<9>` if the cancel request is rejected.
- Reject`<3>` if the message is rejected.

### OrderCancelReject

Sent by the server when OrderCancelRequest`<F>` has failed.

| Tag | Name         | Type   | Required | Description                           |
| --- | ------------ | ------ | -------- | ------------------------------------- |
| 11  | ClOrdID      | String | Y        | ClOrdID (11) of the cancel request    |
| 41  | OrigClOrdID  | String | N        | client id of the order to be canceled |
| 37  | OrderID      | Int    | N        | OrderID (37) from the cancel request  |
| 102 | CxlRejReason | Int    | Y        | Error code                            |
| 58  | Text         | String | Y        | Human-readable error message          |

### OrderMassCancelRequest

Sent by the client to cancel all open orders on a symbol.

**\[!NOTE\]** All orders of the account will be canceled, including those placed
in different connections.

2\. Symbol will be ignored when MassCancelRequestType =1; Symbol is a must when
MassCancelRequestType =2.

| Tag   | Name                  | Type   | Required | Description                                                         |
| ----- | --------------------- | ------ | -------- | ------------------------------------------------------------------- |
| 11    | ClOrdID               | String | Y        | ClOrdId of this mass cancel request                                 |
| 530   | MassCancelRequestType | Int    | Y        | 1 - Cancel all orders ·2 - Cancel the orders of the specific symbol |
| 146   | NoRelatedSym          | Int    | N        | How many symbols with orders canceled                               |
| \=>55 | Symbol                | String | N        | Symbol with orders canceled                                         |

**Response:**

- ExecutionReport`<8>` for the every order canceled.
- OrderMassCancelReport`<r>` indicating whether the request is accepted or
  rejected.
- Reject`<3>` if the message is rejected.

### OrderMassCancelReport

Sent by the server in response to OrderMassCancelRequest`<q>`.

| Tag | Name                | Type   | Required | Description                        |
| --- | ------------------- | ------ | -------- | ---------------------------------- |
| 11  | ClOrdID             | String | Y        | ClOrdID (11) of the cancel request |
| 531 | MassCancelResponse  | String | Y        | 0:reject 1:accept request          |
| 58  | Text                | String | N        | Human-readable error message       |
| 533 | TotalAffectedOrders | Int    | N        | How many orders were canceled.     |
| 534 | NoAffectedOrders    | Int    | N        | How many orders were not canceled. |

### NewOrderList

Sent by the client to submit a list of orders for execution.

| 73  | NoOrders                       | Int | Y   | The length of the array for Orders. Up to 20 allowed. |
| --- | ------------------------------ | --- | --- | ----------------------------------------------------- |
|     | Also applies to newSingleOrder |     |     |                                                       |

**Response**

- ExecutionReport`<8>` for the every order executed.
- Reject`<3>` if the message is rejected.

## Market Data Messages

### Market Data Request

Sent by the client to subscribe to or unsubscribe from market data stream. After
subscribing, continuous Market Data Snapshot Full Refreshes and continuous trade
data Market Data Incremental Refreshes will be received.

\[!NOTE\] Sending subsequent market data request invalidates previous
subscriptions.

| Tag   | Name                    | Type   | Required | Description                                                          |
| ----- | ----------------------- | ------ | -------- | -------------------------------------------------------------------- |
| 262   | MDReqID                 | String | Y        | Client ID for the market data request                                |
| 263   | SubscriptionRequestType | Int    | Y        | 0 - Subscribe 2 - Unsubscribe                                        |
| 264   | MarketDepth             | Int    | Y        | Snapshot of order book depth Valid values: 1, 20, and 150            |
| 146   | NoRelatedSym            | Int    | Y        | How many symbols are in the request. Max value: 50                   |
| \=>55 | Symbol                  | String | Y        | Repeating group of symbols for which the client requests market data |

**Response**

·       Market Data Incremental Refresh (X) and Market Data Snapshot Full
Refresh (W) if the request is accepted.

- Market Data Request Reject`<Y>` if the message is rejected.

### Market Data Request Reject

Sent by the server. Response: Market Data Request (V) if it is rejected.

| Tag | Name           | Type   | Required | Description                                        |
| --- | -------------- | ------ | -------- | -------------------------------------------------- |
| 262 | MDReqID        | String | Y        | Client ID for the market data request              |
| 281 | MDReqRejReason | Char   | Y        | 0 - Unknown symbol 1 - Duplicate MDReqID 7 - Other |
| 58  | Text           | String | N        | Human-readable error message                       |

### Market Data Snapshot Full Refresh

Sent by the server. It indicates mbp.

| Tag    | Name        | Type    | Field  | Required | Description                                                           |
| ------ | ----------- | ------- | ------ | -------- | --------------------------------------------------------------------- |
| 262    | MDReqID     | String  |        | Y        | Client ID for the market data request. Always 1                       |
| 83     | RptSeq      | String  | seqNum | Y        | Public sequence number for the final update in the snapshot by symbol |
| 55     | Symbol      | String  | Symbol | Y        | Repeating group of symbols for which the client requests market data  |
| 268    | NoMDEntries | Int     |        | Y        | Number of orders to be added to the book in this snapshot message     |
| \=>269 | MDEntryType | Char    |        | Y        | 0 - Bid 1 - Offer                                                     |
| \=>270 | MDEntryPx   | Decimal | price  | Y        | Price of the Market Data Entry.                                       |
| \=>271 | MDEntrySize | Decimal | size   | Y        | Quantity or volume represented by the Market Data Entry               |

### Market Data Incremental Refresh

Sent by the server. It indicates execution data.

| Tag    | Name           | Type         | Field     | Required | Description                                                                 |
| ------ | -------------- | ------------ | --------- | -------- | --------------------------------------------------------------------------- |
| 262    | MDReqID        | String       |           | Y        | Client ID for the market data request. Always 1                             |
| 268    | NoMDEntries    | Int          |           | Y        |                                                                             |
| \=>269 | MDEntryType    | Char         |           | Y        | 2 - Trade                                                                   |
| \=>279 | MDUpdateAction | Int          |           | Y        | Type of Market Data update action. Valid values: 0 – New                    |
| \=>55  | Symbol         | String       | Symbol    | Y        | Symbol                                                                      |
| \=>278 | MDEntryID      | String       | tradeId   | Y        |                                                                             |
| \=>270 | MDEntryPx      | Decimal      | price     | Y        | Price of trade                                                              |
| \=>271 | MDEntrySize    | Decimal      | amount    | Y        | Quantity or volume represented by the Market Data Entry / Quantity of trade |
| \=>60  | TransactTime   | UTCTimestamp | ts        | Y        | The engine timestamp of the order in microseconds                           |
| \=>54  | Side           | Int          | direction | Y        | 1 - BUY 2 - SELL                                                            |
