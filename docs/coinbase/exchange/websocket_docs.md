

# DOCS/WEBSOCKET-OVERVIEW

# Exchange WebSocket Overview

The WebSocket feed is publicly available and provides real-time market data updates for orders and trades. Two endpoints are supported in both production and sandbox:

- **Coinbase Market Data** is our traditional feed which is available without authentication.
- **Coinbase Direct Market Data** has direct access to Coinbase Exchange servers and requires [Authentication](https://docs.cdp.coinbase.com/exchange/docs/websocket-auth).



Tip

You can subscribe to both endpoints, but if `ws-direct` is your primary connection, we recommend using `ws-feed` as a failover.



Info

**Coinbase Market Data**

production = wss://ws-feed.exchange.coinbase.com

sandbox = wss://ws-feed-public.sandbox.exchange.coinbase.com

**Coinbase Direct Market Data**

production = wss://ws-direct.exchange.coinbase.com

sandbox = wss://ws-direct.sandbox.exchange.coinbase.com

## Protocol [](https://docs.cdp.coinbase.com/exchange/docs/websocket-overview\#protocol "Direct link to Protocol")

The WebSocket feed uses a bidirectional protocol that encodes all messages as JSON objects. All messages have a `type` attribute that can be used to handle the message appropriately.



Tip

New message types can be added at any time. Clients are expected to ignore messages they do not support.

## Subscribe [](https://docs.cdp.coinbase.com/exchange/docs/websocket-overview\#subscribe "Direct link to Subscribe")

To begin receiving feed messages, you must send a `subscribe` message to the server indicating which channels and products to receive. This message is mandatory—you are disconnected if no `subscribe` has been received within 5 seconds.



Caution

To receive feed messages, you must send a `subscribe` message or you are disconnected in 5 seconds.

```codeBlockLines_p187
// Request
// Subscribe to ETH-USD and ETH-EUR with the level2, heartbeat and ticker channels,
// plus receive the ticker entries for ETH-BTC and ETH-USD
{
  "type": "subscribe",
  "product_ids": ["ETH-USD", "ETH-EUR"],
  "channels": [\
    "level2",\
    "heartbeat",\
    {\
      "name": "ticker",\
      "product_ids": ["ETH-BTC", "ETH-USD"]\
    }\
  ]
}

```

You receive a `subscriptions` message as a response to an `subscribe` message.

### Unsubscribe [](https://docs.cdp.coinbase.com/exchange/docs/websocket-overview\#unsubscribe "Direct link to Unsubscribe")

To unsubscribe from channel/product pairs, send an `unsubscribe` message. The structure is equivalent to `subscribe` messages.



Tip

You can also unsubscribe from a channel entirely by providing no product IDs.

```codeBlockLines_p187
// Request
{
  "type": "unsubscribe",
  "channels": ["heartbeat"]
}

```

You receive a `subscriptions` message as a response to an `unsubscribe` message.

### Specifying Product IDs [](https://docs.cdp.coinbase.com/exchange/docs/websocket-overview\#specifying-product-ids "Direct link to Specifying Product IDs")

There are two ways to specify the product IDs to listen for within each channel:

- You can define product IDs for an individual channel.
- You can define product IDs at the root of the object—this adds them to all the channels you subscribe to.

```codeBlockLines_p187
// Request
{
  "type": "unsubscribe",
  "product_ids": ["ETH-USD", "ETH-EUR"],
  "channels": ["ticker"]
}

```

### Subscriptions Message [](https://docs.cdp.coinbase.com/exchange/docs/websocket-overview\#subscriptions-message "Direct link to Subscriptions Message")

A `subscriptions` message is sent in response to both [subscribe](https://docs.cdp.coinbase.com/exchange/docs/websocket-overview#subscribe) and [unsubscribe](https://docs.cdp.coinbase.com/exchange/docs/websocket-overview#unsubscribe) messages.

In response to a `subscribe` message, the `subscriptions` message lists all channels you are subscribed to. Subsequent subscribe messages add to the list of subscriptions. If you subscribed to a channel without being authenticated, you will remain in the unauthenticated channel.

```codeBlockLines_p187
// Response
{
  "type": "subscriptions",
  "channels": [\
    {\
      "name": "level2",\
      "product_ids": ["ETH-USD", "ETH-EUR"]\
    },\
    {\
      "name": "heartbeat",\
      "product_ids": ["ETH-USD", "ETH-EUR"]\
    },\
    {\
      "name": "ticker",\
      "product_ids": ["ETH-USD", "ETH-EUR", "ETH-BTC"]\
    }\
  ]
}

```

## Websocket Compression Extension [](https://docs.cdp.coinbase.com/exchange/docs/websocket-overview\#websocket-compression-extension "Direct link to Websocket Compression Extension")

Websocket compression, defined in RFC7692, compresses the payload of WebSocket messages which can increase total throughput and potentially reduce message delivery latency. The **permessage-deflate extension** can be enabled by adding the extension header. Currently, it is not possible to specify the compression level.

From [RFC7692](https://datatracker.ietf.org/doc/html/rfc7692#section-7.1.3):

The simplest "Sec-WebSocket-Extensions" header in a client (or server's) opening handshake to offer (or accept) use of the "permessage-deflate" extension looks like this:

```codeBlockLines_p187
    GET wss://ws-feed.exchange.coinbase.com
       Sec-WebSocket-Extensions: permessage-deflate

```

## Sequence Numbers [](https://docs.cdp.coinbase.com/exchange/docs/websocket-overview\#sequence-numbers "Direct link to Sequence Numbers")

Most feed messages contain a sequence number. Sequence numbers are increasing integer values for each product, with each new message being exactly one sequence number greater than the one before it.

Sequence numbers that are _greater than one integer value_ from the previous number indicate that a message has been dropped. Sequence numbers that are _less_ than the previous number can be ignored or represent a message that has arrived out of order.

In either situation you may need to perform logic to make sure your system is in the correct state.



Caution

Even though a WebSocket connection is over TCP, the WebSocket servers receive market data in a manner that can result in dropped messages. Your feed consumer should be designed to handle sequence gaps and out of order messages, or should use channels that guarantee delivery of messages.



Tip

To guarantee that messages are delivered and your order book is in sync, consider using the [level2 channel](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#level2-channel).

## End-to-end Example [](https://docs.cdp.coinbase.com/exchange/docs/websocket-overview\#end-to-end-example "Direct link to End-to-end Example")

Below is an end-to-end example for Python that handles authentication and connection to the Exchange WebSocket. This code sample can be cloned at [Coinbase Samples](https://github.com/coinbase-samples/exchange-scripts-py/tree/main/websocket).

```codeBlockLines_p187

import asyncio, base64, hashlib, hmac, json, os, time, websockets

API_KEY = str(os.environ.get('API_KEY'))
PASSPHRASE = str(os.environ.get('PASSPHRASE'))
SECRET_KEY = str(os.environ.get('SECRET_KEY'))

URI = 'wss://ws-feed.exchange.coinbase.com'
SIGNATURE_PATH = '/users/self/verify'

channel = 'level2'
product_ids = 'ETH-USD'

async def generate_signature():
    timestamp = str(time.time())
    message = f'{timestamp}GET{SIGNATURE_PATH}'
    hmac_key = base64.b64decode(SECRET_KEY)
    signature = hmac.new(
        hmac_key,
        message.encode('utf-8'),
        digestmod=hashlib.sha256).digest()
    signature_b64 = base64.b64encode(signature).decode().rstrip('\n')
    return signature_b64, timestamp

async def websocket_listener():
    signature_b64, timestamp = await generate_signature()
    subscribe_message = json.dumps({
        'type': 'subscribe',
        'channels': [{'name': channel, 'product_ids': [product_ids]}],
        'signature': signature_b64,
        'key': API_KEY,
        'passphrase': PASSPHRASE,
        'timestamp': timestamp
    })

    while True:
        try:
            async with websockets.connect(URI, ping_interval=None) as websocket:
                await websocket.send(subscribe_message)
                while True:
                    response = await websocket.recv()
                    json_response = json.loads(response)
                    print(json_response)

        except (websockets.exceptions.ConnectionClosedError, websockets.exceptions.ConnectionClosedOK):
            print('Connection closed, retrying..')
            await asyncio.sleep(1)

if __name__ == '__main__':
    try:
        asyncio.run(websocket_listener())
    except KeyboardInterrupt:
        print("Exiting WebSocket..")

```

# DOCS/WEBSOCKET-BEST-PRACTICES

# Exchange WebSocket Best Practices

- You can subscribe to both `ws-feed` (Coinbase Market Data) and `ws-direct` (Coinbase Direct Market Data), but if `ws-direct` is your primary connection, we recommend using `ws-feed` as a failover.

- Remember [WebSocket rate limits](https://docs.cdp.coinbase.com/exchange/docs/websocket-rate-limits).

- Spread subscriptions (especially full channel subscriptions) over more than one websocket client connection. For example, do not subscribe to BTC-USD and ETH-USD on the same channel if possible. Instead, open up two separate websocket connections to help load balance those inbound messages across separate connections.

- Websocket clients should authenticate to help troubleshoot issues if necessary. Authenticating is optional and does not impact web socket performance.

- Connected clients should increase their web socket receive buffer to the largest configurable amount possible (given any client library or infrastructure limitations), due to the potential volume of data for any given product.

- Include the following header in the opening handshake to allow for compression, which will lower bandwidth consumption with minimal impact to CPU / memory: `Sec-WebSocket-Extensions: permessage-deflate`. See [Websocket Compression Extension](https://docs.cdp.coinbase.com/exchange/docs/websocket-overview#websocket-compression-extension)

- Use less verbose subscriptions where possible (e.g., Level 2 over Full/Level 3).

- Use alternative batch channels like “level2\_batch” instead of “level2” and “ticket\_batch” instead of “ticket” which deliver a batched version of the respective data on a set interval reducing overall traffic.

- Mitigate error messages which are returned when the client is actively disconnected for any of these reasons:


  - The client has too many backed up messages ( `ErrSlowConsume`)

Limit the use of I/O operations and in-memory lock-free constructs when processing any websocket client callbacks. Queuing messages and processing them off-thread is another strategy that can prevent slow consumer errors.

  - The client is sending too many messages ( `ErrSlowRead`)

Space out websocket requests to adhere to the above rate limits.

  - The message size is too large ("Message too big").

Break up your subscription messages into smaller requests abiding by the rate limits.

# DOCS/WEBSOCKET-AUTH

# Exchange WebSocket Authentication

The following WebSocket feeds require authentication:

- [Full channel](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#full-channel)
- [User channel](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#user-channel)
- [Level2 channel](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#level2-channel)
- [Level3 channel](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#level3-channel)

To authenticate, send a `subscribe` message and pass in fields to `GET /users/self/verify`, just as if you were [signing a request](https://docs.cdp.coinbase.com/exchange/docs/rest-auth#signing-a-message). To get the necessary parameters, go through the same process as you would to make [authenticated calls to the API](https://docs.cdp.coinbase.com/exchange/docs/rest-auth#signing-requests).



Caution

Authenticated feed messages do not increment the [sequence number](https://docs.cdp.coinbase.com/exchange/docs/websocket-overview#sequence-numbers), which means that it is currently not possible to detect if an authenticated feed message was dropped.

## Examples [](https://docs.cdp.coinbase.com/exchange/docs/websocket-auth\#examples "Direct link to Examples")

A Python example of authenticating a WebSocket connection is shown below. This code sample can be cloned at [Coinbase Samples](https://github.com/coinbase-samples/exchange-scripts-py/tree/main/websocket).

```codeBlockLines_p187
API_KEY = str(os.environ.get('API_KEY'))
PASSPHRASE = str(os.environ.get('PASSPHRASE'))
SECRET_KEY = str(os.environ.get('SECRET_KEY'))

URI = 'wss://ws-feed.exchange.coinbase.com'
SIGNATURE_PATH = '/users/self/verify'

channel = 'level2'
product_ids = 'ETH-USD'

async def generate_signature():
    timestamp = str(time.time())
    message = f'{timestamp}GET{SIGNATURE_PATH}'
    hmac_key = base64.b64decode(SECRET_KEY)
    signature = hmac.new(
        hmac_key,
        message.encode('utf-8'),
        digestmod=hashlib.sha256).digest()
    signature_b64 = base64.b64encode(signature).decode().rstrip('\n')
    return signature_b64, timestamp

async def websocket_listener():
    signature_b64, timestamp = await generate_signature()
    subscribe_message = json.dumps({
        'type': 'subscribe',
        'channels': [{'name': channel, 'product_ids': [product_ids]}],
        'signature': signature_b64,
        'key': API_KEY,
        'passphrase': PASSPHRASE,
        'timestamp': timestamp
    })

```

Further examples are shown below:

```codeBlockLines_p187
// Authenticated feed messages add user_id and
// profile_id for messages related to your user
{
  "type": "open", // "received" | "open" | "done" | "match" | "change" | "activate"
  "user_id": "5844eceecf7e803e259d0365",
  "profile_id": "765d1549-9660-4be2-97d4-fa2d65fa3352"
  /* ... */
}

```

Here's an example of an authenticated `subscribe` request:

```codeBlockLines_p187
// Request
{
  "type": "subscribe",
  "product_ids": ["BTC-USD"],
  "channels": ["full"],
  "signature": "...",
  "key": "...",
  "passphrase": "...",
  "timestamp": "..."
}

```

## Benefits [](https://docs.cdp.coinbase.com/exchange/docs/websocket-auth\#benefits "Direct link to Benefits")

Coinbase recommends that you authenticate _all_ WebSocket channels, but only those listed above are enforced. You can authenticate yourself when [subscribing](https://docs.cdp.coinbase.com/exchange/docs/websocket-overview#subscribe) to the WebSocket Feed. The benefits of authenticating are:

- Messages (in which you are of the parties) are expanded and have more useful fields.
- You receive private messages, such as lifecycle information about stop orders you placed.

# DOCS/WEBSOCKET-CHANNELS

# Exchange WebSocket Channels

## Heartbeat Channel [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#heartbeat-channel "Direct link to Heartbeat Channel")

To receive heartbeat messages for specific products every second, subscribe to the `heartbeat` channel. Heartbeats include [sequence numbers](https://docs.cdp.coinbase.com/exchange/docs/websocket-overview#sequence-numbers) and last trade IDs that can be used to verify that no messages were missed.

```codeBlockLines_p187
// Request
{
    "type": "subscribe",
    "channels": [\
        {\
            "name": "heartbeat",\
            "product_ids": [\
                "ETH-EUR"\
            ]\
        }\
    ]
}

```

```codeBlockLines_p187
// Heartbeat message
{
  "type": "heartbeat",
  "sequence": 90,
  "last_trade_id": 20,
  "product_id": "BTC-USD",
  "time": "2014-11-07T08:19:28.464459Z"
}

```

## Status Channel [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#status-channel "Direct link to Status Channel")



Order Size Properties Removed

The properties `base_max_size`, `base_min_size`, `max_market_funds` were removed on June 30. The property, `min_market_funds`, has been repurposed as the notional minimum size for limit orders. See the [Changelog](https://docs.cdp.coinbase.com/exchange/docs/changelog#2022-jun-30).

The `status` channel sends all products and currencies on a preset interval.

```codeBlockLines_p187
// Request
{
  "type": "subscribe",
  "channels": [{ "name": "status"}]
}

```

```codeBlockLines_p187
// Status Message
{
  "type": "status",
  "products": [\
    {\
      "id": "BTC-USD",\
      "base_currency": "BTC",\
      "quote_currency": "USD",\
      "base_increment": "0.00000001",\
      "quote_increment": "0.01",\
      "display_name": "BTC-USD",\
      "status": "online",\
      "status_message": null,\
      "min_market_funds": "10",\
      "post_only": false,\
      "limit_only": false,\
      "cancel_only": false,\
      "fx_stablecoin": false\
    }\
  ],
  "currencies": [\
    {\
      "id": "USD",\
      "name": "United States Dollar",\
      "display_name": "USD",\
      "min_size": "0.01000000",\
      "status": "online",\
      "status_message": null,\
      "max_precision": "0.01",\
      "convertible_to": ["USDC"],\
      "details": {},\
      "default_network": "",\
      "supported_networks": []\
    },\
    {\
      "id": "USDC",\
      "name": "USD Coin",\
      "display_name": "USDC",\
      "min_size": "0.00000100",\
      "status": "online",\
      "status_message": null,\
      "max_precision": "0.000001",\
      "convertible_to": ["USD"],\
      "details": {},\
      "default_network": "ethereum",\
      "supported_networks": [\
        {\
          "id": "ethereum",\
          "name": "Ethereum",\
          "status": "online",\
          "contract_address": "",\
          "crypto_address_link": "https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48?a={{address}}",\
          "crypto_transaction_link": "https://etherscan.io/tx/0x{{txId}}",\
          "min_withdrawal_amount": 0.001,\
          "max_withdrawal_amount": 300000000,\
          "network_confirmations": 14,\
          "processing_time_seconds": 0,\
          "destination_tag_regex": ""\
        }\
      ]\
    },\
    {\
      "id": "BTC",\
      "name": "Bitcoin",\
      "display_name": "BTC",\
      "min_size":" 0.00000001",\
      "status": "online",\
      "status_message": null,\
      "max_precision": "0.00000001",\
      "convertible_to": [],\
      "details": {},\
      "default_network": "bitcoin",\
      "supported_networks": [\
        {\
          "id": "bitcoin",\
          "name": "Bitcoin",\
          "status": "online",\
          "contract_address": "",\
          "crypto_address_link": "https://live.blockcypher.com/btc/address/{{address}}",\
          "crypto_transaction_link": "https://live.blockcypher.com/btc/tx/{{txId}}",\
          "min_withdrawal_amount": 0.0001,\
          "max_withdrawal_amount": 2400,\
          "network_confirmations": 2,\
          "processing_time_seconds": 0,\
          "destination_tag_regex": ""\
        }\
      ]\
    }\
  ]
}

```

## Auction Channel [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#auction-channel "Direct link to Auction Channel")

The `auction` channel sends information about the auction while the product is in auction mode.

Auction messages provide the most recent indicative quote disseminated during the auction. Indicative quote messages are sent on an interval basis (about once a second) during the collection phase of an auction. The indicative quote includes information about the tentative price and size affiliated with the completion.

The open price and size indicate the aggregate size of all the orders eligible for crossing, along with the price used for matching all the orders as the auction enters the opening state. The best bid and ask price and size fields indicate the anticipated BBO upon entering full trading or limit only after the matching has completed.

Because indicative quotes are sent on an interval, values are not firm. The price may change in between two quote updates: (1) in between two normal quote update intervals, or (2) in between the last normal quote update interval and the final indicative quote that occurs when the book transitions from auction mode to full trading.

See [Get Product Book](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductbook) in the API Reference for more details on the level 1 book and products in auction mode.

```codeBlockLines_p187
// Request
{
  "type": "subscribe",
  "channels": [{ "name": "auctionfeed", "product_ids": ["LTC-USD"] }]
}

```

```codeBlockLines_p187
// Auction Message
{
    "type": "auction",
    "product_id": "LTC-USD",
    "sequence": 3262786978,
    "auction_state": "collection",
    "best_bid_price": "333.98",
    "best_bid_size": "4.39088265",
    "best_ask_price": "333.99",
    "best_ask_size": "25.23542881",
    "open_price": "333.99",
    "open_size": "0.193",
    "can_open": "yes",
    "timestamp": "2015-11-14T20:46:03.511254Z"
}

```

## Matches Channel [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#matches-channel "Direct link to Matches Channel")

If you are only interested in [match](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#match) messages, you can subscribe to the matches channel. This is useful when you're consuming the remaining feed using the [level2 channel](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#level2-channel).

After subscribing to the matches channel, the message `type` of the first message returned (and only the first message) is `last_match`, for example, `"type": "last_match",`



Caution

Messages can be dropped from this channel. Use the [heartbeat channel](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#heartbeat-channel) to track the last trade ID and fetch trades that you missed from the REST API.

## RFQ Matches Channel [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#rfq-matches-channel "Direct link to RFQ Matches Channel")

The subscription message for the Request For Quote or `rfq_matches` channel does not require the `product_ids` field; otherwise, it is the same as all other WebSocket feed channels.

- If `product_ids` is not sent, or sent as an empty string "", or sent as "ALL", the user receives `rfq_matches` for all products.
- If `product_ids` is defined, the subscriber only receives `rfq_matches` for that product. The product specified must be a valid Coinbase product ID.



Tip

Coinbase recommends submitting an empty list in the subscription request (and not specifying `product_ids`) to ensure you get all RFQ matches.



Caution

If the user has an "ALL" subscription and subscribes to a specific product, that new subscription is denied.

```codeBlockLines_p187
// Subscription Request
{
  "type": "subscriptions",
  "channels": [\
    {\
      "name": "rfq_matches",\
      "product_ids": [\
        "",\
      ],\
    },\
  ]
}

```



Caution

The subscription message uses the plural `product_ids`, whereas RFQ messages use the singular, `product_id`.

```codeBlockLines_p187
// RFQ Request
{
  "type": "rfq_match",
  "maker_order_id": "ac928c66-ca53-498f-9c13-a110027a60e8",
  "taker_order_id": "132fb6ae-456b-4654-b4e0-d681ac05cea1",
  "time": "2014-11-07T08:19:27.028459Z",
  "trade_id": 30,
  "product_id": "BTC-USD",
  "size": "5.23512",
  "price": "400.23",
  "side": "sell"
}

```



Info

See also the new [FIX Request For Quote messages](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry#rfq-request-ah).

## Ticker Channel [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#ticker-channel "Direct link to Ticker Channel")

The `ticker` channel provides real-time price updates every time a match happens. It batches updates in case of cascading matches, greatly reducing bandwidth requirements.

```codeBlockLines_p187
// Request
{
    "type": "subscribe",
    "product_ids": [\
        "ETH-USD",\
        "BTC-USD"\
    ],
    "channels": ["ticker"]
}

```

```codeBlockLines_p187
// Ticker message
{
  "type": "ticker",
  "sequence": 37475248783,
  "product_id": "ETH-USD",
  "price": "1285.22",
  "open_24h": "1310.79",
  "volume_24h": "245532.79269678",
  "low_24h": "1280.52",
  "high_24h": "1313.8",
  "volume_30d": "9788783.60117027",
  "best_bid": "1285.04",
  "best_bid_size": "0.46688654",
  "best_ask": "1285.27",
  "best_ask_size": "1.56637040",
  "side": "buy",
  "time": "2022-10-19T23:28:22.061769Z",
  "trade_id": 370843401,
  "last_size": "11.4396987"
}

```

## Ticker Batch Channel [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#ticker-batch-channel "Direct link to Ticker Batch Channel")

The `ticker_batch` channel provides latest price updates **every 5000 milliseconds** (5 seconds) if there is a change. It has the same JSON message schema as the [ticker channel](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#ticker-channel).



Info

The `ticker_1000` channel was renamed ticker\_batch but you can use either name when subscribing.

```codeBlockLines_p187
// Request
{
    "type": "subscribe",
    "product_ids": [\
        "ETH-USD",\
        "BTC-USD"\
    ],
    "channels": ["ticker_batch"]
}

```

## Full Channel [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#full-channel "Direct link to Full Channel")

[![](https://img.shields.io/badge/Full%20Channel-Authentication%20Required-0a639a)](https://docs.cdp.coinbase.com/exchange/docs/websocket-auth)

The `full` channel provides real-time updates on orders and trades. These updates can be applied to a level3 order book snapshot to maintain an accurate and up-to-date copy of the exchange order book.

To maintain an up-to-date level3 order book:

1. Send a `subscribe` message for the product(s) of interest and the `full` channel.
2. Queue any messages received over the websocket stream.
3. Make a REST request for the order book snapshot from the REST feed.
4. Playback queued messages, discarding sequence numbers before or equal to the snapshot sequence number.
5. Apply playback messages to the snapshot as needed (see below).
6. After playback is complete, apply real-time stream messages as they arrive.



Info

All `open` and `match` messages always result in a change to the order book. Not all `done` or `change` messages result in changing the order book. These messages are sent for received orders which are not yet on the order book. Do not alter the order book for such messages, otherwise your order book will be incorrect.

The following messages are sent over the websocket stream in JSON format when subscribing to the full channel:

### Received [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#received "Direct link to Received")

_A valid order has been received and is now active._

This message is emitted for every single valid order as soon as the matching engine receives it, whether it fills immediately or not.

The `received` message does not indicate a resting order on the order book. The `received` message indicates that a new incoming order has been accepted by the matching engine for processing. Received orders may cause `match` message to follow if they are able to begin being filled (taker behavior).

[Self-trade prevention](https://docs.cdp.coinbase.com/exchange/docs/matching-engine#self-trade-prevention) may also trigger `change` messages to follow if the order size needs to be adjusted. Orders that are not fully filled or that are canceled due to self-trade prevention, result in an `open` message and become resting orders on the order book.

Market orders (indicated by the `order_type` field) may have an optional `funds` field which indicates how much quote currency is used to buy or sell. For example, a `funds` field of `100.00` for the `BTC-USD` product would indicate a purchase of up to `100.00 USD` worth of bitcoin.



Caution

`client-oid` is only available in the **authenticated** `full` channel and the [user channel](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#user-channel) (which is also authenticated). You can only see your own `client-oid`.

Received message for limit order:

```codeBlockLines_p187
{
  "type": "received",
  "time": "2014-11-07T08:19:27.028459Z",
  "product_id": "BTC-USD",
  "sequence": 10,
  "order_id": "d50ec984-77a8-460a-b958-66f114b0de9b",
  "size": "1.34",
  "price": "502.1",
  "side": "buy",
  "order_type": "limit",
  "client-oid": "d50ec974-76a2-454b-66f135b1ea8c"
}

```

Received message for market order:

```codeBlockLines_p187
{
  "type": "received",
  "time": "2014-11-09T08:19:27.028459Z",
  "product_id": "BTC-USD",
  "sequence": 12,
  "order_id": "dddec984-77a8-460a-b958-66f114b0de9b",
  "funds": "3000.234",
  "side": "buy",
  "order_type": "market",
  "client-oid": "d50ec974-76a2-454b-66f135b1ea8c"
}

```

### Open [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#open "Direct link to Open")

_The order is now open on the order book._

This message is only sent for orders that are not fully filled immediately. `remaining_size` indicates how much of the order is unfilled and going on the book.



Info

There is no `open` message for orders that are filled immediately. And there is no `open` message for market orders since they are filled immediately.

```codeBlockLines_p187
{
  "type": "open",
  "time": "2014-11-07T08:19:27.028459Z",
  "product_id": "BTC-USD",
  "sequence": 10,
  "order_id": "d50ec984-77a8-460a-b958-66f114b0de9b",
  "price": "200.2",
  "remaining_size": "1.00",
  "side": "sell"
}

```

### Done [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#done "Direct link to Done")

_The order is no longer on the order book._

This message is sent for all orders for which there was a received message and can result from an order being canceled or filled.

There are no more messages for an `order_id` after a done message. `remaining_size` indicates how much of the order went unfilled; this is `0` for `filled` orders.

`market` orders do not have a `remaining_size` or `price` field as they are never on the open order book at a given price.



Info

A `done` message is sent for received orders that are fully filled or canceled due to self-trade prevention. There are no `open` messages for such orders. `done` messages for orders that are not on the book should be ignored when maintaining a real-time order book.

```codeBlockLines_p187
{
  "type": "done",
  "time": "2014-11-07T08:19:27.028459Z",
  "product_id": "BTC-USD",
  "sequence": 10,
  "price": "200.2",
  "order_id": "d50ec984-77a8-460a-b958-66f114b0de9b",
  "reason": "filled", // or "canceled"
  "side": "sell",
  "remaining_size": "0"
}

```

#### Cancel Reason [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#cancel-reason "Direct link to Cancel Reason")

Done messages with `reason=canceled` (that are authenticated and that originated with you the user) return the reason in the `cancel_reason` field:

Supported cancel reasons are:

```codeBlockLines_p187
101:Time In Force
102:Self Trade Prevention
103:Admin
104:Price Bound Order Protection
105:Insufficient Funds
106:Insufficient Liquidity
107:Broker

```

### Match [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#match "Direct link to Match")

_A trade occurred between two orders._

The aggressor or `taker` order is the one executing immediately after being received and the `maker` order is a resting order on the book.

The `side` field indicates the maker order side. If the side is `sell` this indicates the maker was a sell order and the `match` is considered an up-tick. A `buy` side match is a down-tick.

```codeBlockLines_p187
{
  "type": "match",
  "trade_id": 10,
  "sequence": 50,
  "maker_order_id": "ac928c66-ca53-498f-9c13-a110027a60e8",
  "taker_order_id": "132fb6ae-456b-4654-b4e0-d681ac05cea1",
  "time": "2014-11-07T08:19:27.028459Z",
  "product_id": "BTC-USD",
  "size": "5.23512",
  "price": "400.23",
  "side": "sell"
}

```

If authenticated, and you were the taker, the message would also have the following fields:

```codeBlockLines_p187
{
  ...
  "taker_user_id": "5844eceecf7e803e259d0365",
  "user_id": "5844eceecf7e803e259d0365",
  "taker_profile_id": "765d1549-9660-4be2-97d4-fa2d65fa3352",
  "profile_id": "765d1549-9660-4be2-97d4-fa2d65fa3352",
  "taker_fee_rate": "0.005"
}

```

Similarly, if you were the maker, the message would have the following:

```codeBlockLines_p187
{
  ...
  "maker_user_id": "5f8a07f17b7a102330be40a3",
  "user_id": "5f8a07f17b7a102330be40a3",
  "maker_profile_id": "7aa6b75c-0ff1-11eb-adc1-0242ac120002",
  "profile_id": "7aa6b75c-0ff1-11eb-adc1-0242ac120002",
  "maker_fee_rate": "0.001"
}

```

### Change [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#change "Direct link to Change")

_An order has changed._

A `change` message can be the result of either a [Self-trade Prevention (STP)](https://docs.cdp.coinbase.com/exchange/docs/matching-engine#self-trade-prevention) or a Modify Order Request:



Info

Modify Order Request adds three new fields: `new_price`, `old_price`, `reason`. See also [FIX Modify Order Request (G)](https://docs.cdp.coinbase.com/exchange/docs/fix-msg-order-entry#modify-order-request-g).

- A Self-trade Prevention adjusts the order size or available funds (and can only decrease).
- A Modify Order Request adjusts the order size or price.

`change` messages are sent anytime an order changes in size or price. This includes:

- Orders that are open (resting)
- Orders that are received but not yet open.
- Market orders with `funds` changed from a Self-trade Prevention control.



Info

If you are building a real-time order book, you can ignore `change` messages for received but not yet open orders.

> If you are building from a level2 book, the `side` and `price` fields to indicate whether the change message is relevant. STP Change messages for limit orders always have a price specified. STP change messages for market orders have no price ( `null`) and a decrease in order size.

Example of a change message from a Self-trade Prevention action:

> STP messages have a new `reason` field and continue to use the `price` field (not `new_price` and `old_price`).

```codeBlockLines_p187
{
  "type": "change",
  "reason":"STP",
  "time": "2014-11-07T08:19:27.028459Z",
  "sequence": 80,
  "order_id": "ac928c66-ca53-498f-9c13-a110027a60e8",
  "side": "sell",
  "product_id": "BTC-USD",
  "old_size": "12.234412",
  "new_size": "5.23512",
  "price": "400.23"
}

```

Example of a change message from a Modify Order Request:

> Modify Order messages add three new fields: `new_price`, `old_price`, `reason`.

```codeBlockLines_p187
{
  "type": "change",
  "reason":"modify_order",
  "time": "2022-06-06T22:55:43.433114Z",
  "sequence": 24753,
  "order_id": "c3f16063-77b1-408f-a743-88b7bc20cdcd",
  "side": "buy",
  "product_id": "ETH-USD",
  "old_size": "80",
  "new_size": "80",
  "old_price": "7",
  "new_price": "6"
}

```

### Activate [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#activate "Direct link to Activate")

_An activate message is sent when a stop order is placed._

When the stop is triggered the order is placed and goes through the [order lifecycle](https://docs.cdp.coinbase.com/exchange/docs/matching-engine#order-lifecycle).

```codeBlockLines_p187
{
  "type": "activate",
  "product_id": "test-product",
  "timestamp": "1483736448.299000",
  "user_id": "12",
  "profile_id": "30000727-d308-cf50-7b1c-c06deb1934fc",
  "order_id": "7b52009b-64fd-0a2a-49e6-d8a939753077",
  "stop_type": "entry",
  "side": "buy",
  "stop_price": "80",
  "size": "2",
  "funds": "50",
  "private": true
}

```

## User Channel [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#user-channel "Direct link to User Channel")

[![](https://img.shields.io/badge/User%20Channel-Authentication%20Required-0a639a)](https://docs.cdp.coinbase.com/exchange/docs/websocket-auth)

The `user` channel is a version of the [full channel](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#full-channel) and only contains messages that include the authenticated user. Consequently, you need to be [authenticated](https://docs.cdp.coinbase.com/exchange/docs/websocket-auth#authentication) to receive any messages.



Caution

Modify Order Request is a new feature that affects the [Full Channel, Change](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#change) message, and by extension, the User channel.

## Level2 Channel [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#level2-channel "Direct link to Level2 Channel")

[![](https://img.shields.io/badge/Level2%20Channel-Authentication%20Required-0a639a)](https://docs.cdp.coinbase.com/exchange/docs/websocket-auth)

The `level2` channel guarantees delivery of all updates and is the easiest way to keep a snapshot of the order book. This channel also reduces the overhead required when consuming the [full channel](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#full-channel).

```codeBlockLines_p187
// Request
{
    "type": "subscribe",
    "channels": ["level2"],
    "product_ids": [\
        "ETH-USD",\
        "BTC-USD"\
    ]
}

```



Tip

The [Level2 Batch Channel](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#level2-batch-channel) does not require authentication and delivers Level 2 data in batches every 50 milliseconds.

The `level2` channel sends a message with the type `snapshot` and the corresponding `product_id`. The properties `bids` and `asks` are arrays of `[price, size]` tuples and represent the entire order book.

```codeBlockLines_p187
{
  "type": "snapshot",
  "product_id": "BTC-USD",
  "bids": [["10101.10", "0.45054140"]],
  "asks": [["10102.55", "0.57753524"]]
}

```

Subsequent updates have the type `l2update`. The `changes` property of `l2update` s is an array with `[side, price, size]` tuples. The `time` property of `l2update` is the time of the event as recorded by our trading engine.

##### Single `changes` Array [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#single-changes-array "Direct link to single-changes-array")

```codeBlockLines_p187
{
  "type": "l2update",
  "product_id": "BTC-USD",
  "time": "2019-08-14T20:42:27.265Z",
  "changes": [\
    [\
      "buy",\
      "10101.80000000",\
      "0.162567"\
    ]\
  ]
}

```

##### Multiple `changes` Arrays [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#multiple-changes-arrays "Direct link to multiple-changes-arrays")

```codeBlockLines_p187
{
  "type": "l2update",
  "product_id": "BTC-USD",
  "changes": [\
    [\
      "buy",\
      "22356.270000",\
      "0.00000000"\
    ],\
    [\
      "buy",\
      "22356.300000",\
      "1.00000000"\
    ]\
  ],
  "time": "2022-08-04T15:25:05.010758Z"
}

```



Info

The `size` property is the updated size at the price level, not a delta. A size of `"0"` indicates the price level can be removed.

## Level2 Batch Channel [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#level2-batch-channel "Direct link to Level2 Batch Channel")

The `level2_batch` channel sends batches of `level2` messages **every 50 milliseconds** (0.05 seconds). It has the same JSON message schema as the [`level2` channel](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#level2-channel). The time field correlates to the most recent message in the batch.



Tip

The `level2_batch` channel lets you receive [`level2`](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels#level2-channel) data _without authenticating_. You get the same benefits while minimizing traffic.

```codeBlockLines_p187
// Request
{
    "type": "subscribe",
    "product_ids": [\
        "ETH-USD",\
        "BTC-USD"\
    ],
    "channels": ["level2_batch"]
}

```



Info

The `level2_50` channel was renamed `level2_batch` but you can use either when subscribing.

## Level3 Channel [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#level3-channel "Direct link to Level3 Channel")

[![](https://img.shields.io/badge/Level3%20Channel-Authentication%20Required-0a639a)](https://docs.cdp.coinbase.com/exchange/docs/websocket-auth)

The `level3` channel is a compact version of the Full channel. It conveys all of the same data in a compact message structure that requires less bandwidth with potentially more efficient client side parsing.

```codeBlockLines_p187
// Subscribe request
{
    "type": "subscribe",
    "channels": ["level3"],
    "product_ids": [\
        "ETH-USD",\
        "BTC-USD"\
    ]
}

```

### L3 Schema [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#l3-schema "Direct link to L3 Schema")

On subscribe, the first response returns a level3 schema with the structure for each message type. The schema is not repeated.



Level3 Message Structures

You should process level3 message structures before parsing the subsequent messages. While the schema should not change, it may.

**Expand to view the full level3 schema**

```codeBlockLines_p187
{
  "type": "level3",
  "schema": {
    "change": [\
      "type",\
      "product_id",\
      "sequence",\
      "order_id",\
      "price",\
      "size",\
      "time"\
    ],
    "done": [\
      "type",\
      "product_id",\
      "sequence",\
      "order_id",\
      "time"\
    ],
    "match": [\
      "type",\
      "product_id",\
      "sequence",\
      "maker_order_id",\
      "taker_order_id",\
      "price",\
      "size",\
      "time"\
    ],
    "noop": [\
      "type",\
      "product_id",\
      "sequence",\
      "time"\
    ],
    "open": [\
      "type",\
      "product_id",\
      "sequence",\
      "order_id",\
      "side",\
      "price",\
      "size",\
      "time"\
    ]
  }
}

```

Subsequent messages for each type pack the data into an array with a structure as defined in the initial response, for example:

```codeBlockLines_p187
[\
  "open",\
  "BTC-USD",\
  "57560479456",\
  "12aca6e0-7400-418a-9e59-c0020a3bf8cc",\
  "buy",\
  "27268.09",\
  "0.02",\
  "2023-03-28T23:24:03.185394Z"\
]

```

## Balance Channel [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#balance-channel "Direct link to Balance Channel")

[![](https://img.shields.io/badge/Balance%20Channel-Authentication%20Required-0a639a)](https://docs.cdp.coinbase.com/exchange/docs/websocket-auth)

The `balance` channel tracks account balance updates, which is useful for checking the holds and available balance on your account. It does _not_ track every update. Authentication is required.

Clients are recommended to subscribe to this channel for accounts with frequent balance changes as accounts without any changes do not receive updates.

#### Fields [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#fields "Direct link to Fields")

A response from the channel includes the following fields:

```codeBlockLines_p187
{
  "type": "balance",
  "account_id": "d50ec984-77a8-460a-b958-66f114b0de9b",
  "currency": "USD",
  "holds": "1000.23",                      // funds locked in account
  "available": "102030.99",                // balance available for trading
  "updated": "2023-10-10T20:42:27.265Z",   // when last balance change is observed
  "timestamp": "2023-10-10T20:42:29.265Z"  // when message is sent from websocket
}

```

#### Subscribe [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#subscribe "Direct link to Subscribe")

Clients can subscribe to this channel using the following subscribe messages:

##### Example 1 [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#example-1 "Direct link to Example 1")

```codeBlockLines_p187
{
  "type": "subscribe",
  "channels": [\
    {\
      "name": "balance",\
      "account_ids": [\
        "d50ec984-77a8-460a-b958-66f114b0de9b",\
        "d50ec984-77a8-460a-b958-66f114b0de9a"\
      ]\
    }\
  ]
}

```

##### Example 2 [](https://docs.cdp.coinbase.com/exchange/docs/websocket-channels\#example-2 "Direct link to Example 2")

```codeBlockLines_p187
{
  "type": "subscribe",
  "channels": [\
    "balance"\
  ],
  "account_ids": [\
    "d50ec984-77a8-460a-b958-66f114b0de9b",\
    "d50ec984-77a8-460a-b958-66f114b0de9a"\
  ]
}

```

# DOCS/WEBSOCKET-RATE-LIMITS

# Exchange WebSocket Rate Limits

Coinbase Exchange real-time WebSocket market data updates provide fast insight into order flow and trades. This means that you are responsible for reading the message stream and using the message relevant for your needs—this can include building real-time order books or tracking real-time trades.

The WebSocket API has two forms of rate limits—subscription limits and inbound message limits highlighted below. See also [Market Data Connections](https://help.coinbase.com/en/exchange/managing-my-account/market-data-connections) in the Help docs.

## Limits [](https://docs.cdp.coinbase.com/exchange/docs/websocket-rate-limits\#limits "Direct link to Limits")

### Subscription Limits [](https://docs.cdp.coinbase.com/exchange/docs/websocket-rate-limits\#subscription-limits "Direct link to Subscription Limits")

- Exchange accounts are limited to **10** WebSocket subscriptions on a per product, per channel basis. Users can purchase higher subscription limits if desired. Navigate to [Coinbase Developer Platform](https://portal.cdp.coinbase.com/products/exchange) to change your subscription.
- If a user attempts to exceed **10** subscriptions per product, per channel, and is not a member of a paid subscription tier, the new subscription will be rejected.

### What is a subscription? [](https://docs.cdp.coinbase.com/exchange/docs/websocket-rate-limits\#what-is-a-subscription "Direct link to What is a subscription?")

- A subscription is defined on a per product, per channel basis.
- Below is an example of a total of 4 subscriptions for BTC-USD full
  - User123: BTC-USD Full Channel (unique)
  - User123: BTC-USD Full Channel (duplicate)
  - User123: BTC-USD Full Channel (duplicate)
  - User123: BTC-USD Full Channel (duplicate)
  - User123: BTC-USD Level 2 (unique)
  - User123: BTC-USD Level 3 (unique)
- In this case, User123 has 6 remaining subscriptions to BTC-USD full channel, and 9 remaining subscriptions to BTC-USD Level 2 and Level 3 channels.

### Inbound Message Limits [](https://docs.cdp.coinbase.com/exchange/docs/websocket-rate-limits\#inbound-message-limits "Direct link to Inbound Message Limits")

- All WebSocket inbound messages are subject to a rate limit of **10** RPS / **1000** burst RPS.

### What is an inbound message limit? [](https://docs.cdp.coinbase.com/exchange/docs/websocket-rate-limits\#what-is-an-inbound-message-limit "Direct link to What is an inbound message limit?")

- When a user sends any message (subscribing to a WebSocket channel, unsubscribing to a WebSocket channel, etc.) it is counted towards their inbound message limit.
- Users can subscribe/unsubscribe to multiple channels and products within a single inbound message.
- Limits are enforced using a **lazy-fill token bucket** implementation. More information, including examples, can be found at [How Rate Limits Work](https://docs.cdp.coinbase.com/exchange/docs/rate-limits#how-rate-limits-work).

# DOCS/WEBSOCKET-ERRORS

# Exchange WebSocket Errors

An error message displays when the client is actively disconnected for any of these reasons:

- The client has too many backed up messages ( `ErrSlowConsume`).
- The client is sending too many messages ( `ErrSlowRead`).
- The message size is too large ( `Message too big`)
- There are intermittent network issues.

Most failure cases trigger an `error` message—specifically, a message with the `type` `"error"`. This can be helpful when implementing a client or debugging issues.

```codeBlockLines_p187
{
  "type": "error",
  "message": "error message"
  /* ... */
}

```