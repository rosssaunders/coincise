# Bullish Trading API - WebSocket General Information

# WebSockets

Connection request to the web-socket uses
[JWT_COOKIE based authentication](https://github.com/bullish-exchange/api-examples/blob/master/websocket/private_data_web_socket.py).
To generate a JWT token see -
[Generate A JWT Token](#overview--generate-a-jwt-token). Each web-socket exposes
a set of topics that can be subscribed to.

## Servers

- `wss://api.exchange.bullish.com` - PRODUCTION
- `wss://registered.api.exchange.bullish.com` - PRODUCTION
- `wss://prod.access.bullish.com` - PRODUCTION (Direct Connect)
- `wss://api.simnext.bullish-test.com` - SANDBOX
- `wss://registered.api.simnext.bullish-test.com` - SANDBOX
- `wss://simnext.access.bullish.com` - SANDBOX (Direct Connect)

## Max Open WebSocket Connections

Each WebSocket category has a maximum number of open connections. Once it is
reached, new WebSocket requests will be rejected. The WebSocket connections fall
under the below categories.

- Unauthenticated WebSockets, maximum of 100 open connections per IP address.
- Authenticated WebSockets, maximum of 10 open connections per API key.

## Send A Message Over The WebSocket

Messages sent by the client to the server over a web-socket follows the
[JSON-RPC 2.0 Specification](https://www.jsonrpc.org/specification). The server
then returns a response following the same JSON-RPC 2.0 format. The `id` field
sent by the client will be included in the response, allowing the client to map
the server's responses to the messages sent by the client. The client ensures
the uniqueness of the `id` field.

Find below the message types accepted by the web-socket:

1. [Subscription Message](#overview--subscribe-to-a-topic)
2. [Keepalive Ping Message](#overview--keep-websocket-open)

## Subscribe To A Topic

Subscribe to receive a snapshot of your existing data and subsequently receive
updates.

Two types of subscription:

1. Subscribe by `<TOPIC>`
2. Subscribe by `<TOPIC>` and `<SYMBOL>` plus optional fields (if any)

Message fields:

- `<TOPIC>`: subscription topic
- `<SYMBOL>`: market symbol
- `<COMMAND_ID>`: unique unsigned long value

The subscription message would be constructed like below:

Subscribe by `<TOPIC>`

```json
{
  "jsonrpc": "2.0",
  "type": "command",
  "method": "subscribe",
  "params": {
    "topic": "<TOPIC>"
  },
  "id": "<COMMAND_ID>"
}
```

Subscribe by `<TOPIC>` and `<SYMBOL>`

```json
{
  "jsonrpc": "2.0",
  "type": "command",
  "method": "subscribe",
  "params": {
    "topic": "<TOPIC>",
    "symbol": "<SYMBOL>"
  },
  "id": "<COMMAND_ID>"
}
```

Sample subscription messages:

- Orders

```json
{
  "jsonrpc": "2.0",
  "type": "command",
  "method": "subscribe",
  "params": {
    "topic": "orders"
  },
  "id": "1611082473000"
}
```

- L1 Order Book

```json
{
  "jsonrpc": "2.0",
  "type": "command",
  "method": "subscribe",
  "params": {
      "topic": "l1Orderbook"
      "symbol": "BTCUSD"
  },
  "id": "1611082473000"
}
```

Find below the available `<TOPIC>`:

1. [Multi-OrderBook Data WebSocket](#overview--multi-orderbook-websocket-unauthenticated)
2. [Anonymous Trades WebSocket](#overview--anonymous-trades-websocket-unauthenticated)
3. [Anonymous Market Data WebSocket](#overview--anonymous-market-data-price-tick-unauthenticated)
4. [Index Data WebSocket](#overview--index-data-websocket-unauthenticated)
5. [Private Data WebSocket](#overview--private-data-websocket-authenticated)

## Keep WebSocket Open

Keep the web-socket connection open by sending keepalive ping messages
periodically. The web-socket closes automatically after 5 minutes.

The keepalive ping message would be constructed like below:

```json
{
  "jsonrpc": "2.0",
  "type": "command",
  "method": "keepalivePing",
  "params": {},
  "id": "<COMMAND_ID>"
}
```

## Receive A Message From The WebSocket

JSON-RPC responses are of the following format:

Success responses

```json
{
  "jsonrpc": "2.0",
  "id": "1650865877698",
  "result": {
    "responseCode": "200",
    "responseCodeName": "OK",
    "message": "Successfully subscribed"
  }
}
```

Error responses

```json
{
  "jsonrpc": "2.0",
  "id": "1650865877698",
  "error": {
    "code": "-32602",
    "errorCode": "29013",
    "errorCodeName": "INVALID_TOPIC_ERROR",
    "message": "'a-random-topic' is not a valid topic"
}
```

- `code`: [JSON-RPC 2.0 error code](https://www.jsonrpc.org/specification)
- `responseCode`/`errorCode`: unique ID for response/error code
- `responseCodeName`/`errorCodeName`: unique name for response/error code
- `message`: textual description of the `responseCode`/`errorCode`

Snapshot responses are of the following format:

```json
{
  "type": "snapshot",
  "dataType": "<DATA_TYPE>",
  "data": [ { <TOPIC_RESPONSE> } ]
}
```

Update responses are of the following format:

```json
{
  "type": "update",
  "dataType": "<DATA_TYPE>",
  "data": { <TOPIC_RESPONSE> }
}
```

Error responses are of the following format:

```json
{
  "type": "error",
  "dataType": "V1TAErrorResponse",
  "data": {
    "errorCode": <ERROR_CODE>,
    "errorCodeName": "<ERROR_CODE_NAME>"
  }
}
```

## Heartbeat

- this is a `beta/experimental` feature that is currently being tested
- the heart beat message is periodically sent approximately every 30 seconds on
  the `heartbeat` topic for the
  [Private Data WebSocket](#overview--private-data-websocket-authenticated) API
  and
  [Multi-OrderBook WebSocket)](#overview--multi-orderbook-websocket-unauthenticated)
  API
- the heat beat serves to validate end to end communication between the exchange
  and the client
- if 3 heart beats are missed, then it is advisable to check the
  [official status page](https://bullish.statuspage.io/) for any announcements
  on the degradation of the exchanges features
- if no announcements have been made, it is advisable to disconnect and
  reconnect the websocket API given the issue may be isolated to a specific
  gateway
