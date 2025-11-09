# GET Stay Connected And Limit

**Source:**
[Stay Connected And Limit](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Stay Connected And Limit

\* If there is a network problem, the connection will be automatically
disconnected, please set up the reconnection mechanism

### How Stay Connected

WebSocket uses the Ping/Pong mechanism to maintain the connection. Once the
connection is opened, a text 'ping' is sent every N seconds, and the remote
endpoint will return a text 'pong' to keep responding. This is an approach to
stay active. It helps to keep the connection open, especially if there is a
short timeout proxy on an inactive connection.

**If no data is returned after connecting to WebSocket, the link will be
automatically disconnected after 20s. It is recommended that the user do the
following:**

1.  After each message is received, the user sets a timer for N seconds (N<20).
2.  If the timer is triggered (no new message is received within N seconds),
    send a text string 'ping'. **(Ping frames are not supported)**
3.  Expect for a text string 'pong' as a response. If not received within N
    seconds, please issue an error or reconnect.
4.  We do not actively disconnect when there is a continuous message interaction
    between the two parties.

**The following is the data format of ping:** (Example in Java pseudocode)

- Ping Text

`ws.send(new TextWebSocketFrame("ping");`

### Connection Limit(Public Channel)

- Each IP can maintain up to 20 connections with the BitMart public channel
  server
- Once connected, allows clients to subscribe to up to 115 channels per
  connection.
- Send message rate limit:
  1.  Initiate connection: Clients can initiate a maximum of 30 requests to
      connect to the BitMart server within 1 minute.
  2.  Once connected: Clients can sending a maximum of 100 subscription messages
      within 10 seconds, message includes: PING text, JSON format messages
      (subscription and unsubscription).
  3.  Once connected: A maximum of 20 messages arrays can be sent by clients for
      a single subscription.
- If the user sends more messages than the limit, the connection will be
  disconnected. IPs that are repeatedly disconnected will be blocked by the
  server.

### Connection Limit(Private Channel)

- Each IP can maintain up to 10 connections with the BitMart private channel
  server.
- Once connected, allows clients to subscribe to up to 100 channels per
  connection.
- Send message rate limit:
  1.  Initiate connection: Clients can initiate a maximum of 30 requests to
      connect to the BitMart server within 1 minute.
  2.  Once connected: Clients can sending a maximum of 100 subscription messages
      within 10 seconds, message includes: PING text, JSON format messages
      (subscription and unsubscription).
  3.  Once connected: A maximum of 20 messages arrays can be sent by clients for
      a single subscription.
- If the user sends more messages than the limit, the connection will be
  disconnected. IPs that are repeatedly disconnected will be blocked by the
  server.

#### How to subscribe to more than 1000 Public channels?

Create 20 connectors and 1 receiving function in your code, and each connector
subscribes to 100 channels, so that you can easily subscribe to 2000 channels.

##### Need to pay attention to?

- Subscribe to fewer channels and respond faster. It is recommended that you
  only subscribe to the channels you want
- If the number of messages sent exceeds the limit, the connection will be
  disconnected. IPs that are repeatedly disconnected will be blocked by the
  server
- The connection limits for private channels and public channels are calculated
  separately, which means that a single IP is allowed to maintain 10 private
  channel connections and 20 public channel connections at the same time

#### Lifeless connection

Connection that do not send task subscription data within 5 minutes will be
considered lifeless and the server will close the connection.
