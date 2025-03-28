

# DOCS/FIX-CONNECTIVITY

# Exchange FIX API Connectivity

[Financial Information eXchange](http://en.wikipedia.org/wiki/Financial_Information_eXchange), or FIX, is a standard protocol which can be used to enter orders, submit cancel requests, and receive fills. FIX API users typically have existing software that runs FIX for order management.

The baseline specification for the Exchange FIX API is mixed:

- Order Entry: [FIX 4.2 SP2](https://www.onixs.biz/fix-dictionary/4.2/index.html)
- Market Data: [FIX 5.0 SP2](https://www.onixs.biz/fix-dictionary/5.0/index.html)



FIX5 Resets Saturdays at 1PM ET

FIX5 Order Entry and Market Data customers will be logged out every Saturday at 1PM ET (6PM UTC).



Info

Changes are deployed every Monday and Thursday at or near `2PM EST (7PM UTC)`. At that time, a **logout** message is sent from the server to indicate the session is ending. We do not deploy on US federal holidays.

## Supported Endpoints [](https://docs.cdp.coinbase.com/exchange/docs/fix-connectivity\#supported-endpoints "Direct link to Supported Endpoints")



Info

**Production**

Order Entry (FIX42): `tcp+ssl://fix.exchange.coinbase.com:4198 `

Order Entry (FIX50): `tcp+ssl://fix-ord.exchange.coinbase.com:6121 `

Market Data (FIX50): `tcp+ssl://fix-md.exchange.coinbase.com:6121 `

**Sandbox**

Order Entry (FIX42): `tcp+ssl://fix-public.sandbox.exchange.coinbase.com:4198 `

Order Entry (FIX50): `tcp+ssl://fix-ord.sandbox.exchange.coinbase.com:6121 `

Market Data (FIX50): `tcp+ssl://fix-md.sandbox.exchange.coinbase.com:6121 `



Resend Requests

Resend requests are not supported. Every connection establishes a new session and a new set of session sequence numbers.

## FIX Gateway [](https://docs.cdp.coinbase.com/exchange/docs/fix-connectivity\#fix-gateway "Direct link to FIX Gateway")

Before logging onto a FIX session, clients must establish a secure connection to the FIX gateway. See the [available endpoints](https://docs.cdp.coinbase.com/exchange/docs/fix-connectivity#supported-endpoints) above.

**TCP SSL**

If your FIX implementation does not support establishing a **native TCP SSL connection**, you must setup a local proxy such as [stunnel](https://www.stunnel.org/) to establish a secure connection to the FIX gateway.

**Static IP**

Coinbase Exchange **does not** support static IP addresses. If your firewall rules require a static IP address, you must create a TCP proxy server with a static IP address which is capable of resolving an IP address using DNS.

**AWS IP**

If connecting from servers **outside of AWS** which require firewall rules, use the [AWS provided resources](https://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html) to determine how best to whitelist AWS IP ranges.



Info

Changes are deployed every Monday and Thursday at or near `2PM EST (7PM UTC)`. At that time, a **logout** message is sent from the server to indicate the session is ending. We do not deploy on US federal holidays.

## Ciphers [](https://docs.cdp.coinbase.com/exchange/docs/fix-connectivity\#ciphers "Direct link to Ciphers")

Coinbase Exchange supports **TLSv1.2** with the following server ciphers:

| Recommend | Length | Cipher Suite | Elliptic Curve |
| --- | --- | --- | --- |
| Preferred | 128 bits | ECDHE-RSA-AES128-GCM-SHA256 | Curve P-256 DHE 256 |
| Accepted | 128 bits | ECDHE-RSA-AES128-SHA256 | Curve P-256 DHE 256 |
| Accepted | 256 bits | ECDHE-RSA-AES256-GCM-SHA384 | Curve P-256 DHE 256 |
| Accepted | 256 bits | ECDHE-RSA-AES256-SHA384 | Curve P-256 DHE 256 |

## SSL Tunnels [](https://docs.cdp.coinbase.com/exchange/docs/fix-connectivity\#ssl-tunnels "Direct link to SSL Tunnels")

[Exchange FIX API endpoints](https://docs.cdp.coinbase.com/exchange/docs/fix-connectivity#supported-endpoints) only accept TCP connections secured by SSL. If your FIX client library cannot establish an SSL connection natively, you must run a local proxy that establishes a secure connection and allows unencrypted local connections.

Last updated on **Dec 10, 2024**

# DOCS/FIX-MSG-MARKET-DATA

# Exchange FIX Market Data Messages 5.0

The FIX market data API provides an L3 feed only with direct, low-latency, deterministic access.

About this API:

- **Baseline**: [FIX 5.0 SP2 specification](https://www.onixs.biz/fix-dictionary/5.0.sp2/index.html).
- **Environments**: Production, Sandbox



Environment URLs

- Production Snapshot Enabled Gateway: `tcp+ssl://fix-md.exchange.coinbase.com:6121 `
- Production Snapshot Disabled Gateway: `tcp+ssl://fix-md.exchange.coinbase.com:6122 `
- Sandbox Snapshot Enabled Gateway: `tcp+ssl://fix-md.sandbox.exchange.coinbase.com:6121 `
- Sandbox Snapshot Disabled Gateway: `tcp+ssl://fix-md.sandbox.exchange.coinbase.com:6122`

You can connect with the same authentication as our existing FIX order entry system. Connectivity is limited to a single connection per API key—Order Entry [rate limits](https://docs.cdp.coinbase.com/exchange/docs/fix-rate-limits) _do not apply_ (connections, rps, burst rps).



FIX5 Resets Saturdays at 1PM ET

FIX5 Order Entry and Market Data customers will be logged out every Saturday at 1PM ET (6PM UTC).

## Header [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-market-data\#header "Direct link to Header")

A standard header must be present at the start of every message in both directions.

| Tag | FieldName | Type | Required | Notes |
| --- | --- | --- | --- | --- |
| 8 | BeginString | String | Y | Must be `FIXT.1.1` |
| 49 | SenderCompID | String | Y | Client API key (on messages from the client) |
| 56 | TargetCompID | String | Y | Must be `Coinbase` (on messages from client) |
| 52 | SendingTime | UTCTimestamp | Y | UTC time down to millisecond resolution in the format `YYYYMMDD-HH:MM:SS.sss` |

## Logon (35=A) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-market-data\#logon-35a "Direct link to Logon (35=A)")

| Tag | FieldName | Type | Required | Notes |
| --- | --- | --- | --- | --- |
| 34 | MsgSeqNum | Int | Y | Must be `1` |
| 98 | EncryptMethod | Int | Y | Must be `0` (None) |
| 108 | HeartBtInt | Int | Y | Heartbeat interval is capped at 300s, defaults to 10s |
| 141 | ResetSeqNumFlag | Boolean | Y | Resets the sequence number. Can be `Y`/ `N` |
| 553 | Username | String | Y | Client API Key |
| 554 | Password | String | Y | Client API passphrase |
| 95 | RawDataLength | Int | Y | Number of bytes in RawData field |
| 96 | RawData | String | Y | [Client message signature](https://docs.cdp.coinbase.com/exchange/docs/rest-auth#signing-a-message) |
| 1137 | DefaultApplVerID | String | Y | Must be `9` (FIX 5.0 SP2) |

## Market Data Request (35=V) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-market-data\#market-data-request-35v "Direct link to Market Data Request (35=V)")

Clients should use this message to subscribe to or unsubscribe from market data for one or more symbols.

| Tag | FieldName | Type | Required | Notes |
| --- | --- | --- | --- | --- |
| 262 | MDReqID | String | Y | Client identifier for the market data request |
| 263 | SubscriptionRequestType | Int | Y | 1=Subscribe<br>2=Unsubscribe |
| 146 | NoRelatedSym | Int | Y | How many symbols are in the request |
| =>55 | Symbol | String | Y | Repeating group of symbols for which the client requests market data |

#### Market Data Request Reject (35=Y) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-market-data\#market-data-request-reject-35y "Direct link to Market Data Request Reject (35=Y)")

This message is sent to clients to reject an invalid market data request.

| Tag | FieldName | Type | Required | Notes |
| --- | --- | --- | --- | --- |
| 262 | MDReqID | String | Y | Client identifier for the market data request |
| 281 | MDReqRejReason | Char | Y | 0=Unknown symbol<br>1=Duplicate MDReqID<br>7=Other |
| 58 | Text | String | N | Error description |

## Security Status (35=f) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-market-data\#security-status-35f "Direct link to Security Status (35=f)")

This message is streamed to clients together with the incremental updates for subscribed symbols and reflects changes in the trading status, tick size, or other attributes of an instrument.

| Tag | FieldName | Type | Required | Notes |
| --- | --- | --- | --- | --- |
| 262 | MDReqID | String | Y | Client identifier for the market data request |
| 83 | RptSeq | Long | Y | Public sequence number by symbol |
| 55 | Symbol | String | Y | Repeating group of symbols for which the client requests market data |
| 1682 | MDSecurityTradingStatus | String | Y | `trading_disabled`<br>`cancel_only`<br>`post_only`<br>`limit_only`<br>`full_trading`<br>`auction_mode` |
| 969 | MinPriceIncrement | Decimal | Y | Minimum increment for quote currency (e.g., 0.01 USD for BTC-USD) |
| 29003 | MinSizeIncrement | Decimal | Y | Minimum increment for base currency (e.g., 0.00000001 BTC for BTC-USD) |

## Market Data Incremental Refresh (35=X) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-market-data\#market-data-incremental-refresh-35x "Direct link to Market Data Incremental Refresh (35=X)")

Coinbase Exchange sends L3 order-by-order updates so clients can build a full book of all open orders, plus acknowledgements of orders by the matching engine with the order’s client order ID (ClOrdID) before matching. This helps clients immediately identify which orders and trades in the book (both aggressive and passive) are theirs, as well gain advance knowledge of orders that are pending processing by the matching engine. These acks correspond to the `Received` message in the web-socket feed.

- When `MDEntryID` is not present, the message is the acknowledgement of an order prior to matching.
- When `MDEntryID` is present, the message should be used for book-building. You can ignore Change messages with an MDEntryID for which you never received a New message.



Info

When book-building, Change messages received before a corresponding New message can be ignored. Users may occasionally receive Change messages with `MDUpdateAction=1` and an MDEntryID with `Text=CHANGE_REASON_STP` when the quantity on the original received order was reduced due to Self-trade Prevention (prior to the order being placed on the order book).



Info

To maintain an up-to-date L3 order book when subscribing to the Snapshot Disabled Gateway:

1. Send a `SubscriptionRequestType=1` Market Data Request (35=V) message for the product(s) of interest.
2. Queue any Market Data Incremental Refresh (35=X) messages received over the FIX session.
3. Make a [REST request](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductbook#levels) for the order book snapshot from the REST API.
4. Playback queued messages, discarding sequence numbers before or equal to the snapshot sequence number.
5. Apply playback messages to the snapshot as needed.
6. After playback is complete, apply real-time Market Data Incremental Refresh (35=X) messages as they arrive.

| Tag | FieldName | Type | Required | Notes |
| --- | --- | --- | --- | --- |
| 262 | MDReqID | String | Y | Client identifier for the market data request |
| 268 | NoMDEntries | Int | Y | Always `1` |
| =>279 | MDUpdateAction | Char | Y | 0=New<br>1=Change<br>2=Delete |
| =>269 | MDEntryType | Char | Y | 0=Bid<br>1=Offer<br>2=Trade |
| =>278 | MDEntryID | String | N | If present, this ID is the order ID that should be used for book-building<br>If not present, this message is the initial ack and should not be used to build the book |
| =>83 | RptSeq | Long | Y | Public sequence number by symbol |
| =>55 | Symbol | String | Y | Repeating group of symbols for which the client requests market data |
| =>270 | MDEntryPx | Decimal | Y | The price of the order |
| =>271 | MDEntrySize | Decimal | Y | The quantity remaining of the order |
| =>60 | TransactTime | UTCTimestamp | Y | The engine timestamp of the order in microseconds |
| =>40 | OrdType | Char | N | Sent only if the message represents the initial ack of an order:<br>1=Market<br>2=Limit |
| =>11 | ClOrdID | String | N | The client order ID on the initial ack of an order |
| =>37 | OrderID | String | N | The exchange order ID on the initial ack of an order<br>OR<br>If MDEntryType=2, then this is the aggressive Order ID |
| =>58 | Text | String | N | If MDUpdateAction=1, then the possible values are:<br>`CHANGE_REASON_STP`<br>`CHANGE_REASON_MODIFY_ORDER`<br>`CHANGE_REASON_REMAINDER_AFTER_MODIFICATION`<br>If MDUpdateAction=2, then the possible values are:<br>`CANCELED`<br>`FILLED` |
| =>5797 | AggressorSide | Int | N | Sent only on trades MDEntryType=2<br>1=Buy<br>2=Sell |
| =>29004 | Funds | Decimal | N | Market orders may have an optional funds field which indicates how much quote currency is used to buy or sell |

## Market Data Snapshot Full Refresh (35=W) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-market-data\#market-data-snapshot-full-refresh-35w "Direct link to Market Data Snapshot Full Refresh (35=W)")



Only Available On Snapshot Enabled Gateway

The Market Data Snapshot Full Refresh (35=W) message is only supported on the Snapshot Enabled Gateway.

This message provides a full snapshot of all orders in the order book, including those placed before the client subscribed to incremental market data.

A snapshot is requested automatically when a successful Market Data Request from the client is processed for a given symbol. Clients should queue up incremental updates and process only the incremental updates with sequence number RptSeq greater than the RptSeq in the initial MD Snapshot Full Refresh snapshot message.

If clients are already subscribed to a symbol and send another Market Data Request to subscribe, they will not receive a new snapshot for that symbol. Clients must unsubscribe and subscribe to the market data again for a given symbol to receive a new snapshot.

| Tag | FieldName | Type | Required | Notes |
| --- | --- | --- | --- | --- |
| 262 | MDReqID | String | Y | Client identifier for the market data request |
| 83 | RptSeq | Long | Y | Public sequence number for the final update in the snapshot by symbol |
| 893 | LastFragment | Char | Y | Is this the last message in the snapshot for a given symbol<br>Y=Yes<br>N=No |
| 55 | Symbol | String | Y | Repeating group of symbols for which the client requests market data |
| 268 | NoMDEntries | Int | Y | Number of orders to be added to the book in this snapshot message |
| 1682 | MDSecurityTradingStatus | String | Y | `trading_disabled`<br>`cancel_only`<br>`post_only`<br>`limit_only`<br>`full_trading`<br>`auction_mode` |
| =>269 | MDEntryType | Char | Y | 0=Bid<br>1=Offer |
| =>278 | MDEntryID | String | Y | The order ID that should be added to the book |
| =>270 | MDEntryPx | Decimal | Y | The price of the order |
| =>271 | MDEntrySize | Decimal | Y | The quantity remaining of the order |

## Security List Request (35=x) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-market-data\#security-list-request-35x "Direct link to Security List Request (35=x)")

This message is sent by clients to request a full list of instruments that Coinbase Exchange supports together with each instrument’s trading status, tick size, minimum order quantity, and any other descriptive fields.

| Tag | FieldName | Type | Required | Notes |
| --- | --- | --- | --- | --- |
| 320 | SecurityReqID | String | Y | Client identifier for the request |
| 559 | SecurityListRequestType | Int | Y | Always 4=All Securities |

## Security List (35=y) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-market-data\#security-list-35y "Direct link to Security List (35=y)")

Instrument definition messages are returned in response to a client’s Security List Request.

| Tag | FieldName | Type | Required | Notes |
| --- | --- | --- | --- | --- |
| 320 | SecurityReqID | String | Y | Client identifier for the request |
| 322 | SecurityResponseID | String | Y | Response ID for the Security List Request |
| 560 | SecurityRequestResult | Int | Y | 0=Valid Request<br>1=Invalid Request |
| 893 | LastFragment | Char | Y | Is this the last instrument definition message in response to the original request<br>Y=Yes<br>N=No |
| 393 | TotNoRelatedSym | Int | Y | Total number of symbols that will be sent cumulatively |
| 146 | NoRelatedSym | Int | Y | How many symbols are in this FIX message |
| 1682 | MDSecurityTradingStatus | String | Y | `trading_disabled`<br>`cancel_only`<br>`post_only`<br>`limit_only`<br>`full_trading`<br>`auction_mode` |
| =>55 | Symbol | String | Y | Repeating group of symbols for which the client requests market data |
| =>15 | Currency | String | Y | The quote currency for the symbol (e.g., USD if 55=BTC-USD) |
| =>562 | MinTradeVol | Decimal | Y | The minimum notional amount in quote currency terms for an order |
| =>969 | MinPriceIncrement | Decimal | Y | Minimum increment for quote currency (e.g., 0.01 USD for BTC-USD) |
| =>29003 | MinSizeIncrement | Decimal | Y | Minimum increment for base currency (e.g., 0.00000001 BTC for BTC-USD) |

Last updated on **Mar 6, 2025**

# DOCS/FIX-DOWNLOADS

# Exchange FIX Dictionary Downloads

![](https://img.shields.io/badge/Tarball%20updated-2024%20FEB%2023-0a639a)

A tarball of the Coinbase Exchange FIX dictionaries is available for download:

- [cb\_exch\_fix\_dictionaries-latest.tar.gz](https://docs.cdp.coinbase.com/downloads/exchange/cb_exch_fix_dictionaries-latest.tar.gz)

```codeBlockLines_p187
% tree cb_exch_fix_dictionaries-latest
cb_exch_fix_dictionaries-latest
├── market-data
│   ├── FIX50-prod-sand.xml
│   └── FIXT11-prod-sand.xml
└── order-entry
    ├── FIX42-prod-sand.xml
    ├── FIX50-prod-sand.xml
    └── FIXT11-prod-sand.xml

```



Unzip tar.gz file

- Mac: Double-click file
- Linux: `tar -xzf cb_exch_fix_dictionaries-latest.tar.gz`

## Archive [](https://docs.cdp.coinbase.com/exchange/docs/fix-downloads\#archive "Direct link to Archive")

- 2023-OCT-06: [cb\_exch\_fix\_dictionaries-20231006.tar.gz](https://docs.cdp.coinbase.com/downloads/exchange/archive/cb_exch_fix_dictionaries-20231006.tar.gz)
- 2023-AUG-03: [cb\_exch\_fix\_dictionaries-20230803.tar.gz](https://docs.cdp.coinbase.com/downloads/exchange/archive/cb_exch_fix_dictionaries-20230803.tar.gz)

Last updated on **May 20, 2024**

# DOCS/FIX-CHANGELOG

# Exchange FIX Dictionary Release Notes

This page documents Exchange FIX dictionary releases. For detailed FIX updates, follow the general Exchange [Changelog](https://docs.cdp.coinbase.com/exchange/docs/changelog).

## Order Entry Gateway [](https://docs.cdp.coinbase.com/exchange/docs/fix-changelog\#order-entry-gateway "Direct link to Order Entry Gateway")

### Coinbase Exchange FIX 5.0 [](https://docs.cdp.coinbase.com/exchange/docs/fix-changelog\#coinbase-exchange-fix-50 "Direct link to Coinbase Exchange FIX 5.0")

| Date | Baseline | Environments | Notes |
| --- | --- | --- | --- |
| 2023-07-21 | FIX 5.0 SP2 | Production, Sandbox | Initial release |

### Coinbase Exchange FIX 4.2 [](https://docs.cdp.coinbase.com/exchange/docs/fix-changelog\#coinbase-exchange-fix-42 "Direct link to Coinbase Exchange FIX 4.2")

| Date | Baseline | Environments | Notes |
| --- | --- | --- | --- |
| 2023-06-06 | FIX 4.2 SP2 | Production, Sandbox | Update |
| 2021-12-07 | FIX 4.2 SP2 | Production, Sandbox | Initial release |

## Market Data Gateway [](https://docs.cdp.coinbase.com/exchange/docs/fix-changelog\#market-data-gateway "Direct link to Market Data Gateway")

### Coinbase Exchange FIX 5.0 [](https://docs.cdp.coinbase.com/exchange/docs/fix-changelog\#coinbase-exchange-fix-50-1 "Direct link to Coinbase Exchange FIX 5.0")

| Date | Baseline | Environments | Notes |
| --- | --- | --- | --- |
| 2023-02-23 | FIX 5.0 SP2 | Production, Sandbox | Initial release |

Last updated on **Feb 25, 2025**

# DOCS/FIX-CONNECTIVITY

# Exchange FIX API Connectivity

[Financial Information eXchange](http://en.wikipedia.org/wiki/Financial_Information_eXchange), or FIX, is a standard protocol which can be used to enter orders, submit cancel requests, and receive fills. FIX API users typically have existing software that runs FIX for order management.

The baseline specification for the Exchange FIX API is mixed:

- Order Entry: [FIX 4.2 SP2](https://www.onixs.biz/fix-dictionary/4.2/index.html)
- Market Data: [FIX 5.0 SP2](https://www.onixs.biz/fix-dictionary/5.0/index.html)



FIX5 Resets Saturdays at 1PM ET

FIX5 Order Entry and Market Data customers will be logged out every Saturday at 1PM ET (6PM UTC).



Info

Changes are deployed every Monday and Thursday at or near `2PM EST (7PM UTC)`. At that time, a **logout** message is sent from the server to indicate the session is ending. We do not deploy on US federal holidays.

## Supported Endpoints [](https://docs.cdp.coinbase.com/exchange/docs/fix-connectivity\#supported-endpoints "Direct link to Supported Endpoints")



Info

**Production**

Order Entry (FIX42): `tcp+ssl://fix.exchange.coinbase.com:4198 `

Order Entry (FIX50): `tcp+ssl://fix-ord.exchange.coinbase.com:6121 `

Market Data (FIX50): `tcp+ssl://fix-md.exchange.coinbase.com:6121 `

**Sandbox**

Order Entry (FIX42): `tcp+ssl://fix-public.sandbox.exchange.coinbase.com:4198 `

Order Entry (FIX50): `tcp+ssl://fix-ord.sandbox.exchange.coinbase.com:6121 `

Market Data (FIX50): `tcp+ssl://fix-md.sandbox.exchange.coinbase.com:6121 `



Resend Requests

Resend requests are not supported. Every connection establishes a new session and a new set of session sequence numbers.

## FIX Gateway [](https://docs.cdp.coinbase.com/exchange/docs/fix-connectivity\#fix-gateway "Direct link to FIX Gateway")

Before logging onto a FIX session, clients must establish a secure connection to the FIX gateway. See the [available endpoints](https://docs.cdp.coinbase.com/exchange/docs/fix-connectivity#supported-endpoints) above.

**TCP SSL**

If your FIX implementation does not support establishing a **native TCP SSL connection**, you must setup a local proxy such as [stunnel](https://www.stunnel.org/) to establish a secure connection to the FIX gateway.

**Static IP**

Coinbase Exchange **does not** support static IP addresses. If your firewall rules require a static IP address, you must create a TCP proxy server with a static IP address which is capable of resolving an IP address using DNS.

**AWS IP**

If connecting from servers **outside of AWS** which require firewall rules, use the [AWS provided resources](https://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html) to determine how best to whitelist AWS IP ranges.



Info

Changes are deployed every Monday and Thursday at or near `2PM EST (7PM UTC)`. At that time, a **logout** message is sent from the server to indicate the session is ending. We do not deploy on US federal holidays.

## Ciphers [](https://docs.cdp.coinbase.com/exchange/docs/fix-connectivity\#ciphers "Direct link to Ciphers")

Coinbase Exchange supports **TLSv1.2** with the following server ciphers:

| Recommend | Length | Cipher Suite | Elliptic Curve |
| --- | --- | --- | --- |
| Preferred | 128 bits | ECDHE-RSA-AES128-GCM-SHA256 | Curve P-256 DHE 256 |
| Accepted | 128 bits | ECDHE-RSA-AES128-SHA256 | Curve P-256 DHE 256 |
| Accepted | 256 bits | ECDHE-RSA-AES256-GCM-SHA384 | Curve P-256 DHE 256 |
| Accepted | 256 bits | ECDHE-RSA-AES256-SHA384 | Curve P-256 DHE 256 |

## SSL Tunnels [](https://docs.cdp.coinbase.com/exchange/docs/fix-connectivity\#ssl-tunnels "Direct link to SSL Tunnels")

[Exchange FIX API endpoints](https://docs.cdp.coinbase.com/exchange/docs/fix-connectivity#supported-endpoints) only accept TCP connections secured by SSL. If your FIX client library cannot establish an SSL connection natively, you must run a local proxy that establishes a secure connection and allows unencrypted local connections.

Last updated on **Dec 10, 2024**

# DOCS/FIX-BEST-PRACTICES

# Exchange FIX Best Practices

## Optimize Traffic [](https://docs.cdp.coinbase.com/exchange/docs/fix-best-practices\#optimize-traffic "Direct link to Optimize Traffic")

To optimize your FIX set up, spread traffic over as many portfolios as possible to minimize order-entry latencies.

You should adhere to the following:

- 1 API key per session/connection to guarantee a connection
- 75 maximum connections per profile
- 175 maximum connections per user across all profiles

## Batch Messages [](https://docs.cdp.coinbase.com/exchange/docs/fix-best-practices\#batch-messages "Direct link to Batch Messages")

We strongly recommend batch messages for both order entry and cancellation.

Batch Requests:

- Can have up to 15 orders / cancels per request.
- Only count for a single message for the purposes of rate limiting.
- Can be more efficient to process compared to the equivalent individual requests.

Available batch messages are:

- [New Order Batch (U6)](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry#new-order-batch-u6)
- [Order Cancel Batch Request (U4)](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry#order-cancel-batch-request-u4)
- [New Order Batch Reject (U7)](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry#new-order-batch-reject-u7)
- [Order Cancel Batch Reject (U5)](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry#order-cancel-batch-reject-u5)

## Modify Order Requests [](https://docs.cdp.coinbase.com/exchange/docs/fix-best-practices\#modify-order-requests "Direct link to Modify Order Requests")

We strongly recommend [Modify Order Requests](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry#modify-order-request-g) where applicable.

Modify Order Requests:

- Keep your place in the order book queue when size is amended down.
- Result in 50% fewer messages when compared to canceling an existing order and placing a new one.
- Reduce your overall rate limit usage when compared to sending a cancellation followed by a new order.
- Can be more efficient to process compared to the equivalent individual cancel and new order requests.

For rate limits, see [FIX API Rate Limits](https://docs.cdp.coinbase.com/exchange/docs/fix-rate-limits).

## Drop Copy Session [](https://docs.cdp.coinbase.com/exchange/docs/fix-best-practices\#drop-copy-session "Direct link to Drop Copy Session")

Enabling DropCopyFlag="Yes" ( `9406=Y`) configures your session to receive execution reports across all active sessions for the same profile.

We recommend that you enable DropCopyFlag on a **separate, read-only session**:

- Execution latencies are higher for Drop Copy sessions because the same connection handles more read traffic.
- Multiple Drop Copy sessions produce multiple copies of redundant data.

Last updated on **May 20, 2024**

# DOCS/FIX-RATE-LIMITS

# Exchange FIX Rate Limits

## Order Entry Limits [](https://docs.cdp.coinbase.com/exchange/docs/fix-rate-limits\#order-entry-limits "Direct link to Order Entry Limits")

### FIX 4.2 [](https://docs.cdp.coinbase.com/exchange/docs/fix-rate-limits\#fix-42 "Direct link to FIX 4.2")

The [FIX 4.2 Order Entry API](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry) rate limits are:

- 50 requests per **rolling second** 1 per session
- 100 messages per second in bursts



Rolling second

The clock starts when the first command is sent. We use a lazy-fill token bucket implementation.

### FIX 5 [](https://docs.cdp.coinbase.com/exchange/docs/fix-rate-limits\#fix-5 "Direct link to FIX 5")

The [FIX 5 Order Entry API](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50) rate limits are:

- 2 logons per second per API key
- 100 requests per second



Caution

Your FIX 5 session is disconnected if your messages exceed 200 messages per second

### Maximums [](https://docs.cdp.coinbase.com/exchange/docs/fix-rate-limits\#maximums "Direct link to Maximums")

- Maximum connections per profile: 75 . See [FIX Best Practices](https://docs.cdp.coinbase.com/exchange/docs/fix-best-practices).
- Maximum connections per user across all profiles: 175
- Maximum API keys per session/connection: 1
- Maximum profiles per user: 100
- Maximum orders per batch message (new and cancelled): 15

## Market Data Limits [](https://docs.cdp.coinbase.com/exchange/docs/fix-rate-limits\#market-data-limits "Direct link to Market Data Limits")

The [FIX Market Data API](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-market-data) is limited to 1 connection per API key. It does not use FIX order entry rate limits (connections, rps, burst rps).

Last updated on **Feb 25, 2025**

# DOCS/FIX-MSG-ORDER-ENTRY

# Exchange FIX Order Entry Messages 4.2



FIX 4.2 Order Entry Gateway Deprecation

FIX 4.2 Order Entry Gateway will be deprecated on **June 3rd, 2025**. For FIX based order entry, **leverage the newer, more performant** [FIX 5 Order Entry Gateway](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50).

About this API:

- **Baseline**: [FIX 4.2 SP2 specification](https://www.onixs.biz/fix-dictionary/4.2/index.html). Includes tags from later FIX versions plus custom tags in the high number range as allowed by the standard.
- **Environments**: Production, Sandbox



Environment URLs

- Production: `tcp+ssl://fix.exchange.coinbase.com:4198`
- Sandbox: `tcp+ssl://fix-public.sandbox.exchange.coinbase.com:4198`

## Header [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#header "Direct link to Header")

A standard header must be present at the start of every message in both directions.

| Tag | Name | Description |
| --- | --- | --- |
| 8 | BeginString | Must be `FIX.4.2` |
| 49 | SenderCompID | Client API key (on messages from the client) |
| 56 | TargetCompID | Must be `Coinbase` (on messages from the client) |
| 999 | CoinbaseProductSeq | Response header only (returned on [Execution Reports](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry#execution-report-8)). Represents market sequence. |



Caution

[New orders](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry#new-order-single-d) can only be placed when the number of open orders is below 500 for that given product.

## Logon (A) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#logon-a "Direct link to Logon (A)")

Sent by the client to initiate a session and by the server as an acknowledgement. Only one session may exist per connection; sending a Logon message within an established session is an error.

| Tag | Name | Description |
| --- | --- | --- |
| 34 | MsgSeqNum | Must be `1` |
| 98 | EncryptMethod | Must be `0` (None) |
| 108 | HeartBtInt | Must be ≤ `30` (secs). Values greater are capped at `30`. Server sends Test Request if client messages are not received in approximately (HeartBtInt x 1.5) seconds. Server terminates session if client messages are not received in approximately (HeartBtInt x 2 seconds). |
| 141 | ResetSeqNumFlag | If set to `Y`, reset sequence numbers for both sides of the FIX session. |
| 554 | Password | Client API passphrase |
| 96 | RawData | Client message signature (see below) |
| 8013 | CancelOrdersOnDisconnect | `S`: Batch cancel all open orders placed during session; `Y`: Batch cancel all open orders for the current profile. The latter is more performant and recommended. |
| 9406 | DropCopyFlag | If set to `Y`, execution reports are generated for all user orders (defaults to `Y`). |

The Logon message sent by the client must be signed for security. The signing method is described in [Signing a Message](https://docs.cdp.coinbase.com/exchange/docs/rest-auth#signing-a-message). The prehash string is the following fields joined by the FIX field separator (ASCII code 1):

`SendingTime, MsgType, MsgSeqNum, SenderCompID, TargetCompID, Password`.

There is no trailing separator. The `RawData` field should be a base64 encoding of the HMAC signature.

```codeBlockLines_p187
// create a new Logon message
var logon = new Msgs.Logon();
logon.SendingTime = new Date();
logon.HeartBtInt = 30;
logon.EncryptMethod = 0;
logon.passphrase = "...";

var presign = [\
  logon.SendingTime,\
  logon.MsgType,\
  session.outgoing_seq_num,\
  session.sender_comp_id,\
  session.target_comp_id,\
  passphrase,\
].join("\x01");

// add the presign string to the RawData field of the Logon message
logon.RawData = sign(presign, secret);

// send the logon message to the server
session.send(logon);

function sign(what, secret) {
  var key = Buffer.from(secret, "base64");
  var hmac = crypto.createHmac("sha256", key);
  return hmac.update(what).digest("base64");
}

```



Caution

To establish multiple FIX connections, generate a new API key for each one. The maximum is 75 connections per profile. Do not use a single API key for multiple connections at the same time.



Caution

The value of `SendingTime` must be within 5 minutes of server time in UTC.

## Logout (5) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#logout-5 "Direct link to Logout (5)")

Sent by either side to initiate session termination. The side which receives this message first should reply with the same message type to confirm session termination.



Caution

Do not close a connection without logging out of the session first or it triggers an error.

## New Order Single (D) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#new-order-single-d "Direct link to New Order Single (D)")

Sent by the client to enter an order. Each profile can place a maximum of 500 open orders on a product. Once reached, the profile cannot place any new orders until the total number of open orders is below 500 .

| Tag | Name | Description |
| --- | --- | --- |
| 11 | ClOrdID | UUID selected by client to identify the order <br>This shouldn't match the ClOrdID of any open orders. |
| 55 | Symbol | Required symbol to identify the new order, e.g., `BTC-USD` |
| 54 | Side | Must be `1` to buy or `2` to sell |
| 44 | Price | Limit price (e.g., in USD) (Limit order only) |
| 38 | OrderQty | Order size in base units (e.g., BTC) |
| 152 | CashOrderQty | Order size in quote units (e.g., USD) (Market or [Limit order](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-lwf) only) |
| 40 | OrdType | Must be `1` for Market, `2` for Limit, `4` for Stop Limit, `O` for [Take Profit Stop Loss](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-tpsl) |
| 99 | StopPx | Stop price for order |
| 59 | TimeInForce | Must be a valid TimeInForce value. See the table below (Limit order only) |
| 111 | MaxFloor | Maximum size within an order to be displayed. Must be > 10% of OrderQty |
| 126 | ExpireTime | Time/Date (in UTC) of order expiration for Good Till Date (GTD) only. The order expires within one second after the specified time. |
| 1109 | TriggerPriceDirection | The side from which the trigger price (or **last trade price**) is reached. <br>Valid values: <br>- U = Trigger if price goes UP to or through specified Trigger Price.<br>- D = Trigger if price goes DOWN to or through specified Trigger Price.<br>**Note:** If OrdType = 4, 1109 is highly recommended. If OrdType != 4, 1109 is not needed. |
| 7928 | SelfTradePrevention | Optional, see the table below |

### SelfTradePrevention Values [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#selftradeprevention-values "Direct link to SelfTradePrevention Values")

| Value | Description |
| --- | --- |
| `D` | Decrement and cancel (the default) |
| `O` | Cancel resting order |
| `N` | Cancel incoming order |
| `B` | Cancel both orders |

If an order is decremented due to self-trade prevention, an Execution Report is sent to the client with `ExecType=D` indicating unsolicited `OrderQty` reduction (i.e., partial cancel).

See the [self-trade prevention](https://docs.cdp.coinbase.com/exchange/docs/matching-engine#self-trade-prevention) documentation for more details about this field.

### Time In Force Values [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#time-in-force-values "Direct link to Time In Force Values")

| Value | Policy | Abbr |
| --- | --- | --- |
| `1` | Good Till Cancel | GTC |
| `3` | Immediate or Cancel | IOC |
| `4` | Fill or Kill | FOK |
| `6` | Good Till Date (90-day hard limit) | GTD |
| `P` | Post-Only (GTC & make liquidity only) |  |



Post-Only

The post-only flag ( `P`) indicates that the order should only make liquidity. If any part of the order results in taking liquidity, the order is rejected and no part of it executes. Open Post-Only orders are treated as Good Till Cancel.

See the [Time In Force](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postorders#time-in-force) documentation for more details about these values.

### Errors [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#errors "Direct link to Errors")

If a trading error occurs (for example, the user has insufficient funds), an Execution Report with `ExecType=8` is sent back, signifying that the order was rejected.

### Iceberg Orders [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#iceberg-orders "Direct link to Iceberg Orders")

See [Iceberg Orders](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-iceberg).

### Take Profit Stop Loss Orders [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#take-profit-stop-loss-orders "Direct link to Take Profit Stop Loss Orders")

See [TPSL Orders](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-tpsl).

### Limit With Funds Orders [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#limit-with-funds-orders "Direct link to Limit With Funds Orders")

See [Limit With Funds Orders](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-lwf).

## New Order Batch (U6) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#new-order-batch-u6 "Direct link to New Order Batch (U6)")

Sent by the client to create multiple orders. Maximum of 15 orders per message. All orders must have the same symbol.

Each profile can place a maximum of 500 open orders on a product. Once reached, the profile cannot place any new orders until the total number of open orders is below 500 . If the total number of open orders in the batch causes the profile to exceed the 500 maximum, the entire batch is rejected.

| Tag | Name | Description |
| --- | --- | --- |
| 8014 | BatchID | UUID selected by client to identify this New Order Batch request |
| 73 | NoOrders | Number of orders in this message (number of repeating groups to follow). Must be less than or equal to 15. |
| 11 | ClOrdID | UUID selected by client for the order. Must be the first field in the repeating group. <br>This shouldn't match the ClOrdID of any open orders. Additionally, it shouldn't match any other ClOrdIDs in this batch. |
| 55 | Symbol | Required symbol to identify the new order (e.g., `BTC-USD`) |
| 54 | Side | Must be `1` to buy or `2` to sell |
| 44 | Price | Limit price (e.g., in USD) |
| 38 | OrderQty | Order size in base units (e.g., BTC) |
| 40 | OrdType | Must be `2` for Limit |
| 59 | TimeInForce | Must be a valid [TimeInForce value](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry#time-in-force-values) |
| 126 | ExpireTime | Time/Date (in UTC) of order expiration for Good Till Date (GTD) only. The order expires within one second after the specified time. |
| 7928 | SelfTradePrevention | Optional, see the table above |

## Order Cancel Request (F) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#order-cancel-request-f "Direct link to Order Cancel Request (F)")

Sent by the client to cancel an order.

| Tag | Name | Description |
| --- | --- | --- |
| 11 | ClOrdID | UUID selected by client to identify this cancel request |
| 37 | OrderID | OrderID from the ExecutionReport with OrdStatus=New (39=0) |
| 41 | OrigClOrdID | ClOrdID from the New Order Single. When supplying this value, you do not need to supply an OrderID. |
| 55 | Symbol | Required symbol of the order to cancel (must match Symbol of the Order). |
| 58 | Text | Free format text string |

## Order Status Request (H) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#order-status-request-h "Direct link to Order Status Request (H)")

Sent by the client to obtain information about pending and done orders.

| Tag | Name | Description |
| --- | --- | --- |
| 37 | OrderID | OrderID of order to be sent back. |
| 11 | ClOrdID | ClOrdID of order to be sent back. When supplying this value, you do not need to supply an OrderID. |
| 55 | Symbol | Required symbol to identify the order, e.g., `BTC-USD` |

### Response [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#response "Direct link to Response")

The response to an Order Status Request is an ExecutionReport with `ExecType=I`. The ExecutionReport contains the `ClOrdID` if the value is supplied. If the order cannot be found, the ExecutionReport has `OrderID=0`.

## Order Cancel Batch Request (U4) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#order-cancel-batch-request-u4 "Direct link to Order Cancel Batch Request (U4)")

Sent by the client to cancel multiple orders. Maximum of 15 orders per message. All orders must have the same symbol.

| Tag | Name | Description |
| --- | --- | --- |
| 8014 | BatchID | UUID selected by client to identify this Order Batch Cancel Request |
| 73 | NoOrders | Number of orders in this message (number of repeating groups to follow). Must be less than or equal to 15. |
| 41 | OrigClOrdID | UUID selected by client for the order. Must be the first field in the repeating group. |
| 55 | Symbol | Required symbol of the order to cancel (must match Symbol of the Order) |
| 37 | OrderID | OrderID from the ExecutionReport with OrdStatus=New (39=0). If present, this field takes precedence over OrigClOrdID to identify the order (optional). |
| 11 | ClOrdID | UUID selected by client to identify this cancel request |

### Response [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#response-1 "Direct link to Response")

When the message is invalid or an unexpected error occurs, an Order Cancel Batch Reject (U5) message is sent. When orders are cancelled, an Execution Report (8) is sent for each order canceled. When Order Cancel Batch Request (U4) is partially rejected (i.e., some orders are filled or already canceled), Order Cancel Reject (9) is sent for each rejected cancel.

## Execution Report (8) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#execution-report-8 "Direct link to Execution Report (8)")

Sent by the server when an order is accepted, rejected, filled, or canceled. Also sent when the user sends an `OrderStatusRequest`.

| Tag | Name | Description |
| --- | --- | --- |
| 6 | AvgPx | Calculated average price of all fills on this order. Only populates Exec Report if CumQty > 0 |
| 11 | ClOrdID | Only present on order acknowledgements, ExecType=New (150=0) |
| 14 | CumQty | Currently executed quantity for chain of orders. Populates Exec Report when: <br>- `39=0` ⇒ OrdStatus = New<br>- `39=1` ⇒ OrdStatus = Partially filled<br>- `39=3` ⇒ OrdStatus = Done for day<br>- `39=5` ⇒ OrdStatus = Replaced |
| 17 | ExecID | Unique identifier of execution message as assigned by broker |
| 37 | OrderID | OrderID from the ExecutionReport with ExecType=New (150=0) |
| 39 | OrdStatus | Order status as of the current message |
| 55 | Symbol | Symbol of the original order |
| 54 | Side | Must be `1` to buy or `2` to sell |
| 32 | LastShares | Amount filled (if ExecType=1). Also called LastQty as of FIX 4.3 |
| 44 | Price | Price of the fill if ExecType indicates a fill, otherwise the order price |
| 38 | OrderQty | OrderQty as accepted (may be less than requested upon self-trade prevention). Represents original order quantity when `OrdStatus` is Canceled or Done for day. |
| 111 | MaxFloor | Maximum size within an order to be displayed. Must be > 10% of OrderQty |
| 198 | SecondaryOrderID | Assigned by the party that accepts the order. Can be used to provide the OrderID (37) used by an exchange or executing system. |
| 58 | Text | Human-readable description of the reject or cancel (optional) <br>- 101:Time In Force<br>- 102:Self-trade Prevention<br>- 103:Admin<br>- 104:Price Bound Order Protection<br>- 105:Insufficient Funds<br>- 106:Insufficient Liquidity<br>- 107:Broker<br>- 109:High Bid Limit Order Protection |
| 60 | TransactTime | Time the event occurred |
| 103 | OrdRejReason | Insufficient funds= `3`, Post-only= `8`, Unknown error= `0` |
| 136 | NoMiscFees | `1` (Order Status Request responses and fill reports) |
| 137 | MiscFeeAmt | Fee amount (absolute value for Order Status Request responses, percentage value for fill reports) |
| 138 | MiscFeeCurr | Fee currency |
| 139 | MiscFeeType | `4` (Exchange fees) (Order Status Request responses and fill reports) |
| 150 | ExecType | May be `1` (Partial fill) for fills, `D` for self-trade prevention, etc. |
| 151 | LeavesQty | Quantity open for further execution. Populates Exec Report when: <br>- `39=0` ⇒ OrdStatus = New<br>- `39=1` ⇒ OrdStatus = Partially filled<br>- `39=3` ⇒ OrdStatus = Done for day<br>- `39=5` ⇒ OrdStatus = Replaced |
| 152 | CashOrderQty | Order size in quote units (e.g., USD) (Market order only) |
| 891 | MiscFeeBasis | `2` (Percentage fee basis) (fill report only) |
| 1003 | TradeID | Product unique trade id |
| 1057 | AggressorIndicator | `Y` for taker orders, `N` for maker orders |

### ExecType Values [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#exectype-values "Direct link to ExecType Values")

| ExecType | Description |
| --- | --- |
| `0` | New Order |
| `1` | Partial Fill |
| `3` | Done |
| `4` | Canceled |
| `7` | Stopped |
| `8` | Rejected |
| `D` | Restated (Order Changed due to STP) |
| `I` | Order Status |

## New Order Batch Reject (U7) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#new-order-batch-reject-u7 "Direct link to New Order Batch Reject (U7)")

Sent by the server when a New Order Batch message is rejected.

| Tag | Name | Description |
| --- | --- | --- |
| 8014 | BatchID | BatchID from the New Order Batch message |
| 58 | Text | Human-readable description of the error (optional) |

## Modify Order Request (G) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#modify-order-request-g "Direct link to Modify Order Request (G)")

Supports the [Order Replace Request](https://www.onixs.biz/fix-dictionary/4.2/msgtype_g_71.html) outlined in the FIX protocol. See also: [WebSocket Full Channel, Change](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#change).



Caution

Each Modify Order Request, per order, must be processed in turn. A client can only send a Modify Order Request after the previous request for the same order has been fully processed.

Example FIX Request:

```codeBlockLines_p187
 BeginString=FIX.4.2 BodyLength=265 MsgType=ORDER_CANCEL_REPLACE_REQUEST MsgSeqNum=17 SenderCompID=00000000100000000000000000000003 SendingTime=20220609-04:01:48.757 TargetCompID=Coinbase ClOrdID=907b6ae6-bcbe-441a-b7bb-d932afdb9edb OrderID=71de0cdf-938f-495b-9fad-108837bde704 OrderQty=2 OrdType=LIMIT OrigClOrdID=907b6ae6-bcbe-441a-b7bb-d932afdb9eda Price=100.00 Side=BUY Symbol=ETH-USD TransactTime=20220609-04:01:48.757 CheckSum=107

```

Example Execution Report:

```codeBlockLines_p187
BeginString=FIX.4.2 BodyLength=253 MsgType=EXECUTION_REPORT MsgSeqNum=18 SenderCompID=Coinbase SendingTime=20220609-04:01:48.766 TargetCompID=00000000100000000000000000000003 ExecID=450d0b12-e994-48de-9f74-0f43c74fd054 ExecTransType=NEW OrderID=71de0cdf-938f-495b-9fad-108837bde704 OrderQty=3 OrdStatus=DONE_FOR_DAY Price=100 Side=BUY Symbol=ETH-USD Text=107:Broker TransactTime=20220609-04:01:48.762 ExecType=DONE_FOR_DAY LeavesQty=0 CheckSum=150

```

| Tag | Name | Description |
| --- | --- | --- |
| 37 | OrderID | Unique identifier of most recent order as assigned by broker <br>This shouldn't match the ClOrdID of any open orders. |
| 41 | OrigClOrdID | `ClOrdID <11>` of previous order (NOT initial order of the day) when canceling or replacing an order |
| 11 | ClOrdID | Unique identifier of replacement order as assigned by institution. |
| 55 | Symbol | Must match original order |
| 54 | Side | Must match original side |
| 38 | OrderQty | Total Intended Order Quantity (including the amount already executed for this chain of orders) |
| 60 | TransactTime | Time this order request was initiated/released by the trader or trading system |
| 40 | OrdType | Only limit orders are supported for now (2) |
| 44 | Price | Price per share |

### Guidance [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#guidance "Direct link to Guidance")

#### Queue Priority [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#queue-priority "Direct link to Queue Priority")

- If you increase the quantity, or modify the price (up or down) you **lose your place and move to the back of the queue**. If you decrease the quantity you keep your place in the queue.

#### OrderQty (38) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#orderqty-38 "Direct link to OrderQty (38)")

- If you send a Modify Order request whose `OrderQty (38)` is less than the filled size of the order, **Coinbase cancels the order and marks it as filled**.

#### Matching [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#matching "Direct link to Matching")

- If your Modify Order request results in an **immediate match** and you are both the **initiator of the order** AND **subscribed to the authenticated WebSocket feed**, you should receive a change message with `"reason": "modify_order"`.

After the immediate match, if there is any **quantity remaining** on the modified order, you should receive a new change message with `"reason":"remainder_after_modification"` which reports the new / old prices as a result of the Modify Order.

- If you are **using the non-authenticated WebSocket feed** (as the initiator or not), you should receive a `match + done` message for the order at the newly modified price.




Caution

Clients may experience a non-standard FIX `OrderCancelReject` with text (when processing the last cancel replace request). This can occur when our system is backlogged and unable to process this Modify Order Request (or `OrderCancelReplaceRequest`).

## Order Cancel Reject (9) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#order-cancel-reject-9 "Direct link to Order Cancel Reject (9)")

Sent by the server when an Order Cancel Request cannot be satisfied, e.g., because the order is already canceled or completely filled.

| Tag | Name | Description |
| --- | --- | --- |
| 11 | ClOrdID | As on the cancel request |
| 37 | OrderID | As on the cancel request |
| 41 | OrigClOrdID | As on the cancel request |
| 39 | OrdStatus | `4` if too late to cancel |
| 102 | CxlRejReason | `1` if the order is unknown |
| 434 | CxlRejResponseTo | `1` (Order Cancel Request) |

## Order Cancel Batch Reject (U5) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#order-cancel-batch-reject-u5 "Direct link to Order Cancel Batch Reject (U5)")

Sent by the server when an Order Cancel Batch Request cannot be satisfied, e.g., because a Symbol was not present. This is not sent if no orders can be found.

| Tag | Name | Description |
| --- | --- | --- |
| 8014 | BatchID | BatchID from the New Order Batch message |
| 58 | Text | Human-readable description of the error (optional) |

## Reject (3) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#reject-3 "Direct link to Reject (3)")

Sent by either side upon receipt of a message which cannot be processed, e.g., due to missing fields or an unsupported message type.

| Tag | Name | Description |
| --- | --- | --- |
| 45 | RefSeqNum | MsgSeqNum of the rejected incoming message |
| 371 | RefTagID | Tag number of the field which caused the reject (optional) |
| 372 | RefMsgType | MsgType of the rejected incoming message |
| 58 | Text | Human-readable description of the error (optional) |
| 373 | SessionRejectReason | Code to identify reason for reject |

### SessionRejectReason Values [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#sessionrejectreason-values "Direct link to SessionRejectReason Values")

The following values can be sent by the server.

| Value | Description |
| --- | --- |
| 1 | Required tag missing |
| 5 | Value is incorrect (out of range) for this tag |
| 6 | Incorrect data format for value |
| 11 | Invalid MsgType (35) |

## RFQ Request (AH) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#rfq-request-ah "Direct link to RFQ Request (AH)")

Request For Quote (RFQ) allows liquidity providers to respond and interact with real-time RFQ requests. The RFQ process begins with [Quote Request (R)](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry#quote-request-r).

Request For Quote is enabled for users who have been approved by Coinbase as an RFQ Liquidity Provider. Once approved, clients must send an RFQ Request message (35=AH) after each successful Logon (35=A) message for any session in which you are interested in receiving RFQ requests.

- If this request is acknowledged, and no symbol is specified, this session receives all Quote requests (all assets).
- If this request is acknowledged, and symbol is specified , this session only receives requests for the specific symbols. For instance, in the scenario of subscribing to "BTC-USD," if the related products are present, quote request message for both "BTC-USD" and "USD-BTC" will be subsequently returned as responses.
- If the session submitting this request is not approved by Coinbase for participating in the RFQ program, this request is rejected with a Business Message Reject (j).

| Tag | Name | Type | Required | Notes |
| --- | --- | --- | --- | --- |
| 644 | RFQReqID | UUID | Y |  |
| 146 | NoRelatedSym | Int32 | N | Repeating group for number of symbols in the subscription message |
| 55 | Symbol | String32 | Y |  |



Tip

_Not_ receiving a response is expected and indicative of a successful request.

### RFQ Order Protections [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#rfq-order-protections "Direct link to RFQ Order Protections")

RFQ orders are subject to price protection points (PPP) at the time a quote is accepted for execution.

At Execution time:

- If an Order Book is present, RFQs fill at prices up to the PPP from the mid-point price, between the best bid and best offer.

- If an Order Book is not present, PPPs are calculated using the same mid-point price methodology but leveraging PPP settings from the higher of the two USD equivalent Order Books for the given pair (e.g., max PPP setting for SHIB-USD and DOGE-USD for a SHIB-DOGE RFQ).


If a PPP threshold is crossed, a [QuoteStatusReport (AI)](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry#quote-status-report-ai) is sent indicating your Quote has been canceled.

## Quote Request (R) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#quote-request-r "Direct link to Quote Request (R)")

Quote Request (R) is the start of the RFQ process. Liquidity Providers receive a Quote Request from Coinbase on behalf of a customer looking to participate in an RFQ trade. Any quote response to this request must adhere to the following rules to avoid rejections:

- Message must be well formed and complete (i.e., all required fields present).
- [Quote](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry#quote-s) message must be received before the expiration time indicated on Tag=62.

| Tag | Name | Type | Required | Notes |
| --- | --- | --- | --- | --- |
| 131 | QuoteReqID | UUID | R |  |
| 146 | NoRelatedSym | Int32 | Y | Always 1 |
| 55 | Symbol | String32 | Y | Example: `BTC-AVAX` |
| 38 | OrderQty | Float64 | Y |  |
| 62 | ValidUntilTime | UTCTimestamp | Y | UTC millis<br>`20220712-00:00:00.000` |
| 126 | ExpireTime | UTCTimestamp | Y | UTC millis<br>`20220712-00:00:00.000` |
| 303 | QuoteRequestType | Char | Y | 1 = Manual Accept<br>2 = Automatic Accept (default) |
| 891 | MiscFeeBasis | INT | Y | Always 2 = Percentage |
| 137 | MiscFeeAmt | AMT | Y | Basis point fee to market makers (MMs) |
| 528 | OrderCapacity | Char | Y | A = Agency (default) <br>C = Corporate |



Caution

QuoteRequestType (303) is always `2 = Automatic Accept` for the current implementation of RFQ on Coinbase Exchange.
MiscFeeBasis (891) is always `2 = Percentage` for the current implementation of RFQ on Coinbase Exchange.

_Request For Quote Message Flow_![Request For Quote message flow in 7 steps. (1) Customer submits RFQ; (2) Exchange sends Quote Request to liquidity provider; (3) Liquidity provider sends Quote to Exchange; (4) the Exchange responds to the liquidity provider with the Quote Status Report and (5) the Execution Report and (6) the Quote Status Report; (7) the Exchange then sends the customer a fill or cancel message.](https://docs.cdp.coinbase.com/exchange/assets/images/rfq-example.png)



Info

See also the new WebSocket [RFQ Matches Channel](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#rfq-matches-channel).

## Quote (S) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#quote-s "Direct link to Quote (S)")

Quote in response to a [Quote Request](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry#quote-request-r) that can be submitted up to the `ValidUntilTime` (Tag=62) specified in the Quote Request message. The Quote can be submitted as either a one-way quote or two-way quote. Only one side is actioned on if participant wins RFQ.



Info

Precision for price and size is limited to 16 decimal places and 40 digits total.

| Tag | Name | Type | Required | Notes |
| --- | --- | --- | --- | --- |
| 131 | QuoteReqID | UUID | Y |  |
| 117 | QuoteID | UUID | Y |  |
| 55 | Symbol | String32 | Y | Example: `BTC-AVAX` |
| 132 | BidPx | Float64 | C | Required if submitting a bid |
| 133 | OfferPx | Float64 | C | Required if submitting an offer |
| 134 | BidSize | Float64 | C | Required if submitting a bid. Must match OrderQty in Quote Request |
| 135 | OfferSize | Float64 | C | Required if submitting an offer. Must match OrderQty in Quote Request |

## Quote Status Report (AI) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#quote-status-report-ai "Direct link to Quote Status Report (AI)")

\`
Message sent in response to a successful or unsuccessful Quote.

- If the Quote was accepted, QuoteStatus=16 (Active).
- If the Quote was rejected, QuoteStatus=9 (Rejected).
- If the Quote was accepted and selected for execution, QuoteStatus=19 (Pending), and you receive an Execution Report.
- If the Quote was accepted but not selected for execution, QuoteStatus=17 (Canceled).
- If there is no response to a Quote request from Liquidity Providers, QuoteStatus=7 (Expired).

| Tag | Name | Type | Required | Notes |
| --- | --- | --- | --- | --- |
| 131 | QuoteReqID | UUID | Y |  |
| 117 | QuoteID | UUID | C |  |
| 55 | Symbol | String32 | Y | Example: `BTC-AVAX` |
| 38 | OrderQty | Float64 | Y | Echoed from Quote<br>35=S |
| 132 | BidPx | Float64 | Y | Echoed from Quote<br>35=S |
| 133 | OfferPx | Float64 | Y | Echoed from Quote<br>35=S |
| 134 | BidSize | Float64 | C | Must match OrderQty in Quote Request |
| 135 | OfferSize | Float64 | C | Must match OrderQty in Quote Request |
| 62 | ValidUntilTime | UTCTimestamp | Y | UTC millis<br>`20220712-00:00:00.000` |
| 126 | ExpireTime | UTCTimestamp | Y | UTC millis<br>`20220712-00:00:00.000` |
| 297 | QuoteStatus | Int32 | Y | `5` = Rejected: Insufficient funds (in response to [35=S](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry#quote-s))<br>`7` = Expired:<br>▪ Either no response to [35=S](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry#quote-s) from liquidity providers<br>▪ Or best quote not accepted by counterparty<br>`16` = Active: Quote successful (in response to [35=S](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry#quote-s)) <br>`17` = Canceled:<br>▪ Either quoting window expired bc quote not best<br>▪ Or RFQ was unable to hold funds<br>`19` = Pending Trade: RFQ selected for execution |
| 58 | Text | String | C | Required if QuoteStatus=5, Quote action was rejected |

## Resend Request (2) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#resend-request-2 "Direct link to Resend Request (2)")

[FIX Resend Requests](https://www.onixs.biz/fix-dictionary/4.2/msgtype_2_2.html) are sent by the receiving application to initiate the retransmission of messages.

| Tag | Name | Description |
| --- | --- | --- |
| 7 | [BeginSeqNo](https://www.onixs.biz/fix-dictionary/4.2/tagnum_7.html) | Sequence number of first message in range to be resent |
| 16 | [EndSeqNo](https://www.onixs.biz/fix-dictionary/4.2/tagnum_16.html) | Sequence number of last message in range to be resent |

### Guidance [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#guidance-1 "Direct link to Guidance")

- To successfully use replay functionality, submit a unique `senderLocationID` when logging on (because you can have multiple connections per API key).

[SenderLocationID <142>](https://www.onixs.biz/fix-dictionary/4.2/tagnum_142.html) identifies the message originator's location.

- To replay messages from a previous session, include `ResetSeqNumFlag=N` in your logon message (because, by default, we clear users sessions when logging on). You must also include the same `senderLocationID` used in the previous session to continue the session.

[ResetSeqNumFlag <141>](https://www.onixs.biz/fix-dictionary/4.2/tagnum_141.html) is a boolean flag that indicates whether or not both sides of the FIX session should reset sequence numbers.


#### Sequence Numbers [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#sequence-numbers "Direct link to Sequence Numbers")

Each request must be in batches of 2000 messages or less and lookback (the duration we keep messages) is 3 hours. For example, say you received messages in sequence range 4000-10000 within the last 3 hours:

- You can retrieve all messages from 4000 to 10000 by sending 3 requests in batches of 2000.
- You cannot retrieve messages before 4000 because of the 3 hour lookback.

#### Sample Ranges [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#sample-ranges "Direct link to Sample Ranges")

- Request single: `BeginSeqNo <7>` = `EndSeqNo <16>`
- Request range: `BeginSeqNo <7>` = first message in range; `EndSeqNo <16>` = last message in range
- Request range: `BeginSeqNo <7>` = first message in range; `EndSeqNo <16>` = 2000th message from first message ( `999999` or `0`)

## Heartbeat (0) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#heartbeat-0 "Direct link to Heartbeat (0)")

Sent by both sides if no messages have been sent for (HeartBtInt x 0.75) seconds, as agreed upon during logon. May also be sent in response to a Test Request.

| Tag | Name | Description |
| --- | --- | --- |
| 112 | TestReqID | Copied from the Test Request, if any |

## Test Request (1) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry\#test-request-1 "Direct link to Test Request (1)")

May be sent at any time by either side.

| Tag | Name | Description |
| --- | --- | --- |
| 112 | TestReqID | Free text |

Last updated on **Mar 3, 2025**

# DOCS/FIX-MSG-ORDER-ENTRY-50

# Exchange FIX Order Entry Messages 5.0

About this API:

- **Baseline**: [FIX 5.0 SP2 specification](https://www.onixs.biz/fix-dictionary/5.0.sp2/index.html).
- **Environments**: Production, Sandbox



Environment URLs

- Production: `tcp+ssl://fix-ord.exchange.coinbase.com:6121 `

- Sandbox: `tcp+ssl://fix-ord.sandbox.exchange.coinbase.com:6121 `



FIX5 Resets Saturdays at 1PM ET

FIX5 Order Entry and Market Data customers will be logged out every Saturday at 1PM ET (6PM UTC).

## Components [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#components "Direct link to Components")

### Standard Header [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#standard-header "Direct link to Standard Header")

Fields that go at the beginning of every message. This exists for all messages sent and received.

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 8 | BeginString | String | Y | Must be set to `FIXT.1.1` and be the first field in the message.<br>(Since FIX version 5.0 this field now represents the session version. The application version gets specified in [Logon](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#logon-35a) message's `DefaultApplVerID (1137)` tag.) |
| 9 | BodyLength | Int | Y | Message length in bytes up to the checksum field (tags after `BodyLength (9)` and before `Checksum (10)`). This must be the second field in message. |
| 35 | MsgType | String | Y | The type of message proceeding the header, must be the third field in the message.<br>**Supported values include:**<br>Admin Messages<br>`A` = Logon<br>`0` = Heartbeat<br>`1` = TestRequest<br>`3` = Reject<br>`5` = Logout<br>Application Messages<br>`D` = NewOrderSingle<br>`F` = OrderCancelRequest<br>`G` = OrderCancelReplaceRequest<br>`H` = OrderStatusRequest<br>`j` = BusinessMessageReject<br>`8` = ExecutionReport<br>`9` = OrderCancelReject<br>`U4` = OrderCancelBatch<br>`U5` = OrderCancelBatchReject<br>`U6` = NewOrderBatch<br>`U7` = NewOrderBatchReject |
| 49 | SenderCompID | String | Y | Client API key (on messages from the client). |
| 56 | TargetCompID | String | Y | Must be `Coinbase` (on messages from client). |
| 34 | MsgSeqNum | Int | Y | Monotonically increasing sequence number of the message. |
| 43 | PossDupFlag | Boolean | C | Indicates that the message was sent in response to a ResendRequest.<br>\- `Y` \- Sent in response to ResendRequest. Should be ignored unless message was not previously processed<br>\- `N` or null - Normal transmission |
| 52 | SendingTime | UTCTimestamp | Y | UTC time that the order was sent down to millisecond resolution in the format `YYYYMMDD-HH:MM:SS.sss` |
| 83 | RptSeq | Int | C | The feed sequence number of the message corresponding to the `RptSeq` in FIX 5.0 Market Data |

### Standard Trailer [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#standard-trailer "Direct link to Standard Trailer")

Fields that go at the end of every message.

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 10 | CheckSum | String | Y | Three byte checksum calculated by summing every byte in the message up to and not including the checksum field itself. This value is then moduloed by `256` and written with prefixed `0` s (if necessary) to meet the 3 byte requirement. |

## Administrative [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#administrative "Direct link to Administrative")

### Logon (35=A) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#logon-35a "Direct link to Logon (35=A)")

First message that is required immediately upon connection to authenticate the connection. `MsgSeqNum` always equals 1 ( `34=1`) on this message in both directions.

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 98 | EncryptMethod | Int | N | Must be `0` (None) |
| 108 | HeartBtInt | Int | O | Must be ≤ `30` (secs). Server sends [Test Request](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#testrequest-351) if client messages are not received in approximately ( `HeartBtInt` x `1.5`) seconds. Server terminates session if client messages are not received in approximately ( `HeartBtInt` x `2`) seconds. Defaults to `10` seconds if not value provided. |
| 141 | ResetSeqNumFlag | Boolean | Y | Resets the sequence number. Defaults to `Y`. <br>Sequence numbers from Customer => Coinbase always get reset after a disconnect.<br>Sequence numbers from Coinbase => Customer are reset after a disconnect if either of these are true: <br>1\. ResetSeqNumFlag not set<br>2\. ResetSeqNumFlag = `Y`<br>3\. Customer was not logged on using same API key more than 1 day. <br>The max possible MsgSeqNum is 2147483647 and customers are responsible for resetting their sessions to avoid breaching this limit. |
| 553 | Username | String | Y | Client API Key. |
| 554 | Password | String | Y | Passphrase for Client API key. |
| 95 | RawDataLength | Int | Y | Number of bytes in `RawData` field. |
| 96 | RawData | String | Y | Client message signature (see [Signing a message](https://docs.cdp.coinbase.com/exchange/docs/rest-auth#signing-a-message)) |
| 1137 | DefaultApplVerID | String | Y | Contains the version of the FIX protocol the exchange uses. Only FIX50SP2 is supported.<br>**Supported values:**<br>`9` = FIX50SP2 |
| 8001 | DefaultSelfTradePreventionStrategy | Char | N | The default SelfTradePreventionStrategy applied to all orders sent on the session unless overridden on a per order basis using the SelfTradeType (7928) in the order request message.<br>The following values specify what to do when two orders submitted by the same portfolio attempt to match:<br>`N` = Cancel aggressing order<br>`Q` = Cancel both orders<br>Default if not specified is Cancel both orders ( `Q`). |
| 8013 | CancelOrdersOnDisconnect | Char | N | `S` = Cancel all session orders on disconnect<br>`Y` = Cancel all profile orders on disconnect **(recommended)** |
| 9406 | DropCopyFlag | Char | N | `N` = Normal order-entry session<br>`Y` = Drop Copy Session that only returns fills (Execution Report - Filled and Execution Report - Partially Filled) |

#### FIX 5.0 Logon Details: [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#fix-50-logon-details "Direct link to FIX 5.0 Logon Details:")

FIX 5.0 is separated into two different layers an application layer and a session layer. The application layer is version 5.0 and the session layer is version T1.1.

- For all LOGON messages use MsgSeqNum 1, set 553 Username to the api key, and only create one session per API Key.
- The begin string will use the session layer version 8=FIXT.1.1
- The application layer version will be specified on the DefaultAppVerID which is tag 1137. This should be set to 9 (This represents version 5.0).
- Sequence numbers must not include leading zeros (e.g., "0001" is invalid, whereas "1" is valid). Using sequence numbers with leading zeros will result in an invalid signature error.
- Fractional seconds must be specified using exactly three digits. For example, 52=20230822-20:43:30.000 is supported, while both 52=20230822-20:43:30 (no fractional seconds) and 52=20230822-20:43:30.123456789 (excessive precision) will result in a signature calculation error.

The Logon message sent by the client must be signed for security. The signing method is shown below. The prehash string is the following fields joined:

`SendingTime, MsgType, MsgSeqNum, SenderCompID (API KEY), TargetCompID, Passphrase`..

There is no trailing separator. The `RawData` field should be a base64 encoding of the HMAC signature.

```codeBlockLines_p187
"""Example Python QuickFIX Application.py logon message setup"""
class Application(fix.Application):
    PASSPHRASE = [ENTER PASSPHRASE]
    API_KEY = [ENTER API_KEY]
    SECRET = [ENTER SECRET]

"""Setup the Logon message & call sign function"""
def toAdmin(self, message, sessionID):
    rawData = self.sign(message.getHeader().getField(52), message.getHeader().getField(35),
                                message.getHeader().getField(34), self.API_KEY, message.getHeader().getField(56),
                                self.PASSPHRASE)
    message.setField(fix.StringField(554, self.PASSPHRASE))
    message.setField(fix.StringField(96, rawData))
    message.setField(fix.StringField(8013, "Y"))
    message.setField(fix.StringField(553, self.API_KEY))
    message.setField(fix.IntField(95, len(rawData.encode('utf-8'))))

"""Create base64 encoded signature"""
def sign(self, timestamp, msg_type, seq_num, api_key, target_comp_id, passphrase):
    message = '\x01'.join([timestamp, msg_type, seq_num, api_key, target_comp_id, passphrase]).encode("utf-8")
    hmac_key = base64.b64decode(self.SECRET)
    signature = hmac.new(hmac_key, message, hashlib.sha256)
    sign_b64 = base64.b64encode(signature.digest()).decode()
    return sign_b64

```



Caution

To establish multiple FIX connections, a unique API key must be generated for each connection. A maximum of 75 connections is allowed per profile. Reusing a single API key for simultaneous connections will result in an error.

#### FIX 5.0 How to resume a session: [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#fix-50-how-to-resume-a-session "Direct link to FIX 5.0 How to resume a session:")

To do a full resume of all data from the last session:

After session disconnect:

- Client LOGON with MsgSeqNum 1 and 141 (ResetSeqNumFlag) = N
- Server responds with a LOGON with MsgSeqNum 1 followed by a Sequence Reset with 36 (NewSeqNo) that the server sends just to communicate the last seqnum from the last session
- Client sends a Resend Request as MsgSeqNum 2 asking for 7 (BeginSeqNo) = 2 and 16 (EndSeqNo) = NewSeqNo from above OR
- If NewSeqNo > 1000 ask for 7 (BeginSeqNo) = 2 and 16 (EndSeqNo) = 1000 with an intent to page all of the Sequence Numbers in blocks of 1000.
  - so the next block would be 7 (BeginSeqNo) = 1001 to 16 (EndSeqNo) = 1999 or NewSeqNo if less than 2000
- We don't replay admin messages or messages older than 1 hour so for any gaps we send a Sequence Reset
- Wait for completed resend before requesting the next page

### Heartbeat (35=0) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#heartbeat-350 "Direct link to Heartbeat (35=0)")

Sent at a prearranged interval from both sides to indicate liveness of the connections and used in response to a [TestRequest](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#testrequest-351) message (35=1).

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 112 | TestReqID | String | C | Conditionally required when the heartbeat message is sent in response to a [TestRequest](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#testrequest-351) (35=1) message. |

### TestRequest (35=1) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#testrequest-351 "Direct link to TestRequest (35=1)")

This message forces the other side of the connection to send a [Heartbeat](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#heartbeat-350) message (35=0) with the `TestReqID` (tag 112) populated with the same value provided on this message.

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 112 | TestReqID | String | Y | A unique identifier used to track the response to a test request. |

### ResendRequest (35=2) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#resendrequest-352 "Direct link to ResendRequest (35=2)")

Sent by the customer to Coinbase to request the retransmission of a range of messages on a given FIX session.

The Coinbase FIX gateway keeps a 4 hour history of messages sent to customers:

- Administrative messages are always replaced by [SequenceReset-GapFill](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#sequencereset-354) messages during retransmission.
- Older non-administrative messages are also replaced by SequenceReset-GapFill messages.
- Retransmitted messages, including SequenceReset-GapFill messages, have PossDupFlag enabled ( `43=Y`) in the header.



Info

The maximum allowed range per request is 1000 messages and only 1 ResendRequest can be processed at a time per session.

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 7 | BeginSeqNo | Int | Y | Sequence number of first message in range to be resent. Must be >= 1 |
| 16 | EndSeqNo | Int | Y | Sequence number of last message in range to be resent. Must be >= 1 and >= BeginSeqNo |

### SequenceReset (35=4) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#sequencereset-354 "Direct link to SequenceReset (35=4)")

Used to skip messages during retransmission. Coinbase only supports "GapFill" mode where GapFillFlag is always true.

Coinbase sends SequenceReset-GapFill messages to customers with or without PossDupFlag (43) in the header:

- Without PossDupFlag: Coinbase sends immediately after logon to reset the Coinbase sequence number to the next outbound sequence number stored for the session.
- With PossDupFlag=Y: Coinbase sends in response to a [ResendRequest](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#resendrequest-352) for all administrative messages, irrespective of time sent, as well as non-administrative messages older than 4 hours.

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 123 | GapFillFlag | Boolean | Y | Always true ( `123=Y`) |
| 36 | NewSeqNo | Int | Y | Must be > 1 |

### Reject (35=3) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#reject-353 "Direct link to Reject (35=3)")

A session level reject message sent when the FIX session can't process a message.

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 45 | RefSeqNum | Int | Y | The `MsgSeqNum` of the referenced message that was rejected. |
| 371 | RefTagID | Int | N | The tag number of the FIX field referenced in the reject. |
| 372 | RegMsgType | String | N | The `MsgType` of the FIX message referenced in the reject. |
| 373 | SessionRejectReason | Int | N | A code to quickly identify common reasons for a reject.<br>**Supported values:**<br>`0` = Invalid Tag Number<br>`1` = Required Tag Missing<br>`2` = Tag not defined for this message type<br>`3` = Undefined tag<br>`4` = Tag specified without a value<br>`5` = Value is incorrect (out of range) for this tag<br>`6` = Incorrect data format for value<br>`8` = Signature problem<br>`9` = `CompID` problem<br>`10` = `SendingTime` Accuracy Problem<br>`11` = Invalid `MsgType`<br>`13` = Tag appears more than once<br>`14` = Tag specified out of required order<br>`15` = Repeating group fields out of order<br>`16` = Incorrect `NumInGroup` count for repeating group<br>`17` = Non "Data" value includes field delimiter (<SOH> character)<br>`18` = Invalid/Unsupported Application Version<br>`99` = Other |
| 58 | Text | String | N | A message explaining why the message was rejected. |

### Logout (35=5) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#logout-355 "Direct link to Logout (35=5)")

Sent by either side to initiate session termination. The side which receives this message first should reply with the same message type to confirm session termination.

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 58 | Text | String | N | Description of the disconnection reason. |

## Trading [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#trading "Direct link to Trading")

### NewOrderSingle (35=D) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#newordersingle-35d "Direct link to NewOrderSingle (35=D)")

Used to submit a new spot order to the Exchange matching engine.



Info

For more information on specific order variants see [Iceberg Orders](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-iceberg), [TPSL Orders](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-tpsl), and [Limit With Funds Orders](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-lwf).

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 11 | ClOrdID | UUID | Y | An identifier specified by the sender to uniquely identify other messages correlating to this request. It must be a variant 1 UUIDv4 that follows the standard format. This means all lowercase and hyphens that group the characters in sequences of 8, 4, 4, 4, 12 (e.g. `1985ca2d-61ef-49f1-bfce-6c39d8462914`). Failure to follow this formatting will result in a reject. <br>This shouldn't match the ClOrdID of any open orders. |
| 18 | ExecInst | Char | N | The execution instruction flags for the order.<br>**Supported values:**<br>`A` = Add Liquidity Only (Post Only) |
| 38 | OrderQty | Decimal | C | The amount of the base asset to be transacted. Required except unless `CashOrderQty` is specified. |
| 1138 | DisplayQty | Decimal | C | Maximum size within an order to be displayed. Must be > 10% of OrderQty |
| 152 | CashOrderQty | Decimal | C | Order size in quote units (e.g., USD) (Market or [Limit order](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-lwf) only). |
| 40 | OrdType | Char | Y | The type of order for the request which can be.<br>**Supported values:**<br>`1` = Market<br>`2` = Limit<br>`4` = Stop Limit<br>`O` = [Take Profit Stop Loss](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-tpsl) |
| 44 | Price | Decimal | C | The limit price for limit orders of the quote asset. The decimal precision must fall within the requirements for each market, see the REST API for precision and decimal limits. |
| 54 | Side | Char | Y | Side of the order.<br>**Supported values:**<br>`1` = Buy<br>`2` = Sell |
| 55 | Symbol | String | Y | Symbol of the instrument being traded (e.g. `BTC-USDC`) |
| 59 | TimeInForce | Char | Y | Specifies how long the order remains in effect.<br>**Supported values:**<br>`1` = Good Till Cancel (GTC)<br>`3` = Immediate Or Cancel (IOC)<br>`4` = Fill Or Kill (FOK)<br>`6` = Good Till Date (GTD) |
| 126 | ExpireTime | UTCTimestamp | C | Required when `TimeInForce` (59) is set to `GTD` (6). Specifies the time when a GTD order expires. Required for GTD orders and should not be set for other orders. The order expires within one second after the specified time. |
| 99 | StopPx | Decimal | C | Specifies the quote price at which the order activates for Stop Limit order types (40=4) |
| 1109 | TriggerPriceDirection | Char | N | **Supported values:**<br>`U` = Trigger if market price goes UP to or through `StopPx` (default if `StopPx` is greater than current market price)<br>`D` = Trigger if market price goes DOWN to or through `StopPx` (default if `StopPx` is less than current market price)<br>_For stop-limit orders, this field is optional but recommended._ |
| 7928 | SelfTradeType | Char | N | The following values specify what to do when two orders are submitted by the same user attempt to match:<br>`D` = Decrement and Cancel (default if not specified)<br>`O` = Cancel Oldest (resting order)<br>`N` = Cancel Newest (aggressing order)<br>`B` = Cancel Both |

### NewOrderBatch (35=U6) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#neworderbatch-35u6 "Direct link to NewOrderBatch (35=U6)")

Used to submit new spot orders to the Exchange matching engine. Clients should use this message to submit multiple orders to the Exchange matching engine at the same time. Currently, all the orders submitted in a batch must be for the same symbol.

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 8014 | BatchID | UUID | Y | An identifier specified by the sender to uniquely identify other messages correlating to this request. It must be a variant 1 UUIDv4 that follows the standard format. This means all lowercase and hyphens that group the characters in sequences of 8, 4, 4, 4, 12 (e.g. `1985ca2d-61ef-49f1-bfce-6c39d8462914`). Failure to follow this formatting will result in a reject. |
| 73 | NoOrders | Int | Y | Number of orders in the request. |
| =>11 | ClOrdID | UUID | Y | An identifier specified by the sender to uniquely identify other messages correlating to this request. It must be a variant 1 UUIDv4 that follows the standard format. This means all lowercase and hyphens that group the characters in sequences of 8, 4, 4, 4, 12 (e.g. `1985ca2d-61ef-49f1-bfce-6c39d8462914`). Failure to follow this formatting will result in a reject. <br>This shouldn't match the ClOrdID of any open orders. Additionally, it shouldn't match any other ClOrdIDs in this batch. |
| =>18 | ExecInst | Char | N | The execution instruction flags for the order.<br>**Supported values:**<br>`A` = Add Liquidity Only (Post Only) |
| =>38 | OrderQty | Decimal | C | The amount of the base asset to be transacted. Required except for market orders with `CashOrderQty` specified. |
| =>152 | CashOrderQty | Decimal | C | The order size in quote units (e.g., USD) (Market order only). |
| =>40 | OrdType | Char | Y | The type of order for the request which can be.<br>**Supported values:**<br>`1` = Market<br>`2` = Limit<br>`4` = Stop Limit |
| =>44 | Price | Decimal | C | The limit price for limit orders of the quote asset. The decimal precision must fall within the requirements for each market, see the REST API for precision and decimal limits. |
| =>54 | Side | Char | Y | Side of the order.<br>**Supported values:**<br>`1` = Buy<br>`2` = Sell |
| =>55 | Symbol | String | Y | Symbol of the instrument being traded (e.g. `BTC-USDC`) |
| =>59 | TimeInForce | Char | Y | Specifies how long the order remains in effect.<br>**Supported values:**<br>`1` = Good Till Cancel (GTC)<br>`3` = Immediate Or Cancel (IOC)<br>`4` = Fill Or Kill (FOK)<br>`6` = Good Till Date (GTD) |
| =>126 | ExpireTime | UTCTimestamp | C | Required when `TimeInForce` (59) is set to GTD (6). Specifies the time when a GTD order expires. Required for GTD orders and should not be set for other orders. The order expires within one second after the specified time. |
| =>99 | StopPx | Decimal | C | Specifies the quote price at which the order activates for Stop Limit order types (40=4). |
| =>7928 | SelfTradeType | Char | N | Represents type of cancel instruction when two orders submitted by the same user attempt to match.<br>**Supported values:**<br>`D` =Decrement and Cancel (default if not specified)<br>`O` =Cancel Oldest (resting order)<br>`N` =Cancel Newest (aggressing order)<br>`B` =Cancel Both |

### NewOrderBatchReject (35=U7) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#neworderbatchreject-35u7 "Direct link to NewOrderBatchReject (35=U7)")

This message is sent by Coinbase Exchange back to clients when all the orders in a [New Order Batch](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#neworderbatch-35u6) (35=U6) Request are rejected. When only some of the orders are rejected, Execution Report - Rejected messages are sent out for each of the orders individually.

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 8014 | BatchID | UUID | Y | Client-supplied ID identifying the new order batch request. |
| 58 | Text | String | Y | The reason the batch of orders was rejected. |

### OrderCancelRequest (35=F) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#ordercancelrequest-35f "Direct link to OrderCancelRequest (35=F)")



Coinbase Recommends

For order cancel requests, Coinbase recommends that you use the same FIX connection that was used to place the order.

Used to cancel an order that is still live on the Exchange matching engine.

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 11 | ClOrdID | UUID | Y | An identifier specified by the sender to uniquely identify other messages correlating to this request. It must be a variant 1 UUIDv4 that follows the standard format. This means all lowercase and hyphens that group the characters in sequences of 8, 4, 4, 4, 12 (e.g. `1985ca2d-61ef-49f1-bfce-6c39d8462914`). Failure to follow this formatting will result in a reject. |
| 37 | OrderID | UUID | Y | The exchange order ID of the order to be canceled. |
| 41 | OrigClOrdID | UUID | Y | The client order ID of the order to be canceled.<br>At least one of `OrigClOrdID` or `OrderID` must be specified. |
| 55 | Symbol | String | Y | Must match the message that the `OrigClOrdID` references. |

### OrderCancelReject (35=9) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#ordercancelreject-359 "Direct link to OrderCancelReject (35=9)")

This message is sent by Coinbase Exchange back to clients to reflect that an order could not be canceled on the matching engine in the following situations:

- When an [Order Cancel Request](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#ordercancelrequest-35f) (35=F) is rejected (CxlRejResponseTo 434=1)
- When an [Order Cancel/Replace Request](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#ordercancelreplacerequest-35g) (35=G) is rejected (CxlRejResponseTo 434=2)
- When an [Order Cancel Batch](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#ordercancelbatch-35u4) (35=U4) is partially rejected (CxlRejResponseTo 434=1)

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 11 | ClOrdID | UUID | Y | Echoed back from the client request. |
| 37 | OrderID | UUID | C | Echoed back from the client request. |
| 41 | OrigClOrdID | UUID | Y | Echoed back from the client request. |
| 58 | Text | String | N | Description of why the order could not be canceled. |
| 39 | OrdStatus | Char | Y | **Always:**<br>`8` = Rejected |
| 102 | CxlRejReason | Int | N | **Supported values:**<br>`1` = Unknown Order<br>`2` = Broker |
| 434 | CxlRejResponseTo | Char | Y | **Supported values:**<br>`1` = Order Cancel Request<br>`2` = Order Cancel/Replace Request |

### OrderCancelBatch (35=U4) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#ordercancelbatch-35u4 "Direct link to OrderCancelBatch (35=U4)")



Coinbase Recommends

For order cancel batch requests, Coinbase recommends that you use the same FIX connection that was used to place the order.

Clients should use this message to cancel multiple orders on the Exchange matching engine at the same time. Currently, all the orders canceled in a batch must be for the same symbol.

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 8014 | BatchID | UUID | Y | Client-supplied ID identifying the order cancel batch request. |
| 73 | NoOrders | Int | Y | Number of orders in the request. |
| =>11 | ClOrdID | UUID | Y | Client-supplied ID identifying the order cancel request. |
| =>37 | OrderID | UUID | Y | The exchange order ID of the order to be canceled. |
| =>41 | OrigClOrdID | UUID | Y | The client order ID of the order to be canceled.<br>At least one of `OrigClOrdID` or `OrderID` must be specified. |
| =>55 | Symbol | String | Y | Must match the message that the `OrigClOrdID` references. |

### OrderCancelBatchReject (35=U5) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#ordercancelbatchreject-35u5 "Direct link to OrderCancelBatchReject (35=U5)")

This message is sent by Coinbase Exchange back to clients when all the orders in an [Order Cancel Batch](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#ordercancelbatch-35u4) (35=U4) Request could not be canceled. When only some of the orders could not be canceled, [Order Cancel Reject](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#ordercancelreject-359) (35=9) messages are sent out for the orders individually.

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 8014 | BatchID | UUID | Y | Client-supplied ID identifying the order cancel batch request. |
| 58 | Text | String | N | The reason the order cancel batch request was rejected. |

### OrderCancelReplaceRequest (35=G) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#ordercancelreplacerequest-35g "Direct link to OrderCancelReplaceRequest (35=G)")



Use Original FIX Connection

You must send order cancel replace requests via the same FIX connection through which the original order was placed.

Clients should use this message to modify a single order on the Exchange matching engine (only order price and order size can be modified). If order quantity is increased or order price is modified, queue priority is lost. Queue priority is maintained when order quantity is decreased.

Modified orders share the same exchange `OrderID`(37) as the parent order.

Orders are modified with "in-flight mitigation" - i.e. any partially filled quantity on the parent order is carried over to the child order and is reflected in the new order's remaining quantity `LeavesQty`(151).

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 11 | ClOrdID | UUID | Y | The client order ID of the new order (that will replace an existing order). <br>This shouldn't match the ClOrdID of any open orders. |
| 37 | OrderID | UUID | Y | An identifier matching the `OrderID` from the [NewOrderSingle](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#newordersingle-35d), [NewOrderBatch](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#neworderbatch-35u6), or [OrderCancelReplaceRequest](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#ordercancelreplacerequest-35g) that this request applies to. |
| 41 | OrigClOrdID | String | Y | An identifier matching the `ClOrdID` from the [NewOrderSingle](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#newordersingle-35d), [NewOrderBatch](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#neworderbatch-35u6), or [OrderCancelReplaceRequest](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#ordercancelreplacerequest-35g) that this request applies to. |
| 38 | OrderQty | Decimal | Y | The new amount of the base asset to be transacted. |
| 44 | Price | Decimal | Y | The new desired limit price of the order. |
| 55 | Symbol | String | Y | Must match the symbol on the message that the `OrigClOrdID` references. |
| 40 | OrdType | Char | Y | **Must be:**<br>`2` = Limit |

### OrderMassCancelRequest (35=q) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#ordermasscancelrequest-35q "Direct link to OrderMassCancelRequest (35=q)")

Sent by customer to Coinbase to request mass cancellation of all orders on a FIX session previously submitted by customer.



Info

At this time, only mass cancels for Trading Sessions are supported ( `530=6`).

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 11 | ClOrdID | UUID | Y | Identifier of the Mass Cancel request (not the order ID to be canceled) |
| 530 | MassCancelRequestType | Char | Y | Type of orders to be canceled: <br>- `6` \- Cancel Orders for a Trading Session |
| 60 | TransactTime | UTCTimestamp | Y | Request timestamp |



Not guaranteed

Like [Cancel on Disconnect](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#:~:text=8013,CancelOrdersOnDisconnect), orders that were sent by the customer, but not yet acknowledged by the exchange, are not guaranteed to be canceled.

### OrderMassCancelReport (35=r) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#ordermasscancelreport-35r "Direct link to OrderMassCancelReport (35=r)")

Sent by Coinbase to the customer as an acknowledgement of an Order Mass Cancel Request for processing or a rejection of the request.

Receipt of a successful Order Mass Cancel Report does not imply that orders were canceled until "Execution Report - Canceled" is sent to customer.

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 11 | ClOrdID | UUID | Y | ID echoed from the Order Mass Cancel Request |
| 530 | MassCancelRequestType | Char | Y | Echoed from the Order Mass Cancel Request: `6` \- Cancel Orders for a Trading Session |
| 531 | MassCancelResponse | Char | Y | If the Order Mass Cancel Request was rejected: <br>- `0` \- Request Rejected<br>If successful, echoed from the request: <br>- `3` \- Cancel Orders for a Product on Profile<br>- `6` \- Cancel Orders for a Trading Session<br>- `7` \- Cancel All Orders on Profile |
| 58 | Text | String | N | A message explaining why the request was rejected |

### ExecutionReport (35=8) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#executionreport-358 "Direct link to ExecutionReport (35=8)")

This message is sent by Coinbase Exchange back to clients to reflect changes to an order's state (accepted, replaced, restated, partially filled, filled, expired, or canceled).

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 11 | ClOrdID | UUID | Y | The client order ID of the (new) order. |
| 37 | OrderID | UUID | Y | A unique identifier assigned by the exchange for the order. |
| 41 | OrigClOrdID | String | C | The client order ID of the parent order for [Order Cancel/Replace Requests](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#ordercancelreplacerequest-35g). |
| 6 | AvgPx | Decimal | C | The volume-weighted average price of all fills on the order. |
| 14 | CumQty | Decimal | C | The cumulative base quantity (e.g. in BTC) filled on the order. |
| 151 | LeavesQty | Decimal | C | The remaining base quantity (e.g. in BTC) on the order.<br>Not sent for market orders that were sent using `CashOrderQty`. |
| 17 | ExecID | UUID | Y | ID identifying this execution report. |
| 39 | OrdStatus | Char | Y | **Supported values:**<br>`0` = New<br>`1` = Partially Filled<br>`2` = Filled<br>`4` = Canceled<br>`5` = Replaced<br>`8` = Rejected<br>`C` = Expired (For IOC expirations) |
| 150 | ExecType | Char | Y | **Supported values:**<br>`0` = New<br>`4` = Canceled<br>`5` = Replaced<br>`8` = Rejected<br>`C` = Expired (For IOC expirations)<br>`D` = Restated (in cases where orders are partially canceled unsolicited due to self-trade prevention)<br>`F` = Trade<br>`I` = Order Status (in response to Order Status Requests) |
| 55 | Symbol | String | Y | The symbol of the order (e.g. BTC-USD). |
| 54 | Side | Char | C | **Supported values:**<br>`1` = Buy<br>`2` = Sell |
| 40 | OrdType | Char | C | **Supported values:**<br>`1` = Market<br>`2` = Limit<br>`4` = Stop Limit |
| 32 | LastQty | Char | C | The base quantity (e.g. in BTC) of the most recent fill on the order when `ExecType` is `F` (Trade). |
| 31 | LastPx | Decimal | C | The price of the most recent fill on the order when `ExecType` is `F` (Trade). |
| 44 | Price | Decimal | C | The limit price of the order. |
| 38 | OrderQty | Decimal | C | The base quantity (e.g. in BTC) of the order. |
| 1138 | DisplayQty | Decimal | C | Maximum size within an order to be displayed. Must be > 10% of OrderQty |
| 198 | SecondaryOrderID | String | C | Assigned by party that accepts the order. Can be used to provide the OrderID (37) used by an exchange or executing system. |
| 152 | CashOrderQty | Decimal | C | The quote quantity (e.g. in USD) of the order.<br>For market orders that were submitted using `CashOrderQty` instead of `OrderQty`, this is the remaining quote quantity of the order. |
| 58 | Text | String | N | Description of why the order was rejected, canceled, or expired. |
| 60 | TransactTime | UTCTimestamp | Y | Matching engine timestamp. |
| 103 | OrdRejReason | Int | N | **Supported values:**<br>`0` = Broker<br>`1` = Unknown Symbol<br>`5` = Unknown Order |
| 378 | ExecRestatementReason | Int | N | **Supported values:**<br>`5` = Partial Decline of `OrderQty` (in cases where orders are partially canceled unsolicited due to self-trade prevention). |
| 1003 | TradeID | String | C | Trade ID for a given fill used for reporting. |
| 1057 | AggressorIndicator | Boolean | C | **Supported values:**<br>`Y` = Taker (if aggressor or auction trade)<br>`N` = Maker |
| 59 | TimeInForce | Char | C | **Supported values:**<br>`1` = GTC<br>`3` = IOC<br>`4` = FOK<br>`6` = GTD |
| 99 | StopPx | Decimal | C | For stop-limit orders, the stop price of the order. |
| 1109 | TriggerPriceDirection | Char | N | For stop-limit orders.<br>**Supported values:**<br>`U` = Trigger if market price goes UP to or through `StopPx`<br>`D` = Trigger if market price goes DOWN to or through `StopPx` |
| 18 | ExecInst | Char | N | **Supported values:**<br>`A` = Add Liquidity Only. |
| 7928 | SelfTradeType | Char | N | **Supported values:**<br>`D` = Decrement and Cancel (default if not specified)<br>`O` = Cancel Oldest (resting order)<br>`N` = Cancel Newest (aggressing order)<br>`B` = Cancel Both |
| 126 | ExpireTime | UTCTimestamp | C | Timestamp at which a GTD order would expire. |
| 136 | NoMiscFees | Int | C | Repeating group for fees charged.<br>Always `1` on an order partial fill or fill. |
| =>137 | MiscFeeAmt | Decimal | C | See `MiscFeeBasis`. |
| =>138 | MiscFeeCurr | String | C | The currency that the fee is charged in. |
| =>139 | MiscFeeType | String | C | **Always:**<br>`4` = Exchange Fees. |
| =>891 | MiscFeeBasis | Int | C | **Supported values:**<br>`0` = Absolute ( `MiscFeeAmt` is in `MiscFeeCurr` terms)<br>`2` = Percentage ( `MiscFeeAmt` should be multiplied by the fill quantity in `MiscFeeCurr` terms to calculate the fee in `MiscFeeCurr` terms) |

### BusinessMessageReject (35=j) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#businessmessagereject-35j "Direct link to BusinessMessageReject (35=j)")

An application level reject message sent when the FIX session can't process a message.

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 45 | RefSeqNum | Int | N | The `MsgSeqNum` of the referenced message that was rejected. |
| 372 | RefMsgType | Int | Y | The message type that this reject message applies to.<br>**Supported values include:**<br>Admin Messages<br>`A` = Logon<br>`0` = Heartbeat<br>`1` = TestRequest<br>`3` = Reject<br>`5` = Logout<br>Application Messages<br>`D` = NewOrderSingle<br>`F` = OrderCancelRequest<br>`G` = OrderCancelReplaceRequest<br>`H` = OrderStatusRequest<br>`j` = BusinessMessageReject<br>`8` = ExecutionReport<br>`9` = OrderCancelReject<br>`U4` = OrderCancelBatch<br>`U5` = OrderCancelBatchReject<br>`U6` = NewOrderBatch<br>`U7` = NewOrderBatchReject |
| 379 | BusinessRejectRefID | String | N | The `ClOrdID`, `OrderID`, `BatchID`, or other identifying ID on the failed request. |
| 380 | BusinessRejectReason | Int | N | A code to quickly identify common reasons for a reject.<br>**Supported values include:**<br>`1` = Other<br>`2` = Unsupported Message Type |
| 58 | Text | String | N | A message explaining why the message was rejected. |

## RFQ [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#rfq "Direct link to RFQ")

### Quote Request (R) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#quote-request-r "Direct link to Quote Request (R)")

A Quote Request (R) is the start of the RFQ process. Coinbase sends a Quote Request to Liquidity Providers (LPs) on behalf of a customer looking to participate in an RFQ trade. LPs respond to a Quote Request with a [Quote](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#quote-s).

| Tag | Name | Type | Required | Notes |
| --- | --- | --- | --- | --- |
| 131 | QuoteReqID | UUID | Y | Unique identifier for RFQ |
| 146 | NoRelatedSym | NumInGroup | Y | Always 1 |
| 55 | Symbol | String32 | Y | Example: `BTC-AVAX` |
| 38 | OrderQty | Float64 | Y | The quantity the customer is looking to trade via RFQ |
| 62 | ValidUntilTime | UTCTimestamp | Y | The time by which quotes must be submitted for the RFQ |
| 126 | ExpireTime | UTCTimestamp | Y | The time by which the RFQ expires if there is no match |
| 136 | NoMiscFees | NumInGroup | Y | Always 1 |
| 137 | MiscFeeAmt | Float64 | Y | Fee as a percentage that Liquidity Providers are charged on a winning Quote. <br>The fee is charged in the currency the LP receives (e.g., in BTC if LP is buying BTC-AVAX, or in AVAX if LP is selling BTC-AVAX). <br>Example: 0.0005 (5 bps) |
| 139 | MiscFeeType | Int32 | Y | Always 4 = Exchange Fees |
| 891 | MiscFeeBasis | Int32 | Y | Always 2 = Percentage |
| 528 | OrderCapacity | Char | Y | A = Agency (default) <br>C = Corporate |

### Quote (S) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#quote-s "Direct link to Quote (S)")

Quote (S) messages are submitted by Liquidity Providers (LP) in response to a [Quote Request](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#quote-request-r) in order to participate in the competitive RFQ auction.

Quotes can be submitted as either a one-way or two-way quote, and must be received by the `ValidUntilTime (62)` specified in the Quote Request. Only one side is traded if the Liquidity Provider wins the RFQ.

| Tag | Name | Type | Required | Notes |
| --- | --- | --- | --- | --- |
| 131 | QuoteReqID | UUID | Y | Unique identifier for RFQ echoed from Quote Request |
| 117 | QuoteID | UUID | Y | Unique identifier for Quote specified by Liquidity Provider |
| 55 | Symbol | String32 | Y | Example: `BTC-AVAX` |
| 132 | BidPx | Float64 | C | Required if submitting bid |
| 133 | OfferPx | Float64 | C | Required if submitting offer |
| 134 | BidSize | String32 | C | Required if submitting bid. Must match `OrderQty (38)` from Quote Request |
| 135 | OfferSize | String32 | C | Required if submitting offer. Must match `OrderQty (38)` from Quote Request |

### Quote Status Report (AI) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#quote-status-report-ai "Direct link to Quote Status Report (AI)")

Quote Status Reports are sent to Liquidity Providers with [Quote](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#quote-s) statuses and expired [Quote Requests](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#quote-request-r).

- If the [Quote](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#quote-s) is rejected b/c validation checks failed or it was sent too late, the response to the quoter is `297=5` (QuoteStatus = Rejected).
- If the [Quote](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#quote-s) is accepted and eligible to participate in an RFQ auction, the response to the quoter is `297=16` (QuoteStatus = Active).
- If the [Quote](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#quote-s) is accepted but not selected for execution, the response to the quoter is `297=17` (QuoteStatus = Canceled).
- If the [Quote](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#quote-s) is accepted and selected for execution, the response to the quoter is `297=19` (QuoteStatus = Pending End Trade), followed by Execution Report - Filled.
- If the [Quote Request](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#quote-request-r) is unmatched by `ExpireTime (126)` on the Quote Request, `297=7` (QuoteStatus = Expired) is broadcast to all LPs.

| Tag | Name | Type | Required | Notes |
| --- | --- | --- | --- | --- |
| 131 | QuoteReqID | UUID | Y | Unique identifier for RFQ echoed from Quote Request |
| 117 | QuoteID | UUID | C | Unique identifier for Quote specified unless QuoteStatus = Expired ( `297=7`) |
| 55 | Symbol | String32 | Y | Example: `BTC-AVAX` |
| 54 | Side | Char | C | Buy: `54=1`, Sell: `54=2`<br>Specified if QuoteStatus=Pending End Trade ( `297=19`) |
| 38 | OrderQty | Float64 | Y | Echoed from Quote Request |
| 132 | BidPx | Float64 | C | Echoed from Quote |
| 133 | OfferPx | Float64 | C | Echoed from Quote |
| 134 | BidSize | Float64 | C | Echoed from Quote |
| 135 | OfferSize | Float64 | C | Echoed from Quote |
| 62 | ValidUntilTime | UTCTimestamp | Y | Echoed from Quote Request |
| 126 | ExpireTime | UTCTimestamp | Y | Echoed from Quote Request |
| 297 | QuoteStatus | Int32 | Y | `5` = **Rejected**: Quote failed validation checks or was sent too late<br>`7` = **Expired**: Quote Request expired w/no match<br>`16` = **Active**: Quote was acknowledged<br>`17` = **Canceled**: Quote not selected b/c LP did not win auction or had insufficient funds<br>`19` = **Pending End Trade**: Quote selected for execution |
| 58 | Text | String | C | Reason the Quote was rejected if QuoteStatus=5<br>Can also be “Unable to hold funds” if QuoteStatus=17 |

### RFQ Request (AH) [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50\#rfq-request-ah "Direct link to RFQ Request (AH)")

Request For Quote (RFQ) allows Liquidity Providers to respond to, and interact with, real-time RFQ requests. The RFQ process begins with [Quote Request (R)](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#quote-request-r).

RFQ is enabled for users who have been approved by Coinbase as a Liquidity Provider. Once approved, clients must send an RFQ Request message ( `35=AH`) after each successful Logon message ( `35=A`) for any session in which they are interested in receiving Quote Requests.

| Tag | Name | Type | Required | Notes |
| --- | --- | --- | --- | --- |
| 644 | RFQReqID | UUID | Y | Unique identifier for RFQ Request |



Tip

_Not_ receiving a response is expected and indicative of a successful RFQ Request.

Last updated on **Feb 4, 2025**

# DOCS/FIX-MSG-OE-ICEBERG

# Exchange Iceberg Orders

Iceberg orders are supported in New Order Single (35=D) [FIX 4.2](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry#new-order-single-d) and [FIX 5.0](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#newordersingle-35d) with the [Create a new order](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postorders) REST API.

Iceberg orders allow you to disclose fills to the market in parts, by sending a [New Order Single (D)](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry#new-order-single-d) with [MaxFloor (111)](https://fiximate.fixtrading.org/en/FIX.Latest/tag111.html):

- A quantity equal to the MaxFloor is displayed on the order book, with the remainder added to the order book at the same price level as the hidden quantity at the end of the queue.
- When the displayed quantity is fully filled, matching logic continues to execute and fill the hidden quantity.
- Once the matching event is completed, if there is still a hidden quantity left, a new displayed order is added to the end of the display order queue, for a size up to MaxFloor.

Changes to the displayed portion of the order, such as replenishes, fills, STPs, or user cancels, are supplied via ExecutionReport with [SecondaryOrderID (198)](https://fiximate.fixtrading.org/en/FIX.Latest/tag198.html).

### Supported Pairs [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-iceberg\#supported-pairs "Direct link to Supported Pairs")

See [Iceberg Orders Supported Trading Pairs](https://help.coinbase.com/en/exchange/trading-and-funding/iceberg-trading).



Note

All trading pairs have Iceberg support in sandbox.

### Sample Message Flow [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-iceberg\#sample-message-flow "Direct link to Sample Message Flow")

In this example message flow, a client submitted a buy order of quantity = 1 and while displaying only 0.3 at a time. (Non-relevant FIX fields and IDs are not shown for brevity.)

**Event 1 - Passive New Order**

A passive Iceberg order is placed with OrderQty=1 ( `38=1`) and MaxFloor=0.3 ( `111=0.3`):

`OrderID123` is _not_ in the Full channel, nor in the Level2 FIX Market Data. Instead, only the displayed portion is shown as `Order456`.

## FIX

## WebSocket Full Channel

## WebSocket Level2 Channel

```codeBlockLines_p187
-> 35=D|55=BTC-USD|40=2|38=1|44=25000|111=0.3
<- 35=8|37=OrderID123|39=New|38=1
// Event generated when the first displayed portion of the order is added to the orderbook
<- 35=8|37=OrderID123|198=OrderID456|39=Restated|378=Broker_Option|38=0.3

```

```codeBlockLines_p187
{"order_id":"OrderID456","order_type":"limit","size":"0.3","price":"25000","type":"received","side":"buy","product_id":"BTC-USD","time":...}
{"order_id":"OrderID456","order_type":"limit","remaining_size":"0.3","price":"25000","type":"open","side":"buy","product_id":"BTC-USD","time":...}

```

```codeBlockLines_p187
{"type":"l2update","product_id":"BTC-USD","changes":[["buy","25000.0000","0.3000"]]...}

```

**Event 2 - MaxFloor Match**

A match takes place with quantity = 0.3.

Once the displayed order is fully filled, a `Done_For_Day` with SecondaryOrderID is sent. This does not mean the Iceberg order is complete. Rather, a replenish event occurs with a different SecondaryOrderID. The new displayed order is added to the end of the queue of the displayed book at the price of 25000.

## FIX

## WebSocket Full Channel

## WebSocket Level2 Channel

```codeBlockLines_p187
<- 35=8|37=OrderID123|198=OrderID456|39=Partially_Filled|32=0.3|151=0.7|14=0.3|137=0.0004
<- 35=8|37=OrderID123|198=OrderID456|39=Done_For_Day|32=0|151=0.7|14=0.3
// Displayed portion replenish event
<- 35=8|37=OrderID123|198=OrderID789|39=Restated|378=Broker_Option|38=0.3

```

```codeBlockLines_p187
{"trade_id":1761595,"maker_order_id":"OrderID456","taker_order_id":"...","size":"0.3","price":"25000","type":"match","side":"buy",...}
{"order_id":"OrderID456","reason":"filled","price":"25000","remaining_size":"0","type":"done","side":"buy","product_id":"BTC-USD",...}
{"order_id":"Order789","order_type":"limit","size":"0.3","price":"25000","type":"received","side":"buy","product_id":"BTC-USD","time":...}
{"order_id":"Order789","order_type":"limit","remaining_size":"0.3","price":"25000","type":"open","side":"buy","product_id":"BTC-USD","time":...}

```

```codeBlockLines_p187
{"type":"l2update","product_id":"BTC-USD","changes":[["buy","25000.0000","0.0000"]]...} {"type":"l2update","product_id":"BTC-USD","changes":[["buy","25000.0000","0.3000"]]...}

```

**Event 3 - Aggressive Order**

An aggressive order takes place with quantity = 0.7.

In this event, a large aggressive order came in. First, the displayed `OrderID789` was filled for 0.3. Then, because the displayed book was empty at the price level of 25000, the matching logic continued to the hidden book at the price level 25000. The hidden `OrderID123` was filled for 0.4. Note that the `Done_For_Day` ExecutionReport does _not_ have a SecondaryOrderID and the the Iceberg order is complete.

## FIX

## WebSocket Full Channel

## WebSocket Level2 Channel

```codeBlockLines_p187
<- 35=8|37=OrderID123|198=OrderID789|39=Partially_Filled|32=0.3|151=0.4|14=0.6|137=0.0004
<- 35=8|37=OrderID123|198=OrderID789|39=Done_For_Day|32=0|151=0.4|14=0.6
<- 35=8|37=OrderID123|39=Partially_Filled|32=0.4|151=0|14=1.0|137=0.00045
<- 35=8|37=OrderID123|39=Done_For_Day|32=0|151=0|14=1.0

```

```codeBlockLines_p187
{"trade_id":1761596,"maker_order_id":"OrderID456","taker_order_id":"...","size":"0.3","price":"25000","type":"match","side":"buy",...}
{"order_id":"OrderID456","reason":"filled","price":"25000","remaining_size":"0","type":"done","side":"buy","product_id":"BTC-USD",...}
{"trade_id":1761596,"maker_order_id":"OrderID123","taker_order_id":"...","size":"0.4","price":"25000","type":"match","side":"buy",...}

```

```codeBlockLines_p187
{"type":"l2update","product_id":"BTC-USD","changes":[["buy","25000.0000","0.0000"]]...}

```

### Trading Rules [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-iceberg\#trading-rules "Direct link to Trading Rules")

To date, the Coinbase Exchange matching engine has followed price/time priority. With the introduction of Iceberg orders, our matching engine is changing to **price/display/time priority**. Regardless of whether they are displayed or hidden, better price orders will have higher priority. At a given price level, all displayed orders will have a higher priority than the hidden portion of the Iceberg orders. Replenish events will add a displayed order to the end of the displayed book at that price level.

### Fees for Non-displayed Fills [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-iceberg\#fees-for-non-displayed-fills "Direct link to Fees for Non-displayed Fills")

Fees are subject to change, but in general:

- Fills for displayed orders are charged with the standard taker/maker fee rate.
- Fills for non-displayed orders are charged with the standard taker/maker fee rate + a **fixed** 0.00005 (half a bps).

Fills can occur as non-displayed when an Iceberg order:

- Is executed as a taker.
- Is resting in the non-displayed book, and a significant taker order clears all displayed orders, eventually executing against this non-displayed order.

### Self Trade Prevention [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-iceberg\#self-trade-prevention "Direct link to Self Trade Prevention")

Displayed and hidden orders will be treated separately. For instance, if you have an Iceberg buy order of OrderQty=1 and MaxFloor=0.3, and you place a sell order with OrderQty=0.2 with SelfTradePrevention=O (Cancel Old), the displayed order is canceled but the hidden order is not. Instead, a replenish event will occur.

- **Cancel Old**: Once the displayed order is touched, the displayed order is canceled and matching continues. If the aggressive order hits the hidden order, the hidden order will then be canceled.
- **Decrement Cancel**: Size matters. The displayed order is first decremented and the matching logic continues. If the hidden order has quantity remaining, a replenish event occurs. If the hidden order is crossed, it will then be decremented.
- **Cancel Both**: This is similar to the approach for Cancel Old. Only the displayed portion gets canceled with the aggressive order. A replenish event occurs, if there is hidden size left.

### Allowed / Not Allowed [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-iceberg\#allowed--not-allowed "Direct link to Allowed / Not Allowed")

#### Allowed [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-iceberg\#allowed "Direct link to Allowed")

- Post Only order with MaxFloor.
- Stop order with MaxFloor.
- MaxFloor must be >= 10% of the OrderQty .

#### Not Yet Allowed [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-iceberg\#not-yet-allowed "Direct link to Not Yet Allowed")

- Batch order with MaxFloor.
- Modifying an Iceberg order.
- Iceberg order in auction mode



Auction Mode Transition

Existing Iceberg orders will be canceled if a product is transitioned to auction mode.

Last updated on **Nov 21, 2024**

# DOCS/FIX-MSG-OE-TPSL

# Exchange Take Profit Stop Loss Orders

Take Profit Stop Loss (TPSL) orders are supported in [FIX 4.2](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry#new-order-single-d) and [FIX 5.0](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#newordersingle-35d) with New Order Single (35=D) and the [Create a new order](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postorders) REST API.

TPSL orders allow users to set predefined profit and loss levels simultaneously for their position.

When an asset price reaches one of the target prices, the position is closed with a limit order. If one of the orders is triggered, the other order is canceled automatically. An order can only have one TP/SL on one side.

## Parameters [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-tpsl\#parameters "Direct link to Parameters")

These parameters are required for TPSL orders:

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 40 | OrdType | Char | Y | Order Type must be `O` (the letter Oh) |
| 44 | Price | Decimal | Y | Take profit price (in this context)<br>_See Price Rules below._ |
| 99 | StopPx | Decimal | Y | Stop loss trigger price |
| 3040 | StopLimitPx | Decimal | Y | Limit order price if stop loss triggers |



Price Rules

- Sell TPSL: `Price` must be > `StopPx` and `StopPx` must be > `StopLimitPx`
- Buy TPSL: `Price` must be < `StopPx` and `StopPx` must be < `StopLimitPx`

## Caveats [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-tpsl\#caveats "Direct link to Caveats")

- Only GTC and GTD are supported for `TimeInForce`
- Like Stop orders, TPSL orders cannot be modified.
- TPSL orders cannot be submitted during auction mode.
- The Post-Only tag is not supported. It cannot be populated or must be false.
- The Iceberg tag is not supported.
- Batch orders are not supported.



Auction Mode Transition

Existing TPSL orders will be canceled if a product is transitioned to auction mode.

## Samples [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-tpsl\#samples "Direct link to Samples")

### TPSL Sell Order [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-tpsl\#tpsl-sell-order "Direct link to TPSL Sell Order")

This TPSL sell order for BTC-USD places a **_live_** sell limit order at price 9785

`Side=2|Price=9785|StopLimitPx=8245|StopPx=8500`

- If the price falls below 8500 and no part of this limit order has been filled, it will be repriced from 9785 to 8245.
- If this limit order is filled or partially filled at 9785, then it will never be repriced.

This differs from regular stop orders where a stop order is NOT live until the price is traded through the StopPx. The direction of the trigger is determined by the Side of the order and thus, `TriggerPriceDirection` is NOT accepted.

### Message Flow [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-tpsl\#message-flow "Direct link to Message Flow")

> TPSL Order Example

`-> OrdType=O|Side=2|Price=9785|StopLimitPx=8245|StopPx=8500...`

> Execution Report Example

`<- MsgType=8|OrdType=O|Side=2|Price=9785|StopLimitPx=8245|StopPx=8500...`

> Repricing Example

If the stop is triggered and the order is repriced, an ExecutionReport is returned with a RestatementReason of `3` for "Repricing of order":

`<- MsgType=8|OrdType=O|ExecType=D|ExecRestatementReason=3|Price=8245...`

### WebSocket User Channel [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-tpsl\#websocket-user-channel "Direct link to WebSocket User Channel")

If the stop is triggered and the order is repriced, a change message is published, for example:

```codeBlockLines_p187
{
    "new_price": "8245",
    "order_id": "...",
    "type": "change",
    "side": "sell",
    "old_price": "9785",
    "reason": "tpsl_triggered"
}

```

Only the user channel with your TPSL order displays with `tpsl_triggered`. Other clients will receive change reason, `modify_order`.

Last updated on **Feb 25, 2025**

# DOCS/FIX-MSG-OE-LWF

# Exchange Limit With Funds Orders

Limit With Funds (LWF) orders allow users to fully execute an order up to a notional value specified in the product quote currency.



Info

LWF orders are supported in [FIX 4.2](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry#new-order-single-d) and [FIX 5.0](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#newordersingle-35d).

## Parameters [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-lwf\#parameters "Direct link to Parameters")

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 40 | OrdType | Char | Y | Order Type must be `2` (Limit) |
| 152 | CashOrderQty | Decimal | Y | The notional value you wish to trade |

All values for `TimeInForce`, `SelfTradePrevention`, and `PostOnly` are supported.



Caution

You must not define `OrderQty` when submitting a limit order with `CashOrderQty`.

## Summary [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-lwf\#summary "Direct link to Summary")



Note

`CashOrderQty` on limit orders is available for both buy and sell orders despite the following example featuring a buy order.

Today, if you want to trade $30,000 worth of BTC, you might submit a market order:

`OrdType=1|Side=1|CashOrderQty=30000`

However, a market order leaves the executed price out of the client's control.

With the following market state:

| Bid Size | Bid | Ask | Ask Size |
| --- | --- | --- | --- |
|  |  | 60,000 | 10 |
| 10 | 59,000 |  |  |

You can try to trade $30,000 of BTC by placing a limit buy order. To do this you must perform the `notional/price` division to calculate the necessary `OrderQty`. The resulting order would look like:

`OrdType=2|Side=1|Price=60000|OrderQty=0.5`

If this order is filled at $2,000, then everything works as intended. In actuality, the market may change from the time in between when the user submits the order and when it is received by the exchange.

To illustrate, consider the case where the market state has changed to the following at the time when the exchange receives your order:

| Bid Size | Bid | Ask | Ask Size |
| --- | --- | --- | --- |
|  |  | 59,000 | 10 |
| 10 | 58,999 |  |  |

Your order now fills at $59,000 for quantity `0.5`. The resulting notional for this trade is $29,500, which is less than what you originally wanted.

To solve this issue, you can specify `CashOrderQty` instead of `OrderQty`:

`OrdType=2|Side=1|Price=60000|CashOrderQty=30000`

Given the same market state:

| Bid Size | Bid | Ask | Ask Size |
| --- | --- | --- | --- |
|  |  | 59,000 | 10 |
| 10 | 58,999 |  |  |

The order will be filled as taker with quantity `0.50847457`, making the total notional of this order $29,999.9996.

In a separate example, with the following market state:

| Bid Size | Bid | Ask | Ask Size |
| --- | --- | --- | --- |
|  |  | 60,500 | 1 |
|  |  | 59,500 | 0.3 |
| 10 | 59,999 |  |  |

Your order will fill as a taker at price $59,500 with quantity `0.3`. Thus only $17850 notional will be filled. The remaining $12,150 notional will then rest on the book at price $60,000 with quantity `0.2025`.

## Caveats [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-lwf\#caveats "Direct link to Caveats")

- Orders may be filled at less than the notional specified due to fees and truncation of product base increment.
- [TPSL](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-tpsl) / [Iceberg](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-iceberg) / [Stop](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postorders/#stop-orders) / [Batch](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#neworderbatch-35u6) orders are not be supported with this feature.
- [OrderCancelReplaceRequest](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry-50#ordercancelreplacerequest-35g) with `CashOrderQty` is not supported.

## Market Data [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-lwf\#market-data "Direct link to Market Data")

- `OrderQty`/ `CumQty`/ `LeavesQty` is supplied in all Execution Reports. In particular `OrderQty` is calculated after the order has been processed as a taker (i.e., it is **NOT** calculated with `CashOrderQty / Price`), such that all quantity tags are consistent with one another.
- `Size` field is populated in all WebSocket feed messages. No changes are expected from the perspective of a WebSocket consumer.

## Examples [](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-oe-lwf\#examples "Direct link to Examples")

In the following examples, all irrelevant tags are omitted.

**Example 1 - A buy GTC order partially fills before resting**

```codeBlockLines_p187
$> -> BeginString=FIX.4.2 MsgType=ORDER_SINGLE OrdType=LIMIT Price=2952 Side=BUY Symbol=ETH-USD TimeInForce=GOOD_TILL_CANCEL CashOrderQty=1000 CheckSum=026

$> <- BeginString=FIX.4.2 MsgType=EXECUTION_REPORT CumQty=0 ExecID=07debc62-aa75-4734-b1b5-91eb9ce8d49c ExecTransType=NEW OrderID=fa5d17b0-8344-4237-ab33-8c658595f960 OrderQty=0.33740512 OrdStatus=NEW Price=2952 Side=BUY Symbol=ETH-USD TransactTime=20240529-20:59:24.039 ExecType=NEW LeavesQty=0.33740512 CashOrderQty=996.01591424 CheckSum=091

```

Note that the value of `CashOrderQty` in the ExecutionReport is not $1,000 due to fees and base increment truncation.

```codeBlockLines_p187
$> <- BeginString=FIX.4.2 MsgType=EXECUTION_REPORT AvgPx=2951.81 CumQty=0.01 ExecID=d7b9d643-5567-5ba1-ae59-eca93bc15723 ExecTransType=NEW LastPx=2951.81 LastShares=0.01 OrderID=fa5d17b0-8344-4237-ab33-8c658595f960 OrderQty=0.33740512 OrdStatus=PARTIALLY_FILLED Price=2951.81 Side=BUY Symbol=ETH-USD TransactTime=20240529-20:59:24.039 ExecType=PARTIAL_FILL LeavesQty=0.32740512 1003=1267476 AggressorIndicator=YES

$> <- BeginString=FIX.4.2 MsgType=EXECUTION_REPORT AvgPx=2951.8666666666666667 CumQty=0.03 ExecID=83a0385b-96f4-532b-a704-cc8fbcbfecd8 ExecTransType=NEW LastPx=2951.92 LastShares=0.006 OrderID=fa5d17b0-8344-4237-ab33-8c658595f960 OrderQty=0.33740512 OrdStatus=PARTIALLY_FILLED Price=2951.92 Side=BUY Symbol=ETH-USD TransactTime=20240529-20:59:24.039 NoMiscFees=1 MiscFeeAmt=0.004 MiscFeeCurr=USD MiscFeeType=EXCHANGE_FEES ExecType=PARTIAL_FILL LeavesQty=0.30740512 MiscFeeBasis=Percentage 1003=1267479 AggressorIndicator=YES CheckSum=124

```

Your order fills as a taker with a notional of `0.03 * $2951.86666... = $88.556`.

The remaining notional of `$996.01591412 - $88.556 = $907.45991412` will rest on the book with a quantity of `$907.45991412 / $2952 = 0.30740512`.

Note that `OrderQty = CumQty + LeavesQty`. In the case of this specific order we have: `0.03 + 0.30740512 = 0.33740512`.

The order is now rested on the book and be filled as passive.

```codeBlockLines_p187
$> <- BeginString=FIX.4.2 MsgType=EXECUTION_REPORT AvgPx=2951.9 CumQty=0.04 ExecID=ef6a5354-e928-5815-b55b-46361fea6423 ExecTransType=NEW LastPx=2952 LastShares=0.01 OrderID=fa5d17b0-8344-4237-ab33-8c658595f960 OrderQty=0.33740512 OrdStatus=PARTIALLY_FILLED Price=2952 Side=BUY Symbol=ETH-USD TransactTime=20240529-20:59:51.230 NoMiscFees=1 MiscFeeAmt=0.0025 MiscFeeCurr=USD MiscFeeType=EXCHANGE_FEES ExecType=PARTIAL_FILL LeavesQty=0.29740512 MiscFeeBasis=Percentage AggressorIndicator=NO

```

**Example 2 - A buy IOC order that results in no fills**

```codeBlockLines_p187
$> -> BeginString=FIX.4.2 MsgType=ORDER_SINGLE ClOrdID=a79d33c4-7cc1-4948-b318-b878b5fbcc72 OrdType=LIMIT Price=1 Side=BUY Symbol=ETH-USD TimeInForce=IMMEDIATE_OR_CANCEL TransactTime=20240530-14:40:07.180 CashOrderQty=1000

$> <- BeginString=FIX.4.2 MsgType=EXECUTION_REPORT ClOrdID=a79d33c4-7cc1-4948-b318-b878b5fbcc72 CumQty=0 ExecID=087c5712-6805-4e66-83b6-81c9fc92a78e ExecTransType=NEW OrderID=34cf5775-eee6-462b-8db0-9ec51f212663 OrderQty=0 OrdStatus=NEW Price=1 Side=BUY Symbol=ETH-USD TransactTime=20240530-14:40:07.245 ExecType=NEW LeavesQty=0 CashOrderQty=0 CheckSum=003

$> <- BeginString=FIX.4.2 MsgType=EXECUTION_REPORT SenderCompID=Coinbase SendingTime=20240530-14:40:07.247 CumQty=0 ExecID=fcce5dea-9e83-492a-909c-30253e0b0d2f ExecTransType=NEW OrderID=34cf5775-eee6-462b-8db0-9ec51f212663 OrderQty=0 OrdStatus=CANCELED Price=1 Side=BUY Symbol=ETH-USD Text=101:Time In Force TransactTime=20240530-14:40:07.245 ExecType=CANCELED LeavesQty=0 CheckSum=214

```

Note that `OrderQty` is `0` in this case and this order will not be published in public WebSocket channels. It appears in the user channel only for this particular client.

**Example 3 - A sell GTC order with Self Trade Prevention (decrement and cancel)**

```codeBlockLines_p187
$> -> BeginString=FIX.4.2 MsgType=ORDER_SINGLE MsgSeqNum=41 ClOrdID=26dbf769-d812-4b0a-892a-bdf226387c0c OrdType=LIMIT Price=39944 Side=SELL Symbol=BTC-USD TimeInForce=GOOD_TILL_CANCEL TransactTime=20240531-14:24:32.566 CashOrderQty=10000 SelfTradePrevention=DECREMENT_AND_CANCEL CheckSum=225

$> <- BeginString=FIX.4.2 BodyLength=367 MsgType=EXECUTION_REPORT MsgSeqNum=48 SenderCompID=Coinbase SendingTime=20240531-14:24:32.705 ClOrdID=26dbf769-d812-4b0a-892a-bdf226387c0c CumQty=0 ExecID=f4054875-f834-409b-824a-2466bd3c066c ExecTransType=NEW OrderID=e19138ee-f97b-4bce-8cbe-ac8f6105ce30 OrderQty=0.2503 OrdStatus=NEW Price=39944 Side=SELL Symbol=BTC-USD TransactTime=20240531-14:24:32.702 ExecType=NEW LeavesQty=0.2503 CashOrderQty=9998.273235 CheckSum=061

$> <- BeginString=FIX.4.2 MsgType=EXECUTION_REPORT MsgSeqNum=49 AvgPx=39949.3007 CumQty=0.05 ExecID=0aaee39c-fc85-5d82-b6f2-07d9b5b9d02a ExecTransType=NEW LastPx=39949.3007 LastShares=0.05 OrderID=e19138ee-f97b-4bce-8cbe-ac8f6105ce30 OrderQty=0.2503 OrdStatus=PARTIALLY_FILLED Price=39949.3007 Side=SELL Symbol=BTC-USD TransactTime=20240531-14:24:32.702 ExecType=PARTIAL_FILL LeavesQty=0.2003 MiscFeeBasis=Percentage 1003=23863011 AggressorIndicator=YES CheckSum=130

$> <- BeginString=FIX.4.2 MsgType=EXECUTION_REPORT MsgSeqNum=50 AvgPx=39949.3007 CumQty=0.05 ExecID=30e4d848-a18b-469e-925a-1dbc83c17aea ExecTransType=NEW OrderID=e19138ee-f97b-4bce-8cbe-ac8f6105ce30 OrderQty=0.2253 OrdStatus=PARTIALLY_FILLED Price=39945 Side=SELL Symbol=BTC-USD TransactTime=20240531-14:24:32.702 ExecType=RESTATED LeavesQty=0.1753 ExecRestatementReason=PARTIAL_DECLINE_OF_ORDERQTY CheckSum=044

```

And this is the buy order with `LeavesQty` of `0.025` that was self trade cancelled:

```codeBlockLines_p187
$> <- BeginString=FIX.4.2 MsgType=EXECUTION_REPORT MsgSeqNum=51 CumQty=0 ExecID=0f4f96ad-160a-49a3-add0-eb25196fed70 ExecTransType=NEW OrderID=ca7e5097-cb6f-4381-8da8-629bc2656217 OrderQty=0.025 OrdStatus=CANCELED Price=39945 Side=BUY Symbol=BTC-USD Text=102:Self Trade Prevention TransactTime=20240531-14:24:32.702 ExecType=CANCELED LeavesQty=0 CheckSum=055

```

Last updated on **Mar 3, 2025**