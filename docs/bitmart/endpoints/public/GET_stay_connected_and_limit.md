# GET Stay Connected And Limit

**Source:** [Stay Connected And Limit](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## Stay Connected And Limit

\* If there is a network problem, the connection will be automatically disconnected, please set up the reconnection mechanism  

### How Stay Connected

WebSocket uses the Ping/Pong mechanism to maintain the connection. Once the connection is opened, a Ping frame is sent every N seconds, and the remote endpoint will return a Pong frame to keep responding. This is an approach to stay active. It helps to keep the connection open, especially if there is a short timeout proxy on an inactive connection.

**If no data is returned after connecting to WebSocket, the link will be automatically disconnected after 20s. It is recommended that the user do the following:**

1.  After each message is received, the user sets a timer for N seconds (N<20).
2.  If the timer is triggered (no new message is received within N seconds), send a ping frame or send a string 'ping'.
3.  Expect for a text string 'pong' as a response. If not received within N seconds, please issue an error or reconnect.
4.  We do not actively disconnect when there is a continuous message interaction between the two parties.

**The following is the data format of ping:** (Example in Java pseudocode)

-   Standard Ping frame

`ws.send(new PingWebSocketFrame());`

-   Ping Text

`ws.send(new TextWebSocketFrame('{"action":"ping"}'));`

### Connection Limit

-   A maximum of 500 connections can be maintained between each IP and BitMart server.

#### Lifeless connection

Connection that do not send task subscription data within 5 seconds will be considered lifeless and the server will close the connection.