# Deribit Connection and Infrastructure Documentation

## Support Articles

# Rate Limits

- Updated 3 days ago

### Caution

#### **Exchange-Wide Compliance (OTV & API Usage Policy)**

All API traffic—whether authenticated or public—**must follow Deribit’s broader
trading-integrity rules**, including the **Order-to-Volume (OTV) limits** and
other anti-abuse protections. Violations can trigger immediate session
disconnects, additional throttling, or stronger enforcement actions.

For full guidelines, please review our
[API Usage Policy](/hc/en-us/articles/25944617449373#UUID-56019658-17b2-b28e-ee98-3335977015d2 "API Usage Policy")
(which also covers OTV thresholds and other exchange-abuse rules).

To maintain fair and stable access to our API, Deribit uses a credit-based rate
limiting system. This system ensures efficient use of platform resources while
accommodating different trading volumes.

#### **Credit-Based System**

Each API request consumes a certain number of credits. The refill rate and
maximum credit pool for your account depend on your trading activity and tier.
**If a request arrives when no credits remain, we immediately send a**
`too_many_requests` **(**`code 10028`**) or similar error and terminate the
session.** After a disconnect, you must wait for credits to replenish and then
re-establish a new connection before sending additional requests.

Key elements of this system include:

#### **Credit Refill**

Credits are **replenished continuously at a fixed rate**, depending on your
account’s tier. This refill acts like a **leaky bucket**: each second, a certain
number of credits “drip” back into your account’s credit pool. You can think of
this as a “credits per second” (CPS) refill rate.

- **Example**: If your refill rate is 20 credits/second, and each request costs
  1 credit, you can sustainably send 20 requests per second without depleting
  your credits.
- The refill continues **even when you’re not making requests**, allowing you to
  accumulate credits back up to your **maximum credit limit**.
- If your maximum credit cap is 200 and your refill rate is 20 credits/sec, it
  will take 10 seconds to fully refill from 0 to 200.

This refill mechanism helps to:

- Allow **burst activity** (e.g., submitting multiple orders at once), as long
  as it doesn’t exceed the maximum credit limit.
- Encourage **consistent and predictable usage**, minimizing sudden surges that
  could strain the system.

#### **Maximum Credits**

This is the **upper bound** of your available credit pool. You cannot accumulate
more credits than this cap, regardless of how long you wait. It determines the
size of request bursts you can make.

#### **Cost per Request**

Each API endpoint consumes a different number of credits. More
resource-intensive endpoints may cost more than lightweight ones.

### Tip

Using WebSocket subscriptions for real-time data reduces REST credit
consumption.

### Important

The `public/get_instruments` endpoint has a unique rate limit: 1 request per 10
seconds, with a burst allowance of 5. This limit is enforced separately from the
standard credit system.

### Warning

#### **Webpage Usage Also Consumes API Credits**

Please note that using the
[**Deribit web platform**](https://www.deribit.com/futures/BTC-PERPETUAL) also
generates API requests behind the scenes. This means **browsing certain pages
(e.g., order book, positions, account info)** can **consume credits from your
API rate limit**, just like programmatic API calls.

If you are running automated scripts or trading bots in parallel with an open
Deribit web session, you may reach your credit limit more quickly than expected.
When this happens, you may receive a `too_many_requests` error (code `10028`),
even if your script appears to be within the expected request volume.

To optimize performance:

- **Avoid keeping multiple browser tabs open** on data-intensive pages.
- Consider logging out of the web interface when running high-frequency
  strategies.

#### **Matching vs Non-Matching Engine Requests**

There are two main categories of API requests:

- **Matching engine requests**: These interact with the order book, such as
  placing or cancelling an order.
- **Non-matching engine requests**: These involve general queries, such as
  retrieving account information or market data.

Each type of request consumes credits at a different rate.

#### **Default Settings for Non-Matching Engine Requests**

- **Cost per Request**: 500 credits.
- **Maximum Credits**: 50,000 credits.
- **Refill Rate**: Credits are refilled at a rate that allows up to 20 requests
  per second (10,000 credits per second).
- **Burst Capacity**: Allows up to 100 requests at once, considering the maximum
  credit pool.

**Matching Engine Requests** 

Each sub-account has an hourly updated rate limit, applicable across all books.
Users can check their current rate limits via the
[**/private/get_account_summary**](https://docs.deribit.com/#private-get_account_summary)
method.

<table><tbody><tr><td><p><span class="bold"><strong>Tier Level</strong></span>&nbsp;</p></td><td><p><span class="bold"><strong>7-Day Trading Volume</strong></span>&nbsp;</p></td><td><p><span class="bold"><strong>Sustained Rate Limit (Requests/Second)</strong></span>&nbsp;</p></td><td><p><span class="bold"><strong>Burst Rate Limit</strong></span>&nbsp;</p></td><td><p><span class="bold"><strong>Description</strong></span>&nbsp;</p></td></tr><tr><td><p><span class="bold"><strong>Tier 1</strong></span>&nbsp;</p></td><td><p>Over USD 25 million</p></td><td><p>30 requests/second</p></td><td><p>100 requests (burst)</p></td><td><p>Suitable for high-volume traders, allowing up to 100 requests in a rapid burst or a steady rate of 30 requests per second.</p></td></tr><tr><td><p><span class="bold"><strong>Tier 2</strong></span>&nbsp;</p></td><td><p>Over USD 5 million</p></td><td><p>20 requests/second</p></td><td><p>50 requests (burst)</p></td><td><p>Designed for medium-volume traders, permitting up to 50 requests in a burst or 20 requests per second.</p></td></tr><tr><td><p><span class="bold"><strong>Tier 3</strong></span>&nbsp;</p></td><td><p>Over USD 1 million</p></td><td><p>10 requests/second</p></td><td><p>30 requests (burst)</p></td><td><p>Appropriate for active traders, enabling up to 30 requests in a burst or 10 requests per second.</p></td></tr><tr><td><p><span class="bold"><strong>Tier 4</strong></span>&nbsp;</p></td><td><p>Up to USD 1 million</p></td><td><p>5 requests/second</p></td><td><p>20 requests (burst)</p></td><td><p>For regular traders, allowing up to 20 requests in a burst or a steady rate of 5 requests per second.</p></td></tr></tbody></table>

### Important

#### **Public Access Limitations**

Public, **non-authorized** API requests are rate-limited on a **per-IP
basis**—they do not draw from the account-level credit pool. If an IP exceeds
its public request allowance, subsequent calls may be **temporarily rejected**
or the connection **disconnected** to protect platform stability.

Whenever possible, use **authorized requests tied to your API key**.
Authenticated traffic benefits from:

- **Higher and more transparent limits** that scale with your account’s tier.
- **Client-ID visibility**, letting us distinguish heavy legitimate usage from
  abusive traffic—so rather than an immediate block, we can apply graduated
  safeguards if your limit is exceeded.

In short, authorized requests are always the safer, more reliable option for
sustained or high-frequency access.

### Important

Production and
[Testnet environment](/hc/en-us/articles/#UUID-fff4d97c-2873-59b1-b9d0-df2e24468be3 "Register at Testnet Deribit")
operate **on separate, independently-tracked rate-limit pools**. **Limits are
not shared** between environments—exceeding Testnet limits will not affect your
Production credits, and vice-versa.

#### Checking current rate limits

Users can access the current rate limits by calling the
[**/private/get_account_summary**](https://docs.deribit.com/next/#private-get_account_summary)
method and receiving `limits` field in response. The configuration of rate
limits can be either on a per-currency basis or a default set applied globally
across all currencies. Per-currency limits are not the default setting and are
enabled only for specific clients upon request.

### Notice

Per-currency rate limits currently are used **exclusively to decrease** access
limits for specific currencies when needed. They are not applied to increase
rate limits.

#### **Limits field**

`non_matching_engine`: Describes rate limits applicable to requests that do not
involve the matching engine. Defined by:

- `burst`: The maximum number of requests permitted in a short burst.
- `rate`: The sustained number of requests allowed over time.

`matching_engine`: Outlines rate limits related to operations that utilize the
matching engine, with the following structure:

#### **Common Limits for All Configurations**

#### **Spot and Cancel Limits**

- `spot`: Applies to spot trading between two different currencies.
- `cancel_all`: Used when canceling all orders globally or by label without
  specifying a currency.

#### **Global vs. Per-Currency Limits**

- When `limits_per_currency` **\=** `false`, limits apply globally:

  - `trading`: Overall trading operations
  - `maximum_quotes`: Total number of quotes
  - `maximum_mass_quotes`: Mass quoting operations
  - `guaranteed_mass_quotes`: Guaranteed mass quotes

- When `limits_per_currency` **\=** `true`, limits are set **per settlement
  currency** under the `matching_engine` object:

  - Each currency key includes:

    - `trading`: Per-currency trading limits
    - `maximum_quotes`: Per-currency quote limits
    - `maximum_mass_quotes`: Per-currency mass quoting limits
    - `guaranteed_mass_quotes`: Per-currency guaranteed mass quotes

#### **Cancel Endpoint Logic**

- [**private/cancel_all**](https://docs.deribit.com/#private-cancel_all): Uses
  the global `cancel_all` limit.
- [**private/cancel_all_by_currency**](https://docs.deribit.com/#private-cancel_all_by_currency)**/**[**instrument**](https://docs.deribit.com/#private-cancel_all_by_instrument):
  Applies the relevant trading or spot limit for the specified currency or
  instrument.
- [**private/cancel_all_by_kind_or_type**](https://docs.deribit.com/#private-cancel_all_by_kind_or_type):

  - No currency specified → uses cancel_all
  - Specific currency → uses per-currency trading limit
  - Spot instrument → uses spot limit

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

#### **Matching Engine Requests Overview**

All requests **not listed below** are treated as **non-matching engine**
requests.

- `private/buy` 
- `private/sell` 
- `private/edit` 
- `private/edit_by_label` 
- `private/cancel` 
- `private/cancel_by_label` 
- `private/cancel_all` 
- `private/cancel_all_by_instrument` 
- `private/cancel_all_by_currency` 
- `private/cancel_all_by_kind_or_type` 
- `private/close_position` 
- `private/verify_block_trade` 
- `private/execute_block_trade` 
- `private/move_positions` 
- `private/mass_quote` 
- `private/cancel_quotes` 
- `private/add_block_rfq_quote` 
- `private/edit_block_rfq_quote` 
- `private/cancel_block_rfq_quote` 
- `private/cancel_all_block_rfq_quotes` 

#### **FIX Message Types**

- `new_order_single` 
- `order_cancel_request` 
- `order_mass_cancel_request` 
- `order_cancel_replace_request` 
- `mass_quote` 
- `quote_cancel`

# Connection Management

- Updated 3 days ago

Users can connect to the Deribit platform using either a **connection-scoped**
or **session-scoped** authentication token. Each approach has different
properties, lifespans, and limitations. Understanding how these scopes work
helps ensure reliable connectivity, optimal use of WebSocket features, and
compliance with platform limits such as the number of simultaneous connections
or sessions per API key.

#### Limits

- Max number of subaccounts: **20**
- Max number of API keys per (sub)account: **8**
- Max number of connections per IP: **32**
- Max number of sessions per API key: **16**

## Connection[](#heading-1)

A **connection** is a single, continuous link between a client and a server over
a network. Users can authenticate with the `connection` scope, and these
authentication connections are **not counted against the limit**. When neither
`connection` nor `session` scope is specified in the request, the server will
default to using the `connection` scope.

**Connection scope**

- Tokens are valid only during the active connection. Once the connection is
  terminated, the tokens become invalid, requiring a new authentication process
  for a new connection.
- Access and refresh tokens are strictly tied to the specific connection in
  which they were granted.

### Caution

**A maximum of 32 simultaneous connections per IP** address is allowed. This
includes all types of connections — both with connection and session scope. For
example, you may have 16 `session`\-scoped and 16 `connection`\-scoped
connections, or 1 session and 31 standard connections. Any 33rd connection
attempt from the same IP will be rejected and HTTP 429 will be returned.

### Note

The Deribit **webpage uses 2 active connections per user session**. Keep this in
mind when designing high-frequency or multi-tab integrations to avoid
unintentionally exceeding the limit.

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
- **A maximum of 16 sessions per API key is allowed**. When session 17 is opened
  the Deribit removes the one that was not refreshed in the longest time.

## Best Practices for Efficient and Reliable Connection Management[](#heading-3)

1.  **Prefer Subscriptions Over REST Polling** 

    - Use WebSocket [**subscriptions**](https://docs.deribit.com/#subscriptions)
      (e.g., subscribe) whenever possible instead of continuously polling data
      via REST endpoints.
    - Subscriptions are **more efficient**, reduce latency, and help stay within
      [rate limits](/hc/en-us/articles/25944617523357#UUID-9325394c-bca6-d0a5-291f-b19978b3ca89 "Rate Limits").

2.  **Do Not Use WebSocket Like REST** 

    - Avoid patterns like:

      Open session → Read once → Close → Repeat.

      This is inefficient and may lead to **connection churn** and throttling.

    - Instead, **keep sessions open** and use **real-time subscriptions** or
      batched requests.

3.  **Use Authenticated Requests Whenever Possible** 

    - Even for public data, prefer **authenticated WebSocket connections**.
    - Authenticated users benefit from **higher rate limits** and are **less
      likely to be IP rate-limited** or disconnected.
    - If any abuse or misuse is detected, we **proactively reach out** to
      authenticated clients before taking restrictive measures.

4.  **Avoid Overloading Your Connection** 

    - Subscribing to **too many channels at once** can cause a
      `connection_too_slow` error. This happens when the client **cannot read
      all incoming events fast enough**, causing a **backlog** of pending
      messages.
    - To avoid disconnection:

      - Only subscribe to necessary channels.
      - Make sure your client reads and processes messages efficiently and
        continuously.

## HTTP Connection Lifetime[](#heading-4)

Each established HTTP connection has an expiration timer of 15 minutes. Users
wishing to maintain an HTTP connection beyond this period should utilize
signature authorization for continued access without impacting session limits.

## Cancel on disconnect[](#heading-5)

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

# API Usage Policy

- Updated 3 months ago

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

# Server Infrastructure

- Updated 3 months ago

## Server Infrastructure[](#heading-1)

Deribit infrastructure is hosted in Equinix LD4 in Slough (UK). Traders can
connect to our infrastructure in multiple ways: 

- Colocation of up to 2U per customer in Deribit client rack
- Cross-connect from client's own servers in LD4  
- In partnership with Beeks Financial ([link](https://www.beeksgroup.com/)),
  UltraFX ([link](http://www.ultrafxvps.com/)), AWS
  ([link](https://insights.deribit.com/industry/deribit-extends-customer-trading-service-using-cloudnations-advanced-cloud-networking/)),
  LiquidityConnect ([link](https://liqc.com/?ref=Liquidityconnect.com)) or
  [Avelacom](https://avelacom.com/) clients can get access via a virtual setup
  within LD4.
- Connectivity via internet

You can still use www.deribit.com from the hosted servers. However, this traffic
will be routed through the load balancer. You may consider using a direct
connection as a better connectivity option.

The connection of the cross-connect will be done through BGP. Deribit will
provide different /24 subnets from the 172.16.0.0/12 block to establish the
connection to third parties. Details of the BGP peering will be provided once a
cross-connect is requested.

IP & Ports: 

- www.deribit.com (load balancer)
- 443 - HTTPS
- 9881-FIX
- 9883-FIX SSL

[](https://support.deribit.com/hc/article_attachments/25944673358237)[![Deribit Global System Structure](/hc/article_attachments/25944673358237)](/hc/article_attachments/25944673358237)

## Hosting in the Client Rack[](#heading-2)

Clients can order a server for £250 + VAT (per server) a month.

Service includes:

- One hour of smart hands service for installation
- Hosting
- Energy consumption
- 50 Mbps ISP
- Cross-Connect to Deribit

The patch will be done with a Twinax cable. These cables are 5m long and are
rate limited to 1 Gbit. Deribit offers a primary and a secondary link.
Therefore, two available ports are needed to cross-connect to our
infrastructure. Patches to other destinations need to land directly into the
client's server (no switch). Deribit will not procure clients' servers.

Clients are not able to add network equipment (e.g. firewall to terminate the
internet handoff). This service requires the signing of a hosting agreement.
Therefore, if interested, don't hesitate to get in touch with
[support@deribit.com](mailto:support@deribit.com) for more information.

**Server requirements:**

- 2U Maximum
- The server must be of proper quality (not self assembled, no loose parts, etc)
- The server must be 19" rackmountable using sliding rackrails
- The server needs to have a redundant PSU with c14 connectors
- The server needs to have at least 1 IPMI or ILO port
- The server needs to have at least 2x10 Gbit SFP+ ports
- The server needs to have at least 2x1 Gbit RJ45 ports
- Both the 2xRJ45 ports and 2xSFP+ ports need to be set up in an active-passive
  bond (or teaming in Windows). We will not support LACP. The static IP
  addresses for both bonds/teams will be supplied by DRB Hosting
- Both the RJ45 and SFP+ ports that are being used to connect to our switches
  have to be labeled. The RJ45 ports for internet access have to be labeled as
  inet1 and inet2, the SFP+ ports have to be labeled as colo1 and colo2
- The server needs to have a label with the Client’s name
- The IPMI interface has to be configured with a static IP address supplied by
  DRB Hosting
- Network connectivity must be at the hot (back) side of the server

## Cross Connects [](#heading-3)

For cross-connect, we recommend an LC-LC 10 Gb 50/125 OM3 fibre connection. The
cross-connect should be a 10-gigabit cross-connect. Deribit will use policing on
its switch to have an effective speed of 1-gigabit. It is mandatory to have a
secondary, redundant cross connection.

Cross connects from Deribit's perspective are free. Clients only need to pay the
Equinix fees. If you would like to cross-connect, please get in touch with your
Equinix manager to request the service, and please write at systems@deribit.com
to receive the LOA (valid for both the primary/secondary connection).

## Q&A[](#heading-4)

**What is the speed difference between the cross-connect and the hosted
solution?**

Cross-connect from the client rack links to the Equinix meet me room (MMR) and
the Deribit matching engine. Therefore, the distance using the hosted solution
to our platform is shorter as no MMR is involved.

**Is there any equalization/harmonization/normalization of the cross-connect and
the hosted solution?**

No, latency depends on the distance to the MMR.

**Can the hosted solution also have cross-connects to other locations within
LD4?**

Yes, but the patches to other destinations need to land directly into your
server (no switch).

**What is the location of the Deribit Matching Engine in LD4?**

LD4:01:00S14 – Equinix LD4, 2 Buckingham Avenue, Slough, SL1 4NB, UK

# Asia Gateway

- Updated 3 months ago

To offer faster access to the Deribit platform for clients located in Asia, we
offer a gateway connecting to Deribit from Hong Kong.

This gateway starting in HK offers API and REST connectivity via a direct line
to our servers in Equinix LD4. Matching therefore does not take place in HK, the
gateway simply reduces the internet dependency. This does not automatically
imply connectivity is faster from all locations in Asia, it would be best to
test the difference yourself. 

Please connect to the Asia Gateway url without VPN for better connectivity.

FIX connections are not supported via the Asia Gateway.

Please use [asia.deribit.com](http://asia.deribit.com) to access the gateway.

# Deribit AWS Endpoint Service instruction

- Updated 3 months ago

In order to offer its customers residing in AWS a direct connection to its
backend systems, Deribit has created an AWS Endpoint Service for customers to
directly connect to. The solution is based on AWS PrivateLink, a managed service
built for service provider/service consumer connectivity models. This
instruction describes how customers can connect to the Deribit Endpoint Service
from their AWS environment. The Service is available within several AWS
regions. 

As with any service provider/service consumer model, AWS PrivateLink will only
allow connectivity to be initiated from your VPC to the Deribit VPC, never in
the other direction, so you have complete control over which network traffic
will be able to go through the VPC Endpoint. The Deribit Endpoint Service will
be accessible on the same TCP ports as via the internet (443, 8020, 8021, 8022
and 8025). Consult Deribit for the port number that’s best for you. 

1.  Create VPC Endpoint

    In order to connect to the Deribit service, you first have to create a VPC
    Endpoint which will be connected through PrivateLink to the Deribit VPC
    Endpoint Service. In order to create this VPC Endpoint log in to the AWS
    Console, go to the AWS Account in which to create the VPC Endpoint, choose
    the appropriate AWS region and go to the VPC from which you want to access
    the Deribit service. From the menu choose ‘Endpoints’, ‘Create Endpoint’.
    Select ‘PrivateLink Ready partner services’: 

    [](https://support.deribit.com/hc/article_attachments/25944657490461)[![aws_endpoint_privatelink_ready_partner_services.png](/hc/article_attachments/25944657490461)](/hc/article_attachments/25944657490461)

    Fill in the name belonging to your specific region and click ‘Verify
    Service’:

    **Table 3. Deribit services for AWS regions**

    | AWS region

    |

    Deribit service name

    |  |
    | ----------------------------- | ------------------------------------------------------------------- |
    | <p>eu-west-2 (London)</p>     | <p>com.amazonaws.vpce.eu-west-2.vpce-svc-040cd502947f69842</p>      |
    | <p>ap-northeast-1 (Tokyo)</p> | <p>com.amazonaws.vpce.ap-northeast-1.vpce-svc-04de4df0469ee98af</p> |

    The following status should appear indicating that the Deribit service was
    successfully located:

    [](https://support.deribit.com/hc/article_attachments/25944657591581)[![aws_endpoint_service_name_verified.png](/hc/article_attachments/25944657591581)](/hc/article_attachments/25944657591581)

    In order to connect to the Endpoint using custom private DNS (explained
    further), make sure default private DNS is not enabled under Additional
    settings: 

    [](https://support.deribit.com/hc/article_attachments/25944657632925)[![aws_endpoint_enable_dns_name.png](/hc/article_attachments/25944657632925)](/hc/article_attachments/25944657632925)

    Now select the VPC in which the VPC Endpoint should be created, followed by
    the Availability Zones in which to enable the VPC Endpoint. For
    redundancy/high availability purposes, Deribit has made its service
    available in two Availability Zones per region:

    **Table 4. Availability Zones for AWS regions**

    | AWS region

    |

    Availability Zones

    |  |
    | ----------------------------- | -------------------------------- |
    | <p>eu-west-2 (London)</p>     | <p>euw-az2 &amp; euw-az3</p>     |
    | <p>ap-northeast-1 (Tokyo)</p> | <p>apne1-az1 &amp; apne1-az4</p> |

    We recommend creating the VPC Endpoint in both AZ’s and recommend your
    application is also available in both AZ’s. 

    You can create and attach a Security Group to the VPC Endpoint for security
    purposes, and add Tags according to your company policies. If you do not
    define a Security Group, the Default Security Group will be associated: 

    [](https://support.deribit.com/hc/article_attachments/25944657720989)[![aws_endpoint_default_security_group.png](/hc/article_attachments/25944657720989)](/hc/article_attachments/25944657720989)

    Make sure the associated Security Group has Inbound Rules allowing traffic
    from your VPC to access the Endpoint. To edit go to the ‘Inbound Rules’ tab,
    click ‘Edit Inbound Rules’. Click ‘Add rule’ and define which traffic is
    allowed to access the Deribit backend. For example in this case my entire
    VPC with CIDR range 10.0.0.0/16 over destination port 8020: 

    [](https://support.deribit.com/hc/article_attachments/25944657805981)[![aws_endpoint_inbound_rule.png](/hc/article_attachments/25944657805981)](/hc/article_attachments/25944657805981)

    Click ‘Save rules’. Click ‘Create Endpoint’ to finalize. 

2.  Connection Acceptance

    The connection request that was created in Step 1, has to be accepted in the
    Deribit AWS account, until that happens the VPC Endpoint in your account
    will remain in the ‘pending acceptance’ state:

    [](https://support.deribit.com/hc/article_attachments/25944657839005)[![aws_endpoint_pending_acceptance.png](/hc/article_attachments/25944657839005)](/hc/article_attachments/25944657839005)

    In order to inform Deribit you have created a connection request, please
    send an email to ‘aws-support@sentillia.com’ following the below guidelines:

    - Include the following in the mail subject:

      - #acceptance request - <your company name> - <UID>

    - Include the following in the email body:

      - The VPC Endpoint-ID you just created (‘vpce-xxx’)...
      - The AWS region in which you made the connection acceptance request.
      - Your Deribit UID

    Deribit will then accept the connection request, inform you by email and
    after a few minutes the status of the VPC Endpoint will change to
    ‘available’. It is now ready for use:

    [](https://support.deribit.com/hc/article_attachments/25944674006429)[![aws_endpoint_status_available.png](/hc/article_attachments/25944674006429)](/hc/article_attachments/25944674006429)

3.  Route network traffic to VPC Endpoint

    The next step is to enable services within your VPC, like for example EC2
    instances or Lambdas, to access the VPC Endpoint. We recommend the use of a
    Private Hosted Zone in the Route53 AWS DNS service. If you will be accessing
    the Deribit service over TCP port 443 your DNS record needs to be ‘gateway’
    in the ‘deribit.com’ hosted zone, in order for the SSL certificate to match
    ‘gateway.deribit.com’. If you are using any of the other TCP ports (8020,
    8021, 8022 or 8025), there is no SSL certificate so you can choose your own
    record and zone.

    Go to Route53 in the AWS Console, create a Private Hosted Zone if you don’t
    have one already, otherwise use one you were already using. For this example
    we will use the zone ‘deribit.int’ (‘deribit.com’ if you are using TCP 443).

    Within that hosted zone choose ‘Create record’, select the ‘Simple Routing’
    policy:

    [](https://support.deribit.com/hc/article_attachments/25944639033757)[![aws_endpoint_simple_routing_policy.png](/hc/article_attachments/25944639033757)](/hc/article_attachments/25944639033757)

    Click Next and choose ‘Define simple record’. Fill in the record details:

    - Record name – choose your own record, in this example we will use ‘test’
      (‘gateway’ if you are using TCP 443);
    - Record type – A ‘Routes traffic to an IPv4 address and some AWS
      resources’;
    - Value/route traffic to – choose ‘Alias to VPC Endpoint’;
    - Region – choose the region in which you created the Endpoint’;
    - Choose endpoint – select the Endpoint created in Step 1. Note to choose
      the one with the region (for example ‘eu-west-2’ or ‘ap-northeast-1’), not
      the one ending with ‘a/b’.

    [](https://support.deribit.com/hc/article_attachments/25944620339741)[![aws_endpoint_define_simple_record.png](/hc/article_attachments/25944620339741)](/hc/article_attachments/25944620339741)

    Select ‘Define simple record’ and ‘Create records’. It is being created and
    will take a few minutes to become available.

4.  Test the connection

    From your EC2 instance or Lambda service test the connection with for
    example telnet, using the created private DNS record in Step 3 followed by
    one of the TCP ports (In our example: ‘telnet test.deribit.int 8020’). The
    test should result in an active connection, it is now available for your
    regular requests for the Deribit backend.

## Troubleshooting[](#heading-1)

**Why am I getting a response error 404 ?**

Verify the following:

1.  Your VPCE is in the correct zone, either London or Tokyo, depending on which
    region you’ve requested.
2.  Confirm that step number 3 in the setup guide is correctly configured, and
    that the DNS point to gateway.deribit.com

**IP whitelisting - I wish to whitelist my IP**

This can be done via the API itself directly without our intervening, If you
wish to be sure about the IP address? Simply send a request and let us know with
your UID alongside the exact time window so we can trace it back from the logs
for you.

# Deribit AWS Multicast Service Instruction

- Updated 3 months ago

## Introduction[](#heading-1)

Receiving multicast is possible using a shared resource from the Deribit network
account, this currently only runs in the Europe (London) eu-west-2 region or in
the Asia Pacific (Tokyo) ap-northeast-1 region. In this document are the
instructions on how to setup and how to test the multicast setup.

**Setting up AWS to receive multicast**

Before you can access the multicast streams you have to request a shared
resource, please send an email to
‘[aws-support@sentillia.com](mailto:aws-support@sentillia.com)’ following the
below guidelines:

- Include the following in the mail subject:

  - #Multicast acceptance - <your company name> - <UID>

- Include the following in the email body:

  - Your AWS account ID (not your VPC Endpoint-ID)
  - the AWS region (eu-west-2 or ap-northeast-1)

**Accept shared resources**

Make sure you select Europe (London) eu-west-2 region or the Asia Pacific
(Tokyo) ap-northeast-1 region. Go to Resource Access Manager, select shared with
me → Resource shares.

[](https://support.deribit.com/hc/article_attachments/25944620396061)[![image2.png](/hc/article_attachments/25944620396061)](/hc/article_attachments/25944620396061)

Click on the name of the Pending share and click Accept

[](https://support.deribit.com/hc/article_attachments/25944654790301)[![image4.png](/hc/article_attachments/25944654790301)](/hc/article_attachments/25944654790301)

## Configure Transit gateway multicast[](#heading-2)

Create a Transit gateway attachment to the shared transit gateway and attach the
subnets in your own VPC where you want to be able to receive multicast traffic.

[](https://support.deribit.com/hc/article_attachments/25944658248861)[![image3.png](/hc/article_attachments/25944658248861)](/hc/article_attachments/25944658248861)

Go to the Transit gateway multicast in the VPC dashboard, select tab:
Associations and Click Create association.

[](https://support.deribit.com/hc/article_attachments/25944645807133)[![image6.png](/hc/article_attachments/25944645807133)](/hc/article_attachments/25944645807133)

Select the attachment and the subnets.

[](https://support.deribit.com/hc/article_attachments/25944674494237)[![image9.png](/hc/article_attachments/25944674494237)](/hc/article_attachments/25944674494237)

## Testing using Amazon Linux 2 instance[](#heading-3)

Make sure you use a nitro enabled instance :
[https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html)
( See Instances built on the Nitro System ) also inbound rules are to be set in
the security group:

- Ports used for testing : `6200-6201`
- Port used for production : `6100-6101`
- IP range London region : `172.20.13.0/24`
- IP range Tokyo region : `172.20.14.0/24`
- IGMPv2 protocol must be allowed inbound from anywhere: 0.0.0.0/0

In the example below the test feed is allowed from the London region : Custom
UDP ports 6200-6201 for source 172.20.13.0/24 and IGMPv2 from anywhere

[](https://support.deribit.com/hc/article_attachments/25944674573213)[![image7.png](/hc/article_attachments/25944674573213)](/hc/article_attachments/25944674573213)

Socat is used to send a IGMP join command to the multicast address. Install
using sudo yum install socat Tcpdump is used to receive the messages and screen
session is used for switching between the tcpdump and socat.

Make sure IGMP version 2 is used ( 3 is default and currently unsupported). Copy
and paste code below to force using IGMP v2.

cat >/etc/sysctl.d/99-igmpv2.conf <<EOF \# Force kernel to use IGMP v2 rather
than default to v3 net.ipv4.conf.all.force_igmp_version=2 EOF sysctl -p
/etc/sysctl.d/99-igmpv2.conf

**Start screen session:** `screen -DR mysession`

**Start socat:**
`socat -u UDP-RECVFROM:6200,reuseaddr,ip-add-membership=239.222.222.2:eth0,ip-pktinfo,fork SYSTEM:export`

**Create a new screen window using** CTRL+a n **and run**
`tcpdump -v multicast and not broadcast`

**Output should look something like:** 

11:00:26.960914 IP (tos 0x0, ttl 4, id 53434, offset 0, flags \[DF\], proto UDP
(17), length 248) ip-172-20-13-55.eu-west-2.compute.internal.33552 >
239.222.222.2.lm-x: UDP, length 220 11:00:26.961512 IP (tos 0x0, ttl 4, id
53435, offset 0, flags \[DF\], proto UDP (17), length 103)
ip-172-20-13-55.eu-west-2.compute.internal.33552 > 239.222.222.2.lm-x: UDP,
length 75 11:00:26.962211 IP (tos 0x0, ttl 4, id 53436, offset 0, flags \[DF\],
proto UDP (17), length 248) ip-172-20-13-55.eu-west-2.compute.internal.33552 >
239.222.222.2.lm-x: UDP, length 220 11:00:27.059313 IP (tos 0x0, ttl 4, id
53438, offset 0, flags \[DF\], proto UDP (17), length 121)
ip-172-20-13-55.eu-west-2.compute.internal.33552 > 239.222.222.2.lm-x: UDP,
length 93 11:00:27.066568 IP (tos 0x0, ttl 4, id 53440, offset 0, flags \[DF\],
proto UDP (17), length 121) ip-172-20-13-55.eu-west-2.compute.internal.33552 >
239.222.222.2.lm-x: UDP, length 93 11:00:27.185705 IP (tos 0x0, ttl 4, id 53458,
offset 0, flags \[DF\], proto UDP (17), length 85)
ip-172-20-13-55.eu-west-2.compute.internal.33552 > 239.222.222.2.lm-x: UDP,
length 57 11:00:27.241053 IP (tos 0x0, ttl 4, id 53466, offset 0, flags \[DF\],
proto UDP (17), length 85) ip-172-20-13-55.eu-west-2.compute.internal.33552 >
239.222.222.2.lm-x: UDP, length 57 11:00:27.510470 IP (tos 0x0, ttl 4, id 53504,
offset 0, flags \[DF\], proto UDP (17), length 181)
ip-172-20-13-55.eu-west-2.compute.internal.33552 > 239.222.222.2.lm-x: UDP,
length 153 11:00:27.511022 IP (tos 0x0, ttl 4, id 53505, offset 0, flags \[DF\],
proto UDP (17), length 181) ip-172-20-13-55.eu-west-2.compute.internal.33552 >
239.222.222.2.lm-x: UDP, length 153 11:00:27.511022 IP (tos 0x0, ttl 4, id
53506, offset 0, flags \[DF\], proto UDP (17), length 181)
ip-172-20-13-55.eu-west-2.compute.internal.33552 > 239.222.222.2.lm-x: UDP,
length 153 11:00:27.511022 IP (tos 0x0, ttl 4, id 53507, offset 0, flags \[DF\],
proto UDP (17), length 181) ip-172-20-13-55.eu-west-2.compute.internal.33552 >
239.222.222.2.lm-x: UDP, length 153 11:00:27.511607 IP (tos 0x0, ttl 4, id
53508, offset 0, flags \[DF\], proto UDP (17), length 181)
ip-172-20-13-55.eu-west-2.compute.internal.33552 > 239.222.222.2.lm-x: UDP,
length 153 11:00:27.595607 IP (tos 0x0, ttl 4, id 53523, offset 0, flags \[DF\],
proto UDP (17), length 103) ip-172-20-13-55.eu-west-2.compute.internal.33552 >
239.222.222.2.lm-x: UDP, length 75 11:00:27.596188 IP (tos 0x0, ttl 4, id 53524,
offset 0, flags \[DF\], proto UDP (17), length 103)
ip-172-20-13-55.eu-west-2.compute.internal.33552 > 239.222.222.2.lm-x: UDP,
length 75 11:00:27.596188 IP (tos 0x0, ttl 4, id 53525, offset 0, flags \[DF\],
proto UDP (17), length 85) ip-172-20-13-55.eu-west-2.compute.internal.33552 >
239.222.222.2.lm-x: UDP, length 57 11:00:27.596947 IP (tos 0x0, ttl 4, id 53526,
offset 0, flags \[DF\], proto UDP (17), length 103)

Output should occur rather often (usually multiple times per second), this
verifies the multicast is working.

With screen you can switch between multiple screens using CTRL-a n or CTRL-a p ,
to kill a screen use CTRL-a K

## Show data of multicast packages in Wireshark[](#heading-4)

For this we need Wireshark
[https://www.wireshark.org/](https://www.wireshark.org/) and the Wireshark
plugin provided by Deribit , the plugin can be found in the MC Client
Development Pack (ZIP) on the page :
[https://insights.deribit.com/exchange-updates/launch-of-our-new-multicast-service/](https://insights.deribit.com/exchange-updates/launch-of-our-new-multicast-service/) 

Inside the zip file you will find the file deribit_sbe.lua which must be copied
into the plugin folder of Wireshark. On Windows systems with default Wireshark
installation this folder is `C:\Program Files\Wireshark\plugins`

a .pcap file can be loaded in Wireshark, this file can be created using tcpdump:

We can capture the tcpdump to a file when we add -s 65535 -w <file> to the
tcpdump command:
`tcpdump -v multicast and not broadcast -s 65535 -w multidump.pcap`

When opened in Wireshark with the plugin enabled the Protocol should show:
Deribit SBE as shown below

[](https://support.deribit.com/hc/article_attachments/25944655166493)[![image11.png](/hc/article_attachments/25944655166493)](/hc/article_attachments/25944655166493)

Double click an item to retrieve the details :

[](https://support.deribit.com/hc/article_attachments/25944689995549)[![image10.png](/hc/article_attachments/25944689995549)](/hc/article_attachments/25944689995549)

This should verify the multicast data has been received successfully.

## Multicast Channels[](#heading-5)

The most recent information about the multicast channels can be found by
downloading the MC Client Development Pack Zip from
[here](https://static.deribit.com/files/DeribitMulticastClientDevelopmentPack.zip).

## **Troubleshooting**[](#heading-6)

**Transitgateway Attachment creation fails**

If a user has insufficient permissions, the transit gateway attachment created
according to step 1.2 might enter a failed state.

To create a VPC attachment to a RAM shared transit gateway, the IAM user would
need the following permissions:

1.  ram:CreateResourceShare permission to share the transit gateway across
    accounts.
2.  ec2:CreateTransitGatewayVpcAttachment permission to create the VPC
    attachment to the shared transit gateway.
3.  ec2:DescribeTransitGateways permission to view the shared transit gateway.

**No data received when issuing the socat command in one screen session and
tcpdump in another screen session.**

If data fails to be received despite the execution of the socat command in one
screen session and tcpdump in another, it may be necessary to verify the
security group rules configured for the instance. Configure the SG as follows:

[](https://support.deribit.com/hc/article_attachments/25944674573213)[![image7.png](/hc/article_attachments/25944674573213)](/hc/article_attachments/25944674573213)

Specifically the second line allowing IGMP traffic from any source might be
necessary.

**Why am I getting a response error 404 ?**

Verify the following:

1.  Your VPCE is in the correct zone, either London or Tokyo, depending on which
    region you’ve requested.
2.  Confirm that step number 3 in the setup guide is correctly configured, and
    that the DNS point to gateway.deribit.com

**IP whitelisting - i wish to whitelist my IP**

This can be done via the API itself directly without our intervening, If you
wish to be sure about the IP address? Simply send a request and let us know with
your UID alongside the exact time window so we can trace it back from the logs
for you.

# Accessing historical trades and orders using API

- Updated 2 months ago

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
